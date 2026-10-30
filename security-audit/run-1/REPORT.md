# Security Audit Report — yekdoost (run-1)

**Target:** `/home/z/my-project` (Persian gift e-commerce "یک‌دوست/پیشنماز", Next.js 16 App Router + Prisma)
**Source ref:** git `128f6ba` (round 42), worktree clean
**Profile:** standard · **Scope:** `src/**`, `prisma/**`, `scripts/**`, build/deploy configs, repo hygiene (excluded: `docs/`, `design-ref/`, `public/pages/**` as *content*, `report/`, `download/`, `examples/`, `node_modules/`)
**Budget:** 45 agent invocations (parent-proposed); **spent 38** (4 reconnaissance + 18 hunters + 3 critics + 8 Phase-3 candidate verifiers + 5 Phase-5 record verifiers)
**Execution policy:** sandboxed-source-and-local-only. The environment could not provide an OS-enforced sandbox for target-controlled execution (no network namespace — `unshare` not permitted; non-root uid; shared dev server). Per the skill, **no target code was executed**; every check is source-only (`method: source`), and any decisive fact requiring execution or deployment observation is recorded as `needs_validation` with its exact blocker. No live endpoint was probed; no request was sent to any deployment.
**Prior runs:** none (no compatible prior ledger/findings existed).

## Verdict distribution

| Verdict | Count |
|---|---|
| confirmed | 26 |
| needs_validation | 10 |
| rejected | 0 |

Severity of confirmed records: **high 2 · medium 11 · low 13**.

## Security posture summary

The codebase shows unusually strong fundamentals for its size: DB-backed opaque sessions with sha256-at-rest and `__Host-` HttpOnly cookies, HMAC-hashed attempt-capped OTPs, scrypt everywhere passwords exist, magic-byte sniffing on every upload with server-generated filenames, prefix-allowlisted media reads with per-key DB gates, server-authoritative pricing, a forward-only order state machine, a boot-time prod-secret guard, and an admin API where all 35 route files carry the guard (verified by grep). The confirmed findings are therefore mostly **concurrency races in check-then-act counters** (OTP attempts, rate-limit windows, gift-open lockout, receipt dedupe, purge-vs-renewal, refund rollback), **two operator-vs-owner authorization gaps** (ungated payment `discard`, unvalidated post `coverKey` deletion primitive), **one cross-seat secret-exposure channel** (OTP codes readable from SMS logs), and **build/deploy pipeline defects** (seeds reverting owner data on production, demo data + prefix-deletes on every deploy, Docker healthcheck probing a nonexistent route, internal documents served from `public/`).

## Confirmed findings

