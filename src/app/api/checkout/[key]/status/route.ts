// ── GET /api/checkout/{key}/status — success-page ACK/poll (guide §4.7) ──
// Minimal payload: {code, status, total, paid}. The key is the secret.
// Lazy expiry: an awaiting order past its payment window (10min card-to-card /
// 24h gateway) is transitioned to expired here, releasing the reserved stock.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse, AppError } from "@/lib/errors";
import { clientIp, isRateLimited, rateLimit } from "@/lib/rate-limit";
import { expireOrderIfDue } from "@/lib/orders/expire";
import type { OrderStatus } from "@/lib/orders/status";

export async function GET(req: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  try {
    await rateLimit("order_status", clientIp(req), 60, 600);
    if (!/^[A-Za-z0-9_-]{8,64}$/.test(key)) throw new AppError(400, "bad_key");
    let order = await db.order.findUnique({ where: { idempotencyKey: key } });
    if (!order) throw new AppError(404, "not_found");
    if (order.status === "awaiting_payment" || order.status === "failed") {
      await expireOrderIfDue(order.id);
      order = (await db.order.findUnique({ where: { id: order.id } })) ?? order;
    }
    const status = order.status as OrderStatus;
    const paid = !["awaiting_payment", "payment_under_review", "failed", "cancelled", "expired"].includes(status);
    const payment = await db.payment.findFirst({
      where: { orderId: order.id },
      orderBy: { createdAt: "desc" },
      select: { method: true, status: true },
    });
    return NextResponse.json({
      code: order.code,
      status,
      total: order.totalToman,
      paid,
      payment,
      paymentMethod: order.paymentMethod,
      expiresAt: order.expiresAt.toISOString(),
    });
  } catch (e) {
    if (isRateLimited(e)) {
      return NextResponse.json({ error: "rate_limited", details: { retryAfter: e.retryAfter } }, { status: 429 });
    }
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
