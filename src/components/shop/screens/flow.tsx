"use client";

// ── Mobile gift-builder flow — 3 steps (owner round 29) ──
// قدم ۱: انتخاب عروسک + کارت پستال (متن الزامی + استودیو ویس/عکس/ویدیو +
//        نمایش نام فرستنده + نگهداری پیام) → «ذخیره و ادامه»
// قدم ۲: افزودنی‌ها + قلب قرمز و پنجه (کادر جمع‌وجور) → «ذخیره و تکمیل»
// قدم ۳: گیرنده + سفارش‌دهنده (وریفای پیامکی) + پرداخت — با پیش‌نمایش پستی
//        جعبه در بالای سبد و نوار «نمایش امن فقط با وریفای شماره».
// رمز کارت حذف شد: خریدار رمزی وارد نمی‌کند؛ گیرنده با شماره موبایل خودش +
// کد پیامکی (otp_gift) پیام را باز می‌کند. مسیر card به قدم ۱ اشاره می‌کند.
import { Plush } from "../plush";
import { MobileTopBar, StepBar } from "../nav";
import {
  HeartSticker,
  PawIcon,
  ForwardIcon,
  CheckIcon,
  MinusIcon,
  PlusSmall,
} from "../icons";
import { MediaStudio } from "../media-studio";
import { BoxPreview } from "../box-preview";
import { navigate, useHashRoute } from "@/lib/hash-route";
import {
  usePishnam,
  useCharityDone,
  useOrdererVerified,
  type SenderDisplayMode,
  type RetentionPlanKey,
} from "@/lib/pishnam-store";
import { fa, money } from "@/lib/fa";
import {
  PLUSHES,
  BOX_PRICE,
  OCCASIONS,
  OCCASION_HOLDERS,
  CHARITY_TARGET,
  type PlushKind,
} from "@/lib/pishnam-data";
import { PROVINCES } from "@/lib/orders/provinces";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useGiftMessage } from "@/hooks/use-gift-message";
// A-03 (audit wave 4): shared OTP state machine + shared checkout logic —
// the mobile shell keeps its visuals; the LOGIC lives in one place now.
import { useOtp } from "@/hooks/use-otp";
import {
  evaluateCheckoutGate,
  isValidIranMobile,
  ordererPrefill,
  payNow,
} from "@/lib/shop/checkout-submit";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import type { CatalogEntry } from "@/lib/pishnam-store";
import { FavHeart, FavFilterChips, SurpriseButton } from "@/components/shop/fav";
import { MessageIdeas } from "@/components/shop/ideas";
import { AttrsBlock, Gallery, entryCover } from "../gallery";

/* tiny numbered chip for the in-step subsections (قدم ۱ = بخش ۱ و ۲ سبد قبلی) */
function SubNum({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#04202E] bg-[#00ABE7] text-[14px] font-black text-[#04202E]">
        {n}
      </span>
      <h2 className="m-0 text-[21px] font-black leading-[1.4]">{title}</h2>
    </div>
  );
}

