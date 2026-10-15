module.exports = [
"[project]/src/lib/db.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
const globalForPrisma = globalThis;
/**
 * SQLite (launch) writes serialize through ONE connection — `connection_limit=1`
 * makes concurrent checkout transactions queue instead of failing with
 * SQLITE_BUSY ("Socket timeout"). This is the boring, correct setting for a
 * single-node 2c/2G VPS; at PostgreSQL day the URL switches in Coolify and
 * this override keeps working (PG ignores connection_limit=1 badly, so the
 * param is only injected for file: URLs).
 */ function sqliteUrl() {
    const raw = process.env.DATABASE_URL;
    if (!raw || !raw.startsWith("file:")) return undefined;
    if (raw.includes("connection_limit=")) return raw;
    return `${raw}?connection_limit=1&pool_timeout=20`;
}
const db = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]({
    log: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : process.env.PRISMA_QUERY_LOG === "1" ? [
        "query",
        "error",
        "warn"
    ] : [
        "error",
        "warn"
    ],
    ...sqliteUrl() ? {
        datasources: {
            db: {
                url: sqliteUrl()
            }
        }
    } : {}
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = db;
}),
"[project]/src/lib/db-write.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ── db-write.ts — withWriteRetry (prescription P0 / critic MUST-FIX #5) ──
// SQLite single-node: concurrent writers can hit BUSY / pool timeouts.
// Retries ONLY the retryable write errors, 3 attempts, 25–75ms jitter.
// Idempotent call sites only (checkout replays safely via Idempotency-Key).
__turbopack_context__.s([
    "retriedTransaction",
    ()=>retriedTransaction,
    "withWriteRetry",
    ()=>withWriteRetry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [instrumentation] (ecmascript)");
;
const ATTEMPTS = 3;
function isRetryable(e) {
    if (typeof e !== "object" || e === null) return false;
    const err = e;
    // P2024 = connection pool timeout; P2010 = raw query failed (SQLITE_BUSY);
    // P2028 = transaction already closed/expired; message catches socket timeout
    if (err.code && [
        "P2024",
        "P2010",
        "P2028"
    ].includes(err.code)) return true;
    const msg = err.message ?? "";
    return msg.includes("Socket timeout") || msg.includes("SQLITE_BUSY") || msg.includes("database is locked") || msg.includes("Transaction already closed");
}
const sleep = (ms)=>new Promise((r)=>setTimeout(r, ms));
async function withWriteRetry(fn) {
    let last;
    for(let i = 0; i < ATTEMPTS; i++){
        try {
            return await fn();
        } catch (e) {
            last = e;
            if (!isRetryable(e) || i === ATTEMPTS - 1) throw e;
            const jitter = 25 + Math.floor(Math.random() * 50); // 25–75ms
            await sleep(jitter * (i + 1));
        }
    }
    throw last;
}
async function retriedTransaction(fn, options) {
    return withWriteRetry(()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].$transaction(fn, {
            timeout: options?.timeout ?? 10_000
        }));
}
}),
"[project]/src/lib/errors.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ── errors.ts — one error type, one HTTP mapper (guide §A2) ──
// Every API route throws AppError; the mapper renders { error, details? } JSON.
__turbopack_context__.s([
    "AppError",
    ()=>AppError,
    "handle",
    ()=>handle,
    "toErrorResponse",
    ()=>toErrorResponse
]);
class AppError extends Error {
    status;
    code;
    details;
    constructor(status, code, details){
        super(code);
        this.status = status;
        this.code = code;
        this.details = details;
    }
}
function toErrorResponse(e) {
    if (e instanceof AppError) {
        return {
            body: {
                error: e.code,
                ...e.details ? {
                    details: e.details
                } : {}
            },
            status: e.status
        };
    }
    console.error("[api] unhandled error:", e);
    return {
        body: {
            error: "server_error"
        },
        status: 500
    };
}
function handle(fn) {
    return fn();
}
}),
"[project]/src/lib/env.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "env",
    ()=>env
]);
// ── env.ts — validated environment (fail fast in production) ──
// Guide §5: every secret comes from env; missing vars crash at start in prod.
// In dev (sandbox) we fall back to safe local defaults so QA flows keep working.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [instrumentation] (ecmascript) <export * as z>");
;
const schema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    NODE_ENV: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "development",
        "production",
        "test"
    ]).default("development"),
    DATABASE_URL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    SESSION_SECRET: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(16).default("pishnam-dev-secret-do-not-use-in-prod"),
    CRON_SECRET: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(8).default("pishnam-dev-cron-secret"),
    SITE_URL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default("http://localhost:3000"),
    // phones allowed to hold an admin session (comma-separated), e.g. "0912…,0935…"
    ADMIN_SEED_PHONES: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default(""),
    // "1" → OTP echoed in the response (dev/QA only; production ignores this)
    SMS_DEV_ECHO: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default("0"),
    // پنل مدیریت: ورود با رمز (علاوه بر مسیر OTP). در استقرار حتماً عوض شود.
    ADMIN_PANEL_PASSWORD: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(8).default("pishnam-admin-1404"),
    // "0" → internal scheduler (reservation sweep / SMS flush) disabled
    INTERNAL_CRON: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default("1"),
    // phase-B vars (declared now so deploy env is a single contract)
    KAVENEGAR_API_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    KAVENEGAR_SENDER: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    OWNER_MOBILE: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    ZARINPAL_MERCHANT_ID: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    ZARINPAL_SANDBOX: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default("0"),
    S3_ENDPOINT: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    S3_BUCKET_PRIVATE: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    S3_BUCKET_PUBLIC: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    S3_ACCESS_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    S3_SECRET_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    S3_REGION: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default("ir-thr-at1")
});
const parsed = schema.safeParse(process.env);
let raw;
if (parsed.success) {
    raw = parsed.data;
} else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    console.warn("[env] falling back to dev defaults:", parsed.error.message);
    raw = schema.parse({
        DATABASE_URL: process.env.DATABASE_URL ?? "file:./db/custom.db"
    });
}
const env = {
    ...raw,
    isProd: raw.NODE_ENV === "production",
    isDev: raw.NODE_ENV !== "production",
    devEcho: raw.NODE_ENV !== "production" && raw.SMS_DEV_ECHO === "1",
    adminPhones: new Set(raw.ADMIN_SEED_PHONES.split(",").map((p)=>p.replace(/[۰-۹]/g, (d)=>String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/\D/g, "")).filter(Boolean))
};
}),
"[project]/src/lib/sms/index.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ── sms/index.ts — SmsOutbox queue + Kavenegar seam (guide §4.10) ──
// enqueueSms always runs INSIDE the transaction that changes the state.
// flushSms (the /api/jobs/sms-flush timer) drains the queue.
// Cost law: every template ≤ 70 chars = 1 segment (asserted at enqueue time).
__turbopack_context__.s([
    "SMS_TEMPLATES",
    ()=>SMS_TEMPLATES,
    "enqueueSms",
    ()=>enqueueSms,
    "flushSms",
    ()=>flushSms,
    "renderSms",
    ()=>renderSms
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/env.ts [instrumentation] (ecmascript)");
// tiny indirection so the import graph stays readable in tests/qa
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [instrumentation] (ecmascript)");
;
const SMS_TEMPLATES = {
    order_confirm: {
        key: "order_confirm",
        render: (p)=>`یک دوست: سفارش ${p.code} ثبت شد. پیگیری: yekdoost.ir/track`
    },
    paid: {
        key: "paid",
        render: (p)=>`یک دوست: پرداخت سفارش ${p.code} تأیید شد؛ به‌زودی ارسال می‌شه.`
    },
    receipt_received: {
        key: "receipt_received",
        render: (p)=>`یک دوست: رسید سفارش ${p.code} رسید؛ تا ۱۲ ساعت بررسی می‌شه.`
    },
    rejected: {
        key: "rejected",
        render: (p)=>`یک دوست: رسید سفارش ${p.code} تأیید نشد${p.reason ? `؛ ${p.reason}` : ""}.`
    },
    cancelled: {
        key: "cancelled",
        render: (p)=>`یک دوست: سفارش ${p.code} لغو شد. اگه سؤالی داری تماس بگیر.`
    },
    shipped: {
        key: "shipped",
        render: (p)=>`یک دوست: سفارش ${p.code} تحویل پست شد${p.tracking ? `؛ کد رهگیری ${p.tracking}` : ""}.`
    },
    delivered: {
        key: "delivered",
        render: (p)=>`یک دوست: سفارش ${p.code} تحویل داده شد. جعبه رو باز کن!`
    },
    abandoned_cart: {
        key: "abandoned_cart",
        render: (p)=>`یک دوست: جعبه‌ت منتظره! سفارش ${p.code} تا امشب اعتبار داره.`
    },
    admin_alert: {
        key: "admin_alert",
        render: (p)=>`یک دوست: ${p.text}`
    }
};
function renderSms(template, params = {}) {
    const t = SMS_TEMPLATES[template];
    if (!t) throw new Error(`unknown sms template: ${template}`);
    const text = t.render(params);
    if (text.length > 70) throw new Error(`sms template ${template} exceeds 70 chars (${text.length})`);
    return text;
}
async function enqueueSms(tx, input) {
    const text = renderSms(input.template, input.params); // throws on >70 → fail fast in dev
    await tx.smsOutbox.create({
        data: {
            phone: input.phone,
            template: input.template,
            params: JSON.stringify({
                ...input.params,
                _text: text
            }),
            sendAfter: input.sendAfter ?? new Date()
        }
    });
}
const BACKOFF_MS = [
    86_400_000,
    5 * 86_400_000,
    30 * 86_400_000
]; // ۱د → ۵د → ۳۰د → dead
async function flushSms(limit = 30) {
    const queued = await db_sms.findQueued(limit);
    let sent = 0;
    let failed = 0;
    let dead = 0;
    for (const row of queued){
        const params = safeParse(row.params);
        const text = String(params._text ?? renderSms(row.template, params));
        try {
            await deliver(row.phone, text);
            await db_sms.markSent(row.id);
            sent += 1;
        } catch (e) {
            const attempts = row.attempts + 1;
            if (attempts > BACKOFF_MS.length) {
                await db_sms.markDead(row.id, String(e));
                dead += 1;
            } else {
                await db_sms.markFailed(row.id, String(e), new Date(Date.now() + BACKOFF_MS[attempts - 1]));
                failed += 1;
            }
        }
    }
    return {
        sent,
        failed,
        dead
    };
}
async function deliver(phone, text) {
    // Dev sandbox: no real provider — echo marks it sent so the queue drains.
    if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["env"].devEcho || !__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["env"].KAVENEGAR_API_KEY) {
        console.log(`[sms:echo] ${phone} → ${text}`);
        return;
    }
    const key = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["env"].KAVENEGAR_API_KEY;
    const qs = new URLSearchParams({
        receptor: phone,
        message: text
    });
    if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["env"].KAVENEGAR_SENDER) qs.set("sender", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["env"].KAVENEGAR_SENDER);
    const res = await fetch(`https://api.kavenegar.com/v1/${key}/sms/send.json?${qs.toString()}`, {
        signal: AbortSignal.timeout(8000)
    });
    if (!res.ok) throw new Error(`kavenegar_http_${res.status}`);
    const body = await res.json();
    if ((body.return?.status ?? 200) !== 200) throw new Error(`kavenegar_${body.return?.status}`);
}
function safeParse(s) {
    try {
        return JSON.parse(s);
    } catch  {
        return {};
    }
}
;
const db_sms = {
    findQueued: (limit)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].smsOutbox.findMany({
            where: {
                status: "queued",
                sendAfter: {
                    lte: new Date()
                }
            },
            orderBy: {
                createdAt: "asc"
            },
            take: limit
        }),
    markSent: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].smsOutbox.update({
            where: {
                id
            },
            data: {
                status: "sent",
                sentAt: new Date(),
                attempts: {
                    increment: 1
                }
            }
        }),
    markFailed: (id, error, sendAfter)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].smsOutbox.update({
            where: {
                id
            },
            data: {
                status: "queued",
                attempts: {
                    increment: 1
                },
                error: error.slice(0, 200),
                sendAfter
            }
        }),
    markDead: (id, error)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].smsOutbox.update({
            where: {
                id
            },
            data: {
                status: "dead",
                attempts: {
                    increment: 1
                },
                error: error.slice(0, 200)
            }
        })
};
}),
"[project]/src/lib/orders/status.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ── orders/status.ts — the 11-state machine (guide §4.8, critic MUST-FIX #6) ──
// Lowercase, forward-only. Shared between server and client (no server imports).
__turbopack_context__.s([
    "ORDER_STATUSES",
    ()=>ORDER_STATUSES,
    "STEP_LABELS",
    ()=>STEP_LABELS,
    "STEP_SUBTITLES",
    ()=>STEP_SUBTITLES,
    "TRANSITIONS",
    ()=>TRANSITIONS,
    "UNPAID_STATUSES",
    ()=>UNPAID_STATUSES,
    "customerStep",
    ()=>customerStep,
    "isTerminal",
    ()=>isTerminal,
    "legacyStep",
    ()=>legacyStep
]);
const ORDER_STATUSES = [
    "awaiting_payment",
    "payment_under_review",
    "paid",
    "preparing",
    "shipped",
    "delivered",
    "failed",
    "cancelled",
    "expired",
    "refund_requested",
    "refunded"
];
const TRANSITIONS = {
    awaiting_payment: [
        "paid",
        "payment_under_review",
        "failed",
        "cancelled",
        "expired"
    ],
    payment_under_review: [
        "paid",
        "awaiting_payment",
        "cancelled"
    ],
    failed: [
        "awaiting_payment",
        "expired"
    ],
    paid: [
        "preparing",
        "cancelled"
    ],
    preparing: [
        "shipped",
        "cancelled"
    ],
    shipped: [
        "delivered",
        "refund_requested"
    ],
    delivered: [
        "refund_requested"
    ],
    refund_requested: [
        "refunded",
        "delivered"
    ],
    cancelled: [],
    expired: [],
    refunded: []
};
const UNPAID_STATUSES = [
    "awaiting_payment",
    "payment_under_review",
    "failed"
];
function isTerminal(s) {
    return TRANSITIONS[s].length === 0;
}
function customerStep(s) {
    switch(s){
        case "awaiting_payment":
        case "failed":
            return "awaiting_payment";
        case "payment_under_review":
            return "awaiting_payment"; // displayed as «در انتظار پرداخت»
        case "paid":
        case "preparing":
            return "preparing";
        case "shipped":
            return "shipped";
        case "delivered":
            return "delivered";
        case "cancelled":
            return "cancelled";
        case "expired":
            return "expired";
        case "refund_requested":
        case "refunded":
            return "refund";
    }
}
const STEP_LABELS = {
    awaiting_payment: "در انتظار پرداخت",
    preparing: "در حال آماده‌سازی",
    shipped: "در راهه",
    delivered: "تحویل شد",
    cancelled: "لغو شد",
    expired: "منقضی شد",
    refund: "در جریان مرجوعی"
};
const STEP_SUBTITLES = {
    awaiting_payment: "هدیه‌ت منتظر پرداخته.",
    preparing: "پرداخت شد! داریم جعبه رو با دلسوزی می‌چینیم.",
    shipped: "جعبه تحویل پست شد؛ به‌زودی می‌رسه.",
    delivered: "جعبه رسید! حالا نوبت رمز کارته.",
    cancelled: "این سفارش لغو شده. اگه اشتباهه با ما در تماس باش.",
    expired: "این سفارش منقضی شد؛ می‌تونی دوباره سفارش بدی.",
    refund: "درخواست مرجوعیت در جریانه."
};
function legacyStep(s) {
    const cs = customerStep(s);
    return cs === "shipped" ? "shipped" : cs === "delivered" ? "delivered" : cs === "preparing" ? "packing" : "paid";
}
}),
"[project]/src/lib/orders/transition.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ── orders/transition.ts — guarded, atomic, SMS-attached transitions (guide §4.8) ──
__turbopack_context__.s([
    "transitionOrder",
    ()=>transitionOrder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2d$write$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db-write.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/errors.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sms$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sms/index.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2f$status$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/orders/status.ts [instrumentation] (ecmascript)");
;
;
;
;
;
async function transitionOrder(orderId, to, a, outerTx) {
    const run = async (tx)=>{
        const cur = await tx.order.findUniqueOrThrow({
            where: {
                id: orderId
            },
            include: {
                items: true
            }
        });
        const from = cur.status;
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2f$status$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["TRANSITIONS"][from]?.includes(to)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["AppError"](409, "invalid_transition", {
            from,
            to
        });
        if (a.expectFrom && a.expectFrom !== from) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["AppError"](409, "concurrent_update", {
            from
        });
        // conditional write — if the status changed between read and write, count=0
        const r = await tx.order.updateMany({
            where: {
                id: orderId,
                status: from
            },
            data: {
                status: to
            }
        });
        if (r.count !== 1) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["AppError"](409, "concurrent_update", {
            from
        });
        // stock release: only when an UNPAID order is cancelled/expired
        if ((to === "cancelled" || to === "expired") && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2f$status$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["UNPAID_STATUSES"].includes(from)) {
            for (const it of cur.items){
                await tx.productVariant.update({
                    where: {
                        id: it.variantId
                    },
                    data: {
                        stock: {
                            increment: it.qty
                        }
                    }
                });
            }
        }
        await tx.orderEvent.create({
            data: {
                orderId,
                type: "status_changed",
                fromStatus: from,
                toStatus: to,
                actor: a.actor,
                actorId: a.actorId ?? "",
                note: a.note ?? "",
                meta: a.meta ? JSON.stringify(a.meta) : "{}"
            }
        });
        await enqueueSmsForTransition(tx, cur, from, to, a);
        return r;
    };
    if (outerTx) return run(outerTx);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2d$write$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["withWriteRetry"])(()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].$transaction(run, {
            timeout: 10_000
        }));
}
/** One SMS per transition — to the SENDER (cost policy: ≤2 SMS/order). */ async function enqueueSmsForTransition(tx, order, _from, to, a) {
    const phone = order.userPhone || order.senderPhone;
    if (!phone) return;
    switch(to){
        case "paid":
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sms$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["enqueueSms"])(tx, {
                phone,
                template: "paid",
                params: {
                    code: order.code
                }
            });
            break;
        case "payment_under_review":
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sms$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["enqueueSms"])(tx, {
                phone,
                template: "receipt_received",
                params: {
                    code: order.code
                }
            });
            break;
        case "cancelled":
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sms$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["enqueueSms"])(tx, {
                phone,
                template: "cancelled",
                params: {
                    code: order.code
                }
            });
            break;
        case "shipped":
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sms$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["enqueueSms"])(tx, {
                phone,
                template: "shipped",
                params: {
                    code: order.code,
                    tracking: a.meta?.tracking ? String(a.meta.tracking) : ""
                }
            });
            break;
        case "delivered":
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sms$2f$index$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["enqueueSms"])(tx, {
                phone,
                template: "delivered",
                params: {
                    code: order.code
                }
            });
            break;
        default:
            break; // awaiting_payment/failed/expired/... → silent (SMS cost law)
    }
}
}),
"[project]/src/lib/orders/expire.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MANUAL_WINDOW_MINUTES",
    ()=>MANUAL_WINDOW_MINUTES,
    "expireDueOrders",
    ()=>expireDueOrders,
    "expireOrderIfDue",
    ()=>expireOrderIfDue,
    "windowEnded",
    ()=>windowEnded
]);
// ── orders/expire.ts — payment-window expiry (reservation release) ──
// Card-to-card orders reserve stock for a 10-minute window (owner decision,
// «رزرو ۱۰ دقیقه‌ای»): expiresAt = createdAt + 10min for manual_transfer,
// 24h for zarinpal. Stock is released by transitionOrder when the order
// reaches expired — the same path works for lazy checks and the cron job.
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [instrumentation] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2f$transition$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/orders/transition.ts [instrumentation] (ecmascript)");
;
;
/** States whose stock is still held (transition releases on expiry). */ const EXPIRABLE = [
    "awaiting_payment",
    "failed"
];
const MANUAL_WINDOW_MINUTES = 10;
function windowEnded(o) {
    return EXPIRABLE.includes(o.status) && o.expiresAt.getTime() < Date.now();
}
async function expireOrderIfDue(orderId) {
    const o = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].order.findUnique({
        where: {
            id: orderId
        },
        select: {
            id: true,
            status: true,
            expiresAt: true
        }
    });
    if (!o || !windowEnded(o)) return;
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2f$transition$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["transitionOrder"])(o.id, "expired", {
            actor: "system",
            note: "payment window ended"
        });
    } catch  {
    /* raced with another check/cron — fine */ }
}
async function expireDueOrders(take = 100) {
    const stale = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["db"].order.findMany({
        where: {
            status: {
                in: EXPIRABLE
            },
            expiresAt: {
                lt: new Date()
            }
        },
        select: {
            id: true
        },
        take
    });
    let n = 0;
    for (const o of stale){
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2f$transition$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["transitionOrder"])(o.id, "expired", {
                actor: "system",
                note: "payment window ended (sweep)"
            });
            n += 1;
        } catch  {
        /* raced — next tick */ }
    }
    return n;
}
}),
];

//# sourceMappingURL=src_lib_29a5c80f._.js.map