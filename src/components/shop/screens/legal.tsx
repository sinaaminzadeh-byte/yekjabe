"use client";

// ── Legal pages: حریم خصوصی / قوانین / مرجوعی (#/legal?doc=…) — Phase C ──
// Draft Persian copy for owner review (پیش‌نویس badge). Invalid doc falls back
// to privacy. Tab switcher on top + links to the other two docs at the bottom.
import { BackIcon } from "../icons";
import { navigate } from "@/lib/hash-route";
import { useDocumentMeta } from "@/lib/seo/metadata";

type DocKey = "privacy" | "terms" | "refund";

interface Section {
  h: string;
  ps?: string[];
  list?: string[];
}

interface Doc {
  key: DocKey;
  label: string;
  title: string;
  metaTitle: string;
  description: string;
  intro: string;
  sections: Section[];
}

const DOCS: Record<DocKey, Doc> = {
  privacy: {
    key: "privacy",
    label: "حریم خصوصی",
    title: "حریم خصوصی",
    metaTitle: "حریم خصوصی",
    description: "یک دوست با چه داده‌ای کار می‌کنه، چی رو جایی نمی‌بره و چطور می‌تونی حذفش کنی.",
    intro:
      "ما تو یک دوست فقط اون‌قدر داده نگه می‌داریم که هدیه‌ات برسه و حسابت درست کار کنه. این برگه صادقانه می‌گه چی ذخیره می‌شه و چی هرگز جایی نمی‌ره.",
    sections: [
      {
        h: "چه داده‌ای جمع می‌کنیم؟",
        list: [
          "شماره موبایل و اسمت — برای ورود و حساب «هدیه‌هام».",
          "اسم، شماره و آدرس گیرنده — فقط برای اینکه جعبه با پست برسه.",
          "پیام هدیه (متن کارت) — برای چاپ روی کارت پستال و نمایش با رمز QR.",
          "رسید پرداخت — اگه کارت‌به‌کارت پرداخت کردی، عکس رسیدت برای بررسی حساب نگه داشته می‌شه.",
        ],
      },
      {
        h: "چی رو جایی نمی‌بریم",
        ps: [
          "هیچ‌کدوم از داده‌هات رو نمی‌فروشیم، اجاره نمی‌دیم و برای تبلیغات به کسی نمی‌دیم.",
          "آدرس گیرنده فقط برای ارسال همین سفارش استفاده می‌شه؛ بعدش فقط تو همون سفارش می‌مونه.",
        ],
      },
      {
        h: "کوکی و نشست ورود",
        ps: [
          "برای اینکه لازم نباشه هر بار کد بدی، یه کوکی نشست (pn_session) روی مرورگرت ذخیره می‌شه. این کوکی فقط برای شناختن حسابت است؛ بدون ورود، هیچ داده‌ی شخصی‌ای با صفحه‌های عمومی رد و بدل نمی‌شه.",
        ],
      },
      {
        h: "حق حذف داده‌هات",
        ps: [
          "هر وقت بخوای می‌تونی از طریق پشتیبانی (همین صفحه، بخش تماس) بخوای حسابت و داده‌هات حذف بشه. سفارش‌های تحویل‌شده فقط تا حدی که قانون حسابداری اجازه می‌ده نگه داشته می‌شن و بقیه‌ش پاک می‌شه.",
        ],
      },
    ],
  },
  terms: {
    key: "terms",
    label: "قوانین خرید",
    title: "قوانین خرید",
    metaTitle: "قوانین خرید",
    description: "قیمت‌ها، روش پرداخت، زمان ارسال و قواعد خرید از یک دوست.",
    intro:
      "این برگه قواعد خرید از یک دوست است؛ کوتاه و بدون حروف ریز. با ثبت سفارش، یعنی این‌ها رو قبول گرفتی.",
    sections: [
      {
        h: "قوانین خرید",
        ps: [
          "هر جعبه یک دوست پشمالو است با یه قیمت مشخص. موجودی انبار واقعیه؛ اگه سفارش‌ت ثبت نشه، پولی ازت برداشته نمی‌شه.",
          "قبل از ارسال می‌تونی آدرس یا پیام کارت رو اصلاح کنی؛ بعد از تحویل به پست، تغییر ممکن نیست.",
        ],
      },
      {
        h: "قیمت‌ها",
        ps: [
          "همه‌ی قیمت‌ها به تومان و شامل مالیات است. هزینه‌ی ارسال جدا محاسبه و قبل از پرداخت نشون داده می‌شه (تهران و شهرستان متفاوته).",
        ],
      },
      {
        h: "روش پرداخت",
        list: [
          "زرین‌پال — درگاه آنلاین کارت‌های عضو شتاب.",
          "کارت‌به‌کارت — عکس رسید رو آپلود می‌کنی؛ بعد از تأیید دستی ما، سفارش وارد صف بسته‌بندی می‌شه.",
        ],
      },
      {
        h: "زمان ارسال",
        ps: [
          "بعد از تأیید پرداخت، حدود ۲ روز کاری بسته‌بندی می‌کنیم و تحویل پست می‌دیم. رسیدن بسته بستگی به شهر گیرنده داره؛ معمولاً ۲ تا ۵ روز کاری.",
        ],
      },
      {
        h: "نیروی قهری",
        ps: [
          "اگه اتفاقی خارج از اراده‌ی ما (قطعی کامل پست، بلایای طبیعی، اختلال گسترده‌ی اینترنت) ارسال رو متوقف کنه، سفارش‌ت معطل می‌مونه ولی بی‌جواب نمی‌مونه: خبرت می‌کنیم و تا رفع مشکل، حق لغو و بازگشت کامل وجه رو داری.",
        ],
      },
    ],
  },
  refund: {
    key: "refund",
    label: "مرجوعی",
    title: "مرجوعی و آسیب حمل‌ونقل",
    metaTitle: "مرجوعی",
    description: "شرایط مرجوعی یک دوست: فقط آسیب فیزیکی، تا ۷ روز با عکس؛ مسیر درخواست از «هدیه‌هام».",
    intro:
      "هیچ‌کس دوست نداره هدیه‌ش آسیب‌دار برسه. این برگه دقیق می‌گه کی می‌شه مرجوع کرد و مسیرش چطوره.",
    sections: [
      {
        h: "چه زمانی مرجوع می‌شه؟",
        ps: [
          "فقط آسیب فیزیکی: اگه جعبه یا عروسک موقع حمل‌ونقل آسیب دیده باشه، تا ۷ روز پس از تحویل می‌تونی درخواست بدی. حتماً چند تا عکس واضح از آسیب ضمیمه کن — بدون عکس نمی‌تونیم پیگیری کنیم.",
        ],
      },
      {
        h: "هزینه‌ها با کیه؟",
        ps: [
          "هزینه‌ی ارسالِ مرجوعیِ ناشی از آسیب حمل‌ونقل با ما است — چیزی به گردنت نیست. وجه به کارت مبدأ برمی‌گرده.",
        ],
      },
      {
        h: "مسیر درخواست",
        list: [
          "تو صفحه‌ی «هدیه‌هام»، روی کارت همون سفارش دکمه‌ی «درخواست مرجوعی» رو بزن و دلیل رو بنویس.",
          "تیم ما تا ۴۸ ساعت بررسی می‌کنه و اگه تأیید بشه، وجه به کارت مبدأ برمی‌گرده.",
          "نتیجه‌ی بررسی همون‌جا روی وضعیت سفارش می‌افته.",
        ],
      },
      {
        h: "هدیه‌های شخصی‌سازی‌شده",
        ps: [
          "هدیه‌هایی که سالم رسیده‌ن ولی شخصی‌سازی شده‌ن (پیام کارت، قلب و پنجه، ناشناس بودن) مرجوع نیستند؛ چون این هدیه دقیقاً برای یک نفر ساخته شده و قابل فروش دوباره نیست. برای همین قبل از ثبت، پیام و گزینه‌ها رو با دقت نهایی کن.",
        ],
      },
    ],
  },
};

