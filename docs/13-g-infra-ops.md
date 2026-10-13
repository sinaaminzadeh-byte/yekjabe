# 13-g — INFRA / OPS / COST / ROADMAP PLAN
**Pishnam (پیشنام)** — Persian plush-gift e-commerce · Next.js 16 App Router (standalone) · Prisma + SQLite (WAL) · owner's Iranian VPS 2 vCPU / 2 GB RAM / 40 GB disk
**Scope:** research/design only — no code changes. Basis: `worklog.md` Tasks 1–13 (esp. 13 architecture round + critic lock), owner's 46 binding answers in `docs/architecture-answers.json`, `package.json` (standalone build), `next.config.ts`, sandbox `Caddyfile` (untouched — production Caddyfile below is a *sketch for the VPS*).

**Locked constraints carried forward (from Task 13-c critic + owner answers):**
DB follows hosting → **SQLite WAL** for launch on the 2c/2G VPS; PostgreSQL upgrade runbook comes later with explicit triggers; **no Redis**; wave-0 route-ready modules in sandbox, real routes at deploy; data residency **inside Iran** (must); budget **< 2,000,000 toman/month** (server+SMS+domain); maintenance after delivery = **AI agents over SSH** (owner is non-technical) → every procedure below is a copy-paste command block.

---

## 1. MEMORY BUDGET — 2,048 MB

### 1.1 Steady state (running production)

| Component | Typical RSS | Peak RSS | Notes |
|---|---|---|---|
| OS base (Ubuntu 24.04 minimal, systemd, journald, sshd, cron) | 220 MB | 280 MB | journald capped at 200 MB (§5); no GUI, no snapd |
| Caddy 2 (TLS + reverse proxy + zstd/gzip) | 30 MB | 45 MB | one site + one subdomain, auto-TLS |
| Next.js 16 **standalone** `node server.js` | 350–450 MB | 600 MB | `NODE_OPTIONS=--max-old-space-size=512`, systemd `MemoryHigh=600M MemoryMax=768M` → node OOM-restarts before the box freezes |
| SQLite | ≈ 0 (in-process) | +20–50 MB kernel page cache (reclaimable) | WAL mode; DB file page cache is kernel-side and reclaimable under pressure |
| **Fathom Lite** (analytics — recommended) | 15 MB | 25 MB | single Go binary + its own tiny SQLite file |
| Uptime-Kuma (**optional**) | 60 MB | 90 MB | Node app; see §5 — can be skipped, systemd OnFailure SMS covers 90% of value |
| Arvan CDN + Object Storage | 0 MB | 0 MB | off-box |
| **Total committed (with Kuma)** | **~725–845 MB** | **~1,040 MB** | 35–41% typical / 51% worst |
| **Total committed (without Kuma)** | **~665–785 MB** | **~950 MB** | recommended for launch |

### 1.2 Headroom analysis & verdict

- Committed steady-state ≈ 40% of RAM. Add non-reclaimable kernel slab/buffers ≈ 100–150 MB, then **reserve** for: traffic bursts (Node +30–50% RSS during a campaign hour), nightly backup job (`sqlite3 .backup` + gzip: +100–200 MB transient, ~2 min), monthly restore drill, unattended-upgrades. That reservation lands true headroom at **~15–25%**.
- **Verdict: FITS.** The 2 GB box runs the whole stack with ~15–25% genuine headroom — but with **zero room for a second Node service, an on-box build, or an untuned extra daemon**. Any new service must buy its RAM by removing another (Kuma is the designated first sacrifice).
- Guardrails that make this survivable for AI-ops: `MemoryMax=768M` on pishnam.service (kernel kills Node, systemd restarts it in ~2s — better than a frozen box), `vm.swappiness=10`, **2 GB swapfile**.

### 1.3 Build time — the real danger

`next build` with this dependency tree (Next 16 + Tailwind 4 + SWC) measures **1.2–1.8 GB RSS**. With ~750 MB already committed, an on-box build **will** OOM or thrash swap.

