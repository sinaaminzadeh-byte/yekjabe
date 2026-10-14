// ── rate-limit.ts — in-process token buckets (single node; guide §4.4) ──
// Restart resets the buckets — accepted trade-off while we run one replica.

const buckets = new Map<string, { n: number; reset: number }>();

let purgeTimerStarted = false;
function ensurePurge() {
  if (purgeTimerStarted || typeof setInterval !== "function") return;
  purgeTimerStarted = true;
  const t = setInterval(() => {
    const now = Date.now();
    for (const [k, b] of buckets) if (b.reset < now) buckets.delete(k);
  }, 60_000);
  if (typeof t.unref === "function") t.unref();
}

export async function rateLimit(scope: string, id: string, max: number, windowSec: number): Promise<void> {
  ensurePurge();
  const k = `${scope}:${id}`;
  const now = Date.now();
  let b = buckets.get(k);
  if (!b || b.reset < now) b = { n: 0, reset: now + windowSec * 1000 };
  b.n += 1;
  buckets.set(k, b);
  if (b.n > max) {
    throw Object.assign(new Error("rate_limited"), { rateLimit: true, retryAfter: Math.ceil((b.reset - now) / 1000) });
  }
}

export function isRateLimited(e: unknown): e is { rateLimit: true; retryAfter: number } {
  return typeof e === "object" && e !== null && (e as { rateLimit?: boolean }).rateLimit === true;
}

/** Best-effort client IP behind a trusted proxy (Coolify/Traefik). */
export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim().slice(0, 60);
  return req.headers.get("x-real-ip")?.slice(0, 60) ?? "unknown";
}
