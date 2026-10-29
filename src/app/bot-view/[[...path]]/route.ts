// ── /bot-view/[...path] — dynamic rendering for crawlers & social bots ──
// (audit wave 38 — A-01 + SEO-01/02/03/04/06/08/11)
// src/proxy.ts rewrites bot UAs here; this handler returns a COMPLETE static
// HTML document (meta + JSON-LD + visible content) rendered from the DB.
// Humans never see this route — their SPA shell is untouched (zero client
// bundle changes → zero regression risk).
//
// Safety rules:
//   • EVERY interpolated string passes escapeHtml() — titles, descriptions,
//     markdown content, alt texts (XSS-hard: no raw DB string reaches HTML).
//   • Route allowlist → indexable: /, /product?slug, /blog, /blog/<slug>,
//     /about, /contact, /friends, /stories. Everything else (admin, gift,
//     gift-view, verify, pay-*, success, my-gifts, track, checkout, pick,
//     card, extras, login, legal, reviews, shipping, mission, impact) gets
//     noindex,follow + a minimal neutral page. PRIVATE gift payloads/media
//     are NEVER rendered here.
//   • Unknown slug → HTTP 404 + noindex. DB error → HTTP 200 brand page
//     (never 500 the crawler).
import { db } from "@/lib/db";
import { SITE } from "@/lib/seo/site";
import { publicMediaUrl } from "@/lib/media";
import {
  orgJsonLd,
  webSiteJsonLd,
  articleJsonLd,
  breadcrumbJsonLd,
  toJsonLdScript,
  type BreadcrumbItem,
} from "@/lib/seo/jsonld";

export const dynamic = "force-dynamic"; // DB-backed — always rendered fresh

/* ═══════════ escaping helpers (XSS hard-stop) ═══════════ */

/** Escapes &, <, >, " and ' — the ONLY way a dynamic string enters the HTML. */
function escapeHtml(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Absolute site URL for a site-relative path (media/canonical/links). */
function abs(path: string): string {
  return path.startsWith("http") ? path : `${SITE.url}${path}`;
}

/** Absolute public URL for a storage key (products/posts/branding) or null. */
function mediaAbs(key: string | null | undefined): string | null {
  if (!key) return null;
  const rel = publicMediaUrl(key);
  return rel ? abs(rel) : null;
}

/** Trim to a sane meta length on one line (descriptions must not be endless). */
function metaTrim(s: string, max: number): string {
  const one = s.replace(/\s+/g, " ").trim();
  return one.length > max ? `${one.slice(0, max - 1)}…` : one;
}

const OG_DEFAULT = `${SITE.url}/og-default.jpg`;

/* ═══════════ tiny safe markdown renderer (bot HTML) ═══════════ */
// Same spec subset as the client's <MarkdownPro> (headings/paragraphs/links/
// images/lists/bold/italic/code) but string-based. Every text node is
// escaped; URL attributes are scheme-gated like md-pro.ts (http(s) or
// site-relative only — javascript:/data: never become hrefs).

function safeUrl(u: string): string | null {
  const t = u.trim();
  if (/^https?:\/\//i.test(t)) return t;
  if (/^\//.test(t) && !t.startsWith("//")) return abs(t);
  return null;
}

/** Inline pass: bold / italic / code / links / images on an ESCAPED source. */
function renderInline(raw: string): string {
  // 1) escape first — everything after operates on inert text
  let out = escapeHtml(raw);
  // 2) images ![alt](url "cap") — alt already escaped in pass 1; url is
  //    un-escaped back to raw, scheme-gated, then re-escaped into the attr
  out = out.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;([^&]*)&quot;)?\)/g, (_m, alt, url, cap) => {
    const safe = safeUrl(String(url).replace(/&amp;/g, "&"));
    if (!safe) return escapeHtml(String(alt));
    const caption = cap ? escapeHtml(String(cap)) : "";
    return `<img src="${escapeHtml(safe)}" alt="${alt}" loading="lazy"${caption ? ` title="${caption}"` : ""} />`;
  });
  // 3) links [text](url)
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, text, url) => {
    const safe = safeUrl(String(url).replace(/&amp;/g, "&"));
    if (!safe) return text; // not a URL → keep the label as plain text
    const external = /^https?:\/\//i.test(safe) && !safe.startsWith(SITE.url);
    return `<a href="${escapeHtml(safe)}"${external ? ' target="_blank" rel="noopener"' : ""}>${text}</a>`;
  });
  // 4) bold / italic / inline code
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\*([^*\n]+)\*/g, "<em>$1</em>");
  out = out.replace(/`([^`\n]+)`/g, "<code>$1</code>");
  return out;
}

/** Block pass: headings, paragraphs, lists, fenced code, hr. */
function renderMarkdown(md: string): string {
  const lines = (md ?? "").replace(/\r\n?/g, "\n").split("\n");
  const html: string[] = [];
  let para: string[] = [];
  let list: string[] | null = null;
  let fence: string[] | null = null;

  const flushPara = () => {
    if (para.length) {
      html.push(`<p>${renderInline(para.join(" "))}</p>`);
      para = [];
    }
  };
  const flushList = () => {
    if (list && list.length) html.push(`<ul>${list.map((li) => `<li>${renderInline(li)}</li>`).join("")}</ul>`);
    list = null;
  };

  for (const line of lines) {
    // fenced code block — content escaped verbatim, no inline parsing
    if (line.trim().startsWith("```")) {
      if (fence === null) {
        flushPara();
        flushList();
        fence = [];
      } else {
        html.push(`<pre><code>${escapeHtml(fence.join("\n"))}</code></pre>`);
        fence = null;
      }
      continue;
    }
    if (fence !== null) {
      fence.push(line);
      continue;
    }
    const t = line.trim();
    if (t === "") {
      flushPara();
      flushList();
      continue;
    }
    if (/^-{3,}$/.test(t)) {
      flushPara();
      flushList();
      html.push("<hr />");
      continue;
    }
    const h = t.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      flushPara();
      flushList();
      const level = Math.min(h[1].length + 1, 4); // body "#" renders as h2 — the post <h1> is the title
      html.push(`<h${level}>${renderInline(h[2])}</h${level}>`);
      continue;
    }
    const li = t.match(/^[-*]\s+(.*)$/);
    if (li) {
      flushPara();
      if (!list) list = [];
      list.push(li[1]);
      continue;
    }
    flushList();
    para.push(t);
  }
  flushPara();
  flushList();
  if (fence !== null && fence.length) html.push(`<pre><code>${escapeHtml(fence.join("\n"))}</code></pre>`);
  return html.join("\n");
}

