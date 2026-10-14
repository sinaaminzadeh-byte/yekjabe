# 13-f — SEO & Content Architecture for پیشنام (Pishnam)

Agent: seo-content-architect · Round 13-f · Research/design only — **no source code modified**.
Inputs: worklog.md (Tasks 1–13, especially 13-b SEO audit, 13-c critic, 13 orchestrator), docs/architecture-answers.json (46 binding owner answers), src/lib/pishnam-data.ts, src/components/shop/screens/{home,info,gift-experience}.tsx, public/robots.txt, src/lib/hash-route.ts, src/app/layout.tsx.

**Locked constraints honored (not re-opened):**
- Wave-0 route-ready modules NOW in sandbox (only "/" previewable); real App Router routes land at the deploy wave.
- fa-only site; SEO = core growth pillar; keywords researched by us, **no heavy/competitive heads**; writer = owner, 2–4 posts/mo; content order = **product pages + تجربه مخاطب first, blog after**; UGC = public form + weekly owner approval, no incentive; personalization = printed card + **voice note (differentiator)**; carriers پست/تیپاکس/ماهکس, promise 2–4 days; legal = privacy/terms/refund (refund = damage-only for personalized gifts); support تلگرام+واتساپ; KPI = conversion + NPS; self-hosted analytics; Iran VPS 2c/2G.

**Brand note:** layout.tsx still says «پیشتم»; all strings below use «پیشنام» per the owner's questionnaire. A one-sweep rename of brand strings (layout title, copy constants, review card «ممنون از پیشتم») must precede wave-1 (see §9).

**Domain note:** owner answered «هنوز نه» for domain registration. This doc locks the canonical to `https://pishnam.ir` as a placeholder; `metadataBase` lives in one constant (`src/lib/seo/site.ts`) so a late domain change is a 1-line edit.

---

## 1. ROUTE MAP

Waves: **0** = route-ready module extractable/testable in sandbox behind the hash router today · **1** = deploy launch (real route live) · **2** = phase-2 polish.
Priorities: P0 = build first (drives conversion/content-first per owner answers) → P3 = utility.

| Old hash screen | New route | Rendering | Index? | SEO priority | Wave |
|---|---|---|---|---|---|
| `#/` (home) | `/` | SSG (revalidate 3600 — charity stats refresh hourly) | **index** | **P0** | 0 (sections + JSON-LD builders) → 1 |
| — (plush cards only, no detail page exists today) | `/product/[slug]` ×12 | SSG + ISR 300 (availability hydrated client-side) | **index** | **P0** | 0 (catalog data + detail module) → 1 |
| `#/pick` `#/card` `#/extras` `#/checkout` `#/success` | `/build` — ONE client-side flow, steps as internal state (`?step=` cosmetic only) | CSR | **noindex** | — | 0 (none — already client) → 1 (collapse 5 hashes into 1 route) |
| `#/gift?no=…` | `/g/[no]` | **SSR (dynamic)** — must be server-rendered to emit OG tags | **noindex + Persian OG card** (the viral loop) | P1 | 1 (needs server render; nothing previewable in sandbox) |
| `#/track` | `/track` | CSR | noindex | P3 | 1 |
| `#/login` | `/login` | CSR | noindex | P3 | 1 |
| `#/my-gifts` | `/my-gifts` | CSR | noindex | P3 | 1 |
| — (new UGC surface) | `/stories` | ISR 600 | **index** | **P0** (content order: تجربه مخاطب first) | 0 (StoryCard/StoryForm presentational) → 1 |
| — | `/stories/[slug]` | ISR 600 | **index** (published only; unpublished never gets a URL — see §6) | **P0** | 0 → 1 |
| — (new) | `/blog` | ISR 600 | index | P1 (after products+stories per answers) | 0 (Markdown renderer) → 1 |
| — | `/blog/[slug]` | ISR 600 | index | P1 | 0 → 1 |
| `#/about` | `/about` | SSG | index | P1 | 0 (extract from info.tsx) → 1 |
| `#/mission` | `/mission` | SSG | index | P2 | 0 → 1 |
| `#/impact` | `/impact` | SSG + ISR 3600 | index | P2 (charity ledger = trust/E-E-A-T content) | 0 → 1 |
| `#/reviews` | `/reviews` | ISR 600 | index | P1 | 0 → 1 |
| `#/shipping` | `/shipping` | SSG | index | P1 (2–4-day promise + carriers = transactional trust) | 0 → 1 |
| `#/contact` | `/contact` | SSG + small client form island | index | P2 | 0 → 1 |
| — | `/legal/privacy` `/legal/terms` `/legal/refund` | SSG | index | **P1 (اینماد/e-Namad launch gate; refund = damage-only policy)** | 1 (owner writes the copy; templates + metadata ready) |
| `#/admin` | `/admin` | CSR behind real auth (replaces demo PIN) | **noindex + robots.txt Disallow** | — | 1 |
| — | `not-found.tsx` (404 — Persian, with links home/products) | static | n/a | P2 | 1 |
| — | `error.tsx` + `global-error.tsx` (500) | static | n/a | P2 | 1 |
| — | `app/sitemap.ts` + `app/robots.ts` | static route handlers | — | **P0 at deploy** | 1 |
| any `#/…` legacy links | hash shim in deploy `page.tsx` (client `history.replaceState` → real path; see §7) | client redirect | — | — | 1 (delete at wave 2) |

