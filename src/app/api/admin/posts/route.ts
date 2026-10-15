// ── /api/admin/posts — blog authoring (Phase C, guide 13-f) ──
// POST creates a post; slug is latin ^[a-z0-9-]{3,60}$ (auto-generated from
// the title with a transliteration fallback when absent). Duplicate slug = 409.
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { toErrorResponse, AppError } from "@/lib/errors";
import { assertSameOrigin, requireAdmin } from "@/lib/auth/session";
import { slugifyTitle } from "@/lib/media";

const postSchema = z.object({
  title: z.string().trim().min(3).max(120),
  slug: z.string().regex(/^[a-z0-9-]{3,60}$/).optional(),
  excerpt: z.string().trim().max(300).optional().default(""),
  content: z.string().trim().min(50).max(20_000),
  tags: z.string().trim().max(120).optional().default(""),
  publish: z.boolean().optional().default(false),
});

export async function POST(req: Request) {
  try {
    assertSameOrigin(req);
    const admin = await requireAdmin();
    const parsed = postSchema.safeParse(await req.json().catch(() => ({})));
    if (!parsed.success) {
      throw new AppError(400, "bad_input", {
        fields: parsed.error.issues.slice(0, 6).map((i) => `${i.path.join(".")}: ${i.message}`),
      });
    }
    const input = parsed.data;
    const slug = input.slug ?? slugifyTitle(input.title);

    const exists = await db.post.findUnique({ where: { slug }, select: { id: true } });
    if (exists) throw new AppError(409, "slug_conflict", { slug });

    const post = await db.post.create({
      data: {
        title: input.title,
        slug,
        excerpt: input.excerpt,
        content: input.content,
        tags: input.tags,
        published: input.publish,
        publishedAt: input.publish ? new Date() : null,
        authorId: admin.phone, // legacy column — kept for provenance, unused-ok
      },
    });
    return NextResponse.json({ ok: true, post: { id: post.id, slug: post.slug, published: post.published } }, { status: 201 });
  } catch (e) {
    if (e instanceof AppError && e.code === "slug_conflict") {
      return NextResponse.json({ error: e.code, details: e.details }, { status: 409 });
    }
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
