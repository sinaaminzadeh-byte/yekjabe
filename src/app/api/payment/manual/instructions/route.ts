// ── GET /api/payment/manual/instructions — public card-to-card info ──
// Card number / sheba / holder name are display data (shown to every customer
// at checkout); this endpoint lets the success screen rebuild them after a
// reload, when the checkout ACK is no longer in memory.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse } from "@/lib/errors";
import { clientIp, isRateLimited, rateLimit } from "@/lib/rate-limit";

export async function GET(req: Request) {
  try {
    await rateLimit("manual_info", clientIp(req), 30, 600);
    const settings = await db.setting.findMany({
      where: { key: { in: ["manual_card_number", "manual_card_sheba", "manual_card_name"] } },
    });
    const map: Record<string, string> = {};
    for (const s of settings) map[s.key] = s.value;
    return NextResponse.json({
      payment: {
        instructions: {
          cardNumber: map.manual_card_number ?? "",
          sheba: map.manual_card_sheba ?? "",
          cardName: map.manual_card_name ?? "",
        },
      },
    });
  } catch (e) {
    if (isRateLimited(e)) {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