| # | Severity | Title | Boundary | One-line result |
|---|---|---|---|---|
| 1 | high | Operator admins read live OTP codes from `/api/admin/sms/logs` | operator→owner / customer sessions | OTP persisted plaintext in `SmsOutbox.params`, returned verbatim to operator seats; verify mints owner seat for seed phones |
| 2 | high | Concurrent verifies defeat the OTP 5-attempt cap | anonymous→customer/owner sessions | check-then-act counter + voided verify limiter → 4-digit brute force |
| 3 | medium | Ungated payment `discard` | operator→financial records | `db.payment.delete` for any status, no audit event |
| 4 | medium | Unvalidated post `coverKey` deletion primitive | operator→owner-only media | poison-then-replace GC deletes arbitrary keys incl. `branding/`, `experiences/`, `refunds/` |
| 5 | medium | Rate-limit window reset race | anonymous→all IP caps | reset writes `count:1` unconditionally; every racing caller admitted |
| 6 | medium | Unpaid checkout reservations uncapped | authenticated buyer→shared stock | one buyer locks a variant 24h; ~250 units/IP/10min sustainable |
| 7 | medium | Gift-open lockout counter non-atomic | anonymous→gift password | lost updates inflate the 10-fail budget ~10× per wave |
| 8 | medium | Purge can destroy a paid renewal's content | admin approval vs 60s ticker | unconditional per-row write after stale scan wipes just-renewed gifts |
| 9 | medium | Unverified `sender.phone` exposes row + paymentKey | buyer→third-party bootstrap | third party's panel returns recipient PII + bearer key |
| 10 | medium | Logout leaves gift draft in localStorage | shared-device privacy (A-05) | next profile user reads previous draft prefilled |
| 11 | medium | Docker healthcheck probes nonexistent `/api/health` | operator→availability | container permanently unhealthy on every Docker deploy |
| 12 | medium | Deploy seeds revert owner Settings/prices/card number | deploy pipeline→owner data | upsert `update:{value}` forces 11 keys incl. card/IBAN every build |
| 13 | medium | Swallowed migration failure then schema push drops GiftOrder | deploy pipeline→legacy data | catch-all + unconditional `--accept-data-loss` push |
| 14 | medium | Demo dataset + prefix wipes on production every deploy | deploy pipeline→prod data | fake verified orders/reviews public; `startsWith('0912111')` deletes real-class rows |
| 15 | low | Receipt sha256 dedupe non-atomic | buyer→one-receipt-one-payment | concurrent identical uploads back two orders |
| 16 | low | Anonymous gift-open existence oracle + permanent lock | anonymous→legacy open path | 404 vs 400/423 distinguishes codes; 10 fails lock + SMS, no unlock |
| 17 | low | Refund photo rollback deletes winner's evidence | refund claimants→evidence | order-id stems + loser catch deletes committed keys |
| 18 | low | Five public UGC routes accept cross-site form posts | third-party pages→visitor relays | S-07 guard applied repo-wide except contact/reviews/experiences/track/auth-request |
| 19 | low | `gift_recv` answers "is this phone a gift recipient" | anonymous→existence oracle | 200 `{noGifts:true}` vs 201+SMS |
| 20 | low | `/api/track` phone-targeted code sweep | anonymous→order status | sequential per-day 4-digit codes; 20/600s cap only |
| 21 | low | Deleted post covers remain publicly streamable | owner takedown→public reads | posts/ has no lifecycle gate; delete/clear never GC media |
| 22 | low | Idempotency-Key has no entropy floor | key holder→order status | 8-char keys accepted as permanent bearer |
| 23 | low | Idempotency-Key validated by 3 divergent rules | key holder→status route | dotted keys unpollable; receipt/recheck accept any ≥8 chars |
| 24 | low | Bootstrap returns unpaid/dead draft gifts to recipients | recipient→draft privacy | bootstrap omits the status gate gifts/received enforces |
| 25 | low | 34 files tracked despite gitignore | repo readers→internal docs | 30 transcripts + 4 uploads (~18MB) incl. past P0 list |
| 26 | low | Internal audit/architecture docs served unauthenticated | anonymous→recon map | `public/*.html` ship on every deploy path; S-12 covers 2/6 |

Full details for every medium+ finding: `FINDINGS-DETAIL.md`.

## NEEDS VALIDATION

These are source-grounded leads whose decisive fact lives outside the repository (deployment/env/runtime). They are **not** confirmed vulnerabilities and carry no severity. Details and exact owner-observed checks: `NEEDS-VALIDATION.md`.

| Fingerprint | Lead | Exact missing fact |
|---|---|---|
| `payments/zarinpal-simulate-authority-accepted-as-paid` | Simulate mode accepts local `SIM*` authorities as paid; not covered by the prod-secret guard | production value of `ZARINPAL_MERCHANT_ID` |
| `route-handler-full-body-parse-before-size-cap` | All upload/JSON handlers buffer the full body before any size bound | live edge proxy identity + body cap + XFF policy |
| `rate-limit.clientIp.xff-first-hop-identity` | Rate-limit identity trusts the first XFF hop | production ingress XFF handling; origin-port exposure |
| `caddyfile.XTransformPort.localhost-hop` | Unauthenticated `?XTransformPort=` proxy hop to arbitrary localhost ports | deployed production ingress config |
| `netlify-runtime-db-fresh-seeded-demo-sqlite` | Netlify serves a per-instance demo-seeded throwaway DB | which platform serves production; site env `DATABASE_URL` |
| `sms-outbox-deliver-before-claim` | SMS drain delivers before claiming → duplicate OTP/notifications | provider config + scheduler coexistence |
| `prebuild.no-env-gate.db-mutation-on-every-build` | Build mutates the DB (migration+push+seeds) on any postgres URL, preview or prod | preview vs production `DATABASE_URL` separation |
| `git-history.env-and-db-blobs.reachable-from-main` | `.env` + db blob commits remain ancestors of main (`.env` re-added post-purge) | whether the remote still serves the blobs |
| `git-config.remote-url.embedded-credential` | Push-capable GitHub token embedded in `.git/config` remote URL | token scope/rotation status |
| `trim-trace.standalone-purge-finality-unpinned-plugin` | Netlify bundle purge finality rests on an unpinned plugin; both purge layers have holes | resolved `@netlify/plugin-nextjs` version/packaging mode |

