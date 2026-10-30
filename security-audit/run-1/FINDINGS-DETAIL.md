# FINDINGS-DETAIL — yekdoost run-1

Complete source traces and target-neutral local reproductions for every confirmed medium, high (and notable low) record. Everything below was established by source inspection only — no request was sent, no code executed.

---

## admin-payments-discard-unguarded-delete

**Ungated 'discard' action lets any operator permanently delete any payment record + receipt file with no audit trail** — severity: medium (likelihood medium, impact medium)

PATCH /api/admin/payments/{id}: approve (line 28) and reject (line 36) require payment.status==='pending_review' with a pre-check plus conditional updateMany; reopen (line 60) is owner-only with an explicit OrderEvent. The fourth action discard (line 70) runs db.payment.delete (line 72) plus deleteReceiptFile (line 73) for ANY payment status with no precondition, no role elevation and no OrderEvent. An operator can silently destroy verified-payment evidence (financial audit trail); ids are enumerable via GET /api/admin/payments.

- Root cause: discard branch written without the sibling guards (status precondition, owner check, audit event) on an operator-level route.
- Intended behavior: discard gated to pending_review via conditional updateMany, audited via OrderEvent, hard delete replaced with a tombstone (status failed) so the trail survives.

### Trace

- **entrypoint** `src/app/api/admin/payments/[id]/route.ts:14` — PATCH /api/admin/payments/{id}: assertSameOrigin (17) + requireAdmin() (18); operator suffices (session.ts:69 defaults min=operator)
- **propagation** `src/app/api/admin/payments/[id]/route.ts:70` — action discard branch: reached with no precondition unlike approve(28)/reject(36)/reopen(60)
- **sink** `src/app/api/admin/payments/[id]/route.ts:72` — db.payment.delete + deleteReceiptFile: row deleted for any status; receipt file + MediaBlob removed; no orderEvent anywhere in the branch

### Evidence

- `src/app/api/admin/payments/[id]/route.ts:28` — approve requires pending_review — the control discard lacks
- `src/app/api/admin/payments/[id]/route.ts:60` — reopen enforces role owner — the role control discard lacks
- `src/app/api/admin/payments/[id]/route.ts:72` — db.payment.delete with no status/role condition
- `src/app/api/admin/payments/[id]/route.ts:73` — deleteReceiptFile destroys the receipt image (disk + MediaBlob)
- `src/app/api/admin/payments/route.ts:29` — GET payments returns ids to any seat — targets enumerable

### Conditions

- *authentication_level*: caller holds any active admin session; operator role admitted
- *data_state*: a Payment row exists in any status; ids enumerable

### Bounded reproduction (source-established)

- Attacker perspective: operator seat sends PATCH {action:discard} to erase verified-payment evidence with no log
- Payload: `{"action":"discard"}`
- Step: source-only: behavior read from the discard branch vs sibling guards
- Observed result: Source inspection established: line 70 opens the discard branch with no status/role check, line 72 hard-deletes the Payment row for any status, line 73 deletes the receipt file and MediaBlob, and the branch writes no OrderEvent, while approve/reject/reopen carry explicit guards at 28/36/60; GET /api/admin/payments exposes ids to operators. No execution was performed (source-only run).

### Remediation

Gate discard to pending_review via conditional updateMany; tombstone (status=failed) instead of hard delete; write OrderEvent; only then remove the receipt file.

Files to change: src/app/api/admin/payments/[id]/route.ts

---

## admin-post-coverkey-arbitrary-delete-primitive

**Unvalidated post coverKey gives any operator a destructive file-deletion primitive over owner-managed and private media namespaces** — severity: medium (likelihood medium, impact medium)

PATCH /api/admin/posts/{id} accepts coverKey as a free-form string (max 200, no prefix/shape/existence validation — zod at line 19); whenever the stored value is truthy and differs from a new truthy value, the previous (attacker-chosen) value is GC-deleted via deleteMediaFile() (lines 60-62) whose allowlist is products/|posts/|branding/|experiences/|refunds/ (src/lib/media.ts:42-47), removing the disk file and the MediaBlob row. Two PATCHes (poison then replace) delete any key under those prefixes: product gallery keys are operator-enumerable via GET /api/admin/products, experience photoKeys via GET /api/admin/experiences, and the logo stem is hard-coded branding/logo.{jpg,png,webp} (≤3 guesses). This defeats the owner-only logo controls at the file layer and destroys private moderation photos. Public leak ruled out (deletion primitive only).

- Root cause: coverKey stored unvalidated; replacement GC treats the stored string as deletion authorization with a namespace allowlist far wider than posts/.
- Intended behavior: coverKey constrained to ^posts\/[A-Za-z0-9._-]+\.(jpg|png|webp)$ plus existence; GC only deletes values matching the same shape.

### Trace

- **entrypoint** `src/app/api/admin/posts/[id]/route.ts:23` — PATCH: operator-level; zod accepts any coverKey ≤200 chars (19)
- **propagation** `src/app/api/admin/posts/[id]/route.ts:62` — coverKey GC: prev (attacker-chosen) value passed to deleteMediaFile when truthy and differing
- **sink** `src/lib/media.ts:49` — deleteMediaFile: rm + deleteMediaBlob for any key under the wide allowlist (42-47)

### Evidence

- `src/app/api/admin/posts/[id]/route.ts:19` — coverKey free-form — no shape validation
- `src/app/api/admin/posts/[id]/route.ts:62` — deleteMediaFile(prev.coverKey) on the stored unvalidated value
- `src/lib/media.ts:42` — allowlist includes experiences/, refunds/, products/, posts/, branding/
- `src/app/api/admin/posts/image/route.ts:48` — cover-slot upload GCs stored coverKey — same destructive seam
- `src/app/api/admin/experiences/route.ts:19` — GET experiences returns full rows incl. photoKey — operator-enumerable targets
- `src/app/api/admin/branding/logo/route.ts:23` — logo upload owner-only — control defeated at the file layer

### Conditions

- *authentication_level*: any operator seat
- *data_state*: existing Post row + target key (admin GETs / hard-coded logo stem)

### Bounded reproduction (source-established)

- Attacker perspective: operator PATCHes coverKey to a victim key, then PATCHes to another value — victim file+MediaBlob deleted; repeat with branding/logo.png breaks the site logo
- Payload: `{"coverKey":"experiences/<uuid>.jpg"}`
- Payload: `{"coverKey":"posts/x.jpg"}`
- Payload: `{"coverKey":"branding/logo.png"}`
- Step: source-only: two-step poison-then-replace read from branch + allowlist
- Observed result: Source inspection established: coverKey passes zod with no shape/prefix/existence check (19) and is stored verbatim; the GC at 60-62 calls deleteMediaFile on the previous stored value, so poison-then-replace reaches deleteMediaFile with an arbitrary key; the allowlist admits products/posts/branding/experiences/refunds and the sink removes disk file + MediaBlob row. No execution was performed (source-only run).

### Remediation

Validate coverKey to the exact issued key shape at every write site (PATCH and POST); GC refuses values not matching the same shape.

Files to change: src/app/api/admin/posts/[id]/route.ts

---

## admin-sms-logs-plaintext-otp-params-operator-readable

**Operator admins read live OTP codes from /api/admin/sms/logs (plaintext in SmsOutbox.params) and hijack owner/customer sessions** — severity: high (likelihood high, impact high)

Every OTP is written verbatim into SmsOutbox.params (otp.ts:50 passes {code} to sendSmsNow, persisted as JSON at sms/index.ts:238-240) and returned unmasked by GET /api/admin/sms/logs (params: r.params at line 39), callable by any operator seat (requireAdmin() default at line 10). An operator requests an OTP for any phone (POST /api/auth/request — rate caps admit a single request), reads the 4-digit code from the newest row, and verifies within the 5-minute TTL: for ADMIN_SEED_PHONES phones verify mints an owner seat (upsert role owner, lines 39-43) plus an admin session (44) — operator→owner takeover; for any other phone it mints a full customer session (46). Rows are never deleted (no retention anywhere).

- Root cause: sendSmsNow persists full delivery params incl. the live OTP code as plaintext JSON; the logs endpoint serves params verbatim to operator seats with no masking at write or read time.
- Intended behavior: Auth codes readable only by the verification flow: redact secret params at write time, mask at read time, ideally owner-only logs, plus SmsOutbox retention.

### Trace

- **entrypoint** `src/app/api/auth/request/route.ts:43` — POST auth/request: issueOtp for arbitrary valid phone; rate caps admit the one request
- **propagation** `src/lib/auth/otp.ts:50` — issueOtp→sendSmsNow: code passed verbatim as params {code}; AuthCode stores only the HMAC hash so the outbox row is the sole plaintext copy
- **propagation** `src/lib/sms/index.ts:239` — SmsOutbox row: params persisted plaintext; no retention delete anywhere in src
- **propagation** `src/app/api/admin/sms/logs/route.ts:39` — GET logs: params: r.params returned verbatim to any operator seat
- **sink** `src/app/api/auth/verify/route.ts:44` — POST verify: stolen code mints customer session (46); ADMIN_SEED_PHONES phone additionally upserts owner seat + admin session (39-44)

### Evidence

- `src/lib/auth/otp.ts:50` — live code into params {code}
- `src/lib/sms/index.ts:239` — params persisted plaintext; no retention
- `src/app/api/admin/sms/logs/route.ts:10` — requireAdmin() default operator
- `src/app/api/admin/sms/logs/route.ts:39` — params verbatim, no masking
- `src/lib/auth/session.ts:69` — requireAdmin default min operator
- `src/app/api/auth/verify/route.ts:44` — createSession admin for ADMIN_SEED_PHONES phones
- `src/lib/env.ts:102` — ADMIN_SEED_PHONES mechanism
- `prisma/schema.prisma:366` — SmsOutbox.params plain String JSON, no TTL

### Conditions

- *authorization_role*: operator seat (created via /api/admin/team)
- *authentication_level*: valid admin session
- *environmental_dependency*: operator→owner leg requires owner phone in ADMIN_SEED_PHONES; customer leg unconditional
- *timing_dependency*: code valid 5 min; attacker triggers issuance and reads immediately

### Bounded reproduction (source-established)

