// ── sms/index.ts — SmsOutbox queue + ippanel pattern-first delivery ──
// (owner round: بخش پیامک کامل با تنظیمات و گزارش‌ها)
//
// Architecture:
//   enqueueSms()   — ALWAYS runs inside the tx that changed the state → row in
//                    SmsOutbox (queued). flushSms (sms-flush job every 2 min)
//                    drains the queue.
//   sendSmsNow()   — urgent path (OTP): row + immediate delivery attempt; the
//                    row still lands in the outbox so reports are complete.
//   Delivery       — resolves the SmsTemplate row AT SEND TIME:
//                      patternCode set  → ippanel pattern send (fast path)
//                      fallbackText set → ippanel plain send
//                      neither/dev      → dev echo (or legacy Kavenegar)
//                    Because config is read at send time, editing a pattern
//                    code or text in the admin panel applies to rows that are
//                    still queued — the owner never touches code.
import type { Prisma } from "@prisma/client";
import { db } from "../db";
import { env } from "../env";
import { ippanelConfigured, ippanelSendPattern, ippanelSendPlain } from "./ippanel";

type Tx = Prisma.TransactionClient;

export interface SmsTemplateConfig {
  key: string;
  label: string;
  description: string;
  patternCode: string;
  variables: Record<string, string>; // internal param → ippanel variable name
  fallbackText: string; // {param} placeholders
  enabled: boolean;
}

// ── ۱۰ قالب پیش‌فرض (seed) — متن‌ها همان زبان و لحن فعلی سایت ──
export const SMS_SEEDS: (SmsTemplateConfig & { isSystem: true })[] = [
  {
    key: "otp_login",
    label: "کد تأیید ورود / ثبت‌نام",
    description: "وقتی کاربر شماره‌اش را برای ورود یا ثبت‌نام وارد می‌کند",
    patternCode: "",
    variables: { code: "code" },
    fallbackText: "کد تأیید یک دوست: {code} — این کد را با کسی به اشتراک نگذارید.",
    enabled: true,
    isSystem: true,
  },
  {
    key: "order_confirm",
    label: "ثبت سفارش (تکمیل خرید)",
    description: "بعد از ثبت موفق سفارش، به سفارش‌دهنده",
    patternCode: "",
    variables: { code: "code" },
    fallbackText: "یک دوست: سفارش {code} ثبت شد. پیگیری: yekdoost.ir/track",
    enabled: true,
    isSystem: true,
  },
  {
    key: "paid",
    label: "تأیید پرداخت",
    description: "وقتی پرداخت سفارش تأیید شد (زرین‌پال یا رسید کارت‌به‌کارت)",
    patternCode: "",
    variables: { code: "code" },
    fallbackText: "یک دوست: پرداخت سفارش {code} تأیید شد؛ به‌زودی ارسال می‌شه.",
    enabled: true,
    isSystem: true,
  },
  {
    key: "receipt_received",
    label: "دریافت رسید کارت‌به‌کارت",
    description: "وقتی عکس رسید کارت‌به‌کارت آپلود شد",
    patternCode: "",
    variables: { code: "code" },
    fallbackText: "یک دوست: رسید سفارش {code} رسید؛ تا ۱۲ ساعت بررسی می‌شه.",
    enabled: true,
    isSystem: true,
  },
  {
    key: "rejected",
    label: "رد شدن رسید",
    description: "وقتی رسید کارت‌به‌کارت تأیید نشد",
    patternCode: "",
    variables: { code: "code", reason: "reason" },
    fallbackText: "یک دوست: رسید سفارش {code} تأیید نشد{reason}.",
    enabled: true,
    isSystem: true,
  },
  {
    key: "cancelled",
    label: "لغو سفارش",
    description: "وقتی سفارش لغو می‌شود",
    patternCode: "",
    variables: { code: "code" },
    fallbackText: "یک دوست: سفارش {code} لغو شد. اگه سؤالی داری تماس بگیر.",
    enabled: true,
    isSystem: true,
  },
  {
    key: "shipped",
    label: "تحویل به پست",
    description: "وقتی جعبه تحویل پست شد",
    patternCode: "",
    variables: { code: "code", tracking: "tracking" },
    fallbackText: "یک دوست: سفارش {code} تحویل پست شد{tracking}.",
    enabled: true,
    isSystem: true,
  },
  {
    key: "delivered",
    label: "تحویل به گیرنده",
    description: "وقتی جعبه به گیرنده رسید",
    patternCode: "",
    variables: { code: "code" },
    fallbackText: "یک دوست: سفارش {code} تحویل داده شد. جعبه رو باز کن!",
    enabled: true,
    isSystem: true,
  },
  {
    key: "abandoned_cart",
    label: "یادآوری سبد رهاشده",
    description: "۶ ساعت بعد از سفارشِ پرداخت‌نشده — فقط یک‌بار",
    patternCode: "",
    variables: { code: "code" },
    fallbackText: "یک دوست: جعبه‌ت منتظره! سفارش {code} تا امشب اعتبار داره.",
    enabled: true,
    isSystem: true,
  },
  {
    key: "admin_alert",
    label: "هشدار مدیریتی (به مالک)",
    description: "هشدارهای داخلی مثل کمبود موجودی به شماره مالک",
    patternCode: "",
    variables: { text: "text" },
    fallbackText: "یک دوست: {text}",
    enabled: true,
    isSystem: true,
  },
];

