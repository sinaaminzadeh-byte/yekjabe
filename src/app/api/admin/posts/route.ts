// ── /api/admin/posts — blog authoring (Phase C, guide 13-f) ──
// GET  full list (drafts included, content + cover + SEO fields) so ANY admin
//      session can re-edit existing posts (round 34 studio).
// POST creates a post; slug is latin ^[a-z0-9-]{3,60}$ (auto-generated from
// the title with a transliteration fallback when absent). Duplicate slug = 409.
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { toErrorResponse, AppError } from "@/lib/errors";
import { assertSameOrigin, requireAdmin } from "@/lib/auth/session";
import { slugifyTitle, publicMediaUrl } from "@/lib/media";

export async function GET() {
  try {
    await requireAdmin();
    const posts = await db.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
      select: {
        id: true, slug: true, title: true, excerpt: true, content: true, tags: true,
        coverKey: true, metaTitle: true, metaDescription: true,
        published: true, publishedAt: true, createdAt: true, updatedAt: true,
      },
    });
    return NextResponse.json({
      posts: posts.map((p) => ({
        ...p,
        cover: publicMediaUrl(p.coverKey),
        coverKey: undefined,
      })),
    });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}

const postSchema = z.object({
  title: z.string().trim().min(3).max(120),
  slug: z.string().regex(/^[a-z0-9-]{3,60}$/).optional(),
  excerpt: z.string().trim().max(300).optional().default(""),
  content: z.string().trim().min(50).max(20_000),
  tags: z.string().trim().max(120).optional().default(""),
  // round 34 — blog studio SEO fields
  metaTitle: z.string().trim().max(70).optional().default(""),
  metaDescription: z.string().trim().max(200).optional().default(""),
  coverKey: z.string().trim().max(200).optional().default(""),
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
        metaTitle: input.metaTitle,
        metaDescription: input.metaDescription,
        ...(input.coverKey ? { coverKey: input.coverKey } : {}),
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