- Attacker perspective: authenticated operator: request OTP for target phone, read code from newest log row, verify — owner or customer session minted
- Payload: `POST /api/auth/request {"phone":"...","purpose":"login"}`
- Payload: `GET /api/admin/sms/logs?page=1 → logs[0].params = {"code":"NNNN"}`
- Payload: `POST /api/auth/verify {phone,code,purpose:"login"}`
- Step: three ordinary same-origin API calls from the operator seat
- Observed result: Source inspection established the full chain statically: otp.ts:50 passes the live code into params; sms/index.ts:238-240 persists it plaintext (AuthCode stores only an HMAC — the outbox is the sole plaintext copy); logs returns r.params verbatim to operator seats; verify exchanges the code for a customer session and an owner seat + admin session for seed phones; no retention job deletes SmsOutbox rows; no redaction/masking/TTL layer exists between write and response. No execution was performed (source-only run).

### Remediation

Never persist OTP codes: redact secret params at write (delivery keeps in-memory values); mask secret params at read as defense-in-depth; consider owner-only logs; add SmsOutbox retention.

Files to change: src/lib/sms/index.ts, src/app/api/admin/sms/logs/route.ts

---

## checkout-unverified-senderphone-customer-scoping

**Unverified sender.phone exposes a full order row and the paymentKey bearer to any third-party phone bootstrap panel** — severity: medium (likelihood medium, impact medium)

Checkout binds orderer.phone to the OTP-verified session (checkout.ts:148-153 — 401/403) but NOT sender.phone (checkout.ts:85 — validPhone shape check only), stored raw as senderPhone (190). /api/me/bootstrap OR-matches senderPhone (route:31) and returns the full unstripped row for non-recv matches — address:53, phone:54, message:56, senderName:61, total:65 — plus paymentKey=o.idempotencyKey (route:88). A buyer submitting a third party phone as sender.phone makes that phone bootstrap return the row + bearer key, which alone authorizes checkout/[key]/status (key alone), payment/manual/receipt (code+key findFirst, no session; → payment_under_review, bounded by awaiting_payment + window + attempts), and gifts/media POST/GET sender preview (no status/expiry gate on the sender branch). Impact nuance (verifier): the unstripped row content is buyer-supplied data the buyer already knows — the server-generated exposures are the paymentKey bearer, buyer-uploaded media, and the flow of recipient PII to a phone that never consented; shipped client hardcodes sender.phone=session phone (pishnam-store.ts:474,547), so exploitation requires deliberate raw-API use.

- Root cause: no control binds senderPhone to the session (the asymmetry vs the enforced orderer gate at checkout.ts:151) while bootstrap/media/receipt treat senderPhone as a trust anchor.
- Intended behavior: Bind senderPhone to the session like orderer (reject mismatch or derive from session); never echo the bearer for a senderPhone-only match; add a status/expiry gate to the media isSender branch.

### Trace

- **entrypoint** `src/lib/orders/checkout.ts:85` — parseCheckout: sender.phone shape-valid only, no session comparison
- **propagation** `src/lib/orders/checkout.ts:190` — order.create: senderPhone stored; sibling orderer gate (151) does not cover sender
- **propagation** `src/app/api/me/bootstrap/route.ts:31` — findMany OR: third party panel includes the buyer order via senderPhone leg
- **sink** `src/app/api/me/bootstrap/route.ts:88` — mappedNew: isRecv=false → unstripped fields (53-56,61,65) + paymentKey (88); key gates receipt/status/media

### Evidence

- `src/lib/orders/checkout.ts:85` — sender.phone never bound to session
- `src/lib/orders/checkout.ts:151` — sibling orderer control — the asymmetry
- `src/app/api/me/bootstrap/route.ts:31` — senderPhone match column
- `src/app/api/me/bootstrap/route.ts:53` — address unstripped for non-recv
- `src/app/api/me/bootstrap/route.ts:88` — paymentKey to any non-recv match incl. senderPhone-only
- `src/app/api/payment/manual/receipt/route.ts:24` — code+key sole proof (bounded by awaiting_payment + window + attempts)
- `src/app/api/gifts/media/route.ts:114` — isSender branch has no status/expiry gate vs recipient branch

### Conditions

- *authorization_role*: any OTP-verified buyer; shipped client always sends session phone — needs deliberate raw API use
- *data_state*: phone entered as sender.phone belongs to a person who can verify a session; disclosed row content is buyer-typed (server-generated artifacts: paymentKey bearer, buyer-uploaded media)
- *user_interaction*: none beyond the third party normal login

### Bounded reproduction (source-established)

- Attacker perspective: verified buyer POSTs checkout with sender.phone=victim; victim bootstrap returns the full row + paymentKey; key then used against receipt (within payment window), media, status
- Payload: `POST /api/checkout {sender:{phone:victim}, recipient:{…}}`
- Payload: `GET /api/me/bootstrap (as victim) → address, message, paymentKey`
- Payload: `POST /api/payment/manual/receipt / POST|GET /api/gifts/media / GET /api/checkout/{key}/status`
- Step: static: missing binding + OR-match + bearer gating verified; controlled repro: two scratch accounts
- Observed result: Source inspection only (verifier re-read checkout.ts, bootstrap, receipt, media, status routes, shipped client): statically establishes (1) no sender/session binding; (2) unstripped fields + paymentKey for senderPhone-matched rows; (3) key gates receipt/media/status with noted bounds. No execution performed.

### Remediation

Reject sender.phone !== sessionPhone at createOrder (or derive from session); defense-in-depth: bootstrap echoes paymentKey only to sessionPhone/userPhone matches; add status/expiry gate to the media isSender branch.

Files to change: src/lib/orders/checkout.ts, src/app/api/me/bootstrap/route.ts, src/app/api/gifts/media/route.ts

---

## checkout.unpaid-reservation-no-cap

**Unpaid checkout reservations have no per-principal cap — one buyer can lock shared stock for the hardcoded 24h window** — severity: medium (likelihood high, impact medium)

createOrder reserves inventory atomically for every shape-valid checkout; expiresAt = now+24h for zarinpal / +10min for manual_transfer, hardcoded in the create payload. Nothing bounds concurrent unpaid reservations per principal: no count/findMany of the principal open orders exists anywhere on the creation path (checkout.ts, pricing.ts, db-write.ts — grep-verified), no middleware exists, and the only brake is rateLimit(checkout, clientIp, 5, 600) keyed on first-hop XFF. One OTP session can lock a small variant for 24h; sustained submitting ≈250 units/IP/10min. A failed zarinpalCreate after commit additionally strands the awaiting order holding stock.

- Root cause: stock decrement is unconditional for shape-valid checkouts; no per-principal unpaid-reservation budget is checked inside the tx before decrement; window hardcoded.
- Intended behavior: Cap concurrent unpaid reservations per principal (e.g. >=3 open awaiting/under_review/failed orders for the session phone → 429) checked inside the same tx before decrement; shorter/metered unpaid window for the gateway path.

### Trace

- **entrypoint** `src/app/api/checkout/route.ts:9` — POST checkout: only rateLimit(checkout, ip, 5, 600) at 13 precedes creation; no middleware
- **propagation** `src/lib/orders/checkout.ts:145` — orderer gates pass: no count of principal existing unpaid orders anywhere before/inside the tx
- **propagation** `src/lib/orders/checkout.ts:172` — stock decrement: updateMany decrement up to 5×10 units/order; retriedTransaction adds no cap
- **sink** `src/lib/orders/checkout.ts:228` — expiresAt 24h: blocks others with 409 sold_out until expiry/cancel releases stock

### Evidence

- `src/lib/orders/checkout.ts:171` — decrement loop, no reservation accounting
- `src/lib/orders/checkout.ts:225` — expiresAt ternary hardcoded; 24h applies to zarinpal
- `src/app/api/checkout/route.ts:13` — sole request-side bound is the per-IP limiter
- `src/lib/rate-limit.ts:88` — clientIp takes first XFF hop
- `prisma/schema.prisma:292` — Order.expiresAt non-null — every order holds stock
- `src/lib/orders/expire.ts:11` — EXPIRABLE = awaiting_payment/failed only — auto-expire is the sole self-healing brake

### Conditions

- *authentication_level*: one OTP-verified session
- *data_state*: target variants in stock (small single-variant catalog)
- *system_configuration*: 24h zarinpal window hardcoded; 5/600s per-IP checkout limiter

### Bounded reproduction (source-established)

- Attacker perspective: buyer submits unpaid zarinpal checkouts and never pays; stock transfers to 24h private reservations until the expiry sweep releases it
- Payload: `POST /api/checkout x5/10min/IP with items qty 10, paymentMethod zarinpal`
- Step: scratch-DB repro: seed stock 10, two createOrder calls, second buyer 409 sold_out for 24h
- Observed result: Source-inspection-only: no cap/count on open orders exists on the createOrder path (checkout.ts, pricing.ts, db-write.ts, no middleware); decrement persists until the hardcoded window; only request-side bound is the XFF-keyed limiter. No execution performed.

### Remediation

Per-principal open-reservation budget inside the same tx (count awaiting_payment/payment_under_review/failed for userPhone >= 3 → 429); optionally meter the 24h gateway window.

Files to change: src/lib/orders/checkout.ts

---

## docker-healthcheck-probes-nonexistent-api-health

**Docker HEALTHCHECK probes /api/health which does not exist — container permanently unhealthy on every Docker deployment** — severity: medium (likelihood high, impact medium)

Dockerfile HEALTHCHECK fetches http://127.0.0.1:3000/api/health and exits 0 only on 2xx; no health route exists anywhere in the route tree (full enumeration of 75 route.ts files; rg health over src/app zero-match), no rewrites exist in next.config.ts, and the proxy matcher excludes /api. Every probe 404s → exit 1 → after start-period 20s + 3 retries the container is permanently unhealthy; Coolify — the documented production platform in code comments — acts on health for rollouts. Deterministic availability defect; docs/13-g-infra-ops.md §5.1 plans /api/health as a W1-2 deliverable never implemented (the planned systemd deploy health gate would also fail/rollback every release).

- Root cause: HEALTHCHECK written against a planned /api/health route (docs §5.1 contract) never implemented; nothing binds the probe target to the route tree.
- Intended behavior: Serve the probe target (add src/app/api/health/route.ts returning 2xx with a real SELECT 1 per docs §5.1) or repoint/remove the probe; add a regression check that the healthcheck URL maps to a registered route.

### Trace

- **entrypoint** `Dockerfile:41` — HEALTHCHECK CMD: 404 → r.ok=false → exit 1 on every probe
- **propagation** `next.config.ts:62` — nextConfig object: no rewrites of any kind
- **propagation** `src/proxy.ts:75` — matcher excludes /api: proxy cannot create the missing route
- **sink** `src/app/api/route.ts:3` — sole root GET /api stub: GET /api/health → 404 forever

