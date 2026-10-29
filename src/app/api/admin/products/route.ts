// ── /api/admin/products — product & addon management (mission §۵) ──
// The «افزودنی‌ها» shelf is admin-managed data: creating a new companion
// product here makes it appear in the cart section without any code change.
// GET  list everything (main gifts + addons, inactive included)
// POST create a product (+ its single "one" variant)
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { assertSameOrigin, requireAdmin } from "@/lib/auth/session";
import { isRateLimited, clientIp, rateLimit } from "@/lib/rate-limit";
import { z } from "zod";
import { slugifyTitle } from "@/lib/media";

const createSchema = z.object({
  name: z.string().trim().min(2).max(60),
  kind: z.enum(["main_gift", "addon"]).default("addon"),
  description: z.string().trim().max(300).optional().default(""),
  emoji: z.string().trim().max(8).optional().default("🎁"),
  priceToman: z.number().int().min(0).max(100_000_000),
  stock: z.number().int().min(0).max(9999).default(0),
  // display attributes (round 34)
  sizeLabel: z.string().trim().max(60).optional().default(""),
  colors: z.string().trim().max(200).optional().default(""),
  specs: z.array(z.object({ label: z.string().trim().min(1).max(40), value: z.string().trim().min(1).max(120) })).max(12).optional().default([]),
});

export async function GET() {
  try {
    await requireAdmin();
    const products = await db.product.findMany({
      orderBy: [{ kind: "asc" }, { createdAt: "asc" }],
      include: {
        variants: true,
        images: { orderBy: { sortOrder: "asc" } },
      },
    });
    return NextResponse.json({
      products: products.map((p) => ({
        id: p.id,
        slug: p.slug,
        name: p.name,
        description: p.description,
        kind: p.kind,
        emoji: p.emoji,
        image: p.imageKey ? `/api/products/${p.slug}/image?v=${p.updatedAt.getTime()}` : null,
        images: p.images.map((i) => ({
          id: i.id,
          url: `/api/media/${i.key}`,
          alt: i.alt,
          sortOrder: i.sortOrder,
        })),
        sizeLabel: p.sizeLabel,
        colors: p.colors,
        specs: p.specs,
        isActive: p.isActive,
        variant: p.variants[0]
          ? {
              id: p.variants[0].id,
              sku: p.variants[0].sku,
              priceToman: p.variants[0].priceToman,
              stock: p.variants[0].stock,
              isActive: p.variants[0].isActive,
            }
          : null,
      })),
    });
  } catch (e) {
    if (isRateLimited(e)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
    assertSameOrigin(req);
    await rateLimit("admin_products", clientIp(req), 30, 600);
    const body = await req.json().catch(() => null);
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      throw new AppError(400, "bad_input", { fields: parsed.error.issues.slice(0, 5).map((i) => `${i.path.join(".")}: ${i.message}`) });
    }
    const v = parsed.data;
    // unique latin slug from the Persian name (+ numeric suffix on collision)
    let slug = slugifyTitle(v.name);
    if (slug.startsWith("post-")) slug = `p-${slug.slice(5)}`; // posts own that prefix
    const clash = await db.product.findUnique({ where: { slug } });
    if (clash) slug = `${slug}-${Date.now().toString(36).slice(-4)}`;
    const skuPrefix = v.kind === "addon" ? "AD" : "PN";
    const product = await db.product.create({
      data: {
        slug,
        name: v.name,
        description: v.description,
        kind: v.kind,
        emoji: v.emoji || "🎁",
        sizeLabel: v.sizeLabel,
        colors: v.colors,
        specs: JSON.stringify(v.specs),
        variants: {
          create: { sku: `${skuPrefix}-${slug}`.slice(0, 40), size: "one", priceToman: v.priceToman, stock: v.stock },
        },
      },
      include: { variants: true },
    });
    return NextResponse.json({ ok: true, id: product.id, slug: product.slug }, { status: 201 });
  } catch (e) {
    if (isRateLimited(e)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
