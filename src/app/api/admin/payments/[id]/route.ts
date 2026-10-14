// ── PATCH /api/admin/payments/{id} — approve/reject receipts (guide §4.9) ──
// approve → payment verified + order paid (one flow)
// reject  → attempt++ ; 3rd reject → cancelled ; else back to awaiting_payment
// reopen  → owner only: cancelled → awaiting_payment (new payment allowed)
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { assertSameOrigin, requireAdmin } from "@/lib/auth/session";
import { transitionOrder } from "@/lib/orders/transition";
import { enqueueSms } from "@/lib/sms";
import { deleteReceiptFile } from "@/lib/payments/manual";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    assertSameOrigin(req);
    const admin = await requireAdmin();
    const body = (await req.json().catch(() => ({}))) as { action?: string; reason?: string };
    const action = String(body.action ?? "");
    const reason = String(body.reason ?? "").slice(0, 120);

    const payment = await db.payment.findUnique({ where: { id }, include: { order: true } });
    if (!payment) throw new AppError(404, "not_found");
    const order = payment.order;

    if (action === "approve") {
      if (payment.status !== "pending_review") throw new AppError(409, "bad_payment_status", { status: payment.status });
      const upd = await db.payment.updateMany({ where: { id, status: "pending_review" }, data: { status: "verified", refId: `manual-${admin.phone.slice(-4)}` } });
      if (upd.count !== 1) throw new AppError(409, "concurrent_update");
      await transitionOrder(order.id, "paid", { actor: admin.role === "owner" ? "owner" : "admin", actorId: admin.phone, meta: { paymentId: payment.id } });
      return NextResponse.json({ ok: true, paymentStatus: "verified", orderStatus: "paid" });
    }

    if (action === "reject") {
      if (payment.status !== "pending_review") throw new AppError(409, "bad_payment_status", { status: payment.status });
      const upd = await db.payment.updateMany({ where: { id, status: "pending_review" }, data: { status: "rejected" } });
      if (upd.count !== 1) throw new AppError(409, "concurrent_update");
      const attempts = order.paymentAttempts + 1;
      await db.order.update({ where: { id: order.id }, data: { paymentAttempts: attempts } });
      if (attempts >= 3) {
        // ۳ تلاش — سفارش لغو می‌شه (guide §4.9)
        await transitionOrder(order.id, "cancelled", { actor: admin.role === "owner" ? "owner" : "admin", actorId: admin.phone, note: reason || "3_rejected_receipts" });
      } else {
        await transitionOrder(order.id, "awaiting_payment", { actor: admin.role === "owner" ? "owner" : "admin", actorId: admin.phone, note: reason || "receipt_rejected" });
      }
      const phone = order.userPhone || order.senderPhone;
      if (phone) {
        await db.$transaction(async (tx) => {
          await enqueueSms(tx, { phone, template: "rejected", params: { code: order.code, reason } });
        }).catch(() => {});
      }
      return NextResponse.json({ ok: true, paymentStatus: "rejected", attempts, orderStatus: attempts >= 3 ? "cancelled" : "awaiting_payment" });
    }

    if (action === "reopen") {
      if (admin.role !== "owner") throw new AppError(403, "owner_only");
      if (order.status !== "cancelled") throw new AppError(409, "bad_order_status", { status: order.status });
      // owner mercy path: cancelled is terminal → direct guarded write + event
      await db.order.update({ where: { id: order.id }, data: { status: "awaiting_payment", paymentAttempts: 0 } });
      await db.orderEvent.create({
        data: { orderId: order.id, type: "status_changed", fromStatus: "cancelled", toStatus: "awaiting_payment", actor: "owner", actorId: admin.phone, note: "owner_reopen" },
      });
      return NextResponse.json({ ok: true, orderStatus: "awaiting_payment" });
    }

    if (action === "discard") {
      // bad file (wrong mime after re-check etc.) — drop the payment + file
      await db.payment.delete({ where: { id } }).catch(() => {});
      if (payment.receiptKey) void deleteReceiptFile(payment.receiptKey);
      return NextResponse.json({ ok: true });
    }

    throw new AppError(400, "bad_action");
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
