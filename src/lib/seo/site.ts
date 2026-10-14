// ── Pishnam SEO site constants — single source for metadata, OG and JSON-LD ──
// Wave-0 (route-ready modules): consumed by layout metadata, useDocumentMeta
// and the JSON-LD builders. At deploy the url constant flips to the real domain.

export const SITE = {
  /** Consumer brand — «پیشنام» everywhere (brand sweep completed ۲۲ مهر ۱۴۰۵). */
  nameFa: "پیشنام",
  tagline: "یه بغل، تو یه جعبه",
  /** Placeholder constant until the domain is registered — never hardcode it elsewhere. */
  url: "https://pishnam.ir",
  locale: "fa_IR",
  titleTemplate: "%s | پیشنام — جعبه هدیه عروسک پولیشی",
  description:
    "خرید عروسک پولیشی با پیام صوتی و کارت پستال QR رمزدار؛ جعبه هدیه عروسک پولیشی پیشنام مستقیم به در خانه‌ی دوستت ارسال می‌شه. یه بغل، تو یه جعبه!",
} as const;