// ── seed-on-boot (idempotent, cheap) ──
let seeded = false;
export async function ensureSmsSeeds(): Promise<void> {
  if (seeded) return;
  await db.$transaction(
    SMS_SEEDS.map((t) =>
      db.smsTemplate.upsert({
        where: { key: t.key },
        create: {
          key: t.key,
          label: t.label,
          description: t.description,
          patternCode: t.patternCode,
          variables: JSON.stringify(t.variables),
          fallbackText: t.fallbackText,
          enabled: t.enabled,
          isSystem: true,
        },
        update: {}, // NEVER overwrite owner edits on boot
      }),
    ),
  );
  seeded = true;
}

// ── config cache (30s) — admin edits reach the sender within half a minute,
//    and PATCH invalidates immediately ──
let cache: { at: number; map: Map<string, SmsTemplateConfig> } | null = null;

export function invalidateSmsTemplateCache(): void {
  cache = null;
}

export async function getSmsTemplateMap(): Promise<Map<string, SmsTemplateConfig>> {
  if (cache && Date.now() - cache.at < 30_000) return cache.map;
  await ensureSmsSeeds();
  const rows = await db.smsTemplate.findMany();
  const map = new Map<string, SmsTemplateConfig>();
  for (const r of rows) {
    map.set(r.key, {
      key: r.key,
      label: r.label,
      description: r.description,
      patternCode: r.patternCode.trim(),
      variables: safeObj(r.variables),
      fallbackText: r.fallbackText,
      enabled: r.enabled,
    });
  }
  cache = { at: Date.now(), map };
  return map;
}

function safeObj(s: string): Record<string, string> {
  try {
    const v = JSON.parse(s) as unknown;
    return v && typeof v === "object" ? (v as Record<string, string>) : {};
  } catch {
    return {};
  }
}

export function renderFallback(text: string, params: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (m, k: string) => (k in params ? String(params[k]) : m));
}

/** sanity cap — a plain SMS beyond ~4 segments is almost always a bug */
function assertSane(text: string): void {
  if (text.length > 265) throw new Error(`sms text too long (${text.length})`);
}

export async function enqueueSms(
  tx: Tx,
  input: { phone: string; template: string; params?: Record<string, string>; sendAfter?: Date },
): Promise<void> {
  await tx.smsOutbox.create({
    data: {
      phone: input.phone,
      template: input.template,
      params: JSON.stringify(input.params ?? {}),
      sendAfter: input.sendAfter ?? new Date(),
    },
  });
}

/** Urgent path — create the row AND deliver immediately (OTP, admin test). */
export async function sendSmsNow(
  input: { phone: string; template: string; params?: Record<string, string> },
): Promise<{ ok: boolean; error?: string }> {
  await ensureSmsSeeds();
  const row = await db.smsOutbox.create({
    data: { phone: input.phone, template: input.template, params: JSON.stringify(input.params ?? {}) },
  });
  try {
    const r = await deliver(input.phone, input.template, input.params ?? {});
    await db.smsOutbox.update({
      where: { id: row.id },
      data: { status: "sent", sentAt: new Date(), attempts: 1, provider: r.provider, messageId: r.messageId },
    });
    return { ok: true };
  } catch (e) {
    await db.smsOutbox.update({
      where: { id: row.id },
      data: { status: "failed", attempts: 1, error: String(e).slice(0, 200) },
    });
    return { ok: false, error: String(e).slice(0, 120) };
  }
}

const BACKOFF_MS = [60_000, 86_400_000, 5 * 86_400_000, 30 * 86_400_000]; // ۱دقیقه → ۱د → ۵د → ۳۰د → dead

