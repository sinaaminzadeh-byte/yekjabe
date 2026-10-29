// ═══ seed-admin-demo.mjs — rich demo dataset for the ADMIN DASHBOARD (round 33) ═══
// Owner asked: «خودت چندین دیتای دمو بساز تا بتونم بخش های مختلف داشبورد رو بررسی کنم»
// Seeds ~50 orders across 30 days (ALL 11 statuses, 12 provinces, valid event
// chains), payments with receipts, renewals, reviews, experiences, contact
// messages, app users, sms outbox and 3 admin seats — so every admin tab has
// realistic content.
// IDEMPOTENT: re-running wipes the previous demo rows (code prefix / markers) first.
// Local dev only — production DB is never touched by this script.
//
//   usage: node scripts/seed-admin-demo.mjs
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

const rnd = (arr) => arr[Math.floor(Math.random() * arr.length)];
const ri = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
const ago = (days, jitterH = 0) => new Date(Date.now() - days * 864e5 - jitterH * 3600_000);

// ── people ──
const ORDERERS = [
  ["سارا محمدی", "09121110001"], ["علی رضایی", "09121110002"], ["نگار کریمی", "09121110003"],
  ["امیر حسینی", "09121110004"], ["مریم صادقی", "09121110005"], ["حسین موسوی", "09121110006"],
  ["درسا احدی", "09121110007"], ["پویا نادری", "09121110008"], ["الهام قاسمی", "09121110009"],
  ["رضا شریفی", "09121110010"], ["سمیرا بابایی", "09121110011"], ["کامران فرخی", "09121110012"],
  ["مهسا توکلی", "09121110013"], ["بابک زند", "09121110014"], ["شیوا رستمی", "09121110015"],
];
const RECIPIENTS = [
  ["آرمان رفیقی", "09351230001"], ["سارینا جونی", "09351230002"], ["مامان بزرگ", "09351230003"],
  ["بابا عزیز", "09351230004"], ["نگین همدانی", "09351230005"], ["سینا عبادی", "09351230006"],
  ["پریسا خانم", "09351230007"], ["یاسر دوستی", "09351230008"], ["مینا آذری", "09351230009"],
  ["حامد نیکو", "09351230010"],
];
const PROVINCES = {
  "تهران": ["تهران", "اسلامشهر", "شمیرانات", "قدس"],
  "اصفهان": ["اصفهان", "کاشان", "نجف‌آباد"],
  "فارس": ["شیراز", "مرودشت"],
  "خراسان رضوی": ["مشهد", "نیشابور"],
  "آذربایجان شرقی": ["تبریز", "مراغه"],
  "مازندران": ["ساری", "بابل", "آمل"],
  "گیلان": ["رشت", "انزلی"],
  "کرمان": ["کرمان", "رفسنجان"],
  "البرز": ["کرج", "هشتگرد"],
  "یزد": ["یزد", "میبد"],
  "خوزستان": ["اهواز", "آبادان"],
  "قم": ["قم"],
};
const MESSAGES = [
  "سلام! این کِرِمی رو با کلی عشق برات فرستادم. هر شب بغلش کن و یادت باشه یه نفر این‌جا دعات می‌کنه ❤️",
  "تولدت مبارک عزیزترینم! صدای ضبط‌شده رو حتماً گوش کن — چون تو متن نمی‌گنجید 😊",
  "سالگرد آشناییمون مبارک! یه سال گذشت ولی هر روز بیشتر عاشقت می‌شم.",
  "دایی جان، یادت هست می‌گفتی یکی از این خرس‌های پشمالو می‌خوای؟ اینم هدیه‌ی ما از تهران!",
  "برای روز مادر، از طرف هر سه‌تامون. دستت درد نکنه که همیشه پشت مایی.",
  "نوروزت پیروز! این هدیه‌ی کوچیک رو با صدای خودم برات آماده کردم 🎁",
  "مرسی که همیشه حواست به منه. این پیشکش کوچیک فقط یه بهونه‌ست برای بغلت کردن.",
  "به بهانه‌ی قبولی تو کنکور! افتخار می‌کنم بهت.",
];
const PHRASES = ["از طرف همسرت", "از طرف دوست قدیمیت", "از طرف بچه‌های شرکت", "از طرف خانواده"];

