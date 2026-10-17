"use client";

// ── Navigation: mobile bottom bar + desktop header + step bar ──
// «حساب کاربری» (#/login) is THE customer panel entry — works logged-out
// (OTP form) and logged-in (account panel). «هدیه‌هام» is only shown after
// login: gift data belongs to the account, never to a guest menu.
// Owner request (UI round): 5 bottom menus — «قصه‌ی شما» joins the bar.
// Labels follow Digikala/Snapp convention: one short word per item, single
// line, ≥44px touch targets, clear active color.
import { Logo } from "./logo";
import { BookIcon, CartIcon, HomeIcon, PawIcon, UserIcon } from "./icons";
import { navigate, type Route } from "@/lib/hash-route";
import { usePishnam } from "@/lib/pishnam-store";

export function MobileNav({ active }: { active: Route }) {
  const items: { route: Route; label: string; aria: string; icon: React.ReactNode; activeOn: Route[] }[] = [
    { route: "home", label: "خانه", aria: "خانه", icon: <HomeIcon size={22} />, activeOn: ["home"] },
    { route: "friends", label: "دوستا", aria: "دوستای پشمالو", icon: <PawIcon size={22} fill="currentColor" stroke="none" />, activeOn: ["friends", "product"] },
    { route: "stories", label: "قصه‌ی شما", aria: "قصه‌ی شما — قصه‌های مشتری‌ها", icon: <BookIcon size={22} />, activeOn: ["stories"] },
    { route: "login", label: "حساب", aria: "حساب کاربری", icon: <UserIcon size={22} />, activeOn: ["login", "my-gifts"] },
  ];
  return (
    // حالت شیشه‌ای شناور — بازطراحی(owner round 26): دکمه‌ی + سمت مخالف (راست،
    // اول DOM در RTL)، هر آیتم «آیکن + اسم»، آیتم فعال فقط با تغییر رنگ آیکن
    // از خاکستری به آبی — بدون کادر، بدون سایه، بدون تغییر شکل دکمه.
    <>
      <div
        aria-hidden="true"
        className="h-[86px] max-md:block"
        style={{ height: "calc(86px + env(safe-area-inset-bottom))" }}
      />
      <div
        className="fixed inset-x-3 z-50 flex items-center gap-2 md:hidden"
        style={{ bottom: "max(10px, env(safe-area-inset-bottom))" }}
      >
        {/* اول در DOM = سمت راست (RTL) — جای + طبق درخواست مالک عوض شد */}
        <button
          type="button"
          aria-label="ساخت هدیه"
          onClick={() => navigate("pick")}
          className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full border-4 border-white/75 bg-[#00ABE7] shadow-[0_10px_26px_rgba(0,171,231,0.42)] transition-transform active:scale-90"
        >
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
        <nav
          aria-label="ناوبری اصلی"
          className="flex min-h-[58px] flex-1 items-stretch justify-around rounded-full border border-white/70 bg-white/80 p-1 shadow-[0_10px_32px_rgba(4,32,46,0.14)] backdrop-blur-xl"
        >
          {items.map((it) => {
            const on = it.activeOn.includes(active);
            return (
              <button
                key={it.route}
                type="button"
                aria-label={it.aria}
                aria-current={on ? "page" : undefined}
                onClick={() => navigate(it.route)}
                className={`flex min-h-[46px] flex-1 flex-col items-center justify-center gap-[3px] rounded-full px-1 transition-colors duration-150 ${
                  on ? "text-[#00ABE7]" : "text-[#5B7482]"
                }`}
              >
                <span className="flex h-[22px] items-center justify-center">{it.icon}</span>
                <span className="whitespace-nowrap text-[10.5px] font-bold leading-none">{it.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}

export function DesktopHeader() {
  const builderItems = usePishnam((s) => s.hearts + s.paws);
  const user = usePishnam((s) => s.user);
  const links: { label: string; route: Route }[] = [
    { label: "خانه", route: "home" },
    { label: "دوستای پشمالو", route: "friends" },
    { label: "ساخت هدیه", route: "card" },
    // هدیه‌هام is an ACCOUNT surface — only meaningful once logged in
    ...(user ? [{ label: "هدیه‌هام" as const, route: "my-gifts" as const }] : []),
    { label: "دفتر مهربونی", route: "impact" },
    { label: "وبلاگ", route: "blog" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-[#D3E8F0] bg-[#F2FAFD]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-y-3 px-6 py-3">
        <button type="button" onClick={() => navigate("home")} aria-label="یک دوست — خانه">
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
              className="flex h-12 items-center gap-2 rounded-full border border-[#D3E8F0] bg-white px-4 font-extrabold text-[#04202E]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00ABE7] text-sm font-black">{user.name.slice(0, 1)}</span>
              {user.name}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate("login")}
              className="flex h-12 items-center gap-1.5 rounded-full border border-[#04202E] px-5 text-[15px] font-bold text-[#04202E] transition-colors hover:bg-[#04202E] hover:text-white"
            >
              <UserIcon size={19} />
              حساب کاربری
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
