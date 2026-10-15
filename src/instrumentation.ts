// ── instrumentation.ts — internal minute-tick for the sandbox & single-box deploys ──
// Coolify's systemd timers hit /api/jobs/* in production; this in-process tick
// keeps the same guarantees alive in dev (and as a safety net): reservation
// expiry (10-min card-to-card window) + SMS queue drain. Idempotent jobs only.
// Disable with INTERNAL_CRON="0".
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
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
    } catch {
      /* DB not ready yet — next minute */
    } finally {
      busy = false;
    }
  };

  g.__pnTicker = setInterval(() => void tick(), 60_000);
  g.__pnTicker.unref?.();
}
