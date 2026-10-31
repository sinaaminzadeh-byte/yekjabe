"use client";

// ── «پیامک‌ها» tab (A-02 split, owner-only) ──
// Round 44 — بخش پیامک کامل با کنترل بیشتر:
//   ۱) تنظیمات سرویس: کلید API / شمارهٔ فرستنده / شمارهٔ مالک / سوییچ اصلی —
//      همه از خودِ پنل (بدون Vercel و ری‌دیپلوی)، با تست اتصال زنده
//   ۲) ارسال دستی پیامک به هر شماره (ثبت کامل در گزارش)
//   ۳) قالب‌ها: کد پترن ippanel + متن پیش‌فرض قابل ویرایش + ارسال آزمایشی
//   ۴) گزارش: فیلتر وضعیت + جست‌وجوی شماره + فیلتر قالب + خروجی CSV + ارسال دوباره
// متن و تنظیمات در لحظهٔ ارسال از دیتابیس خوانده می‌شوند — هر تغییر بدون
// تغییر کد روی پیامک‌های بعدی اعمال می‌شود.
import { useEffect, useState } from "react";
import { fa, money } from "@/lib/fa";
import { useToast } from "@/hooks/use-toast";
import { StatCard } from "@/components/shop/admin/admin-ui";
import { adminFetch, invalidateAdminCache } from "@/components/shop/admin/admin-cache";

interface SmsSettingsView {
  provider: string;
  apiKeySet: boolean;
  apiKeyHint: string;
  apiKeySource: "panel" | "env" | "none";
  sender: string;
  senderSource: "panel" | "env" | "none";
  enabled: boolean;
  ownerMobile: string;
  ownerMobileSource: "panel" | "env" | "none";
  baseUrl: string;
  baseUrlSource: "panel" | "default";
}

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
  stats: { sent24h: number; sentTotal: number; queued: number; failed: number; dead: number };
  perTemplate: { template: string; sent: number }[];
  settings: SmsSettingsView;
  provider: { ippanel: boolean; sender: string; kavenegar: boolean };
  credit: number | null;
  creditDiag?: { ok: boolean; credit?: number; error?: string };
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
  otp_gift: "کد باز کردن هدیه",
  order_confirm: "ثبت سفارش",
  paid: "تأیید پرداخت",
  receipt_received: "دریافت رسید",
  rejected: "رد رسید",
  cancelled: "لغو سفارش",
  shipped: "تحویل پست",
  delivered: "تحویل گیرنده",
  abandoned_cart: "سبد رهاشده",
  admin_alert: "هشدار مدیریتی",
  custom: "ارسال دستی",
};

const inputCls =
  "h-11 rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3.5 text-[14px] font-bold text-[#04202E] outline-none focus:border-[#00ABE7]";

// ── آدرس‌های اتصال ای‌پنل (مستندات: سرور داخلی/خارجی) ──
// طبق مستندات رسمی دو نسل آدرس وجود دارد؛ پنل‌های مختلف به یکی از این‌ها وصل‌اند.
const SMS_BASE_PRESETS = [
  { id: "edge", url: "https://edge.ippanel.com/v1", title: "لبه (جدید) — پیش‌فرض", sub: "edge.ippanel.com" },
  { id: "api1", url: "https://api.ippanel.com/api/v1", title: "کلاسیک — آدرس ۱", sub: "api.ippanel.com (سرور داخلی)" },
  { id: "api2", url: "https://api2.ippanel.com/api/v1", title: "کلاسیک — آدرس ۲", sub: "api2.ippanel.com (سرور خارجی)" },
] as const;

function basePresetId(url: string): string {
  const p = SMS_BASE_PRESETS.find((x) => x.url === url);
  return p ? p.id : url ? "custom" : "edge";
}

