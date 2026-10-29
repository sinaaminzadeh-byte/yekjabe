// ── /api/admin/products/[id]/images — product gallery management (round 34) ──
// POST   multipart/form-data { file, alt? } → append a photo (max 6/product)
// PATCH  JSON { order: [imageId…] } → full reorder
// DELETE ?imageId=… → remove one photo (file + row); cover promotes to next
// The FIRST image always syncs into Product.imageKey so every legacy consumer
// (catalog card, quote thumbnails) keeps working without changes.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { assertSameOrigin, requireAdmin } from "@/lib/auth/session";
import { isRateLimited, clientIp, rateLimit } from "@/lib/rate-limit";
import { sniffImageMime } from "@/lib/payments/manual";
import { UPLOAD_MAX_BYTES, storeMediaFile, deleteMediaFile, publicMediaUrl } from "@/lib/media";

const IMAGE_MIME: Record<string, string> = {
  "image/jpeg": "image/jpeg",
  "image/png": "image/png",
  "image/webp": "image/webp",
};

const MAX_PER_PRODUCT = 6;

async function loadProduct(id: string) {
  const product = await db.product.findUnique({
    where: { id },
    select: { id: true, slug: true, imageKey: true, images: { orderBy: { sortOrder: "asc" } } },
  });
  if (!product) throw new AppError(404, "not_found");
  return product;
}

function serialize(images: { id: string; key: string; alt: string; sortOrder: number }[]) {
  return images.map((i) => ({
    id: i.id,
    key: i.key,
    url: publicMediaUrl(i.key),
    alt: i.alt,
    sortOrder: i.sortOrder,
  }));
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await requireAdmin();
    assertSameOrigin(req);
    await rateLimit("admin_product_images", clientIp(req), 80, 600);

    const product = await loadProduct(id);
    if (product.images.length >= MAX_PER_PRODUCT) {
      throw new AppError(400, "gallery_full", { max: MAX_PER_PRODUCT });
    }

    const form = await req.formData().catch(() => null);
    const f = form?.get("file");
    const altRaw = form?.get("alt");
    const alt = typeof altRaw === "string" ? altRaw.trim().slice(0, 120) : "";
    if (!(f instanceof File) || f.size === 0) throw new AppError(400, "bad_file");
    if (f.size > UPLOAD_MAX_BYTES) throw new AppError(400, "file_too_large", { max: UPLOAD_MAX_BYTES });

    const buf = Buffer.from(await f.arrayBuffer());
    const mime = IMAGE_MIME[sniffImageMime(buf) ?? ""];
    if (!mime) throw new AppError(400, "bad_file_type");

    const key = await storeMediaFile("products", `${product.id}-${Date.now().toString(36)}`, buf, mime);
    const isFirst = product.images.length === 0;

    await db.$transaction(async (tx) => {
      await tx.productImage.create({
        data: { productId: product.id, key, alt, sortOrder: product.images.length },
      });
      if (isFirst || !product.imageKey) {
        await tx.product.update({ where: { id: product.id }, data: { imageKey: key } });
      }
    });

    const fresh = await loadProduct(id);
    return NextResponse.json({ ok: true, images: serialize(fresh.images) }, { status: 201 });
  } catch (e) {
    if (isRateLimited(e)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await requireAdmin();
    assertSameOrigin(req);
    await rateLimit("admin_product_images", clientIp(req), 120, 600);

    const product = await loadProduct(id);
    const body = (await req.json().catch(() => null)) as { order?: unknown } | null;
    const order = Array.isArray(body?.order) ? body!.order : null;
    if (!order || !order.every((x) => typeof x === "string")) throw new AppError(400, "bad_input");
    const ids = order as string[];
    const owned = new Set(product.images.map((i) => i.id));
    if (ids.length !== product.images.length || !ids.every((x) => owned.has(x))) {
      throw new AppError(400, "bad_input");
    }

    await db.$transaction(
      ids.map((imageId, idx) =>
        db.productImage.update({ where: { id: imageId }, data: { sortOrder: idx } }),
      ),
    );

    const fresh = await loadProduct(id);
    return NextResponse.json({ ok: true, images: serialize(fresh.images) });
  } catch (e) {
    if (isRateLimited(e)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await requireAdmin();
    assertSameOrigin(req);
    await rateLimit("admin_product_images", clientIp(req), 80, 600);

    const product = await loadProduct(id);
    const imageId = new URL(req.url).searchParams.get("imageId");
    const target = product.images.find((i) => i.id === imageId);
    if (!target) throw new AppError(404, "not_found");

    await db.productImage.delete({ where: { id: target.id } });
    await deleteMediaFile(target.key);

    // compact sortOrder + keep cover pointing at the first survivor
    const survivors = product.images.filter((i) => i.id !== target.id);
    await db.$transaction([
      ...survivors.map((img, idx) =>
        db.productImage.update({ where: { id: img.id }, data: { sortOrder: idx } }),
      ),
      db.product.update({
        where: { id: product.id },
        data: { imageKey: survivors[0]?.key ?? "" },
      }),
    ]);

    const fresh = await loadProduct(id);
    return NextResponse.json({ ok: true, images: serialize(fresh.images) });
  } catch (e) {
    if (isRateLimited(e)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
