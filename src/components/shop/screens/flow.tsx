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
import { navigate } from "@/lib/hash-route";
import {
  usePishnam,
  useCharityDone,
} from "@/lib/pishnam-store";
import { fa, money } from "@/lib/fa";
import {
  PLUSHES,
  BOX_PRICE,
  CHARM_PRICE,
  OCCASIONS,
  OCCASION_HOLDERS,
  CHARITY_TARGET,
} from "@/lib/pishnam-data";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

/* ═══════════════ 1 · PICK ═══════════════ */
export function MobilePick() {
  const picked = usePishnam((s) => s.kind);
  const setKind = usePishnam((s) => s.setKind);
  const sel = PLUSHES.find((p) => p.kind === picked) ?? PLUSHES[0];

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
            className="flex h-[240px] w-full items-center justify-center rounded-3xl"
            style={{ background: sel.bg }}
          >
            <Plush kind={sel.kind} size={210} className="pishnam-float" />
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

      <div className="mt-4 grid grid-cols-3 gap-2.5 px-5">
        {PLUSHES.map((p) => {
          const isOn = p.kind === picked;
          return (
            <button
              key={p.kind}
              type="button"
              aria-pressed={isOn}
              onClick={() => setKind(p.kind)}
              className="flex flex-col items-center gap-1 rounded-[22px] bg-white p-2 pb-3 transition-all"
              style={{ border: `1.5px solid ${isOn ? "#00ABE7" : "#E1EFF5"}` }}
            >
              <div
                className="flex h-[92px] w-full items-center justify-center rounded-[16px]"
                style={{ background: p.bg }}
              >
                <Plush kind={p.kind} size={82} />
              </div>
              <span className="text-[13px] font-extrabold">{p.name}</span>
            </button>
          );
        })}
      </div>

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
  const anonymous = usePishnam((s) => s.anonymous);
  const setAnonymous = usePishnam((s) => s.setAnonymous);
  const senderName = usePishnam((s) => s.senderName);
  const setSenderName = usePishnam((s) => s.setSenderName);
  const cardPassword = usePishnam((s) => s.cardPassword);
  const setCardPassword = usePishnam((s) => s.setCardPassword);
  const photoAdded = usePishnam((s) => s.photoAdded);
  const addPhoto = usePishnam((s) => s.addPhoto);
  const videoAdded = usePishnam((s) => s.videoAdded);
  const addVideo = usePishnam((s) => s.addVideo);
  const nextNo = usePishnam((s) => s.nextNo);
  const user = usePishnam((s) => s.user);
  const { toast } = useToast();

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

      <div className="flex gap-3 px-5 pt-3">
        <button
          type="button"
          onClick={() => {
            addPhoto();
            toast({ title: "عکس اضافه شد", description: "عکس تو پیامت، روی کارت QR چاپ می‌شه." });
          }}
          className="flex h-28 flex-1 flex-col items-center justify-center gap-1.5 rounded-[22px] border-2 border-dashed bg-[#E3F6FD] text-sm font-bold text-[#04202E]"
          style={{ borderColor: photoAdded ? "#04202E" : "#00ABE7", borderStyle: photoAdded ? "solid" : "dashed" }}
        >
          {photoAdded ? <CheckIcon size={28} stroke="#04202E" /> : <PhotoIcon />}
          {photoAdded ? "عکس اضافه شد ✓" : "افزودن عکس"}
        </button>
        <button
          type="button"
          onClick={() => {
            addVideo();
            toast({ title: "ویدیو اضافه شد", description: "ویدیو کنار پیامت روی کارت قرار می‌گیره." });
          }}
          className="flex h-28 flex-1 flex-col items-center justify-center gap-1.5 rounded-[22px] border-2 border-dashed bg-[#FFE9F0] text-sm font-bold text-[#04202E]"
          style={{ borderColor: videoAdded ? "#04202E" : "#F0426B", borderStyle: videoAdded ? "solid" : "dashed" }}
        >
          {videoAdded ? <CheckIcon size={28} stroke="#04202E" /> : <VideoIcon />}
          {videoAdded ? "ویدیو اضافه شد ✓" : "افزودن ویدیو"}
        </button>
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
          فقط کسی که این رمز رو بدونه می‌تونه پیامت رو ببینه. رمز رو بهش بگو یا یه سرنخ بهش
          بده.
        </span>
      </div>

      <div className="mx-5 mt-[18px] rounded-3xl border border-[#DDEEF5] bg-white px-4 py-1.5">
        <div className="flex items-center justify-between gap-3 py-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-[15px] font-extrabold">ناشناس بفرست</span>
            <span className="text-[12.5px] font-medium text-[#4A6572]">توی جعبه هیچ اسمی نمی‌ذاریم</span>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={anonymous}
            aria-label="ارسال ناشناس"
            onClick={() => setAnonymous(!anonymous)}
            className="relative h-8 w-[54px] shrink-0 rounded-full border-none p-0"
            style={{ background: anonymous ? "#00ABE7" : "#C7DCE5" }}
          >
            <span
              className="absolute top-[3px] h-[26px] w-[26px] rounded-full bg-white shadow-[0_2px_5px_rgba(4,32,46,0.28)] transition-all"
              style={anonymous ? { left: 3 } : { right: 3 }}
            />
          </button>
        </div>
        {!anonymous && (
          <div className="flex flex-col gap-2 border-t border-[#E3F0F5] py-3 pb-3.5">
            <label htmlFor="nm" className="text-sm font-extrabold">
              اسم تو
            </label>
            <input
              id="nm"
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder={user ? user.name : "اسمت چیه؟"}
              className="box-border h-[50px] rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-4 text-base text-[#04202E] outline-none focus:border-[#00ABE7]"
            />
          </div>
        )}
      </div>

      <div className="mx-5 mt-[18px] flex items-center gap-4 rounded-[26px] bg-[#D6F1FB] p-[18px]">
        <div className="flex h-[98px] w-32 shrink-0 rotate-[-3deg] items-center justify-center rounded-xl border-[2.5px] border-[#04202E] bg-white">
          <PostcardQr />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-base font-extrabold">کارت پستالِ تو</span>
          <span className="text-[13px] font-medium leading-[1.85] text-[#1F3E4D]">
            روی کارت فقط همین QR هست. شماره‌ی هدیه‌ی تو، <b>{fa(nextNo)}</b>، روی خود جعبه
            می‌شینه.
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
  const total = BOX_PRICE + (hearts + paws) * CHARM_PRICE;

  return (
    <div className="flex min-h-screen flex-col bg-[#F2FAFD] md:hidden">
      <MobileTopBar title="قدم ۳ از ۴" back="card" />
      <StepBar step={3} />

      <div className="px-5 pb-1 pt-[22px]">
        <h1 className="m-0 text-[30px] font-black leading-[1.4]">یه ذره مهربونی اضافه کن</h1>
        <p className="mb-0 mt-2 text-[15px] font-medium leading-[1.9] text-[#1F3E4D]">
          قلب قرمز و پنجه، استیکرای کوچیکی‌ان که روی جعبه می‌چسبن. پولشون می‌ره برای هدیه به
          بچه‌های بی‌سرپرست و پناهگاه حیوونا. هر چندتا که دلت خواست.
        </p>
      </div>

      <div className="flex flex-col gap-3 px-5 pt-3.5">
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
            <span className="text-sm font-bold">هر کدوم {money(CHARM_PRICE)} تومان</span>
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
            <span className="text-sm font-bold">هر کدوم {money(CHARM_PRICE)} تومان</span>
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
          <span className="text-[13px] font-semibold text-[#4A6572]">جمع (جعبه + قلب و پنجه)</span>
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
  const receiver = usePishnam((s) => s.receiver);
  const setReceiver = usePishnam((s) => s.setReceiver);
  const [coupon, setCoupon] = useState("");
  const [couponOk, setCouponOk] = useState(false);
  const { toast } = useToast();

  const sel = PLUSHES.find((p) => p.kind === kind) ?? PLUSHES[0];
  const total = BOX_PRICE + (hearts + paws) * CHARM_PRICE;

  interface CartRow { isHeart: boolean; bg: string; title: string; sub: string; amount: string; }
  const rows: CartRow[] = [];
  if (hearts > 0)
    rows.push({ isHeart: true, bg: "#FFE9F0", title: `قلب قرمز × ${fa(hearts)}`, sub: "برای بچه‌های بی‌سرپرست", amount: money(hearts * CHARM_PRICE) });
  if (paws > 0)
    rows.push({ isHeart: false, bg: "#E3F6FD", title: `پنجه × ${fa(paws)}`, sub: "برای پناهگاه حیوونا", amount: money(paws * CHARM_PRICE) });

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

      {/* items */}
      <div className="mx-5 mt-4 rounded-[26px] border border-[#DDEEF5] bg-white px-4 py-2">
        <div className="flex items-center gap-3 border-b border-[#E3F0F5] py-3">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[18px]"
            style={{ background: sel.bg }}
          >
            <Plush kind={sel.kind} size={54} />
          </div>
          <div className="flex flex-1 flex-col gap-0.5">
            <span className="text-[15px] font-extrabold">{sel.name}، دوست پشمالو</span>
            <span className="text-[12.5px] font-medium text-[#4A6572]">جعبه‌ی کادویی + کارت پستال QR</span>
          </div>
          <span className="text-sm font-extrabold">{money(BOX_PRICE)}</span>
        </div>
        {rows.map((r) => (
          <div key={r.title} className="flex items-center gap-3 border-b border-[#E3F0F5] py-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
              style={{ background: r.bg }}
            >
              {r.isHeart ? (
                <HeartSticker size={22} fill="#F0426B" stroke="#04202E" strokeWidth={2.6} />
              ) : (
                <PawIcon size={22} />
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
          <span>{receiver.city ? (receiver.city.includes("تهران") ? money(49_000) : money(69_000)) : "بعد از ثبت آدرس"}</span>
        </div>
        <div className="flex items-center justify-between py-2 pb-3 text-[17px] font-black">
          <span>جمع کل</span>
          <span>{money(total)} تومان</span>
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
        <Field
          label="استان و شهر"
          value={receiver.city}
          onChange={(v) => setReceiver({ city: v })}
          placeholder="مثلاً تهران، تهران"
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

      {/* coupon */}
      <div className="mx-5 mt-3.5 flex items-center gap-2.5 rounded-[22px] border border-[#DDEEF5] bg-white py-1.5 pl-1.5 pr-4">
        <input
          aria-label="کد تخفیف"
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder={couponOk ? "کد مهربونی فعال شد ✓" : "کد تخفیف داری؟ (امتحان کن: مهربونی)"}
          className="h-11 flex-1 border-none bg-transparent text-base text-[#04202E] outline-none"
        />
        <button
          type="button"
          onClick={() => {
            if (coupon.trim() === "مهربونی") {
              setCouponOk(true);
              toast({ title: "کد تخفیف اعمال شد", description: "قلب بعدی مهمون ما! یکی‌ش رو خودمون حساب می‌کنیم." });
            } else {
              toast({ title: "این کد کار نمی‌کنه", description: "راهنمایی: کلمه‌ی «مهربونی» رو امتحان کن." });
            }
          }}
          className="h-11 rounded-2xl border-none bg-[#D6F1FB] px-5 text-[14.5px] font-extrabold text-[#04202E]"
        >
          اعمال
        </button>
      </div>

      {/* payment method */}
      <div className="px-5 pb-2 pt-[22px] text-lg font-extrabold">روش پرداخت</div>
      <div className="mx-5 flex items-center gap-3 rounded-[22px] border-2 border-[#00ABE7] bg-white px-4 py-3.5">
        <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border-2 border-[#04202E] bg-[#00ABE7]">
          <CheckIcon size={14} stroke="#04202E" />
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
      </div>

      <div className="px-6 pt-3.5 text-center text-[12.5px] font-medium leading-[1.9] text-[#4A6572]">
        با پرداخت، قوانین و شرایط پیشتم رو قبول می‌کنی. رسید قلب‌ها و پنجه‌ها بعد از ارسال
        هدیه‌ها تو دفتر مهربونی ثبت می‌شه.
      </div>

      <div className="sticky bottom-0 mt-auto flex items-center gap-3.5 border-t border-[#D3E8F0] bg-white/95 px-5 pb-[max(14px,env(safe-area-inset-bottom))] pt-3.5">
        <div className="flex flex-col">
          <span className="text-[13px] font-semibold text-[#4A6572]">جمع کل</span>
          <span className="text-lg font-black">{money(total)} تومان</span>
        </div>
        <button
          type="button"
          disabled={!valid}
          onClick={() => {
            const evt = new CustomEvent("pishnam:pay");
            window.dispatchEvent(evt);
          }}
          className="flex h-[54px] flex-1 items-center justify-center gap-2 rounded-full text-base font-extrabold transition-all active:scale-95"
          style={{ background: valid ? "#00ABE7" : "#CFE6EF", color: "#04202E", opacity: valid ? 1 : 0.7 }}
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
