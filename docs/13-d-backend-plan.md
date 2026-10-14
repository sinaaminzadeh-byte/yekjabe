# 13-d — Pishnam FINAL Backend & Commerce Blueprint

Task ID: 13-d · Agent: backend-architect · Status: RESEARCH/DESIGN (no code touched, no db:push, dev server untouched)
Input constraints: owner's 46 answers (`docs/architecture-answers.json`, BINDING) + Task 13-a/13-b/13-c findings + critic's locked decision **"wave-0 route-ready modules now / real routes at deploy"**.

**Binding envelope (from answers):** Iranian VPS already owned — 2 vCPU / 2 GB RAM / 40 GB disk · data residency **must** stay in Iran · budget < 2M toman/month · launch in 2–3 months · year-1 target 200–500 orders/day, 2k–10k visitors/day, seasonal spikes (Yalda/Valentine) · اینماد ✔ · کسب ✔ · مودیان ✔ · payments = Zarinpal (owned) **and** today's reality: بله‌پی + card-to-card (customer copies card/sheba/name, uploads receipt image, admin approves manually) · no COD · coupons later · exact-count inventory · size-only variants · 6 families × 2 sizes = **12 SKUs** · personalization = printed card + voice note · carriers = post/tipax/mahex · shipping charged, **never** free · guest checkout (mobile, no password) · Kavenegar + service line (owned) · 2 admins · self-hosted analytics · KPI = conversion + NPS · refund policy = **damage-only** for personalized gifts.

**Locked platform choices (do not re-open):** modular monolith inside Next.js App Router · SQLite (WAL) on the single VPS for launch · NO Redis, NO queue servers, NO microservices · boring, well-trodden patterns only (owner is non-technical; the codebase is AI-maintained). Everything below is module-first in `src/lib/*` + API routes — API routes are same-origin under `/`, so they are buildable/testable in-sandbox (curl); only SEO route pages wait for the deploy wave.

**PostgreSQL migration trigger (inherited from critic, kept as a written tripwire):** SQLite+WAL is sized for launch. Migrate to PostgreSQL only when (a) sustained > ~300 orders/day for 2+ weeks, or (b) a second app instance is needed. Schema below stays portable (no SQLite-only hacks) so the move is mechanical with Prisma. — *Rejected now:* PostgreSQL at launch (critic: DB choice follows hosting; 2 GB VPS is better spent on one Node process than a PG instance).

**SQLite runtime hardening (P0, one-time):** `db.ts` must set `journal_mode=WAL`, `busy_timeout=5000`, `foreign_keys=ON` on first connect; single Prisma client (already a singleton); drop query logging in production. — *Rejected:* connection pooling libs (one process, one writer — nothing to pool).

**Schema management:** switch from `db:push --accept-data-loss` to `prisma migrate dev/deploy` before real orders exist. — *Rejected:* keeping db:push (it is a data-loss footgun with real customer rows).

---

## 1. Order State Machine (full)

Single source of truth: `src/lib/order-status.ts` — transition map + Persian labels + allowed-actor check. Server is the ONLY writer of `status` (customer changes go through dedicated endpoints that validate the transition; the current `PATCH /api/orders/[id]` accepting any status in any direction is killed in §4).

`DRAFT` is **client-only** (the existing builder draft in localStorage/Zustand). It is never persisted server-side. — *Rationale:* zero DB writes for browsing/abandoning visitors; at 12 SKUs a server-side cart buys nothing. — *Rejected:* DB-backed carts + cart-expiry jobs (complexity with no benefit; abandonment is detected on real `AWAITING_PAYMENT` rows, see §6/§7).

