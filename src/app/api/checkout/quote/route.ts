// ── POST /api/checkout/quote — pre-checkout price preview (server-only math) ──
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { clientIp, isRateLimited, rateLimit } from "@/lib/rate-limit";
import { toErrorResponse } from "@/lib/errors";
import { parseCheckout } from "@/lib/orders/checkout";
import { computeQuote } from "@/lib/orders/pricing";

export async function POST(req: Request) {
  try {
    const ip = clientIp(req);
    await rateLimit("quote", ip, 60, 600);
    const body = await req.json().catch(() => null);
    const input = parseCheckout(body); // same validation as the real checkout
    const quote = await computeQuote(db, {
      items: input.items,
      charmHearts: input.addons.charmHearts,
      charmPaws: input.addons.charmPaws,
      province: input.recipient.province,
      retention: input.gift.retention,
    });
    return NextResponse.json({
      subtotal: quote.subtotal,
      charms: quote.charms,
      retention: quote.retention,
      retentionPlan: quote.retentionPlan,
      shipping: quote.shipping,
      discount: quote.discount,
      total: quote.total,
      lines: quote.lines,
    });
  } catch (e) {
    if (isRateLimited(e)) {
      return NextResponse.json({ error: "rate_limited", details: { retryAfter: e.retryAfter } }, { status: 429 });
    }
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
