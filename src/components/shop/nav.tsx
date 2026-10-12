"use client";

// ── Navigation: mobile bottom bar + desktop header + step bar ──
import { Logo } from "./logo";
import { CartIcon, HeartIcon, HomeIcon, GiftBoxIcon, MailIcon, PlusIcon } from "./icons";
import { navigate, type Route } from "@/lib/hash-route";
import { usePishnam } from "@/lib/pishnam-store";

export function MobileNav({ active }: { active: Route }) {
  const charms = usePishnam((s) => s.hearts + s.paws);
  const items: { route: Route; label: string; icon: React.ReactNode }[] = [
    { route: "home", label: "خانه", icon: <HomeIcon /> },
    { route: "pick", label: "دوست‌ها", icon: <GiftBoxIcon /> },
    { route: "my-gifts", label: "هدیه‌هام", icon: <MailIcon /> },
    { route: "impact", label: "مهربونی", icon: <HeartIcon /> },
  ];
  return (
    <nav
      aria-label="ناوبری اصلی"
      className="sticky bottom-0 z-40 flex items-end justify-between border-t border-[#D3E8F0] bg-white/95 px-3 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 backdrop-blur md:hidden"
    >
      {items.slice(0, 2).map((it) => (
        <NavItem key={it.route} {...it} active={active === it.route || (active === "pick" && it.route === "pick")} />
      ))}
      <button
        type="button"
        aria-label="ساخت هدیه"
        onClick={() => navigate("pick")}
        className="flex flex-1 flex-col items-center gap-1"
      >
        <span className="flex h-[58px] w-[58px] items-center justify-center rounded-full border-4 border-white bg-[#00ABE7] shadow-[0_6px_16px_rgba(0,171,231,0.35)]">
          <PlusIcon stroke="#04202E" size={26} />
        </span>
        <span className="text-[11px] font-extrabold text-[#04202E]">بساز</span>
      </button>
      {items.slice(2).map((it) => (
        <NavItem key={it.route} {...it} active={active === it.route} />
      ))}
      <span className="sr-only">{charms} قلب و پنجه در سبد</span>
    </nav>
  );
}

function NavItem({ label, icon, active }: { label: string; icon: React.ReactNode; active: boolean }) {
  return (
    <button
      type="button"
      onClick={() => navigate(label === "دوست‌ها" ? "pick" : label === "خانه" ? "home" : label === "هدیه‌هام" ? "my-gifts" : "impact")}
      className="flex flex-1 flex-col items-center gap-[3px]"
      style={{ color: active ? "#006387" : "#5B7482" }}
    >
      {icon}
      <span className={`text-[11px] ${active ? "font-extrabold" : "font-bold"}`}>{label}</span>
    </button>
  );
}

export function DesktopHeader() {
  const builderItems = usePishnam((s) => s.hearts + s.paws);
  const user = usePishnam((s) => s.user);
  const links: { label: string; route: Route }[] = [
    { label: "خانه", route: "home" },
    { label: "دوست‌های پشمالو", route: "pick" },
    { label: "ساخت هدیه", route: "card" },
    { label: "هدیه‌هام", route: "my-gifts" },
    { label: "دفتر مهربونی", route: "impact" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-[#D3E8F0] bg-[#F2FAFD]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-y-3 px-6 py-3">
        <button type="button" onClick={() => navigate("home")} aria-label="پیشتم — خانه">
          <Logo size={46} />
        </button>
        <nav aria-label="منوی اصلی" className="flex flex-wrap items-center gap-x-6 text-[15px] font-bold">
          {links.map((l) => (
            <button
              key={l.route}
              type="button"
              onClick={() => navigate(l.route)}
              className="text-[#04202E] transition-colors hover:text-[#006387]"
            >
              {l.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => navigate("checkout")}
            aria-label="سبد خرید"
            className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#D3E8F0] bg-white text-[#04202E] transition-transform hover:scale-105"
          >
            <CartIcon />
            {builderItems > 0 && (
              <span className="absolute -left-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#00ABE7] px-1 text-[11px] font-extrabold text-[#04202E]">
                {new Intl.NumberFormat("fa-IR").format(builderItems + 1)}
              </span>
            )}
          </button>
          {user ? (
            <button
              type="button"
              onClick={() => navigate("my-gifts")}
              className="flex h-12 items-center gap-2 rounded-full bg-white px-4 font-extrabold text-[#04202E] border border-[#D3E8F0]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00ABE7] text-sm font-black">{user.name.slice(0, 1)}</span>
              {user.name}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate("login")}
              className="flex h-12 items-center rounded-full border border-[#04202E] px-5 text-[15px] font-bold text-[#04202E] transition-colors hover:bg-[#04202E] hover:text-white"
            >
              ورود
            </button>
          )}
          <button
            type="button"
            onClick={() => navigate("pick")}
            className="flex h-12 items-center rounded-full bg-[#04202E] px-6 text-[15px] font-extrabold text-white transition-transform hover:scale-[1.03]"
          >
            بساز و بفرست
          </button>
        </div>
      </div>
    </header>
  );
}

export function StepBar({ step, total = 4 }: { step: number; total?: number }) {
  return (
    <div className="flex gap-1.5 px-5 pt-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-[5px] flex-1 rounded-full"
          style={{ background: i < step ? "#00ABE7" : "#CFE6EF" }}
        />
      ))}
    </div>
  );
}

export function MobileTopBar({
  title,
  back,
}: {
  title?: string;
  back?: Route;
}) {
  return (
    <div className="flex items-center justify-between px-5 pb-1.5 pt-4">
      <button
        type="button"
        aria-label="برگشت"
        onClick={() => navigate(back ?? "home")}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D3E8F0] bg-white text-[#04202E]"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
      {title && <span className="text-sm font-bold text-[#4A6572]">{title}</span>}
    </div>
  );
}
