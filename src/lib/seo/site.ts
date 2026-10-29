// ── Pishnam SEO site constants — single source for metadata, OG and JSON-LD ──
// Wave-0 (route-ready modules): consumed by layout metadata, useDocumentMeta
// and the JSON-LD builders. At deploy the url constant flips to the real domain.

export const SITE = {
  /** Consumer brand — «جعبه آبی» everywhere (rebrand sweep ۱۴۰۴). */
  nameFa: "جعبه آبی",
  tagline: "یکی دوستت داره",
  /** Placeholder constant until the domain is registered — never hardcode it elsewhere. */
  url: "https://yekdoost.ir",
  locale: "fa_IR",
  titleTemplate: "%s | جعبه آبی — جعبه هدیه عروسک پولیشی",
  description:
    "جعبه آبی؛ یه عروسک پولیشی با پیام صوتی و کارت پستال QR که مستقیم به در خانه‌ی کسی که دوستش داری ارسال می‌شه. یکی دوستت داره!",
} as const;
