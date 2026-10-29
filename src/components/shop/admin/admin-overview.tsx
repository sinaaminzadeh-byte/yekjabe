"use client";

// ── داشبورد tab (round 33) — the admin landing page ──
// KPI cards + 14-day revenue chart + status donut + queue depths with
// click-through + top products/provinces + activity feed + low-stock alerts.
import { useEffect, useState } from "react";
import { fa, money } from "@/lib/fa";
import { useToast } from "@/hooks/use-toast";
import { RevenueBars, StatusDonut, HBars } from "./admin-charts";
import type { Tab } from "./admin-nav";
import { adminFetch } from "./admin-cache";
import { requestFocus } from "./admin-focus";
import { timeAgoFa } from "./admin-shared";
// A-08 (audit wave 38): STATUS_FA here was a verbatim duplicate of the panel's
// STATUS_LABEL map — one source of truth now (admin-ui.tsx)
import { STATUS_LABEL } from "./admin-ui";

interface OverviewData {
  generatedAt: string;
  kpis: {
    ordersTotal: number;
    ordersToday: number;
    revenueToday: number;
    revenueYesterday: number;
    revenueWeek: number;
    revenueMonth: number;
    revenue60: number;
    avgOrder: number;
    customersCount: number;
    newCustomersWeek: number;
    mediaAttachments: number;
    deliveredRate: number;
  };
  queue: {
    receipts: number;
    packing: number;
    inTransit: number;
    underReview: number;
    refundRequests: number;
    expiringSoon: number;
  };
  daily: { day: string; label: string; orders: number; revenue: number }[];
  statuses: { status: string; count: number }[];
  topProducts: { title: string; qty: number; revenue: number }[];
  topProvinces: { province: string; count: number }[];
  lowStock: { title: string; stock: number }[];
  unreadMessages: number;
  renewalPending: number;
  recentEvents: {
    id: string;
    orderCode: string;
    type: string;
    fromStatus: string;
    toStatus: string;
    actor: string;
    note: string;
    createdAt: string;
  }[];
}

const STATUS_FA: Record<string, string> = Object.fromEntries(
  Object.entries(STATUS_LABEL).map(([k, v]) => [k, v.label]),
);

function KpiCard({
  n,
  label,
  sub,
  bg,
  icon,
  onClick,
}: {
  n: string;
  label: string;
  sub?: string;
  bg: string;
  icon: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={`flex items-start justify-between gap-2 rounded-[22px] border border-[#DDEEF5] p-4 text-right transition-all ${onClick ? "hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(4,32,46,0.08)]" : ""}`}
      style={{ background: bg }}
    >
      <div className="flex flex-col gap-1">
        <span className="text-[21px] font-black leading-none text-[#04202E]">{n}</span>
        <span className="text-[12px] font-bold text-[#4A6572]">{label}</span>
        {sub && <span className="text-[10.5px] font-semibold text-[#7C99A6]">{sub}</span>}
      </div>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] bg-white/70 text-[17px]" aria-hidden="true">
        {icon}
      </span>
    </button>
  );
}

