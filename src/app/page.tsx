"use client";

// ── Pishnam — the real gift web-app (UI rebuilt in React from the design system) ──
import { useEffect } from "react";
import { useHashRoute } from "@/lib/hash-route";
import { useHasMounted } from "@/hooks/use-has-mounted";
import { pullOrders } from "@/lib/pishnam-sync";
import { MobileNav, DesktopHeader } from "@/components/shop/nav";
import { Logo } from "@/components/shop/logo";
import { MobileHome, DesktopHome } from "@/components/shop/screens/home";
import { MobilePick, MobileCard, MobileExtras, MobileCheckout } from "@/components/shop/screens/flow";
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
import { MobileTrack, DesktopTrack } from "@/components/shop/screens/track";
import { AdminScreen } from "@/components/shop/screens/admin";
import {
  AboutPage,
  MissionPage,
  ContactPage,
  ReviewsPage,
  ShippingPage,
} from "@/components/shop/screens/info";

export default function PishnamApp() {
  // The app is state-driven (persisted store + hash route): render a branded
  // splash until mounted so server HTML always matches the first client render.
  const mounted = useHasMounted();

  if (!mounted) return <Splash />;
  return <PishnamScreens />;
}

function Splash() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#F2FAFD]">
      <div className="pishnam-glow rounded-[22px]">
        <Logo size={72} />
      </div>
      <span className="text-sm font-bold text-[#4A6572]">یه بغل، تو یه جعبه…</span>
    </div>
  );
}

function PishnamScreens() {
  const { route } = useHashRoute();
  const standalone = route === "gift";

  // boot-time server sync: merge orders persisted in SQLite into the local store
  useEffect(() => {
    void pullOrders();
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
      case "pick":
        return (
          <>
            <MobilePick />
            <DesktopBuilder step={1} />
          </>
        );
      case "card":
        return (
          <>
            <MobileCard />
            <DesktopBuilder step={2} />
          </>
        );
      case "extras":
        return (
          <>
            <MobileExtras />
            <DesktopBuilder step={3} />
          </>
        );
      case "checkout":
        return (
          <>
            <MobileCheckout />
            <DesktopBuilder step={4} />
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
      case "track":
        return (
          <>
            <MobileTrack />
            <DesktopTrack />
          </>
        );
      case "admin":
        return <AdminScreen />;
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
      {!standalone && (
        <>
          <MobileNav active={route} />
        </>
      )}
      <PayModal />
    </div>
  );
}
