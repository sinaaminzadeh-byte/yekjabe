# 13-h — Adversarial Critique of 13-d / 13-e / 13-f / 13-g

Agent: architecture-critic-v2 · Round 13-h · RESEARCH ONLY (no code touched, dev server untouched).
Evidence base: the 4 deliverables + `architecture-answers.json` (46 binding answers) + code spot-checks (`api/orders/route.ts` unscoped 200-row dump ✓, `bootSync()` full pull per page load ✓, `admin.tsx` `ADMIN_PIN="1398"` ✓, `api/auth/request` `Math.random` 4-digit + unconditional `devCode` echo ✓, `pay-modal.tsx` client-only total ✓, `schema.prisma` legacy-only ✓).

## VERDICT (orchestration-ready)

All four plans are accepted with corrections. Answer-conformance is high: budget honesty (SMS scaling law shown, ✗ rows flagged), damage-only refund, no COD/coupons, 2 admins, exact SMS set, 3 carriers + per-carrier tracking, never-free shipping, guest checkout, voice+card, product-first, residency — all honored. But the docs were written in parallel and **disagree on identity-level decisions**: Order table (extend `GiftOrder` vs new `Order`), Session (DB vs stateless JWT), media home (on-box vs Arvan), PG trigger (300 vs 800), analytics (Fathom vs Umami "decided"), backup/schedule times. 13-d's spec of Zarinpal timeout, /g password brute-force, and the write-retry wrapper is incomplete — these WILL bite before 500 orders/day. Schema draft 13-e is the canonical base; 13-d must be re-pointed at it. No plan item is fatally over-engineered; 2 tables get folded. **10 MUST-FIX, all resolvable as doc edits + prescriptions — none re-opens a locked decision.**

## MUST-FIX (blocking doc finalization)

1. **13-d §11 vs 13-e §1 — Order table identity.** 13-d extends legacy `GiftOrder` (adds code/idempotencyKey/status); 13-e creates new `Order` + freezes/drops `GiftOrder`. → **Prescription: 13-e wins — new `Order` is canonical; rewrite 13-d §11 to target `Order`; legacy GiftOrder never carries production data.**
2. **13-d §4.1 vs 13-e §7 — Session storage.** 13-d models `Session` in DB; 13-e says "not in DB — signed JWT". → **Prescription: DB-backed sessions (30d customer / 8h admin, `pn_session`+`pn_admin` cookies, purge job already exists) — revocation, logout, admin kill are impossible with stateless JWT; fix 13-e §7 row.**
3. **13-d §5 + 13-e — /g/[no] gift-password brute force is unhandled.** `cardPassword` is low-entropy (13-e admits), verified on a public surface, and 13-d's rate-limit table has NO `gift_open` scope and Order has no password-attempt counter. → **Prescription: rate-limit `gift_open:{code+ip}` 5/15min + per-order attempt counter (≥10 → lock + owner alert) + hash cardPassword (argon2) once verify moves server-side in فاز ۰.**
4. **13-e §5 vs 13-d — write-retry wrapper named but not spec'd.** 13-e admits busy_timeout is per-connection/flaky under Prisma pool and gestures at "3× jittered backoff"; 13-d omits it entirely. → **Prescription: spec `src/lib/db-write.ts: withWriteRetry()` (3 attempts, 25–75ms jitter, only on SQLITE_BUSY, wraps every write tx incl. checkout), فاز ۰ acceptance = 50-concurrent curl test with 0 BUSY errors surfaced.**
5. **13-d §3/§9 vs 13-g §4.5 — media home.** On-box `/data/uploads` (13-d) vs ALL media → Arvan (13-g). → **Prescription: 13-g wins — private Arvan bucket + presigned PUT for receipts/voice/UGC (disk math is decisive: 22.5GB/mo at 500/day kills the 40GB disk; presigned PUT is RAM-neutral); 13-d's local path is sandbox/dev stand-in only; budget already carries 100–250K/mo Arvan.**
6. **13-d §0 vs 13-g §8 — PostgreSQL trigger number.** ~300 orders/day (13-d) vs >800 or ≥4GB (13-g). → **Prescription: one canonical wording = 13-e §8's evidence list, headline ">500 orders/day sustained 2+ weeks" AND observed symptom (SQLITE_BUSY p99 after retry wrapper / second instance / PG-needing service); resize 4c/8G stays the first lever. 300 is false-alarm territory at ~1 write/s.**
7. **13-f §8 vs 13-g §1.1/§6 — analytics contradiction.** 13-f: "Self-hosted Umami (decided)"; 13-g: Fathom Lite (Umami needs PG ≈ +250MB on a 2GB box). → **Prescription: Fathom Lite at launch (cookieless → no consent banner needed); fix the 13-f line; Umami-with-shared-PG re-evaluated only on PG-day if the owner wants session-level analytics.**
8. **13-d §11 vs 13-e `Payment` — receipt model + hash scope.** 13-d invents `PaymentReceipt{sha256 @unique-per-order}` while §3 wants cross-order dedupe; 13-e's `Payment.receiptHash` is a plain index with app-level dedupe (already correct). → **Prescription: adopt 13-e's `Payment`; 13-d §11 aligned; dedupe = reject hash matching an existing `verified|pending_review` payment, allow reuse after `rejected`.**
9. **13-d §3 — Zarinpal "verify never returns" path missing.** Callback OK but verify call times out → order stuck `AWAITING_PAYMENT` forever; nothing re-verifies. → **Prescription: persist `authority` (already @unique) before redirect; hourly reconcile job re-verifies orders with a Payment row stuck >1h; success screen gets a «بررسی مجدد پرداخت» button.**
10. **13-g §2.2/§4.3 vs 13-d §7 + timezone — schedule drift & TZ.** Backup 03:30 (13-g) vs 04:30 (13-d); purge 04:00 vs 05:00; no Asia/Tehran pinned for OnCalendar timers, and 13-e's daily order-code counter + Jalali "YYMMDD" is ambiguous if server clock is UTC. → **Prescription: one schedule (03:30 backup, 04:00 purge+digest), `TZ=Asia/Tehran` + NTP on all timers, counter keyed on Tehran Gregorian date, PN date = Tehran date rendered in Jalali via one helper with a unit test.**

