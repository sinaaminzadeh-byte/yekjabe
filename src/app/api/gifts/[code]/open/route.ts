// ── POST /api/gifts/{code}/open — receiver gift unlock (guide §4.11) ──
// scrypt + timingSafeEqual; 5 tries / 15 min per code+ip; ≥10 total → locked.
// Response carries ONLY the gift payload — never address/phone.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { assertSameOrigin } from "@/lib/auth/session";
import { clientIp, isRateLimited, rateLimit } from "@/lib/rate-limit";
import { verifyGiftPassword } from "@/lib/orders/crypto";
import { enqueueSms } from "@/lib/sms";
import { env } from "@/lib/env";

const MAX_ATTEMPTS = 10;

export async function POST(req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code: rawCode } = await params;
  try {
    assertSameOrigin(req);
    const code = decodeURIComponent(rawCode).trim().toUpperCase();
    if (!/^PN-\d{6}-\d{4}$/.test(code)) throw new AppError(400, "bad_input");
    await rateLimit("gift_open", `${code}:${clientIp(req)}`, 5, 900); // ۵ / ۱۵د

    const order = await db.order.findUnique({
      where: { code },
      include: { items: { include: { variant: { include: { product: true } } }, take: 1 } },
    });
    if (!order) throw new AppError(404, "not_found");
    if (order.giftLockedAt) throw new AppError(423, "gift_locked");

    const body = (await req.json().catch(() => ({}))) as { password?: string };
    const password = String(body.password ?? "");
    const ok = password.length > 0 && verifyGiftPassword(password, order.cardPasswordHash);
    if (!ok) {
      const attempts = order.giftOpenAttempts + 1;
      const locked = attempts >= MAX_ATTEMPTS;
      await db.order.update({
        where: { id: order.id },
        data: { giftOpenAttempts: attempts, ...(locked ? { giftLockedAt: new Date() } : {}) },
      });
      if (locked) {
        await db.$transaction(async (tx) => {
          await tx.orderEvent.create({
            data: { orderId: order.id, type: "note", note: "gift_locked_too_many_attempts", actor: "system" },
          });
          const alertTo = order.userPhone || order.senderPhone;
          if (alertTo) {
            await enqueueSms(tx, { phone: alertTo, template: "admin_alert", params: { text: `رمز کارت سفارش ${order.code} زیاد اشتباه وارد شد؛ کارت قفل شد.` } });
          }
          const owner = env.OWNER_MOBILE;
          if (owner) {
            await enqueueSms(tx, { phone: owner, template: "admin_alert", params: { text: `سفارش ${order.code} قفل شد (تلاش ناموفق رمز).` } });
          }
        }).catch(() => {});
      }
      throw new AppError(locked ? 423 : 400, locked ? "gift_locked" : "wrong_password");
    }

    if (!order.giftOpened) {
      await db.order.update({
        where: { id: order.id },
        data: { giftOpened: true, giftOpenedAt: new Date() },
      });
      await db.orderEvent
        .create({ data: { orderId: order.id, type: "gift_opened", toStatus: order.status, actor: "customer" } })
        .catch(() => {});
    }

    return NextResponse.json({
      to: order.recipientName,
      senderName: order.anonymous ? "" : order.senderName,
      anonymous: order.anonymous,
      message: order.message,
      occasion: order.occasion,
      kind: order.items[0]?.variant.product.slug ?? "bear",
      hearts: order.charmHearts,
      paws: order.charmPaws,
      openedAt: order.giftOpenedAt ?? new Date(),
    });
  } catch (e) {
    if (isRateLimited(e)) {
      return NextResponse.json({ error: "rate_limited", details: { retryAfter: e.retryAfter } }, { status: 429 });
    }
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
