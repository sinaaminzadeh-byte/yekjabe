// ── POST /api/gifts/{code}/open — receiver gift unlock (guide §4.11) ──
// scrypt + timingSafeEqual; 5 tries / 15 min per code+ip; ≥10 total → locked.
// Response carries ONLY the gift payload — never address/phone.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { assertSameOrigin } from "@/lib/auth/session";
import { clientIp, isRateLimited, rateLimit } from "@/lib/rate-limit";
import { verifyGiftPassword } from "@/lib/orders/crypto";
import { isMessageExpired, markFirstDisplay } from "@/lib/orders/retention";
import { isViewableStatus, senderLabelFor } from "@/lib/orders/gift-view";
import { enqueueSms } from "@/lib/sms";
import { getSmsSettings } from "@/lib/sms/settings";
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
        // شمارهٔ مالک از تنظیمات پنل (DB > env) — رند ۴۴
        const settingsOwner = (await getSmsSettings()).ownerMobile;
        await db.$transaction(async (tx) => {
          await tx.orderEvent.create({
            data: { orderId: order.id, type: "note", note: "gift_locked_too_many_attempts", actor: "system" },
          });
          const alertTo = order.userPhone || order.senderPhone;
          if (alertTo) {
            await enqueueSms(tx, { phone: alertTo, template: "admin_alert", params: { text: `رمز کارت سفارش ${order.code} زیاد اشتباه وارد شد؛ کارت قفل شد.` } });
          }
          const owner = settingsOwner || env.OWNER_MOBILE;
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

    // expired/purged → honest state, ZERO content (mission §۴)
    if (isMessageExpired(order)) {
      return NextResponse.json({
        state: order.messagePurgeStatus === "purged" ? "purged" : "expired",
        to: order.recipientName,
        kind: order.items[0]?.variant.product.slug ?? "bear",
      });
    }

    // اولین نمایش واقعی برای گیرنده فقط وقتی جعبه در راه/رسیده است ساعت را
    // شروع می‌کند — بازکردن آزمایشی فرستنده در paid/preparing شروعش نمی‌کند.
    let clock: { shownAt: Date; expiresAt: Date } | null = null;
    if (isViewableStatus(order.status)) {
      clock = await markFirstDisplay(order.id);
    }

    // privacy (mission §۳): the recipient surface gets ONLY the computed
    // label — phrase / name / «یک هدیه برای تو». senderPhone NEVER leaves;
    // in anon mode senderName never leaves either.
    const label = senderLabelFor(order);
    return NextResponse.json({
      state: "ok",
      to: order.recipientName,
      senderMode: label.mode,
      senderLabel: label.label,
      anonymous: order.anonymous,
      message: order.message,
      occasion: order.occasion,
      kind: order.items[0]?.variant.product.slug ?? "bear",
      hearts: order.charmHearts,
      paws: order.charmPaws,
      openedAt: order.giftOpenedAt ?? new Date(),
      retention: {
        shownAt: (clock?.shownAt ?? order.messageShownAt)?.toISOString() ?? null,
        expiresAt: (clock?.expiresAt ?? order.messageExpiresAt)?.toISOString() ?? null,
      },
    });
  } catch (e) {
    if (isRateLimited(e)) {
      return NextResponse.json({ error: "rate_limited", details: { retryAfter: e.retryAfter } }, { status: 429 });
    }
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
