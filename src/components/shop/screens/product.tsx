"use client";

// ── Product detail screen — #/product?slug=bear (wave-0 route-ready) ──
// In the sandbox it lives on the hash router; at the deploy wave the same
// sections become /product/[slug] server components with real metadata.
// SEO: useDocumentMeta (client title/desc) + Product/FAQ/Breadcrumb JSON-LD.

import { useHashRoute, navigate } from "@/lib/hash-route";
import { useDocumentMeta } from "@/lib/seo/metadata";
import { getProductSeo, type ProductSeo } from "@/lib/seo/product-catalog";
import { SITE } from "@/lib/seo/site";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  productJsonLd,
  type BreadcrumbItem,
} from "@/lib/seo/jsonld";
import { JsonLd } from "../jsonld";
import { Plush } from "../plush";
import { Logo } from "../logo";
import {
  BackIcon,
  HeartIcon,
  HeartSticker,
  PawIcon,
  PawSticker,
  PlusIcon,
  QrCode,
} from "../icons";
import { BOX_PRICE, PLUSHES, PLUSH_MAP } from "@/lib/pishnam-data";
import { faPrice } from "@/lib/fa";

/* ═══════════════ screen root ═══════════════ */

export function ProductScreen() {
  const { query } = useHashRoute();
  const product = getProductSeo(query.get("slug"));

  useDocumentMeta({
    title: product ? product.nameFa : "این دوست پشمالو پیدا نشد",
    description: product?.description,
  });

  if (!product) return <ProductNotFound />;
  return <ProductDetail product={product} />;
}

/* ═══════════════ detail (valid slug) ═══════════════ */

function ProductDetail({ product }: { product: ProductSeo }) {
  const productLd = productJsonLd(product.slug);
  const crumbs: BreadcrumbItem[] = [
    { name: "خانه", url: SITE.url },
    { name: "دوست‌های پشمالو", url: `${SITE.url}/#friends` },
    { name: product.nameFa },
  ];
  const others = PLUSHES.filter((p) => p.kind !== product.slug);

  return (
    <>
      {productLd && <JsonLd data={productLd} />}
      <JsonLd data={faqJsonLd(product.faq)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <MobileProduct product={product} others={others} />
      <DesktopProduct product={product} others={others} />
    </>
  );
}

/* ═══════════════ shared pieces ═══════════════ */

function Crumbs({ name, desktop = false }: { name: string; desktop?: boolean }) {
  const item = desktop
    ? "text-[13.5px] font-semibold text-[#4A6572]"
    : "text-[12.5px] font-semibold text-[#4A6572]";
  const current = desktop
    ? "text-[13.5px] font-extrabold text-[#04202E]"
    : "text-[12.5px] font-extrabold text-[#04202E]";
  return (
    <nav aria-label="مسیر صفحه">
      <ol className={`m-0 flex list-none flex-wrap items-center gap-1.5 p-0 ${desktop ? "gap-2" : ""}`}>
        <li>
          <button type="button" onClick={() => navigate("home")} className={`${item} transition-colors hover:text-[#006387]`}>
            خانه
          </button>
        </li>
        <li aria-hidden="true" className={item}>/</li>
        <li>
          <button
            type="button"
            onClick={() => navigate("home", undefined, "friends")}
            className={`${item} transition-colors hover:text-[#006387]`}
          >
            دوست‌های پشمالو
          </button>
        </li>
        <li aria-hidden="true" className={item}>/</li>
        <li aria-current="page" className={current}>{name}</li>
      </ol>
    </nav>
  );
}

// Hero art: big plush on its brand color + placeholder gift-box / QR postcard art
function ProductArt({ product, plushSize }: { product: ProductSeo; plushSize: number }) {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ background: PLUSH_MAP[product.slug].bg }}
    >
      <Plush kind={product.slug} size={plushSize} className="pishnam-float" />
      <span className="absolute right-[5%] top-[7%] rotate-[-10deg]">
        <HeartSticker size={38} fill="#F0426B" stroke="#04202E" strokeWidth={2.6} />
      </span>
      <span className="absolute left-[7%] top-[14%] rotate-[12deg]">
        <HeartSticker size={26} fill="#fff" stroke="#04202E" strokeWidth={2.6} />
      </span>
      {/* placeholder gift-box + postcard art (real photos land at deploy wave) */}
      <div className="absolute bottom-[6%] left-[6%] rotate-[-6deg] rounded-[18px] border-[2.5px] border-[#04202E] bg-white px-3.5 pb-2 pt-3 text-center shadow-[0_10px_22px_rgba(4,32,46,0.12)]">
        <QrCode size={46} />
        <div className="mt-1 text-[10.5px] font-bold text-[#4A6572]">کارت پستال رمزدار</div>
      </div>
      <div className="absolute bottom-[8%] right-[7%] rotate-[7deg] rounded-[14px] border-[2.5px] border-[#04202E] bg-[#00ABE7] px-3 py-2 text-center">
        <div className="text-[10px] font-bold text-[#04202E]">جعبه‌ی هدیه</div>
        <div className="text-[13px] font-black leading-[1.3] text-[#04202E]">یه بغل، تو یه جعبه</div>
      </div>
    </div>
  );
}

