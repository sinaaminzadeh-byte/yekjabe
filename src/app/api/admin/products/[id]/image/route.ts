// ── POST /api/admin/products/[id]/image — catalog photo upload (admin) ──
// multipart/form-data { file }. Magic-byte sniffed (never by filename/mime),
// ≤5MB jpeg/png/webp, stored under .data/products/<id>-<ts>.<ext>; the OLD
// photo is deleted so storage never grows per edit. The response carries a
// ?v=updatedAt bust param so every client refetches the new photo instantly.
// DELETE removes the photo (UI falls back to the emoji glyph).
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { assertSameOrigin, requireAdmin } from "@/lib/auth/session";
import { isRateLimited, clientIp, rateLimit } from "@/lib/rate-limit";
import { sniffImageMime } from "@/lib/payments/manual";
import { UPLOAD_MAX_BYTES, storeMediaFile, deleteMediaFile } from "@/lib/media";

const IMAGE_MIME: Record<string, string> = {
  "image/jpeg": "image/jpeg",
  "image/png": "image/png",
  "image/webp": "image/webp",
};

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await requireAdmin();
    assertSameOrigin(req);
    await rateLimit("admin_product_image", clientIp(req), 40, 600);

    const product = await db.product.findUnique({
      where: { id },
      select: { id: true, slug: true, imageKey: true },
    });
    if (!product) throw new AppError(404, "not_found");

    const form = await req.formData().catch(() => null);
    const f = form?.get("file");
    if (!(f instanceof File) || f.size === 0) throw new AppError(400, "bad_file");
    if (f.size > UPLOAD_MAX_BYTES) throw new AppError(400, "file_too_large", { max: UPLOAD_MAX_BYTES });

    const buf = Buffer.from(await f.arrayBuffer());
    const mime = IMAGE_MIME[sniffImageMime(buf) ?? ""];
    if (!mime) throw new AppError(400, "bad_file_type"); // svg/html renamed to .png dies here

    const key = await storeMediaFile("products", `${product.id}-${Date.now().toString(36)}`, buf, mime);
    if (product.imageKey) await deleteMediaFile(product.imageKey); // replace, not accumulate

    const updated = await db.product.update({
      where: { id: product.id },
      data: { imageKey: key },
      select: { updatedAt: true },
    });
    return NextResponse.json({
      ok: true,
      image: `/api/products/${product.slug}/image?v=${updated.updatedAt.getTime()}`,
    });
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
    await rateLimit("admin_product_image", clientIp(req), 40, 600);
    const product = await db.product.findUnique({ where: { id }, select: { imageKey: true } });
    if (!product) throw new AppError(404, "not_found");
    if (product.imageKey) await deleteMediaFile(product.imageKey);
    await db.product.update({ where: { id }, data: { imageKey: "" } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (isRateLimited(e)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
