// ── /api/admin/sms/settings — تنظیمات سرویس پیامک (owner round 44) ──
// GET  → تنظیمات فعلی (کلید فقط به‌صورت نقاب‌شده — سکرت هرگز کامل برنمی‌گردد)
// PUT  → ذخیرهٔ تنظیمات (OWNER-only): apiKey / sender / enabled / ownerMobile
//        apiKey خالی ⇒ پاک‌کردن کلید؛ ناموجود ⇒ بدون تغییر.
//        کلید و شماره‌ها در جدول Setting ذخیره می‌شوند (DB > env) و کشِ فرستنده
//        بلافاصله باطل می‌شود — بدون ری‌دیپلوی.
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { assertSameOrigin, requireAdmin } from "@/lib/auth/session";
import { isRateLimited, clientIp, rateLimit } from "@/lib/rate-limit";
import { ippanelCreditDiag } from "@/lib/sms/ippanel";
import {
  SMS_SETTING_KEYS,
  getSmsSettings,
  invalidateSmsSettings,
  normalizePhoneDigits,
  validateSmsSettingsInput,
} from "@/lib/sms/settings";

export async function GET() {
  try {
    await requireAdmin();
    const s = await getSmsSettings(true);
    return NextResponse.json({
      ok: true,
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
      },
    });
  } catch (e) {
    if (isRateLimited(e)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}

const putSchema = z.object({
  // رشتهٔ خالی «""» یعنی پاک کردن کلید؛ undefined یعنی دست‌نخورده
  apiKey: z.string().max(300).optional(),
  sender: z.string().max(24).optional(),
  enabled: z.boolean().optional(),
  ownerMobile: z.string().max(24).optional(),
});

export async function PUT(req: Request) {
  try {
    const admin = await requireAdmin("owner"); // فقط حساب مالک
    assertSameOrigin(req);
    await rateLimit("admin_sms_settings", clientIp(req), 30, 600);
    const parsed = putSchema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) throw new AppError(400, "bad_input");
    const input = parsed.data;

    const vError = validateSmsSettingsInput({ sender: input.sender, ownerMobile: input.ownerMobile });
    if (vError) throw new AppError(400, "bad_input", { field: "message", message: vError });

    const writes: { key: string; value: string }[] = [];
    if (input.apiKey !== undefined) writes.push({ key: SMS_SETTING_KEYS.apiKey, value: input.apiKey.trim() });
    if (input.sender !== undefined) writes.push({ key: SMS_SETTING_KEYS.sender, value: normalizePhoneDigits(input.sender) });
    if (input.enabled !== undefined) writes.push({ key: SMS_SETTING_KEYS.enabled, value: input.enabled ? "1" : "0" });
    if (input.ownerMobile !== undefined) writes.push({ key: SMS_SETTING_KEYS.ownerMobile, value: normalizePhoneDigits(input.ownerMobile) });

    for (const w of writes) {
      await db.setting.upsert({ where: { key: w.key }, create: w, update: { value: w.value } });
    }
    invalidateSmsSettings();
    const s = await getSmsSettings(true);

    return NextResponse.json({
      ok: true,
      by: admin.phone,
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
      },
      // تست اتصال رایگان بعد از هر ذخیره — اگر کلید تازه ذخیره شده، فوراً معلوم می‌شود
      connectionTest: s.apiKey ? await ippanelCreditDiag(s.apiKey) : { ok: false, error: "کلید API تنظیم نشده است" },
    });
  } catch (e) {
    if (isRateLimited(e)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
