// ── /api/orders — list + upsert gift orders (SQLite via Prisma) ──
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const STATUSES = new Set(["paid", "packing", "shipped", "delivered"]);

function clampInt(v: unknown, min: number, max: number, dflt = 0): number {
  const n = Number(v);
  if (!Number.isFinite(n)) return dflt;
  return Math.max(min, Math.min(max, Math.round(n)));
}

function str(v: unknown, max = 500): string {
  return typeof v === "string" ? v.slice(0, max) : "";
}

export async function GET() {
  try {
    const orders = await db.giftOrder.findMany({
      orderBy: { no: "desc" },
      take: 200,
    });
    return NextResponse.json({ orders });
  } catch (e) {
    console.error("GET /api/orders failed:", e);
    return NextResponse.json({ error: "db unavailable" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const id = str(body.id, 80);
    const no = clampInt(body.no, 1, 100000);
    const kind = str(body.kind, 20) || "bear";
    if (!id || !no) {
      return NextResponse.json({ error: "id and no are required" }, { status: 400 });
    }
    const status = STATUSES.has(str(body.status, 20)) ? str(body.status, 20) : "paid";
    const data = {
      id,
      no,
      kind,
      to: str(body.to, 80) || "دوست گلم",
      city: str(body.city, 60),
      address: str(body.address, 400),
      phone: str(body.phone, 20),
      message: str(body.message, 4000),
      occasion: clampInt(body.occasion, 0, 20),
      password: str(body.password, 40),
      anonymous: Boolean(body.anonymous),
      senderName: str(body.senderName, 80),
      hearts: clampInt(body.hearts, 0, 99),
      paws: clampInt(body.paws, 0, 99),
      total: clampInt(body.total, 0, 100000000),
      date: str(body.date, 40),
      status,
      opened: Boolean(body.opened),
      dir: str(body.dir, 10) === "recv" ? "recv" : "sent",
    };
    const order = await db.giftOrder.upsert({
      where: { id },
      create: data,
      update: data,
    });
    return NextResponse.json({ order }, { status: 201 });
  } catch (e) {
    console.error("POST /api/orders failed:", e);
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
}
