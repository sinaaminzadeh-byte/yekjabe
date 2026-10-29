// ── instrumentation.ts — internal minute-tick for the sandbox & single-box deploys ──
// Coolify's systemd timers hit /api/jobs/* in production; this in-process tick
// keeps the same guarantees alive in dev (and as a safety net): reservation
// expiry (10-min card-to-card window) + SMS queue drain. Idempotent jobs only.
// Disable with INTERNAL_CRON="0".
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  // NOTE: the serverless SQLite bootstrap does NOT live here — Netlify's
  // bundled handler skips instrumentation.register(). It runs synchronously
  // from src/lib/db.ts (via src/lib/sqlite-serverless.ts) instead.

  // ── S-01 (audit wave 37): نگهبان سکرت‌های پروداکشن ──
  // در production اگر SESSION_SECRET / ADMIN_PANEL_PASSWORD / CRON_SECRET
  // غایب یا برابر پیش‌فرض عمومی باشند، بالا آمدن سرور همین‌جا با خطای بلند
  // رد می‌شود (سایت بی‌دفاع سروِ نمی‌شود). در dev و در فاز build کاری نمی‌کند.
  // جزئیات و درِ دوم (getter های env) → src/lib/env.ts
  if (process.env.NEXT_PHASE !== "phase-production-build") {
    const { assertProdSecrets } = await import("@/lib/env");
    assertProdSecrets();
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