// valid forward chains per TRANSITIONS map (created event is implicit first)
const CHAINS = {
  awaiting_payment: [],
  payment_under_review: ["awaiting_payment"],
  paid: ["awaiting_payment"],
  preparing: ["awaiting_payment", "paid"],
  shipped: ["awaiting_payment", "paid", "preparing"],
  delivered: ["awaiting_payment", "paid", "preparing", "shipped"],
  failed: [],
  cancelled: ["awaiting_payment"],
  expired: [],
  refund_requested: ["awaiting_payment", "paid", "preparing", "shipped"],
  refunded: ["awaiting_payment", "paid", "preparing", "shipped", "delivered", "refund_requested"],
};
const PAY_STATUS = {
  paid: "verified", preparing: "verified", shipped: "verified", delivered: "verified",
  refund_requested: "verified", refunded: "verified", payment_under_review: "pending_review",
  awaiting_payment: "initiated", failed: "failed", cancelled: "initiated", expired: "failed",
};
const HAS_PAYMENT = ["payment_under_review", "paid", "preparing", "shipped", "delivered", "refund_requested", "refunded"];

const SHIP_TEHRAN = 49000, SHIP_OTHER = 79000;
const CHARM_PRICE = 45000;

console.log("→ wiping previous demo rows…");
await db.retentionRenewal.deleteMany({ where: { code: { startsWith: "RR-DEMO" } } });
await db.order.deleteMany({ where: { code: { startsWith: "PN-DEMO" } } });
await db.contactMessage.deleteMany({ where: { email: { endsWith: "@demo.yekdoost" } } });
await db.review.deleteMany({ where: { who: { startsWith: "دمو:" } } });
await db.experience.deleteMany({ where: { name: { startsWith: "دمو:" } } });
await db.appUser.deleteMany({ where: { phone: { startsWith: "0912111" } } });
await db.smsOutbox.deleteMany({ where: { phone: { startsWith: "0935123" } } });
await db.adminUser.deleteMany({ where: { phone: { startsWith: "0935777" } } });

const variants = await db.productVariant.findMany({
  where: { isActive: true, product: { isActive: true } },
  include: { product: true },
});
const gifts = variants.filter((v) => v.product.kind === "main_gift");
const addons = variants.filter((v) => v.product.kind === "addon");
if (gifts.length === 0) throw new Error("no main_gift variants — run the commerce seed first (bun run seed:commerce)");
console.log(`→ ${gifts.length} gift variants, ${addons.length} addons found`);

let no = 4100;

