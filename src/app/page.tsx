"use client";

// ── Pishnam — the real gift web-app (UI rebuilt in React from the design system) ──
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useHashRoute, navigate } from "@/lib/hash-route";
import { useHasMounted } from "@/hooks/use-has-mounted";
import { bootSync } from "@/lib/pishnam-sync";
import { MobileNav, DesktopHeader } from "@/components/shop/nav";
import { MobileHome, DesktopHome } from "@/components/shop/screens/home";
import { ProductScreen } from "@/components/shop/screens/product";
import { FriendsScreen } from "@/components/shop/screens/friends";
import { MobilePick, MobileExtras, MobileCheckout } from "@/components/shop/screens/flow";
import { MobileSuccess, DesktopSuccess } from "@/components/shop/screens/success";
import { PayModal } from "@/components/shop/screens/pay-modal";
import { DesktopBuilder } from "@/components/shop/screens/builder";
import {
  MobileMyGifts,
  DesktopMyGifts,
  MobileImpact,
  DesktopImpact,
  MobileLogin,
  DesktopLogin,
} from "@/components/shop/screens/dashboards";
import { GiftExperience } from "@/components/shop/screens/gift-experience";
import { VerifyScreen, GiftViewScreen } from "@/components/shop/screens/verify";
import { MobileTrack, DesktopTrack } from "@/components/shop/screens/track";
import { PayGateway } from "@/components/shop/screens/pay-gateway";
import { StoriesScreen } from "@/components/shop/screens/stories";
import { BlogIndex, PostScreen } from "@/components/shop/screens/blog";
import { LegalPage } from "@/components/shop/screens/legal";
import {
  AboutPage,
  MissionPage,
  ContactPage,
  ReviewsPage,
  ShippingPage,
} from "@/components/shop/screens/info";

// ── P-07 (audit wave 37): پنل مدیریت فقط برای مدیر بارگیری می‌شود ──
// پیش از این AdminScreen استاتیک import شده بود و کل کدِ پنل ادمین در باندل
// اصلیِ «هر بازدیدکننده» دانلود می‌شد. با next/dynamic (همان الگوی
// blog-studio → mdx-core) پنل به یک chunk جدا می‌رود و فقط وقتی مسیر #/admin
// باز شود لود می‌شود. ssr:false چون کل اپ بعد از mount رندر می‌شود.
const AdminScreen = dynamic(
  () => import("@/components/shop/screens/admin").then((m) => m.AdminScreen),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[60vh] animate-pulse items-center justify-center text-sm font-bold text-[#4A6572]">
        در حال آماده‌سازی پنل مدیریت…
      </div>
    ),
  },
);

export default function PishnamApp() {
  // The app is state-driven (persisted store + hash route): until hydration
  // finishes we render a neutral shell (no branded loading screen — owner
  // request, round 37: the first-visit splash is removed entirely). Server
  // HTML matches the first client render, so hydration stays clean.
  const mounted = useHasMounted();

  if (!mounted) return <div className="min-h-screen bg-[#F2FAFD]" aria-hidden="true" />;
  return <PishnamScreens />;
}

// ── Persian 404 — unknown hash routes land here (parseHash fallback) ──
function NotFoundScreen() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5 px-6 py-16 text-center">
      <span className="text-6xl" aria-hidden="true">
        🧸
      </span>
      <h1 className="text-2xl font-black text-[#04202E]">این صفحه پیدا نشد!</h1>
      <p className="max-w-sm text-sm leading-7 text-[#4A6572]">
        انگار یه دوست پشمالو گم شده… آدرسی که اومدی اینجا وجود نداره یا جابه‌جا شده.
      </p>
      <button
        type="button"
        onClick={() => {
          navigate("home");
        }}
        className="rounded-full bg-[#04202E] px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.03] active:scale-95"
      >
        برگرد به خانه
      </button>
    </div>
  );
}

function PishnamScreens() {
  const { route, query } = useHashRoute();
  const standalone =
    route === "gift" ||
    route === "pay-gateway" ||
    route === "verify" ||
    route === "gift-view";
  // the 3-step wizard has its own back button, step bar and sticky CTA —
  // the global bottom nav would sit on top of the CTA (both stick to bottom)
  const wizard = route === "pick" || route === "card" || route === "extras" || route === "checkout";

  // boot-time server sync: merge orders persisted in SQLite into the local
  // store (global board first, then the logged-in account's bound orders)
  useEffect(() => {
    void bootSync();
  }, []);

  const screen = (() => {
    switch (route) {
      case "home":
        return (
          <>
            <MobileHome />
            <DesktopHome />
          </>
        );
      case "friends":
        return <FriendsScreen />;
      case "product":
        return <ProductScreen />;
      case "pick":
        return (
          <>
            <MobilePick />
            <DesktopBuilder step={1} />
          </>
        );
      // legacy «card» route → merged into step 1 (owner round 29: 3-step flow)
      case "card":
        return (
          <>
            <MobilePick />
            <DesktopBuilder step={1} />
          </>
        );
      case "extras":
        return (
          <>
            <MobileExtras />
            <DesktopBuilder step={2} />
          </>
        );
      case "checkout":
        return (
          <>
            <MobileCheckout />
            <DesktopBuilder step={3} />
          </>
        );
      case "success":
        return (
          <>
            <MobileSuccess />
            <DesktopSuccess />
          </>
        );
      case "my-gifts":
        return (
          <>
            <MobileMyGifts />
            <DesktopMyGifts />
          </>
        );
      case "impact":
        return (
          <>
            <MobileImpact />
            <DesktopImpact />
          </>
        );
      case "login":
        return (
          <>
            <MobileLogin />
            <DesktopLogin />
          </>
        );
      case "gift":
        return <GiftExperience />;
      case "verify":
        return <VerifyScreen />;
      case "gift-view":
        return <GiftViewScreen code={query.get("code") ?? ""} />;
      case "pay-gateway":
        return <PayGateway authority={query.get("authority") ?? ""} />;
      case "track":
        return (
          <>
            <MobileTrack />
            <DesktopTrack />
          </>
        );
      case "admin":
        return <AdminScreen />;
      case "stories":
        return <StoriesScreen />;
      case "blog":
        return <BlogIndex />;
      case "post":
        return <PostScreen slug={query.get("slug") ?? ""} />;
      case "legal":
        return <LegalPage doc={query.get("doc") ?? "privacy"} />;
      case "about":
        return <AboutPage />;
      case "mission":
        return <MissionPage />;
      case "contact":
        return <ContactPage />;
      case "reviews":
        return <ReviewsPage />;
      case "shipping":
        return <ShippingPage />;
      case "not-found":
        return <NotFoundScreen />;
      default:
        return (
          <>
            <MobileHome />
            <DesktopHome />
          </>
        );
    }
  })();

  return (
    <div className="min-h-screen bg-[#F2FAFD] text-[#04202E]">
      {!standalone && (
        <>
          <div className="hidden md:block">
            <DesktopHeader />
          </div>
        </>
      )}
      <main className="contents">{screen}</main>
      {!standalone && !wizard && <MobileNav active={route} />}
      <PayModal />
    </div>
  );
}
