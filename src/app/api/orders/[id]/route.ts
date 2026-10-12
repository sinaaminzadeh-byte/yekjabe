// ── /api/orders/[id] — patch tracking status / opened flag ──
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const STATUSES = new Set(["paid", "packing", "shipped", "delivered"]);

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const order = await db.giftOrder.findUnique({ where: { id } });
    if (!order) return NextResponse.json({ error: "not found" }, { status: 404 });
    return NextResponse.json({ order });
  } catch (e) {
    console.error("GET /api/orders/[id] failed:", e);
    return NextResponse.json({ error: "db unavailable" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const data: { status?: string; opened?: boolean } = {};
    if (typeof body.status === "string" && STATUSES.has(body.status)) {
      data.status = body.status;
    }
    if (typeof body.opened === "boolean") {
      data.opened = body.opened;
    }
    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "nothing to update" }, { status: 400 });
    }
    const order = await db.giftOrder.update({ where: { id }, data });
    return NextResponse.json({ order });
  } catch (e) {
    console.error("PATCH /api/orders/[id] failed:", e);
    return NextResponse.json({ error: "update failed" }, { status: 400 });
  }
}
