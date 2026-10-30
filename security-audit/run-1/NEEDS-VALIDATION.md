# NEEDS-VALIDATION — yekdoost run-1

Source-grounded candidates whose decisive validation is blocked by a fact outside the repository. Each names the affected boundary, the exact blocker, and a safe resolution plan (bounded local fixture and/or owner-observed deployment check). **No severity is assigned and none of these is a confirmed vulnerability.** Do not probe live targets; every deployment step below is an owner-side observation.

---

## caddyfile.XTransformPort.localhost-hop

**Repo Caddyfile exposes an unauthenticated ?XTransformPort= reverse-proxy hop to arbitrary localhost ports (sandbox-by-design; production config unproven)**

Caddyfile :81 matches any request with query XTransformPort=* and reverse-proxies to localhost:{query.XTransformPort} with no auth/IP restriction/port allowlist — all trace lines verified verbatim. If this exact file were the public ingress, any remote client steers the proxy at arbitrary loopback services. In the sandbox this is the documented inter-service convention (AGENTS.md hard rule); the production sketch in docs contains no such handle and is labeled a production sketch — but a sketch is not the deployed config: the repo additionally references Coolify, Vercel and a Netlify runtime as deploy paths, so the live production ingress cannot be proven from source.

- Claimed root cause: sandbox Caddyfile selects the upstream port from a client-controlled query with no allowlist; repo contains no proof of the deployed production ingress.

### Source trace

- **entrypoint** `Caddyfile:2` — @transform_port_query: client-supplied trigger
- **propagation** `Caddyfile:6` — handle: no auth/source restriction
- **sink** `Caddyfile:7` — reverse_proxy localhost:{query.XTransformPort}: arbitrary loopback port bridged to the public listener

### Verified evidence

- `Caddyfile:7` — upstream from query
- `Caddyfile:1` — :81 hostname-less plain HTTP
- `AGENTS.md:27` — sandbox convention documented as a hard rule
- `docs/13-g-infra-ops.md:89` — production sketch without the handle — intent, not deployment state

### Exact blockers

- the actually deployed production ingress config is not in the repository — owner must confirm the live Caddyfile/platform ingress contains no XTransformPort handle
- if a platform fronts production instead (Coolify-Traefik / Vercel / Netlify), confirm no analogous client-steered internal routing
- whether :81 is bound publicly or firewalled is a network fact outside the repo

### Resolution plan

- **owner-observed deployment check**: Owner-observed config inspection: caddy adapt --config /etc/caddy/Caddyfile --pretty | grep -n XTransformPort (expect none) or direct file inspection of the live ingress; plus firewall confirmation only 80/443 publicly bound (ss -tlnp / security groups).

---

## git-config.remote-url.embedded-credential

**Live GitHub access token embedded in the git remote URL inside .git/config of the working copy**

.git/config line 10 stores origin as https://isnamni:<credential>@github.com/isnamni/yekdoost.git for fetch and push — credential-bearing URL pattern verified via pattern match and masked output; the secret value was never printed or extracted. .git/ is untracked (not a committed secret), but it is a push-capable plaintext credential in a workspace whose own bundling/extract scripts move artifacts around — any export including .git/ leaks repository write access, chaining into the deploy pipeline. Corroboration: worklog.md:467 documents pushes from this workspace and worklog.md:481 explicitly recommends the owner ROTATE the GitHub PAT ('it was pasted in chat') — i.e. a live, rotation-pending credential. Token scope/ownership/rotation status not observable from source.

- Claimed root cause: remote configured with credentials embedded in the URL instead of a credential helper/SSH; nothing detects credential-bearing remote URLs in exported artifacts or warns on chat-pasted PATs.

### Source trace

- **entrypoint** `.git/config:10` — remote.origin.url: https://isnamni:<credential>@github.com/… — presence verified by pattern test, value redacted
- **propagation** `worklog.md:467` — push workflow: baseline pushed from this workspace
- **propagation** `worklog.md:481` — incident note: owner advised to ROTATE the GitHub PAT — rotation status unknown
- **sink** `scripts/extract-bundle.mjs:1` — export surface: script exists; whether its runtime outputs include .git/ is not in source

