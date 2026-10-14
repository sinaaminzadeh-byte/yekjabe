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

const SETTINGS: Record<string, string> = {
  charm_price_toman: "50000",
  ship_fee_tehran_toman: "49000",
  ship_fee_other_toman: "69000",
  low_stock_threshold: "5",
  manual_card_number: "6037-9975-1234-5678",
  manual_card_sheba: "IR820540102680020817909002",
  manual_card_name: "شرکت پیشنام",
  manual_approval_sla_hours: "12",
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