**Wave 2 backlog:** dynamic per-product OG images (`opengraph-image.tsx` + ImageResponse), seasonal landing pages beyond the two blog posts, category pages if catalog grows, print-friendly gift-certificate page.

### Key routing rules (traps documented for the critic)

1. **Hash fragments never reach the server** → there is nothing to 301. The deploy shim in `page.tsx` translates old shared `#/gift?no=123` links to `/g/123` client-side; after 90 days delete the shim.
2. **noindex ≠ robots.txt Disallow.** `/g/[no]` must carry `<meta name="robots" content="noindex, follow">` but must **NOT** be blocked in robots.txt — WhatsApp/Telegram/Twitter link previews fetch via `WhatsAppbot`/`facebookexternalhit`/`Twitterbot`, and a blocked URL returns a dead preview card, killing the viral loop. Only `/admin`, `/api/*`, `/build` go into robots.txt Disallow.
3. `/build` stays **one** client route (not 5) so checkout steps never leak into the index as thin duplicate URLs; `?step=` params are cosmetic and also blocked via canonical to `/build`.
4. `/stories/[slug]` and `/blog/[slug]` render **published rows only**; drafts have no URL at all (no `?preview=1` indexable leak; owner preview = admin-only session read of the editor pane).

---

## 2. METADATA PLAN

All in one shared module (`src/lib/seo/metadata.ts` + `src/lib/seo/site.ts`) so hash-era screens (via a tiny `useDocumentMeta` client hook that sets `document.title` + meta description + JSON-LD today) and deploy-wave `generateMetadata` read the **same** definitions.

### Root defaults (app/layout.tsx at deploy)

```ts
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),            // https://pishnam.ir — 1-line swap when domain confirmed
  title: {
    default: "پیشنام — جعبه هدیه عروسک پولیشی با پیام صوتی و کارت چاپی",
    template: "%s | پیشنام — جعبه هدیه عروسک پولیشی",
  },
  description: "جعبه هدیه عروسک پولیشی با کارت چاپی و پیام صوتی؛ عروسکت رو انتخاب کن، پیامت رو بنویس، ما در ۲ تا ۴ روز کاری به سراسر ایران می‌فرستیم.",
  openGraph: {
    type: "website", locale: "fa_IR", siteName: "پیشنام",
    images: [{ url: "/og/pishnam-og-default.png", width: 1200, height: 630, alt: "پیشنام — یه بغل، تو یه جعبه" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  alternates: { canonical: "./" },            // per-page override below
};
```

Title budget: the template suffix « | پیشنام — جعبه هدیه عروسک پولیشی» ≈ 31 Persian chars → keep the `%s` part ≤ 35 chars.

### Per-page metadata patterns