function buildOrder(status, daysAgo) {
  const [ordName, ordPhone] = rnd(ORDERERS);
  const [rcpName, rcpPhone] = rnd(RECIPIENTS);
  const prov = rnd(Object.keys(PROVINCES));
  const city = rnd(PROVINCES[prov]);
  const gift = rnd(gifts);
  const chosenAddons = Math.random() < 0.45 ? [{ v: rnd(addons), qty: ri(1, 2) }] : [];
  const items = [{ v: gift, qty: 1 }, ...chosenAddons];
  const subtotal = items.reduce((a, it) => a + it.v.priceToman * it.qty, 0);
  const shipping = prov === "تهران" ? SHIP_TEHRAN : SHIP_OTHER;
  const retention = Math.random() < 0.25 ? (Math.random() < 0.5 ? "6m" : "12m") : "1m";
  const retentionPrice = retention === "6m" ? 190000 : retention === "12m" ? 340000 : 0;
  const hearts = Math.random() < 0.6 ? ri(0, 3) : 0;
  const paws = Math.random() < 0.4 ? ri(0, 2) : 0;
  const total = subtotal + shipping + retentionPrice + hearts * CHARM_PRICE + paws * CHARM_PRICE;
  const method = Math.random() < 0.6 ? "zarinpal" : "manual_transfer";
  const mediaCount = Math.random() < 0.55 ? ri(0, 3) : 0;
  const senderDisplay = Math.random() < 0.2 ? "anon" : Math.random() < 0.45 ? "phrase" : "name";

  const created = ago(daysAgo, ri(0, 20));
  const chain = CHAINS[status] ?? [];
  const stamps = [created, ...chain.map((_, i) => new Date(created.getTime() + (i + 1) * 26 * 3600_000 + ri(0, 8) * 3600_000))];
  const lastAt = stamps.at(-1);
  const opened = status === "delivered" && Math.random() < 0.6;
  const openedAt = opened ? new Date(lastAt.getTime() + ri(6, 48) * 3600_000) : null;

  const events = [
    { type: "created", fromStatus: "", toStatus: "", actor: "customer", note: "", createdAt: stamps[0] },
    ...chain.map((s, i) => ({
      type: s === "paid" ? "payment" : "status_changed",
      fromStatus: chain[i - 1] ?? "awaiting_payment",
      toStatus: s,
      actor: s === "paid" ? (method === "zarinpal" ? "psp" : "admin") : Math.random() < 0.5 ? "admin" : "system",
      note: s === "preparing" ? rnd(["جعبه چینش شد", "کارت پستال آماده شد"]) : s === "shipped" ? "کد رهگیری پست ثبت شد" : "",
      createdAt: stamps[i + 1],
    })),
    ...(opened ? [{ type: "gift_opened", fromStatus: "", toStatus: "", actor: "customer", note: "", createdAt: openedAt }] : []),
  ];

  const id = `demo-${no}`;
  const code = `PN-DEMO-${String(no).padStart(4, "0")}`;
  no += 1;

  return {
    row: {
      id,
      code,
      idempotencyKey: `demo-key-${no}-${Math.random().toString(36).slice(2, 9)}`,
      status,
      paymentMethod: method,
      senderName: ordName,
      senderPhone: ordPhone,
      senderDisplay,
      senderPhrase: senderDisplay === "phrase" ? rnd(PHRASES) : "",
      ordererFirstName: ordName.split(" ")[0],
      ordererLastName: ordName.split(" ")[1] ?? "",
      ordererPhone: ordPhone,
      userPhone: ordPhone,
      sessionPhone: ordPhone,
      recipientName: rcpName,
      recipientPhone: rcpPhone,
      province: prov,
      city,
      address: rnd(["خیابان آزادی، کوچه مهربونی، پلاک ۷", "بلوار ولیعصر، برج نگین، طبقه ۳", "خیابان شریعتی، بن‌بست یاس، پلاک ۱۲", "میدان انقلاب، پاساژ ستاره، واحد ۹"]),
      postalCode: String(ri(1000000000, 9999999999)),
      message: rnd(MESSAGES),
      occasion: ri(0, 10),
      anonymous: senderDisplay === "anon",
      charmHearts: hearts,
      charmPaws: paws,
      mediaCount,
      mediaKeys: JSON.stringify(Array.from({ length: mediaCount }, (_, i) => `messages/${code}/demo-${i}.webm`)),
      retentionPlan: retention,
      subtotalToman: subtotal,
      shippingToman: shipping,
      discountToman: 0,
      totalToman: total,
      giftOpened: opened,
      giftOpenedAt: openedAt,
      paymentAttempts: HAS_PAYMENT.includes(status) ? 1 : ri(1, 2),
      smsAbandonedAt: status === "failed" ? new Date(created.getTime() + 20 * 3600_000) : null,
      expiresAt: ["awaiting_payment", "failed"].includes(status) ? new Date(created.getTime() + 864e5) : created,
      createdAt: created,
      updatedAt: lastAt,
    },
    items: items.map((it) => ({
      variantId: it.v.id,
      titleSnapshot: it.v.product.name,
      unitPriceToman: it.v.priceToman,
      qty: it.qty,
    })),
    payments: HAS_PAYMENT.includes(status)
      ? [{
          method,
          status: PAY_STATUS[status],
          attemptNo: 1,
          amountToman: total,
          refId: method === "zarinpal" ? String(ri(100000000, 999999999)) : "",
          receiptKey: method === "manual_transfer" ? `.data/receipts/demo-${code}.jpg` : "",
          receiptMime: method === "manual_transfer" ? "image/jpeg" : "",
          receiptSize: method === "manual_transfer" ? ri(80_000, 400_000) : 0,
          createdAt: chain.includes("awaiting_payment") ? stamps[1] : created,
        }]
      : [],
    events,
    _meta: { prov, retention, total, created },
  };
}

