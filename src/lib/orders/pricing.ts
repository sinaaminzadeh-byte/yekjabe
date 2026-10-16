// ── orders/pricing.ts — THE only place money is computed (guide §4.5) ──
// Server-authoritative: the client renders the quote, never calculates it.
import type { Prisma } from "@prisma/client";
import { AppError } from "../errors";

export interface QuoteLine {
  variantId: string;
  sku: string;
  productSlug: string;
  productName: string;
  unitPriceToman: number;
  qty: number;
  lineToman: number;
}

export interface Quote {
  subtotalItems: number;
  charms: number;
  retention: number; // نگهداری پیام — 1m رایگان؛ 6m/12m از Setting
  retentionPlan: string;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  lines: QuoteLine[];
}

export type Tx = Prisma.TransactionClient;

export async function getSettings(tx: Tx, keys: string[]): Promise<Record<string, string>> {
  const rows = await tx.setting.findMany({ where: { key: { in: keys } } });
  const out: Record<string, string> = {};
  for (const r of rows) out[r.key] = r.value;
  return out;
}

export async function computeQuote(
  tx: Tx,
  input: {
    items: { variantId: string; qty: number }[];
    charmHearts: number;
    charmPaws: number;
    province: string;
    retention?: string; // "1m" | "6m" | "12m" — default 1m (رایگان)
  },
): Promise<Quote> {
  const variants = await tx.productVariant.findMany({
    where: { id: { in: input.items.map((i) => i.variantId) }, isActive: true },
    include: { product: true },
  });
  if (variants.length !== new Set(input.items.map((i) => i.variantId)).size) {
    throw new AppError(400, "bad_variant");
  }

  const s = await getSettings(tx, [
    "charm_price_toman",
    "ship_fee_tehran_toman",
    "ship_fee_other_toman",
    "retention_6m_price_toman",
    "retention_12m_price_toman",
  ]);
  const charmPrice = Number(s.charm_price_toman ?? 50000);
  const shipTehran = Number(s.ship_fee_tehran_toman ?? 49000);
  const shipOther = Number(s.ship_fee_other_toman ?? 69000);
  // پلن‌های نگهداری از تنظیمات می‌آیند — هیچ قیمت‌ای در کد ثابت نیست (mission §۴)
  const retentionPlan = input.retention === "6m" || input.retention === "12m" ? input.retention : "1m";
  const retention =
    retentionPlan === "6m"
      ? Number(s.retention_6m_price_toman ?? 0)
      : retentionPlan === "12m"
        ? Number(s.retention_12m_price_toman ?? 0)
        : 0;

  const subtotalItems = input.items.reduce((acc, i) => {
    const v = variants.find((x) => x.id === i.variantId);
    if (!v) throw new AppError(400, "bad_variant");
    return acc + v.priceToman * i.qty;
  }, 0);
  const charms = (input.charmHearts + input.charmPaws) * charmPrice;
  // هرگز رایگان — shipping comes from Setting (critic MUST-FIX on free-shipping)
  const shipping = input.province === "تهران" ? shipTehran : shipOther;
  const discount = 0; // contract: coupons come later, exactly here

  const lines: QuoteLine[] = input.items.map((i) => {
    const v = variants.find((x) => x.id === i.variantId)!;
    return {
      variantId: v.id,
      sku: v.sku,
      productSlug: v.product.slug,
      productName: v.product.name,
      unitPriceToman: v.priceToman,
      qty: i.qty,
      lineToman: v.priceToman * i.qty,
    };
  });

  return {
    subtotalItems,
    charms,
    retention,
    retentionPlan,
    subtotal: subtotalItems + charms + retention,
    shipping,
    discount,
    total: subtotalItems + charms + retention + shipping - discount,
    lines,
  };
}
