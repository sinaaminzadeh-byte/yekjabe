"use client";

// ── Info pages (About / Mission / Contact / Reviews / Shipping) — ported from
//    design pages 04–08 (desktop) + 09–13 (mobile) of the Pishnam system ──
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Logo } from "../logo";
import { Plush } from "../plush";
import { BackIcon, CheckIcon, HeartSticker, MailIcon } from "../icons";
import { navigate, type Route } from "@/lib/hash-route";
import {
  ABOUT_STATS,
  ABOUT_TIMELINE,
  ABOUT_VALUES,
  PLUSHES,
  PLUSH_MAP,
  REVIEWS_BARS,
  REVIEWS_CARDS,
  SHIPPING_SECTIONS,
  type PlushKind,
} from "@/lib/pishnam-data";
import { fa, faPrice } from "@/lib/fa";
import { useToast } from "@/hooks/use-toast";

/* ═══════════════ shared bits ═══════════════ */

// Mobile page root + top bar (back → home, logo) — matches design pages 09–13
function InfoShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F2FAFD] text-[#04202E] md:hidden">
      <div className="flex items-center justify-between px-4 pb-2 pt-3.5">
        <button
          type="button"
          aria-label="برگشت"
          onClick={() => navigate("home")}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D3E8F0] bg-white text-[#04202E]"
        >
          <BackIcon />
        </button>
        <Logo size={32} />
      </div>
      {children}
    </div>
  );
}

// Desktop page root — the shell provides the global header
function InfoDesktop({ children }: { children: ReactNode }) {
  return <div className="hidden min-h-screen flex-col bg-[#F2FAFD] text-[#04202E] md:flex">{children}</div>;
}

function FooterLinkMobile({ label, route }: { label: string; route: Route }) {
  return (
    <button type="button" className="text-right" onClick={() => navigate(route)}>
      {label}
    </button>
  );
}

function FooterLinkDesktop({ label, route }: { label: string; route: Route }) {
  return (
    <button
      type="button"
      className="text-right transition-colors hover:text-[#00ABE7]"
      onClick={() => navigate(route)}
    >
      {label}
    </button>
  );
}

function BrandOnDark({ size = 40 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <Logo size={size} showName={false} />
      <span className="text-xl font-black text-white">پیشنام</span>
    </div>
  );
}

// Mobile footer (design pages 09–13)
function InfoFooter() {
  return (
    <footer className="mt-auto bg-[#04202E] px-4 pb-5 pt-8 text-white">
      <div className="flex flex-col gap-2.5">
        <BrandOnDark />
        <span className="text-[14.5px] font-bold text-[#BFE9F8]">یه بغل، تو یه جعبه</span>
      </div>
      <div className="mt-[22px] grid grid-cols-2 gap-x-[14px] gap-y-5 text-[14.5px] font-semibold">
        <div className="flex flex-col gap-2.5">
          <span className="text-[15px] font-extrabold text-[#00ABE7]">پیشنام</span>
          <FooterLinkMobile label="ماموریت" route="mission" />
          <FooterLinkMobile label="درباره‌ی ما" route="about" />
          <FooterLinkMobile label="دفتر مهربونی" route="impact" />
        </div>
        <div className="flex flex-col gap-2.5">
          <span className="text-[15px] font-extrabold text-[#00ABE7]">کمک</span>
          <FooterLinkMobile label="تماس با ما" route="contact" />
          <FooterLinkMobile label="ارسال و بازگشت" route="shipping" />
          <FooterLinkMobile label="نظرها" route="reviews" />
        </div>
      </div>
      <div className="mt-[22px] flex flex-col gap-2 text-[14.5px] font-semibold">
        <span className="text-[15px] font-extrabold text-[#00ABE7]">ما رو دنبال کن</span>
        <span>پیشنام@ اینستاگرام</span>
        <span>پیشنام@ تلگرام</span>
      </div>
      <div className="mt-4 border-t border-[#0E3C52] pt-4 text-center text-[12.5px] font-medium text-[#BFE9F8]">
        پیشنام · همه‌ی حقوق محفوظ است
      </div>
    </footer>
  );
}

// Desktop footer (design pages 04–08)
function InfoFooterDesktop() {
  return (
    <footer className="mt-24 bg-[#04202E] text-white">
      <div className="mx-auto box-border flex w-full max-w-[1200px] flex-wrap justify-between gap-x-[60px] gap-y-8 px-6 pb-9 pt-12">
        <div className="flex flex-[1_1_280px] flex-col gap-3">
          <BrandOnDark />
          <span className="text-[15px] font-bold text-[#BFE9F8]">یه بغل، تو یه جعبه</span>
        </div>
        <div className="flex flex-col gap-2.5 text-[15px] font-semibold">
          <span className="text-base font-extrabold text-[#00ABE7]">پیشنام</span>
          <FooterLinkDesktop label="ماموریت" route="mission" />
          <FooterLinkDesktop label="درباره‌ی ما" route="about" />
          <FooterLinkDesktop label="دفتر مهربونی" route="impact" />
        </div>
        <div className="flex flex-col gap-2.5 text-[15px] font-semibold">
          <span className="text-base font-extrabold text-[#00ABE7]">کمک</span>
          <FooterLinkDesktop label="تماس با ما" route="contact" />
          <FooterLinkDesktop label="ارسال و بازگشت" route="shipping" />
          <FooterLinkDesktop label="نظرها" route="reviews" />
        </div>
        <div className="flex flex-col gap-2.5 text-[15px] font-semibold">
          <span className="text-base font-extrabold text-[#00ABE7]">ما رو دنبال کن</span>
          <span>پیشنام@ اینستاگرام</span>
          <span>پیشنام@ تلگرام</span>
        </div>
      </div>
      <div className="border-t border-[#0E3C52] px-6 py-[18px] text-center text-[13px] font-medium text-[#BFE9F8]">
        پیشنام · همه‌ی حقوق محفوظ است
      </div>
    </footer>
  );
}

