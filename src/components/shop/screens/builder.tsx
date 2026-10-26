"use client";

// ── Desktop builder: all 4 steps on one page (step highlights by route) ──
import { Plush } from "../plush";
import {
  HeartSticker,
  PawIcon,
  PhotoIcon,
  VideoIcon,
  CheckIcon,
  MinusIcon,
  PlusSmall,
  BackIcon,
} from "../icons";
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
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import type { CatalogEntry } from "@/lib/pishnam-store";

/** Desktop message-media picker — photos/video/voice, private & per-gift. */
function DesktopMediaPicker() {
  const mediaFiles = usePishnam((s) => s.mediaFiles);
  const addMediaFile = usePishnam((s) => s.addMediaFile);
  const removeMediaFile = usePishnam((s) => s.removeMediaFile);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  return (
    <div className="flex flex-col gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,audio/mpeg,audio/mp4,audio/wav,audio/ogg,audio/webm"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) {
            const r = addMediaFile(f);
            if (!r.ok) {
              toast({
                title: r.error === "file_too_large" ? "حجم فایل بیشتر از ۱۰ مگابایته" : r.error === "too_many_files" ? "بیشتر از ۳ فایل نمی‌شه" : "این فرمت قبول نیست",
                description: "عکس JPG/PNG/WebP، ویدیو MP4/WebM یا صدای MP3/WAV/M4A",
              });
            }
          }
          e.target.value = "";
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="box-border flex h-[84px] w-full items-center justify-center gap-2.5 rounded-[22px] border-2 border-dashed border-[#00ABE7] bg-[#E3F6FD] text-[15px] font-bold text-[#04202E]"
      >
        <PhotoIcon size={26} />
        افزودن عکس، ویدیو یا ویس (حداکثر ۳ فایل)
      </button>
      {mediaFiles.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {mediaFiles.map((m) => (
            <span key={m.id} className="flex items-center gap-2 rounded-full border border-[#CFE6EF] bg-white px-3 py-1.5">
              <span aria-hidden="true">{m.kind === "image" ? "🖼️" : m.kind === "video" ? "🎬" : "🎙️"}</span>
              <span className="max-w-[220px] truncate text-[12px] font-bold" dir="ltr">{m.name}</span>
              <button type="button" aria-label={`حذف ${m.name}`} onClick={() => removeMediaFile(m.id)} className="text-[11px] font-extrabold text-[#B02A52]">
                حذف
              </button>
            </span>
          ))}
        </div>
      )}
      <span className="text-[11.5px] font-medium leading-[1.8] text-[#4A6572]">
        فایل‌ها خصوصی ذخیره می‌شن و فقط گیرنده‌ی تأییدشده می‌بینه؛ بعد از پایان مهلت نگهداری کامل حذف می‌شن.
      </span>
    </div>
  );
}