### Evidence

- `Dockerfile:40` — interval/timeout/start-period/retries → unhealthy is permanent
- `Dockerfile:41` — exit expression keys on r.ok
- `src/app/api/route.ts:3` — full route-tree enumeration of all 75 route files found zero health routes; this stub is the only root handler
- `next.config.ts:62` — no rewrites key
- `docs/13-g-infra-ops.md:205` — §5.1 defines the /api/health contract — planned, never built
- `docker-compose.yml:3` — Coolify referenced as production platform in code comments

### Conditions

- *system_configuration*: every Docker/Compose/Coolify consumer of this image; deterministic from first boot, no attacker involvement; restart/kill-loop vs failed-rollout behavior is orchestrator-dependent

### Bounded reproduction (source-established)

- Attacker perspective: not attacker-driven; operator availability/health-signal defect
- Payload: `GET /api/health (container-internal probe)`
- Step: static: enumerated src/app route tree for health (absent), checked rewrites (none) and proxy matcher (excludes /api)
- Observed result: Source inspection only: route absence + probe expression → every probe 404 → exit 1 → permanent unhealthy; downstream restart behavior orchestrator-dependent. No execution performed.

### Remediation

Add src/app/api/health/route.ts returning 2xx (per docs §5.1: ok + db SELECT 1 + version); alternatively repoint the HEALTHCHECK to an existing unauthenticated route.

Files to change: src/app/api/health/route.ts, Dockerfile

---

## gift-open.giftOpenAttempts-non-atomic-lockout

**Non-atomic failed-attempt counter inflates the gift-open brute-force budget past the 10-fail lock** — severity: medium (likelihood medium, impact medium)

POST /api/gifts/{code}/open is an anonymous code+password capability over sequential codes; its anti-brute-force control is a cumulative counter (10 wrong → permanent lock). The counter is read-modify-write: findUnique (route:25) resolves in an earlier tick, then await req.json() (32) and the blocking scryptSync (crypto.ts:28) execute before the write (38-41) — which sets the ABSOLUTE value order.giftOpenAttempts + 1, not {increment:1}, with no conditional predicate. Concurrent wrong attempts that already read the same counter serialize their writes afterward and all write stale+1 (lost update): a wave of N advances the counter ~1, lock fires after ~10 waves instead of 10 requests. Per-IP 5/900s caps but does not serialize; meaningful scale-up needs IP diversity (deployment factor, not claimed). Default password is auto-generated 4-digit (9000 keyspace).

- Root cause: open/route.ts:36-41 computes attempts=staleRead+1 and writes the absolute value; no atomic increment, no conditional lock decision at write time; the codebase atomic patterns (rate-limit.ts:56-58 increment, retention.ts:70-74 conditional updateMany) exist but are unused here.
- Intended behavior: Atomic increment ({increment:1}) + conditional lock decided on the incremented value in one write (or conditional updateMany gated on giftLockedAt null).

### Trace

- **entrypoint** `src/app/api/gifts/[code]/open/route.ts:17` — POST open: anonymous
- **propagation** `src/app/api/gifts/[code]/open/route.ts:25` — findUnique: reads giftOpenAttempts into handler memory
- **propagation** `src/app/api/gifts/[code]/open/route.ts:32` — await req.json(): yield point between read and write
- **propagation** `src/lib/orders/crypto.ts:28` — scryptSync: synchronous, blocks loop, sits between read and write
- **sink** `src/app/api/gifts/[code]/open/route.ts:38` — db.order.update: writes absolute stale+1 (not increment); lock only when locally-computed ≥10 — concurrent waves under-count

### Evidence

- `src/app/api/gifts/[code]/open/route.ts:36` — attempts computed from stale read
- `src/app/api/gifts/[code]/open/route.ts:40` — absolute write, no increment, no predicate
- `src/lib/orders/crypto.ts:28` — verifyGiftPassword uses scryptSync between read and write
- `src/lib/rate-limit.ts:56` — sibling control uses {increment:1} — atomic pattern exists in-repo
- `src/app/api/gifts/[code]/open/route.ts:23` — rate 5/900s per code+IP
- `src/lib/orders/checkout.ts:207` — default password randomInt 4-digit — 9000 keyspace

### Conditions

- *authentication_level*: none
- *timing_dependency*: concurrent failed attempts interleaving at await points; per-IP capped 5/15min
- *network_routing*: guess budgets beyond ~50/IP need IP diversity (noted, not claimed)

### Bounded reproduction (source-established)

- Attacker perspective: anonymous attacker hammers concurrent wrong passwords per known code, rotating IPs; each synchronized wave costs the counter ~1 instead of N
- Payload: `POST /api/gifts/PN-YYMMDD-####/open {"password":"1234"} x N concurrent`
- Step: source-only: lost-update shape + blocking scrypt read from source; Node interleaving reasoned at await points
- Observed result: Source-inspection-only: counter update is a non-atomic absolute write derived from a read resolved at an earlier tick; scryptSync placement verified; rate-limited attempts never reach the counter; designed budget ~10 failures vs realized ~10 waves × window budget. No execution performed.

### Remediation

Atomic updateMany increment ({giftOpenAttempts:{increment:1}}) gated giftLockedAt null; decide lock on the returned incremented value in the same write.

Files to change: src/app/api/gifts/[code]/open/route.ts

---

## otp.verify-attempt-counter-check-then-act-race

**Concurrent verifies defeat the OTP 5-attempt cap → 4-digit brute force and account/owner-seat takeover** — severity: high (likelihood medium, impact high)

verifyOtp enforces MAX_ATTEMPTS=5 as check-then-act: findFirst (otp.ts:61-64), attempts>=5 tested on the stale read (65), timingSafeEqual runs BEFORE the failed-attempt increment (66 vs 68); no transaction or conditional attempt claim serializes the sequence. Under Prisma/SQLite connection_limit=1 all burst findFirsts enqueue and execute before any increment; on PG reads are unserialized outright. The matching guess is consumed atomically (72-73) and converts into a 30-day customer session plus an owner admin seat when the phone is in ADMIN_SEED_PHONES (verify:37-44). The 10/900s otp_verify limiter is itself voided at window start by the companion rate-limit reset race, making sustained brute force practical (codes re-issuable 3/hour/phone). No preventing layer: no middleware; proxy matcher excludes /api; assertSameOrigin passes no-Origin callers.

- Root cause: src/lib/auth/otp.ts:61-73 attempt counting without atomicity (read→check→compare→increment only on failure; no conditional claim gated on attempts<MAX_ATTEMPTS && used=false).
- Intended behavior: Each verification first atomically claims one attempt (conditional updateMany gated attempts<5 && used=false) and only compares/consumes on success.

### Trace

- **entrypoint** `src/app/api/auth/verify/route.ts:22` — POST /api/auth/verify: unauthenticated phone+guess; assertSameOrigin passes no-Origin callers
- **propagation** `src/lib/rate-limit.ts:44` — otp_verify 10/900s: window-reset upsert admits the burst past 10
- **propagation** `src/lib/auth/otp.ts:65` — verifyOtp: every racer reads the same used=false code with attempts<5
- **sink** `src/lib/auth/otp.ts:66` — timingSafeEqual→consume: matching guess wins; 30-day customer session + owner admin seat for seed phones

### Evidence

- `src/lib/auth/otp.ts:65` — attempt cap tested on the stale findFirst read — no conditional claim
- `src/lib/auth/otp.ts:68` — increment only on failed compare, separate from the check
- `src/lib/auth/otp.ts:72` — atomic consume only AFTER compare — guards double-use, not the cap
- `src/lib/auth/otp.ts:40` — randomInt(1_000,10_000) → 9000-value keyspace
- `src/lib/rate-limit.ts:47` — limiter reset sets count:1 unconditionally
- `src/app/api/auth/verify/route.ts:44` — success mints admin session for seed phones
- `src/lib/db.ts:24` — SQLite connection_limit=1 serializes statements, not the read→compare→act sequence

### Conditions

- *authentication_level*: unauthenticated
- *data_state*: unused unexpired AuthCode exists (attacker issues via auth/request)
- *timing_dependency*: racers findFirsts complete before any failed-increment commits; limiter window reset at burst start
- *user_interaction*: victim must not complete verification first
- *system_configuration*: holds on BOTH backends — SQLite (serialized statements still admit synchronized bursts) and PG (unserialized reads); exploit throughput differs by backend

### Bounded reproduction (source-established)

- Attacker perspective: issue one OTP, fire high-concurrency verify wave with disjoint guesses; repeat up to 3 issues/hour until match
- Payload: `POST /api/auth/request {"phone":"09XX..."}`
- Payload: `POST /api/auth/verify xN concurrent {"code":"<distinct guesses>"}`
- Step: burst covers N of 9000 per wave; stop at first 200 with session cookies
- Observed result: Source inspection only — no execution was performed. Established: the attempts check consumes the findFirst snapshot with no transaction/lock/conditional claim anywhere on the path (otp.ts:61-73 read in full); the atomic updateMany only prevents double-consumption, not cap bypass; route layer has no additional gate; keyspace 9000; success mints a 30-day customer session and an owner admin session for seed phones. Backend behavior reasoned from code shape + connection_limit=1 + dual schema selection — race exists on both backends; no measured timings.

### Remediation

Atomic attempt claim before compare (conditional updateMany attempts<MAX_ATTEMPTS, used=false); pair with atomic limiter window reset.

Files to change: src/lib/auth/otp.ts, src/lib/rate-limit.ts

---

## pishnam-store-logout-incomplete-draft-wipe

**Logout leaves the private gift draft (message + recipient name/phone/address) in localStorage on shared devices, violating the store A-05 privacy wipe law** — severity: medium (likelihood low, impact medium)

zustand persist 'pishnam-app' holds the draft: private message, recipient name/mobile/province/city/address, sender fields. A-05 wipes the draft only after successful checkout; logout() (and the boot guest-hygiene branch) reset only user/orders/pendingOrder/orderer — resetBuilder (the exact wipe, sole caller pay-modal.tsx:130) is never invoked on logout; the sole logout call site (dashboards.tsx:2295) calls logout() alone; no localStorage.removeItem anywhere. partialize persists the fields and merge rehydrates them → the next same-profile user sees the previous user's draft prefilled. Verified no other wipe-on-logout path exists.

- Root cause: A-05 draft wipe bound to checkout-success instead of the session/device lifecycle; logout and boot guest-hygiene omit the gift-draft fields while the store own comments declare the invariant they violate.
- Intended behavior: Logout (and stale-session boot hygiene) performs the resetBuilder-grade wipe (message, receiver, senderName, senderPhrase, senderDisplay, addonLines, media meta); regression test asserting the persisted record contains no draft fields after logout.