export function OverviewTab({ onNavigate }: { onNavigate: (t: Tab) => void }) {
  const [data, setData] = useState<OverviewData | null>(null);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const load = (silent = false, fresh = false) => {
    if (!silent) setLoading(true);
    adminFetch<OverviewData>("/api/admin/overview", { fresh })
      .then((j) => {
        setData(j);
        setErr(false);
      })
      .catch(() => setErr(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const t = setTimeout(() => load(true), 0);
    return () => clearTimeout(t);
     
  }, []);

  useEffect(() => {
    if (err && !loading) toast({ title: "داشبورد بارگذاری نشد", description: "اتصال سرور را بررسی کن." });
     
  }, [err]);

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-[92px] animate-pulse rounded-[22px] bg-white/70" />
          ))}
        </div>
        <div className="h-[260px] animate-pulse rounded-[24px] bg-white/70" />
      </div>
    );
  }
  if (!data || err) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-[24px] border-2 border-dashed border-[#F0B7C9] bg-[#FFF7FA] px-6 py-12 text-center">
        <span className="text-[40px]">🔌</span>
        <p className="m-0 text-[14.5px] font-bold">اتصال به سرور برقرار نشد.</p>
        <button type="button" onClick={() => load()} className="flex h-11 items-center rounded-full bg-[#00ABE7] px-6 text-[13.5px] font-extrabold text-[#04202E]">
          تلاش دوباره
        </button>
      </div>
    );
  }

  const k = data.kpis;
  const revDelta = k.revenueToday - k.revenueYesterday;
  const statusRows = data.statuses
    .map((s) => ({ ...s, label: STATUS_FA[s.status] ?? s.status }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="flex flex-col gap-4">
      {/* manual refresh — bypasses the shared TTL cache */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => load(false, true)}
          className="flex h-9 items-center gap-1.5 rounded-full border border-[#CFE6EF] bg-white px-3.5 text-[11.5px] font-extrabold text-[#006387] hover:bg-[#F2FAFD]"
        >
          <span aria-hidden="true">↻</span> تازه‌سازی داشبورد
        </button>
      </div>

      {/* ── KPI row 1: money ── */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard
          n={money(k.revenueToday)}
          label="فروش امروز (تومان)"
          sub={revDelta === 0 ? "برابر دیروز" : revDelta > 0 ? `▲ ${money(revDelta)} نسبت به دیروز` : `▼ ${money(-revDelta)} نسبت به دیروز`}
          bg="#E3F6FD"
          icon="💰"
        />
        <KpiCard n={money(k.revenueWeek)} label="فروش ۷ روز (تومان)" bg="#FFF3C9" icon="📈" />
        <KpiCard n={money(k.revenueMonth)} label="فروش ۳۰ روز (تومان)" bg="#DDF3EA" icon="🗓️" />
        <KpiCard n={money(k.avgOrder)} label="میانگین سبد (تومان)" sub={`نرخ تحویل ${fa(k.deliveredRate)}٪`} bg="#F3EDFB" icon="🧺" />
      </div>

      {/* ── KPI row 2: operations — click-through to tabs ── */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard n={fa(k.ordersToday)} label="سفارش امروز" sub={`کل: ${fa(k.ordersTotal)}`} bg="#E3F6FD" icon="🧾" onClick={() => onNavigate("orders")} />
        <KpiCard
          n={fa(data.queue.receipts)}
          label="رسید منتظر بررسی"
          sub={data.queue.receipts > 0 ? "نیاز به اقدام" : "صف خالی"}
          bg={data.queue.receipts > 0 ? "#FFE0EA" : "#F0F3F5"}
          icon="🧾"
          onClick={() => onNavigate("payments")}
        />
        <KpiCard n={fa(data.queue.packing)} label="در صف بسته‌بندی" sub={`${fa(data.queue.inTransit)} مرسوله در راه`} bg="#FFF3C9" icon="📦" onClick={() => onNavigate("orders")} />
        <KpiCard
          n={fa(k.customersCount)}
          label="مشتری واقعی"
          sub={`${fa(k.newCustomersWeek)} مشتری جدید این هفته`}
          bg="#DDF3EA"
          icon="🧑‍🤝‍🧑"
          onClick={() => onNavigate("customers")}
        />
      </div>

      {/* ── revenue chart + donut ── */}
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="rounded-[24px] border border-[#DDEEF5] bg-white p-5 lg:col-span-3">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="m-0 text-[15px] font-black text-[#04202E]">فروش ۱۴ روز گذشته</h3>
            <span className="rounded-full bg-[#E3F6FD] px-3 py-1 text-[11px] font-extrabold text-[#006387]">تومان</span>
          </div>
          <RevenueBars data={data.daily} />
        </div>
        <div className="rounded-[24px] border border-[#DDEEF5] bg-white p-5 lg:col-span-2">
          <h3 className="mb-3 mt-0 text-[15px] font-black text-[#04202E]">وضعیت سفارش‌ها</h3>
          {/* UX-14 — هر تکه‌ی دونات (و ردیف راهنما) به تب سفارش‌ها با همان فیلتر می‌پرد */}
          <StatusDonut data={statusRows} onSlice={(status) => requestFocus({ tab: "orders", status })} />
        </div>
      </div>

      {/* ── top lists ── */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-[24px] border border-[#DDEEF5] bg-white p-5">
          <h3 className="mb-3 mt-0 text-[15px] font-black text-[#04202E]">پرفروش‌ترین عروسک‌ها</h3>
          <HBars rows={data.topProducts.map((p) => ({ label: p.title, value: p.qty, sub: money(p.revenue) }))} unit="عدد" />
        </div>
        <div className="rounded-[24px] border border-[#DDEEF5] bg-white p-5">
          <h3 className="mb-3 mt-0 text-[15px] font-black text-[#04202E]">پرارسال‌ترین استان‌ها</h3>
          <HBars rows={data.topProvinces.map((p) => ({ label: p.province, value: p.count }))} unit="سفارش" />
        </div>
        <div className="rounded-[24px] border border-[#DDEEF5] bg-white p-5">
          <h3 className="mb-3 mt-0 flex items-center gap-2 text-[15px] font-black text-[#04202E]">
            موجودی بحرانی
            {data.lowStock.length > 0 && <span className="rounded-full bg-[#FFE0EA] px-2.5 py-0.5 text-[10.5px] font-extrabold text-[#B03A5B]">{fa(data.lowStock.length)} مورد</span>}
          </h3>
          <div className="flex flex-col gap-2">
            {data.lowStock.length === 0 ? (
              <p className="m-0 py-4 text-center text-[12.5px] font-bold text-[#4A6572]">همه‌ی انبار سالم است ✓</p>
            ) : (
              data.lowStock.map((v) => (
                <div key={v.title} className="flex items-center justify-between rounded-[16px] bg-[#FFF7FA] px-3.5 py-2.5">
                  <span className="truncate text-[12.5px] font-bold text-[#04202E]">{v.title}</span>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-black ${v.stock === 0 ? "bg-[#FFE0EA] text-[#B03A5B]" : "bg-[#FFF3C9] text-[#8A6D1F]"}`}>
                    {v.stock === 0 ? "ناموجود" : `${fa(v.stock)} عدد`}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── activity feed + alerts ── */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-[24px] border border-[#DDEEF5] bg-white p-5 lg:col-span-2">
          <h3 className="mb-3 mt-0 text-[15px] font-black text-[#04202E]">آخرین رویدادها</h3>
          <div className="flex max-h-[340px] flex-col gap-1 overflow-y-auto pe-1">
            {data.recentEvents.length === 0 && <p className="m-0 py-4 text-center text-[12.5px] font-bold text-[#4A6572]">هنوز رویدادی ثبت نشده.</p>}
            {data.recentEvents.map((e) => (
              <div key={e.id} className="flex items-center gap-3 rounded-[16px] px-2 py-2 transition-colors hover:bg-[#F5FBFD]">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[14px]"
                  style={{
                    background: e.type === "status_changed" ? "#E3F6FD" : e.type === "payment" ? "#FFF3C9" : e.type === "gift_opened" ? "#DDF3EA" : "#F0F3F5",
                  }}
                  aria-hidden="true"
                >
                  {e.type === "status_changed" ? "🔄" : e.type === "payment" ? "💳" : e.type === "gift_opened" ? "🎁" : "📋"}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="m-0 truncate text-[12.5px] font-bold text-[#04202E]">
                    <span dir="ltr" className="font-black">{e.orderCode}</span>
                    {e.toStatus ? ` → ${STATUS_FA[e.toStatus] ?? e.toStatus}` : ""}
                    {e.note ? ` — ${e.note}` : ""}
                  </p>
                  <p className="m-0 text-[10.5px] font-semibold text-[#7C99A6]">
                    {e.actor === "admin" ? "مدیر" : e.actor === "owner" ? "ادمین" : e.actor === "customer" ? "مشتری" : "سیستم"} · {timeAgoFa(e.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => onNavigate("messages")}
            className="flex items-center justify-between rounded-[22px] border border-[#DDEEF5] bg-white p-4 text-right transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(4,32,46,0.08)]"
          >
            <div>
              <span className="block text-[18px] font-black text-[#04202E]">{fa(data.unreadMessages)}</span>
              <span className="text-[12px] font-bold text-[#4A6572]">پیام خوانده‌نشده</span>
            </div>
            <span className="text-[24px]" aria-hidden="true">📮</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate("renewals")}
            className="flex items-center justify-between rounded-[22px] border border-[#DDEEF5] bg-white p-4 text-right transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(4,32,46,0.08)]"
          >
            <div>
              <span className="block text-[18px] font-black text-[#04202E]">{fa(data.renewalPending)}</span>
              <span className="text-[12px] font-bold text-[#4A6572]">تمدید نگهداری در صف</span>
            </div>
            <span className="text-[24px]" aria-hidden="true">⏳</span>
          </button>
          <button
            type="button"
            onClick={() => requestFocus({ tab: "orders", hasMedia: true })}
            className="flex items-center justify-between rounded-[22px] border border-[#DDEEF5] bg-white p-4 text-right transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(4,32,46,0.08)]"
          >
            <div>
              <span className="block text-[18px] font-black text-[#04202E]">{fa(k.mediaAttachments)}</span>
              {/* UX-13 — now clickable: jumps to سفارش‌ها filtered to hasMedia */}
              <span className="text-[12px] font-bold text-[#4A6572]">پیوست رسانه‌ای (۶۰ روز) — دیدن سفارش‌ها</span>
            </div>
            <span className="text-[24px]" aria-hidden="true">🎙️</span>
          </button>
          {data.queue.expiringSoon > 0 && (
            <div className="rounded-[22px] border-2 border-dashed border-[#F0B7C9] bg-[#FFF7FA] p-4">
              <p className="m-0 text-[12.5px] font-extrabold text-[#B03A5B]">⏰ {fa(data.queue.expiringSoon)} رزرو پرداخت‌نشده تا ۲۴ ساعت آینده منقضی می‌شود.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
