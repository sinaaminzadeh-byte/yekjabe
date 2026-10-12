"use client";

// ── Home screen: mobile (390 design) + desktop (1200 landing) ──
import { Logo } from "../logo";
import { Plush } from "../plush";
import {
  CartIcon,
  HeartIcon,
  HeartSticker,
  PawIcon,
} from "../icons";
import { navigate } from "@/lib/hash-route";
import {
  usePishnam,
  useCharityDone,
} from "@/lib/pishnam-store";
import { fa, faPrice, money } from "@/lib/fa";
import { FavHeart } from "../fav";
import {
  PLUSHES,
  BOX_PRICE,
  HOME_STEPS,
  HOME_TRUST,
  DESKTOP_FAQ,
  CHARITY_TARGET,
} from "@/lib/pishnam-data";

/* ═══════════════ MOBILE HOME ═══════════════ */
export function MobileHome() {
  const nextNo = usePishnam((s) => s.nextNo);
  const done = useCharityDone();

  return (
    <div className="flex min-h-screen flex-col bg-[#F2FAFD] md:hidden">
      {/* header */}
      <div className="flex items-center justify-between px-5 pb-2.5 pt-4">
        <Logo size={38} />
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            aria-label="دفتر مهربونی"
            onClick={() => navigate("impact")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D3E8F0] bg-white text-[#04202E]"
          >
            <HeartIcon />
          </button>
          <button
            type="button"
            aria-label="سبد خرید"
            onClick={() => navigate("checkout")}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#D3E8F0] bg-white text-[#04202E]"
          >
            <CartIcon />
            <span className="absolute -left-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#00ABE7] px-1 text-[11px] font-extrabold text-[#04202E]">
              ۱
            </span>
          </button>
        </div>
      </div>

      {/* hero */}
      <div className="relative mx-5 mt-2 min-h-[520px] overflow-hidden rounded-[32px] bg-[#00ABE7] p-6 pb-0 box-border">
        <div className="absolute -bottom-[50px] -left-10 h-[290px] w-[290px] rounded-full bg-[#66CDF1]" />
        <div className="absolute left-[22px] top-[18px]">
          <HeartSticker size={34} fill="#fff" stroke="#04202E" strokeWidth={2.4} />
        </div>
        <div className="absolute left-[130px] top-[290px]">
          <HeartSticker size={22} fill="#F0426B" stroke="#04202E" strokeWidth={3} />
        </div>
        <div className="relative flex flex-col items-start gap-3.5">
          <span className="rounded-[14px] bg-[#04202E] px-3 py-1.5 text-xs font-bold text-white">
            ویژه‌ی دخترای مهربون
          </span>
          <h1 className="m-0 text-[34px] font-black leading-[1.4] text-[#04202E]">
            می‌خوای یکی رو خوشحال کنی؟
          </h1>
          <p className="m-0 max-w-[300px] text-[15px] font-medium leading-[1.9] text-[#04202E]">
            یه دوست پشمالو، یه کارت پستال با پیام قشنگ خودت و یه عالمه مهربونی؛ درست
            می‌فرستیمش دم در خونه‌ی دوستت.
          </p>
          <div className="mt-1 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => navigate("pick")}
              className="flex h-[52px] items-center rounded-full bg-[#04202E] px-[26px] text-base font-extrabold text-white transition-transform active:scale-95"
            >
              بساز و بفرست
            </button>
            <button
              type="button"
              onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}
              className="box-border flex h-[52px] items-center rounded-full border-2 border-[#04202E] px-5 text-[15px] font-bold text-[#04202E]"
            >
              چطوری کار می‌کنه؟
            </button>
          </div>
        </div>
        <div className="absolute -bottom-1.5 left-1.5">
          <Plush kind="bear" size={230} />
        </div>
        <div className="absolute bottom-[34px] right-[22px] rotate-[-6deg] rounded-2xl border-[2.5px] border-[#04202E] bg-white px-3.5 pb-1.5 pt-2 text-center">
          <div className="text-[11px] font-bold text-[#4A6572]">هدیه‌ی شماره</div>
          <div className="text-[30px] font-black leading-[1.1] text-[#04202E]">{fa(nextNo)}</div>
        </div>
      </div>

      {/* next number note */}
      <div className="mx-5 mt-3.5 flex items-center gap-3.5 rounded-3xl border border-[#DDEEF5] bg-white p-3.5">
        <div className="flex h-[72px] w-[84px] shrink-0 flex-col items-center justify-center rounded-[18px] border-2 border-dashed border-[#00ABE7] bg-[#E3F6FD]">
          <span className="text-[11px] font-bold text-[#006387]">شماره‌ی بعدی</span>
          <span className="text-[28px] font-black leading-[1.15] text-[#04202E]">{fa(nextNo)}</span>
        </div>
        <div className="text-[13.5px] font-medium leading-[1.9] text-[#1F3E4D]">
          هر هدیه یه شماره‌ی مخصوص خودش رو داره؛ همون شماره روی جعبه و کارت پستال می‌شینه.
          شماره‌ی بعدی مال کیه؟ شاید دوستت!
        </div>
      </div>

      {/* how */}
      <div id="how" className="flex items-baseline justify-between px-5 pb-3 pt-[30px]">
        <h2 className="m-0 text-[22px] font-extrabold">چطوری کار می‌کنه؟</h2>
        <span className="text-[13px] font-semibold text-[#4A6572]">سه قدم ساده</span>
      </div>
      <div className="no-scrollbar flex gap-3 overflow-x-auto px-5 pb-2 pt-1">
        {HOME_STEPS.map((s) => (
          <div
            key={s.n}
            className="flex min-h-[190px] flex-[0_0_280px] flex-col gap-2.5 rounded-[26px] p-5 box-border"
            style={{ background: s.bg }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#04202E] text-lg font-black text-white">
              {s.n}
            </div>
            <div className="text-[19px] font-extrabold">{s.title}</div>
            <div className="text-sm font-medium leading-[1.85] text-[#1F3E4D]">{s.body}</div>
          </div>
        ))}
      </div>

      {/* products */}
      <div className="flex items-baseline justify-between px-5 pb-3 pt-[26px]">
        <h2 className="m-0 text-[22px] font-extrabold">دوست‌های پشمالو</h2>
        <button
          type="button"
          onClick={() => navigate("pick")}
          className="text-sm font-bold text-[#006387]"
        >
          همه‌شون ›
        </button>
      </div>
      <div className="no-scrollbar flex gap-3 overflow-x-auto px-5 pb-3 pt-1">
        {PLUSHES.map((p) => (
          <div
            key={p.kind}
            role="button"
            tabIndex={0}
            aria-label={`انتخاب ${p.name}`}
            onClick={() => navigate("pick")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navigate("pick");
              }
            }}
            className="relative flex w-40 shrink-0 cursor-pointer flex-col gap-1.5 rounded-3xl border border-[#DDEEF5] bg-white p-2.5 pb-3.5 text-right text-[#04202E] outline-none transition-transform focus-visible:ring-2 focus-visible:ring-[#00ABE7] active:scale-[0.97]"
          >
            <FavHeart kind={p.kind} name={p.name} size={20} box={30} className="absolute end-2 top-2 z-10" />
            <div
              className="flex h-[140px] items-center justify-center rounded-[18px]"
              style={{ background: p.bg }}
            >
              <Plush kind={p.kind} size={124} />
            </div>
            <div className="pt-1 text-base font-extrabold">{p.name}</div>
            <div className="text-xs font-medium text-[#4A6572]">{p.chips.join(" · ")}</div>
            <div className="text-[13px] font-extrabold text-[#006387]">{faPrice(BOX_PRICE)}</div>
          </div>
        ))}
      </div>

      {/* marquee */}
      <Marquee className="mt-[22px] text-base" />

      {/* impact */}
      <div className="mx-0 mt-[26px] flex flex-col gap-3.5 rounded-[30px] bg-[#04202E] p-6 text-white mx-5">
        <div className="flex gap-2.5">
          <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#F0426B]">
            <HeartSticker size={26} fill="#fff" stroke="none" />
          </span>
          <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#00ABE7]">
            <PawIcon size={26} fill="#04202E" stroke="none" />
          </span>
        </div>
        <h2 className="m-0 text-2xl font-black leading-[1.5]">
          با هر قلب، یه هدیه می‌ره پیش یه بچه
        </h2>
        <p className="m-0 text-[14.5px] font-medium leading-[1.95] text-[#D3EEF9]">
          قلب قرمز و پنجه رو می‌تونی هر چندتا که دلت خواست روی جعبه‌ت بچسبونی. پولش می‌ره
          برای هدیه به بچه‌های بی‌سرپرست و پناهگاه حیوونا؛ مدارکش رو هم همیشه همین‌جا
          می‌ذاریم.
        </p>
        <button
          type="button"
          onClick={() => navigate("impact")}
          className="flex h-12 items-center self-start rounded-full bg-[#00ABE7] px-[22px] text-[15px] font-extrabold text-[#04202E]"
        >
          دفتر مهربونی رو ببین
        </button>
      </div>

      {/* trust */}
      <div className="flex gap-2.5 px-5 pt-[22px]">
        {HOME_TRUST.map((t) => (
          <div
            key={t.title}
            className="flex flex-1 flex-col items-center gap-2 rounded-[22px] border border-[#DDEEF5] bg-white px-3 py-4 text-center box-border"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D6F1FB] text-xl font-black text-[#04202E]">
              {t.icon}
            </div>
            <div className="text-sm font-extrabold">{t.title}</div>
            <div className="text-xs font-medium leading-[1.7] text-[#4A6572]">{t.body}</div>
          </div>
        ))}
      </div>

      <div className="px-5 pt-[26px] pb-6 text-center text-[12.5px] font-medium text-[#4A6572]">
        پیشتم · یه بغل، تو یه جعبه · تا حالا {fa(done)} قلب و پنجه ثبت شده
      </div>
    </div>
  );
}

