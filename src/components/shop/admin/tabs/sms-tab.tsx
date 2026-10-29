"use client";

// ── «پیامک‌ها» tab (A-02 split, owner-only) ──
// بخش پیامک کامل (owner round): تنظیمات قالب‌ها + کد پترن ippanel + متن
// پیش‌فرض قابل ویرایش + ارسال آزمایشی + گزارش ارسال‌ها. متن‌ها در لحظه‌ی
// ارسال از جدول SmsTemplate خوانده می‌شوند — یعنی هر تغییر اینجا بدون
// تغییر کد، روی پیامک‌های بعدی اعمال می‌شود.
import { useEffect, useState } from "react";
import { fa, money } from "@/lib/fa";
import { useToast } from "@/hooks/use-toast";
import { StatCard } from "@/components/shop/admin/admin-ui";
import { adminFetch, invalidateAdminCache } from "@/components/shop/admin/admin-cache";

interface SmsTemplateRow {
  key: string;
  label: string;
  description: string;
  patternCode: string;
  variables: Record<string, string>;
  fallbackText: string;
  enabled: boolean;
  isSystem: boolean;
  updatedAt: string;
}

interface SmsData {
  stats: { sent24h: number; queued: number; failed: number; dead: number };
  provider: { ippanel: boolean; sender: string; kavenegar: boolean };
  credit: number | null;
  creditDiag?: { ok: boolean; credit?: number; error?: string };
  ownerMobile: string;
  templates: SmsTemplateRow[];
}

interface SmsLogRow {
  id: string;
  phone: string;
  template: string;
  status: string;
  attempts: number;
  provider: string;
  messageId: string;
  error: string;
  params: string;
  sendAfter: string;
  sentAt: string | null;
  createdAt: string;
}

const SMS_STATUS_CHIP: Record<string, { label: string; bg: string; fg: string }> = {
  queued: { label: "در صف", bg: "#E3F6FD", fg: "#006387" },
  sent: { label: "ارسال شد", bg: "#E7F8EF", fg: "#1E7A46" },
  failed: { label: "ناموفق", bg: "#FFF3C9", fg: "#7A5C00" },
  dead: { label: "مردود", bg: "#FFE9F0", fg: "#B02A52" },
};

const SMS_TEMPLATE_LABEL: Record<string, string> = {
  otp_login: "کد ورود",
  order_confirm: "ثبت سفارش",
  paid: "تأیید پرداخت",
  receipt_received: "دریافت رسید",
  rejected: "رد رسید",
  cancelled: "لغو سفارش",
  shipped: "تحویل پست",
  delivered: "تحویل گیرنده",
  abandoned_cart: "سبد رهاشده",
  admin_alert: "هشدار مدیریتی",
};