// ── build the fleet: all 11 statuses spread over 30 days ──
const PLAN = [
  ["delivered", 12], ["shipped", 5], ["preparing", 4], ["paid", 5],
  ["payment_under_review", 3], ["awaiting_payment", 4], ["failed", 2],
  ["cancelled", 2], ["expired", 3], ["refund_requested", 2], ["refunded", 2],
];
const fleet = [];
for (const [status, count] of PLAN) for (let i = 0; i < count; i++) fleet.push(buildOrder(status, ri(0, 29)));
// a few TODAY so «فروش امروز» on the dashboard is alive
fleet.push(buildOrder("delivered", 0), buildOrder("paid", 0), buildOrder("payment_under_review", 0), buildOrder("shipped", 0));

console.log(`→ inserting ${fleet.length} demo orders…`);
const inserted = [];
for (const o of fleet) {
  const row = await db.order.create({
    data: {
      ...o.row,
      items: { create: o.items },
      payments: { create: o.payments },
      events: { create: o.events },
    },
  });
  inserted.push({ ...row, _meta: o._meta });
}

// ── retention renewals on 3 paid-like orders ──
console.log("→ seeding retention renewals…");
const renewalTargets = inserted.filter((o) => ["paid", "preparing", "delivered"].includes(o.status)).slice(0, 4);
const RENEW_PLANS = [
  { plan: "6m", price: 190000, status: "payment_under_review" },
  { plan: "12m", price: 340000, status: "awaiting_payment" },
  { plan: "6m", price: 190000, status: "paid" },
  { plan: "12m", price: 340000, status: "paid" },
];
let rno = 9000;
for (let i = 0; i < renewalTargets.length; i++) {
  const t = RENEW_PLANS[i % RENEW_PLANS.length];
  rno += 1;
  await db.retentionRenewal.create({
    data: {
      code: `RR-DEMO-${rno}`,
      orderId: renewalTargets[i].id,
      plan: t.plan,
      priceToman: t.price,
      status: t.status,
      requestedByPhone: renewalTargets[i].userPhone,
      receiptKey: t.status === "payment_under_review" ? ".data/receipts/rr-demo.jpg" : "",
      receiptMime: t.status === "payment_under_review" ? "image/jpeg" : "",
      receiptSize: t.status === "payment_under_review" ? 120_000 : 0,
      paidAt: t.status === "paid" ? ago(1) : null,
      createdAt: ago(i + 1, ri(0, 10)),
    },
  });
}

