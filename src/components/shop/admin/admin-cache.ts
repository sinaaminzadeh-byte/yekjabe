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