export function SmsTab() {
  const [data, setData] = useState<SmsData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  // draft edits per template key
  const [edits, setEdits] = useState<Record<string, { patternCode: string; fallbackText: string; variables: Record<string, string>; enabled: boolean }>>({});
  const [saving, setSaving] = useState("");
  const [testing, setTesting] = useState("");
  const [testPhone, setTestPhone] = useState("");

  // logs
  const [logs, setLogs] = useState<SmsLogRow[]>([]);
  const [logStatus, setLogStatus] = useState("");
  const [logPage, setLogPage] = useState(1);
  const [logPages, setLogPages] = useState(1);
  const [logsBusy, setLogsBusy] = useState(false);

  const load = (fresh = false) => {
    adminFetch<SmsData>("/api/admin/sms", { fresh })
      .then((j) => {
        setData(j);
        setEdits((prev) => {
          const next = { ...prev };
          for (const t of j.templates) {
            if (!next[t.key]) {
              next[t.key] = {
                patternCode: t.patternCode,
                fallbackText: t.fallbackText,
                variables: { ...t.variables },
                enabled: t.enabled,
              };
            }
          }
          return next;
        });
        setLoading(false);
      })
      .catch(() => {
        toast({ title: "بارگذاری بخش پیامک نشد" });
        setLoading(false);
      });
  };

  const loadLogs = (status = logStatus, page = 1) => {
    setLogsBusy(true);
    adminFetch<{ logs?: SmsLogRow[]; page?: number; pages?: number }>(`/api/admin/sms/logs?status=${encodeURIComponent(status)}&page=${page}`)
      .then((j) => j)
      .then((j: { logs?: SmsLogRow[]; page?: number; pages?: number } | null) => {
        if (j) {
          setLogs(j.logs ?? []);
          setLogPage(j.page ?? 1);
          setLogPages(j.pages ?? 1);
        }
      })
      .catch(() => {})
      .finally(() => setLogsBusy(false));
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    loadLogs(logStatus, 1);
  }, [logStatus]);

  const saveTemplate = async (key: string) => {
    const e = edits[key];
    if (!e) return;
    setSaving(key);
    try {
      const res = await fetch("/api/admin/sms", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, patternCode: e.patternCode, fallbackText: e.fallbackText, variables: e.variables, enabled: e.enabled }),
      });
      const b = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        toast({
          title: "ذخیره نشد",
          description: b.error === "owner_only" ? "این کار فقط با حساب ادمین انجام می‌شه." : "خطای سرور — دوباره تلاش کن.",
        });
        return;
      }
      toast({ title: "قالب پیامک ذخیره شد ✓", description: "پیامک‌های بعدی همین لحظه با تنظیم جدید ارسال می‌شن." });
      invalidateAdminCache();
      load(true);
    } catch {
      toast({ title: "ذخیره نشد — دوباره تلاش کن" });
    } finally {
      setSaving("");
    }
  };

  const testTemplate = async (key: string) => {
    if (!testPhone.trim()) {
      toast({ title: "شماره‌ی آزمایشی رو بنویس", description: "پیامک آزمایشی به همون شماره می‌ره." });
      return;
    }
    setTesting(key);
    try {
      const res = await fetch("/api/admin/sms/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "template_test", templateKey: key, phone: testPhone }),
      });
      const b = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; mode?: string; preview?: string };
      if (!res.ok || !b.ok) {
        toast({
          title: "ارسال آزمایشی ناموفق",
          description:
            b.error === "invalid_phone" || b.error === "bad_input"
              ? "شماره موبایل معتبر نیست."
              : (b.error ?? "خطای سرور یا سرویس‌دهنده — گزارش را در جدول ببین."),
        });
        loadLogs(logStatus, 1);
        return;
      }
      toast({
        title: "پیامک آزمایشی رفت ✓",
        description: b.mode === "pattern" ? `با پترن: ${b.preview ?? ""}` : (b.preview ?? "با متن ساده"),
      });
      loadLogs(logStatus, 1);
    } catch {
      toast({ title: "ارسال آزمایشی نشد — دوباره تلاش کن" });
    } finally {
      setTesting("");
    }
  };

  const flushNow = async () => {
    setLogsBusy(true);
    try {
      const res = await fetch("/api/admin/sms/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "flush" }),
      });
      const b = (await res.json().catch(() => ({}))) as { ok?: boolean; sent?: number; failed?: number; dead?: number };
      toast({
        title: b.ok ? "صف پیامک تخلیه شد ✓" : "تخلیه‌ی صف نشد",
        description: b.ok ? `ارسال‌شده: ${fa(b.sent ?? 0)} — ناموفق: ${fa(b.failed ?? 0)} — مردود: ${fa(b.dead ?? 0)}` : undefined,
      });
      invalidateAdminCache();
      loadLogs(logStatus, 1);
      load(true);
    } catch {
      toast({ title: "تخلیه‌ی صف نشد — دوباره تلاش کن" });
    } finally {
      setLogsBusy(false);
    }
  };

  const retryRow = async (id: string) => {
    setLogsBusy(true);
    try {
      const res = await fetch("/api/admin/sms/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "retry", id }),
      });
      const b = (await res.json().catch(() => ({}))) as { ok?: boolean; sent?: number };
      toast({ title: b.ok && (b.sent ?? 0) > 0 ? "دوباره ارسال شد ✓" : "در صف ارسال دوباره قرار گرفت", description: undefined });
      invalidateAdminCache();
      loadLogs(logStatus, logPage);
      load(true);
    } catch {
      toast({ title: "ارسال دوباره نشد" });
    } finally {
      setLogsBusy(false);
    }
  };

  if (loading || !data) {
    return <div className="rounded-[22px] bg-white px-5 py-6 text-center text-[13px] font-bold text-[#4A6572]">در حال بارگذاری…</div>;
  }

  const placeholdersOf = (text: string, vars: Record<string, string>): [string, string][] => {
    const found = new Set<string>(Object.keys(vars));
    for (const m of text.matchAll(/\{(\w+)\}/g)) found.add(m[1]);
    return [...found].map((k) => [k, vars[k] ?? k]);
  };

  const toEn = (v: string) => v.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/\D/g, "");

  return (
    <div className="flex flex-col gap-4">
      {/* وضعیت سرویس + آمار */}
      <section className="rounded-[24px] border border-[#DDEEF5] bg-white p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="m-0 text-[16px] font-black text-[#04202E]">سرویس پیامک (ippanel)</h2>
          <span
            className="rounded-full px-3 py-1.5 text-[11.5px] font-extrabold"
            style={{ background: data.provider.ippanel ? "#E7F8EF" : "#FFE9F0", color: data.provider.ippanel ? "#1E7A46" : "#B02A52" }}
          >
            {data.provider.ippanel ? "کلید API وصل است" : "کلید API تنظیم نشده (IPPANEL_API_KEY)"}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard n={fa(data.stats.sent24h)} label="ارسال‌شده (۲۴ ساعت)" bg="#E7F8EF" />
          <StatCard n={fa(data.stats.queued)} label="در صف ارسال" bg="#E3F6FD" />
          <StatCard n={fa(data.stats.failed)} label="ناموفق (تلاش دوباره)" bg="#FFF3C9" />
          <StatCard n={fa(data.stats.dead)} label="مردود (رد شد)" bg="#FFE9F0" />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[12px] font-semibold text-[#4A6572]">
          {data.credit !== null && <span>اعتبار پنل: <b className="text-[#04202E]">{money(Math.floor(data.credit))}</b></span>}
          {data.creditDiag && !data.creditDiag.ok && (
            <span className="rounded-full bg-[#FFF3C9] px-2.5 py-1 text-[11px] font-extrabold text-[#7A5C00]" dir="auto">
              وضعیت اتصال ippanel: ✗ {data.creditDiag.error ?? "نامشخص"}
            </span>
          )}
          {data.creditDiag?.ok && (
            <span className="rounded-full bg-[#E7F8EF] px-2.5 py-1 text-[11px] font-extrabold text-[#1E7A46]">وضعیت اتصال ippanel: ✓ وصل است</span>
          )}
          {data.provider.sender && <span>شماره فرستنده: <b dir="ltr" className="text-[#04202E]">{data.provider.sender}</b></span>}
          {data.ownerMobile && <span>شماره هشدار مدیریتی: <b dir="ltr" className="text-[#04202E]">{data.ownerMobile}</b> (از متغیر محیطی OWNER_MOBILE)</span>}
          <span>صف هر ۲ دقیقه به‌طور خودکار خالی می‌شود.</span>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-[12.5px] font-bold text-[#4A6572]">
            شماره‌ی آزمایشی:
            <input
              value={testPhone}
              onChange={(e) => setTestPhone(e.target.value)}
              dir="ltr"
              inputMode="numeric"
              placeholder="09xxxxxxxxx"
              className="h-11 w-[180px] rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3.5 text-[14px] font-bold text-[#04202E] outline-none focus:border-[#00ABE7]"
            />
          </label>
          <button
            type="button"
            onClick={() => void flushNow()}
            disabled={logsBusy}
            className="h-11 rounded-full border-[1.5px] border-[#CFE6EF] bg-white px-4 text-[12.5px] font-extrabold text-[#006387] disabled:opacity-50"
          >
            تخلیه‌ی فوری صف
          </button>
        </div>
      </section>

      {/* قالب‌ها */}
      <section className="rounded-[24px] border border-[#DDEEF5] bg-white p-5">
        <h2 className="m-0 text-[16px] font-black text-[#04202E]">قالب‌های پیامک</h2>
        <p className="mb-4 mt-1.5 text-[12px] font-medium leading-[1.9] text-[#4A6572]">
          متن پیش‌فرض هر پیامک همین‌جاست. اگر «کد پترن» بدهی، پیامک با همان پترنِ تعریف‌شده در پنل ippanel ارسال می‌شود
          (سریع‌تر) و فقط نام متغیرها مهم است؛ اگر پترن خالی بماند، متنِ همین فرم ارسال می‌شود. ارسال‌ها بر اساس
          تنظیم همین لحظه است — برای اعمال، نیازی به تغییر کد نیست.
        </p>
        <div className="flex flex-col gap-3">
          {data.templates.map((t) => {
            const e = edits[t.key] ?? { patternCode: t.patternCode, fallbackText: t.fallbackText, variables: t.variables, enabled: t.enabled };
            const vars = placeholdersOf(e.fallbackText, e.variables);
            const dirty =
              e.patternCode !== t.patternCode || e.fallbackText !== t.fallbackText || e.enabled !== t.enabled ||
              JSON.stringify(e.variables) !== JSON.stringify(t.variables);
            return (
              <div key={t.key} className="rounded-[20px] border border-[#E3F0F5] bg-[#FBFEFF] p-4">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[14.5px] font-black text-[#04202E]">{t.label}</span>
                    <span dir="ltr" className="rounded-lg bg-[#F0F3F5] px-2 py-0.5 text-[10.5px] font-bold text-[#5B7482]">{t.key}</span>
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[10.5px] font-extrabold"
                      style={{ background: e.patternCode ? "#E7F8EF" : "#FFF3C9", color: e.patternCode ? "#1E7A46" : "#7A5C00" }}
                    >
                      {e.patternCode ? `پترن: ${e.patternCode}` : "متن ساده"}
                    </span>
                    {!t.enabled && <span className="rounded-full bg-[#FFE9F0] px-2.5 py-0.5 text-[10.5px] font-extrabold text-[#B02A52]">غیرفعال</span>}
                  </div>
                  <label className="flex cursor-pointer items-center gap-2 text-[12px] font-bold text-[#4A6572]">
                    <input
                      type="checkbox"
                      checked={e.enabled}
                      onChange={(ev) => setEdits((p) => ({ ...p, [t.key]: { ...e, enabled: ev.target.checked } }))}
                      className="h-4.5 w-4.5 accent-[#00ABE7]"
                      aria-label={`فعال بودن ${t.label}`}
                    />
                    فعال
                  </label>
                </div>
                <div className="mb-3 text-[12px] font-medium leading-[1.9] text-[#4A6572]">{t.description}</div>
                <div className="flex flex-col gap-3 md:flex-row">
                  <label className="flex flex-1 flex-col gap-1.5 text-[12px] font-bold text-[#4A6572]">
                    کد پترن ippanel (اختیاری)
                    <input
                      value={e.patternCode}
                      onChange={(ev) => setEdits((p) => ({ ...p, [t.key]: { ...e, patternCode: ev.target.value } }))}
                      dir="ltr"
                      placeholder="مثلاً 4xk9qz1mje"
                      className="h-11 rounded-2xl border-[1.5px] border-[#CFE6EF] bg-white px-3.5 text-[13.5px] font-bold text-[#04202E] outline-none focus:border-[#00ABE7]"
                    />
                  </label>
                  <div className="flex flex-1 flex-col gap-1.5 text-[12px] font-bold text-[#4A6572]">
                    نام متغیرهای پترن در ippanel
                    <div className="flex flex-wrap gap-2">
                      {vars.length === 0 && <span className="text-[11.5px] font-medium text-[#8FA6B0]">متغیری ندارد</span>}
                      {vars.map(([k, v]) => (
                        <label key={k} className="flex items-center gap-1.5 rounded-xl border border-[#E3F0F5] bg-white px-2 py-1.5 text-[11.5px]">
                          <span dir="ltr" className="font-extrabold text-[#04202E]">{`{${k}}`}</span>
                          <span className="text-[#8FA6B0]">→</span>
                          <input
                            value={v}
                            dir="ltr"
                            onChange={(ev) =>
                              setEdits((p) => ({
                                ...p,
                                [t.key]: { ...e, variables: { ...e.variables, [k]: ev.target.value.replace(/[^a-zA-Z0-9_]/g, "") } },
                              }))
                            }
                            aria-label={`نام متغیر پترن برای ${k}`}
                            className="h-7 w-[92px] rounded-lg border border-[#CFE6EF] bg-[#F8FDFF] px-2 text-[12px] font-bold text-[#04202E] outline-none focus:border-[#00ABE7]"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <label className="mt-3 flex flex-col gap-1.5 text-[12px] font-bold text-[#4A6572]">
                  متن پیش‌فرض (وقتی پترن نداری) — متغیرها با {"{نام}"}
                  <textarea
                    value={e.fallbackText}
                    onChange={(ev) => setEdits((p) => ({ ...p, [t.key]: { ...e, fallbackText: ev.target.value } }))}
                    rows={2}
                    className="resize-none rounded-2xl border-[1.5px] border-[#CFE6EF] bg-white px-3.5 py-2.5 text-[13.5px] font-semibold leading-[1.9] text-[#04202E] outline-none focus:border-[#00ABE7]"
                  />
                  <span className="text-[10.5px] font-medium text-[#8FA6B0]">
                    طول فعلی: {fa(e.fallbackText.length)} کاراکتر {e.fallbackText.length > 265 ? "— طولانی است!" : ""}
                  </span>
                </label>
                <div className="mt-3 flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    disabled={!dirty || saving === t.key}
                    onClick={() => void saveTemplate(t.key)}
                    className="h-11 rounded-full bg-[#04202E] px-5 text-[12.5px] font-extrabold text-white disabled:opacity-40"
                  >
                    {saving === t.key ? "در حال ذخیره…" : "ذخیره"}
                  </button>
                  <button
                    type="button"
                    disabled={testing === t.key}
                    onClick={() => void testTemplate(t.key)}
                    className="h-11 rounded-full border-[1.5px] border-[#00ABE7] bg-white px-4 text-[12.5px] font-extrabold text-[#006387] disabled:opacity-50"
                  >
                    {testing === t.key ? "در حال ارسال…" : "ارسال پیام آزمایشی"}
                  </button>
                  {dirty && <span className="text-[11.5px] font-bold text-[#7A5C00]">تغییرات ذخیره‌نشده دارد</span>}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* گزارش ارسال‌ها */}
      <section className="rounded-[24px] border border-[#DDEEF5] bg-white p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2.5">
          <h2 className="m-0 text-[16px] font-black text-[#04202E]">گزارش ارسال‌ها</h2>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { k: "", label: "همه" },
              { k: "queued", label: "در صف" },
              { k: "sent", label: "ارسال‌شده" },
              { k: "failed", label: "ناموفق" },
              { k: "dead", label: "مردود" },
            ].map((f) => (
              <button
                key={f.k}
                type="button"
                aria-pressed={logStatus === f.k}
                onClick={() => setLogStatus(f.k)}
                className="rounded-full px-3.5 py-1.5 text-[11.5px] font-extrabold transition-colors"
                style={{ background: logStatus === f.k ? "#04202E" : "#F0F3F5", color: logStatus === f.k ? "#fff" : "#4A6572" }}
              >
                {f.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => loadLogs(logStatus, 1)}
              disabled={logsBusy}
              className="rounded-full border border-[#CFE6EF] px-3.5 py-1.5 text-[11.5px] font-extrabold text-[#006387] disabled:opacity-50"
            >
              به‌روزرسانی
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-right">
            <thead>
              <tr className="text-[11px] font-bold text-[#5B7482]">
                <th className="px-2 py-2">شماره</th>
                <th className="px-2 py-2">قالب</th>
                <th className="px-2 py-2">وضعیت</th>
                <th className="px-2 py-2">مسیر</th>
                <th className="px-2 py-2">تاریخ</th>
                <th className="px-2 py-2">خطا</th>
                <th className="px-2 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-2 py-6 text-center text-[12.5px] font-bold text-[#8FA6B0]">
                    {logsBusy ? "در حال بارگذاری…" : "هنوز پیامکی در این حالت نیست."}
                  </td>
                </tr>
              )}
              {logs.map((r) => {
                const chip = SMS_STATUS_CHIP[r.status] ?? SMS_STATUS_CHIP.queued;
                return (
                  <tr key={r.id} className="border-t border-[#E3F0F5] text-[12.5px] font-semibold text-[#04202E]">
                    <td className="px-2 py-2.5" dir="ltr">{r.phone}</td>
                    <td className="px-2 py-2.5">
                      {SMS_TEMPLATE_LABEL[r.template] ?? r.template}
                      <span dir="ltr" className="ms-1.5 rounded bg-[#F0F3F5] px-1.5 py-0.5 text-[10px] text-[#5B7482]">{r.template}</span>
                    </td>
                    <td className="px-2 py-2.5">
                      <span className="rounded-full px-2.5 py-1 text-[10.5px] font-extrabold" style={{ background: chip.bg, color: chip.fg }}>
                        {chip.label}{r.attempts > 1 && r.status !== "sent" ? ` (${fa(r.attempts)} تلاش)` : ""}
                      </span>
                    </td>
                    <td className="px-2 py-2.5 text-[11.5px] text-[#5B7482]">{r.provider || "—"}</td>
                    <td className="px-2 py-2.5 text-[11.5px] text-[#5B7482]">
                      {new Intl.DateTimeFormat("fa-IR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(r.sentAt ?? r.createdAt))}
                    </td>
                    <td className="max-w-[180px] truncate px-2 py-2.5 text-[11px] text-[#B02A52]" title={r.error}>{r.error || "—"}</td>
                    <td className="px-2 py-2.5">
                      {(r.status === "failed" || r.status === "dead") && (
                        <button
                          type="button"
                          onClick={() => void retryRow(r.id)}
                          disabled={logsBusy}
                          className="rounded-full border border-[#CFE6EF] px-3 py-1 text-[11px] font-extrabold text-[#006387] disabled:opacity-50"
                        >
                          ارسال دوباره
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {logPages > 1 && (
          <div className="mt-3 flex items-center justify-center gap-3 text-[12.5px] font-bold text-[#006387]">
            <button
              type="button"
              disabled={logPage <= 1 || logsBusy}
              onClick={() => loadLogs(logStatus, logPage - 1)}
              className="rounded-full border border-[#CFE6EF] px-3.5 py-1.5 disabled:opacity-40"
            >
              قبلی
            </button>
            <span>صفحه {fa(logPage)} از {fa(logPages)}</span>
            <button
              type="button"
              disabled={logPage >= logPages || logsBusy}
              onClick={() => loadLogs(logStatus, logPage + 1)}
              className="rounded-full border border-[#CFE6EF] px-3.5 py-1.5 disabled:opacity-40"
            >
              بعدی
            </button>
          </div>
        )}
        <p className="mb-0 mt-3 text-center text-[11.5px] font-medium leading-[1.9] text-[#8FA6B0]">
          کدهای تأیید ورود و تأیید سفارش‌دهنده هم از همین مسیر ارسال می‌شوند و در همین گزارش ثبت‌اند.
        </p>
      </section>
    </div>
  );
}
