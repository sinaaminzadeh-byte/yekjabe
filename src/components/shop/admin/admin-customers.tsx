"use client";

// ── مشتریان tab (round 33) — real buyers aggregated from orders ──
// Search + KPI strip + ranked customer cards (LTV, orders, cities, account age).
import { useEffect, useMemo, useState } from "react";
import { fa, money } from "@/lib/fa";
import { jalaliDate } from "./admin-shared";

interface CustomerRow {
  phone: string;
  phoneMasked: string;
  name: string;
  ordersCount: number;
  paidCount: number;
  totalSpent: number;
  firstOrderAt: string | null;
  lastOrderAt: string | null;
  lastStatus: string;
  cities: string;
  giftOpens: number;
  accountCreatedAt: string | null;
  lastLoginAt: string | null;
}

function tierOf(totalSpent: number): { label: string; bg: string; color: string } {
  if (totalSpent >= 5_000_000) return { label: "🥇 مشتری ویژه", bg: "#FFF3C9", color: "#8A6D1F" };
  if (totalSpent >= 2_000_000) return { label: "🥈 مشتری ثابت", bg: "#E3F6FD", color: "#006387" };
  if (totalSpent > 0) return { label: "🥉 مشتری", bg: "#DDF3EA", color: "#2E7D53" };
  return { label: "بدون خرید", bg: "#F0F3F5", color: "#4A6572" };
}

export function CustomersTab() {
  const [rows, setRows] = useState<CustomerRow[] | null>(null);
  const [meta, setMeta] = useState<{ total: number; totalSpent: number; registered: number } | null>(null);
  const [err, setErr] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const t = setTimeout(
      () =>
        fetch(`/api/admin/customers?q=${encodeURIComponent(q)}`, { cache: "no-store" })
          .then((r) => {
            if (!r.ok) throw new Error();
            return r.json();
          })
          .then((j: { customers: CustomerRow[]; total: number; totalSpent: number; registered: number }) => {
            setRows(j.customers);
            setMeta({ total: j.total, totalSpent: j.totalSpent, registered: j.registered });
            setErr(false);
          })
          .catch(() => setErr(true)),
      q ? 250 : 0
    );
    return () => clearTimeout(t);
  }, [q]);

  const avg = useMemo(() => (meta && meta.total > 0 ? Math.round(meta.totalSpent / meta.total) : 0), [meta]);

  if (err) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-[24px] border-2 border-dashed border-[#F0B7C9] bg-[#FFF7FA] px-6 py-12 text-center">
        <span className="text-[40px]">🔌</span>
        <p className="m-0 text-[14.5px] font-bold">اتصال به سرور برقرار نشد.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* KPI strip */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-[20px] border border-[#DDEEF5] bg-[#E3F6FD] p-4">
          <span className="block text-[21px] font-black leading-none">{fa(meta?.total ?? 0)}</span>
          <span className="text-[12px] font-bold text-[#4A6572]">مشتری یکتا</span>
        </div>
        <div className="rounded-[20px] border border-[#DDEEF5] bg-[#DDF3EA] p-4">
          <span className="block text-[21px] font-black leading-none">{fa(meta?.registered ?? 0)}</span>
          <span className="text-[12px] font-bold text-[#4A6572]">حساب ثبت‌شده</span>
        </div>
        <div className="rounded-[20px] border border-[#DDEEF5] bg-[#FFF3C9] p-4">
          <span className="block text-[21px] font-black leading-none">{money(avg)}</span>
          <span className="text-[12px] font-bold text-[#4A6572]">میانگین خرید (تومان)</span>
        </div>
      </div>

      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="جست‌وجو: اسم یا موبایل مشتری…"
        aria-label="جست‌وجوی مشتری"
        className="h-11 w-full rounded-[16px] border-[1.5px] border-[#CFE6EF] bg-white px-4 text-[14px] text-[#04202E] outline-none focus:border-[#00ABE7]"
      />

      {rows === null ? (
        <div className="flex flex-col gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-[86px] animate-pulse rounded-[20px] bg-white/70" />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-[24px] border-2 border-dashed border-[#99D6EE] bg-white/60 px-6 py-12 text-center">
          <span className="text-[40px]">🧑‍🤝‍🧑</span>
          <p className="m-0 text-[14.5px] font-bold">مشتری‌ای مطابق این جست‌وجو پیدا نشد.</p>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {rows.map((c, i) => {
            const tier = tierOf(c.totalSpent);
            return (
              <div key={c.phone} className="rounded-[20px] border border-[#DDEEF5] bg-white p-4 transition-shadow hover:shadow-[0_10px_24px_rgba(4,32,46,0.07)]">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E3F6FD] text-[14px] font-black text-[#006387]">{fa(i + 1)}</span>
                    <div className="flex flex-col">
                      <span className="text-[13.5px] font-black text-[#04202E]">{c.name || "بدون نام"}</span>
                      <span className="text-[11.5px] font-bold text-[#4A6572]" dir="ltr">
                        {c.phoneMasked}
                      </span>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full px-2.5 py-1 text-[10.5px] font-extrabold" style={{ background: tier.bg, color: tier.color }}>
                    {tier.label}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 rounded-[14px] bg-[#F5FBFD] p-2.5 text-center">
                  <div>
                    <span className="block text-[14px] font-black text-[#04202E]">{money(c.totalSpent)}</span>
                    <span className="text-[10px] font-bold text-[#4A6572]">مجموع خرید (تومان)</span>
                  </div>
                  <div>
                    <span className="block text-[14px] font-black text-[#04202E]">{fa(c.paidCount)}</span>
                    <span className="text-[10px] font-bold text-[#4A6572]">سفارش موفق</span>
                  </div>
                  <div>
                    <span className="block text-[14px] font-black text-[#04202E]">{fa(c.giftOpens)}</span>
                    <span className="text-[10px] font-bold text-[#4A6572]">کارت بازشده 🎁</span>
                  </div>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-semibold text-[#4A6572]">
                  <span>آخرین سفارش: {jalaliDate(c.lastOrderAt)}</span>
                  {c.cities && <span>شهر: {c.cities}</span>}
                  {c.accountCreatedAt && <span>عضویت: {jalaliDate(c.accountCreatedAt)}</span>}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {rows && rows.length > 0 && meta && meta.total > rows.length && (
        <p className="m-0 text-center text-[11.5px] font-bold text-[#7C99A6]">۲۰۰ مشتری برتر نمایش داده شده — برای بقیه جست‌وجو کن.</p>
      )}
    </div>
  );
}
