"use client";

// ── «تنظیمات» tab (A-02 split, owner-only) ──
// Everything here is server-consumed (pricing.ts / manual payments). The tab
// is hidden from مدیر فروشگاه in the UI AND the PATCH endpoint is owner-only.
import { useEffect, useState } from "react";
import { Logo, refreshBranding } from "@/components/shop/logo";
import { useToast } from "@/hooks/use-toast";
import { GallerySpinner } from "@/components/shop/admin/admin-ui";
import { adminFetch, invalidateAdminCache } from "@/components/shop/admin/admin-cache";

interface SettingsShape {
  charm_price_toman: string;
  charms_enabled: string;
  retention_6m_price_toman: string;
  retention_12m_price_toman: string;
  ship_fee_tehran_toman: string;
  ship_fee_other_toman: string;
  manual_card_number: string;
  manual_card_sheba: string;
  manual_card_name: string;
  manual_approval_sla_hours: string;
  low_stock_threshold: string;
  media_max_files: string;
  media_max_mb: string;
}

const SETTINGS_DEFAULT: SettingsShape = {
  charm_price_toman: "",
  charms_enabled: "1",
  retention_6m_price_toman: "",
  retention_12m_price_toman: "",
  ship_fee_tehran_toman: "",
  ship_fee_other_toman: "",
  manual_card_number: "",
  manual_card_sheba: "",
  manual_card_name: "",
  manual_approval_sla_hours: "12",
  low_stock_threshold: "5",
  media_max_files: "3",
  media_max_mb: "10",
};

function SettingsRow({
  label,
  hint,
  value,
  onChange,
  ltr = false,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  ltr?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-[12.5px] font-bold text-[#4A6572]">
      {label}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        dir={ltr ? "ltr" : undefined}
        inputMode={ltr ? "numeric" : undefined}
        className="h-12 rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3.5 text-[14px] font-bold text-[#04202E] outline-none focus:border-[#00ABE7]"
      />
      {hint && <span className="text-[11px] font-medium leading-[1.7] text-[#8FA6B0]">{hint}</span>}
    </label>
  );
}

/* ── لوگوی سایت (round 34, owner-only) — آپلود/حذف + پیش‌نمایش ──
 * POST/DELETE /api/admin/branding/logo; after success refreshBranding()
 * swaps every mounted <Logo/> in the app instantly (no reload). */
function LogoCard() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let alive = true;
    fetch("/api/branding", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { logoUrl: null }))
      .then((j: { logoUrl?: unknown }) => {
        if (alive) setLogoUrl(typeof j.logoUrl === "string" ? j.logoUrl : null);
      })
      .catch(() => {
        if (alive) setLogoUrl(null);
      });
    return () => {
      alive = false;
    };
  }, []);

  const brandErr = (code: string | undefined) =>
    code === "file_too_large"
      ? "حجم لوگو بیشتر از ۵ مگابایته."
      : code === "bad_file_type"
        ? "فقط عکس JPG / PNG / WebP قبوله."
        : code === "owner_only"
          ? "این کار فقط با حساب مالک ممکنه."
          : "دوباره تلاش کن.";

  const upload = async (file: File) => {
    setBusy(true);
    try {
      const fd = new FormData();
      fd.set("file", file);
      const res = await fetch("/api/admin/branding/logo", { method: "POST", body: fd });
      const b = (await res.json().catch(() => ({}))) as { ok?: boolean; logoUrl?: string | null; error?: string };
      if (!res.ok || !b.logoUrl) {
        toast({ title: "لوگو آپلود نشد", description: brandErr(b.error) });
        return;
      }
      setLogoUrl(b.logoUrl);
      refreshBranding({ logoUrl: b.logoUrl });
      toast({ title: "لوگو عوض شد ✓", description: "کل سایت همین حالا لوگوی جدید رو نشون می‌ده." });
    } catch {
      toast({ title: "آپلود نشد — دوباره تلاش کن" });
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    setBusy(true);
    try {
      const res = await fetch("/api/admin/branding/logo", { method: "DELETE" });
      const b = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !b.ok) {
        toast({ title: "حذف نشد", description: brandErr(b.error) });
        return;
      }
      setLogoUrl(null);
      refreshBranding({ logoUrl: null });
      toast({ title: "لوگو حذف شد", description: "لوگوی پیش‌فرض جعبه آبی برگشت." });
    } catch {
      toast({ title: "حذف نشد — دوباره تلاش کن" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="rounded-[24px] border border-[#DDEEF5] bg-white p-5">
      <h2 className="m-0 text-[16px] font-black text-[#04202E]">لوگوی سایت</h2>
      <p className="mb-4 mt-1 text-[12px] font-medium text-[#4A6572]">
        لوگو رو آپلود کن؛ بعد از آپلود، لوگو جای متنِ برند توی کل سایت می‌شینه.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt="لوگوی سایت"
            width={200}
            height={50}
            style={{ height: 50, width: "auto", maxWidth: 200, objectFit: "contain" }}
          />
        ) : (
          <span className="flex min-h-[72px] items-center" aria-label="لوگوی پیش‌فرض">
            <Logo size={72} />
          </span>
        )}
        <div className="flex flex-col gap-2">
          <span className="flex flex-wrap items-center gap-2">
            <label
              className={`cursor-pointer rounded-full bg-[#04202E] px-5 py-2.5 text-[12px] font-extrabold text-white ${busy ? "opacity-60" : ""}`}
            >
              {busy ? <span className="inline-flex items-center gap-2">در حال آپلود… <GallerySpinner size={14} /></span> : logoUrl ? "تغییر لوگو" : "آپلود لوگو"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                disabled={busy}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  e.target.value = "";
                  if (f) void upload(f);
                }}
              />
            </label>
            {logoUrl && (
              <button
                type="button"
                disabled={busy}
                onClick={() => void remove()}
                className="h-10 rounded-full border-[1.5px] border-[#F7C5D3] bg-white px-4 text-[11.5px] font-extrabold text-[#B02A52] disabled:opacity-60"
              >
                حذف لوگو
              </button>
            )}
          </span>
          <span className="text-[10.5px] font-medium leading-[1.7] text-[#4A6572]">
            JPG / PNG / WebP — حداکثر ۵ مگابایت — بهترین حالت، عکس مربعیه.
          </span>
        </div>
      </div>
    </section>
  );
}