### Trace

- **entrypoint** `src/components/shop/screens/flow.tsx:945` — recipient form binds receiver values: previous user types recipient PII + private message into persisted store
- **propagation** `src/lib/pishnam-store.ts:832` — partialize: message/receiver/senderName/senderPhrase persisted to localStorage
- **propagation** `src/lib/pishnam-store.ts:406` — logout: wipes only user/orders/pendingOrder/orderer; resetBuilder not called; sole call site dashboards.tsx:2295
- **propagation** `src/lib/pishnam-store.ts:774` — merge: draft rehydrates into next session; pishnam-sync.ts:179-188 guest hygiene same gap
- **sink** `src/components/shop/screens/flow.tsx:953` — receiver.phone rendered prefilled: next profile user reads previous draft

### Evidence

- `src/lib/pishnam-store.ts:406` — logout wipe list incomplete
- `src/lib/pishnam-store.ts:401` — comment states the intended invariant
- `src/lib/pishnam-store.ts:663` — A-05 wipe comment; executes only on checkout success
- `src/lib/pishnam-store.ts:708` — resetBuilder — sole caller pay-modal.tsx:130
- `src/lib/pishnam-store.ts:829` — partialize persists draft fields
- `src/lib/pishnam-store.ts:762` — merge rehydrates
- `src/components/shop/screens/flow.tsx:942` — prefill render
- `src/components/shop/screens/dashboards.tsx:2292` — logout button calls logout() only
- `src/lib/pishnam-sync.ts:179` — boot guest hygiene same gap

### Conditions

- *data_state*: draft composed but no successful checkout — checkout/manual-pay success are the only wipes
- *authentication_level*: composing user session then ended (logout or expiry)
- *user_interaction*: different person later uses same browser profile and opens the builder — the code own declared shared-device threat model

### Bounded reproduction (source-established)

- Attacker perspective: next human on the shared profile opens the builder/recipient form and reads the previous draft (private message + recipient PII) prefilled — no credentials, no network
- Payload: `open site → read localStorage 'pishnam-app' / prefilled form fields`
- Step: source-only: persist scope, incomplete logout wipe, merge rehydration and UI prefill statically verified end-to-end; absence of any competing wipe path verified
- Observed result: Source inspection only: every link statically provable; boundary declared by the code own comments. No execution performed.

### Remediation

Bind the A-05 wipe to logout() and the boot guest-hygiene branch (same field set as resetBuilder); add a regression test asserting the persisted record contains no draft fields after logout.

Files to change: src/lib/pishnam-store.ts, src/lib/pishnam-sync.ts

---

## prebuild.migrate-giftorders-error-swallowed-drop-giftorder

**Failed legacy GiftOrder migration is swallowed, then the destructive schema push drops GiftOrder — silent permanent loss of legacy orders** — severity: medium (likelihood low, impact medium)

prebuild.mjs:60-68 runs the one-time GiftOrder→Order migration inside a bare catch treating EVERY failure as 'GiftOrder table likely absent' — no error-code discrimination (42P01 vs connection/permission/constraint). Build then continues to prisma db push --accept-data-loss (71-74) against a schema with no GiftOrder model (grep confirms) → push drops the legacy table. migrate-giftorders.sql:5-7 states the script exists so a production DB with legacy rows 'never loses them'; on its own failure path the guarantee inverts. Deployer is not fully blind (stdio inherit streams the CLI error) but the build never fails; no rollback exists for a partially-applied migration (two sequential INSERT...SELECTs).

- Root cause: blanket catch conflates table-absent with any other SQL failure; destructive push is not conditioned on migration success.
- Intended behavior: Only the missing-relation error (42P01) is benign; any other failure must abort the build before db push; never drop GiftOrder until verified empty or fully migrated.

### Trace

- **entrypoint** `scripts/prebuild.mjs:61` — legacy migration: bunx prisma db execute --file scripts/migrate-giftorders.sql
- **propagation** `scripts/prebuild.mjs:66` — catch-all: every non-zero exit swallowed; build continues
- **propagation** `scripts/prebuild.mjs:72` — destructive push: db push --accept-data-loss --skip-generate — unconditional
- **sink** `prisma/schema.postgres.prisma:67` — no GiftOrder model: push drops the table + any un-migrated legacy rows

### Evidence

- `scripts/prebuild.mjs:65` — bare catch swallows all failures (no SQLSTATE check)
- `scripts/migrate-giftorders.sql:5` — stated preservation purpose
- `scripts/prebuild.mjs:72` — --accept-data-loss executes regardless of migration outcome
- `prisma/schema.postgres.prisma:67` — GiftOrder retired — grep confirms no model in either schema
- `scripts/migrate-giftorders.sql:23` — two sequential INSERT...SELECTs — no transaction around partial failure

### Conditions

- *data_state*: target DB contains legacy GiftOrder rows (source notes 0 rows in every known env — impact conditional)
- *system_configuration*: any non-missing-table migration failure in the same build

### Bounded reproduction (source-established)

- Attacker perspective: not attacker-driven: a build-time dependency failure converts a protective migration into a no-op followed by a destructive push
- Payload: `build with a postgres:// DATABASE_URL while the migration SQL fails non-benignly → build continues and db push drops GiftOrder`
- Step: provision DB with legacy rows; make the migration fail non-benignly; observe build continue to the drop
- Observed result: source-inspection-only: control flow is direct — catch continues, push unconditional, schema has no GiftOrder model. No execution performed.

### Remediation

Fail closed: treat only 42P01/missing-relation as benign; re-raise anything else so the build aborts before db push; optionally wrap the SQL in a transaction and verify remaining GiftOrder count is 0 before allowing the push.

Files to change: scripts/prebuild.mjs

---

## rate-limit.window-reset-upsert-count-reset-race

**Rate-limit window reset admits unbounded concurrent requests, voiding SMS-bombing and brute-force caps** — severity: medium (likelihood medium, impact medium)

The DB fixed-window limiter resets via read-then-upsert whose update branch sets count:1 unconditionally (rate-limit.ts:47) whenever the row exists — fresh or expired — and the admission test compares the upsert RETURNED row count (1) against max (50). N concurrent callers on a missing/expired bucket each rewrite count to 1 and are all admitted — on SQLite (statement serialization still admits every racer: each runs its own unconditional reset and compares its own returned count) and identically on PG (ON CONFLICT DO UPDATE SET count=1). Voids at every window start: auth_req_ip 5/600, auth_req_phone 3/600, otp_phone_cooldown 1/60, otp_phone_hour 3/3600, otp_ip_day 10/day, otp_verify 10/900, admin_login 5/900. Each admitted auth/request spends a real owner-paid SMS; admin_login guesses multiply (no lockout/captcha anywhere); enables the OTP race candidate.

- Root cause: rate-limit.ts:39-50 check-then-act reset (update branch sets count:1, not an increment; max check uses the post-reset returned count); no transaction/conditional window claim.
- Intended behavior: Window reset = atomic conditional claim (updateMany gated windowStart lte cutoff); all other callers take the atomic increment path (56-59).

### Trace

- **entrypoint** `src/app/api/auth/admin-login/route.ts:24` — rateLimit(admin_login): same helper guards request/verify/OTP limits
- **propagation** `src/lib/rate-limit.ts:39` — findUnique: missing/expired observed by all racers
- **sink** `src/lib/rate-limit.ts:47` — upsert update branch: count rewritten to 1 for each racer; max check (50) compares the returned post-reset count and passes for all

### Evidence

- `src/lib/rate-limit.ts:47` — update branch sets count:1 unconditionally
- `src/lib/rate-limit.ts:41` — expiry test outside tx
- `src/lib/rate-limit.ts:56` — same-window path IS atomic increment — the invariant the reset path lacks
- `src/app/api/auth/request/route.ts:32` — SMS caps rely on limiter
- `src/lib/auth/otp.ts:36` — per-phone OTP caps rely on limiter
- `src/app/api/auth/admin-login/route.ts:24` — admin door guess cap relies on limiter
- `src/lib/db.ts:24` — SQLite serialization cannot help: each racer runs its own unconditional reset

### Conditions

- *timing_dependency*: concurrent requests observe the bucket before any upsert commits
- *system_configuration*: backend-independent by code shape (returned-row comparison + unconditional reset)
- *authentication_level*: no auth — all protected ops public

### Bounded reproduction (source-established)

- Attacker perspective: script parallel bursts (50-500) at window boundaries against any limited endpoint
- Payload: `N concurrent POST /api/auth/request`
- Payload: `N concurrent POST /api/auth/admin-login {"password":"guess"}`
- Step: wait for bucket expiry or fresh IP key; fire burst; repeat per window
- Observed result: Source inspection only — no execution performed. Established: the reset update branch writes count=1 unconditionally and the max test uses the returned row (count=1), so every concurrent caller that observed a missing/expired bucket is admitted on both backends; the retry loop only re-enters via findUnique→increment which also admits for max≥2; admitted paths perform no further limit; no lockout/captcha exists.

### Remediation

Atomic conditional window claim (updateMany where windowStart lte cutoff) + atomic increment path for everyone else; keep unique-violation retry for creation.

Files to change: src/lib/rate-limit.ts

---

## retention.purge-scan-write-gap-vs-paid-renewal

**Purge job can destroy a paid renewal gift content approved inside the purge scan-to-write window** — severity: medium (likelihood low, impact medium)

purgeExpiredMessages selects victims via untransactioned findMany (retention.ts:207-212), deletes media from the stale scan keys (216, per-key I/O widening the window), then writes message=''/purged with where:{id} ONLY (220) — the per-row tx contains just the unconditional update + OrderEvent; NO re-check of expiry/purge state at write time. applyPaidRenewal re-checks purge only inside its own tx (163) with no coordination against an in-flight purge scan. If admin approval commits between the scan and that row write, the purge deletes the just-renewed order media and wipes the message while the renewal stays paid — money taken for destroyed content. Expired-but-unpurged is exactly the renewable state; ticker every 60s take=25; cron take=100.

- Root cause: per-row purge write unconditional (where:{id}) derived from stale in-memory scan; approval path mutates exactly the fields the purge decision was based on with no write-time re-verification on either side.
- Intended behavior: Purge claim atomic + conditional (updateMany gated messageExpiresAt lt now AND purgeStatus in active/purge_failed; count==0 → skip row); re-read mediaKeys inside the claim before deleting media.