/* ═══════════ HTML shell ═══════════ */

/** Minimal inline CSS — brand tokens (#00ABE7 sky / #04202E navy / #F2FAFD),
 * mobile-friendly, RTL. */
const BOT_CSS = `
*{box-sizing:border-box}
body{margin:0;background:#F2FAFD;color:#04202E;font-family:Vazirmatn,system-ui,-apple-system,"Segoe UI",sans-serif;line-height:1.9}
a{color:#00779F}
.wrap{max-width:760px;margin:0 auto;padding:24px 16px 48px}
header.brand{background:#04202E;color:#fff;padding:14px 16px}
header.brand a{color:#fff;text-decoration:none;font-weight:800;font-size:16px}
header.brand small{color:#8FC9DE;font-weight:600;margin-inline-start:8px}
h1{font-size:26px;line-height:1.6;margin:18px 0 8px}
h2{font-size:20px;margin:22px 0 8px}
h3{font-size:17px;margin:14px 0 6px}
.card{background:#fff;border:1px solid #DDEEF5;border-radius:16px;padding:16px;margin:12px 0;display:block;text-decoration:none;color:inherit}
.grid{display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(220px,1fr))}
.grid img{width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:12px;border:1px solid #DDEEF5;background:#E3F6FD}
.price{font-weight:800;color:#00779F;font-size:17px}
.chip{display:inline-block;background:#E3F6FD;color:#006387;border-radius:999px;padding:2px 10px;font-size:12px;font-weight:700;margin:2px}
.muted{color:#4A6572;font-size:13px}
img.cover{width:100%;border-radius:16px;border:1px solid #DDEEF5;object-fit:cover}
footer{margin-top:28px;border-top:1px solid #DDEEF5;padding-top:12px}
table.specs{width:100%;border-collapse:collapse}
table.specs td{border-bottom:1px solid #EDF6FA;padding:6px 4px;font-size:14px}
code{background:#E3F6FD;border-radius:6px;padding:1px 5px}
pre code{display:block;overflow-x:auto;padding:12px}
`;