/* ── رمز ورود پنل (round 41, owner-only) — چرخش رمز بدون دیپلوی ──
 * GET/POST/DELETE /api/admin/password — هش scrypt در Setting؛ بعد از اولین
 * تغییر، متغیر محیطی سرور فقط فالبک است و دیگر نیازی به Vercel نیست. */
function PanelPasswordCard() {
  const [source, setSource] = useState<"panel" | "env" | null>(null);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [repeat, setRepeat] = useState("");
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState(false);
  const [revertArmed, setRevertArmed] = useState(false);
  const { toast } = useToast();

  const loadSource = () => {
    fetch("/api/admin/password", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j: { source?: unknown } | null) => {
        if (j?.source === "panel" || j?.source === "env") setSource(j.source);
      })
      .catch(() => {});
  };

  useEffect(() => {
    loadSource();
  }, []);

  const rotate = async () => {
    if (next.trim().length < 8) {
      toast({ title: "رمز تازه کوتاه است", description: "حداقل ۸ کاراکتر لازمه." });
      return;
    }
    if (next !== repeat) {
      toast({ title: "تکرار رمز یکی نیست" });
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/admin/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
      });
      const b = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !b.ok) {
        toast({
          title: "عوض نشد",
          description:
            b.error === "wrong_password"
              ? "رمز فعلی درست نیست."
              : b.error === "rate_limited"
                ? "چند بار تلاش کردی؛ کمی صبر کن."
                : "دوباره تلاش کن.",
        });
        return;
      }
      setCurrent("");
      setNext("");
      setRepeat("");
      setSource("panel");
      toast({ title: "رمز پنل عوض شد ✓", description: "از ورود بعدی، همین رمز برای درِ پنله — بدون نیاز به Vercel." });
    } catch {
      toast({ title: "عوض نشد — اتصال را چک کن" });
    } finally {
      setBusy(false);
    }
  };

  const revert = async () => {
    if (!revertArmed) {
      setRevertArmed(true);
      setTimeout(() => setRevertArmed(false), 3000);
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/admin/password", { method: "DELETE" });
      const b = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (res.ok && b.ok) {
        setSource("env");
        toast({ title: "به رمز متغیر سرور برگشت", description: "متغیر ADMIN_PANEL_PASSWORD دوباره درِ پنله." });
      } else {
        toast({ title: "انجام نشد — دوباره تلاش کن" });
      }
    } catch {
      toast({ title: "انجام نشد — اتصال را چک کن" });
    } finally {
      setBusy(false);
      setRevertArmed(false);
    }
  };

  return (
    <section className="rounded-[24px] border border-[#DDEEF5] bg-white p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <h2 className="m-0 text-[16px] font-black text-[#04202E]">رمز ورود پنل</h2>
          <span className="text-[12px] font-medium text-[#4A6572]">
            رمز درِ «ورود با رمز عبور» — اینجا عوضش کن؛ دیگر نیازی به تغییر متغیر سرور و دیپلوی نیست.
          </span>
        </div>
        <span
          className="rounded-full px-3.5 py-1.5 text-[11px] font-extrabold"
          style={{
            background: source === "panel" ? "#E7F8EF" : "#F2FAFD",
            color: source === "panel" ? "#1E7A46" : "#006387",
          }}
        >
          {source === "panel" ? "منبع رمز: داخل پنل" : source === "env" ? "منبع رمز: متغیر سرور" : "…"}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <label className="flex flex-col gap-1.5 text-[12.5px] font-bold text-[#4A6572]">
          رمز فعلی
          <input
            type="password"
            dir="ltr"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            autoComplete="current-password"
            className="h-12 rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3.5 text-[14px] font-bold text-[#04202E] outline-none focus:border-[#00ABE7]"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-[12.5px] font-bold text-[#4A6572]">
          رمز تازه (حداقل ۸ کاراکتر)
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              dir="ltr"
              value={next}
              onChange={(e) => setNext(e.target.value)}
              autoComplete="new-password"
              className="h-12 w-full rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3.5 text-[14px] font-bold text-[#04202E] outline-none focus:border-[#00ABE7]"
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              aria-label={show ? "پنهان‌کردن رمز تازه" : "نمایش رمز تازه"}
              className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#4A6572] transition-colors hover:bg-[#F2FAFD]"
            >
              {show ? "🙈" : "👁"}
            </button>
          </div>
        </label>
        <label className="flex flex-col gap-1.5 text-[12.5px] font-bold text-[#4A6572]">
          تکرار رمز تازه
          <input
            type="password"
            dir="ltr"
            value={repeat}
            onChange={(e) => setRepeat(e.target.value)}
            autoComplete="new-password"
            className="h-12 rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3.5 text-[14px] font-bold text-[#04202E] outline-none focus:border-[#00ABE7]"
          />
        </label>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          disabled={busy || !current || !next}
          onClick={() => void rotate()}
          className="h-11 rounded-full bg-[#04202E] px-6 text-[13px] font-extrabold text-white disabled:opacity-50"
        >
          {busy ? "در حال تغییر…" : "تغییر رمز پنل"}
        </button>
        {source === "panel" && (
          <button
            type="button"
            disabled={busy}
            onClick={() => void revert()}
            className={`h-10 rounded-full border-[1.5px] px-4 text-[11.5px] font-extrabold disabled:opacity-60 ${
              revertArmed ? "border-[#F0426B] bg-[#FFF0F4] text-[#B02A52]" : "border-[#CFE6EF] bg-white text-[#4A6572]"
            }`}
          >
            {revertArmed ? "مطمئنی؟ حذف رمز پنلی" : "برگشت به رمز متغیر سرور"}
          </button>
        )}
      </div>
    </section>
  );
}

export function SettingsTab() {
  const [s, setS] = useState<SettingsShape>(SETTINGS_DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const load = () => {
    adminFetch<{ settings?: Record<string, string> }>("/api/admin/settings")
      .then((j) => {
        setS({ ...SETTINGS_DEFAULT, ...(j.settings ?? {}) });
        setLoading(false);
      })
      .catch(() => {
        toast({ title: "بارگذاری تنظیمات نشد" });
        setLoading(false);
      });
  };

  useEffect(() => {
    load();

  }, []);

  const set = (k: keyof SettingsShape) => (v: string) => setS((prev) => ({ ...prev, [k]: v }));

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values: s }),
      });
      const b = (await res.json().catch(() => ({}))) as { error?: string; details?: { field?: string } };
      if (!res.ok) {
        toast({
          title: "ذخیره نشد",
          description:
            b.error === "owner_only"
              ? "این کار فقط با حساب ادمین انجام می‌شه."
              : b.error === "bad_input"
                ? `مقدار «${b.details?.field ?? "?"}» معتبر نیست.`
                : "خطای سرور — دوباره تلاش کن.",
        });
        return;
      }
      toast({ title: "تنظیمات ذخیره شد ✓", description: "از همین لحظه روی سایت اعمال شد." });
      invalidateAdminCache();
      load();
    } catch {
      toast({ title: "ذخیره نشد — دوباره تلاش کن" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="rounded-[22px] bg-white px-5 py-6 text-center text-[13px] font-bold text-[#4A6572]">در حال بارگذاری…</div>;
  }

  const toEn = (v: string) => v.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/\D/g, "");

  return (
    <div className="flex flex-col gap-4">
      {/* لوگوی سایت (round 34) */}
      <LogoCard />

      {/* رمز ورود پنل (round 41) */}
      <PanelPasswordCard />

      {/* قلب قرمز و پنجه */}
      <section className="rounded-[24px] border border-[#F7C5D3] bg-[#FFF8FA] p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <h2 className="m-0 text-[16px] font-black text-[#04202E]">قلب قرمز و پنجه</h2>
            <span className="text-[12px] font-medium text-[#4A6572]">
              استیکرهای جعبه — وقتی غیرفعال باشه، سکشن از صفحه‌ی ساخت هدیه حذف و هر تعداد ذخیره‌شده صفر حساب می‌شه.
            </span>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={s.charms_enabled !== "0"}
            onClick={() => set("charms_enabled")(s.charms_enabled === "0" ? "1" : "0")}
            className="relative h-10 w-[92px] rounded-full transition-colors"
            style={{ background: s.charms_enabled !== "0" ? "#0B6E4F" : "#CFE6EF" }}
          >
            <span
              className="absolute top-1 flex h-8 items-center rounded-full bg-white px-3 text-[11px] font-black transition-all"
              style={{ right: s.charms_enabled !== "0" ? "4px" : "46px", color: s.charms_enabled !== "0" ? "#0B6E4F" : "#4A6572" }}
            >
              {s.charms_enabled !== "0" ? "فعال" : "خاموش"}
            </span>
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SettingsRow
            label="قیمت هر قلب / پنجه (تومان)"
            hint="عدد به تومان و بدون ویرگول — بلافاصله روی سایت اعمال می‌شود."
            value={s.charm_price_toman}
            onChange={(v) => set("charm_price_toman")(toEn(v))}
            ltr
          />
          <div className="flex items-end">
            <span className="rounded-[16px] bg-white px-4 py-3 text-[12px] font-bold leading-[1.8] text-[#4A6572]">
              پول قلب‌ها و پنجه‌ها بعد از ارسال، صرف هدیه به بچه‌های بی‌سرپرست و پناهگاه حیوونا می‌شه.
            </span>
          </div>
        </div>
      </section>

      {/* نگهداری پیام */}
      <section className="rounded-[24px] border border-[#DDEEF5] bg-white p-5">
        <h2 className="m-0 text-[16px] font-black text-[#04202E]">نگهداری پیام</h2>
        <p className="mb-4 mt-1 text-[12px] font-medium text-[#4A6572]">
          پلن ۱ ماهه رایگان است؛ قیمت دو پلن دیگر اینجا تعیین می‌شه (تومان).
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SettingsRow label="پلن ۶ ماهه (تومان)" value={s.retention_6m_price_toman} onChange={(v) => set("retention_6m_price_toman")(toEn(v))} ltr />
          <SettingsRow label="پلن ۱ ساله (تومان)" value={s.retention_12m_price_toman} onChange={(v) => set("retention_12m_price_toman")(toEn(v))} ltr />
        </div>
      </section>

      {/* استودیو رسانه — سقف فایل/حجم (owner round 30) */}
      <section className="rounded-[24px] border border-[#DDEEF5] bg-white p-5">
        <h2 className="m-0 text-[16px] font-black text-[#04202E]">استودیو رسانه (ویس، عکس، ویدیو)</h2>
        <p className="mb-4 mt-1 text-[12px] font-medium leading-[1.8] text-[#4A6572]">
          سقف پیوست‌های خصوصی هر هدیه — هم سمت مرورگر و هم سمت سرور با همین اعداد کنترل می‌شه.
          تعداد فایل بین ۱ تا ۳ (استودیو ۳ اسلات دارد) و حجم بین ۱ تا ۵۰ مگابایت.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SettingsRow label="حداکثر تعداد فایل (۱ تا ۳)" value={s.media_max_files} onChange={(v) => set("media_max_files")(toEn(v))} ltr />
          <SettingsRow label="حداکثر حجم هر فایل (مگابایت، ۱ تا ۵۰)" value={s.media_max_mb} onChange={(v) => set("media_max_mb")(toEn(v))} ltr />
        </div>
      </section>

      {/* ارسال */}
      <section className="rounded-[24px] border border-[#DDEEF5] bg-white p-5">
        <h2 className="m-0 text-[16px] font-black text-[#04202E]">هزینه ارسال</h2>
        <p className="mb-4 mt-1 text-[12px] font-medium text-[#4A6572]">ارسال هیچ‌وقت رایگان نیست (قانون جعبه‌ی مهربونی).</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SettingsRow label="تهران (تومان)" value={s.ship_fee_tehran_toman} onChange={(v) => set("ship_fee_tehran_toman")(toEn(v))} ltr />
          <SettingsRow label="سایر شهرها (تومان)" value={s.ship_fee_other_toman} onChange={(v) => set("ship_fee_other_toman")(toEn(v))} ltr />
        </div>
      </section>

      {/* کارت به کارت */}
      <section className="rounded-[24px] border border-[#DDEEF5] bg-white p-5">
        <h2 className="m-0 text-[16px] font-black text-[#04202E]">پرداخت کارت‌به‌کارت</h2>
        <p className="mb-4 mt-1 text-[12px] font-medium text-[#4A6572]">
          این اطلاعات تو پنل پرداخت مشتری نمایش داده می‌شه — بعد از تغییر، اعتبارسنجی خودکار انجام می‌شه.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SettingsRow label="شماره کارت" value={s.manual_card_number} onChange={(v) => set("manual_card_number")(v)} ltr />
          <SettingsRow label="شماره شبا" value={s.manual_card_sheba} onChange={(v) => set("manual_card_sheba")(v)} ltr />
          <SettingsRow label="نام صاحب حساب" value={s.manual_card_name} onChange={(v) => set("manual_card_name")(v)} />
          <SettingsRow label="حداکثر ساعت تأیید رسید" value={s.manual_approval_sla_hours} onChange={(v) => set("manual_approval_sla_hours")(toEn(v))} ltr />
        </div>
      </section>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={saving}
          onClick={() => void save()}
          className="h-12 rounded-full bg-[#04202E] px-8 text-[14px] font-extrabold text-white disabled:opacity-60"
        >
          {saving ? "در حال ذخیره…" : "ذخیره تنظیمات"}
        </button>
      </div>
    </div>
  );
}