// Phase C cross-links row: blog / UGC stories / legal pages (surgical — no restructuring)
function PishnamLinksRow({ desktop = false }: { desktop?: boolean }) {
  const links: { label: string; go: () => void }[] = [
    { label: "بلاگ", go: () => navigate("blog") },
    { label: "تجربه مخاطب", go: () => navigate("stories") },
    { label: "قوانین", go: () => navigate("legal", { doc: "terms" }) },
    { label: "حریم خصوصی", go: () => navigate("legal", { doc: "privacy" }) },
    { label: "مرجوعی", go: () => navigate("legal", { doc: "refund" }) },
  ];
  return (
    <div
      className={
        desktop
          ? "mx-auto box-border flex w-full max-w-[1200px] flex-wrap items-center gap-2.5 px-6 pt-12"
          : "flex flex-wrap items-center gap-2 px-4 pt-9"
      }
    >
      <span className="text-[13px] font-extrabold text-[#4A6572]">بیشتر بخون:</span>
      {links.map((l) => (
        <button
          key={l.label}
          type="button"
          onClick={l.go}
          className="rounded-full border-[1.5px] border-[#CFE6EF] bg-white px-3.5 py-1.5 text-[12.5px] font-extrabold text-[#04202E] transition-colors hover:border-[#00ABE7]"
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

function SectionHead({ eyebrow, title, size = 28 }: { eyebrow: string; title: string; size?: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[14px] font-extrabold text-[#00779F]">{eyebrow}</span>
      <h2 className="m-0 font-black leading-[1.45]" style={{ fontSize: size }}>
        {title}
      </h2>
    </div>
  );
}

// inline cross-link inside paragraphs
function InlineLink({ label, route }: { label: string; route: Route }) {
  return (
    <button
      type="button"
      onClick={() => navigate(route)}
      className="inline font-extrabold text-[#00779F] underline-offset-4 hover:underline"
    >
      {label}
    </button>
  );
}

function Stars({ n, size = 15 }: { n: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${fa(n)} ستاره`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"
            fill={i <= n ? "#FFC53D" : "#E3F0F5"}
            stroke="#04202E"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </span>
  );
}

// triggers once after mount → used to animate the rating bars' widths
function useBarsOn(): boolean {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setOn(true), 80);
    return () => window.clearTimeout(t);
  }, []);
  return on;
}

// Persian-digit star labels ("۵"…) → numbers
const STAR_NUM: Record<string, number> = { "۵": 5, "۴": 4, "۳": 3, "۲": 2, "۱": 1 };
const REVIEWS_TOTAL = 318;

const REVIEW_META = [
  { title: "بهترین حس دنیا", date: "۱۲ مهر" },
  { title: "دو ساله تو گوشیمه", date: "۳ آبان" },
  { title: "کلی ذوق کرد", date: "۲۱ آبان" },
  { title: "رفیق تختم شد", date: "۸ آذر" },
  { title: "خونه‌مون یه نفر بیشتر شد", date: "۲۴ آذر" },
  { title: "کل خونه خندید", date: "۵ دی" },
];

const TEAM_CARDS: { kind: PlushKind; bg: string; label: string }[] = [
  { kind: "panda", bg: "#FFE0EA", label: "بسته‌بندی" },
  { kind: "cat", bg: "#E7E0FA", label: "پاسخ به پیام‌ها" },
  { kind: "duck", bg: "#FFF3C9", label: "ارسال" },
  { kind: "bunny", bg: "#DDF3EA", label: "دفتر مهربونی" },
];

/* ═══════════════ ABOUT ═══════════════ */

export function AboutPage() {
  return (
    <>
      {/* ───── mobile (09-درباره‌ی پیشنام) ───── */}
      <InfoShell>
        {/* hero */}
        <section className="flex flex-col gap-4 bg-[#00ABE7] px-4 pb-[34px] pt-3.5">
          <span className="self-start rounded-[14px] bg-[#04202E] px-3.5 py-[7px] text-[13px] font-bold text-white">
            درباره‌ی پیشنام
          </span>
          <h1 className="m-0 text-[30px] font-black leading-[1.5]">یه دوست پشمالو، یه قلب بزرگ</h1>
          <p className="m-0 text-[15px] font-semibold leading-[1.95]">
            پیشنام از یه ایده‌ی ساده شروع شد: هدیه دادن نباید فقط برای خوشحال کردن خودمون باشه.
            می‌خوایم هر کسی بتونه با یه جعبه‌ی کوچیک، دل یکی رو گرم کنه.
          </p>
          <div className="relative mt-1.5 flex h-[240px] items-end justify-center overflow-hidden rounded-[32px] bg-[#66CDF1]">
            <Plush kind="sheep" size={200} />
            <span className="absolute right-[18px] top-4 rotate-[-12deg]">
              <HeartSticker size={36} fill="#F0426B" stroke="#04202E" strokeWidth={2.6} />
            </span>
            <span className="absolute bottom-5 left-[18px] rotate-[14deg]">
              <HeartSticker size={28} fill="#fff" stroke="#04202E" strokeWidth={2.6} />
            </span>
          </div>
          <div className="mt-1 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => navigate("pick")}
              className="flex h-[54px] items-center justify-center rounded-[27px] bg-[#04202E] text-base font-extrabold text-white transition-transform active:scale-[0.98]"
            >
              همین حالا شروع کن
            </button>
            <button
              type="button"
              onClick={() => navigate("impact")}
              className="box-border flex h-[52px] items-center justify-center rounded-[26px] border-[2.5px] border-[#04202E] text-[15px] font-bold text-[#04202E]"
            >
              دفتر مهربونی
            </button>
          </div>
        </section>

        {/* founder letter */}
        <section className="flex flex-col gap-3.5 px-4 pt-9">
          <SectionHead eyebrow="از طرف بنیانگذار" title="نامه‌ی بنیانگذار" size={28} />
          <div className="rounded-[18px] border-2 border-dashed border-[#E0B43A] bg-[#FFF3C9] px-4 py-3 text-[13.5px] font-bold leading-[1.9]">
            اگه امروز فقط یه کار از دستت برمیاد، لطفاً همین باشه: برای یه نفر یه بغل بفرست.
          </div>
          <p className="m-0 text-[15.5px] font-medium leading-[2.05] text-[#1F3E4D]">
            همیشه فکر می‌کردم بهترین هدیه‌ها اون‌هایی‌ان که بی‌دلیل داده می‌شن. یه دستمال گردن
            دست‌دوز، یه یادداشت کوتاه، یه عروسک که کنار تخت یکی می‌خوابه.
          </p>
          <p className="m-0 text-[15.5px] font-medium leading-[2.05] text-[#1F3E4D]">
            پیشنام رو ساختیم که این حس رو راحت‌تر به دست بیاری. قیمت‌ها یکی‌ان، چون مهربونی وزن
            نداره و نمی‌خوایم کسی با هدیه‌ی گران‌تر فخر بفروشه.
          </p>
          <div className="text-base font-black">نگار، بنیانگذار پیشنام</div>
          <div className="flex flex-col gap-3 rounded-[28px] bg-[#CFEFFB] p-[18px]">
            <div className="flex h-[170px] items-end justify-center gap-1">
              <Plush kind="bear" size={130} />
              <Plush kind="bunny" size={104} />
            </div>
            <div className="text-[13.5px] font-bold leading-[1.8] text-[#1F3E4D]">
              اولین جعبه‌های پیشنام همین‌جا، با دست و با کلی دقت بسته‌بندی شدن.
            </div>
          </div>
        </section>

        {/* timeline */}
        <section className="flex flex-col gap-4 px-4 pt-10">
          <SectionHead eyebrow="مسیر ما" title="از ایده تا امروز" size={28} />
          <div className="mt-2 flex flex-col gap-4">
            {ABOUT_TIMELINE.map((t) => (
              <div
                key={t.title}
                className="flex flex-col gap-2.5 rounded-[24px] border border-[#DDEEF5] bg-white px-5 py-[18px] transition-transform hover:-translate-y-0.5"
              >
                <span
                  className="self-start rounded-[13px] border-2 border-[#04202E] px-3 py-[3px] text-[13.5px] font-black"
                  style={{ background: t.bg }}
                >
                  {t.year}
                </span>
                <div className="text-[18px] font-extrabold">{t.title}</div>
                <div className="text-sm font-medium leading-[1.95] text-[#1F3E4D]">{t.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* stats */}
        <section className="px-4 pt-10">
          <div className="flex flex-wrap gap-y-6 gap-x-4 rounded-[32px] bg-[#04202E] p-[28px_22px] text-white">
            {ABOUT_STATS.map((s) => (
              <div key={s.label} className="flex min-w-0 flex-[1_1_40%] flex-col gap-1.5">
                <span className="text-[36px] font-black leading-[1.15] text-[#00ABE7]">{s.num}</span>
                <span className="text-sm font-semibold leading-[1.8] text-[#D3EEF9]">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* values */}
        <section className="flex flex-col gap-3.5 px-4 pt-10">
          <SectionHead eyebrow="چی برامون مهمه" title="سه اصلی که هیچ‌وقت عوض نمی‌شن" size={26} />
          <div className="mt-2 flex flex-col gap-3.5">
            {ABOUT_VALUES.map((v) => (
              <div
                key={v.title}
                className="flex flex-col gap-2.5 rounded-[28px] p-[22px]"
                style={{ background: v.bg }}
              >
                <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[23px] bg-[#04202E] text-[19px] font-black text-white">
                  {v.n}
                </span>
                <div className="text-[19px] font-black">{v.title}</div>
                <div className="text-[14.5px] font-medium leading-[2] text-[#1F3E4D]">{v.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* behind the scenes */}
        <section className="flex flex-col gap-3.5 px-4 pt-10">
          <SectionHead eyebrow="پشت صحنه" title="بسته‌بندی با دست، ارسال با دقت" size={26} />
          <p className="m-0 text-[15px] font-medium leading-[2] text-[#1F3E4D]">
            هر جعبه قبل از رفتن، یه بار دیگه چک می‌شه: شماره‌ی هدیه درست روی تگ، کارت QR سالم، و
            استیکرهای قلب و پنجه سر جاشون. تیم ما کوچیکه و پیام‌های مشتری‌ها رو خودمون می‌خونیم.
          </p>
          <p className="m-0 text-[15px] font-medium leading-[2] text-[#1F3E4D]">
            ۷ نفر تو تیم داریم؛ از بسته‌بندی تا جواب پیام‌ها همه‌ش با خودمونه.
          </p>
          <div className="mt-1 grid grid-cols-2 gap-3">
            {TEAM_CARDS.map((c) => (
              <div
                key={c.label}
                className="flex flex-col items-center gap-1.5 rounded-[24px] p-3.5 transition-transform hover:-translate-y-0.5"
                style={{ background: c.bg }}
              >
                <Plush kind={c.kind} size={110} />
                <span className="text-sm font-extrabold">{c.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 pt-10">
          <div className="flex flex-col gap-3.5 rounded-[32px] bg-[#00ABE7] p-[28px_22px]">
            <h2 className="m-0 text-2xl font-black leading-[1.5]">آماده‌ای یکی رو خوشحال کنی؟</h2>
            <p className="m-0 text-[15px] font-semibold leading-[1.95]">
              یه دوست رو انتخاب کن، یه کارت پستال بنویس، و بقیه‌ش با ما.
            </p>
            <button
              type="button"
              onClick={() => navigate("pick")}
              className="flex h-[54px] items-center justify-center rounded-[27px] bg-[#04202E] text-base font-extrabold text-white transition-transform active:scale-[0.98]"
            >
              بساز و بفرست
            </button>
          </div>
        </section>

        <PishnamLinksRow />

        <InfoFooter />
      </InfoShell>

      {/* ───── desktop (04-درباره‌ی پیشنام) ───── */}
      <InfoDesktop>
        {/* hero */}
        <section className="mt-1.5 bg-[#00ABE7]">
          <div className="mx-auto box-border flex w-full max-w-[1200px] flex-wrap items-center gap-10 px-6 pb-[72px] pt-[60px]">
            <div className="flex min-w-0 flex-[1_1_460px] flex-col items-start gap-5">
              <span className="rounded-[16px] bg-[#04202E] px-4 py-2 text-[13.5px] font-bold text-white">
                درباره‌ی پیشنام
              </span>
              <h1 className="m-0 text-[clamp(38px,5vw,62px)] font-black leading-[1.35]">
                یه دوست پشمالو، یه قلب بزرگ
              </h1>
              <p className="m-0 max-w-[560px] text-[19px] font-medium leading-[2]">
                پیشنام از یه ایده‌ی ساده شروع شد: هدیه دادن نباید فقط برای خوشحال کردن خودمون باشه.
                می‌خوایم هر کسی بتونه با یه جعبه‌ی کوچیک، دل یکی رو گرم کنه.
              </p>
              <div className="mt-1 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => navigate("pick")}
                  className="flex h-[58px] items-center rounded-[29px] bg-[#04202E] px-[34px] text-[17px] font-extrabold text-white transition-transform hover:scale-[1.03]"
                >
                  همین حالا شروع کن
                </button>
                <button
                  type="button"
                  onClick={() => navigate("impact")}
                  className="box-border flex h-[58px] items-center rounded-[29px] border-[2.5px] border-[#04202E] px-7 text-base font-bold text-[#04202E] transition-colors hover:bg-white/40"
                >
                  دفتر مهربونی
                </button>
              </div>
            </div>
            <div className="flex min-w-0 flex-[1_1_340px] justify-center">
              <div className="relative aspect-square w-[min(440px,100%)] overflow-hidden">
                <div className="absolute inset-0 rounded-full bg-[#66CDF1]" />
                <div className="absolute left-1/2 top-1/2 -ml-[150px] -mt-[150px]">
                  <Plush kind="sheep" size={300} />
                </div>
                <span className="absolute right-[10%] top-[12%] rotate-[-12deg]">
                  <HeartSticker size={44} fill="#F0426B" stroke="#04202E" strokeWidth={2.6} />
                </span>
                <span className="absolute bottom-[16%] left-[10%] rotate-[14deg]">
                  <HeartSticker size={34} fill="#fff" stroke="#04202E" strokeWidth={2.6} />
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* founder letter */}
        <section className="mx-auto box-border w-full max-w-[1200px] px-6 pt-20">
          <div className="flex flex-wrap items-start gap-10">
            <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-4">
              <span className="text-sm font-extrabold text-[#006387]">از طرف بنیانگذار</span>
              <h2 className="m-0 text-[38px] font-black leading-[1.4]">نامه‌ی بنیانگذار</h2>
              <div className="rounded-[20px] border-2 border-dashed border-[#E0B43A] bg-[#FFF3C9] px-[18px] py-3.5 text-sm font-bold leading-[1.9]">
                اگه امروز فقط یه کار از دستت برمیاد، لطفاً همین باشه: برای یه نفر یه بغل بفرست.
              </div>
              <p className="m-0 text-[16.5px] font-medium leading-[2.1] text-[#1F3E4D]">
                همیشه فکر می‌کردم بهترین هدیه‌ها اون‌هایی‌ان که بی‌دلیل داده می‌شن. یه دستمال گردن
                دست‌دوز، یه یادداشت کوتاه، یه عروسک که کنار تخت یکی می‌خوابه.
              </p>
              <p className="m-0 text-[16.5px] font-medium leading-[2.1] text-[#1F3E4D]">
                پیشنام رو ساختیم که این حس رو راحت‌تر به دست بیاری. قیمت‌ها یکی‌ان، چون مهربونی وزن
                نداره و نمی‌خوایم کسی با هدیه‌ی گران‌تر فخر بفروشه.
              </p>
              <div className="mt-1.5 text-[17px] font-black">نگار، بنیانگذار پیشنام</div>
            </div>
            <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-4">
              <div className="flex flex-col gap-4 rounded-[32px] bg-[#CFEFFB] p-7">
                <div className="flex h-[210px] items-end justify-center gap-1 overflow-hidden">
                  <Plush kind="bear" size={150} />
                  <Plush kind="bunny" size={120} />
                </div>
                <div className="text-sm font-bold text-[#1F3E4D]">
                  اولین جعبه‌های پیشنام همین‌جا، با دست و با کلی دقت بسته‌بندی شدن.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* timeline */}
        <section className="mx-auto box-border w-full max-w-[1200px] px-6 pt-[88px]">
          <div className="mb-9 flex flex-col gap-2">
            <span className="text-sm font-extrabold text-[#006387]">مسیر ما</span>
            <h2 className="m-0 text-[38px] font-black leading-[1.4]">از ایده تا امروز</h2>
          </div>
          <div className="flex flex-wrap gap-[18px]">
            {ABOUT_TIMELINE.map((t) => (
              <div
                key={t.title}
                className="box-border flex min-w-0 flex-[1_1_240px] flex-col gap-3 rounded-[28px] border border-[#DDEEF5] bg-white p-6 transition-transform hover:-translate-y-1"
              >
                <span
                  className="self-start rounded-[14px] border-2 border-[#04202E] px-3.5 py-1 text-sm font-black"
                  style={{ background: t.bg }}
                >
                  {t.year}
                </span>
                <div className="text-[19px] font-extrabold">{t.title}</div>
                <div className="text-[14.5px] font-medium leading-[1.95] text-[#1F3E4D]">{t.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* stats */}
        <section className="mx-auto box-border w-full max-w-[1200px] px-6 pt-[88px]">
          <div className="flex flex-wrap justify-between gap-5 rounded-[40px] bg-[#04202E] p-[48px_40px] text-white">
            {ABOUT_STATS.map((s) => (
              <div key={s.label} className="flex min-w-0 flex-[1_1_200px] flex-col gap-2">
                <span className="text-[48px] font-black leading-[1.1] text-[#00ABE7]">{s.num}</span>
                <span className="text-[15px] font-semibold leading-[1.8] text-[#D3EEF9]">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* values */}
        <section className="mx-auto box-border w-full max-w-[1200px] px-6 pt-[88px]">
          <div className="mb-8 flex flex-col gap-2">
            <span className="text-sm font-extrabold text-[#006387]">چی برامون مهمه</span>
            <h2 className="m-0 text-[38px] font-black leading-[1.4]">
              سه اصلی که هیچ‌وقت عوض نمی‌شن
            </h2>
          </div>
          <div className="flex flex-wrap gap-[18px]">
            {ABOUT_VALUES.map((v) => (
              <div
                key={v.title}
                className="box-border flex min-w-0 flex-[1_1_280px] flex-col gap-3.5 rounded-[32px] p-7 transition-transform hover:-translate-y-1"
                style={{ background: v.bg }}
              >
                <span className="flex h-[52px] w-[52px] items-center justify-center rounded-[26px] bg-[#04202E] text-[22px] font-black text-white">
                  {v.n}
                </span>
                <div className="text-[22px] font-black">{v.title}</div>
                <div className="text-[15px] font-medium leading-[2] text-[#1F3E4D]">{v.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* behind the scenes */}
        <section className="mx-auto box-border w-full max-w-[1200px] px-6 pt-[88px]">
          <div className="flex flex-wrap items-center gap-10">
            <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-4">
              <span className="text-sm font-extrabold text-[#006387]">پشت صحنه</span>
              <h2 className="m-0 text-[36px] font-black leading-[1.45]">
                بسته‌بندی با دست، ارسال با دقت
              </h2>
              <p className="m-0 text-base font-medium leading-[2.05] text-[#1F3E4D]">
                هر جعبه قبل از رفتن، یه بار دیگه چک می‌شه: شماره‌ی هدیه درست روی تگ، کارت QR سالم،
                و استیکرهای قلب و پنجه سر جاشون. تیم ما کوچیکه و پیام‌های مشتری‌ها رو خودمون
                می‌خونیم.
              </p>
              <p className="m-0 text-base font-medium leading-[2.05] text-[#1F3E4D]">
                ۷ نفر تو تیم داریم؛ از بسته‌بندی تا جواب پیام‌ها همه‌ش با خودمونه.
              </p>
            </div>
            <div className="grid min-w-0 flex-[1_1_380px] grid-cols-2 gap-3.5">
              {TEAM_CARDS.map((c) => (
                <div
                  key={c.label}
                  className="flex flex-col items-center gap-2 rounded-[26px] p-[18px] transition-transform hover:-translate-y-1"
                  style={{ background: c.bg }}
                >
                  <Plush kind={c.kind} size={130} />
                  <span className="text-sm font-extrabold">{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto box-border w-full max-w-[1200px] px-6 pt-[88px]">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-[40px] bg-[#00ABE7] p-[52px_44px]">
            <div className="flex max-w-[620px] flex-col gap-2.5">
              <h2 className="m-0 text-[36px] font-black leading-[1.45]">
                آماده‌ای یکی رو خوشحال کنی؟
              </h2>
              <p className="m-0 text-base font-semibold leading-[1.95]">
                یه دوست رو انتخاب کن، یه کارت پستال بنویس، و بقیه‌ش با ما.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate("pick")}
              className="flex h-[58px] items-center rounded-[29px] bg-[#04202E] px-[34px] text-[17px] font-extrabold text-white transition-transform hover:scale-[1.03]"
            >
              بساز و بفرست
            </button>
          </div>
        </section>

        <PishnamLinksRow desktop />

        <InfoFooterDesktop />
      </InfoDesktop>
    </>
  );
}

/* ═══════════════ MISSION ═══════════════ */

const MISSION_PARTS = [
  {
    n: "بخش ۱",
    bg: "#FFFFFF",
    border: "#DDEEF5",
    title: "هدیه، بهانه‌ی حرف زدن",
    body: "یه عروسک کنار یه کارت پستال، کافیه تا یه نفر یادش بیفته کسی بهش فکر می‌کنه. ما هم همه‌ی دقت‌مون رو گذاشتیم روی همین حس: طراحی عروسک‌ها، انتخاب متن کارت، و بسته‌بندی‌ای که وقتی بازش می‌کنی لبخند بزنی.",
  },
  {
    n: "بخش ۲",
    bg: "#FFE9F0",
    border: "#F7C5D3",
    title: "یه قیمت، بدون فخر",
    body: "همه‌ی جعبه‌ها یه قیمتن. نمی‌خوایم کسی با هدیه‌ی گران‌تر، حس بهتری داشته باشه. اگه کسی با قلب و پنجه‌های زیادی فخر بفروشه، عیبی نداره؛ اون پول مستقیم به بچه‌ها و حیوونا رسیده و مدرکش هست.",
  },
  {
    n: "بخش ۳",
    bg: "#DDF3EA",
    border: "#B5E3CE",
    title: "شفافیت، نه شعار",
    body: "هر قلب و پنجه‌ای که فروخته می‌شه، کامل برای خیریه می‌ره. هر گزارش، تاریخ و رسید ارسال رو تو دفتر مهربونی می‌ذاریم.",
  },
];

export function MissionPage() {
  return (
    <>
      {/* ───── mobile (10-ماموریت پیشنام) ───── */}
      <InfoShell>
        <section className="mx-4 mt-1.5 flex flex-col items-start gap-3.5 rounded-[32px] bg-[#00ABE7] p-[26px_22px_22px]">
          <span className="rounded-[14px] bg-[#04202E] px-3.5 py-[7px] text-[13px] font-bold text-white">
            ماموریت ما
          </span>
          <h1 className="m-0 text-[32px] font-black leading-[1.45]">عشق رو پخش کنیم</h1>
          <p className="m-0 text-[15px] font-semibold leading-[1.95]">
            دنیایی رو می‌خوایم که با پخش کردن عشق و مثبت‌اندیشی به هم نزدیک‌تر باشه. هدیه‌ها بهانه‌ن؛
            اصل ماجرا، حسیه که وسط جعبه جا می‌گیره.
          </p>
          <div className="mb-1 mt-1 self-center">
            <Plush kind="duck" size={200} />
          </div>
          <button
            type="button"
            onClick={() => navigate("pick")}
            className="flex h-[54px] w-full items-center justify-center rounded-[27px] bg-[#04202E] text-base font-extrabold text-white transition-transform active:scale-[0.98]"
          >
            همین حالا شروع کن
          </button>
        </section>

        <section className="flex flex-col gap-3.5 px-4 pt-[26px]">
          {MISSION_PARTS.map((p) => (
            <div
              key={p.n}
              className="flex flex-col gap-2.5 rounded-[28px] border p-[22px_24px] transition-transform hover:-translate-y-0.5"
              style={{ background: p.bg, borderColor: p.border }}
            >
              <span className="text-[13.5px] font-extrabold text-[#00779F]">{p.n}</span>
              <h2 className="m-0 text-[22px] font-black">{p.title}</h2>
              <p className="m-0 text-[15px] font-medium leading-[2] text-[#1F3E4D]">{p.body}</p>
            </div>
          ))}
        </section>

        <section className="px-4 pt-[26px]">
          <div className="flex flex-col gap-3 rounded-[32px] bg-[#04202E] p-[28px_22px] text-white">
            <span className="text-[13.5px] font-extrabold text-[#00ABE7]">یه بخش بیشتر</span>
            <h2 className="m-0 text-[26px] font-black leading-[1.55]">ما با هم کار می‌کنیم</h2>
            <p className="m-0 text-[15px] font-medium leading-[2] text-[#D3EEF9]">
              اگه یه خیریه، پناهگاه یا گروه داوطلبی می‌شناسی که کار خوبی می‌کنه، بهمون بگو؛ پیشنهادت
              رو با فرم تماس برامون بفرست.
            </p>
            <button
              type="button"
              onClick={() => navigate("contact")}
              className="mt-1 flex h-[52px] items-center justify-center rounded-[26px] bg-[#00ABE7] text-base font-extrabold text-[#04202E] transition-transform active:scale-[0.98]"
            >
              پیشنهاد بده
            </button>
          </div>
        </section>

        <section className="px-4 pt-[26px]">
          <div className="flex flex-col items-center gap-4 rounded-[32px] border border-[#DDEEF5] bg-white p-[30px_22px] text-center">
            <h2 className="m-0 text-[22px] font-black leading-[1.6]">
              هر هدیه، یه قدم کوچیک برای دنیای مهربون‌تر
            </h2>
            <button
              type="button"
              onClick={() => navigate("pick")}
              className="flex h-[54px] w-full items-center justify-center rounded-[27px] bg-[#00ABE7] text-base font-extrabold text-[#04202E] transition-transform active:scale-[0.98]"
            >
              بساز و بفرست
            </button>
          </div>
        </section>

        <InfoFooter />
      </InfoShell>

      {/* ───── desktop (05-ماموریت پیشنام) ───── */}
      <InfoDesktop>
        <section className="mx-auto box-border w-full max-w-[1200px] px-6 pt-6">
          <div className="flex flex-wrap items-center gap-9 rounded-[40px] bg-[#00ABE7] p-[64px_56px]">
            <div className="flex min-w-0 flex-[1_1_460px] flex-col items-start gap-[18px]">
              <span className="rounded-[16px] bg-[#04202E] px-4 py-2 text-[13.5px] font-bold text-white">
                ماموریت ما
              </span>
              <h1 className="m-0 text-[clamp(42px,5.6vw,72px)] font-black leading-[1.3]">
                عشق رو پخش کنیم
              </h1>
              <p className="m-0 max-w-[580px] text-[19px] font-semibold leading-[2]">
                دنیایی رو می‌خوایم که با پخش کردن عشق و مثبت‌اندیشی به هم نزدیک‌تر باشه. هدیه‌ها
                بهانه‌ن؛ اصل ماجرا، حسیه که وسط جعبه جا می‌گیره.
              </p>
              <button
                type="button"
                onClick={() => navigate("pick")}
                className="mt-1 flex h-[58px] items-center rounded-[29px] bg-[#04202E] px-[34px] text-[17px] font-extrabold text-white transition-transform hover:scale-[1.03]"
              >
                همین حالا شروع کن
              </button>
            </div>
            <div className="flex min-w-0 flex-[1_1_320px] justify-center">
              <Plush kind="duck" size={300} />
            </div>
          </div>
        </section>

        <section className="mx-auto box-border flex w-full max-w-[1200px] flex-wrap gap-[18px] px-6 pt-[88px]">
          {MISSION_PARTS.map((p) => (
            <div
              key={p.n}
              className="box-border flex min-w-0 flex-[1_1_360px] flex-col gap-3.5 rounded-[32px] border p-8 transition-transform hover:-translate-y-1"
              style={{ background: p.bg, borderColor: p.border }}
            >
              <span className="text-sm font-extrabold text-[#006387]">{p.n}</span>
              <h2 className="m-0 text-[26px] font-black">{p.title}</h2>
              <p className="m-0 text-[15.5px] font-medium leading-[2] text-[#1F3E4D]">{p.body}</p>
            </div>
          ))}
        </section>

        <section className="mx-auto box-border w-full max-w-[1200px] px-6 pt-[88px]">
          <div className="flex flex-wrap items-center gap-10 rounded-[40px] bg-[#04202E] p-[52px_44px] text-white">
            <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-4">
              <span className="text-sm font-extrabold text-[#00ABE7]">یه بخش بیشتر</span>
              <h2 className="m-0 text-[36px] font-black leading-[1.5]">ما با هم کار می‌کنیم</h2>
              <p className="m-0 text-base font-medium leading-[2] text-[#D3EEF9]">
                اگه یه خیریه، پناهگاه یا گروه داوطلبی می‌شناسی که کار خوبی می‌کنه، بهمون بگو؛
                پیشنهادت رو با فرم تماس برامون بفرست.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate("contact")}
              className="flex h-[54px] flex-none items-center rounded-[27px] bg-[#00ABE7] px-[30px] text-base font-extrabold text-[#04202E] transition-transform hover:scale-[1.03]"
            >
              پیشنهاد بده
            </button>
          </div>
        </section>

        <section className="mx-auto box-border w-full max-w-[1200px] px-6 pt-[88px] text-center">
          <div className="flex flex-col items-center gap-[18px] rounded-[40px] border border-[#DDEEF5] bg-white p-[48px_32px]">
            <h2 className="m-0 text-[34px] font-black">
              هر هدیه، یه قدم کوچیک برای دنیای مهربون‌تر
            </h2>
            <button
              type="button"
              onClick={() => navigate("pick")}
              className="flex h-[58px] items-center rounded-[29px] bg-[#00ABE7] px-9 text-[17px] font-extrabold text-[#04202E] transition-transform hover:scale-[1.03]"
            >
              بساز و بفرست
            </button>
          </div>
        </section>

        <InfoFooterDesktop />
      </InfoDesktop>
    </>
  );
}

/* ═══════════════ CONTACT ═══════════════ */

const SUBJECTS = [
  "می‌خوام آدرس سفارشم رو عوض کنم",
  "نوشته تحویل شده ولی نرسیده",
  "چرا این‌قدر طول کشید؟",
  "می‌خوام سفارشم رو لغو کنم",
  "می‌خوام متن کارتم رو عوض کنم",
  "مشکل با عروسک یا بسته دارم",
  "یه چیز دیگه",
];

const FIELD =
  "box-border w-full rounded-[16px] border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-4 text-base text-[#04202E] outline-none transition-colors focus:border-[#00ABE7]";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <span className="text-[12.5px] font-bold text-[#E0315B]">{msg}</span>;
}

function ContactForm({ idp }: { idp: string }) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [orderNo, setOrderNo] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  }>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = "اسمت رو بنویس.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = "یه ایمیل درست بنویس.";
    if (!subject) errs.subject = "یکی از موضوع‌ها رو انتخاب کن.";
    if (!message.trim()) errs.message = "پیامت رو بنویس.";
    setErrors(errs);
    if (Object.keys(errs).length > 0 || sending) return;
    setSending(true);
    const startedAt = Date.now();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, orderNo, message }),
      });
      if (!res.ok) throw new Error("server");
      const wait = Math.max(0, 900 - (Date.now() - startedAt));
      window.setTimeout(() => {
        setSending(false);
        setSent(true);
        toast({
          title: "پیامت رسید!",
          description: "خیلی مچکریم؛ معمولاً کمتر از یه روز کاری جواب می‌دیم.",
        });
      }, wait);
    } catch {
      setSending(false);
      toast({
        title: "ارسال نشد!",
        description: "اتصال به سرور برقرار نشد؛ چند لحظه بعد دوباره امتحان کن.",
      });
    }
  };

  const reset = () => {
    setName("");
    setEmail("");
    setSubject("");
    setOrderNo("");
    setMessage("");
    setErrors({});
    setSent(false);
  };

  if (sent) {
    return (
      <div className="pishnam-reveal flex flex-col items-center gap-3.5 rounded-[28px] border-[1.5px] border-[#B5E3CE] bg-[#DDF3EA] p-7 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-[#04202E] bg-white">
          <CheckIcon size={30} stroke="#04202E" />
        </span>
        <div className="text-[22px] font-black">پیامت رسید!</div>
        <p className="m-0 text-[14.5px] font-medium leading-[1.9] text-[#1F3E4D]">
          ممنون که باهامون حرف زدی{name.trim() ? `، ${name.trim()}` : ""}. جوابت رو به ایمیلت
          می‌فرستیم — معمولاً کمتر از یه روز کاری.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-1 flex h-12 items-center rounded-full border-2 border-[#04202E] bg-white px-6 text-[15px] font-extrabold text-[#04202E]"
        >
          فرم جدید
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3.5">
        <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-1.5">
          <label htmlFor={`${idp}-name`} className="text-sm font-extrabold">
            اسمت
          </label>
          <input
            id={`${idp}-name`}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="اسم و فامیل"
            className={`${FIELD} h-[52px]`}
          />
          <FieldError msg={errors.name} />
        </div>
        <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-1.5">
          <label htmlFor={`${idp}-email`} className="text-sm font-extrabold">
            ایمیل
          </label>
          <input
            id={`${idp}-email`}
            type="email"
            dir="ltr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={`${FIELD} h-[52px] text-right`}
          />
          <FieldError msg={errors.email} />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${idp}-subject`} className="text-sm font-extrabold">
          موضوع
        </label>
        <select
          id={`${idp}-subject`}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={`${FIELD} h-[52px] ${subject ? "" : "text-[#7E97A3]"}`}
        >
          <option value="">یکی رو انتخاب کن</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <FieldError msg={errors.subject} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${idp}-order`} className="text-sm font-extrabold">
          شماره‌ی سفارش (اختیاری)
        </label>
        <input
          id={`${idp}-order`}
          type="text"
          value={orderNo}
          onChange={(e) => setOrderNo(e.target.value)}
          placeholder="مثلاً ۱۰۱"
          className={`${FIELD} h-[52px]`}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${idp}-message`} className="text-sm font-extrabold">
          پیامت
        </label>
        <textarea
          id={`${idp}-message`}
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="هر چی که لازمه بدونیم رو بنویس…"
          className={`${FIELD} resize-y p-3 leading-[1.85]`}
        />
        <FieldError msg={errors.message} />
      </div>
      <button
        type="submit"
        disabled={sending}
        className="flex h-14 items-center justify-center gap-2 rounded-[28px] bg-[#00ABE7] text-[17px] font-extrabold text-[#04202E] transition-transform active:scale-[0.98] disabled:opacity-80"
      >
        {sending ? (
          <>
            در حال ارسال…
            <svg
              className="animate-spin"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" stroke="#04202E" strokeOpacity=".25" strokeWidth="3" />
              <path d="M21 12a9 9 0 0 0-9-9" stroke="#04202E" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </>
        ) : (
          "بفرست"
        )}
      </button>
      <span className="text-[13px] font-medium leading-[1.8] text-[#4A6572]">
        معمولاً کمتر از یه روز کاری جواب می‌دیم.
      </span>
    </form>
  );
}

const CONTACT_ROWS = [
  {
    bg: "#D6F1FB",
    icon: <MailIcon size={20} />,
    label: "ایمیل",
    value: "hello@pishnam.ir",
    ltr: true,
  },
  {
    bg: "#FFE0EA",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#04202E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" />
      </svg>
    ),
    label: "تلفن",
    value: "۰۲۱-۹۱۰۰۹۱۰۰",
    ltr: false,
  },
  {
    bg: "#FFF3C9",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#04202E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
    label: "ساعت پاسخ‌گویی",
    value: "شنبه تا پنجشنبه، ۹ تا ۱۸",
    ltr: false,
  },
];

export function ContactPage() {
  return (
    <>
      {/* ───── mobile (11-تماس با پیشنام) ───── */}
      <InfoShell>
        <section className="flex flex-col gap-[18px] px-4 pt-3.5">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-extrabold text-[#00779F]">ما اینجاییم</span>
            <h1 className="m-0 text-[30px] font-black leading-[1.45]">باهامون حرف بزن</h1>
            <p className="m-0 text-[15px] font-medium leading-[1.95] text-[#1F3E4D]">
              اگه سؤالی داشتی، یا جعبه‌ت یه جای دیگه رفت، یا می‌خوای چیزی رو عوض کنی، فقط کافیه این
              فرم رو پر کنی. قبلش شاید جواب سؤالت تو <InlineLink label="ارسال و بازگشت" route="shipping" />{" "}
              باشه.
            </p>
          </div>

          <div className="flex flex-col rounded-[22px] border border-[#DDEEF5] bg-white px-4 py-1.5">
            {CONTACT_ROWS.map((r, i) => (
              <div
                key={r.label}
                className={`flex items-center gap-3 py-3 ${i < CONTACT_ROWS.length - 1 ? "border-b border-[#EAF4F8]" : ""}`}
              >
                <span
                  className="flex h-[42px] w-[42px] flex-none items-center justify-center rounded-full"
                  style={{ background: r.bg }}
                >
                  {r.icon}
                </span>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="text-[12.5px] font-semibold text-[#4A6572]">{r.label}</span>
                  <span
                    className="text-[15.5px] font-extrabold"
                    dir={r.ltr ? "ltr" : undefined}
                    style={r.ltr ? { textAlign: "right" } : undefined}
                  >
                    {r.value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-[28px] border border-[#DDEEF5] bg-white p-[22px_18px]">
            <ContactForm idp="cm" />
          </div>
        </section>

        <InfoFooter />
      </InfoShell>

      {/* ───── desktop (06-تماس با پیشنام) ───── */}
      <InfoDesktop>
        <div className="mx-auto box-border flex w-full max-w-[1200px] flex-wrap items-start gap-9 px-6 pt-10">
          <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-[22px]">
            <div className="flex flex-col gap-2.5">
              <span className="text-sm font-extrabold text-[#006387]">ما اینجاییم</span>
              <h1 className="m-0 text-[44px] font-black leading-[1.35]">باهامون حرف بزن</h1>
              <p className="m-0 text-base font-medium leading-[2] text-[#1F3E4D]">
                اگه سؤالی داشتی، یا جعبه‌ت یه جای دیگه رفت، یا می‌خوای چیزی رو عوض کنی، فقط کافیه این
                فرم رو پر کنی. قبلش شاید جواب سؤالت تو{" "}
                <InlineLink label="ارسال و بازگشت" route="shipping" /> باشه.
              </p>
            </div>
            <div className="flex flex-col gap-3 rounded-[22px] border border-[#DDEEF5] bg-white p-[18px_20px]">
              {[
                { bg: "#D6F1FB", glyph: "@" },
                { bg: "#FFE0EA", glyph: "☎" },
                { bg: "#FFF3C9", glyph: "۸" },
              ].map((g, i) => (
                <div key={g.glyph} className="flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-[22px] text-[18px] font-black"
                    style={{ background: g.bg }}
                  >
                    {g.glyph}
                  </span>
                  <div className="flex min-w-0 flex-col">
                    <span className="text-[13px] font-semibold text-[#4A6572]">
                      {CONTACT_ROWS[i].label}
                    </span>
                    <span
                      className="text-base font-extrabold"
                      dir={CONTACT_ROWS[i].ltr ? "ltr" : undefined}
                      style={CONTACT_ROWS[i].ltr ? { textAlign: "right" } : undefined}
                    >
                      {CONTACT_ROWS[i].value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="box-border flex min-w-0 flex-[1_1_480px] flex-col rounded-[32px] border border-[#DDEEF5] bg-white p-8">
            <ContactForm idp="cd" />
          </div>
        </div>

        <InfoFooterDesktop />
      </InfoDesktop>
    </>
  );
}

/* ═══════════════ REVIEWS ═══════════════ */

// real reviews pulled from the server (newest first) + optimistic local adds
interface ServerReview {
  id: string;
  who: string;
  role: string; // sender | receiver
  stars: number;
  kind: string;
  title: string;
  text: string;
  createdAt: string;
}

function faDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("fa-IR", { day: "numeric", month: "long" }).format(new Date(iso));
  } catch {
    return "امروز";
  }
}

function useRealReviews() {
  const [real, setReal] = useState<ServerReview[] | null>(null);
  useEffect(() => {
    let alive = true;
    fetch("/api/reviews", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("bad"))))
      .then((j: { reviews?: ServerReview[] }) => {
        if (alive && Array.isArray(j.reviews)) setReal(j.reviews);
      })
      .catch(() => {}); // offline → seed cards only, page keeps working
    return () => {
      alive = false;
    };
  }, []);
  const add = (r: ServerReview) => setReal((cur) => [r, ...(cur ?? [])]);
  return { real, add };
}

// pulsing «live data» chip — real reviews are synced from the DB
function LiveReviewsChip({ count }: { count: number }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border border-[#CDEFFB] bg-white px-3 py-1 text-[11.5px] font-extrabold text-[#00779F]"
      title="نظرهای واقعی مستقیم از دیتابیس میان"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ABE7] opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00ABE7]" />
      </span>
      {count > 0 ? `داده‌ی زنده · ${fa(count)} نظر واقعی` : "داده‌ی زنده"}
    </span>
  );
}

// clickable star rating input
function StarPicker({ n, onPick, desktop = false }: { n: number; onPick: (i: number) => void; desktop?: boolean }) {
  return (
    <span className="flex items-center gap-1" role="radiogroup" aria-label="امتیازت">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          role="radio"
          aria-checked={i === n}
          aria-label={`${fa(i)} ستاره`}
          onClick={() => onPick(i)}
          className="flex items-center transition-transform active:scale-90"
        >
          <svg width={desktop ? 27 : 23} height={desktop ? 27 : 23} viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"
              fill={i <= n ? "#FFC53D" : "#E3F0F5"}
              stroke="#04202E"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ))}
    </span>
  );
}

// «ثبت نظر» collapsible form — posts to /api/reviews, appears instantly
function ReviewForm({
  idp,
  desktop = false,
  onAdded,
}: {
  idp: string;
  desktop?: boolean;
  onAdded: (r: ServerReview) => void;
}) {
  const [open, setOpen] = useState(false);
  const [who, setWho] = useState("");
  const [role, setRole] = useState<"sender" | "receiver">("sender");
  const [stars, setStars] = useState(5);
  const [kind, setKind] = useState<PlushKind>("bear");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const { toast } = useToast();

  const submit = () => {
    if (busy) return;
    if (who.trim().length < 2) {
      setErr("اسمت رو بنویس (حداقل ۲ حرف).");
      return;
    }
    if (text.trim().length < 5) {
      setErr("متن نظرت حداقل ۵ حرف باشه.");
      return;
    }
    setErr("");
    setBusy(true);
    fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ who: who.trim(), role, stars, kind, title: title.trim(), text: text.trim() }),
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("bad"))))
      .then((j: { review?: ServerReview & { pending?: boolean } }) => {
        setBusy(false);
        setText("");
        setTitle("");
        if (j.review?.pending) {
          // moderation flow (guide A9): nothing goes public before approval
          toast({
            title: "نظرت ثبت شد ♥",
            description: "بعد از یه نگاه سریع، منتشرش می‌کنیم.",
          });
        } else if (j.review) {
          onAdded(j.review);
          toast({ title: "نظرت ثبت شد ♥", description: "ممنون که تجربه‌ت رو با بقیه تقسیم می‌کنی." });
        }
      })
      .catch(() => {
        setBusy(false);
        setErr("ثبت نشد؛ اتصال به سرور برقرار نیست. چند لحظه بعد دوباره امتحان کن.");
      });
  };

  const chip = (on: boolean) =>
    ({
      background: on ? "#04202E" : "#FFFFFF",
      border: `1.5px solid ${on ? "#04202E" : "#CFE6EF"}`,
      color: on ? "#FFFFFF" : "#04202E",
    }) as const;

  return (
    <div
      className={
        desktop
          ? "flex flex-col gap-4 rounded-[28px] border border-[#DDEEF5] bg-white p-[26px]"
          : "flex flex-col gap-4 rounded-[26px] border border-[#DDEEF5] bg-white p-5"
      }
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center justify-between gap-3 ${
          open
            ? "w-full text-start"
            : desktop
              ? "h-[54px] rounded-[27px] bg-[#00ABE7] px-[26px] text-base font-extrabold text-[#04202E] transition-transform hover:scale-[1.02]"
              : "min-h-[54px] rounded-[27px] bg-[#00ABE7] px-5 text-center text-[15.5px] font-extrabold text-[#04202E] transition-transform active:scale-[0.98]"
        }`}
      >
        <span className="flex items-center gap-2">
          <HeartSticker size={18} fill="#FFFFFF" stroke="#04202E" strokeWidth={2.4} />
          {open ? "نوشتن نظرت" : "خودت هم یه نظر بذار ♥"}
        </span>
        <span className={open ? "flex items-center text-[13px] font-extrabold text-[#4A6572]" : "hidden"}>
          بستن
        </span>
      </button>

      {open && (
        <div className="flex flex-col gap-4">
          <div className={desktop ? "grid grid-cols-2 gap-4" : "flex flex-col gap-4"}>
            <div className="flex flex-col gap-1.5">
              <label htmlFor={`${idp}-who`} className="text-sm font-extrabold">
                اسمت
              </label>
              <input
                id={`${idp}-who`}
                type="text"
                value={who}
                onChange={(e) => setWho(e.target.value.slice(0, 30))}
                placeholder="مثلاً نیلا"
                className={`${FIELD} h-[52px]`}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-extrabold">کی بودی؟</span>
              <div className="flex gap-2" role="group" aria-label="نقش تو">
                <button type="button" aria-pressed={role === "sender"} onClick={() => setRole("sender")} style={chip(role === "sender")} className="h-[52px] flex-1 rounded-[16px] text-[14px] font-extrabold">
                  فرستنده بودم
                </button>
                <button type="button" aria-pressed={role === "receiver"} onClick={() => setRole("receiver")} style={chip(role === "receiver")} className="h-[52px] flex-1 rounded-[16px] text-[14px] font-extrabold">
                  گیرنده بودم
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-extrabold">چند ستاره؟</span>
              <StarPicker n={stars} onPick={setStars} desktop={desktop} />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-extrabold">کدوم دوست پشمالو؟</span>
              <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="انتخاب عروسک">
                {PLUSHES.map((p) => (
                  <button
                    key={p.kind}
                    type="button"
                    aria-pressed={kind === p.kind}
                    aria-label={p.name}
                    title={p.name}
                    onClick={() => setKind(p.kind)}
                    className="flex h-10 w-10 items-center justify-center rounded-full transition-transform active:scale-90"
                    style={{
                      background: p.bg,
                      boxShadow: kind === p.kind ? "0 0 0 2.5px #04202E" : "none",
                    }}
                  >
                    <Plush kind={p.kind} size={28} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${idp}-title`} className="text-sm font-extrabold">
              عنوان (اختیاری)
            </label>
            <input
              id={`${idp}-title`}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value.slice(0, 60))}
              placeholder="مثلاً بهترین حس دنیا"
              className={`${FIELD} h-[52px]`}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${idp}-text`} className="text-sm font-extrabold">
              نظرت
            </label>
            <textarea
              id={`${idp}-text`}
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, 400))}
              placeholder="تجربه‌ت از پیشنام رو تعریف کن…"
              className={`${FIELD} resize-y p-3 leading-[1.85]`}
            />
            <span className="self-end text-[11.5px] font-semibold text-[#4A6572]">
              {fa(text.length)}/{fa(400)}
            </span>
          </div>

          {err && <span className="text-[12.5px] font-bold text-[#E0315B]">{err}</span>}

          <button
            type="button"
            onClick={submit}
            disabled={busy}
            className={`flex h-[54px] items-center justify-center gap-2 rounded-[27px] bg-[#00ABE7] font-extrabold text-[#04202E] transition-transform active:scale-[0.98] disabled:opacity-80 ${
              desktop ? "w-[220px] text-base" : "w-full text-[15.5px]"
            }`}
          >
            {busy ? (
              <>
                در حال ثبت…
                <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" stroke="#04202E" strokeOpacity=".25" strokeWidth="3" />
                  <path d="M21 12a9 9 0 0 0-9-9" stroke="#04202E" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </>
            ) : (
              "ثبت نظر"
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export function ReviewsPage() {
  const barsOn = useBarsOn();
  const { real, add } = useRealReviews();
  const realList = real ?? [];

  // honest stats: seeded baseline + real DB rows
  const total = REVIEWS_TOTAL + realList.length;
  const seedCount = (star: number) => {
    const b = REVIEWS_BARS.find((x) => (STAR_NUM[x.stars] ?? 0) === star);
    return b ? Math.round((b.pct / 100) * REVIEWS_TOTAL) : 0;
  };
  const realCount = (star: number) => realList.filter((r) => r.stars === star).length;
  const bars = REVIEWS_BARS.map((b) => {
    const star = STAR_NUM[b.stars] ?? 0;
    const count = seedCount(star) + realCount(star);
    return { ...b, count, pct: total > 0 ? Math.round((count / total) * 100) : 0 };
  });
  const avgSum =
    REVIEWS_BARS.reduce((a, b) => a + (STAR_NUM[b.stars] ?? 0) * seedCount(STAR_NUM[b.stars] ?? 0), 0) +
    realList.reduce((a, r) => a + r.stars, 0);
  const avgFa = fa((total > 0 ? avgSum / total : 0).toFixed(1)).replace(".", "٫");

  const seedCards = REVIEWS_CARDS.map((c, i) => ({
    key: `seed-${i}`,
    kind: c.kind,
    stars: c.stars,
    who: c.who.split("،")[0].trim(),
    role: c.who.split("،")[1]?.trim() ?? "فرستنده",
    meta: REVIEW_META[i] ?? { title: "یه تجربه‌ی قشنگ", date: "امروز" },
    text: c.text,
  }));
  const realCards = realList.map((r) => ({
    key: r.id,
    kind: (PLUSH_MAP[r.kind as PlushKind] ? r.kind : "bear") as PlushKind,
    stars: r.stars,
    who: r.who,
    role: r.role === "receiver" ? "گیرنده" : "فرستنده",
    meta: { title: r.title || "یه تجربه‌ی قشنگ", date: faDate(r.createdAt) },
    text: r.text,
  }));

  const reviewCard = (
    c: (typeof seedCards)[number] & { real?: boolean },
    desktop: boolean,
  ) => (
    <div
      key={c.key}
      className={
        desktop
          ? "box-border flex min-w-0 flex-[1_1_300px] flex-col gap-3 rounded-[28px] border bg-white p-[22px] transition-transform hover:-translate-y-1"
          : "flex flex-col gap-2.5 rounded-[26px] border bg-white p-5 transition-transform hover:-translate-y-0.5"
      }
      style={{ borderColor: c.real ? "#BFE7F5" : "#DDEEF5" }}
    >
      <div className="flex items-center justify-between gap-2">
        <Stars n={c.stars} />
        {c.real ? (
          <span className="flex items-center gap-2">
            <span className="text-[12.5px] font-semibold text-[#4A6572]">{c.meta.date}</span>
            <span className="rounded-full bg-[#DDF3EA] px-2.5 py-0.5 text-[11px] font-extrabold text-[#007A5C]">واقعی</span>
          </span>
        ) : (
          <span className="text-[12.5px] font-semibold text-[#4A6572]">{c.meta.date}</span>
        )}
      </div>
      <div className="text-base font-extrabold">{c.meta.title}</div>
      <div className={desktop ? "text-[14.5px] font-medium leading-[1.95] text-[#1F3E4D]" : "text-sm font-medium leading-[1.95] text-[#1F3E4D]"}>
        {c.text}
      </div>
      <div className="mt-auto flex items-center gap-2.5">
        <Plush kind={c.kind} size={44} />
        <span className="text-[13.5px] font-bold">
          {c.who}، {c.role}
        </span>
      </div>
    </div>
  );

  return (
    <>
      {/* ───── mobile (12-نظرها) ───── */}
      <InfoShell>
        <section className="flex flex-col gap-[18px] px-4 pt-3.5">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm font-extrabold text-[#00779F]">نظر کسایی که هدیه گرفتن</span>
              {real !== null && <LiveReviewsChip count={realList.length} />}
            </div>
            <h1 className="m-0 text-[30px] font-black leading-[1.45]">نظرها</h1>
          </div>

          <div className="flex flex-col gap-1.5 rounded-[26px] border border-[#DDEEF5] bg-white p-5">
            <span className="text-sm font-bold text-[#4A6572]">میانگین امتیاز</span>
            <span className="text-[38px] font-black leading-[1.15]">{avgFa}</span>
            <span className="text-[13.5px] font-semibold text-[#4A6572]">از {fa(total)} نظر</span>
          </div>

          <div className="flex flex-col gap-3 rounded-[26px] border border-[#DDEEF5] bg-white p-[18px_16px]">
            {bars.map((b) => (
              <div key={b.stars} className="flex items-center gap-2.5">
                <span className="w-[58px] flex-none text-[13.5px] font-bold">{b.stars} ستاره</span>
                <div className="h-3 min-w-0 flex-1 overflow-hidden rounded-full bg-[#E3F0F5]">
                  <div
                    className="h-3 rounded-full bg-[#00ABE7] transition-[width] duration-1000 ease-out"
                    style={{ width: barsOn ? `${b.pct}%` : "0%" }}
                  />
                </div>
                <span className="flex-none text-[12.5px] font-semibold text-[#4A6572]">
                  {fa(b.pct)}٪ · {fa(b.count)} نظر
                </span>
              </div>
            ))}
          </div>

          {realCards.map((c) => reviewCard({ ...c, real: true }, false))}
          {seedCards.map((c) => reviewCard(c, false))}

          <ReviewForm idp="rm" onAdded={add} />
        </section>

        <InfoFooter />
      </InfoShell>

      {/* ───── desktop (07-نظرها) ───── */}
      <InfoDesktop>
        <div className="mx-auto box-border flex w-full max-w-[1200px] flex-col gap-7 px-6 pt-10">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div className="flex flex-col gap-2.5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-extrabold text-[#006387]">نظر کسایی که هدیه گرفتن</span>
                {real !== null && <LiveReviewsChip count={realList.length} />}
              </div>
              <h1 className="m-0 text-[44px] font-black leading-[1.35]">نظرها</h1>
            </div>
            <div className="flex min-w-[260px] flex-col gap-2 rounded-[28px] border border-[#DDEEF5] bg-white p-[22px_26px]">
              <span className="text-sm font-bold text-[#4A6572]">میانگین امتیاز</span>
              <span className="text-[40px] font-black leading-[1.1]">{avgFa}</span>
              <span className="text-[13.5px] font-semibold text-[#4A6572]">از {fa(total)} نظر</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-[28px] border border-[#DDEEF5] bg-white p-[26px]">
            {bars.map((b) => (
              <div key={b.stars} className="flex items-center gap-3.5">
                <span className="w-[60px] flex-none text-sm font-bold">{b.stars} ستاره</span>
                <div className="h-3 min-w-0 flex-1 overflow-hidden rounded-full bg-[#E3F0F5]">
                  <div
                    className="h-3 rounded-full bg-[#00ABE7] transition-[width] duration-1000 ease-out"
                    style={{ width: barsOn ? `${b.pct}%` : "0%" }}
                  />
                </div>
                <span className="w-[110px] flex-none text-left text-[13.5px] font-semibold text-[#4A6572]">
                  {fa(b.pct)}٪ · {fa(b.count)} نظر
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-[18px]">
            {realCards.map((c) => reviewCard({ ...c, real: true }, true))}
            {seedCards.map((c) => reviewCard(c, true))}
          </div>

          <ReviewForm idp="rd" desktop onAdded={add} />
        </div>

        <InfoFooterDesktop />
      </InfoDesktop>
    </>
  );
}

/* ═══════════════ SHIPPING ═══════════════ */

export function ShippingPage() {
  return (
    <>
      {/* ───── mobile (13-ارسال و بازگشت) ───── */}
      <InfoShell>
        <section className="flex flex-col gap-[18px] px-4 pt-3.5">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-extrabold text-[#00779F]">قبل از سفارش بخون</span>
            <h1 className="m-0 text-[30px] font-black leading-[1.45]">ارسال و بازگشت</h1>
            <p className="m-0 text-[15px] font-medium leading-[2] text-[#1F3E4D]">
              همه‌چی اینجا ساده و روشنه. اگه جوابت رو اینجا پیدا نکردی، از{" "}
              <InlineLink label="تماس با ما" route="contact" /> بپرس.
            </p>
          </div>

          {SHIPPING_SECTIONS.map((s) => (
            <div
              key={s.title}
              className="flex flex-col gap-3 rounded-[26px] border border-[#DDEEF5] bg-white p-[20px_22px] transition-transform hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-9 w-9 flex-none items-center justify-center rounded-full border-2 border-[#04202E] font-black"
                  style={{ background: s.bg }}
                >
                  {s.n}
                </span>
                <h2 className="m-0 text-[19px] font-black">{s.title}</h2>
              </div>
              <div className="text-[14.5px] font-medium leading-[2.05] text-[#1F3E4D]">{s.body}</div>
            </div>
          ))}

          <div className="rounded-[26px] border-[1.5px] border-[#F7C5D3] bg-[#FFE9F0] p-[18px_20px] text-sm font-semibold leading-[2]">
            هزینه‌ی ارسال تهران {faPrice(49_000)} و شهرستان‌ها {faPrice(69_000)} ه‌ست و همین موقع ثبت
            آدرس حساب می‌شه. بازگشت یا تعویض هم تا ۷ روز بعد از تحویل آزاده.
          </div>
        </section>

        <InfoFooter />
      </InfoShell>

      {/* ───── desktop (08-ارسال و بازگشت) ───── */}
      <InfoDesktop>
        <div className="mx-auto box-border flex w-full max-w-[920px] flex-col gap-7 px-6 pt-10">
          <div className="flex flex-col gap-2.5">
            <span className="text-sm font-extrabold text-[#006387]">قبل از سفارش بخون</span>
            <h1 className="m-0 text-[44px] font-black leading-[1.35]">ارسال و بازگشت</h1>
            <p className="m-0 text-base font-medium leading-[2] text-[#1F3E4D]">
              همه‌چی اینجا ساده و روشنه. اگه جوابت رو اینجا پیدا نکردی، از{" "}
              <InlineLink label="تماس با ما" route="contact" /> بپرس.
            </p>
          </div>

          {SHIPPING_SECTIONS.map((s) => (
            <div
              key={s.title}
              className="box-border flex flex-col gap-3 rounded-[28px] border border-[#DDEEF5] bg-white p-[26px_28px] transition-transform hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-[19px] border-2 border-[#04202E] font-black"
                  style={{ background: s.bg }}
                >
                  {s.n}
                </span>
                <h2 className="m-0 text-[21px] font-black">{s.title}</h2>
              </div>
              <div className="text-[15px] font-medium leading-[2.05] text-[#1F3E4D]">{s.body}</div>
            </div>
          ))}

          <div className="rounded-[28px] border-[1.5px] border-[#F7C5D3] bg-[#FFE9F0] p-[22px_26px] text-[14.5px] font-semibold leading-[2]">
            هزینه‌ی ارسال تهران {faPrice(49_000)} و شهرستان‌ها {faPrice(69_000)} ه‌ست و همین موقع ثبت
            آدرس حساب می‌شه. بازگشت یا تعویض هم تا ۷ روز بعد از تحویل آزاده.
          </div>
        </div>

        <InfoFooterDesktop />
      </InfoDesktop>
    </>
  );
}
