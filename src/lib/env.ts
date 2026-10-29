// ── env.ts — validated environment (fail fast in production) ──
// Guide §5: every secret comes from env; missing vars crash at start in prod.
// In dev (sandbox) we fall back to safe local defaults so QA flows keep working.
import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  DATABASE_URL: z.string().min(1),
  SESSION_SECRET: z.string().min(16).default("pishnam-dev-secret-do-not-use-in-prod"),
  CRON_SECRET: z.string().min(8).default("pishnam-dev-cron-secret"),
  SITE_URL: z.string().default("http://localhost:3000"),
  // phones allowed to hold an admin session (comma-separated), e.g. "0912…,0935…"
  ADMIN_SEED_PHONES: z.string().default(""),
  // "1" → OTP echoed in the response (dev/QA only; production ignores this)
  SMS_DEV_ECHO: z.string().default("0"),
  // پنل مدیریت: ورود با رمز (علاوه بر مسیر OTP). در استقرار حتماً عوض شود.
  ADMIN_PANEL_PASSWORD: z.string().min(8).default("pishnam-admin-1404"),
  // "0" → internal scheduler (reservation sweep / SMS flush) disabled
  INTERNAL_CRON: z.string().default("1"),
  // phase-B vars (declared now so deploy env is a single contract)
  KAVENEGAR_API_KEY: z.string().optional(),
  KAVENEGAR_SENDER: z.string().optional(),
  // ippanel (ippanel.com) — pattern-based SMS (owner round: بخش پیامک)
  // the API key itself never enters the repo (owner provides it via env)
  IPPANEL_API_KEY: z.string().optional(),
  IPPANEL_SENDER: z.string().optional(),
  OWNER_MOBILE: z.string().optional(),
  ZARINPAL_MERCHANT_ID: z.string().optional(),
  ZARINPAL_SANDBOX: z.string().default("0"),
  S3_ENDPOINT: z.string().optional(),
  S3_BUCKET_PRIVATE: z.string().optional(),
  S3_BUCKET_PUBLIC: z.string().optional(),
  S3_ACCESS_KEY: z.string().optional(),
  S3_SECRET_KEY: z.string().optional(),
  S3_REGION: z.string().default("ir-thr-at1"),
});

const parsed = schema.safeParse(process.env);
let raw: z.infer<typeof schema>;
if (parsed.success) {
  raw = parsed.data;
} else {
  if (process.env.NODE_ENV === "production") {
    // In production we refuse to boot with a broken env (guide §5)
    throw new Error(`Pishnam env invalid: ${parsed.error.message}`);
  }
  console.warn("[env] falling back to dev defaults:", parsed.error.message);
  raw = schema.parse({
    DATABASE_URL: process.env.DATABASE_URL ?? "file:./db/custom.db",
  });
}

// ── S-01 (audit wave 37) — نگهبان سکرت‌های پروداکشن ──
// سه سکرت SESSION_SECRET / ADMIN_PANEL_PASSWORD / CRON_SECRET در dev مقدار
// پیش‌فرض شناخته‌شده دارند؛ اگر روی سرور واقعی هم env ست نشده باشد، سایت
// بی‌سروصدا با همین مقادیر عمومی بالا می‌آمد و هر کسی می‌توانست وارد پنل
// مدیریت شود. از این به بعد در production اگر هرکدام غایب یا برابر همان
// مقدار پیش‌فرض معروف باشد، بالا آمدن سرور با خطای بلند و واضح رد می‌شود.
// نکتهٔ امنیتی: در پیام خطا هرگز «مقدار» سکرت چاپ نمی‌شود — فقط نام متغیر.
const WELL_KNOWN_DEFAULTS: Record<string, string> = {
  SESSION_SECRET: "pishnam-dev-secret-do-not-use-in-prod",
  CRON_SECRET: "pishnam-dev-cron-secret",
  ADMIN_PANEL_PASSWORD: "pishnam-admin-1404",
};

let prodSecretsVerified = false;

/**
 * فقط در زمان اجرا (runtime) سخت‌گیری می‌کند — هرگز حین `next build`.
 * build با NODE_ENV=production اجرا می‌شود و متغیرها ممکن است روی ماشین
 * build نباشند؛ به همین دلیل این تابع نه در سطح ماژول صدا زده می‌شود و نه
 * در فاز build اثر دارد (NEXT_PHASE guard). فراخوانی‌ها:
 *   ۱) src/instrumentation.ts هنگام بالا آمدن سرور (crash بلند و زودهنگام)
 *   ۲) getter های تنبلِ سه سکرت در `env` — برای پلتفرم‌هایی که
 *      instrumentation.register() را اجرا نمی‌کنند (مثل Netlify handler)
 */
export function assertProdSecrets(): void {
  if (process.env.NODE_ENV !== "production") return; // dev/سندباکس: پیش‌فرض‌های محلی مجاز
  if (process.env.NEXT_PHASE === "phase-production-build") return; // build هرگز نبُرد
  if (prodSecretsVerified) return;
  const bad = Object.keys(WELL_KNOWN_DEFAULTS).filter((k) => {
    // از process.env خام چک می‌کنیم (نه raw) تا «ست‌نبودن» هم گرفته شود؛
    // مقایسه با پیش‌فرض معروف، حالت «عمداً همان مقدار عمومی» را هم رد می‌کند.
    const v = process.env[k];
    return !v || v.length < 8 || v === WELL_KNOWN_DEFAULTS[k];
  });
  if (bad.length > 0) {
    // فقط نام متغیرها — مقدار هرگز لاگ/چاپ نمی‌شود
    throw new Error(
      `[env] REFUSING TO SERVE — production secrets missing or still set to the public dev default: ${bad.join(", ")}. ` +
        "روی سرور واقعی این سه متغیر را با مقادیر تصادفی و خصوصی ست کن: SESSION_SECRET / ADMIN_PANEL_PASSWORD / CRON_SECRET",
    );
  }
  prodSecretsVerified = true;
}

export const env = {
  ...raw,
  isProd: raw.NODE_ENV === "production",
  isDev: raw.NODE_ENV !== "production",
  devEcho: raw.NODE_ENV !== "production" && raw.SMS_DEV_ECHO === "1",
  adminPhones: new Set(
    raw.ADMIN_SEED_PHONES.split(",")
      .map((p) => p.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/\D/g, ""))
      .filter(Boolean),
  ),
  // سکرت‌ها تنبل خوانده می‌شوند تا نگهبان بالا دقیقاً در زمان مصرفِ واقعی
  // (هندلِ درخواست) هم درِ دوم را ببندد — همهٔ مصرف‌کننده‌ها در زمان درخواست
  // به env.SESSION_SECRET و… دسترسی می‌زنند، نه در سطح ماژول.
  get SESSION_SECRET(): string {
    assertProdSecrets();
    return raw.SESSION_SECRET;
  },
  get CRON_SECRET(): string {
    assertProdSecrets();
    return raw.CRON_SECRET;
  },
  get ADMIN_PANEL_PASSWORD(): string {
    assertProdSecrets();
    return raw.ADMIN_PANEL_PASSWORD;
  },
};
export type Env = typeof env;
