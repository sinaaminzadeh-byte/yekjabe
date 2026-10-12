# Worklog — پیشتم (Pishnam) Design-System Studio

---
Task ID: 1
Agent: main (Z.ai Code)
Task: Extract 32 design pages from two Claude-Code "دیزیان" design-system bundle files, link them together, and build a running UI shell so the user can browse the whole design.

Work Log:
- Analyzed uploaded files: `upload/پیشتم — وباپ هدیهی دوستانه (1).html` (14 pages) and `(2).html` (18 pages). Format = two-level nested `__bundler` self-extracting HTML: outer bundle → page bundles → template + manifest (support.js DC runtime, React 18 UMD, Vazirmatn woff2 fonts, sub-components Plush/Logo) + ext_resources (id→uuid map) + page_order.
- `scripts/extract-bundle.mjs` — level-1 extraction (32 page-bundle files into `extracted/v1`, `extracted/v2`).
- `scripts/extract-inner.mjs` — verified nested structure; determined each page-bundle is fully self-extracting (own manifest resolves its own fonts/scripts/sub-components via blob URLs + `window.__resources`).
- Recovered page labels + designed sizes (390×… mobile, 1440×… web, components, print) from outer board templates of both files.
- Decoded the DC link graph: pages cross-link via `href="*.dc.html"` (Main, M-Pick, M-Card, M-Extras, M-Checkout, M-Success, M-MyGifts, M-Impact, M-Gift-Open, M-About/Mission/Contact/Reviews/Shipping, Desktop-Home/Builder/Success/MyGifts/Login/Impact/About/Mission/Contact/Reviews/Shipping/Gift-Open). Mapped all 23 referenced names to extracted pages.
- `scripts/reconstruct.mjs` — copied all 32 pages to `public/pages/<slug>.html` and injected a nav shim (`scripts/reconstruct.mjs`): intercepts clicks on `a[href*=".dc.html"]` (capture phase, survives the bundle's document swap), resolves via embedded name→slug map, postMessages `{type:'pishnam-nav', name, slug}` to parent; standalone mode adds a floating «فهرست صفحات/قبلی/بعدی» pill. Generated `src/data/pages.ts` registry (slug, dc, title, label, w, h, cat, desc, src) + CATEGORIES + LINK_NAME_TO_SLUG.
- Extracted self-hosted Vazirmatn variable font (3 woff2: arabic/latin-ext/latin) from manifest → `public/fonts/`, wired `@font-face` in `globals.css`; layout switched to `lang="fa" dir="rtl"`.
- Built the shell (single route `/`):
  - `src/components/pishnam/header.tsx` — brand header + mobile drawer (Sheet) trigger.
  - `src/components/pishnam/sidebar.tsx` — search + 6 category groups with icons/colors, active highlight, size badges.
  - `src/components/pishnam/viewer.tsx` — iframe runner: phone frame for mobile pages, auto-fit zoom (ResizeObserver) + manual zoom, prev/next + counter, category/size badges, open-in-new-tab, live status bar, keyboard ←/→/Esc, canvas scroll reset per page.
  - `src/components/pishnam/gallery.tsx` — hero + per-category grids with LIVE scaled iframe previews (lazy), hover overlays, stats.
  - `src/app/page.tsx` — orchestration: view state, URL deep-link `?page=slug` (+ hash), history.replaceState sync, postMessage listener → cross-page navigation, mobile drawer state.
- Custom dotted canvas background + cyan scrollbar styling in `globals.css`.
- Verified with agent-browser: gallery renders live previews; sidebar opens pages; viewer frames 390px designs; **clicked links inside designs (بساز و بفرست → M-Pick → ادامه، کارت پستال → M-Card)** — shell navigated 1→2→3 with sidebar highlight sync; design-internal state (plush selection) works in iframe; desktop page auto-scales (65%); deep link `/?page=desktop-home` works; mobile viewport (390×844): hamburger drawer + scaled viewer OK. Console clean; `bun run lint` passes (0 errors).

Stage Summary:
- 32/32 pages extracted, self-contained, offline-capable at `public/pages/<slug>.html`.
- Whole design system browsable at `/` with real cross-page linking (the user's core ask).
- Key artifacts: `public/pages/*` (32 files), `src/data/pages.ts`, `src/components/pishnam/{header,sidebar,viewer,gallery}.tsx`, `scripts/{extract-bundle,extract-inner,reconstruct}.mjs`, `public/fonts/*`.
- Source-of-truth metadata (labels/sizes/link-graph) lives in `scripts/reconstruct.mjs`; re-run it after changing mappings.
- Known minor notes: gallery mounts ~32 lazy iframes (heavy but lazy); unknown dc-link targets only log a warning; Esc closes viewer to gallery.
