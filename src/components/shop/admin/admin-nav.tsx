"use client";

// ── admin nav — the single source for the tab list (round 33) ──
// Used by both the desktop sidebar and the mobile pill rail. Badges come from
// /api/admin/badges (receipt queue, unread messages, pending renewals).

import { useEffect, useState } from "react";
import { navigate } from "@/lib/hash-route";
import { Plush } from "@/components/shop/plush";
import { fa } from "@/lib/fa";

export type Tab =
  | "overview"
  | "orders"
  | "payments"
  | "renewals"
  | "customers"
  | "products"
  | "messages"
  | "slides"
  | "reviews"
  | "stories"
  | "blog"
  | "settings"
  | "sms"
  | "team";

export interface TabDef {
  key: Tab;
  label: string;
  icon: string;
  ownerOnly?: boolean;
  badge?: "receipts" | "unread" | "renewals" | "packing";
  desc: string;
}

export const ADMIN_TABS: TabDef[] = [
  { key: "overview", label: "داشبورد", icon: "📊", desc: "نمای کلی فروش و عملیات" },
  { key: "orders", label: "سفارش‌ها", icon: "🧾", badge: "packing", desc: "مدیریت چرخه‌ی سفارش" },
  { key: "payments", label: "رسیدها", icon: "💳", badge: "receipts", desc: "صف کارت‌به‌کارت" },
  { key: "renewals", label: "تمدید نگهداری", icon: "⏳", badge: "renewals", desc: "تمدید پیام هدیه" },
  { key: "customers", label: "مشتریان", icon: "🧑‍🤝‍🧑", desc: "خریداران واقعی" },
  { key: "messages", label: "پیام‌ها", icon: "📮", badge: "unread", desc: "صندوق تماس با ما" },
  { key: "products", label: "محصولات", icon: "🧸", desc: "انبار و افزودنی‌ها" },
  { key: "slides", label: "اسلایدرها", icon: "🖼️", desc: "صفحه‌ی اصلی" },
  { key: "reviews", label: "نظرها", icon: "⭐", desc: "بازخورد مشتریان" },
  { key: "stories", label: "تجربه‌ها", icon: "📖", desc: "تأیید داستان‌ها" },
  { key: "blog", label: "بلاگ", icon: "✍️", desc: "نوشته‌های مجله" },
  { key: "team", label: "کارکنان", icon: "👥", ownerOnly: true, desc: "صندلی‌های ادمین" },
  { key: "settings", label: "تنظیمات", icon: "⚙️", ownerOnly: true, desc: "قیمت و پیکربندی" },
  { key: "sms", label: "پیامک‌ها", icon: "📨", ownerOnly: true, desc: "الگوها و صف ارسال" },
];

export interface Badges {
  receipts: number;
  unread: number;
  renewals: number;
  packing: number;
}

export function useBadges(enabled: boolean): Badges {
  const [b, setB] = useState<Badges>({ receipts: 0, unread: 0, renewals: 0, packing: 0 });
  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    const load = () =>
      fetch("/api/admin/badges", { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : null))
        .then((j: Badges | null) => {
          if (alive && j) setB(j);
        })
        .catch(() => {});
    const t = setTimeout(load, 0);
    const iv = setInterval(load, 60_000); // light refresh once a minute
    return () => {
      alive = false;
      clearTimeout(t);
      clearInterval(iv);
    };
  }, [enabled]);
  return b;
}

function BadgeChip({ n }: { n: number }) {
  if (n <= 0) return null;
  return (
    <span className="flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-[#F0426B] px-1.5 text-[11px] font-black text-white">
      {fa(n)}
    </span>
  );
}

