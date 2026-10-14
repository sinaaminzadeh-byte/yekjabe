# 13-e · Target DB Schema — Design Notes (db-architect)

Companion to **`docs/13-e-schema-draft.prisma`** (drop-in draft, `prisma validate` ✅ against Prisma 6.19.2 / SQLite).
Research deliverable — **no code touched, no db:push, dev server untouched.**

Scope recap (locked by Task 13 round + owner's 46 binding answers): SQLite WAL on a 2c/2G Iranian VPS for launch, PG upgrade runbook later with explicit triggers; server-authoritative checkout; order state machine `awaiting_payment → … → delivered` incl. `payment_under_review` for manual receipts; exact-count inventory; demo-data wipe before launch.

---

## 1. Model inventory & per-model rationale

18 models total: **11 new**, 2 upgraded, 2 hardened, 3 kept verbatim, 1 legacy-frozen.

| Model | Rationale (why it exists / key decisions) |
|---|---|
| `Product` | One row per plush family (6 at launch). `slug` is latin-transliterated for the future crawlable `/product/[slug]` PDPs (SEO round 13-b); `nameFa/taglineFa/descriptionFa` carry the Persian copy already living in `pishnam-data.ts` so the catalog becomes DB-owned. |
| `ProductVariant` | Variants = **size only** (owner answer). 2 rows per product ⇒ 12 launch SKUs. `sku` = `bear-S` style unique id for packing slips; `stock` is exact-count; `lowStockThreshold` (default 3) drives admin low-stock alerts. |
| `Order` | The clean, server-authoritative replacement for `GiftOrder`. Server assigns `code` + prices; client never sends totals (kills 13-a P0 "client-computed total ×3"). `idempotencyKey @unique` makes client retry safe; `userPhone=""`=guest, `sessionPhone` enforces "userPhone must equal the verified session phone" (IDOR guard). `hearts/paws` kept as charity-ledger counters (defter-e mehraboni). |
| `OrderItem` | Line items with **frozen snapshots** (`kind/size/title/unitPriceToman`) — catalog renames/price changes must never falsify history or receipts. |
| `OrderEvent` | Append-only audit trail (type+actor+note). Powers the customer timeline, the admin history, and is the **single trigger point for SMS** (event row + `SmsOutbox` row written in the same transaction). |
| `Payment` | One row per payment attempt. `method=zarinpal` (authority/refId) vs `manual_transfer` (card-to-card with S3 receipt + `receiptHash` dedupe + admin `pending_review → verified/rejected` flow). Amount checked server-side against `Order.totalToman` at verify (13-c PSP-callback rule). |
| `SmsOutbox` | Every Kavenegar send is an outbox row first (queued → worker → sent/failed, with attempts/lastError). Decouples business events from the provider and gives SMS audit + retry + prune. |
| `Experience` | «تجربه مخاطب» UGC stories: public form → `pending` → weekly admin approval (`approved/rejected`), optional featured. Mirrors the proven reviews pipeline with a moderation gate (13-b/13-c requirement). |
| `Post` | Scaffold upgraded into the real blog model: slug/markdown/SEO fields, `draft|published`, `publishedAt` for sitemap/canonical. No author FK — the writer is the owner (`AdminUser role=owner`), per owner answer "me, 2–4 posts/mo". |
| `Setting` | Admin-editable KV for everything that used to be a constant: manual-transfer card/Sheba/holder, shipping fees (49k/69k), promise text, charm price, support links, Kavenegar sender, **daily order-code counters**. |
| `VoiceNote` | Phase-2 voice personalization: 1:1 with order, S3 object `key` only, duration + upload status. Schema lands now so phase-2 needs no migration drama. |
| `AdminUser` | 2 admins (owner answer), OTP login like customers. `role=owner|operator` gates destructive ops; `isActive` = instant revocation. |
| `AppUser` | Kept: customer identity for OTP accounts (guest checkout needs no row). |
| `AuthCode` | **Hardened**: `code` plaintext → `codeHash` (sha256+salt), `attempts` counter (≥5 ⇒ dead code), `ip` captured. Fixes 13-a P0 (plaintext, brute-forceable, no counter). Demo rows wiped at cutover. |
| `Favorite` / `Review` / `ContactMessage` | Kept verbatim — production-able as-is. Only demo rows are wiped (see §4). |
| `GiftOrder` | **LEGACY — frozen.** Kept verbatim so the running demo keeps working; marked for pre-launch wipe + table drop. New checkout code must not reference it. |
| *(removed)* `User` | Dead scaffold; no FK ever pointed at it. Removed in the draft. |

**Vocabulary convention:** every closed value-set is a `String` with the legal values in the field's comment (`// vocabulary: a | b | c`) — SQLite has no enums, and each of these maps 1:1 to a future PG enum (§6).

---

## 2. The oversell guard (exact-count inventory)

```ts
// inside prisma.$transaction(async (tx) => { … })  — one tx per checkout:
const upd = await tx.productVariant.updateMany({
  where: { id: variantId, isActive: true, stock: { gte: qty } },
  data:  { stock: { decrement: qty } },
});
if (upd.count === 0) throw new OutOfStockError(variantId); // → 409 «موجودی تموم شده»
// …then create Order + OrderItems + OrderEvent(+SmsOutbox) rows in the SAME tx
```

**Why this shape:**
- It is a **single atomic statement** (`UPDATE … WHERE stock >= qty`): the check and the decrement happen inside the storage engine, so there is no read-modify-write window to race through. The classic `SELECT stock → if > 0 → UPDATE` pattern *can* oversell because two interleaved reads both see stock=1.
- SQLite serializes writers (one writer at a time, even in WAL), so inside a transaction this is trivially safe **today**; and the identical SQL is also race-free under PostgreSQL MVCC **after** the upgrade — the guard survives the migration unchanged. Zero app-level locks needed.
- `count === 0` is an unambiguous, cheap signal for "gone" → clean 409 → UI restocks the cart.
- Multi-item orders: run one `updateMany` per distinct variant inside the same transaction — all-or-nothing; no partial orders, no stock leaks on failure.
- Restock/cancel path uses the inverse (`decrement: -qty`) guarded by `stock: { gte: 0 }`→ no, guarded by clamping: `where: { id }, data: { stock: { increment: qty } }` only from `cancelled/refunded` transitions logged in `OrderEvent`.

---

## 3. Order `code` scheme — `PN-YYMMDD-####`, collision-safe

- Format `PN-260514-0007`: brand prefix + Jalali-derived YYMMDD (server clock) + **daily** 4-digit sequence starting `0001`. Daily reset keeps codes short, un-guessable in aggregate, and leaks **no total-order count** (privacy: a shop showing "order #4812" advertises its volume).
- **Generation lives inside the checkout transaction**: read counter row `Setting(key='order_seq_YYYYMMDD')`, write order with `code = PN-…-zeroPad(seq+1)`, bump counter — all in one tx. SQLite's single-writer serialization makes read→increment→write un-interleaveable inside a tx.
- **Backstop:** `code @unique`. On the (theoretically impossible, but defend-in-depth) `P2002` collision, retry with `seq+1` up to 3×. Even if the counter row were ever deleted/mis-seeded, uniqueness guarantees no silent duplicate; the retry heals the counter.
- Legacy client ids (`g-<no>-<ts>`) are **dead** in the new flow: the client sends only `idempotencyKey` (a uuid), the server returns the authoritative `code`. This kills the 13-a P0 race where two clients claimed the same gift `no`.

---

## 4. Demo-data wipe + seed plan (pre-launch, one script: `scripts/launch-wipe-seed.ts`)

**Wipe (demo artifacts from Tasks 9–12 must NOT reach production):**
1. `GiftOrder` — **all** rows (demo orders 1000/104/102 + local `seed-96` artifacts). Optionally export to JSON archive first (`/backup/demo-giftorders.json`).
2. `AppUser` «نیلا» `09123456789` + its `Favorite` rows (5 kinds) + **all** `AuthCode` rows (plaintext demo codes + stale rows — also fixes the 13-a "never cleaned" finding).
3. Test `ContactMessage` rows; `Review` is already empty after Task-12 cleanup — **leave empty** (the UI adds the 318 static baseline separately; seeding would double-count).

**Keep:** `Favorite`/`Review`/`ContactMessage` models + any *real* rows bound to real phones (schema untouched, production-able).

**Seed:**
- 6 `Product` rows: families `bear/bunny/cat/duck/panda/sheep`, slugs `creamy-bear / lapghandi-bunny / mishi-cat / bambou-panda / abri-sheep / ghatghati-duck` (final transliteration = critic open question), Persian names from `PLUSHES` (کِرِمی، لپ‌قندی، میشی، بامبو، ابری، قات‌قات), tagline = chips, description = blurb, cover images when the owner's real photos arrive ("soon").
- 12 `ProductVariant` rows (`*-S`, `*-L`): priceToman placeholder (S=890,000 per design; L TBD — open question), stock = **real counts the owner types in** (exact-count truth), lowStockThreshold 3.
- `Setting` rows: `manual_transfer_card_number / _sheba / _holder` (from owner), `ship_fee_tehran_toman=49000`, `ship_fee_other_toman=69000`, `shipping_promise_fa`, `charm_price_toman=50000`, `charity_base=18`, `low_stock_threshold=3`, `support_telegram`, `support_whatsapp`, `kavenegar_sender`.
- 2 `AdminUser` rows (owner + operator), seeded by phone.

---

## 5. SQLite pragmas to pair with this schema

```sql
PRAGMA journal_mode = WAL;           -- set ONCE; persisted in the db file. Readers never block the writer.
PRAGMA busy_timeout = 5000;          -- per connection; belt-and-braces under write bursts.
PRAGMA foreign_keys = ON;            -- Prisma sets it, but assert it (raw-SQL scripts don't).
PRAGMA synchronous  = NORMAL;        -- safe with WAL; big fsync win on the VPS disk.
PRAGMA journal_size_limit = 8388608; -- 8 MB cap so -wal can't balloon on the 40G disk.
```

Apply via a boot step (`prisma db execute` / `$executeRawUnsafe` in `db.ts` init). Reality check: `journal_mode` persists in the file, but `busy_timeout` is **per-connection** and Prisma's pool makes per-connection pragmas flaky — so the *real* SQLITE_BUSY defense is (a) WAL + (b) an app-level retry wrapper (3×, small jittered backoff) around write transactions + `?connection_limit` tuned on the pool. Keep write transactions short (the oversell guard §2 is one statement).

---

## 6. PostgreSQL upgrade mapping (runbook table)

Mechanical: change `provider = "postgresql"`, replace `url`, add enums + `@db.Text`, `prisma migrate diff --from-schema-datatype-overrides …` / generate SQL diff. All relation structure, indexes and uniques carry over untouched.

| SQLite field (String today) | PG target |
|---|---|
| `Product.family` | `enum product_family` (6 values) |
| `ProductVariant.size` | `enum variant_size` (`S`,`L`) |
| `Order.status` | `enum order_status` (11 values; forward-only rules move into app service, optionally a CHECK trigger) |
| `Order.occasion` | `enum occasion_slug` (4 values) |
| `Order.carrier` | `text + CHECK (carrier IN ('','post','tipax','mahex'))` — list may grow, skip enum |
| `Order.cardMessage`, `Product.descriptionFa` | `@db.Text` |
| `OrderEvent.type` | `text + CHECK` — append-only vocabulary, grows with product |
| `OrderEvent.actor` | `enum event_actor` (`system`,`admin`,`customer`,`psp`) |
| `Payment.method` / `Payment.status` | `enum payment_method` / `enum payment_status` |
| `SmsOutbox.status` | `enum sms_status` (`queued`,`sent`,`failed`) |
| `SmsOutbox.template` | `text` — templates are code constants |
| `Experience.status` | `enum moderation_status` (`pending`,`approved`,`rejected`) |
| `Post.status` | `enum post_status` (`draft`,`published`); `bodyMd` → `@db.Text` |
| `VoiceNote.status` | `enum voice_status` (`pending`,`ready`,`failed`) |
| `AdminUser.role` | `enum admin_role` (`owner`,`operator`) |
| `Review.role` | `enum review_role` (`sender`,`receiver`) |
| `id @default(cuid())` | keep `text` PK + cuid (or `uuid v7` if we want DB-side ids) |
| `DateTime` | `timestamptz` (Prisma maps automatically) |
| money `Int` toman | `integer` — **stays toman, single unit** (Zarinpal rial ×10 conversion stays in the PSP adapter only — the 13-c IRR×10 trap never enters the schema) |
| `Setting.value` | `text` (+ optional typed accessor helpers) |
| `Authority @unique` w/ NULLs | unchanged — PG also allows multiple NULLs in unique |

Also on PG day: real pagination (`take/skip` fine but add keyset for orders), `pg_trgm`/`tsvector` Persian search if needed, PITR backups.

---

## 7. Retention & lifecycle

| Data | Home | Retention |
|---|---|---|
| Receipt photos (`Payment.receiptKey`), voice notes (`VoiceNote.key`), UGC photos (`Experience.photoKey`), covers | **Arvan S3 objects** — DB stores keys only | Receipts: object deleted + key nulled ~12 mo after verify (اینماد/tax window); voice: delete on refund finalization; UGC photo deleted with rejected story |
| `SmsOutbox` rows | DB | Prune `sent/failed` older than **90 days** (weekly cron) — keeps the table tiny; order events remain the real audit |
| `AuthCode` | DB | Purge `used` or `expiresAt < now-24h` **daily** (fixes 13-a "rows never cleaned") |
| `OrderEvent` | DB | Keep forever (small rows, the audit backbone) |
| `GiftOrder` + demo `AppUser/AuthCode/Favorite` | DB | Wiped pre-launch (§4); table **dropped** at launch |
| Sessions | **Not in DB** — signed httpOnly JWT/cookie (stateless, short TTL); 2 admins + customers don't justify a session table |

---

## 8. Why NOT Postgres on day-1 (and what re-opens the question)

**Memory math (one-liner):** PG15 ≈ 100–150 MB resident just idling + ~5–10 MB per connection, while SQLite = **0 MB** (in-process file) — on the owner's 2 GB VPS that already runs Next.js (~250–400 MB) + OS + planned self-hosted analytics, PG eats exactly the headroom that absorbs a Yalda/Valentine spike → OOM-kill risk for zero benefit at 200–500 orders/day ≈ a few writes/sec, which WAL+this schema handles.

**Upgrade triggers (restated from Task 13 lock):**
1. Sustained >~200 orders/day or recurring `SQLITE_BUSY` p99 despite the retry wrapper;
2. Second app instance / blue-green deploys (multi-writer);
3. Need for PG-only powers: Persian full-text/trgm search, keyset pagination at scale, PITR;
4. Analytics (Umami/Matomo) demands a real server DB of its own;
5. Backup/restore SLA beyond file-copy + `VACUUM INTO`.

Until then: WAL + this schema + one writer process is the honest, boring, correct choice.

---

## 9. Open questions for the critic (13-f)

1. **S/L pricing** — does «یه قیمت برای همه» survive two sizes? (S=890,000 placeholder; L price needed before seed.)
2. **`cardPassword`** — plaintext today; hash when gift-open verify moves server-side (فاز ۰)? Affects `/g/[no]` share flow design.
3. **Transliteration of slugs** — `creamy-bear / lapghandi-bunny / mishi-cat / bambou-panda / abri-sheep / ghatghati-duck` — owner-signoff needed (SEO URLs are permanent).
4. **Abandoned-cart SMS** — client-side beacon only, or a `CheckoutDraft` table in phase 2? (Draft recommends client-only + `sendAfter` in `SmsOutbox`.)
5. **`Order.occasion` slug vs UI index** — schema uses slugs with a 0↔slug map at the API edge; front-end agent should confirm the shim.
