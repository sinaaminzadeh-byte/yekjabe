// ── GET /api/catalog — public product catalog (no PII) ──
// slug/name/price/variantId/stock for the client builder + quote payload.
// kind separates main_gift (6 plush boxes) from addon («افزودنی‌ها» — mission
// §۵): the client renders the addons section from THIS list, so new addons
// added in the admin panel appear without any code change. Retention plan
// prices come from Settings here too (never hardcoded client-side).
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [variants, settings] = await Promise.all([
      db.productVariant.findMany({
        where: { isActive: true, product: { isActive: true } },
        include: { product: true },
        orderBy: { sku: "asc" },
      }),
      db.setting.findMany({
        where: {
          key: {
            in: [
              "retention_6m_price_toman",
              "retention_12m_price_toman",
              "charm_price_toman",
              "charms_enabled",
              "media_max_files",
              "media_max_mb",
            ],
          },
        },
      }),
    ]);
    const rmap: Record<string, string> = {};
    for (const s of settings) rmap[s.key] = s.value;
    // media studio limits — admin-configurable (owner round 30), clamped
    const clampInt = (v: string | undefined, min: number, max: number, dflt: number) => {
      const n = Number(String(v ?? "").replace(/[^0-9]/g, ""));
      return Number.isFinite(n) && n >= min && n <= max ? n : dflt;
    };
    return NextResponse.json({
      products: variants.map((v) => ({
        slug: v.product.slug,
        name: v.product.name,
        kind: v.product.kind, // main_gift | addon
        emoji: v.product.emoji,
        // catalog photo (public marketing asset) — null until the admin uploads one
        image: v.product.imageKey ? `/api/products/${v.product.slug}/image` : null,
        description: v.product.description || null,
        variantId: v.id,
        sku: v.sku,
        priceToman: v.priceToman,
        inStock: v.stock > 0,
      })),
      retention: {
        m6: Number(rmap.retention_6m_price_toman ?? 0),
        m12: Number(rmap.retention_12m_price_toman ?? 0),
      },
      // قلب قرمز/پنجه — admin-controlled (Settings tab): price + on/off switch
      charms: {
        enabled: rmap.charms_enabled !== "0",
        priceToman: Number(rmap.charm_price_toman ?? 50000),
      },
      // استودیو رسانه — سقف فایل/حجم از تنظیمات ادمین (owner round 30)
      media: {
        maxFiles: clampInt(rmap.media_max_files, 1, 3, 3),
        maxMb: clampInt(rmap.media_max_mb, 1, 50, 10),
      },
    });
  } catch (e) {
    console.error("[catalog]", e);
    return NextResponse.json({
      products: [],
      retention: { m6: 0, m12: 0 },
      charms: { enabled: true, priceToman: 50000 },
      media: { maxFiles: 3, maxMb: 10 },
    });
  }
}
