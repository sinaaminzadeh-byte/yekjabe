// ── seed-commerce.ts — idempotent Phase B seed (bun scripts/seed-commerce.ts) ──
// 6 products × ONE variant (owner decision: همه یک سایزند) + settings + admin.
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const PRODUCTS = [
  { slug: "bear", name: "کِرِمی، خرس پشمالو" },
  { slug: "bunny", name: "لپ‌قندی، خرگوش پشمالو" },
  { slug: "cat", name: "میشی، گربه پشمالو" },
  { slug: "panda", name: "بامبو، پاندا پشمالو" },
  { slug: "sheep", name: "ابری، گوسفند پشمالو" },
  { slug: "duck", name: "قات‌قات، اردک پشمالو" },
];

const PRICE = 890_000; // تومان — same price for all (یه قیمت برای همه)
const STOCK = 40;

// «افزودنی‌ها» — companion products (mission §۵). The admin can add/edit/disable
// more from the «محصولات» tab; nothing here is referenced from code by slug.
const ADDONS = [
  { slug: "addon-bracelet", name: "دستبند مهربونی", emoji: "📿", description: "دستبند دست‌ساز با قلب کوچک", price: 149_000, stock: 60 },
  { slug: "addon-doll", name: "عروسک کوچولو", emoji: "🧸", description: "عروسک پشمالوی مینی برای همنشینی دوستت", price: 249_000, stock: 50 },
  { slug: "addon-watch", name: "ساعت مچی ساده", emoji: "⌚", description: "ساعت مچی مینیمال با بند چرمی", price: 399_000, stock: 30 },
  { slug: "addon-choco", name: "شکلات تلخ هدیه", emoji: "🍫", description: "تابلوی شکلات تلخ ۷۰٪ با بسته‌بندی کادویی", price: 119_000, stock: 80 },
];

const SETTINGS: Record<string, string> = {
  charm_price_toman: "50000",
  ship_fee_tehran_toman: "49000",
  ship_fee_other_toman: "69000",
  low_stock_threshold: "5",
  manual_card_number: "6037-9975-1234-5678",
  manual_card_sheba: "IR820540102680020817909002",
  manual_card_name: "یک دوست",
  manual_approval_sla_hours: "12",
  // نگهداری پیام (mission §۴) — ۱ ماه رایگان؛ ۶ و ۱۲ ماه پولی از این تنظیمات
  retention_6m_price_toman: "79000",
  retention_12m_price_toman: "149000",
};

async function main() {
  for (const p of PRODUCTS) {
    const product = await db.product.upsert({
      where: { slug: p.slug },
      create: { slug: p.slug, name: p.name, description: "جعبه‌ی هدیه‌ی عروسک پولیشی + کارت پستال QR" },
      update: { name: p.name },
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
      create: { slug: a.slug, name: a.name, description: a.description, kind: "addon", emoji: a.emoji },
      update: { name: a.name, kind: "addon", emoji: a.emoji },
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
