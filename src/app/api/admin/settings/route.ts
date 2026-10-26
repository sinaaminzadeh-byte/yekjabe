// ── /api/admin/settings — shop-wide controls (OWNER-only, «تنظیمات» tab) ──
// GET  list the managed keys (any admin seat may read; the UI hides the tab
//      from مدیر فروشگاه anyway).
// PATCH upsert values. OWNER-ONLY (role=owner) — pricing policy is the admin's
//      job, not the store manager's (owner request: دسترسی ادمین / مدیر فروشگاه).
// Every key here is consumed server-side (pricing.ts / manual payments / SMS),
// so wrong values only break money paths — hence the strict zod bounds and the
// owner gate.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { assertSameOrigin, requireAdmin } from "@/lib/auth/session";
import { isRateLimited, clientIp, rateLimit } from "@/lib/rate-limit";
import { z } from "zod";

// the FULL managed whitelist — nothing outside this can ever be written
const MANAGED_KEYS = [
  "charm_price_toman",
  "charms_enabled",
  "retention_6m_price_toman",
  "retention_12m_price_toman",
  "ship_fee_tehran_toman",
  "ship_fee_other_toman",
  "manual_card_number",
  "manual_card_sheba",
  "manual_card_name",
  "manual_approval_sla_hours",
  "low_stock_threshold",
  "media_max_files",
  "media_max_mb",
] as const;

const patchSchema = z.object({
  values: z.record(z.string().max(120), z.union([z.string().max(120), z.number(), z.boolean()])),
});

const LABELS: Record<string, string> = {
  charm_price_toman: "قیمت هر قلب/پنجه (تومان)",
  charms_enabled: "قلب قرمز و پنجه فعال است",
  retention_6m_price_toman: "نگهداری پیام ۶ ماهه (تومان)",
  retention_12m_price_toman: "نگهداری پیام ۱ ساله (تومان)",
  ship_fee_tehran_toman: "هزینه ارسال تهران (تومان)",
  ship_fee_other_toman: "هزینه ارسال سایر شهرها (تومان)",
  manual_card_number: "شماره کارت کارت‌به‌کارت",
  manual_card_sheba: "شماره شبا",
  manual_card_name: "نام صاحب حساب",
  manual_approval_sla_hours: "ساعت حداکثری تأیید رسید",
  low_stock_threshold: "آستانه هشدار کمبود موجودی",
  media_max_files: "حداکثر تعداد فایل رسانه‌ای هر هدیه",
  media_max_mb: "حداکثر حجم هر فایل رسانه‌ای (مگابایت)",
};

export async function GET() {
  try {
    await requireAdmin();
    const rows = await db.setting.findMany({ where: { key: { in: [...MANAGED_KEYS] } } });
    const map: Record<string, string> = {};
    for (const k of MANAGED_KEYS) map[k] = rows.find((r) => r.key === k)?.value ?? "";
    return NextResponse.json({ ok: true, settings: map, labels: LABELS });
  } catch (e) {
    if (isRateLimited(e)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}

export async function PATCH(req: Request) {
  try {
    const admin = await requireAdmin("owner"); // ← مدیر فروشگاه اینجا 403 می‌گیرد
    assertSameOrigin(req);
    await rateLimit("admin_settings", clientIp(req), 40, 600);
    const body = await req.json().catch(() => null);
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) throw new AppError(400, "bad_input");
    if (Object.keys(parsed.data.values).length > MANAGED_KEYS.length) throw new AppError(400, "bad_input");

    const prices = ["charm_price_toman", "retention_6m_price_toman", "retention_12m_price_toman", "ship_fee_tehran_toman", "ship_fee_other_toman", "low_stock_threshold"];
    const normalized: Record<string, string> = {};
    for (const [k, raw] of Object.entries(parsed.data.values)) {
      if (!(MANAGED_KEYS as readonly string[]).includes(k)) throw new AppError(400, "bad_key", { key: k });
      let v = String(raw).trim();
      if (k === "charms_enabled") {
        v = v === "0" || v === "false" ? "0" : "1";
      } else if (prices.includes(k)) {
        if (!/^\d{1,12}$/.test(v)) throw new AppError(400, "bad_input", { field: k }); // toman ints only
      } else if (k === "media_max_files") {
        // studio has 3 slots — 1..3 real, server clamps the same way
        if (!/^\d$/.test(v) || Number(v) < 1 || Number(v) > 3) throw new AppError(400, "bad_input", { field: k });
      } else if (k === "media_max_mb") {
        if (!/^\d{1,2}$/.test(v) || Number(v) < 1 || Number(v) > 50) throw new AppError(400, "bad_input", { field: k });
      } else if (k === "manual_card_number") {
        v = v.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/[^\d- ]/g, "").slice(0, 30);
        if (v.replace(/\D/g, "").length < 16) throw new AppError(400, "bad_input", { field: k });
      } else if (k === "manual_card_sheba") {
        v = v.toUpperCase().replace(/[^IR0-9]/g, "").slice(0, 26);
        if (v.length < 24) throw new AppError(400, "bad_input", { field: k });
      } else if (k === "manual_approval_sla_hours") {
        if (!/^\d{1,3}$/.test(v)) throw new AppError(400, "bad_input", { field: k });
      }
      if (!v) throw new AppError(400, "bad_input", { field: k });
      normalized[k] = v;
    }

    await db.$transaction(
      Object.entries(normalized).map(([key, value]) =>
        db.setting.upsert({ where: { key }, create: { key, value }, update: { value } }),
      ),
    );
    return NextResponse.json({ ok: true, updated: Object.keys(normalized), by: admin.phone });
  } catch (e) {
    if (isRateLimited(e)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
