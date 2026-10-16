// ── POST /api/gifts/{code}/view — verified recipient reads the message ──
// (mission §۱/§۴) THE display moment: this endpoint is the only place the
// message payload leaves the server for a logged-in recipient, so it is also
// the ONLY place the retention clock starts (atomic first-display).
//  - auth: customer session; recipientPhone MUST equal session.phone
//  - status gate: shipped | delivered only
//  - expiry gate: enforced HERE on every read (purge timing is irrelevant)
//  - tampered/guessed codes → generic 404 (no enumeration)
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { assertSameOrigin, getSession } from "@/lib/auth/session";
import { clientIp, isRateLimited, rateLimit } from "@/lib/rate-limit";
import { isMessageExpired, markFirstDisplay } from "@/lib/orders/retention";
import { isViewableStatus, retentionPublic, senderLabelFor } from "@/lib/orders/gift-view";
import { parseMessageMediaKeys } from "@/lib/orders/message-media";

export async function POST(req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code: rawCode } = await params;
  try {
    assertSameOrigin(req);
    await rateLimit("gift_view", `${clientIp(req)}`, 60, 600);
    const code = decodeURIComponent(rawCode).trim().toUpperCase();
    if (!/^PN-\d{6}-\d{4}$/.test(code)) throw new AppError(404, "not_found");

    const session = await getSession("customer");
    if (!session) throw new AppError(401, "unauthenticated");

    const order = await db.order.findUnique({
      where: { code },
      include: { items: { include: { variant: { include: { product: true } } }, take: 1 } },
    });
    // NOT found OR not yours → the same generic 404 (no existence leak)
    if (!order || order.recipientPhone !== session.phone) throw new AppError(404, "not_found");
    if (!isViewableStatus(order.status)) throw new AppError(404, "not_found");

    // expired or already purged → honest state, ZERO content, clock untouched
    if (isMessageExpired(order)) {
      return NextResponse.json({
        state: order.messagePurgeStatus === "purged" ? "purged" : "expired",
        retention: retentionPublic(order),
      });
    }

    // ① اولین نمایش موفق — فقط اینجا ساعت نگهداری شروع می‌شود (اتمیک)
    const clock = await markFirstDisplay(order.id);

    const media = parseMessageMediaKeys(order.mediaKeys);
    const label = senderLabelFor(order);
    return NextResponse.json({
      state: "ok",
      to: order.recipientName || "دوست گلم",
      occasion: order.occasion,
      kind: order.items[0]?.variant.product.slug ?? "bear",
      hearts: order.charmHearts,
      paws: order.charmPaws,
      senderMode: label.mode,
      senderLabel: label.label, // anon → «یک هدیه برای تو»; senderPhone NEVER leaves
      message: order.message,
      media: media.map((key) => ({ key, url: `/api/gifts/media?key=${encodeURIComponent(key)}` })),
      opened: order.giftOpened,
      retention: retentionPublic({
        ...order,
        messageShownAt: clock?.shownAt ?? order.messageShownAt,
        messageExpiresAt: clock?.expiresAt ?? order.messageExpiresAt,
      }),
    });
  } catch (e) {
    if (isRateLimited(e)) {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
