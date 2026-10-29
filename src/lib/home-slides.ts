// ── Hero slider content — shared source of truth (owner round 30) ──
// The home hero (HeroSliderDesktop/Mobile) renders from HERE; the admin
// «اسلایدرها» tab edits the same shape through /api/admin/slides and the
// public /api/home-content serves the saved copy (defaults as fallback).
// Pure data + pure functions only — safe on server AND client.

export interface HeroSlide {
  /** plush family rendered on the stage (ignored when `image` is set) */
  kind: string;
  /** slide background (hex) */
  bg: string;
  /** decorative blob color (hex) */
  blob: string;
  /** dark slide → white text / light CTAs */
  dark: boolean;
  badge: string;
  title: string;
  sub: string;
  cta: string;
  ctaRoute: string;
  cta2: string;
  cta2Route: string;
  /** optional scroll-to anchor on the home page («how» / «faq») */
  cta2Hash: string;
  /** optional custom image (admin-provided URL) — replaces the plush */
  image: string;
  /** counter-chip caption (top-right of the desktop slider) */
  tab: string;
  enabled: boolean;
}

/* ── the CTA targets an admin may pick from (safe, in-app routes only) ── */
export const HERO_ROUTES = [
  "home",
  "friends",
  "pick",
  "extras",
  "checkout",
  "product",
  "stories",
  "impact",
  "mission",
  "about",
  "blog",
  "reviews",
  "shipping",
  "contact",
  "login",
  "my-gifts",
  "track",
] as const;

export const HERO_HASHES = ["", "how", "faq"] as const;

const PLUSH_KINDS = ["bear", "bunny", "duck", "sheep", "cat", "panda", "fox", "koala", "lion", "elephant"];

const HEX = /^#[0-9a-fA-F]{6}$/;

export const MAX_HOME_SLIDES = 6;

const clip = (v: unknown, max: number): string => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, max);
const clipMultiline = (v: unknown, max: number): string => String(v ?? "").trim().slice(0, max);
const hexOr = (v: unknown, fallback: string): string => {
  const s = String(v ?? "").trim();
  if (HEX.test(s)) return s.toLowerCase();
  const short = /^#[0-9a-fA-F]{3}$/.test(s) ? s : "";
  return short
    ? `#${short[1]}${short[1]}${short[2]}${short[2]}${short[3]}${short[3]}`.toLowerCase()
    : fallback;
};

/** normalize ONE incoming slide (admin PATCH body or stored JSON row) */
export function sanitizeSlide(raw: unknown, fallback: HeroSlide): HeroSlide {
  const r = (raw ?? {}) as Record<string, unknown>;
  const route = (v: unknown): string => {
    const s = String(v ?? "").trim();
    return (HERO_ROUTES as readonly string[]).includes(s) ? s : fallback.ctaRoute;
  };
  return {
    kind: PLUSH_KINDS.includes(String(r.kind ?? "")) ? String(r.kind) : fallback.kind,
    bg: hexOr(r.bg, fallback.bg),
    blob: hexOr(r.blob, fallback.blob),
    dark: Boolean(r.dark),
    badge: clip(r.badge, 60) || fallback.badge,
    title: clip(r.title, 90) || fallback.title,
    sub: clipMultiline(r.sub, 220) || fallback.sub,
    cta: clip(r.cta, 40) || fallback.cta,
    ctaRoute: route(r.ctaRoute),
    cta2: clip(r.cta2, 40) || fallback.cta2,
    cta2Route: route(r.cta2Route),
    cta2Hash: (HERO_HASHES as readonly string[]).includes(String(r.cta2Hash ?? "")) ? String(r.cta2Hash ?? "") : "",
    image: (() => {
      const s = String(r.image ?? "").trim().slice(0, 600);
      return /^(https?:\/\/|\/)/.test(s) ? s : "";
    })(),
    tab: clip(r.tab, 40) || fallback.tab,
    enabled: r.enabled === undefined ? true : Boolean(r.enabled),
  };
}

