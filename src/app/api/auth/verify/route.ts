// ── /api/auth/verify — check the OTP, register/update the user ──
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

function normPhone(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const p = v
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/\s/g, "");
  return /^09\d{9}$/.test(p) ? p : null;
}

function normCode(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const c = v.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).trim();
  return /^\d{4}$/.test(c) ? c : null;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const phone = normPhone(body.phone);
    const code = normCode(body.code);
    if (!phone || !code) {
      return NextResponse.json({ error: "invalid input" }, { status: 400 });
    }

    const rec = await db.authCode.findFirst({
      where: { phone, used: false, code },
      orderBy: { createdAt: "desc" },
    });
    if (!rec || rec.expiresAt.getTime() < Date.now()) {
      return NextResponse.json(
        { ok: false, error: "code wrong or expired" },
        { status: 401 },
      );
    }
    await db.authCode.update({ where: { id: rec.id }, data: { used: true } });

    const user = await db.appUser.upsert({
      where: { phone },
      create: { phone, lastLoginAt: new Date() },
      update: { lastLoginAt: new Date() },
    });

    return NextResponse.json({
      ok: true,
      user: { phone: user.phone, name: user.name ?? "" },
    });
  } catch (e) {
    console.error("POST /api/auth/verify failed:", e);
    return NextResponse.json({ error: "server unavailable" }, { status: 500 });
  }
}
