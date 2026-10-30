# Architecture — yekdoost (run-1, source ref 128f6ba)

## Product
Persian RTL single-vendor gift e-commerce "یک‌دوست/پیشنماز" (Next.js 16 App Router, React 19, Prisma 6, TypeScript strict). Buyer composes a plush gift box + card message + private photo/video/voice media + a paid retention plan; recipient unlocks the message. Money is integer toman, server-authoritative. Actors: anonymous visitors, OTP-verified customers, gift-code holders (code + Idempotency-Key or card password), admin seats (owner/operator), Zarinpal PSP callback, cron jobs (`x-cron-secret`).

## Comparable baseline
Typical Next.js + Prisma commerce app: zod-validated route handlers, server-side pricing, DB-backed opaque sessions (sha256-at-rest, HttpOnly `__Host-` cookies) instead of JWT, HMAC OTP, forward-only order state machine, PSP verify with DB-amount check. Calibrate severity against that baseline; do not dismiss demonstrated findings because the pattern is common.

## Stack and deployment paths
- APIs: ~74 route files under `src/app/api/**` + `src/app/bot-view/[[...path]]/route.ts`; single client SPA shell `src/app/page.tsx` with hash router `src/lib/hash-route.ts`; admin console `src/components/shop/admin/**`.
- Storage seam: `src/lib/data-root.ts` → `DATA_ROOT || cwd/.data`; writers `src/lib/media.ts`, `src/lib/orders/message-media.ts`, `src/lib/payments/manual.ts` (disk) with `MediaBlob` DB fallback (`src/lib/media-blob.ts`) for read-only FS.
- Deploy switch by `DATABASE_URL` (`scripts/prisma-boot.mjs:15-17`): `file:` → SQLite schema; `postgres://` → PG schema. Vercel (`VERCEL` env): no standalone output, **prebuild runs PG migration + `db push --accept-data-loss` + 4 seeds against the target DB on every build** (`scripts/prebuild.mjs:61-83`). Docker: PG schema hard-copied (`Dockerfile:21-23`), healthcheck hits nonexistent `/api/health` (`Dockerfile:40`). Netlify: SQLite bundle copied to `/tmp` (`src/lib/sqlite-serverless.ts`). No test framework exists.

## Entry surfaces (high value)
1. **Admin API** (`src/app/api/admin/**`, 35 files): all call `requireAdmin()` (`src/lib/auth/session.ts:69-76`); owner-only subsets (settings, sms, team, password, branding/logo, post DELETE). No middleware — `src/proxy.ts:75` excludes `/api/*`; enforcement is per-route.
2. **Auth**: OTP request/verify (4-digit, HMAC(`phone:code`, `SESSION_SECRET`), purpose-isolated, attempt-capped), admin password door (DB scrypt `Setting.admin_password_hash` → env fallback), `ADMIN_SEED_PHONES` mint owner seats in `/api/auth/verify`.
3. **Gift capability**: code `PN-YYMMDD-####` from a sequential per-day counter (`src/lib/orders/code.ts:20-29`) — enumerable by design, always paired with a second factor; card password scrypt-verified with 10-fail lock (`giftLockedAt`).
4. **Idempotency-Key** `[A-Za-z0-9._-]{8,64}` doubles as bearer for `checkout/[key]/status`, `zarinpal/recheck`, `manual/receipt`, `gifts/media` POST.
5. **Media**: public read allowlist `products|posts|branding` with per-key DB gate; private prefixes (`messages|receipts|refunds|experiences`) only via session/admin-gated streams; all stems server-generated; magic-byte mime sniffing; size caps applied **after** full body parse.
6. **Public UGC**: contact/reviews/experiences/track; moderation queues; rate limits.
7. **HTML sinks**: bot-view manual HTML (single `escapeHtml` gate + own markdown w/ URL scheme gate), React markdown renderers (no `dangerouslySetInnerHTML`), JSON-LD via `toJsonLdScript` (`<` escaped).
8. **Jobs**: `/api/jobs/[name]` header secret; in-process 60s ticker (`src/instrumentation.ts`).

## Trust boundaries and strongest source-visible control
- anonymous → admin: `requireAdmin` + role check (per-route, no middleware).
- anonymous/customer → customer data: DB-backed session cookie, phone-column scoping on every customer surface.
- gift-code holder → gift content: code + (session match | card password scrypt | recipient OTP); lockout + SMS alert.
- uploader → filesystem/DB: prefix allowlists, `..` rejection, server-generated stems, magic-byte sniff, size caps, MediaBlob fallback.
- PSP → orders: server re-verify with DB amount; `updateMany` idempotency.
- cron → mutations: constant-time header compare vs `CRON_SECRET`.
- boot → prod secrets: `assertProdSecrets()` refuses default/short secrets (`src/lib/env.ts:60-95`).

## Known deployment facts NOT in source (needs_validation territory)
Vercel env values; whether production runs `prebuild.mjs` PG branch; HTTPS/proxy hygiene (repo `Caddyfile` implements a `?XTransformPort=` open internal-port hop for the sandbox); `.data/` persistence on Vercel; cron scheduling in prod; `ZARINPAL_MERCHANT_ID` presence (unset ⇒ `zarinpalSimulate()` accepts `SIM*` authorities as paid, `src/lib/orders/checkout.ts:368-406`).

## Starting paths
See ledger `starting_paths` per unit; roots: `src/app/api/**`, `src/lib/**`, `src/components/shop/**`, `src/app/bot-view/**`, `src/proxy.ts`, `scripts/**`, `Dockerfile`, `docker-compose.yml`, `Caddyfile`, `netlify.toml`, `next.config.ts`, `package.json`.

## Prior coverage
No prior compatible ledgers or findings exist; all units seed `prior_status: "none"`.

## Companion selection
- WEB-PROTOCOL-AND-AUTH — auth/session/cookie surfaces (U5, U6, U7, U9, U14, U19).
- CLIENT-SIDE — SPA screens, storage, hash routing, markdown renderers (U15).
- CLOUD-AND-DEPLOYMENT — Dockerfile/compose/Caddyfile/netlify/prebuild/instrumentation (U17).
- SUPPLY-CHAIN-AND-RELEASE — deps, build scripts, seeds on prod build, repo hygiene (U18).
- DATA-ISOLATION-AND-LIFECYCLE — privacy scoping, retention/purge, logs as alternate readers (U4, U9, U10, U20).
- RESOURCE-EXHAUSTION-AND-AVAILABILITY — body-buffering uploads, scrypt cost, aggregation, rate-limit fail-open (U8, U13).
- PROTOCOLS-RPC-AND-MESSAGING — idempotency/replay semantics of checkout + callbacks (U7).
