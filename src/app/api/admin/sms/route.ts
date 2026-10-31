// ── /api/admin/sms — بخش پیامک داشبورد (owner round) ──
// GET   → stats (+per-template usage) + provider status from PANEL settings +
//         credit + all templates (any admin seat)
// PATCH → update ONE template (patternCode / fallbackText / variables /
//         enabled) — OWNER-only, same policy as the تنظیمات tab.
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { assertSameOrigin, requireAdmin } from "@/lib/auth/session";
import { isRateLimited, clientIp, rateLimit } from "@/lib/rate-limit";
import { ensureSmsSeeds, invalidateSmsTemplateCache, getSmsTemplateMap } from "@/lib/sms";
import { ippanelCreditDiag } from "@/lib/sms/ippanel";
import { getSmsSettings } from "@/lib/sms/settings";

export async function GET() {
  try {
    await requireAdmin();
    await ensureSmsSeeds();
    const map = await getSmsTemplateMap();

    const [todaySent, sentTotal, queued, failed, dead, perTemplate, templates] = await Promise.all([
      db.smsOutbox.count({ where: { status: "sent", sentAt: { gte: new Date(Date.now() - 86_400_000) } } }),
      db.smsOutbox.count({ where: { status: "sent" } }),
      db.smsOutbox.count({ where: { status: "queued" } }),
      db.smsOutbox.count({ where: { status: "queued", attempts: { gt: 0 } } }),
      db.smsOutbox.count({ where: { status: "dead" } }),
      db.smsOutbox.groupBy({ by: ["template"], where: { status: "sent" }, _count: { _all: true } }),
      db.smsTemplate.findMany({ orderBy: { key: "asc" } }),
    ]);

    // تنظیمات پنلی (کلید فقط نقاب‌شده) — DB > env
    const s = await getSmsSettings();
    const creditDiag = s.apiKey ? await ippanelCreditDiag(s.apiKey, s.baseUrl) : { ok: false as const, error: "کلید API تنظیم نشده است" };

    return NextResponse.json({
      ok: true,
      stats: { sent24h: todaySent, sentTotal, queued, failed, dead },
      perTemplate: perTemplate.map((r) => ({ template: r.template, sent: r._count._all })),
      settings: {
        provider: s.provider,
        apiKeySet: Boolean(s.apiKey),
        apiKeyHint: s.apiKeyHint,
        apiKeySource: s.apiKeySource,
        sender: s.sender,
        senderSource: s.senderSource,
        enabled: s.enabled,
        ownerMobile: s.ownerMobile,
        ownerMobileSource: s.ownerMobileSource,
        baseUrl: s.baseUrl,
        baseUrlSource: s.baseUrlSource,
      },
      provider: {
        ippanel: Boolean(s.apiKey),
        sender: s.sender,
        kavenegar: false, // legacy env provider — kept out of the panel UI
      },
      credit: creditDiag.ok ? creditDiag.credit ?? null : null,
      creditDiag,
      templates: templates.map((t) => ({
        key: t.key,
        label: t.label,
        description: t.description,
        patternCode: t.patternCode,
        variables: safeObj(t.variables),
        fallbackText: t.fallbackText,
        enabled: t.enabled,
        isSystem: t.isSystem,
        updatedAt: t.updatedAt.toISOString(),
      })),
    });
  } catch (e) {
    if (isRateLimited(e)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}

const patchSchema = z.object({
  key: z.string().min(2).max(64),
  patternCode: z.string().trim().max(64).optional(),
  fallbackText: z.string().max(500).optional(),
  variables: z.record(z.string().min(1).max(32), z.string().min(1).max(32)).optional(),
  enabled: z.boolean().optional(),
});

export async function PATCH(req: Request) {
  try {
    const admin = await requireAdmin("owner"); // ← مدیر فروشگاه 403 می‌گیرد
    assertSameOrigin(req);
    await rateLimit("admin_sms_patch", clientIp(req), 60, 600);
    const body = await req.json().catch(() => null);
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) throw new AppError(400, "bad_input");
    const { key, ...rest } = parsed.data;

    const row = await db.smsTemplate.findUnique({ where: { key } });
    if (!row) throw new AppError(404, "template_not_found");

    const data: Record<string, unknown> = {};
    if (rest.patternCode !== undefined) data.patternCode = rest.patternCode;
    if (rest.fallbackText !== undefined) {
      if (!rest.fallbackText.trim()) throw new AppError(400, "bad_input", { field: "fallbackText" });
      data.fallbackText = rest.fallbackText;
    }
    if (rest.variables !== undefined) data.variables = JSON.stringify(rest.variables);
    if (rest.enabled !== undefined) data.enabled = rest.enabled;

    const updated = await db.smsTemplate.update({ where: { key }, data });
    invalidateSmsTemplateCache(); // sender sees the new config immediately
    return NextResponse.json({ ok: true, template: { key: updated.key }, by: admin.phone });
  } catch (e) {
    if (isRateLimited(e)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}

function safeObj(s: string): Record<string, string> {
  try {
    const v = JSON.parse(s) as unknown;
    return v && typeof v === "object" ? (v as Record<string, string>) : {};
  } catch {
    return {};
  }
}
