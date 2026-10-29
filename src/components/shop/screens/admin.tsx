"use client";

// ═══ پنل مدیریت — slim shell (A-02 refactor, round 35) ═══
// Roles (owner request): ادمین = owner (full control + تنظیمات),
// مدیر فروشگاه = operator (daily ops: orders/receipts/products/reviews).
//
// Architecture after the A-02 split: this file owns only the gate + shell
// (state, sidebar/pills, header). EVERY tab lives in its own module under
// components/shop/admin/tabs/ (or admin/*.tsx for the pre-existing ones) and
// is lazy-loaded with next/dynamic — so opening the panel downloads only the
// shell, and each tab's code is fetched the first time that tab is opened.
// Precedent for the pattern: components/shop/blog/blog-studio.tsx (editor).
// Tabs: سفارش‌ها (transitions via /api/admin/orders/{id}/transition),
// رسیدها (manual receipt queue approve/reject), نظرها (reviews moderation).
// Gated behind AdminUser OTP (pn_admin cookie, guide A7).
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { navigate } from "@/lib/hash-route";
import { ForwardIcon } from "@/components/shop/icons";
import { MobileTopBar } from "@/components/shop/nav";
import { ADMIN_TABS, AdminPills, AdminSidebar, useBadges, type Tab } from "@/components/shop/admin/admin-nav";
import { AdminOtpGate, UNLOCK_KEY } from "@/components/shop/admin/admin-gate";
import { subscribeFocus, type FocusRequest } from "@/components/shop/admin/admin-focus";
import { adminFetch } from "@/components/shop/admin/admin-cache";

// ── lazy per-tab chunks — only the active tab's code is downloaded ──
function tabLoader() {
  return (
    <div className="flex flex-col gap-3">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="h-[88px] animate-pulse rounded-[20px] bg-white/70" />
      ))}
    </div>
  );
}

const OverviewTab = dynamic(() => import("@/components/shop/admin/admin-overview").then((m) => m.OverviewTab), { ssr: false, loading: tabLoader });
const OrdersTab = dynamic(() => import("@/components/shop/admin/tabs/orders-tab").then((m) => m.OrdersTab), { ssr: false, loading: tabLoader });
const PaymentsTab = dynamic(() => import("@/components/shop/admin/tabs/payments-tab").then((m) => m.PaymentsTab), { ssr: false, loading: tabLoader });
const RenewalsTab = dynamic(() => import("@/components/shop/admin/tabs/renewals-tab").then((m) => m.RenewalsTab), { ssr: false, loading: tabLoader });
const ProductsTab = dynamic(() => import("@/components/shop/admin/tabs/products-tab").then((m) => m.ProductsTab), { ssr: false, loading: tabLoader });
const ReviewsTab = dynamic(() => import("@/components/shop/admin/tabs/reviews-tab").then((m) => m.ReviewsTab), { ssr: false, loading: tabLoader });
const StoriesModTab = dynamic(() => import("@/components/shop/admin/tabs/stories-tab").then((m) => m.StoriesModTab), { ssr: false, loading: tabLoader });
const BlogTab = dynamic(() => import("@/components/shop/admin/tabs/blog-tab").then((m) => m.BlogTab), { ssr: false, loading: tabLoader });
const SmsTab = dynamic(() => import("@/components/shop/admin/tabs/sms-tab").then((m) => m.SmsTab), { ssr: false, loading: tabLoader });
const SettingsTab = dynamic(() => import("@/components/shop/admin/tabs/settings-tab").then((m) => m.SettingsTab), { ssr: false, loading: tabLoader });
const SlidesTab = dynamic(() => import("@/components/shop/admin/tabs/slides-tab").then((m) => m.SlidesTab), { ssr: false, loading: tabLoader });
const CustomersTab = dynamic(() => import("@/components/shop/admin/admin-customers").then((m) => m.CustomersTab), { ssr: false, loading: tabLoader });
const MessagesTab = dynamic(() => import("@/components/shop/admin/admin-messages").then((m) => m.MessagesTab), { ssr: false, loading: tabLoader });
const TeamTab = dynamic(() => import("@/components/shop/admin/admin-team").then((m) => m.TeamTab), { ssr: false, loading: tabLoader });

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
  // UX-05/13/14/15 — cross-tab focus: any tab can request a navigation that
  // carries context (order code / status filter / hasMedia). The shell is the
  // only owner of the active tab; it also forwards the request payload to the
  // target tab as a prop so the filter UI prefills.
  const [focus, setFocus] = useState<FocusRequest | null>(null);
  useEffect(
    () =>
      subscribeFocus((f) => {
        setFocus(f);
        setTab(f.tab);
      }),
    [],
  );
  // role chip + owner-only tabs — fetched right after the gate opens
  const [role, setRole] = useState<AdminRole | null>(null);
  const [adminName, setAdminName] = useState("");
  const badges = useBadges(unlocked);

  useEffect(() => {
    if (!unlocked) return;
    let alive = true;
    // A-07 — every admin GET goes through the shared cache wrapper
    adminFetch<{ admin?: { role?: string; name?: string } }>("/api/admin/me", { fresh: true })
      .then((j) => {
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
            {safeTab === "orders" && <OrdersTab focus={focus} />}
            {safeTab === "payments" && <PaymentsTab focusOrderCode={focus?.tab === "payments" ? focus.paymentOrderCode ?? null : null} />}
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
