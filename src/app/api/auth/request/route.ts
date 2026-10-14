// ── /api/auth/request — issue a 6-digit OTP (hardened; guide §4.3) ──
// Rate-limited (60s cooldown / 3 per hour per phone / 10 per day per IP).
// The code is HMAC-hashed in the DB. devCode is returned ONLY in dev-echo
// mode — production responses never contain the code.
import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { toErrorResponse, AppError } from "@/lib/errors";
import { validPhone } from "@/lib/auth/phone";
import { issueOtp } from "@/lib/auth/otp";
import { clientIp, isRateLimited } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const phone = validPhone(body.phone);
    if (!phone) throw new AppError(400, "invalid_phone");

    const out = await issueOtp(phone, clientIp(req));
    // Uniform response shape regardless of account existence (no enumeration).
    return NextResponse.json({ ok: true, ...out }, { status: 201 });
  } catch (e) {
    if (isRateLimited(e)) {
      return NextResponse.json(
        { error: "rate_limited", details: { retryAfter: e.retryAfter } },
        { status: 429, headers: { "retry-after": String(e.retryAfter) } },
      );
    }
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