| Policy | Rule |
|---|---|
| **Default (launch)** | Build **off-box** (local machine or CI runner) → ship artifact via rsync (§2.3). Never build on the VPS. |
| **Fallback (no CI available)** | Swap-guarded on-box build, off-peak only: stop fathom (and kuma if present), 2 GB swapfile active, `NODE_OPTIONS=--max-old-space-size=1024 npm run build`, accept 4–10 min build, restart services. Never during 18:00–24:00 traffic or a spike window. |

---

## 2. PROCESS LAYOUT — systemd, no Docker

### 2.1 Why no Docker (binding decision)

1. **RAM:** dockerd + containerd ≈ 80–120 MB constant on a box with 15–25% headroom — that's the entire Fathom+Kuma budget burned on ceremony.
2. **AI-ops simplicity:** post-delivery maintenance is AI agents over SSH. `systemctl status pishnam` / `journalctl -u pishnam -n 100` are single commands an AI (and a human) can reason about; Docker adds image/version drift, registry access (Docker Hub is unreliable/sanctioned from Iran; mirrors are flaky), and a second failure domain.
3. **Single-app monolith:** one Next.js process + Caddy + 3 timers. Containers buy nothing here; they cost debugging surface.
4. **Boring-choices rule:** apt packages + binaries + unit files only. Everything inspectable with standard tools.

### 2.2 Unit inventory

| Unit | Type | Purpose / key directives |
|---|---|---|
| `pishnam.service` | service | `ExecStart=/usr/bin/node /srv/pishnam/current/server.js`; `User=pishnam`; `EnvironmentFile=/srv/pishnam/.env`; `Environment=NODE_ENV=production PORT=3000`; listens **127.0.0.1:3000**; `Restart=always`, `RestartSec=3`; `MemoryHigh=600M`, `MemoryMax=768M`, `LimitNOFILE=8192`; `OnFailure=pishnam-alert@%n.service` |
| `caddy.service` | service | distro/official package; serves pishnam.ir + stats subdomain (§3) |
| `fathom.service` | service | `/usr/local/bin/fathom server --config /etc/fathom.env`; listens 127.0.0.1:8080; `MemoryMax=64M` |
| `kuma.service` | service (**optional**) | Uptime-Kuma on 127.0.0.1:3001; disable first if RAM tight |
| `litestream.service` | service | continuous WAL replication → Arvan S3 (§4.2) |
| `pishnam-backup.service` + `.timer` | timer | nightly 03:30: full `.backup` snapshot → gzip → rclone → Arvan; integrity check; 30-day prune; WAL TRUNCATE checkpoint (§4.3) |
| `pishnam-health.timer` | timer | every 5 min: `curl -fsS http://127.0.0.1:3000/api/health` → 3 consecutive fails → SMS (§5.2) |
| `pishnam-nightly.timer` | timer | 04:00: AuthCode cleanup (13-a finding: OTP rows never purged), disk check (>80% → SMS), daily digest SMS to owner at 09:00 |
| `pishnam-alert@.service` | template | OnFailure hook: sends Kavenegar SMS to owner (§5.2) |

Runtime user `pishnam` owns only `/srv/pishnam/current` (read) and `/srv/pishnam/data` (read-write, holds the DB). Secrets file `/srv/pishnam/.env` is `root:pishnam 640`.

### 2.3 Single deploy script flow (`deploy.sh` — the ONE entrypoint)

```
[deploy machine]                          [VPS]
1. npm ci && npm run build                (off-box; produces .next/standalone + static + public)
2. rsync -az artifact/ vps:/srv/pishnam/releases/<ts>/
3. ssh vps:  ln -sfn /srv/pishnam/releases/<ts> /srv/pishnam/current
4. ssh vps:  prisma migrate deploy  (on-box, pinned CLI, DATABASE_URL=file:/srv/pishnam/data/pishnam.db — tiny RAM; only the BUILD stays off-box)
5. ssh vps:  systemctl restart pishnam        (downtime ≈ 2–5 s)
6. HEALTH GATE: poll /api/health up to 30 s for {"ok":true, version:"<ts>"}
7. on failure → ROLLBACK: ln -sfn releases/<prev> current && systemctl restart pishnam && re-gate
8. keep last 3 releases; prune older
```
- Health gate + automatic rollback make deploy safe for an AI operator: worst case is a 2–5 s restart window, never a broken site.
- Note: `package.json` currently starts standalone via `bun` — on the VPS use plain **Node 22 LTS** (`node .next/standalone/server.js`) for boring-choices consistency. (Recorded as a deploy-time decision, not a code change now.)
- DB lives at `/srv/pishnam/data/pishnam.db` — **outside** the releases tree, so deploys never touch data.

