// ── /api/admin/sms/logs — گزارش ارسال‌ها (صف خروجی SmsOutbox) ──
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse } from "@/lib/errors";
import { requireAdmin } from "@/lib/auth/session";
import { isRateLimited } from "@/lib/rate-limit";

export async function GET(req: Request) {
  try {
    await requireAdmin();
    const url = new URL(req.url);
    const status = url.searchParams.get("status") ?? "";
    const page = Math.max(1, Math.min(50, Number(url.searchParams.get("page") ?? "1") || 1));
    const take = 30;
    const where = status && ["queued", "sent", "failed", "dead"].includes(status) ? { status } : {};
    const [rows, total] = await Promise.all([
      db.smsOutbox.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * take,
        take,
      }),
      db.smsOutbox.count({ where }),
    ]);
    return NextResponse.json({
      ok: true,
      page,
      pages: Math.max(1, Math.ceil(total / take)),
      total,
      logs: rows.map((r) => ({
        id: r.id,
        phone: r.phone,
        template: r.template,
        status: r.status,
        attempts: r.attempts,
        provider: r.provider,
        messageId: r.messageId,
        error: r.error,
        params: r.params,
        sendAfter: r.sendAfter.toISOString(),
        sentAt: r.sentAt?.toISOString() ?? null,
        createdAt: r.createdAt.toISOString(),
      })),
    });
  } catch (e) {
    if (isRateLimited(e)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