| Route | Title (`%s`) | Description pattern (Persian) |
|---|---|---|
| `/` | *(absolute, not templated)* «پیشنام — جعبه هدیه عروسک پولیشی با پیام صوتی و کارت چاپی» | «یه دوست پشمالو با کارت پستال رمزدار و پیام صوتی هدیه بده؛ ارسال ناشناس هم ممکنه، ۲ تا ۴ روز کاری به سراسر ایران.» |
| `/product/[slug]` | «کِرِمی خرس پولیشی — سایز بزرگ» (display name) | «{blurb} جعبه هدیه با کارت چاپی و پیام صوتی، {price} تومان، ارسال ۲ تا ۴ روز کاری به سراسر ایران.» |
| `/build` | «ساخت جعبه هدیه» | — (noindex; canonical → `/build`) |
| `/g/[no]` | «یه بغل برات رسید 🧸» | OG: title «یه بغل برات رسید | پیشنام», description «جعبه‌ی هدیه‌ی پیشنام با شماره‌ی G-{no} — رمز کارت رو بزن و پیامت رو ببین.» **Privacy rule: OG card NEVER contains the gift message, photo, or voice note — only gift number + brand + default OG image.** |
| `/stories` | «تجربه‌های مخاطب» | «داستان واقعی جعبه‌هایی که رسیدن؛ تجربه‌ی فرستنده‌ها و گیرنده‌های پیشنام رو بخون.» |
| `/stories/[slug]` | «{name} از {city}: {occasion}» | «{excerpt} — یه تجربه‌ی واقعی از پیشنام.» |
| `/blog` | «بلاگ پیشنام» | «ایده‌ی هدیه، راهنمای خرید عروسک پولیشی و روانشناسی هدیه دادن — هر ماه تازه.» |
| `/blog/[slug]` | «{post title}» | «{excerpt}» |
| `/about` | «درباره پیشنام» | «یه دوست پشمالو، یه قلب بزرگ؛ قصه‌ی پیشنام از ۱۴۰۱ تا امروز.» |
| `/mission` | «ماموریت ما» | «مهربونی وزن نداره؛ چرا همه‌ی جعبه‌ها یه قیمتن و پول قلب و پنجه‌ها کجا می‌ره.» |
| `/impact` | «دفتر مهربونی» | «رسید شفاف هدیه‌ها به بچه‌های بی‌سرپرست و پناهگاه حیوونا.» |
| `/reviews` | «نظرها» | «نظر واقعی فرستنده‌ها و گیرنده‌های جعبه‌ی هدیه‌ی پیشنام.» |
| `/shipping` | «ارسال و بازگشت» | «زمان و هزینه‌ی ارسال با پست، تیپاکس و ماهکس؛ ۲ تا ۴ روز کاری به سراسر ایران؛ شرایط مرجوعی.» |
| `/contact` | «تماس با ما» | «از تلگرام و واتساپ بهمون پیام بده یا فرم تماس رو پر کن.» |
| `/legal/privacy` | «حریم خصوصی» | «چه داده‌ای جمع می‌کنیم، کجا نگهش می‌داریم (داخل ایران) و چطور حذفش می‌کنی.» |
| `/legal/terms` | «قوانین و مقررات» | «شرایط خرید و استفاده از پیشنام.» |
| `/legal/refund` | «شرایط مرجوعی» | «مرجوعی در صورت آسیب یا اشتباه در ارسال؛ شرایط ویژه‌ی هدیه‌های شخصی‌سازی‌شده.» |
| noindex set (`/build`,`/track`,`/login`,`/my-gifts`,`/admin`) | utilitarian titles | `robots: { index: false, follow: false }`, **no JSON-LD, no OG** (except `/g`) |

Every indexable page gets `alternates.canonical` = its own clean URL (no query params). `og:locale: fa_IR` on everything; `og:type`: `website` (home/info), `product` (product), `article` (blog/story). Twitter cards = `summary_large_image` everywhere.

### JSON-LD plan (builders in `src/lib/seo/jsonld.tsx` — rendered via one `<JsonLd data={…}/>` component emitting a single `<script type="application/ld+json">`)

| Page | Schema | Notes |
|---|---|---|
| `/` | `Organization` + `WebSite` | Organization: name «پیشنام», url, logo, sameAs (Telegram/WhatsApp/Instagram when live), contactPoint. WebSite: name + url. |
| `/` | `FAQPage` | Exactly the 4 visible `DESKTOP_FAQ` items (مثلاً «دوستم می‌فهمه کی فرستاده؟»). Rule: FAQ JSON-LD only for Q&A visible on the page. |
| `/product/[slug]` | `Product` + `Offer` + `BreadcrumbList` | See the IRR trap below. `BreadcrumbList`: خانه → عروسک‌ها → {display name}. |
| `/product/[slug]` | `AggregateRating` | **GATED: only when ≥5 REAL DB reviews exist for that product.** The «۳۱۸ نظر» marketing seed is a placeholder and must NEVER enter structured data (fabricated ratings = manual-action risk). |
| `/blog/[slug]`, `/stories/[slug]` | `Article` + `BreadcrumbList` | headline, datePublished/dateModified, image (og image), author: Organization «پیشنام» (blog) / Person «{first name} از {city}» (story, per consent). |
| noindex pages | **none** | No structured data on noindex URLs — contradictory signals waste crawl budget and invite spam classification. |

