// ── /api/posts — published blog list (public read, Phase C) ──
// Cards payload only: slug/title/excerpt/tags/publishedAt. Content lives on
// the [slug] route; drafts never appear here (published=true gate).
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse } from "@/lib/errors";

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
        publishedAt: true,
      },
    });
    return NextResponse.json({ posts });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
