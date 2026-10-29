// ── GET /api/admin/orders/{id} — full order detail for the admin modal (round 33) ──
// Everything the orders list card doesn't show: full address/postal, all
// payment attempts, the OrderEvent timeline, refund payload, media metadata.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { requireAdmin } from "@/lib/auth/session";

// Admin-side media-key validator (UX-01). The customer upload path keeps its
// strict PN-\d{6}-\d{4} regex in lib/orders/message-media.ts — untouched. This
// list-membership check is only for READING stored attachments in the panel
// (no traversal: no "..", must live under the order's own messages/ folder).
const MEDIA_EXT = new Set(["jpg", "png", "webp", "mp4", "webm", "mp3", "wav", "ogg", "m4a"]);
function parseAdminMediaKeys(orderCode: string, json: string): string[] {
  try {
    const arr: unknown = JSON.parse(json);
    if (!Array.isArray(arr)) return [];
    return arr.filter(
      (k): k is string =>
        typeof k === "string" &&
        !k.includes("..") &&
        k.startsWith(`messages/${orderCode}/`) &&
        MEDIA_EXT.has(k.split(".").pop() ?? ""),
    );
  } catch {
    return [];
  }
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await requireAdmin();
    const o = await db.order.findUnique({
      where: { id },
      include: {
        items: { select: { titleSnapshot: true, unitPriceToman: true, qty: true } },
        payments: { orderBy: { createdAt: "asc" }, select: { id: true, method: true, status: true, attemptNo: true, amountToman: true, refId: true, receiptKey: true, createdAt: true } },
        events: { orderBy: { createdAt: "asc" }, take: 60 },
        renewals: { orderBy: { createdAt: "desc" }, select: { code: true, plan: true, priceToman: true, status: true, createdAt: true } },
      },
    });
    if (!o) throw new AppError(404, "not_found");

    return NextResponse.json({
      order: {
        id: o.id,
        code: o.code,
        status: o.status,
        paymentMethod: o.paymentMethod,
        senderName: o.senderName,
        senderDisplay: o.senderDisplay,
        senderPhrase: o.senderPhrase,
        recipientName: o.recipientName,
        recipientPhone: o.recipientPhone,
        ordererName: [o.ordererFirstName, o.ordererLastName].filter(Boolean).join(" "),
        ordererPhone: o.ordererPhone,
        userPhone: o.userPhone,
        province: o.province,
        city: o.city,
        address: o.address,
        postalCode: o.postalCode,
        message: o.message,
        occasion: o.occasion,
        charmHearts: o.charmHearts,
        charmPaws: o.charmPaws,
        mediaCount: o.mediaCount,
        // UX-01: the admin must SEE the attachments, not just their count —
        // the modal gallery streams each key through /api/gifts/media (admin branch)
        mediaKeys: parseAdminMediaKeys(o.code, o.mediaKeys),
        retentionPlan: o.retentionPlan,
        messageShownAt: o.messageShownAt,
        messageExpiresAt: o.messageExpiresAt,
        messagePurgeStatus: o.messagePurgeStatus,
        subtotalToman: o.subtotalToman,
        shippingToman: o.shippingToman,
        discountToman: o.discountToman,
        totalToman: o.totalToman,
        giftOpened: o.giftOpened,
        giftOpenedAt: o.giftOpenedAt,
        refundReason: o.refundReason,
        refundRequestedAt: o.refundRequestedAt,
        paymentAttempts: o.paymentAttempts,
        smsAbandonedAt: o.smsAbandonedAt,
        expiresAt: o.expiresAt,
        createdAt: o.createdAt,
        items: o.items,
        payments: o.payments.map((p) => ({
          id: p.id,
          method: p.method,
          status: p.status,
          attemptNo: p.attemptNo,
          amountToman: p.amountToman,
          refId: p.refId,
          hasReceipt: Boolean(p.receiptKey),
          createdAt: p.createdAt,
        })),
        renewals: o.renewals,
        events: o.events.map((e) => ({
          id: e.id,
          type: e.type,
          fromStatus: e.fromStatus,
          toStatus: e.toStatus,
          actor: e.actor,
          note: e.note,
          meta: e.meta,
          createdAt: e.createdAt,
        })),
      },
    });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