function FeatureRow({ text, i }: { text: string; i: number }) {
  const Icon = i % 2 === 0 ? HeartIcon : PawIcon;
  return (
    <div className="flex items-start gap-2.5 rounded-[18px] border border-[#DDEEF5] bg-white px-3.5 py-2.5">
      <Icon className="mt-0.5 shrink-0" />
      <span className="text-[14px] font-medium leading-[1.85] text-[#1F3E4D]">{text}</span>
    </div>
  );
}

function OccasionChips({ product }: { product: ProductSeo }) {
  return (
    <div className="flex flex-wrap gap-2">
      {product.occasionTags.map((t) => (
        <span
          key={t}
          className="rounded-full bg-[#E3F6FD] px-3.5 py-1.5 text-[13px] font-bold text-[#006387]"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group rounded-[20px] border border-[#DDEEF5] bg-white px-4 py-3">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2.5 text-[14.5px] font-extrabold [&::-webkit-details-marker]:hidden">
        {q}
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D6F1FB] transition-transform group-open:rotate-45">
          <PlusIcon size={14} stroke="#04202E" />
        </span>
      </summary>
      <p className="mb-0 mt-2.5 text-[13.5px] font-medium leading-[2] text-[#1F3E4D]">{a}</p>
    </details>
  );
}

/* ═══════════════ mobile (390 design) ═══════════════ */

function MobileProduct({
  product,
  others,
}: {
  product: ProductSeo;
  others: typeof PLUSHES;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F2FAFD] text-[#04202E] md:hidden">
      {/* top bar */}
      <div className="flex items-center justify-between px-4 pb-2 pt-3.5">
        <button
          type="button"
          aria-label="برگشت"
          onClick={() => navigate("home")}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D3E8F0] bg-white text-[#04202E]"
        >
          <BackIcon />
        </button>
        <Logo size={32} />
      </div>

      <div className="px-5 pt-1">
        <Crumbs name={product.nameFa} />
      </div>

      {/* hero art */}
      <div className="mx-5 mt-2.5 h-[300px] overflow-hidden rounded-[32px]">
        <ProductArt product={product} plushSize={228} />
      </div>

      {/* name + tagline + description */}
      <div className="flex flex-col gap-1.5 px-5 pt-5">
        <h1 className="m-0 text-[27px] font-black leading-[1.45]">{product.nameFa}</h1>
        <p className="m-0 text-[15px] font-bold leading-[1.8] text-[#006387]">{product.shortTagline}</p>
        <p className="m-0 text-[14.5px] font-medium leading-[2.05] text-[#1F3E4D]">{product.description}</p>
      </div>

      {/* price */}
      <div className="mx-5 mt-4 flex items-center justify-between gap-3 rounded-[24px] border border-[#DDEEF5] bg-white px-4 py-3.5">
        <div className="flex flex-col gap-1">
          <span className="text-[21px] font-black leading-[1.25]">{faPrice(BOX_PRICE)}</span>
          <span className="rounded-full bg-[#D6F1FB] px-2.5 py-0.5 text-[11px] font-extrabold text-[#006387]">
            یه قیمت برای همه
          </span>
        </div>
        <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#D6F1FB]">
          <PawSticker size={30} />
        </span>
      </div>

      {/* features */}
      <section className="flex flex-col gap-2.5 px-5 pt-6">
        <h2 className="m-0 text-[19px] font-extrabold">چی تو جعبه‌ست؟</h2>
        {product.features.map((f, i) => (
          <FeatureRow key={f} text={f} i={i} />
        ))}
      </section>

      {/* occasions */}
      <section className="flex flex-col gap-2.5 px-5 pt-6">
        <h2 className="m-0 text-[19px] font-extrabold">برای چه بهانه‌ای؟</h2>
        <OccasionChips product={product} />
      </section>

      {/* faq */}
      <section className="flex flex-col gap-2.5 px-5 pt-7">
        <h2 className="m-0 text-[19px] font-extrabold">سؤال‌های رایج</h2>
        {product.faq.map((f) => (
          <FaqItem key={f.q} q={f.q} a={f.a} />
        ))}
      </section>

      {/* cross-links */}
      <section className="pt-8">
        <div className="flex items-baseline justify-between px-5 pb-3">
          <h2 className="m-0 text-[19px] font-extrabold">بقیه‌ی دوست‌های پشمالو</h2>
          <button
            type="button"
            onClick={() => navigate("home", undefined, "friends")}
            className="text-[13px] font-bold text-[#006387]"
          >
            همه‌شون ›
          </button>
        </div>
        <div className="no-scrollbar flex gap-3 overflow-x-auto px-5 pb-2 pt-1">
          {others.map((p) => (
            <button
              key={p.kind}
              type="button"
              aria-label={`دیدن ${p.name}`}
              onClick={() => navigate("product", { slug: p.kind })}
              className="w-32 shrink-0 rounded-[22px] border border-[#DDEEF5] bg-white p-2 pb-3 text-right transition-transform active:scale-[0.97]"
            >
              <div
                className="flex h-[104px] items-center justify-center rounded-[16px]"
                style={{ background: p.bg }}
              >
                <Plush kind={p.kind} size={92} />
              </div>
              <div className="pt-1.5 text-[13.5px] font-extrabold">{p.name}</div>
              <div className="text-[11.5px] font-bold text-[#006387]">{faPrice(BOX_PRICE)}</div>
            </button>
          ))}
        </div>
      </section>

      {/* sticky CTA bar */}
      <div className="sticky bottom-[var(--pn-mnav-h)] mt-auto flex items-center justify-between gap-3.5 border-t border-[#D3E8F0] bg-white/95 px-5 pb-[max(14px,env(safe-area-inset-bottom))] pt-3.5 backdrop-blur">
        <div className="flex shrink-0 flex-col">
          <span className="text-[17px] font-black leading-[1.3]">{faPrice(BOX_PRICE)}</span>
          <span className="text-[11px] font-bold text-[#4A6572]">یه قیمت برای همه</span>
        </div>
        <button
          type="button"
          onClick={() => navigate("pick", { kind: product.slug })}
          className="flex h-12 flex-1 items-center justify-center rounded-full bg-[#04202E] px-6 text-[15px] font-extrabold text-white transition-transform active:scale-[0.98]"
        >
          بساز و بفرست
        </button>
      </div>
    </div>
  );
}

/* ═══════════════ desktop (1200 landing) ═══════════════ */

function DesktopProduct({
  product,
  others,
}: {
  product: ProductSeo;
  others: typeof PLUSHES;
}) {
  return (
    <div className="hidden min-h-screen flex-col bg-[#F2FAFD] text-[#04202E] md:flex">
      <div className="mx-auto w-full max-w-[1200px] px-6 pt-5">
        <Crumbs name={product.nameFa} desktop />
      </div>

      {/* hero */}
      <section className="mx-auto w-full max-w-[1200px] px-6 pt-4">
        <div className="flex flex-wrap items-center gap-10">
          <div className="flex min-w-0 flex-[1_1_420px] justify-center">
            <div className="aspect-square w-[min(460px,100%)] overflow-hidden rounded-[40px]">
              <ProductArt product={product} plushSize={300} />
            </div>
          </div>
          <div className="flex min-w-0 flex-[1_1_460px] flex-col items-start gap-4">
            <span className="self-start rounded-2xl bg-[#04202E] px-4 py-2 text-[13.5px] font-bold text-white">
              جعبه‌ی هدیه‌ی یک دوست
            </span>
            <h1 className="m-0 text-[40px] font-black leading-[1.35]">{product.nameFa}</h1>
            <p className="m-0 text-[19px] font-bold text-[#006387]">{product.shortTagline}</p>
            <p className="m-0 max-w-[560px] text-[15.5px] font-medium leading-[2.05] text-[#1F3E4D]">
              {product.description}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-4">
              <span className="text-[30px] font-black">{faPrice(BOX_PRICE)}</span>
              <span className="rounded-full bg-[#D6F1FB] px-4 py-1.5 text-[13px] font-extrabold text-[#006387]">
                یه قیمت برای همه
              </span>
            </div>
            <div className="mt-1 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate("pick", { kind: product.slug })}
                className="flex h-[58px] items-center rounded-full bg-[#04202E] px-[34px] text-[17px] font-extrabold text-white transition-transform hover:scale-[1.03]"
              >
                بساز و بفرست
              </button>
              <button
                type="button"
                onClick={() => navigate("home", undefined, "friends")}
                className="box-border flex h-[58px] items-center rounded-full border-[2.5px] border-[#04202E] px-7 text-base font-bold text-[#04202E] transition-colors hover:bg-[#04202E] hover:text-white"
              >
                دوست‌های دیگه رو ببین
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-[22px] gap-y-2 text-sm font-bold text-[#4A6572]">
              <span>ارسال ناشناس</span>
              <span>کارت QR رمزدار</span>
              <span>پیام صوتی ۹۰ ثانیه‌ای</span>
            </div>
          </div>
        </div>
      </section>

      {/* features + occasions */}
      <section className="mx-auto w-full max-w-[1200px] px-6 pt-14">
        <div className="flex flex-wrap gap-[18px]">
          <div className="box-border flex min-w-0 flex-[1_1_460px] flex-col gap-3 rounded-[32px] border border-[#DDEEF5] bg-white p-[26px]">
            <h2 className="m-0 text-[22px] font-black">چی تو جعبه‌ست؟</h2>
            <div className="grid grid-cols-1 gap-2.5">
              {product.features.map((f, i) => (
                <FeatureRow key={f} text={f} i={i} />
              ))}
            </div>
          </div>
          <div className="box-border flex min-w-0 flex-[1_1_300px] flex-col gap-3.5 rounded-[32px] bg-[#D6F1FB] p-[26px]">
            <h2 className="m-0 text-[22px] font-black">برای چه بهانه‌ای؟</h2>
            <OccasionChips product={product} />
            <p className="m-0 text-[14.5px] font-medium leading-[2] text-[#1F3E4D]">
              هر جعبه با کارت پستال QR رمزدار و پیام صوتی خودت می‌رسه؛ اگه اسمت رو ننویسی،
              هیچ‌کس نمی‌دونه کی فرستاده.
            </p>
          </div>
        </div>
      </section>

      {/* faq */}
      <section className="mx-auto w-full max-w-[1200px] px-6 pt-[72px]">
        <h2 className="m-0 mb-6 text-[34px] font-black leading-[1.4]">سؤال‌های رایج</h2>
        <div className="flex flex-wrap gap-4">
          {product.faq.map((f) => (
            <details
              key={f.q}
              className="group box-border flex min-w-0 flex-[1_1_460px] flex-col rounded-[26px] border border-[#DDEEF5] bg-white px-[26px] py-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-lg font-extrabold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D6F1FB] transition-transform group-open:rotate-45">
                  <PlusIcon size={15} stroke="#04202E" />
                </span>
              </summary>
              <p className="mb-0 mt-2.5 text-[15px] font-medium leading-[2] text-[#1F3E4D]">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* cross-links */}
      <section className="mx-auto w-full max-w-[1200px] px-6 pt-[72px]">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <h2 className="m-0 text-[34px] font-black leading-[1.4]">بقیه‌ی دوست‌های پشمالو</h2>
          <button
            type="button"
            onClick={() => navigate("home", undefined, "friends")}
            className="text-sm font-bold text-[#006387]"
          >
            همه‌شون ›
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          {others.map((p) => (
            <button
              key={p.kind}
              type="button"
              aria-label={`دیدن ${p.name}`}
              onClick={() => navigate("product", { slug: p.kind })}
              className="group box-border flex min-w-0 flex-[1_1_170px] cursor-pointer flex-col gap-1.5 rounded-[28px] border border-[#DDEEF5] bg-white p-3 pb-[18px] text-right transition-all hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(4,32,46,0.08)]"
            >
              <div
                className="flex h-[180px] items-center justify-center rounded-[20px] transition-transform group-hover:scale-[1.04]"
                style={{ background: p.bg }}
              >
                <Plush kind={p.kind} size={150} />
              </div>
              <div className="pt-2 text-lg font-extrabold">{p.name}</div>
              <div className="text-[13px] font-medium text-[#4A6572]">{p.chips.join(" · ")}</div>
              <div className="text-[14.5px] font-extrabold text-[#006387]">{faPrice(BOX_PRICE)}</div>
            </button>
          ))}
        </div>
      </section>

      <div className="h-20" />
    </div>
  );
}

/* ═══════════════ not found (unknown/missing slug) ═══════════════ */

function ProductNotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F2FAFD] text-[#04202E]">
      {/* mobile-only top bar (desktop has the global header) */}
      <div className="flex items-center justify-between px-4 pb-2 pt-3.5 md:hidden">
        <button
          type="button"
          aria-label="برگشت"
          onClick={() => navigate("home")}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D3E8F0] bg-white text-[#04202E]"
        >
          <BackIcon />
        </button>
        <Logo size={32} />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 py-24 text-center">
        <PawSticker size={56} />
        <h1 className="m-0 text-[26px] font-black leading-[1.5] md:text-[38px]">
          این دوست پشمالو پیدا نشد
        </h1>
        <p className="m-0 max-w-[460px] text-[15px] font-medium leading-[2] text-[#1F3E4D] md:text-base">
          ظاهراً این آدرس اشتباهه یا رفیقمون یه جایی قایم شده. برگرد و از بین شش تا دوست
          پشمالو یکی رو انتخاب کن.
        </p>
        <button
          type="button"
          onClick={() => navigate("home")}
          className="flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#04202E] px-7 text-[15px] font-extrabold text-white transition-transform hover:scale-[1.03]"
        >
          <BackIcon size={18} />
          بازگشت به خانه
        </button>
      </div>
    </div>
  );
}