/* ═══════════════ shared marquee ═══════════════ */
export function Marquee({ className = "" }: { className?: string }) {
  const line = (
    <>
      <span>یه بغل، تو یه جعبه</span>
      <span className="text-[#F0426B]">♥</span>
      <span>یه بغل، تو یه جعبه</span>
      <span className="text-[#00ABE7]">♥</span>
      <span>یه بغل، تو یه جعبه</span>
      <span className="text-[#F0426B]">♥</span>
      <span>یه بغل، تو یه جعبه</span>
      <span className="text-[#00ABE7]">♥</span>
    </>
  );
  return (
    <div
      className={`overflow-hidden whitespace-nowrap bg-[#04202E] font-extrabold text-white ${className}`}
    >
      <div className="pishnam-marquee inline-flex items-center gap-7 px-0 py-3">
        {line}
        {line}
      </div>
    </div>
  );
}

/* ═══════════════ DESKTOP HOME ═══════════════ */
export function DesktopHome() {
  const nextNo = usePishnam((s) => s.nextNo);
  const done = useCharityDone();
  const pct = Math.min(100, Math.round((done / CHARITY_TARGET) * 100));

  return (
    <div className="hidden bg-[#F2FAFD] md:block">
      {/* hero */}
      <section className="mt-1.5 bg-[#00ABE7]">
        <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center gap-10 px-6 pb-16 pt-14 box-border">
          <div className="flex min-w-0 flex-[1_1_420px] flex-col items-start gap-5">
            <span className="rounded-2xl bg-[#04202E] px-4 py-2 text-[13.5px] font-bold text-white">
              ویژه‌ی دخترای مهربون
            </span>
            <h1 className="m-0 text-[clamp(38px,5.2vw,68px)] font-black leading-[1.35] text-[#04202E]">
              می‌خوای یکی رو خوشحال کنی؟
            </h1>
            <p className="m-0 max-w-[560px] text-[19px] font-medium leading-[2] text-[#04202E]">
              یه دوست پشمالو، یه کارت پستال با پیام قشنگ خودت و یه عالمه مهربونی؛ درست
              می‌فرستیمش دم در خونه‌ی دوستت.
            </p>
            <div className="mt-1 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate("pick")}
                className="flex h-[58px] items-center rounded-full bg-[#04202E] px-[34px] text-[17px] font-extrabold text-white transition-transform hover:scale-[1.03]"
              >
                بساز و بفرست
              </button>
              <button
                type="button"
                onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}
                className="box-border flex h-[58px] items-center rounded-full border-[2.5px] border-[#04202E] px-7 text-base font-bold text-[#04202E] transition-colors hover:bg-[#04202E] hover:text-white"
              >
                چطوری کار می‌کنه؟
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-[22px] gap-y-2 text-sm font-bold text-[#04202E]">
              <span>ارسال ناشناس</span>
              <span>کارت QR رمزدار</span>
              <span>یه قیمت برای همه</span>
            </div>
          </div>
          <div className="flex min-w-0 flex-[1_1_340px] justify-center">
            <div className="relative aspect-square w-[min(460px,100%)] overflow-hidden">
              <div className="absolute inset-0 rounded-full bg-[#66CDF1]" />
              <div className="absolute left-1/2 top-1/2 -ml-[170px] -mt-[170px]">
                <Plush kind="bear" size={340} className="pishnam-float" />
              </div>
              <div className="absolute right-[6%] top-[10%] rotate-[5deg] rounded-[18px] border-[3px] border-[#04202E] bg-white px-[18px] pb-2 pt-2.5 text-center">
                <div className="text-xs font-bold text-[#4A6572]">هدیه‌ی شماره</div>
                <div className="text-[40px] font-black leading-[1.1] text-[#04202E]">{fa(nextNo)}</div>
              </div>
              <div className="absolute bottom-[14%] right-[10%]">
                <HeartSticker size={44} fill="#F0426B" stroke="#04202E" strokeWidth={2.6} />
              </div>
              <div className="absolute left-[8%] top-[24%]">
                <HeartSticker size={34} fill="#fff" stroke="#04202E" strokeWidth={2.6} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Marquee className="text-lg" />

      {/* how */}
      <section id="how" className="mx-auto w-full max-w-[1200px] px-6 pt-20 box-border">
        <div className="mb-7 flex flex-col gap-2">
          <span className="text-sm font-extrabold text-[#006387]">سه قدم ساده</span>
          <h2 className="m-0 text-[38px] font-black leading-[1.4]">چطوری کار می‌کنه؟</h2>
        </div>
        <div className="flex flex-wrap gap-[18px]">
          <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-3.5 rounded-[32px] bg-[#CFEFFB] p-[26px]">
            <div className="flex h-[150px] items-end justify-center overflow-hidden">
              <Plush kind="bunny" size={108} />
              <Plush kind="bear" size={132} />
              <Plush kind="cat" size={108} />
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#04202E] text-lg font-black text-white">۱</span>
              <span className="text-[22px] font-black">دوستت رو انتخاب کن</span>
            </div>
            <p className="m-0 text-[15.5px] font-medium leading-[1.95] text-[#1F3E4D]">{HOME_STEPS[0].body}</p>
          </div>
          <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-3.5 rounded-[32px] bg-[#FFE0EA] p-[26px]">
            <div className="flex h-[150px] items-center justify-center">
              <div className="flex h-[130px] w-[190px] rotate-[-4deg] items-center justify-center rounded-[14px] border-[3px] border-[#04202E] bg-white">
                <QrGlyph />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#04202E] text-lg font-black text-white">۲</span>
              <span className="text-[22px] font-black">کارت پستالت رو بنویس</span>
            </div>
            <p className="m-0 text-[15.5px] font-medium leading-[1.95] text-[#1F3E4D]">{HOME_STEPS[1].body}</p>
          </div>
          <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-3.5 rounded-[32px] bg-[#FFF3C9] p-[26px]">
            <div className="flex h-[150px] items-center justify-center">
              <div className="rotate-[4deg] rounded-[20px] border-[3.5px] border-[#04202E] bg-white px-[26px] pb-2 pt-3 text-center">
                <div className="text-[13px] font-bold text-[#4A6572]">هدیه‌ی شماره</div>
                <div className="text-[64px] font-black leading-[1.1]">{fa(nextNo)}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#04202E] text-lg font-black text-white">۳</span>
              <span className="text-[22px] font-black">ما می‌فرستیم، تو لذتشو ببر</span>
            </div>
            <p className="m-0 text-[15.5px] font-medium leading-[1.95] text-[#1F3E4D]">{HOME_STEPS[2].body}</p>
          </div>
        </div>
      </section>

      {/* friends */}
      <section id="friends" className="mx-auto w-full max-w-[1200px] px-6 pt-[88px] box-border">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-extrabold text-[#006387]">یه قیمت برای همه</span>
            <h2 className="m-0 text-[38px] font-black leading-[1.4]">دوست‌های پشمالو</h2>
          </div>
          <div className="rounded-[22px] border border-[#DDEEF5] bg-white px-[22px] py-3.5 text-[15px] font-semibold leading-[1.8] text-[#1F3E4D]">
            همه‌ی جعبه‌ها <b className="text-[#04202E]">{faPrice(BOX_PRICE)}</b>؛ چون مهربونی وزن
            نداره.
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          {PLUSHES.map((p) => (
            <div
              key={p.kind}
              role="button"
              tabIndex={0}
              aria-label={`انتخاب ${p.name}`}
              onClick={() => navigate("pick")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  navigate("pick");
                }
              }}
              className="group relative flex min-w-0 cursor-pointer flex-[1_1_170px] flex-col gap-1.5 rounded-[28px] border border-[#DDEEF5] bg-white p-3 pb-[18px] text-right text-[#04202E] outline-none transition-all focus-visible:ring-2 focus-visible:ring-[#00ABE7] hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(4,32,46,0.08)]"
            >
              <FavHeart kind={p.kind} name={p.name} size={22} box={36} className="absolute end-3 top-3 z-10" />
              <div
                className="flex h-[180px] items-center justify-center rounded-[20px] transition-transform group-hover:scale-[1.04]"
                style={{ background: p.bg }}
              >
                <Plush kind={p.kind} size={150} />
              </div>
              <div className="pt-2 text-lg font-extrabold">{p.name}</div>
              <div className="text-[13px] font-medium text-[#4A6572]">{p.chips.join(" · ")}</div>
              <div className="text-[14.5px] font-extrabold text-[#006387]">{money(BOX_PRICE)} تومان</div>
            </div>
          ))}
        </div>
      </section>

      {/* card */}
      <section id="card" className="mx-auto w-full max-w-[1200px] px-6 pt-[88px] box-border">
        <div className="flex flex-wrap items-center gap-10 rounded-[40px] bg-[#D6F1FB] px-10 py-12 box-border">
          <div className="flex min-w-0 flex-[1_1_320px] justify-center">
            <div className="flex aspect-[10/7] w-[min(380px,100%)] rotate-[-3deg] items-center justify-center rounded-[22px] border-4 border-[#04202E] bg-[#00ABE7] box-border pishnam-tilt">
              <div className="flex aspect-square w-[58%] items-center justify-center rounded-3xl border-[3px] border-[#04202E] bg-white box-border">
                <QrGlyph className="h-[72%] w-auto" />
              </div>
            </div>
          </div>
          <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-3.5">
            <span className="text-sm font-extrabold text-[#006387]">کارت پستالِ رمزدار</span>
            <h2 className="m-0 text-[36px] font-black leading-[1.45]">فقط یه QR، یه دنیا حرف</h2>
            <p className="m-0 text-base font-medium leading-[2] text-[#1F3E4D]">
              همراه هر جعبه یه کارت پستال می‌فرستیم که فقط یه QR روشه. دوستت اسکنش می‌کنه،
              رمزی که تو انتخاب کردی رو می‌زنه و صفحه‌ی خودش باز می‌شه؛ با پیام، عکس یا
              ویدیوی تو.
            </p>
            <div className="mt-1 flex flex-wrap gap-2.5">
              <span className="rounded-2xl border-[1.5px] border-[#CFE6EF] bg-white px-4 py-2 text-sm font-bold">۱. اسکن می‌کنه</span>
              <span className="rounded-2xl border-[1.5px] border-[#CFE6EF] bg-white px-4 py-2 text-sm font-bold">۲. رمز رو می‌زنه</span>
              <span className="rounded-2xl border-[1.5px] border-[#CFE6EF] bg-white px-4 py-2 text-sm font-bold">۳. پیامت رو می‌بینه</span>
            </div>
            <button
              type="button"
              onClick={() => navigate("gift")}
              className="mt-2 flex h-12 w-fit items-center rounded-full border-2 border-[#04202E] px-5 text-[15px] font-extrabold text-[#04202E] transition-colors hover:bg-[#04202E] hover:text-white"
            >
              یه کارت رو آزمایشی باز کن ›
            </button>
          </div>
        </div>
      </section>

      {/* love */}
      <section id="love" className="mx-auto w-full max-w-[1200px] px-6 pt-[88px] box-border">
        <div className="flex flex-wrap items-center gap-9 rounded-[40px] bg-[#04202E] px-11 py-[52px] text-white box-border">
          <div className="flex min-w-0 flex-[1_1_420px] flex-col items-start gap-4">
            <div className="flex gap-2.5">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F0426B]">
                <HeartSticker size={28} fill="#fff" stroke="none" />
              </span>
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#00ABE7]">
                <PawIcon size={28} fill="#04202E" stroke="none" />
              </span>
            </div>
            <h2 className="m-0 text-[38px] font-black leading-[1.5]">
              با هر قلب، یه هدیه می‌ره پیش یه بچه
            </h2>
            <p className="m-0 text-[16.5px] font-medium leading-[2] text-[#D3EEF9]">
              قلب قرمز و پنجه رو هر چندتا که دلت خواست می‌تونی هنگام سفارش به جعبه اضافه
              کنی. پولش می‌ره برای هدیه به بچه‌های بی‌سرپرست و پناهگاه حیوونا. رسید و عکس
              تحویل همه‌ی ارسال‌ها تو دفتر مهربونی ثبت می‌شه.
            </p>
            <button
              type="button"
              onClick={() => navigate("extras")}
              className="flex h-[54px] items-center rounded-full bg-[#00ABE7] px-[30px] text-base font-extrabold text-[#04202E] transition-transform hover:scale-[1.03]"
            >
              قلب اضافه کن
            </button>
          </div>
          <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-3.5 rounded-[30px] bg-[#0A3146] p-7">
            <span className="text-sm font-bold text-[#BFE9F8]">اولین بسته‌ی خیریه</span>
            <div className="flex items-baseline gap-2.5">
              <span className="text-[64px] font-black leading-[1.1] text-[#00ABE7]">{fa(done)}</span>
              <span className="text-xl font-bold">از {fa(CHARITY_TARGET)} هدیه</span>
            </div>
            <div className="h-3.5 overflow-hidden rounded-full bg-[#0E3C52]">
              <div className="h-3.5 rounded-full bg-[#00ABE7] transition-all" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-[13.5px] font-medium leading-[1.9] text-[#D3EEF9]">
              وقتی به {fa(CHARITY_TARGET)} تا برسیم، هدیه‌ها رو می‌خریم و می‌فرستیم و مدرکش رو
              همین‌جا می‌ذاریم.
            </span>
          </div>
        </div>
      </section>

      {/* faq */}
      <section id="faq" className="mx-auto w-full max-w-[1200px] px-6 pt-[88px] box-border">
        <h2 className="m-0 mb-7 text-[38px] font-black leading-[1.4]">سؤال‌های رایج</h2>
        <div className="flex flex-wrap gap-4">
          {DESKTOP_FAQ.map((f) => (
            <div
              key={f.q}
              className="box-border flex min-w-0 flex-[1_1_460px] flex-col gap-2.5 rounded-[26px] border border-[#DDEEF5] bg-white px-[26px] py-6"
            >
              <div className="text-lg font-extrabold">{f.q}</div>
              <div className="text-[15px] font-medium leading-[2] text-[#1F3E4D]">{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* footer */}
      <footer className="mt-24 bg-[#04202E] text-white">
        <div className="mx-auto flex w-full max-w-[1200px] flex-wrap justify-between gap-9 px-6 pb-10 pt-14 box-border">
          <div className="flex flex-[1_1_280px] flex-col gap-3.5">
            <Logo size={44} />
            <span className="text-[15px] font-bold text-[#BFE9F8]">یه بغل، تو یه جعبه</span>
          </div>
          <div className="flex flex-col gap-2.5 text-[15px] font-semibold">
            <span className="text-base font-extrabold text-[#00ABE7]">پیشتم</span>
            <FooterLink label="چطوری کار می‌کنه؟" target="how" />
            <FooterLink label="دوست‌های پشمالو" target="friends" />
            <FooterLink label="دفتر مهربونی" target="love" />
          </div>
          <div className="flex flex-col gap-2.5 text-[15px] font-semibold">
            <span className="text-base font-extrabold text-[#00ABE7]">کمک</span>
            <FooterLink label="سؤال‌های رایج" target="faq" />
            <FooterLink label="قوانین و شرایط" route="shipping" />
            <FooterLink label="تماس با ما" route="contact" />
          </div>
          <div className="flex flex-col gap-2.5 text-[15px] font-semibold">
            <span className="text-base font-extrabold text-[#00ABE7]">ما رو دنبال کن</span>
            <span>پیشتم@ اینستاگرام</span>
            <span>پیشتم@ تلگرام</span>
            <span>نماد اعتماد الکترونیکی</span>
          </div>
        </div>
        <div className="border-t border-[#0E3C52] px-6 py-[18px] text-center text-[13px] font-medium text-[#BFE9F8]">
          پیشتم · همه‌ی حقوق محفوظ است
        </div>
      </footer>
    </div>
  );
}

function FooterLink({ label, target, route }: { label: string; target?: string; route?: "shipping" | "contact" }) {
  return (
    <button
      type="button"
      className="text-right transition-colors hover:text-[#00ABE7]"
      onClick={() => {
        if (target) document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
        else if (route) navigate(route);
      }}
    >
      {label}
    </button>
  );
}

function QrGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 25 25" className={className} aria-hidden="true">
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
