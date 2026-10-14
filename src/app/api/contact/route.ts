// ── /api/contact — store contact-form messages (rate-limited; guide §4.4) ──
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse, AppError } from "@/lib/errors";
import { clientIp, isRateLimited, rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    await rateLimit("contact", clientIp(req), 3, 3600);
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 80) : "";
    const email = typeof body.email === "string" ? body.email.trim().slice(0, 120) : "";
    const subject = typeof body.subject === "string" ? body.subject.slice(0, 80) : "";
    const orderNo = typeof body.orderNo === "string" ? body.orderNo.slice(0, 40) : "";
    const message = typeof body.message === "string" ? body.message.trim().slice(0, 4000) : "";

    if (!name || !email || !subject || !message) throw new AppError(400, "missing_fields");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new AppError(400, "invalid_email");

    const saved = await db.contactMessage.create({
      data: { name, email, subject, orderNo, message },
    });
    return NextResponse.json({ ok: true, id: saved.id }, { status: 201 });
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