## SHOULD-FIX (fold into the final prescription doc)

- Manual-receipt SLA: 13-d shows «تا ۱۲ ساعت», 13-g suggests 2h. Resolve: display «تا ۱۲ ساعت» (honest worst case, owner asleep), ops target 2h business hours; queue already shows oldest-age.
- 3-attempts rule: auto-CANCELLED after 3rd rejected receipt is harsh if an admin mis-rejects → OWNER-only "reopen" action; show attempt counter in admin queue.
- ACK-timeout fallback (13-d §2) falls back to `order_confirm` SMS — but 13-d §6 trims exactly that SMS for Zarinpal at scale → fallback must be `/track` with code+phone (always works); keep order_confirm only for manual payments.
- k6 load test: specify it runs OFF-BOX (owner laptop / cheap 2nd VPS) — on-box k6 steals the same 2 cores it measures and risks OOM; on-box run invalidates p95. Staging = same box at 03:00 or accept micro-downtime; 50 concurrent writes ≈ 80–100 tx/s vs SQLite serialized ~100–200/s — math is plausible but only with 1-statement txs + retry wrapper.
- Arvan S3 object backup: DB is replicated but bucket objects aren't — enable bucket versioning (or nightly rclone second-prefix sync in the 03:30 job).
- Restore drill script must be schema-aware: it greps `GiftOrder/AppUser` which are dropped at launch — switch to `Order` post-cutover.
- Newsletter (owner answer `sms`): missing from all four plans. Minimum: optional marketing-consent checkbox at checkout + admin campaign send via SmsOutbox; full newsletter = phase 2. Persian consent wording required.
- مودیان evidence: owner says registered, but no doc covers invoice output. Minimum: OWNER CSV export (exists) declared sufficient for the accountant + receipts retained ≥12mo (13-e's 12mo purge stays until owner answers).
- /track customer timeline: map the 11 internal states → ≤5 customer-facing Persian steps (ثبت شد/در انتظار پرداخت/آماده‌سازی/ارسال شد/تحویل شد + مرجوعی branch); never leak `payment_under_review` internals.
- Damage refund must include shipping fee when damage is carrier-fault — say it on /legal/refund.
- `stats.pishnam.ir`: basicauth in Caddy is "consider" → make it MUST (Fathom's single password is not enough for a public subdomain).
- CSP `script-src 'unsafe-inline'` — acceptable at launch; add a post-launch ticket for nonces.

## NICE

Per-product OG `ImageResponse` (wave-2 already), NPS ping post-delivery, external free uptime ping, seasonal landing pages, story-slug `-2` collision suffix, Search Console quarterly review loop (already in 13-f), coupon row reserved in totals contract (already).

## REJECT-AS-OVERENGINEERING (cut / keep / defer verdicts)

| Item | Verdict | Why |
|---|---|---|
| `AdminLog` table (13-d §4.4/§8) | **CUT → fold into OrderEvent** (`actor=admin` + type vocabulary) | 2 admins; journald + OrderEvent + JobRun already audit everything |
| `StockMove` table (13-d §8) | **CUT → fold into OrderEvent** (`type=stock_adjust`, delta in note) | One audit spine is enough at 12 SKUs |
| Uptime-Kuma (13-g §1.1/§2.2) | **CUT at launch** | 60–90MB is the first sacrifice anyway; systemd OnFailure + health timer + optional free external ping cover the value |
| Umami/Matomo now | **DEFER to PG-day** | Needs PG (~+250MB) — breaks the no-PG-2GB envelope |
| SmsOutbox vs direct send | **KEEP** | Retry + audit + cost control are load-bearing in an SMS-heavy budget |
| 11-state machine | **KEEP** | pending/under_review/failed/expired each earn their place with manual receipts; refund pair required by damage-only; DRAFT already client-only |
| per-IP OTP limits | **KEEP** | One Map; SMS burn is the #1 budget line |
| Fathom Lite | **KEEP** | 15MB Go binary; KPI=conversion is a binding answer |
| OrderEvent / JobRun / presigned PUT / VoiceNote-now / Experience moderation | **KEEP** | Each justified (SMS trigger, AI-ops audit, RAM-neutrality, migration-avoidance, binding UGC answer) |

## CONFLICT RESOLUTIONS (final calls)

1. **Media home:** Arvan private+public buckets from day 1 (13-g). 13-d on-box = sandbox stand-in only. Loser rationale: 40GB disk dies <2mo at Y1 peak; backups double it.
2. **PG upgrade trigger:** ">500 orders/day sustained 2+ weeks" + evidence conditions (SQLITE_BUSY p99 post-retry-wrapper / 2nd instance / PG-needing service); 4GB resize first. 300 → deleted, 800 → softened to the same wording.
3. **Analytics:** Fathom Lite now (self-hosted ✓ cookieless, no banner needed); Umami re-opened only on PG-day. 13-f §8 line corrected.
4. **Session:** DB-backed `Session` table (13-d), 13-e §7 line corrected. Separate `pn_admin` vs `pn_session` cookies prevents admin/customer collision; logout = delete row + clear cookie (add to spec).
5. **Order table:** new `Order` (13-e); 13-d §11 rewritten. **Status literals: lowercase** (`paid`, `awaiting_payment`) matching the draft.
6. **Found-and-resolved extras:** backup 03:30/purge 04:00 (13-g schedule wins); jobs route `/api/jobs/*` (13-d wins, fix 13-g env table's `/api/cron/*`); receipt model = `Payment` (13-e); SLA wording = 12h display / 2h ops target; Zarinpal ×10 Rial encoding is **consistent** across 13-d (PSP adapter) and 13-f (JSON-LD ×10 inside builder) — no fix needed.

## Sanity confirmations (critique dimensions that PASS)

- **Oversell guard:** single conditional `updateMany` in one tx is atomic under SQLite single-writer; multi-item = one updateMany per distinct variant, all-or-nothing; stock release only from cancelled/expired/expired transitions. Sound. Race with admin stock adjust: admin adjust is also a single statement through the same serialized writer — no lost update; log both to OrderEvent.
- **/g/ SEO trap:** 13-f's prescription is technically correct — `noindex,follow` meta + `/g/` kept OUT of robots.txt (facebookexternalhit/WhatsApp obey Disallow and would drop OG previews); no fake 301 anywhere — hash fragments never reach the server, client `replaceState` shim only. Sitemap ≈ 24–30 URLs — trivial, no split. Slug immutability + پیشتم→پیشنام sweep scheduled pre-wave-1 ✓. AggregateRating gate ≥5 real reviews: **confirmed strict**; the «۳۱۸ نظر» seed may render visibly but never enters JSON-LD.
- **Domain unregistered:** blocks wave-1 production launch (canonical/sitemap/SSL/اینماد/PSP all need it) but not wave-0; registration stays "this week" (13-g risk #7).
- **Answer-conformance:** all 11 sections conform (see VERDICT); `free_thr: never` honored; `sms_notify` set = confirm/admin/tracking/abandon all present (+low_stock/refund extras are admin-side, cost-trivial); guest checkout = phone-anchor, no password ✓.

## OWNER-DECISION NEEDED (فقط خود مالک می‌تواند جواب بدهد)

1. قیمت سایز بزرگ (L) چند است؟ «یه قیمت برای همه» با دو سایز جمع نمی‌شود؛ تا قبل از سید دیتابیس لازم است.
2. دامنه‌ی pishnam.ir همین هفته ثبت می‌شود؟ (اینماد، درگاه، SSL و نقشه سایت همه پشت آن بلاک‌اند.)
3. برای تأیید دستی کارت‌به‌کارت، مشتری «تا ۱۲ ساعت» ببیند یا «۲ ساعت کاری»؟ بعد از نیمه‌شب چه وعده‌ای بدهیم؟
4. رسیدهای پرداخت برای مالیات/مودیان چند ماه نگه داشته شود؟ (پیشنهاد ما: ۱۲ ماه + خروجی CSV برای حسابدار — کافی است؟)
5. خبرنامه‌ی پیامکی: عضویت داوطلبانه در صفحه تسویه + ارسال ماهانه از پنل ادمین را تأیید می‌کنید؟ (متن رضایت قانونی لازم است.)

## FINAL-DOC CHECKLIST (sections the orchestrator's prescription HTML must contain)

1. Binding answers summary strip (46 answers → 12 hard constraints, incl. never-free shipping / damage-only / 2 admins).
2. Canonical platform lock (Next monolith, SQLite WAL, no Redis/Docker, wave-0/deploy-wave phasing).
3. **Single reconciled schema reference** = 13-e draft + MUST-FIX 1/2/8 amendments (new Order, DB Session, Payment; OrderEvent absorbs AdminLog/StockMove).
4. Order state machine (11 states, lowercase, actor+SMS table, customer-facing /track mapping).
5. Checkout + oversell + idempotency + ACK contract (with `withWriteRetry()` spec + 50-concurrent test gate).
6. Payment: Zarinpal adapter (×10 trap, amount-vs-DB verify, idempotent callback, reconcile job) + manual receipt flow (Arvan private bucket, hash dedupe, 3 attempts + reopen, 12h/2h SLA).
7. Security: P0 list (sessions/IDOR/bootstrap, admin OTP+roles, PIN-1398 kill), OTP hardening, rate-limit table **+ gift_open scope**, cardPassword hashing, headers/CSP, secrets inventory.
8. SMS: 9 templates (≤70 chars), outbox, cost alarm + 150/day trim trigger, newsletter consent wording.
9. Ops: memory budget, systemd units, off-box-build reality (AI-sandbox build + rsync; swap-guarded fallback), Arvan S3/CDN + bucket versioning, Litestream + nightly backup (03:30/04:00, Asia/Tehran), monthly restore drill (schema-aware), /api/health + alert SMS.
10. Cost table (honest incl. SMS scaling + mitigated rows + 4c/8G first lever).
11. SEO/content: route map with waves, metadata/JSON-LD (IRR×10 builder, AggregateRating gate), slugs, keyword map + 8 posts, stories/UGC governance, performance budget, robots/sitemap rules (noindex≠Disallow).
12. Roadmap فاز ۰–۳ with acceptance criteria (incl. k6 off-box targets) + launch checklist + scale-trigger table (unified PG wording).
13. Open owner questions (the 5 above) + renamed-brand/domain switchover notes.