// ── reviews (mixed moderation states) ──
console.log("→ seeding reviews…");
const REVIEWS = [
  ["دمو: سارا محمدی", "sender", 5, "bear", "بهترین حس دنیا", "دوستم وقتی جعبه رو باز کرد اول یه دقیقه ساکت موند بعد گریه کرد! صدای ضبط‌شده همه‌چیز رو جادویی کرد."],
  ["دمو: علی رضایی", "sender", 5, "bunny", "کیفیت عالیه", "پارچه‌ی عروسک خیلی نرمه و جعبه هم واقعاً شبیه یه مرسوله‌ی پستی قشنگیه."],
  ["دمو: نگار کریمی", "receiver", 5, "cat", "با وریفای شماره بازش کردم", "کد پیامکی اومد و پیام‌ها رو دیدم. ایده‌ی رمز نداشتن خیلی باحاله!"],
  ["دمو: امیر حسینی", "sender", 4, "panda", "پست یکم کند بود", "هدیه عالی بود ولی پست دیر رسید. پشتیبانی همیشه جواب داد."],
  ["دمو: مریم صادقی", "receiver", 5, "duck", "عکساش قشنگ چاپ شده", "کارت پستال با عکس خودمون اومده بود، کیفیت چاپ خوب بود."],
  ["دمو: حسین موسوی", "sender", 5, "sheep", "برای مادرم خریدم", "مامان بغلش کرد و گفت بهترین هدیه‌ی امسالم بود. ممنون از تیم پیشنام."],
  ["دمو: درسا احدی", "sender", 4, "bear", "قابلیت ویس خیلی خوبه", "فقط کاش صدای ضبط‌شده بلندتر پخش می‌شد. بقیه چیزها عالی."],
  ["دمو: پویا نادری", "receiver", 5, "bunny", "غافلگیر شدم!", "اصلاً نمی‌دونستم کی برام فرستاده، پیامش گفته بود از طرف یه دوست قدیمی 😍"],
];
for (let i = 0; i < REVIEWS.length; i++) {
  const [who, role, stars, kind, title, text] = REVIEWS[i];
  await db.review.create({
    data: { who, role, stars, kind, title, text, approved: i % 3 !== 2, createdAt: ago(i + 1, ri(0, 12)) },
  });
}

// ── experiences (UGC stories) ──
console.log("→ seeding experiences…");
const EXPS = [
  ["دمو: سارینا از تهران", "تهران", 0, "برای تولد خواهرم یه کِرِمی فرستادم با ویدیویی که خودم جلوی دوربین خوندم. گفت بهترین لحظه‌ی تولدش بود."],
  ["دمو: امید از شیراز", "فارس", 2, "من و نامزدم که دور از همدیگه زندگی می‌کنیم هر ماه برات هدیه می‌فرستیم. جعبه‌ها انگار داریم بغلمون می‌کنن."],
  ["دمو: خانم موسوی از مشهد", "خراسان رضوی", 4, "برای مادربزرگ ۸۰ ساله‌مون فرستادیم؛ با اینکه با گوشی آشنا نیست، پسرش کد رو زد و پیام صوتی رو براش پخش کرد."],
  ["دمو: آرش از تبریز", "آذربایجان شرقی", 1, "یه پیشنهاد دارم: کاش بشه کارت پستال رو با چند تا عکس سفارشی داد. بقیه‌ش فوق‌العاده‌ست."],
  ["دمو: نگار از رشت", "گیلان", 3, "دوست صمیمیم مریض بود؛ یه پاندای بغلی با پیام فرستادم. بعداً گفت همه‌ی شب‌ها بغلش خوابیده."],
];
for (let i = 0; i < EXPS.length; i++) {
  const [name, city, occasion, body] = EXPS[i];
  await db.experience.create({
    data: {
      name, city, occasion, body,
      consent: true,
      status: i < 2 ? "published" : i === 4 ? "rejected" : "pending",
      publishedAt: i < 2 ? ago(i + 3) : null,
      createdAt: ago(i + 2, ri(0, 12)),
    },
  });
}

