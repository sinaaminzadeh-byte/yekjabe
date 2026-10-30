"use client";

// ── admin-cache — tiny shared client cache for admin GETs (UX-06/P-05) ──
// The panel refetched every tab from zero on every switch (داشبورد → سفارش‌ها
// → داشبورد = 3 full round-trips). This module-level map gives every admin tab
// a short TTL (45s) of free repeats: the second visit renders instantly from
// cache. Every mutation (transition/approve/reject/save…) calls
// invalidateAdminCache() so stale rows never survive a write.
//
// - Only GETs are cached (mutations always hit the server).
// - In-flight dedupe: concurrent mounts of the same URL share one request.
// - fresh:true bypasses and REPLACES the cached entry (manual تازه‌سازی).

export const ADMIN_CACHE_TTL_MS = 45_000;

type Entry = { at: number; data: unknown };

const store = new Map<string, Entry>();
const inflight = new Map<string, Promise<unknown>>();

export function invalidateAdminCache(prefix?: string): void {
  if (!prefix) {
    store.clear();
    return;
  }
  for (const key of [...store.keys()]) {
    if (key.includes(prefix)) store.delete(key);
  }
}

/** Tiny introspection for QA/debug (call from the console: __adminCacheStats()). */
export function adminCacheStats(): { size: number; entries: { key: string; ageMs: number }[] } {
  const now = Date.now();
  return {
    size: store.size,
    entries: [...store.entries()].map(([key, hit]) => ({ key, ageMs: now - hit.at })),
  };
}

if (typeof window !== "undefined") {
  (window as unknown as { __adminCacheStats: typeof adminCacheStats }).__adminCacheStats = adminCacheStats;
}

/**
 * UX-17 (round 40) — زامبی‌نشدن پنل بعد از انقضای نشست.
 * گیت با کلید UNLOCK_KEY در sessionStorage باز می‌ماند ولی کوکی pn_admin بعد
 * از ۸ ساعت منقضی می‌شود؛ تا دیروز نتیجه‌اش این بود که پنل باز می‌ماند ولی
 * همه تب‌ها «اتصال به سرور برقرار نشد» نشان می‌دادند (۴۰۱ قاطی خطای شبکه).
 * حالا هر ۴۰۱ از adminFetch: کلید گیت پاک می‌شود + رویداد سراسری پخش می‌شود
 * تا پوسته (screens/admin.tsx) کاربر را با پیام روشن به گیت ورود برگرداند.
 */
export const ADMIN_SESSION_EXPIRED_EVENT = "admin-session-expired";

/** کلید بازشدن گیت ادمین (یک منبع حقیقت — admin-gate از همین‌جا import می‌کند) */
export const UNLOCK_KEY = "pishnam-admin-ok";

export function notifyAdminSessionExpired(): void {
  try {
    sessionStorage.removeItem(UNLOCK_KEY);
  } catch {}
  try {
    window.dispatchEvent(new CustomEvent(ADMIN_SESSION_EXPIRED_EVENT));
  } catch {}
}

export function adminCachePeek<T>(url: string): T | undefined {
  const hit = store.get(url);
  if (!hit) return undefined;
  if (Date.now() - hit.at > ADMIN_CACHE_TTL_MS) {
    store.delete(url);
    return undefined;
  }
  return hit.data as T;
}

export async function adminFetch<T>(
  url: string,
  opts: { fresh?: boolean } = {},
): Promise<T> {
  if (!opts.fresh) {
    const cached = adminCachePeek<T>(url);
    if (cached !== undefined) return cached;
    const pending = inflight.get(url);
    if (pending) return pending as Promise<T>;
  }

  const p = (async () => {
    const res = await fetch(url, { cache: "no-store" });
    if (res.status === 401) {
      // نشست تمام شده — نه کش، نه پیام «اتصال برقرار نشد»: برگشت به گیت
      store.delete(url);
      notifyAdminSessionExpired();
      throw new Error("admin_fetch_401");
    }
    if (!res.ok) throw new Error(`admin_fetch_${res.status}`);
    const data = (await res.json()) as T;
    store.set(url, { at: Date.now(), data });
    return data;
  })();

  if (!opts.fresh) {
    inflight.set(url, p);
    p.finally(() => inflight.delete(url)).catch(() => {});
  }
  return p;
}
