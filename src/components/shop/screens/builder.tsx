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
import { navigate, type Route } from "@/lib/hash-route";
import { usePishnam, useCharityDone } from "@/lib/pishnam-store";
import { fa, money } from "@/lib/fa";
import { FavHeart, FavFilterChips, SurpriseButton } from "../fav";
import {
  PLUSHES,
  BOX_PRICE,
  CHARM_PRICE,
  OCCASIONS,
  OCCASION_HOLDERS,
  CHARITY_TARGET,
} from "@/lib/pishnam-data";
import { useEffect, useState } from "react";

export function DesktopBuilder({ step }: { step: 1 | 2 | 3 | 4 }) {
  const kind = usePishnam((s) => s.kind);
  const setKind = usePishnam((s) => s.setKind);
  const favorites = usePishnam((s) => s.favorites);
  const [favOnly, setFavOnly] = useState(false);
  const list = favOnly ? PLUSHES.filter((p) => favorites.includes(p.kind)) : PLUSHES;
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
  const hearts = usePishnam((s) => s.hearts);
  const setHearts = usePishnam((s) => s.setHearts);
  const paws = usePishnam((s) => s.paws);
  const setPaws = usePishnam((s) => s.setPaws);
  const receiver = usePishnam((s) => s.receiver);
  const setReceiver = usePishnam((s) => s.setReceiver);
  const nextNo = usePishnam((s) => s.nextNo);
  const done = useCharityDone();
  const total = BOX_PRICE + (hearts + paws) * CHARM_PRICE;
  const sel = PLUSHES.find((p) => p.kind === kind) ?? PLUSHES[0];
  const valid = receiver.name.trim() !== "" && receiver.phone.trim().length >= 8 && receiver.address.trim() !== "";

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
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="box-border flex h-[84px] flex-[1_1_200px] items-center justify-center gap-2.5 rounded-[22px] border-2 border-dashed border-[#00ABE7] bg-[#E3F6FD] text-[15px] font-bold text-[#04202E]"
              >
                <PhotoIcon size={26} />
                افزودن عکس
              </button>
              <button
                type="button"
                className="box-border flex h-[84px] flex-[1_1_200px] items-center justify-center gap-2.5 rounded-[22px] border-2 border-dashed border-[#F0426B] bg-[#FFE9F0] text-[15px] font-bold text-[#04202E]"
              >
                <VideoIcon size={26} />
                افزودن ویدیو
              </button>
            </div>
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
              <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-extrabold">ناشناس بفرست</span>
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
                {anonymous ? (
                  <span className="text-[12.5px] font-medium leading-[1.8] text-[#4A6572]">
                    توی جعبه هیچ اسمی نمی‌ذاریم.
                  </span>
                ) : (
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
              قلب قرمز و پنجه، استیکرای کوچیکی‌ان که روی جعبه می‌چسبن. پولشون می‌ره برای هدیه
              به بچه‌های بی‌سرپرست و پناهگاه حیوونا.
            </p>
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
                  <span className="text-[13.5px] font-bold">هر کدوم {money(CHARM_PRICE)} تومان</span>
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
                  <span className="text-[13.5px] font-bold">هر کدوم {money(CHARM_PRICE)} تومان</span>
                  <DC
                    value={paws}
                    onMinus={() => setPaws(paws - 1)}
                    onPlus={() => setPaws(paws + 1)}
                    plusBg="#00ABE7"
                  />
                </div>
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
            </div>
            <div className="flex flex-wrap gap-3.5">
              <DField label="اسم گیرنده" value={receiver.name} onChange={(v) => setReceiver({ name: v })} placeholder="اسم دوستت" />
              <DField label="شماره‌ی موبایل گیرنده" value={receiver.phone} onChange={(v) => setReceiver({ phone: v })} placeholder="۰۹۱۲ ۱۲۳ ۴۵۶۷" tel />
              <DField label="استان و شهر" value={receiver.city} onChange={(v) => setReceiver({ city: v })} placeholder="مثلاً تهران، تهران" />
              <div className="flex min-w-0 flex-[1_1_240px] flex-col gap-1.5">
                <label className="text-[13px] font-bold text-[#4A6572]">آدرس کامل</label>
                <textarea
                  rows={2}
                  value={receiver.address}
                  onChange={(e) => setReceiver({ address: e.target.value })}
                  placeholder="خیابان، کوچه، پلاک، واحد"
                  className="box-border resize-none rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-4 py-2.5 text-base leading-[1.8] text-[#04202E] outline-none focus:border-[#00ABE7]"
                />
              </div>
            </div>
          </section>
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
            <Row label={`${sel.name}، دوست پشمالو`} sub="جعبه‌ی کادویی + کارت پستال QR" amount={money(BOX_PRICE)} />
            {hearts > 0 && <Row label={`قلب قرمز × ${fa(hearts)}`} sub="برای بچه‌های بی‌سرپرست" amount={money(hearts * CHARM_PRICE)} />}
            {paws > 0 && <Row label={`پنجه × ${fa(paws)}`} sub="برای پناهگاه حیوونا" amount={money(paws * CHARM_PRICE)} />}
            <Row label="هزینه‌ی ارسال" sub={receiver.city ? (receiver.city.includes("تهران") ? "تهران" : "شهرستان") : "بعد از ثبت آدرس"} amount={receiver.city ? (receiver.city.includes("تهران") ? money(49_000) : money(69_000)) : "—"} muted />
          </div>

          <div className="flex items-center justify-between border-t border-[#E3F0F5] pt-3.5 text-lg font-black">
            <span>جمع کل</span>
            <span>{money(total)} تومان</span>
          </div>

          <div
            className="flex items-center justify-center gap-2 rounded-3xl p-4 text-center text-[13px] font-semibold leading-[1.9]"
            style={{ background: valid ? "#E3F6FD" : "#FFF3C9", color: valid ? "#006387" : "#7A5C00" }}
          >
            {valid ? (
              <span>همه‌چیز آماده‌ست! «پرداخت» رو بزن تا هدیه راه بیفته.</span>
            ) : (
              <span>برای پرداخت، اسم، موبایل و آدرس گیرنده (قدم ۴) رو کامل کن.</span>
            )}
          </div>

          <button
            type="button"
            disabled={!valid}
            onClick={() => window.dispatchEvent(new CustomEvent("pishnam:pay"))}
            className="flex h-[56px] items-center justify-center gap-2 rounded-full text-base font-extrabold transition-all active:scale-95"
            style={{ background: valid ? "#00ABE7" : "#CFE6EF", color: "#04202E", opacity: valid ? 1 : 0.75, cursor: valid ? "pointer" : "not-allowed" }}
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

function DField({ label, value, onChange, placeholder, tel }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; tel?: boolean }) {
  return (
    <div className="flex min-w-0 flex-[1_1_240px] flex-col gap-1.5">
      <label className="text-[13px] font-bold text-[#4A6572]">{label}</label>
      <input
        type={tel ? "tel" : "text"}
        inputMode={tel ? "numeric" : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="box-border h-[52px] rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-4 text-base text-[#04202E] outline-none focus:border-[#00ABE7]"
      />
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

// route type import used for nav helper typing
export type { Route };
