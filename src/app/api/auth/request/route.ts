// ── /api/auth/request — issue a 4-digit OTP (hardened; guide §4.3) ──
// Rate-limited (60s cooldown / 3 per hour per phone / 10 per day per IP).
// The code is HMAC-hashed in the DB. devCode is returned ONLY in dev-echo
// mode — production responses never contain the code.
// purpose: "login" (default) | "checkout_orderer" | "gift_recv"
// gift_recv (owner round 29): BEFORE spending an SMS the server checks that
// this phone is actually the recipient of a package (paid|packing|shipped|
// delivered). No package → { ok, noGifts: true } and NO code is issued —
// exactly the owner law: «سیستم چک می‌کنه این شماره اصلاً بسته‌ای براش ثبت
// شده یا نه؛ اگر ثبت شده بود کد ۴ رقمی ارسال می‌شه».
import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { toErrorResponse, AppError } from "@/lib/errors";
import { validPhone } from "@/lib/auth/phone";
import { issueOtp, type OtpPurpose } from "@/lib/auth/otp";
import { recipientPackageCounts } from "@/lib/orders/gift-view";
import { clientIp, isRateLimited } from "@/lib/rate-limit";

const PURPOSES: OtpPurpose[] = ["login", "checkout_orderer", "gift_recv"];

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const phone = validPhone(body.phone);
    if (!phone) throw new AppError(400, "invalid_phone");
    const purpose = PURPOSES.includes(body.purpose as OtpPurpose) ? (body.purpose as OtpPurpose) : "login";

    // gift display page: package existence probe first (no SMS for strangers)
    if (purpose === "gift_recv") {
      const { viewable, pending } = await recipientPackageCounts(phone);
      if (viewable === 0 && pending === 0) {
        return NextResponse.json({ ok: true, noGifts: true });
      }
    }

    const out = await issueOtp(phone, clientIp(req), purpose);
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
