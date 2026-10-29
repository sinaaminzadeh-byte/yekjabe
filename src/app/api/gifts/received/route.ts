// ── GET /api/gifts/received — the session's authorized received gifts ──
// (mission §۱/§۲) Identity = HttpOnly session; the ONLY match is
// recipientPhone === session.phone AND a physically-deliverable status
// (shipped | delivered). Before auth this returns nothing — a verified phone
// reveals only ITS OWN gifts, never the whole table. No message text, no
// sender PII beyond the privacy-computed label (stripped server-side).
// S-05 (audit wave 38): cross-origin reads are rejected when an Origin/
// Referer is present (same-site check helper; absence tolerated for
// native/webview clients that send no Origin at all).
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse } from "@/lib/errors";
import { assertSameOrigin, getSession } from "@/lib/auth/session";
import { isRateLimited } from "@/lib/rate-limit";
import { isViewableStatus, retentionPublic, senderLabelFor } from "@/lib/orders/gift-view";

export async function GET(req: Request) {
  try {
    assertSameOrigin(req); // S-05 — mismatched Origin/Referer → 403
    const session = await getSession("customer");
    if (!session) {
      // uniform, PII-free: existence of gifts is not revealed pre-auth
      return NextResponse.json({ gifts: [] });
    }
    const rows = await db.order.findMany({
      where: { recipientPhone: session.phone, status: { in: ["shipped", "delivered"] } },
      orderBy: { createdAt: "desc" },
      take: 50,
      include: { items: { include: { variant: { include: { product: true } } }, take: 1 } },
    });
    const gifts = rows.map((o) => {
      const label = senderLabelFor(o);
      const retention = retentionPublic(o);
      return {
        code: o.code,
        no: o.code ? Number(o.code.slice(-4)) || 0 : 0,
        kind: o.items[0]?.variant.product.slug ?? "bear",
        to: o.recipientName || "دوست گلم",
        status: o.status,
        opened: o.giftOpened,
        occasion: o.occasion,
        hearts: o.charmHearts,
        paws: o.charmPaws,
        senderMode: label.mode,
        senderLabel: label.label, // name | phrase | «یک هدیه برای تو» — nothing else
        hasMessage: o.message.trim().length > 0 || o.mediaCount > 0,
        mediaCount: o.mediaCount,
        retention,
      };
    });
    return NextResponse.json({ gifts });
  } catch (e) {
    if (isRateLimited(e)) {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
