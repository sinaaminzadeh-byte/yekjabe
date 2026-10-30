"use client";

// ── Desktop builder: TRUE 3-step wizard (owner round 30) ──
// owner round 29: قدم ۱ = انتخاب عروسک + کارت پستال (متن + استودیو ویس/عکس/
// ویدیو + نمایش نام + نگهداری پیام) · قدم ۲ = افزودنی‌ها + قلب و پنجه‌ی
// جمع‌وجور · قدم ۳ = گیرنده + سفارش‌دهنده (وریفای پیامکی) + پرداخت.
// owner round 30: دسکتاپ هم مثل موبایل مرحله‌ای شد — فقط قدمِ فعال رندر
// می‌شود + نوار مراحل کلیک‌خور بالا (DStepBar) + دکمه‌های «ذخیره و ادامه»/
// «ذخیره و تکمیل». رمز کارت حذف شد؛ پیش‌نمایش پستی جعبه بالای سبد (سایدبار)
// نشسته و در همه‌ی قدم‌ها دیده می‌شود.
import { Plush } from "../plush";
import {
  HeartSticker,
  PawIcon,
  CheckIcon,
  MinusIcon,
  PlusSmall,
  BackIcon,
  ForwardIcon,
} from "../icons";
import { MediaStudio } from "../media-studio";
import { BoxPreview } from "../box-preview";
import { navigate, useHashRoute, type Route } from "@/lib/hash-route";
import { usePishnam, useCharityDone, useOrdererVerified, type SenderDisplayMode, type RetentionPlanKey } from "@/lib/pishnam-store";
import { fa, money } from "@/lib/fa";
import { FavHeart, FavFilterChips, SurpriseButton } from "../fav";
import { MessageIdeas } from "../ideas";
import {
  PLUSHES,
  BOX_PRICE,
  OCCASIONS,
  OCCASION_HOLDERS,
  CHARITY_TARGET,
  type PlushKind,
} from "@/lib/pishnam-data";
import { PROVINCES } from "@/lib/orders/provinces";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { useGiftMessage } from "@/hooks/use-gift-message";
// A-03 (audit wave 4): shared OTP state machine + shared checkout logic —
// the desktop shell keeps its visuals; the LOGIC lives in one place now.
import { useOtp } from "@/hooks/use-otp";
import {
  evaluateCheckoutGate,
  isValidIranMobile,
  ordererPrefill,
  payNow,
} from "@/lib/shop/checkout-submit";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import type { CatalogEntry } from "@/lib/pishnam-store";
import { AttrsBlock, Gallery, entryCover } from "../gallery";

