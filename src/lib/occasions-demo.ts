// ── «تقویم مناسبت‌ها + نقشه مهربونی» — UI demo data (نمایشی؛ بعد از تأیید به DB وصل می‌شود) ──
import type { PlushKind } from "@/lib/pishnam-data";
import type { JalaliDate } from "@/lib/jalali";
import { jalaliDaysBetween } from "@/lib/jalali";
import { IRAN_PROVINCES } from "@/components/shop/occasions/iran-paths";

export type OccasionTone = "pink" | "blue" | "purple" | "yellow" | "green" | "red";

export interface DemoOccasion {
  id: string;
  y: number;
  m: number;
  d: number;
  title: string;
  emoji: string;
  tone: OccasionTone;
  tagline: string; // یک خط برای کارت پیشنهاد
  body: string; // توضیح وقتی روز انتخاب می‌شود
  picks: PlushKind[];
}

/** مناسبت‌های نمایشی از آبان ۱۴۰۵ تا فروردین ۱۴۰۶ (تاریخ‌ها با تقویم تهران چک شده‌اند) */
export const DEMO_OCCASIONS: DemoOccasion[] = [
  {
    id: "mehr-aban",
    y: 1405, m: 8, d: 22,
    title: "روز جهانی مهربانی",
    emoji: "💙",
    tone: "blue",
    tagline: "به بهانه‌ی مهربونی، یه بغل بدون بهانه بفرست",
    body: "۱۳ نوامبر، روز جهانی مهربانیه؛ دقیقاً کاری که «یک دوست» برایش ساخته شده. یه جعبه بفرست و بگو «فقط یادت بود».",
    picks: ["bear", "bunny", "sheep"],
  },
  {
    id: "ketab-aban",
    y: 1405, m: 8, d: 24,
    title: "روز کتاب و کتاب‌خوانی",
    emoji: "📚",
    tone: "purple",
    tagline: "برای کتاب‌خون‌های عزیز زندگیت",
    body: "۲۴ آبان روز کتابه. عروسک پشمالو کنار کتابِ همیشگیِ دوستت، گرم‌ترین قلم‌خانه‌ی دنیا می‌شود.",
    picks: ["cat", "panda"],
  },
  {
    id: "ferdowsi-azar",
    y: 1405, m: 9, d: 25,
    title: "بزرگداشت فردوسی و زبان فارسی",
    emoji: "📖",
    tone: "green",
    tagline: "یه هدیه به رنگ شعر و حافظه‌ی فارسی",
    body: "۲۵ آذر روز بزرگداشت فردوسیه؛ برای دوستی که با شعر و ادبیات حال می‌کند، یک دوست پشمالوی ساکت مثل میشی عالی است.",
    picks: ["cat", "bear"],
  },
  {
    id: "yalda",
    y: 1405, m: 9, d: 30,
    title: "شب یلدا",
    emoji: "🍉",
    tone: "red",
    tagline: "بلندترین شب سال، گرم‌ترین هدیه‌ی سال",
    body: "یلدا یعنی دور هم بودن. اگر دورهمی‌ات امسال دور است، یه بغل پشمالو بفرست تا کنار هندونه و آجیل نشسته باشد.",
    picks: ["bear", "duck", "bunny"],
  },
  {
    id: "christmas",
    y: 1405, m: 10, d: 4,
    title: "کریسمس",
    emoji: "🎄",
    tone: "green",
    tagline: "برای دوستانی که سال نو دوباره جشن می‌گیرند",
    body: "کریسمس بهانه‌ی خوبی است برای دوستان مسیحی‌ات — یا برای هرکسی که عاشق رنگ و جشن است.",
    picks: ["sheep", "duck"],
  },
  {
    id: "elmi-behman",
    y: 1405, m: 11, d: 21,
    title: "روز جهانی زنان در علم",
    emoji: "🧪",
    tone: "purple",
    tagline: "برای دخترهای دانشمند زندگیت",
    body: "۱۱ فوریه، روز جهانی زنان در علم است؛ برای همکلاسی، همکار یا استادی که مسیر علم را برایت روشن کرد.",
    picks: ["bunny", "cat"],
  },
  {
    id: "zaban-esfand",
    y: 1405, m: 12, d: 2,
    title: "روز جهانی زبان مادری",
    emoji: "🗣️",
    tone: "yellow",
    tagline: "برای دوستی که فارسی‌اش شیرین‌ترین لهجه را دارد",
    body: "۲۱ فوریه روز جهانی زبان مادری است؛ جشن بگیر برای تک‌تک کلمه‌هایی که با هم خندیده‌ایم.",
    picks: ["duck", "bunny"],
  },
  {
    id: "derakht-esfand",
    y: 1405, m: 12, d: 15,
    title: "روز درختکاری",
    emoji: "🌱",
    tone: "green",
    tagline: "یه مهربونی که سال‌ها سبز می‌ماند",
    body: "۱۵ اسفند روز درختکاری؛ جعبه‌ی «یک دوست» هم از کاغذ بازیافتی است — برای زمین هم مهربان باش.",
    picks: ["panda", "bear"],
  },
  {
    id: "valentine",
    y: 1405, m: 12, d: 25,
    title: "ولنتاین",
    emoji: "❤️",
    tone: "red",
    tagline: "عشقت را به شکل پشمالو بفرست",
    body: "۱۴ فوریه، روز عشق. اگر حرف‌هایت بزرگ‌تر از پیام‌ک است، بگذار یک بغل گرم جای تو بگوید.",
    picks: ["bear", "bunny", "cat"],
  },
  {
    id: "sepandarmazgan",
    y: 1405, m: 12, d: 29,
    title: "اسپندگان — روز عشق ایرانی",
    emoji: "💮",
    tone: "pink",
    tagline: "عشق ایرانی، هدیه‌ی ایرانی",
    body: "۲۹ اسفند، سپندارمذگان؛ روز عشق و زمین در تقویم کهن ایرانی. یه هدیه بومی برای یه عشق ایرانی.",
    picks: ["bunny", "sheep", "bear"],
  },
  {
    id: "nowruz",
    y: 1406, m: 1, d: 1,
    title: "نوروز",
    emoji: "🌸",
    tone: "pink",
    tagline: "عیدی دوستت را زودتر بفرست",
    body: "سال نو، بهترین بهانه‌ی دنیاست. عیدیت را با یه دوست پشمالو شروع کن تا هفت‌سینش کامل شود.",
    picks: ["bunny", "duck", "sheep"],
  },
  {
    id: "tabiat",
    y: 1406, m: 1, d: 13,
    title: "روز طبیعت (سیزده‌بدر)",
    emoji: "🌿",
    tagline: "برای رفوقای پیک‌نیکت",
    tone: "green",
    body: "۱۳ فروردین روز طبیعت است؛ برای دوستی که همیشه سبد پیک‌نیکش را می‌بندد، یک رفیق پشمالو بردار.",
    picks: ["panda", "duck"],
  },
];

