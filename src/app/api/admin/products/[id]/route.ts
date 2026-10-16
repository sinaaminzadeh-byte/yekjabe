// ── PATCH /api/admin/products/[id] — edit name/price/stock/active ──
// Forward-only catalog: products are never deleted, they are deactivated
// (isActive=false hides them from catalog + cart while order history stays).
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { assertSameOrigin, requireAdmin } from "@/lib/auth/session";
import { isRateLimited, clientIp, rateLimit } from "@/lib/rate-limit";
import { z } from "zod";

const patchSchema = z.object({
  name: z.string().trim().min(2).max(60).optional(),
  description: z.string().trim().max(300).optional(),
  emoji: z.string().trim().max(8).optional(),
  isActive: z.boolean().optional(),
  priceToman: z.number().int().min(0).max(100_000_000).optional(),
  stock: z.number().int().min(0).max(9999).optional(),
  variantIsActive: z.boolean().optional(),
});

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await requireAdmin();
    assertSameOrigin(req);
    await rateLimit("admin_products", clientIp(req), 60, 600);
    const body = await req.json().catch(() => null);
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) throw new AppError(400, "bad_input");
    const v = parsed.data;

    const product = await db.product.findUnique({ where: { id }, include: { variants: true } });
    if (!product) throw new AppError(404, "not_found");

    await db.$transaction(async (tx) => {
      await tx.product.update({
        where: { id },
        data: {
          ...(v.name !== undefined ? { name: v.name } : {}),
          ...(v.description !== undefined ? { description: v.description } : {}),
          ...(v.emoji !== undefined ? { emoji: v.emoji } : {}),
          ...(v.isActive !== undefined ? { isActive: v.isActive } : {}),
        },
      });
      const variant = product.variants[0];
      if (variant) {
        const needsVariantUpdate =
          v.priceToman !== undefined || v.stock !== undefined || v.variantIsActive !== undefined;
        if (needsVariantUpdate) {
          await tx.productVariant.update({
            where: { id: variant.id },
            data: {
              ...(v.priceToman !== undefined ? { priceToman: v.priceToman } : {}),
              ...(v.stock !== undefined ? { stock: v.stock } : {}),
              ...(v.variantIsActive !== undefined ? { isActive: v.variantIsActive } : {}),
            },
          });
        }
      }
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (isRateLimited(e)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
