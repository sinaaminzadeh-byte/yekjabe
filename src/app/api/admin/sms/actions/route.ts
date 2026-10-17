// ── /api/admin/sms/actions — test send / manual flush / retry (OWNER) ──
// action=template_test → sends ONE sample message to a given phone using the
//                        CURRENT template config (pattern or plain) — the
//                        fastest way for the owner to validate a pattern code.
// action=flush         → drains the queue right now.
// action=retry         → re-queues a failed/dead row for immediate send.
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { assertSameOrigin, requireAdmin } from "@/lib/auth/session";
import { isRateLimited, clientIp, rateLimit } from "@/lib/rate-limit";
import { flushSms, sendSmsNow, getSmsTemplateMap, renderFallback } from "@/lib/sms";
import { validPhone } from "@/lib/auth/phone";

const schema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("template_test"), templateKey: z.string().min(2).max(64), phone: z.string().min(10).max(15) }),
  z.object({ action: z.literal("flush") }),
  z.object({ action: z.literal("retry"), id: z.string().min(6).max(64) }),
]);

const SAMPLES: Record<string, Record<string, string>> = {
  otp_login: { code: "۱۲۳۴" },
  order_confirm: { code: "PN-140401-0001" },
  paid: { code: "PN-140401-0001" },
  receipt_received: { code: "PN-140401-0001" },
  rejected: { code: "PN-140401-0001", reason: "؛ عکس رسید ناخوانا بود" },
  cancelled: { code: "PN-140401-0001" },
  shipped: { code: "PN-140401-0001", tracking: "123456789" },
  delivered: { code: "PN-140401-0001" },
  abandoned_cart: { code: "PN-140401-0001" },
  admin_alert: { text: "پیام آزمایشی" },
};

export async function POST(req: Request) {
  try {
    await requireAdmin("owner");
    assertSameOrigin(req);
    await rateLimit("admin_sms_actions", clientIp(req), 30, 600);
    const parsed = schema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) throw new AppError(400, "bad_input");

    if (parsed.data.action === "flush") {
      const r = await flushSms(30);
      return NextResponse.json({ ok: true, ...r });
    }

    if (parsed.data.action === "retry") {
      const row = await db.smsOutbox.findUnique({ where: { id: parsed.data.id } });
      if (!row) throw new AppError(404, "not_found");
      await db.smsOutbox.update({ where: { id: row.id }, data: { status: "queued", sendAfter: new Date(), error: "" } });
      const r = await flushSms(10);
      return NextResponse.json({ ok: true, retried: row.id, ...r });
    }

    // template_test — immediate, honest result
    const { templateKey, phone } = parsed.data;
    const to = validPhone(phone);
    if (!to) throw new AppError(400, "invalid_phone");
    const cfg = (await getSmsTemplateMap()).get(templateKey);
    if (!cfg) throw new AppError(404, "template_not_found");
    const params = SAMPLES[templateKey] ?? { code: "1234", text: "پیام آزمایشی" };
    const r = await sendSmsNow({ phone: to, template: templateKey, params });
    return NextResponse.json({
      ok: r.ok,
      error: r.error,
      mode: cfg.patternCode ? "pattern" : "plain",
      preview: cfg.patternCode
        ? `پترن ${cfg.patternCode} با متغیرهای ${JSON.stringify(Object.fromEntries(Object.entries(cfg.variables).map(([k]) => [cfg.variables[k] ?? k, params[k] ?? ""])))}`
        : renderFallback(cfg.fallbackText, params),
    });
  } catch (e) {
    if (isRateLimited(e)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