export function DesktopBuilder({ step }: { step: 1 | 2 | 3 | 4 }) {
  const kind = usePishnam((s) => s.kind);
  const setKind = usePishnam((s) => s.setKind);
  const favorites = usePishnam((s) => s.favorites);
  const [favOnly, setFavOnly] = useState(false);
  const list = favOnly ? PLUSHES.filter((p) => favorites.includes(p.kind)) : PLUSHES;
  // deep-link preselect: #/pick?kind=bear (product/friends pages CTA)
  const { query } = useHashRoute();
  const qKind = query.get("kind");
  useEffect(() => {
    if (qKind && PLUSHES.some((p) => p.kind === qKind) && kind !== qKind) {
      setKind(qKind as PlushKind);
    }
  }, [qKind, kind, setKind]);
  const occ = usePishnam((s) => s.occasion);
  const setOcc = usePishnam((s) => s.setOccasion);
  const message = usePishnam((s) => s.message);
  const setMessage = usePishnam((s) => s.setMessage);
  const senderDisplay = usePishnam((s) => s.senderDisplay);
  const setSenderDisplay = usePishnam((s) => s.setSenderDisplay);
  const senderPhrase = usePishnam((s) => s.senderPhrase);
  const setSenderPhrase = usePishnam((s) => s.setSenderPhrase);
  const senderName = usePishnam((s) => s.senderName);
  const setSenderName = usePishnam((s) => s.setSenderName);
  const cardPassword = usePishnam((s) => s.cardPassword);
  const setCardPassword = usePishnam((s) => s.setCardPassword);
  // «افزودنی‌ها» + نگهداری (desktop steps 3)
  const catalogAddons = usePishnam((s) => s.catalogAddons);
  const addonLines = usePishnam((s) => s.addonLines);
  const addAddon = usePishnam((s) => s.addAddon);
  const removeAddon = usePishnam((s) => s.removeAddon);
  const retention = usePishnam((s) => s.retention);
  const setRetention = usePishnam((s) => s.setRetention);
  const retentionPrices = usePishnam((s) => s.retentionPrices);
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
  // دکمه «جزئیات» هر افزودنی → Bottom-Sheet آیفونی
  const [detail, setDetail] = useState<CatalogEntry | null>(null);
  const { toast } = useToast();
  const receiver = usePishnam((s) => s.receiver);
  const setReceiver = usePishnam((s) => s.setReceiver);
  // سفارش‌دهنده — گیتِ وریفای پیامکی قبل از پرداخت (owner round)
  const ordererVerified = useOrdererVerified();
  const nextNo = usePishnam((s) => s.nextNo);
  const done = useCharityDone();
  // server quote — the only payable number (guide §4.5)
  const quote = usePishnam((s) => s.quote);
  const fetchQuote = usePishnam((s) => s.fetchQuote);
  useEffect(() => {
    void fetchQuote();
  }, [fetchQuote, kind, hearts, paws, receiver.province, addonLines, retention]);
  const total = quote?.total ?? 0;
  const sel = PLUSHES.find((p) => p.kind === kind) ?? PLUSHES[0];
  const valid = receiver.name.trim() !== "" && receiver.phone.trim().length >= 8 && receiver.address.trim() !== "";
  const canPay = valid && ordererVerified;

  // UX borrowed from design-checkout style 2 — precise missing-step hint,
  // gentle inline validation on attempt, completion chip. No UI/structure change.
  const [attempted, setAttempted] = useState(false);
  const nameMissing = receiver.name.trim() === "";
  const phoneMissing = receiver.phone.trim().length < 8;
  const addrMissing = receiver.address.trim() === "";
  const hintTarget = !valid ? "dstep-4" : "dstep-5";
  const hintScroll = () => {
    setAttempted(true);
    document.getElementById(hintTarget)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // scroll the active section into view when the step route changes
  useEffect(() => {
    const el = document.getElementById(`dstep-${step}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
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
            چهار تا قدم، همه تو یه صفحه. هر جا خواستی برگرد و عوضش کن.
          </p>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-start gap-6 px-6 pb-20 pt-6 box-border">
        {/* main column */}
        <div className="flex min-w-0 flex-1 flex-col gap-5">
          {/* 1 pick */}
          <section
            id="dstep-1"
            className="flex flex-col gap-[18px] rounded-[32px] border bg-white p-7 transition-shadow"
            style={{ borderColor: step === 1 ? "#00ABE7" : "#DDEEF5", boxShadow: step === 1 ? "0 0 0 3px rgba(0,171,231,0.18)" : undefined }}
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
          </section>

          {/* 2 card */}
          <section
            id="dstep-2"
            className="flex flex-col gap-[18px] rounded-[32px] border bg-white p-7"
            style={{ borderColor: step === 2 ? "#00ABE7" : "#DDEEF5", boxShadow: step === 2 ? "0 0 0 3px rgba(0,171,231,0.18)" : undefined }}
          >
            <div className="flex items-center gap-3">
              <StepNum n="۲" on={step === 2} />
              <h2 className="m-0 text-2xl font-black">کارت پستالت رو بنویس</h2>
            </div>
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
            <div className="flex flex-col gap-2 rounded-3xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-[18px] pb-3 pt-4">
              <label htmlFor="dmsg" className="text-sm font-extrabold">
                پیامت
              </label>
              <textarea
                id="dmsg"
                rows={5}
                maxLength={400}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={OCCASION_HOLDERS[occ]}
                className="min-h-[120px] resize-none border-none bg-transparent text-base leading-[1.95] text-[#04202E] outline-none"
              />
              <div className="flex justify-between text-[12.5px] font-semibold text-[#4A6572]">
                <span>متن، عکس یا ویدیو؛ هر چی دلت خواست</span>
                <span>{fa(message.length)} / ۴۰۰</span>
              </div>
            </div>
            <MessageIdeas occ={occ} onPick={setMessage} desktop />
            {/* پیامِ رسانه‌ای واقعی — عکس/ویدیو/ویس خصوصی (mission §۱/§۴) */}
            <DesktopMediaPicker />
            <div className="flex flex-wrap gap-4">
              <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-2">
                <label htmlFor="dpw" className="text-sm font-extrabold">
                  رمز کارت
                </label>
                <input
                  id="dpw"
                  type="text"
                  value={cardPassword}
                  onChange={(e) => setCardPassword(e.target.value)}
                  placeholder="مثلاً اسم اولین جایی که با هم رفتید"
                  className="box-border h-[54px] rounded-[18px] border-[1.5px] border-[#CFE6EF] bg-white px-4 text-base text-[#04202E] outline-none focus:border-[#00ABE7]"
                />
                <span className="text-[12.5px] font-medium leading-[1.8] text-[#4A6572]">
                  فقط کسی که رمز رو بدونه، پیامت رو می‌بینه.
                </span>
              </div>
              <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-2">
                <span className="text-sm font-extrabold">اسم چطوری دیده بشه؟</span>
                <span className="text-[12px] font-medium leading-[1.8] text-[#4A6572]">
                  انتخابت فقط برای همین سفارشه؛ حالت ناشناس یه تغییر ظاهری نیست — اطلاعات واقعی‌ات
                  از هیچ مسیری به گیرنده نمی‌رسه.
                </span>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      { key: "name", label: "نمایش اسمم", hint: senderName || user?.name || "اسم خودت" },
                      { key: "phrase", label: "عبارت دلخواه", hint: senderPhrase || "مثلاً: از طرف همسرت" },
                      { key: "anon", label: "کاملاً ناشناس", hint: "یک هدیه برای تو" },
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
          </section>

          {/* 3 extras */}
          <section
            id="dstep-3"
            className="flex flex-col gap-[18px] rounded-[32px] border bg-white p-7"
            style={{ borderColor: step === 3 ? "#00ABE7" : "#DDEEF5", boxShadow: step === 3 ? "0 0 0 3px rgba(0,171,231,0.18)" : undefined }}
          >
            <div className="flex items-center gap-3">
              <StepNum n="۳" on={step === 3} />
              <h2 className="m-0 text-2xl font-black">یه ذره مهربونی اضافه کن</h2>
            </div>
            <p className="m-0 text-[15px] font-medium leading-[1.95] text-[#1F3E4D]">
              هر هدیه رو با افزودنی‌ها کامل‌تر کن؛ اگه دلت خواست، یه قلب قرمز یا پنجه هم به
              جعبه بچسبونیم. پول قلب‌ها و پنجه‌ها می‌ره برای هدیه به بچه‌های بی‌سرپرست و
              پناهگاه حیوونا.
            </p>
            {/* «افزودنی‌ها» — همراه هدیه اصلی، از مدیریت محصولات (mission §۵) */}
            {catalogAddons.length > 0 && (
              <div className="flex flex-col gap-2.5 rounded-3xl border border-[#DDEEF5] bg-white px-5 py-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-[16px] font-black">افزودنی‌ها</span>
                  <span className="text-[12px] font-bold text-[#4A6572]">کنار هدیه‌ت بذاریم تو جعبه</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {catalogAddons.map((a) => {
                    const q = addonLines.find((l) => l.variantId === a.variantId)?.qty ?? 0;
                    const out = !a.inStock;
                    return (
                      <div
                        key={a.variantId}
                        className="flex min-w-[240px] flex-[1_1_240px] items-center gap-3 rounded-[20px] border-[1.5px] px-3.5 py-3"
                        style={{ borderColor: q > 0 ? "#00ABE7" : "#DDEEF5", opacity: out ? 0.55 : 1 }}
                      >
                        <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center overflow-hidden rounded-[16px] bg-[#F2FAFD] text-2xl">
                          {a.image ? (
                             
                            <img src={a.image} alt={a.name} className="h-full w-full object-cover" />
                          ) : (
                            <span aria-hidden="true">{a.emoji || "🎁"}</span>
                          )}
                        </span>
                        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                          <span className="text-[14.5px] font-extrabold">{a.name}</span>
                          <span className="text-[12px] font-bold text-[#4A6572]">{out ? "ناموجود" : `${money(a.priceToman)} تومان`}</span>
                          <button
                            type="button"
                            onClick={() => setDetail(a)}
                            className="w-fit text-[11.5px] font-extrabold text-[#006387] underline underline-offset-4"
                          >
                            جزئیات و عکس
                          </button>
                        </div>
                        {out ? (
                          <span className="rounded-full bg-[#F2FAFD] px-3 py-1.5 text-[11px] font-extrabold text-[#4A6572]">ناموجوده</span>
                        ) : q === 0 ? (
                          <button type="button" onClick={() => addAddon(a.variantId)} className="h-10 rounded-full bg-[#00ABE7] px-4 text-[12.5px] font-extrabold text-[#04202E]">
                            + اضافه کن
                          </button>
                        ) : (
                          <DC
                            value={q}
                            onMinus={() => (q === 1 ? removeAddon(a.variantId) : addAddon(a.variantId))}
                            onPlus={() => addAddon(a.variantId)}
                            plusBg="#00ABE7"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}



            {/* قلب قرمز و پنجه — جدا از افزودنی‌ها، زیرشان؛ کنترل از تب تنظیمات ادمین */}
            {charmsEnabled && (
              <div className="flex flex-col gap-2.5 rounded-3xl border border-[#F7C5D3] bg-[#FFF8FA] px-5 py-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-[16px] font-black">قلب قرمز و پنجه</span>
                  <span className="text-[12px] font-bold text-[#4A6572]">هر کدوم {money(charmPrice)} تومان — برای کار خیر</span>
                </div>
<div className="flex flex-wrap gap-3.5">
              <div className="box-border flex min-w-0 flex-[1_1_280px] flex-col gap-3.5 rounded-[26px] border-[1.5px] border-[#F7C5D3] bg-[#FFE9F0] p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
                    <HeartSticker size={32} fill="#F0426B" stroke="#04202E" strokeWidth={2.4} />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[17px] font-black">قلب قرمز</span>
                    <span className="text-[12.5px] font-medium text-[#1F3E4D]">برای بچه‌های بی‌سرپرست</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[13.5px] font-bold">هر کدوم {money(charmPrice)} تومان</span>
                  <DC
                    value={hearts}
                    onMinus={() => setHearts(hearts - 1)}
                    onPlus={() => setHearts(hearts + 1)}
                    plusBg="#F0426B"
                  />
                </div>
              </div>
              <div className="box-border flex min-w-0 flex-[1_1_280px] flex-col gap-3.5 rounded-[26px] border-[1.5px] border-[#B5E3F5] bg-[#E3F6FD] p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
                    <PawIcon size={30} />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[17px] font-black">پنجه</span>
                    <span className="text-[12.5px] font-medium text-[#1F3E4D]">برای پناهگاه حیوونا</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[13.5px] font-bold">هر کدوم {money(charmPrice)} تومان</span>
                  <DC
                    value={paws}
                    onMinus={() => setPaws(paws - 1)}
                    onPlus={() => setPaws(paws + 1)}
                    plusBg="#00ABE7"
                  />
                </div>
              </div>
            </div>
              </div>
            )}

            {/* جزئیات افزودنی — Bottom-Sheet آیفونی (owner request) */}
            <Sheet open={detail !== null} onOpenChange={(o) => !o && setDetail(null)}>
              <SheetContent side="bottom" className="rounded-t-[30px] border-[#DDEEF5] bg-white px-0 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2">
                {detail && (
                  <div className="flex flex-col gap-4 px-6 pt-2 text-right">
                    <span className="mx-auto h-1.5 w-12 rounded-full bg-[#DDEEF5]" aria-hidden="true" />
                    <div className="flex h-[190px] items-center justify-center overflow-hidden rounded-[24px] bg-[#F2FAFD]">
                      {detail.image ? (
                         
                        <img src={detail.image} alt={detail.name} className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-6xl" aria-hidden="true">{detail.emoji || "🎁"}</span>
                      )}
                    </div>
                    <SheetHeader className="gap-1 space-y-0 p-0 text-right">
                      <SheetTitle className="text-right text-[20px] font-black text-[#04202E]">{detail.name}</SheetTitle>
                      <SheetDescription className="text-right text-[14px] font-extrabold text-[#006387]">
                        {detail.inStock ? `${money(detail.priceToman)} تومان` : "فعلاً ناموجوده"}
                      </SheetDescription>
                    </SheetHeader>
                    <p className="m-0 text-[13.5px] font-medium leading-[2] text-[#1F3E4D]">
                      {detail.description || "برای این افزودنی هنوز توضیحی ثبت نشده — سوالی داری قبل از خرید بهمون پیام بده."}
                    </p>
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

            {/* پلن نگهداری پیام (mission §۴) */}
            <div className="flex flex-col gap-2.5 rounded-3xl border border-[#DDEEF5] bg-[#F8FDFF] px-5 py-4">
              <span className="text-[16px] font-black">نگهداری پیام</span>
              <span className="text-[12.5px] font-medium leading-[1.85] text-[#4A6572]">
                پیامت (متن، عکس و ویس) تا وقتی که انتخاب کنی نگه داشته می‌شه؛ ساعت از روزی شروع
                می‌شه که گیرنده پیامت رو واقعاً می‌بینه — نه از روز خرید.
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

          {/* 4 receiver */}
          <section
            id="dstep-4"
            className="flex flex-col gap-[18px] rounded-[32px] border bg-white p-7"
            style={{ borderColor: step === 4 ? "#00ABE7" : "#DDEEF5", boxShadow: step === 4 ? "0 0 0 3px rgba(0,171,231,0.18)" : undefined }}
          >
            <div className="flex items-center gap-3">
              <StepNum n="۴" on={step === 4} />
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
            {/* reassurance (style-2 tone) — copy only, no structure change */}
            <div className="flex items-start gap-2 text-[12.5px] font-semibold leading-[1.9] text-[#4A6572]">
              <span aria-hidden="true">🤫</span>
              <span>اسم و شماره‌ی تو فقط پیش ما می‌مونه — هیچ‌کدوم بدون اجازه‌ی تو به گیرنده نمی‌رسه.</span>
            </div>
          </section>

          {/* 5 orderer — «نام و نام خانوادگی» + موبایل خود مشتری، با تأیید پیامکی */}
          <DesktopOrderer step={step} />
        </div>

        {/* summary sidebar */}
        <aside className="sticky top-24 flex w-[360px] shrink-0 flex-col gap-4 self-start rounded-[32px] border border-[#DDEEF5] bg-white p-6">
          <div className="relative flex items-stretch overflow-hidden rounded-[24px] bg-[#00ABE7]">
            <div className="flex w-[104px] shrink-0 flex-col items-center justify-center py-4">
              <span className="text-[11px] font-bold">هدیه‌ی شماره</span>
              <span className="text-4xl font-black leading-[1.15]">{fa(nextNo)}</span>
            </div>
            <div className="my-3 w-0 border-r-2 border-dashed border-[#04202E]" />
            <div className="flex flex-1 flex-col justify-center gap-0.5 px-3.5 py-3">
              <span className="text-[14px] font-black">این شماره مال هدیه‌ی توئه</span>
              <span className="text-[11.5px] font-medium leading-[1.7]">
                روی جعبه و کارت پستال می‌شینه.
              </span>
            </div>
            <div className="absolute -top-2.5 right-[92px] h-5 w-5 rounded-full bg-white" />
            <div className="absolute -bottom-2.5 right-[92px] h-5 w-5 rounded-full bg-white" />
          </div>

          <div className="flex flex-col gap-2">
            <Row label={`${sel.name}، دوست پشمالو`} sub="جعبه‌ی کادویی + کارت پستال QR" amount={quote ? money(quote.lines?.[0]?.lineToman ?? 0) : "…"} />
            {(quote?.lines ?? []).slice(1).map((l) => (
              <Row key={l.variantId} label={l.productName} sub={`افزودنی × ${fa(l.qty)}`} amount={money(l.lineToman)} />
            ))}
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
                <span>اسم گیرنده رو بنویس (قدم ۴)</span>
              ) : phoneMissing ? (
                <span>شماره‌ی موبایل گیرنده رو کامل کن (قدم ۴)</span>
              ) : addrMissing ? (
                <span>آدرس گیرنده رو کامل کن (قدم ۴)</span>
              ) : (
                <span>برای پرداخت، اسم، موبایل و آدرس گیرنده (قدم ۴) رو کامل کن.</span>
              )
            ) : ordererVerified ? (
              <span>همه‌چیز آماده‌ست! «پرداخت» رو بزن تا هدیه راه بیفته.</span>
            ) : (
              <span>فقط یک قدم مونده: تو قدم ۵، شماره موبایلت رو با کد پیامکی تأیید کن.</span>
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
            onClick={() => window.dispatchEvent(new CustomEvent("pishnam:pay"))}
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

function DC({ value, onMinus, onPlus, plusBg }: { value: number; onMinus: () => void; onPlus: () => void; plusBg: string }) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-white p-1">
      <button type="button" aria-label="یکی کم کن" onClick={onMinus} className="flex h-11 w-11 items-center justify-center rounded-full border-none bg-[#F2FAFD]">
        <MinusIcon />
      </button>
      <span className="min-w-[38px] text-center text-xl font-black">{fa(value)}</span>
      <button type="button" aria-label="یکی زیاد کن" onClick={onPlus} className="flex h-11 w-11 items-center justify-center rounded-full border-none" style={{ background: plusBg }}>
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

function Row({ label, sub, amount, muted }: { label: string; sub?: string; amount: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex flex-col">
        <span className="text-[14px] font-extrabold">{label}</span>
        {sub && <span className="text-[11.5px] font-medium text-[#4A6572]">{sub}</span>}
      </div>
      <span className={`text-[13.5px] font-extrabold ${muted ? "text-[#4A6572]" : ""}`}>{amount}</span>
    </div>
  );
}

/* ── قدم ۵ دسکتاپ: اطلاعات سفارش‌دهنده + تأیید پیامکی شماره ──
 * همان قانون موبایل: شماره سفارش‌دهنده مستقل از گیرنده است و تا تأیید
 * موفق، دکمه‌ی پرداخت در سایدبار قفل می‌ماند (سرور هم مستقل گارت می‌کند).
 */
function DesktopOrderer({ step }: { step: number }) {
  const orderer = usePishnam((s) => s.orderer);
  const setOrderer = usePishnam((s) => s.setOrderer);
  const user = usePishnam((s) => s.user);
  const login = usePishnam((s) => s.login);
  const verified = useOrdererVerified();
  const { toast } = useToast();

  const prefilled = useRef(false);
  useEffect(() => {
    if (prefilled.current) return;
    if (user && !orderer.name) {
      setOrderer({
        name: orderer.name || user.name,
        phone: orderer.phone || user.phone,
      });
      prefilled.current = true;
    }
  }, [user, orderer.name, orderer.phone, setOrderer]);

  const [phase, setPhase] = useState<"idle" | "code">("idle");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [devCode, setDevCode] = useState("");
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  const phoneReady = /^09\d{9}$/.test(orderer.phone.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/\D/g, ""));
  const nameReady = orderer.name.trim().length >= 3;

  const requestCode = async () => {
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/auth/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: orderer.phone, purpose: "checkout_orderer" }),
      });
      const body = (await res.json().catch(() => ({}))) as { devCode?: string; error?: string; details?: { retryAfter?: number } };
      if (!res.ok) {
        if (body.error === "rate_limited") {
          setSeconds(body.details?.retryAfter ?? 60);
          setError("کد همین حالا فرستاده شده؛ چند لحظه دیگه دوباره بگیر.");
        } else {
          setError("ارسال کد نشد؛ شماره رو چک کن و دوباره بزن.");
        }
        return;
      }
      setPhase("code");
      setCode("");
      setSeconds(60);
      if (body.devCode) setDevCode(body.devCode);
    } catch {
      setError("اینترنت قطعه؛ اتصالت رو چک کن.");
    } finally {
      setBusy(false);
    }
  };

  const submitCode = async () => {
    const digits = code.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).trim();
    if (!/^\d{4}$/.test(digits)) {
      setError("کد ۴ رقمی پیامک‌شده رو کامل وارد کن.");
      return;
    }
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: orderer.phone,
          code: digits,
          purpose: "checkout_orderer",
          name: orderer.name.trim(),
        }),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; user?: { phone: string; name: string }; error?: string };
      if (!res.ok || !body.ok) {
        setError(body.error === "invalid_code" ? "کد اشتباهه یا منقضی شده؛ دوباره چک کن." : "تأیید نشد؛ چند لحظه بعد دوباره امتحان کن.");
        return;
      }
      login(body.user?.phone ?? orderer.phone, body.user?.name ?? orderer.name.trim());
      setPhase("idle");
      setDevCode("");
      toast({ title: "شماره‌ت تأیید شد ✓", description: "حسابت آماده‌ست و این سفارش به همون ثبت می‌شه." });
    } catch {
      setError("اینترنت قطعه؛ اتصالت رو چک کن.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section
      id="dstep-5"
      className="flex flex-col gap-[18px] rounded-[32px] border bg-white p-7 transition-shadow"
      style={{ borderColor: step === 5 ? "#00ABE7" : "#DDEEF5", boxShadow: step === 5 ? "0 0 0 3px rgba(0,171,231,0.18)" : undefined }}
    >
      <div className="flex items-center gap-3">
        <StepNum n="۵" on={step === 5} />
        <h2 className="m-0 text-2xl font-black">اطلاعات سفارش‌دهنده</h2>
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
              {code
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
                    disabled={busy}
                    aria-label={`رقم ${fa(i + 1)} از کد تأیید`}
                    value={c.trim()}
                    onChange={(e) => {
                      const ch = e.target.value.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/\D/g, "").slice(-1);
                      if (ch) {
                        const cur = code.replace(/\D/g, "").slice(0, 4).split("");
                        cur[i] = ch;
                        setCode(cur.join("").replace(/\s/g, ""));
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
            {devCode && (
              <span className="self-start rounded-xl bg-[#FFF3C9] px-2.5 py-1 text-[12px] font-extrabold text-[#7A5C00]">
                کد آزمایشی (محیط توسعه): {fa(devCode)}
              </span>
            )}
            {error && <span className="text-[13px] font-bold text-[#B02A52]">{error}</span>}
            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={busy}
                onClick={() => void submitCode()}
                className="flex h-[48px] items-center justify-center rounded-full bg-[#04202E] px-8 text-[14px] font-extrabold text-white transition-transform active:scale-95 disabled:opacity-60"
              >
                {busy ? "در حال تأیید…" : "تأیید و ادامه"}
              </button>
              <button
                type="button"
                disabled={busy || seconds > 0}
                onClick={() => void requestCode()}
                className="h-[48px] rounded-full border border-[#CFE6EF] px-5 text-[13px] font-bold text-[#006387] disabled:opacity-50"
              >
                {seconds > 0 ? `ارسال دوباره تا ${fa(seconds)} ثانیه` : "ارسال دوباره کد"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPhase("idle");
                  setError("");
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
            {error && <span className="text-[13px] font-bold text-[#B02A52]">{error}</span>}
            <button
              type="button"
              disabled={!phoneReady || !nameReady || busy}
              onClick={() => void requestCode()}
              className="h-[48px] rounded-full border-2 border-[#04202E] px-7 text-[14px] font-extrabold text-[#04202E] transition-transform active:scale-95 disabled:border-[#CFE6EF] disabled:text-[#7C99A7]"
            >
              {busy ? "در حال ارسال…" : "دریافت کد تأیید"}
            </button>
            {(!phoneReady || !nameReady) && (
              <span className="text-[12.5px] font-semibold text-[#7C99A7]">نام و نام خانوادگی و شماره موبایل خودت رو کامل کن</span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// route type import used for nav helper typing
export type { Route };