export const DEMO_MONTH_SPAN = {
  start: { y: 1405, m: 8 },
  end: { y: 1406, m: 1 },
};

// ── آمار نمایشی بسته‌های ارسالی به استان‌ها (key = شناسه‌ی مسیر تولیدشده از نقشه) ──
export const PROVINCE_COUNTS: Record<string, number> = {
  Tehran: 2380,
  Esfahan: 1420,
  "Razavi Khorasan": 1050,
  Fars: 920,
  "East Azarbaijan": 880,
  Gilan: 650,
  Alborz: 410,
  Mazandaran: 390,
  Khuzestan: 385,
  "West Azarbaijan": 375,
  Kerman: 340,
  Golestan: 240,
  Semnan: 195,
  Yazd: 180,
  Hamadan: 160,
  Kermanshah: 145,
  Ardebil: 130,
  Kordestan: 125,
  Qom: 120,
  Qazvin: 110,
  "North Khorasan": 110,
  Zanjan: 95,
  Lorestan: 90,
  Markazi: 85,
  "Sistan and Baluchestan": 85,
  Hormozgan: 75,
  "Chahar Mahall and Bakhtiari": 70,
  "Kohgiluyeh and Buyer Ahmad": 70,
  "South Khorasan": 65,
  Ilam: 56,
  Bushehr: 50,
};

export const PROVINCE_TOTAL = Object.values(PROVINCE_COUNTS).reduce((a, b) => a + b, 0);

export interface ProvinceRow {
  key: string;
  fa: string;
  count: number;
  pct: number; // نسبت به استان اول (۰..۱۰۰)
}

/** نام فارسی استان‌ها از فایلِ مسیرهای تولیدشده‌ی نقشه می‌آید */
export function provinceFa(key: string): string {
  return IRAN_PROVINCES.find((p) => p.key === key)?.fa ?? key;
}

export function provinceRows(): ProvinceRow[] {
  const rows = Object.entries(PROVINCE_COUNTS).map(([key, count]) => ({
    key,
    fa: provinceFa(key),
    count,
    pct: 0,
  }));
  rows.sort((a, b) => b.count - a.count);
  const top = rows[0]?.count || 1;
  return rows.map((r) => ({ ...r, pct: Math.round((r.count / top) * 100) }));
}

/** اولین مناسبتِ از امروز به بعد + روزهای مانده */
export function nextOccasion(today: JalaliDate): { occasion: DemoOccasion; days: number } | null {
  const future = DEMO_OCCASIONS.map((o) => ({
    occasion: o,
    days: jalaliDaysBetween(today, { y: o.y, m: o.m, d: o.d }),
  }))
    .filter((x) => x.days >= 0)
    .sort((a, b) => a.days - b.days);
  return future[0] ?? null;
}

export function occasionsOfMonth(y: number, m: number): DemoOccasion[] {
  return DEMO_OCCASIONS.filter((o) => o.y === y && o.m === m);
}

/** ملایم: «امروز» / «فردا» / «۳ روز مانده» / «۲ روز گذشته» */
export function daysLeftLabel(days: number): string {
  const faDigits = (n: number) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
  if (days === 0) return "امروزه";
  if (days === 1) return "فردا";
  if (days === -1) return "دیروز بود";
  if (days > 1) return `${faDigits(days)} روز مانده`;
  return `${faDigits(-days)} روز گذشته`;
}

// ── پالت‌های رنگی هر tone (متنِ روشنِ badge + پس‌زمینه) ──
export const TONE_COLORS: Record<OccasionTone, { bg: string; text: string; soft: string; deep: string }> = {
  pink: { bg: "#F0426B", text: "#FFFFFF", soft: "#FFE0EA", deep: "#C22553" },
  red: { bg: "#E23A3A", text: "#FFFFFF", soft: "#FFE3E0", deep: "#A81F1F" },
  blue: { bg: "#00ABE7", text: "#04202E", soft: "#D6F1FB", deep: "#006387" },
  purple: { bg: "#8B6CE7", text: "#FFFFFF", soft: "#E7E0FA", deep: "#5B3FB8" },
  yellow: { bg: "#F5B301", text: "#04202E", soft: "#FFF3C9", deep: "#8F6A00" },
  green: { bg: "#2FB77F", text: "#FFFFFF", soft: "#DDF3EA", deep: "#1B7A55" },
};
