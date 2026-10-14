// ── GET /api/catalog — public product catalog (no PII) ──
// slug/name/price/variantId/stock for the client builder + quote payload.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const variants = await db.productVariant.findMany({
      where: { isActive: true, product: { isActive: true } },
      include: { product: true },
      orderBy: { sku: "asc" },
    });
    return NextResponse.json({
      products: variants.map((v) => ({
        slug: v.product.slug,
        name: v.product.name,
        variantId: v.id,
        sku: v.sku,
        priceToman: v.priceToman,
        inStock: v.stock > 0,
      })),
    });
  } catch (e) {
    console.error("[catalog]", e);
    return NextResponse.json({ products: [] });
  }
}
