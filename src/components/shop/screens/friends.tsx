"use client";

// ── «دوستای پشمالو» — the product catalog screen (#/friends) ──
// Owner request: a dedicated products page (6 today, grows with the catalog —
// the list is driven by the SERVER catalog, not a hardcoded array) plus a rich
// graphical «پروسه‌ی کار ما» section: 4-step illustrated journey with a dashed
// rail, numbered nodes, QR-card visual and floating plush stickers.
import { useEffect, useMemo } from "react";
import { Plush } from "../plush";
import {
  ForwardIcon,
  GiftBoxIcon,
  HeartIcon,
  HeartSticker,
  MailIcon,
  PawIcon,
  PawSticker,
  QrCode,
} from "../icons";
import { navigate } from "@/lib/hash-route";
import { usePishnam, type CatalogEntry } from "@/lib/pishnam-store";
import { BOX_PRICE, PLUSHES, PLUSH_MAP, HOME_TRUST, type PlushKind } from "@/lib/pishnam-data";
import { fa, money } from "@/lib/fa";
import { useDocumentMeta } from "@/lib/seo/metadata";

/* ── process content: «هدیه‌ات چطور ساخته و ارسال می‌شه؟» ── */
const PROCESS_STEPS = [
  {
    n: "۱",
    title: "دوست پشمالو رو انتخاب می‌کنی",
    body: "از بین دوستامون یکی رو برمی‌داری؛ همه یه قیمت دارن، پس قیمت وسط تصمیم نیست — فقط به دلت گوش بده.",
    bg: "#CDEFFB",
    accent: "#00ABE7",
    icon: "paw" as const,
  },
  {
    n: "۲",
    title: "پیامت رو می‌نویسی",
    body: "نامه‌ت، عکس یا ویدیوت و یه رمز مخصوص خودت؛ همه‌ش می‌شه یه کارت پستال QR رمزدار که فقط خود گیرنده بازش می‌کنه.",
    bg: "#FFE0EA",
    accent: "#F0426B",
    icon: "mail" as const,
  },
  {
    n: "۳",
    title: "ما با دست بسته‌بندیش می‌کنیم",
    body: "عروسک، قلب و پنجه‌ها و کارتت با دقت تو جعبه‌ی کادویی چیده می‌شن؛ سفارش‌ها حداکثر ۲ روز کاری بعد از پرداخت راهی می‌شن.",
    bg: "#FFF3C9",
    accent: "#D9A400",
    icon: "box" as const,
  },
  {
    n: "۴",
    title: "جعبه دم در گیرنده‌ست",
    body: "مستقیم به آدرس دوستت ارسال می‌شه؛ اگه ناشناس بخوای هیچ اثری از اسمت نیست — فقط یه بغل که رسیده.",
    bg: "#DDF3EA",
    accent: "#00A876",
    icon: "heart" as const,
  },
];

type Item = {
  slug: string;
  name: string;
  chips: string[];
  blurb: string;
  bg: string;
  price: number;
  inStock: boolean;
  kind: PlushKind | null;
};

/** Server catalog is the source of truth; art/names come from the local defs.
 * Unknown future slugs still render (generic card) — nothing hardcodes «۶». */
function useCatalogList(): Item[] {
  const catalog = usePishnam((s) => s.catalog);
  const catalogLoaded = usePishnam((s) => s.catalogLoaded);
  const loadCatalog = usePishnam((s) => s.loadCatalog);

  useEffect(() => {
    if (!catalogLoaded) void loadCatalog();
  }, [catalogLoaded, loadCatalog]);

  return useMemo(() => {
    const entries: CatalogEntry[] = Object.values(catalog);
    const source: Item[] =
      entries.length > 0
        ? entries.map((e) => {
            const def = PLUSH_MAP[e.slug as PlushKind];
            return {
              slug: e.slug,
              name: def?.name ?? e.name,
              chips: def?.chips ?? ["پشمالو", "مهربون", "بغلی"],
              blurb: def?.blurb ?? "یه دوست پشمالوی تازه که به‌زودی اینجا معرفیش می‌کنیم.",
              bg: def?.bg ?? "#E7E0FA",
              price: e.priceToman,
              inStock: e.inStock,
              kind: def ? e.slug as PlushKind : null,
            };
          })
        : PLUSHES.map((p) => ({
            slug: p.kind,
            name: p.name,
            chips: p.chips,
            blurb: p.blurb,
            bg: p.bg,
            price: BOX_PRICE,
            inStock: true,
            kind: p.kind,
          }));
    return source;
  }, [catalog]);
}

