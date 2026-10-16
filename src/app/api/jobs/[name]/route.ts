// ── POST /api/jobs/{name} — systemd/Coolify scheduled tasks (guide §4.13) ──
// Auth: x-cron-secret header (constant-time compare). All jobs are idempotent
// and logged into JobRun. TZ is Asia/Tehran everywhere.
import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { env } from "@/lib/env";
import { transitionOrder } from "@/lib/orders/transition";
import { flushSms, enqueueSms } from "@/lib/sms";
import { zarinpalVerify } from "@/lib/orders/checkout";
import { purgeExpiredMessages } from "@/lib/orders/retention";

function checkSecret(req: Request): void {
  const got = req.headers.get("x-cron-secret") ?? "";
  const want = env.CRON_SECRET;
  const a = Buffer.from(got.slice(0, 64));
  const b = Buffer.from(want.slice(0, 64));
  if (a.length !== b.length || !timingSafeEqual(a, b)) throw new AppError(401, "unauthenticated");
}

const JOBS: Record<string, () => Promise<string>> = {
  // انقضای سفارش‌های پرداخت‌نشده + آزادسازی موجودی (رزرو ۱۰ دقیقه‌ای کارت‌به‌کارت)
  "expire-unpaid": async () => {
    const { expireDueOrders } = await import("@/lib/orders/expire");
    const stale = await db.order.count({
      where: { status: { in: ["awaiting_payment", "failed"] }, expiresAt: { lt: new Date() } },
    });
    const n = await expireDueOrders(100);
    return `expired ${n}/${stale}`;
  },

  // خالی‌کردن صف پیامک
  "sms-flush": async () => {
    const r = await flushSms(30);
    return `sent ${r.sent}, failed ${r.failed}, dead ${r.dead}`;
  },

  // یادآوری سبد رهاشده — فقط یک‌بار برای هر سفارش
  "abandon-cart": async () => {
    const stale = await db.order.findMany({
      where: { status: "awaiting_payment", createdAt: { lt: new Date(Date.now() - 6 * 36e5) }, smsAbandonedAt: null },
      select: { id: true, code: true, userPhone: true, senderPhone: true },
      take: 50,
    });
    let n = 0;
    for (const o of stale) {
      const phone = o.userPhone || o.senderPhone;
      await db.order.update({ where: { id: o.id }, data: { smsAbandonedAt: new Date() } });
      if (phone) {
        await db.$transaction(async (tx) => {
          await enqueueSms(tx, { phone, template: "abandoned_cart", params: { code: o.code } });
        }).catch(() => {});
      }
      n += 1;
    }
    return `reminded ${n}`;
  },

  // هشدار موجودی کم
  "low-stock": async () => {
    const threshold = Number((await db.setting.findUnique({ where: { key: "low_stock_threshold" } }))?.value ?? 5);
    const low = await db.productVariant.findMany({
      where: { isActive: true, stock: { lte: threshold } },
      include: { product: true },
    });
    if (low.length === 0) return "all good";
    const pending = await db.smsOutbox.findFirst({ where: { template: "admin_alert", status: "queued", params: { contains: "موجودی" } } });
    if (pending) return "alert already queued";
    const owner = env.OWNER_MOBILE;
    if (owner) {
      const text = `موجودی کم: ${low.map((v) => `${v.product.slug}(${v.stock})`).join("، ").slice(0, 40)}`;
      await db.$transaction(async (tx) => {
        await enqueueSms(tx, { phone: owner, template: "admin_alert", params: { text } });
      }).catch(() => {});
    }
    return `low: ${low.map((v) => `${v.product.slug}:${v.stock}`).join(",")}`;
  },

  // راستی‌آزمایی پرداخت‌های معلق زرین‌پال (timeout path)
  "reconcile-payments": async () => {
    const stale = await db.payment.findMany({
      where: { status: "initiated", method: "zarinpal", createdAt: { lt: new Date(Date.now() - 36e5) }, authority: { not: "" } },
      include: { order: true },
      take: 50,
    });
    let ok = 0;
    let failed = 0;
    for (const p of stale) {
      if (p.order.status !== "awaiting_payment") continue;
      const v = await zarinpalVerify(p.authority, p.amountToman);
      if (v.ok) {
        const upd = await db.payment.updateMany({ where: { id: p.id, status: "initiated" }, data: { status: "verified", refId: v.refId ?? "" } });
        if (upd.count === 1) {
          await transitionOrder(p.order.id, "paid", { actor: "psp", actorId: "reconcile", meta: { refId: v.refId ?? "" } });
          ok += 1;
        }
      } else {
        await db.payment.update({ where: { id: p.id }, data: { status: "failed" } }).catch(() => {});
        await transitionOrder(p.order.id, "failed", { actor: "system", note: "reconcile_verify_failed" }).catch(() => {});
        failed += 1;
      }
    }
    return `verified ${ok}, failed ${failed} of ${stale.length}`;
  },

  // پاک‌سازی محتوای پیام‌های منقضی‌شده (mission §۴) — idempotent, retry-safe
  "purge-messages": async () => {
    const r = await purgeExpiredMessages(100);
    return `scanned ${r.scanned}, purged ${r.purged}, failed ${r.failed}`;
  },

  // پاک‌سازی روزانه ۰۴:۰۰ به وقت تهران
  purge: async () => {
    const ac = await db.authCode.deleteMany({ where: { expiresAt: { lt: new Date() } } });
    const ss = await db.session.deleteMany({ where: { expiresAt: { lt: new Date() } } });
    const jr = await db.jobRun.deleteMany({ where: { startedAt: { lt: new Date(Date.now() - 30 * 864e5) } } });
    return `authCodes ${ac.count}, sessions ${ss.count}, jobRuns ${jr.count}`;
  },
};

export async function POST(req: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  try {
    checkSecret(req);
    const job = JOBS[name];
    if (!job) throw new AppError(404, "unknown_job");
    const run = await db.jobRun.create({ data: { name } });
    try {
      const detail = await job();
      await db.jobRun.update({ where: { id: run.id }, data: { finishedAt: new Date(), ok: true, detail } });
      return NextResponse.json({ ok: true, job: name, detail });
    } catch (e) {
      await db.jobRun.update({ where: { id: run.id }, data: { finishedAt: new Date(), ok: false, detail: String(e).slice(0, 200) } });
      throw e;
    }
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
