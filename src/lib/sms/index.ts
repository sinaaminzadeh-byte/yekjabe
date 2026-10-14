// ── sms/index.ts — SmsOutbox queue + Kavenegar seam (guide §4.10) ──
// enqueueSms always runs INSIDE the transaction that changes the state.
// flushSms (the /api/jobs/sms-flush timer) drains the queue.
// Cost law: every template ≤ 70 chars = 1 segment (asserted at enqueue time).
import type { Prisma } from "@prisma/client";
import { env } from "../env";

type Tx = Prisma.TransactionClient;

export interface SmsTemplate {
  key: string;
  render: (p: Record<string, string>) => string;
}

// ۹ قالب ۱-سگمنتی (≤۷۰ کاراکتر) — بلوک ۱۳-د §۹
export const SMS_TEMPLATES: Record<string, SmsTemplate> = {
  order_confirm: { key: "order_confirm", render: (p) => `پیشنام: سفارش ${p.code} ثبت شد. پیگیری: pishnam.ir/track` },
  paid: { key: "paid", render: (p) => `پیشنام: پرداخت سفارش ${p.code} تأیید شد؛ به‌زودی ارسال می‌شه.` },
  receipt_received: { key: "receipt_received", render: (p) => `پیشنام: رسید سفارش ${p.code} رسید؛ تا ۱۲ ساعت بررسی می‌شه.` },
  rejected: { key: "rejected", render: (p) => `پیشنام: رسید سفارش ${p.code} تأیید نشد${p.reason ? `؛ ${p.reason}` : ""}.` },
  cancelled: { key: "cancelled", render: (p) => `پیشنام: سفارش ${p.code} لغو شد. اگه سؤالی داری تماس بگیر.` },
  shipped: { key: "shipped", render: (p) => `پیشنام: سفارش ${p.code} تحویل پست شد${p.tracking ? `؛ کد رهگیری ${p.tracking}` : ""}.` },
  delivered: { key: "delivered", render: (p) => `پیشنام: سفارش ${p.code} تحویل داده شد. جعبه رو باز کن!` },
  abandoned_cart: { key: "abandoned_cart", render: (p) => `پیشنام: جعبه‌ت منتظره! سفارش ${p.code} تا امشب اعتبار داره.` },
  admin_alert: { key: "admin_alert", render: (p) => `پیشنام: ${p.text}` },
};

export function renderSms(template: string, params: Record<string, string> = {}): string {
  const t = SMS_TEMPLATES[template];
  if (!t) throw new Error(`unknown sms template: ${template}`);
  const text = t.render(params);
  if (text.length > 70) throw new Error(`sms template ${template} exceeds 70 chars (${text.length})`);
  return text;
}

export async function enqueueSms(
  tx: Tx,
  input: { phone: string; template: string; params?: Record<string, string>; sendAfter?: Date },
): Promise<void> {
  const text = renderSms(input.template, input.params); // throws on >70 → fail fast in dev
  await tx.smsOutbox.create({
    data: {
      phone: input.phone,
      template: input.template,
      params: JSON.stringify({ ...input.params, _text: text }),
      sendAfter: input.sendAfter ?? new Date(),
    },
  });
}

const BACKOFF_MS = [86_400_000, 5 * 86_400_000, 30 * 86_400_000]; // ۱د → ۵د → ۳۰د → dead

/** Drain queued SMS. Called by the sms-flush job every 2 minutes. */
export async function flushSms(limit = 30): Promise<{ sent: number; failed: number; dead: number }> {
  const queued = await db_sms.findQueued(limit);
  let sent = 0;
  let failed = 0;
  let dead = 0;
  for (const row of queued) {
    const params = safeParse(row.params);
    const text = String(params._text ?? renderSms(row.template, params));
    try {
      await deliver(row.phone, text);
      await db_sms.markSent(row.id);
      sent += 1;
    } catch (e) {
      const attempts = row.attempts + 1;
      if (attempts > BACKOFF_MS.length) {
        await db_sms.markDead(row.id, String(e));
        dead += 1;
      } else {
        await db_sms.markFailed(row.id, String(e), new Date(Date.now() + BACKOFF_MS[attempts - 1]));
        failed += 1;
      }
    }
  }
  return { sent, failed, dead };
}

async function deliver(phone: string, text: string): Promise<void> {
  // Dev sandbox: no real provider — echo marks it sent so the queue drains.
  if (env.devEcho || !env.KAVENEGAR_API_KEY) {
    console.log(`[sms:echo] ${phone} → ${text}`);
    return;
  }
  const key = env.KAVENEGAR_API_KEY;
  const qs = new URLSearchParams({ receptor: phone, message: text });
  if (env.KAVENEGAR_SENDER) qs.set("sender", env.KAVENEGAR_SENDER);
  const res = await fetch(`https://api.kavenegar.com/v1/${key}/sms/send.json?${qs.toString()}`, {
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`kavenegar_http_${res.status}`);
  const body = (await res.json()) as { return?: { status?: number } };
  if ((body.return?.status ?? 200) !== 200) throw new Error(`kavenegar_${body.return?.status}`);
}

function safeParse(s: string): Record<string, string> {
  try {
    return JSON.parse(s) as Record<string, string>;
  } catch {
    return {};
  }
}

// tiny indirection so the import graph stays readable in tests/qa
import { db } from "../db";
const db_sms = {
  findQueued: (limit: number) =>
    db.smsOutbox.findMany({
      where: { status: "queued", sendAfter: { lte: new Date() } },
      orderBy: { createdAt: "asc" },
      take: limit,
    }),
  markSent: (id: string) => db.smsOutbox.update({ where: { id }, data: { status: "sent", sentAt: new Date(), attempts: { increment: 1 } } }),
  markFailed: (id: string, error: string, sendAfter: Date) =>
    db.smsOutbox.update({ where: { id }, data: { status: "queued", attempts: { increment: 1 }, error: error.slice(0, 200), sendAfter } }),
  markDead: (id: string, error: string) =>
    db.smsOutbox.update({ where: { id }, data: { status: "dead", attempts: { increment: 1 }, error: error.slice(0, 200) } }),
};
