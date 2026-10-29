// ── Pishnam JSON-LD builders — PURE functions, no DOM access ──
// Route-ready (wave-0): today they feed <JsonLd/> inside the hash-router SPA;
// at deploy the exact same builders are injected by server components.
// NOTE the IRR ×10 trap: schema.org Offer.price must be in Rial while the
// whole UI talks Toman — the ×10 conversion lives HERE, inside the builder,
// so it can never be hand-faked or forgotten per page.

import { SITE } from "./site";
import { getProductSeo, type ProductSeoFaq } from "./product-catalog";

/** Toman → Rial (Iranian Rial = 10 Toman). Single source of the conversion. */
const TOMAN_TO_IRR = 10;
/** All boxes share one price (see BOX_PRICE in pishnam-data.ts) — 890,000 Toman. */
const BOX_PRICE_TOMAN = 890_000;

export function orgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.nameFa,
    url: SITE.url,
    logo: `${SITE.url}/logo.svg`,
    slogan: SITE.tagline,
    description: SITE.description,
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.nameFa,
    url: SITE.url,
    inLanguage: "fa-IR",
    description: SITE.description,
  };
}

export function productJsonLd(slug: string) {
  const p = getProductSeo(slug);
  if (!p) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.nameFa,
    description: p.description,
    brand: { "@type": "Brand", name: SITE.nameFa },
    category: "عروسک پولیشی",
    offers: {
      "@type": "Offer",
      // 890,000 Toman → "8900000" IRR (×10 happens here, on purpose).
      priceCurrency: "IRR",
      price: String(BOX_PRICE_TOMAN * TOMAN_TO_IRR),
      availability: "https://schema.org/InStock",
      // SEO-08 (audit wave 38): the REAL public URL is the query-param form
      // /product?slug=<slug> — the old /product/<slug> path never existed
      url: `${SITE.url}/product?slug=${encodeURIComponent(p.slug)}`,
    },
  };
}

export function faqJsonLd(faq: ProductSeoFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export interface BreadcrumbItem {
  name: string;
  /** Omit on the last (current) item — matches Google's breadcrumb guidance. */
  url?: string;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      ...(it.url ? { item: it.url } : {}),
    })),
  };
}

/** Serialize for <script type="application/ld+json">; `<` escaped for safety. */
export function toJsonLdScript(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

/* ── BlogPosting/Article builder (round 34-h, blog studio) ── */

export interface ArticleJsonLdInput {
  slug: string;
  headline: string;
  description?: string | null;
  /** Cover image URL (site-relative or absolute). */
  image?: string | null;
  datePublished?: string | null;
  dateModified?: string | null;
}

/** Minimal schema.org BlogPosting with «جعبه آبی» author/publisher Organization. */
export function articleJsonLd(input: ArticleJsonLdInput) {
  // SEO-10 (audit wave 38): clean /blog/<slug> URL — matches the 301 target
  // of the legacy /post?slug=… form and the sitemap entries
  const pageUrl = `${SITE.url}/blog/${encodeURIComponent(input.slug)}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.headline,
    ...(input.description ? { description: input.description } : {}),
    ...(input.image ? { image: input.image.startsWith("http") ? input.image : `${SITE.url}${input.image}` } : {}),
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
    author: { "@type": "Organization", name: "جعبه آبی", url: SITE.url },
    publisher: {
      "@type": "Organization",
      name: "جعبه آبی",
      url: SITE.url,
      slogan: "یکی دوستت داره",
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    inLanguage: "fa-IR",
  };
}