**THE تومان → IRR ×10 TRAP (must-encode-exactly):** Schema.org `priceCurrency` expects ISO 4217. Iran's code is **IRR (ریال)**; «تومان» has **no official ISO code** (`IRT`/`TOMAN` are not recognized). Persian commerce displays تومان but 1 تومان = 10 ریال, so encoding `price: "890000"` + `priceCurrency: "IRR"` silently reprices the box at **89,000 تومان** everywhere Google renders prices. The only correct encoding today:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "کِرِمی خرس پولیشی — سایز بزرگ",
  "sku": "bear-l",
  "brand": { "@type": "Brand", "name": "پیشنام" },
  "description": "کِرِمی برای روزای دلتنگی ساخته شده؛ یه بغل گرم که هیچ‌وقت خسته نمی‌شه.",
  "image": "https://pishnam.ir/og/products/bear-l.png",
  "offers": {
    "@type": "Offer",
    "url": "https://pishnam.ir/product/bear-l",
    "priceCurrency": "IRR",
    "price": "8900000",
    "priceValidUntil": "2026-12-31",
    "itemCondition": "https://schema.org/NewCondition",
    "availability": "https://schema.org/InStock",
    "shippingDetails": { "@type": "OfferShippingDetails", "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "IR" }, "deliveryTime": { "@type": "ShippingDeliveryTime", "handlingTime": { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 2, "unitCode": "DAY" }, "transitTime": { "@type": "QuantitativeValue", "minValue": 2, "maxValue": 4, "unitCode": "DAY" } } }
  }
}
```

Rule: **price = تومان × 10, currency = IRR, always, no exceptions.** Display stays «۸۹۰٬۰۰۰ تومان». The builder in `jsonld.tsx` takes تومان integers and does the ×10 internally so this can never be hand-faked wrong. If sizes get different prices later, the catalog is the single price source. Revisit only if Google ever documents `TOMAN` officially.

---

## 3. SLUG STRATEGY

**Decision: latin-transliterated slugs (recommended) over raw Persian URLs.**

Why (against the plausible alternative):
1. **Share comfort:** the viral loop runs through WhatsApp/Telegram — raw Persian slugs percent-encode into `%D8%B9%D8%B1%D9%88%D8%B3%DA%A9…` monsters that break line-wrapping in chat shares, spreadsheet exports, and log/CRM tooling.
2. **Iran-hosting/CDN comfort:** Arvan rules, nginx logs, backup tooling and the owner's (non-technical) copy-paste workflows are all more predictable with pure-ASCII paths; unicode-normalization bugs (ی/ي, ک/ك variants) disappear entirely.
3. **Owner workflow:** the admin editor just needs a short ascii slug field; no keyboard switching, no RTL/LTR cursor pain.
4. **SEO cost ≈ zero:** the keyword lives in the Persian `<title>`, H1, and content (Google's URL-keyword weight is negligible); transliterated keyword slugs still carry partial signal (e.g. `/blog/valentine`).
Caveat recorded: Persian slugs are fine for Google too, so this is an operational choice, not an SEO sacrifice.

**Rule: slugs are immutable forever.** A slug never gets reused or edited post-publish (rename = new page + 301).

### The 12 product slugs (6 families × sizes S/L)

Family keys reuse the existing `PlushKind` values in code (`bear | bunny | cat | duck | panda | sheep`), so slug ↔ data is 1:1. Pattern: `/product/{kind}-{s|l}`.

| Slug | Persian display name (H1/title) |
|---|---|
| `/product/bear-s` | کِرِمی خرس پولیشی — سایز کوچک |
| `/product/bear-l` | کِرِمی خرس پولیشی — سایز بزرگ |
| `/product/bunny-s` | لپ‌قندی خرگوش پولیشی — سایز کوچک |
| `/product/bunny-l` | لپ‌قندی خرگوش پولیشی — سایز بزرگ |
| `/product/cat-s` | میشی گربه پولیشی — سایز کوچک |
| `/product/cat-l` | میشی گربه پولیشی — سایز بزرگ |
| `/product/duck-s` | قات‌قات اردک پولیشی — سایز کوچک |
| `/product/duck-l` | قات‌قات اردک پولیشی — سایز بزرگ |
| `/product/panda-s` | بامبو پاندا پولیشی — سایز کوچک |
| `/product/panda-l` | بامبو پاندا پولیشی — سایز بزرگ |
| `/product/sheep-s` | ابری گوسفند پولیشی — سایز کوچک |
| `/product/sheep-l` | ابری گوسفند پولیشی — سایز بزرگ |

(Accepted trade-off: brand names like «کِرِمی» don't transliterate into the slug; the species word does the semantic work, the brand name lives in H1/description.)

### Blog & story slug patterns

- Blog: `/blog/{2-5-transliterated-words}` matching the target keyword — e.g. `/blog/hediye-tavalod-behtarin-dost-dokhtar`, `/blog/valentine`, `/blog/matn-kart-hediye`. No dates, no IDs, no `_`.
- Story: `/stories/{first-name}-{city?}-{occasion}` — e.g. `/stories/niloofar-tehran-tavalod`, `/stories/ali-rasht-getwell`. Collision → `-2` suffix (weekly moderation makes this rare). Only first name + city, never phone/message content.

---

## 4. KEYWORD MAP (~20 low-competition long-tail Persian keywords)

Owner constraint: avoid heavy heads for now. **Avoid list (revisit at wave-2 with domain authority):** «خرید عروسک پولیشی», «عروسک پولیشی», «هدیه تولد», «خرید اینترنتی عروسک» — dominated by large toy e-shops; we lose on DR and crawl depth for years.

Priority rule from answers: **P0 = product-page + differentiator keywords first, P1 = blog commercial + seasonal, P2 = informational.**

| # | کلیدواژه (Persian) | Intent | Target URL | Content type | Priority | Why it's winnable |
|---|---|---|---|---|---|---|
| 1 | جعبه هدیه عروسک پولیشی | commercial | `/` + all 12 product pages | hub + SKUs | **P0** | No strong exact-match page ranks for it in Iran; a cluster of 12 SKU pages + home hub matches intent precisely |
| 2 | عروسک با پیام صوتی | commercial (differentiator) | `/` | feature section + FAQ | **P0** | Near-zero SERP competition; we literally own the feature (voice note) |
| 3 | عروسک هدیه با کارت چاپی | commercial | `/product/*` + `/` | product copy | **P0** | Long-tail, no dedicated competitor page |
| 4 | هدیه تولد بهترین دوست دختر | commercial | `/blog/hediye-tavalod-behtarin-dost-dokhtar` | pillar listicle (12 ideas w/ prices) | P1 | High intent, weak blog competition; funnels straight to builder |
| 5 | هدیه تولد خواهر | commercial | `/blog/hediye-tavalod-khahar` | listicle | P1 | Long-tail; SERP = generic gift shops, no emotional angle |
| 6 | هدیه ناشناس برای دوست | commercial (feature) | `/blog/hediye-nashenas` + `/` trust card | how-to | P1 | SERP = forum threads only; anonymous sending is a built-in feature |
| 7 | ارسال هدیه عروسک به شهرستان | transactional trust | `/shipping` | service page | P1 | Local-intent long-tail; carriers (پست/تیپاکس/ماهکس) + 2–4 روز promise = exact answer |
| 8 | جعبه هدیه ولنتاین | commercial, seasonal | `/blog/valentine` | seasonal landing | P1 | Owner-flagged spike (Feb); long-tail vs generic «هدیه ولنتاین» head |
| 9 | هدیه یلدا دخترانه | commercial, seasonal | `/blog/yalda` | seasonal landing | P1 | Owner-flagged spike (دی); «دخترانه» narrows it enough |
| 10 | عروسک تولد برای بزرگسال | commercial | `/blog/aroosak-tavalod-bozorgsal` | guide | P1 | Almost nobody targets adult plush gifting in Persian; our whole brand is that |
| 11 | هدیه بدون بهانه برای دوست | commercial (brandable) | `/blog/hediye-bedoone-bahane` + `/` «همین‌طوری» occasion | emotional post | P2 | Brandable; matches OCCASIONS copy already shipped |
| 12 | عروسک خرس هدیه / عروسک خرگوش هدیه / … (species × هدیه) | commercial | `/product/{kind}-*` (×6 family pairs) | SKU pages | P1 | Species+هدیه combos have thin, weak SERPs; 6 pages capture the set |
| 13 | هدیه تولد مامان از طرف دختر | commercial | `/blog/hediye-tavalod-maman` | listicle | P2 | Long-tail; review #۵ (الهام/مامان) is ready-made social proof |
| 14 | عروسک پولیشی چیست؟ | informational | `/blog/arosak-pilishi-chist` | definitional | P1 | Owner-listed; feeds every other keyword's topical cluster |
| 15 | چرا عروسک هدیه می‌دهیم؟ | informational | `/blog/chera-aroosak-hediye-midahim` | psychology post | P1 | Owner-listed; unique emotional-science angle, weak SERP |
| 16 | چه عروسکی برای هدیه بخریم؟ | informational | `/blog/kodoom-aroosak-hediye` | buyer's guide | P1 | Owner-listed; natural up-sell into 6 families + product finder |
| 17 | ایده هدیه تولد بدون هزینه سنگین | informational | `/blog/ide-hediye-bedoone-hazine` | budget ideas post | P2 | Owner-listed; price-flat positioning («مهربونی وزن نداره») is the punchline |
| 18 | متن کارت هدیه برای دوست | informational (funnel) | `/blog/matn-kart-hediye` | 30 copy-paste messages | P1 | High long-tail volume; every message ends with «یا خودت تو پیشنام بنویس» → builder |
| 19 | شستن عروسک پولیشی / نگهداری | informational | `/blog/shostan-aroosak-pilishi` | aftercare how-to | P2 | Zero commercial competition; builds topical authority + repeat visits |
| 20 | آیا بزرگسالان عروسک دوست دارند؟ | informational | `/blog/bozorgsalan-aroosak` | myth-busting post | P2 | Question SERP; shares audience intent with #10 (two assets, one cluster) |

Interlinking spine: every blog post ≥2 links to product pages and 1 to `/stories`; every product page links to its species blog guide (when it exists) + 3 stories of same `kind`; footer links every indexable route.

---

## 5. BLOG ARCHITECTURE

**Storage:** DB-backed posts on the existing Prisma `Post` scaffold, extended:
`Post { id, slug @unique, title, excerpt, content (markdown), coverImage?, keyword (target from §4), readingMinutes, publishedAt?, updatedAt, published Boolean @default(false) }` — draft/published is the only state machine needed.

**Editor:** tiny admin markdown editor inside the existing admin panel — plain textarea (markdown) + live preview using the shared `<Markdown>` renderer (`react-markdown`, already installed; sanitized/whitelisted tags only). `@mdxeditor/editor` stays available but is NOT the default (heavy, RTL fiddly); only lazy-load it if the owner asks for WYSIWYG later. Owner is non-technical → editor UI in Persian with slug auto-suggest (transliteration helper), keyword picker fed by §4 map, character count, and a «پیش‌نمایش» pane.

**Rendering & freshness:** `/blog` + `/blog/[slug]` = ISR 600; publishing calls `revalidatePath('/blog')` + the post path (on-demand) so new posts are live immediately without a rebuild.

**Editorial workflow (owner, 2–4 posts/mo):**
1. Backlog = §4 keyword map (each post targets exactly ONE keyword; never two posts on one keyword).
2. Owner drafts in admin → saves unpublished (no URL exists → nothing indexable).
3. Preview in admin pane → publish → sitemap regenerates (ISR sitemap reads DB) + Search Console ping is unnecessary (sitemap + internal links from home «بلاگ» card suffice).
4. House rules per post: ≥600 words, ≥2 internal product links, 1 story link, 1 FAQ block optional (if present → `FAQPage` JSON-LD for those exact Q&As), Persian H2s phrased as the long-tail question.
5. Quarterly: Search Console queries review → promote winners (add FAQ schema, refresh dates), prune losers (merge into winners with 301).

### First 8 posts (order = calendar-aware: 2–4/mo, seasonal posts timed)

| # | Title (Persian) | Target keyword | 1-line angle |
|---|---|---|---|
| 1 | چرا عروسک هدیه می‌دهیم؟ روانشناسی یه بغلِ پشمالو | چرا عروسک هدیه می‌دهیم؟ | Science of comfort objects, ending in: «برای همین همه‌ی جعبه‌های ما یه قلب دارن» → products |
| 2 | ۱۲ ایده هدیه تولد برای بهترین دوست دختر (با قیمت دقیق) | هدیه تولد بهترین دوست دختر | Commercial pillar; every idea priced in تومان, half of them our boxes for different occasions |
| 3 | عروسک پولیشی چیست و چرا هنوز محبوب‌ترین هدیه‌ی دنیاست؟ | عروسک پولیشی چیست؟ | Definitional evergreen; materials/safety + our 6 families table |
| 4 | متن کارت هدیه: ۳۰ پیام کوتاه برای هر بهانه | متن کارت هدیه برای دوست | Reuses the 4 OCCASION_IDEAS voice groups as sections; each ends with builder CTA |
| 5 | هدیه تولد برای خواهر: از بچگی تا بزرگسالی | هدیه تولد خواهر | Age-segmented listicle; story UGC quotes as social proof |
| 6 | چطور یه هدیه‌ی ناشناس بفرستیم که معلوم نباشه از کیه؟ | هدیه ناشناس برای دوست | Feature-led how-to; anonymous-mode step-by-step + ethics of kind anonymity |
| 7 | هدیه یلدا دخترانه: جعبه‌ای که کنار هندونه و انار می‌رسه | هدیه یلدا دخترانه | Seasonal (تیر منتشر شود آبان/آذر); yalda-night unboxing angle, 2–4-day promise front and center |
| 8 | جعبه هدیه ولنتاین: برای دوست دخترت چی بخریم؟ | جعبه هدیه ولنتاین | Seasonal (بهمن); anti-cliché angle — «به جای خرس‌های وارداتی، یه پیام صوتی واقعی» |

---

## 6. STORIES (تجربه مخاطب) SPEC

Distinct from the numeric `Review` system (13-b verdict): stories are long-form, publishable, SEO-carrying.

**Submission form** (public, from `/stories` + footer + post-gift success screen):
- نام (required, first name is enough)
- شهر (optional)
- بهانه (select — reuses `OCCASIONS` + ولنتاین/یلدا/نوجایت options)
- متن تجربه (≤1500 chars, live counter — mirrors ReviewForm UX already shipped)
- عکس (optional, ≤5MB, stripped of EXIF GPS on upload; `next/image` + blur placeholder)
- **Explicit opt-in checkbox (hard-required, never pre-checked):** «اجازه می‌دم تجربه‌م با اسم کوچیکم منتشر بشه و پیشنام تو سایت و شبکه‌های اجتماعی نشونش بده.» Submission refused without it. **Consent is NEVER auto-derived from private gift messages, card texts, or reviews — a private gift message stays private, full stop (13-c governance decision).**
- API: `POST /api/stories` (rate-limited in-process; zod-style validation like the shipped reviews route).

**Data model:** `Story { id, slug @unique, name, city?, occasion, body, photoPath?, kind (plush tag), status: draft|published|rejected, consent:true (immutable, audit note), publishedAt?, createdAt }`.

**Moderation queue:** admin panel section (extends the shipped admin) — approve/reject buttons, Persian preview of card+photo; owner reviews weekly (per answer). Approve → `revalidatePath('/stories')` + `/stories/{slug}` becomes live + sitemap regenerates.

**Surfaces:**
- `/stories` gallery (ISR 600): cards = photo/illustration, «{name} از {city}», occasion chip, plush tag chip, 2-line excerpt. Persian empty-state: «هنوز اولین تجربه‌ها تو راهه — تو اولین نفر باش.»
- `/stories/[slug]` (ISR 600): full story + photo + plush tag link to product + «این تجربه رو داری؟ تجربه‌ت رو بنویس» CTA + 2 related stories. `Article` JSON-LD (author = Person «{first name} از {city}»), `BreadcrumbList` (خانه → تجربه‌های مخاطب → title).
- **Pending stories are unindexable by construction:** only `status=published` rows ever get a URL; drafts live solely inside the admin session (no `/stories/[slug]?preview`).

**Interlinking with products:** story pages link the tagged product (`/product/{kind}-{s|l}`); each product page shows «تجربه‌های همین رفیق پشمالو» (latest 3 stories of that `kind`) — this is the product-page freshness/UGC signal that also feeds the future AggregateRating gate.

---

## 7. WAVE-0 MODULE LIST (extract in sandbox NOW, deploy-wave route creation becomes mechanical)

| Module (proposed path) | Contents | Testable in sandbox today | Deploy-wave use |
|---|---|---|---|
| `src/lib/seo/site.ts` | `SITE_URL`, `BRAND_FA`, title template, OG defaults, carrier/shipping promise constants | Pure constants + unit asserts | `metadataBase`, robots.ts, sitemap.ts |
| `src/lib/seo/route-map.ts` | The §1 table as data: `{path, rendering, index, priority, wave, legacyHash?}` registry | Node script: registry ↔ hash ROUTES ↔ catalog consistency checks | sitemap.ts source of truth + deploy hash-shim table + nav building |
| `src/lib/seo/product-catalog.ts` | 12 SKUs: slug, kind, size, fa display name, price (تومان int), blurb, availability | Validated against `PLUSHES` (no orphan kinds) | `generateStaticParams`, Product JSON-LD, sitemap, product module props |
| `src/lib/seo/metadata.ts` | `buildPageMetadata({title, description, path, noindex, og})` per §2 patterns + `useDocumentMeta` client hook | Hook renders in hash screens now (sets `document.title`/meta/JSON-LD — harmless under SPA) | `generateMetadata` wrappers call `buildPageMetadata`; hook deleted at deploy |
| `src/lib/seo/jsonld.tsx` | `<JsonLd/>` + builders: `organizationLd`, `websiteLd`, `faqLd`, `productLd` (with internal تومان×10 → IRR), `articleLd`, `breadcrumbLd` | Sandbox: render on home + reviews surfaces; guard-test `JSON.parse` on every builder | Same builders on server pages |
| `src/components/shop/screens/info/*` | Split info.tsx (1,676 lines) into **props-driven presentational** sections: `AboutSections`, `MissionSections`, `ContactSections`, `ReviewsSections`, `ShippingSections` | Imported back into hash screens — zero visual change (screenshot diff via agent-browser) | Each becomes a server page fetching data → passing props |
| `src/components/shop/stories/*` | `StoryCard`, `StoriesGallery`, `StoryForm` (presentational, props + callbacks) | Mounted behind hash route `#/stories` (temporary entry from footer in dev only, or behind a flag) | `/stories` + `/stories/[slug]` server pages + API |
| `src/components/shop/blog/Markdown.tsx` | react-markdown with RTL/Persian typography + whitelisted tags + `<a>` crawlable everywhere | Render a sample markdown doc behind hash screen | `/blog/[slug]` body + admin editor preview |
| `public/og/pishnam-og-default.png` | 1200×630 brand OG card (cyan bg + Plush + «یه بغل، تو یه جعبه») exported from the design system's Logo/Plush components | Visually inspectable at `/og/…` | All OG tags; base for future per-product ImageResponse |
| `app/sitemap.ts` + `app/robots.ts` *(written at deploy from route-map.ts)* | sitemap = static routes + 12 products + published stories + published posts (DB read, ISR); robots = `Sitemap:` line + `Disallow: /admin, /api/, /build` and **nothing else** | Logic unit-tested as pure functions now | Straight drop-in |

**Keeping the hash router alive during transition:** all extracted modules are imported by the existing hash screens (data flows in as props; screens keep their `navigate()` buttons). No new routing primitive is introduced in wave-0 — the hash router remains the single live nav so "/" keeps previewing everything. The `useDocumentMeta` hook gives the SPA correct titles/JSON-LD today and is deleted when real pages emit `generateMetadata`.

**Deploy shim sketch (wave-1 `page.tsx`, deleted wave-2):**
```ts
useEffect(() => {
  const h = location.hash.replace(/^#\//, "");
  const hit = LEGACY_HASH_TO_PATH[h.split("?")[0]];      // from route-map.ts
  if (hit) { history.replaceState(null, "", hit + new URLSearchParams(h.split("?")[1] ?? "")); router.replace(hit); }
}, []);
```

---

## 8. PERFORMANCE BUDGET (mid-range Android, Iranian mobile network)

Targets measured with Lighthouse mobile on "Slow 4G" + a 200ms RTT profile (domestic):

| Metric | Budget | How it's met |
|---|---|---|
| **LCP** | **< 2.5s** | Content pages are server components (HTML carries the content); hero/product image is `next/image` with `priority` + `fetchPriority="high"`, AVIF/WebP, explicit dimensions (CLS < 0.1), blur placeholder |
| TTFB | < 400ms domestic | SSG/ISR everywhere static-able on the 2c/2G VPS (ISR serves from cache — no per-request DB hit); only `/g/[no]` is SSR; Node standalone build |
| JS (content pages) | < 100KB gzip | `/`, `/product/*`, `/stories*`, `/blog*`, info pages = server components; islands only: favorites heart, toast, contact form. Builder already client-side and stays code-split (canvas/voice heavy chunks never load on content pages) |
| CLS | < 0.1 | Fixed aspect-ratio media boxes; font metrics `size-adjust` fallback; no late-loading banners |
| INP | < 200ms | Minimal hydration on content pages; builder interactions already local-first |
| Fonts | keep ≤ ~102KB | **Vazirmatn stays self-hosted woff2** (already shipped, `font-display: swap`); subset to fa + digits, preload 2 weights only |
| Images | — | Owner photos «به‌زودی» — pipeline ready: `next/image` + blurDataURL generated at upload; static OG for launch, ImageResponse OG at wave-2 |
| CDN | — | **Arvan Cloud CDN for `/_next/static` + `/public`** (Iran latency win, data residency honored); immutable long-cache headers on hashed assets |
| Analytics | — | Self-hosted Umami (decided), `defer`, no GA (unusable/blocked in Iran) |
| Rate guard | — | ISR revalidate windows (300–3600s) keep regen load trivial for a ~30-URL site at launch |

---

## 9. OPEN QUESTIONS FOR THE CRITIC

1. **Domain:** canonical locked to `https://pishnam.ir` but owner hasn't registered it — is wave-1 launch blocked on domain purchase, or do we ship with the constant swapped at deploy? (Everything downstream — sitemap, canonical, OG URLs — hangs off one constant.)
2. **Brand rename sweep:** layout.tsx/copy still say «پیشتم». Confirm پیشنام is final and schedule the string sweep BEFORE wave-1 (metadata titles are brand-bearing).
3. **AggregateRating integrity gate:** launch Product JSON-LD **without** ratings until ≥5 real DB reviews (the «۳۱۸ نظر» seed must never enter schema) — confirm this strictness, or does the owner want reviews page live with seeds as visible-but-unstructured marketing only?
4. **/g/[no] OG privacy scope:** OG card shows gift number + brand + default image only, never message/photo/voice — confirm, and confirm `/g` stays OUT of robots.txt Disallow (noindex meta does the work).
5. **اینماد:** owner answered «have» for e-Namad + پروانه کسب — verify badge ID before adding the trust row to footer/legal pages (the refund page must state the damage-only exception for personalized gifts to stay compliant).

*End of 13-f deliverable. No source files were modified; all recommendations are wave-0/1-ready.*
