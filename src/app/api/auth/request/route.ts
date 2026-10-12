// ── /api/auth/request — issue a 4-digit OTP for a phone number ──
// Demo mode: no SMS gateway, the code is returned in the response so the UI
// can show it as a hint (devCode). Old unused codes for the phone are voided.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const OTP_TTL_MS = 5 * 60 * 1000;

/** Normalizes Persian/Latin digits and validates Iranian mobile format. */
function normPhone(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const p = v
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/\s/g, "");
  return /^09\d{9}$/.test(p) ? p : null;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const phone = normPhone(body.phone);
    if (!phone) {
      return NextResponse.json({ error: "invalid phone" }, { status: 400 });
    }

    // void previous codes, then issue a fresh one
    await db.authCode.updateMany({
      where: { phone, used: false },
      data: { used: true },
    });
    const code = String(Math.floor(1000 + Math.random() * 9000)); // 1000–9999
    await db.authCode.create({
      data: { phone, code, expiresAt: new Date(Date.now() + OTP_TTL_MS) },
    });

    return NextResponse.json({ ok: true, devCode: code }, { status: 201 });
  } catch (e) {
    console.error("POST /api/auth/request failed:", e);
    return NextResponse.json({ error: "server unavailable" }, { status: 500 });
  }
}
