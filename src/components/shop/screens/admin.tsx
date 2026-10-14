"use client";

// ═══ پنل همکاران — server-data orders admin view (via /api/orders) ═══
// Single responsive screen (no design-source page): table on desktop, cards on
// mobile. Gated behind a demo PIN (sessionStorage), with status-advance PATCH.
import { useEffect, useMemo, useState } from "react";
import { navigate } from "@/lib/hash-route";
import { Plush } from "@/components/shop/plush";
import { ForwardIcon } from "@/components/shop/icons";
import { PLUSH_MAP, type PlushKind } from "@/lib/pishnam-data";
import { fa, faPrice, money } from "@/lib/fa";
import { MobileTopBar } from "@/components/shop/nav";
import { useToast } from "@/hooks/use-toast";

interface AdminOrder {
  id: string;
  no: number;
  kind: string;
  to: string;
  city: string;
  phone: string;
  total: number;
  date: string;
  status: string;
  dir: string;
  userPhone?: string;
  hearts: number;
  paws: number;
}

const STATUS_LABEL: Record<string, { label: string; bg: string }> = {
  paid: { label: "پرداخت شد", bg: "#FFF3C9" },
  packing: { label: "بسته‌بندی", bg: "#FFF3C9" },
  shipped: { label: "در راه", bg: "#CDEFFB" },
  delivered: { label: "تحویل شد", bg: "#D7F5E4" },
};

const FILTERS = [
  { key: "all", label: "همه" },
  { key: "paid", label: "پرداخت شد" },
  { key: "packing", label: "بسته‌بندی" },
  { key: "shipped", label: "در راه" },
  { key: "delivered", label: "تحویل شد" },
] as const;

// ── status advance (PATCH) ──
const NEXT_STATUS: Record<string, string | null> = {
  paid: "packing",
  packing: "shipped",
  shipped: "delivered",
  delivered: null,
};

const NEXT_ACTION: Record<string, string> = {
  paid: "بسته‌بندی",
  packing: "تحویل به پست",
  shipped: "تحویل به دوستت",
  delivered: "",
};

// ── demo gate ──
const ADMIN_PIN = "1398";
const UNLOCK_KEY = "pishnam-admin-ok";

function toEnDigits(s: string): string {
  return s.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
}

function PinGate({ onOk }: { onOk: () => void }) {
  const [pin, setPin] = useState("");
  const [err, setErr] = useState(false);

  const submit = () => {
    const p = toEnDigits(pin.trim());
    if (p === ADMIN_PIN) {
      try {
        sessionStorage.setItem(UNLOCK_KEY, "1");
      } catch {}
      onOk();
    } else {
      setErr(true);
      setTimeout(() => setErr(false), 700);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F2FAFD] px-5">
      <div className="pishnam-reveal flex w-full max-w-[380px] flex-col items-center gap-4 rounded-[28px] border border-[#DDEEF5] bg-white p-7 text-center shadow-[0_14px_34px_rgba(4,32,46,0.06)]">
        {/* plush medallion */}
        <span className="flex h-[74px] w-[74px] items-center justify-center rounded-full bg-[#E3F6FD]">
          <Plush kind="bear" size={52} />
        </span>
        <div className="flex flex-col gap-1.5">
          <h1 className="m-0 text-[22px] font-black">پنل همکاران</h1>
          <p className="m-0 text-[13.5px] font-medium leading-[1.9] text-[#4A6572]">
            برای دیدن دفتر سفارش‌ها رمز همکاریت رو بزن.
          </p>
        </div>
        <input
          type="password"
          inputMode="numeric"
          dir="ltr"
          maxLength={4}
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/[^\d۰-۹]/g, "").slice(0, 4))}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="••••"
          aria-label="رمز همکاران"
          className={`h-[54px] w-full rounded-[18px] border-2 bg-white text-center text-[20px] font-black tracking-[0.4em] text-[#04202E] outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(0,171,231,0.15)] ${
            err ? "pishnam-shake border-[#F0426B]" : "border-[#04202E]"
          }`}
        />
        {err && <span className="text-[12.5px] font-bold text-[#F0426B]">رمز درست نیست!</span>}
        <button
          type="button"
          onClick={submit}
          className="flex h-[52px] w-full items-center justify-center rounded-full bg-[#00ABE7] text-[16px] font-extrabold text-[#04202E] transition-transform active:scale-95"
        >
          ورود به پنل
        </button>
        <span className="rounded-full bg-[#FFF3C9] px-3.5 py-1.5 text-[11.5px] font-extrabold text-[#8A6D1F]">
          حالت نمایشی — رمز: ۱۳۹۸
        </span>
      </div>
    </div>
  );
}

function plushOf(kind: string): PlushKind {
  return (PLUSH_MAP[kind as PlushKind] ? kind : "bear") as PlushKind;
}

