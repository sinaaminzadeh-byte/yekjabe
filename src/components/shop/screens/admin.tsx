"use client";

// ═══ پنل همکاران — read-only orders admin view (server data via /api/orders) ═══
// Single responsive screen (no design-source page): table on desktop, cards on mobile.
import { useEffect, useMemo, useState } from "react";
import { navigate } from "@/lib/hash-route";
import { Plush } from "@/components/shop/plush";
import { ForwardIcon } from "@/components/shop/icons";
import { PLUSH_MAP, type PlushKind } from "@/lib/pishnam-data";
import { fa, faPrice, money } from "@/lib/fa";
import { MobileTopBar } from "@/components/shop/nav";

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
  const [orders, setOrders] = useState<AdminOrder[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [q, setQ] = useState("");

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
  }, []);

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

  return (
    <div className="flex min-h-screen flex-col bg-[#F2FAFD]">
      <MobileTopBar title="پنل همکاران" back="home" />

      <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 pb-24 pt-5 md:px-6 md:pt-8">
        {/* heading + refresh */}
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h1 className="m-0 text-[26px] font-black md:text-[34px]">دفتر سفارش‌ها</h1>
            <p className="m-0 text-[13.5px] font-medium text-[#4A6572] md:text-[15px]">
              داده‌ی زنده از سرور — فقط خواندنی
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
                    <th className="px-4 py-3.5">تاریخ</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((o) => (
                    <tr
                      key={o.id}
                      className="border-t border-[#EDF6FA] text-[13.5px] font-semibold transition-colors hover:bg-[#F8FDFF]"
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
                      <td className="px-4 py-3 text-[#4A6572]">{o.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* mobile cards */}
            <div className="flex flex-col gap-3 md:hidden">
              {list.map((o) => (
                <div key={o.id} className="rounded-[20px] border border-[#DDEEF5] bg-white p-4">
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