/** Self-hosted Vazirmatn @font-face (same files the SPA loads from /fonts). */
const FONT_FACE = `<style>
@font-face{font-family:Vazirmatn;font-style:normal;font-weight:100 900;font-display:swap;src:url("/fonts/vazirmatn-arabic.woff2") format("woff2");unicode-range:U+0600-06FF,U+0750-077F,U+FB50-FDFF,U+FE70-FEFC}
@font-face{font-family:Vazirmatn;font-style:normal;font-weight:100 900;font-display:swap;src:url("/fonts/vazirmatn-latin-ext.woff2") format("woff2");unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AC,U+2113}
@font-face{font-family:Vazirmatn;font-style:normal;font-weight:100 900;font-display:swap;src:url("/fonts/vazirmatn-latin.woff2") format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+2000-206F,U+20AC,U+2122}
</style>`;

interface ShellInput {
  title: string;
  description: string;
  /** Site-relative canonical path, e.g. /blog/x — made absolute here. */
  canonical: string;
  ogType: "website" | "article" | "product";
  ogImage: string | null;
  robots: "index,follow" | "noindex,follow";
  jsonld: unknown[];
  bodyHtml: string;
  status?: number;
}

function shell(input: ShellInput): Response {
  const { title, description, canonical, ogType, ogImage, robots, jsonld, bodyHtml, status = 200 } = input;
  const url = abs(canonical);
  const ld = jsonld.map((obj) => `<script type="application/ld+json">${toJsonLdScript(obj)}</script>`).join("\n");
  const html = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}" />
<meta name="robots" content="${robots}" />
<link rel="canonical" href="${escapeHtml(url)}" />
<link rel="icon" href="/favicon.ico" sizes="any" />
<meta property="og:site_name" content="${escapeHtml(SITE.nameFa)}" />
<meta property="og:locale" content="${escapeHtml(SITE.locale)}" />
<meta property="og:type" content="${escapeHtml(ogType)}" />
<meta property="og:title" content="${escapeHtml(title)}" />
<meta property="og:description" content="${escapeHtml(description)}" />
<meta property="og:url" content="${escapeHtml(url)}" />
<meta property="og:image" content="${escapeHtml(ogImage || OG_DEFAULT)}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(title)}" />
<meta name="twitter:description" content="${escapeHtml(description)}" />
<meta name="twitter:image" content="${escapeHtml(ogImage || OG_DEFAULT)}" />
${FONT_FACE}
<style>${BOT_CSS}</style>
${ld}
</head>
<body>
<header class="brand"><a href="${escapeHtml(abs("/"))}">${escapeHtml(SITE.nameFa)}</a><small>${escapeHtml(SITE.tagline)}</small></header>
<div class="wrap">
${bodyHtml}
<footer>
<p class="muted"><a href="${escapeHtml(abs("/blog"))}">بلاگ</a> · <a href="${escapeHtml(abs("/about"))}">درباره ما</a> · <a href="${escapeHtml(abs("/contact"))}">تماس</a> · <a href="${escapeHtml(abs("/friends"))}">رفیق‌های پشمالو</a> · <a href="${escapeHtml(abs("/stories"))}">تجربه مخاطب‌ها</a></p>
<p class="muted">${escapeHtml(SITE.nameFa)} — ${escapeHtml(SITE.tagline)}</p>
</footer>
</div>
</body>
</html>`;
  return new Response(html, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      // short shared cache + stale-while-revalidate: fresh enough for a blog,
      // cheap enough for a crawl burst
      "cache-control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}

/* ═══════════ shared fragments ═══════════ */

const brandNav = `
<p><a href="${escapeHtml(abs("/"))}">خانه</a> · <a href="${escapeHtml(abs("/friends"))}">رفیق‌های پشمالو</a> · <a href="${escapeHtml(abs("/blog"))}">بلاگ</a> · <a href="${escapeHtml(abs("/stories"))}">تجربه مخاطب‌ها</a> · <a href="${escapeHtml(abs("/contact"))}">تماس با ما</a></p>`;

const crumbs = (items: BreadcrumbItem[]) => breadcrumbJsonLd(items);

/** Toman → IRR for schema.org Offer (the ×10 rule — same convention as jsonld.ts). */
const tomanToIrr = (t: number) => String(t * 10);
const tomanFa = (t: number) => `${t.toLocaleString("fa-IR")} تومان`;
const faDate = (d: Date) => new Intl.DateTimeFormat("fa-IR", { dateStyle: "long" }).format(d);

/* ═══════════ page renderers ═══════════ */

async function renderHome(): Promise<Response> {
  const [products, posts] = await Promise.all([
    db.product.findMany({
      where: { isActive: true, kind: "main_gift" },
      orderBy: { createdAt: "asc" },
      take: 12,
      select: {
        slug: true,
        name: true,
        description: true,
        imageKey: true,
        images: { orderBy: { sortOrder: "asc" }, take: 1, select: { key: true } },
      },
    }),
    db.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 6,
      select: { slug: true, title: true, publishedAt: true },
    }),
  ]);

  const cards = products
    .map((p) => {
      const img = mediaAbs(p.images[0]?.key ?? p.imageKey);
      const url = abs(`/product?slug=${encodeURIComponent(p.slug)}`);
      return `<a class="card" href="${escapeHtml(url)}">
