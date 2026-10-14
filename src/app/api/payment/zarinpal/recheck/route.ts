// ── POST /api/payment/zarinpal/recheck — «بررسی مجدد پرداخت» (guide §4.9.6) ──
// Body: {code, key}. Guest-safe: requires BOTH the order code and the
// idempotency key (the success page holds both). Retries verify, or re-arms a
// failed payment so the customer can try the gateway again.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { assertSameOrigin } from "@/lib/auth/session";
import { clientIp, isRateLimited, rateLimit } from "@/lib/rate-limit";
import { transitionOrder } from "@/lib/orders/transition";
import { createPaymentFor, zarinpalVerify } from "@/lib/orders/checkout";
import type { OrderStatus } from "@/lib/orders/status";

export async function POST(req: Request) {
  try {
    assertSameOrigin(req);
    await rateLimit("recheck", clientIp(req), 10, 600);
    const body = (await req.json().catch(() => ({}))) as { code?: string; key?: string };
    const code = String(body.code ?? "").trim().toUpperCase();
    const key = String(body.key ?? "").trim();
    if (!/^PN-\d{6}-\d{4}$/.test(code) || key.length < 8) throw new AppError(400, "bad_input");

    const order = await db.order.findFirst({
      where: { code, idempotencyKey: key },
      include: { payments: { orderBy: { createdAt: "desc" } } },
    });
    if (!order) throw new AppError(404, "not_found");

    const status = order.status as OrderStatus;
    const initiated = order.payments.find((p) => p.status === "initiated");
    const paidStatuses = ["paid", "preparing", "shipped", "delivered", "refund_requested", "refunded"];

    if (paidStatuses.includes(status)) {
      return NextResponse.json({ status, paid: true });
    }

    // ۱) a pending zarinpal payment → re-verify (timeout path)
    if (initiated && initiated.method === "zarinpal" && initiated.authority && status === "awaiting_payment") {
      const v = await zarinpalVerify(initiated.authority, initiated.amountToman);
      if (v.ok) {
        const upd = await db.payment.updateMany({
          where: { id: initiated.id, status: "initiated" },
          data: { status: "verified", refId: v.refId ?? "" },
        });
        if (upd.count === 1) await transitionOrder(order.id, "paid", { actor: "psp", actorId: "zarinpal", meta: { refId: v.refId ?? "" } });
        return NextResponse.json({ status: "paid", paid: true });
      }
      return NextResponse.json({ status, paid: false, retryUrl: `/api/payment/zarinpal/callback?Authority=${initiated.authority}&Status=OK` });
    }

    // ۲) failed/cancelled-gateway → re-arm a fresh payment
    if (status === "failed" || status === "awaiting_payment") {
      let current = status;
      if (current === "failed") {
        await transitionOrder(order.id, "awaiting_payment", { actor: "customer", note: "retry_payment" });
        current = "awaiting_payment";
      }
      const fresh = { ...order, status: current };
      const payment = await createPaymentFor(fresh);
      return NextResponse.json({ status: current, paid: false, payment });
    }

    return NextResponse.json({ status, paid: false });
  } catch (e) {
    if (isRateLimited(e)) {
      return NextResponse.json({ error: "rate_limited", details: { retryAfter: e.retryAfter } }, { status: 429 });
    }
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