### Trace

- **entrypoint** `src/app/api/admin/renewals/[id]/route.ts:42` — approve: applyPaidRenewal extends expiry + sets active
- **propagation** `src/lib/orders/retention.ts:207` — purge scan: untransactioned findMany of expired rows
- **propagation** `src/lib/orders/retention.ts:216` — media deletion: deletes keys captured in stale scan; per-key I/O widens window
- **sink** `src/lib/orders/retention.ts:220` — unconditional update: where:{id} only, no re-check — wipes just-renewed order; renewal stays paid

### Evidence

- `src/lib/orders/retention.ts:208` — scan predicate outside any tx
- `src/lib/orders/retention.ts:220` — write where:{id} only — no expiry/purge predicate
- `src/lib/orders/retention.ts:163` — applyPaidRenewal re-checks only within its own tx
- `src/lib/orders/retention.ts:178` — approval sets active + future expiry
- `src/instrumentation.ts:50` — 60s ticker (purge take=25)
- `src/app/api/jobs/[name]/route.ts:109` — purge-messages job take=100
- `src/app/api/admin/renewals/[id]/route.ts:41` — approval path has no purge coordination

### Conditions

- *timing_dependency*: approval commits inside a specific scan-to-write window (widened by file I/O; recurs 60s)
- *data_state*: order expired-but-unpurged — exactly the renewal-requestable state
- *authentication_level*: legitimate admin approval; no attacker privilege — integrity/availability failure

### Bounded reproduction (source-established)

- Attacker perspective: paying customer requests renewal on expired-not-purged order; approval lands inside a purge pass window → paid content destroyed while renewal is recorded paid
- Payload: `POST /api/gifts/{code}/renew {"plan":"6m"}`
- Payload: `POST /api/gifts/{code}/renew/receipt`
- Payload: `PATCH /api/admin/renewals/{id} {"action":"approve"} timed vs 60s ticker`
- Step: source-only: interleaving read from the two uncoordinated write paths
- Observed result: Source-inspection-only: scan and per-row wipe are not one tx; per-row tx contains only the unconditional update + event create (no re-check); media deleted from stale keys before the write; approval re-verifies only in its own tx; ticker recurring. No execution performed.

### Remediation

Conditional atomic purge claim (updateMany gated on still-expired + not recovered; count==0 → skip); re-read mediaKeys inside the claim — mirrors the codebase markFirstDisplay conditional pattern.

Files to change: src/lib/orders/retention.ts

---

## seed-admin-demo.prod-demo-dataset-and-prefix-wipes

**Demo dataset (fake verified orders, public fake reviews, operator seats) and loose-prefix destructive wipes run against the production DB on every deploy** — severity: medium (likelihood high, impact medium)

seed-admin-demo.mjs:8 documents 'Local dev only — production DB is never touched', but prebuild.mjs:83 executes it unconditionally on every PG build. Wipes at :87-94 delete by loose prefixes: appUser phone startsWith '0912111' (0912 = live MCI prefix block; any real customer whose number starts with those 7 digits is deleted), smsOutbox '0935123', adminUser '0935777'. Inserts: 48 demo orders (44 plan + 4 timestamped today for «فروش امروز») with VERIFIED payments, 6/8 reviews approved:true served publicly by GET /api/reviews (consumed by the storefront info screen), 2 published experiences, 10 AppUsers, 3 operator AdminUser rows (2 active). Dashboards polluted, public reviews fake, real rows matching prefixes partially deleted — every deploy. Mitigating tension: prebuild comments say the owner asked for demo data on the deployed panel — that cannot cover the public fake reviews or prefix-collision deletes.

- Root cause: prebuild wires a dev-only script into the unconditional PG seed chain; cleanup deletes by loose phone prefixes rather than exact demo identifiers.
- Intended behavior: Demo dataset dev-only (excluded from deploy builds or behind an explicit env opt-in); any wipe uses exact 11-digit demo identifiers / PN-DEMO codes; if demo data ships, demo reviews stay approved:false.

### Trace

- **entrypoint** `package.json:7` — build chain: reaches prebuild.mjs on every deploy build
- **propagation** `scripts/prebuild.mjs:83` — PG seed stage: execSync(seed-admin-demo) — contradicts its own line-8 contract
- **propagation** `scripts/seed-admin-demo.mjs:92` — prefix wipe: appUser startsWith 0912111 deletes any real matching account
- **propagation** `scripts/seed-admin-demo.mjs:230` — demo insertion: 48 orders with verified payments; rows timestamped today
- **sink** `src/app/api/reviews/route.ts:25` — public GET: approved:true served with no auth — fake reviews go live; consumed by info.tsx:1191

### Evidence

- `scripts/seed-admin-demo.mjs:8` — broken contract
- `scripts/prebuild.mjs:83` — unconditional PG execution (counter-comment 81-82 cannot cover public reviews/prefix deletes)
- `scripts/seed-admin-demo.mjs:92` — appUser startsWith 0912111 wipe
- `scripts/seed-admin-demo.mjs:286` — approved: i % 3 !== 2 → 6 of 8 reviews pre-approved
- `src/app/api/reviews/route.ts:25` — public serving of approved:true rows
- `src/components/shop/screens/info.tsx:1191` — storefront fetches /api/reviews
- `scripts/seed-admin-demo.mjs:360` — 3 operator rows, 2 active
- `scripts/seed-admin-demo.mjs:225` — 4 orders timestamped today

### Conditions

- *system_configuration*: PG build path (netlify.toml does NOT run this seed — Vercel/Coolify scope)
- *data_state*: real rows matching demo phone prefixes deleted on every deploy; all visitors see fake approved reviews; dashboards show fake verified revenue

### Bounded reproduction (source-established)

- Attacker perspective: not attacker-driven: the pipeline pollutes and partially deletes production business data
- Payload: `deploy with a postgres:// DATABASE_URL → GET /api/reviews serves demo reviews approved:true; AppUser rows with phone prefix 0912111 are deleted each deploy`
- Step: deploy with PG URL; query demo rows + GET /api/reviews; insert a real AppUser with phone 0912111xxxxx and redeploy to observe deletion
- Observed result: source-inspection-only: contract contradiction, prefix wipes, verified-payment mapping, review approval math, and the unauthenticated public serving path fully source-visible. No execution performed.

### Remediation

Remove seed-admin-demo from the deploy chain (dev-only or DEMO_SEED env opt-in); replace phone-prefix wipes with exact 11-digit demo identifiers; set approved:false on demo reviews if demo data must ship.

Files to change: scripts/prebuild.mjs, scripts/seed-admin-demo.mjs

---

## seed-commerce.upsert-update.reverts-owner-settings-prices

**Deploy-time seed silently reverts owner-managed Settings, payment destination, and product prices on every build** — severity: medium (likelihood medium, impact medium)

On every PG build scripts/prebuild.mjs:77 runs seed-commerce.ts whose upserts carry unconditional update branches: the SETTINGS map (seed-commerce.ts:34-47) holds 11 hardcoded keys — incl. manual_card_number/sheba/name (40-42) and money-path prices — all forced back via update:{value} in the loop at 74-76; variant priceToman is reset at :59 (main gifts) and :71 (addons) and product display fields at :54/:66; seed-blog.ts:256 forces published:true. All 11 keys are inside the MANAGED_KEYS whitelist that PATCH /api/admin/settings gates to role=owner (route.ts:69) — the same keys pricing.ts consumes (55-68) and /api/payment/manual/instructions serves (14, 21-22). seed-round34-images.mjs:151-154 implements the correct owner-marker pattern for site_logo, proving the omission. Note: the price-edit runtime path (admin/products/[id]) is open to any admin seat — widening the set of runtime writes the seed reverts.

- Root cause: upsert update branches unconditional (seed-commerce.ts:54,59,66,71,75); prebuild.mjs:77 runs the seed unconditionally on the PG path; no owner-modified marker or create-only semantics for settings (contrast: site_logo_source marker).
- Intended behavior: Deploy seeds bootstrap-only: create-if-missing upserts (update:{}), never overwrite owner-manageable values, or honor an owner marker like site_logo_source=owner.

### Trace

- **entrypoint** `package.json:7` — build chain: prebuild runs on every deploy build
- **propagation** `scripts/prebuild.mjs:77` — PG seed stage: execSync(seed-commerce) after protocol gate + destructive push, unconditional
- **propagation** `scripts/seed-commerce.ts:75` — Setting upsert loop: update:{value} forces all 11 SETTINGS keys incl. card number/sheba/name
- **propagation** `scripts/seed-commerce.ts:59` — variant upsert: update:{priceToman:PRICE} resets seeded price
- **sink** `src/lib/orders/pricing.ts:67` — pricing reads reverted rows: customers charged reverted values; manual/instructions shows reverted card

### Evidence

- `scripts/prebuild.mjs:77` — seed-commerce executed unconditionally on PG builds
- `scripts/seed-commerce.ts:75` — upsert update:{value} — no marker check anywhere in file
- `scripts/seed-commerce.ts:40` — manual_card_number/sheba/name hardcoded in SETTINGS
- `scripts/seed-commerce.ts:59` — variant update:{priceToman:PRICE}
- `src/app/api/admin/settings/route.ts:69` — requireAdmin(owner) — same keys owner-only at runtime
- `src/app/api/admin/products/[id]/route.ts:16` — priceToman runtime edit field (any admin seat)
- `src/lib/orders/pricing.ts:66` — charm/ship fees read from Setting rows
- `src/app/api/payment/manual/instructions/route.ts:21` — instructions render cardNumber/sheba from reverted rows
- `scripts/seed-round34-images.mjs:154` — contrast: owner-marker pattern exists in-repo
- `scripts/seed-blog.ts:256` — update branch forces published:true

### Conditions

- *system_configuration*: PG DATABASE_URL build (documented production path)
- *data_state*: owner (or any admin) changed a seeded Setting key, variant/product price or display field, or unpublished a seeded post since the last deploy

### Bounded reproduction (source-established)

- Attacker perspective: not attacker-driven: the deploy pipeline acts against owner-authorized runtime writes
- Payload: `deploy with a postgres:// DATABASE_URL after editing any seeded Setting in the panel → Setting rows revert (owner-observed deploy-log + DB read-back)`
- Step: owner edits ship_fee via panel; redeploy; read back Setting row + checkout quote
- Observed result: source-inspection-only: prebuild.mjs:77 runs seed-commerce unconditionally on PG; update branches force source values with no marker guard; pricing.ts and manual/instructions consume the reverted rows. No execution performed.