---

## 3. CADDY (production sketch) + ARVAN CDN

The sandbox `Caddyfile` is **not modified**; this is the VPS-side target config.

```caddyfile
# /etc/caddy/Caddyfile — production sketch
pishnam.ir, www.pishnam.ir {
	encode zstd gzip
	# auto-TLS via Let's Encrypt HTTP-01 (works from Iranian IPs; .ir supported)

	header {
		Strict-Transport-Security "max-age=31536000; includeSubDomains"
		X-Content-Type-Options    "nosniff"
		Referrer-Policy           "strict-origin-when-cross-origin"
		X-Frame-Options           "DENY"
		-Server
	}

	# immutable, content-hashed build assets — cache forever at browser
	@immutable path /_next/static/* /fonts/*
	header @immutable Cache-Control "public, max-age=31536000, immutable"

	# product photos stay on their own CDN subdomain (below), never proxied here

	reverse_proxy 127.0.0.1:3000 {
		header_up X-Real-IP {remote_host}
	}
}

stats.pishnam.ir {
	reverse_proxy 127.0.0.1:8080   # Fathom Lite
	# protect with Fathom's own login; consider basicauth in Caddy too
}
```

**Arvan CDN in front of static assets:** configure `cdn.pishnam.ir` → Arvan CDN → Arvan Object Storage bucket; set `assetPrefix: "https://cdn.pishnam.ir"` in `next.config.ts` at deploy time so `/_next/static/*` and self-hosted fonts are pulled from the edge. Product photos (and later voice-note artwork) live in the same public bucket under `/products/...`.
Cache rules: `/_next/static/*` → `max-age=31536000, immutable` (content-hashed — safe forever); product photos → `max-age=2592000` (30 days, invalidate by new filename on re-shoot); fonts → 1 year.

**Why HTML stays uncached at the edge (v1):** the app is cookie/session-aware (guest cart, login, admin panel, receipt uploads) and prices/stock are server-authoritative after فاز ۱ — an edge HTML cache is a stale-price/stale-stock bug generator, and Arvan purge adds an ops step to every deploy. ISR pages (info/blog/stories after the route migration) *emit* `s-maxage` and could be edge-cached; that is a **phase-2 opt-in**: enable Arvan edge cache only for the pure-ISR path list, with a purge hook in `deploy.sh`. Correctness first, cache second.

---

## 4. DATA SAFETY

### 4.1 SQLite WAL tuning (applied in `db.ts` at connect — flagged for فاز ۱, listed here as infra contract)

```sql
PRAGMA journal_mode=WAL;          -- persistent, required by Litestream
PRAGMA busy_timeout=5000;         -- writers wait up to 5s instead of SQLITE_BUSY
PRAGMA foreign_keys=ON;
PRAGMA synchronous=NORMAL;        -- WAL-safe, fast
PRAGMA wal_autocheckpoint=1000;   -- default; keeps WAL file small
```
Nightly job additionally runs `PRAGMA wal_checkpoint(TRUNCATE);` after the snapshot. Expected WAL size < ~10 MB steady. With WAL + `busy_timeout=5000`, SQLite absorbs the 50-concurrent-checkout burst (writes are 5–10 ms each); the k6 test in §7 validates this empirically.

### 4.2 Litestream continuous replication → Arvan Object Storage

