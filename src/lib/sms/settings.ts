// ── sms/settings.ts — تنظیمات سرویس پیامک، از خودِ پنل (owner round 44) ──
// قبلاً کلید API و شمارهٔ فرستنده فقط از env (IPPANEL_API_KEY / IPPANEL_SENDER)
// خوانده می‌شد؛ یعنی تغییرشان فقط با رفتن به Vercel و ری‌دیپلوی ممکن بود.
// حالا تنظیمات در جدول Setting ذخیره می‌شود و «از خود داشبورد» قابل ویرایش است:
//   sms_api_key        — کلید API پنل پیامکی (سکرت — هرگز کامل برگردانده نمی‌شود)
//   sms_sender         — خط ارسال (3000505 / +983000505 / 0912… — نرمال می‌شود)
//   sms_enabled        — کلید اصلی سرویس ("1"/"0") — خاموش ⇒ صف موقتاً می‌ایستد
//   sms_owner_mobile   — شمارهٔ هشدارهای مدیریتی (جای OWNER_MOBILE پنلی)
// اولویت: مقدار پنل (DB) > متغیر محیطی. کش ۳۰ ثانیه‌ای + باطل‌سازی فوری پس از ذخیره.
import { db } from "../db";
import { env } from "../env";

export const SMS_SETTING_KEYS = {
  apiKey: "sms_api_key",
  sender: "sms_sender",
  enabled: "sms_enabled",
  ownerMobile: "sms_owner_mobile",
  provider: "sms_provider",
} as const;

export interface SmsSettings {
  provider: "ippanel";
  apiKey: string; // resolved (DB first, env fallback) — only for server-side send
  apiKeySource: "panel" | "env" | "none";
  sender: string; // resolved, normalized digits
  senderSource: "panel" | "env" | "none";
  enabled: boolean;
  ownerMobile: string; // resolved (panel first, env fallback)
  ownerMobileSource: "panel" | "env" | "none";
  apiKeyHint: string; // masked: «…be9ZWU=» — safe to show in the panel
}

/** «۰۹۱۲…» → "0912…" و حذف هر غیررقمی (برای خط ارسال و شمارهٔ مالک). */
export function normalizePhoneDigits(s: string): string {
  return s
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[^\d+]/g, "")
    .trim();
}

/** نقاب امن برای نمایش: فقط ۶ کاراکتر آخر کلید. */
export function maskKey(key: string): string {
  if (!key) return "";
  const tail = key.slice(-6);
  return `…${tail}`;
}

let cache: { at: number; value: SmsSettings } | null = null;

export function invalidateSmsSettings(): void {
  cache = null;
}

async function readSettings(): Promise<Map<string, string>> {
  const rows = await db.setting.findMany({
    where: { key: { in: Object.values(SMS_SETTING_KEYS) } },
  });
  return new Map(rows.map((r) => [r.key, r.value]));
}

function resolve(
  panel: string | undefined,
  envVal: string | undefined,
): { value: string; source: "panel" | "env" | "none" } {
  if (panel && panel.trim()) return { value: panel.trim(), source: "panel" };
  if (envVal && envVal.trim()) return { value: envVal.trim(), source: "env" };
  return { value: "", source: "none" };
}

export async function getSmsSettings(force = false): Promise<SmsSettings> {
  if (!force && cache && Date.now() - cache.at < 30_000) return cache.value;
  const m = await readSettings();

  const key = resolve(m.get(SMS_SETTING_KEYS.apiKey), env.IPPANEL_API_KEY);
  const sender = resolve(m.get(SMS_SETTING_KEYS.sender), env.IPPANEL_SENDER);
  const owner = resolve(m.get(SMS_SETTING_KEYS.ownerMobile), env.OWNER_MOBILE);
  const enabledRaw = m.get(SMS_SETTING_KEYS.enabled);

  const value: SmsSettings = {
    provider: "ippanel",
    apiKey: key.value,
    apiKeySource: key.source,
    sender: normalizePhoneDigits(sender.value),
    senderSource: sender.source,
    // پیش‌فرض: روشن (نبودِ رکورد ⇒ سرویس فعال) — یعنی ذخیرهٔ «0» لازم است تا خاموش شود
    enabled: enabledRaw !== "0",
    ownerMobile: normalizePhoneDigits(owner.value),
    ownerMobileSource: owner.source,
    apiKeyHint: maskKey(key.value),
  };
  cache = { at: Date.now(), value };
  return value;
}

/** آیا ارسال واقعی ممکن است؟ (کلید + سرویس روشن) */
export async function smsProviderReady(): Promise<boolean> {
  const s = await getSmsSettings();
  return s.enabled && Boolean(s.apiKey);
}

/**
 * اعتبارسنجی ورودی‌های فرم تنظیمات — پیام فارسی برای نمایش مستقیم در پنل.
 * خروجی null یعنی معتبر است.
 */
export function validateSmsSettingsInput(input: {
  sender?: string;
  ownerMobile?: string;
}): string | null {
  if (input.sender !== undefined) {
    const n = normalizePhoneDigits(input.sender);
    if (n && !(n.length >= 4 && n.length <= 16)) return "شمارهٔ فرستنده معتبر نیست.";
  }
  if (input.ownerMobile !== undefined) {
    const n = normalizePhoneDigits(input.ownerMobile);
    if (n && !/^(\+98|0098|98|0)?9\d{9}$/.test(n.replace(/^\+/, ""))) {
      return "شمارهٔ موبایل مالک معتبر نیست (مثال: 09123456789).";
    }
  }
  return null;
}
