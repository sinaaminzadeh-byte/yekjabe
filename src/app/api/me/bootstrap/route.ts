// ── POST /api/me/bootstrap — ONE session-scoped fetch (Phase B update) ──
// Returns user + favorites + legacy demo orders + NEW commerce orders (mapped
// for the client store, PII-guarded). Guests get nothing (acceptance A).
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse } from "@/lib/errors";
import { getSession } from "@/lib/auth/session";
import { legacyStep, type OrderStatus } from "@/lib/orders/status";
import { codeSuffixNo } from "@/lib/orders/code";

export async function GET() {
  try {
    const session = await getSession("customer");
    if (!session) {
      // guests get nothing — no PII without a session (acceptance A)
      return NextResponse.json({ user: null, admin: false, orders: [], favorites: [] });
    }
    const [user, legacyOrders, favorites, adminRow, newOrders] = await Promise.all([
      db.appUser.findUnique({ where: { phone: session.phone } }),
      db.giftOrder.findMany({
        where: { OR: [{ userPhone: session.phone }, { phone: session.phone }] },
        orderBy: { no: "desc" },
        take: 50,
      }),
      db.favorite.findMany({
        where: { userPhone: session.phone },
        orderBy: { createdAt: "asc" },
        take: 50,
      }),
      db.adminUser.findUnique({ where: { phone: session.phone } }),
      db.order.findMany({
        where: { OR: [{ sessionPhone: session.phone }, { userPhone: session.phone }, { senderPhone: session.phone }, { recipientPhone: session.phone }] },
        orderBy: { createdAt: "desc" },
        take: 50,
        include: { items: { include: { variant: { include: { product: true } } }, take: 1 } },
      }),
    ]);

    const mappedNew = newOrders.map((o) => {
      const isRecv = o.recipientPhone === session.phone && o.userPhone !== session.phone;
      return {
        id: `o-${o.id}`,
        code: o.code,
        no: codeSuffixNo(o.code),
        kind: o.items[0]?.variant.product.slug ?? "bear",
        to: o.recipientName || "دوست گلم",
        city: o.city,
        // PII guard: the address belongs to the SENDER — receivers never get it
        address: isRecv ? "" : o.address,
        phone: isRecv ? "" : o.recipientPhone,
        message: o.message,
        occasion: o.occasion,
        password: "", // the hash never leaves the server
        anonymous: o.anonymous,
        senderName: o.senderName,
        hearts: o.charmHearts,
        paws: o.charmPaws,
        total: o.totalToman,
        date: new Intl.DateTimeFormat("fa-IR", { day: "numeric", month: "long" }).format(o.createdAt),
        status: legacyStep(o.status as OrderStatus), // 4-step for legacy chips
        status2: o.status, // raw 11-state for new components
        // payment reservation (dashboard «تکمیل پرداخت» panel): sent/owned
        // orders carry the hold deadline + their own idempotency key so the
        // manual card-to-card panel works from any device of the same account
        paymentHoldUntil:
          o.status === "awaiting_payment" || o.status === "payment_under_review"
            ? o.expiresAt.toISOString()
            : null,
        paymentKey: isRecv ? "" : o.idempotencyKey,
        paymentMethod: o.paymentMethod,
        opened: o.giftOpened,
        dir: isRecv ? ("recv" as const) : ("sent" as const),
        userPhone: o.userPhone,
        v2: true,
      };
    });

    return NextResponse.json({
      user: { phone: session.phone, name: user?.name ?? "" },
      admin: Boolean(adminRow?.isActive),
      orders: [...mappedNew, ...legacyOrders],
      favorites: favorites.map((f) => f.kind),
    });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
