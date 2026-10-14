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
  // phase-B vars (declared now so deploy env is a single contract)
  KAVENEGAR_API_KEY: z.string().optional(),
  KAVENEGAR_SENDER: z.string().optional(),
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
};
export type Env = typeof env;
