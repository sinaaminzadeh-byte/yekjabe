// ── sitemap.xml for the hash-router SPA (round 34-h) ──
// Static screens + published blog posts straight from the DB. On any DB error
// the static entries are still served (never 500 the crawler).
// NOTE: src/proxy.ts excludes /sitemap.xml from its rewrite, so this route
// file is reached directly.
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo/site";

export const dynamic = "force-dynamic"; // posts change without a deploy

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const statics: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE.url}/friends`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/stories`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE.url}/info/about`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE.url}/info/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE.url}/track`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  try {
    const { db } = await import("@/lib/db");
    const posts = await db.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 500,
      select: { slug: true, updatedAt: true },
    });
    return [
      ...statics,
      ...posts.map((p) => ({
        url: `${SITE.url}/post?slug=${encodeURIComponent(p.slug)}`,
        lastModified: p.updatedAt ?? now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
    ];
  } catch {
    // DB hiccup → statics only (crawler still gets a valid sitemap)
    return statics;
  }
}
