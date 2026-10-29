// ── /api/posts/[slug] — one published post (public read) ──
// 404 unless published=true — drafts are unreachable by URL, by construction.
// Public columns only: authorId and admin bookkeeping never leave the server.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse } from "@/lib/errors";
import { publicMediaUrl } from "@/lib/media";

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
    const { published: _published, coverKey: _coverKey, ...publicPost } = post;
    return NextResponse.json({
      post: { ...publicPost, cover: publicMediaUrl(post.coverKey) },
    });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