function StepArt({ icon, accent }: { icon: "paw" | "mail" | "box" | "heart"; accent: string }) {
  if (icon === "paw") return <PawIcon size={30} fill={accent} stroke="#04202E" />;
  if (icon === "mail") return <MailIcon size={30} />;
  if (icon === "box") return <GiftBoxIcon size={30} />;
  return <HeartIcon size={30} />;
}

/* ═══════════════ shared pieces ═══════════════ */

function PriceTag({ price }: { price: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[13px] font-black text-[#04202E] shadow-[0_2px_8px_rgba(4,32,46,0.08)]">
      {money(price)}
      <span className="text-[11px] font-bold text-[#4A6572]">تومان</span>
    </span>
  );
}

function StockChip({ inStock }: { inStock: boolean }) {
  return inStock ? (
    <span className="rounded-full bg-[#DDF3EA] px-2.5 py-1 text-[11px] font-extrabold text-[#00805C]">موجوده ✓</span>
  ) : (
    <span className="rounded-full bg-[#FFE9F0] px-2.5 py-1 text-[11px] font-extrabold text-[#B02A52]">فعلاً تموم شده</span>
  );
}

function TrustRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap justify-center gap-2.5 ${className}`}>
      {HOME_TRUST.map((t) => (
        <span
          key={t.title}
          className="inline-flex items-center gap-2 rounded-full border border-[#D3E8F0] bg-white px-3.5 py-2 text-[12px] font-extrabold text-[#04202E]"
        >
          <span className="text-[#00ABE7]" aria-hidden="true">{t.icon}</span>
          {t.title}
        </span>
      ))}
    </div>
  );
}

function CtaBand() {
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-[#04202E] px-6 py-9 text-center">
      <span className="absolute -left-3 -top-3 rotate-12" aria-hidden="true"><HeartSticker size={44} fill="#F0426B" /></span>
      <span className="absolute -bottom-4 -right-2 -rotate-12" aria-hidden="true"><PawSticker size={46} /></span>
      <p className="m-0 text-[17px] font-black text-white">آماده‌ای یه بغل تازه در راه باشه؟</p>
      <p className="m-0 pb-4 pt-1.5 text-[12.5px] font-medium leading-[1.9] text-[#9FC4D4]">
        دوستت رو انتخاب کن، پیامت رو بنویس — بقیه‌ش با ما.
      </p>
      <button
        type="button"
        onClick={() => navigate("pick")}
        className="inline-flex h-[52px] items-center gap-2 rounded-full bg-[#00ABE7] px-8 text-[15.5px] font-extrabold text-[#04202E] transition-transform hover:scale-[1.03] active:scale-95"
      >
        انتخاب دوست پشمالو
        <HeartSticker size={18} fill="#04202E" stroke="none" />
      </button>
    </div>
  );
}

/* ═══════════════ MOBILE ═══════════════ */

export function FriendsMobile() {
  const list = useCatalogList();
  return (
    <div className="flex min-h-screen flex-col bg-[#F2FAFD] pb-8 md:hidden">
      {/* hero */}
      <header className="relative overflow-hidden px-5 pb-6 pt-5">
        <span className="absolute -left-5 top-2 rotate-12 opacity-90" aria-hidden="true"><HeartSticker size={40} /></span>
        <span className="absolute left-16 top-24 -rotate-6 opacity-80" aria-hidden="true"><PawSticker size={34} /></span>
        <h1 className="m-0 text-[30px] font-black leading-[1.4]">دوستای پشمالو</h1>
        <p className="m-0 pt-1.5 text-[13.5px] font-medium leading-[2] text-[#4A6572]">
          {fa(list.length || 6)} تا رفیق پشمالو، هرکدوم یه جور بغل می‌کنن. همه‌شون با یه جعبه‌ی کادویی، کارت پستال QR رمزدار و پیام صوتی به دست دوستت می‌رسن.
        </p>
        <div className="pointer-events-none flex items-end justify-center gap-1 pt-4" aria-hidden="true">
          {PLUSHES.map((p, i) => (
            <div key={p.kind} className={i % 2 ? "translate-y-2" : ""}>
              <Plush kind={p.kind} size={52} />
            </div>
          ))}
        </div>
      </header>

      {/* product cards */}
      <section aria-label="لیست دوستای پشمالو" className="flex flex-col gap-4 px-5 pt-2">
        {list.map((p, i) => (
          <article
            key={p.slug}
            className="relative overflow-hidden rounded-[26px] border border-[#DDEEF5] bg-white p-4"
          >
            <div
              className="flex items-center gap-3 rounded-[20px] p-4"
              style={{ background: p.bg }}
            >
              <div className="pishnam-float shrink-0">
                {p.kind ? (
                  <Plush kind={p.kind} size={92} />
                ) : (
                  <span className="flex h-[92px] w-[92px] items-center justify-center text-[44px]" aria-hidden="true">🧸</span>
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="m-0 truncate text-[17px] font-black">{p.name}</h2>
                  <span className="shrink-0 text-[11px] font-black text-[#5B7482]">{fa(i + 1)}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {p.chips.map((c) => (
                    <span key={c} className="rounded-full bg-white/85 px-2 py-0.5 text-[10.5px] font-bold text-[#1F3E4D]">{c}</span>
                  ))}
                </div>
              </div>
            </div>
            <p className="m-0 pb-3 pt-3 text-[12.5px] font-medium leading-[2] text-[#1F3E4D]">{p.blurb}</p>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <PriceTag price={p.price} />
              <StockChip inStock={p.inStock} />
            </div>
            <div className="flex gap-2 pt-3">
              <button
                type="button"
                onClick={() => navigate("product", { slug: p.slug })}
                className="flex h-11 flex-1 items-center justify-center gap-1 rounded-full border-2 border-[#04202E] bg-white text-[13px] font-extrabold text-[#04202E] transition-transform active:scale-95"
              >
                بیشتر بشناسش
                <ForwardIcon size={15} />
              </button>
              <button
                type="button"
                disabled={!p.inStock}
                onClick={() => navigate("pick", { kind: p.slug })}
                className="flex h-11 flex-1 items-center justify-center rounded-full bg-[#00ABE7] text-[13px] font-extrabold text-[#04202E] transition-transform active:scale-95 disabled:opacity-50"
              >
                ساخت هدیه
              </button>
            </div>
          </article>
        ))}
      </section>

      <ProcessSection desktop={false} className="px-5 pt-10" />
      <TrustRow className="px-5 pt-7" />
      <div className="px-5 pt-7">
        <CtaBand />
      </div>
    </div>
  );
}

/* ═══════════════ the process section (mobile rail / desktop zigzag) ═══════════════ */

function ProcessSection({ desktop, className = "" }: { desktop: boolean; className?: string }) {
  return (
    <section aria-label="پروسه‌ی کار ما" className={className}>
      <div className="relative">
        <h2 className={`m-0 text-center font-black text-[#04202E] ${desktop ? "text-[26px]" : "text-[21px]"}`}>
          هدیه‌ات چطور ساخته و ارسال می‌شه؟
        </h2>
        <p className={`m-0 text-center font-medium leading-[2] text-[#4A6572] ${desktop ? "pb-10 pt-2" : "pb-6 pt-1.5 text-[12.5px]"}`}>
          چهار قدم ساده از کلیک تا بغل
        </p>

        <div className="relative">
          {/* dashed rail — vertical on mobile, center line on desktop */}
          <div
            aria-hidden="true"
            className={
              desktop
                ? "absolute bottom-6 left-1/2 top-6 -translate-x-1/2 border-r-2 border-dashed border-[#9ECFDF]"
                : "absolute bottom-6 right-[27px] top-6 border-r-2 border-dashed border-[#9ECFDF]"
            }
          />
          <div className={`flex flex-col ${desktop ? "gap-12" : "gap-7"}`}>
            {PROCESS_STEPS.map((s, i) => {
              const card = (
                <div
                  className={`relative rounded-[24px] border border-[#DDEEF5] bg-white ${desktop ? "max-w-[470px] p-6" : "p-4"}`}
                >
                  <span
                    className="absolute top-4 rounded-full px-2.5 py-1 text-[10.5px] font-black"
                    style={{ background: s.bg, color: "#04202E" }}
                  >
                    قدم {s.n}
                  </span>
                  <div className={`flex items-start gap-3 ${desktop ? "pt-9" : "pt-8"}`}>
                    <div className={desktop ? "flex-1" : "min-w-0 flex-1"}>
                      <h3 className={`m-0 font-black text-[#04202E] ${desktop ? "pb-1.5 text-[17px]" : "pb-1 text-[15px]"}`}>{s.title}</h3>
                      <p className={`m-0 font-medium leading-[2] text-[#1F3E4D] ${desktop ? "text-[13.5px]" : "text-[12px]"}`}>{s.body}</p>
                    </div>
                    {s.icon === "mail" && (
                      <span className="shrink-0 rounded-xl bg-[#F8FDFF] p-1.5" aria-hidden="true">
                        <QrCode size={desktop ? 58 : 44} />
                      </span>
                    )}
                  </div>
                  {desktop && (
                    <span
                      className="pointer-events-none absolute -bottom-3 left-6 h-6 w-24 rounded-full opacity-25 blur-md"
                      style={{ background: s.accent }}
                      aria-hidden="true"
                    />
                  )}
                </div>
              );

              return (
                <div
                  key={s.n}
                  className={`relative flex items-start gap-3.5 ${desktop ? (i % 2 ? "flex-row-reverse" : "") : ""}`}
                >
                  {/* numbered node on the rail */}
                  <span
                    className={`relative z-10 flex shrink-0 items-center justify-center rounded-full border-4 border-white font-black text-white shadow-[0_4px_12px_rgba(4,32,46,0.18)] ${desktop ? "h-[52px] w-[52px] text-[19px]" : "h-[42px] w-[42px] text-[16px]"}`}
                    style={{ background: s.accent }}
                    aria-hidden="true"
                  >
                    {s.n}
                  </span>
                  <div className={desktop ? (i % 2 ? "me-auto" : "ms-auto") : "min-w-0 flex-1"}>{card}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ DESKTOP ═══════════════ */

export function FriendsDesktop() {
  const list = useCatalogList();
  return (
    <div className="hidden min-h-screen flex-col bg-[#F2FAFD] md:flex">
      {/* hero */}
      <section className="relative mx-auto w-full max-w-[1200px] overflow-hidden px-6 pb-4 pt-12">
        <span className="absolute left-10 top-10 rotate-12" aria-hidden="true"><HeartSticker size={52} /></span>
        <span className="absolute right-[42%] top-6 -rotate-6" aria-hidden="true"><PawSticker size={44} /></span>
        <div className="mx-auto max-w-[640px] text-center">
          <h1 className="m-0 text-[38px] font-black leading-[1.5] text-[#04202E]">دوستای پشمالو</h1>
          <p className="m-0 pt-3 text-[15px] font-medium leading-[2.1] text-[#4A6572]">
            {fa(list.length || 6)} تا رفیق پشمالو که هرکدوم یه جور بغل می‌کنن. انتخاب با دلت — قیمت همه‌شون یکیه:
            {" "}<b className="text-[#04202E]">{money(BOX_PRICE)} تومان</b> با جعبه‌ی کادویی، کارت پستال QR رمزدار و پیام صوتی.
          </p>
        </div>
        <div className="pointer-events-none flex items-end justify-center gap-4 pt-6" aria-hidden="true">
          {PLUSHES.map((p, i) => (
            <div key={p.kind} className={i % 2 ? "translate-y-3" : "pishnam-float"}>
              <Plush kind={p.kind} size={78} />
            </div>
          ))}
        </div>
      </section>

      {/* product grid */}
      <section aria-label="لیست دوستای پشمالو" className="mx-auto flex w-full max-w-[1200px] flex-wrap justify-center gap-6 px-6 pb-2 pt-8">
        {list.map((p) => (
          <article
            key={p.slug}
            className="group flex w-[368px] flex-col overflow-hidden rounded-[28px] border border-[#DDEEF5] bg-white p-4 transition-all hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(4,32,46,0.10)]"
          >
            <div className="relative flex items-center justify-center rounded-[22px] p-5" style={{ background: p.bg }}>
              {p.kind ? (
                <Plush kind={p.kind} size={150} className="transition-transform duration-300 group-hover:scale-105" />
              ) : (
                <span className="flex h-[150px] w-[150px] items-center justify-center text-[64px]" aria-hidden="true">🧸</span>
              )}
              <span className="absolute start-3 top-3"><StockChip inStock={p.inStock} /></span>
            </div>
            <h2 className="m-0 pb-1 pt-4 text-[19px] font-black text-[#04202E]">{p.name}</h2>
            <div className="flex flex-wrap gap-1.5 pb-2">
              {p.chips.map((c) => (
                <span key={c} className="rounded-full bg-[#F2FAFD] px-2.5 py-1 text-[11px] font-bold text-[#1F3E4D]">{c}</span>
              ))}
            </div>
            <p className="m-0 min-h-[56px] text-[13px] font-medium leading-[2] text-[#1F3E4D]">{p.blurb}</p>
            <div className="flex items-center justify-between pb-3 pt-2">
              <PriceTag price={p.price} />
              <span className="text-[11.5px] font-bold text-[#4A6572]">ارسال مستقیم دم در</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => navigate("product", { slug: p.slug })}
                className="flex h-12 flex-1 items-center justify-center gap-1.5 rounded-full border-2 border-[#04202E] bg-white text-[13.5px] font-extrabold text-[#04202E] transition-colors hover:bg-[#F2FAFD]"
              >
                بیشتر بشناسش
                <ForwardIcon size={15} />
              </button>
              <button
                type="button"
                disabled={!p.inStock}
                onClick={() => navigate("pick", { kind: p.slug })}
                className="flex h-12 flex-1 items-center justify-center rounded-full bg-[#00ABE7] text-[13.5px] font-extrabold text-[#04202E] transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              >
                ساخت هدیه
              </button>
            </div>
          </article>
        ))}
      </section>

      <ProcessSection desktop className="mx-auto w-full max-w-[1100px] px-6 pb-2 pt-16" />
      <TrustRow className="px-6 pt-12" />
      <div className="mx-auto w-full max-w-[760px] px-6 pb-14 pt-12">
        <CtaBand />
      </div>
    </div>
  );
}

/* ═══════════════ screen ═══════════════ */

export function FriendsScreen() {
  useDocumentMeta({
    title: "دوستای پشمالو",
    description: "معرفی عروسک‌های پولیشی یک دوست: خرس، خرگوش، گربه، پاندا، گوسفند و اردک — همه با یه قیمت و جعبه‌ی هدیه‌ی آماده برای ارسال.",
  });
  return (
    <>
      <FriendsMobile />
      <FriendsDesktop />
    </>
  );
}
