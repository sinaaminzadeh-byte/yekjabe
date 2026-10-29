// ── PATCH+DELETE /api/admin/posts/[id] — edit / remove a post (Phase C) ──
// PATCH: all fields optional; publish:true sets published+publishedAt,
// publish:false unpublishes. DELETE: owner-only (requireAdmin("owner")).
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { toErrorResponse, AppError } from "@/lib/errors";
import { assertSameOrigin, requireAdmin } from "@/lib/auth/session";

const patchSchema = z.object({
  title: z.string().trim().min(3).max(120).optional(),
  slug: z.string().regex(/^[a-z0-9-]{3,60}$/).optional(),
  excerpt: z.string().trim().max(300).optional(),
  content: z.string().trim().min(50).max(20_000).optional(),
  tags: z.string().trim().max(120).optional(),
  // round 34 — blog studio SEO fields (coverKey:"" removes the featured image)
  metaTitle: z.string().trim().max(70).optional(),
  metaDescription: z.string().trim().max(200).optional(),
  coverKey: z.string().trim().max(200).optional(),
  publish: z.boolean().optional(),
});

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    assertSameOrigin(req);
    const admin = await requireAdmin();
    const parsed = patchSchema.safeParse(await req.json().catch(() => ({})));
    if (!parsed.success) {
      throw new AppError(400, "bad_input", {
        fields: parsed.error.issues.slice(0, 6).map((i) => `${i.path.join(".")}: ${i.message}`),
      });
    }
    const input = parsed.data;
    if (Object.keys(input).length === 0) throw new AppError(400, "nothing_to_update");

    const current = await db.post.findUnique({ where: { id }, select: { id: true, publishedAt: true } });
    if (!current) throw new AppError(404, "not_found");
    if (input.slug && input.slug !== id) {
      const clash = await db.post.findUnique({ where: { slug: input.slug }, select: { id: true } });
      if (clash) throw new AppError(409, "slug_conflict", { slug: input.slug });
    }

    const data: {
      title?: string; slug?: string; excerpt?: string; content?: string; tags?: string;
      metaTitle?: string; metaDescription?: string; coverKey?: string;
      published?: boolean; publishedAt?: Date | null;
    } = {};
    if (input.title !== undefined) data.title = input.title;
    if (input.slug !== undefined) data.slug = input.slug;
    if (input.excerpt !== undefined) data.excerpt = input.excerpt;
    if (input.content !== undefined) data.content = input.content;
    if (input.tags !== undefined) data.tags = input.tags;
    if (input.metaTitle !== undefined) data.metaTitle = input.metaTitle;
    if (input.metaDescription !== undefined) data.metaDescription = input.metaDescription;
    if (input.coverKey !== undefined) {
      data.coverKey = input.coverKey;
      // the replaced cover file is garbage-collected here (single writer)
      const prev = await db.post.findUnique({ where: { id }, select: { coverKey: true } });
      if (prev?.coverKey && prev.coverKey !== input.coverKey && input.coverKey) {
        const { deleteMediaFile } = await import("@/lib/media");
        await deleteMediaFile(prev.coverKey);
      }
    }
    if (input.publish !== undefined) {
      data.published = input.publish;
      data.publishedAt = input.publish ? (current.publishedAt ?? new Date()) : null;
    }

    const post = await db.post.update({ where: { id }, data });
    return NextResponse.json({ ok: true, post: { id: post.id, slug: post.slug, published: post.published }, by: admin.phone });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    assertSameOrigin(req);
    const admin = await requireAdmin("owner");
    const current = await db.post.findUnique({ where: { id }, select: { id: true } });
    if (!current) throw new AppError(404, "not_found");
    await db.post.delete({ where: { id } });
    return NextResponse.json({ ok: true, deleted: id, by: admin.phone });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
