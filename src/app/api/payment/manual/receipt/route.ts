// ── POST /api/payment/manual/receipt — card-to-card receipt upload (guide §4.9) ──
// multipart: file ≤5MB (jpeg/png/webp) + code + key. Magic-byte sniffed server-
// side, sha256-deduped, max 3 attempts → payment_under_review.
import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { assertSameOrigin } from "@/lib/auth/session";
import { clientIp, isRateLimited, rateLimit } from "@/lib/rate-limit";
import { transitionOrder } from "@/lib/orders/transition";
import { RECEIPT_MAX_BYTES, sniffImageMime, storeReceiptFile, deleteReceiptFile } from "@/lib/payments/manual";

export async function POST(req: Request) {
  let storedKey = "";
  try {
    assertSameOrigin(req);
    const form = await req.formData();
    const code = String(form.get("code") ?? "").trim().toUpperCase();
    const key = String(form.get("key") ?? "").trim();
    if (!/^PN-\d{6}-\d{4}$/.test(code) || key.length < 8) throw new AppError(400, "bad_input");
    await rateLimit("receipt", code, 6, 3600); // ۶ / ساعت per order

    const order = await db.order.findFirst({ where: { code, idempotencyKey: key } });
    if (!order) throw new AppError(404, "not_found");
    if (order.status !== "awaiting_payment") throw new AppError(409, "bad_order_status", { status: order.status });
    if (order.paymentAttempts >= 3) throw new AppError(409, "too_many_attempts");

    const file = form.get("file");
    if (!(file instanceof File)) throw new AppError(400, "file_required");
    if (file.size > RECEIPT_MAX_BYTES) throw new AppError(400, "file_too_large", { max: RECEIPT_MAX_BYTES });
    const buf = Buffer.from(await file.arrayBuffer());
    const mime = sniffImageMime(buf);
    if (!mime) throw new AppError(400, "bad_file_type", { allowed: ["jpeg", "png", "webp"] });

    // sha256 dedupe — same receipt reused on another order/payment is rejected
    const hash = createHash("sha256").update(buf).digest("hex");
    const dup = await db.payment.findFirst({
      where: { receiptHash: hash, status: { in: ["pending_review", "verified"] } },
      select: { id: true },
    });
    if (dup) throw new AppError(409, "duplicate_receipt");

    // keep the failure window tiny: store → payment row → transition
    storedKey = await storeReceiptFile(order.code, buf, mime);
    const payment = await db.payment.create({
      data: {
        orderId: order.id,
        method: "manual_transfer",
        provider: "card_to_card",
        amountToman: order.totalToman,
        status: "pending_review",
        receiptKey: storedKey,
        receiptHash: hash,
        receiptMime: mime,
        receiptSize: buf.length,
        attemptNo: order.paymentAttempts + 1,
      },
    });
    await transitionOrder(order.id, "payment_under_review", { actor: "customer", meta: { paymentId: payment.id } });
    return NextResponse.json({ ok: true, paymentId: payment.id, status: "payment_under_review", sla: "12h" }, { status: 201 });
  } catch (e) {
    if (storedKey) void deleteReceiptFile(storedKey); // rollback the orphan file
    if (isRateLimited(e)) {
      return NextResponse.json({ error: "rate_limited", details: { retryAfter: e.retryAfter } }, { status: 429 });
    }
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