export function SmsTab() {
  const [data, setData] = useState<SmsData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  // draft edits per template key
  const [edits, setEdits] = useState<Record<string, { patternCode: string; fallbackText: string; variables: Record<string, string>; enabled: boolean }>>({});
  const [saving, setSaving] = useState("");
  const [testing, setTesting] = useState("");
  const [testPhone, setTestPhone] = useState("");

  // ── تنظیمات سرویس (پنلی) ──
  const [settings, setSettings] = useState<SmsSettingsView | null>(null);
  const [formSender, setFormSender] = useState("");
  const [formOwner, setFormOwner] = useState("");
  const [formBaseId, setFormBaseId] = useState("edge");
  const [formCustomBase, setFormCustomBase] = useState("");
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [probing, setProbing] = useState(false);
  const [probeResult, setProbeResult] = useState<{ ok: boolean; credit?: number; error?: string } | null>(null);

  // ── ارسال دستی ──
  const [manualPhone, setManualPhone] = useState("");
  const [manualText, setManualText] = useState("");
  const [manualBusy, setManualBusy] = useState(false);

  // ── گزارش ──
  const [logs, setLogs] = useState<SmsLogRow[]>([]);
  const [logStatus, setLogStatus] = useState("");
  const [logQ, setLogQ] = useState("");
  const [logTemplate, setLogTemplate] = useState("");
  const [logPage, setLogPage] = useState(1);
  const [logPages, setLogPages] = useState(1);
  const [logTotal, setLogTotal] = useState(0);
  const [logsBusy, setLogsBusy] = useState(false);
  const [exporting, setExporting] = useState(false);

  const load = (fresh = false) => {
    adminFetch<SmsData>("/api/admin/sms", { fresh })
      .then((j) => {
        setData(j);
        applySettings(j.settings);
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

  const applySettings = (s: SmsSettingsView) => {
    setSettings(s);
    setFormSender(s.sender);
    setFormOwner(s.ownerMobile);
    const pid = basePresetId(s.baseUrl);
    setFormBaseId(pid);
    setFormCustomBase(pid === "custom" ? s.baseUrl : "");
    setApiKeyInput("");
    setShowKeyInput(!s.apiKeySet);
  };

  /** آدرسِ انتخاب‌شدهٔ فرم — برای تست و ذخیره (کاندیدای هنوز ذخیره‌نشده هم) */
  const candidateBaseUrl = (): string => {
    if (formBaseId === "custom") return formCustomBase.trim();
    return SMS_BASE_PRESETS.find((x) => x.id === formBaseId)?.url ?? "";
  };

  const loadLogs = (status = logStatus, page = 1, q = logQ, template = logTemplate) => {
    setLogsBusy(true);
    const params = new URLSearchParams({ status, page: String(page) });
    if (q.trim()) params.set("q", q.trim());
    if (template) params.set("template", template);
    adminFetch<{ logs?: SmsLogRow[]; page?: number; pages?: number; total?: number }>(`/api/admin/sms/logs?${params.toString()}`)
      .then((j) => {
        if (j) {
          setLogs(j.logs ?? []);
          setLogPage(j.page ?? 1);
          setLogPages(j.pages ?? 1);
          setLogTotal(j.total ?? 0);
        }
      })
      .catch(() => {})
      .finally(() => setLogsBusy(false));
  };

  useEffect(() => {
    load();
  }, []);

  // فیلترها با تأخیر کوتاه (تایپ شماره نباید برای هر حرف یک درخواست بزند)
  useEffect(() => {
    const t = setTimeout(() => loadLogs(logStatus, 1, logQ, logTemplate), 350);
    return () => clearTimeout(t);
  }, [logStatus, logQ, logTemplate]);

  // ── ذخیرهٔ تنظیمات سرویس ──
  const putSettings = async (payload: Record<string, unknown>, okTitle: string) => {
    setSavingSettings(true);
    try {
      const res = await fetch("/api/admin/sms/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const b = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        details?: { message?: string };
        settings?: SmsSettingsView;
        connectionTest?: { ok: boolean; credit?: number; error?: string };
      };
      if (!res.ok || !b.ok) {
        toast({
          title: "ذخیره نشد",
          description:
            b.error === "owner_only"
              ? "این کار فقط با حساب مالک انجام می‌شه."
              : (b.details?.message ?? "خطای سرور — دوباره تلاش کن."),
        });
        return null;
      }
      if (b.settings) applySettings(b.settings);
      invalidateAdminCache();
      load(true);
      const ct = b.connectionTest;
      toast({
        title: okTitle,
        description: ct
          ? ct.ok
            ? `تست اتصال: وصل است ✓ اعتبار پنل ${money(Math.floor(ct.credit ?? 0))}`
            : `تست اتصال: ${ct.error ?? "نامشخص"}`
          : undefined,
      });
      return b;
    } catch {
      toast({ title: "ذخیره نشد — دوباره تلاش کن" });
      return null;
    } finally {
      setSavingSettings(false);
    }
  };

  const saveGeneral = () => putSettings({ sender: formSender, ownerMobile: formOwner }, "تنظیمات ذخیره شد ✓");

  const saveBaseUrl = () => {
    const url = candidateBaseUrl();
    if (formBaseId === "custom" && !url) {
      toast({ title: "آدرس سفارشی را وارد کن", description: "باید با https:// شروع شود." });
      return;
    }
    void putSettings({ baseUrl: url }, "آدرس سرویس ذخیره شد ✓");
  };

  const saveApiKey = () => {
    if (!apiKeyInput.trim()) {
      toast({ title: "کلید API را وارد کن", description: "کلید را از پنل ippanel بخش API Keys بردار." });
      return;
    }
    void putSettings({ apiKey: apiKeyInput.trim() }, "کلید API ذخیره شد ✓");
  };

  const clearApiKey = () => void putSettings({ apiKey: "" }, "کلید API پاک شد");

  const toggleEnabled = () => {
    if (!settings) return;
    void putSettings({ enabled: !settings.enabled }, settings.enabled ? "سرویس پیامک خاموش شد" : "سرویس پیامک روشن شد ✓");
  };

  const probeConnection = async () => {
    setProbing(true);
    setProbeResult(null);
    try {
      const res = await fetch("/api/admin/sms/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "connection_test",
          apiKey: apiKeyInput.trim() || undefined,
          baseUrl: candidateBaseUrl() || undefined,
        }),
      });
      const b = (await res.json().catch(() => ({}))) as { ok?: boolean; credit?: number; error?: string };
      setProbeResult({ ok: Boolean(b.ok), credit: b.credit, error: b.error });
    } catch {
      setProbeResult({ ok: false, error: "ارتباط با سرور برقرار نشد" });
    } finally {
      setProbing(false);
    }
  };

  // ── ارسال دستی ──
  const sendManual = async () => {
    if (!manualPhone.trim() || !manualText.trim()) {
      toast({ title: "شماره و متن پیام را کامل کن" });
      return;
    }
    setManualBusy(true);
    try {
      const res = await fetch("/api/admin/sms/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send_custom", phone: manualPhone.trim(), text: manualText.trim() }),
      });
      const b = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; details?: { message?: string } };
      if (!res.ok || !b.ok) {
        toast({
          title: "ارسال نشد",
          description:
            b.error === "invalid_phone"
              ? "شماره موبایل معتبر نیست."
              : (b.details?.message ?? b.error ?? "خطای سرور یا سرویس‌دهنده — گزارش را ببین."),
        });
        loadLogs();
        return;
      }
      toast({ title: "پیامک ارسال شد ✓", description: "در گزارش ارسال‌ها ثبت شد." });
      setManualText("");
      setManualPhone("");
      invalidateAdminCache();
      loadLogs();
      load(true);
    } catch {
      toast({ title: "ارسال نشد — دوباره تلاش کن" });
    } finally {
      setManualBusy(false);
    }
  };

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
        loadLogs();
        return;
      }
      toast({
        title: "پیامک آزمایشی رفت ✓",
        description: b.mode === "pattern" ? `با پترن: ${b.preview ?? ""}` : (b.preview ?? "با متن ساده"),
      });
      loadLogs();
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
      const b = (await res.json().catch(() => ({}))) as { ok?: boolean; sent?: number; failed?: number; dead?: number; paused?: boolean };
      toast({
        title: b.ok && b.paused ? "سرویس خاموش است — صف مکث کرده" : b.ok ? "صف پیامک تخلیه شد ✓" : "تخلیه‌ی صف نشد",
        description: b.ok && !b.paused ? `ارسال‌شده: ${fa(b.sent ?? 0)} — ناموفق: ${fa(b.failed ?? 0)} — مردود: ${fa(b.dead ?? 0)}` : b.paused ? "برای ادامه، سوییچ سرویس را روشن کن." : undefined,
      });
      invalidateAdminCache();
      loadLogs();
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
      toast({ title: b.ok && (b.sent ?? 0) > 0 ? "دوباره ارسال شد ✓" : "در صف ارسال دوباره قرار گرفت" });
      invalidateAdminCache();
      loadLogs(logStatus, logPage, logQ, logTemplate);
      load(true);
    } catch {
      toast({ title: "ارسال دوباره نشد" });
    } finally {
      setLogsBusy(false);
    }
  };

  const exportCsv = async () => {
    setExporting(true);
    try {
      const params = new URLSearchParams({ status: logStatus, export: "1" });
      if (logQ.trim()) params.set("q", logQ.trim());
      if (logTemplate) params.set("template", logTemplate);
      const j = await adminFetch<{ logs?: SmsLogRow[] }>(`/api/admin/sms/logs?${params.toString()}`, { fresh: true });
      const rows = j?.logs ?? [];
      const head = ["phone", "template", "status", "provider", "created_at", "sent_at", "error"];
      const esc = (v: string) => `"${String(v ?? "").replace(/"/g, '""')}"`;
      const lines = [head.join(",")];
      for (const r of rows) {
        lines.push(
          [
            r.phone,
            r.template,
            r.status,
            r.provider,
            r.createdAt,
            r.sentAt ?? "",
            r.error,
          ]
            .map(esc)
            .join(","),
        );
      }
      const blob = new Blob([`\uFEFF${lines.join("\n")}`], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `sms-log-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: `خروجی CSV آماده شد (${fa(rows.length)} ردیف)` });
    } catch {
      toast({ title: "خروجی CSV نشد — دوباره تلاش کن" });
    } finally {
      setExporting(false);
    }
  };

  if (loading || !data || !settings) {
    return <div className="rounded-[22px] bg-white px-5 py-6 text-center text-[13px] font-bold text-[#4A6572]">در حال بارگذاری…</div>;
  }

  const perTemplateMap = new Map(data.perTemplate.map((p) => [p.template, p.sent]));
  const placeholdersOf = (text: string, vars: Record<string, string>): [string, string][] => {
    const found = new Set<string>(Object.keys(vars));
    for (const m of text.matchAll(/\{(\w+)\}/g)) found.add(m[1]);
    return [...found].map((k) => [k, vars[k] ?? k]);
  };
  const sourceChip = (src: "panel" | "env" | "none") =>
    src === "panel" ? (
      <span className="rounded-lg bg-[#E3F6FD] px-2 py-0.5 text-[10px] font-extrabold text-[#006387]">پنلی</span>
    ) : src === "env" ? (
      <span className="rounded-lg bg-[#FFF3C9] px-2 py-0.5 text-[10px] font-extrabold text-[#7A5C00]">متغیر محیطی</span>
    ) : null;

  return (
    <div className="flex flex-col gap-4">
      {/* سوییچ اصلی + آمار */}
      <section className="rounded-[24px] border border-[#DDEEF5] bg-white p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="m-0 text-[16px] font-black text-[#04202E]">سرویس پیامک</h2>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="rounded-full px-3 py-1.5 text-[11.5px] font-extrabold"
              style={{ background: settings.apiKeySet ? "#E7F8EF" : "#FFE9F0", color: settings.apiKeySet ? "#1E7A46" : "#B02A52" }}
            >
              {settings.apiKeySet ? `کلید API ذخیره است ${settings.apiKeyHint}` : "کلید API تنظیم نشده"}
            </span>
            <button
              type="button"
              onClick={() => void toggleEnabled()}
              disabled={savingSettings}
              aria-pressed={settings.enabled}
              className="flex h-9 items-center gap-2 rounded-full px-1.5 pe-4 text-[12px] font-extrabold transition-colors disabled:opacity-50"
              style={{ background: settings.enabled ? "#E7F8EF" : "#F0F3F5", color: settings.enabled ? "#1E7A46" : "#5B7482" }}
            >
              <span className="relative flex h-6 w-11 items-center rounded-full transition-colors" style={{ background: settings.enabled ? "#2E9E63" : "#C6D2D8" }}>
                <span className="absolute h-5 w-5 rounded-full bg-white shadow transition-all" style={{ [settings.enabled ? "right" : "left"]: "2px" }} />
              </span>
              {settings.enabled ? "سرویس فعال" : "سرویس خاموش"}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          <StatCard n={fa(data.stats.sentTotal)} label="کل ارسال‌شده" bg="#E7F8EF" />
          <StatCard n={fa(data.stats.sent24h)} label="ارسال ۲۴ ساعت اخیر" bg="#E3F6FD" />
          <StatCard n={fa(data.stats.queued)} label="در صف ارسال" bg="#F0F3F5" />
          <StatCard n={fa(data.stats.failed)} label="ناموفق (تلاش دوباره)" bg="#FFF3C9" />
          <StatCard n={fa(data.stats.dead)} label="مردود (رد شد)" bg="#FFE9F0" />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[12px] font-semibold text-[#4A6572]">
          {data.credit !== null && <span>اعتبار پنل: <b className="text-[#04202E]">{money(Math.floor(data.credit))}</b></span>}
          {data.creditDiag && !data.creditDiag.ok && (
            <span className="rounded-full bg-[#FFF3C9] px-2.5 py-1 text-[11px] font-extrabold text-[#7A5C00]" dir="auto">
              وضعیت اتصال: ✗ {data.creditDiag.error ?? "نامشخص"}
            </span>
          )}
          {data.creditDiag?.ok && (
            <span className="rounded-full bg-[#E7F8EF] px-2.5 py-1 text-[11px] font-extrabold text-[#1E7A46]">وضعیت اتصال: ✓ وصل است</span>
          )}
          {settings.sender && <span>شماره فرستنده: <b dir="ltr" className="text-[#04202E]">{settings.sender}</b> {sourceChip(settings.senderSource)}</span>}
          {settings.ownerMobile && <span>هشدار مدیریتی به: <b dir="ltr" className="text-[#04202E]">{settings.ownerMobile}</b> {sourceChip(settings.ownerMobileSource)}</span>}
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
              className={`${inputCls} w-[180px]`}
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

      {/* تنظیمات سرویس — کلید API / فرستنده / مالک */}
      <section className="rounded-[24px] border border-[#DDEEF5] bg-white p-5">
        <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
          <h2 className="m-0 text-[16px] font-black text-[#04202E]">تنظیمات سرویس پیامک</h2>
          <span className="rounded-full bg-[#F0F3F5] px-3 py-1 text-[11px] font-extrabold text-[#5B7482]">سرویس‌دهنده: پنل پیامکی (فراز / ippanel)</span>
        </div>
        <p className="mb-4 mt-1 text-[12px] font-medium leading-[1.9] text-[#4A6572]">
          این تنظیمات از خود پنل ذخیره می‌شوند و نیازی به محیط استقرار نیست. کلید API را از پنل پیامکی
          (بخش توسعه‌دهندگان ← API Keys) بردار و همین‌جا ذخیره کن؛ بعد از ذخیره، اتصال خودکار تست می‌شود.
          خط ارسال را خالی بگذاری، خط پیش‌فرض پنل استفاده می‌شود.
        </p>

        <div className="flex flex-col gap-4">
          {/* کلید API */}
          <div className="rounded-[20px] border border-[#E3F0F5] bg-[#FBFEFF] p-4">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[13.5px] font-black text-[#04202E]">کلید API</span>
              {settings.apiKeySet ? (
                <span className="flex items-center gap-2">
                  <span dir="ltr" className="rounded-lg bg-[#E7F8EF] px-2.5 py-1 text-[11px] font-extrabold text-[#1E7A46]">ذخیره شده {settings.apiKeyHint}</span>
                  {sourceChip(settings.apiKeySource)}
                </span>
              ) : (
                <span className="rounded-lg bg-[#FFE9F0] px-2.5 py-1 text-[11px] font-extrabold text-[#B02A52]">تنظیم نشده — ارسال واقعی انجام نمی‌شود</span>
              )}
            </div>
            {(showKeyInput || !settings.apiKeySet) && (
              <div className="flex flex-wrap items-center gap-2">
                <input
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  dir="ltr"
                  type="password"
                  autoComplete="off"
                  placeholder="کلید API را اینجا بچسبان…"
                  className={`${inputCls} min-w-[260px] flex-1`}
                />
                <button
                  type="button"
                  onClick={() => void saveApiKey()}
                  disabled={savingSettings || !apiKeyInput.trim()}
                  className="h-11 rounded-full bg-[#04202E] px-5 text-[12.5px] font-extrabold text-white disabled:opacity-40"
                >
                  ذخیره کلید
                </button>
              </div>
            )}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {settings.apiKeySet && (
                <>
                  <button
                    type="button"
                    onClick={() => setShowKeyInput((v) => !v)}
                    className="h-9 rounded-full border-[1.5px] border-[#CFE6EF] bg-white px-3.5 text-[11.5px] font-extrabold text-[#006387]"
                  >
                    {showKeyInput ? "بستن" : "تعویض کلید"}
                  </button>
                  <button
                    type="button"
                    onClick={() => void clearApiKey()}
                    disabled={savingSettings}
                    className="h-9 rounded-full border-[1.5px] border-[#F3C6D4] bg-white px-3.5 text-[11.5px] font-extrabold text-[#B02A52] disabled:opacity-50"
                  >
                    پاک کردن کلید
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => void probeConnection()}
                disabled={probing}
                className="h-9 rounded-full border-[1.5px] border-[#00ABE7] bg-white px-3.5 text-[11.5px] font-extrabold text-[#006387] disabled:opacity-50"
              >
                {probing ? "در حال تست…" : "تست اتصال و اعتبار"}
              </button>
              {probeResult && (
                <span
                  className="rounded-full px-3 py-1.5 text-[11px] font-extrabold"
                  dir="auto"
                  style={{ background: probeResult.ok ? "#E7F8EF" : "#FFE9F0", color: probeResult.ok ? "#1E7A46" : "#B02A52" }}
                >
                  {probeResult.ok ? `وصل است ✓ اعتبار: ${money(Math.floor(probeResult.credit ?? 0))}` : `ناموفق: ${probeResult.error ?? "نامشخص"}`}
                </span>
              )}
            </div>
          </div>

          {/* آدرس اتصال سرویس — سرور داخلی/خارجی مستندات ای‌پنل */}
          <div className="rounded-[20px] border border-[#E3F0F5] bg-[#FBFEFF] p-4">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[13.5px] font-black text-[#04202E]">آدرس اتصال سرویس</span>
              {settings.baseUrlSource === "panel" ? (
                <span className="rounded-lg bg-[#E7F8EF] px-2.5 py-1 text-[11px] font-extrabold text-[#1E7A46]">ذخیره شده — سفارشی</span>
              ) : (
                <span className="rounded-lg bg-[#E3F6FD] px-2.5 py-1 text-[11px] font-extrabold text-[#006387]">پیش‌فرض (لبه)</span>
              )}
            </div>
            <p className="mb-3 text-[11.5px] font-medium leading-[1.9] text-[#4A6572]">
              طبق مستندات ای‌پنل، اتصال دو آدرس دارد و مربوط به سرور داخلی و خارجی است — پنل شما به یکی از این‌ها وصل است.
              اگر ارسال یا تست اتصال خطای ۵۰x داد، آدرس دیگر را انتخاب و تست کن.{" "}
              <a href="https://ippanel.com/developers/documents" target="_blank" rel="noreferrer" className="font-extrabold text-[#006387] underline">
                مستندات رسمی
              </a>
            </p>
            <div className="flex flex-col gap-2" role="radiogroup" aria-label="آدرس اتصال سرویس پیامک">
              {SMS_BASE_PRESETS.map((p) => {
                const active = formBaseId === p.id;
                const isCurrent = settings.baseUrl === p.url;
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setFormBaseId(p.id)}
                    className={`flex items-center justify-between gap-2 rounded-2xl border-[1.5px] px-4 py-2.5 text-right transition-colors ${
                      active ? "border-[#00ABE7] bg-[#E3F6FD]" : "border-[#DDEEF5] bg-white hover:border-[#B7DCEB]"
                    }`}
                  >
                    <span className="flex flex-col">
                      <span className={`text-[12.5px] font-black ${active ? "text-[#006387]" : "text-[#04202E]"}`}>{p.title}</span>
                      <span dir="ltr" className="text-[10.5px] font-bold text-[#8FA6B0]">{p.sub}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      {isCurrent && <span className="rounded-full bg-[#E7F8EF] px-2 py-0.5 text-[10px] font-extrabold text-[#1E7A46]">فعلی</span>}
                      <span className={`inline-block h-4 w-4 rounded-full border-[2px] ${active ? "border-[#00ABE7] bg-[#00ABE7]" : "border-[#CFE6EF] bg-white"}`} />
                    </span>
                  </button>
                );
              })}
              <button
                type="button"
                role="radio"
                aria-checked={formBaseId === "custom"}
                onClick={() => setFormBaseId("custom")}
                className={`flex items-center justify-between gap-2 rounded-2xl border-[1.5px] px-4 py-2.5 text-right transition-colors ${
                  formBaseId === "custom" ? "border-[#00ABE7] bg-[#E3F6FD]" : "border-[#DDEEF5] bg-white hover:border-[#B7DCEB]"
                }`}
              >
                <span className="text-[12.5px] font-black text-[#04202E]">سفارشی…</span>
                <span className={`inline-block h-4 w-4 rounded-full border-[2px] ${formBaseId === "custom" ? "border-[#00ABE7] bg-[#00ABE7]" : "border-[#CFE6EF] bg-white"}`} />
              </button>
              {formBaseId === "custom" && (
                <input
                  value={formCustomBase}
                  onChange={(e) => setFormCustomBase(e.target.value)}
                  dir="ltr"
                  placeholder="https://…/api/v1"
                  className={inputCls}
                  aria-label="آدرس سفارشی سرویس"
                />
              )}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => void saveBaseUrl()}
                disabled={savingSettings || candidateBaseUrl() === settings.baseUrl}
                className="h-10 rounded-full bg-[#04202E] px-5 text-[12px] font-extrabold text-white disabled:opacity-40"
              >
                ذخیرهٔ آدرس سرویس
              </button>
              <span className="text-[10.5px] font-medium text-[#8FA6B0]">
                ذخیره بلافاصله «تست اتصال» را روی همین آدرس اجرا می‌کند — یا با دکمهٔ تستِ بالا، آدرسِ انتخابی را قبل از ذخیره بسنج.
              </span>
            </div>
          </div>

          {/* فرستنده و مالک */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-[12px] font-bold text-[#4A6572]">
              شمارهٔ فرستنده (خط ارسال)
              <div className="flex items-center gap-2">
                <input
                  value={formSender}
                  onChange={(e) => setFormSender(e.target.value)}
                  dir="ltr"
                  inputMode="numeric"
                  placeholder="مثلاً 3000505 یا 09123456789"
                  className={`${inputCls} flex-1`}
                />
                {sourceChip(settings.senderSource)}
              </div>
              <span className="text-[10.5px] font-medium text-[#8FA6B0]">خالی ⇒ خط پیش‌فرض پنل پیامکی استفاده می‌شود.</span>
            </label>
            <label className="flex flex-col gap-1.5 text-[12px] font-bold text-[#4A6572]">
              شمارهٔ موبایل مالک (هشدارهای مدیریتی)
              <div className="flex items-center gap-2">
                <input
                  value={formOwner}
                  onChange={(e) => setFormOwner(e.target.value)}
                  dir="ltr"
                  inputMode="numeric"
                  placeholder="09xxxxxxxxx"
                  className={`${inputCls} flex-1`}
                />
                {sourceChip(settings.ownerMobileSource)}
              </div>
              <span className="text-[10.5px] font-medium text-[#8FA6B0]">هشدارهای داخلی (مثل کمبود موجودی) به این شماره می‌رود.</span>
            </label>
          </div>
          <div>
            <button
              type="button"
              onClick={() => void saveGeneral()}
              disabled={savingSettings || (formSender === settings.sender && formOwner === settings.ownerMobile)}
              className="h-11 rounded-full bg-[#04202E] px-5 text-[12.5px] font-extrabold text-white disabled:opacity-40"
            >
              {savingSettings ? "در حال ذخیره…" : "ذخیره تنظیمات"}
            </button>
          </div>
        </div>
      </section>

      {/* ارسال دستی */}
      <section className="rounded-[24px] border border-[#DDEEF5] bg-white p-5">
        <h2 className="m-0 text-[16px] font-black text-[#04202E]">ارسال دستی پیامک</h2>
        <p className="mb-3 mt-1 text-[12px] font-medium leading-[1.9] text-[#4A6572]">
          پیام دلخواه به یک شماره — مثلاً اطلاع‌رسانی ویژه. ارسال در گزارش ثبت می‌شود.
        </p>
        <div className="flex flex-col gap-3 md:flex-row md:items-start">
          <input
            value={manualPhone}
            onChange={(e) => setManualPhone(e.target.value)}
            dir="ltr"
            inputMode="numeric"
            placeholder="09xxxxxxxxx"
            className={`${inputCls} md:w-[200px]`}
            aria-label="شماره گیرنده پیام دستی"
          />
          <div className="flex-1">
            <textarea
              value={manualText}
              onChange={(e) => setManualText(e.target.value)}
              rows={2}
              maxLength={265}
              placeholder="متن پیامک…"
              className="w-full resize-none rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3.5 py-2.5 text-[13.5px] font-semibold leading-[1.9] text-[#04202E] outline-none focus:border-[#00ABE7]"
              aria-label="متن پیام دستی"
            />
            <div className="mt-1 text-[10.5px] font-bold" style={{ color: manualText.length > 265 ? "#B02A52" : "#8FA6B0" }}>
              {fa(manualText.length)} / {fa(265)} کاراکتر
            </div>
          </div>
          <button
            type="button"
            onClick={() => void sendManual()}
            disabled={manualBusy || !manualPhone.trim() || !manualText.trim()}
            className="h-11 shrink-0 rounded-full bg-[#00ABE7] px-5 text-[12.5px] font-extrabold text-white disabled:opacity-40"
          >
            {manualBusy ? "در حال ارسال…" : "ارسال"}
          </button>
        </div>
      </section>

      {/* قالب‌ها */}
      <section className="rounded-[24px] border border-[#DDEEF5] bg-white p-5">
        <h2 className="m-0 text-[16px] font-black text-[#04202E]">قالب‌های پیامک</h2>
        <p className="mb-4 mt-1.5 text-[12px] font-medium leading-[1.9] text-[#4A6572]">
          متن پیش‌فرض هر پیامک همین‌جاست. اگر «کد پترن» بدهی، پیامک با همان پترنِ تعریف‌شده در پنل پیامکی ارسال می‌شود
          (سریع‌تر) و فقط نام متغیرها مهم است؛ اگر پترن خالی بماند، متنِ همین فرم ارسال می‌شود. ارسال‌ها بر اساس
          تنظیم همین لحظه است — برای اعمال، نیازی به تغییر کد نیست.
        </p>
        <div className="flex flex-col gap-3">
          {data.templates.map((t) => {
            const e = edits[t.key] ?? { patternCode: t.patternCode, fallbackText: t.fallbackText, variables: t.variables, enabled: t.enabled };
            const vars = placeholdersOf(e.fallbackText, e.variables);
            const sentCount = perTemplateMap.get(t.key) ?? 0;
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
                    {sentCount > 0 && (
                      <span className="rounded-full bg-[#E3F6FD] px-2.5 py-0.5 text-[10.5px] font-extrabold text-[#006387]">
                        {fa(sentCount)} ارسال موفق
                      </span>
                    )}
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
                    کد پترن (اختیاری)
                    <input
                      value={e.patternCode}
                      onChange={(ev) => setEdits((p) => ({ ...p, [t.key]: { ...e, patternCode: ev.target.value } }))}
                      dir="ltr"
                      placeholder="مثلاً 4xk9qz1mje"
                      className="h-11 rounded-2xl border-[1.5px] border-[#CFE6EF] bg-white px-3.5 text-[13.5px] font-bold text-[#04202E] outline-none focus:border-[#00ABE7]"
                    />
                  </label>
                  <div className="flex flex-1 flex-col gap-1.5 text-[12px] font-bold text-[#4A6572]">
                    نام متغیرهای پترن در پنل
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
          <h2 className="m-0 text-[16px] font-black text-[#04202E]">
            گزارش ارسال‌ها
            <span className="ms-2 text-[12px] font-bold text-[#8FA6B0]">{fa(logTotal)} ردیف</span>
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <input
              value={logQ}
              onChange={(e) => setLogQ(e.target.value)}
              dir="ltr"
              inputMode="numeric"
              placeholder="جست‌وجوی شماره…"
              className="h-9 w-[170px] rounded-full border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3.5 text-[12px] font-bold text-[#04202E] outline-none focus:border-[#00ABE7]"
              aria-label="جست‌وجوی شماره در گزارش"
            />
            <select
              value={logTemplate}
              onChange={(e) => setLogTemplate(e.target.value)}
              className="h-9 rounded-full border-[1.5px] border-[#CFE6EF] bg-white px-3 text-[11.5px] font-extrabold text-[#006387] outline-none focus:border-[#00ABE7]"
              aria-label="فیلتر قالب"
            >
              <option value="">همهٔ قالب‌ها</option>
              {Object.entries(SMS_TEMPLATE_LABEL).map(([k, label]) => (
                <option key={k} value={k}>{label}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => void exportCsv()}
              disabled={exporting}
              className="rounded-full border border-[#CFE6EF] px-3.5 py-1.5 text-[11.5px] font-extrabold text-[#006387] disabled:opacity-50"
            >
              {exporting ? "…" : "خروجی CSV"}
            </button>
          </div>
        </div>
        <div className="mb-3 flex flex-wrap items-center gap-2">
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
            onClick={() => loadLogs()}
            disabled={logsBusy}
            className="rounded-full border border-[#CFE6EF] px-3.5 py-1.5 text-[11.5px] font-extrabold text-[#006387] disabled:opacity-50"
          >
            به‌روزرسانی
          </button>
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
