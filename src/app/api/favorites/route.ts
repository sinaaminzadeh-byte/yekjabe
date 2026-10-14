// ── /api/favorites — per-account favorite plush kinds (SQLite via Prisma) ──
// GET  ?phone=09…  → { kinds: ["panda", …] }
// PUT  { phone, kinds } → replace-all for that account (idempotent sync)
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

function normPhone(v: unknown): string {
  return typeof v === "string" ? v.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/\D/g, "").slice(0, 20) : "";
}

const KIND_RE = /^[a-z]{2,20}$/;

export async function GET(req: Request) {
  const phone = normPhone(new URL(req.url).searchParams.get("phone"));
  if (!phone) {
    return NextResponse.json({ error: "phone is required" }, { status: 400 });
  }
  try {
    const rows = await db.favorite.findMany({
      where: { userPhone: phone },
      orderBy: { createdAt: "asc" },
      take: 50,
    });
    return NextResponse.json({ kinds: rows.map((r) => r.kind) });
  } catch (e) {
    console.error("GET /api/favorites failed:", e);
    return NextResponse.json({ error: "db unavailable" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = (await req.json()) as { phone?: unknown; kinds?: unknown };
    const phone = normPhone(body.phone);
    if (!phone) {
      return NextResponse.json({ error: "phone is required" }, { status: 400 });
    }
    const kinds = Array.isArray(body.kinds)
      ? [...new Set(body.kinds.filter((k): k is string => typeof k === "string" && KIND_RE.test(k)))].slice(0, 30)
      : [];
    // replace-all keeps client/server trivially consistent (small lists)
    await db.$transaction([
      db.favorite.deleteMany({ where: { userPhone: phone } }),
      db.favorite.createMany({ data: kinds.map((kind) => ({ userPhone: phone, kind })) }),
    ]);
    return NextResponse.json({ ok: true, kinds }, { status: 200 });
  } catch (e) {
    console.error("PUT /api/favorites failed:", e);
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
}