export function DesktopBuilder({ step }: { step: 1 | 2 | 3 }) {
  const kind = usePishnam((s) => s.kind);
  const setKind = usePishnam((s) => s.setKind);
  const favorites = usePishnam((s) => s.favorites);
  const [favOnly, setFavOnly] = useState(false);
  const list = favOnly ? PLUSHES.filter((p) => favorites.includes(p.kind)) : PLUSHES;
  // deep-link preselect: /pick?kind=bear (product/friends pages CTA)
  const { query } = useHashRoute();
  const qKind = query.get("kind");
  useEffect(() => {
    if (qKind && PLUSHES.some((p) => p.kind === qKind) && kind !== qKind) {
      setKind(qKind as PlushKind);
    }
  }, [qKind, kind, setKind]);
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
  // نگهداری پیام — از قدم ۳ قبلی به قدم ۱ منتقل شد (owner round 29)
  const retention = usePishnam((s) => s.retention);
  const setRetention = usePishnam((s) => s.setRetention);
  const retentionPrices = usePishnam((s) => s.retentionPrices);
  // «افزودنی‌ها» (قدم ۲)
  const catalogAddons = usePishnam((s) => s.catalogAddons);
  // سایدبار سبد — بندانگشتِ عکس ردیف‌ها از کاتالوگ (round 34)
  const catalog = usePishnam((s) => s.catalog);
  const addonLines = usePishnam((s) => s.addonLines);
  const addAddon = usePishnam((s) => s.addAddon);
  const removeAddon = usePishnam((s) => s.removeAddon);
  const loadCatalog = usePishnam((s) => s.loadCatalog);
  const user = usePishnam((s) => s.user);
  useEffect(() => {
    void loadCatalog();
  }, [loadCatalog]);
  const hearts = usePishnam((s) => s.hearts);
  const setHearts = usePishnam((s) => s.setHearts);
  const paws = usePishnam((s) => s.paws);
  const setPaws = usePishnam((s) => s.setPaws);
  // قلب قرمز/پنجه — قیمت و فعال‌بودن از تنظیمات ادمین (owner request)
  const charmPrice = usePishnam((s) => s.charmPrice);
  const charmsEnabled = usePishnam((s) => s.charmsEnabled);
  // دکمه «جزئیات» هر افزودنی → Bottom-Sheet
  const [detail, setDetail] = useState<CatalogEntry | null>(null);
  const { toast } = useToast();
  const receiver = usePishnam((s) => s.receiver);
  const setReceiver = usePishnam((s) => s.setReceiver);
  // سفارش‌دهنده — گیتِ وریفای پیامکی قبل از پرداخت (owner round)
  const ordererVerified = useOrdererVerified();
  const done = useCharityDone();
  // server quote — the only payable number (guide §4.5)
  const quote = usePishnam((s) => s.quote);
  const fetchQuote = usePishnam((s) => s.fetchQuote);
  useEffect(() => {
    void fetchQuote();
  }, [fetchQuote, kind, hearts, paws, receiver.province, addonLines, retention]);
  const total = quote?.total ?? 0;
  const sel = PLUSHES.find((p) => p.kind === kind) ?? PLUSHES[0];
  const mainCover = entryCover(catalog[kind]); // بندانگشت ردیف اصلی سبد (round 34)
  // A-03: the pay gate (valid/canPay) is shared logic now
  const gate = evaluateCheckoutGate({ receiver, ordererVerified });
  const valid = gate.receiverOk;
  const canPay = gate.canPay;

  // UX — precise missing-step hint, gentle inline validation on attempt
  const [attempted, setAttempted] = useState(false);
  const [msgTried, setMsgTried] = useState(false);
  const nameMissing = receiver.name.trim() === "";
  const phoneMissing = receiver.phone.trim().length < 8;
  const addrMissing = receiver.address.trim() === "";
  const msgMissing = message.trim() === "";
  const hintScroll = () => {
    setAttempted(true);
    if (step !== 3) {
      navigate("checkout");
      return;
    }
    document.getElementById("dstep-3")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // step-1 «ذخیره و ادامه» — مثل موبایل پیام الزامی است
  const goStep2 = () => {
    setMsgTried(true);
    if (msgMissing) {
      document.getElementById("dmsg")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    navigate("extras");
  };

  // قدم عوض شد → از بالای صفحه شروع کن (مثل موبایل)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  return (
    <div className="hidden min-h-screen bg-[#F2FAFD] md:block">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <button
          type="button"
          onClick={() => navigate("home")}
          className="flex items-center gap-2 pt-5 text-[15px] font-bold text-[#04202E] hover:text-[#006387]"
        >
          <BackIcon size={18} />
          برگشت به صفحه‌ی اصلی
        </button>
        <div className="pt-3">
          <h1 className="m-0 text-[clamp(32px,4vw,48px)] font-black leading-[1.4]">هدیه‌ت رو بساز</h1>
          <p className="mb-0 mt-2 text-[17px] font-medium leading-[1.9] text-[#1F3E4D]">
            سه تا قدم ساده؛ هر قدم یه صفحه. هر جا خواستی برگرد و عوضش کن.
          </p>
        </div>
        {/* نوار مراحل — کلیک‌خور، مثل موبایل (owner round 30) */}
        <DStepBar step={step} firstDone={!msgMissing} />
      </div>

      <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-start gap-6 px-6 pb-20 pt-6 box-border">
        {/* main column — فقط قدمِ فعال رندر می‌شود (owner round 30) */}
        <div className="flex min-w-0 flex-1 flex-col gap-5">
          {step === 1 && (
          <>
          {/* ۱ — pick + card */}
          <section
            id="dstep-1"
            className="flex flex-col gap-[18px] rounded-[32px] border border-[#DDEEF5] bg-white p-7"
          >
            <div className="flex items-center gap-3">
              <StepNum n="۱" on={step === 1} />
              <h2 className="m-0 text-2xl font-black">دوستت رو انتخاب کن</h2>
              <span className="ms-auto text-sm font-bold text-[#006387]">همه {money(BOX_PRICE)} تومان</span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <FavFilterChips favOnly={favOnly} onToggle={setFavOnly} desktop />
              <SurpriseButton desktop />
            </div>
            {favOnly && list.length === 0 ? (
              <div className="flex flex-col items-center gap-3 rounded-3xl border-[1.5px] border-dashed border-[#F7C5D3] bg-[#FFF7FA] px-6 py-10 text-center">
                <HeartSticker size={40} fill="#FFFFFF" stroke="#F0426B" strokeWidth={2.2} />
                <p className="m-0 text-[15px] font-bold text-[#B02A52]">هنوز کسی رو به قلبت اضافه نکردی!</p>
                <button
                  type="button"
                  onClick={() => setFavOnly(false)}
                  className="h-11 rounded-full bg-[#F0426B] px-6 text-[14px] font-extrabold text-white transition-transform hover:scale-[1.03] active:scale-95"
                >
                  نشون بده همه رو
                </button>
              </div>
            ) : (
            <div className="flex flex-wrap gap-3">
              {list.map((p) => {
                const isOn = p.kind === kind;
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
                    className="relative box-border flex min-w-0 cursor-pointer flex-[1_1_150px] flex-col gap-0.5 rounded-3xl bg-white p-2 pb-3 text-right outline-none transition-all focus-visible:ring-2 focus-visible:ring-[#00ABE7]"
                    style={{ border: `3px solid ${isOn ? "#00ABE7" : "#E1EFF5"}` }}
                  >
                    <FavHeart kind={p.kind} name={p.name} size={20} box={30} className="absolute start-2.5 top-2.5 z-10" />
                    <div
                      className="flex h-32 items-center justify-center rounded-2xl"
                      style={{ background: p.bg }}
                    >
                      <Plush kind={p.kind} size={112} />
                    </div>
                    <div className="pt-1.5 text-base font-extrabold">{p.name}</div>
                    <div className="text-xs font-medium text-[#4A6572]">{p.chips.join(" · ")}</div>
                    {isOn && (
                      <span className="absolute left-3.5 top-3.5 flex h-7 w-7 items-center justify-center rounded-full border-[2.5px] border-[#04202E] bg-[#00ABE7] box-border">
                        <CheckIcon size={15} stroke="#04202E" />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            )}
            <div className="rounded-3xl bg-[#F8FDFF] px-5 py-4 text-[14px] font-medium leading-[1.9] text-[#1F3E4D]">
              <b className="text-[#04202E]">{sel.name}:</b> {sel.blurb}
            </div>

            {/* ── کارت پستال (بخش دوم قدم ۱) ── */}
            <div className="mt-1 flex items-center gap-3 border-t border-[#E3F0F5] pt-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#04202E] bg-[#00ABE7] text-[17px] font-black text-[#04202E]">✉️</span>
              <h3 className="m-0 text-xl font-black">کارت پستالت رو بنویس</h3>
            </div>
            <p className="m-0 text-[13.5px] font-medium leading-[1.9] text-[#4A6572]">
              یه کارت پستال فقط با یه QR همراه جعبه می‌رسه. دوستت شماره‌ی موبایل خودش رو تأیید
              می‌کنه و پیامت — با ویس و عکس و ویدیو — رو می‌بینه.
            </p>
            <div className="flex flex-wrap gap-2">
              {OCCASIONS.map((label, i) => {
                const isOn = i === occ;
                return (
                  <button
                    key={label}
                    type="button"
                    aria-pressed={isOn}
                    onClick={() => setOcc(i)}
                    className="h-11 rounded-full px-5 text-[14.5px] font-bold"
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
            <div className="flex flex-col gap-2 rounded-3xl border-[1.5px] bg-[#F8FDFF] px-[18px] pb-3 pt-4" style={{ borderColor: msgTried && msgMissing ? "#F7C5D3" : "#CFE6EF" }}>
              <label htmlFor="dmsg" className="text-sm font-extrabold">
                پیامت <span className="text-[11px] font-bold text-[#B02A52]">الزامی</span>
                {msgTried && msgMissing && <span className="ms-2 text-[11px] font-bold text-[#B02A52]">— قبل از ادامه بنویسش</span>}
              </label>
              <textarea
                id="dmsg"
                rows={5}
                maxLength={400}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onBlur={onMessageBlur}
                placeholder={OCCASION_HOLDERS[occ]}
                className="min-h-[120px] resize-none border-none bg-transparent text-base leading-[1.95] text-[#04202E] outline-none"
              />
              <div className="flex justify-between text-[12.5px] font-semibold text-[#4A6572]">
                <span>متن، ویس، عکس یا ویدیو؛ هر چی دلت خواست</span>
                <span>{fa(message.length)} / ۴۰۰</span>
              </div>
            </div>
            <MessageIdeas occ={occ} onPick={setMessage} desktop />
            {/* استودیو هدیه — ضبط واقعی ویس/ویدیو/عکس + آپلود (owner round 29) */}
            <MediaStudio variant="desktop" />

            {/* قانون جدید رمز — خریدار رمزی وارد نمی‌کند */}
            <div className="flex items-start gap-2.5 rounded-[22px] border border-dashed border-[#BFE9CB] bg-[#F3FCF6] px-5 py-4">
              <span className="text-lg" aria-hidden="true">🔐</span>
              <div className="text-[12.5px] font-semibold leading-[1.9] text-[#177A3D]">
                <b className="font-black">رمز کارت لازم نیست وارد کنی!</b> پیامت فقط با{" "}
                <b className="font-black">تأیید شماره موبایل گیرنده</b> باز می‌شه — کد ۴ رقمی
                همون لحظه برای خودش پیامک می‌شه.
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-2">
                <span className="text-sm font-extrabold">اسم چطوری دیده بشه؟</span>
                <span className="text-[12px] font-medium leading-[1.8] text-[#4A6572]">
                  انتخابت فقط برای همین سفارشه؛ روی صفحه‌ی QR گیرنده همین‌طوری دیده می‌شه. حالت
                  ناشناس یه تغییر ظاهری نیست — اطلاعات واقعی‌ات از هیچ مسیری به گیرنده نمی‌رسه.
                </span>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      { key: "name", label: "نمایش اسمم", hint: senderName || user?.name || "اسم خودت" },
                      { key: "phrase", label: "عبارت دلخواه", hint: senderPhrase || "مثلاً: از طرف همسرت" },
                      { key: "anon", label: "کاملاً ناشناس", hint: "یه هدیه برای تو" },
                    ] as { key: SenderDisplayMode; label: string; hint: string }[]
                  ).map((opt) => {
                    const on = senderDisplay === opt.key;
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        title={opt.hint}
                        onClick={() => setSenderDisplay(opt.key)}
                        className="flex h-[46px] items-center gap-2 rounded-full border-2 px-4 text-[13.5px] font-extrabold transition-colors"
                        style={{ borderColor: on ? "#00ABE7" : "#DDEEF5", background: on ? "#E3F6FD" : "white", color: "#04202E" }}
                      >
                        {on && <CheckIcon size={14} stroke="#04202E" />}
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
                {senderDisplay === "phrase" && (
                  <div className="flex flex-col gap-2">
                    <input
                      aria-label="عبارت دلخواه"
                      type="text"
                      maxLength={40}
                      value={senderPhrase}
                      onChange={(e) => setSenderPhrase(e.target.value)}
                      placeholder="مثلاً: از طرف همسرت"
                      className="box-border h-[54px] rounded-[18px] border-[1.5px] border-[#CFE6EF] bg-white px-4 text-base text-[#04202E] outline-none focus:border-[#00ABE7]"
                    />
                    <div className="flex flex-wrap gap-1.5">
                      {["از طرف همسرت", "از طرف مامانت", "از یه دوست قدیمی"].map((p) => (
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
                  <input
                    aria-label="اسم تو"
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="اسم تو"
                    className="box-border h-[54px] rounded-[18px] border-[1.5px] border-[#CFE6EF] bg-white px-4 text-base text-[#04202E] outline-none focus:border-[#00ABE7]"
                  />
                )}
              </div>
            </div>

            {/* نگهداری پیام */}
            <div className="flex flex-col gap-2.5 rounded-3xl border border-[#DDEEF5] bg-[#F8FDFF] px-5 py-4">
              <span className="text-[16px] font-black">نگهداری پیام</span>
              <span className="text-[12.5px] font-medium leading-[1.85] text-[#4A6572]">
                پیامت (متن، ویس، عکس و ویدیو) تا وقتی که انتخاب کنی نگه داشته می‌شه؛ ساعت از روزی
                شروع می‌شه که گیرنده پیامت رو واقعاً می‌بینه — نه از روز خرید.
              </span>
              <div className="flex flex-wrap gap-2">
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
                      className="relative flex h-[64px] min-w-[150px] flex-[1_1_150px] flex-col items-center justify-center gap-0.5 rounded-[18px] border-2 transition-colors"
                      style={{ borderColor: on ? "#00ABE7" : "#DDEEF5", background: on ? "#E3F6FD" : "white" }}
                    >
                      {p.tag && (
                        <span className="absolute -top-2.5 right-1/2 translate-x-1/2 rounded-full bg-[#F0426B] px-2 py-0.5 text-[9.5px] font-extrabold text-white">{p.tag}</span>
                      )}
                      <span className="text-[14px] font-black">{p.title}</span>
                      <span className="text-[11.5px] font-bold text-[#4A6572]">{p.price === 0 ? "رایگان" : `${money(p.price)} تومان`}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* قدم ۱ footer — «ذخیره و ادامه» + برگشت (owner round 30) */}
          <div className="sticky bottom-4 z-10 flex items-center justify-between gap-4 rounded-[26px] border border-[#DDEEF5] bg-white/95 px-6 py-4 shadow-[0_18px_40px_-24px_rgba(4,32,46,0.45)] backdrop-blur">
            <button
              type="button"
              onClick={() => navigate("home")}
              className="flex items-center gap-1.5 text-[13.5px] font-bold text-[#4A6572] hover:text-[#006387]"
            >
              <BackIcon size={15} />
              خانه
            </button>
            <div className="flex items-center gap-4">
              <div className="flex flex-col text-end">
                <span className="text-[12px] font-semibold text-[#4A6572]">جعبه + کارت پستال</span>
                <span className="text-[17px] font-black">{money(BOX_PRICE)} تومان</span>
              </div>
              <button
                type="button"
                onClick={goStep2}
                className="flex h-[52px] items-center gap-2 rounded-full bg-[#00ABE7] px-7 text-[15px] font-extrabold text-[#04202E] transition-transform active:scale-95"
              >
                ذخیره و ادامه
                <ForwardIcon />
              </button>
            </div>
          </div>
          </>
          )}

          {step === 2 && (
          <>
          {/* ۲ — extras */}
          <section
            id="dstep-2"
            className="flex flex-col gap-[18px] rounded-[32px] border border-[#DDEEF5] bg-white p-7"
          >
            <div className="flex items-center gap-3">
              <StepNum n="۲" on={step === 2} />
              <h2 className="m-0 text-2xl font-black">یه ذره مهربونی اضافه کن</h2>
            </div>
            <p className="m-0 text-[15px] font-medium leading-[1.95] text-[#1F3E4D]">
              هر هدیه رو با افزودنی‌ها کامل‌تر کن؛ اگه دلت خواست، یه قلب قرمز یا پنجه هم به
              جعبه بچسبونیم. پول قلب‌ها و پنجه‌ها می‌ره برای هدیه به بچه‌های بی‌سرپرست و
              پناهگاه حیوونا.
            </p>
            {/* «افزودنی‌ها» — همراه هدیه اصلی، از مدیریت محصولات (mission §۵)
             * round 34: گرید ۳ ستونه‌ی کارت‌های مدرن — کل کارت شیت جزئیات را باز می‌کند */}
            {catalogAddons.length > 0 && (
              <div className="flex flex-col gap-3 rounded-3xl border border-[#DDEEF5] bg-[#F8FDFF] px-5 py-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-[16px] font-black">افزودنی‌ها</span>
                  <span className="text-[12px] font-bold text-[#4A6572]">کنار هدیه‌ت بذاریم تو جعبه</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {catalogAddons.map((a) => {
                    const q = addonLines.find((l) => l.variantId === a.variantId)?.qty ?? 0;
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
                        className={`relative flex cursor-pointer flex-col rounded-[24px] border-[1.5px] bg-white p-2.5 pb-3 text-right outline-none transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(4,32,46,0.07)] focus-visible:ring-2 focus-visible:ring-[#00ABE7] ${
                          on ? "border-[#00ABE7] ring-2 ring-[#00ABE7]/15" : "border-[#DDEEF5]"
                        }`}
                        style={{ opacity: out ? 0.6 : 1 }}
                      >
                        {on && (
                          <span className="absolute right-3 top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#00ABE7] shadow-[0_4px_10px_rgba(0,171,231,0.35)]">
                            <CheckIcon size={13} stroke="#fff" />
                          </span>
                        )}
                        {/* مربع عکس — گالری → عکس قدیمی → ایموجی + گرادیان */}
                        <div className="relative aspect-square overflow-hidden rounded-[20px] bg-[#F2FAFD]">
                          {cover ? (
                            <img src={cover} alt={a.name} width={96} height={96} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                          ) : (
                            <span
                              className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#E3F6FD_0%,#F7FBFD_55%,#FFF1F5_100%)] text-5xl"
                              aria-hidden="true"
                            >
                              {a.emoji || "🎁"}
                            </span>
                          )}
                          {imgs.length > 1 && (
                            <span className="absolute left-2.5 top-2.5 rounded-full bg-white/90 px-2 py-0.5 text-[10.5px] font-extrabold text-[#04202E]">
                              عکس +{fa(imgs.length - 1)}
                            </span>
                          )}
                          {out && (
                            <span className="absolute inset-0 flex items-center justify-center">
                              <span className="rounded-full bg-white/90 px-3 py-1 text-[11.5px] font-extrabold text-[#04202E]">ناموجوده</span>
                            </span>
                          )}
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col gap-1 px-0.5 pt-2.5">
                          <span className="line-clamp-2 min-h-[3em] text-[15px] font-black leading-[1.6] text-[#04202E]">{a.name}</span>
                          <div className="mt-auto flex items-end justify-between gap-1 pt-1.5">
                            {out ? (
                              <span className="pb-1.5 text-[12.5px] font-black leading-[1.6] text-[#4A6572]">فعلاً ناموجوده</span>
                            ) : (
                              <span className="flex items-baseline gap-1 pb-1.5">
                                <span className="text-[15.5px] font-black text-[#04202E]">{money(a.priceToman)}</span>
                                <span className="text-[10.5px] font-bold text-[#4A6572]">تومان</span>
                              </span>
                            )}
                            {!out &&
                              (q === 0 ? (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    addAddon(a.variantId);
                                  }}
                                  aria-label={`افزودن ${a.name} کنار هدیه`}
                                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00ABE7] text-[22px] font-black leading-none text-white transition-transform active:scale-90"
                                >
                                  +
                                </button>
                              ) : (
                                <span onClick={(e) => e.stopPropagation()}>
                                  <DC
                                    value={q}
                                    onMinus={() => (q === 1 ? removeAddon(a.variantId) : addAddon(a.variantId))}
                                    onPlus={() => addAddon(a.variantId)}
                                    plusBg="#00ABE7"
                                  />
                                </span>
                              ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* قلب قرمز و پنجه — جمع‌وجور (owner round 29: «خیلی کادر بزرگ نباشه») */}
            {charmsEnabled && (
              <div className="flex flex-col gap-2 rounded-3xl border border-[#F7C5D3] bg-[#FFF8FA] px-5 py-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-[16px] font-black">قلب قرمز و پنجه</span>
                  <span className="text-[12px] font-bold text-[#4A6572]">هر کدوم {money(charmPrice)} تومان — برای کار خیر</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="flex min-w-[300px] flex-[1_1_300px] items-center gap-3 rounded-[20px] border-[1.5px] bg-white p-2.5" style={{ borderColor: hearts > 0 ? "#F7C5D3" : "#DDEEF5" }}>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFE9F0]">
                      <HeartSticker size={26} fill="#F0426B" stroke="#04202E" strokeWidth={2.4} />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-[15px] font-black text-[#04202E]">قلب قرمز</span>
                      <span className="text-[11px] font-medium leading-[1.6] text-[#4A6572]">هدیه به بچه‌های بی‌سرپرست</span>
                    </span>
                    <span className="shrink-0 text-[11.5px] font-extrabold text-[#4A6572]">{money(charmPrice)}</span>
                    <DC value={hearts} onMinus={() => setHearts(hearts - 1)} onPlus={() => setHearts(hearts + 1)} plusBg="#F0426B" />
                  </div>
                  <div className="flex min-w-[300px] flex-[1_1_300px] items-center gap-3 rounded-[20px] border-[1.5px] bg-white p-2.5" style={{ borderColor: paws > 0 ? "#B5E3F5" : "#DDEEF5" }}>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E3F6FD]">
                      <PawIcon size={24} />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-[15px] font-black text-[#04202E]">پنجه</span>
                      <span className="text-[11px] font-medium leading-[1.6] text-[#4A6572]">هدیه به پناهگاه حیوونا</span>
                    </span>
                    <span className="shrink-0 text-[11.5px] font-extrabold text-[#4A6572]">{money(charmPrice)}</span>
                    <DC value={paws} onMinus={() => setPaws(paws - 1)} onPlus={() => setPaws(paws + 1)} plusBg="#00ABE7" />
                  </div>
                </div>
              </div>
            )}

            {/* جزئیات افزودنی — مدال وسط‌چین با گالری و مشخصات (round 34) */}
            <Sheet open={detail !== null} onOpenChange={(o) => !o && setDetail(null)}>
              <SheetContent side="bottom" className="mx-auto mb-6 max-w-lg rounded-[30px] border-[#DDEEF5] bg-white px-0 pb-6 pt-2">
                {detail && (
                  <div className="flex max-h-[76vh] flex-col gap-4 overflow-y-auto px-7 pt-2 text-right">
                    <span className="mx-auto h-1.5 w-12 rounded-full bg-[#DDEEF5]" aria-hidden="true" />
                    {/* گالری: عکس‌های محصول → عکس قدیمی → ایموجی + گرادیان پاستلی */}
                    <Gallery
                      key={detail.variantId}
                      images={detail.images?.length ? detail.images : detail.image ? [detail.image] : []}
                      name={detail.name}
                      emoji={detail.emoji}
                      rounded="rounded-[24px]"
                      thumbClass="h-16 w-16"
                    />
                    <SheetHeader className="gap-1 space-y-0 p-0 text-right">
                      <SheetTitle className="text-right text-[21px] font-black text-[#04202E]">{detail.name}</SheetTitle>
                      <SheetDescription className="text-right text-[14.5px] font-extrabold text-[#006387]">
                        {detail.inStock ? `${money(detail.priceToman)} تومان` : "فعلاً ناموجوده"}
                      </SheetDescription>
                    </SheetHeader>
                    <p className="m-0 text-[14px] font-medium leading-[2] text-[#1F3E4D]">
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
                        className="h-[52px] w-full rounded-full bg-[#00ABE7] text-[15px] font-extrabold text-[#04202E] transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(4,32,46,0.07)] active:scale-[0.98]"
                      >
                        + بذارش کنار هدیه تو جعبه
                      </button>
                    )}
                  </div>
                )}
              </SheetContent>
            </Sheet>

            <div className="flex flex-col gap-2.5 rounded-3xl border border-[#DDEEF5] bg-[#F8FDFF] px-5 py-4">
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-extrabold">اولین بسته‌ی خیریه</span>
                <span className="text-[13px] font-bold text-[#006387]">
                  {fa(done)} از {fa(CHARITY_TARGET)}
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-[#E3F0F5]">
                <div
                  className="h-3 rounded-full bg-[#00ABE7] transition-all"
                  style={{ width: `${Math.min(100, Math.round((done / CHARITY_TARGET) * 100))}%` }}
                />
              </div>
            </div>
          </section>

          {/* قدم ۲ footer — «ذخیره و تکمیل» + برگشت به قدم ۱ */}
          <div className="sticky bottom-4 z-10 flex items-center justify-between gap-4 rounded-[26px] border border-[#DDEEF5] bg-white/95 px-6 py-4 shadow-[0_18px_40px_-24px_rgba(4,32,46,0.45)] backdrop-blur">
            <button
              type="button"
              onClick={() => navigate("pick")}
              className="flex items-center gap-1.5 text-[13.5px] font-bold text-[#4A6572] hover:text-[#006387]"
            >
              <BackIcon size={15} />
              قدم قبلی
            </button>
            <div className="flex items-center gap-4">
              <div className="flex flex-col text-end">
                <span className="text-[12px] font-semibold text-[#4A6572]">هر وقت آماده بودی برو قدم آخر</span>
                <span className="text-[13px] font-bold text-[#006387]">افزودنی‌ها اختیاری‌ان</span>
              </div>
              <button
                type="button"
                onClick={() => navigate("checkout")}
                className="flex h-[52px] items-center gap-2 rounded-full bg-[#00ABE7] px-7 text-[15px] font-extrabold text-[#04202E] transition-transform active:scale-95"
              >
                ذخیره و تکمیل
                <ForwardIcon />
              </button>
            </div>
          </div>
          </>
          )}

          {step === 3 && (
          <>
          {/* ۳ — receiver + orderer + pay */}
          <section
            id="dstep-3"
            className="flex flex-col gap-[18px] rounded-[32px] border border-[#DDEEF5] bg-white p-7"
          >
            <div className="flex items-center gap-3">
              <StepNum n="۳" on={step === 3} />
              <h2 className="m-0 text-2xl font-black">گیرنده‌ی هدیه</h2>
              {valid && (
                <span className="ms-auto flex items-center gap-1.5 rounded-full bg-[#E5F8EC] px-3 py-1.5 text-[12px] font-extrabold text-[#177A3D]">
                  <CheckIcon size={13} stroke="#177A3D" />
                  کامل شد
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-3.5">
              <DField
                id="d-rc-name"
                label="نام و نام خانوادگی گیرنده"
                value={receiver.name}
                onChange={(v) => setReceiver({ name: v })}
                placeholder="مثلاً آرمان رفیقی"
                error={attempted && nameMissing ? "اسم گیرنده رو بنویس" : undefined}
              />
              <DField
                id="d-rc-phone"
                label="شماره‌ی موبایل گیرنده"
                value={receiver.phone}
                onChange={(v) => setReceiver({ phone: v })}
                placeholder="۰۹۱۲ ۱۲۳ ۴۵۶۷"
                tel
                error={attempted && phoneMissing ? "شماره‌ی موبایل گیرنده رو کامل کن" : undefined}
              />
              <div className="flex min-w-0 flex-[1_1_240px] flex-col gap-1.5">
                <label className="text-[13px] font-bold text-[#4A6572]">استان</label>
                <select
                  value={receiver.province}
                  onChange={(e) => setReceiver({ province: e.target.value })}
                  className="box-border h-[52px] rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-4 text-base font-semibold text-[#04202E] outline-none focus:border-[#00ABE7]"
                >
                  {PROVINCES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <DField label="شهر" value={receiver.city} onChange={(v) => setReceiver({ city: v })} placeholder="مثلاً تهران" />
              <div className="flex min-w-0 flex-[1_1_240px] flex-col gap-1.5">
                <label htmlFor="d-addr" className="text-[13px] font-bold text-[#4A6572]">آدرس کامل</label>
                <textarea
                  id="d-addr"
                  rows={2}
                  value={receiver.address}
                  onChange={(e) => setReceiver({ address: e.target.value })}
                  placeholder="خیابان، کوچه، پلاک، واحد"
                  className="box-border resize-none rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-4 py-2.5 text-base leading-[1.8] text-[#04202E] outline-none focus:border-[#00ABE7]"
                />
                {attempted && addrMissing && <div className="text-[11px] font-bold text-[#B02A52]">آدرس گیرنده رو کامل کن</div>}
              </div>
            </div>
            <div className="flex items-start gap-2 text-[12.5px] font-semibold leading-[1.9] text-[#4A6572]">
              <span aria-hidden="true">🤫</span>
              <span>اسم و شماره‌ی تو فقط پیش ما می‌مونه — هیچ‌کدوم بدون اجازه‌ی تو به گیرنده نمی‌رسه.</span>
            </div>

            {/* سفارش‌دهنده + تأیید پیامکی — همان بخش قدم ۳ */}
            <DesktopOrderer />
          </section>

          {/* قدم ۳ footer — برگشت به قدم ۲ (پرداخت در سایدبار می‌ماند) */}
          <div className="sticky bottom-4 z-10 flex items-center justify-between gap-4 rounded-[26px] border border-[#DDEEF5] bg-white/95 px-6 py-4 shadow-[0_18px_40px_-24px_rgba(4,32,46,0.45)] backdrop-blur">
            <button
              type="button"
              onClick={() => navigate("extras")}
              className="flex items-center gap-1.5 text-[13.5px] font-bold text-[#4A6572] hover:text-[#006387]"
            >
              <BackIcon size={15} />
              قدم قبلی
            </button>
            <span className="flex items-center gap-2 text-[13px] font-bold text-[#006387]">
              <CheckIcon size={15} stroke="#006387" />
              پرداخت از پنل سمت چپ
            </span>
          </div>
          </>
          )}
        </div>

        {/* summary sidebar */}
        <aside className="sticky top-24 flex w-[360px] shrink-0 flex-col gap-4 self-start rounded-[32px] border border-[#DDEEF5] bg-white p-6">
          {/* پیش‌نمایش پستی جعبه — بالای سبد، مثل نسخه‌ی موبایل (owner round 29) */}
          <div>
            <div className="pb-2 text-[13.5px] font-extrabold text-[#04202E]">جعبه‌ت این‌جوری می‌رسه</div>
            <BoxPreview compact />
          </div>

          {/* قانون امنیت — گیرنده فقط با وریفای شماره می‌بیند */}
          <div className="flex items-start gap-2 rounded-[18px] border border-dashed border-[#BFE9CB] bg-[#F3FCF6] px-3.5 py-3">
            <span className="text-base" aria-hidden="true">🔒</span>
            <span className="text-[11px] font-bold leading-[1.8] text-[#177A3D]">
              اطلاعات این هدیه به‌صورت امن نگه‌داری می‌شه و فقط بعد از تأیید شماره‌ی موبایل
              گیرنده نمایش داده می‌شه.
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {/* بندانگشت‌های ۴۸px — عکس کاتالوگ → پلاش/ایموجی (round 34)؛ مبالغ دست‌نخورده */}
            <Row
              label={`${sel.name}، دوست پشمالو`}
              sub="جعبه آبی + کارت پستال QR"
              amount={quote ? money(quote.lines?.[0]?.lineToman ?? 0) : "…"}
              thumb={
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[14px]"
                  style={{ background: sel.bg }}
                >
                  {mainCover ? (
                    <img src={mainCover} alt={sel.name} width={48} height={48} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  ) : (
                    <Plush kind={sel.kind} size={34} />
                  )}
                </span>
              }
            />
            {(quote?.lines ?? []).slice(1).map((l) => {
              const entry = catalogAddons.find((x) => x.variantId === l.variantId);
              const cover = entryCover(entry);
              return (
                <Row
                  key={l.variantId}
                  label={l.productName}
                  sub={`افزودنی × ${fa(l.qty)}`}
                  amount={money(l.lineToman)}
                  thumb={
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[14px] bg-[#F2FAFD] text-xl">
                      {cover ? (
                        <img src={cover} alt={l.productName} width={48} height={48} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                      ) : (
                        <span aria-hidden="true">{entry?.emoji ?? "🎁"}</span>
                      )}
                    </span>
                  }
                />
              );
            })}
            {hearts + paws > 0 && <Row label={`قلب و پنجه × ${fa(hearts + paws)}`} sub="برای بچه‌های بی‌سرپرست و حیوونا" amount={quote ? money(quote.charms) : "…"} />}
            {quote && quote.retention > 0 && (
              <Row label={`نگهداری پیام ${quote.retentionPlan === "12m" ? "۱ ساله" : "۶ ماهه"}`} sub="ساعت از اولین نمایش موفق پیام" amount={money(quote.retention)} />
            )}
            <Row label="هزینه‌ی ارسال" sub={receiver.province === "تهران" ? "تهران" : "شهرستان"} amount={quote ? money(quote.shipping) : "…"} muted />
          </div>

          <div className="flex items-center justify-between border-t border-[#E3F0F5] pt-3.5 text-lg font-black">
            <span>جمع کل</span>
            <span>{quote ? `${money(total)} تومان` : "در حال محاسبه…"}</span>
          </div>

          <button
            type="button"
            onClick={hintScroll}
            className="flex w-full flex-col items-center gap-0.5 rounded-3xl p-4 text-center text-[13px] font-semibold leading-[1.9] transition-transform active:scale-[0.99]"
            style={{
              background: !valid ? "#FFF3C9" : ordererVerified ? "#E3F6FD" : "#FFF3C9",
              color: !valid ? "#7A5C00" : ordererVerified ? "#006387" : "#7A5C00",
            }}
          >
            {!valid ? (
              nameMissing ? (
                <span>اسم گیرنده رو بنویس (قدم ۳)</span>
              ) : phoneMissing ? (
                <span>شماره‌ی موبایل گیرنده رو کامل کن (قدم ۳)</span>
              ) : addrMissing ? (
                <span>آدرس گیرنده رو کامل کن (قدم ۳)</span>
              ) : (
                <span>برای پرداخت، اسم، موبایل و آدرس گیرنده (قدم ۳) رو کامل کن.</span>
              )
            ) : ordererVerified ? (
              <span>همه‌چیز آماده‌ست! «پرداخت» رو بزن تا هدیه راه بیفته.</span>
            ) : (
              <span>فقط یک قدم مونده: تو همین بخش، شماره موبایلت رو با کد پیامکی تأیید کن.</span>
            )}
            {!canPay && (
              <span className="text-[11px] font-extrabold opacity-80" aria-hidden="true">
                برو ↑
              </span>
            )}
          </button>

          <button
            type="button"
            disabled={!canPay || !quote}
            onClick={payNow}
            className="flex h-[56px] items-center justify-center gap-2 rounded-full text-base font-extrabold transition-all active:scale-95"
            style={{ background: canPay && quote ? "#00ABE7" : "#CFE6EF", color: "#04202E", opacity: canPay && quote ? 1 : 0.75, cursor: canPay && quote ? "pointer" : "not-allowed" }}
          >
            پرداخت و فرستادن
            <HeartSticker size={20} fill="#04202E" stroke="none" />
          </button>
          <button
            type="button"
            onClick={() => navigate("impact")}
            className="text-center text-[13px] font-bold text-[#006387] hover:underline"
          >
            گزارش مهربونی‌ها ›
          </button>
        </aside>
      </div>
    </div>
  );
}

function StepNum({ n, on }: { n: string; on: boolean }) {
  return (
    <span
      className="box-border flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[17px] font-black"
      style={{
        background: on ? "#00ABE7" : "#CFE6EF",
        border: "2.5px solid #04202E",
      }}
    >
      {n}
    </span>
  );
}

/* ── نوار مراحل دسکتاپ — کلیک‌خور، با تیکِ قدم‌های انجام‌شده (owner round 30).
 * مثل StepBar موبایل «قدم فعال» را نشان می‌دهد ولی به سبک دسکتاپ: دایره +
 * برچسب + خط اتصال؛ قدم‌های قبلی قابل کلیک‌اند برای برگشت. */
function DStepBar({ step, firstDone }: { step: 1 | 2 | 3; firstDone: boolean }) {
  const STEPS: { n: 1 | 2 | 3; label: string; route: Route }[] = [
    { n: 1, label: "عروسک و کارت پستال", route: "pick" },
    { n: 2, label: "افزودنی‌ها", route: "extras" },
    { n: 3, label: "گیرنده و پرداخت", route: "checkout" },
  ];
  return (
    <nav aria-label="مراحل ساخت هدیه" className="mt-5 flex items-center gap-2 rounded-[24px] border border-[#DDEEF5] bg-white px-5 py-4">
      {STEPS.map((s, i) => {
        const active = step === s.n;
        const done = step > s.n || (s.n === 1 && firstDone);
        const clickable = s.n !== step;
        return (
          <div key={s.n} className="flex min-w-0 flex-1 items-center gap-2">
            {i > 0 && <span className="h-[3px] min-w-4 flex-1 rounded-full" style={{ background: step > s.n - 1 ? "#00ABE7" : "#CFE6EF" }} aria-hidden="true" />}
            <button
              type="button"
              aria-current={active ? "step" : undefined}
              onClick={() => clickable && navigate(s.route)}
              className="flex min-w-0 items-center gap-2.5 rounded-full py-1 pe-3 ps-1 transition-colors"
              style={{ background: active ? "#E3F6FD" : "transparent", cursor: clickable ? "pointer" : "default" }}
            >
              <span
                className="box-border flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[15px] font-black"
                style={{
                  background: active ? "#00ABE7" : done ? "#DDF3EA" : "#CFE6EF",
                  border: active || done ? "2.5px solid #04202E" : "2.5px solid #B9D4E0",
                  color: "#04202E",
                }}
              >
                {done && !active ? <CheckIcon size={15} stroke="#177A3D" /> : s.n === 1 ? "۱" : s.n === 2 ? "۲" : "۳"}
              </span>
              <span className="flex flex-col items-start leading-tight">
                <span className="text-[10.5px] font-bold text-[#4A6572]">قدم {s.n === 1 ? "۱" : s.n === 2 ? "۲" : "۳"}</span>
                <span className="whitespace-nowrap text-[13.5px] font-extrabold" style={{ color: active ? "#006387" : "#04202E" }}>
                  {s.label}
                </span>
              </span>
            </button>
          </div>
        );
      })}
    </nav>
  );
}

function DC({ value, onMinus, onPlus, plusBg }: { value: number; onMinus: () => void; onPlus: () => void; plusBg: string }) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-white p-1">
      <button type="button" aria-label="یکی کم کن" onClick={onMinus} className="flex h-10 w-10 items-center justify-center rounded-full border-none bg-[#F2FAFD]">
        <MinusIcon />
      </button>
      <span className="min-w-[34px] text-center text-lg font-black">{fa(value)}</span>
      <button type="button" aria-label="یکی زیاد کن" onClick={onPlus} className="flex h-10 w-10 items-center justify-center rounded-full border-none" style={{ background: plusBg }}>
        <PlusSmall stroke={plusBg === "#F0426B" ? "#fff" : "#04202E"} />
      </button>
    </div>
  );
}

function DField({ label, value, onChange, placeholder, tel, className, id, error }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; tel?: boolean; className?: string; id?: string; error?: string }) {
  return (
    <div className={`flex min-w-0 flex-[1_1_240px] flex-col gap-1.5 ${className ?? ""}`}>
      <label htmlFor={id} className="text-[13px] font-bold text-[#4A6572]">{label}</label>
      <input
        id={id}
        type={tel ? "tel" : "text"}
        inputMode={tel ? "numeric" : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="box-border h-[52px] rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-4 text-base text-[#04202E] outline-none focus:border-[#00ABE7]"
      />
      {error && <div className="text-[11px] font-bold text-[#B02A52]">{error}</div>}
    </div>
  );
}

function Row({ label, sub, amount, muted, thumb }: { label: string; sub?: string; amount: string; muted?: boolean; thumb?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2.5">
        {thumb}
        <div className="flex min-w-0 flex-col">
          <span className="text-[14px] font-extrabold">{label}</span>
          {sub && <span className="text-[11.5px] font-medium text-[#4A6572]">{sub}</span>}
        </div>
      </div>
      <span className={`text-[13.5px] font-extrabold ${muted ? "text-[#4A6572]" : ""}`}>{amount}</span>
    </div>
  );
}

/* ── سفارش‌دهنده (داخل قدم ۳): نام + موبایل خود مشتری، با تأیید پیامکی ──
 * همان قانون موبایل: شماره سفارش‌دهنده مستقل از گیرنده است و تا تأیید
 * موفق، دکمه‌ی پرداخت در سایدبار قفل می‌ماند (سرور هم مستقل گارت می‌کند).
 */
function DesktopOrderer() {
  const orderer = usePishnam((s) => s.orderer);
  const setOrderer = usePishnam((s) => s.setOrderer);
  const user = usePishnam((s) => s.user);
  const login = usePishnam((s) => s.login);
  const verified = useOrdererVerified();
  const { toast } = useToast();

  // prefill از حساب کاربری زنده — همان قانون موبایل (A-03: shared rule)
  const prefilled = useRef(false);
  useEffect(() => {
    if (prefilled.current) return;
    const pre = ordererPrefill(orderer, user);
    if (pre) {
      setOrderer(pre);
      prefilled.current = true;
    }
  }, [user, orderer, setOrderer]);

  // A-03: shared OTP machine — same contract as the mobile flow
  const [phase, setPhase] = useState<"idle" | "code">("idle");
  const otp = useOtp({
    purpose: "checkout_orderer",
    onSuccess: (res) => {
      login(res.user.phone || orderer.phone, res.user.name || orderer.name.trim());
      setPhase("idle");
      toast({ title: "شماره‌ت تأیید شد ✓", description: "حسابت آماده‌ست و این سفارش به همون ثبت می‌شه." });
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
    <div className="flex flex-col gap-[18px] border-t border-[#E3F0F5] pt-5">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#04202E] bg-[#00ABE7] text-[17px] font-black text-[#04202E]">🙋</span>
        <h3 className="m-0 text-xl font-black">اطلاعات سفارش‌دهنده</h3>
        <span className="ms-auto rounded-full bg-[#E3F6FD] px-3 py-1.5 text-[12px] font-extrabold text-[#006387]">همینه که خرید می‌کنه</span>
      </div>
      <p className="m-0 text-[14px] font-medium leading-[1.9] text-[#4A6572]">
        سفارش به اسم خودت ثبت می‌شه — شماره‌ت می‌تونه با شماره گیرنده فرق کنه (هدیه برای دیگری).
        قبل از پرداخت، شماره‌ت رو با یه کد پیامکی تأیید می‌کنیم؛ حساب کاربریت هم همین‌جا خودکار ساخته می‌شه.
      </p>
      <div className="flex flex-wrap gap-3.5">
        <DField label="نام و نام خانوادگی" value={orderer.name} onChange={(v) => setOrderer({ name: v })} placeholder="مثلاً سارا محمدی" className="min-w-[240px] flex-1" />
        <DField label="شماره موبایل سفارش‌دهنده" value={orderer.phone} onChange={(v) => setOrderer({ phone: v })} placeholder="۰۹۱۲ ۱۲۳ ۴۵۶۷" tel />
      </div>

      <div>
        {verified ? (
          <div className="flex items-center gap-2 rounded-2xl bg-[#E7F8EF] px-5 py-3.5 text-[14px] font-extrabold text-[#1E7A46]">
            <CheckIcon size={18} stroke="#1E7A46" />
            <span>شماره‌ت تأیید شد — سفارش به حساب کاربریت ثبت می‌شه و بعد از خرید لاگین می‌مونی.</span>
          </div>
        ) : phase === "code" ? (
          <div className="flex flex-col gap-3 rounded-2xl border border-[#DDEEF5] bg-[#F8FDFF] p-5">
            <span className="text-[14px] font-bold text-[#04202E]">
              کد ۴ رقمی پیامک‌شده به <b dir="ltr">{orderer.phone}</b> رو بزن:
            </span>
            <div className="flex flex-row-reverse justify-end gap-2" dir="ltr">
              {otp.code
                .replace(/\D/g, "")
                .slice(0, 4)
                .padEnd(4, " ")
                .split("")
                .map((c, i) => (
                  <input
                    key={i}
                    inputMode="numeric"
                    autoComplete={i === 0 ? "one-time-code" : "off"}
                    maxLength={1}
                    disabled={otp.busy}
                    aria-label={`رقم ${fa(i + 1)} از کد تأیید`}
                    value={c.trim()}
                    onChange={(e) => {
                      const ch = e.target.value.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/\D/g, "").slice(-1);
                      if (ch) {
                        const cur = otp.code.replace(/\D/g, "").slice(0, 4).split("");
                        cur[i] = ch;
                        otp.setCode(cur.join("").replace(/\s/g, ""));
                        document.getElementById(`dstep5-otp-${Math.min(3, i + 1)}`)?.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") void submitCode();
                    }}
                    id={`dstep5-otp-${i}`}
                    className="h-14 w-12 rounded-[16px] border-2 border-[#CFE6EF] bg-white text-center text-xl font-black text-[#04202E] outline-none focus:border-[#00ABE7] disabled:opacity-60"
                  />
                ))}
            </div>
            {otp.devCode && (
              <span className="self-start rounded-xl bg-[#FFF3C9] px-2.5 py-1 text-[12px] font-extrabold text-[#7A5C00]">
                کد آزمایشی (محیط توسعه): {fa(otp.devCode)}
              </span>
            )}
            {otp.err && <span className="text-[13px] font-bold text-[#B02A52]">{otp.err}</span>}
            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={otp.busy}
                onClick={() => void submitCode()}
                className="flex h-[48px] items-center justify-center rounded-full bg-[#04202E] px-8 text-[14px] font-extrabold text-white transition-transform active:scale-95 disabled:opacity-60"
              >
                {otp.busy ? "در حال تأیید…" : "تأیید و ادامه"}
              </button>
              <button
                type="button"
                disabled={otp.busy || otp.resendIn > 0}
                onClick={() => void requestCode()}
                className="h-[48px] rounded-full border border-[#CFE6EF] px-5 text-[13px] font-bold text-[#006387] disabled:opacity-50"
              >
                {otp.resendIn > 0 ? `ارسال دوباره تا ${fa(otp.resendIn)} ثانیه` : "ارسال دوباره کد"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPhase("idle");
                  otp.reset();
                }}
                className="text-[13px] font-bold text-[#006387] underline underline-offset-4"
              >
                تغییر شماره
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-start gap-3 rounded-2xl border border-[#DDEEF5] bg-[#F8FDFF] p-5">
            <span className="flex items-center gap-2 text-[14px] font-semibold leading-[1.9] text-[#4A6572]">
              <span aria-hidden="true">📱</span>
              <span>قبل از پرداخت، شماره‌ات رو با یه کد پیامکی تأیید کن — نه رمزی، نه فرم اضافه.</span>
            </span>
            {otp.err && <span className="text-[13px] font-bold text-[#B02A52]">{otp.err}</span>}
            <button
              type="button"
              disabled={!phoneReady || !nameReady || otp.busy}
              onClick={() => void requestCode()}
              className="h-[48px] rounded-full border-2 border-[#04202E] px-7 text-[14px] font-extrabold text-[#04202E] transition-transform active:scale-95 disabled:border-[#CFE6EF] disabled:text-[#7C99A7]"
            >
              {otp.busy ? "در حال ارسال…" : "دریافت کد تأیید"}
            </button>
            {(!phoneReady || !nameReady) && (
              <span className="text-[12.5px] font-semibold text-[#7C99A7]">نام و نام خانوادگی و شماره موبایل خودت رو کامل کن</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// route type import used for nav helper typing
export type { Route };
