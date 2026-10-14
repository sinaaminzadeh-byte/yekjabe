// ── /api/orders — session-scoped order access (Phase A of the launch guide) ──
// GET  → ONLY with a customer session; returns ≤50 orders where the session
//        phone is the sender (userPhone) or the recipient (phone). Guests get 401.
// POST → demo-order upsert (replaced by /api/checkout in Phase B); the account
//        binding (userPhone) is derived from the session, never from the body.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse, AppError } from "@/lib/errors";
import { assertSameOrigin, getSession, requireSession } from "@/lib/auth/session";
import { Prisma } from "@prisma/client";

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
    const session = await requireSession();
    const orders = await db.giftOrder.findMany({
      where: { OR: [{ userPhone: session.phone }, { phone: session.phone }] },
      orderBy: { no: "desc" },
      take: 50,
    });
    return NextResponse.json({ orders });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}

export async function POST(req: Request) {
  try {
    assertSameOrigin(req);
    const session = await getSession("customer");
    const body = (await req.json()) as Record<string, unknown>;
    const id = str(body.id, 80);
    if (!id) throw new AppError(400, "id_required");
    const kind = str(body.kind, 20) || "bear";
    const status = STATUSES.has(str(body.status, 20)) ? str(body.status, 20) : "paid";
    // identity: cookie > body (logged-in sync keeps ownership; guests stay "")
    const userPhone = session?.phone ?? "";
    const data = {
      id,
      no: clampInt(body.no, 1, 100000),
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
      userPhone,
    };
    if (!data.no) throw new AppError(400, "no_required");
    try {
      const order = await db.giftOrder.upsert({ where: { id }, create: data, update: data });
      return NextResponse.json({ order }, { status: 201 });
    } catch (e) {
      // unique `no` collision (two clients picked the same demo number):
      // allocate the next free number and retry ONCE (real fix = Phase B codes)
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
        const max = await db.giftOrder.aggregate({ _max: { no: true } });
        const order = await db.giftOrder.upsert({
          where: { id },
          create: { ...data, no: (max._max.no ?? 1000) + 1 },
          update: data,
        });
        return NextResponse.json({ order }, { status: 201 });
      }
      throw e;
    }
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