/* ═══════════════ قدم ۱ — عروسک + کارت پستال ═══════════════ */
export function MobilePick() {
  const picked = usePishnam((s) => s.kind);
  const setKind = usePishnam((s) => s.setKind);
  const favorites = usePishnam((s) => s.favorites);
  const [favOnly, setFavOnly] = useState(false);
  const [stageKey, setStageKey] = useState(0);
  // deep-link preselect: /pick?kind=bear (product/friends pages CTA)
  const { query } = useHashRoute();
  const qKind = query.get("kind");
  useEffect(() => {
    if (qKind && PLUSHES.some((p) => p.kind === qKind) && picked !== qKind) {
      setKind(qKind as PlushKind);
    }
  }, [qKind, picked, setKind]);
  const sel = PLUSHES.find((p) => p.kind === picked) ?? PLUSHES[0];
  const list = favOnly ? PLUSHES.filter((p) => favorites.includes(p.kind)) : PLUSHES;

  // کارت پستال
  const occ = usePishnam((s) => s.occasion);
  const setOcc = usePishnam((s) => s.setOccasion);
  // P-09 (audit wave 38): keystrokes stay in a local draft; the store — and
  // with it the WHOLE localStorage record — is written at most once per 500ms
  // (+ immediate flush on blur). See src/hooks/use-gift-message.ts
  const { message, setMessage, onBlur: onMessageBlur } = useGiftMessage();
  const senderDisplay = usePishnam((s) => s.senderDisplay);
  const setSenderDisplay = usePishnam((s) => s.setSenderDisplay);
  const senderPhrase = usePishnam((s) => s.senderPhrase);
  const setSenderPhrase = usePishnam((s) => s.setSenderPhrase);
  const senderName = usePishnam((s) => s.senderName);
  const setSenderName = usePishnam((s) => s.setSenderName);
  const nextNo = usePishnam((s) => s.nextNo);
  const user = usePishnam((s) => s.user);
  const retention = usePishnam((s) => s.retention);
  const setRetention = usePishnam((s) => s.setRetention);
  const retentionPrices = usePishnam((s) => s.retentionPrices);

  const [msgTried, setMsgTried] = useState(false);
  const msgEmpty = message.trim() === "";

  const goNext = () => {
    setMsgTried(true);
    if (msgEmpty) {
      document.getElementById("msg")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    navigate("extras");
  };

  const PRIVACY_OPTIONS: { key: SenderDisplayMode; title: string; sub: string; emoji: string }[] = [
    { key: "name", title: "اسمم نمایش داده بشه", sub: senderName || user?.name || "اسم خودت", emoji: "🙂" },
    { key: "phrase", title: "یه عبارت دلخواه", sub: senderPhrase || "مثلاً: از طرف همسرت", emoji: "✍️" },
    { key: "anon", title: "کاملاً ناشناس", sub: "یه هدیه برای تو", emoji: "🎁" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#F2FAFD] md:hidden">
      <MobileTopBar title="قدم ۱ از ۳" back="home" />
      <StepBar step={1} total={3} />

      <div className="px-5 pb-1 pt-[22px]">
        <h1 className="m-0 text-[30px] font-black leading-[1.4]">هدیه‌ت رو بساز</h1>
        <p className="mb-0 mt-2 text-[15px] font-medium leading-[1.9] text-[#1F3E4D]">
          اول دوست پشمالو رو انتخاب کن، بعد کارت پستالت رو با متن، ویس، عکس یا ویدیو بساز.
          همه‌چیز همین‌جا تو مرورگرت ذخیره می‌شه.
        </p>
      </div>

      {/* ── بخش ۱: انتخاب عروسک ── */}
      <div className="px-5 pt-5">
        <SubNum n="۱" title="دوست پشمالوت رو انتخاب کن" />
      </div>

      <div className="mt-3 flex justify-center px-5">
        <div className="flex w-full flex-col items-center gap-2 rounded-[30px] border-[1.5px] border-[#00ABE7] bg-white p-5">
          <div
            className="relative flex h-[240px] w-full items-center justify-center rounded-3xl"
            style={{ background: sel.bg }}
          >
            <span key={stageKey} className={stageKey > 0 ? "pishnam-pop-in flex" : "flex"}>
              <Plush kind={sel.kind} size={210} className="pishnam-float" />
            </span>
            <FavHeart kind={sel.kind} name={sel.name} className="absolute end-3 top-3" />
          </div>
          <div className="text-[20px] font-black">{sel.name}</div>
          <div className="flex flex-wrap justify-center gap-1.5">
            {sel.chips.map((c) => (
              <span key={c} className="rounded-full bg-[#E3F6FD] px-3 py-1 text-xs font-bold text-[#006387]">
                {c}
              </span>
            ))}
          </div>
          <p className="m-0 text-center text-[13.5px] font-medium leading-[1.9] text-[#1F3E4D]">{sel.blurb}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 px-5">
        <FavFilterChips favOnly={favOnly} onToggle={setFavOnly} />
        <SurpriseButton onPick={() => setStageKey((k) => k + 1)} />
      </div>

      {favOnly && list.length === 0 ? (
        <div className="mx-5 mt-3 flex flex-col items-center gap-3 rounded-[22px] border-[1.5px] border-dashed border-[#F7C5D3] bg-[#FFF7FA] px-4 py-7 text-center">
          <HeartSticker size={34} fill="#FFFFFF" stroke="#F0426B" strokeWidth={2.2} />
          <p className="m-0 text-[14px] font-bold leading-[1.9] text-[#B02A52]">
            هنوز کسی رو به قلبت اضافه نکردی!
          </p>
          <button
            type="button"
            onClick={() => setFavOnly(false)}
            className="h-10 rounded-full bg-[#F0426B] px-5 text-[13px] font-extrabold text-white transition-transform active:scale-95"
          >
            نشون بده همه رو
          </button>
        </div>
      ) : (
        <div className="mt-3 grid grid-cols-3 gap-2.5 px-5">
          {list.map((p) => {
          const isOn = p.kind === picked;
          return (
            <div
              key={p.kind}
              role="button"
              tabIndex={0}
              aria-pressed={isOn}
              onClick={() => setKind(p.kind)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setKind(p.kind);
                }
              }}
              className="relative flex cursor-pointer flex-col items-center gap-1 rounded-[22px] bg-white p-2 pb-3 transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#00ABE7]"
              style={{ border: `1.5px solid ${isOn ? "#00ABE7" : "#E1EFF5"}` }}
            >
              <FavHeart kind={p.kind} name={p.name} size={20} box={30} className="absolute end-1.5 top-1.5 z-10" />
              <div
                className="flex h-[92px] w-full items-center justify-center rounded-[16px]"
                style={{ background: p.bg }}
              >
                <Plush kind={p.kind} size={82} />
              </div>
              <span className="text-[13px] font-extrabold">{p.name}</span>
            </div>
          );
          })}
        </div>
      )}

      {/* ── بخش ۲: کارت پستال ── */}
      <div className="px-5 pt-7">
        <SubNum n="۲" title="کارت پستالت رو بنویس" />
        <p className="mb-0 mt-2 text-[13.5px] font-medium leading-[1.9] text-[#4A6572]">
          یه کارت پستال فقط با یه QR همراه جعبه می‌رسه. دوستت شماره‌ی موبایل خودش رو تأیید
          می‌کنه و پیامت — با ویس و عکس و ویدیو — رو می‌بینه.
        </p>
      </div>

      <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-1 pt-3.5">
        {OCCASIONS.map((label, i) => {
          const isOn = i === occ;
          return (
            <button
              key={label}
              type="button"
              aria-pressed={isOn}
              onClick={() => setOcc(i)}
              className="h-11 shrink-0 rounded-full px-[18px] text-[14.5px] font-bold"
              style={{
                background: isOn ? "#00ABE7" : "#fff",
                border: `1.5px solid ${isOn ? "#04202E" : "#CFE6EF"}`,
                color: "#04202E",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="mx-5 mt-3 flex flex-col gap-2 rounded-3xl border-[1.5px] border-[#CFE6EF] bg-white px-4 pb-3 pt-3.5">
        <label htmlFor="msg" className="text-sm font-extrabold">
          پیامت <span className="text-[11px] font-bold text-[#B02A52]">الزامی</span>
        </label>
        <textarea
          id="msg"
          rows={5}
          maxLength={400}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onBlur={onMessageBlur}
          placeholder={OCCASION_HOLDERS[occ]}
          className="min-h-[130px] resize-none border-none bg-transparent text-base leading-[1.9] text-[#04202E] outline-none"
        />
        <div className="flex justify-between text-[12.5px] font-semibold text-[#4A6572]">
          <span>متن، ویس، عکس یا ویدیو؛ هر چی دلت خواست</span>
          <span>
            {fa(message.length)} / ۴۰۰
          </span>
        </div>
        {msgTried && msgEmpty && (
          <span className="text-[11.5px] font-bold text-[#B02A52]">یه پیامی برای دوستت بنویس — متن کارت الزامیه.</span>
        )}
      </div>

      <div className="mx-5 mt-3">
        <MessageIdeas occ={occ} onPick={setMessage} />
      </div>

      {/* استودیو هدیه — ضبط ویس/ویدیو/عکس + آپلود (owner round 29) */}
      <div className="px-5 pt-4">
        <MediaStudio />
      </div>

      {/* محرمانگی هویت فرستنده — برای هر سفارش جدا انتخاب می‌شه (mission §۳) */}
      <div className="mx-5 mt-[18px] rounded-3xl border border-[#DDEEF5] bg-white px-4 py-3.5">
        <span className="text-sm font-extrabold">اسم چطوری دیده بشه؟</span>
        <span className="mt-1 block text-[12px] font-medium leading-[1.8] text-[#4A6572]">
          انتخابت فقط برای همین سفارشه؛ روی صفحه‌ی QR گیرنده همین‌طوری دیده می‌شه. تو حالت
          ناشناس، هیچ اطلاعاتی از تو به گیرنده نمی‌رسه — نه رو کارت، نه توی سیستم.
        </span>
        <div className="mt-2.5 flex flex-col gap-2">
          {PRIVACY_OPTIONS.map((opt) => {
            const on = senderDisplay === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setSenderDisplay(opt.key)}
                className="flex items-center gap-3 rounded-[18px] border-2 px-3.5 py-2.5 text-right transition-colors"
                style={{ borderColor: on ? "#00ABE7" : "#DDEEF5", background: on ? "#F2FAFD" : "white" }}
              >
                <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full border-2 border-[#04202E]" style={{ background: on ? "#00ABE7" : "white" }}>
                  {on && <CheckIcon size={13} stroke="#04202E" />}
                </span>
                <span aria-hidden="true" className="text-lg">{opt.emoji}</span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="text-[14px] font-extrabold text-[#04202E]">{opt.title}</span>
                  <span className="truncate text-[11.5px] font-medium text-[#4A6572]">{opt.sub}</span>
                </span>
              </button>
            );
          })}
        </div>
        {senderDisplay === "phrase" && (
          <div className="mt-3 flex flex-col gap-2 border-t border-[#E3F0F5] pt-3">
            <label htmlFor="phrase" className="text-[12.5px] font-extrabold">
              عبارت دلخواهت
            </label>
            <input
              id="phrase"
              type="text"
              maxLength={40}
              value={senderPhrase}
              onChange={(e) => setSenderPhrase(e.target.value)}
              placeholder="مثلاً: از طرف همسرت"
              className="box-border h-[48px] rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-4 text-[15px] text-[#04202E] outline-none focus:border-[#00ABE7]"
            />
            <div className="flex flex-wrap gap-1.5">
              {["از طرف همسرت", "از طرف مامانت", "از یه دوست قدیمی", "از طرف همکلاسی‌هات"].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setSenderPhrase(p)}
                  className="rounded-full border border-[#CFE6EF] bg-[#F2FAFD] px-3 py-1.5 text-[11.5px] font-bold text-[#04202E]"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
        {senderDisplay === "name" && (
          <div className="mt-3 flex flex-col gap-2 border-t border-[#E3F0F5] pt-3">
            <label htmlFor="nm" className="text-[12.5px] font-extrabold">
              اسم تو
            </label>
            <input
              id="nm"
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder={user ? user.name : "اسمت چیه؟"}
              className="box-border h-[48px] rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-4 text-[15px] text-[#04202E] outline-none focus:border-[#00ABE7]"
            />
          </div>
        )}
      </div>

      {/* قانون جدید رمز — خریدار رمزی وارد نمی‌کند (owner round 29) */}
      <div className="mx-5 mt-3.5">
        <div className="flex items-start gap-2.5 rounded-[22px] border border-dashed border-[#BFE9CB] bg-[#F3FCF6] px-4 py-3.5">
          <span className="text-lg" aria-hidden="true">🔐</span>
          <div className="text-[12px] font-semibold leading-[1.9] text-[#177A3D]">
            <b className="font-black">رمز کارت لازم نیست وارد کنی!</b> پیامت فقط با{" "}
            <b className="font-black">تأیید شماره موبایل گیرنده</b> باز می‌شه — کد ۴ رقمی
            همون لحظه برای خودش پیامک می‌شه.
          </div>
        </div>
      </div>

      <div className="mx-5 mt-3.5 flex items-center gap-4 rounded-[26px] bg-[#D6F1FB] p-[18px]">
        <div className="flex h-[98px] w-32 shrink-0 rotate-[-3deg] items-center justify-center rounded-xl border-[2.5px] border-[#04202E] bg-white">
          {/* THE real postcard QR — same SVG every box ships with (mission §۱) */}
          <RealVerifyQr />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-base font-extrabold">کارت پستالِ تو</span>
          <span className="text-[13px] font-medium leading-[1.85] text-[#1F3E4D]">
            روی کارت فقط همین QR هست. شماره‌ی هدیه‌ی تو، <b>{fa(nextNo)}</b>، روی خود جعبه
            می‌شینه. گیرنده با شماره‌ی خودش تأیید می‌شه و پیامت رو می‌بینه.
          </span>
        </div>
      </div>

      {/* نگهداری پیام — از قدم ۳ قبلی به قدم ۱ منتقل شد (owner round 29) */}
      <div className="px-5 pt-6">
        <h2 className="m-0 text-lg font-black">نگهداری پیام</h2>
        <p className="mb-0 mt-1 text-[12.5px] font-medium leading-[1.85] text-[#4A6572]">
          پیامت (متن، ویس، عکس و ویدیو) تا وقتی که انتخاب کنی نگه داشته می‌شه. ساعت از روزی
          شروع می‌شه که گیرنده پیامت رو واقعاً می‌بینه — نه از روز خرید.
        </p>
        <div className="mt-2.5 grid grid-cols-3 gap-2">
          {(
            [
              { key: "1m", title: "۱ ماهه", price: 0, tag: "رایگان" },
              { key: "6m", title: "۶ ماهه", price: retentionPrices.m6, tag: null },
              { key: "12m", title: "۱ ساله", price: retentionPrices.m12, tag: "پیشنهاد ویژه" },
            ] as { key: RetentionPlanKey; title: string; price: number; tag: string | null }[]
          ).map((p) => {
            const on = retention === p.key;
            return (
              <button
                key={p.key}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setRetention(p.key)}
                className="relative flex flex-col items-center gap-1 rounded-[18px] border-2 px-2 py-3 transition-colors"
                style={{ borderColor: on ? "#00ABE7" : "#DDEEF5", background: on ? "#E3F6FD" : "white" }}
              >
                {p.tag && (
                  <span className="absolute -top-2 right-1/2 translate-x-1/2 rounded-full bg-[#F0426B] px-2 py-0.5 text-[9.5px] font-extrabold text-white">
                    {p.tag}
                  </span>
                )}
                <span className="text-[13.5px] font-black text-[#04202E]">{p.title}</span>
                <span className="text-[11px] font-bold text-[#4A6572]">
                  {p.price === 0 ? "رایگان" : `${money(p.price)} تومان`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="sticky bottom-0 mt-5 flex items-center justify-between gap-3.5 border-t border-[#D3E8F0] bg-white/95 px-5 pb-[max(14px,env(safe-area-inset-bottom))] pt-3.5">
        <div className="flex flex-col">
          <span className="text-[13px] font-semibold text-[#4A6572]">جعبه + کارت پستال</span>
          <span className="text-lg font-black">{money(BOX_PRICE)} تومان</span>
        </div>
        <button
          type="button"
          onClick={goNext}
          className="flex h-[54px] items-center gap-2 rounded-full bg-[#00ABE7] px-[26px] text-base font-extrabold text-[#04202E] transition-transform active:scale-95"
        >
          ذخیره و ادامه
          <ForwardIcon />
        </button>
      </div>
      <div className="h-[2px]" aria-hidden="true" />
    </div>
  );
}

/* ═══════════════ قدم ۲ — افزودنی‌ها + قلب و پنجه ═══════════════ */
export function MobileExtras() {
  const hearts = usePishnam((s) => s.hearts);
  const paws = usePishnam((s) => s.paws);
  const setHearts = usePishnam((s) => s.setHearts);
  const setPaws = usePishnam((s) => s.setPaws);
  // قلب قرمز/پنجه — قیمت و فعال‌بودن از تنظیمات ادمین (owner request)
  const charmPrice = usePishnam((s) => s.charmPrice);
  const charmsEnabled = usePishnam((s) => s.charmsEnabled);
  // دکمه «جزئیات» هر افزودنی → Bottom-Sheet آیفونی
  const [detail, setDetail] = useState<CatalogEntry | null>(null);
  const { toast } = useToast();
  // «افزودنی‌ها» (mission §۵)
  const catalogAddons = usePishnam((s) => s.catalogAddons);
  const addonLines = usePishnam((s) => s.addonLines);
  const addAddon = usePishnam((s) => s.addAddon);
  const removeAddon = usePishnam((s) => s.removeAddon);
  const retention = usePishnam((s) => s.retention);
  const retentionPrices = usePishnam((s) => s.retentionPrices);
  const loadCatalog = usePishnam((s) => s.loadCatalog);
  useEffect(() => {
    void loadCatalog();
  }, [loadCatalog]);
  const addonQty = (variantId: string) => addonLines.find((l) => l.variantId === variantId)?.qty ?? 0;
  const addonsTotal = addonLines.reduce((acc, l) => {
    const a = catalogAddons.find((x) => x.variantId === l.variantId);
    return acc + (a ? a.priceToman * l.qty : 0);
  }, 0);
  const done = useCharityDone();
  const doneNow = done;
  const barPct = Math.min(100, Math.round((doneNow / CHARITY_TARGET) * 100));
  const retentionFee = retention === "6m" ? retentionPrices.m6 : retention === "12m" ? retentionPrices.m12 : 0;
  const total = BOX_PRICE + (charmsEnabled ? (hearts + paws) * charmPrice : 0) + addonsTotal + retentionFee;

  return (
    <div className="flex min-h-screen flex-col bg-[#F2FAFD] md:hidden">
      <MobileTopBar title="قدم ۲ از ۳" back="pick" />
      <StepBar step={2} total={3} />

      <div className="px-5 pb-1 pt-[22px]">
        <h1 className="m-0 text-[30px] font-black leading-[1.4]">یه ذره مهربونی اضافه کن</h1>
        <p className="mb-0 mt-2 text-[15px] font-medium leading-[1.9] text-[#1F3E4D]">
          هر هدیه رو با افزودنی‌ها کامل‌تر کن؛ اگه دلت خواست، یه قلب قرمز یا پنجه هم به جعبه
          بچسبونیم — پولشون می‌ره برای هدیه به بچه‌های بی‌سرپرست و پناهگاه حیوونا.
        </p>
      </div>
      {/* «افزودنی‌ها» — همراه هدیه اصلی، از مدیریت محصولات (mission §۵) */}
      {catalogAddons.length > 0 && (
        <div className="px-5 pt-5">
          <div className="flex items-baseline justify-between">
            <h2 className="m-0 text-lg font-black">افزودنی‌ها</h2>
            <span className="text-[12px] font-bold text-[#4A6572]">کنار هدیه‌ت بذاریم تو جعبه</span>
          </div>
          {/* round 34: modern 2-col product cards — whole card opens the
           * detail sheet; + / Counter live in the card's bottom row */}
          <div className="mt-2.5 grid grid-cols-2 gap-3">
            {catalogAddons.map((a) => {
              const q = addonQty(a.variantId);
              const out = !a.inStock;
              const on = q > 0;
              const imgs = a.images ?? [];
              const cover = entryCover(a);
              return (
                <div
                  key={a.variantId}
                  role="button"
                  tabIndex={0}
                  aria-label={`جزئیات و عکس ${a.name}`}
                  onClick={() => setDetail(a)}
                  onKeyDown={(e) => {
                    if (e.target !== e.currentTarget) return;
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setDetail(a);
                    }
                  }}
                  className={`relative flex cursor-pointer flex-col rounded-[24px] border-[1.5px] bg-white p-2 pb-2.5 text-right outline-none transition-all focus-visible:ring-2 focus-visible:ring-[#00ABE7] ${
                    on ? "border-[#00ABE7] ring-2 ring-[#00ABE7]/15" : "border-[#DDEEF5]"
                  }`}
                  style={{ opacity: out ? 0.6 : 1 }}
                >
                  {on && (
                    <span className="absolute right-2.5 top-2.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#00ABE7] shadow-[0_4px_10px_rgba(0,171,231,0.35)]">
                      <CheckIcon size={13} stroke="#fff" />
                    </span>
                  )}
                  {/* square image — gallery → legacy photo → emoji+gradient */}
                  <div className="relative aspect-square overflow-hidden rounded-[20px] bg-[#F2FAFD]">
                    {cover ? (
                      <img src={cover} alt={a.name} width={96} height={96} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                    ) : (
                      <span
                        className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#E3F6FD_0%,#F7FBFD_55%,#FFF1F5_100%)] text-4xl"
                        aria-hidden="true"
                      >
                        {a.emoji || "🎁"}
                      </span>
                    )}
                    {imgs.length > 1 && (
                      <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-extrabold text-[#04202E]">
                        عکس +{fa(imgs.length - 1)}
                      </span>
                    )}
                    {out && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-extrabold text-[#04202E]">ناموجوده</span>
                      </span>
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1 px-1 pt-2">
                    <span className="line-clamp-2 min-h-[3.2em] text-[14px] font-black leading-[1.6] text-[#04202E]">{a.name}</span>
                    {!out && q > 0 ? (
                      /* selected: price above, full-width counter below — they
                       * can't share one row inside a 2-col card (round 34 QA fix) */
                      <div className="mt-auto flex flex-col gap-1.5 pt-1">
                        <span className="flex items-baseline justify-center gap-1">
                          <span className="text-[14.5px] font-black text-[#04202E]">{money(a.priceToman)}</span>
                          <span className="text-[10px] font-bold text-[#4A6572]">تومان</span>
                        </span>
                        <span onClick={(e) => e.stopPropagation()} className="block">
                          <Counter
                            small
                            value={q}
                            onMinus={() => (q === 1 ? removeAddon(a.variantId) : addAddon(a.variantId))}
                            onPlus={() => addAddon(a.variantId)}
                            minusLabel="کمتر"
                            plusLabel="بیشتر"
                            plusBg="#00ABE7"
                            plusStroke="#04202E"
                          />
                        </span>
                      </div>
                    ) : (
                      <div className="mt-auto flex items-end justify-between gap-1 pt-1.5">
                        {out ? (
                          <span className="pb-1 text-[12px] font-black leading-[1.6] text-[#4A6572]">فعلاً ناموجوده</span>
                        ) : (
                          <span className="flex items-baseline gap-1 pb-1">
                            <span className="text-[14.5px] font-black text-[#04202E]">{money(a.priceToman)}</span>
                            <span className="text-[10px] font-bold text-[#4A6572]">تومان</span>
                          </span>
                        )}
                        {!out && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              addAddon(a.variantId);
                            }}
                            aria-label={`افزودن ${a.name} کنار هدیه`}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00ABE7] text-[20px] font-black leading-none text-white transition-transform active:scale-90"
                          >
                            +
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* قلب قرمز و پنجه — جمع‌وجور (owner round 29: «خیلی کادر بزرگ نباشه») */}
      {charmsEnabled && (
        <div className="px-5 pt-5">
          <div className="flex items-baseline justify-between">
            <h2 className="m-0 text-lg font-black">قلب قرمز و پنجه</h2>
            <span className="text-[12px] font-bold text-[#4A6572]">هر کدوم {money(charmPrice)} تومان — برای کار خیر</span>
          </div>
          <div className="mt-2.5 flex flex-col gap-2">
            <div className="flex items-center gap-3 rounded-[20px] border-[1.5px] bg-white p-2.5" style={{ borderColor: hearts > 0 ? "#F7C5D3" : "#DDEEF5" }}>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFE9F0]">
                <HeartSticker size={26} fill="#F0426B" stroke="#04202E" strokeWidth={2.4} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-[15px] font-black text-[#04202E]">قلب قرمز</span>
                <span className="text-[11px] font-medium leading-[1.6] text-[#4A6572]">هدیه به بچه‌های بی‌سرپرست</span>
              </span>
              <span className="shrink-0 text-[11.5px] font-extrabold text-[#4A6572]">{money(charmPrice)}</span>
              <Counter
                value={hearts}
                onMinus={() => setHearts(hearts - 1)}
                onPlus={() => setHearts(hearts + 1)}
                minusLabel="یکی کم کن"
                plusLabel="یکی زیاد کن"
                plusBg="#F0426B"
                plusStroke="#fff"
              />
            </div>
            <div className="flex items-center gap-3 rounded-[20px] border-[1.5px] bg-white p-2.5" style={{ borderColor: paws > 0 ? "#B5E3F5" : "#DDEEF5" }}>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E3F6FD]">
                <PawIcon size={24} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-[15px] font-black text-[#04202E]">پنجه</span>
                <span className="text-[11px] font-medium leading-[1.6] text-[#4A6572]">هدیه به پناهگاه حیوونا</span>
              </span>
              <span className="shrink-0 text-[11.5px] font-extrabold text-[#4A6572]">{money(charmPrice)}</span>
              <Counter
                value={paws}
                onMinus={() => setPaws(paws - 1)}
                onPlus={() => setPaws(paws + 1)}
                minusLabel="یکی کم کن"
                plusLabel="یکی زیاد کن"
                plusBg="#00ABE7"
                plusStroke="#04202E"
              />
            </div>
          </div>
        </div>
      )}

      {/* جزئیات افزودنی — Bottom-Sheet آیفونی + گالری و مشخصات (round 34) */}
      <Sheet open={detail !== null} onOpenChange={(o) => !o && setDetail(null)}>
        <SheetContent side="bottom" className="rounded-t-[30px] border-[#DDEEF5] bg-white px-0 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2">
          {detail && (
            <div className="flex max-h-[78vh] flex-col gap-4 overflow-y-auto px-6 pt-2 text-right">
              <span className="mx-auto h-1.5 w-12 rounded-full bg-[#DDEEF5]" aria-hidden="true" />
              {/* گالری: عکس‌های محصول → عکس قدیمی → ایموجی + گرادیان پاستلی */}
              <Gallery
                key={detail.variantId}
                images={detail.images?.length ? detail.images : detail.image ? [detail.image] : []}
                name={detail.name}
                emoji={detail.emoji}
                rounded="rounded-[24px]"
                thumbClass="h-14 w-14"
              />
              <SheetHeader className="gap-1 space-y-0 p-0 text-right">
                <SheetTitle className="text-right text-[20px] font-black text-[#04202E]">{detail.name}</SheetTitle>
                <SheetDescription className="text-right text-[14px] font-extrabold text-[#006387]">
                  {detail.inStock ? `${money(detail.priceToman)} تومان` : "فعلاً ناموجوده"}
                </SheetDescription>
              </SheetHeader>
              <p className="m-0 text-[13.5px] font-medium leading-[2] text-[#1F3E4D]">
                {detail.description || "برای این افزودنی هنوز توضیحی ثبت نشده — سوالی داری قبل از خرید بهمون پیام بده."}
              </p>
              {/* سایز / رنگ‌ها / جدول مشخصات — فقط وقتی ادمین ثبت کرده باشد */}
              <AttrsBlock entry={detail} />
              {detail.inStock && (
                <button
                  type="button"
                  onClick={() => {
                    addAddon(detail.variantId);
                    setDetail(null);
                    toast({ title: "به سبد اضافه شد ✓", description: detail.name });
                  }}
                  className="h-[52px] w-full rounded-full bg-[#00ABE7] text-[15px] font-extrabold text-[#04202E] transition-transform active:scale-[0.98]"
                >
                  + بذارش کنار هدیه تو جعبه
                </button>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* charity progress */}
      <div className="mx-5 mt-4 flex flex-col gap-2.5 rounded-3xl border border-[#DDEEF5] bg-white px-[18px] py-4">
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-extrabold">اولین بسته‌ی خیریه</span>
          <span className="text-[13px] font-bold text-[#006387]">
            {fa(doneNow)} از {fa(CHARITY_TARGET)}
          </span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-[#E3F0F5]">
          <div className="h-3 rounded-full bg-[#00ABE7] transition-all" style={{ width: `${barPct}%` }} />
        </div>
        <span className="text-[12.5px] font-medium leading-[1.85] text-[#4A6572]">
          وقتی تعداد قلب و پنجه‌ها به هدفمون برسه، هدیه‌ها رو می‌خریم، می‌فرستیم و مدرکش رو تو
          «دفتر مهربونی» می‌ذاریم.
        </span>
      </div>

      <div className="sticky bottom-0 mt-auto flex items-center gap-3.5 border-t border-[#D3E8F0] bg-white/95 px-5 pb-[max(14px,env(safe-area-inset-bottom))] pt-3.5">
        <div className="flex flex-1 flex-col">
          <span className="text-[13px] font-semibold text-[#4A6572]">جمع (جعبه + افزودنی‌ها و قلب و پنجه)</span>
          <span className="text-lg font-black">{money(total)} تومان</span>
        </div>
        <button
          type="button"
          onClick={() => navigate("checkout")}
          className="flex h-[54px] items-center gap-2 rounded-full bg-[#00ABE7] px-[26px] text-base font-extrabold text-[#04202E] transition-transform active:scale-95"
        >
          ذخیره و تکمیل
          <ForwardIcon />
        </button>
      </div>
    </div>
  );
}

function Counter({
  value,
  onMinus,
  onPlus,
  minusLabel,
  plusLabel,
  plusBg,
  plusStroke,
  small,
}: {
  value: number;
  onMinus: () => void;
  onPlus: () => void;
  minusLabel: string;
  plusLabel: string;
  plusBg: string;
  plusStroke: string;
  small?: boolean; // inline compact variant — addon grid cards (round 34)
}) {
  const btn = small ? "h-9 w-9" : "h-11 w-11";
  return (
    <div className="flex items-center gap-1 rounded-full bg-white p-1">
      <button
        type="button"
        aria-label={minusLabel}
        onClick={onMinus}
        className={`flex ${btn} items-center justify-center rounded-full border-none bg-[#F2FAFD]`}
      >
        <MinusIcon />
      </button>
      <span className={`${small ? "min-w-[28px] text-lg" : "min-w-[38px] text-xl"} text-center font-black`}>{fa(value)}</span>
      <button
        type="button"
        aria-label={plusLabel}
        onClick={onPlus}
        className={`flex ${btn} items-center justify-center rounded-full border-none`}
        style={{ background: plusBg }}
      >
        <PlusSmall stroke={plusStroke} />
      </button>
    </div>
  );
}

/* ═══════════════ قدم ۳ — سبد و پرداخت ═══════════════ */
export function MobileCheckout() {
  const kind = usePishnam((s) => s.kind);
  const hearts = usePishnam((s) => s.hearts);
  const paws = usePishnam((s) => s.paws);
  const addonLines = usePishnam((s) => s.addonLines);
  // سبد — بندانگشتِ عکس هر ردیف از کاتالوگ (round 34)
  const catalog = usePishnam((s) => s.catalog);
  const catalogAddons = usePishnam((s) => s.catalogAddons);
  const receiver = usePishnam((s) => s.receiver);
  const setReceiver = usePishnam((s) => s.setReceiver);
  const quote = usePishnam((s) => s.quote);
  const quoteStatus = usePishnam((s) => s.quoteStatus);
  const fetchQuote = usePishnam((s) => s.fetchQuote);
  const paymentMethod = usePishnam((s) => s.paymentMethod);
  const setPaymentMethod = usePishnam((s) => s.setPaymentMethod);
  // سفارش‌دهنده — گیتِ وریفای قبل از پرداخت (owner round)
  const ordererVerified = useOrdererVerified();

  // server quote — the only payable number (guide §4.5)
  useEffect(() => {
    void fetchQuote();
  }, [fetchQuote, kind, hearts, paws, receiver.province, addonLines]);

  const sel = PLUSHES.find((p) => p.kind === kind) ?? PLUSHES[0];
  const total = quote?.total ?? 0;

  // cart rows straight from the SERVER quote lines — main gift + «افزودنی‌ها»
  // (each addon is an independent item, mission §۵) + retention + shipping
  // + a catalog thumbnail per row (round 34); amounts stay server-authoritative
  interface CartRow { key: string; img?: string | null; emoji?: string; plush?: boolean; bg: string; title: string; sub: string; amount: string; }
  const mainEntry = catalog[kind];
  const cartRows: CartRow[] = quote
    ? [
        ...(quote.lines ?? []).map((l, i) => {
          const entry = i === 0 ? mainEntry : catalogAddons.find((x) => x.variantId === l.variantId);
          return {
            key: l.variantId,
            img: entryCover(entry),
            plush: i === 0,
            emoji: i === 0 ? undefined : entry?.emoji ?? (l.sku.startsWith("AD-") ? "🎁" : undefined),
            bg: i === 0 ? sel.bg : "#F2FAFD",
            title: l.productName,
            sub: i === 0 ? "جعبه آبی + کارت پستال QR" : `افزودنی × ${fa(l.qty)}`,
            amount: money(l.lineToman),
          };
        }),
        ...(quote.charms > 0
          ? [{ key: "charms", emoji: "❤️", bg: "#FFE9F0", title: `قلب و پنجه × ${fa(hearts + paws)}`, sub: "برای بچه‌های بی‌سرپرست و حیوونا", amount: money(quote.charms) }]
          : []),
        ...(quote.retention > 0
          ? [{ key: "retention", emoji: "💾", bg: "#E3F6FD", title: `نگهداری پیام ${quote.retentionPlan === "12m" ? "۱ ساله" : "۶ ماهه"}`, sub: "ساعت از اولین نمایش موفق پیام به گیرنده", amount: money(quote.retention) }]
          : []),
      ]
    : [];

  // A-03: the pay gate (valid/canPay + first missing step) is shared logic now
  const gate = evaluateCheckoutGate({ receiver, ordererVerified });
  const valid = gate.receiverOk;
  // پرداخت فقط با گیرنده‌ی کامل + شماره‌ی سفارش‌دهنده‌ی وریفای‌شده باز می‌شه
  const canPay = gate.canPay;

  // UX: precise, actionable missing-step hints + gentle inline validation
  const [attempted, setAttempted] = useState(false);
  const nameMissing = receiver.name.trim() === "";
  const phoneMissing = receiver.phone.trim().length < 8;
  const addrMissing = receiver.address.trim() === "";
  const firstMissingId =
    gate.firstGap === "name" ? "rc-name" : gate.firstGap === "phone" ? "rc-phone" : gate.firstGap === "address" ? "ra" : "orderer-card";
  const missingText =
    !ordererVerified && !valid
      ? "اطلاعات گیرنده رو کامل کن و شماره موبایل خودت رو تأیید کن"
      : !ordererVerified
        ? "فقط یک قدم مونده: شماره موبایلت رو با کد پیامکی تأیید کن"
        : nameMissing
          ? "اسم گیرنده رو بنویس"
          : phoneMissing
            ? "شماره‌ی موبایل گیرنده رو کامل کن"
            : addrMissing
              ? "آدرس گیرنده رو کامل کن"
              : "";
  const gotoMissing = () => {
    setAttempted(true);
    document.getElementById(firstMissingId)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F2FAFD] md:hidden">
      <MobileTopBar title="قدم ۳ از ۳" back="extras" />
      <StepBar step={3} total={3} />

      <div className="px-5 pb-1 pt-[22px]">
        <h1 className="m-0 text-[30px] font-black leading-[1.4]">سبد و پرداخت</h1>
      </div>

      {/* پیش‌نمایش پستی جعبه — بالای سبد، مثل نسخه‌ی دسکتاپ (owner round 29) */}
      <div className="mx-5 mt-3">
        <div className="pb-2 text-[14px] font-extrabold text-[#04202E]">جعبه‌ت این‌جوری می‌رسه</div>
        <BoxPreview />
      </div>

      {/* قانون امنیت — گیرنده فقط با وریفای شماره می‌بیند (owner round 29) */}
      <div className="mx-5 mt-3.5">
        <div className="flex items-start gap-2.5 rounded-[20px] border border-dashed border-[#BFE9CB] bg-[#F3FCF6] px-4 py-3">
          <span className="text-base" aria-hidden="true">🔒</span>
          <span className="text-[11.5px] font-bold leading-[1.85] text-[#177A3D]">
            اطلاعات این هدیه به‌صورت امن نگه‌داری می‌شه و فقط بعد از تأیید شماره‌ی موبایل
            گیرنده نمایش داده می‌شه.
          </span>
        </div>
      </div>

      {/* items — amounts come from the SERVER quote */}
      <div className="mx-5 mt-4 rounded-[26px] border border-[#DDEEF5] bg-white px-4 py-2">
        {cartRows.map((r) => (
          <div key={r.key} className="flex items-center gap-3 border-b border-[#E3F0F5] py-3">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[18px] text-2xl"
              style={{ background: r.bg }}
            >
              {r.img ? (
                <img src={r.img} alt={r.title} width={64} height={64} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              ) : r.plush ? (
                <Plush kind={sel.kind} size={54} />
              ) : (
                <span aria-hidden="true">{r.emoji ?? "🎁"}</span>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-0.5">
              <span className="text-[15px] font-extrabold">{r.title}</span>
              <span className="text-[12.5px] font-medium text-[#4A6572]">{r.sub}</span>
            </div>
            <span className="text-sm font-extrabold">{r.amount}</span>
          </div>
        ))}
        <div className="flex justify-between py-3 pb-1.5 text-sm font-semibold text-[#4A6572]">
          <span>هزینه‌ی ارسال</span>
          <span>{quote ? money(quote.shipping) : quoteStatus === "loading" ? "در حال محاسبه…" : "—"}</span>
        </div>
        <div className="flex items-center justify-between py-2 pb-3 text-[17px] font-black">
          <span>جمع کل</span>
          <span>{quote ? `${money(total)} تومان` : "در حال محاسبه…"}</span>
        </div>
      </div>

      {/* receiver */}
      <div className="flex items-center justify-between px-5 pb-2 pt-[22px]">
        <span className="text-lg font-extrabold">گیرنده‌ی هدیه</span>
        {valid && (
          <span className="flex items-center gap-1 rounded-full bg-[#E5F8EC] px-2.5 py-1 text-[10.5px] font-extrabold text-[#177A3D]">
            <CheckIcon size={11} stroke="#177A3D" />
            کامل شد
          </span>
        )}
      </div>
      <div className="mx-5 rounded-[26px] border border-[#DDEEF5] bg-white px-4 py-1">
        <Field
          id="rc-name"
          label="نام و نام خانوادگی گیرنده"
          value={receiver.name}
          onChange={(v) => setReceiver({ name: v })}
          placeholder="مثلاً آرمان رفیقی"
          error={attempted && nameMissing ? "اسم گیرنده رو بنویس" : undefined}
        />
        <Field
          id="rc-phone"
          label="شماره‌ی موبایل گیرنده"
          value={receiver.phone}
          onChange={(v) => setReceiver({ phone: v })}
          placeholder="۰۹۱۲ ۱۲۳ ۴۵۶۷"
          tel
          error={attempted && phoneMissing ? "شماره‌ی موبایل گیرنده رو کامل کن" : undefined}
        />
        <div className="flex flex-col gap-1 border-b border-[#E3F0F5] py-3">
          <label htmlFor="province" className="text-[12.5px] font-bold text-[#4A6572]">
            استان
          </label>
          <select
            id="province"
            value={receiver.province}
            onChange={(e) => setReceiver({ province: e.target.value })}
            className="h-9 w-full appearance-none border-none bg-transparent text-base font-semibold text-[#04202E] outline-none"
          >
            {PROVINCES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <Field
          label="شهر"
          value={receiver.city}
          onChange={(v) => setReceiver({ city: v })}
          placeholder="مثلاً تهران"
        />
        <div className="flex flex-col gap-1 border-b border-[#E3F0F5] py-3">
          <label htmlFor="ra" className="text-[12.5px] font-bold text-[#4A6572]">
            آدرس کامل
          </label>
          <textarea
            id="ra"
            rows={2}
            value={receiver.address}
            onChange={(e) => setReceiver({ address: e.target.value })}
            placeholder="خیابان، کوچه، پلاک، واحد"
            className="resize-none border-none bg-transparent text-base leading-[1.8] text-[#04202E] outline-none"
          />
          {attempted && addrMissing && <div className="pb-0.5 text-[11px] font-bold text-[#B02A52]">آدرس گیرنده رو کامل کن</div>}
        </div>
        {/* reassurance — copy only */}
        <div className="flex items-start gap-2 py-3 text-[11.5px] font-semibold leading-[1.8] text-[#4A6572]">
          <span aria-hidden="true">🤫</span>
          <span>اسم و شماره‌ی تو فقط پیش ما می‌مونه — هیچ‌کدوم بدون اجازه‌ی تو به گیرنده نمی‌رسه.</span>
        </div>
      </div>

      {/* سفارش‌دهنده — گیتِ وریفای پیامکی قبل از پرداخت */}
      <OrdererSection />

      {/* coupon — honest: server discounts land later (contract: no fake codes) */}
      <div className="mx-5 mt-3.5 flex items-center gap-2.5 rounded-[22px] border border-dashed border-[#BFDDE8] bg-[#F8FDFF] py-3 pl-4 pr-4">
        <span className="text-lg">🎁</span>
        <div className="text-[12.5px] font-semibold leading-[1.8] text-[#4A6572]">
          کد تخفیف نداری؟ به‌زودی اولین کد مهربونی اینجا فعال می‌شه — بیهوده منتظر تخفیف‌های تقلبی نمی‌مونی.
        </div>
      </div>

      {/* payment method — server-authoritative quote per method */}
      <div className="px-5 pb-2 pt-[22px] text-lg font-extrabold">روش پرداخت</div>
      {!ordererVerified && (
        <div className="mx-5 mb-2.5 flex items-center gap-2 rounded-[18px] bg-[#FFF3C9] px-4 py-2.5 text-[12.5px] font-bold leading-[1.8] text-[#7A5C00]">
          <span aria-hidden="true">🔒</span>
          <span>برای فعال شدن روش‌های پرداخت، اول شماره موبایلت رو بالا تأیید کن.</span>
        </div>
      )}
      <div className={ordererVerified ? "" : "pointer-events-none opacity-50 select-none"} aria-disabled={!ordererVerified}>
        <div className="mx-5 flex flex-col gap-2.5">
        <button
          type="button"
          onClick={() => setPaymentMethod("zarinpal")}
          className="flex items-center gap-3 rounded-[22px] border-2 bg-white px-4 py-3.5 text-right transition-colors"
          style={{ borderColor: paymentMethod === "zarinpal" ? "#00ABE7" : "#DDEEF5" }}
        >
          <span
            className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border-2 border-[#04202E]"
            style={{ background: paymentMethod === "zarinpal" ? "#00ABE7" : "white" }}
          >
            {paymentMethod === "zarinpal" && <CheckIcon size={14} stroke="#04202E" />}
          </span>
          <div className="flex flex-1 flex-col gap-0.5">
            <span className="text-[15px] font-extrabold">پرداخت آنلاین</span>
            <span className="text-[12.5px] font-medium text-[#4A6572]">
              با همه‌ی کارت‌های عضو شتاب، از درگاه امن بانکی
            </span>
          </div>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#04202E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="6" width="18" height="13" rx="3" />
            <path d="M3 10.5h18M7 15h4" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => setPaymentMethod("manual_transfer")}
          className="flex items-center gap-3 rounded-[22px] border-2 bg-white px-4 py-3.5 text-right transition-colors"
          style={{ borderColor: paymentMethod === "manual_transfer" ? "#00ABE7" : "#DDEEF5" }}
        >
          <span
            className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border-2 border-[#04202E]"
            style={{ background: paymentMethod === "manual_transfer" ? "#00ABE7" : "white" }}
          >
            {paymentMethod === "manual_transfer" && <CheckIcon size={14} stroke="#04202E" />}
          </span>
          <div className="flex flex-1 flex-col gap-0.5">
            <span className="text-[15px] font-extrabold">کارت به کارت / بله‌پی</span>
            <span className="text-[12.5px] font-medium text-[#4A6572]">
              مبلغ رو می‌ریزی، عکس رسید رو آپلود می‌کنی؛ تا ۱۲ ساعت بررسی می‌شه
            </span>
          </div>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#04202E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <path d="M2 10h20M6 15h5" />
          </svg>
        </button>
        </div>
      </div>

      <div className="px-6 pt-3.5 text-center text-[12.5px] font-medium leading-[1.9] text-[#4A6572]">
        با پرداخت، قوانین و شرایط جعبه آبی رو قبول می‌کنی. رسید قلب‌ها و پنجه‌ها بعد از ارسال
        هدیه‌ها تو دفتر مهربونی ثبت می‌شه.
      </div>

      <div className="sticky bottom-0 mt-auto flex items-center gap-3.5 border-t border-[#D3E8F0] bg-white/95 px-5 pb-[max(14px,env(safe-area-inset-bottom))] pt-3.5">
        <div className="flex flex-col">
          <span className="text-[13px] font-semibold text-[#4A6572]">جمع کل</span>
          <span className="text-lg font-black">{quote ? `${money(total)} تومان` : "…"}</span>
        </div>
        <button
          type="button"
          disabled={!canPay || !quote}
          onClick={payNow}
          className="flex h-[54px] flex-1 items-center justify-center gap-2 rounded-full text-base font-extrabold transition-all active:scale-95"
          style={{ background: canPay && quote ? "#00ABE7" : "#CFE6EF", color: "#04202E", opacity: canPay && quote ? 1 : 0.7 }}
        >
          پرداخت و فرستادن
          <HeartSticker size={20} fill="#04202E" stroke="none" />
        </button>
      </div>
      {!canPay && (
        <button
          type="button"
          onClick={gotoMissing}
          className="flex w-full items-center justify-center gap-1.5 bg-[#FFF3C9] px-5 pb-3 pt-2 text-center text-xs font-bold text-[#7A5C00] transition-transform active:scale-[0.99]"
        >
          <span>{missingText || "برای پرداخت، اطلاعات گیرنده رو کامل کن"}</span>
          <span aria-hidden="true">↑</span>
        </button>
      )}
      {/* scroll spacer: at max scroll the sticky CTA must cover NOTHING */}
      <div className="h-[86px]" aria-hidden="true" />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  tel,
  id,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  tel?: boolean;
  id?: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-[#E3F0F5] py-3">
      <label htmlFor={id} className="text-[12.5px] font-bold text-[#4A6572]">
        {label}
      </label>
      <input
        id={id}
        type={tel ? "tel" : "text"}
        inputMode={tel ? "numeric" : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-[30px] border-none bg-transparent text-base text-[#04202E] outline-none"
      />
      {error && <div className="pb-0.5 text-[11px] font-bold text-[#B02A52]">{error}</div>}
    </div>
  );
}

/* ── سفارش‌دهنده: نام + نام خانوادگی + موبایل خود مشتری، با تأیید پیامکی ──
 * شماره سفارش‌دهنده مستقل از گیرنده است؛ تا تأیید موفق شماره، پرداخت باز
 * نمی‌شود (هم UI و هم سرور). تأیید موفق = ساخت/اتصال حساب + لاگین (سشن ۳۰ روزه).
 */
function OrdererSection() {
  const orderer = usePishnam((s) => s.orderer);
  const setOrderer = usePishnam((s) => s.setOrderer);
  const user = usePishnam((s) => s.user);
  const login = usePishnam((s) => s.login);
  const verified = useOrdererVerified();
  const { toast } = useToast();

  // prefill از حساب کاربری زنده — «اگه قبلاً حساب داری، از همون استفاده کن»
  // (A-03: the rule itself lives in lib/shop/checkout-submit.ts — shared)
  const prefilled = useRef(false);
  useEffect(() => {
    if (prefilled.current) return;
    const pre = ordererPrefill(orderer, user);
    if (pre) {
      setOrderer(pre);
      prefilled.current = true;
    }
  }, [user, orderer, setOrderer]);

  // A-03: shared OTP machine (state/fetches/timers/copy) — this shell only
  // renders its own visuals; onSuccess = حساب ساخته/وصل شد + لاگین (سشن ۳۰ روزه)
  const [phase, setPhase] = useState<"idle" | "code">("idle");
  const otp = useOtp({
    purpose: "checkout_orderer",
    onSuccess: (res) => {
      login(res.user.phone || orderer.phone, res.user.name || orderer.name.trim());
      setPhase("idle");
      toast({
        title: "شماره‌ت تأیید شد ✓",
        description: "حسابت آماده‌ست و این سفارش به همون ثبت می‌شه.",
      });
    },
  });

  // the hook's phone mirrors the orderer field (the store input stays the source)
  useEffect(() => {
    otp.setPhone(orderer.phone);
  }, [orderer.phone, otp.setPhone]);

  const phoneReady = isValidIranMobile(orderer.phone);
  const nameReady = orderer.name.trim().length >= 3;

  const requestCode = async () => {
    if (await otp.request()) setPhase("code");
  };

  const submitCode = async () => {
    await otp.verify(orderer.name.trim());
  };

  return (
    <>
      <div className="flex items-center justify-between px-5 pb-2 pt-[22px]">
        <span className="text-lg font-extrabold">اطلاعات سفارش‌دهنده</span>
        <span className="rounded-full bg-[#E3F6FD] px-2.5 py-1 text-[10.5px] font-extrabold text-[#006387]">همینه که خرید می‌کنه</span>
      </div>
      <div id="orderer-card" className="mx-5 rounded-[26px] border border-[#DDEEF5] bg-white px-4 py-1">
        <div className="pb-1 pt-3 text-[12.5px] font-medium leading-[1.9] text-[#4A6572]">
          این سفارش به اسم خودت ثبت می‌شه — شماره‌ش می‌تونه با شماره گیرنده فرق کنه (هدیه برای دیگری).
        </div>
        <Field label="نام و نام خانوادگی" value={orderer.name} onChange={(v) => setOrderer({ name: v })} placeholder="مثلاً سارا محمدی" />
        <Field label="شماره‌ی موبایل سفارش‌دهنده" value={orderer.phone} onChange={(v) => setOrderer({ phone: v })} placeholder="۰۹۱۲ ۱۲۳ ۴۵۶۷" tel />
        <div className="py-3.5">
          {verified ? (
            <div className="flex items-center gap-2 rounded-[18px] bg-[#E7F8EF] px-4 py-3 text-[12.5px] font-extrabold leading-[1.8] text-[#1E7A46]">
              <CheckIcon size={16} stroke="#1E7A46" />
              <span>شماره‌ت تأیید شد — سفارش به حساب کاربریت ثبت می‌شه و بعد از خرید لاگین می‌مونی.</span>
            </div>
          ) : phase === "code" ? (
            <div className="flex flex-col gap-2.5">
              <div className="text-[12.5px] font-bold leading-[1.9] text-[#4A6572]">
                کد ۴ رقمی پیامک‌شده به <b dir="ltr">{orderer.phone}</b> رو بزن:
              </div>
              <MiniOtpBoxes value={otp.code} onChange={otp.setCode} onSubmit={() => void submitCode()} disabled={otp.busy} />
              {otp.devCode && (
                <div className="self-start rounded-xl bg-[#FFF3C9] px-2.5 py-1 text-[11px] font-extrabold text-[#7A5C00]">
                  کد آزمایشی (محیط توسعه): {fa(otp.devCode)}
                </div>
              )}
              {otp.err && <div className="text-[12px] font-bold text-[#B02A52]">{otp.err}</div>}
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  disabled={otp.busy}
                  onClick={() => void submitCode()}
                  className="flex h-[46px] flex-1 items-center justify-center rounded-full bg-[#04202E] text-[14px] font-extrabold text-white transition-transform active:scale-95 disabled:opacity-60"
                >
                  {otp.busy ? "در حال تأیید…" : "تأیید و ادامه"}
                </button>
                <button
                  type="button"
                  disabled={otp.busy || otp.resendIn > 0}
                  onClick={() => void requestCode()}
                  className="h-[46px] rounded-full border border-[#CFE6EF] px-4 text-[12px] font-bold text-[#006387] disabled:opacity-50"
                >
                  {otp.resendIn > 0 ? `ارسال دوباره تا ${fa(otp.resendIn)} ثانیه` : "ارسال دوباره کد"}
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  setPhase("idle");
                  otp.reset();
                }}
                className="self-start text-[12px] font-bold text-[#006387] underline underline-offset-4"
              >
                تغییر شماره
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2 rounded-[18px] bg-[#F2FAFD] px-4 py-3 text-[12.5px] font-semibold leading-[1.8] text-[#4A6572]">
                <span aria-hidden="true">📱</span>
                <span>
                  قبل از پرداخت، شماره‌ات رو با یه کد پیامکی تأیید می‌کنیم — حساب کاربریت هم همین‌جا خودکار ساخته می‌شه؛ نه رمزی، نه فرم اضافه.
                </span>
              </div>
              {otp.err && <div className="text-[12px] font-bold text-[#B02A52]">{otp.err}</div>}
              <button
                type="button"
                disabled={!phoneReady || !nameReady || otp.busy}
                onClick={() => void requestCode()}
                className="flex h-[48px] items-center justify-center gap-2 rounded-full border-2 border-[#04202E] text-[14px] font-extrabold text-[#04202E] transition-transform active:scale-95 disabled:border-[#CFE6EF] disabled:text-[#7C99A7]"
              >
                {otp.busy ? "در حال ارسال…" : "دریافت کد تأیید"}
              </button>
              {(!phoneReady || !nameReady) && (
                <div className="text-center text-[11.5px] font-semibold text-[#7C99A7]">نام و نام خانوادگی و شماره موبایل خودت رو کامل کن</div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/** ۴ خانه‌ی کد تأیید — نسخه‌ی جمع‌وجور صفحه پرداخت (auto-advance + paste) */
function MiniOtpBoxes({
  value,
  onChange,
  onSubmit,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const toEn = (v: string) => v.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
  const chars = value.replace(/\D/g, "").slice(0, 4).padEnd(4, " ").split("");
  const setChar = (i: number, ch: string) => {
    const cur = value.replace(/\D/g, "").slice(0, 4).split("");
    cur[i] = ch;
    onChange(cur.join("").replace(/\s/g, ""));
  };
  return (
    <div className="flex flex-row-reverse justify-end gap-2" dir="ltr">
      {chars.map((c, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          disabled={disabled}
          aria-label={`رقم ${fa(i + 1)} از کد تأیید`}
          value={c.trim()}
          onChange={(e) => {
            const ch = toEn(e.target.value).replace(/\D/g, "").slice(-1);
            if (ch) {
              setChar(i, ch);
              refs.current[Math.min(3, i + 1)]?.focus();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace") {
              e.preventDefault();
              if (c.trim()) setChar(i, "");
              else if (i > 0) {
                refs.current[i - 1]?.focus();
                const cur = value.replace(/\D/g, "").slice(0, 4).split("");
                cur[i - 1] = "";
                onChange(cur.join("").replace(/\s/g, ""));
              }
            } else if (e.key === "Enter") {
              onSubmit();
            }
          }}
          onPaste={(e) => {
            e.preventDefault();
            const pasted = toEn(e.clipboardData.getData("text")).replace(/\D/g, "").slice(0, 4);
            if (pasted) onChange(pasted);
          }}
          className="h-12 w-11 rounded-[14px] border-2 border-[#CFE6EF] bg-white text-center text-lg font-black text-[#04202E] outline-none focus:border-[#00ABE7] disabled:opacity-60"
        />
      ))}
    </div>
  );
}

function RealVerifyQr() {
  // the ONE postcard QR — same for every box; grants nothing by itself
  const [failed, setFailed] = useState(false);
  if (failed) return <PostcardQr />; // offline fallback: decorative
  return (
    <img
      src="/api/qr/verify.svg"
      alt="QR تأیید گیرنده هدیه — به صفحه تأیید شماره موبایل می‌رود"
      width={76}
      height={76}
      onError={() => setFailed(true)}
      className="h-[76px] w-[76px]"
    />
  );
}

function PostcardQr() {
  return (
    <svg width="72" height="72" viewBox="0 0 25 25" aria-hidden="true">
      <g fill="#04202E">
        <path fillRule="evenodd" d="M0 0h7v7H0zM1 1v5h5V1z" />
        <rect x="2" y="2" width="3" height="3" />
        <path fillRule="evenodd" transform="translate(18 0)" d="M0 0h7v7H0zM1 1v5h5V1z" />
        <rect x="20" y="2" width="3" height="3" />
        <path fillRule="evenodd" transform="translate(0 18)" d="M0 0h7v7H0zM1 1v5h5V1z" />
        <rect x="2" y="20" width="3" height="3" />
        <rect x="9" y="0" width="2" height="2" />
        <rect x="12" y="2" width="2" height="2" />
        <rect x="9" y="5" width="3" height="2" />
        <rect x="14" y="6" width="2" height="2" />
        <rect x="0" y="9" width="2" height="2" />
        <rect x="4" y="10" width="3" height="2" />
        <rect x="9" y="9" width="2" height="2" />
        <rect x="13" y="10" width="3" height="3" />
        <rect x="18" y="9" width="2" height="2" />
        <rect x="22" y="11" width="3" height="2" />
        <rect x="2" y="13" width="2" height="2" />
        <rect x="7" y="14" width="2" height="3" />
        <rect x="11" y="14" width="2" height="2" />
        <rect x="16" y="15" width="3" height="2" />
        <rect x="21" y="15" width="2" height="2" />
        <rect x="9" y="18" width="3" height="2" />
        <rect x="14" y="19" width="2" height="3" />
        <rect x="18" y="20" width="2" height="2" />
        <rect x="22" y="21" width="3" height="2" />
        <rect x="10" y="22" width="2" height="3" />
      </g>
    </svg>
  );
}
