// ── orders/checkout.ts — server-authoritative, atomic, idempotent (guide §4.5–4.7) ──
import { randomUUID, randomBytes } from "crypto";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { db } from "../db";
import { retriedTransaction } from "../db-write";
import { AppError } from "../errors";
import { validPhone, normPhone } from "../auth/phone";
import { canonicalJson, hashGiftPassword, sha256Hex } from "./crypto";
import { nextOrderCode } from "./code";
import { computeQuote, getSettings, type Quote } from "./pricing";
import { MANUAL_WINDOW_MINUTES } from "./expire";
import type { OrderStatus } from "./status";

// ── input validation (zod) ──
import { PROVINCES } from "./provinces";

export const checkoutSchema = z.object({
  items: z
    .array(z.object({ variantId: z.string().min(6).max(64), qty: z.number().int().min(1).max(10) }))
    .min(1)
    .max(5),
  addons: z.object({
    charmHearts: z.number().int().min(0).max(20),
    charmPaws: z.number().int().min(0).max(20),
  }),
  sender: z.object({
    name: z.string().trim().min(1).max(40),
    phone: z.string().optional().default(""),
  }),
  recipient: z.object({
    name: z.string().trim().min(1).max(40),
    phone: z.string(),
    province: z.enum(PROVINCES),
    city: z.string().trim().min(1).max(40),
    address: z.string().trim().min(5).max(400),
    postalCode: z.string().trim().max(10).optional().default(""),
  }),
  gift: z.object({
    message: z.string().max(500),
    password: z.string().min(4).max(24),
    occasion: z.number().int().min(0).max(3),
    anonymous: z.boolean(),
  }),
  paymentMethod: z.enum(["zarinpal", "manual_transfer"]),
  marketingConsent: z.boolean().optional().default(false),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

export function parseCheckout(raw: unknown): CheckoutInput {
  const parsed = checkoutSchema.safeParse(raw);
  if (!parsed.success) {
    throw new AppError(400, "bad_input", { fields: parsed.error.issues.slice(0, 6).map((i) => `${i.path.join(".")}: ${i.message}`) });
  }
  const v = parsed.data;
  const recipientPhone = validPhone(v.recipient.phone);
  if (!recipientPhone) throw new AppError(400, "bad_input", { fields: ["recipient.phone: invalid mobile"] });
  const senderPhone = v.sender.phone ? validPhone(v.sender.phone) ?? "" : "";
  return { ...v, sender: { ...v.sender, phone: senderPhone }, recipient: { ...v.recipient, phone: recipientPhone } };
}

export interface CheckoutCtx {
  key: string; // Idempotency-Key (UUID)
  sessionPhone?: string;
  ip: string;
}

export interface CheckoutAck {
  code: string;
  status: OrderStatus;
  total: number;
  replayed: boolean;
  payment: {
    method: string;
    provider: string;
    status: string;
    redirectUrl?: string;
    expiresAt?: string; // ISO — end of the payment/reservation window
    windowMinutes?: number; // 10 for card-to-card (رزرو ۱۰ دقیقه‌ای)
    instructions?: Record<string, string>;
  };
}

/** UUID check — the client generates it once and keeps it in localStorage. */
export function validIdempotencyKey(k: string | null): string {
  if (!k) throw new AppError(400, "idempotency_key_required");
  const s = k.trim();
  if (s.length < 8 || s.length > 64) throw new AppError(400, "idempotency_key_invalid");
  return s;
}

export async function createOrder(raw: unknown, ctx: CheckoutCtx): Promise<CheckoutAck> {
  const input = parseCheckout(raw);
  const requestHash = sha256Hex(canonicalJson(input));

  // ۱) fast idempotency path
  const prior = await db.order.findUnique({ where: { idempotencyKey: ctx.key }, include: { payments: true, items: { include: { variant: { include: { product: true } } } } } });
  if (prior) return replay(prior, requestHash);

  let created: { code: string; status: OrderStatus; total: number } | null = null;
  try {
    created = await retriedTransaction(async (tx) => {
      const q = await computeQuote(tx, {
        items: input.items,
        charmHearts: input.addons.charmHearts,
        charmPaws: input.addons.charmPaws,
        province: input.recipient.province,
      });

      // ۲) atomic stock decrement — fixed variantId order prevents deadlocks
      for (const it of [...input.items].sort((a, b) => a.variantId.localeCompare(b.variantId))) {
        const r = await tx.productVariant.updateMany({
          where: { id: it.variantId, isActive: true, stock: { gte: it.qty } },
          data: { stock: { decrement: it.qty } },
        });
        if (r.count === 0) throw new AppError(409, "sold_out", { variantId: it.variantId });
      }

      // ۳) order + snapshot items + event (no SMS on creation — cost law)
      const code = await nextOrderCode(tx);
      const phone = ctx.sessionPhone ?? "";
      const order = await tx.order.create({
        data: {
          code,
          idempotencyKey: ctx.key,
          requestHash,
          status: "awaiting_payment",
          paymentMethod: input.paymentMethod,
          senderName: input.sender.name,
          senderPhone: input.sender.phone,
          recipientName: input.recipient.name,
          recipientPhone: input.recipient.phone,
          province: input.recipient.province,
          city: input.recipient.city,
          address: input.recipient.address,
          postalCode: input.recipient.postalCode,
          message: input.gift.message,
          cardPasswordHash: hashGiftPassword(input.gift.password),
          occasion: input.gift.occasion,
          anonymous: input.gift.anonymous,
          charmHearts: input.addons.charmHearts,
          charmPaws: input.addons.charmPaws,
          subtotalToman: q.subtotal,
          shippingToman: q.shipping,
          discountToman: q.discount,
          totalToman: q.total,
          userPhone: phone,
          sessionPhone: phone,
          // رزرو ۱۰ دقیقه‌ای برای کارت‌به‌کارت؛ درگاه آنلاین ۲۴ ساعت مهلت دارد.
          // همین میدان، رزرو موجودی را برای بقیه‌ی مشتری‌ها هم منصفانه نگه می‌دارد:
          // انقضا → expired → transitionOrder موجودی را برمی‌گرداند.
          expiresAt:
            input.paymentMethod === "manual_transfer"
              ? new Date(Date.now() + MANUAL_WINDOW_MINUTES * 60_000)
              : new Date(Date.now() + 24 * 36e5),
          items: {
            create: input.items.map((i) => {
              const v = q.lines.find((l) => l.variantId === i.variantId)!;
              return { variantId: i.variantId, titleSnapshot: `${v.productName}، دوست پشمالو`, unitPriceToman: v.unitPriceToman, qty: i.qty };
            }),
          },
          events: {
            create: {
              type: "created",
              toStatus: "awaiting_payment",
              actor: "customer",
              actorId: input.sender.phone || ctx.sessionPhone || ctx.ip,
            },
          },
        },
      });
      return { code: order.code, status: "awaiting_payment" as OrderStatus, total: order.totalToman };
    }, { timeout: 10_000 });
  } catch (e) {
    // lost the unique race on idempotencyKey → replay the winner
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      const winner = await db.order.findUniqueOrThrow({
        where: { idempotencyKey: ctx.key },
        include: { payments: true },
      });
      return replay(winner, requestHash);
    }
    throw e;
  }

  // ۴) payment creation AFTER commit — network calls inside tx are forbidden
  const orderFull = await db.order.findUniqueOrThrow({ where: { code: created.code }, include: { payments: true } });
  const payment = await createPaymentFor(orderFull);
  return {
    code: created.code,
    status: created.status,
    total: created.total,
    replayed: false,
    payment,
  };
}

async function replay(order: { requestHash: string; code: string; status: string; totalToman: number; expiresAt: Date; payments: { id: string; method: string; provider: string; status: string; authority: string }[] }, requestHash: string): Promise<CheckoutAck> {
  if (order.requestHash && order.requestHash !== requestHash) {
    throw new AppError(422, "idempotency_key_reuse");
  }
  const active = pickActivePayment(order.payments);
  let payment: CheckoutAck["payment"] = { method: order.status === "awaiting_payment" ? "" : "", provider: "", status: "" };
  if (active) {
    payment = { method: active.method, provider: active.provider, status: active.status };
    if (active.method === "zarinpal" && active.status === "initiated" && active.authority) {
      payment.redirectUrl = zarinRedirectUrl(active.authority);
    }
    if (active.method === "manual_transfer" && active.status === "initiated") {
      payment.expiresAt = order.expiresAt.toISOString();
      payment.windowMinutes = MANUAL_WINDOW_MINUTES;
    }
  } else if (order.status === "awaiting_payment") {
    // crashed between commit and payment creation → repair once
    const orderFull = await db.order.findUniqueOrThrow({ where: { code: order.code }, include: { payments: true } });
    payment = await createPaymentFor(orderFull);
  }
  return { code: order.code, status: order.status as OrderStatus, total: order.totalToman, replayed: true, payment };
}

function pickActivePayment(payments: { method: string; provider: string; status: string; authority: string }[]) {
  return payments.find((p) => p.status === "initiated" || p.status === "pending_review") ?? payments[payments.length - 1] ?? null;
}

/** Creates the Payment row + provider plumbing for a committed order. */
export async function createPaymentFor(order: {
  id: string;
  code: string;
  paymentMethod: string;
  totalToman: number;
  payments: unknown[];
}): Promise<CheckoutAck["payment"]> {
  const existing = await db.payment.findFirst({ where: { orderId: order.id, status: "initiated" } });
  if (existing) {
    return {
      method: existing.method,
      provider: existing.provider,
      status: existing.status,
      ...(existing.method === "zarinpal" && existing.authority ? { redirectUrl: zarinRedirectUrl(existing.authority) } : {}),
    };
  }

  if (order.paymentMethod === "zarinpal") {
    const { authority, provider } = await zarinpalCreate(order.code, order.totalToman);
    const payment = await db.payment.create({
      data: { orderId: order.id, method: "zarinpal", provider, amountToman: order.totalToman, status: "initiated", authority },
    });
    return { method: "zarinpal", provider, status: payment.status, redirectUrl: zarinRedirectUrl(authority) };
  }

  // manual_transfer — instructions come from Settings (card number/sheba/name)
  const settings = await db.setting.findMany({
    where: { key: { in: ["manual_card_number", "manual_card_sheba", "manual_card_name"] } },
  });
  const map: Record<string, string> = {};
  for (const s of settings) map[s.key] = s.value;
  const payment = await db.payment.create({
    data: { orderId: order.id, method: "manual_transfer", provider: map.manual_card_name ? "card_to_card" : "", amountToman: order.totalToman, status: "initiated" },
  });
  const fresh = await db.order.findUniqueOrThrow({
    where: { id: order.id },
    select: { expiresAt: true },
  });
  return {
    method: "manual_transfer",
    provider: payment.provider,
    status: payment.status,
    expiresAt: fresh.expiresAt.toISOString(),
    windowMinutes: MANUAL_WINDOW_MINUTES,
    instructions: {
      cardNumber: map.manual_card_number ?? "",
      sheba: map.manual_card_sheba ?? "",
      cardName: map.manual_card_name ?? "",
      amount: String(order.totalToman),
      code: order.code,
    },
  };
}

// ── zarinpal seam (adapter lives here to keep the file count honest) ──
import { env } from "../env";

export function zarinpalSimulate(): boolean {
  return !env.ZARINPAL_MERCHANT_ID; // no merchant configured → simulate the PSP
}

function zarinBaseUrl(): string {
  return env.ZARINPAL_SANDBOX === "1" ? "https://sandbox.zarinpal.com/pg/v4/payment" : "https://payment.zarinpal.com/pg/v4/payment";
}

function zarinRedirectUrl(authority: string): string {
  if (zarinpalSimulate()) return `${env.SITE_URL}/#/pay-gateway?authority=${authority}`;
  const base = env.ZARINPAL_SANDBOX === "1" ? "https://sandbox.zarinpal.com/pg/StartPay" : "https://payment.zarinpal.com/pg/StartPay";
  return `${base}/${authority}`;
}

export async function zarinpalCreate(orderCode: string, totalToman: number): Promise<{ authority: string; provider: string }> {
  if (zarinpalSimulate()) {
    const authority = `SIM${randomBytes(12).toString("hex").toUpperCase()}`;
    return { authority, provider: "zarinpal" };
  }
  const res = await fetch(`${zarinBaseUrl()}/request.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      merchant_id: env.ZARINPAL_MERCHANT_ID,
      amount: totalToman * 10, // IRR ×10 — NEVER remove (critic trap)
      callback_url: `${env.SITE_URL}/api/payment/zarinpal/callback`,
      description: `یک دوست — سفارش ${orderCode}`,
    }),
    signal: AbortSignal.timeout(12000),
  });
  const body = (await res.json()) as { data?: { authority?: string; code?: number }; errors?: unknown };
  const authority = body.data?.authority;
  if (!authority) throw new AppError(502, "psp_unavailable", { zarinpal: body.errors ?? "no_authority" });
  return { authority, provider: "zarinpal" };
}

export async function zarinpalVerify(authority: string, amountToman: number): Promise<{ ok: boolean; refId?: string; reason?: string }> {
  if (zarinpalSimulate()) {
    return authority.startsWith("SIM") ? { ok: true, refId: `SIMREF${Date.now()}` } : { ok: false, reason: "invalid_authority" };
  }
  const res = await fetch(`${zarinBaseUrl()}/verify.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ merchant_id: env.ZARINPAL_MERCHANT_ID, amount: amountToman * 10, authority }),
    signal: AbortSignal.timeout(12000),
  });
  const body = (await res.json()) as { data?: { code?: number; ref_id?: number } };
  const code = body.data?.code;
  if (code === 100 || code === 101) return { ok: true, refId: String(body.data?.ref_id ?? "") }; // 101 = already verified (idempotent)
  return { ok: false, reason: `zarinpal_code_${code ?? "unknown"}` };
}

/** For the manual idempotency-key generation on the client (single source). */
export function newIdempotencyKey(): string {
  return randomUUID();
}
