// ── /api/posts — published blog list (public read, Phase C) ──
// Cards payload only. SEO-12 (audit wave 38): the STRICTEST public cut —
// only the fields the blog screen renders (slug/title/excerpt/tags/cover/
// publishedAt). Internal columns (coverKey, metaTitle, metaDescription,
// authorId, published flag) never leave the server. Drafts never appear
// here (published=true gate).
// P-12 (audit wave 38): Cache-Control lets shared CDNs serve the list for
// 5 minutes while browsers revalidate every minute.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse } from "@/lib/errors";
import { publicMediaUrl } from "@/lib/media";

export const POSTS_LIST_CACHE = "public, max-age=60, s-maxage=300, stale-while-revalidate=600";

export async function GET() {
  try {
    const posts = await db.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 50,
      select: {
        slug: true,
        title: true,
        excerpt: true,
        tags: true,
        coverKey: true,
        publishedAt: true,
      },
    });
    // explicit allowlist mapping — coverKey is consumed here, never serialized
    const body = {
      posts: posts.map((p) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        tags: p.tags,
        cover: publicMediaUrl(p.coverKey),
        publishedAt: p.publishedAt,
      })),
    };
    return NextResponse.json(body, { headers: { "cache-control": POSTS_LIST_CACHE } });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
