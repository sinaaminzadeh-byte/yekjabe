// ── POST /api/me/bootstrap — ONE session-scoped fetch (Phase B update) ──
// Returns user + favorites + the account's NEW commerce orders (mapped for the
// client store, PII-guarded). A-04: the Order table is the ONE server-side
// order truth — the dropped legacy table no longer exists, so this payload
// carries ONLY mapped v2 rows (field names unchanged — the client merge in
// pishnam-sync.ts depends on them). Guests get nothing (acceptance A).
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse } from "@/lib/errors";
import { getSession } from "@/lib/auth/session";
import { legacyStep, type OrderStatus } from "@/lib/orders/status";
import { codeSuffixNo } from "@/lib/orders/code";
import { isViewableStatus, senderLabelFor } from "@/lib/orders/gift-view";

export async function GET() {
  try {
    const session = await getSession("customer");
    if (!session) {
      // guests get nothing — no PII without a session (acceptance A)
      return NextResponse.json({ user: null, admin: false, orders: [], favorites: [] });
    }
    const [user, favorites, adminRow, newOrders] = await Promise.all([
      db.appUser.findUnique({ where: { phone: session.phone } }),
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
      // privacy (mission §۳): the received-gifts surface gets the COMPUTED
      // label only — in anon mode the real senderName never leaves the server;
      // the message TEXT is not part of the panel either (only the dedicated
      // display endpoint may serve it — that's where the retention clock starts).
      const recvLabel = isRecv ? senderLabelFor(o) : null;
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
        // message text only for the sender's own board (they wrote it)
        message: isRecv ? "" : o.message,
        occasion: o.occasion,
        password: "", // the hash never leaves the server
        anonymous: o.anonymous,
        // anon/phrase-safe: recv gets the computed label, sent gets the real one
        senderName: isRecv ? (recvLabel?.label ?? "") : o.senderName,
        senderMode: recvLabel?.mode ?? o.senderDisplay,
        hearts: o.charmHearts,
        paws: o.charmPaws,
        total: o.totalToman,
        date: new Intl.DateTimeFormat("fa-IR", { day: "numeric", month: "long" }).format(o.createdAt),
        status: legacyStep(o.status as OrderStatus), // 4-step display field for the board chips/timeline
        status2: o.status, // raw 11-state for new components
        // retention snapshot for the panel chips (no content here — never starts the clock)
        retentionPlan: o.retentionPlan,
        messageState:
          o.messagePurgeStatus === "purged"
            ? "purged"
            : o.messageShownAt
              ? o.messageExpiresAt && o.messageExpiresAt.getTime() <= Date.now()
                ? "expired"
                : "active"
              : "unopened",
        messageExpiresAt: o.messageExpiresAt ? o.messageExpiresAt.toISOString() : null,
        mediaCount: o.mediaCount,
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
        viewable: isViewableStatus(o.status),
        userPhone: o.userPhone,
        v2: true,
      };
    });

    return NextResponse.json({
      user: { phone: session.phone, name: user?.name ?? "" },
      admin: Boolean(adminRow?.isActive),
      orders: mappedNew, // A-04: v2 rows ONLY — no legacy merge anymore
      favorites: favorites.map((f) => f.kind),
    });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