/** Drain queued SMS. Called by the sms-flush job every 2 minutes (and admin). */
export async function flushSms(limit = 30): Promise<{ sent: number; failed: number; dead: number }> {
  await ensureSmsSeeds();
  const queued = await db.smsOutbox.findMany({
    where: { status: "queued", sendAfter: { lte: new Date() } },
    orderBy: { createdAt: "asc" },
    take: limit,
  });
  let sent = 0;
  let failed = 0;
  let dead = 0;
  for (const row of queued) {
    const params = safeParse(row.params);
    try {
      const r = await deliver(row.phone, row.template, params);
      await db.smsOutbox.update({
        where: { id: row.id },
        data: { status: "sent", sentAt: new Date(), attempts: { increment: 1 }, provider: r.provider, messageId: r.messageId, error: "" },
      });
      sent += 1;
    } catch (e) {
      const cfg = (await getSmsTemplateMap()).get(row.template);
      const attempts = row.attempts + 1;
      if (cfg && !cfg.enabled) {
        await db.smsOutbox.update({ where: { id: row.id }, data: { status: "dead", attempts, error: "template_disabled" } });
        dead += 1;
      } else if (attempts > BACKOFF_MS.length) {
        await db.smsOutbox.update({ where: { id: row.id }, data: { status: "dead", attempts, error: String(e).slice(0, 200) } });
        dead += 1;
      } else {
        await db.smsOutbox.update({
          where: { id: row.id },
          data: { status: "queued", attempts, error: String(e).slice(0, 200), sendAfter: new Date(Date.now() + BACKOFF_MS[attempts - 1]) },
        });
        failed += 1;
      }
    }
  }
  return { sent, failed, dead };
}

interface DeliverResult {
  provider: string;
  messageId: string;
}

async function deliver(phone: string, template: string, params: Record<string, string>): Promise<DeliverResult> {
  const cfg = (await getSmsTemplateMap()).get(template);
  const vars = cfg?.variables ?? {};
  const sender = env.IPPANEL_SENDER ?? "";

  // Dev sandbox: no real provider — echo marks it sent so the queue drains.
  if (env.devEcho || (!ippanelConfigured() && !env.KAVENEGAR_API_KEY)) {
    const text = cfg?.patternCode
      ? `[pattern ${cfg.patternCode}] ${JSON.stringify(mapVars(vars, params))}`
      : renderFallback(cfg?.fallbackText ?? "", params) || `[${template}]`;
    console.log(`[sms:echo] ${phone} → ${text}`);
    return { provider: "echo", messageId: "" };
  }

  if (!cfg || !cfg.enabled) {
    throw new Error(cfg ? "template_disabled" : `unknown sms template: ${template}`);
  }

  // ۱) pattern path — fast, text lives on ippanel side
  if (cfg.patternCode) {
    const r = await ippanelSendPattern(cfg.patternCode, sender, phone, mapVars(vars, params));
    return { provider: r.provider, messageId: r.messageId };
  }

  // ۲) plain path — rendered fallback text
  if (cfg.fallbackText.trim()) {
    const text = renderFallback(cfg.fallbackText, params);
    assertSane(text);
    const r = await ippanelSendPlain(text, sender, phone);
    return { provider: r.provider, messageId: r.messageId };
  }

  // ۳) legacy Kavenegar plain send (only if configured)
  if (env.KAVENEGAR_API_KEY) {
    const text = renderFallback(cfg.fallbackText, params) || params._text || "";
    assertSane(text);
    const qs = new URLSearchParams({ receptor: phone, message: text });
    if (env.KAVENEGAR_SENDER) qs.set("sender", env.KAVENEGAR_SENDER);
    const res = await fetch(`https://api.kavenegar.com/v1/${env.KAVENEGAR_API_KEY}/sms/send.json?${qs.toString()}`, {
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`kavenegar_http_${res.status}`);
    const body = (await res.json()) as { return?: { status?: number } };
    if ((body.return?.status ?? 200) !== 200) throw new Error(`kavenegar_${body.return?.status}`);
    return { provider: "kavenegar", messageId: "" };
  }

  throw new Error("no_pattern_and_no_text");
}

/** internal param → ippanel variable name mapping (identity fallback). */
function mapVars(vars: Record<string, string>, params: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(params)) {
    if (k.startsWith("_")) continue;
    out[vars[k] ?? k] = String(v ?? "");
  }
  // pattern variables declared but missing from params get empty strings —
  // ippanel rejects pattern sends with missing variables
  for (const k of Object.values(vars)) {
    if (!(k in out)) out[k] = "";
  }
  return out;
}

function safeParse(s: string): Record<string, string> {
  try {
    return JSON.parse(s) as Record<string, string>;
  } catch {
    return {};
  }
}
