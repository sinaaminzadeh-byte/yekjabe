// ── branding.ts — cached site-brand state (round 34) ──
// Single source for "is there an uploaded logo?". 30s module cache; the admin
// uploader busts it so the logo swap is instant across the whole app.
import { db } from "@/lib/db";

let cache: { at: number; logoUrl: string | null } | null = null;
const TTL = 30_000;

export async function getBranding(): Promise<{ logoUrl: string | null }> {
  try {
    if (!cache || Date.now() - cache.at > TTL) {
      const setting = await db.setting.findUnique({ where: { key: "site_logo" } });
      // ?v=updatedAt — the branding folder reuses the same filename on
      // re-upload, so the bust param is what makes browsers refetch
      cache = {
        at: Date.now(),
        logoUrl: setting?.value ? `/api/media/${setting.value}?v=${setting.updatedAt.getTime()}` : null,
      };
    }
    return { logoUrl: cache.logoUrl };
  } catch {
    return { logoUrl: null };
  }
}

export function bustBrandingCache() {
  cache = null;
}
