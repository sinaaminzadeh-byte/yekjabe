import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
const phone = "09351234567";
// clean previous test rows
await db.order.deleteMany({ where: { recipientPhone: phone } });
const variant = await db.productVariant.findFirst({ where: { product: { slug: "bear" } } });
const mk = (code, status, msg, senderLabel, senderDisplay) => ({
  code, idempotencyKey: "qa-" + code + "-" + Math.random().toString(36).slice(2), status,
  paymentMethod: "zarinpal",
  senderName: senderLabel, senderDisplay, recipientName: "آرمان رفیقی", recipientPhone: phone,
  city: "تهران", address: "خیابان آزادی، کوچه مهربونی، پلاک ۷",
  message: msg, occasion: 1, charmHearts: 2, charmPaws: 1,
  subtotalToman: 890000, shippingToman: 49000, totalToman: 939000,
  userPhone: "09121112233", sessionPhone: "09121112233",
  giftOpened: false,
  expiresAt: new Date(Date.now() + 24 * 36e5),
  items: { create: { variantId: variant.id, titleSnapshot: "کِرِمی، خرس پشمالو", unitPriceToman: 890000, qty: 1 } },
});
await db.order.create({ data: mk("PN-290101-0901", "delivered", "سلام آرمان! این کِرِمی رو با کلی عشق برات فرستادم. هر شب بغلش کن و یادت باشه یه نفر این‌جا دعات می‌کنه. ❤️", "سارا محمدی", "name") });
await db.order.create({ data: mk("PN-290101-0902", "shipped", "سالگرد آشناییمون مبارک! این هدیه‌ی کوچیک رو با صدای خودم برات آماده کردم — اسکنش کن و لذت ببر 🎁", "از طرف همسرت", "phrase") });
await db.order.create({ data: mk("PN-290101-0903", "paid", "این یکی هنوز تو راهه — پیام پیش‌نمایش.", "یک هدیه برای تو", "anon") });
console.log("QA orders seeded for", phone);
await db.$disconnect();