### Verified evidence

- `.git/config:10` — url line matches ://user:secret@ pattern; value never printed
- `worklog.md:467` — pushes from this workspace
- `worklog.md:481` — rotation recommendation — live rotation-pending credential

### Exact blockers

- token scope, owner (platform-issued vs personal PAT), and rotation status not observable from source
- whether any export/bundle/backup artifact actually includes .git/ (extract-bundle.mjs runtime behavior not in source)

### Resolution plan

- **owner-observed deployment check**: Owner-observed: git config --get remote.origin.url on the build machine; if a token is embedded switch to a credential helper/SSH and rotate the token in GitHub settings (worklog already recommends rotation); grep exported bundles/archives for .git/config and rotate if found; check GitHub security log for the token recent use.

---

## git-history.env-and-db-blobs.reachable-from-main

**Historically committed .env and db/custom.db blobs remain reachable from main and origin/main (local refs) despite the documented history rewrite — and .env was re-added AFTER the purge**

worklog.md:467 records the incident: .env + db/custom.db historically tracked (environment auto-commits), reached the remote, purged via rm --cached + history rewrite (force-push clean main). In this clone: commit aecaa4a (2026-10-15) adds .env — verified via git show: exactly 50 bytes, single key DATABASE_URL whose value begins file:/home (a local sandbox SQLite path — dev-only, harmless); commit 4eba4da (2026-10-12) adds db/custom.db — verified 24,576 bytes. Both commits verified ancestors via git merge-base --is-ancestor against HEAD AND the locally-fetched origin/main. Decisive new fact: 7f6618b (task-14 final state, i.e. after the documented purge) IS an ancestor of aecaa4a — the purge did not stick even locally: the same task-20 auto-commit that gutted .gitignore re-introduced .env to the tracked tree. Blob hygiene verified: strings scan of the db blob = 0 phone-like, 0 order-code-like, 0 secret strings. Local reachability certain; whether the REMOTE currently serves these blobs is outside source (origin/main is a fetched snapshot, not live truth).

- Claimed root cause: the task-14 purge never removed the blobs from the main lineage, AND the task-20 auto-commit re-added .env afterwards while .gitignore was gutted — db/custom.db original add was never rewritten out of either lineage.

### Source trace

- **entrypoint** `worklog.md:467` — incident record: leak + purge claim: .env + db/custom.db historically tracked, reached the remote, purged via rm --cached + history rewrite
- **propagation** `worklog.md:476` — task-14 final state: purged main == 7f6618b — yet 7f6618b is an ancestor of the later commit aecaa4a which re-adds .env (ancestry verified by git merge-base --is-ancestor)
- **propagation** `.gitignore:7` — ignore rule .env: protects the working tree only, not history blobs
- **sink** `.git/config:10` — origin remote: repo consumed by deploys — blobs aecaa4a(.env) and 4eba4da(db/custom.db) remain reachable in the main/origin-main lineage

### Verified evidence

- `worklog.md:467` — verified verbatim: purge claim + dev-only .env assessment
- `worklog.md:476` — task-14 final state main == 7f6618b — pre-dates aecaa4a
- `.gitignore:7` — .env ignore rule — history not protected
- `.git/config:10` — origin URL (credential redacted) — ancestry facts: aecaa4a→HEAD true, 4eba4da→HEAD true, aecaa4a→origin/main true, 4eba4da→origin/main true, 7f6618b→aecaa4a true (git merge-base --is-ancestor); git show aecaa4a:.env = 50 bytes, single DATABASE_URL key with file:/home value (dev-only); git show 4eba4da --stat = db/custom.db 24576 bytes, strings scan clean of phone/order-code/secret strings

### Exact blockers

- whether the remote currently serves commits aecaa4a/4eba4da and their blobs (out-of-band rewrite or provider GC not observable without network; local origin/main is only the last-fetched snapshot)
- whether other clones/forks/platform caches retained pre-rewrite history

