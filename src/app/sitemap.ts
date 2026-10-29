// ── sitemap.xml for the single-shell SPA (rewritten — audit wave 37, SEO-05) ──
// Every URL matches the REAL address format produced by src/lib/hash-route.ts:
// the site moved from «#/» hashes to clean paths (src/proxy.ts rewrites every
// page path to the SPA shell), so a product lives at /product?slug=bear.
// Products + published blog posts come straight from the DB with their REAL
// updatedAt as lastmod (a per-crawl Date.now() is a false freshness signal);
// static pages use a fixed deploy date constant. /info/about, /info/contact
// (soft-404s) and the low-content /track page are gone. On any DB error the
// static entries are still served (never 500 the crawler).
// NOTE: src/proxy.ts excludes /sitemap.xml from its rewrite, so this route
// file is reached directly.
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo/site";

export const dynamic = "force-dynamic"; // posts/products change without a deploy

// تاریخ استقرار — با هر دیپلوی معنادار دستی به‌روز شود (به‌جای Date.now()
// در هر خزش که سیگنال تازگیِ دروغین به سرچ‌انجین می‌داد)
const DEPLOY_DATE = new Date("2026-10-29");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const statics: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, lastModified: DEPLOY_DATE, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/blog`, lastModified: DEPLOY_DATE, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE.url}/friends`, lastModified: DEPLOY_DATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/stories`, lastModified: DEPLOY_DATE, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE.url}/about`, lastModified: DEPLOY_DATE, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE.url}/contact`, lastModified: DEPLOY_DATE, changeFrequency: "yearly", priority: 0.5 },
  ];

  try {
    const { db } = await import("@/lib/db");
    const [products, posts] = await Promise.all([
      db.product.findMany({
        where: { isActive: true, kind: "main_gift" },
        orderBy: { updatedAt: "desc" },
        select: { slug: true, updatedAt: true },
      }),
      db.post.findMany({
        where: { published: true },
        orderBy: { publishedAt: "desc" },
        take: 500,
        select: { slug: true, updatedAt: true },
      }),
    ]);
    return [
      ...statics,
      // محصولات — همان آدرسی که navigate("product", { slug }) می‌سازد
      ...products.map((p) => ({
        url: `${SITE.url}/product?slug=${encodeURIComponent(p.slug)}`,
        lastModified: p.updatedAt ?? DEPLOY_DATE,
        changeFrequency: "weekly" as const,
        priority: 0.9,
      })),
      ...posts.map((p) => ({
        // SEO-10 (audit wave 38): آدرس تمیز /blog/<slug> — همان مقصد 301
        // قدیمیِ /post?slug=… (src/proxy.ts)
        url: `${SITE.url}/blog/${encodeURIComponent(p.slug)}`,
        lastModified: p.updatedAt ?? DEPLOY_DATE,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
    ];
  } catch {
    // DB hiccup → statics only (crawler still gets a valid sitemap)
    return statics;
  }
}