${img ? `<img src="${escapeHtml(img)}" alt="${escapeHtml(p.name)}" loading="lazy" />` : ""}
<h3 style="margin:8px 0 2px">${escapeHtml(p.name)}</h3>
<p class="muted" style="margin:0">${escapeHtml(metaTrim(p.description, 90))}</p>
</a>`;
    })
    .join("\n");

  const postLinks = posts
    .map((p) => {
      const url = abs(`/blog/${encodeURIComponent(p.slug)}`);
      return `<li><a href="${escapeHtml(url)}">${escapeHtml(p.title)}</a>${p.publishedAt ? ` <span class="muted">— ${escapeHtml(faDate(p.publishedAt))}</span>` : ""}</li>`;
    })
    .join("\n");

  const body = `
<h1>${escapeHtml(`${SITE.nameFa} — ${SITE.tagline}`)}</h1>
<p>${escapeHtml(SITE.description)}</p>
${brandNav}
<h2>رفیق‌های پشمالو</h2>
<div class="grid">
${cards}
</div>
<h2>از بلاگ</h2>
<ul>
${postLinks || `<li class="muted">هنوز پستی منتشر نشده است.</li>`}
</ul>`;

  return shell({
    title: `${SITE.nameFa} — ${SITE.tagline}`,
    description: SITE.description,
    canonical: "/",
    ogType: "website",
    ogImage: OG_DEFAULT,
    robots: "index,follow",
    jsonld: [orgJsonLd(), webSiteJsonLd()],
    bodyHtml: body,
  });
}

async function renderProduct(slug: string): Promise<Response> {
  const product = await db.product.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { sortOrder: "asc" }, take: 6, select: { key: true, alt: true } },
      variants: { where: { isActive: true }, select: { priceToman: true }, orderBy: { priceToman: "asc" } },
    },
  });
  // unknown, inactive or non-gift slugs → honest 404 (never index junk)
  if (!product || !product.isActive || product.kind !== "main_gift") {
    return renderNotFound("محصولی با این آدرس پیدا نشد");
  }

  const priceToman = product.variants[0]?.priceToman ?? 0;
  const pageUrl = abs(`/product?slug=${encodeURIComponent(product.slug)}`);
  const cover = mediaAbs(product.images[0]?.key ?? product.imageKey);
  const colors = product.colors.split(/[،,]/).map((c) => c.trim()).filter(Boolean);
  let specs: { label: string; value: string }[] = [];
  try {
    const arr: unknown = JSON.parse(product.specs);
    if (Array.isArray(arr)) {
      specs = arr
        .filter((s): s is { label: string; value: string } =>
          typeof (s as { label?: unknown })?.label === "string" && typeof (s as { value?: unknown })?.value === "string")
        .slice(0, 12)
        .map((s) => ({ label: s.label, value: s.value }));
    }
  } catch {
    specs = [];
  }

  const description = metaTrim(
    product.description || `${product.name} — جعبه هدیه عروسک پولیشی ${SITE.nameFa} با پیام صوتی و کارت پستال QR.`,
    160,
  );
  const gallery = product.images.length
    ? product.images
        .map((im) => {
          const u = mediaAbs(im.key);
          return u ? `<img class="cover" src="${escapeHtml(u)}" alt="${escapeHtml(im.alt || product.name)}" loading="lazy" />` : "";
        })
        .filter(Boolean)
        .join("\n")
    : cover
      ? `<img class="cover" src="${escapeHtml(cover)}" alt="${escapeHtml(product.name)}" />`
      : "";

  const body = `