/** normalize a whole list — length-capped, every row merged over its default twin */
export function sanitizeSlides(raw: unknown): HeroSlide[] {
  if (!Array.isArray(raw)) return DEFAULT_HOME_SLIDES.map((s) => ({ ...s }));
  const out: HeroSlide[] = [];
  for (let i = 0; i < raw.length && out.length < MAX_HOME_SLIDES; i++) {
    const fallback = DEFAULT_HOME_SLIDES[i % DEFAULT_HOME_SLIDES.length];
    out.push(sanitizeSlide(raw[i], fallback));
  }
  // never render an empty hero
  if (out.length === 0) return DEFAULT_HOME_SLIDES.map((s) => ({ ...s }));
  return out;
}

/* ── the 4 default stories (what ships without any admin edit) ── */
export const DEFAULT_HOME_SLIDES: HeroSlide[] = [
  {
    kind: "bear",
    bg: "#00ABE7",
    blob: "#66CDF1",
    dark: false,
    badge: "یه هدیه برای یه آدم مهم",
    title: "یه جعبه آبی برای کسی که دوستش داری.",
    sub: "یه عروسک انتخاب کن، حرف دلت رو بهش اضافه کن و بفرستش برای کسی که می‌خوای خوشحالش کنی. شاید همین یه هدیه، روزش رو بسازه.",
    cta: "جعبه آبی‌تو بساز",
    ctaRoute: "pick",
    cta2: "دیدن دوستای پشمالو",
    cta2Route: "friends",
    cta2Hash: "",
    image: "",
    tab: "هدیه‌ی پشمالو",
    enabled: true,
  },
  {
    kind: "bunny",
    bg: "#FFE0EA",
    blob: "#FFC9DA",
    dark: false,
    badge: "پیام خودت، با صدای خودت",
    title: "یه پیام که فقط مال خودشه.",
    sub: "ویس، عکس و ویدیوی خصوصی + کارت پستال QR؛ گیرنده با تأیید شماره‌ی خودش پیامت رو می‌بینه و ارسال کاملاً ناشناسه.",
    cta: "پیامت رو بساز",
    ctaRoute: "pick",
    cta2: "قصه‌ی شما",
    cta2Route: "stories",
    cta2Hash: "",
    image: "",
    tab: "پیام صوتی و QR",
    enabled: true,
  },
  {
    kind: "duck",
    bg: "#FFF3C9",
    blob: "#FFE79F",
    dark: false,
    badge: "یه قیمت برای همه",
    title: "همه‌ی جعبه‌های آبی ۸۹۰ هزار تومان",
    sub: "بدون قیمت‌های گیج‌کننده. هر هدیه شماره‌ی مخصوص خودش رو داره و دم در خونه‌ی دوستت تحویل داده می‌شه.",
    cta: "دوستتو انتخاب کن",
    ctaRoute: "friends",
    cta2: "سؤال‌های رایج",
    cta2Route: "home",
    cta2Hash: "faq",
    image: "",
    tab: "ارسال و قیمت",
    enabled: true,
  },
  {
    kind: "sheep",
    bg: "#04202E",
    blob: "#0E3C52",
    dark: true,
    badge: "دفتر مهربونی",
    title: "با هر قلب، یه هدیه می‌ره پیش یه بچه",
    sub: "قلب و پنجه‌ها می‌شن هدیه برای بچه‌های بی‌سرپرست و پناهگاه حیوونا؛ رسیدش همیشه همین‌جا ثبت می‌شه.",
    cta: "دفتر مهربونی رو ببین",
    ctaRoute: "impact",
    cta2: "بیشتر بدون",
    cta2Route: "mission",
    cta2Hash: "",
    image: "",
    tab: "قلب قرمز و پنجه",
    enabled: true,
  },
];

/** the Setting key the saved copy lives in */
export const HOME_SLIDES_SETTING_KEY = "home_slides";
