// ── /api/auth/profile — set/update the display name of a logged-in user ──
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

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
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 60) : "";
    if (!phone || !name) {
      return NextResponse.json({ error: "invalid input" }, { status: 400 });
    }
    const user = await db.appUser.upsert({
      where: { phone },
      create: { phone, name },
      update: { name },
    });
    return NextResponse.json({
      ok: true,
      user: { phone: user.phone, name: user.name ?? "" },
    });
  } catch (e) {
    console.error("POST /api/auth/profile failed:", e);
    return NextResponse.json({ error: "server unavailable" }, { status: 500 });
  }
}