### Resolution plan

- **bounded local**: Already established by verification: ancestry checks all true; .env content dev-only; db blob strings-clean.
- **owner-observed deployment check**: Owner-observed: git fetch origin && git merge-base --is-ancestor aecaa4a origin/main (or browse the commit on GitHub); if reachable, purge with git filter-repo + force-push, re-check the task-20 auto-commit environment, then verify git log origin/main -- .env db/custom.db is empty.

---

## netlify-runtime-db-fresh-seeded-demo-sqlite

**Netlify deployments run on a per-instance /tmp SQLite freshly demo-seeded on every build**

Every Netlify deploy recreates db/custom.db with demo data (seed-commerce + seed-blog), bundles it via outputFileTracingIncludes ./db/**, and at cold start bootstrapServerlessSqlite() rewrites DATABASE_URL to a per-instance /tmp/custom.db copy when the env URL is absent or points at a missing/empty or /tmp file. Warm instances keep their pre-deploy copy (copy skipped when target ≥100KB) → split-brain after redeploys; all writes land in a throwaway per-instance file. A real store served by this deployment would show demo products while payments write into ephemeral storage. Source calls Netlify a live mirror of the Coolify single-box target, so which platform serves the production domain, and whether site env pins an external DATABASE_URL (which the bootstrap honors untouched), are deployment facts.

- Claimed root cause: Deployment config makes a throwaway demo-seeded SQLite the default runtime datastore of the serverless target with no guard preventing production traffic from landing on it.

### Source trace

- **entrypoint** `netlify.toml:18` — build command: db push + demo seeds every deploy
- **propagation** `next.config.ts:66` — outputFileTracingIncludes ./db/**: bundled db ships inside the function
- **propagation** `src/lib/db.ts:6` — bootstrapServerlessSqlite(): runs on every cold start
- **sink** `src/lib/sqlite-serverless.ts:66` — DATABASE_URL rewrite: file:/tmp/custom.db; warm instances keep stale copy (copy skipped ≥100KB at :47)

### Verified evidence

- `netlify.toml:18` — db push + demo seeds every deploy
- `netlify.toml:13` — documented site env list contains no DATABASE_URL
- `netlify.toml:1` — live mirror of the Coolify single-box target
- `src/lib/sqlite-serverless.ts:47` — copy skipped when target ≥100KB — stale DB survives on warm instances
- `src/lib/sqlite-serverless.ts:37` — external/non-file DATABASE_URL wins untouched — the only escape hatch
- `next.config.ts:66` — tracing includes ./db/**
- `scripts/seed-commerce.ts:9` — demo catalog confirmed

### Exact blockers

- which platform serves the production domain — Coolify vs Netlify — is not pinned in source
- whether the Netlify site env sets an external DATABASE_URL or the site is preview-only (documented site-env list omits it; UI/API state is owner-observed)
- Netlify lambda instance lifetime for /tmp/custom.db (real data-loss/split-brain window)

### Resolution plan

- **owner-observed deployment check**: Owner-observed: confirm which DNS domain serves production and whether Netlify is attached; inspect Netlify env for DATABASE_URL; if Netlify serves traffic, place a dummy order, redeploy, observe whether it survives.

---

## payments/zarinpal-simulate-authority-accepted-as-paid

**Zarinpal simulate mode silently accepts local SIM* authorities as paid in production (not covered by assertProdSecrets)**

When ZARINPAL_MERCHANT_ID is unset, zarinpalSimulate() flips the PSP seam to a local simulator: create mints SIM+24hex with no provider call, redirect goes to on-site /pay-gateway (which navigates to the real callback), verify returns ok for ANY SIM-prefixed authority with no external/amount check, and the unauthenticated callback then marks paid. If this is the production configuration, any OTP-verified customer marks orders paid with zero money movement; cron reconcile auto-verifies stale SIM payments after 1h. assertProdSecrets covers only SESSION_SECRET/CRON_SECRET/ADMIN_PANEL_PASSWORD; env schema declares the merchant id optional. Every code-path claim is source-provable; the decisive missing fact is the deployed env value, with conflicting in-repo hints.

- Claimed root cause: simulate/production decision keyed solely on the optional merchant id with fail-open default; prod secret guard never extended to it.

### Source trace

- **entrypoint** `src/app/api/payment/zarinpal/callback/route.ts:17` — unauthenticated GET: Authority+Status from query
- **propagation** `src/app/api/payment/zarinpal/callback/route.ts:24` — lookup: findFirst payment by authority
- **propagation** `src/lib/orders/checkout.ts:406` — simulate verify: SIM* → ok:true, no fetch, no amount check
- **sink** `src/app/api/payment/zarinpal/callback/route.ts:56` — mark paid: updateMany verified + transitionOrder paid; cron reconcile uses the same path

### Verified evidence

- `src/lib/orders/checkout.ts:368` — simulate === !env.ZARINPAL_MERCHANT_ID
- `src/lib/orders/checkout.ts:384` — SIM authority minted locally
- `src/lib/orders/checkout.ts:406` — startsWith(SIM) accepted as ok
- `src/lib/orders/checkout.ts:377` — redirect to local /pay-gateway when simulate
- `src/components/shop/screens/pay-gateway.tsx:25` — screen navigates to the real callback — simulated success completes the round trip
- `src/lib/env.ts:28` — merchant id optional
- `src/lib/env.ts:60` — guard covers only 3 secrets
- `src/app/api/jobs/[name]/route.ts:91` — reconcile-payments: stale initiated → zarinpalVerify → SIM ok → paid

### Exact blockers

- value of ZARINPAL_MERCHANT_ID in the deployed production environment — source cannot establish whether it is set; zarinpalSimulate() flips the whole seam on its absence
- whether the deployed platform injects ZARINPAL_MERCHANT_ID through any out-of-repo mechanism — in-repo hints conflict (netlify.toml lists it as + later; ops doc says VPS .env with sandbox value until phase-3 switch; worklog says simulate is active for now)

### Resolution plan

- **bounded local**: None required — branch is static; no in-repo layer gates simulate mode in production (verified: only consumers of the flag are checkout, callback, recheck, jobs reconcile).
- **owner-observed deployment check**: Owner-observed, no target probing: (a) inspect production env for ZARINPAL_MERCHANT_ID (Coolify VPS .env / Netlify site env); (b) alternatively place one test order and read ack.payment.redirectUrl — StartPay URL = real mode, /pay-gateway?authority=SIM… = simulate mode. If simulate active, set the merchant id or make simulate fail closed (refuse SIM-verify when NODE_ENV=production) before launch.

---

## prebuild.no-env-gate.db-mutation-on-every-build

**Build-time DB mutation has no environment gate — migration + db push --accept-data-loss + 4 seeds run on any build whose DATABASE_URL is postgres**

prebuild.mjs:49-53 gates solely on the DATABASE_URL protocol regex; no NODE_ENV/VERCEL_ENV/branch/preview distinction exists anywhere in prebuild.mjs or the package.json build chain (the only VERCEL check is post-build.mjs:12 — AFTER all DB mutation, and only for standalone assembly). prisma db push --accept-data-loss bypasses interactive confirmation; the mutation precedes next build, so it executes even when the build subsequently fails. Every such build — including preview contexts if they resolve the same URL — migrates, destructively pushes schema, and writes 4 seeds to whatever DB the build env points to. Scope note: netlify.toml never invokes prebuild.mjs (inline SQLite URL), so the exposed surface is hosts running the package.json build with a postgres:// URL — Vercel/Coolify per source. The missing fact sizing the blast radius: whether preview deployments share the production DATABASE_URL.

- Claimed root cause: protocol-only gate + unconditional --accept-data-loss; environment separation lives entirely outside the repository.

### Source trace

- **entrypoint** `package.json:7` — build chain: prebuild runs before build success on every deploy build
- **propagation** `scripts/prebuild.mjs:50` — sole gate: protocol regex on DATABASE_URL is the complete guard
- **propagation** `scripts/prebuild.mjs:72` — destructive push: --accept-data-loss — flag bypasses interactive guard, no dry-run
- **sink** `scripts/prebuild.mjs:83` — seed stage: 4 seeds against whatever DB the build env points to

### Verified evidence

- `scripts/prebuild.mjs:49` — raw = env DATABASE_URL — the only variable consulted
- `scripts/prebuild.mjs:50` — protocol regex is the complete guard; no other conditional
- `scripts/post-build.mjs:12` — VERCEL checked only AFTER mutation, for standalone assembly
- `scripts/prebuild.mjs:72` — unconditional --accept-data-loss --skip-generate
- `package.json:7` — DB mutation precedes next build success
- `netlify.toml:18` — Netlify path never runs prebuild — scope limited to Vercel/Coolify-style builds

### Exact blockers

- the DATABASE_URL configured for PREVIEW vs production deployments on the hosting platform (Vercel/Coolify) is not present in source
- whether the platform executes the package.json build script for every deploy context (including previews) is a platform default, not visible in the repository

### Resolution plan

- **bounded local**: None required — control absence fully source-visible (prebuild.mjs:49-53 is the only gate).
- **owner-observed deployment check**: Owner-observed: open hosting deploy logs for one PREVIEW deployment and check for "[prebuild] PostgreSQL detected → prisma db push"; confirm in platform settings whether previews inherit the production DATABASE_URL (Vercel: per-environment env scoping; Coolify: per-app preview env).

---

## rate-limit.clientIp.xff-first-hop-identity

**Rate-limit identity trusts attacker-influenceable X-Forwarded-For first hop; production ingress decides whether caps (incl. the admin door only throttle) can be rotated**

clientIp() returns the FIRST XFF element (else X-Real-IP, else 'unknown'); every IP-scoped limit keys on it incl. admin_login 5/900 — the ONLY brute-force control on the admin password door (verified: no lockout/captcha anywhere; admin/password keys the rotation guard on the same identity). First-hop-wins parsing: (a) direct origin exposure → fully attacker-chosen identity; (b) appending ingress (prod sketch sets only X-Real-IP) → client fake first hop survives; (c) replacing ingress (repo Caddyfile:9 source-confirmed) → spoofing defeated but edge/CDN collapses users to shared buckets; (d) stripping without X-Real-IP → everyone shares 'unknown'. Decisive branch = deployed ingress behavior: the repo references at least three candidate production frontends (VPS Caddy sketch + Arvan CDN, Coolify, Vercel, Netlify).

- Claimed root cause: rate-limit identity derivation unconditionally trusts client-supplied XFF first hop (or X-Real-IP) with no trusted-proxy validation anywhere.

### Source trace

- **entrypoint** `src/lib/rate-limit.ts:86` — clientIp(): XFF first element / X-Real-IP / unknown
- **propagation** `src/app/api/auth/admin-login/route.ts:24` — rateLimit(admin_login): sole brute-force control on the password door
- **sink** `src/app/api/auth/admin-login/route.ts:46` — createSession: on the attempt where password verifies, admin session minted — control keyed to a rotatable identity

### Verified evidence

- `src/lib/rate-limit.ts:88` — fwd.split(",")[0].trim() — first hop wins
- `src/app/api/auth/admin-login/route.ts:24` — 5/900s sole throttle; no account lockout anywhere
- `src/app/api/admin/password/route.ts:49` — same identity for password change
- `Caddyfile:9` — sandbox replaces XFF — verified verbatim
- `docs/13-g-infra-ops.md:111` — prod sketch sets only X-Real-IP; XFF unaddressed
- `src/app/api/auth/request/route.ts:32` — auth_req_ip on same identity

### Exact blockers

- which ingress fronts production (Vercel edge / VPS Caddy / Coolify-Traefik / Arvan CDN / Netlify) is not determinable from the repo — all are referenced in source
- whether it strips, replaces, or appends client XFF (trusted_proxies) is a deployed-config fact; the docs sketch is explicitly a sketch
- whether any direct origin port (app :3000, Caddy :81) is publicly reachable — full-bypass branch — is firewall fact

### Resolution plan

- **owner-observed deployment check**: Owner-observed on the box (no external probing): request an IP-limited endpoint from loopback via the edge hostname with X-Forwarded-For: 192.0.2.7, then read newest RateLimitBucket keys read-only from the DB — if the key embeds 192.0.2.7 the client first hop survives (rotation possible); if the peer/edge address, replace-branch holds. Complement with caddy adapt --pretty | grep -i forwarded and firewall confirmation that :3000/:81 are not public. On a Vercel/Netlify path, log the computed clientIp() server-side for one self-request and compare against the connecting address.

---

## route-handler-full-body-parse-before-size-cap

**Upload/JSON route handlers fully buffer the request body before any size bound exists (no cap at any repo-visible layer)**

Verified literally per route: manual receipt formData() :18 precedes rateLimit :22 (keyed on client-chosen code) and the size check :37, then a second full copy Buffer.from(arrayBuffer) :38; experiences formData() :31 / json() :42 precede zod and the 2/h per-IP limit :62 (comment: validation FIRST); gifts/media parse :53 precedes size :76 (pre-parse per-IP rateLimit exists at :52); refund photos parsed :45 before per-photo checks :63-64; admin logo parse :27 before size :30 (owner-gated). No layer bounds request size: no bodySizeLimit (would not cover route handlers anyway), proxy excludes /api, Caddyfile and the docs Caddy sketch set no request_body cap. On the documented 512MB-heap target a multi-hundred-MB request forces over-budget allocation; sustained outage additionally depends on the two weakly-bounded variants and XFF rotatability.

- Claimed root cause: caps implemented as post-parse per-file checks; no pre-parse Content-Length/stream cap anywhere in the repo; two routes rate-limit only after parse; all per-IP limits key on the first XFF value which the sandbox Caddyfile overwrites but a Coolify/Traefik edge behavior is a deployment fact.

### Source trace

- **entrypoint** `src/app/api/payment/manual/receipt/route.ts:18` — await req.formData(): entire body buffered before any bound
- **propagation** `src/app/api/payment/manual/receipt/route.ts:22` — rateLimit(receipt, code): client-supplied code key, AFTER parse; rotating codes = fresh buckets
- **propagation** `src/app/api/payment/manual/receipt/route.ts:37` — file.size check: first size bound — body already buffered
- **sink** `src/app/api/payment/manual/receipt/route.ts:38` — Buffer.from(await file.arrayBuffer()): second full copy before any rejection

### Verified evidence

- `src/app/api/payment/manual/receipt/route.ts:18` — parse precedes limit+size
- `src/app/api/experiences/route.ts:31` — formData/json precede zod and the limit
- `src/app/api/gifts/media/route.ts:53` — parse at 53, size at 76 — pre-parse limiter exists
- `src/app/api/orders/[id]/refund/route.ts:45` — photos parsed before per-photo checks
- `next.config.ts:62` — no body-size setting of any kind
- `Caddyfile:15` — no request_body limit; XFF overwritten here
- `docs/13-g-infra-ops.md:91` — production Caddy sketch: no request_body cap
- `docs/13-g-infra-ops.md:18` — 512MB max-old-space / MemoryMax 768M target
- `src/lib/rate-limit.ts:88` — clientIp = first XFF value

### Exact blockers

- which front proxy serves production is not pinned by the repo (docs sketch systemd+Caddy; code comments say Coolify/Traefik) — whether the real edge imposes a request-body cap is owner-observed
- whether the production proxy overwrites or appends X-Forwarded-For (per-IP rotatability) is a deployment fact
- runtime memory behavior of req.formData()/req.json() on multi-hundred-MB bodies inside the 512MB heap was not executed — statically the parse completes before file.size is consulted

### Resolution plan

- **bounded local**: Owner-side: run standalone server with max-old-space-size=512; POST 1-2GB multipart to /api/experiences and /api/payment/manual/receipt (rotating codes); watch RSS — expect climb by ~body size before any 400/429.
- **owner-observed deployment check**: Owner observes live edge config: request-body limit present? XFF overwritten or appended? Add request_body max_size + overwrite XFF at edge; re-run oversized probe → early 413 before the app allocates.

---

## sms-outbox-deliver-before-claim

**SMS outbox drain delivers before claiming — overlapping drains can double-send queued SMS including OTP codes**

flushSms selects queued rows (status='queued', sendAfter≤now — schema defaults), awaits provider deliver() (Kavenegar timeout 8s), then writes sent — no conditional queued→sending claim, no transaction, so any two overlapping readers deliver the same rows. Verified callers: FOUR flushSms call sites, not three — the default-on 60s ticker (busy flag prevents self-overlap only), the secret-gated sms-flush job, owner flush/retry actions (admin/sms/actions:44,52), plus any second app instance. sendSmsNow (OTP) inserts a queued row and delivers in-request unawaited (otp.ts:50 void sendSmsNow), so rows are drain-eligible during their own provider call → a tick landing inside that window double-sends the OTP. OTP remains a single valid code (atomic consume) — no auth weakening; impact = duplicate SMS spend. Dev-echo (no provider configured) makes duplication instant-but-inert; the decisive runtime facts are outside source.

- Claimed root cause: read → deliver → mark without a queued→sending claim; ticker uncoordinated with the HTTP job path, the owner flush/retry actions, and request-path sendSmsNow.

### Source trace

- **entrypoint** `src/instrumentation.ts:50` — 60s tick, flushSms(20): default-on unless INTERNAL_CRON=0 — the drain every other caller shares
- **propagation** `src/app/api/jobs/[name]/route.ts:35` — POST sms-flush (parallel entry): external scheduler runs the same unclaimed drain; owner flush/retry actions are a fourth caller
- **propagation** `src/lib/sms/index.ts:262` — findMany queued: no claim/conditional update; status flips only after delivery
- **propagation** `src/lib/auth/otp.ts:50` — void sendSmsNow: row created queued, delivered unawaited — drain-eligible window
- **sink** `src/lib/sms/index.ts:273` — await deliver(): provider send per overlapping reader precedes the status write

### Verified evidence

- `src/lib/sms/index.ts:262` — queued rows selected with no claim
- `src/lib/sms/index.ts:273` — deliver precedes status write; update unconditional on status
- `src/instrumentation.ts:50` — ticker default on; busy flag prevents self-overlap only
- `src/app/api/jobs/[name]/route.ts:35` — external sms-flush job
- `src/app/api/admin/sms/actions/route.ts:44` — owner flush action — fourth call site
- `prisma/schema.prisma:367` — status default queued; sendAfter default now()
- `src/lib/auth/otp.ts:50` — OTP via unawaited sendSmsNow
- `src/lib/sms/index.ts:311` — dev echo when no provider configured — inert duplication

### Exact blockers

- requires observing the production SMS provider configuration — deliver() echoes (instant, inert duplication) when neither ippanel nor KAVENEGAR is configured; provider env not in source
- requires observing scheduler coexistence — external timer vs 60s ticker vs owner flush/retry vs second instance; the single-process ticker alone cannot self-overlap, but ticker-vs-in-flight-OTP-deliver can
- attempts>1 rows on SmsOutbox or provider duplicate logs must confirm realized impact

### Resolution plan

- **bounded local**: Owner fixture (target execution barred here): scratch DB, one queued row, stub deliver() ~1s, two concurrent flushSms(30) — count deliver() calls (2 = confirmed); with a queued→sending claim added, expect exactly 1.
- **owner-observed deployment check**: Owner-observed: confirm INTERNAL_CRON + provider keys + whether a timer calls POST /api/jobs/sms-flush; query SmsOutbox for status=sent with attempts>1 or provider logs showing duplicates around tick boundaries.

---

## trim-trace.standalone-purge-finality-unpinned-plugin

**Netlify release-bundle purge finality rests on an unpinned @netlify/plugin-nextjs: manifest rewrite cannot affect the already-materialized standalone tree, and both purge layers have enumerated holes**

trim-trace purges via two disconnected layers: regex filtering of .nft.json file lists (trim-trace.mjs:39-49) and enumerated rmSync of .next/standalone paths (:55-103). Source verifies: (1) the rewrite cannot change what ships on the standalone path — next build copyTracedFiles (node_modules/next/dist/build/utils.js:960) materializes .next/standalone from the ORIGINAL manifests during next build, and trim runs only afterwards (netlify.toml:18); (2) the layers disagree: DENY (:11-21) contains no env pattern at all and omits download/, while STANDALONE_DENY (:55-94) omits report/, tests/, AGENTS.md, worklog.md, bun.lockb and enumerates only 4 env variants — @next/env canonical candidate list includes .env.${d}.local first, so .env.production.local/.env.development.local are missed by both layers; (3) the deciding consumer is declared unpinned (netlify.toml:26) and absent from package.json/bun.lock/node_modules — whether the zip uses the disk-purged standalone verbatim (making the rewrite inert and layer-2 holes final) or re-derives from rewritten manifests (making layer-2 holes moot but layer-1 holes final) is unreviewable from source. No leak demonstrated: .env is gitignored/untracked so on the only host where trim runs (git checkout) no env files exist, and no source-visible trace read pulls the uncovered tracked files.

- Claimed root cause: purge control split across two inconsistent enumerated layers whose effectiveness is decided by an unversioned external packager resolved at deploy time, instead of one pattern-based purge applied before any consumer reads the artifacts, with the packager pinned.

### Source trace

- **entrypoint** `netlify.toml:18` — build command: next build && trim-trace — trim after build, before plugin packaging
- **propagation** `scripts/trim-trace.mjs:39` — manifest rewrite: inert for the already-copied standalone tree; DENY matches no env files
- **propagation** `scripts/trim-trace.mjs:74` — standalone purge: STANDALONE_DENY enumerates 4 env variants; misses .env.*.local, report/, tests/, AGENTS.md, worklog.md, bun.lockb
- **sink** `netlify.toml:26` — plugin packaging: @netlify/plugin-nextjs unpinned — packaging mode decides which layer holes are final

### Verified evidence

- `netlify.toml:18` — command chain places trim between next build and packaging
- `scripts/trim-trace.mjs:11` — DENY list: no env pattern; no report/tests/download
- `scripts/trim-trace.mjs:76` — env purge enumerates 4 variants only
- `scripts/trim-trace.mjs:55` — STANDALONE_DENY gaps
- `next.config.ts:76` — outputFileTracingExcludes omit report/tests/download
- `node_modules/next/dist/build/utils.js:960` — copyTracedFiles copies from original manifests during build
- `node_modules/@next/env/dist/index.js:1` — canonical candidate list starts with .env.${d}.local
- `package.json:7` — build chain never invokes trim; no @netlify/plugin-nextjs dependency anywhere
- `.gitignore:6` — .env/.env.* ignored and untracked

### Exact blockers

- the @netlify/plugin-nextjs version Netlify resolves (unpinned in netlify.toml:26; absent from package.json, bun.lock and node_modules) and its packaging mode: zip trimmed standalone verbatim (disk purge final, manifest rewrite inert) vs re-derive bundles from rewritten manifests
- whether the resolved plugin performs post-trim re-inclusion from the project root that could restore trimmed files
- whether /_next/image on the deployed site is served by Netlify Image CDN or by the Next function optimizer (trim deletes sharp; next lazy-requires it with no fallback)

### Resolution plan

- **bounded local**: Owner scratch clone: run the netlify.toml:18 chain, snapshot .next/standalone, run trim, diff — grep for .env*, report/, tests/, worklog.md, node_modules/{sharp,@img,@prisma/engines}, node_modules/.prisma; establishes exactly what the disk purge removes/leaves and which nft entries go stale.
- **owner-observed deployment check**: Owner-observed: record the resolved plugin version from a deploy log; download the deployed function archive and diff its file list against post-trim standalone + nft manifests; verify /_next/image resolves.