### Remediation

Create-if-missing upserts (update:{}) for all seed-commerce writes; extend the site_logo_source marker pattern to settings/prices; drop published:true from seed-blog update branch (create-only).

Files to change: scripts/seed-commerce.ts, scripts/seed-blog.ts

---

# NEEDS-VALIDATION leads (copied from findings.json)

For every unresolved record: source trace, evidence, exact blocker, and the safe owner-observed or bounded-local resolution plan. These are prioritized leads without severity — not confirmed vulnerabilities.

---

## caddyfile.XTransformPort.localhost-hop

**Repo Caddyfile exposes an unauthenticated ?XTransformPort= reverse-proxy hop to arbitrary localhost ports (sandbox-by-design; production config unproven)**

Caddyfile :81 matches any request with query XTransformPort=* and reverse-proxies to localhost:{query.XTransformPort} with no auth/IP restriction/port allowlist — all trace lines verified verbatim. If this exact file were the public ingress, any remote client steers the proxy at arbitrary loopback services. In the sandbox this is the documented inter-service convention (AGENTS.md hard rule); the production sketch in docs contains no such handle and is labeled a production sketch — but a sketch is not the deployed config: the repo additionally references Coolify, Vercel and a Netlify runtime as deploy paths, so the live production ingress cannot be proven from source.

- Claimed root cause: sandbox Caddyfile selects the upstream port from a client-controlled query with no allowlist; repo contains no proof of the deployed production ingress.

### Trace

- **entrypoint** `Caddyfile:2` — @transform_port_query: client-supplied trigger
- **propagation** `Caddyfile:6` — handle: no auth/source restriction
- **sink** `Caddyfile:7` — reverse_proxy localhost:{query.XTransformPort}: arbitrary loopback port bridged to the public listener

### Evidence

- `Caddyfile:7` — upstream from query
- `Caddyfile:1` — :81 hostname-less plain HTTP
- `AGENTS.md:27` — sandbox convention documented as a hard rule
- `docs/13-g-infra-ops.md:89` — production sketch without the handle — intent, not deployment state

### Blockers

- the actually deployed production ingress config is not in the repository — owner must confirm the live Caddyfile/platform ingress contains no XTransformPort handle
- if a platform fronts production instead (Coolify-Traefik / Vercel / Netlify), confirm no analogous client-steered internal routing
- whether :81 is bound publicly or firewalled is a network fact outside the repo

### Validation plan

- **deployment (owner-observed)**: Owner-observed config inspection: caddy adapt --config /etc/caddy/Caddyfile --pretty | grep -n XTransformPort (expect none) or direct file inspection of the live ingress; plus firewall confirmation only 80/443 publicly bound (ss -tlnp / security groups).

---

## git-config.remote-url.embedded-credential

**Live GitHub access token embedded in the git remote URL inside .git/config of the working copy**

.git/config line 10 stores origin as https://isnamni:<credential>@github.com/isnamni/yekdoost.git for fetch and push — credential-bearing URL pattern verified via pattern match and masked output; the secret value was never printed or extracted. .git/ is untracked (not a committed secret), but it is a push-capable plaintext credential in a workspace whose own bundling/extract scripts move artifacts around — any export including .git/ leaks repository write access, chaining into the deploy pipeline. Corroboration: worklog.md:467 documents pushes from this workspace and worklog.md:481 explicitly recommends the owner ROTATE the GitHub PAT ('it was pasted in chat') — i.e. a live, rotation-pending credential. Token scope/ownership/rotation status not observable from source.

- Claimed root cause: remote configured with credentials embedded in the URL instead of a credential helper/SSH; nothing detects credential-bearing remote URLs in exported artifacts or warns on chat-pasted PATs.

### Trace

- **entrypoint** `.git/config:10` — remote.origin.url: https://isnamni:<credential>@github.com/… — presence verified by pattern test, value redacted
- **propagation** `worklog.md:467` — push workflow: baseline pushed from this workspace
- **propagation** `worklog.md:481` — incident note: owner advised to ROTATE the GitHub PAT — rotation status unknown
- **sink** `scripts/extract-bundle.mjs:1` — export surface: script exists; whether its runtime outputs include .git/ is not in source

### Evidence

- `.git/config:10` — url line matches ://user:secret@ pattern; value never printed
- `worklog.md:467` — pushes from this workspace
- `worklog.md:481` — rotation recommendation — live rotation-pending credential

### Blockers

- token scope, owner (platform-issued vs personal PAT), and rotation status not observable from source
- whether any export/bundle/backup artifact actually includes .git/ (extract-bundle.mjs runtime behavior not in source)

### Validation plan

- **deployment (owner-observed)**: Owner-observed: git config --get remote.origin.url on the build machine; if a token is embedded switch to a credential helper/SSH and rotate the token in GitHub settings (worklog already recommends rotation); grep exported bundles/archives for .git/config and rotate if found; check GitHub security log for the token recent use.

---

## git-history.env-and-db-blobs.reachable-from-main

**Historically committed .env and db/custom.db blobs remain reachable from main and origin/main (local refs) despite the documented history rewrite — and .env was re-added AFTER the purge**

worklog.md:467 records the incident: .env + db/custom.db historically tracked (environment auto-commits), reached the remote, purged via rm --cached + history rewrite (force-push clean main). In this clone: commit aecaa4a (2026-10-15) adds .env — verified via git show: exactly 50 bytes, single key DATABASE_URL whose value begins file:/home (a local sandbox SQLite path — dev-only, harmless); commit 4eba4da (2026-10-12) adds db/custom.db — verified 24,576 bytes. Both commits verified ancestors via git merge-base --is-ancestor against HEAD AND the locally-fetched origin/main. Decisive new fact: 7f6618b (task-14 final state, i.e. after the documented purge) IS an ancestor of aecaa4a — the purge did not stick even locally: the same task-20 auto-commit that gutted .gitignore re-introduced .env to the tracked tree. Blob hygiene verified: strings scan of the db blob = 0 phone-like, 0 order-code-like, 0 secret strings. Local reachability certain; whether the REMOTE currently serves these blobs is outside source (origin/main is a fetched snapshot, not live truth).

- Claimed root cause: the task-14 purge never removed the blobs from the main lineage, AND the task-20 auto-commit re-added .env afterwards while .gitignore was gutted — db/custom.db original add was never rewritten out of either lineage.

### Trace

- **entrypoint** `worklog.md:467` — incident record: leak + purge claim: .env + db/custom.db historically tracked, reached the remote, purged via rm --cached + history rewrite
- **propagation** `worklog.md:476` — task-14 final state: purged main == 7f6618b — yet 7f6618b is an ancestor of the later commit aecaa4a which re-adds .env (ancestry verified by git merge-base --is-ancestor)
- **propagation** `.gitignore:7` — ignore rule .env: protects the working tree only, not history blobs
- **sink** `.git/config:10` — origin remote: repo consumed by deploys — blobs aecaa4a(.env) and 4eba4da(db/custom.db) remain reachable in the main/origin-main lineage

### Evidence

- `worklog.md:467` — verified verbatim: purge claim + dev-only .env assessment
- `worklog.md:476` — task-14 final state main == 7f6618b — pre-dates aecaa4a
- `.gitignore:7` — .env ignore rule — history not protected
- `.git/config:10` — origin URL (credential redacted) — ancestry facts: aecaa4a→HEAD true, 4eba4da→HEAD true, aecaa4a→origin/main true, 4eba4da→origin/main true, 7f6618b→aecaa4a true (git merge-base --is-ancestor); git show aecaa4a:.env = 50 bytes, single DATABASE_URL key with file:/home value (dev-only); git show 4eba4da --stat = db/custom.db 24576 bytes, strings scan clean of phone/order-code/secret strings

### Blockers

- whether the remote currently serves commits aecaa4a/4eba4da and their blobs (out-of-band rewrite or provider GC not observable without network; local origin/main is only the last-fetched snapshot)
- whether other clones/forks/platform caches retained pre-rewrite history

### Validation plan

- **local**: Already established by verification: ancestry checks all true; .env content dev-only; db blob strings-clean.
- **deployment (owner-observed)**: Owner-observed: git fetch origin && git merge-base --is-ancestor aecaa4a origin/main (or browse the commit on GitHub); if reachable, purge with git filter-repo + force-push, re-check the task-20 auto-commit environment, then verify git log origin/main -- .env db/custom.db is empty.

---

## netlify-runtime-db-fresh-seeded-demo-sqlite

**Netlify deployments run on a per-instance /tmp SQLite freshly demo-seeded on every build**

