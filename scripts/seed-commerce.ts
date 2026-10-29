// ── seed-commerce.ts — idempotent Phase B seed (bun scripts/seed-commerce.ts) ──
// 6 products × ONE variant (owner decision: همه یک سایزند) + settings + admin.
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const PLUSH_SPECS = [
  { label: "جنس", value: "پولیش نرم و باکیفیت" },
  { label: "قابل شستشو", value: "بله، با دست" },
  { label: "بسته‌بندی", value: "جعبه کادویی + کارت پستال" },
];

const PRODUCTS = [
  { slug: "bear", name: "کِرِمی، خرس پشمالو", sizeLabel: "حدود ۳۰ سانتی‌متر", colors: "قهوه‌ای، کرم", specs: [{ label: "قد", value: "حدود ۳۰ سانتی‌متر" }, ...PLUSH_SPECS] },
  { slug: "bunny", name: "لپ‌قندی، خرگوش پشمالو", sizeLabel: "حدود ۳۰ سانتی‌متر", colors: "کرم، صورتی", specs: [{ label: "قد", value: "حدود ۳۰ سانتی‌متر" }, ...PLUSH_SPECS] },
  { slug: "cat", name: "میشی، گربه پشمالو", sizeLabel: "حدود ۳۰ سانتی‌متر", colors: "خاکستری، سفید", specs: [{ label: "قد", value: "حدود ۳۰ سانتی‌متر" }, ...PLUSH_SPECS] },
  { slug: "panda", name: "بامبو، پاندا پشمالو", sizeLabel: "حدود ۳۰ سانتی‌متر", colors: "سفید، مشکی", specs: [{ label: "قد", value: "حدود ۳۰ سانتی‌متر" }, ...PLUSH_SPECS] },
  { slug: "sheep", name: "ابری، گوسفند پشمالو", sizeLabel: "حدود ۳۰ سانتی‌متر", colors: "کرم، سفید", specs: [{ label: "قد", value: "حدود ۳۰ سانتی‌متر" }, ...PLUSH_SPECS] },
  { slug: "duck", name: "قات‌قات، اردک پشمالو", sizeLabel: "حدود ۲۸ سانتی‌متر", colors: "زرد، نارنجی", specs: [{ label: "قد", value: "حدود ۲۸ سانتی‌متر" }, ...PLUSH_SPECS] },
];

const PRICE = 890_000; // تومان — same price for all (یه قیمت برای همه)
const STOCK = 40;

// «افزودنی‌ها» — companion products (mission §۵). The admin can add/edit/disable
// more from the «محصولات» tab; nothing here is referenced from code by slug.
const ADDONS = [
  { slug: "addon-bracelet", name: "دستبند مهربونی", emoji: "📿", description: "دستبند دست‌ساز با یه قلب کوچیک؛ یادگاری‌ای که همیشه دست دوستت می‌مونه.", price: 149_000, stock: 60, sizeLabel: "فری‌سایز", colors: "آبی، نقره‌ای", specs: [{ label: "جنس", value: "مهره و قلب نقره‌ای" }, { label: "سبک", value: "دست‌ساز" }] },
  { slug: "addon-doll", name: "عروسک کوچولو", emoji: "🧸", description: "یه عروسک پشمالوی کوچولو که کنار رفیق بزرگت تو جعبه جا می‌شه — همسفرِ همیشه.", price: 249_000, stock: 50, sizeLabel: "حدود ۱۲ سانتی‌متر", colors: "قهوه‌ای، کرم", specs: [{ label: "جنس", value: "پولیش نرم" }, { label: "قد", value: "حدود ۱۲ سانتی‌متر" }] },
  { slug: "addon-watch", name: "ساعت مچی ساده", emoji: "⌚", description: "ساعت مچی مینیمال با بند چرمی؛ ساده، شیک و همیشه سر وقت.", price: 399_000, stock: 30, sizeLabel: "بند قابل تنظیم", colors: "آبی، قهوه‌ای", specs: [{ label: "جنس", value: "بند چرمی" }, { label: "موتور", value: "کوارتز" }] },
  { slug: "addon-choco", name: "شکلات تلخ هدیه", emoji: "🍫", description: "شکلات تلخ ۷۰٪ با بسته‌بندی کادویی؛ یه لذت خوشمزه کنار یه بغل آروم.", price: 119_000, stock: 80, sizeLabel: "۱۲۰ گرم", colors: "قهوه‌ای", specs: [{ label: "نوع", value: "تلخ ۷۰٪" }, { label: "بسته‌بندی", value: "جعبه کادویی" }] },
];

const SETTINGS: Record<string, string> = {
  charm_price_toman: "50000",
  charms_enabled: "1",
  ship_fee_tehran_toman: "49000",
  ship_fee_other_toman: "69000",
  low_stock_threshold: "5",
  manual_card_number: "6037-9975-1234-5678",
  manual_card_sheba: "IR820540102680020817909002",
  manual_card_name: "جعبه آبی",
  manual_approval_sla_hours: "12",
  // نگهداری پیام (mission §۴) — ۱ ماه رایگان؛ ۶ و ۱۲ ماه پولی از این تنظیمات
  retention_6m_price_toman: "79000",
  retention_12m_price_toman: "149000",
};

async function main() {
  for (const p of PRODUCTS) {
    const product = await db.product.upsert({
      where: { slug: p.slug },
      create: { slug: p.slug, name: p.name, description: "جعبه‌ی هدیه‌ی عروسک پولیشی + کارت پستال QR", sizeLabel: p.sizeLabel, colors: p.colors, specs: JSON.stringify(p.specs) },
      update: { name: p.name, sizeLabel: p.sizeLabel, colors: p.colors, specs: JSON.stringify(p.specs) },
    });
    await db.productVariant.upsert({
      where: { sku: `PN-${p.slug}` },
      create: { productId: product.id, sku: `PN-${p.slug}`, size: "one", priceToman: PRICE, stock: STOCK },
      update: { priceToman: PRICE },
    });
  }
  for (const a of ADDONS) {
    const product = await db.product.upsert({
      where: { slug: a.slug },
      create: { slug: a.slug, name: a.name, description: a.description, kind: "addon", emoji: a.emoji, sizeLabel: a.sizeLabel, colors: a.colors, specs: JSON.stringify(a.specs) },
      update: { name: a.name, kind: "addon", emoji: a.emoji, sizeLabel: a.sizeLabel, colors: a.colors, specs: JSON.stringify(a.specs) },
    });
    await db.productVariant.upsert({
      where: { sku: `AD-${a.slug.replace("addon-", "")}` },
      create: { productId: product.id, sku: `AD-${a.slug.replace("addon-", "")}`, size: "one", priceToman: a.price, stock: a.stock },
      update: { priceToman: a.price },
    });
  }
  for (const [key, value] of Object.entries(SETTINGS)) {
    await db.setting.upsert({ where: { key }, create: { key, value }, update: { value } });
  }
  const prods = await db.product.count();
  const variants = await db.productVariant.count();
  const settings = await db.setting.count();
  console.log(`seed-commerce ✓ products:${prods} variants:${variants} settings:${settings}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
