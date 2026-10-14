"use client";

// ═══ پنل همکاران — Phase B admin console (guide §B3/§B6) ═══
// Tabs: سفارش‌ها (transitions via /api/admin/orders/{id}/transition),
// رسیدها (manual receipt queue approve/reject), نظرها (reviews moderation).
// Gated behind AdminUser OTP (pn_admin cookie, guide A7).
import { useEffect, useMemo, useState } from "react";
import { navigate } from "@/lib/hash-route";
import { Plush } from "@/components/shop/plush";
import { ForwardIcon } from "@/components/shop/icons";
import { PLUSH_MAP, OCCASIONS, type PlushKind } from "@/lib/pishnam-data";
import { fa, faPrice, money } from "@/lib/fa";
import { MobileTopBar } from "@/components/shop/nav";
import { useToast } from "@/hooks/use-toast";
import { TRANSITIONS, STEP_LABELS, type OrderStatus } from "@/lib/orders/status";

const STATUS_LABEL: Record<string, { label: string; bg: string }> = {
  awaiting_payment: { label: "در انتظار پرداخت", bg: "#F0F3F5" },
  payment_under_review: { label: "رسید در بررسی", bg: "#FFF3C9" },
  paid: { label: "پرداخت شد", bg: "#FFF3C9" },
  preparing: { label: "بسته‌بندی", bg: "#FFE0EA" },
  shipped: { label: "در راه", bg: "#CDEFFB" },
  delivered: { label: "تحویل شد", bg: "#D7F5E4" },
  failed: { label: "پرداخت ناموفق", bg: "#FFE9F0" },
  cancelled: { label: "لغو شد", bg: "#FFE9F0" },
  expired: { label: "منقضی شد", bg: "#F0F3F5" },
  refund_requested: { label: "درخواست مرجوعی", bg: "#E7E0FA" },
  refunded: { label: "مرجوع شد", bg: "#E7E0FA" },
};

const NEXT_ACTION: Record<string, string> = {
  paid: "شروع بسته‌بندی",
  preparing: "تحویل به پست",
  shipped: "تحویل داده شد",
  delivered: "",
};

// ── admin gate — OTP + server-side admin session (guide A7: PIN killed) ──
const UNLOCK_KEY = "pishnam-admin-ok";

function toEnDigits(s: string): string {
  return s.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
}

function AdminOtpGate({ onOk }: { onOk: () => void }) {
  const [mode, setMode] = useState<"otp" | "password">("otp");
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const fail = (msg?: string) => {
    setErrMsg(msg ?? "");
    setErr(true);
    setTimeout(() => setErr(false), 1200);
  };

  const sendCode = async () => {
    const p = toEnDigits(phone.trim());
    if (!/^09\d{9}$/.test(p)) {
      fail();
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/auth/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: p }),
      });
      if (!res.ok) throw new Error("request failed");
      setStep("code");
    } catch {
      fail();
    }
    setBusy(false);
  };

  const submit = async () => {
    const p = toEnDigits(phone.trim());
    const c = toEnDigits(code.trim());
    if (!/^09\d{9}$/.test(p) || !/^\d{6}$/.test(c)) {
      fail();
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: p, code: c }),
      });
      const json = (await res.json()) as { ok?: boolean; admin?: boolean };
      if (res.ok && json.ok && json.admin) {
        try {
          sessionStorage.setItem(UNLOCK_KEY, "1");
        } catch {}
        onOk();
        return;
      }
      fail();
    } catch {
      fail();
    }
    setBusy(false);
  };

  // ورود با رمز — مسیر دوم (فوتر: «ورود مدیر»). سرور رمز را constant-time مقایسه می‌کند.
  const submitPassword = async () => {
    if (password.trim().length < 4) {
      fail();
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (res.ok && json.ok) {
        try {
          sessionStorage.setItem(UNLOCK_KEY, "1");
        } catch {}
        onOk();
        return;
      }
      fail(json.error === "rate_limited" ? "چند بار اشتباه زدی؛ ۱۵ دقیقه صبر کن." : "رمز درست نیست.");
    } catch {
      fail();
    }
    setBusy(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F2FAFD] px-5">
      <div className="pishnam-reveal flex w-full max-w-[380px] flex-col items-center gap-4 rounded-[28px] border border-[#DDEEF5] bg-white p-7 text-center shadow-[0_14px_34px_rgba(4,32,46,0.06)]">
        <span className="flex h-[74px] w-[74px] items-center justify-center rounded-full bg-[#E3F6FD]">
          <Plush kind="bear" size={52} />
        </span>
        <div className="flex flex-col gap-1.5">
          <h1 className="m-0 text-[22px] font-black">پنل همکاران</h1>
          <p className="m-0 text-[13.5px] font-medium leading-[1.9] text-[#4A6572]">
            {mode === "password"
              ? "رمز پنل رو بزن (فایل .env سرور: ADMIN_PANEL_PASSWORD)."
              : step === "phone"
                ? "با شماره‌ی موبایلِ همکاریت کد ورود بگیر."
                : "کد ۶ رقمی پیامک‌شده رو بزن."}
          </p>
        </div>
        {mode === "password" ? (
          <input
            type="password"
            dir="ltr"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !busy && void submitPassword()}
            placeholder="••••••••"
            aria-label="رمز پنل مدیریت"
            className={`h-[54px] w-full rounded-[18px] border-2 bg-white text-center text-[16px] font-black tracking-[0.2em] text-[#04202E] outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(0,171,231,0.15)] ${
              err ? "pishnam-shake border-[#F0426B]" : "border-[#04202E]"
            }`}
          />
        ) : step === "phone" ? (
          <input
            type="tel"
            inputMode="numeric"
            dir="ltr"
            maxLength={11}
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/[^\d۰-۹]/g, "").slice(0, 11))}
            onKeyDown={(e) => e.key === "Enter" && !busy && void sendCode()}
            placeholder="09xxxxxxxxx"
            aria-label="شماره موبایل همکاری"
            className={`h-[54px] w-full rounded-[18px] border-2 bg-white text-center text-[18px] font-black text-[#04202E] outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(0,171,231,0.15)] ${
              err ? "pishnam-shake border-[#F0426B]" : "border-[#04202E]"
            }`}
          />
        ) : (
          <input
            type="password"
            inputMode="numeric"
            dir="ltr"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/[^\d۰-۹]/g, "").slice(0, 6))}
            onKeyDown={(e) => e.key === "Enter" && !busy && void submit()}
            placeholder="••••••"
            aria-label="کد ورود شش‌رقمی"
            className={`h-[54px] w-full rounded-[18px] border-2 bg-white text-center text-[20px] font-black tracking-[0.4em] text-[#04202E] outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(0,171,231,0.15)] ${
              err ? "pishnam-shake border-[#F0426B]" : "border-[#04202E]"
            }`}
          />
        )}
        {err && (
          <span className="text-[12.5px] font-bold text-[#F0426B]">
            {errMsg ||
              (mode === "password"
                ? "رمز درست نیست."
                : step === "phone"
                  ? "شماره درست نیست یا سرویس در دسترس نیست."
                  : "کد درست نیست یا منقضی شده.")}
          </span>
        )}
        <button
          type="button"
          disabled={busy}
          onClick={() =>
            mode === "password" ? void submitPassword() : step === "phone" ? void sendCode() : void submit()
          }
          className="flex h-[52px] w-full items-center justify-center rounded-full bg-[#00ABE7] text-[16px] font-extrabold text-[#04202E] transition-transform active:scale-95 disabled:opacity-60"
        >
          {mode === "password" ? "ورود با رمز" : step === "phone" ? "دریافت کد ورود" : "ورود به پنل"}
        </button>
        {mode === "otp" && step === "code" && (
          <button
            type="button"
            onClick={() => {
              setStep("phone");
              setCode("");
              setErr(false);
            }}
            className="text-[12.5px] font-bold text-[#4A6572] underline"
          >
            تغییر شماره
          </button>
        )}
        <div className="flex items-center gap-2 text-[12px] font-bold text-[#4A6572]">
          <span className="h-px w-8 bg-[#CFE6EF]" aria-hidden="true" />
          یا
          <span className="h-px w-8 bg-[#CFE6EF]" aria-hidden="true" />
        </div>
        <button
          type="button"
          onClick={() => {
            setMode(mode === "otp" ? "password" : "otp");
            setErr(false);
            setErrMsg("");
          }}
          className="text-[12.5px] font-extrabold text-[#006387] underline underline-offset-4"
        >
          {mode === "otp" ? "ورود با رمز عبور" : "ورود با کد پیامکی"}
        </button>
        <span className="rounded-full bg-[#FFF3C9] px-3.5 py-1.5 text-[11.5px] font-extrabold text-[#8A6D1F]">
          فقط شماره‌های ثبت‌شده‌ی همکاری وارد می‌شن
        </span>
      </div>
    </div>
  );
}