*(10 needs_validation records total.)*

## Hardening notes (non-findings)

Retained from hunters (full lists in the ledger `local_checks`):
- scrypt parameters at Node defaults (N=16384) — below current OWASP interactive-auth guidance; raise cost.
- `assertProdSecrets` floor of 8 chars for `ADMIN_PANEL_PASSWORD`/`CRON_SECRET` — require 16–24+ random chars.
- Password rotation does not invalidate live admin sessions; seat deactivation is the kill switch.
- `guardLastOwner` (team) is check-then-act — two concurrent demotes can reach zero owners.
- `assertSameOrigin` allow-set includes request-supplied `Host`/`X-Forwarded-Host`; pin to `SITE_URL` + ingress-asserted values.
- Cookie clear on logout omits `Secure` (no-ops for `__Host-` names; DB row deletion is the real control).
- CSP exists only in Report-Only mode with `unsafe-inline`/`unsafe-eval`; X-Frame-Options is the only enforcing frame guard.
- Masked phones in admin lists are display hygiene; detail endpoints return full data to any seat by design.
- `next-auth` declared but unused; `GIFT_OPEN_DEFAULT_PASSWORD="بهار"` dead constant with zero importers — delete.
- Kill the sandbox `Caddyfile` convention before any public reuse; docs production sketch correctly omits it (unverified — see needs_validation).
- `.dockerignore` misses `security-audit/` and `agent-ctx/` (builder-stage context only; runner stage unaffected).
- `low-stock` job runs an unbounded `findMany` (no `take`); `JOBS[name]` dispatch should use `Object.hasOwn`.
- `publicMediaFallback` substitutes the bundled default logo for any missing admin logo — serve the blob or 404 instead.

## Positive source patterns

- Every one of the 35 admin route files calls `requireAdmin` (grep-verified); owner subsets enforced.
- OTP: HMAC-at-rest, purpose isolation, atomic consume, timing-safe compare; session tokens 256-bit CSPRNG with sha256-at-rest.
- Media: server-generated stems everywhere, magic-byte sniffing (no filename/extension trust), prefix allowlists + `..` rejection, MediaBlob parity on delete for gated prefixes.
- Money: server-authoritative pricing end-to-end; Zarinpal verify uses the DB amount; callback marking is conditional-update idempotent.
- Bot-view HTML: escape-first discipline with a scheme-gated URL helper; JSON-LD `<`-escaped; renders public-only data.
- Boot guard refuses default/short production secrets at startup and lazily per access.

## Coverage summary (from the ledger)

| Status | Count |
|---|---|
| covered | 5 |
| candidate (closed with independently verified findings) | 20 |
| blocked | 0 |
| deferred | 0 |
| out_of_scope | 0 (documented scope exclusions only) |

All 75 route files under `src/app/api/**` + `bot-view` are claimed by at least one unit's `reviewed_paths` (verified by two coverage critics). Three critic waves ran: wave-1 (16 hunters), wave-2 (public static HTML — critic-found gap), wave-3 (`trim-trace.mjs` — final-clean-critic-found gap). The wave-3 post-wave and final-clean critic duties were merged into one fresh critic invocation (agent-count discipline); it accepted no further work. Both earlier critic reassignment proposals for the two gift units were rejected as lacking a source-backed reason (both units had closed properly as `candidate` with owned evidence). Hunter `uncovered` entries: 3 raised, 2 resolved by existing unit evidence (clientIp identity → origin/rate-limit unit; `.dockerignore`/`security-audit` → deploy-config unit hardening), 1 carried as the needs_validation lead `prebuild.no-env-gate.db-mutation-on-every-build`.

**This is a partial pass by design.** One standard-profile run finds roughly half of what repeated runs find; no coverage claim beyond the ledger is made. Multiple runs improve coverage.

## Reproduction & fix policy

All `confirmed` records carry a target-neutral `execution` block stating exactly what source inspection established (no execution was performed anywhere in this run). `remediation.strategy` names the smallest effective source fix at the last trusted decision point. The audit did not modify any file in the target repository.
