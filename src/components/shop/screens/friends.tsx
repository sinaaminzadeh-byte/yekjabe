"use client";

// ── «دوستای پشمالو» — the product catalog screen (#/friends) ──
// Owner request (24-A): plush DOLLS first, then a SEPARATE «افزودنی‌ها» section
// below them (mobile + desktop) — add-to-cart straight from here is fine because
// checkout reads addonLines from the builder store; details open in the same
// iPhone-style bottom Sheet the builder's extras step uses.
// The list is driven by the SERVER catalog, not a hardcoded array.
import { useEffect, useMemo, useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

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
    body: "نامه‌ت، عکس یا ویدیوت؛ همه‌ش می‌شه یه کارت پستال QR که فقط خود گیرنده با تأیید شماره‌ش بازش می‌کنه.",
    bg: "#FFE0EA",
    accent: "#F0426B",
    icon: "mail" as const,
  },
  {
    n: "۳",
    title: "ما با دست بسته‌بندیش می‌کنیم",
    body: "عروسک، قلب و پنجه‌ها و کارتت با دقت تو جعبه آبی چیده می‌شن؛ سفارش‌ها حداکثر ۲ روز کاری بعد از پرداخت راهی می‌شن.",
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
 * Split per owner request: plush DOLLS (kind !== "addon", PLUSHES fallback) and
 * ADDONS (store's catalogAddons selector) as two separate lists — nothing
 * hardcodes «۶», unknown future slugs still render (generic card). */
function useCatalogSplit(): { plush: Item[]; addons: CatalogEntry[] } {
  const catalog = usePishnam((s) => s.catalog);
  const catalogAddons = usePishnam((s) => s.catalogAddons);
  const catalogLoaded = usePishnam((s) => s.catalogLoaded);
  const loadCatalog = usePishnam((s) => s.loadCatalog);

  useEffect(() => {
    if (!catalogLoaded) void loadCatalog();
  }, [catalogLoaded, loadCatalog]);

  const plush = useMemo<Item[]>(() => {
    const entries: CatalogEntry[] = Object.values(catalog);
    const main = entries.filter((e) => e.kind !== "addon");
    if (main.length === 0) {
      return PLUSHES.map((p) => ({
        slug: p.kind,
        name: p.name,
        chips: p.chips,
        blurb: p.blurb,
        bg: p.bg,
        price: BOX_PRICE,
        inStock: true,
        kind: p.kind,
      }));
    }
    return main.map((e) => {
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
    });
  }, [catalog]);

  return { plush, addons: catalogAddons };
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

/* ═══════════════ «افزودنی‌ها» — shared addon card + details Sheet ═══════════════ */

/** One shared card for mobile & desktop (`desktop` prop). Adding straight from
 * the friends page is fine: checkout reads addonLines from the builder store.
 * Owner round 26 (UX pass): whole info area is ONE tap target → details sheet,
 * name/price typography hierarchy fixed (font-black + «تومان» unit), in-cart
 * state is a real qty stepper (– n +) instead of a dead chip, ≥44px targets. */
function AddonCard({ a, desktop = false }: { a: CatalogEntry; desktop?: boolean }) {
  const { toast } = useToast();
  const addonLines = usePishnam((s) => s.addonLines);
  const addAddon = usePishnam((s) => s.addAddon);
  const setAddonQty = usePishnam((s) => s.setAddonQty);
  const [open, setOpen] = useState(false);
  const qty = addonLines.find((l) => l.variantId === a.variantId)?.qty ?? 0;
  const out = !a.inStock;

  const add = () => {
    addAddon(a.variantId);
    toast({ title: "به سبد اضافه شد ✓", description: a.name });
  };
  const bump = (n: number) => setAddonQty(a.variantId, Math.max(0, Math.min(10, n)));

  const tile = (h: string, emojiSize: string, rounded = "rounded-[18px]") => (
    <div
      className={`flex ${h} shrink-0 items-center justify-center overflow-hidden ${rounded} bg-[#F2FAFD]`}
    >
      {a.image ? (
        <img src={a.image} alt={a.name} className="h-full w-full object-cover" />
      ) : (
        <span className={emojiSize} aria-hidden="true">{a.emoji || "🎁"}</span>
      )}
    </div>
  );

  /** قیمت — عدد درشتِ ضخیم + واحد «تومان» کوچک‌تر و کم‌رنگ‌تر (سلسله‌مراتب) */
  const priceNode = ({ big = false, amount }: { big?: boolean; amount?: number } = {}) =>
    out ? (
      <span className={`font-black text-[#4A6572] ${big ? "text-[16px]" : "text-[13.5px]"} opacity-70`}>فعلاً ناموجوده</span>
    ) : (
      <span className="flex items-baseline gap-1" aria-label={`${money(amount ?? a.priceToman)} تومان`}>
        <span className={`font-black text-[#04202E] ${big ? "text-[18px]" : "text-[15.5px]"}`}>{money(amount ?? a.priceToman)}</span>
        <span className={`font-bold text-[#4A6572] ${big ? "text-[11.5px]" : "text-[10.5px]"}`}>تومان</span>
      </span>
    );

  /** استپر تعداد — − n ＋ (هم موبایل هم دسکتاپ؛ حداکثر ۱۰) */
  const stepperNode = ({ wide = false }: { wide?: boolean } = {}) => (
    <div
      role="group"
      aria-label={`تعداد ${a.name} در سبد`}
      className={wide ? "flex h-12 items-center justify-between rounded-full border-[1.5px] border-[#9FD9F0] bg-[#F2FAFD] ps-2 pe-2" : "flex items-center gap-1"}
    >
      <button
        type="button"
        aria-label="یکی کم کن"
        onClick={() => bump(qty - 1)}
        className={`flex shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#CFE6EF] bg-white text-[20px] font-black leading-none text-[#04202E] transition-transform active:scale-90 ${wide ? "h-9 w-9" : "h-11 w-11"}`}
      >
        −
      </button>
      <span aria-live="polite" className={`min-w-7 text-center font-black text-[#04202E] ${wide ? "text-[15px]" : "text-[14.5px]"}`}>
        {fa(qty)}
      </span>
      <button
        type="button"
        aria-label="یکی اضافه کن"
        onClick={() => bump(qty + 1)}
        disabled={qty >= 10}
        className={`flex shrink-0 items-center justify-center rounded-full bg-[#00ABE7] text-[20px] font-black leading-none text-white transition-transform active:scale-90 disabled:opacity-50 ${wide ? "h-9 w-9" : "h-11 w-11"}`}
      >
        +
      </button>
    </div>
  );

  /* iPhone-style bottom sheet — same pattern as the builder's extras step */
  const sheet = (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="bottom" className="rounded-t-[30px] border-[#DDEEF5] bg-white px-0 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2">
        <div className="flex flex-col gap-4 px-6 pt-2 text-right">
          <span className="mx-auto h-1.5 w-12 rounded-full bg-[#DDEEF5]" aria-hidden="true" />
          <div className="flex h-[190px] items-center justify-center overflow-hidden rounded-[24px] bg-[#F2FAFD]">
            {a.image ? (
              <img src={a.image} alt={a.name} className="h-full w-full object-cover" />
            ) : (
              <span className="text-6xl" aria-hidden="true">{a.emoji || "🎁"}</span>
            )}
          </div>
          <SheetHeader className="gap-1 space-y-0 p-0 text-right">
            <SheetTitle className="text-right text-[20px] font-black text-[#04202E]">{a.name}</SheetTitle>
            <SheetDescription className="text-right text-[14px] font-extrabold text-[#006387]">
              {out ? "فعلاً ناموجوده" : `${money(a.priceToman)} تومان`}
            </SheetDescription>
          </SheetHeader>
          <p className="m-0 text-[13.5px] font-medium leading-[2] text-[#1F3E4D]">
            {a.description || "برای این افزودنی هنوز توضیحی ثبت نشده — سوالی داری قبل از خرید بهمون پیام بده."}
          </p>
          {!out &&
            (qty === 0 ? (
              <button
                type="button"
                onClick={() => {
                  add();
                  setOpen(false);
                }}
                className="h-[52px] w-full rounded-full bg-[#00ABE7] text-[15px] font-extrabold text-[#04202E] transition-transform active:scale-[0.98]"
              >
                + بذارش کنار هدیه تو جعبه
              </button>
            ) : (
              <div className="flex flex-col gap-2.5 rounded-[20px] bg-[#E3F6FD] px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-extrabold text-[#006387]">✓ کنار هدیه‌ته</span>
                  {stepperNode()}
                </div>
                <div className="flex items-center justify-between border-t border-[#C9E9F6] pt-2.5">
                  <span className="text-[12px] font-bold text-[#4A6572]">جمع این افزودنی</span>
                  {priceNode({ big: true, amount: a.priceToman * qty })}
                </div>
              </div>
            ))}
        </div>
      </SheetContent>
    </Sheet>
  );

  if (desktop) {
    return (
      <>
        <article
          className="group flex w-[368px] flex-col overflow-hidden rounded-[28px] border bg-white p-4 transition-all hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(4,32,46,0.10)]"
          style={{ borderColor: qty > 0 ? "#9FD9F0" : "#DDEEF5", opacity: out ? 0.62 : 1 }}
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`جزئیات و عکس ${a.name}`}
            className="relative m-0 flex h-[150px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-[22px] bg-[#F2FAFD] p-0"
          >
            {a.image ? (
              <img
                src={a.image}
                alt={a.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <span className="text-6xl" aria-hidden="true">{a.emoji || "🎁"}</span>
            )}
            {out ? (
              <span className="absolute start-3 top-3 rounded-full bg-[#FFE9F0] px-2.5 py-1 text-[11px] font-extrabold text-[#B02A52]">فعلاً تموم شده</span>
            ) : qty > 0 ? (
              <span className="absolute start-3 top-3 rounded-full bg-[#00ABE7] px-2.5 py-1 text-[11px] font-extrabold text-[#04202E]">✓ {fa(qty)} عدد تو سبد</span>
            ) : null}
          </button>
          <h3 className="m-0 pb-1 pt-4 text-[18px] font-black leading-[1.7] text-[#04202E]">{a.name}</h3>
          <p className="m-0 line-clamp-2 min-h-[52px] text-[13px] font-medium leading-[2] text-[#1F3E4D]">
            {a.description || "برای این افزودنی هنوز توضیحی ثبت نشده — سوالی داری قبل از خرید بهمون پیام بده."}
          </p>
          <div className="flex items-center justify-between pb-3 pt-2.5">
            {priceNode({ big: true })}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex h-9 items-center gap-1 rounded-full border border-[#CFE6EF] bg-[#F8FDFF] px-3.5 text-[11.5px] font-extrabold text-[#0087B8] transition-colors hover:border-[#9FD9F0]"
            >
              جزئیات و عکس
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
          </div>
          {out ? (
            <span className="flex h-12 items-center justify-center rounded-full bg-[#F2FAFD] text-[13px] font-extrabold text-[#4A6572]">فعلاً ناموجوده</span>
          ) : qty > 0 ? (
            stepperNode({ wide: true })
          ) : (
            <button
              type="button"
              onClick={add}
              className="flex h-12 items-center justify-center rounded-full bg-[#00ABE7] text-[14px] font-extrabold text-[#04202E] transition-transform hover:scale-[1.02] active:scale-95"
            >
              + بذارش کنار هدیه
            </button>
          )}
        </article>
        {sheet}
      </>
    );
  }

  return (
    <>
      <article
        className="flex items-center gap-3 rounded-[24px] border-[1.5px] bg-white p-3"
        style={{ borderColor: qty > 0 ? "#9FD9F0" : "#DDEEF5", opacity: out ? 0.6 : 1 }}
      >
        {/* کل ناحیه‌ی اطلاعات = یک هدف لمسی بزرگ (≥۴۴px) → شیت جزئیات */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`جزئیات و عکس ${a.name}`}
          className="flex min-w-0 flex-1 items-center gap-3 text-right"
        >
          {tile("h-[72px] w-[72px]", "text-[28px]")}
          <span className="flex min-w-0 flex-1 flex-col items-start gap-1">
            <span className="w-full truncate text-[15px] font-black leading-[1.7] text-[#04202E]">{a.name}</span>
            {priceNode()}
            <span className="flex items-center gap-0.5 text-[11px] font-extrabold text-[#0087B8]">
              جزئیات و عکس
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </span>
          </span>
        </button>
        {out ? (
          <span className="shrink-0 rounded-full bg-[#F2FAFD] px-3 py-2 text-[11px] font-extrabold text-[#4A6572]">ناموجوده</span>
        ) : qty > 0 ? (
          stepperNode()
        ) : (
          <button
            type="button"
            onClick={add}
            aria-label={`افزودن ${a.name} کنار هدیه`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#00ABE7] text-[22px] font-black leading-none text-white transition-transform active:scale-90"
          >
            +
          </button>
        )}
      </article>
      {sheet}
    </>
  );
}

/* ═══════════════ MOBILE ═══════════════ */

export function FriendsMobile() {
  const { plush, addons } = useCatalogSplit();
  return (
    <div className="flex min-h-screen flex-col bg-[#F2FAFD] pb-8 md:hidden">
      {/* hero */}
      <header className="relative overflow-hidden px-5 pb-6 pt-5">
        <span className="absolute -left-5 top-2 rotate-12 opacity-90" aria-hidden="true"><HeartSticker size={40} /></span>
        <span className="absolute left-16 top-24 -rotate-6 opacity-80" aria-hidden="true"><PawSticker size={34} /></span>
        <h1 className="m-0 text-[30px] font-black leading-[1.4]">دوستای پشمالو</h1>
        <p className="m-0 pt-1.5 text-[13.5px] font-medium leading-[2] text-[#4A6572]">
          {fa(plush.length || 6)} تا رفیق پشمالو، هرکدوم یه جور بغل می‌کنن؛ با جعبه آبی، کارت پستال QR و پیام صوتی می‌رسن. یه کم پایین‌تر بخش افزودنی‌ها هم منتظره — اگه دلت خواست یه سورپرایز کوچیک هم کنار بغل بذار.
        </p>
        <div className="pointer-events-none flex items-end justify-center gap-1 pt-4" aria-hidden="true">
          {PLUSHES.map((p, i) => (
            <div key={p.kind} className={i % 2 ? "translate-y-2" : ""}>
              <Plush kind={p.kind} size={52} />
            </div>
          ))}
        </div>
      </header>

      {/* product cards — عروسک‌ها اول (owner request 24-A) */}
      <section aria-label="لیست دوستای پشمالو" className="flex flex-col gap-4 px-5 pt-2">
        {plush.map((p, i) => (
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

      {/* «افزودنی‌ها» — سکشن جدا زیر عروسک‌ها (owner request 24-A):
          اضافه‌کردن از اینجا مجازه، چکاوت addonLines رو مستقیم از استور می‌خونه */}
      {addons.length > 0 && (
        <section aria-label="افزودنی‌ها" className="px-5 pt-10">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="m-0 text-lg font-black">افزودنی‌ها</h2>
            <span className="text-[12px] font-bold text-[#4A6572]">یه سورپرایز کوچیک کنار بغل بزرگ</span>
          </div>
          <p className="m-0 pt-1.5 text-[12.5px] font-medium leading-[1.9] text-[#4A6572]">
            اکسسوری‌های قشنگ که کنار عروسک، تو جعبه می‌ذاریم.
          </p>
          <div className="mt-3 flex flex-col gap-2">
            {addons.map((a) => (
              <AddonCard key={a.variantId} a={a} />
            ))}
          </div>
          <div className="mt-4 rounded-[22px] border border-dashed border-[#BFDDE8] bg-[#F8FDFF] px-4 py-3.5">
            <p className="m-0 text-[12px] font-medium leading-[1.9] text-[#4A6572]">
              سفارش هدیه‌ت رو کامل کن: بعد از انتخاب عروسک، افزودنی‌ها تو قدم «یه ذره مهربونی اضافه کن» کنار جعبه میان.
            </p>
            <button
              type="button"
              onClick={() => navigate("pick")}
              className="mt-2.5 flex h-10 items-center gap-1.5 rounded-full border-2 border-[#04202E] bg-white px-5 text-[12.5px] font-extrabold text-[#04202E] transition-transform active:scale-95"
            >
              ساخت هدیه
              <ForwardIcon size={14} />
            </button>
          </div>
        </section>
      )}

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
  const { plush, addons } = useCatalogSplit();
  return (
    <div className="hidden min-h-screen flex-col bg-[#F2FAFD] md:flex">
      {/* hero */}
      <section className="relative mx-auto w-full max-w-[1200px] overflow-hidden px-6 pb-4 pt-12">
        <span className="absolute left-10 top-10 rotate-12" aria-hidden="true"><HeartSticker size={52} /></span>
        <span className="absolute right-[42%] top-6 -rotate-6" aria-hidden="true"><PawSticker size={44} /></span>
        <div className="mx-auto max-w-[640px] text-center">
          <h1 className="m-0 text-[38px] font-black leading-[1.5] text-[#04202E]">دوستای پشمالو</h1>
          <p className="m-0 pt-3 text-[15px] font-medium leading-[2.1] text-[#4A6572]">
            {fa(plush.length || 6)} تا رفیق پشمالو که هرکدوم یه جور بغل می‌کنن. انتخاب با دلت — قیمت همه‌شون یکیه:
            {" "}<b className="text-[#04202E]">{money(BOX_PRICE)} تومان</b> با جعبه آبی، کارت پستال QR و پیام صوتی. پایین‌تر هم بخش افزودنی‌هاست؛ اکسسوری‌های قشنگی که کنار عروسک، تو جعبه می‌ذاریم.
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

      {/* product grid — عروسک‌ها اول (owner request 24-A) */}
      <section aria-label="لیست دوستای پشمالو" className="mx-auto flex w-full max-w-[1200px] flex-wrap justify-center gap-6 px-6 pb-2 pt-8">
        {plush.map((p) => (
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

      {/* «افزودنی‌ها» — سکشن جدا زیر گرید عروسک‌ها (owner request 24-A) */}
      {addons.length > 0 && (
        <section aria-label="افزودنی‌ها" className="mx-auto w-full max-w-[1200px] px-6 pt-14">
          <div className="mx-auto max-w-[640px] text-center">
            <h2 className="m-0 text-[26px] font-black text-[#04202E]">افزودنی‌ها</h2>
            <p className="m-0 pt-2 text-[14px] font-medium leading-[2] text-[#4A6572]">
              اکسسوری‌های قشنگ که کنار عروسک، تو جعبه می‌ذاریم — یه سورپرایز کوچیک کنار بغل بزرگ.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 pt-7">
            {addons.map((a) => (
              <AddonCard key={a.variantId} a={a} desktop />
            ))}
          </div>
          <div className="mx-auto mt-8 flex w-full max-w-[640px] flex-col items-center gap-3 rounded-[24px] border border-dashed border-[#BFDDE8] bg-[#F8FDFF] px-6 py-4 text-center">
            <p className="m-0 text-[12.5px] font-medium leading-[1.9] text-[#4A6572]">
              سفارش هدیه‌ت رو کامل کن: بعد از انتخاب عروسک، افزودنی‌ها تو قدم «یه ذره مهربونی اضافه کن» کنار جعبه میان.
            </p>
            <button
              type="button"
              onClick={() => navigate("pick")}
              className="flex h-11 items-center gap-1.5 rounded-full border-2 border-[#04202E] bg-white px-6 text-[13px] font-extrabold text-[#04202E] transition-colors hover:bg-[#F2FAFD]"
            >
              ساخت هدیه
              <ForwardIcon size={14} />
            </button>
          </div>
        </section>
      )}

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
    description: "معرفی دوستای پشمالوی جعبه آبی: خرس، خرگوش، گربه، پاندا، گوسفند و اردک — همه با یه قیمت و جعبه‌ی هدیه‌ی آماده برای ارسال.",
  });
  return (
    <>
      <FriendsMobile />
      <FriendsDesktop />
    </>
  );
}
