// ── POST /api/checkout — the only order-creation path (guide §4.7) ──
// Idempotency-Key header + server-side pricing + atomic stock + zod input.
import { NextResponse } from "next/server";
import { assertSameOrigin, getSession } from "@/lib/auth/session";
import { clientIp, isRateLimited, rateLimit } from "@/lib/rate-limit";
import { toErrorResponse } from "@/lib/errors";
import { createOrder, validIdempotencyKey } from "@/lib/orders/checkout";

export async function POST(req: Request) {
  try {
    assertSameOrigin(req);
    const ip = clientIp(req);
    await rateLimit("checkout", ip, 5, 600); // ۵ / ۱۰ دقیقه (guide §4.4)
    const key = validIdempotencyKey(req.headers.get("idempotency-key"));
    const session = await getSession("customer");
    const body = await req.json().catch(() => null);
    const ack = await createOrder(body, { key, sessionPhone: session?.phone, ip });
    return NextResponse.json(ack, { status: 201 });
  } catch (e) {
    if (isRateLimited(e)) {
      return NextResponse.json({ error: "rate_limited", details: { retryAfter: e.retryAfter } }, { status: 429 });
    }
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
