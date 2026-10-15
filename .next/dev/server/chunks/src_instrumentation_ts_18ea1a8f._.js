module.exports = [
"[project]/src/instrumentation.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ── instrumentation.ts — internal minute-tick for the sandbox & single-box deploys ──
// Coolify's systemd timers hit /api/jobs/* in production; this in-process tick
// keeps the same guarantees alive in dev (and as a safety net): reservation
// expiry (10-min card-to-card window) + SMS queue drain. Idempotent jobs only.
// Disable with INTERNAL_CRON="0".
__turbopack_context__.s([
    "register",
    ()=>register
]);
async function register() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (process.env.INTERNAL_CRON === "0") return;
    if (process.env.NEXT_PHASE === "phase-production-build") return;
    const g = globalThis;
    if (g.__pnTicker) return; // hot-reload / multi-register guard
    const { expireDueOrders } = await __turbopack_context__.A("[project]/src/lib/orders/expire.ts [instrumentation] (ecmascript, async loader)");
    let busy = false;
    const tick = async ()=>{
        if (busy) return;
        busy = true;
        try {
            const expired = await expireDueOrders(50);
            if (expired > 0) console.log(`[tick] expired ${expired} unpaid order(s)`);
        } catch  {
        /* DB not ready yet — next minute */ } finally{
            busy = false;
        }
    };
    g.__pnTicker = setInterval(()=>void tick(), 60_000);
    g.__pnTicker.unref?.();
}
}),
];

//# sourceMappingURL=src_instrumentation_ts_18ea1a8f._.js.map