<p class="muted"><a href="${escapeHtml(abs("/"))}">خانه</a> ‹ <a href="${escapeHtml(abs("/friends"))}">رفیق‌های پشمالو</a></p>
${gallery}
<h1>${escapeHtml(product.name)}</h1>
<p class="price">${escapeHtml(tomanFa(priceToman))}</p>
${product.sizeLabel ? `<p><span class="chip">${escapeHtml(product.sizeLabel)}</span></p>` : ""}
<p>${escapeHtml(product.description)}</p>
${colors.length ? `<p>${colors.map((c) => `<span class="chip">${escapeHtml(c)}</span>`).join("")}</p>` : ""}
${specs.length ? `<h2>مشخصات</h2><table class="specs">${specs.map((s) => `<tr><td>${escapeHtml(s.label)}</td><td>${escapeHtml(s.value)}</td></tr>`).join("")}</table>` : ""}
<p><a href="${escapeHtml(pageUrl)}">سفارش ${escapeHtml(product.name)} در ${escapeHtml(SITE.nameFa)}</a></p>`;

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description,
    ...(cover ? { image: [cover] } : {}),
    brand: { "@type": "Brand", name: SITE.nameFa },
    category: "عروسک پولیشی",
    offers: {
      "@type": "Offer",
      priceCurrency: "IRR",
      price: tomanToIrr(priceToman),
      availability: priceToman > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: pageUrl,
    },
  };

  return shell({
    title: SITE.titleTemplate.replace("%s", product.name),
    description,
    canonical: `/product?slug=${encodeURIComponent(product.slug)}`,
    ogType: "product",
    ogImage: cover,
    robots: "index,follow",
    jsonld: [
      productLd,
      crumbs([
        { name: "خانه", url: abs("/") },
        { name: "رفیق‌های پشمالو", url: abs("/friends") },
        { name: product.name },
      ]),
    ],
    bodyHtml: body,
  });
}

async function renderBlogIndex(): Promise<Response> {
  const posts = await db.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: 50,
    select: { slug: true, title: true, excerpt: true, tags: true, coverKey: true, publishedAt: true },
  });

  const cards = posts
    .map((p) => {
      const img = mediaAbs(p.coverKey);
      const url = abs(`/blog/${encodeURIComponent(p.slug)}`);
      const tags = p.tags.split(/[،,]/).map((t) => t.trim()).filter(Boolean).slice(0, 3);
      return `<a class="card" href="${escapeHtml(url)}">
${img ? `<img src="${escapeHtml(img)}" alt="${escapeHtml(p.title)}" loading="lazy" />` : ""}
<h3 style="margin:8px 0 2px">${escapeHtml(p.title)}</h3>
${p.publishedAt ? `<p class="muted" style="margin:0">${escapeHtml(faDate(p.publishedAt))}</p>` : ""}
<p style="margin:4px 0 0">${escapeHtml(metaTrim(p.excerpt, 140))}</p>
${tags.length ? `<p>${tags.map((t) => `<span class="chip">${escapeHtml(t)}</span>`).join("")}</p>` : ""}
</a>`;
    })
    .join("\n");

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `بلاگ ${SITE.nameFa}`,
    itemListElement: posts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: abs(`/blog/${encodeURIComponent(p.slug)}`),
      name: p.title,
    })),
  };

  return shell({
    title: SITE.titleTemplate.replace("%s", "بلاگ جعبه آبی"),
    description: "ایده‌های هدیه دادن، راهنمای عروسک پولیشی و قصه‌های پشمالوی جعبه آبی — متن‌های کوتاه و گرم برای بهانه‌های قشنگ.",
    canonical: "/blog",
    ogType: "website",
    ogImage: OG_DEFAULT,
    robots: "index,follow",
    jsonld: [itemList],
    bodyHtml: `