function StatusChip({ s }: { s: string }) {
  const meta = STATUS_LABEL[s] ?? STATUS_LABEL.paid;
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

export function AdminScreen() {
  // AdminScreen only renders after client mount (Splash gate in page.tsx), so
  // reading sessionStorage in the lazy initializer is hydration-safe.
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem(UNLOCK_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [orders, setOrders] = useState<AdminOrder[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [q, setQ] = useState("");
  const [flashId, setFlashId] = useState<string | null>(null);
  const { toast } = useToast();

  const load = (silent = false) => {
    if (!silent) setRefreshing(true);
    fetch("/api/orders", { cache: "no-store" })
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
    if (!unlocked) return;
    let alive = true;
    fetch("/api/orders", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((j: { orders?: AdminOrder[] }) => {
        if (!alive) return;
        setOrders(j.orders ?? []);
        setError(null);
      })
      .catch(() => {
        if (alive) setError("اتصال به سرور برقرار نشد. دوباره تلاش کن.");
      });
    return () => {
      alive = false;
    };
  }, [unlocked]);

  /** Optimistic status advance + PATCH; reloads server truth on failure. */
  const advance = (o: AdminOrder) => {
    const next = NEXT_STATUS[o.status];
    if (!next) return;
    setOrders((prev) => prev?.map((x) => (x.id === o.id ? { ...x, status: next } : x)) ?? prev);
    setFlashId(o.id);
    setTimeout(() => setFlashId(null), 950);
    toast({
      title: "وضعیت به‌روز شد ✓",
      description: `هدیه‌ی ${fa(o.no)} → ${STATUS_LABEL[next]?.label ?? next}`,
    });
    void fetch(`/api/orders/${o.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    })
      .then((r) => {
        if (!r.ok) throw new Error("patch failed");
      })
      .catch(() => {
        toast({ title: "ثبت روی سرور نشد!", description: "دوباره تلاش کن." });
        load(true);
      });
  };

  const list = useMemo(() => {
    if (!orders) return [];
    const needle = q.trim();
    return orders.filter((o) => {
      if (filter !== "all" && o.status !== filter) return false;
      if (!needle) return true;
      const hay = `${o.no} ${o.to} ${o.phone} ${o.userPhone ?? ""} ${PLUSH_MAP[plushOf(o.kind)]?.name ?? ""} ${o.city}`;
      return hay.includes(needle) || hay.includes(needle.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))));
    });
  }, [orders, filter, q]);

  const stats = useMemo(() => {
    const all = orders ?? [];
    return {
      count: all.length,
      revenue: all.reduce((a, o) => a + o.total, 0),
      charms: all.reduce((a, o) => a + o.hearts + o.paws, 0),
      delivered: all.filter((o) => o.status === "delivered").length,
    };
  }, [orders]);

  if (!unlocked) {
    return (
      <div className="flex min-h-screen flex-col bg-[#F2FAFD]">
        <MobileTopBar title="پنل همکاران" back="home" />
        <PinGate onOk={() => setUnlocked(true)} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F2FAFD]">
      <MobileTopBar title="پنل همکاران" back="home" />

      <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 pb-24 pt-5 md:px-6 md:pt-8">
        {/* heading + refresh */}
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h1 className="m-0 text-[26px] font-black md:text-[34px]">دفتر سفارش‌ها</h1>
            <p className="m-0 text-[13.5px] font-medium text-[#4A6572] md:text-[15px]">
              داده‌ی زنده از سرور — وضعیت سفارش‌ها رو همین‌جا جلو ببر
            </p>
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
            {refreshing ? "در حال تازه‌سازی…" : "تازه‌سازی"}
          </button>
        </div>

        {/* stats */}
        <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <StatCard n={fa(stats.count)} label="کل سفارش‌ها" bg="#E3F6FD" />
          <StatCard n={money(stats.revenue)} label="جمع فروش (تومان)" bg="#FFF3C9" />
          <StatCard n={fa(stats.charms)} label="قلب و پنجه" bg="#FFE0EA" />
          <StatCard n={fa(stats.delivered)} label="تحویل‌شده" bg="#DDF3EA" />
        </div>

        {/* filters */}
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
            placeholder="جست‌وجو: اسم، شماره، کد هدیه…"
            aria-label="جست‌وجوی سفارش"
            className="h-11 flex-1 rounded-[16px] border-[1.5px] border-[#CFE6EF] bg-white px-4 text-[14px] text-[#04202E] outline-none focus:border-[#00ABE7] md:min-w-[260px]"
          />
        </div>

        {/* body */}
        {error ? (
          <div className="flex flex-col items-center gap-4 rounded-[24px] border-2 border-dashed border-[#F0B7C9] bg-[#FFF7FA] px-6 py-12 text-center">
            <span className="text-[40px]">🔌</span>
            <p className="m-0 text-[14.5px] font-bold">{error}</p>
            <button
              type="button"
              onClick={() => load()}
              className="flex h-11 items-center rounded-full bg-[#00ABE7] px-6 text-[13.5px] font-extrabold text-[#04202E]"
            >
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
          <>
            {/* desktop table */}
            <div className="hidden overflow-hidden rounded-[24px] border border-[#DDEEF5] bg-white md:block">
              <table className="w-full border-collapse text-right">
                <thead>
                  <tr className="bg-[#F2FAFD] text-[12.5px] font-extrabold text-[#4A6572]">
                    <th className="px-4 py-3.5">کد</th>
                    <th className="px-4 py-3.5">دوست پشمالو</th>
                    <th className="px-4 py-3.5">گیرنده</th>
                    <th className="px-4 py-3.5">موبایل</th>
                    <th className="px-4 py-3.5">فرستنده (حساب)</th>
                    <th className="px-4 py-3.5">مبلغ</th>
                    <th className="px-4 py-3.5">وضعیت</th>
                    <th className="px-4 py-3.5">اقدام</th>
                    <th className="px-4 py-3.5">تاریخ</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((o) => (
                    <tr
                      key={o.id}
                      className={`border-t border-[#EDF6FA] text-[13.5px] font-semibold transition-colors hover:bg-[#F8FDFF] ${
                        flashId === o.id ? "pishnam-row-flash" : ""
                      }`}
                    >
                      <td className="px-4 py-3 font-black">{fa(o.no)}</td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-2">
                          <span
                            className="flex h-9 w-9 items-center justify-center rounded-xl"
                            style={{ background: PLUSH_MAP[plushOf(o.kind)].bg }}
                          >
                            <Plush kind={plushOf(o.kind)} size={30} />
                          </span>
                          {PLUSH_MAP[plushOf(o.kind)].name}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {o.to}
                        {o.dir === "recv" && (
                          <span className="ms-2 rounded-full bg-[#FFE0EA] px-2 py-0.5 text-[10.5px] font-bold text-[#B02A52]">
                            دریافتی
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3" dir="ltr">
                        {o.phone ? fa(o.phone) : "—"}
                      </td>
                      <td className="px-4 py-3" dir="ltr">
                        {o.userPhone ? fa(o.userPhone) : <span className="text-[#8FB3C0]">مهمان</span>}
                      </td>
                      <td className="px-4 py-3">{faPrice(o.total)}</td>
                      <td className="px-4 py-3">
                        <StatusChip s={o.status} />
                      </td>
                      <td className="px-4 py-3">
                        {NEXT_STATUS[o.status] ? (
                          <button
                            type="button"
                            onClick={() => advance(o)}
                            title={`تغییر وضعیت به ${STATUS_LABEL[NEXT_STATUS[o.status] as string]?.label ?? ""}`}
                            className="flex items-center gap-1.5 rounded-full bg-[#FFF3C9] px-3 py-1.5 text-[11.5px] font-extrabold text-[#04202E] transition-all hover:bg-[#F7E7A9] active:scale-95"
                          >
                            قدم بعدی: {NEXT_ACTION[o.status]}
                            <ForwardIcon size={14} stroke="#04202E" />
                          </button>
                        ) : (
                          <span className="text-[12px] font-extrabold text-[#3AA76D]">تمام ✓</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-[#4A6572]">{o.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* mobile cards */}
            <div className="flex flex-col gap-3 md:hidden">
              {list.map((o) => (
                <div
                  key={o.id}
                  className={`rounded-[20px] border border-[#DDEEF5] bg-white p-4 transition-colors ${
                    flashId === o.id ? "pishnam-row-flash" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                      style={{ background: PLUSH_MAP[plushOf(o.kind)].bg }}
                    >
                      <Plush kind={plushOf(o.kind)} size={38} />
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[15px] font-black">
                          هدیه‌ی {fa(o.no)} · برای {o.to}
                        </span>
                        <StatusChip s={o.status} />
                      </div>
                      <span className="truncate text-[12px] font-medium text-[#4A6572]">
                        {PLUSH_MAP[plushOf(o.kind)].name} · {o.date} · {o.city}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-[#EDF6FA] pt-2.5 text-[12px] font-bold text-[#4A6572]">
                    <span>{faPrice(o.total)}</span>
                    <span dir="ltr">
                      {o.userPhone ? `حساب: ${fa(o.userPhone)}` : "مهمان"}
                    </span>
                  </div>
                  {NEXT_STATUS[o.status] ? (
                    <button
                      type="button"
                      onClick={() => advance(o)}
                      className="mt-2.5 flex h-10 w-full items-center justify-center gap-1.5 rounded-full bg-[#FFF3C9] text-[13px] font-extrabold text-[#04202E] transition-transform active:scale-95"
                    >
                      قدم بعدی: {NEXT_ACTION[o.status]}
                      <ForwardIcon size={16} stroke="#04202E" />
                    </button>
                  ) : (
                    <div className="mt-2.5 flex h-10 items-center justify-center rounded-full bg-[#DDF3EA] text-[13px] font-extrabold text-[#2E7D53]">
                      تحویل داده شد ✓
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* back home */}
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
