// ── /api/contact — store contact-form messages ──
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 80) : "";
    const email = typeof body.email === "string" ? body.email.trim().slice(0, 120) : "";
    const subject = typeof body.subject === "string" ? body.subject.slice(0, 80) : "";
    const orderNo = typeof body.orderNo === "string" ? body.orderNo.slice(0, 40) : "";
    const message = typeof body.message === "string" ? body.message.trim().slice(0, 4000) : "";

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "missing fields" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "invalid email" }, { status: 400 });
    }

    const saved = await db.contactMessage.create({
      data: { name, email, subject, orderNo, message },
    });
    return NextResponse.json({ ok: true, id: saved.id }, { status: 201 });
  } catch (e) {
    console.error("POST /api/contact failed:", e);
    return NextResponse.json({ error: "db unavailable" }, { status: 500 });
  }
}