// ── contact messages (unread first 3) ──
console.log("→ seeding contact messages…");
const MSGS = [
  ["نازنین احمدی", "nazanin@demo.yekdoost", "سوال درباره‌ی ارسال به شهرستان", "", "سلام، می‌خواستم بدونم ارسال به بندرعباس چند روز طول می‌کشه؟ برای تولد خواهرم لازمش دارم.", false],
  ["فرهاد کاویانی", "farhad@demo.yekdoost", "امکان تغییر پیام بعد از ارسال؟", "PN-290101-0901", "سلام، سفارشم ارسال شده ولی می‌خوام یه جمله به پیامش اضافه کنم. امکانش هست؟", false],
  ["پشتیبانی گیف‌کارت", "support@demo.yekdoost", "خطای پرداخت زرین‌پال", "", "دو بار تلاش کردم پرداخت کنم، پول کم شده ولی سفارش ثبت نشده. لطفاً بررسی کنید.", false],
  ["لیلا رحیمی", "leila@demo.yekdoost", "تشکر از تیم خوبتون", "", "فقط می‌خواستم بگم بسته‌بندی‌تون واقعاً قشنگه. مادرم عاشقش شد! موفق باشید 🌸", true],
  ["مدیریت آموزشگاه رها", "raha@demo.yekdoost", "سفارش سازمانی ۲۰ عددی", "", "سلام، برای جشن پایان سال ۲۰ عدد عروسک با کارت اختصاصی می‌خوایم. تخفیف همکاری دارید؟", true],
  ["مهدی یزدانی", "mehdi@demo.yekdoost", "یادداشت داخلی: پیگیری مرجوعی", "PN-290101-0902", "مشتری مرجوعی رو پیگیری می‌کنه. رسید پست رو فرستاده — نیازمند تأیید مدیر.", true],
];
for (const [name, email, subject, orderNo, message, read] of MSGS) {
  await db.contactMessage.create({
    data: { name, email, subject, orderNo, message, read, replyNote: read ? "پاسخ داده شد — ایمیل ارسال شد." : "", handledAt: read ? ago(1) : null, createdAt: ago(ri(0, 6), ri(0, 20)) },
  });
}

// ── app users (customer accounts) ──
console.log("→ seeding app users…");
for (const [name, phone] of ORDERERS.slice(0, 10)) {
  await db.appUser.create({
    data: { phone, name, lastLoginAt: ago(ri(0, 20), ri(0, 20)), createdAt: ago(ri(10, 60)) },
  });
}

// ── sms outbox ──
console.log("→ seeding sms outbox…");
const SMS_ROWS = [
  ["otp_login", "sent"], ["otp_login", "sent"], ["order_confirm", "sent"],
  ["paid", "sent"], ["otp_gift", "sent"], ["otp_gift", "sent"],
  ["otp_gift", "failed"], ["otp_login", "queued"], ["paid", "queued"], ["order_confirm", "sent"],
];
for (let i = 0; i < SMS_ROWS.length; i++) {
  const [template, status] = SMS_ROWS[i];
  await db.smsOutbox.create({
    data: {
      phone: rnd(RECIPIENTS)[1],
      template,
      params: JSON.stringify({ code: String(ri(1000, 9999)), name: "دوست من" }),
      status,
      attempts: status === "failed" ? 3 : 1,
      provider: "ippanel_pattern",
      createdAt: ago(i * 0.3 + 0.1, ri(0, 10)),
    },
  });
}

// ── admin seats (operators only — the real owner logs in via password/OTP) ──
console.log("→ seeding admin seats…");
await db.adminUser.create({ data: { phone: "09357770001", name: "سارا — بسته‌بندی", role: "operator", isActive: true, lastLoginAt: ago(0, 5) } });
await db.adminUser.create({ data: { phone: "09357770002", name: "حسام — پشتیبانی", role: "operator", isActive: true, lastLoginAt: ago(2) } });
await db.adminUser.create({ data: { phone: "09357770003", name: "مریم — قدیمی", role: "operator", isActive: false } });

// ── summary ──
const [ordersCount, paymentsCount, eventsCount] = await Promise.all([
  db.order.count({ where: { code: { startsWith: "PN-DEMO" } } }),
  db.payment.count({ where: { receiptKey: { startsWith: ".data/receipts/demo-" } } }),
  db.orderEvent.count(),
]);
console.log(`✓ demo dataset ready — orders:${ordersCount} manual-receipts:${paymentsCount} total-events:${eventsCount}`);
console.log("  login: /admin → ورود با رمز (ADMIN_PANEL_PASSWORD from .env)");
await db.$disconnect();
