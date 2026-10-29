// ── /api/posts/[slug] — one published post (public read) ──
// 404 unless published=true — drafts are unreachable by URL, by construction.
// SEO-12 (audit wave 38): public-safe fields only. metaTitle/metaDescription
// STAY in the detail response because the client screen (blog.tsx → usePostSeo)
// uses them for document meta; the list API (/api/posts) strips them. Admin
// bookkeeping (authorId, published flag, raw coverKey) never leaves the server.
// P-12 (audit wave 38): short shared cache like the list endpoint.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse } from "@/lib/errors";
import { publicMediaUrl } from "@/lib/media";

const POST_DETAIL_CACHE = "public, max-age=60, s-maxage=300, stale-while-revalidate=600";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const post = await db.post.findUnique({
      where: { slug },
      select: {
        slug: true,
        title: true,
        excerpt: true,
        content: true,
        tags: true,
        coverKey: true,
        metaTitle: true,
        metaDescription: true,
        published: true,
        publishedAt: true,
        updatedAt: true,
      },
    });
    if (!post || !post.published) return NextResponse.json({ error: "not_found" }, { status: 404 });
    // explicit public shape — coverKey/published consumed server-side only
    const body = {
      post: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        tags: post.tags,
        cover: publicMediaUrl(post.coverKey),
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        publishedAt: post.publishedAt,
        updatedAt: post.updatedAt,
      },
    };
    return NextResponse.json(body, { headers: { "cache-control": POST_DETAIL_CACHE } });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