function plushOf(kind: string): PlushKind {
  return (PLUSH_MAP[kind as PlushKind] ? kind : "bear") as PlushKind;
}

function StatusChip({ s }: { s: string }) {
  const meta = STATUS_LABEL[s] ?? STATUS_LABEL.awaiting_payment;
  return (
    <span
      className="inline-block shrink-0 rounded-[10px] px-2.5 py-1 text-[11.5px] font-extrabold"
      style={{ background: meta.bg }}
    >
      {meta.label}
    </span>
  );
}

function StatCard({ n, label, bg }: { n: string; label: string; bg: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-[20px] border border-[#DDEEF5] p-4" style={{ background: bg }}>
      <span className="text-[22px] font-black leading-none">{n}</span>
      <span className="text-[12.5px] font-bold text-[#4A6572]">{label}</span>
    </div>
  );
}

// ── server shapes ──
interface AdminOrder {
  id: string;
  code: string;
  status: string;
  paymentMethod: string;
  recipientName: string;
  recipientPhone: string;
  province: string;
  city: string;
  totalToman: number;
  items: string[];
  payment: { method: string; status: string; attemptNo: number } | null;
  giftOpened: boolean;
  createdAt: string;
  expiresAt: string;
}

interface AdminPayment {
  id: string;
  code: string;
  orderStatus: string;
  recipientName: string;
  amountToman: number;
  method: string;
  status: string;
  attemptNo: number;
  paymentAttempts: number;
  hasReceipt: boolean;
  ageMinutes: number;
  createdAt: string;
}

interface AdminReview {
  id: string;
  who: string;
  role: string;
  stars: number;
  kind: string;
  title: string;
  text: string;
  approved: boolean;
  createdAt: string;
}

type Tab = "orders" | "payments" | "reviews" | "stories" | "blog";

export function AdminScreen() {
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem(UNLOCK_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [tab, setTab] = useState<Tab>("orders");

  if (!unlocked) {
    return (
      <div className="flex min-h-screen flex-col bg-[#F2FAFD]">
        <MobileTopBar title="پنل همکاران" back="home" />
        <AdminOtpGate onOk={() => setUnlocked(true)} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F2FAFD]">
      <MobileTopBar title="پنل همکاران" back="home" />
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 pb-24 pt-5 md:px-6 md:pt-8">
        <div className="mb-5 flex flex-col gap-1">
          <h1 className="m-0 text-[26px] font-black md:text-[34px]">دفتر سفارش‌ها</h1>
          <p className="m-0 text-[13.5px] font-medium text-[#4A6572] md:text-[15px]">
            داده‌ی زنده از سرور — سفارش‌ها، رسیدهای کارت‌به‌کارت و نظرها
          </p>
        </div>

        {/* tabs */}
        <div className="no-scrollbar mb-5 flex gap-2 overflow-x-auto">
          {(
            [
              { key: "orders", label: "سفارش‌ها" },
              { key: "payments", label: "رسیدهای کارت‌به‌کارت" },
              { key: "reviews", label: "نظرها" },
              { key: "stories", label: "تجربه‌ها" },
              { key: "blog", label: "بلاگ" },
            ] as { key: Tab; label: string }[]
          ).map((t) => {
            const on = tab === t.key;
            return (
              <button
                key={t.key}
                type="button"
                aria-pressed={on}
                onClick={() => setTab(t.key)}
                className="h-11 shrink-0 rounded-full px-5 text-[13.5px] font-extrabold transition-all"
                style={{
                  background: on ? "#04202E" : "#fff",
                  border: `1.5px solid ${on ? "#04202E" : "#CFE6EF"}`,
                  color: on ? "#fff" : "#04202E",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {tab === "orders" && <OrdersTab />}
        {tab === "payments" && <PaymentsTab />}
        {tab === "reviews" && <ReviewsTab />}
        {tab === "stories" && <StoriesModTab />}
        {tab === "blog" && <BlogTab />}

        <div className="mt-7 flex justify-center">
          <button
            type="button"
            onClick={() => navigate("home")}
            className="flex h-12 items-center gap-2 rounded-full border-2 border-[#04202E] bg-white px-7 text-[14.5px] font-extrabold text-[#04202E] transition-transform hover:scale-[1.02]"
          >
            برگرد به خانه
            <ForwardIcon size={16} />
          </button>
        </div>
      </main>
    </div>
  );
}

/* ═══════════ TAB 1 — ORDERS ═══════════ */
function OrdersTab() {
  const [orders, setOrders] = useState<AdminOrder[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [q, setQ] = useState("");
  const { toast } = useToast();

  const load = (silent = false) => {
    if (!silent) setRefreshing(true);
    fetch("/api/admin/orders", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((j: { orders?: AdminOrder[] }) => {
        setOrders(j.orders ?? []);
        setError(null);
      })
      .catch(() => setError("اتصال به سرور برقرار نشد. دوباره تلاش کن."))
      .finally(() => setRefreshing(false));
  };

  useEffect(() => {
    // deferred one tick so the first paint isn't blocked by the spinner state
    const t = setTimeout(() => load(true), 0);
    return () => clearTimeout(t);
  }, []);

  const transition = async (o: AdminOrder, to: OrderStatus, tracking?: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${o.id}/transition`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, tracking }),
      });
      if (!res.ok) {
        const b = (await res.json().catch(() => ({}))) as { error?: string };
        toast({
          title: "ثبت نشد!",
          description: b.error === "owner_only" ? "این کار فقط با حساب مالک انجام می‌شه." : "خطای سرور — دوباره تلاش کن.",
        });
        return;
      }
      setOrders((prev) => prev?.map((x) => (x.id === o.id ? { ...x, status: to } : x)) ?? prev);
      toast({ title: "وضعیت به‌روز شد ✓", description: `${o.code} → ${STEP_LABELS[to]}` });
    } catch {
      toast({ title: "ثبت روی سرور نشد!", description: "دوباره تلاش کن." });
    }
  };

  const list = useMemo(() => {
    if (!orders) return [];
    const needle = q.trim();
    return orders.filter((o) => {
      if (filter !== "all" && o.status !== filter) return false;
      if (!needle) return true;
      const hay = `${o.code} ${o.recipientName} ${o.recipientPhone} ${o.city} ${o.items.join(" ")}`;
      return hay.includes(needle) || hay.includes(needle.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))));
    });
  }, [orders, filter, q]);

  const stats = useMemo(() => {
    const all = orders ?? [];
    const paidLike = all.filter((o) => ["paid", "preparing", "shipped", "delivered", "refund_requested", "refunded"].includes(o.status));
    return {
      count: all.length,
      revenue: paidLike.reduce((a, o) => a + o.totalToman, 0),
      pendingReview: all.filter((o) => o.status === "payment_under_review").length,
      delivered: all.filter((o) => o.status === "delivered").length,
    };
  }, [orders]);

  const FILTERS = [
    { key: "all", label: "همه" },
    { key: "awaiting_payment", label: "در انتظار پرداخت" },
    { key: "payment_under_review", label: "رسید در بررسی" },
    { key: "paid", label: "پرداخت شد" },
    { key: "preparing", label: "بسته‌بندی" },
    { key: "shipped", label: "در راه" },
    { key: "delivered", label: "تحویل شد" },
  ];

  return (
    <>
      {/* stats + refresh */}
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div className="grid flex-1 grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <StatCard n={fa(stats.count)} label="کل سفارش‌ها" bg="#E3F6FD" />
          <StatCard n={money(stats.revenue)} label="فروش تأییدشده (تومان)" bg="#FFF3C9" />
          <StatCard n={fa(stats.pendingReview)} label="رسید منتظر بررسی" bg="#FFE0EA" />
          <StatCard n={fa(stats.delivered)} label="تحویل‌شده" bg="#DDF3EA" />
        </div>
        <button
          type="button"
          onClick={() => load(true)}
          disabled={refreshing}
          className="flex h-11 items-center gap-2 rounded-full border-2 border-[#04202E] bg-white px-5 text-[13.5px] font-extrabold text-[#04202E] transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={refreshing ? "animate-spin" : ""}
          >
            <path d="M21 12a9 9 0 1 1-2.64-6.36" />
            <path d="M21 3v6h-6" />
          </svg>
          {refreshing ? "…" : "تازه‌سازی"}
        </button>
      </div>

      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {FILTERS.map((f) => {
            const on = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f.key)}
                className="h-10 shrink-0 rounded-full px-4 text-[13px] font-bold transition-all"
                style={{
                  background: on ? "#04202E" : "#fff",
                  border: `1.5px solid ${on ? "#04202E" : "#CFE6EF"}`,
                  color: on ? "#fff" : "#04202E",
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="جست‌وجو: کد، اسم، موبایل…"
          aria-label="جست‌وجوی سفارش"
          className="h-11 flex-1 rounded-[16px] border-[1.5px] border-[#CFE6EF] bg-white px-4 text-[14px] text-[#04202E] outline-none focus:border-[#00ABE7] md:min-w-[260px]"
        />
      </div>

      {error ? (
        <div className="flex flex-col items-center gap-4 rounded-[24px] border-2 border-dashed border-[#F0B7C9] bg-[#FFF7FA] px-6 py-12 text-center">
          <span className="text-[40px]">🔌</span>
          <p className="m-0 text-[14.5px] font-bold">{error}</p>
          <button type="button" onClick={() => load()} className="flex h-11 items-center rounded-full bg-[#00ABE7] px-6 text-[13.5px] font-extrabold text-[#04202E]">
            تلاش دوباره
          </button>
        </div>
      ) : orders === null ? (
        <div className="flex flex-col gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-[74px] animate-pulse rounded-[20px] bg-white/70" />
          ))}
        </div>
      ) : list.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-[24px] border-2 border-dashed border-[#99D6EE] bg-white/60 px-6 py-12 text-center">
          <span className="text-[40px]">🗂️</span>
          <p className="m-0 text-[14.5px] font-bold">چیزی مطابق این فیلتر پیدا نشد.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {list.map((o) => {
            const allowed = (TRANSITIONS[o.status as OrderStatus] ?? []) as OrderStatus[];
            const actionables = allowed.filter((s) => s !== "expired" && s !== "failed");
            return (
              <div key={o.id} className="rounded-[20px] border border-[#DDEEF5] bg-white p-4 md:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="rounded-[12px] bg-[#04202E] px-2.5 py-1 text-[12px] font-extrabold text-white" dir="ltr">
                      {o.code}
                    </span>
                    <StatusChip s={o.status} />
                    {o.paymentMethod === "manual_transfer" && (
                      <span className="rounded-full bg-[#E7E0FA] px-2 py-0.5 text-[10.5px] font-bold text-[#5B4A8A]">کارت‌به‌کارت</span>
                    )}
                    {o.giftOpened && <span className="rounded-full bg-[#D7F5E4] px-2 py-0.5 text-[10.5px] font-bold text-[#2E7D53]">کارت باز شد 🎉</span>}
                  </div>
                  <span className="text-[13.5px] font-black">{money(o.totalToman)} تومان</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12.5px] font-semibold text-[#4A6572]">
                  <span>گیرنده: {o.recipientName}</span>
                  <span dir="ltr">{fa(o.recipientPhone)}</span>
                  <span>{o.province}، {o.city}</span>
                  <span>{o.items.join(" + ")}</span>
                  {o.payment && <span>پرداخت: {o.payment.method === "zarinpal" ? "زرین‌پال" : "دستی"} ({STATUS_LABEL[o.payment.status]?.label ?? o.payment.status})</span>}
                </div>
                {actionables.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2 border-t border-[#EDF6FA] pt-3">
                    {actionables.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => void transition(o, s)}
                        className="flex h-10 items-center gap-1.5 rounded-full bg-[#FFF3C9] px-4 text-[12.5px] font-extrabold text-[#04202E] transition-all hover:bg-[#F7E7A9] active:scale-95"
                      >
                        {s === "preparing"
                          ? "شروع بسته‌بندی"
                          : s === "shipped"
                            ? "تحویل به پست"
                            : s === "delivered"
                              ? "تحویل داده شد"
                              : s === "paid"
                                ? "تأیید پرداخت"
                                : s === "cancelled"
                                  ? "لغو سفارش"
                                  : s === "awaiting_payment"
                                    ? "بازگشت به انتظار پرداخت"
                                    : s === "refunded"
                                      ? "تأیید مرجوعی"
                                      : s === "refund_requested"
                                        ? "ثبت درخواست مرجوعی"
                                        : STEP_LABELS[s]}
                        <ForwardIcon size={14} stroke="#04202E" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

/* ═══════════ TAB 2 — RECEIPT QUEUE ═══════════ */
function PaymentsTab() {
  const [payments, setPayments] = useState<AdminPayment[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reason, setReason] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const load = () => {
    fetch("/api/admin/payments?status=pending_review", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((j: { payments?: AdminPayment[] }) => {
        setPayments(j.payments ?? []);
        setError(null);
      })
      .catch(() => setError("اتصال به سرور برقرار نشد."));
  };

  useEffect(() => {
    load();
  }, []);

  const act = async (p: AdminPayment, action: "approve" | "reject") => {
    try {
      const res = await fetch(`/api/admin/payments/${p.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, reason: reason[p.id] ?? "" }),
      });
      if (!res.ok) {
        const b = (await res.json().catch(() => ({}))) as { error?: string };
        toast({ title: "انجام نشد!", description: b.error ?? "خطای سرور" });
        return;
      }
      toast({
        title: action === "approve" ? "رسید تأیید شد ✓" : "رسید رد شد",
        description: `${p.code} — ${action === "approve" ? "سفارش پرداخت‌شده شد." : "به مشتری پیامک می‌شه."}`,
      });
      load();
    } catch {
      toast({ title: "خطای شبکه", description: "دوباره تلاش کن." });
    }
  };

  if (error) {
    return (
      <div className="rounded-[24px] border-2 border-dashed border-[#F0B7C9] bg-[#FFF7FA] px-6 py-10 text-center text-[14px] font-bold text-[#B02A52]">
        {error}
      </div>
    );
  }
  if (payments === null) {
    return (
      <div className="flex flex-col gap-3">
        {[0, 1].map((i) => (
          <div key={i} className="h-[110px] animate-pulse rounded-[20px] bg-white/70" />
        ))}
      </div>
    );
  }
  if (payments.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-[24px] border-2 border-dashed border-[#99D6EE] bg-white/60 px-6 py-12 text-center">
        <span className="text-[40px]">🧾</span>
        <p className="m-0 text-[14.5px] font-bold">صف رسیدها خالیه — دستت درد نکنه!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {payments.map((p) => (
        <div key={p.id} className="rounded-[20px] border border-[#DDEEF5] bg-white p-4 md:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="rounded-[12px] bg-[#04202E] px-2.5 py-1 text-[12px] font-extrabold text-white" dir="ltr">
                {p.code}
              </span>
              <span className="text-[13.5px] font-black">{money(p.amountToman)} تومان</span>
            </div>
            <span
              className="rounded-full px-3 py-1 text-[11.5px] font-extrabold"
              style={{ background: p.ageMinutes > 120 ? "#FFE9F0" : "#E3F6FD", color: p.ageMinutes > 120 ? "#B02A52" : "#006387" }}
            >
              {p.ageMinutes < 60 ? `${fa(p.ageMinutes)} دقیقه پیش` : `${fa(Math.floor(p.ageMinutes / 60))} ساعت پیش`}
              {p.ageMinutes > 120 ? " — از SLA گذشته!" : ""}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12.5px] font-semibold text-[#4A6572]">
            <span>گیرنده: {p.recipientName}</span>
            <span>تلاش {fa(p.attemptNo)} از ۳</span>
            <span>وضعیت سفارش: {STATUS_LABEL[p.orderStatus]?.label ?? p.orderStatus}</span>
          </div>
          {p.hasReceipt && (
            <a
              href={`/api/admin/payments/${p.id}/receipt`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex h-10 items-center gap-1.5 rounded-full bg-[#E3F6FD] px-4 text-[12.5px] font-extrabold text-[#006387] hover:bg-[#D6F1FB]"
            >
              دیدن رسید ⤢
            </a>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[#EDF6FA] pt-3">
            <button
              type="button"
              onClick={() => void act(p, "approve")}
              className="flex h-10 items-center gap-1.5 rounded-full bg-[#D7F5E4] px-4 text-[12.5px] font-extrabold text-[#2E7D53] transition-all hover:bg-[#C4EED6] active:scale-95"
            >
              تأیید — پرداخت شد
            </button>
            <button
              type="button"
              onClick={() => void act(p, "reject")}
              className="flex h-10 items-center gap-1.5 rounded-full bg-[#FFE9F0] px-4 text-[12.5px] font-extrabold text-[#B02A52] transition-all hover:bg-[#FFDCE7] active:scale-95"
            >
              رد رسید
            </button>
            <input
              type="text"
              value={reason[p.id] ?? ""}
              onChange={(e) => setReason((prev) => ({ ...prev, [p.id]: e.target.value.slice(0, 120) }))}
              placeholder="دلیل رد (برای پیامک مشتری)…"
              className="h-10 min-w-[220px] flex-1 rounded-[14px] border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3.5 text-[12.5px] text-[#04202E] outline-none focus:border-[#00ABE7]"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════ TAB 3 — REVIEWS ═══════════ */
function ReviewsTab() {
  const [reviews, setReviews] = useState<AdminReview[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const load = () => {
    fetch("/api/admin/reviews", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((j: { reviews?: AdminReview[] }) => {
        setReviews(j.reviews ?? []);
        setError(null);
      })
      .catch(() => setError("اتصال به سرور برقرار نشد."));
  };

  useEffect(() => {
    load();
  }, []);

  const moderate = async (id: string, approved: boolean) => {
    try {
      const res = await fetch("/api/admin/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, approved }),
      });
      if (!res.ok) throw new Error();
      setReviews((prev) => prev?.map((r) => (r.id === id ? { ...r, approved } : r)) ?? prev);
      toast({ title: approved ? "نظر منتشر شد ✓" : "نظر مخفی شد" });
    } catch {
      toast({ title: "انجام نشد!", description: "دوباره تلاش کن." });
    }
  };

  if (error) {
    return (
      <div className="rounded-[24px] border-2 border-dashed border-[#F0B7C9] bg-[#FFF7FA] px-6 py-10 text-center text-[14px] font-bold text-[#B02A52]">
        {error}
      </div>
    );
  }
  if (reviews === null) {
    return (
      <div className="flex flex-col gap-3">
        {[0, 1].map((i) => (
          <div key={i} className="h-[90px] animate-pulse rounded-[20px] bg-white/70" />
        ))}
      </div>
    );
  }
  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-[24px] border-2 border-dashed border-[#99D6EE] bg-white/60 px-6 py-12 text-center">
        <span className="text-[40px]">💬</span>
        <p className="m-0 text-[14.5px] font-bold">هنوز نظری ثبت نشده.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {reviews.map((r) => (
        <div key={r.id} className={`rounded-[20px] border bg-white p-4 md:p-5 ${r.approved ? "border-[#CBE9D6]" : "border-[#DDEEF5]"}`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[14px] font-black">
              {r.who} · {fa(r.stars)} ★
            </span>
            <span
              className="rounded-full px-3 py-1 text-[11px] font-extrabold"
              style={{ background: r.approved ? "#D7F5E4" : "#FFF3C9", color: r.approved ? "#2E7D53" : "#8A6D1F" }}
            >
              {r.approved ? "منتشرشده" : "در انتظار تأیید"}
            </span>
          </div>
          <p className="mb-0 mt-2 text-[13px] font-semibold leading-[1.9] text-[#04202E]">{r.text}</p>
          <div className="mt-3 flex gap-2 border-t border-[#EDF6FA] pt-3">
            <button
              type="button"
              onClick={() => void moderate(r.id, true)}
              className="h-10 rounded-full bg-[#D7F5E4] px-4 text-[12.5px] font-extrabold text-[#2E7D53] active:scale-95"
            >
              انتشار
            </button>
            <button
              type="button"
              onClick={() => void moderate(r.id, false)}
              className="h-10 rounded-full bg-[#FFE9F0] px-4 text-[12.5px] font-extrabold text-[#B02A52] active:scale-95"
            >
              مخفی
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════ TAB 4 — STORIES MODERATION (Phase C) ═══════════ */
type ExpFilter = "pending" | "published" | "rejected";

interface AdminExperience {
  id: string;
  name: string;
  city: string;
  occasion: number;
  body: string;
  photoKey: string;
  status: string;
  createdAt: string;
}

const EXP_FILTERS: { key: ExpFilter; label: string }[] = [
  { key: "pending", label: "در انتظار تأیید" },
  { key: "published", label: "منتشرشده" },
  { key: "rejected", label: "ردشده" },
];

function StoriesModTab() {
  const [filter, setFilter] = useState<ExpFilter>("pending");
  const [exps, setExps] = useState<AdminExperience[] | null>(null);
  const [error, setError] = useState(false);
  const { toast } = useToast();

  const load = (f: ExpFilter) => {
    fetch(`/api/admin/experiences?status=${f}`, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((j: { experiences?: AdminExperience[] }) => {
        setExps(j.experiences ?? []);
        setError(false);
      })
      .catch(() => setError(true));
  };

  useEffect(() => {
    load(filter);
  }, [filter]);

  const act = async (e: AdminExperience, action: "publish" | "reject") => {
    // optimistic flip, then refetch the current filter to stay honest
    const optimistic = action === "publish" ? "published" : "rejected";
    setExps((prev) => prev?.map((x) => (x.id === e.id ? { ...x, status: optimistic } : x)) ?? prev);
    try {
      const res = await fetch(`/api/admin/experiences/${e.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (!res.ok) throw new Error();
      toast({
        title: action === "publish" ? "تجربه منتشر شد ✓" : "تجربه مخفی شد",
        description: `${e.name} — ${action === "publish" ? "الان تو «تجربه مخاطب» می‌بیننش." : "دیگه جایی نمایش داده نمی‌شه."}`,
      });
    } catch {
      toast({ title: "انجام نشد!", description: "دوباره تلاش کن." });
    }
    load(filter);
  };

  if (error) {
    return (
      <div className="rounded-[24px] border-2 border-dashed border-[#F0B7C9] bg-[#FFF7FA] px-6 py-10 text-center text-[14px] font-bold text-[#B02A52]">
        اتصال به سرور برقرار نشد.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* filter chips */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {EXP_FILTERS.map((f) => {
          const on = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(f.key)}
              className="h-10 shrink-0 rounded-full px-4 text-[13px] font-bold transition-all"
              style={{
                background: on ? "#04202E" : "#fff",
                border: `1.5px solid ${on ? "#04202E" : "#CFE6EF"}`,
                color: on ? "#fff" : "#04202E",
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {exps === null ? (
        <div className="flex flex-col gap-3">
          {[0, 1].map((i) => (
            <div key={i} className="h-[110px] animate-pulse rounded-[20px] bg-white/70" />
          ))}
        </div>
      ) : exps.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-[24px] border-2 border-dashed border-[#99D6EE] bg-white/60 px-6 py-12 text-center">
          <span className="text-[40px]">🎁</span>
          <p className="m-0 text-[14.5px] font-bold">
            {filter === "pending" ? "صف تجربه‌ها خالیه — همه بررسی شدن!" : "این فیلتر خالیه."}
          </p>
        </div>
      ) : (
        exps.map((e) => (
          <div key={e.id} className="rounded-[20px] border border-[#DDEEF5] bg-white p-4 md:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[14px] font-black">
                  {e.name}
                  {e.city ? <span className="font-semibold text-[#4A6572]"> · {e.city}</span> : null}
                </span>
                <span className="rounded-full bg-[#FFF3C9] px-2.5 py-0.5 text-[11px] font-extrabold text-[#8A6D1F]">
                  {OCCASIONS[e.occasion] ?? OCCASIONS[0]}
                </span>
                {e.photoKey && <span title="با عکس همراه بوده">📷</span>}
                <span
                  className="rounded-full px-3 py-1 text-[11px] font-extrabold"
                  style={{
                    background: e.status === "published" ? "#D7F5E4" : e.status === "pending" ? "#FFF3C9" : "#FFE9F0",
                    color: e.status === "published" ? "#2E7D53" : e.status === "pending" ? "#8A6D1F" : "#B02A52",
                  }}
                >
                  {e.status === "published" ? "منتشرشده" : e.status === "pending" ? "در انتظار" : "ردشده"}
                </span>
              </div>
              <span className="text-[11.5px] font-semibold text-[#4A6572]">
                {new Intl.DateTimeFormat("fa-IR", { dateStyle: "short" }).format(new Date(e.createdAt))}
              </span>
            </div>
            <p className="mb-0 mt-2 whitespace-pre-line text-[13px] font-medium leading-[1.95] text-[#1F3E4D]">{e.body}</p>
            <div className="mt-3 flex flex-wrap gap-2 border-t border-[#EDF6FA] pt-3">
              {(e.status === "pending" || e.status === "rejected") && (
                <button
                  type="button"
                  onClick={() => void act(e, "publish")}
                  className="h-10 rounded-full bg-[#D7F5E4] px-4 text-[12.5px] font-extrabold text-[#2E7D53] active:scale-95"
                >
                  انتشار
                </button>
              )}
              {(e.status === "pending" || e.status === "published") && (
                <button
                  type="button"
                  onClick={() => void act(e, "reject")}
                  className="h-10 rounded-full bg-[#FFE9F0] px-4 text-[12.5px] font-extrabold text-[#B02A52] active:scale-95"
                >
                  {e.status === "published" ? "لغو انتشار" : "رد"}
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

/* ═══════════ TAB 5 — BLOG AUTHORING (Phase C) ═══════════ */

interface PublicPost {
  slug: string;
  title: string;
  excerpt: string;
  tags: string;
  publishedAt: string;
}

interface SessionPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  tags: string;
  content: string;
  published: boolean;
}

const SLUG_RE = /^[a-z0-9-]{3,60}$/;

function BlogTab() {
  const [publicPosts, setPublicPosts] = useState<PublicPost[] | null>(null);
  const [drafts, setDrafts] = useState<SessionPost[]>([]); // posts created/edited this session (id known)
  const [editing, setEditing] = useState<SessionPost | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [publish, setPublish] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const { toast } = useToast();

  const load = () => {
    fetch("/api/posts", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((j: { posts?: PublicPost[] }) => setPublicPosts(j.posts ?? []))
      .catch(() => setPublicPosts([]));
  };

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setEditing(null);
    setTitle("");
    setSlug("");
    setExcerpt("");
    setTags("");
    setContent("");
    setPublish(false);
    setErr("");
  };

  const startEdit = (p: SessionPost) => {
    setEditing(p);
    setTitle(p.title);
    setSlug(p.slug);
    setExcerpt(p.excerpt);
    setTags(p.tags);
    setContent(p.content);
    setPublish(p.published);
    setErr("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async () => {
    if (busy) return;
    setErr("");
    if (title.trim().length < 3) {
      setErr("عنوان حداقل ۳ حرف.");
      return;
    }
    if (content.trim().length < 50) {
      setErr("متن پست حداقل ۵۰ حرف.");
      return;
    }
    if (slug && !SLUG_RE.test(slug)) {
      setErr("اسلاگ فقط حروف کوچک انگلیسی، عدد و خط تیره (۳ تا ۶۰ کاراکتر).");
      return;
    }
    setBusy(true);
    try {
      const payload = {
        title: title.trim(),
        ...(slug ? { slug } : {}),
        excerpt: excerpt.trim(),
        content: content.trim(),
        tags: tags.trim(),
        publish,
      };
      const res = await fetch(editing ? `/api/admin/posts/${editing.id}` : "/api/admin/posts", {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const b = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        post?: { id: string; slug: string; published: boolean };
      };
      if (res.status === 409) {
        setErr("این اسلاگ قبلاً استفاده شده — یه اسلاگ دیگه بزن یا خالی بذار.");
        return;
      }
      if (!res.ok || !b.post) {
        setErr("ذخیره نشد — فیلدها رو چک کن (عنوان ≥۳، متن ≥۵۰ حرف).");
        return;
      }
      const saved: SessionPost = {
        id: b.post.id,
        slug: b.post.slug,
        title: title.trim(),
        excerpt: excerpt.trim(),
        tags: tags.trim(),
        content: content.trim(),
        published: b.post.published,
      };
      setDrafts((prev) => {
        const without = prev.filter((d) => d.id !== saved.id);
        return [saved, ...without];
      });
      toast({
        title: editing ? "پست به‌روز شد ✓" : publish ? "پست منتشر شد ✓" : "پیش‌نویس ذخیره شد ✓",
        description: publish ? `#/post?slug=${saved.slug}` : "وقتی منتشرش کنی تو بلاگ می‌افته.",
      });
      resetForm();
      load();
    } catch {
      setErr("خطای شبکه — دوباره تلاش کن.");
    } finally {
      setBusy(false);
    }
  };

  const togglePublish = async (p: SessionPost) => {
    try {
      const res = await fetch(`/api/admin/posts/${p.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publish: !p.published }),
      });
      const b = (await res.json().catch(() => ({}))) as { post?: { published: boolean } };
      if (!res.ok || !b.post) throw new Error();
      setDrafts((prev) => prev.map((d) => (d.id === p.id ? { ...d, published: b.post!.published } : d)));
      toast({ title: b.post.published ? "پست منتشر شد ✓" : "پست از بلاگ برداشته شد" });
      load();
    } catch {
      toast({ title: "انجام نشد!", description: "دوباره تلاش کن." });
    }
  };

  const removePost = async (p: SessionPost) => {
    if (!window.confirm(`پست «${p.title}» برای همیشه حذف بشه؟`)) return;
    try {
      const res = await fetch(`/api/admin/posts/${p.id}`, { method: "DELETE" });
      if (!res.ok) {
        toast({ title: "حذف نشد!", description: "حذف پست فقط با حساب مالک ممکنه." });
        return;
      }
      setDrafts((prev) => prev.filter((d) => d.id !== p.id));
      toast({ title: "پست حذف شد" });
      load();
    } catch {
      toast({ title: "خطای شبکه", description: "دوباره تلاش کن." });
    }
  };

  // list = this-session posts (full control) + public posts not shadowed by them
  const rows: (
    | { kind: "session"; p: SessionPost }
    | { kind: "public"; p: PublicPost }
  )[] = [
    ...drafts.map((p) => ({ kind: "session" as const, p })),
    ...(publicPosts ?? [])
      .filter((p) => !drafts.some((d) => d.slug === p.slug))
      .map((p) => ({ kind: "public" as const, p })),
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* editor */}
      <div className="rounded-[20px] border border-[#DDEEF5] bg-white p-4 md:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="m-0 text-[16px] font-black">{editing ? "ویرایش پست" : "پست جدید"}</h3>
          {editing && (
            <button type="button" onClick={resetForm} className="text-[12.5px] font-extrabold text-[#00779F] underline">
              لغو ویرایش
            </button>
          )}
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, 120))}
            placeholder="عنوان پست (حداقل ۳ حرف)"
            aria-label="عنوان پست"
            className="h-11 rounded-[14px] border-[1.5px] border-[#CFE6EF] bg-white px-3.5 text-[14px] font-semibold text-[#04202E] outline-none focus:border-[#00ABE7]"
          />
          <input
            type="text"
            dir="ltr"
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-").slice(0, 60))}
            placeholder="slug — خالی بذار: از روی عنوان ساخته می‌شه"
            aria-label="اسلاگ پست"
            className="h-11 rounded-[14px] border-[1.5px] border-[#CFE6EF] bg-white px-3.5 text-left font-mono text-[13px] text-[#04202E] outline-none focus:border-[#00ABE7]"
          />
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value.slice(0, 300))}
            placeholder="خلاصه (اختیاری — تو کارت بلاگ نمایش داده می‌شه)"
            aria-label="خلاصه پست"
            className="h-11 rounded-[14px] border-[1.5px] border-[#CFE6EF] bg-white px-3.5 text-[14px] font-semibold text-[#04202E] outline-none focus:border-[#00ABE7]"
          />
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value.slice(0, 120))}
            placeholder="تگ‌ها با ویرگول: هدیه، یلدا"
            aria-label="تگ‌های پست"
            className="h-11 rounded-[14px] border-[1.5px] border-[#CFE6EF] bg-white px-3.5 text-[14px] font-semibold text-[#04202E] outline-none focus:border-[#00ABE7]"
          />
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value.slice(0, 20_000))}
          rows={10}
          placeholder="متن پست (حداقل ۵۰ حرف)…"
          aria-label="متن پست"
          className="mt-3 w-full resize-y rounded-[14px] border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3.5 py-3 font-mono text-[13px] leading-[2] text-[#04202E] outline-none focus:border-[#00ABE7]"
        />
        <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11.5px] font-semibold text-[#4A6572]">
            مارک‌داون ساده: # تیتر · **پررنگ** · *کج* · - لیست · [متن](https://لینک)
          </span>
          <span className="text-[11.5px] font-extrabold text-[#4A6572]" dir="ltr">
            {fa(content.trim().length)} / {fa(20_000)}
          </span>
        </div>
        {err && <span className="mt-2 block text-[12.5px] font-bold text-[#B02A52]">{err}</span>}
        <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-[#EDF6FA] pt-3">
          <label className="flex cursor-pointer items-center gap-2 text-[13px] font-extrabold text-[#04202E]">
            <input
              type="checkbox"
              checked={publish}
              onChange={(e) => setPublish(e.target.checked)}
              className="h-5 w-5 accent-[#00ABE7]"
            />
            انتشار در بلاگ
          </label>
          <button
            type="button"
            onClick={() => void submit()}
            disabled={busy}
            className="flex h-11 flex-1 items-center justify-center rounded-full bg-[#04202E] px-6 text-[13.5px] font-extrabold text-white transition-transform active:scale-95 disabled:opacity-60 md:flex-none"
          >
            {busy ? "در حال ذخیره…" : editing ? "ذخیره‌ی تغییرات" : "ذخیره‌ی پست"}
          </button>
        </div>
      </div>

      {/* list */}
      {publicPosts === null ? (
        <div className="h-[120px] animate-pulse rounded-[20px] bg-white/70" />
      ) : rows.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-[24px] border-2 border-dashed border-[#99D6EE] bg-white/60 px-6 py-12 text-center">
          <span className="text-[40px]">✍️</span>
          <p className="m-0 text-[14.5px] font-bold">هنوز پستی نیست — اولین پست رو از فرم بالا بنویس.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {rows.map((row) =>
            row.kind === "session" ? (
              <div key={`s-${row.p.id}`} className="rounded-[20px] border border-[#DDEEF5] bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[14.5px] font-black">{row.p.title}</span>
                  <div className="flex items-center gap-2">
                    <span
                      className="rounded-full px-3 py-1 text-[11px] font-extrabold"
                      style={{ background: row.p.published ? "#D7F5E4" : "#FFF3C9", color: row.p.published ? "#2E7D53" : "#8A6D1F" }}
                    >
                      {row.p.published ? "منتشرشده" : "پیش‌نویس"}
                    </span>
                    <span className="rounded-[10px] bg-[#F2F7F9] px-2 py-0.5 font-mono text-[10.5px] text-[#4A6572]" dir="ltr">
                      {row.p.slug}
                    </span>
                  </div>
                </div>
                {row.p.excerpt && (
                  <p className="mb-0 mt-1.5 text-[12.5px] font-medium leading-[1.9] text-[#4A6572]">{row.p.excerpt}</p>
                )}
                <div className="mt-3 flex flex-wrap gap-2 border-t border-[#EDF6FA] pt-3">
                  <button
                    type="button"
                    onClick={() => startEdit(row.p)}
                    className="h-10 rounded-full bg-[#E3F6FD] px-4 text-[12.5px] font-extrabold text-[#006387] active:scale-95"
                  >
                    ویرایش
                  </button>
                  <button
                    type="button"
                    onClick={() => void togglePublish(row.p)}
                    className="h-10 rounded-full bg-[#D7F5E4] px-4 text-[12.5px] font-extrabold text-[#2E7D53] active:scale-95"
                  >
                    {row.p.published ? "لغو انتشار" : "انتشار"}
                  </button>
                  <button
                    type="button"
                    onClick={() => void removePost(row.p)}
                    className="h-10 rounded-full bg-[#FFE9F0] px-4 text-[12.5px] font-extrabold text-[#B02A52] active:scale-95"
                  >
                    حذف
                  </button>
                  {row.p.published && (
                    <button
                      type="button"
                      onClick={() => navigate("post", { slug: row.p.slug })}
                      className="h-10 rounded-full px-3 text-[12.5px] font-extrabold text-[#00779F] underline"
                    >
                      دیدن در بلاگ ↗
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div key={`p-${row.p.slug}`} className="rounded-[20px] border border-[#DDEEF5] bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[14.5px] font-black">{row.p.title}</span>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#D7F5E4] px-3 py-1 text-[11px] font-extrabold text-[#2E7D53]">منتشرشده</span>
                    <span className="text-[11.5px] font-semibold text-[#4A6572]">
                      {new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium" }).format(new Date(row.p.publishedAt))}
                    </span>
                  </div>
                </div>
                {row.p.excerpt && (
                  <p className="mb-0 mt-1.5 text-[12.5px] font-medium leading-[1.9] text-[#4A6572]">{row.p.excerpt}</p>
                )}
                <div className="mt-3 border-t border-[#EDF6FA] pt-3">
                  <button
                    type="button"
                    onClick={() => navigate("post", { slug: row.p.slug })}
                    className="h-10 rounded-full bg-[#E3F6FD] px-4 text-[12.5px] font-extrabold text-[#006387] active:scale-95"
                  >
                    دیدن در بلاگ ↗
                  </button>
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}