// ── desktop sidebar (lg+) ──
export function AdminSidebar({
  tab,
  onTab,
  role,
  adminName,
  badges,
}: {
  tab: Tab;
  onTab: (t: Tab) => void;
  role: "owner" | "operator" | null;
  adminName: string;
  badges: Badges;
}) {
  const items = ADMIN_TABS.filter((t) => !t.ownerOnly || role === "owner");
  return (
    <aside className="sticky top-4 hidden h-[calc(100vh-2rem)] w-[264px] shrink-0 flex-col overflow-hidden rounded-[28px] border border-[#DDEEF5] bg-white shadow-[0_14px_34px_rgba(4,32,46,0.06)] lg:flex">
      {/* brand */}
      <div className="flex items-center gap-3 border-b border-[#EDF6FA] px-5 py-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-[#E3F6FD]">
          <Plush kind="bear" size={30} />
        </span>
        <div className="flex flex-col">
          <span className="text-[15px] font-black text-[#04202E]">پیشنام</span>
          <span className="text-[11px] font-bold text-[#4A6572]">دفتر مدیریت فروشگاه</span>
        </div>
      </div>

      {/* nav */}
      <nav className="no-scrollbar flex-1 overflow-y-auto px-3 py-3" aria-label="بخش‌های پنل مدیریت">
        {items.map((t) => {
          const on = tab === t.key;
          const badgeN = t.badge ? badges[t.badge] : 0;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => onTab(t.key)}
              aria-current={on ? "page" : undefined}
              title={t.desc}
              className={`mb-1 flex w-full items-center gap-3 rounded-[16px] px-3.5 py-2.5 text-right transition-all ${
                on ? "bg-[#04202E] text-white shadow-[0_6px_16px_rgba(4,32,46,0.18)]" : "text-[#04202E] hover:bg-[#F2FAFD]"
              }`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[12px] text-[15px] ${on ? "bg-white/15" : "bg-[#F2FAFD]"}`}
                aria-hidden="true"
              >
                {t.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-extrabold">{t.label}</span>
                <span className={`block truncate text-[10px] font-semibold ${on ? "text-white/70" : "text-[#7C99A6]"}`}>{t.desc}</span>
              </span>
              <BadgeChip n={badgeN} />
            </button>
          );
        })}
      </nav>

      {/* footer: role + exit */}
      <div className="border-t border-[#EDF6FA] px-4 py-3">
        {role && (
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: role === "owner" ? "#7BE3B4" : "#00ABE7" }} aria-hidden="true" />
            <span className="text-[11.5px] font-extrabold text-[#04202E]">
              {role === "owner" ? "ادمین" : "مدیر فروشگاه"}
              {adminName ? ` — ${adminName}` : ""}
            </span>
          </div>
        )}
        <button
          type="button"
          onClick={() => navigate("home")}
          className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#04202E] py-2 text-[12.5px] font-extrabold text-[#04202E] transition-transform hover:scale-[1.02]"
        >
          برگرد به خانه
        </button>
      </div>
    </aside>
  );
}

// ── mobile pill rail ──
export function AdminPills({
  tab,
  onTab,
  role,
  badges,
}: {
  tab: Tab;
  onTab: (t: Tab) => void;
  role: "owner" | "operator" | null;
  badges: Badges;
}) {
  const items = ADMIN_TABS.filter((t) => !t.ownerOnly || role === "owner");
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-1 lg:hidden">
      {items.map((t) => {
        const on = tab === t.key;
        const badgeN = t.badge ? badges[t.badge] : 0;
        return (
          <button
            key={t.key}
            type="button"
            aria-pressed={on}
            onClick={() => onTab(t.key)}
            className="flex h-11 shrink-0 items-center gap-2 rounded-full px-4 text-[13px] font-extrabold transition-all"
            style={{
              background: on ? "#04202E" : "#fff",
              border: `1.5px solid ${on ? "#04202E" : "#CFE6EF"}`,
              color: on ? "#fff" : "#04202E",
            }}
          >
            <span aria-hidden="true">{t.icon}</span>
            {t.label}
            {badgeN > 0 && (
              <span className="flex h-[20px] min-w-[20px] items-center justify-center rounded-full bg-[#F0426B] px-1 text-[10.5px] font-black text-white">
                {fa(badgeN)}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