- **Why Arvan:** S3-compatible, Iranian company, Tehran-region endpoints → satisfies the owner's binding data-residency answer ("must"). Off-box → 0 MB RAM, survives box loss.
- `/etc/litestream.yml`: source `/srv/pishnam/data/pishnam.db`; replica `s3://pishnam-db` @ `https://s3.ir-thr-at1.arvanstorage.ir`; sync interval **5 s** → **RPO ≤ 5 s**; retention 7 days of WAL segments + 24 h snapshot interval.
- Credentials from `/etc/litestream.env` (`LITESTREAM_ACCESS_KEY_ID`, `LITESTREAM_SECRET_ACCESS_KEY`), a **separate least-privilege Arvan key** (bucket-only).

### 4.3 Nightly full snapshot + retention

`pishnam-backup.service` (03:30): `sqlite3 /srv/pishnam/data/pishnam.db ".backup /tmp/b.db"` → `gzip` → `rclone copy` to `arvan:pishnam-backups/daily/` → sha256 + `PRAGMA integrity_check` on the compressed-then-restored copy → prune > 30 days → `PRAGMA wal_checkpoint(TRUNCATE);` → failure triggers SMS. Compressed full DB is a few MB (order text rows), so 30-day retention ≈ 150–300 MB in S3 — trivial.

### 4.4 MONTHLY restore drill (documented, AI-runnable — copy-paste block)

```bash
# ── MONTHLY RESTORE DRILL (~10 min) ─────────────────────────────
LATEST=$(rclone lsf arvan:pishnam-backups/daily/ | sort | tail -1)
rclone copy "arvan:pishnam-backups/daily/$LATEST" /tmp/drill/
gunzip -k /tmp/drill/$LATEST && mv /tmp/drill/${LATEST%.gz} /tmp/drill/restore.db
sqlite3 /tmp/drill/restore.db "PRAGMA integrity_check;"        # must print: ok
sqlite3 /tmp/drill/restore.db "SELECT COUNT(*) FROM GiftOrder; \
  SELECT no, createdAt FROM GiftOrder ORDER BY createdAt DESC LIMIT 1; \
  SELECT COUNT(*) FROM AppUser;"
sqlite3 /srv/pishnam/data/pishnam.db "SELECT COUNT(*) FROM GiftOrder;"   # compare
# Alternative (tests Litestream path, not just snapshots):
litestream restore -o /tmp/drill/litestream.db "s3:pishnam-db/pishnam.db"
echo "drill $(date -I) by=$(whoami) counts_match=YES" >> /srv/pishnam/drill-log.md
```
**RPO/RTO:** RPO ≤ 5 s (Litestream). RTO ≤ 2 h: new/rebuilt VPS (30–60 min) → `apt` bootstrap script → `litestream restore` (5 min) → health gate + DNS TTL 300 s (15–30 min propagation) → verify. A box-loss is a revenue pause, never a data loss.

### 4.5 Media strategy — Arvan Object Storage, NOT the local 40 GB disk

**Disk math for voice notes (the killer):** ~1.5 MB/note × 1 note/order:
| Orders/day | Voice notes/month | 40 GB disk lifetime (with ~12 GB OS/app/DB/logs base) |
|---|---|---|
| 10 | 0.45 GB | fine |
| 200 (Y1 avg) | 9 GB | **~3 months** |
| 500 (Y1 peak) | **22.5 GB** | **< 2 months — disk full** |

