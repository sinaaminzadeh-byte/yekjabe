"use client";

// ═══ پنل مدیریت — Phase B admin console (guide §B3/§B6) ═══
// Roles (owner request): ادمین = owner (full control + تنظیمات),
// مدیر فروشگاه = operator (daily ops: orders/receipts/products/reviews).
// Tabs: سفارش‌ها (transitions via /api/admin/orders/{id}/transition),
// رسیدها (manual receipt queue approve/reject), نظرها (reviews moderation).
// Gated behind AdminUser OTP (pn_admin cookie, guide A7).
import { useEffect, useMemo, useState } from "react";
import { navigate } from "@/lib/hash-route";
import { Plush } from "@/components/shop/plush";
import { Logo, refreshBranding } from "@/components/shop/logo";
import { ForwardIcon } from "@/components/shop/icons";
import { PLUSH_MAP, PLUSHES, OCCASIONS, type PlushKind } from "@/lib/pishnam-data";
import { DEFAULT_HOME_SLIDES, HERO_HASHES, HERO_ROUTES, MAX_HOME_SLIDES, type HeroSlide } from "@/lib/home-slides";
import { fa, faPrice, money } from "@/lib/fa";
import { MobileTopBar } from "@/components/shop/nav";
import { useToast } from "@/hooks/use-toast";
import { TRANSITIONS, STEP_LABELS, type OrderStatus } from "@/lib/orders/status";
import { ADMIN_TABS, AdminPills, AdminSidebar, useBadges, type Tab } from "@/components/shop/admin/admin-nav";
import { OverviewTab } from "@/components/shop/admin/admin-overview";
import { CustomersTab } from "@/components/shop/admin/admin-customers";
import { MessagesTab } from "@/components/shop/admin/admin-messages";
import { TeamTab } from "@/components/shop/admin/admin-team";
import { jalaliDateTime } from "@/components/shop/admin/admin-shared";
import { BlogStudio } from "@/components/shop/blog/blog-studio";

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
    if (!/^09\d{9}$/.test(p) || !/^\d{4}$/.test(c)) {
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
          <h1 className="m-0 text-[22px] font-black">پنل مدیریت</h1>
          <p className="m-0 text-[13.5px] font-medium leading-[1.9] text-[#4A6572]">
            {mode === "password"
              ? "رمز پنل رو بزن (فایل .env سرور: ADMIN_PANEL_PASSWORD)."
              : step === "phone"
                ? "با شماره‌ی موبایلِ مدیریتت کد ورود بگیر."
                : "کد ۴ رقمی پیامک‌شده رو بزن."}
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
            aria-label="شماره موبایل مدیریت"
            className={`h-[54px] w-full rounded-[18px] border-2 bg-white text-center text-[18px] font-black text-[#04202E] outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(0,171,231,0.15)] ${
              err ? "pishnam-shake border-[#F0426B]" : "border-[#04202E]"
            }`}
          />
        ) : (
          <input
            type="password"
            inputMode="numeric"
            dir="ltr"
            maxLength={4}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/[^\d۰-۹]/g, "").slice(0, 4))}
            onKeyDown={(e) => e.key === "Enter" && !busy && void submit()}
            placeholder="••••"
            aria-label="کد ورود چهاررقمی"
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
          ورود: ادمین و مدیر فروشگاه (شماره‌های ثبت‌شده یا رمز)
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
  ordererName: string;
  ordererPhone: string;
  province: string;
  city: string;
  totalToman: number;
  items: string[];
  payment: { method: string; status: string; attemptNo: number } | null;
  giftOpened: boolean;
  createdAt: string;
  expiresAt: string;
  // new-flow (owner round 30): استودیو رسانه + نگهداری پیام + نمایش فرستنده
  mediaCount?: number;
  retentionPlan?: string;
  senderDisplay?: string;
  senderPhrase?: string;
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

type AdminRole = "owner" | "operator";
const ROLE_LABEL: Record<AdminRole, string> = { owner: "ادمین", operator: "مدیر فروشگاه" };

