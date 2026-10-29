// ── POST /api/track — code + phone lookup (fallback per guide §B4) ──
// Phone is the proof-of-ownership; mismatch → generic 404 (no enumeration).
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { normPhone, validPhone } from "@/lib/auth/phone";
import { clientIp, isRateLimited, rateLimit } from "@/lib/rate-limit";
import { customerStep, STEP_LABELS, type OrderStatus } from "@/lib/orders/status";

export async function POST(req: Request) {
  try {
    await rateLimit("track", clientIp(req), 20, 600);
    const body = (await req.json().catch(() => ({}))) as { code?: string; phone?: string };
    const code = String(body.code ?? "").trim().toUpperCase();
    const phone = validPhone(body.phone);
    if (!/^PN-\d{6}-\d{4}$/.test(code) || !phone) throw new AppError(400, "bad_input");

    const order = await db.order.findUnique({
      where: { code },
      select: { code: true, status: true, createdAt: true, updatedAt: true, postTrackingCode: true, recipientPhone: true, senderPhone: true, userPhone: true, sessionPhone: true },
    });
    const owns = order && [order.recipientPhone, order.senderPhone, order.userPhone, order.sessionPhone].includes(phone);
    if (!order || !owns) throw new AppError(404, "not_found");

    const step = customerStep(order.status as OrderStatus);
    return NextResponse.json({
      code: order.code,
      status: order.status,
      step,
      stepLabel: STEP_LABELS[step],
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      // UX-12 (audit wave 38): the postal tracking code is customer-facing
      // once the box is on its way (shipped) or beyond — refund states keep
      // showing it too, the parcel still exists. Empty until the admin logs it.
      postTrackingCode:
        ["shipped", "delivered", "refund_requested", "refunded"].includes(order.status)
          ? order.postTrackingCode
          : "",
    });
  } catch (e) {
    if (isRateLimited(e)) {
      return NextResponse.json({ error: "rate_limited", details: { retryAfter: e.retryAfter } }, { status: 429 });
    }
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
