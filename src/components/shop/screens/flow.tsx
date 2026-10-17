"use client";

// ── Mobile gift-builder flow: pick → card → extras → checkout ──
import { Plush } from "../plush";
import { MobileTopBar, StepBar } from "../nav";
import {
  HeartSticker,
  PawIcon,
  PawSticker,
  PhotoIcon,
  VideoIcon,
  ForwardIcon,
  CheckIcon,
  MinusIcon,
  PlusSmall,
} from "../icons";
import { navigate, useHashRoute } from "@/lib/hash-route";
import {
  usePishnam,
  useCharityDone,
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import type { CatalogEntry } from "@/lib/pishnam-store";
import { FavHeart, FavFilterChips, SurpriseButton } from "@/components/shop/fav";
import { MessageIdeas } from "@/components/shop/ideas";

/* ═══════════════ 1 · PICK ═══════════════ */
export function MobilePick() {
  const picked = usePishnam((s) => s.kind);
  const setKind = usePishnam((s) => s.setKind);
  const favorites = usePishnam((s) => s.favorites);
  const [favOnly, setFavOnly] = useState(false);
  const [stageKey, setStageKey] = useState(0);
  // deep-link preselect: #/pick?kind=bear (product/friends pages CTA)
  const { query } = useHashRoute();
  const qKind = query.get("kind");
  useEffect(() => {
    if (qKind && PLUSHES.some((p) => p.kind === qKind) && picked !== qKind) {
      setKind(qKind as PlushKind);
    }
  }, [qKind, picked, setKind]);
  const sel = PLUSHES.find((p) => p.kind === picked) ?? PLUSHES[0];
  const list = favOnly ? PLUSHES.filter((p) => favorites.includes(p.kind)) : PLUSHES;

  return (
    <div className="flex min-h-screen flex-col bg-[#F2FAFD] md:hidden">
      <MobileTopBar title="قدم ۱ از ۴" back="home" />
      <StepBar step={1} />

      <div className="px-5 pb-1 pt-[22px]">
        <h1 className="m-0 text-[30px] font-black leading-[1.4]">دوست پشمالوت رو انتخاب کن</h1>
        <p className="mb-0 mt-2 text-[15px] font-medium leading-[1.9] text-[#1F3E4D]">
          شش تا رفیق پشمالو منتظرن؛ همه با یه قیمت، تفاوت فقط تو قلبشونه.
        </p>
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

      <div className="sticky bottom-0 mt-auto flex items-center justify-between gap-3.5 border-t border-[#D3E8F0] bg-white/95 px-5 pb-[max(14px,env(safe-area-inset-bottom))] pt-3.5">
        <div className="flex flex-col">
          <span className="text-[13px] font-semibold text-[#4A6572]">جعبه + کارت پستال</span>
          <span className="text-lg font-black">{money(BOX_PRICE)} تومان</span>
        </div>
        <button
          type="button"
          onClick={() => navigate("card")}
          className="flex h-[54px] items-center gap-2 rounded-full bg-[#00ABE7] px-[26px] text-base font-extrabold text-[#04202E] transition-transform active:scale-95"
        >
          ادامه، کارت پستال
          <ForwardIcon />
        </button>
      </div>
    </div>
  );
}

/* ═══════════════ 2 · CARD ═══════════════ */
export function MobileCard() {
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
  const mediaFiles = usePishnam((s) => s.mediaFiles);
  const addMediaFile = usePishnam((s) => s.addMediaFile);
  const removeMediaFile = usePishnam((s) => s.removeMediaFile);
  const nextNo = usePishnam((s) => s.nextNo);
  const user = usePishnam((s) => s.user);
  const { toast } = useToast();
  const mediaInputRef = useRef<HTMLInputElement>(null);

  const PRIVACY_OPTIONS: { key: SenderDisplayMode; title: string; sub: string; emoji: string }[] = [
    { key: "name", title: "اسمم نمایش داده بشه", sub: senderName || user?.name || "اسم خودت", emoji: "🙂" },
    { key: "phrase", title: "یه عبارت دلخواه", sub: senderPhrase || "مثلاً: از طرف همسرت", emoji: "✍️" },
    { key: "anon", title: "کاملاً ناشناس", sub: "یک هدیه برای تو", emoji: "🎁" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#F2FAFD] md:hidden">
      <MobileTopBar title="قدم ۲ از ۴" back="pick" />
      <StepBar step={2} />

      <div className="px-5 pb-1 pt-[22px]">
        <h1 className="m-0 text-[30px] font-black leading-[1.4]">کارت پستالت رو بنویس</h1>
        <p className="mb-0 mt-2 text-[15px] font-medium leading-[1.9] text-[#1F3E4D]">
          یه کارت پستال فقط با یه QR همراه جعبه می‌رسه. دوستت اسکنش می‌کنه، رمز رو می‌زنه و
          پیامت رو می‌بینه.
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
          پیامت
        </label>
        <textarea
          id="msg"
          rows={5}
          maxLength={400}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={OCCASION_HOLDERS[occ]}
          className="min-h-[130px] resize-none border-none bg-transparent text-base leading-[1.9] text-[#04202E] outline-none"
        />
        <div className="flex justify-between text-[12.5px] font-semibold text-[#4A6572]">
          <span>متن، عکس یا ویدیو؛ هر چی دلت خواست</span>
          <span>
            {fa(message.length)} / ۴۰۰
          </span>
        </div>
      </div>

      <div className="mx-5 mt-3">
        <MessageIdeas occ={occ} onPick={setMessage} />
      </div>

      {/* پیامِ رسانه‌ای واقعی — عکس/ویدیو/ویس خصوصی، فقط برای گیرنده (mission §۱/§۴) */}
      <div className="px-5 pt-3">
        <input
          ref={mediaInputRef}
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
          onClick={() => mediaInputRef.current?.click()}
          className="flex h-[74px] w-full items-center justify-center gap-3 rounded-[22px] border-2 border-dashed border-[#B5E3F5] bg-[#E3F6FD] text-sm font-bold text-[#04202E]"
        >
          <PhotoIcon />
          <span>عکس، ویدیو یا ویس پیامت رو اضافه کن</span>
        </button>
        {mediaFiles.length > 0 && (
          <div className="mt-2 flex flex-col gap-1.5">
            {mediaFiles.map((m) => (
              <div key={m.id} className="flex items-center gap-2.5 rounded-[16px] border border-[#CFE6EF] bg-white px-3 py-2">
                <span className="text-lg" aria-hidden="true">{m.kind === "image" ? "🖼️" : m.kind === "video" ? "🎬" : "🎙️"}</span>
                <span className="min-w-0 flex-1 truncate text-[12.5px] font-bold text-[#04202E]" dir="ltr">{m.name}</span>
                <span className="text-[11px] font-semibold text-[#4A6572]">{fa(Math.round(m.size / 1024))} کیلوبایت</span>
                <button
                  type="button"
                  aria-label={`حذف ${m.name}`}
                  onClick={() => removeMediaFile(m.id)}
                  className="rounded-lg bg-[#FFE9F0] px-2 py-1 text-[10.5px] font-extrabold text-[#B02A52]"
                >
                  حذف
                </button>
              </div>
            ))}
            <span className="text-[11.5px] font-medium leading-[1.8] text-[#4A6572]">
              حداکثر ۳ فایل، هرکدوم تا ۱۰ مگ — فقط گیرنده‌ی تأییدشده می‌بینه؛ بعد از پایان مهلت نگهداری حذف می‌شن.
            </span>
          </div>
        )}
      </div>

      <div className="mx-5 mt-[18px] flex flex-col gap-2">
        <label htmlFor="pw" className="text-sm font-extrabold">
          رمز کارت
        </label>
        <input
          id="pw"
          type="text"
          value={cardPassword}
          onChange={(e) => setCardPassword(e.target.value)}
          placeholder="مثلاً اسم اولین جایی که با هم رفتید"
          className="box-border h-[54px] rounded-[18px] border-[1.5px] border-[#CFE6EF] bg-white px-4 text-base text-[#04202E] outline-none focus:border-[#00ABE7]"
        />
        <span className="text-[12.5px] font-medium leading-[1.8] text-[#4A6572]">
          راه دوم باز کردن کارت: هرکی رمز رو بدونه می‌تونه پیامت رو ببینه — حتی بدون اسکن QR.
        </span>
      </div>

      {/* محرمانگی هویت فرستنده — برای هر سفارش جدا انتخاب می‌شه (mission §۳) */}
      <div className="mx-5 mt-[18px] rounded-3xl border border-[#DDEEF5] bg-white px-4 py-3.5">
        <span className="text-sm font-extrabold">اسم چطوری دیده بشه؟</span>
        <span className="mt-1 block text-[12px] font-medium leading-[1.8] text-[#4A6572]">
          انتخابت فقط برای همین سفارشه؛ برای هر هدیه می‌تونی متفاوت انتخاب کنی. تو حالت ناشناس،
          هیچ اطلاعاتی از تو به گیرنده نمی‌رسه — نه رو کارت، نه توی سیستم.
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

      <div className="mx-5 mt-[18px] flex items-center gap-4 rounded-[26px] bg-[#D6F1FB] p-[18px]">
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

      <div className="sticky bottom-0 mt-auto border-t border-[#D3E8F0] bg-white/95 px-5 pb-[max(14px,env(safe-area-inset-bottom))] pt-3.5">
        <button
          type="button"
          onClick={() => navigate("extras")}
          className="flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-[#00ABE7] text-base font-extrabold text-[#04202E] transition-transform active:scale-95"
        >
          ادامه، پنجه و قلب
          <ForwardIcon />
        </button>
      </div>
    </div>
  );
}

/* ═══════════════ 3 · EXTRAS ═══════════════ */
export function MobileExtras() {
  const hearts = usePishnam((s) => s.hearts);
  const paws = usePishnam((s) => s.paws);
  const setHearts = usePishnam((s) => s.setHearts);
  const setPaws = usePishnam((s) => s.setPaws);
  const nextNo = usePishnam((s) => s.nextNo);
  // قلب قرمز/پنجه — قیمت و فعال‌بودن از تنظیمات ادمین (owner request)
  const charmPrice = usePishnam((s) => s.charmPrice);
  const charmsEnabled = usePishnam((s) => s.charmsEnabled);
  // دکمه «جزئیات» هر افزودنی → Bottom-Sheet آیفونی
  const [detail, setDetail] = useState<CatalogEntry | null>(null);
  const { toast } = useToast();
  // «افزودنی‌ها» (mission §۵) + پلن‌های نگهداری (mission §۴)
  const catalogAddons = usePishnam((s) => s.catalogAddons);
  const addonLines = usePishnam((s) => s.addonLines);
  const addAddon = usePishnam((s) => s.addAddon);
  const removeAddon = usePishnam((s) => s.removeAddon);
  const retention = usePishnam((s) => s.retention);
  const setRetention = usePishnam((s) => s.setRetention);
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

  const all: ("h" | "p")[] = [];
  let hi = 0;
  let pi = 0;
  while (hi < hearts || pi < paws) {
    if (hi < hearts) {
      all.push("h");
      hi++;
    }
    if (pi < paws) {
      all.push("p");
      pi++;
    }
  }
  const cap = 26;
  const shown = all.slice(0, cap);
  const hasMore = all.length > cap;
  const more = all.length - cap;
  const retentionFee = retention === "6m" ? retentionPrices.m6 : retention === "12m" ? retentionPrices.m12 : 0;
  const total = BOX_PRICE + (charmsEnabled ? (hearts + paws) * charmPrice : 0) + addonsTotal + retentionFee;

  return (
    <div className="flex min-h-screen flex-col bg-[#F2FAFD] md:hidden">
      <MobileTopBar title="قدم ۳ از ۴" back="card" />
      <StepBar step={3} />

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
          <div className="mt-2.5 flex flex-col gap-2">
            {catalogAddons.map((a) => {
              const q = addonQty(a.variantId);
              const out = !a.inStock;
              return (
                <div
                  key={a.variantId}
                  className="flex items-center gap-3 rounded-[22px] border-[1.5px] bg-white px-3.5 py-3"
                  style={{ borderColor: q > 0 ? "#00ABE7" : "#DDEEF5", opacity: out ? 0.55 : 1 }}
                >
                  <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center overflow-hidden rounded-[16px] bg-[#F2FAFD] text-2xl">
                    {a.image ? (
                       
                      <img src={a.image} alt={a.name} className="h-full w-full object-cover" />
                    ) : (
                      <span aria-hidden="true">{a.emoji || "🎁"}</span>
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="text-[14.5px] font-extrabold text-[#04202E]">{a.name}</span>
                    <span className="text-[12px] font-bold text-[#4A6572]">
                      {out ? "ناموجود" : `${money(a.priceToman)} تومان`}
                    </span>
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
                    <button
                      type="button"
                      onClick={() => addAddon(a.variantId)}
                      className="rounded-full bg-[#00ABE7] px-4 py-2 text-[12.5px] font-extrabold text-[#04202E] transition-transform active:scale-95"
                    >
                      + اضافه کن
                    </button>
                  ) : (
                    <Counter
                      value={q}
                      onMinus={() => (q === 1 ? removeAddon(a.variantId) : addAddon(a.variantId))}
                      onPlus={() => addAddon(a.variantId)}
                      minusLabel="کمتر"
                      plusLabel="بیشتر"
                      plusBg="#00ABE7"
                      plusStroke="#04202E"
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
        <div className="px-5 pt-5">
          <div className="flex items-baseline justify-between">
            <h2 className="m-0 text-lg font-black">قلب قرمز و پنجه</h2>
            <span className="text-[12px] font-bold text-[#4A6572]">هر کدوم {money(charmPrice)} تومان — برای کار خیر</span>
          </div>
          <div className="mt-2.5 flex flex-col gap-3">

        {/* hearts */}
        <div className="flex flex-col gap-3.5 rounded-[28px] border-[1.5px] border-[#F7C5D3] bg-[#FFE9F0] p-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full bg-white">
              <HeartSticker size={40} fill="#F0426B" stroke="#04202E" strokeWidth={2.4} />
            </div>
            <div className="flex flex-col gap-[3px]">
              <span className="text-lg font-black">قلب قرمز</span>
              <span className="text-[13px] font-medium text-[#1F3E4D]">برای هدیه به بچه‌های بی‌سرپرست</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold">هر کدوم {money(charmPrice)} تومان</span>
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
        </div>

        {/* paws */}
        <div className="flex flex-col gap-3.5 rounded-[28px] border-[1.5px] border-[#B5E3F5] bg-[#E3F6FD] p-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full bg-white">
              <PawIcon size={38} />
            </div>
            <div className="flex flex-col gap-[3px]">
              <span className="text-lg font-black">پنجه</span>
              <span className="text-[13px] font-medium text-[#1F3E4D]">برای هدیه به پناهگاه حیوونا</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold">هر کدوم {money(charmPrice)} تومان</span>
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

      {/* پلن نگهداری پیام — ساعت از اولین نمایش موفق شروع می‌شه (mission §۴) */}
      <div className="px-5 pt-5">
        <h2 className="m-0 text-lg font-black">نگهداری پیام</h2>
        <p className="mb-0 mt-1 text-[12.5px] font-medium leading-[1.85] text-[#4A6572]">
          پیامت (متن، عکس و ویس) تا وقتی که انتخاب کنی نگه داشته می‌شه. ساعت از روزی شروع می‌شه
          که گیرنده پیامت رو واقعاً می‌بینه — نه از روز خرید.
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

      {/* box preview */}
      <div className="mx-5 mt-[18px]">
        <div className="pb-2.5 text-[15px] font-extrabold">روی جعبه‌ت این‌جوری می‌شینه</div>
        <div className="relative box-border min-h-[150px] rounded-[26px] border-[2.5px] border-[#04202E] bg-[#00ABE7] px-4 pb-4 pt-[18px]">
          <div className="absolute -top-0.5 left-[22px] h-11 w-[18px] rounded-b-md bg-[#04202E]" />
          <div className="inline-flex rotate-[-3deg] flex-col items-center rounded-[14px] border-[2.5px] border-[#04202E] bg-white px-3.5 pb-1 pt-1.5">
            <span className="text-[10.5px] font-bold text-[#4A6572]">هدیه‌ی شماره</span>
            <span className="text-[26px] font-black leading-[1.1]">{fa(nextNo)}</span>
          </div>
          <div className="flex flex-wrap items-center gap-1 pt-3">
            {shown.map((k, i) => (
              <span key={i} className="inline-flex" style={{ transform: `rotate(${((i * 37) % 28) - 14}deg)` }}>
                {k === "h" ? (
                  <HeartSticker size={34} fill="#F0426B" stroke="#fff" strokeWidth={3.6} />
                ) : (
                  <PawSticker size={34} />
                )}
              </span>
            ))}
            {hasMore && (
              <span className="rounded-[14px] bg-[#04202E] px-2.5 py-1.5 text-[13px] font-extrabold text-white">
                +{fa(more)}
              </span>
            )}
          </div>
        </div>
      </div>

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
          برو به سبد
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
}: {
  value: number;
  onMinus: () => void;
  onPlus: () => void;
  minusLabel: string;
  plusLabel: string;
  plusBg: string;
  plusStroke: string;
}) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-white p-1">
      <button
        type="button"
        aria-label={minusLabel}
        onClick={onMinus}
        className="flex h-11 w-11 items-center justify-center rounded-full border-none bg-[#F2FAFD]"
      >
        <MinusIcon />
      </button>
      <span className="min-w-[38px] text-center text-xl font-black">{fa(value)}</span>
      <button
        type="button"
        aria-label={plusLabel}
        onClick={onPlus}
        className="flex h-11 w-11 items-center justify-center rounded-full border-none"
        style={{ background: plusBg }}
      >
        <PlusSmall stroke={plusStroke} />
      </button>
    </div>
  );
}

/* ═══════════════ 4 · CHECKOUT ═══════════════ */
export function MobileCheckout() {
  const nextNo = usePishnam((s) => s.nextNo);
  const kind = usePishnam((s) => s.kind);
  const hearts = usePishnam((s) => s.hearts);
  const paws = usePishnam((s) => s.paws);
  const addonLines = usePishnam((s) => s.addonLines);
  const retention = usePishnam((s) => s.retention);
  const receiver = usePishnam((s) => s.receiver);
  const setReceiver = usePishnam((s) => s.setReceiver);
  const quote = usePishnam((s) => s.quote);
  const quoteStatus = usePishnam((s) => s.quoteStatus);
  const fetchQuote = usePishnam((s) => s.fetchQuote);
  const paymentMethod = usePishnam((s) => s.paymentMethod);
  const setPaymentMethod = usePishnam((s) => s.setPaymentMethod);

  // server quote — the only payable number (guide §4.5)
  useEffect(() => {
    void fetchQuote();
  }, [fetchQuote, kind, hearts, paws, receiver.province, addonLines, retention]);

  const sel = PLUSHES.find((p) => p.kind === kind) ?? PLUSHES[0];
  const total = quote?.total ?? 0;

  // cart rows straight from the SERVER quote lines — main gift + «افزودنی‌ها»
  // (each addon is an independent item, mission §۵) + retention + shipping
  interface CartRow { key: string; emoji?: string; plush?: boolean; bg: string; title: string; sub: string; amount: string; }
  const cartRows: CartRow[] = quote
    ? [
        ...(quote.lines ?? []).map((l, i) => ({
          key: l.variantId,
          plush: i === 0,
          emoji: i === 0 ? undefined : l.sku.startsWith("AD-") ? "🎁" : undefined,
          bg: i === 0 ? sel.bg : "#F2FAFD",
          title: l.productName,
          sub: i === 0 ? "جعبه‌ی کادویی + کارت پستال QR" : `افزودنی × ${fa(l.qty)}`,
          amount: money(l.lineToman),
        })),
        ...(quote.charms > 0
          ? [{ key: "charms", emoji: "❤️", bg: "#FFE9F0", title: `قلب و پنجه × ${fa(hearts + paws)}`, sub: "برای بچه‌های بی‌سرپرست و حیوونا", amount: money(quote.charms) }]
          : []),
        ...(quote.retention > 0
          ? [{ key: "retention", emoji: "💾", bg: "#E3F6FD", title: `نگهداری پیام ${quote.retentionPlan === "12m" ? "۱ ساله" : "۶ ماهه"}`, sub: "ساعت از اولین نمایش موفق پیام به گیرنده", amount: money(quote.retention) }]
          : []),
      ]
    : [];

  const valid = receiver.name.trim() !== "" && receiver.phone.trim().length >= 8 && receiver.address.trim() !== "";

  return (
    <div className="flex min-h-screen flex-col bg-[#F2FAFD] md:hidden">
      <MobileTopBar title="قدم ۴ از ۴" back="extras" />
      <StepBar step={4} />

      <div className="px-5 pb-1 pt-[22px]">
        <h1 className="m-0 text-[30px] font-black leading-[1.4]">سبد و پرداخت</h1>
      </div>

      {/* ticket */}
      <div className="relative mx-5 mt-3 flex items-stretch overflow-hidden rounded-[26px] bg-[#00ABE7]">
        <div className="flex w-[118px] shrink-0 flex-col items-center justify-center py-[18px]">
          <span className="text-xs font-bold">هدیه‌ی شماره</span>
          <span className="text-[44px] font-black leading-[1.15]">{fa(nextNo)}</span>
        </div>
        <div className="my-3.5 w-0 border-r-[2.5px] border-dashed border-[#04202E]" />
        <div className="flex flex-1 flex-col justify-center gap-1 px-4 py-[18px]">
          <span className="text-base font-black">این شماره مال هدیه‌ی توئه</span>
          <span className="text-[12.5px] font-medium leading-[1.8]">
            روی جعبه و کارت پستال می‌شینه و اسمش تو دفتر ما ثبت می‌شه.
          </span>
        </div>
        <div className="absolute -top-3 right-[106px] h-6 w-6 rounded-full bg-[#F2FAFD]" />
        <div className="absolute -bottom-3 right-[106px] h-6 w-6 rounded-full bg-[#F2FAFD]" />
      </div>

      {/* items — amounts come from the SERVER quote */}
      <div className="mx-5 mt-4 rounded-[26px] border border-[#DDEEF5] bg-white px-4 py-2">
        {cartRows.map((r) => (
          <div key={r.key} className="flex items-center gap-3 border-b border-[#E3F0F5] py-3">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[18px] text-2xl"
              style={{ background: r.bg }}
            >
              {r.plush ? <Plush kind={sel.kind} size={54} /> : <span aria-hidden="true">{r.emoji ?? "🎁"}</span>}
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
      <div className="px-5 pb-2 pt-[22px] text-lg font-extrabold">گیرنده‌ی هدیه</div>
      <div className="mx-5 rounded-[26px] border border-[#DDEEF5] bg-white px-4 py-1">
        <Field
          label="اسم گیرنده"
          value={receiver.name}
          onChange={(v) => setReceiver({ name: v })}
          placeholder="اسم دوستت"
        />
        <Field
          label="شماره‌ی موبایل گیرنده"
          value={receiver.phone}
          onChange={(v) => setReceiver({ phone: v })}
          placeholder="۰۹۱۲ ۱۲۳ ۴۵۶۷"
          tel
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
        </div>
      </div>

      {/* coupon — honest: server discounts land later (contract: no fake codes) */}
      <div className="mx-5 mt-3.5 flex items-center gap-2.5 rounded-[22px] border border-dashed border-[#BFDDE8] bg-[#F8FDFF] py-3 pl-4 pr-4">
        <span className="text-lg">🎁</span>
        <div className="text-[12.5px] font-semibold leading-[1.8] text-[#4A6572]">
          کد تخفیف نداری؟ به‌زودی اولین کد مهربونی اینجا فعال می‌شه — بیهوده منتظر تخفیف‌های تقلبی نمی‌مونی.
        </div>
      </div>

      {/* payment method — server-authoritative quote per method */}
      <div className="px-5 pb-2 pt-[22px] text-lg font-extrabold">روش پرداخت</div>
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

      <div className="px-6 pt-3.5 text-center text-[12.5px] font-medium leading-[1.9] text-[#4A6572]">
        با پرداخت، قوانین و شرایط یک دوست رو قبول می‌کنی. رسید قلب‌ها و پنجه‌ها بعد از ارسال
        هدیه‌ها تو دفتر مهربونی ثبت می‌شه.
      </div>

      <div className="sticky bottom-0 mt-auto flex items-center gap-3.5 border-t border-[#D3E8F0] bg-white/95 px-5 pb-[max(14px,env(safe-area-inset-bottom))] pt-3.5">
        <div className="flex flex-col">
          <span className="text-[13px] font-semibold text-[#4A6572]">جمع کل</span>
          <span className="text-lg font-black">{quote ? `${money(total)} تومان` : "…"}</span>
        </div>
        <button
          type="button"
          disabled={!valid || !quote}
          onClick={() => {
            const evt = new CustomEvent("pishnam:pay");
            window.dispatchEvent(evt);
          }}
          className="flex h-[54px] flex-1 items-center justify-center gap-2 rounded-full text-base font-extrabold transition-all active:scale-95"
          style={{ background: valid && quote ? "#00ABE7" : "#CFE6EF", color: "#04202E", opacity: valid && quote ? 1 : 0.7 }}
        >
          پرداخت و فرستادن
          <HeartSticker size={20} fill="#04202E" stroke="none" />
        </button>
      </div>
      {!valid && (
        <div className="bg-[#FFF3C9] px-5 pb-3 pt-2 text-center text-xs font-bold text-[#7A5C00]">
          برای پرداخت، اسم، موبایل و آدرس گیرنده رو کامل کن
        </div>
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
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  tel?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-[#E3F0F5] py-3">
      <label className="text-[12.5px] font-bold text-[#4A6572]">{label}</label>
      <input
        type={tel ? "tel" : "text"}
        inputMode={tel ? "numeric" : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-[30px] border-none bg-transparent text-base text-[#04202E] outline-none"
      />
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