const ORDER: DocKey[] = ["privacy", "terms", "refund"];

export function LegalPage({ doc }: { doc: string }) {
  const key: DocKey = ((ORDER as string[]).includes(doc) ? doc : "privacy") as DocKey;
  const d = DOCS[key];
  const others = ORDER.filter((k) => k !== key);

  useDocumentMeta({ title: d.metaTitle, description: d.description });

  return (
    <div className="flex min-h-screen flex-col bg-[#F2FAFD]">
      {/* mobile top bar */}
      <div className="flex items-center justify-between px-5 pb-1.5 pt-4 md:hidden">
        <button
          type="button"
          aria-label="برگشت"
          onClick={() => navigate("home")}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D3E8F0] bg-white text-[#04202E]"
        >
          <BackIcon size={22} />
        </button>
        <span aria-hidden="true" className="text-[22px]">📜</span>
      </div>

      <main className="mx-auto w-full max-w-[860px] flex-1 px-4 pb-12 pt-3 md:px-6 md:pt-8">
        {/* hero + draft badge */}
        <section className="flex flex-col items-start gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-[14px] bg-[#04202E] px-3.5 py-[7px] text-[13px] font-bold text-white">
              یک دوست
            </span>
            <span className="rounded-full bg-[#FFF3C9] px-3 py-1.5 text-[11.5px] font-extrabold text-[#8A6D1F]">
              پیش‌نویس — در انتظار تأیید مالک
            </span>
          </div>
          <h1 className="m-0 text-[28px] font-black leading-[1.5] text-[#04202E] md:text-[38px]">{d.title}</h1>
          <p className="m-0 max-w-[680px] text-[15px] font-medium leading-[2] text-[#1F3E4D]">{d.intro}</p>
        </section>

        {/* tab switcher */}
        <nav aria-label="برگه‌های قانونی" className="flex gap-2 overflow-x-auto pt-6">
          {ORDER.map((k) => {
            const on = k === key;
            return (
              <button
                key={k}
                type="button"
                aria-pressed={on}
                onClick={() => navigate("legal", { doc: k })}
                className="h-11 shrink-0 rounded-full px-5 text-[13.5px] font-extrabold transition-all"
                style={{
                  background: on ? "#04202E" : "#fff",
                  border: `1.5px solid ${on ? "#04202E" : "#CFE6EF"}`,
                  color: on ? "#fff" : "#04202E",
                }}
              >
                {DOCS[k].label}
              </button>
            );
          })}
        </nav>

        {/* body card */}
        <article className="mt-5 flex flex-col gap-7 rounded-[28px] border border-[#DDEEF5] bg-white p-5 md:p-9">
          {d.sections.map((s) => (
            <section key={s.h} className="flex flex-col gap-2.5">
              <h2 className="m-0 flex items-center gap-2 text-[17px] font-black text-[#04202E] md:text-[20px]">
                <span className="h-[18px] w-[5px] shrink-0 rounded-full bg-[#00ABE7]" aria-hidden="true" />
                {s.h}
              </h2>
              {s.ps?.map((p, i) => (
                <p key={i} className="m-0 text-[14.5px] font-medium leading-[2.05] text-[#1F3E4D]">
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="m-0 flex list-disc flex-col gap-1.5 ps-6">
                  {s.list.map((li, i) => (
                    <li key={i} className="text-[14.5px] font-medium leading-[2.05] text-[#1F3E4D]">
                      {li}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>

        {/* links to the other two docs */}
        <section className="flex flex-col gap-2.5 pt-6">
          <span className="text-[13.5px] font-extrabold text-[#04202E]">بقیه‌ی برگه‌ها:</span>
          <div className="flex flex-wrap gap-2">
            {others.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => navigate("legal", { doc: k })}
                className="flex h-11 items-center rounded-full border-[1.5px] border-[#CFE6EF] bg-white px-5 text-[13.5px] font-extrabold text-[#04202E] transition-colors hover:border-[#00ABE7]"
              >
                {DOCS[k].label}
              </button>
            ))}
          </div>
        </section>
      </main>

      <div className="mt-auto" aria-hidden="true" />
    </div>
  );
}
