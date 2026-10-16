// ── POST /api/gifts/{code}/renew/receipt — renewal receipt upload (mission §۴) ──
// Same discipline as the order receipt queue: magic-byte sniff, sha256 dedupe
// ACROSS payments AND renewals, one live renewal per order. On success the
// renewal moves to payment_under_review; only admin approval extends the clock.
import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { assertSameOrigin, getSession } from "@/lib/auth/session";
import { clientIp, isRateLimited, rateLimit } from "@/lib/rate-limit";
import { RECEIPT_MAX_BYTES, deleteReceiptFile, sniffImageMime, storeReceiptFile } from "@/lib/payments/manual";

export async function POST(req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code: rawCode } = await params;
  let storedKey = "";
  try {
    assertSameOrigin(req);
    const code = decodeURIComponent(rawCode).trim().toUpperCase();
    if (!/^PN-\d{6}-\d{4}$/.test(code)) throw new AppError(404, "not_found");
    await rateLimit("renew_receipt", clientIp(req), 6, 3600);

    const session = await getSession("customer");
    if (!session) throw new AppError(401, "unauthenticated");

    const order = await db.order.findUnique({
      where: { code },
      select: { id: true, recipientPhone: true, userPhone: true, senderPhone: true },
    });
    if (!order) throw new AppError(404, "not_found");
    const mine = order.recipientPhone === session.phone || order.userPhone === session.phone || order.senderPhone === session.phone;
    if (!mine) throw new AppError(404, "not_found");

    const renewal = await db.retentionRenewal.findFirst({
      where: { orderId: order.id, status: "awaiting_payment" },
      orderBy: { createdAt: "desc" },
    });
    if (!renewal) throw new AppError(409, "no_renewal_awaiting_payment");

    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) throw new AppError(400, "file_required");
    if (file.size > RECEIPT_MAX_BYTES) throw new AppError(400, "file_too_large", { max: RECEIPT_MAX_BYTES });
    const buf = Buffer.from(await file.arrayBuffer());
    const mime = sniffImageMime(buf);
    if (!mime) throw new AppError(400, "bad_file_type", { allowed: ["jpeg", "png", "webp"] });

    // sha256 dedupe — one real bank transfer, one use (payments AND renewals)
    const hash = createHash("sha256").update(buf).digest("hex");
    const [dupPayment, dupRenewal] = await Promise.all([
      db.payment.findFirst({ where: { receiptHash: hash, status: { in: ["pending_review", "verified"] } }, select: { id: true } }),
      db.retentionRenewal.findFirst({ where: { receiptHash: hash, status: { in: ["payment_under_review", "paid"] }, id: { not: renewal.id } }, select: { id: true } }),
    ]);
    if (dupPayment || dupRenewal) throw new AppError(409, "duplicate_receipt");

    storedKey = await storeReceiptFile(code, buf, mime);
    await db.retentionRenewal.update({
      where: { id: renewal.id },
      data: { status: "payment_under_review", receiptKey: storedKey, receiptHash: hash, receiptMime: mime, receiptSize: buf.length },
    });
    await db.orderEvent
      .create({
        data: { orderId: order.id, type: "note", note: "retention_renewal_receipt", actor: "customer", meta: JSON.stringify({ renewalCode: renewal.code }) },
      })
      .catch(() => {});

    return NextResponse.json({ ok: true, renewalCode: renewal.code, status: "payment_under_review", sla: "12h" }, { status: 201 });
  } catch (e) {
    if (storedKey) void deleteReceiptFile(storedKey); // rollback the orphan file
    if (isRateLimited(e)) {
      return NextResponse.json({ error: "rate_limited", details: { retryAfter: e.retryAfter } }, { status: 429 });
    }
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