export function AdminScreen() {
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem(UNLOCK_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [tab, setTab] = useState<Tab>("overview");
  // role chip + owner-only tabs — fetched right after the gate opens
  const [role, setRole] = useState<AdminRole | null>(null);
  const [adminName, setAdminName] = useState("");
  const badges = useBadges(unlocked);

  useEffect(() => {
    if (!unlocked) return;
    let alive = true;
    fetch("/api/admin/me", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j: { admin?: { role?: string; name?: string } } | null) => {
        if (!alive || !j?.admin) return;
        if (j.admin.role === "owner" || j.admin.role === "operator") setRole(j.admin.role);
        setAdminName(j.admin.name ?? "");
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [unlocked]);

  if (!unlocked) {
    return (
      <div className="flex min-h-screen flex-col bg-[#F2FAFD]">
        <MobileTopBar title="پنل مدیریت" back="home" />
        <AdminOtpGate onOk={() => setUnlocked(true)} />
      </div>
    );
  }

  const activeDef = ADMIN_TABS.find((t) => t.key === tab);
  // owner-only tabs guard (server stays source of truth)
  const safeTab: Tab = activeDef?.ownerOnly && role !== "owner" ? "overview" : tab;

  return (
    <div className="mx-auto flex w-full max-w-[1440px] gap-6 px-0 lg:px-6 lg:py-4">
      <AdminSidebar tab={safeTab} onTab={setTab} role={role} adminName={adminName} badges={badges} />
      <div className="flex min-h-screen w-full min-w-0 flex-col bg-[#F2FAFD] lg:min-h-0 lg:flex-1 lg:rounded-[28px] lg:border lg:border-[#DDEEF5] lg:bg-white/60 lg:px-5 lg:py-5">
        <MobileTopBar title="پنل مدیریت" back="home" />
        <main className="w-full flex-1 px-4 pb-24 pt-2 md:px-6 lg:px-1 lg:pb-6">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div className="flex flex-col gap-1">
              <h1 className="m-0 flex items-center gap-2 text-[24px] font-black md:text-[30px]">
                <span aria-hidden="true" className="text-[20px] md:text-[24px]">{activeDef?.icon}</span>
                {activeDef?.label ?? "داشبورد"}
              </h1>
              <p className="m-0 text-[12.5px] font-medium text-[#4A6572] md:text-[13.5px]">{activeDef?.desc ?? "نمای کلی فروشگاه"}</p>
            </div>
            {role && (
              <span
                className="flex items-center gap-2 self-start rounded-full px-4 py-2 text-[12px] font-extrabold lg:hidden"
                style={{
                  background: role === "owner" ? "#04202E" : "#E3F6FD",
                  color: role === "owner" ? "#fff" : "#006387",
                }}
                title={adminName || undefined}
              >
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: role === "owner" ? "#7BE3B4" : "#00ABE7" }}
                  aria-hidden="true"
                />
                {ROLE_LABEL[role]}
                {adminName ? ` — ${adminName}` : ""}
              </span>
            )}
          </div>

          <AdminPills tab={safeTab} onTab={setTab} role={role} badges={badges} />

          <div className="mt-4">
            {safeTab === "overview" && <OverviewTab onNavigate={setTab} />}
            {safeTab === "orders" && <OrdersTab />}
            {safeTab === "payments" && <PaymentsTab />}
            {safeTab === "products" && <ProductsTab />}
            {safeTab === "renewals" && <RenewalsTab />}
            {safeTab === "customers" && <CustomersTab />}
            {safeTab === "messages" && <MessagesTab />}
            {safeTab === "slides" && <SlidesTab />}
            {safeTab === "reviews" && <ReviewsTab />}
            {safeTab === "stories" && <StoriesModTab />}
            {safeTab === "blog" && <BlogTab role={role} />}
            {safeTab === "team" && role === "owner" && <TeamTab />}
            {safeTab === "settings" && role === "owner" && <SettingsTab />}
            {safeTab === "sms" && role === "owner" && <SmsTab />}
          </div>

          <div className="mt-7 flex justify-center lg:hidden">
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
    </div>
  );
}

/* ═══════════ TAB 1 — ORDERS ═══════════ */
function OrdersTab() {
  const [orders, setOrders] = useState<AdminOrder[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [detailId, setDetailId] = useState<string | null>(null);
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
      const hay = `${o.code} ${o.recipientName} ${o.recipientPhone} ${o.ordererName} ${o.ordererPhone} ${o.city} ${o.items.join(" ")}`;
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
                {/* new-flow chips — استودیو رسانه، نگهداری پیام، نمایش فرستنده */}
                {(o.mediaCount || o.retentionPlan || o.senderDisplay) && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {(o.mediaCount ?? 0) > 0 && (
                      <span className="rounded-full bg-[#E3F6FD] px-2.5 py-1 text-[10.5px] font-extrabold text-[#006387]">🎙️ پیوست رسانه‌ای: {fa(o.mediaCount ?? 0)}</span>
                    )}
                    {o.retentionPlan && o.retentionPlan !== "1m" && (
                      <span className="rounded-full bg-[#E7E0FA] px-2.5 py-1 text-[10.5px] font-extrabold text-[#5B4A8A]">⏳ نگهداری {o.retentionPlan === "12m" ? "۱ ساله" : "۶ ماهه"}</span>
                    )}
                    {o.senderDisplay === "anon" && (
                      <span className="rounded-full bg-[#F0F3F5] px-2.5 py-1 text-[10.5px] font-extrabold text-[#4A6572]">🕶️ هدیه‌ی ناشناس</span>
                    )}
                    {o.senderDisplay === "phrase" && o.senderPhrase && (
                      <span className="rounded-full bg-[#FFF3C9] px-2.5 py-1 text-[10.5px] font-extrabold text-[#8A6D1F]">✍️ {o.senderPhrase}</span>
                    )}
                  </div>
                )}
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12.5px] font-semibold text-[#4A6572]">
                  <span>سفارش‌دهنده: {o.ordererName || "—"}{o.ordererPhone ? <span dir="ltr"> ({fa(o.ordererPhone)})</span> : null}</span>
                  <span>گیرنده: {o.recipientName}</span>
                  <span dir="ltr">{fa(o.recipientPhone)}</span>
                  <span>{o.province}، {o.city}</span>
                  <span>{o.items.join(" + ")}</span>
                  <span>{jalaliDateTime(o.createdAt)}</span>
                  {o.payment && <span>پرداخت: {o.payment.method === "zarinpal" ? "زرین‌پال" : "دستی"} ({STATUS_LABEL[o.payment.status]?.label ?? o.payment.status})</span>}
                </div>
                {actionables.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2 border-t border-[#EDF6FA] pt-3">
                    <button
                      type="button"
                      onClick={() => setDetailId(o.id)}
                      className="flex h-10 items-center gap-1.5 rounded-full border-[1.5px] border-[#CFE6EF] bg-white px-4 text-[12.5px] font-extrabold text-[#006387] transition-all hover:bg-[#F2FAFD] active:scale-95"
                    >
                      جزئیات و تایم‌لاین
                    </button>
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
      {detailId && <OrderDetailModal id={detailId} onClose={() => setDetailId(null)} />}
    </>
  );
}

/* ═══════════ ORDER DETAIL MODAL (round 33) ═══════════ */
interface DetailOrder {
  id: string;
  code: string;
  status: string;
  paymentMethod: string;
  senderName: string;
  senderDisplay: string;
  senderPhrase: string;
  recipientName: string;
  recipientPhone: string;
  ordererName: string;
  ordererPhone: string;
  userPhone: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  message: string;
  occasion: number;
  charmHearts: number;
  charmPaws: number;
  mediaCount: number;
  retentionPlan: string;
  messageExpiresAt: string | null;
  messagePurgeStatus: string;
  subtotalToman: number;
  shippingToman: number;
  discountToman: number;
  totalToman: number;
  giftOpened: boolean;
  giftOpenedAt: string | null;
  refundReason: string;
  refundRequestedAt: string | null;
  paymentAttempts: number;
  expiresAt: string;
  createdAt: string;
  items: { titleSnapshot: string; unitPriceToman: number; qty: number }[];
  payments: { method: string; status: string; attemptNo: number; amountToman: number; refId: string; createdAt: string }[];
  renewals: { code: string; plan: string; priceToman: number; status: string; createdAt: string }[];
  events: { id: string; type: string; fromStatus: string; toStatus: string; actor: string; note: string; createdAt: string }[];
}

const EVENT_LABEL: Record<string, string> = {
  created: "سفارش ساخته شد",
  status_changed: "تغییر وضعیت",
  payment: "پرداخت",
  gift_opened: "کارت هدیه باز شد",
  note: "یادداشت",
  sms: "پیامک",
};

function OrderDetailModal({ id, onClose }: { id: string; onClose: () => void }) {
  const [o, setO] = useState<DetailOrder | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/orders/${id}`, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((j: { order: DetailOrder }) => setO(j.order))
      .catch(() => setErr(true));
  }, [id]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#04202E]/45 p-0 backdrop-blur-[2px] md:items-center md:p-6" onClick={onClose} role="dialog" aria-modal="true" aria-label="جزئیات سفارش">
      <div
        className="max-h-[92vh] w-full max-w-[720px] overflow-y-auto rounded-t-[28px] bg-white p-5 shadow-[0_24px_60px_rgba(4,32,46,0.3)] md:rounded-[28px] md:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {err ? (
          <p className="m-0 py-10 text-center text-[14px] font-bold text-[#B03A5B]">جزئیات بارگذاری نشد.</p>
        ) : !o ? (
          <div className="flex flex-col gap-3 py-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-16 animate-pulse rounded-[18px] bg-[#F2FAFD]" />
            ))}
          </div>
        ) : (
          <>
            {/* header */}
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-[12px] bg-[#04202E] px-3 py-1.5 text-[13px] font-extrabold text-white" dir="ltr">{o.code}</span>
                <StatusChip s={o.status} />
                {o.giftOpened && <span className="rounded-full bg-[#D7F5E4] px-2.5 py-1 text-[11px] font-bold text-[#2E7D53]">کارت باز شد 🎉</span>}
              </div>
              <button type="button" onClick={onClose} aria-label="بستن" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D3E8F0] bg-white text-[#04202E]">
                ✕
              </button>
            </div>

            {/* money breakdown */}
            <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                { l: "جمع اقلام", v: money(o.subtotalToman) },
                { l: "ارسال", v: money(o.shippingToman) },
                ...(o.discountToman > 0 ? [{ l: "تخفیف", v: `−${money(o.discountToman)}` }] : []),
                { l: "مبلغ کل", v: money(o.totalToman) },
              ].map((x) => (
                <div key={x.l} className="rounded-[16px] bg-[#F5FBFD] p-3 text-center">
                  <span className="block text-[13.5px] font-black text-[#04202E]">{x.v}</span>
                  <span className="text-[10px] font-bold text-[#4A6572]">{x.l} (تومان)</span>
                </div>
              ))}
            </div>

            {/* parties + address */}
            <div className="mb-4 rounded-[18px] border border-[#EDF6FA] p-4">
              <h4 className="m-0 mb-2 text-[13px] font-black text-[#04202E]">طرفین و آدرس</h4>
              <div className="grid gap-x-6 gap-y-1.5 text-[12.5px] font-semibold text-[#4A6572] sm:grid-cols-2">
                <span>سفارش‌دهنده: <b className="text-[#04202E]">{o.ordererName || "—"}</b> {o.ordererPhone && <span dir="ltr">({fa(o.ordererPhone)})</span>}</span>
                <span>گیرنده: <b className="text-[#04202E]">{o.recipientName}</b> <span dir="ltr">({fa(o.recipientPhone)})</span></span>
                <span>ارسال از طرف: {o.senderDisplay === "anon" ? "ناشناس 🕶️" : o.senderDisplay === "phrase" ? o.senderPhrase : o.senderName || "—"}</span>
                <span>حساب خریدار: <span dir="ltr">{fa(o.userPhone || o.ordererPhone || "—")}</span></span>
                <span className="sm:col-span-2">آدرس: {o.province}، {o.city} — {o.address || "—"} {o.postalCode && <span dir="ltr">({fa(o.postalCode)})</span>}</span>
              </div>
            </div>

            {/* gift payload */}
            <div className="mb-4 rounded-[18px] border border-[#EDF6FA] p-4">
              <h4 className="m-0 mb-2 text-[13px] font-black text-[#04202E]">هدیه</h4>
              <div className="mb-2 flex flex-wrap gap-1.5">
                {o.items.map((it, i) => (
                  <span key={i} className="rounded-full bg-[#E3F6FD] px-2.5 py-1 text-[11px] font-extrabold text-[#006387]">{it.titleSnapshot} ×{fa(it.qty)}</span>
                ))}
                {(o.charmHearts > 0 || o.charmPaws > 0) && (
                  <span className="rounded-full bg-[#FFE0EA] px-2.5 py-1 text-[11px] font-extrabold text-[#B03A5B]">❤️ {fa(o.charmHearts)} · 🐾 {fa(o.charmPaws)}</span>
                )}
                {o.mediaCount > 0 && <span className="rounded-full bg-[#E7E0FA] px-2.5 py-1 text-[11px] font-extrabold text-[#5B4A8A]">🎙️ {fa(o.mediaCount)} پیوست</span>}
                {o.retentionPlan !== "1m" && (
                  <span className="rounded-full bg-[#FFF3C9] px-2.5 py-1 text-[11px] font-extrabold text-[#8A6D1F]">⏳ نگهداری {o.retentionPlan === "12m" ? "۱ساله" : "۶ماهه"}</span>
                )}
                {o.messagePurgeStatus !== "active" && <span className="rounded-full bg-[#F0F3F5] px-2.5 py-1 text-[11px] font-extrabold text-[#4A6572]">پیام پاک شده</span>}
              </div>
              {o.message && (
                <p className="m-0 whitespace-pre-wrap rounded-[14px] bg-[#F5FBFD] p-3 text-[12.5px] font-medium leading-[2] text-[#04202E]">{o.message}</p>
              )}
              {o.refundReason && (
                <p className="m-0 mt-2 rounded-[14px] bg-[#FFF7FA] p-3 text-[12.5px] font-bold text-[#B03A5B]">مرجوعی: {o.refundReason}</p>
              )}
            </div>

            {/* payments */}
            {o.payments.length > 0 && (
              <div className="mb-4 rounded-[18px] border border-[#EDF6FA] p-4">
                <h4 className="m-0 mb-2 text-[13px] font-black text-[#04202E]">تلاش‌های پرداخت</h4>
                <div className="flex flex-col gap-1.5">
                  {o.payments.map((p, i) => (
                    <div key={i} className="flex flex-wrap items-center justify-between gap-2 rounded-[14px] bg-[#F5FBFD] px-3 py-2 text-[12px] font-bold text-[#4A6572]">
                      <span>#{fa(p.attemptNo)} — {p.method === "zarinpal" ? "زرین‌پال" : "کارت‌به‌کارت"}</span>
                      <span>{money(p.amountToman)} تومان</span>
                      <StatusChip s={p.status === "verified" ? "delivered" : p.status === "pending_review" ? "payment_under_review" : p.status === "rejected" ? "failed" : "awaiting_payment"} />
                      <span className="text-[10.5px]">{jalaliDateTime(p.createdAt)}</span>
                      {p.refId && <span dir="ltr" className="text-[10.5px]">ref: {p.refId}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* timeline */}
            <div className="rounded-[18px] border border-[#EDF6FA] p-4">
              <h4 className="m-0 mb-3 text-[13px] font-black text-[#04202E]">تایم‌لاین رویدادها</h4>
              <ol className="m-0 flex list-none flex-col gap-0 p-0">
                {o.events.map((e, i) => (
                  <li key={e.id} className="relative flex gap-3 pb-4 last:pb-0">
                    {/* connector */}
                    {i < o.events.length - 1 && <span className="absolute right-[11px] top-6 h-[calc(100%-16px)] w-[2px] bg-[#DDEEF5]" aria-hidden="true" />}
                    <span className="z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E3F6FD] text-[11px]" aria-hidden="true">
                      {e.type === "status_changed" ? "🔄" : e.type === "payment" ? "💳" : e.type === "gift_opened" ? "🎁" : e.type === "created" ? "✨" : "📋"}
                    </span>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <p className="m-0 text-[12.5px] font-bold text-[#04202E]">
                        {EVENT_LABEL[e.type] ?? e.type}
                        {e.type === "status_changed" && e.toStatus ? ` → ${STATUS_LABEL[e.toStatus]?.label ?? e.toStatus}` : ""}
                      </p>
                      <p className="m-0 text-[10.5px] font-semibold text-[#7C99A6]">
                        {e.actor === "admin" ? "مدیر" : e.actor === "owner" ? "ادمین" : e.actor === "customer" ? "مشتری" : "سیستم"}
                        {" · "}
                        {jalaliDateTime(e.createdAt)}
                        {e.note ? ` — ${e.note}` : ""}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </>
        )}
      </div>
    </div>
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

/* ═══════════ TAB 2.7 — RENEWALS («تمدید نگهداری» queue, mission §۴) ═══════════ */

interface AdminRenewal {
  id: string;
  code: string;
  orderCode: string;
  plan: string;
  priceToman: number;
  status: string;
  requestedByPhone: string;
  receiptKey: string;
  cancelReason: string;
  createdAt: string;
  order: {
    recipientName: string;
    recipientPhone: string;
    retentionPlan: string;
    messageExpiresAt: string | null;
    messagePurgeStatus: string;
    orderStatus: string;
  };
}

function RenewalsTab() {
  const [renewals, setRenewals] = useState<AdminRenewal[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"payment_under_review" | "paid" | "cancelled" | "awaiting_payment">("payment_under_review");
  const { toast } = useToast();

  const load = () => {
    fetch(`/api/admin/renewals?status=${filter}`, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((j: { renewals?: AdminRenewal[] }) => {
        setRenewals(j.renewals ?? []);
        setError(null);
      })
      .catch(() => setError("اتصال به سرور برقرار نشد."));
  };

  useEffect(() => {
    load();
  }, [filter]);

  const act = async (r: AdminRenewal, action: "approve" | "reject") => {
    try {
      const res = await fetch(`/api/admin/renewals/${r.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, reason: action === "reject" ? "رد توسط مدیر" : "" }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string; expiresAt?: string };
      if (!res.ok) {
        toast({ title: "انجام نشد!", description: body.error === "purged_not_renewable" ? "محتوا قبل از تأیید حذف شده؛ تمدید لغو شد." : body.error ?? "خطای سرور" });
        load();
        return;
      }
      toast({
        title: action === "approve" ? "تمدید تأیید شد ✓" : "تمدید رد شد",
        description: action === "approve" ? `${r.code} — مهلت تا ${new Intl.DateTimeFormat("fa-IR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(body.expiresAt ?? Date.now()))} تمدید شد.` : `${r.code} لغو شد.`,
      });
      load();
    } catch {
      toast({ title: "خطای شبکه", description: "دوباره تلاش کن." });
    }
  };

  const FILTERS = [
    { key: "payment_under_review", label: "در انتظار بررسی" },
    { key: "awaiting_payment", label: "منتظر واریز" },
    { key: "paid", label: "تأییدشده" },
    { key: "cancelled", label: "لغوشده" },
  ] as const;

  return (
    <div className="flex flex-col gap-4">
      <p className="m-0 text-[13px] font-semibold leading-[2] text-[#4A6572]">
        تمدیدهای پولی نگهداری پیام — فقط بعد از چکِ واریز واقعی، «تأیید» بزن. تأیید یعنی مهلت پیام همان‌جا تمدید می‌شود.
      </p>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
            className="h-10 rounded-full px-4 text-[12.5px] font-extrabold transition-all"
            style={{
              background: filter === f.key ? "#04202E" : "#fff",
              border: `1.5px solid ${filter === f.key ? "#04202E" : "#CFE6EF"}`,
              color: filter === f.key ? "#fff" : "#04202E",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="rounded-[24px] border-2 border-dashed border-[#F0B7C9] bg-[#FFF7FA] px-6 py-10 text-center text-[14px] font-bold text-[#B02A52]">
          {error}
        </div>
      )}
      {!error && renewals === null && (
        <div className="flex flex-col gap-3">
          {[0, 1].map((i) => (
            <div key={i} className="h-[100px] animate-pulse rounded-[20px] bg-white/70" />
          ))}
        </div>
      )}
      {!error && renewals?.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-[24px] border-2 border-dashed border-[#99D6EE] bg-white/60 px-6 py-12 text-center">
          <span className="text-[40px]">⏳</span>
          <p className="m-0 text-[14.5px] font-bold">چیزی در این وضعیت نیست.</p>
        </div>
      )}
      {renewals?.map((r) => {
        const purged = r.order.messagePurgeStatus === "purged";
        return (
          <div key={r.id} className="rounded-[20px] border border-[#DDEEF5] bg-white p-4 md:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="rounded-[12px] bg-[#04202E] px-2.5 py-1 text-[12px] font-extrabold text-white" dir="ltr">
                  {r.code}
                </span>
                <span className="text-[13.5px] font-black">{money(r.priceToman)} تومان</span>
                <span className="rounded-full bg-[#E3F6FD] px-2.5 py-1 text-[11px] font-extrabold text-[#006387]">
                  پلن {r.plan === "12m" ? "۱ ساله" : "۶ ماهه"}
                </span>
              </div>
              <span className="text-[11.5px] font-bold text-[#4A6572]" dir="ltr">
                {new Intl.DateTimeFormat("fa-IR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(r.createdAt))}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12.5px] font-semibold text-[#4A6572]">
              <span>سفارش: <b dir="ltr">{r.orderCode}</b></span>
              <span>گیرنده: {r.order.recipientName}</span>
              <span dir="ltr">{r.requestedByPhone}</span>
              <span>پلن فعلی سفارش: {r.order.retentionPlan === "1m" ? "۱ ماه" : r.order.retentionPlan === "6m" ? "۶ ماه" : "۱ سال"}</span>
              {r.order.messageExpiresAt && <span>انقضای فعلی: {new Intl.DateTimeFormat("fa-IR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(r.order.messageExpiresAt))}</span>}
              {purged && <span className="font-extrabold text-[#B02A52]">⚠️ محتوا حذف شده — تأیید بدون اثر است</span>}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[#EDF6FA] pt-3">
              {["payment_under_review", "awaiting_payment"].includes(r.status) && (
                <>
                  <button
                    type="button"
                    onClick={() => void act(r, "approve")}
                    className="flex h-10 items-center gap-1.5 rounded-full bg-[#D7F5E4] px-4 text-[12.5px] font-extrabold text-[#2E7D53] transition-all hover:bg-[#C4EED6] active:scale-95"
                  >
                    تأیید — تمدید اعمال شود
                  </button>
                  <button
                    type="button"
                    onClick={() => void act(r, "reject")}
                    className="flex h-10 items-center gap-1.5 rounded-full bg-[#FFE9F0] px-4 text-[12.5px] font-extrabold text-[#B02A52] transition-all hover:bg-[#FFDCE7] active:scale-95"
                  >
                    رد
                  </button>
                </>
              )}
              {r.receiptKey && (
                <a
                  href={`/api/admin/renewals/${r.id}/receipt`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[#E3F6FD] px-4 text-[12.5px] font-extrabold text-[#006387] hover:bg-[#D6F1FB]"
                >
                  دیدن رسید ⤢
                </a>
              )}
              {r.status === "cancelled" && r.cancelReason && (
                <span className="text-[11.5px] font-bold text-[#B02A52]">لغو: {r.cancelReason}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════ TAB 2.5 — PRODUCTS («افزودنی‌ها» shelf, mission §۵) ═══════════ */

interface AdminProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  kind: "main_gift" | "addon";
  emoji: string;
  image: string | null;
  images: { id: string; url: string; alt: string; sortOrder: number }[];
  sizeLabel: string;
  colors: string;
  specs: string;
  isActive: boolean;
  variant: { id: string; sku: string; priceToman: number; stock: number; isActive: boolean } | null;
}

interface SpecRow {
  label: string;
  value: string;
}

// «مشخصات و ظاهر» — gallery cap is server-enforced too (products/[id]/images)
const GALLERY_MAX = 6;

// specs lives as a JSON string column — legacy/junk rows must never crash the panel
function isSpecRow(r: unknown): r is SpecRow {
  return (
    typeof r === "object" &&
    r !== null &&
    typeof (r as { label?: unknown }).label === "string" &&
    typeof (r as { value?: unknown }).value === "string"
  );
}

function parseSpecs(raw: string): SpecRow[] {
  try {
    const arr: unknown = JSON.parse(raw || "[]");
    if (!Array.isArray(arr)) return [];
    return arr
      .filter(isSpecRow)
      .slice(0, 12)
      .map((r) => ({ label: r.label, value: r.value }));
  } catch {
    return [];
  }
}

function GallerySpinner({ size = 20 }: { size?: number }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block animate-spin rounded-full border-2 border-[#00ABE7] border-t-transparent"
      style={{ width: size, height: size }}
    />
  );
}

const PLACEHOLDER_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" rx="20" fill="#F2FAFD"/><text x="48" y="60" font-size="40" text-anchor="middle">🎁</text></svg>`,
  );

function ProductsTab() {
  const [products, setProducts] = useState<AdminProduct[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState({ name: "", emoji: "🎁", price: "", stock: "20", description: "" });
  const [busy, setBusy] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null); // expanded edit card
  const [edit, setEdit] = useState({ name: "", emoji: "", description: "", price: "", stock: "" });
  const [galleryBusyId, setGalleryBusyId] = useState<string | null>(null); // any in-flight gallery op
  const [uploadProgress, setUploadProgress] = useState<{ productId: string; done: number; total: number } | null>(null);
  const [altDraft, setAltDraft] = useState(""); // alt applied to the next uploads
  const [attrs, setAttrs] = useState<{ sizeLabel: string; colors: string; rows: SpecRow[] }>({ sizeLabel: "", colors: "", rows: [] });
  const { toast } = useToast();

  const load = () => {
    fetch("/api/admin/products", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((j: { products?: AdminProduct[] }) => {
        setProducts(j.products ?? []);
        setError(null);
      })
      .catch(() => setError("اتصال به سرور برقرار نشد."));
  };

  useEffect(() => {
    load();
  }, []);

  const patch = async (p: AdminProduct, body: Record<string, unknown>, okMsg = "ذخیره شد ✓") => {
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/products/${p.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const b = (await res.json().catch(() => ({}))) as { error?: string };
        toast({
          title: "ذخیره نشد",
          description: b.error === "bad_input" ? "مقدار واردشده معتبر نیست." : "خطای سرور — دوباره تلاش کن.",
        });
        return false;
      }
      toast({ title: okMsg });
      load();
      return true;
    } catch {
      toast({ title: "ذخیره نشد — دوباره امتحان کن" });
      return false;
    } finally {
      setBusy(false);
    }
  };

  const createAddon = async () => {
    const price = Number(draft.price.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/\D/g, ""));
    if (draft.name.trim().length < 2 || !Number.isFinite(price) || price <= 0) {
      toast({ title: "اسم و قیمت معتبر لازمه" });
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: draft.name.trim(),
          kind: "addon",
          emoji: draft.emoji.trim() || "🎁",
          description: draft.description.trim(),
          priceToman: price,
          stock: Number(draft.stock.replace(/\D/g, "")) || 0,
        }),
      });
      if (!res.ok) throw new Error();
      toast({ title: "افزودنی جدید ثبت شد ✓", description: "از الان تو سبد خرید مشتری‌ها می‌افته." });
      setDraft({ name: "", emoji: "🎁", price: "", stock: "20", description: "" });
      setCreating(false);
      load();
    } catch {
      toast({ title: "ثبت نشد — دوباره امتحان کن" });
    } finally {
      setBusy(false);
    }
  };

  // ── گالری تصاویر (round 34): multi-upload / reorder / delete via /images API ──
  const galleryErrText = (code: string | undefined) =>
    code === "gallery_full"
      ? "سقف گالری ۶ عکسه."
      : code === "file_too_large"
        ? "حجم عکس بیشتر از ۵ مگابایته."
        : code === "bad_file_type"
          ? "فقط عکس JPG / PNG / WebP قبوله."
          : "آپلود نشد — دوباره تلاش کن.";

  const uploadImages = async (p: AdminProduct, files: File[]) => {
    if (!files.length) return;
    const room = GALLERY_MAX - p.images.length;
    if (room <= 0) {
      toast({ title: "سقف گالری ۶ عکسه", description: "برای عکس جدید، اول یکی از عکس‌ها رو حذف کن." });
      return;
    }
    const queue = files.slice(0, room);
    if (files.length > room) {
      toast({ title: `${fa(files.length - room)} عکس جا نشد`, description: `فقط جا برای ${fa(room)} عکس دیگه هست.` });
    }
    setGalleryBusyId(p.id);
    let done = 0;
    for (const file of queue) {
      setUploadProgress({ productId: p.id, done, total: queue.length });
      try {
        const fd = new FormData();
        fd.set("file", file);
        const alt = altDraft.trim().slice(0, 120);
        if (alt) fd.set("alt", alt);
        const res = await fetch(`/api/admin/products/${p.id}/images`, { method: "POST", body: fd });
        const b = (await res.json().catch(() => ({}))) as { error?: string };
        if (!res.ok) {
          toast({ title: `«${file.name}» ذخیره نشد`, description: galleryErrText(b.error) });
          if (b.error === "gallery_full") break; // server is the source of truth on the cap
        } else {
          done++;
        }
      } catch {
        toast({ title: `«${file.name}» آپلود نشد`, description: "دوباره تلاش کن." });
      }
    }
    setUploadProgress(null);
    setGalleryBusyId(null);
    if (done > 0) {
      toast({
        title: done === 1 ? "عکس ثبت شد ✓" : `${fa(done)} عکس ثبت شد ✓`,
        description: "اولین عکس، کاور محصول می‌شه و تو صفحه‌ی خرید نمایش داده می‌شه.",
      });
      setAltDraft("");
      load();
    }
  };

  const moveImage = async (p: AdminProduct, imageId: string, dir: -1 | 1) => {
    const ordered = [...p.images].sort((a, b) => a.sortOrder - b.sortOrder);
    const idx = ordered.findIndex((i) => i.id === imageId);
    const next = idx + dir;
    if (idx < 0 || next < 0 || next >= ordered.length) return;
    const order = [...ordered];
    const tmp = order[idx];
    order[idx] = order[next];
    order[next] = tmp;
    setGalleryBusyId(p.id);
    try {
      const res = await fetch(`/api/admin/products/${p.id}/images`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: order.map((i) => i.id) }),
      });
      if (!res.ok) throw new Error();
      load();
    } catch {
      toast({ title: "جابه‌جایی نشد — دوباره تلاش کن" });
    } finally {
      setGalleryBusyId(null);
    }
  };

  const deleteImage = async (p: AdminProduct, imageId: string) => {
    setGalleryBusyId(p.id);
    try {
      const res = await fetch(`/api/admin/products/${p.id}/images?imageId=${encodeURIComponent(imageId)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      toast({ title: "عکس حذف شد" });
      load();
    } catch {
      toast({ title: "حذف نشد — دوباره تلاش کن" });
    } finally {
      setGalleryBusyId(null);
    }
  };

  // ── مشخصات و ظاهر — separate save (price/stock keep their own flow) ──
  const saveAttrs = async (p: AdminProduct) => {
    const specs = attrs.rows
      .map((r) => ({ label: r.label.trim().slice(0, 40), value: r.value.trim().slice(0, 120) }))
      .filter((r) => r.label !== "" && r.value !== "");
    await patch(
      p,
      {
        sizeLabel: attrs.sizeLabel.trim().slice(0, 60),
        colors: attrs.colors.trim().slice(0, 200),
        specs,
      },
      "مشخصات ذخیره شد ✓",
    );
  };

  const openEdit = (p: AdminProduct) => {
    setOpenId(openId === p.id ? null : p.id);
    setEdit({
      name: p.name,
      emoji: p.emoji,
      description: p.description,
      price: String(p.variant?.priceToman ?? 0),
      stock: String(p.variant?.stock ?? 0),
    });
    setAttrs({ sizeLabel: p.sizeLabel ?? "", colors: p.colors ?? "", rows: parseSpecs(p.specs ?? "[]") });
    setAltDraft("");
  };

  const saveEdit = async (p: AdminProduct) => {
    const price = Number(edit.price.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/\D/g, ""));
    const stock = Number(edit.stock.replace(/\D/g, ""));
    const ok = await patch(
      p,
      {
        name: edit.name.trim().length >= 2 ? edit.name.trim() : p.name,
        emoji: edit.emoji.trim() || p.emoji,
        description: edit.description.trim(),
        ...(Number.isFinite(price) ? { priceToman: price } : {}),
        ...(Number.isFinite(stock) ? { stock } : {}),
      },
      "محصول به‌روز شد ✓",
    );
    if (ok) setOpenId(null);
  };

  if (error) {
    return (
      <div className="rounded-[22px] bg-[#FFE9F0] px-5 py-4 text-[13.5px] font-bold text-[#B02A52]">{error}</div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* create form */}
      <div className="rounded-[24px] border border-[#DDEEF5] bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-[16px] font-black">افزودنی جدید</span>
            <span className="text-[12.5px] font-medium text-[#4A6572]">
              محصولات مکمل (دستبند، عروسک، ساعت و…) بدون هیچ تغییر کدی وارد سبد خرید می‌شن.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setCreating((v) => !v)}
            className="h-11 rounded-full bg-[#04202E] px-5 text-[13.5px] font-extrabold text-white"
          >
            {creating ? "بستن فرم" : "+ افزودنی تازه"}
          </button>
        </div>
        {creating && (
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-6">
            <input
              value={draft.emoji}
              onChange={(e) => setDraft({ ...draft, emoji: e.target.value })}
              placeholder="📿"
              aria-label="ایموجی"
              className="h-12 rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3 text-center text-xl md:col-span-1"
            />
            <input
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              placeholder="اسم افزودنی (مثلاً دستبند مهربونی)"
              aria-label="نام محصول"
              className="h-12 rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3 text-[14px] font-bold md:col-span-2"
            />
            <input
              value={draft.price}
              onChange={(e) => setDraft({ ...draft, price: e.target.value })}
              placeholder="قیمت (تومان)"
              aria-label="قیمت به تومان"
              inputMode="numeric"
              className="h-12 rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3 text-[14px] font-bold md:col-span-1"
            />
            <input
              value={draft.stock}
              onChange={(e) => setDraft({ ...draft, stock: e.target.value })}
              placeholder="موجودی"
              aria-label="موجودی"
              inputMode="numeric"
              className="h-12 rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3 text-[14px] font-bold md:col-span-1"
            />
            <button
              type="button"
              disabled={busy}
              onClick={() => void createAddon()}
              className="h-12 rounded-full bg-[#00ABE7] text-[14px] font-extrabold text-[#04202E] disabled:opacity-60 md:col-span-1"
            >
              ثبت
            </button>
            <input
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              placeholder="توضیح کوتاه (اختیاری — تو صفحه جزئیات نمایش داده می‌شه)"
              aria-label="توضیح"
              className="h-12 rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3 text-[14px] md:col-span-6"
            />
          </div>
        )}
      </div>

      {/* list */}
      {products === null ? (
        <div className="rounded-[22px] bg-white px-5 py-6 text-center text-[13px] font-bold text-[#4A6572]">در حال بارگذاری…</div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {products.map((p) => {
            const expanded = openId === p.id;
            const orderedImages = [...(p.images ?? [])].sort((a, b) => a.sortOrder - b.sortOrder);
            return (
              <div key={p.id} className="flex flex-col rounded-[22px] border border-[#DDEEF5] bg-white px-4 py-3.5">
                <div className="flex flex-wrap items-center gap-3">
                  {/* photo / emoji */}
                  <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[16px] bg-[#F2FAFD]">
                    {p.image ? (
                       
                      <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-2xl" aria-hidden="true">{p.emoji || "🎁"}</span>
                    )}
                    {galleryBusyId === p.id && (
                      <span className="absolute inset-0 flex items-center justify-center bg-white/70 text-[10px] font-black text-[#006387]">…</span>
                    )}
                  </span>
                  <div className="flex min-w-[160px] flex-1 flex-col gap-0.5">
                    <span className="flex items-center gap-2 text-[14.5px] font-extrabold">
                      {p.name}
                      <span
                        className="rounded-full px-2 py-0.5 text-[9.5px] font-extrabold"
                        style={{ background: p.kind === "addon" ? "#E3F6FD" : "#F2F7F9", color: p.kind === "addon" ? "#006387" : "#4A6572" }}
                      >
                        {p.kind === "addon" ? "افزودنی" : "هدیه اصلی"}
                      </span>
                    </span>
                    <span className="font-mono text-[11px] text-[#4A6572]" dir="ltr">{p.variant?.sku ?? p.slug}</span>
                  </div>
                  <label className="flex items-center gap-1.5 text-[11.5px] font-bold text-[#4A6572]">
                    قیمت
                    <input
                      defaultValue={p.variant?.priceToman ?? 0}
                      onBlur={(e) => {
                        const v = Number(e.target.value.replace(/\D/g, ""));
                        if (Number.isFinite(v) && v !== p.variant?.priceToman) void patch(p, { priceToman: v });
                      }}
                      aria-label={`قیمت ${p.name}`}
                      inputMode="numeric"
                      className="h-10 w-[110px] rounded-xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-2 text-center text-[13px] font-bold"
                    />
                  </label>
                  <label className="flex items-center gap-1.5 text-[11.5px] font-bold text-[#4A6572]">
                    موجودی
                    <input
                      defaultValue={p.variant?.stock ?? 0}
                      onBlur={(e) => {
                        const v = Number(e.target.value.replace(/\D/g, ""));
                        if (Number.isFinite(v) && v !== p.variant?.stock) void patch(p, { stock: v });
                      }}
                      aria-label={`موجودی ${p.name}`}
                      inputMode="numeric"
                      className="h-10 w-[72px] rounded-xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-2 text-center text-[13px] font-bold"
                    />
                  </label>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void patch(p, { isActive: !p.isActive })}
                    className="h-10 rounded-full px-4 text-[12px] font-extrabold disabled:opacity-60"
                    style={{ background: p.isActive ? "#DDF3EA" : "#F2F7F9", color: p.isActive ? "#0B6E4F" : "#4A6572" }}
                  >
                    {p.isActive ? "فعال" : "غیرفعال"}
                  </button>
                  <button
                    type="button"
                    onClick={() => openEdit(p)}
                    aria-expanded={expanded}
                    className="h-10 rounded-full border-[1.5px] border-[#CFE6EF] bg-white px-4 text-[12px] font-extrabold text-[#006387]"
                  >
                    {expanded ? "بستن" : "ویرایش"}
                  </button>
                </div>

                {expanded && (
                  <div className="mt-4 flex flex-col gap-4 border-t border-[#EFF6F9] pt-4">
                    {/* ── گالری تصاویر (round 34) ── */}
                    <section className="flex flex-col gap-3 rounded-[16px] border border-[#DDEEF5] bg-[#F8FDFF] p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[13.5px] font-black text-[#04202E]">گالری تصاویر</span>
                        <span className="rounded-full bg-white px-3 py-1 text-[10.5px] font-bold text-[#4A6572]">
                          {orderedImages.length} از {GALLERY_MAX} — اولین عکس، کاور محصوله
                        </span>
                      </div>
                      <div className="flex flex-wrap items-start gap-3">
                        {orderedImages.map((img, idx) => (
                          <span key={img.id} className="flex flex-col items-center gap-1.5">
                            <span className="relative block h-[104px] w-[104px] overflow-hidden rounded-[16px] border-[1.5px] border-[#DDEEF5] bg-white">
                              <img src={img.url} alt={img.alt || p.name} className="h-full w-full object-cover" />
                              {idx === 0 && (
                                <span className="absolute right-1.5 top-1.5 rounded-full bg-[#04202E]/85 px-2 py-0.5 text-[9.5px] font-black text-white">
                                  کاور
                                </span>
                              )}
                              {galleryBusyId === p.id && (
                                <span className="absolute inset-0 flex items-center justify-center bg-white/60">
                                  <GallerySpinner />
                                </span>
                              )}
                            </span>
                            <span className="flex items-center gap-1">
                              <button
                                type="button"
                                disabled={idx === 0 || galleryBusyId === p.id}
                                onClick={() => void moveImage(p, img.id, -1)}
                                aria-label={`عکس ${idx + 1} — جابه‌جایی به راست`}
                                className="flex h-6 w-6 items-center justify-center rounded-lg border-[1.5px] border-[#DDEEF5] bg-white text-[10px] text-[#006387] disabled:opacity-40"
                              >
                                ▶
                              </button>
                              <button
                                type="button"
                                disabled={idx === orderedImages.length - 1 || galleryBusyId === p.id}
                                onClick={() => void moveImage(p, img.id, 1)}
                                aria-label={`عکس ${idx + 1} — جابه‌جایی به چپ`}
                                className="flex h-6 w-6 items-center justify-center rounded-lg border-[1.5px] border-[#DDEEF5] bg-white text-[10px] text-[#006387] disabled:opacity-40"
                              >
                                ◀
                              </button>
                              <button
                                type="button"
                                disabled={galleryBusyId === p.id}
                                onClick={() => void deleteImage(p, img.id)}
                                aria-label={`حذف عکس ${idx + 1}`}
                                className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#FFE9F0] text-[12px] font-black text-[#B02A52] disabled:opacity-40"
                              >
                                ×
                              </button>
                            </span>
                          </span>
                        ))}
                        {orderedImages.length < GALLERY_MAX ? (
                          <label
                            className={`flex h-[104px] w-[104px] cursor-pointer flex-col items-center justify-center gap-1 rounded-[16px] border-[1.5px] border-dashed bg-white text-center transition-colors ${
                              galleryBusyId === p.id ? "border-[#CFE6EF] opacity-70" : "border-[#00ABE7] hover:bg-[#F2FAFD]"
                            }`}
                          >
                            {uploadProgress?.productId === p.id ? (
                              <>
                                <GallerySpinner />
                                <span className="px-1 text-[9.5px] font-bold leading-[1.5] text-[#006387]">
                                  آپلود {fa(uploadProgress.done + 1)} از {fa(uploadProgress.total)}
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="text-xl font-black leading-none text-[#00ABE7]">+</span>
                                <span className="px-1 text-[9.5px] font-bold leading-[1.5] text-[#4A6572]">افزودن عکس</span>
                              </>
                            )}
                            <input
                              type="file"
                              multiple
                              accept="image/jpeg,image/png,image/webp"
                              className="hidden"
                              disabled={galleryBusyId === p.id}
                              onChange={(e) => {
                                const files = Array.from(e.target.files ?? []);
                                e.target.value = "";
                                if (files.length) void uploadImages(p, files);
                              }}
                            />
                          </label>
                        ) : (
                          <span className="flex h-[104px] w-[104px] items-center justify-center rounded-[16px] border-[1.5px] border-dashed border-[#CFE6EF] bg-white px-2 text-center text-[9.5px] font-bold leading-[1.6] text-[#4A6572]">
                            سقف گالری ۶ عکسه
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="flex flex-col gap-1 text-[11px] font-bold text-[#4A6572]">
                          متن جایگزین عکس (اختیاری — موقع آپلود ثبت می‌شه)
                          <input
                            value={altDraft}
                            onChange={(e) => setAltDraft(e.target.value)}
                            maxLength={120}
                            placeholder="مثلاً عروسک پشمالوی قهوه‌ای با روبان کرم"
                            className="h-9 max-w-[340px] rounded-xl border-[1.5px] border-[#CFE6EF] bg-white px-3 text-[12px] font-semibold text-[#04202E]"
                          />
                        </label>
                        <span className="text-[10.5px] font-medium leading-[1.7] text-[#4A6572]">
                          JPG / PNG / WebP — حداکثر ۵ مگابایت — چند عکس رو با هم انتخاب کنی پشت‌سرهم آپلود می‌شن.
                        </span>
                      </div>
                    </section>

                    {/* fields */}
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <label className="flex flex-col gap-1 text-[11.5px] font-bold text-[#4A6572]">
                          نام محصول
                          <input
                            value={edit.name}
                            onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                            className="h-11 rounded-xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3 text-[13.5px] font-bold text-[#04202E]"
                          />
                        </label>
                        <label className="flex flex-col gap-1 text-[11.5px] font-bold text-[#4A6572]">
                          ایموجی (وقتی عکس نباشه نشون داده می‌شه)
                          <input
                            value={edit.emoji}
                            onChange={(e) => setEdit({ ...edit, emoji: e.target.value })}
                            className="h-11 rounded-xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3 text-center text-lg"
                          />
                        </label>
                        <label className="flex flex-col gap-1 text-[11.5px] font-bold text-[#4A6572] md:col-span-2">
                          توضیحات (تو دکمه «جزئیات» صفحه خرید نمایش داده می‌شه)
                          <textarea
                            value={edit.description}
                            onChange={(e) => setEdit({ ...edit, description: e.target.value })}
                            rows={3}
                            maxLength={300}
                            className="rounded-xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3 py-2 text-[13.5px] leading-[1.9] text-[#04202E]"
                          />
                        </label>
                        <label className="flex flex-col gap-1 text-[11.5px] font-bold text-[#4A6572]">
                          قیمت (تومان)
                          <input
                            value={edit.price}
                            onChange={(e) => setEdit({ ...edit, price: e.target.value })}
                            inputMode="numeric"
                            className="h-11 rounded-xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3 text-[13.5px] font-bold text-[#04202E]"
                          />
                        </label>
                        <label className="flex flex-col gap-1 text-[11.5px] font-bold text-[#4A6572]">
                          موجودی
                          <input
                            value={edit.stock}
                            onChange={(e) => setEdit({ ...edit, stock: e.target.value })}
                            inputMode="numeric"
                            className="h-11 rounded-xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3 text-[13.5px] font-bold text-[#04202E]"
                          />
                        </label>
                      </div>

                      {/* ── مشخصات و ظاهر (round 34) — هر دو نوع محصول ── */}
                    <section className="flex flex-col gap-3 rounded-[16px] border border-[#DDEEF5] bg-[#F8FDFF] p-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[13.5px] font-black text-[#04202E]">مشخصات و ظاهر</span>
                        <span className="text-[11.5px] font-medium text-[#4A6572]">
                          برای هدیه‌های اصلی و افزودنی‌ها — تو صفحه‌ی جزئیات محصول نمایش داده می‌شه.
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <label className="flex flex-col gap-1 text-[11.5px] font-bold text-[#4A6572]">
                          اندازه / ابعاد
                          <input
                            value={attrs.sizeLabel}
                            onChange={(e) => setAttrs((a) => ({ ...a, sizeLabel: e.target.value }))}
                            maxLength={60}
                            placeholder="حدود ۳۰ سانتی‌متر"
                            className="h-11 rounded-xl border-[1.5px] border-[#CFE6EF] bg-white px-3 text-[13px] font-bold text-[#04202E]"
                          />
                        </label>
                        <label className="flex flex-col gap-1 text-[11.5px] font-bold text-[#4A6572]">
                          رنگ‌ها (با ویرگول جدا کن)
                          <input
                            value={attrs.colors}
                            onChange={(e) => setAttrs((a) => ({ ...a, colors: e.target.value }))}
                            maxLength={200}
                            placeholder="قهوه‌ای، کرم"
                            className="h-11 rounded-xl border-[1.5px] border-[#CFE6EF] bg-white px-3 text-[13px] font-bold text-[#04202E]"
                          />
                        </label>
                      </div>
                      <span className="text-[11.5px] font-bold text-[#4A6572]">جدول مشخصات</span>
                      {attrs.rows.map((row, i) => (
                        <span key={i} className="flex items-center gap-2">
                          <input
                            value={row.label}
                            onChange={(e) => {
                              const v = e.target.value;
                              setAttrs((a) => ({ ...a, rows: a.rows.map((r, j) => (j === i ? { ...r, label: v } : r)) }));
                            }}
                            maxLength={40}
                            placeholder="عنوان (مثلاً جنس)"
                            className="h-10 min-w-0 flex-1 rounded-xl border-[1.5px] border-[#CFE6EF] bg-white px-3 text-[12.5px] font-bold text-[#04202E]"
                          />
                          <input
                            value={row.value}
                            onChange={(e) => {
                              const v = e.target.value;
                              setAttrs((a) => ({ ...a, rows: a.rows.map((r, j) => (j === i ? { ...r, value: v } : r)) }));
                            }}
                            maxLength={120}
                            placeholder="مقدار (مثلاً پشم و پنبه)"
                            className="h-10 min-w-0 flex-[1.6] rounded-xl border-[1.5px] border-[#CFE6EF] bg-white px-3 text-[12.5px] font-bold text-[#04202E]"
                          />
                          <button
                            type="button"
                            onClick={() => setAttrs((a) => ({ ...a, rows: a.rows.filter((_, j) => j !== i) }))}
                            aria-label={`حذف ردیف ${i + 1}`}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFE9F0] text-[14px] font-black text-[#B02A52]"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      <span className="flex flex-wrap items-center justify-between gap-2">
                        <button
                          type="button"
                          disabled={attrs.rows.length >= 12}
                          onClick={() => setAttrs((a) => ({ ...a, rows: [...a.rows, { label: "", value: "" }] }))}
                          className="h-10 rounded-full border-[1.5px] border-[#CFE6EF] bg-white px-4 text-[11.5px] font-extrabold text-[#006387] disabled:opacity-50"
                        >
                          + ردیف جدید
                        </button>
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => void saveAttrs(p)}
                          className="h-10 rounded-full bg-[#04202E] px-5 text-[11.5px] font-extrabold text-white disabled:opacity-60"
                        >
                          ذخیره مشخصات
                        </button>
                      </span>
                      <span className="text-[10.5px] font-medium leading-[1.7] text-[#4A6572]">
                        ردیف‌هایی که عنوان یا مقدارشون خالی باشه موقع ذخیره حذف می‌شن.
                      </span>
                    </section>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setOpenId(null)}
                        className="h-11 rounded-full border-[1.5px] border-[#CFE6EF] bg-white px-5 text-[12.5px] font-extrabold text-[#4A6572]"
                      >
                        انصراف
                      </button>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void saveEdit(p)}
                        className="h-11 rounded-full bg-[#00ABE7] px-6 text-[12.5px] font-extrabold text-[#04202E] disabled:opacity-60"
                      >
                        ذخیره تغییرات
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
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

/* ═══════════ TAB 5 — BLOG STUDIO (round 34-h) ═══════════ */
// The full studio (list + MDXEditor + SEO panel) lives in
// components/shop/blog/blog-studio.tsx and lazily loads the editor so this
// tab's bundle cost is paid only when «بلاگ» is opened.

function BlogTab({ role }: { role?: string | null }) {
  return <BlogStudio role={role} />;
}

/* ═══════════ TAB 7 — SMS (owner-only, «پیامک‌ها») ═══════════ */
// بخش پیامک کامل (owner round): تنظیمات قالب‌ها + کد پترن ippanel + متن
// پیش‌فرض قابل ویرایش + ارسال آزمایشی + گزارش ارسال‌ها. متن‌ها در لحظه‌ی
// ارسال از جدول SmsTemplate خوانده می‌شوند — یعنی هر تغییر اینجا بدون
// تغییر کد، روی پیامک‌های بعدی اعمال می‌شود.

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

function SmsTab() {
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

  const load = () => {
    fetch("/api/admin/sms", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((j: SmsData) => {
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
    fetch(`/api/admin/sms/logs?status=${encodeURIComponent(status)}&page=${page}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
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
      load();
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
      loadLogs(logStatus, 1);
      load();
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
      loadLogs(logStatus, logPage);
      load();
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

/* ═══════════ TAB 6 — SETTINGS (owner-only, «تنظیمات») ═══════════ */
// Everything here is server-consumed (pricing.ts / manual payments). The tab
// is hidden from مدیر فروشگاه in the UI AND the PATCH endpoint is owner-only.

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
            width={72}
            height={72}
            style={{ width: 72, height: 72, objectFit: "contain" }}
            className="rounded-[18px]"
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

function SettingsTab() {
  const [s, setS] = useState<SettingsShape>(SETTINGS_DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const load = () => {
    fetch("/api/admin/settings", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((j: { settings?: Record<string, string> }) => {
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

/* ═══════════ TAB — اسلایدرها (hero slider editor, owner round 30) ═══════════
 * The home hero is server-driven: this tab edits Setting `home_slides`
 * through /api/admin/slides (any admin seat). Every row: text + CTA + colors
 * + plush OR custom image + enable/order. Live mini preview per row. */

const HERO_ROUTE_LABELS: Record<string, string> = {
  home: "خانه",
  friends: "دوستا (همه عروسک‌ها)",
  pick: "ساخت هدیه (قدم ۱)",
  extras: "افزودنی‌ها (قدم ۲)",
  checkout: "گیرنده و پرداخت (قدم ۳)",
  product: "صفحه محصول",
  stories: "قصه‌ی شما",
  impact: "دفتر مهربونی",
  mission: "مأموریت",
  about: "درباره ما",
  blog: "بلاگ",
  reviews: "نظرها",
  shipping: "ارسال",
  contact: "تماس",
  login: "ورود",
  "my-gifts": "هدیه‌های من",
  track: "پیگیری سفارش",
};

const HERO_HASH_LABELS: Record<string, string> = {
  "": "— بدون اسکرول —",
  how: "سکشن «چطوری کار می‌کنه»",
  faq: "سکشن «سؤال‌های رایج»",
};

function SlideField({
  label,
  value,
  onChange,
  maxLength,
  area = false,
  ltr = false,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  maxLength?: number;
  area?: boolean;
  ltr?: boolean;
  placeholder?: string;
}) {
  const cls =
    "w-full rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3.5 py-2.5 text-[13.5px] font-semibold text-[#04202E] outline-none focus:border-[#00ABE7]";
  return (
    <label className="flex flex-col gap-1.5 text-[11.5px] font-bold text-[#4A6572]">
      {label}
      {area ? (
        <textarea rows={3} maxLength={maxLength} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={`${cls} resize-none leading-[1.9]`} />
      ) : (
        <input dir={ltr ? "ltr" : undefined} maxLength={maxLength} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      )}
    </label>
  );
}

function SlideSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-[11.5px] font-bold text-[#4A6572]">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[46px] w-full rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3 text-[13px] font-semibold text-[#04202E] outline-none focus:border-[#00ABE7]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function SlideColor({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex flex-col gap-1.5 text-[11.5px] font-bold text-[#4A6572]">
      {label}
      <span className="flex items-center gap-2">
        <input
          type="color"
          value={/^#[0-9a-fA-F]{6}$/.test(value) ? value : "#00ABE7"}
          onChange={(e) => onChange(e.target.value)}
          aria-label={label}
          className="h-[46px] w-14 shrink-0 cursor-pointer rounded-2xl border-[1.5px] border-[#CFE6EF] bg-white p-1"
        />
        <input
          dir="ltr"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-[46px] w-full rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3 text-[13px] font-bold text-[#04202E] outline-none focus:border-[#00ABE7]"
        />
      </span>
    </label>
  );
}

function routeOptions(): { value: string; label: string }[] {
  return HERO_ROUTES.map((r) => ({ value: r, label: HERO_ROUTE_LABELS[r] ?? r }));
}

function SlidesTab() {
  const [slides, setSlides] = useState<HeroSlide[] | null>(null);
  const [savedAt, setSavedAt] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const load = () => {
    fetch("/api/admin/slides", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error())))
      .then((j: { slides?: HeroSlide[] }) => {
        setSlides(j.slides?.length ? j.slides : DEFAULT_HOME_SLIDES.map((s) => ({ ...s })));
      })
      .catch(() => toast({ title: "بارگذاری اسلایدرها نشد" }));
  };

  useEffect(() => {
    load();
     
  }, []);

  const patch = (i: number, p: Partial<HeroSlide>) =>
    setSlides((prev) => (prev ? prev.map((s, j) => (j === i ? { ...s, ...p } : s)) : prev));

  const move = (i: number, dir: -1 | 1) =>
    setSlides((prev) => {
      if (!prev) return prev;
      const j = i + dir;
      if (j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  const save = async () => {
    if (!slides) return;
    if (!slides.some((s) => s.enabled)) {
      toast({ title: "حداقل یک اسلاید باید فعال باشد" });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/slides", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slides }),
      });
      const b = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        toast({
          title: "ذخیره نشد",
          description: b.error === "no_active_slide" ? "حداقل یک اسلاید فعال لازم است." : b.error === "bad_input" ? "مقادیر وارد شده معتبر نیستند." : "خطای سرور — دوباره تلاش کن.",
        });
        return;
      }
      toast({ title: "اسلایدرها ذخیره شد ✓", description: "صفحه‌ی اصلی همین حالا با محتوای جدید بالا می‌آید." });
      setSavedAt(new Date().toLocaleTimeString("fa-IR"));
      load();
    } catch {
      toast({ title: "ذخیره نشد — دوباره تلاش کن" });
    } finally {
      setSaving(false);
    }
  };

  if (!slides) {
    return <div className="rounded-[22px] bg-white px-5 py-6 text-center text-[13px] font-bold text-[#4A6572]">در حال بارگذاری…</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* header */}
      <section className="rounded-[24px] border border-[#DDEEF5] bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <h2 className="m-0 text-[16px] font-black text-[#04202E]">اسلایدرهای صفحه‌ی اصلی</h2>
            <span className="text-[12px] font-medium leading-[1.8] text-[#4A6572]">
              متن، دکمه‌ها، رنگ و عکس هر اسلاید را از همین‌جا عوض کن؛ ترتیب را با فلش‌ها بچین و اسلاید را خاموش/روشن کن.
              {savedAt ? ` آخرین ذخیره: ${savedAt}` : ""}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={slides.length >= MAX_HOME_SLIDES}
              onClick={() =>
                setSlides((prev) => {
                  if (!prev || prev.length >= MAX_HOME_SLIDES) return prev;
                  const twin = DEFAULT_HOME_SLIDES[prev.length % DEFAULT_HOME_SLIDES.length];
                  return [...prev, { ...twin, title: "اسلاید جدید", badge: "تازه", enabled: true }];
                })
              }
              className="h-11 rounded-full border-2 border-[#04202E] px-5 text-[13px] font-extrabold text-[#04202E] disabled:opacity-40"
            >
              + اسلاید جدید
            </button>
            <button
              type="button"
              onClick={() => {
                setSlides(DEFAULT_HOME_SLIDES.map((s) => ({ ...s })));
                toast({ title: "به پیش‌فرض برگشت — برای اعمال، ذخیره کن" });
              }}
              className="h-11 rounded-full border border-[#CFE6EF] px-5 text-[13px] font-bold text-[#4A6572]"
            >
              بازگردانی پیش‌فرض‌ها
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => void save()}
              className="h-11 rounded-full bg-[#04202E] px-6 text-[13.5px] font-extrabold text-white disabled:opacity-60"
            >
              {saving ? "در حال ذخیره…" : "ذخیره اسلایدرها"}
            </button>
          </div>
        </div>
      </section>

      {/* slide cards */}
      {slides.map((s, i) => (
        <section key={i} className="rounded-[24px] border p-5" style={{ borderColor: s.enabled ? "#BFE3F5" : "#E3EDF2", background: s.enabled ? "#fff" : "#FAFCFD" }}>
          {/* row header: index, enable, order, preview */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#04202E] bg-[#E3F6FD] text-[16px] font-black">{fa(i + 1)}</span>
            <span className="rounded-full bg-[#F2FAFD] px-3.5 py-2 text-[12px] font-extrabold text-[#006387]">{s.tab || "بدون برچسب"}</span>
            <button
              type="button"
              role="switch"
              aria-checked={s.enabled}
              onClick={() => patch(i, { enabled: !s.enabled })}
              className="relative h-10 w-[92px] shrink-0 rounded-full transition-colors"
              style={{ background: s.enabled ? "#0B6E4F" : "#CFE6EF" }}
            >
              <span className="absolute top-1 flex h-8 items-center rounded-full bg-white px-3 text-[11px] font-black transition-all" style={{ right: s.enabled ? "4px" : "46px", color: s.enabled ? "#0B6E4F" : "#4A6572" }}>
                {s.enabled ? "فعال" : "خاموش"}
              </span>
            </button>
            <div className="ms-auto flex items-center gap-1.5">
              <button type="button" aria-label="بردن به بالا" onClick={() => move(i, -1)} disabled={i === 0} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#CFE6EF] bg-white text-[#04202E] disabled:opacity-35">↑</button>
              <button type="button" aria-label="بردن به پایین" onClick={() => move(i, 1)} disabled={i === slides.length - 1} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#CFE6EF] bg-white text-[#04202E] disabled:opacity-35">↓</button>
              <button
                type="button"
                aria-label="حذف اسلاید"
                disabled={slides.length <= 1}
                onClick={() => setSlides((prev) => (prev && prev.length > 1 ? prev.filter((_, j) => j !== i) : prev))}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F7C5D3] bg-[#FFF8FA] text-[#B02A52] disabled:opacity-35"
              >
                ×
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* texts */}
            <div className="flex flex-col gap-3">
              <SlideField label="برچسب بالای عنوان (badge)" value={s.badge} maxLength={60} onChange={(v) => patch(i, { badge: v })} />
              <SlideField label="عنوان اصلی" value={s.title} maxLength={90} onChange={(v) => patch(i, { title: v })} />
              <SlideField label="متن توضیح" value={s.sub} maxLength={220} area onChange={(v) => patch(i, { sub: v })} />
              <SlideField label="برچسب شمارنده (بالای اسلاید)" value={s.tab} maxLength={40} onChange={(v) => patch(i, { tab: v })} />
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <SlideField label="متن دکمه‌ی اصلی" value={s.cta} maxLength={40} onChange={(v) => patch(i, { cta: v })} />
                <SlideSelect label="مقصد دکمه‌ی اصلی" value={s.ctaRoute} options={routeOptions()} onChange={(v) => patch(i, { ctaRoute: v })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <SlideField label="متن دکمه‌ی دوم" value={s.cta2} maxLength={40} onChange={(v) => patch(i, { cta2: v })} />
                <SlideSelect label="مقصد دکمه‌ی دوم" value={s.cta2Route} options={routeOptions()} onChange={(v) => patch(i, { cta2Route: v })} />
              </div>
              {s.cta2Route === "home" && (
                <SlideSelect label="اسکرول داخل خانه" value={s.cta2Hash} options={HERO_HASHES.map((h) => ({ value: h, label: HERO_HASH_LABELS[h] ?? h }))} onChange={(v) => patch(i, { cta2Hash: v })} />
              )}
              <div className="grid grid-cols-2 gap-3">
                <SlideColor label="رنگ پس‌زمینه" value={s.bg} onChange={(v) => patch(i, { bg: v })} />
                <SlideColor label="رنگ حباب پشت عکس" value={s.blob} onChange={(v) => patch(i, { blob: v })} />
              </div>
              <SlideSelect
                label="عروسک اسلاید"
                value={s.kind}
                options={PLUSHES.map((p) => ({ value: p.kind, label: p.name }))}
                onChange={(v) => patch(i, { kind: v })}
              />
            </div>
          </div>

          {/* image + preview row */}
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <SlideField
              label="عکس دلخواه (اختیاری — لینک عکس؛ اگر بدهی جای عروسک می‌نشیند)"
              value={s.image}
              ltr
              placeholder="https://…"
              onChange={(v) => patch(i, { image: v.trim() })}
            />
            <div className="flex items-end gap-2">
              {s.image ? (
                <span className="relative inline-block">
                  { }
                  <img src={s.image} alt="پیش‌نمایش عکس اسلاید" className="h-20 w-20 rounded-2xl border-[1.5px] border-[#CFE6EF] object-cover" />
                  <button
                    type="button"
                    aria-label="حذف عکس"
                    onClick={() => patch(i, { image: "" })}
                    className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-[#F7C5D3] bg-white text-[12px] font-black text-[#B02A52]"
                  >
                    ×
                  </button>
                </span>
              ) : (
                <span className="rounded-2xl bg-[#F2FAFD] px-4 py-3 text-[11.5px] font-bold leading-[1.7] text-[#4A6572]">
                  بدون عکس — عروسک انتخابی بالا نمایش داده می‌شود.
                </span>
              )}
            </div>
          </div>

          {/* live mini preview */}
          <div className="mt-4 overflow-hidden rounded-[20px] border border-[#E3EDF2]">
            <div className="relative flex h-[150px] items-center gap-4 px-5" style={{ background: s.bg }}>
              <div className="absolute -bottom-10 left-6 h-[120px] w-[120px] rounded-full opacity-70" style={{ background: s.blob }} />
              <div className="relative z-10 flex max-w-[60%] flex-col items-start gap-1.5">
                <span className={`rounded-[10px] px-2.5 py-1 text-[10px] font-bold ${s.dark ? "bg-[#F0426B] text-white" : "bg-[#04202E] text-white"}`}>{s.badge}</span>
                <span className={`text-[16px] font-black leading-[1.5] ${s.dark ? "text-white" : "text-[#04202E]"}`}>{s.title}</span>
                <span className={`flex items-center rounded-full px-3.5 py-1.5 text-[11px] font-extrabold ${s.dark ? "bg-[#00ABE7] text-[#04202E]" : "bg-[#04202E] text-white"}`}>{s.cta}</span>
              </div>
              <div className="relative z-10 ms-auto">
                {s.image ? (
                   
                  <img src={s.image} alt="" className="h-[110px] w-[110px] rounded-[18px] object-cover" />
                ) : (
                  <Plush kind={s.kind as PlushKind} size={110} />
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* bottom save */}
      <div className="flex justify-end">
        <button
          type="button"
          disabled={saving}
          onClick={() => void save()}
          className="h-12 rounded-full bg-[#04202E] px-8 text-[14px] font-extrabold text-white disabled:opacity-60"
        >
          {saving ? "در حال ذخیره…" : "ذخیره اسلایدرها"}
        </button>
      </div>
    </div>
  );
}
