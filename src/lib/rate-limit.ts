// ── rate-limit.ts — DB-backed fixed-window buckets (S-04, audit wave 38) ──
// The old in-process Map reset on every restart / cold start and was per-
// lambda — an attacker (or a deploy) could wipe the counters at will. Buckets
// now live in the RateLimitBucket table (key «scope:identity», fixed window
// with windowStart/expiresAt) so limits survive restarts and hold across
// concurrent serverless instances.
//
// Contract (UNCHANGED — zero call-site edits):
//   await rateLimit(scope, id, max, windowSec) → throws { rateLimit: true,
//   retryAfter } when the bucket exceeds max; isRateLimited(e) narrows it;
//   clientIp(req) extracts the best-effort client IP behind the proxy.
//
// Failure policy: if the DB itself is unavailable the limiter FAILS OPEN
// (logs loudly, lets the request through) — the site being down must not be
// made worse by the site being down. Cleanup of expired rows is opportunistic
// (1% of calls) instead of a timer — serverless-unfriendly timers are gone.
import { db } from "@/lib/db";

/** Max retries riding out unique-violation races on the window-reset path. */
const RACE_RETRIES = 3;

/** The thrown shape every call site already narrows with isRateLimited(). */
function limitError(retryAfterSec: number): Error {
  return Object.assign(new Error("rate_limited"), {
    rateLimit: true,
    retryAfter: Math.max(1, Math.ceil(retryAfterSec)),
  });
}

export async function rateLimit(scope: string, id: string, max: number, windowSec: number): Promise<void> {
  // key is the @id — clamp so phone/ip scopes can never collide or overflow
  const key = `${scope}:${id}`.slice(0, 180);
  const now = new Date();
  const windowMs = Math.max(1, windowSec) * 1000;

  let lastErr: unknown = null;
  for (let attempt = 0; attempt < RACE_RETRIES; attempt++) {
    try {
      const bucket = await db.rateLimitBucket.findUnique({ where: { key } });

      if (!bucket || bucket.windowStart.getTime() + windowMs <= now.getTime()) {
        // new window (or first request) — reset the counter atomically
        const expiresAt = new Date(now.getTime() + windowMs);
        const row = await db.rateLimitBucket.upsert({
          where: { key },
          create: { key, count: 1, windowStart: now, expiresAt },
          update: { count: 1, windowStart: now, expiresAt },
        });
        maybeCleanup(now);
        if (row.count > max) throw limitError((row.expiresAt.getTime() - now.getTime()) / 1000);
        return;
      }

      // same window — atomic increment; two concurrent callers can never
      // both read the same pre-increment count
      const row = await db.rateLimitBucket.update({
        where: { key },
        data: { count: { increment: 1 } },
      });
      if (row.count > max) {
        throw limitError((row.expiresAt.getTime() - now.getTime()) / 1000);
      }
      return;
    } catch (e) {
      if (isRateLimited(e)) throw e; // the real limit — propagate
      lastErr = e; // unique-violation race / transient db error → retry
    }
  }
  // all retries exhausted → availability wins, but make it visible
  console.error("[rate-limit] bucket unavailable, failing open:", key, lastErr);
}

/** 1% of calls sweep expired rows — bounded, fire-and-forget, never throws. */
function maybeCleanup(now: Date): void {
  if (Math.random() >= 0.01) return;
  void db.rateLimitBucket
    .deleteMany({ where: { expiresAt: { lt: now } } })
    .catch((e) => console.error("[rate-limit] cleanup failed:", e));
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
