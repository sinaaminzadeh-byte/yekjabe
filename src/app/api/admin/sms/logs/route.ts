// ── /api/admin/sms/logs — گزارش ارسال‌ها (صف خروجی SmsOutbox) ──
// Round 44: جست‌وجوی شماره (q) + فیلتر قالب (template) + حالت خروجی (export=1
// تا سقف ۱۰۰۰ ردیف برای CSV) — کنترل بیشتر برای مالک روی گزارش‌ها.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse } from "@/lib/errors";
import { requireAdmin } from "@/lib/auth/session";
import { isRateLimited } from "@/lib/rate-limit";

/** جست‌وجوی شماره: ۰۹۱۲… / +98912… / 98912… همه به شکل 0912… تبدیل می‌شوند —
 * شماره‌ها در outbox با فرم 09xxxxxxxxx ذخیره شده‌اند. */
function searchQuery(raw: string): string {
  let s = raw.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/\D/g, "");
  if (s.startsWith("0098")) s = s.slice(4);
  else if (s.startsWith("098")) s = s.slice(3);
  else if (s.startsWith("98") && s.length >= 12) s = s.slice(2);
  return s;
}

export async function GET(req: Request) {
  try {
    await requireAdmin();
    const url = new URL(req.url);
    const status = url.searchParams.get("status") ?? "";
    const q = searchQuery(url.searchParams.get("q") ?? "");
    const template = url.searchParams.get("template") ?? "";
    const isExport = url.searchParams.get("export") === "1";
    const page = Math.max(1, Math.min(50, Number(url.searchParams.get("page") ?? "1") || 1));
    const take = isExport ? 1000 : 30;

    const where: Record<string, unknown> = {};
    if (status && ["queued", "sent", "failed", "dead"].includes(status)) where.status = status;
    if (q) where.phone = { contains: q };
    if (template) where.template = template;

    const [rows, total] = await Promise.all([
      db.smsOutbox.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: isExport ? 0 : (page - 1) * take,
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