Every Netlify deploy recreates db/custom.db with demo data (seed-commerce + seed-blog), bundles it via outputFileTracingIncludes ./db/**, and at cold start bootstrapServerlessSqlite() rewrites DATABASE_URL to a per-instance /tmp/custom.db copy when the env URL is absent or points at a missing/empty or /tmp file. Warm instances keep their pre-deploy copy (copy skipped when target ≥100KB) → split-brain after redeploys; all writes land in a throwaway per-instance file. A real store served by this deployment would show demo products while payments write into ephemeral storage. Source calls Netlify a live mirror of the Coolify single-box target, so which platform serves the production domain, and whether site env pins an external DATABASE_URL (which the bootstrap honors untouched), are deployment facts.

- Claimed root cause: Deployment config makes a throwaway demo-seeded SQLite the default runtime datastore of the serverless target with no guard preventing production traffic from landing on it.

### Trace

- **entrypoint** `netlify.toml:18` — build command: db push + demo seeds every deploy
- **propagation** `next.config.ts:66` — outputFileTracingIncludes ./db/**: bundled db ships inside the function
- **propagation** `src/lib/db.ts:6` — bootstrapServerlessSqlite(): runs on every cold start
- **sink** `src/lib/sqlite-serverless.ts:66` — DATABASE_URL rewrite: file:/tmp/custom.db; warm instances keep stale copy (copy skipped ≥100KB at :47)

### Evidence

- `netlify.toml:18` — db push + demo seeds every deploy
- `netlify.toml:13` — documented site env list contains no DATABASE_URL
- `netlify.toml:1` — live mirror of the Coolify single-box target
- `src/lib/sqlite-serverless.ts:47` — copy skipped when target ≥100KB — stale DB survives on warm instances
- `src/lib/sqlite-serverless.ts:37` — external/non-file DATABASE_URL wins untouched — the only escape hatch
- `next.config.ts:66` — tracing includes ./db/**
- `scripts/seed-commerce.ts:9` — demo catalog confirmed

### Blockers

- which platform serves the production domain — Coolify vs Netlify — is not pinned in source
- whether the Netlify site env sets an external DATABASE_URL or the site is preview-only (documented site-env list omits it; UI/API state is owner-observed)
- Netlify lambda instance lifetime for /tmp/custom.db (real data-loss/split-brain window)

### Validation plan

- **deployment (owner-observed)**: Owner-observed: confirm which DNS domain serves production and whether Netlify is attached; inspect Netlify env for DATABASE_URL; if Netlify serves traffic, place a dummy order, redeploy, observe whether it survives.

---

## payments/zarinpal-simulate-authority-accepted-as-paid

**Zarinpal simulate mode silently accepts local SIM* authorities as paid in production (not covered by assertProdSecrets)**

When ZARINPAL_MERCHANT_ID is unset, zarinpalSimulate() flips the PSP seam to a local simulator: create mints SIM+24hex with no provider call, redirect goes to on-site /pay-gateway (which navigates to the real callback), verify returns ok for ANY SIM-prefixed authority with no external/amount check, and the unauthenticated callback then marks paid. If this is the production configuration, any OTP-verified customer marks orders paid with zero money movement; cron reconcile auto-verifies stale SIM payments after 1h. assertProdSecrets covers only SESSION_SECRET/CRON_SECRET/ADMIN_PANEL_PASSWORD; env schema declares the merchant id optional. Every code-path claim is source-provable; the decisive missing fact is the deployed env value, with conflicting in-repo hints.

- Claimed root cause: simulate/production decision keyed solely on the optional merchant id with fail-open default; prod secret guard never extended to it.

### Trace

- **entrypoint** `src/app/api/payment/zarinpal/callback/route.ts:17` — unauthenticated GET: Authority+Status from query
- **propagation** `src/app/api/payment/zarinpal/callback/route.ts:24` — lookup: findFirst payment by authority
- **propagation** `src/lib/orders/checkout.ts:406` — simulate verify: SIM* → ok:true, no fetch, no amount check
- **sink** `src/app/api/payment/zarinpal/callback/route.ts:56` — mark paid: updateMany verified + transitionOrder paid; cron reconcile uses the same path

### Evidence

- `src/lib/orders/checkout.ts:368` — simulate === !env.ZARINPAL_MERCHANT_ID
- `src/lib/orders/checkout.ts:384` — SIM authority minted locally
- `src/lib/orders/checkout.ts:406` — startsWith(SIM) accepted as ok
- `src/lib/orders/checkout.ts:377` — redirect to local /pay-gateway when simulate
- `src/components/shop/screens/pay-gateway.tsx:25` — screen navigates to the real callback — simulated success completes the round trip
- `src/lib/env.ts:28` — merchant id optional
- `src/lib/env.ts:60` — guard covers only 3 secrets
- `src/app/api/jobs/[name]/route.ts:91` — reconcile-payments: stale initiated → zarinpalVerify → SIM ok → paid

### Blockers

- value of ZARINPAL_MERCHANT_ID in the deployed production environment — source cannot establish whether it is set; zarinpalSimulate() flips the whole seam on its absence
- whether the deployed platform injects ZARINPAL_MERCHANT_ID through any out-of-repo mechanism — in-repo hints conflict (netlify.toml lists it as + later; ops doc says VPS .env with sandbox value until phase-3 switch; worklog says simulate is active for now)

### Validation plan

- **local**: None required — branch is static; no in-repo layer gates simulate mode in production (verified: only consumers of the flag are checkout, callback, recheck, jobs reconcile).
- **deployment (owner-observed)**: Owner-observed, no target probing: (a) inspect production env for ZARINPAL_MERCHANT_ID (Coolify VPS .env / Netlify site env); (b) alternatively place one test order and read ack.payment.redirectUrl — StartPay URL = real mode, /pay-gateway?authority=SIM… = simulate mode. If simulate active, set the merchant id or make simulate fail closed (refuse SIM-verify when NODE_ENV=production) before launch.

---

## prebuild.no-env-gate.db-mutation-on-every-build

**Build-time DB mutation has no environment gate — migration + db push --accept-data-loss + 4 seeds run on any build whose DATABASE_URL is postgres**

prebuild.mjs:49-53 gates solely on the DATABASE_URL protocol regex; no NODE_ENV/VERCEL_ENV/branch/preview distinction exists anywhere in prebuild.mjs or the package.json build chain (the only VERCEL check is post-build.mjs:12 — AFTER all DB mutation, and only for standalone assembly). prisma db push --accept-data-loss bypasses interactive confirmation; the mutation precedes next build, so it executes even when the build subsequently fails. Every such build — including preview contexts if they resolve the same URL — migrates, destructively pushes schema, and writes 4 seeds to whatever DB the build env points to. Scope note: netlify.toml never invokes prebuild.mjs (inline SQLite URL), so the exposed surface is hosts running the package.json build with a postgres:// URL — Vercel/Coolify per source. The missing fact sizing the blast radius: whether preview deployments share the production DATABASE_URL.

- Claimed root cause: protocol-only gate + unconditional --accept-data-loss; environment separation lives entirely outside the repository.

### Trace

- **entrypoint** `package.json:7` — build chain: prebuild runs before build success on every deploy build
- **propagation** `scripts/prebuild.mjs:50` — sole gate: protocol regex on DATABASE_URL is the complete guard
- **propagation** `scripts/prebuild.mjs:72` — destructive push: --accept-data-loss — flag bypasses interactive guard, no dry-run
- **sink** `scripts/prebuild.mjs:83` — seed stage: 4 seeds against whatever DB the build env points to

### Evidence

- `scripts/prebuild.mjs:49` — raw = env DATABASE_URL — the only variable consulted
- `scripts/prebuild.mjs:50` — protocol regex is the complete guard; no other conditional
- `scripts/post-build.mjs:12` — VERCEL checked only AFTER mutation, for standalone assembly
- `scripts/prebuild.mjs:72` — unconditional --accept-data-loss --skip-generate
- `package.json:7` — DB mutation precedes next build success
- `netlify.toml:18` — Netlify path never runs prebuild — scope limited to Vercel/Coolify-style builds

### Blockers

- the DATABASE_URL configured for PREVIEW vs production deployments on the hosting platform (Vercel/Coolify) is not present in source
- whether the platform executes the package.json build script for every deploy context (including previews) is a platform default, not visible in the repository

### Validation plan

- **local**: None required — control absence fully source-visible (prebuild.mjs:49-53 is the only gate).
- **deployment (owner-observed)**: Owner-observed: open hosting deploy logs for one PREVIEW deployment and check for "[prebuild] PostgreSQL detected → prisma db push"; confirm in platform settings whether previews inherit the production DATABASE_URL (Vercel: per-environment env scoping; Coolify: per-app preview env).

---

## rate-limit.clientIp.xff-first-hop-identity

**Rate-limit identity trusts attacker-influenceable X-Forwarded-For first hop; production ingress decides whether caps (incl. the admin door only throttle) can be rotated**

clientIp() returns the FIRST XFF element (else X-Real-IP, else 'unknown'); every IP-scoped limit keys on it incl. admin_login 5/900 — the ONLY brute-force control on the admin password door (verified: no lockout/captcha anywhere; admin/password keys the rotation guard on the same identity). First-hop-wins parsing: (a) direct origin exposure → fully attacker-chosen identity; (b) appending ingress (prod sketch sets only X-Real-IP) → client fake first hop survives; (c) replacing ingress (repo Caddyfile:9 source-confirmed) → spoofing defeated but edge/CDN collapses users to shared buckets; (d) stripping without X-Real-IP → everyone shares 'unknown'. Decisive branch = deployed ingress behavior: the repo references at least three candidate production frontends (VPS Caddy sketch + Arvan CDN, Coolify, Vercel, Netlify).

- Claimed root cause: rate-limit identity derivation unconditionally trusts client-supplied XFF first hop (or X-Real-IP) with no trusted-proxy validation anywhere.

### Trace

- **entrypoint** `src/lib/rate-limit.ts:86` — clientIp(): XFF first element / X-Real-IP / unknown
- **propagation** `src/app/api/auth/admin-login/route.ts:24` — rateLimit(admin_login): sole brute-force control on the password door
- **sink** `src/app/api/auth/admin-login/route.ts:46` — createSession: on the attempt where password verifies, admin session minted — control keyed to a rotatable identity

### Evidence

- `src/lib/rate-limit.ts:88` — fwd.split(",")[0].trim() — first hop wins
- `src/app/api/auth/admin-login/route.ts:24` — 5/900s sole throttle; no account lockout anywhere
- `src/app/api/admin/password/route.ts:49` — same identity for password change
- `Caddyfile:9` — sandbox replaces XFF — verified verbatim
- `docs/13-g-infra-ops.md:111` — prod sketch sets only X-Real-IP; XFF unaddressed
- `src/app/api/auth/request/route.ts:32` — auth_req_ip on same identity

### Blockers

- which ingress fronts production (Vercel edge / VPS Caddy / Coolify-Traefik / Arvan CDN / Netlify) is not determinable from the repo — all are referenced in source
- whether it strips, replaces, or appends client XFF (trusted_proxies) is a deployed-config fact; the docs sketch is explicitly a sketch
- whether any direct origin port (app :3000, Caddy :81) is publicly reachable — full-bypass branch — is firewall fact

### Validation plan

- **deployment (owner-observed)**: Owner-observed on the box (no external probing): request an IP-limited endpoint from loopback via the edge hostname with X-Forwarded-For: 192.0.2.7, then read newest RateLimitBucket keys read-only from the DB — if the key embeds 192.0.2.7 the client first hop survives (rotation possible); if the peer/edge address, replace-branch holds. Complement with caddy adapt --pretty | grep -i forwarded and firewall confirmation that :3000/:81 are not public. On a Vercel/Netlify path, log the computed clientIp() server-side for one self-request and compare against the connecting address.

---

## route-handler-full-body-parse-before-size-cap

**Upload/JSON route handlers fully buffer the request body before any size bound exists (no cap at any repo-visible layer)**

Verified literally per route: manual receipt formData() :18 precedes rateLimit :22 (keyed on client-chosen code) and the size check :37, then a second full copy Buffer.from(arrayBuffer) :38; experiences formData() :31 / json() :42 precede zod and the 2/h per-IP limit :62 (comment: validation FIRST); gifts/media parse :53 precedes size :76 (pre-parse per-IP rateLimit exists at :52); refund photos parsed :45 before per-photo checks :63-64; admin logo parse :27 before size :30 (owner-gated). No layer bounds request size: no bodySizeLimit (would not cover route handlers anyway), proxy excludes /api, Caddyfile and the docs Caddy sketch set no request_body cap. On the documented 512MB-heap target a multi-hundred-MB request forces over-budget allocation; sustained outage additionally depends on the two weakly-bounded variants and XFF rotatability.

- Claimed root cause: caps implemented as post-parse per-file checks; no pre-parse Content-Length/stream cap anywhere in the repo; two routes rate-limit only after parse; all per-IP limits key on the first XFF value which the sandbox Caddyfile overwrites but a Coolify/Traefik edge behavior is a deployment fact.

### Trace

- **entrypoint** `src/app/api/payment/manual/receipt/route.ts:18` — await req.formData(): entire body buffered before any bound
- **propagation** `src/app/api/payment/manual/receipt/route.ts:22` — rateLimit(receipt, code): client-supplied code key, AFTER parse; rotating codes = fresh buckets
- **propagation** `src/app/api/payment/manual/receipt/route.ts:37` — file.size check: first size bound — body already buffered
- **sink** `src/app/api/payment/manual/receipt/route.ts:38` — Buffer.from(await file.arrayBuffer()): second full copy before any rejection

### Evidence

- `src/app/api/payment/manual/receipt/route.ts:18` — parse precedes limit+size
- `src/app/api/experiences/route.ts:31` — formData/json precede zod and the limit
- `src/app/api/gifts/media/route.ts:53` — parse at 53, size at 76 — pre-parse limiter exists
- `src/app/api/orders/[id]/refund/route.ts:45` — photos parsed before per-photo checks
- `next.config.ts:62` — no body-size setting of any kind
- `Caddyfile:15` — no request_body limit; XFF overwritten here
- `docs/13-g-infra-ops.md:91` — production Caddy sketch: no request_body cap
- `docs/13-g-infra-ops.md:18` — 512MB max-old-space / MemoryMax 768M target
- `src/lib/rate-limit.ts:88` — clientIp = first XFF value

### Blockers

- which front proxy serves production is not pinned by the repo (docs sketch systemd+Caddy; code comments say Coolify/Traefik) — whether the real edge imposes a request-body cap is owner-observed
- whether the production proxy overwrites or appends X-Forwarded-For (per-IP rotatability) is a deployment fact
- runtime memory behavior of req.formData()/req.json() on multi-hundred-MB bodies inside the 512MB heap was not executed — statically the parse completes before file.size is consulted

### Validation plan

- **local**: Owner-side: run standalone server with max-old-space-size=512; POST 1-2GB multipart to /api/experiences and /api/payment/manual/receipt (rotating codes); watch RSS — expect climb by ~body size before any 400/429.
- **deployment (owner-observed)**: Owner observes live edge config: request-body limit present? XFF overwritten or appended? Add request_body max_size + overwrite XFF at edge; re-run oversized probe → early 413 before the app allocates.

---

## sms-outbox-deliver-before-claim

**SMS outbox drain delivers before claiming — overlapping drains can double-send queued SMS including OTP codes**

flushSms selects queued rows (status='queued', sendAfter≤now — schema defaults), awaits provider deliver() (Kavenegar timeout 8s), then writes sent — no conditional queued→sending claim, no transaction, so any two overlapping readers deliver the same rows. Verified callers: FOUR flushSms call sites, not three — the default-on 60s ticker (busy flag prevents self-overlap only), the secret-gated sms-flush job, owner flush/retry actions (admin/sms/actions:44,52), plus any second app instance. sendSmsNow (OTP) inserts a queued row and delivers in-request unawaited (otp.ts:50 void sendSmsNow), so rows are drain-eligible during their own provider call → a tick landing inside that window double-sends the OTP. OTP remains a single valid code (atomic consume) — no auth weakening; impact = duplicate SMS spend. Dev-echo (no provider configured) makes duplication instant-but-inert; the decisive runtime facts are outside source.

- Claimed root cause: read → deliver → mark without a queued→sending claim; ticker uncoordinated with the HTTP job path, the owner flush/retry actions, and request-path sendSmsNow.

### Trace

- **entrypoint** `src/instrumentation.ts:50` — 60s tick, flushSms(20): default-on unless INTERNAL_CRON=0 — the drain every other caller shares
- **propagation** `src/app/api/jobs/[name]/route.ts:35` — POST sms-flush (parallel entry): external scheduler runs the same unclaimed drain; owner flush/retry actions are a fourth caller
- **propagation** `src/lib/sms/index.ts:262` — findMany queued: no claim/conditional update; status flips only after delivery
- **propagation** `src/lib/auth/otp.ts:50` — void sendSmsNow: row created queued, delivered unawaited — drain-eligible window
- **sink** `src/lib/sms/index.ts:273` — await deliver(): provider send per overlapping reader precedes the status write

### Evidence

- `src/lib/sms/index.ts:262` — queued rows selected with no claim
- `src/lib/sms/index.ts:273` — deliver precedes status write; update unconditional on status
- `src/instrumentation.ts:50` — ticker default on; busy flag prevents self-overlap only
- `src/app/api/jobs/[name]/route.ts:35` — external sms-flush job
- `src/app/api/admin/sms/actions/route.ts:44` — owner flush action — fourth call site
- `prisma/schema.prisma:367` — status default queued; sendAfter default now()
- `src/lib/auth/otp.ts:50` — OTP via unawaited sendSmsNow
- `src/lib/sms/index.ts:311` — dev echo when no provider configured — inert duplication

### Blockers

- requires observing the production SMS provider configuration — deliver() echoes (instant, inert duplication) when neither ippanel nor KAVENEGAR is configured; provider env not in source
- requires observing scheduler coexistence — external timer vs 60s ticker vs owner flush/retry vs second instance; the single-process ticker alone cannot self-overlap, but ticker-vs-in-flight-OTP-deliver can
- attempts>1 rows on SmsOutbox or provider duplicate logs must confirm realized impact

### Validation plan

- **local**: Owner fixture (target execution barred here): scratch DB, one queued row, stub deliver() ~1s, two concurrent flushSms(30) — count deliver() calls (2 = confirmed); with a queued→sending claim added, expect exactly 1.
- **deployment (owner-observed)**: Owner-observed: confirm INTERNAL_CRON + provider keys + whether a timer calls POST /api/jobs/sms-flush; query SmsOutbox for status=sent with attempts>1 or provider logs showing duplicates around tick boundaries.

---

## trim-trace.standalone-purge-finality-unpinned-plugin

**Netlify release-bundle purge finality rests on an unpinned @netlify/plugin-nextjs: manifest rewrite cannot affect the already-materialized standalone tree, and both purge layers have enumerated holes**

trim-trace purges via two disconnected layers: regex filtering of .nft.json file lists (trim-trace.mjs:39-49) and enumerated rmSync of .next/standalone paths (:55-103). Source verifies: (1) the rewrite cannot change what ships on the standalone path — next build copyTracedFiles (node_modules/next/dist/build/utils.js:960) materializes .next/standalone from the ORIGINAL manifests during next build, and trim runs only afterwards (netlify.toml:18); (2) the layers disagree: DENY (:11-21) contains no env pattern at all and omits download/, while STANDALONE_DENY (:55-94) omits report/, tests/, AGENTS.md, worklog.md, bun.lockb and enumerates only 4 env variants — @next/env canonical candidate list includes .env.${d}.local first, so .env.production.local/.env.development.local are missed by both layers; (3) the deciding consumer is declared unpinned (netlify.toml:26) and absent from package.json/bun.lock/node_modules — whether the zip uses the disk-purged standalone verbatim (making the rewrite inert and layer-2 holes final) or re-derives from rewritten manifests (making layer-2 holes moot but layer-1 holes final) is unreviewable from source. No leak demonstrated: .env is gitignored/untracked so on the only host where trim runs (git checkout) no env files exist, and no source-visible trace read pulls the uncovered tracked files.

- Claimed root cause: purge control split across two inconsistent enumerated layers whose effectiveness is decided by an unversioned external packager resolved at deploy time, instead of one pattern-based purge applied before any consumer reads the artifacts, with the packager pinned.

### Trace

- **entrypoint** `netlify.toml:18` — build command: next build && trim-trace — trim after build, before plugin packaging
- **propagation** `scripts/trim-trace.mjs:39` — manifest rewrite: inert for the already-copied standalone tree; DENY matches no env files
- **propagation** `scripts/trim-trace.mjs:74` — standalone purge: STANDALONE_DENY enumerates 4 env variants; misses .env.*.local, report/, tests/, AGENTS.md, worklog.md, bun.lockb
- **sink** `netlify.toml:26` — plugin packaging: @netlify/plugin-nextjs unpinned — packaging mode decides which layer holes are final

### Evidence

- `netlify.toml:18` — command chain places trim between next build and packaging
- `scripts/trim-trace.mjs:11` — DENY list: no env pattern; no report/tests/download
- `scripts/trim-trace.mjs:76` — env purge enumerates 4 variants only
- `scripts/trim-trace.mjs:55` — STANDALONE_DENY gaps
- `next.config.ts:76` — outputFileTracingExcludes omit report/tests/download
- `node_modules/next/dist/build/utils.js:960` — copyTracedFiles copies from original manifests during build
- `node_modules/@next/env/dist/index.js:1` — canonical candidate list starts with .env.${d}.local
- `package.json:7` — build chain never invokes trim; no @netlify/plugin-nextjs dependency anywhere
- `.gitignore:6` — .env/.env.* ignored and untracked

### Blockers

- the @netlify/plugin-nextjs version Netlify resolves (unpinned in netlify.toml:26; absent from package.json, bun.lock and node_modules) and its packaging mode: zip trimmed standalone verbatim (disk purge final, manifest rewrite inert) vs re-derive bundles from rewritten manifests
- whether the resolved plugin performs post-trim re-inclusion from the project root that could restore trimmed files
- whether /_next/image on the deployed site is served by Netlify Image CDN or by the Next function optimizer (trim deletes sharp; next lazy-requires it with no fallback)

### Validation plan

- **local**: Owner scratch clone: run the netlify.toml:18 chain, snapshot .next/standalone, run trim, diff — grep for .env*, report/, tests/, worklog.md, node_modules/{sharp,@img,@prisma/engines}, node_modules/.prisma; establishes exactly what the disk purge removes/leaves and which nft entries go stale.
- **deployment (owner-observed)**: Owner-observed: record the resolved plugin version from a deploy log; download the deployed function archive and diff its file list against post-trim standalone + nft manifests; verify /_next/image resolves.