| State | Meaning (fa) | Allowed transitions → | Actor | SMS on entry |
|---|---|---|---|---|
| `DRAFT` | سبد/ساخت هدیه (client-only, not in DB) | `AWAITING_PAYMENT` (checkout POST) | customer | — |
| `AWAITING_PAYMENT` | در انتظار پرداخت (stock already decremented) | `PAID` · `PAYMENT_UNDER_REVIEW` · `FAILED` · `CANCELLED` · `EXPIRED` | psp / customer / system | none at entry; **abandon reminder at ~6h once** (job, §7) |
| `PAID` | پرداخت تأیید شد (Zarinpal verify OK, or manual approve) | `PREPARING` · `CANCELLED` (OWNER, exceptional) | psp / admin | `order_confirm` → sender (baseline; scale-policy may skip for Zarinpal, §6) · `admin_new_order` → admin (→ Telegram at scale) |
| `PAYMENT_UNDER_REVIEW` | رسید آپلود شده، منتظر تأیید ادمین | `PREPARING` (approve) · `AWAITING_PAYMENT` (reject, attempt < 3) · `CANCELLED` (reject, attempt = 3, auto-flag) | admin / system | approve → `payment_approved`; reject → `payment_rejected` |
| `FAILED` | پرداخت ناموفق (Zarinpal verify negative / cancel at gateway) | `AWAITING_PAYMENT` (customer retry, new attempt) · `EXPIRED` (24h job) | customer / system | none (customer is already on the failure screen) |
| `CANCELLED` | لغو شد (terminal) — stock released | — (terminal) | customer / admin | only for admin-initiated cancel: `order_cancelled` |
| `EXPIRED` | ۲۴ ساعت بی‌پرداخت (terminal) — stock released | — (terminal) | system | none (silent; avoids nagging) |
| `PREPARING` | در حال آماده‌سازی (maps today's "packing") | `SHIPPED` · `CANCELLED` (OWNER) | admin | none |
| `SHIPPED` | پست شد | `DELIVERED` · `REFUND_REQUESTED` | admin | `shipped_tracking` → sender (carrier + tracking code) |
| `DELIVERED` | تحویل شد | `REFUND_REQUESTED` (≤ 7 days, damage evidence) | admin | none (optional NPS ping later) |
| `REFUND_REQUESTED` | درخواست مرجوعی (damage-only) | `REFUNDED` (approve) · `DELIVERED` (reject → restore) | customer / admin | ack to admin (`refund_new` → admin queue) |
| `REFUNDED` | بازپرداخت شد (terminal) | — (terminal) | admin | `refund_outcome` → customer |

Rules enforced in `order-status.ts`: **forward-only** for fulfilment (`PREPARING→SHIPPED→DELIVERED`), every transition validated server-side, invalid → `409`; stock is released (increment back) exactly on `CANCELLED` and `EXPIRED`. `opened` (gift-opened by recipient) stays a boolean flag, not a state. Status history is appended to an `OrderEvent` log (who/when/from/to) — replaces the "no audit" gap 13-a found. — *Rejected:* collapsing `EXPIRED` into `CANCELLED(reason=expired)` (explicit state keeps the admin queue and analytics honest); *rejected:* letting the customer PATCH status at all.

## 2. Checkout API — server-authoritative

One endpoint creates the order; nothing about money is trusted from the client. Today the total is computed in **4 places** (`flow.tsx` ×2, `pay-modal.tsx`, `store.placeOrder`) and POSTed as-is; shipping is displayed but never charged. All of that dies.

**`POST /api/checkout`** (auth: session cookie if logged in, else guest; rate-limit §5):

```jsonc
{
  "idempotencyKey": "uuid-v4 (generated once, persisted in localStorage pendingOrder)",
  "items": [{ "variantId": "bear-lg", "qty": 1 }],        // 12 SKUs; qty small int
  "addons": { "charmHearts": 0, "charmPaws": 2 },          // prices from Setting
  "sender":   { "name": "...", "phone": "09xxxxxxxxx" },   // guest checkout = identity anchor
  "recipient": { "name", "phone", "province", "city", "address", "postalCode" },
  "occasion": "birthday|valentine|yalda|...",
  "cardMessage": "...", "anonymous": false,
  "paymentMethod": "zarinpal" | "manual"
}
```

Server-side decisions, each with rationale:

1. **Server-authoritative pricing.** Server loads `ProductVariant.priceToman` + box/charm prices from `Setting`, computes `shippingFee` from `Setting` (`ship_fee_tehran` / `ship_fee_other`, province-based; **never free** — answer `free_thr: never`), returns `total`. Client MUST render the returned total and pay exactly it. — *Rationale:* kills the ×4 client-total and the fake client-side coupon in one move. — *Rejected:* sending prices from client and "verifying" them (race-prone, still trusts client); *rejected:* coupon engine now (answer: later — but the totals response already carries `discount: 0` so a coupon row slots in later without contract change).
2. **Idempotency.** `Order.idempotencyKey @unique`. Same key retried → returns the **same** order (`200`, not a second row). Client keeps `pendingOrder = { key, code, total }` in localStorage and retries the same key on reconnect; the success screen **blocks on server ACK** (polls `GET /api/checkout/{key}/status` until it returns the order state, max ~2 min, then falls back to SMS confirmation). — *Rationale:* critic's decision — a key alone is inert; it pays off only with client retry + ACK-blocking success. — *Rejected:* separate IdempotencyKey/replay-cache table (a unique column gives the same guarantee with one table); *rejected:* Redis-based idempotency middleware (no Redis).
3. **Server order code.** `PN-YYMMDD-####` (e.g. `PN-260214-0007`), `####` from an `OrderSeq` counter row incremented inside the same transaction; `code @unique` makes the retry path safe. Human-readable, dictatable over the phone, fits SMS. — *Rejected:* keeping client-generated `no` (13-a proved the `@unique` race silently drops orders at concurrency); *rejected:* cuid/UUID as customer-facing code (unspeakable in Persian phone support).
4. **Atomic stock decrement (oversell-proof on SQLite).** Inside `prisma.$transaction`: `db.productVariant.updateMany({ where: { id, stock: { gte: qty } }, data: { stock: { decrement: qty } } })`; if `count === 0` → abort → `409 { error: "sold_out" }`. A single conditional `UPDATE … WHERE stock >= qty` is atomic under SQLite's single-writer WAL — no reservation table needed. Release on `CANCELLED`/`EXPIRED` (increment back). — *Rejected:* Reservation/Hold table with TTL sweeps (12 SKUs don't justify it); *rejected:* `SELECT`-then-`UPDATE` (classic oversell race).
5. **Guest checkout fields & validation.** Sender mobile `09xxxxxxxxx` (Persian digits normalized via one shared `normPhone` module — today it's duplicated ×3) is the identity anchor; postal code 10 digits; province from a fixed 31-province list; address ≤ 400 chars; `anonymous` hides sender name from the gift. No password, ever. — *Rationale:* matches answer `guest: yes` + Kavenegar contactability.
6. **Voice note & printed card.** Card message is a checkout field; the voice note is uploaded **after** order creation to `POST /api/orders/{code}/voice` (multipart, ≤ 2 MB, `audio/webm|mp4|m4a` mime-sniffed) — keeps checkout JSON-only and lets slow uploads fail without losing the order.
7. **What replaces `bootSync()`:** see §4 — checkout responds with `{ order: { code, status, total }, payment: {...} }` and nothing else needs the global dump.

**Success/ACK contract:** Zarinpal redirect-back lands on the success screen with `?code=`; screen polls `GET /api/checkout/{key}/status` (authorized by key possession; returns only `{code, status, total}` — no PII) until `PAID | PAYMENT_UNDER_REVIEW | FAILED`. Manual flow lands on a "transfer instructions + upload receipt" screen (§3).

## 3. PaymentProvider adapter

```ts
// src/lib/payments/types.ts
interface PaymentProvider {
  id: "zarinpal" | "manual";
  createPayment(order: OrderRO): Promise<
    | { kind: "redirect"; url: string }                 // Zarinpal gateway
    | { kind: "instructions"; cardNumber: string; sheba: string; holderName: string;
        amountToman: number; orderCode: string }>;      // manual/balle-pi
  verify(order: OrderRO, payload: CallbackPayload): Promise<
    { ok: true; providerRef: string } | { ok: false; reason: string }>;
}
```

**ZarinpalImpl** — `request` → redirect → `GET /api/payment/zarinpal/callback?Authority&Status` → `verify` → mark `PAID`.
- **Amount checked against DB**: verify uses `order.total` from our DB (never the amount Zarinpal echoes back), and the callback recomputes nothing. Amount mismatch → log + `FAILED` + admin alert.
- **Idempotent callback**: if order already `PAID`, return `200` immediately (Zarinpal retries callbacks; back-button double-fires). Verify-before-mutate inside a transaction with `status: "AWAITING_PAYMENT"` guard in the `updateMany` where-clause.
- **⚠ ×10 UNIT TRAP (implementation gotcha, pre-flagged):** Zarinpal v4 expects **Rial**; we store **Toman**. Convert `×10` at request and verify, covered by one sandbox-merchant self-test before deploy. — *Rejected:* storing Rial in DB (all owner-facing numbers are Toman; double-conversion bugs forever).
- *Rejected:* supporting multiple PSPs behind feature flags now (owner has exactly one gateway; the interface is the seam for later).

**ManualTransferImpl** (covers بله‌پی + card-to-card — today بله‌پی is literally a page showing card/sheba/name to copy, so both are the same flow):
- Instructions rendered from `Setting` (`manual_card_number`, `manual_sheba`, `manual_holder_name`) with **copy buttons**; amount + order code always shown together.
- **Receipt upload** `POST /api/payment/manual/receipt` (multipart): ≤ **5 MB**; **MIME sniffed from magic bytes** (`FF D8 FF` jpeg, `89 50 4E 47` png, `RIFF…WEBP`), not the extension; stored under `/data/uploads/receipts/` with a random filename, **outside `public/`**, served only via authenticated admin endpoint; **one receipt per attempt**, **max 3 attempts** per order (attempt counter on the order); each attempt → `PAYMENT_UNDER_REVIEW`; after the 3rd rejection the order auto-flags `CANCELLED(reason=payment_rejected)` + SMS. — *Rationale:* matches the owner's described manual reality exactly; capped attempts stop infinite-retry abuse. — *Rejected:* OCR/auto verification (over-engineering); *rejected:* storing receipts in `public/` (anyone with the URL reads PII).
- **Admin approve/reject**: `POST /api/admin/receipts/{id}/approve|reject` → transition + SMS to customer (§1). Queue shows **age of oldest pending receipt** so the 12h SLA is visible at a glance.
- **Fraud mitigations (manual flow):** (a) UI + SMS reminder to transfer the **exact amount** with the **order code / sender name** in the transfer description; (b) **receipt dedupe by SHA-256 hash** — the same image reused across orders/attempts is rejected (catches lazy fraud and honest double-uploads); (c) admin sees order total, holder-name expectation, and receipt side-by-side; (d) **SLA note** shown to the customer («تأیید پرداخت حداکثر تا ۱۲ ساعت») + queue visible in admin; (e) rate-limit uploads (§5).
- *Rejected:* a "pending_bank_transfer" third provider (بله‌پی IS the manual flow today; if بله‌پی later exposes an API, it becomes a third `PaymentProvider` behind the same interface).

## 4. P0 SECURITY FIX SPEC (highest priority, pre-scoped for the next dev rounds)

1. **httpOnly session cookie on OTP verify.** `POST /api/auth/verify` creates `Session { id: random 32-byte base64url, phone, expiresAt: +30d, lastSeenAt }` and sets `Set-Cookie: pn_session=<id>; HttpOnly; SameSite=Lax; Path=/; Secure` (Secure enforced at deploy behind HTTPS). Helper `requireSession(req): { phone } | null` in `src/lib/auth.ts`. Client keeps the display name only; **phone in localStorage is no longer trusted**. — *Rationale:* today every endpoint trusts body/query `phone` → full IDOR (13-a P0). — *Rejected:* JWT (stateless logout/rotation pain for zero benefit with 1 instance); *rejected:* next-auth (heavy, OAuth-shaped, we need OTP-only — 30 lines of boring session code).
2. **All order/favorite/review queries scoped by session phone.** `GET /api/orders` → `WHERE userPhone = session.phone` — the `?phone=` query param is **deleted** (it was the whole leak). `PUT /api/favorites` and `POST /api/reviews` take identity from the session. `PATCH /api/orders/[id]`: customers may only set `opened: true` on their own order (or open the gift via code+password on the gift-open surface); **all other status writes are admin-only**. — *Rationale:* 13-a P0 privacy: today `GET /api/orders` returns up to 200 full orders — message, recipient address/phone, card password — and `bootSync()` pulls it **for every visitor on every page load**.
3. **Kill the full-dump bootSync → per-phone endpoints.** New `GET /api/me/bootstrap` (one call, session-scoped): `{ user, orders (≤ 50, newest-first), favorites }`. Guests get `{ user: null, orders: [], favorites: [] }` — **zero order rows to anonymous visitors**. `pishnam-sync.bootSync()` becomes a single fetch of this endpoint; the global `pullOrders()` + `mergeRemote()` full-dump path is deleted. The public "board" features that read all gifts must switch to a sanitized projection (`GET /api/gifts/public` — code, plush kind, hearts/paws counts only, no phone/address/message/password). — *Rationale:* P0 PII/IDOR; also removes ~200-row JSON from every cold page load.
4. **Admin session + roles.** `AdminUser { phone @unique, role: OWNER | OPERATOR, active }` — exactly **2** rows, seeded from env. Admin login = same OTP flow to an **allowlisted phone** (kill the hardcoded `ADMIN_PIN = "1398"` client gate). Separate cookie `pn_admin` + `requireAdmin(req)` guard on every `/api/admin/*` route; destructive actions (settings, stock adjust, refunds, CSV export, admin management) require `OWNER`; day-to-day (transitions, receipt review, moderation, posts) allowed for `OPERATOR`. Every admin mutation writes `AdminLog { adminPhone, action, targetId, meta, at }`. — *Rationale:* 2 admins (answer), accountability for an AI-maintained shop.
5. **Data hygiene.** `AuthCode` rows deleted on use + nightly purge job; sessions checked for expiry per request; no PII in logs (`db.ts` query logging off in prod); gift-open page requires order `code` + card `password` (already the design's pattern — keep it as the public surface's only per-gift secret).

## 5. OTP Hardening + In-Process Rate Limiting (NO Redis)

**`src/lib/rate-limit.ts`** — in-process token buckets keyed `scope:id`, `Map` with lazy expiry; returns `429` + `Retry-After`. Config table (one place):

| Scope | Limit | Why |
|---|---|---|
| `otp_request:phone` | 3/hour **+ 60 s cooldown between requests** | SMS cost burn + harassment |
| `otp_request:ip` | 10/day | distributed abuse |
| `otp_verify:phone` | 5 per code / 15 min | brute force (4-digit code = 10k space) |
| `checkout:ip` | 5/10 min | checkout spam / stock pinning |
| `review:phone|ip` | 2/hour | UGC spam (13-a: reviews publish instantly) |
| `receipt:order` | 6/hour | upload abuse |
| `contact:ip` | 3/hour | form spam |

**OTP hardening:** 6-digit `crypto.randomInt` (was `Math.random` 4-digit), TTL 5 min, single-use, **stored hashed** (sha256 + app pepper), per-code attempt counter (≥ 5 wrong tries voids it), `devCode` in the API response **only** when `NODE_ENV=development && SMS_DEV_ECHO=1` (real Kavenegar send otherwise), Persian-digit normalization centralized. — *Rationale:* 13-a P0 — codes were brute-forceable inside the 5-min TTL with zero throttling. — *Rejected:* Redis-backed limiter (constraint + one instance); *rejected:* DB-backed counters (write amplification on SQLite's single writer + cleanup jobs).

**Restart behavior (documented, accepted):** buckets live in process memory → a deploy/restart resets limits. Worst case is one extra burst per deploy on a single instance — acceptable; the SMS-burn scopes are additionally bounded by the DB-side counters above. If the app ever scales to 2 instances (migration trigger §0), rate limiting moves to the DB or the migration to PG+shared store happens first — noted in the tripwire.

## 6. SMS Architecture (queue + provider seam + COST ALARM)

**`SmsOutbox`** table: `{ id, to, template, paramsJson, status: queued|sent|failed|dead, attempts, lastError, scheduledAt, sentAt, orderId?, createdAt }`. Every notification is **enqueued in the same Prisma transaction** as the state change it belongs to (no lost notifications on crash-after-commit). A tiny flush job (§7) sends queued rows and retries failures with backoff **1m → 5m → 30m, ×3**, then marks `dead`; dead letters visible in admin.

**Provider seam:** `interface SmsProvider { send(to, text, opts?): Promise<{ ref }> }` + `KavenegarImpl` (plain `fetch` against Kavenegar REST from the owned service line). — *Rejected:* official SDK dependency (one more dep for one HTTP call); *rejected:* sending inline from route handlers (no retry, no audit, couples HTTP latency to Kavenegar).

**Template registry** (`src/lib/sms-templates.ts`, Persian, `{placeholders}`):

| Template | Recipient | Persian text (keep ≤ 1 segment ≈ 70 chars) |
|---|---|---|
| `otp` | customer | «کد ورود پیشنام: {code} — تا ۵ دقیقه اعتبار دارد.» |
| `order_confirm` | sender | «{name} عزیز، سفارش {code} ثبت شد ♥ پیگیری: pishnam.ir/track» |
| `admin_new_order` | owner | «سفارش جدید {code} — {total} تومان — {method}» |
| `payment_approved` | sender | «پرداخت سفارش {code} تأیید شد ✓ به‌زودی آماده و ارسال می‌شه.» |
| `payment_rejected` | sender | «رسید سفارش {code} تأیید نشد ({reason}). تا ۳ بار می‌تونی رسید جدید بفرستی.» |
| `shipped_tracking` | sender | «سفارش {code} با {carrier} ارسال شد 📦 کد رهگیری: {tracking}» |
| `abandon_cart` | sender | «هدیه‌ت هنوز آماده‌ست ♥ {code}: pishnam.ir/track» — **once, at ~6h** |
| `low_stock` | owner | «موجودی {variant} فقط {n} عدد مونده» (threshold from Setting, ≤ 3) |
| `refund_outcome` | sender | «درخواست مرجوعی {code}: {outcome}» |

> ### 🚨 SMS COST ALARM — the budget does not close at year-1 target volume
> 500 orders/day × ~3.5 SMS/order × ~120–130 toman ≈ **6–6.5M toman/month** — **3× over** the 2M budget. Even at 250/day it's ~3.3M. Prescribed policy:
> 1. **Every template is 1 segment** (hard rule in `sms-templates.ts`; a unit test asserts ≤ 70 chars).
> 2. **Documented trim to 2 SMS/order at scale**: when sustained orders pass **~150/day** (a `Setting` flag), (a) drop `order_confirm` for Zarinpal-paid orders (the redirect-back success screen IS the confirmation; keep it only for manual payments where a wake-up is genuinely needed), (b) route `admin_new_order`/`low_stock`/`refund_new` to a **free Telegram bot** instead of SMS (owner already uses Telegram/WhatsApp for support). Result: ~1.3 SMS/order (mostly `shipped_tracking` + payment outcomes) → 500/day × 1.3 × 125 ≈ **0.8M/month — inside budget**.
> 3. Seasonal peaks are weeks, not months — the Yalda/Valentine overage is a conscious, owner-approved exception, not a permanent leak.
> — *Rejected:* SMS batching/aggregator haggling now (Kavenegar service line is owned; renegotiate only if the 2-SMS policy still breaks budget).

## 7. Background Jobs — systemd timers → signed internal endpoints

**No in-process cron** (`node-cron`/`setInterval` dies with deploys and double-runs under dev hot-reload). One `POST /api/jobs/{name}` route family, each guarded by constant-time compare of the `x-cron-secret` header against env `CRON_SECRET`; timers live in systemd on the VPS (`OnCalendar`), each just `curl -sS -X POST -H "x-cron-secret: …" http://127.0.0.1:3000/api/jobs/{name}`. Every run appends a row to `JobRun { name, startedAt, finishedAt, ok, detail }` — cheap audit the AI can read when debugging. All jobs are **idempotent** (safe to double-fire).

| Timer | Job | Action |
|---|---|---|
| every 10 min | `expire-unpaid` | `AWAITING_PAYMENT` (and `FAILED`) older than **24h** → `EXPIRED`, **stock released** |
| every 2 min | `sms-flush` | send queued `SmsOutbox` rows, backoff ×3 (§6) |
| hourly | `abandon-cart` | `AWAITING_PAYMENT` age > **6h** and `smsAbandonedAt IS NULL` → enqueue `abandon_cart` **once** (set flag) — no extra table needed |
| hourly | `low-stock` | variants with `stock ≤ Setting.low_stock_threshold` → enqueue `low_stock` to admin (once per crossing) |
| daily 04:30 | `backup` | **pre-hook pattern**: `sqlite3 db.custom "…/.backup …"` + tar `/data/uploads` → `/data/backups/`, prune > 14 days |
| daily 05:00 | `purge` | stale `AuthCode`, expired `Session`, old `JobRun` |

— *Rationale:* single-instance boring infra, survives deploys, visible in `systemctl list-timers`. — *Rejected:* in-process scheduler (dies with the app); *rejected:* a separate worker service + queue (constraint: one app, one VPS); *rejected:* GitHub Actions cron (data residency must stay in Iran).

## 8. Admin API Surface (2 users: OWNER / OPERATOR)

All under `/api/admin/*`, guarded by `requireAdmin` (§4), mutations logged to `AdminLog`. The client-side PIN gate (`1398` hardcoded, hint shown in UI) is deleted.

| Endpoint | Roles | Purpose |
|---|---|---|
| `GET /api/admin/orders?status&q&page` | both | list/filter/search (code, phones, names, plush), paginated — replaces the current read-only admin that fetches the unscoped dump |
| `POST /api/admin/orders/{id}/transition {to, note?}` | both | state-machine-validated transitions only (§1) |
| `POST /api/admin/orders/{id}/shipping {carrier, trackingCode}` | both | → `SHIPPED` + `shipped_tracking` SMS |
| `GET /api/admin/receipts?status=under_review` / `POST …/{id}/approve|reject` | both | manual-payment review queue with age badges (12h SLA visible) |
| `GET /api/admin/stock` · `POST /api/admin/stock/adjust {variantId, delta, reason}` | OWNER | exact-count inventory; writes `StockMove` audit row (receive/damage/correction) |
| `GET /api/admin/experiences?status=pending` · `POST …/{id}/approve|hide` | both | UGC moderation (13-a: currently zero moderation) |
| `/api/admin/posts` CRUD | both | DB-backed blog (Post model already scaffolded; published flag) |
| `GET /api/admin/settings` · `PUT /api/admin/settings` | OWNER | typed key allowlist: ship fees, manual card/sheba/holder, low-stock threshold, SMS trim policy, announcement |
| `GET /api/admin/export/orders.csv?from&to` | OWNER | streamed CSV (PII inside — OWNER-only, logged) |
| `GET /api/admin/logs` · `GET /api/admin/jobs` | both | AdminLog + JobRun visibility |

## 9. Refund Flow (damage-only per owner's answer)

Policy: personalized gifts are legally exempt from the blanket 7-day return; owner chose **damage-only**. The legal pages still publish the 7-day policy with the customized-goods exception stated (answer `legal_pages: refund`).

1. Customer opens `/track` (order `code` + their phone as proof) → `POST /api/refund-request {code, phone, reason, damagePhotos[] (≤3, same validation as receipts)}` — only valid while status ∈ {`SHIPPED`, `DELIVERED`} and ≤ 7 days after delivery; sets `REFUND_REQUESTED`.
2. Admin sees it in the queue with photos + order history → `approve` → admin performs the refund **manually** (card-to-card transfer) and marks `REFUNDED` with the transfer reference in the note → `refund_outcome` SMS. `reject` → state restored to `DELIVERED` + SMS with reason.
3. No PSP refund API at launch (Zarinpal refunds are possible but manual transfer is the boring, owner-controlled path; can be added as a `verify`-style provider method later).
— *Rejected:* auto-approval flows / self-service refunds (fraud surface on a gift shop with photos as sole evidence).

## 10. Security Checklist (deploy gate)

- **Uploads:** size cap ≤ 5 MB, **magic-byte MIME sniff** (never trust extension/Content-Type), random filenames, stored outside `public/`, served only through authenticated endpoints, rate-limited, images never executed/served inline (`Content-Disposition: attachment`, `X-Content-Type-Options: nosniff`).
- **Secrets inventory** (`.env`, git-ignored; documented in `docs/secrets.md` + deploy runbook for AI maintenance): `DATABASE_URL`, `SESSION_SECRET` (pepper for OTP hashes + admin cookie HMAC), `CRON_SECRET`, `KAVENEGAR_API_KEY` (+ sender line), `ZARINPAL_MERCHANT` (sandbox/prod), `SMS_DEV_ECHO`, `ADMIN_SEED_PHONES`, `UPLOAD_DIR`. No secret in code or logs; admin PIN "1398" **deleted**.
- **Headers** (static via `next.config headers()`): `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, `Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; img-src 'self' data:; style-src 'self' 'unsafe-inline'` — pragmatic CSP at launch (Next inline bootstrap), tighten to nonces post-launch. `HSTS` + TLS terminated at Caddy/nginx on the VPS with Let's Encrypt (domain pishnam.ir when registered — answer: not yet).
- **Admin login via OTP** to the 2 allowlisted phones (same hardened OTP path, same rate limits) — separate `pn_admin` cookie, 8h admin session TTL vs 30d customer.
- **Misc:** `typescript.ignoreBuildErrors = false` + `noImplicitAny: true` restored (13-a finding), strict input clamps server-side everywhere (pattern already exists), Prisma errors never leaked to responses, all Persian-digit normalization through one module.

## 11. Prisma Schema Delta (design only — migration executed in a later dev round)

New models: `Session` · `AdminUser {phone @unique, role}` · `ProductVariant {sku @unique "bear-lg", kind, size, priceToman, stock, active}` (seeded 12 rows) · `StockMove` · `Setting {key @unique, value}` · `SmsOutbox` · `PaymentReceipt {orderId, file, sha256 @unique-per-order, attempt, status}` · `OrderEvent` · `AdminLog` · `JobRun`.
`GiftOrder` gains: `code @unique (PN-…)` · `idempotencyKey @unique` · `status` new enum values (§1) · `paymentMethod` · `shippingFee` · `totalBreakdownJson` · `carrier` · `trackingCode` · `attemptCount` · `cancelReason` · `smsAbandonedAt` · `refund fields` (reason, requestedAt, decidedAt). `User`/`Post` scaffold stays (blog); legacy `no` kept briefly for the local-first merge migration, then dropped. Backfill note: demo rows (1000/104/102) are wiped before launch (locked decision from Task 13).

## 12. Phasing (respecting the locked "wave-0 route-ready / real routes at deploy")

- **فاز ۰ (sandbox, now):** §4 security fixes (sessions, per-phone scoping, bootstrap endpoint, admin guard skeleton) · §5 rate-limit + OTP hardening · §1 `order-status.ts` module + §3 adapter interfaces as route-ready modules — all testable via curl behind `/` with the hash router intact.
- **فاز ۱ (deploy wave):** §2 checkout + stock · §3 live Zarinpal/Manual providers + uploads · §6 Kavenegar live · §7 systemd timers + backups · §8 full admin surface · real routes/sitemap (SEO wave) · demo-data wipe.
- **فاز ۲+:** coupons (totals contract already reserves `discount`), SMS trim policy flip at ~150 orders/day, PostgreSQL tripwire (§0), Zarinpal refund API.

## Open Questions for the Critic

1. **Zarinpal amount unit (Rial vs Toman ×10)** — I prescribed convert-×10 with a sandbox self-test; is there a way to pin this against the owner's *existing* merchant account before deploy day?
2. **Abandon-cart for guests:** reachable only when the sender phone is already known (unpaid `AWAITING_PAYMENT` rows). Acceptable to skip logged-out visitors who never reached checkout, or do we need a draft-capture ping?
3. **`order_confirm` for Zarinpal orders:** drop from day 1 (cost) or keep until 150 orders/day for trust-building?
4. **Offsite backup target within Iran:** second cheap Iranian VPS vs owner's home machine pull — budget shows ~0 spare toman; which does the owner accept?
5. **Receipt photo privacy retention:** keep receipts forever (tax/مودیان evidence?) or purge at 90 days?
6. **Media storage — reconcile with the parallel ops/infra plan (Task 13 round, worklog):** that plan moves ALL media (receipts, voice notes) to Arvan S3 off-box (voice-note math: 1.5 MB × 500 orders/day ≈ 22.5 GB/mo → the 40 GB disk dies in < 2 months) and sets its PostgreSQL trigger at > 800 orders/day, while this doc's §3/§9 store uploads on-box under `/data/uploads` (backup + prune) with a > ~300 orders/day trigger. Both plans agree on WAL pragmas, systemd jobs, secrets discipline. Critic should pick one media home (Arvan private bucket + presigned PUT **recommended if budget allows** — it also solves the §10 backup question) and one trigger number before فاز ۰ implementation.
