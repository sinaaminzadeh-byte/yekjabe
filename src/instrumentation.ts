// ── instrumentation.ts — internal minute-tick for the sandbox & single-box deploys ──
// Coolify's systemd timers hit /api/jobs/* in production; this in-process tick
// keeps the same guarantees alive in dev (and as a safety net): reservation
// expiry (10-min card-to-card window) + SMS queue drain. Idempotent jobs only.
// Disable with INTERNAL_CRON="0".
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  // ── serverless SQLite bootstrap (Netlify cold start) ──
  // The deploy bundle is read-only: the seeded db ships INSIDE the bundle
  // (next.config outputFileTracingIncludes) and is copied once per instance to
  // the writable /tmp mount BEFORE any module reads DATABASE_URL. .env / VPS
  // deploys already carry DATABASE_URL and skip this branch entirely.
  if (!process.env.DATABASE_URL && process.env.NETLIFY === "true") {
    try {
      const fs = await import("node:fs");
      const path = await import("node:path");
      const target = "/tmp/custom.db";
      if (!fs.existsSync(target)) {
        const candidates = [
          path.join(process.cwd(), "db", "custom.db"),
          path.join(process.cwd(), "..", "db", "custom.db"),
          path.join(process.cwd(), ".next", "server", "db", "custom.db"),
        ];
        for (const c of candidates) {
          if (!fs.existsSync(c)) continue;
          fs.copyFileSync(c, target);
          for (const ext of ["-wal", "-shm"]) {
            if (fs.existsSync(c + ext)) fs.copyFileSync(c + ext, target + ext);
          }
          break;
        }
      }
      if (fs.existsSync(target)) {
        process.env.DATABASE_URL = "file:" + target;
        console.log("[instrumentation] sqlite bootstrapped → /tmp/custom.db");
      } else {
        console.error("[instrumentation] no bundled db found — DATABASE_URL stays unset");
      }
    } catch (err) {
      console.error("[instrumentation] sqlite bootstrap failed:", err);
    }
  }

  if (process.env.INTERNAL_CRON === "0") return;
  if (process.env.NEXT_PHASE === "phase-production-build") return;

  const g = globalThis as { __pnTicker?: NodeJS.Timeout };
  if (g.__pnTicker) return; // hot-reload / multi-register guard

  const { expireDueOrders } = await import("@/lib/orders/expire");

  let busy = false;
  const tick = async () => {
    if (busy) return;
    busy = true;
    try {
      const expired = await expireDueOrders(50);
      if (expired > 0) console.log(`[tick] expired ${expired} unpaid order(s)`);
      // پاک‌سازی پیام‌های منقضی + خالی‌کردن صف پیامک (sandbox/self-box safety net)
      const { purgeExpiredMessages } = await import("@/lib/orders/retention");
      const pr = await purgeExpiredMessages(25);
      if (pr.scanned > 0) console.log(`[tick] purge-messages scanned ${pr.scanned} purged ${pr.purged} failed ${pr.failed}`);
      const { flushSms } = await import("@/lib/sms");
      await flushSms(20);
    } catch {
      /* DB not ready yet — next minute */
    } finally {
      busy = false;
    }
  };

  g.__pnTicker = setInterval(() => void tick(), 60_000);
  g.__pnTicker.unref?.();
}