<h1>بلاگ ${escapeHtml(SITE.nameFa)}</h1>
<p>ایده‌های هدیه، راهنمای بهانه‌گیری و چیزهایی که درباره‌ی جعبه‌های آبی و عروسک‌های پولیشی دوست داریم باهات در میون بذاریم.</p>
${posts.length ? `<div class="grid">${cards}</div>` : `<p class="muted">هنوز پستی منتشر نشده است.</p>`}`,
  });
}

async function renderPost(slug: string): Promise<Response> {
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
  if (!post || !post.published) return renderNotFound("پستی با این آدرس پیدا نشد");

  const cover = mediaAbs(post.coverKey);
  const tags = post.tags.split(/[،,]/).map((t) => t.trim()).filter(Boolean).slice(0, 4);
  const description = metaTrim(post.metaDescription || post.excerpt || post.title, 160);

  const body = `
<p class="muted"><a href="${escapeHtml(abs("/"))}">خانه</a> ‹ <a href="${escapeHtml(abs("/blog"))}">بلاگ</a></p>
${cover ? `<img class="cover" src="${escapeHtml(cover)}" alt="${escapeHtml(post.title)}" />` : ""}
<h1>${escapeHtml(post.title)}</h1>
${post.publishedAt ? `<p class="muted">${escapeHtml(faDate(post.publishedAt))}</p>` : ""}
${tags.length ? `<p>${tags.map((t) => `<span class="chip">${escapeHtml(t)}</span>`).join("")}</p>` : ""}
<article>
${renderMarkdown(post.content ?? "")}
</article>`;

  return shell({
    title: SITE.titleTemplate.replace("%s", post.metaTitle || post.title),
    description,
    canonical: `/blog/${encodeURIComponent(post.slug)}`,
    ogType: "article",
    ogImage: cover,
    robots: "index,follow",
    jsonld: [
      articleJsonLd({
        slug: post.slug,
        headline: post.metaTitle || post.title,
        description,
        image: cover,
        datePublished: post.publishedAt?.toISOString() ?? null,
        dateModified: (post.updatedAt ?? post.publishedAt)?.toISOString() ?? null,
      }),
      crumbs([
        { name: "خانه", url: abs("/") },
        { name: "بلاگ", url: abs("/blog") },
        { name: post.title },
      ]),
    ],
    bodyHtml: body,
  });
}

/* ── static info pages (short brand copy + links; the SPA holds the full UI) ── */

const INFO_PAGES: Record<string, { title: string; description: string; body: string }> = {
  about: {
    title: "درباره ما",
    description: `درباره ${SITE.nameFa}؛ جعبه هدیه عروسک پولیشی با پیام صوتی و کارت پستال QR که مستقیم به در خانه‌ی گیرنده ارسال می‌شود.`,
    body: `<p>«${escapeHtml(SITE.nameFa)}» یه جعبه‌ی آبی‌رنگه که یه دوست پشمالو، یه کارت پستال با QR و پیام صوتی توش گذاشتیم و مستقیم به در خانه‌ی کسی که دوستش داری می‌فرستیم. شعار ما ساده است: ${escapeHtml(SITE.tagline)}.</p>`,
  },
  contact: {
    title: "تماس با ما",
    description: `راه‌های ارتباط با ${SITE.nameFa} — سؤال درباره‌ی سفارش، ارسال یا هدیه؟ برامون بنویس.`,
    body: `<p>برای سؤال‌های سفارش، ارسال و همکاری از فرم تماس استفاده کن؛ پیامت مستقیم به صندوق پشتیبانی می‌ره و در ساعات کاری جواب می‌گیری.</p>`,
  },
  friends: {
    title: "رفیق‌های پشمالو",
    description: `آشنایی با رفیق‌های پشمالوی ${SITE.nameFa} — خرس، خرگوش، گربه، پاندا، گوسفند و اردک؛ هر کدوم با یه شخصیت گرم.`,
    body: `<p>شش رفیق پشمالو منتظرن: کِرِمی خرس، لپ‌قندی خرگوش، میشی گربه، بامبو پاندا، ابری گوسفند و قات‌قات اردک. هر کدوم توی یه جعبه‌ی آبی با پیام تو به دست دوستت می‌رسن.</p>`,
  },
  stories: {
    title: "تجربه مخاطب‌ها",
    description: `قصه‌های واقعی کسانی که ${SITE.nameFa} فرستادند یا گرفتن — تجربه‌های گرم هدیه دادن.`,
    body: `<p>اینجا تجربه‌ی کسانیه که جعبه‌ی آبی فرستادند یا گرفتن — با اجازه‌ی خودشون و بعد از تأیید تیم ما منتشر می‌شه.</p>`,
  },
};

function renderInfo(path: string): Response {
  const page = INFO_PAGES[path];
  return shell({
    title: SITE.titleTemplate.replace("%s", page.title),
    description: page.description,
    canonical: `/${path}`,
    ogType: "website",
    ogImage: OG_DEFAULT,
    robots: "index,follow",
    jsonld: [],
    bodyHtml: `<h1>${escapeHtml(page.title)}</h1>\n${page.body}\n${brandNav}`,
  });
}

/* ── neutral noindex page for private/utility routes ── */

function renderPrivate(path: string): Response {
  return shell({
    title: SITE.titleTemplate.replace("%s", "صفحه‌ی اختصاصی"),
    description: "این صفحه برای موتورهای جستجو بسته است.",
    canonical: `/${path}`,
    ogType: "website",
    ogImage: OG_DEFAULT,
    robots: "noindex,follow",
    jsonld: [],
    bodyHtml: `<h1>این صفحه عمومی نیست</h1>