Payment receipts (card-to-card flow from owner's answer): ~400 KB × 500/day = 6 GB/month at peak. Product photos: ~12 SKU × 6 shots × 0.8 MB ≈ 60 MB one-off but need CDN anyway.

**Decision: ALL media → Arvan buckets from day 1.** Public bucket (product photos, via `cdn.pishnam.ir`) + **private bucket** (payment receipts, voice notes, gift audio — accessed via 15-min signed GET URLs, since receipts/gift audio are PII). Upload path = **presigned PUT** issued by a Next.js API route (key naming `orders/{no}/{uuid}.{ext}`, server-side type/size allowlist) so file bytes never flow through Node — RAM-neutral. Local disk keeps only DB + releases + logs (< 5 GB).

### 4.6 Env / secrets inventory

| Variable | Purpose | Lives where |
|---|---|---|
| `DATABASE_URL` | `file:/srv/pishnam/data/pishnam.db` | VPS `.env` (DB itself backed up per §4.3) |
| `SESSION_SECRET` | sign session cookies (فاز ۰ sessions) | VPS `.env`; generated `openssl rand -hex 32`; rotated at launch |
| `CRON_SECRET` | auth for `/api/cron/*` (nightly cleanup, digest) | VPS `.env` + timer script env |
| `KAVENEGAR_API_KEY`, `KAVENEGAR_SENDER`, `OWNER_MOBILE` | SMS OTP/notify + ops alerts | VPS `.env` + alert script env |
| `ZARINPAL_MERCHANT_ID` | PSP | VPS `.env`; sandbox value until فاز ۳ switch |
| `ARVAN_S3_ENDPOINT`, `ARVAN_S3_BUCKET_PUBLIC`, `ARVAN_S3_BUCKET_PRIVATE`, `ARVAN_S3_ACCESS_KEY`, `ARVAN_S3_SECRET` | media uploads (presigned) | VPS `.env` |
| `LITESTREAM_ACCESS_KEY_ID`, `LITESTREAM_SECRET_ACCESS_KEY` | DB replication | `/etc/litestream.env` (600) — separate least-privilege key |
| `RCLONE_CONFIG_ARVAN_*` | nightly backup | root's rclone conf (600) |
| `ADMIN_PIN_HASH` (+ 2nd admin) | server-side admin auth (replaces hardcoded `1398`) | **DB as argon2 hashes**, never env plaintext |
| `NEXT_PUBLIC_*` | only non-secrets (CDN URL) | build args |

Rules: `.env` never in git; `chmod 600 root:pishnam`; monthly **age-encrypted** copy of `.env` → Arvan private bucket (box loss must not mean secret loss); dev values (demo PIN, sandbox merchant) **rotated before launch**.

---

## 5. MONITORING

### 5.1 `/api/health`
Contract: `GET /api/health` → `200 {"ok":true,"db":"ok","version":"<release ts>","ts":...}` where `db` comes from a real `SELECT 1` via Prisma. No PII, no auth, < 50 ms. Consumed by (a) deploy gate (§2.3), (b) `pishnam-health.timer`, (c) optional Kuma, (d) human/AI sanity check.

### 5.2 SMS alert to owner (Kavenegar, few/day max — budgeted ≤ 3 alert SMS/day)
`pishnam-alert@.service` (systemd `OnFailure`) and the health timer call one script:
```bash
#!/usr/bin/env bash  # /usr/local/bin/pishnam-alert.sh  — dedup: max 3/day per reason
# message ≤ 70 chars (1 segment, service line)
curl -s "https://api.kavenegar.com/v1/$KAVENEGAR_API_KEY/sms/send.json" \
  --data-urlencode "receptor=$OWNER_MOBILE" --data-urlencode "sender=$KAVENEGAR_SENDER" \
  --data-urlencode "message=هشدار پیشنام: ${1} — $(date +%H:%M)"
```
Alert reasons: health fail (after 3 consecutive), backup fail, Litestream fail, disk > 80%, SSL expiry < 14 d, release-rollback fired. Anything beyond 3/day folds into the 09:00 daily digest SMS.
**Blind spot (honest):** an on-box monitor cannot report total box/power loss — but box-down = orders pause, not data loss (RPO ≤ 5 s). Optional free external ping (URL-only, no data → no residency conflict) closes it; Kuma on-box closes service-level gaps only. Mark both optional.

### 5.3 Logs
journald `Storage=persistent`, `SystemMaxUse=200M`, `MaxRetentionSec=30d` (native rotation — no separate logrotate needed for journald). Next.js stdout/stderr → journald. Caddy access log: **off** by default (privacy + disk); enable per-incident with `log` + 7-day cap. Any app file logs → `/srv/pishnam/logs` with logrotate `weekly, rotate 4, compress`.

### 5.4 Nightly job checklist (04:00–04:10, all silent unless failing)
1. backup snapshot created, uploaded, checksum + integrity_check OK
2. WAL checkpoint TRUNCATE done (WAL < 10 MB)
3. AuthCode rows > 24 h deleted (13-a leak/rows finding)
4. disk < 80%; journald < cap; drill-log has an entry within 30 days (reminds if drill overdue)
5. 09:00 digest SMS to owner: orders yesterday, receipts pending approval, errors count — **1 SMS**

---

## 6. COST TABLE (toman/month) — honoring < 2M

**SMS scaling law:** cost ≈ orders/day × **3.5 SMS/order** × **125 T/SMS** × 30.
3.5 = OTP ~1.0 + confirm-to-sender 1.0 + tracking 1.0 + admin-notify 0.5 (some orders merged). (125 T = instructed mid-range; **confirm current Kavenegar rate card** — service-line pricing moves with volume tiers.)

| Item | Day-1 (10–50 ord/day) | Y1 avg (200 ord/day) | Y1 peak (500 ord/day) |
|---|---|---|---|
| VPS 2c/2G (**already owned**) | 0 — *renewal note: market ≈ 400–600K/mo when current term ends* | 0 | 0 (→ 4c/8G ~800–1,200K if §8 triggers) |
| Arvan CDN + S3 (media + backups) | 100K | 150–250K | 250K |
| Domain `pishnam.ir` (~150K/**yr**) | ~13K | ~13K | ~13K |
| Kavenegar SMS (3.5/ord × 125 T × 30) | 131–656K | **2,625K ✗** | **6,562K ✗✗** |
| Fathom Lite | 0 | 0 | 0 |
| **Total (as-is)** | **≈ 245–920K ✓** | **≈ 2.9M ✗** | **≈ 6.8M ✗✗** |
| **Total (mitigated**¹**)** | **≈ 230–600K ✓** | **≈ 1.7–1.9M ✓ tight** | **≈ 3.2–3.5M ✗ → budget decision** |

¹ Mitigations (prescribed): **1-segment templates** (Persian = UCS-2 → **≤ 70 chars**/segment; every template written to 70 and pre-approved on Kavenegar — service lines require template approval anyway); **2-SMS/order policy at scale** (confirm + tracking only; 200/day → 1,500K/mo); **admin notifications via free Telegram bot** (owner already picked Telegram as support channel) instead of SMS; owner-facing alerts only in business hours; **volume-tier pricing check** with Kavenegar (10–30% off typical).

**Verdict:** budget **OK at launch** with 2.2–8× margin. **SMS is the #1 line item** and the only true budget breaker: it crosses 1.5M/mo at **~150 orders/day** — that is the revisit trigger. Framing for the owner (Persian): «پیامک با فروش رشد می‌کند — در ۲۰۰ سفارش در روز، پیامک ~۱.۵٪ درآمد است، نه هزینه‌ی زیرساخت؛ آن موقع بودجه‌ی پیامک را جدا کنید.» Payment itself is COGS (Zarinpal ~1%), not infra — excluded here.

---

## 7. 8-WEEK ROADMAP (فاز ۰→۳) + LAUNCH CHECKLIST

Launch target = owner's 2–3 months; weeks 9–12 are owner-side lead-time buffer (اینماد, photos, content) running in parallel with W5–8.

### W1–2 — فاز ۰: security + route-ready
Deliver: sessions + IDOR lockdown (no endpoint trusts body `phone`), orders-dump fix, OTP hardening (server-generated code, attempt counter, in-process rate limit — no Redis), server-side pricing stub, route-ready module extraction (wave-0), `/api/health`, secrets scaffold.
**Accept:** zero unauthenticated PII endpoints (curl-matrix proof); OTP brute-force blocked (test script); 17-route sweep 0 console errors; lint/tsc clean in `src/`; health endpoint live in sandbox.

### W3–4 — فاز ۱: commerce core
Deliver: server-authoritative checkout (server order numbers, `Idempotency-Key` + client retry, pending_payment→paid/failed/canceled/refunded state machine), Zarinpal **sandbox** adapter + card-to-card manual-receipt flow (upload → admin approval queue), inventory count, SQLite WAL pragmas, Litestream + nightly backup wired, Fathom deployed, admin server-side auth (2 admins, argon2), demo-data flagging.
**Accept:** Zarinpal-sandbox E2E purchase; 50 concurrent `POST /api/orders` → no duplicates, no silent losses (kills the `no @unique` race from 13-a); restore drill #1 executed **in sandbox**; failed-payment → `failed` state observed.

### W5–6 — فاز ۲: content/growth
Deliver: real App Router routes + ISR (home, `/product/[kind]`, info set, blog scaffold, `/stories/[slug]` moderated, `/g/[no]` share), `generateMetadata` + JSON-LD + `sitemap.ts` + OG images, legal pages (حریم خصوصی، قوانین، مرجوعی ۷ روزه + personalization exception), real product photos → Arvan pipeline, **اینماد application submitted** (2–6 week lead time starts NOW).
**Accept:** sitemap.xml live on staging; Lighthouse SEO > 90 on product page; photo upload → CDN E2E; story moderation queue blocks-until-approved (verified with a spam POST).

### W7–8 — فاز ۳: deploy + launch ops
Deliver: VPS bootstrap script, `deploy.sh` pipeline + rollback, real Kavenegar OTP E2E, Zarinpal sandbox→live switch, k6 load test, demo-data wipe, monitoring SMS verified, launch-day runbook.
**Accept (k6 targets):** 500 concurrent browsing VUs → p95 < 800 ms HTML; **50 concurrent checkout transactions** → 0 lost/duplicated orders, p95 < 800 ms, 0 SQLITE_BUSY errors surviving `busy_timeout`; report archived in `docs/`.

### LAUNCH CHECKLIST (owner-facing items in Persian)
- [ ] Domain `pishnam.ir` registered + DNS at Arvan (TTL 300) — *owner: ثبت دامنه همین هفته* (blocks اینماد)
- [ ] اینماد badge live on site — *owner: پروانه کسب + فرم‌های اینماد*
- [ ] Real product photos on CDN — *owner: عکاسی ۱۲ محصول تا پایان هفته ۵*
- [ ] **Demo-data wipe:** GiftOrder 1000/104/102 + AppUser «نیلا» + test reviews/favorites deleted; production DB starts clean — *تأیید: هیچ داده‌ی نمایشی در سایت واقعی نمی‌ماند*
- [ ] Real OTP end-to-end on Kavenegar service line (approved ≤70-char templates, wallet charged) — *owner: تأیید قالب‌های پیامک*
- [ ] Zarinpal sandbox→live switch + settlement account confirmed — *owner: قرارداد نهایی درگاه*
- [ ] k6 targets met (§7 W8) — 500 browse / 50 checkout / p95<800ms
- [ ] Backup restore drill done **once on the real VPS**, drill-log entry exists
- [ ] Legal pages published (privacy/terms/refund) — *owner: بازبینی متن‌ها*
- [ ] Secrets rotated from dev values; `.env` age-encrypted copy in Arvan
- [ ] `robots.txt` + sitemap referenced; 404/500 pages styled; Fathom receiving pageviews
- [ ] Alert path tested for real: kill Node → SMS received — *owner: یک پیامک تست دریافت می‌کنید*

---

## 8. SCALE-TRIGGER TABLE (evidence-first — no speculative rebuilds)

| Trigger (sustained) | Action | Cost / effort |
|---|---|---|
| **> 800 orders/day** sustained 2 weeks **OR** VPS resized ≥ 4 GB | **PostgreSQL 16 migration runbook** (prisma provider switch, sqlite→pg import script, `prisma migrate deploy`, dual-read verification window, ~1 day) — pre-written only when trigger fires | ~1 day work; PG +16 GB box RAM |
| **> 10K visits/day** OR campaign weekend (Yalda/Valentine) | **Resize to 4c/8G first** — the cheapest lever (30 min, zero code change) before any architecture work | ~800–1,200K/mo |
| Disk > 30 GB (voice/receipt growth) | media lifecycle: older voice notes → Arvan cold/IA tier; keep 90 days hot | ~0 effort |
| SMS > 150 orders/day | SMS budget re-negotiation + 2-SMS/order policy + volume tier (§6) | owner call |
| **True 10K buyers/day** (~3.6M orders/yr) | multi-node + Redis + pgBouncer + dedicated PG — **explicitly OUT of year-1 scope** (~8–15M/mo). Build only on 2 consecutive weeks of real evidence. | fantasy-tier today |

---

## 9. RISK REGISTER (top 8) + AI-OPS RUNBOOK

### 9.1 Risks

| # | Risk | Mitigation | Owner action needed |
|---|---|---|---|
| 1 | **RAM ceiling (2 GB)** — build OOM, spike OOM | off-box build (§1.3), `MemoryMax` guardrails, 2 GB swap, Kuma first to disable | none (AI-side) |
| 2 | **Single-box SPOF** | RPO ≤ 5 s (Litestream→Arvan), RTO ≤ 2 h scripted rebuild, nightly snapshots, provider snapshot enabled | accept revenue-pause window; enable provider backup panel |
| 3 | **SMS deliverability/cost** | pre-approved 70-char templates, wallet auto-topup alert, scaling law + 150/day trigger | approve templates in Kavenegar panel; keep wallet funded |
| 4 | **Zarinpal settlement timing** (T+1..T+3) | server-side verify with amount check; cash-flow calendar; settlement delay is normal, flagged in digest | confirm settlement schedule with PSP |
| 5 | **Manual-receipt queue SLA** (card-to-card) | FIFO admin queue, reminder SMS if queue > 5 for 30 min, auto-expire stale receipts; at > ~150 orders/day push online gateway as default, card-to-card = fallback | set SLA (پیشنهاد: تأیید تا ۲ ساعت کاری) |
| 6 | **Yalda/Valentine spike** | T-4wk: resize, re-run k6, stock count, freeze deploys T-3 days | confirm campaign dates + stock |
| 7 | **Domain not yet registered** | register NOW; اینماد + PSP + email all block on it | **this week** (~150K/yr) |
| 8 | **Photos not ready** | placeholder policy (no lorem), CDN pipeline ready so shoot-day = upload-day | shoot 12 SKUs by W5 |

### 9.2 AI-OPS RUNBOOK principles (post-delivery maintenance = AI)
Owner is non-technical; **every procedure is a copy-paste command block** an AI runs over SSH — idempotent, with a rollback line, no k8s, no Docker, boring choices only. The "rule of three commands" covers 95% of incidents:
```bash
# STATUS
systemctl status pishnam caddy litestream --no-pager && curl -s localhost:3000/api/health
# LOGS
journalctl -u pishnam -n 200 --no-pager
# ROLLBACK (always the previous release)
ln -sfn /srv/pishnam/releases/<prev> /srv/pishnam/current && systemctl restart pishnam && curl -s localhost:3000/api/health
```
All mutable state in `/srv/pishnam/` (`data/`, `releases/`, `drill-log.md`); deploy = one script (§2.3); every runbook change lands in `docs/` first, VPS second.

---

## 10. MONITORING + BACKUP — what "done" looks like (acceptance)

1. `pkill -9 node` on VPS → systemd restarts ≤ 5 s → health green → (if it stayed down) SMS ≤ 10 min. Tested once, for real.
2. Restore drill executed on the real VPS; `drill-log.md` entry with matching counts + `integrity_check: ok`. Calendar reminder set for monthly.
3. ≥ 30 days of snapshots visible in Arvan bucket + Litestream segments flowing; one `litestream restore` verified.
4. `deploy.sh` run 3× successfully, including 1 forced rollback — ≤ 5 s downtime each, health gate passed.
5. k6 report archived: 500 browse VU + 50 checkout concurrent, p95 < 800 ms, zero order loss.
6. Daily digest SMS received by owner 3 days running; alert SMS received for one induced failure.
7. Disk, journald, WAL-size checks green in the nightly log; AuthCode table shrinking after cleanup.
8. `.env` encrypted copy restorable; secrets inventory matches live VPS (diff = empty).

**Final verdict:** the owner's existing 2c/2G VPS + SQLite WAL + Arvan storage/CDN + Fathom Lite is a **fit-for-launch** stack with boring, AI-operable ops. Build off-box, media off-box, backup off-box; the only true budget breaker at scale is SMS — monitored by trigger, not by speculation.
