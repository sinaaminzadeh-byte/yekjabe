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
      url: `${SITE.url}/product/${p.slug}`,
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