<p class="muted">این بخش مخصوص کاربران اپ است و در نتایج جستجو نمایش داده نمی‌شود.</p>
<p><a href="${escapeHtml(abs("/"))}">بازگشت به خانه</a></p>`,
  });
}

/** Unknown slug → 404 + noindex (honest signal, no soft-404). */
function renderNotFound(message: string): Response {
  return shell({
    title: SITE.titleTemplate.replace("%s", "پیدا نشد"),
    description: "صفحه‌ای که دنبالش بودی پیدا نشد.",
    canonical: "/",
    ogType: "website",
    ogImage: OG_DEFAULT,
    robots: "noindex,follow",
    jsonld: [],
    status: 404,
    bodyHtml: `<h1>پیدا نشد (۴۰۴)</h1>
<p>${escapeHtml(message)}</p>
<p><a href="${escapeHtml(abs("/"))}">بازگشت به خانه</a> · <a href="${escapeHtml(abs("/blog"))}">بلاگ</a></p>`,
  });
}

/** DB hiccup → 200 brand page (never 500 the crawler). */
function renderError(): Response {
  return shell({
    title: `${SITE.nameFa} — ${SITE.tagline}`,
    description: SITE.description,
    canonical: "/",
    ogType: "website",
    ogImage: OG_DEFAULT,
    robots: "noindex,follow",
    jsonld: [],
    bodyHtml: `<h1>${escapeHtml(SITE.nameFa)}</h1>
<p>یه لحظه صبر کن و دوباره سر بزن — داریم صفحه رو آماده می‌کنیم.</p>
<p><a href="${escapeHtml(abs("/"))}">خانه</a> · <a href="${escapeHtml(abs("/blog"))}">بلاگ</a></p>`,
  });
}

/* ═══════════ route resolution ═══════════ */

const INDEXABLE_STATIC = new Set(["about", "contact", "friends", "stories"]);

export async function GET(req: Request, { params }: { params: Promise<{ path?: string[] }> }) {
  const { path = [] } = await params;
  const segs = path.filter((s) => s.length > 0).map((s) => {
    try {
      return decodeURIComponent(s);
    } catch {
      return s;
    }
  });
  const url = new URL(req.url);

  try {
    // home
    if (segs.length === 0) return await renderHome();
    const [head, second] = segs;

    // product — the SPA's real product URL keeps its query-param form
    if (head === "product") {
      const slug = (url.searchParams.get("slug") ?? "").trim().slice(0, 80);
      if (!slug) return renderNotFound("اسلاگ محصول مشخص نیست");
      return await renderProduct(slug);
    }

    // blog index / post — clean /blog/<slug> form (SEO-10)
    if (head === "blog") {
      if (!second) return await renderBlogIndex();
      const slug = second.split("/")[0].trim().slice(0, 80);
      if (!slug) return await renderBlogIndex();
      return await renderPost(slug);
    }

    if (INDEXABLE_STATIC.has(head) && !second) return renderInfo(head);

    // everything else (admin, gift, gift-view, verify, pay-*, success,
    // my-gifts, track, checkout, pick, card, extras, login, legal, reviews,
    // shipping, mission, impact, …) → neutral noindex — NO private payload
    return renderPrivate(head);
  } catch (e) {
    console.error("[bot-view] render failed:", e);
    return renderError();
  }
}
