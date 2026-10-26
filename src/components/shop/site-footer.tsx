"use client";

// ── SiteFooter — one footer for mobile + desktop (replaces the legacy
// desktop-only footer). Columns: brand / quick access / یک دوست / راهنما /
// contact, plus a bottom bar with © and the password-protected admin door.
import { Logo } from "./logo";
import { navigate } from "@/lib/hash-route";

type LinkItem = { label: string; go: () => void };

function homeAnchor(anchor: string) {
  return () => {
    const p = window.location.pathname.replace(/\/+$/, "");
    if (p === "" || p === "/home") {
      document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("home", undefined, anchor);
    }
  };
}

const QUICK: LinkItem[] = [
  { label: "خانه", go: () => navigate("home") },
  { label: "دوستای پشمالو", go: () => navigate("friends") },
  { label: "ساخت هدیه", go: () => navigate("card") },
  { label: "حساب کاربری", go: () => navigate("login") },
  { label: "پیگیری سفارش", go: () => navigate("track") },
];

const PISHNAM: LinkItem[] = [
  { label: "وبلاگ یک دوست", go: () => navigate("blog") },
  { label: "تجربه‌های مهربونی", go: () => navigate("stories") },
  { label: "نظرهای مشتری‌ها", go: () => navigate("reviews") },
  { label: "دفتر مهربونی", go: () => navigate("impact") },
  { label: "درباره‌ی یک دوست", go: () => navigate("about") },
];

const GUIDE: LinkItem[] = [
  { label: "سؤال‌های رایج", go: homeAnchor("faq") },
  { label: "قوانین و شرایط", go: () => navigate("legal", { doc: "terms" }) },
  { label: "حریم خصوصی", go: () => navigate("legal", { doc: "privacy" }) },
  { label: "مرجوعی و بازگشت", go: () => navigate("legal", { doc: "refund" }) },
  { label: "تماس با ما", go: () => navigate("contact") },
];

// ── DESIGN PROTOTYPE links removed (owner round 29: demos deleted) ──

function FooterLink({ item }: { item: LinkItem }) {
  return (
    <button
      type="button"
      onClick={item.go}
      className="text-right text-[14px] font-semibold text-[#BFE9F8] transition-colors hover:text-[#00ABE7] md:text-[15px]"
    >
      {item.label}
    </button>
  );
}

function Col({ title, items }: { title: string; items: LinkItem[] }) {
  return (
    <div className="flex min-w-[140px] flex-col gap-2.5">
      <span className="text-[15.5px] font-extrabold text-[#00ABE7] md:text-base">{title}</span>
      {items.map((it) => (
        <FooterLink key={it.label} item={it} />
      ))}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-[#04202E] text-white">
      <div className="mx-auto box-border flex w-full max-w-[1200px] flex-wrap justify-between gap-9 px-5 pb-9 pt-12 md:px-6 md:pt-14">
        {/* brand */}
        <div className="flex min-w-[220px] flex-[1_1_240px] flex-col gap-3.5">
          <Logo size={44} />
          <span className="text-[15px] font-bold text-[#BFE9F8]">یه بغل، تو یه جعبه</span>
          <p className="m-0 max-w-[280px] text-[13px] font-medium leading-[1.95] text-[#7FA9BC]">
            جعبه‌ی هدیه‌ی عروسک پولیشی با کارت پستال QR، پیام صوتی و ارسال مستقیم دم در
            خانه‌ی دوستت.
          </p>
          <span className="w-fit rounded-full border border-[#0E3C52] px-3 py-1.5 text-[11.5px] font-bold text-[#7FA9BC]">
            نماد اعتماد الکترونیکی — به‌زودی
          </span>
        </div>

        <Col title="دسترسی سریع" items={QUICK} />
        <Col title="یک دوست" items={PISHNAM} />
        <Col title="راهنما" items={GUIDE} />

        {/* contact */}
        <div className="flex min-w-[150px] flex-col gap-2.5">
          <span className="text-[15.5px] font-extrabold text-[#00ABE7] md:text-base">ما رو دنبال کن</span>
          <a
            href="https://instagram.com/yekdoost"
            target="_blank"
            rel="noreferrer noopener"
            className="text-[14px] font-semibold text-[#BFE9F8] transition-colors hover:text-[#00ABE7] md:text-[15px]"
          >
            اینستاگرام یک دوست@
          </a>
          <a
            href="https://t.me/yekdoost"
            target="_blank"
            rel="noreferrer noopener"
            className="text-[14px] font-semibold text-[#BFE9F8] transition-colors hover:text-[#00ABE7] md:text-[15px]"
          >
            تلگرام یک دوست@
          </a>
          <span className="text-[14px] font-semibold text-[#BFE9F8] md:text-[15px]" dir="ltr">
            hello@yekdoost.ir
          </span>
        </div>
      </div>

      {/* bottom bar — © + admin door */}
      <div className="border-t border-[#0E3C52]">
        <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-2 px-5 py-4 md:px-6">
          <span className="text-[12.5px] font-medium text-[#7FA9BC]">
            یک دوست · همه‌ی حقوق محفوظ است · ۱۴۰۴
          </span>
          <button
            type="button"
            aria-label="ورود مدیر — با رمز عبور"
            onClick={() => navigate("admin")}
            className="flex items-center gap-1.5 rounded-full border border-[#0E3C52] px-3 py-1.5 text-[11.5px] font-bold text-[#7FA9BC] transition-colors hover:border-[#00ABE7] hover:text-[#00ABE7]"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="4" y="11" width="16" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 1 1 8 0v4" />
            </svg>
            ورود مدیر
          </button>
        </div>
      </div>
    </footer>
  );
}
