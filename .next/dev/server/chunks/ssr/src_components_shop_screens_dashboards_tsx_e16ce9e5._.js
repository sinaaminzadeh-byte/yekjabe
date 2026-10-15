module.exports = [
"[project]/src/components/shop/screens/dashboards.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DesktopImpact",
    ()=>DesktopImpact,
    "DesktopLogin",
    ()=>DesktopLogin,
    "DesktopMyGifts",
    ()=>DesktopMyGifts,
    "MobileImpact",
    ()=>MobileImpact,
    "MobileLogin",
    ()=>MobileLogin,
    "MobileMyGifts",
    ()=>MobileMyGifts,
    "PaymentBlock",
    ()=>PaymentBlock,
    "useHold",
    ()=>useHold
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// ── Dashboards: MyGifts / Impact (دفتر مهربونی) / Login — mobile + desktop ──
// Ported 1:1 from the design system files:
//   02-هدیه‌هام (mobile) · 16-هدیه‌هام (desktop)
//   08-دفتر مهربونی (mobile) · 14-دفتر مهربونی (desktop)
//   03-ورود یا ثبت‌نام (mobile) · 15-ورود یا ثبت‌نام (desktop)
// with REAL store wiring (orders, charity counter, OTP login flow).
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/plush.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$logo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/logo.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/icons.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hash-route.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pishnam-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pishnam-data.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/fa.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$sync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pishnam-sync.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$fav$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/fav.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$manual$2d$payment$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/manual-payment.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2f$order$2d$view$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/orders/order-view.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
/* ═══════════════ shared constants & helpers ═══════════════ */ // Honest customer-facing chips live in @/lib/orders/order-view (one source of
// truth for dashboard + track): v2 orders show the real 11-state status —
// legacyStep used to collapse «awaiting_payment» into «بسته‌بندی», which lied
// about money. Legacy demo orders keep the classic 4-step chip.
const NEXT_LABEL = {
    paid: "بسته‌بندی",
    packing: "تحویل به پست",
    shipped: "تحویل به دوستت",
    delivered: "تمام شد"
};
/**
 * Damage-only refund request block (Phase C §4.8): shown on sent server orders
 * with raw status shipped|delivered. Expands inline — reason 10..500 chars +
 * up to 3 photos (≤5MB each, client pre-checked) → POST /api/orders/{id}/refund.
 * On success the raw status flips locally to refund_requested (chip updates),
 * then a best-effort pullOrders() confirms against the server.
 */ function RefundBlock({ o, desktop = false }) {
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [reason, setReason] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [photos, setPhotos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [photoErr, setPhotoErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [err, setErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const eligible = Boolean(o.v2) && o.dir === "sent" && (o.status2 === "shipped" || o.status2 === "delivered");
    const chip = o.v2 && (o.status2 === "refund_requested" || o.status2 === "refunded") ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2f$order$2d$view$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["V2_CHIP"][o.status2] : null;
    if (!eligible && !chip) return null;
    const tooShort = reason.trim().length > 0 && reason.trim().length < 10;
    const addPhotos = (files)=>{
        setPhotoErr("");
        if (!files) return;
        const next = [
            ...photos
        ];
        for (const f of Array.from(files)){
            if (next.length >= 3) {
                setPhotoErr("حداکثر ۳ عکس.");
                break;
            }
            if (![
                "image/jpeg",
                "image/png",
                "image/webp"
            ].includes(f.type)) {
                setPhotoErr("عکس‌ها باید JPG، PNG یا WebP باشن.");
                continue;
            }
            if (f.size > 5 * 1024 * 1024) {
                setPhotoErr("هر عکس باید کمتر از ۵ مگابایت باشه.");
                continue;
            }
            next.push(f);
        }
        setPhotos(next);
    };
    const submit = async ()=>{
        if (busy) return;
        setErr("");
        if (reason.trim().length < 10 || reason.trim().length > 500) {
            setErr("دلیل مرجوعی باید بین ۱۰ تا ۵۰۰ حرف باشه.");
            return;
        }
        setBusy(true);
        try {
            const orderId = o.id.replace(/^o-/, ""); // bootstrap maps ids as "o-<cuid>"
            let res;
            if (photos.length > 0) {
                const fd = new FormData();
                fd.append("reason", reason.trim());
                for (const f of photos)fd.append("photos", f);
                res = await fetch(`/api/orders/${orderId}/refund`, {
                    method: "POST",
                    body: fd
                });
            } else {
                res = await fetch(`/api/orders/${orderId}/refund`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        reason: reason.trim()
                    })
                });
            }
            if (res.status === 201) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"].setState((st)=>({
                        orders: st.orders.map((x)=>x.id === o.id ? {
                                ...x,
                                status2: "refund_requested"
                            } : x)
                    }));
                void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$sync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pullOrders"])(); // best-effort confirm against the server board
                toast({
                    title: "درخواست مرجوعی ثبت شد ✓",
                    description: "بررسی تا ۴۸ ساعت — نتیجه همین‌جا می‌افته."
                });
                return;
            }
            const b = await res.json().catch(()=>({}));
            if (res.status === 409) setErr("این سفارش الان قابل مرجوع نیست؛ با پشتیبانی در تماس باش.");
            else if (res.status === 429) setErr("برای این سفارش زیاد درخواست زدی؛ فردا دوباره تلاش کن.");
            else if (res.status === 403) setErr("این سفارش به حسابت وصل نیست.");
            else if (res.status === 400 && b.error === "file_too_large") setErr("حجم عکس بیش از حد مجازه (۵ مگابایت).");
            else if (res.status === 400 && b.error === "bad_file_type") setErr("عکس‌ها باید JPG، PNG یا WebP باشن.");
            else setErr("ثبت نشد — دلیل و عکس‌ها رو چک کن و دوباره تلاش کن.");
        } catch  {
            setErr("اینترنت در دسترس نیست؛ کمی بعد دوباره امتحان کن.");
        } finally{
            setBusy(false);
        }
    };
    if (chip) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: desktop ? "pt-1" : "mt-3 border-t border-[#EDF6FA] pt-3",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-block rounded-[10px] px-2.5 py-1 text-[12px] font-extrabold",
                style: {
                    background: chip.bg
                },
                children: chip.label
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 154,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/shop/screens/dashboards.tsx",
            lineNumber: 153,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: (e)=>e.stopPropagation(),
        onKeyDown: (e)=>e.stopPropagation(),
        className: desktop ? "w-full pt-2" : "mt-3 border-t border-[#EDF6FA] pt-3",
        children: !open ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: ()=>setOpen(true),
            className: `flex items-center gap-1.5 rounded-full bg-[#FFE9F0] font-extrabold text-[#B02A52] transition-transform active:scale-95 ${desktop ? "h-9 px-3.5 text-[12px]" : "h-10 w-full justify-center text-[13px]"}`,
            children: "درخواست مرجوعی (آسیب فیزیکی)"
        }, void 0, false, {
            fileName: "[project]/src/components/shop/screens/dashboards.tsx",
            lineNumber: 168,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `flex flex-col gap-3 rounded-[18px] bg-[#FFF7FA] ${desktop ? "w-full p-4" : "p-3.5"}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[12.5px] font-bold leading-[1.9] text-[#B02A52]",
                    children: "فقط برای آسیب فیزیکی جعبه یا عروسک. بررسی تا ۴۸ ساعت — اگه تأیید بشه، وجه به کارت مبدأ برمی‌گرده."
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                    lineNumber: 179,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "flex flex-col gap-1.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[12.5px] font-extrabold text-[#04202E]",
                            children: "چی شده؟ (بین ۱۰ تا ۵۰۰ حرف)"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                            lineNumber: 183,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            value: reason,
                            onChange: (e)=>setReason(e.target.value.slice(0, 500)),
                            rows: 3,
                            placeholder: "مثلاً: جعبه لهیده رسیده و گوش عروسک پاره شده…",
                            className: "w-full resize-y rounded-[14px] border-[1.5px] border-[#F0B7C9] bg-white px-3.5 py-2.5 text-[13px] font-semibold text-[#04202E] outline-none focus:border-[#B02A52]"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                            lineNumber: 184,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex items-center justify-between gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `text-[11.5px] font-bold ${tooShort ? "text-[#F0426B]" : "text-[#8FA8B5]"}`,
                                    children: tooShort ? "چند حرف بیشتر بنویس (حداقل ۱۰)" : "اختیاری: تا ۳ عکس از آسیب"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                    lineNumber: 192,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[11.5px] font-extrabold text-[#4A6572]",
                                    dir: "ltr",
                                    children: [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(reason.trim().length),
                                        " / ",
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(500)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                    lineNumber: 195,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                            lineNumber: 191,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                    lineNumber: 182,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "file",
                    multiple: true,
                    accept: "image/jpeg,image/png,image/webp",
                    onChange: (e)=>addPhotos(e.target.files),
                    "aria-label": "عکس‌های آسیب (حداکثر ۳ عکس، هرکدام تا ۵ مگابایت)",
                    className: "w-full cursor-pointer rounded-[14px] border-[1.5px] border-dashed border-[#F0B7C9] bg-white px-3 py-2 text-[12px] font-semibold text-[#4A6572] file:mr-3 file:rounded-full file:border-0 file:bg-[#FFE9F0] file:px-3 file:py-1 file:text-[11.5px] file:font-extrabold file:text-[#B02A52]"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                    lineNumber: 200,
                    columnNumber: 11
                }, this),
                photoErr && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[12px] font-bold text-[#F0426B]",
                    children: photoErr
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                    lineNumber: 208,
                    columnNumber: 24
                }, this),
                photos.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[12px] font-bold text-[#2E7D53]",
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(photos.length),
                        " عکس انتخاب شد"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                    lineNumber: 210,
                    columnNumber: 13
                }, this),
                err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[12.5px] font-bold text-[#B02A52]",
                    children: err
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                    lineNumber: 212,
                    columnNumber: 19
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>void submit(),
                            disabled: busy,
                            className: "flex h-10 flex-1 items-center justify-center rounded-full bg-[#B02A52] px-4 text-[13px] font-extrabold text-white transition-transform active:scale-95 disabled:opacity-60",
                            children: busy ? "در حال ارسال…" : "ثبت درخواست مرجوعی"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                            lineNumber: 214,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setOpen(false),
                            disabled: busy,
                            className: "flex h-10 items-center rounded-full border-[1.5px] border-[#E2C6CF] bg-white px-4 text-[13px] font-extrabold text-[#4A6572]",
                            children: "بی‌خیال"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                            lineNumber: 222,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                    lineNumber: 213,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/shop/screens/dashboards.tsx",
            lineNumber: 178,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
        lineNumber: 162,
        columnNumber: 5
    }, this);
}
function useHold(o) {
    const pendingOrder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.pendingOrder);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            expiresAt: o ? o.paymentHoldUntil ?? (pendingOrder?.code === o.code ? pendingOrder?.expiresAt : undefined) : undefined,
            key: o ? o.paymentKey || (pendingOrder?.code === o.code ? pendingOrder?.key : "") || "" : "",
            method: o ? o.paymentMethod ?? (pendingOrder?.code === o.code ? pendingOrder?.method : undefined) ?? "manual_transfer" : "manual_transfer"
        }), [
        o?.code,
        o?.paymentHoldUntil,
        o?.paymentKey,
        o?.paymentMethod,
        pendingOrder
    ]);
}
function PaymentBlock({ o, desktop = false }) {
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const hold = useHold(o);
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    if (!o.v2 || o.dir !== "sent") return null;
    /* awaiting_payment — the customer still owes money for THIS gift */ if (o.status2 === "awaiting_payment") {
        const canManual = hold.method === "manual_transfer" && Boolean(hold.key && o.code);
        const recheckZarinpal = async ()=>{
            if (busy || !o.code || !hold.key) return;
            setBusy(true);
            try {
                const res = await fetch("/api/payment/zarinpal/recheck", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        code: o.code,
                        key: hold.key
                    })
                });
                const body = await res.json().catch(()=>({}));
                if (body.paid) {
                    toast({
                        title: "پرداخت تأیید شد ✓",
                        description: "هدیه‌ت وارد صف بسته‌بندی شد."
                    });
                    void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$sync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pullOrders"])();
                    return;
                }
                if (body.retryUrl) {
                    window.location.href = body.retryUrl; // callback → 302 → #/success?code=…
                    return;
                }
                toast({
                    title: "پرداختی ثبت نشده",
                    description: "می‌تونی دوباره درگاه رو امتحان کنی."
                });
            } catch  {
                toast({
                    title: "سرور در دسترس نیست",
                    description: "کمی بعد دوباره تلاش کن."
                });
            } finally{
                setBusy(false);
            }
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            onClick: (e)=>e.stopPropagation(),
            onKeyDown: (e)=>e.stopPropagation(),
            className: desktop ? "w-full pt-2" : "mt-3 border-t border-[#EDF6FA] pt-3",
            children: [
                canManual && !open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>setOpen(true),
                    className: `flex items-center justify-center gap-1.5 rounded-full bg-[#FFF3C9] font-extrabold text-[#7A5C00] transition-transform active:scale-95 ${desktop ? "h-9 px-3.5 text-[12px]" : "h-10 w-full text-[13px]"}`,
                    children: [
                        "نمایش شماره کارت و آپلود رسید",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ForwardIcon"], {
                            size: 15,
                            stroke: "#7A5C00"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                            lineNumber: 323,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                    lineNumber: 315,
                    columnNumber: 11
                }, this),
                canManual && open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$manual$2d$payment$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ManualPaymentPanel"], {
                    code: o.code ?? "",
                    idempotencyKey: hold.key,
                    total: o.total,
                    expiresAt: hold.expiresAt,
                    onUploaded: ()=>void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$sync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pullOrders"])()
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                    lineNumber: 327,
                    columnNumber: 11
                }, this),
                hold.method === "zarinpal" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>void recheckZarinpal(),
                    disabled: busy,
                    className: `flex items-center justify-center gap-1.5 rounded-full bg-[#E3F6FD] font-extrabold text-[#006387] transition-transform active:scale-95 disabled:opacity-60 ${desktop ? "h-9 px-3.5 text-[12px]" : "h-10 w-full text-[13px]"}`,
                    children: [
                        busy ? "در حال بررسی…" : "ادامه‌ی پرداخت (درگاه)",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ForwardIcon"], {
                            size: 15,
                            stroke: "#006387"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                            lineNumber: 345,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                    lineNumber: 336,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/shop/screens/dashboards.tsx",
            lineNumber: 309,
            columnNumber: 7
        }, this);
    }
    /* payment_under_review — receipt received, owner hasn't confirmed yet */ if (o.status2 === "payment_under_review") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: desktop ? "pt-2" : "mt-3 border-t border-[#EDF6FA] pt-3",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[12px] font-bold leading-[1.85] text-[#7A5C00]",
                children: "رسیدت ثبت شده ✓ تا ۱۲ ساعت بررسی می‌شه و نتیجه رو پیامک می‌کنیم."
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 356,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/shop/screens/dashboards.tsx",
            lineNumber: 355,
            columnNumber: 7
        }, this);
    }
    /* dead orders — nothing left but a fresh gift */ if (o.status2 === "expired" || o.status2 === "cancelled" || o.status2 === "failed") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            onClick: (e)=>e.stopPropagation(),
            onKeyDown: (e)=>e.stopPropagation(),
            className: desktop ? "pt-2" : "mt-3 border-t border-[#EDF6FA] pt-3",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navigate"])("pick"),
                className: `flex items-center justify-center gap-1.5 rounded-full bg-[#F2F7F9] font-extrabold text-[#4A6572] transition-transform active:scale-95 ${desktop ? "h-9 px-3.5 text-[12px]" : "h-10 w-full text-[13px]"}`,
                children: [
                    "ساختن هدیه‌ی تازه",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ForwardIcon"], {
                        size: 15,
                        stroke: "#4A6572"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 379,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 371,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/shop/screens/dashboards.tsx",
            lineNumber: 366,
            columnNumber: 7
        }, this);
    }
    return null;
}
function displayStatus(o) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2f$order$2d$view$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["orderChip"])(o);
}
function sentExtra(o) {
    const parts = [];
    if (o.anonymous) parts.push("ناشناس");
    if (o.hearts > 0) parts.push(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(o.hearts)} قلب`);
    if (o.paws > 0) parts.push(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(o.paws)} پنجه`);
    return parts.length ? parts.join(" · ") : "بدون آپشن";
}
function recvExtra(o) {
    return o.opened ? "کارت باز شده" : "کارت رمزدار";
}
function orderWho(o) {
    return o.dir === "sent" ? `برای ${o.to}` : `از ${o.senderName || "یه دوست ناشناس"}`;
}
function orderExtra(o) {
    return o.dir === "sent" ? sentExtra(o) : recvExtra(o);
}
function toEnDigits(s) {
    return s.replace(/[۰-۹]/g, (d)=>String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
}
// padded placeholders from design FILE 14 script (keeps layout full)
const CHARITY_RECEIPTS = [
    {
        bg: "#D6F1FB",
        name: "ارسال هدیه به خیریه‌ی همت",
        meta: "۵ آبان · ۱۲ هدیه",
        tag: "رسید و عکس تحویل"
    },
    {
        bg: "#FFE9F0",
        name: "ارسال هدیه به پناهگاه حیوونا",
        meta: "۲۱ آبان · ۱۵ هدیه",
        tag: "رسید و عکس تحویل"
    },
    {
        bg: "#FFF3C9",
        name: "ارسال هدیه به خیریه‌ی نیکوکاری رأفت",
        meta: "۹ آذر · ۱۸ هدیه",
        tag: "رسید و عکس تحویل"
    }
];
function buildReceipts(sent) {
    const mine = sent.map((o)=>({
            bg: "#DDF3EA",
            name: `ارسال هدیه برای ${o.to}`,
            meta: `${o.date} · هدیه‌ی ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(o.no)} · ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(o.hearts + o.paws)} قلب و پنجه`,
            tag: "سهم تو",
            mine: true
        }));
    const rows = [
        ...mine
    ];
    for (const r of CHARITY_RECEIPTS){
        if (rows.length >= 3) break;
        rows.push(r);
    }
    return rows;
}
const IMPACT_STEPS = [
    {
        n: "۱",
        bg: "#FFE9F0",
        text: "پولِ قلب‌ها و پنجه‌ها جدا از فروش جعبه‌ها نگه داشته می‌شه."
    },
    {
        n: "۲",
        bg: "#D6F1FB",
        text: "با پول جمع‌شده هدیه می‌خریم و خودمون به خیریه می‌رسونیم."
    },
    {
        n: "۳",
        bg: "#FFF3C9",
        text: "رسید، عکس و تأییدیه‌ی تحویل رو همین‌جا برات می‌ذاریم."
    }
];
function useBadges() {
    const orders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.orders);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const sent = orders.filter((o)=>o.dir === "sent");
        const recv = orders.filter((o)=>o.dir === "recv");
        const hearts = sent.reduce((a, o)=>a + o.hearts, 0);
        const paws = sent.reduce((a, o)=>a + o.paws, 0);
        return [
            {
                key: "first",
                done: sent.length >= 1,
                bg: "#CDEFFB",
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GiftBoxIcon"], {
                    size: 17,
                    className: "text-[#00779F]"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                    lineNumber: 474,
                    columnNumber: 68
                }, this),
                label: "اولین قدم",
                hint: "اولین هدیه‌ات رو بفرست"
            },
            {
                key: "hearts",
                done: hearts >= 5,
                bg: "#FFE9F0",
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeartIcon"], {
                    size: 16,
                    className: "text-[#F0426B]"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                    lineNumber: 475,
                    columnNumber: 64
                }, this),
                label: "قلب‌بارون",
                hint: "۵ قلب یا بیشتر بفرست"
            },
            {
                key: "paws",
                done: paws >= 3,
                bg: "#FFF3C9",
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PawIcon"], {
                    size: 16
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                    lineNumber: 476,
                    columnNumber: 60
                }, this),
                label: "پنجه‌ی مهربون",
                hint: "۳ پنجه یا بیشتر بفرست"
            },
            {
                key: "anon",
                done: sent.some((o)=>o.anonymous),
                bg: "#E7E0FA",
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MailIcon"], {
                    size: 16,
                    className: "text-[#00779F]"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                    lineNumber: 477,
                    columnNumber: 80
                }, this),
                label: "ناشناسِ خوش‌نیت",
                hint: "یه هدیه‌ی ناشناس بفرست"
            },
            {
                key: "recv",
                done: recv.length >= 1,
                bg: "#DDF3EA",
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeartSticker"], {
                    size: 20
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                    lineNumber: 478,
                    columnNumber: 67
                }, this),
                label: "بغل‌گیرنده",
                hint: "یه هدیه دریافت کن"
            }
        ];
    }, [
        orders
    ]);
}
/* ── small building blocks ── */ /** Refresh icon (shared by sync buttons). */ function RefreshIcon({ size = 15, spin = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2.4",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        className: spin ? "animate-spin" : "",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M21 12a9 9 0 1 1-2.64-6.36"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 500,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M21 3v6h-6"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 501,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
        lineNumber: 488,
        columnNumber: 5
    }, this);
}
/**
 * Manual «همگام‌سازی» — re-pulls the server board (+ account-bound orders when
 * logged in) and toasts an honest result. Used on my-gifts (mobile + desktop).
 */ function SyncButton({ desktop = false }) {
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.user);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const sync = ()=>{
        if (busy) return;
        setBusy(true);
        void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$sync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syncStatus"])(user?.phone).then(({ ok, changed })=>{
            setBusy(false);
            if (!ok) {
                toast({
                    title: "سرور در دسترس نیست",
                    description: "فعلاً با داده‌های همین گوشی کار می‌کنیم."
                });
            } else if (changed > 0) {
                toast({
                    title: "همگام شد ✓",
                    description: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(changed)} به‌روزرسانی از سرور اومد.`
                });
            } else {
                toast({
                    title: "همه‌چیز به‌روزه ✓"
                });
            }
        });
    };
    if (desktop) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: sync,
            disabled: busy,
            "aria-label": "همگام‌سازی هدیه‌ها با سرور",
            className: "flex h-[50px] items-center gap-2 rounded-full border-2 border-[#04202E] bg-white px-[22px] text-[15px] font-extrabold text-[#04202E] transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RefreshIcon, {
                    size: 16,
                    spin: busy
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                    lineNumber: 539,
                    columnNumber: 9
                }, this),
                busy ? "در حال همگام…" : "همگام‌سازی"
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/shop/screens/dashboards.tsx",
            lineNumber: 532,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: sync,
        disabled: busy,
        "aria-label": "همگام‌سازی هدیه‌ها با سرور",
        className: "flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#D3E8F0] bg-white text-[#04202E] transition-transform active:scale-90 disabled:opacity-60",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RefreshIcon, {
            size: 16,
            spin: busy
        }, void 0, false, {
            fileName: "[project]/src/components/shop/screens/dashboards.tsx",
            lineNumber: 552,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
        lineNumber: 545,
        columnNumber: 5
    }, this);
}
/** «داده‌ی زنده» pulse chip for the impact page. */ function LiveChip() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-flex items-center gap-1.5 rounded-full border border-[#CDEFFB] bg-white px-3 py-1 text-[11.5px] font-extrabold text-[#00779F]",
        title: "مدارک از سرور همگام می‌شن",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "relative flex h-2 w-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ABE7] opacity-60"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 565,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "relative inline-flex h-2 w-2 rounded-full bg-[#00ABE7]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 566,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 564,
                columnNumber: 7
            }, this),
            "داده‌ی زنده"
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
        lineNumber: 560,
        columnNumber: 5
    }, this);
}
function DocIcon({ size = 26 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "#04202E",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M7 3h7l4 4v14H7z"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 576,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M14 3v4h4M10 12h5M10 16h5"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 577,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
        lineNumber: 575,
        columnNumber: 5
    }, this);
}
function TabsPill({ tab, onChange, className = "", height = 42, fontSize = "14.5px", sentAlert = 0 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex gap-1.5 rounded-[22px] bg-[#E3F0F5] p-[5px] ${className}`,
        children: [
            "sent",
            "recv"
        ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-pressed": tab === t,
                onClick: ()=>onChange(t),
                className: "flex flex-1 items-center justify-center gap-1.5 rounded-[17px] font-extrabold text-[#04202E] transition-colors",
                style: {
                    height,
                    fontSize,
                    background: tab === t ? "#fff" : "transparent"
                },
                children: [
                    t === "sent" ? "فرستاده‌ها" : "دریافتی‌ها",
                    t === "sent" && sentAlert > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        title: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(sentAlert)} سفارش منتظر پرداخته`,
                        className: "flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-[#F0426B] px-1 text-[10.5px] font-black leading-none text-white",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(sentAlert)
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 611,
                        columnNumber: 13
                    }, this)
                ]
            }, t, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 601,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
        lineNumber: 599,
        columnNumber: 5
    }, this);
}
function CharmChips({ hearts, paws, anonymous, className = "" }) {
    if (hearts + paws + anonymous === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex flex-wrap gap-2 ${className}`,
        children: [
            hearts > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex items-center gap-1.5 rounded-full border border-[#F7C5D3] bg-[#FFE9F0] px-3 py-1.5 text-[12px] font-extrabold text-[#04202E]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeartIcon"], {
                        size: 14,
                        className: "text-[#F0426B]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 640,
                        columnNumber: 11
                    }, this),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(hearts),
                    " قلب"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 639,
                columnNumber: 9
            }, this),
            paws > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex items-center gap-1.5 rounded-full border border-[#BFE5D3] bg-[#DDF3EA] px-3 py-1.5 text-[12px] font-extrabold text-[#04202E]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PawIcon"], {
                        size: 14
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 646,
                        columnNumber: 11
                    }, this),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(paws),
                    " پنجه"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 645,
                columnNumber: 9
            }, this),
            anonymous > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex items-center gap-1.5 rounded-full border border-[#DDEEF5] bg-white px-3 py-1.5 text-[12px] font-extrabold text-[#04202E]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MailIcon"], {
                        size: 14,
                        className: "text-[#00779F]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 652,
                        columnNumber: 11
                    }, this),
                    "ناشناس × ",
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(anonymous)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 651,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
        lineNumber: 637,
        columnNumber: 5
    }, this);
}
function PlushThumb({ o, size, box }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex shrink-0 items-center justify-center",
        style: {
            width: box,
            height: box,
            borderRadius: box >= 88 ? 22 : 18,
            background: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLUSH_MAP"][o.kind].bg
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Plush"], {
            kind: o.kind,
            size: size
        }, void 0, false, {
            fileName: "[project]/src/components/shop/screens/dashboards.tsx",
            lineNumber: 666,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
        lineNumber: 662,
        columnNumber: 5
    }, this);
}
function EmptyPanel({ tab, desktop = false }) {
    const isSent = tab === "sent";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex flex-col items-center gap-4 rounded-[28px] border-2 border-dashed border-[#99D6EE] bg-white/60 text-center ${desktop ? "w-full px-8 py-14" : "px-6 py-10"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Plush"], {
                kind: isSent ? "duck" : "bunny",
                size: desktop ? 150 : 110
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 679,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `${desktop ? "text-[20px]" : "text-[17px]"} font-black`,
                        children: isSent ? "هنوز هیچ هدیه‌ای نفرستادی" : "هنوز هدیه‌ای دریافت نکردی"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 681,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `${desktop ? "text-[14.5px]" : "text-[13px]"} max-w-[420px] font-medium leading-[1.9] text-[#4A6572]`,
                        children: isSent ? "اولین بغل پشمالوت رو برای یه دوست بساز؛ هر هدیه یه شماره‌ی مخصوص خودش رو می‌گیره و همین‌جا می‌مونه." : "وقتی یکی برات هدیه بفرسته، کارت و پیامش همین‌جا می‌افته. کد PN و رمز کارت رو برات پیامک می‌کنن؛ با همون از صفحه‌ی رهگیری کارت رو باز کن."
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 684,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 680,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navigate"])("pick"),
                className: `flex items-center justify-center rounded-full bg-[#00ABE7] font-extrabold text-[#04202E] transition-transform hover:scale-[1.03] active:scale-95 ${desktop ? "h-[50px] px-7 text-[15px]" : "h-12 px-6 text-[14.5px]"}`,
                children: "بساز و بفرست"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 690,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
        lineNumber: 674,
        columnNumber: 5
    }, this);
}
function ReceiptCard({ r, desktop = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex items-center gap-4 rounded-[26px] border border-[#DDEEF5] bg-white ${desktop ? "px-5 py-[18px]" : "p-4"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex shrink-0 items-center justify-center rounded-[14px] border-2 border-[#04202E] ${desktop ? "h-[68px] w-[60px]" : "h-16 w-14"}`,
                style: {
                    background: r.bg
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DocIcon, {}, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                    lineNumber: 710,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 706,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex min-w-0 flex-1 flex-col gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `${desktop ? "text-[16px]" : "text-[15.5px]"} font-extrabold`,
                        children: r.name
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 713,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `${desktop ? "text-[13px]" : "text-[12.5px]"} font-medium text-[#4A6572]`,
                        children: r.meta
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 714,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "self-start rounded-[10px] px-2.5 py-1 text-[12px] font-bold",
                        style: {
                            background: r.mine ? "#FFE9F0" : "#D6F1FB"
                        },
                        children: r.tag
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 715,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 712,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ForwardIcon"], {
                size: desktop ? 22 : 20,
                stroke: "#5B7482"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 719,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
        lineNumber: 705,
        columnNumber: 5
    }, this);
}
function NextDeliveryBox({ desktop = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex items-center gap-4 rounded-[26px] border-2 border-dashed border-[#99D6EE] ${desktop ? "px-5 py-5" : "px-4 py-[18px]"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#E3F6FD]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GiftBoxIcon"], {
                    size: 26,
                    className: "text-[#006387]"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                    lineNumber: 728,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 727,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `${desktop ? "text-[16px]" : "text-[15px]"} font-extrabold`,
                        children: "ارسال بعدی"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 731,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `${desktop ? "text-[13.5px]" : "text-[12.5px]"} font-medium leading-[1.8] text-[#4A6572]`,
                        children: "وقتی بسته‌ی جاری کامل شد، مدرکش همین‌جا اضافه می‌شه."
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 732,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 730,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
        lineNumber: 726,
        columnNumber: 5
    }, this);
}
function StepRow({ s, desktop = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex items-center gap-4 border border-[#DDEEF5] bg-white ${desktop ? "rounded-[24px] px-5 py-[18px]" : "rounded-[22px] px-4 py-[14px]"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `flex shrink-0 items-center justify-center rounded-full border-2 border-[#04202E] font-black ${desktop ? "h-[42px] w-[42px] text-[17px]" : "h-[38px] w-[38px] text-[16px]"}`,
                style: {
                    background: s.bg
                },
                children: s.n
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 743,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `${desktop ? "text-[15px] leading-[1.9]" : "text-[14px] leading-[1.85]"} font-semibold text-[#1F3E4D]`,
                children: s.text
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 749,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
        lineNumber: 742,
        columnNumber: 5
    }, this);
}
function CharityProgressCard({ done, pct, desktop = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: desktop ? "flex min-w-0 flex-[1_1_460px] max-w-[560px] flex-col gap-4 rounded-[32px] bg-[#04202E] p-[30px] text-white" : "mx-5 mt-3.5 flex flex-col gap-3 rounded-[30px] bg-[#04202E] p-[22px] text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-baseline justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `${desktop ? "text-[16px] font-extrabold" : "text-[14px] font-bold"} text-[#BFE9F8]`,
                        children: "اولین بسته‌ی خیریه"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 764,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `${desktop ? "text-[13px] font-bold" : "text-[12.5px] font-semibold"} text-[#BFE9F8]`,
                        children: "در حال جمع شدن"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 765,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 763,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-baseline gap-2.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `${desktop ? "text-[56px]" : "text-[52px]"} font-black leading-[1.1] text-[#00ABE7]`,
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(done)
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 768,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `${desktop ? "text-[19px]" : "text-[18px]"} font-bold`,
                        children: [
                            "از ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CHARITY_TARGET"]),
                            " هدیه"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 769,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 767,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `overflow-hidden bg-[#0E3C52] ${desktop ? "h-4 rounded-[8px]" : "h-[14px] rounded-[7px]"}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `h-full bg-[#00ABE7] transition-[width] duration-700 ease-out ${desktop ? "rounded-[8px]" : "rounded-[7px]"}`,
                    style: {
                        width: `${pct}%`
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                    lineNumber: 772,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 771,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `${desktop ? "text-[13.5px]" : "text-[13px]"} font-medium leading-[1.9] text-[#D3EEF9]`,
                children: desktop ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(pct)}٪ کامل شده. وقتی به ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CHARITY_TARGET"])} تا برسیم، هدیه‌ها رو می‌خریم و می‌فرستیم؛ رسید و عکس تحویلش رو همین‌جا می‌بینی.` : `وقتی به ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CHARITY_TARGET"])} تا برسیم، هدیه‌ها رو می‌خریم و می‌فرستیم. بعدش رسید و عکس تحویلش رو همین پایین می‌بینی.`
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 777,
                columnNumber: 7
            }, this),
            !desktop && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navigate"])("extras"),
                className: "flex h-11 items-center gap-1.5 self-start rounded-full bg-[#00ABE7] px-5 text-[14.5px] font-extrabold text-[#04202E] transition-transform active:scale-95",
                children: "تو هم قلب اضافه کن"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 783,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
        lineNumber: 756,
        columnNumber: 5
    }, this);
}
function BadgesRow({ className = "" }) {
    const badges = useBadges();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex flex-wrap gap-2 ${className}`,
        children: badges.map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                title: b.hint,
                className: "flex items-center gap-2 rounded-full border py-1.5 pe-3.5 ps-1.5 transition-all",
                style: {
                    background: b.done ? b.bg : "#F2F7F9",
                    borderColor: b.done ? "#D3E8F0" : "#E2EEF3",
                    opacity: b.done ? 1 : 0.6
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#04202E] bg-white",
                        children: b.icon
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 810,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[13px] font-extrabold text-[#04202E]",
                        children: b.label
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 811,
                        columnNumber: 11
                    }, this),
                    !b.done && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[11px] font-bold text-[#4A6572]",
                        children: "قفل"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 812,
                        columnNumber: 23
                    }, this)
                ]
            }, b.key, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 800,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
        lineNumber: 798,
        columnNumber: 5
    }, this);
}
/* ═══════════════ 1 · MOBILE MY GIFTS (02-هدیه‌هام) ═══════════════ */ function MobileOrderCard({ o }) {
    const advanceStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.advanceStatus);
    const selectOrder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.selectOrder);
    const hold = useHold(o);
    const st = displayStatus(o);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "button",
        tabIndex: 0,
        "aria-label": `رهگیری هدیه ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(o.no)}`,
        onClick: ()=>{
            selectOrder(o.id);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navigate"])("track");
        },
        onKeyDown: (e)=>{
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                selectOrder(o.id);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navigate"])("track");
            }
        },
        className: "cursor-pointer rounded-[24px] border border-[#DDEEF5] bg-white p-[14px] outline-none transition-all hover:border-[#00ABE7] hover:shadow-[0_6px_18px_rgba(4,32,46,0.06)] focus-visible:ring-2 focus-visible:ring-[#00ABE7]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-[14px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PlushThumb, {
                        o: o,
                        size: 54,
                        box: 64
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 845,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex min-w-0 flex-1 flex-col gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "truncate text-[15.5px] font-extrabold",
                                        children: orderWho(o)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 848,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "shrink-0 rounded-[12px] bg-[#04202E] px-2.5 py-[3px] text-[12px] font-extrabold text-white",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(o.no)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 849,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 847,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[12.5px] font-medium text-[#4A6572]",
                                children: [
                                    o.date,
                                    " · ",
                                    orderExtra(o)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 851,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex flex-wrap items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "self-start rounded-[10px] px-2.5 py-1 text-[12px] font-bold",
                                        style: {
                                            background: st.bg,
                                            color: st.fg ?? undefined
                                        },
                                        children: st.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 855,
                                        columnNumber: 13
                                    }, this),
                                    o.v2 && o.status2 === "awaiting_payment" && hold.expiresAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$manual$2d$payment$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CountdownBadge"], {
                                        expiresAt: hold.expiresAt
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 859,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 854,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 846,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 844,
                columnNumber: 7
            }, this),
            o.dir === "recv" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex border-t border-[#EDF6FA] pt-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: (e)=>{
                        e.stopPropagation();
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navigate"])("gift");
                    },
                    className: "flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-[#E3F6FD] text-[13px] font-extrabold text-[#006387] transition-transform active:scale-95",
                    children: [
                        "مشاهده‌ی پیام",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ForwardIcon"], {
                            size: 16,
                            stroke: "#006387"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                            lineNumber: 876,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                    lineNumber: 867,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 866,
                columnNumber: 9
            }, this),
            o.dir === "sent" && o.status !== "delivered" && !o.v2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex items-center gap-3 border-t border-[#EDF6FA] pt-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "shrink-0 text-[11.5px] font-semibold text-[#4A6572]",
                        children: "شبیه‌سازی مسیر"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 883,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: (e)=>{
                            e.stopPropagation();
                            advanceStatus(o.id);
                        },
                        className: "flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-[#FFF3C9] text-[13px] font-extrabold text-[#04202E] transition-transform active:scale-95",
                        children: [
                            "قدم بعدی: ",
                            NEXT_LABEL[o.status],
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ForwardIcon"], {
                                size: 16,
                                stroke: "#04202E"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 893,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 884,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 882,
                columnNumber: 9
            }, this),
            o.dir === "sent" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PaymentBlock, {
                o: o
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 898,
                columnNumber: 28
            }, this),
            o.dir === "sent" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RefundBlock, {
                o: o
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 899,
                columnNumber: 28
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
        lineNumber: 827,
        columnNumber: 5
    }, this);
}
/* ── login gate: gift data belongs to the ACCOUNT, never to a guest menu ──
 * Owner directive (۱۴۰۵/۰۸/۲۴): «هدیه‌هام» only exists after login. The server
 * side was already session-guarded (guests get [] from bootstrap); the screen
 * itself is what leaked stale localStorage rows — so it now requires a user. */ function GiftsLoginGate({ desktop = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: desktop ? "flex min-h-[64vh] flex-col items-center justify-center gap-5 px-6 text-center md:flex" : "flex min-h-[64vh] flex-col items-center justify-center gap-5 px-6 pb-10 text-center md:hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex h-20 w-20 items-center justify-center rounded-[26px] border border-[#D3E8F0] bg-white text-4xl shadow-[0_8px_22px_rgba(4,32,46,0.06)]",
                "aria-hidden": "true",
                children: "🔒"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 917,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: `m-0 font-black text-[#04202E] ${desktop ? "text-[30px]" : "text-[23px]"}`,
                children: "هدیه‌هام مال حساب کاربریه"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 920,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: `m-0 max-w-[420px] font-medium leading-[2.1] text-[#4A6572] ${desktop ? "text-[14.5px]" : "text-[13px]"}`,
                children: "برای دیدن هدیه‌هایی که فرستادی یا گرفتی، اول وارد حسابت شو؛ بعد از ورود، هدیه‌هات امن از سرور میاد."
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 921,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navigate"])("login"),
                className: "flex h-[52px] items-center gap-2 rounded-full bg-[#04202E] px-7 text-[15px] font-extrabold text-white transition-transform hover:scale-[1.03] active:scale-95",
                children: "ورود به حساب کاربری"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 924,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navigate"])("pick"),
                className: "text-[12.5px] font-bold text-[#006387] underline underline-offset-4",
                children: "حساب نداری؟ اول یه هدیه بساز — موقع ثبت سفارش می‌تونی وارد شی"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 931,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
        lineNumber: 910,
        columnNumber: 5
    }, this);
}
function MobileMyGifts() {
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.user);
    const orders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.orders);
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("sent");
    const list = orders.filter((o)=>o.dir === tab);
    const charms = list.reduce((a, o)=>a + o.hearts + o.paws, 0);
    const hearts = list.reduce((a, o)=>a + o.hearts, 0);
    const paws = list.reduce((a, o)=>a + o.paws, 0);
    const anon = list.filter((o)=>o.anonymous).length;
    const awaiting = orders.filter((o)=>o.dir === "sent" && o.v2 && o.status2 === "awaiting_payment").length;
    const doneCount = list.filter((o)=>o.status2 ? o.status2 === "delivered" : o.status === "delivered").length;
    const openedCount = list.filter((o)=>o.opened).length;
    if (!user) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GiftsLoginGate, {}, void 0, false, {
        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
        lineNumber: 955,
        columnNumber: 21
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen flex-col bg-[#F2FAFD] pb-6 md:hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-5 pb-1.5 pt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "m-0 text-[30px] font-black leading-[1.4]",
                        children: "هدیه‌هام"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 961,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SyncButton, {}, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 963,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navigate"])("pick"),
                                className: "flex h-[42px] items-center rounded-full bg-[#00ABE7] px-4 text-[14px] font-extrabold text-[#04202E] transition-transform active:scale-95",
                                children: "+ هدیه‌ی جدید"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 964,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 962,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 960,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TabsPill, {
                tab: tab,
                onChange: setTab,
                className: "mx-5 mt-2.5",
                sentAlert: awaiting
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 975,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2.5 px-5 pt-3.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-1 flex-col gap-0.5 rounded-[20px] border border-[#DDEEF5] bg-white p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[12px] font-semibold text-[#4A6572]",
                                children: "تعداد هدیه‌ها"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 980,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[22px] font-black",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(list.length)
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 981,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 979,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-1 flex-col gap-0.5 rounded-[20px] border border-[#F7C5D3] bg-[#FFE9F0] p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[12px] font-semibold text-[#4A6572]",
                                children: "قلب و پنجه‌ی تو"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 984,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[22px] font-black",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(charms)
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 985,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 983,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-1 flex-col gap-0.5 rounded-[20px] border border-[#BFE5D3] bg-[#DDF3EA] p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[12px] font-semibold text-[#4A6572]",
                                children: tab === "sent" ? "تحویل‌شده" : "پیام بازشده"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 988,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[22px] font-black",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(tab === "sent" ? doneCount : openedCount)
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 989,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 987,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 978,
                columnNumber: 7
            }, this),
            list.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CharmChips, {
                hearts: hearts,
                paws: paws,
                anonymous: anon,
                className: "px-5 pt-3"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 994,
                columnNumber: 27
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3 px-5 pt-3.5",
                children: list.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyPanel, {
                    tab: tab
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                    lineNumber: 998,
                    columnNumber: 30
                }, this) : list.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileOrderCard, {
                        o: o
                    }, o.id, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 998,
                        columnNumber: 73
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 997,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$fav$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FavoritesStrip"], {}, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1002,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-5 mt-4 flex items-center gap-3 rounded-[24px] border-2 border-dashed border-[#99D6EE] p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeartSticker"], {
                        size: 26,
                        fill: "#F0426B",
                        stroke: "#04202E",
                        strokeWidth: 2.4
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1006,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[13px] font-semibold leading-[1.9] text-[#1F3E4D]",
                        children: "برای هر هدیه‌ای که می‌فرستی، یه شماره‌ی تازه می‌گیری. هدیه‌هات همیشه همین‌جا می‌مونن."
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1007,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1005,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
        lineNumber: 958,
        columnNumber: 5
    }, this);
}
/* ═══════════════ 2 · DESKTOP MY GIFTS (16-هدیه‌هام) ═══════════════ */ function DesktopOrderCard({ o }) {
    const advanceStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.advanceStatus);
    const selectOrder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.selectOrder);
    const hold = useHold(o);
    const st = displayStatus(o);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "button",
        tabIndex: 0,
        "aria-label": `رهگیری هدیه ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(o.no)}`,
        onClick: ()=>{
            selectOrder(o.id);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navigate"])("track");
        },
        onKeyDown: (e)=>{
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                selectOrder(o.id);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navigate"])("track");
            }
        },
        className: "flex min-w-0 flex-[1_1_340px] max-w-[400px] cursor-pointer items-center gap-[18px] rounded-[28px] border border-[#DDEEF5] bg-white p-5 outline-none transition-all hover:border-[#00ABE7] hover:shadow-[0_10px_26px_rgba(4,32,46,0.08)] focus-visible:ring-2 focus-visible:ring-[#00ABE7]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PlushThumb, {
                o: o,
                size: 66,
                box: 88
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1040,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex min-w-0 flex-1 flex-col gap-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "truncate text-[16px] font-extrabold",
                                children: orderWho(o)
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1043,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "shrink-0 rounded-[12px] bg-[#04202E] px-2.5 py-[3px] text-[12.5px] font-extrabold text-white",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(o.no)
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1044,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1042,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[13px] font-medium text-[#4A6572]",
                        children: [
                            o.date,
                            " · ",
                            orderExtra(o)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1046,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-[10px] px-2.5 py-1 text-[12.5px] font-bold",
                                style: {
                                    background: st.bg,
                                    color: st.fg ?? undefined
                                },
                                children: st.label
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1050,
                                columnNumber: 11
                            }, this),
                            o.v2 && o.status2 === "awaiting_payment" && hold.expiresAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$manual$2d$payment$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CountdownBadge"], {
                                expiresAt: hold.expiresAt
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1053,
                                columnNumber: 74
                            }, this),
                            o.dir === "sent" && o.status !== "delivered" && !o.v2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    advanceStatus(o.id);
                                },
                                title: "شبیه‌سازی مسیر ارسال",
                                className: "rounded-[10px] bg-[#F2F7F9] px-2.5 py-1 text-[11.5px] font-extrabold text-[#006387] transition-colors hover:bg-[#E3F6FD]",
                                children: [
                                    "قدم بعدی: ",
                                    NEXT_LABEL[o.status]
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1055,
                                columnNumber: 13
                            }, this),
                            o.dir === "recv" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navigate"])("gift");
                                },
                                className: "rounded-[10px] bg-[#E3F6FD] px-2.5 py-1 text-[11.5px] font-extrabold text-[#006387] transition-colors hover:bg-[#CDEFFB]",
                                children: "مشاهده‌ی پیام"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1068,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    selectOrder(o.id);
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navigate"])("track");
                                },
                                className: "ms-auto rounded-[10px] px-2.5 py-1 text-[11.5px] font-extrabold text-[#00779F] transition-colors hover:bg-[#E3F6FD]",
                                children: "رهگیری ›"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1079,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1049,
                        columnNumber: 9
                    }, this),
                    o.dir === "sent" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PaymentBlock, {
                        o: o,
                        desktop: true
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1091,
                        columnNumber: 30
                    }, this),
                    o.dir === "sent" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RefundBlock, {
                        o: o,
                        desktop: true
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1092,
                        columnNumber: 30
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1041,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
        lineNumber: 1023,
        columnNumber: 5
    }, this);
}
function DesktopMyGifts() {
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.user);
    const orders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.orders);
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("sent");
    const list = orders.filter((o)=>o.dir === tab);
    const charms = list.reduce((a, o)=>a + o.hearts + o.paws, 0);
    const hearts = list.reduce((a, o)=>a + o.hearts, 0);
    const paws = list.reduce((a, o)=>a + o.paws, 0);
    const anon = list.filter((o)=>o.anonymous).length;
    const awaiting = orders.filter((o)=>o.dir === "sent" && o.v2 && o.status2 === "awaiting_payment").length;
    const doneCount = list.filter((o)=>o.status2 ? o.status2 === "delivered" : o.status === "delivered").length;
    const openedCount = list.filter((o)=>o.opened).length;
    if (!user) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GiftsLoginGate, {
        desktop: true
    }, void 0, false, {
        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
        lineNumber: 1111,
        columnNumber: 21
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "hidden min-h-screen flex-col bg-[#F2FAFD] md:flex",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "mx-auto flex w-full max-w-[1200px] flex-col gap-7 px-6 pt-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "flex flex-wrap items-center justify-between gap-[18px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[14px] font-extrabold text-[#00779F]",
                                        children: "حساب تو"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1119,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "m-0 text-[44px] font-black leading-[1.35]",
                                        children: "هدیه‌هام"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1120,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1118,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SyncButton, {
                                        desktop: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1123,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navigate"])("pick"),
                                        className: "flex h-[50px] items-center rounded-full bg-[#00ABE7] px-6 text-[15px] font-extrabold text-[#04202E] transition-transform hover:scale-[1.03]",
                                        children: "+ هدیه‌ی جدید"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1124,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1122,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1117,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "flex flex-wrap items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TabsPill, {
                                tab: tab,
                                onChange: setTab,
                                className: "w-[380px] max-w-full",
                                height: 44,
                                fontSize: "15px",
                                sentAlert: awaiting
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1136,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ms-auto flex flex-wrap gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex min-w-[190px] flex-col gap-0.5 rounded-[22px] border border-[#DDEEF5] bg-white px-[18px] py-[14px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[13px] font-semibold text-[#4A6572]",
                                                children: "تعداد هدیه‌ها"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                                lineNumber: 1139,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[26px] font-black",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(list.length)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                                lineNumber: 1140,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1138,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex min-w-[190px] flex-col gap-0.5 rounded-[22px] border border-[#F7C5D3] bg-[#FFE9F0] px-[18px] py-[14px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[13px] font-semibold text-[#4A6572]",
                                                children: "قلب و پنجه‌ی تو"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                                lineNumber: 1143,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[26px] font-black",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(charms)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                                lineNumber: 1144,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1142,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex min-w-[190px] flex-col gap-0.5 rounded-[22px] border border-[#BFE5D3] bg-[#DDF3EA] px-[18px] py-[14px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[13px] font-semibold text-[#4A6572]",
                                                children: tab === "sent" ? "تحویل‌شده" : "پیام بازشده"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                                lineNumber: 1147,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[26px] font-black",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(tab === "sent" ? doneCount : openedCount)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                                lineNumber: 1148,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1146,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1137,
                                columnNumber: 11
                            }, this),
                            list.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CharmChips, {
                                hearts: hearts,
                                paws: paws,
                                anonymous: anon,
                                className: "w-full"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1151,
                                columnNumber: 31
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1135,
                        columnNumber: 9
                    }, this),
                    list.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyPanel, {
                            tab: tab,
                            desktop: true
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                            lineNumber: 1157,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1156,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "flex flex-wrap gap-[18px]",
                        children: list.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DesktopOrderCard, {
                                o: o
                            }, o.id, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1162,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1160,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$fav$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FavoritesStrip"], {
                        desktop: true
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1168,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mb-4 mt-2 flex flex-wrap items-center gap-4 rounded-[28px] border-2 border-dashed border-[#99D6EE] px-[26px] py-[22px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeartSticker"], {
                                size: 34,
                                fill: "#F0426B",
                                stroke: "#04202E",
                                strokeWidth: 2.4
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1172,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex-[1_1_420px] text-[15px] font-semibold leading-[1.9] text-[#1F3E4D]",
                                children: "برای هر هدیه‌ای که می‌فرستی، یه شماره‌ی تازه می‌گیری. هدیه‌هات همیشه همین‌جا می‌مونن."
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1173,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navigate"])("impact"),
                                className: "box-border flex h-12 items-center rounded-full border-2 border-[#04202E] px-[22px] text-[15px] font-extrabold text-[#04202E] transition-colors hover:bg-[#04202E] hover:text-white",
                                children: "برو به دفتر مهربونی"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1176,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1171,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DesktopFooter, {}, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1185,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
        lineNumber: 1114,
        columnNumber: 5
    }, this);
}
function MobileImpact() {
    const done = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCharityDone"])();
    const orders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.orders);
    const sent = orders.filter((o)=>o.dir === "sent");
    const pct = Math.min(100, Math.round(done / __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CHARITY_TARGET"] * 100));
    const receipts = buildReceipts(sent);
    // live data: receipts also reflect orders synced from the server
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$sync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pullOrders"])();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen flex-col bg-[#F2FAFD] pb-6 md:hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-5 pb-1.5 pt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-label": "برگشت",
                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navigate"])("home"),
                        className: "flex h-11 w-11 items-center justify-center rounded-full border border-[#D3E8F0] bg-white text-[#04202E]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BackIcon"], {
                            size: 22
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                            lineNumber: 1214,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1208,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeartSticker"], {
                                size: 26,
                                fill: "#F0426B",
                                stroke: "#04202E",
                                strokeWidth: 2.4
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1217,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PawIcon"], {
                                size: 26
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1218,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1216,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1207,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-5 pb-1 pt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "m-0 text-[34px] font-black leading-[1.4]",
                        children: "دفتر مهربونی"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1224,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-0 mt-2 text-[15px] font-medium leading-[1.9] text-[#1F3E4D]",
                        children: "هر قلب و پنجه‌ای که خریده می‌شه، این‌جا ثبت می‌شه. مدرک همه‌ی ارسال‌ها رو هم همین‌جا می‌ذاریم تا خودت ببینی."
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1225,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1223,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CharityProgressCard, {
                done: done,
                pct: pct
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1231,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-5 pb-2.5 pt-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[20px] font-extrabold",
                        children: "مدارک ارسال"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1235,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LiveChip, {}, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1236,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1234,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-5 flex flex-col gap-2.5",
                children: [
                    receipts.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ReceiptCard, {
                            r: r
                        }, `${r.name}-${i}`, false, {
                            fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                            lineNumber: 1240,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NextDeliveryBox, {}, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1242,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1238,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-5 pb-2.5 pt-[26px] text-[20px] font-extrabold",
                children: "چطوری شفاف می‌مونیم؟"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1246,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-5 flex flex-col gap-2.5",
                children: IMPACT_STEPS.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StepRow, {
                        s: s
                    }, s.n, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1249,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1247,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-5 pb-2.5 pt-[26px] text-[20px] font-extrabold",
                children: "نشان‌های مهربونی"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1254,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BadgesRow, {
                className: "mx-5"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1255,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
        lineNumber: 1205,
        columnNumber: 5
    }, this);
}
function DesktopImpact() {
    const done = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCharityDone"])();
    const orders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.orders);
    const sent = orders.filter((o)=>o.dir === "sent");
    const hearts = sent.reduce((a, o)=>a + o.hearts, 0);
    const paws = sent.reduce((a, o)=>a + o.paws, 0);
    const pct = Math.min(100, Math.round(done / __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CHARITY_TARGET"] * 100));
    const receipts = buildReceipts(sent);
    // live data: receipts also reflect orders synced from the server
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$sync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pullOrders"])();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "hidden min-h-screen flex-col bg-[#F2FAFD] md:flex",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "mx-auto flex w-full max-w-[1200px] flex-col gap-9 px-6 pt-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "flex flex-wrap items-stretch gap-9",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex min-w-0 flex-[1_1_420px] flex-col justify-center gap-3.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[14px] font-extrabold text-[#00779F]",
                                        children: "هر قلب و پنجه، این‌جا ثبت می‌شه"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1282,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "m-0 text-[46px] font-black leading-[1.35]",
                                        children: "دفتر مهربونی"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1283,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "m-0 text-[16px] font-medium leading-[2] text-[#1F3E4D]",
                                        children: "هر قلب و پنجه‌ای که خریده می‌شه، این‌جا ثبت می‌شه. مدرک همه‌ی ارسال‌ها رو هم همین‌جا می‌ذاریم تا خودت ببینی."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1284,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-1.5 flex flex-wrap gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navigate"])("extras"),
                                                className: "flex h-[50px] items-center gap-1.5 rounded-full bg-[#00ABE7] px-[22px] text-[15px] font-extrabold text-[#04202E] transition-transform hover:scale-[1.03]",
                                                children: "تو هم قلب اضافه کن"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                                lineNumber: 1288,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navigate"])("shipping"),
                                                className: "box-border flex h-[50px] items-center rounded-full border-2 border-[#04202E] px-[22px] text-[15px] font-extrabold text-[#04202E] transition-colors hover:bg-[#04202E] hover:text-white",
                                                children: "ارسال و بازگشت"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                                lineNumber: 1295,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1287,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1281,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CharityProgressCard, {
                                done: done,
                                pct: pct,
                                desktop: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1304,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1280,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "flex flex-wrap gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-[1_1_220px] flex-col gap-1.5 rounded-[24px] border border-[#DDEEF5] bg-white px-6 py-[22px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[14px] font-semibold text-[#4A6572]",
                                        children: "هدیه‌های فرستاده‌شده"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1310,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[36px] font-black",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(sent.length)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1311,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1309,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-[1_1_220px] flex-col gap-1.5 rounded-[24px] border border-[#F7C5D3] bg-[#FFE9F0] px-6 py-[22px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[14px] font-semibold text-[#4A6572]",
                                        children: "قلب‌های ثبت‌شده"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1314,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[36px] font-black",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(hearts)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1315,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1313,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-[1_1_220px] flex-col gap-1.5 rounded-[24px] border border-[#F2E3A0] bg-[#FFF3C9] px-6 py-[22px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[14px] font-semibold text-[#4A6572]",
                                        children: "پنجه‌های ثبت‌شده"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1318,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[36px] font-black",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(paws)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1319,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1317,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-[1_1_220px] flex-col gap-1.5 rounded-[24px] border border-[#BFE5D3] bg-[#DDF3EA] px-6 py-[22px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[14px] font-semibold text-[#4A6572]",
                                        children: "خیریه‌های همکار"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1322,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[36px] font-black",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(receipts.length)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1323,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1321,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1308,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "flex flex-wrap items-start gap-7",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex min-w-0 flex-[1.4_1_540px] flex-col gap-3.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "m-0 text-[26px] font-black",
                                                children: "مدارک ارسال"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                                lineNumber: 1331,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LiveChip, {}, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                                lineNumber: 1332,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1330,
                                        columnNumber: 13
                                    }, this),
                                    receipts.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ReceiptCard, {
                                            r: r,
                                            desktop: true
                                        }, `${r.name}-${i}`, false, {
                                            fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                            lineNumber: 1335,
                                            columnNumber: 15
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NextDeliveryBox, {
                                        desktop: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1337,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1329,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex min-w-0 flex-[1_1_340px] flex-col gap-3.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "m-0 text-[26px] font-black",
                                        children: "چطوری شفاف می‌مونیم؟"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1340,
                                        columnNumber: 13
                                    }, this),
                                    IMPACT_STEPS.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StepRow, {
                                            s: s,
                                            desktop: true
                                        }, s.n, false, {
                                            fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                            lineNumber: 1342,
                                            columnNumber: 15
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-1.5 rounded-[24px] border-[1.5px] border-[#F7C5D3] bg-[#FFE9F0] px-5 py-[18px] text-[14px] font-semibold leading-[1.9]",
                                        children: "هر قلب و پنجه‌ای که با سفارش‌های تو جمع می‌شه، همون لحظه به شمارش بالا اضافه می‌شه؛ این عدد حدسی نیست، حساب‌شده‌ست."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1344,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1339,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1328,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "flex flex-col gap-3.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "m-0 text-[26px] font-black",
                                children: "نشان‌های مهربونی"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1352,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BadgesRow, {}, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1353,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1351,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1278,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DesktopFooter, {}, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1356,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
        lineNumber: 1277,
        columnNumber: 5
    }, this);
}
/* ═══════════════ 5 · LOGIN — shared OTP flow ═══════════════ */ const RESEND_SECONDS = 30;
const INPUT_CLS = "h-[58px] w-full rounded-[20px] border-2 border-[#04202E] bg-white px-[18px] text-[18px] font-semibold text-[#04202E] outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(0,171,231,0.15)]";
const PRIMARY_BTN_CLS = "flex h-14 w-full items-center justify-center rounded-full bg-[#00ABE7] text-[17px] font-extrabold text-[#04202E] transition-transform active:scale-95";
const GHOST_BTN_CLS = "flex h-[52px] w-full items-center justify-center rounded-full border-2 border-[#04202E] bg-transparent text-[15px] font-extrabold text-[#04202E] transition-colors hover:bg-[#04202E] hover:text-white";
function useOtpFlow() {
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.login);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("phone");
    const [phone, setPhoneRaw] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [otp, setOtpRaw] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [timer, setTimer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [devCode, setDevCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const norm = (s)=>toEnDigits(s).replace(/\s/g, "");
    const setPhone = (v)=>setPhoneRaw((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(v.replace(/[^\d۰-۹]/g, "").slice(0, 11)));
    const setOtp = (v)=>setOtpRaw((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(v.replace(/[^\d۰-۹]/g, "").slice(0, 6)));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (step !== "otp" || timer <= 0) return;
        const t = setInterval(()=>setTimer((s)=>s > 0 ? s - 1 : 0), 1000);
        return ()=>clearInterval(t);
    }, [
        step,
        timer
    ]);
    /**
   * Asks the server for a 6-digit OTP (session flow, guide §4.3).
   * No demo fallback code exists anymore — if the API is down we surface an
   * honest error. Returns the dev-echo code in dev mode ("" otherwise).
   */ const requestOtp = async (p)=>{
        try {
            const res = await fetch("/api/auth/request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    phone: p
                })
            });
            const json = await res.json();
            if (res.ok) return json.devCode ?? "";
            return "";
        } catch  {
            return ""; // offline — UI shows the honest «service unavailable» state
        }
    };
    const submitPhone = ()=>{
        const p = norm(phone);
        if (!/^09\d{9}$/.test(p)) {
            setError("شماره باید ۱۱ رقم باشه و با ۰۹ شروع بشه.");
            return;
        }
        if (busy) return;
        setError("");
        setPhoneRaw((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(p));
        setBusy(true);
        void requestOtp(p).then((code)=>{
            setDevCode(code);
            setBusy(false);
            setStep("otp");
            setTimer(RESEND_SECONDS);
            if (!code) {
                toast({
                    title: "کد پیامک شد",
                    description: "کد ۶ رقمی به همین شماره پیامک می‌شه."
                });
            }
        });
    };
    const submitOtp = ()=>{
        const c = norm(otp);
        if (!/^\d{6}$/.test(c)) {
            setError("کد شش‌رقمی رو کامل بزن.");
            return;
        }
        if (busy) return;
        setError("");
        setBusy(true);
        const p = norm(phone);
        void (async ()=>{
            let ok = false;
            let serverError = "";
            try {
                const res = await fetch("/api/auth/verify", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        phone: p,
                        code: c
                    })
                });
                if (res.ok) ok = true;
                else serverError = "کد اشتباهه یا منقضی شده؛ دوباره امتحان کن.";
            } catch  {
                // offline → compare against the demo/dev code
                ok = devCode ? c === devCode : false;
                if (!ok) serverError = "کد اشتباهه.";
            }
            setBusy(false);
            if (ok) setStep("name");
            else setError(serverError || "کد اشتباهه.");
        })();
    };
    const resend = ()=>{
        if (timer > 0 || busy) return;
        setTimer(RESEND_SECONDS);
        setOtpRaw("");
        void requestOtp(norm(phone)).then((code)=>{
            setDevCode(code);
            toast({
                title: "کد دوباره فرستاده شد",
                description: code ? `کد نمایشی: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(code)}` : "کد ۶ رقمی پیامک شد."
            });
        });
    };
    const submitLogin = ()=>{
        const p = norm(phone);
        const trimmed = name.trim();
        login(p, trimmed);
        if (trimmed) {
            void fetch("/api/auth/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    phone: p,
                    name: trimmed
                })
            }).catch(()=>{});
        }
        toast({
            title: "وارد شدی!",
            description: trimmed ? `خوش اومدی ${trimmed}! هدیه‌هات همین‌جاست.` : "خوش اومدی! هدیه‌هات همین‌جاست."
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navigate"])("my-gifts");
        // cross-device «هدیه‌هام»: pull orders bound to this account on the server
        // (gifts made on other devices show up right here)
        void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$sync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pullOrdersForPhone"])().then((n)=>{
            if (n > 0) {
                toast({
                    title: "هدیه‌هات رسیدن!",
                    description: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(n)} هدیه از حساب قبلیت به این گوشی اومد.`
                });
            }
        });
        // cross-device favorites: hearts saved on other devices land here too
        void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$sync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pullFavorites"])().then((n)=>{
            if (n > 0) {
                toast({
                    title: "محبوب‌هات هم رسیدن ♥",
                    description: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(n)} رفیق پشمالو از حساب قبلیت به قلبت اضافه شد.`
                });
            }
        });
    };
    const restart = ()=>{
        setStep("phone");
        setOtpRaw("");
        setError("");
    };
    return {
        step,
        phone,
        otp,
        name,
        error,
        timer,
        devCode,
        busy,
        setPhone,
        setOtp,
        setName,
        submitPhone,
        submitOtp,
        resend,
        submitLogin,
        restart
    };
}
function LoginHeading({ flow }) {
    const t = flow.step === "phone" ? {
        h: "خوش اومدی",
        p: "با شماره‌ت وارد شو تا هدیه‌هات رو ببینی."
    } : flow.step === "otp" ? {
        h: "کد تایید",
        p: `کد شش‌رقمی به شماره‌ی ${flow.phone} فرستاده شد.`
    } : {
        h: "آخرین قدم",
        p: "اگه اسمت رو بگی، قشنگ‌تر خوش‌اومد می‌گیم! (اختیاری)"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-2.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "m-0 text-[30px] font-black leading-[1.45]",
                children: t.h
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1570,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "m-0 text-[15px] font-medium leading-[1.9] text-[#1F3E4D]",
                children: t.p
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1571,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
        lineNumber: 1569,
        columnNumber: 5
    }, this);
}
function OrDivider() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-3 text-[13px] font-bold text-[#4A6572]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "h-[1.5px] flex-1 bg-[#CFE6EF]"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1579,
                columnNumber: 7
            }, this),
            "یا",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "h-[1.5px] flex-1 bg-[#CFE6EF]"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1581,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
        lineNumber: 1578,
        columnNumber: 5
    }, this);
}
function LoginFlowBlock({ flow }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            flow.step === "phone" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "pishnam-phone",
                        className: "text-[14px] font-extrabold",
                        children: "شماره‌ی موبایلت"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1591,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "pishnam-phone",
                        type: "tel",
                        inputMode: "numeric",
                        dir: "ltr",
                        maxLength: 11,
                        placeholder: "۰۹۱۲ ۳۴۵ ۶۷۸۹",
                        className: INPUT_CLS,
                        style: {
                            textAlign: "right"
                        },
                        value: flow.phone,
                        onChange: (e)=>flow.setPhone(e.target.value),
                        onKeyDown: (e)=>e.key === "Enter" && flow.submitPhone()
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1594,
                        columnNumber: 11
                    }, this),
                    flow.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[12.5px] font-bold text-[#F0426B]",
                        children: flow.error
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1607,
                        columnNumber: 26
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: flow.submitPhone,
                        disabled: flow.busy,
                        className: `${PRIMARY_BTN_CLS} disabled:opacity-60`,
                        children: flow.busy ? "در حال فرستادن کد…" : "ادامه"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1608,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1590,
                columnNumber: 9
            }, this),
            flow.step === "otp" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "pishnam-otp",
                        className: "text-[14px] font-extrabold",
                        children: "کد تایید"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1616,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "pishnam-otp",
                        type: "tel",
                        inputMode: "numeric",
                        dir: "ltr",
                        maxLength: 6,
                        placeholder: "●●●●●●",
                        className: INPUT_CLS,
                        style: {
                            textAlign: "right",
                            letterSpacing: "0.35em"
                        },
                        value: flow.otp,
                        onChange: (e)=>flow.setOtp(e.target.value),
                        onKeyDown: (e)=>e.key === "Enter" && flow.submitOtp()
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1619,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center justify-between gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-full bg-[#E3F6FD] px-3 py-1.5 text-[12px] font-extrabold text-[#006387]",
                                children: flow.devCode ? `کد نمایشی: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(flow.devCode)}` : "در حال فرستادن کد…"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1633,
                                columnNumber: 13
                            }, this),
                            flow.timer > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[12px] font-bold text-[#4A6572]",
                                children: [
                                    "ارسال دوباره تا ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(flow.timer),
                                    " ثانیه"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1637,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: flow.resend,
                                className: "text-[12px] font-extrabold text-[#00779F] underline underline-offset-4 transition-colors hover:text-[#04202E]",
                                children: "ارسال دوباره‌ی کد"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1639,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1632,
                        columnNumber: 11
                    }, this),
                    flow.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[12.5px] font-bold text-[#F0426B]",
                        children: flow.error
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1648,
                        columnNumber: 26
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: flow.submitOtp,
                        disabled: flow.busy,
                        className: `${PRIMARY_BTN_CLS} disabled:opacity-60`,
                        children: flow.busy ? "در حال بررسی…" : "تایید و ادامه"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1649,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: flow.restart,
                        className: "self-start text-[12.5px] font-bold text-[#4A6572] underline underline-offset-4 transition-colors hover:text-[#04202E]",
                        children: "تغییر شماره"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1652,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1615,
                columnNumber: 9
            }, this),
            flow.step === "name" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "pishnam-name",
                        className: "text-[14px] font-extrabold",
                        children: "اسمت چیه؟ (اختیاری)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1664,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "pishnam-name",
                        type: "text",
                        placeholder: "مثلاً: سارا",
                        className: INPUT_CLS,
                        value: flow.name,
                        onChange: (e)=>flow.setName(e.target.value),
                        onKeyDown: (e)=>e.key === "Enter" && flow.submitLogin()
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1667,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: flow.submitLogin,
                        className: PRIMARY_BTN_CLS,
                        children: "ورود به یک دوست"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1676,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1663,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(OrDivider, {}, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1682,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navigate"])("home"),
                className: GHOST_BTN_CLS,
                children: "ورود به‌عنوان مهمان"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1684,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center text-[12.5px] font-medium leading-[1.9] text-[#4A6572]",
                children: [
                    "با ادامه، ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-extrabold text-[#006387]",
                        children: "قوانین و حریم خصوصی"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1693,
                        columnNumber: 19
                    }, this),
                    " رو قبول می‌کنی."
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1692,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
function LoggedInBlock() {
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.user);
    const orders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.orders);
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.logout);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    if (!user) return null;
    const sent = orders.filter((o)=>o.dir === "sent");
    const recv = orders.filter((o)=>o.dir === "recv");
    const charms = sent.reduce((a, o)=>a + o.hearts + o.paws, 0);
    const awaiting = sent.filter((o)=>o.v2 && o.status2 === "awaiting_payment").length;
    const links = [
        {
            label: "هدیه‌هام",
            route: "my-gifts",
            bg: "#E3F6FD",
            note: awaiting > 0 ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(awaiting)} سفارش منتظر پرداخت` : "فرستاده‌ها و دریافتی‌ها"
        },
        {
            label: "دفتر مهربونی",
            route: "impact",
            bg: "#FFE9F0",
            note: "قلب و پنجه‌هات کجا رفتن"
        },
        {
            label: "پیگیری هدیه",
            route: "track",
            bg: "#FFF3C9",
            note: "مسیر جعبه تا تحویل"
        },
        {
            label: "داستان‌ها",
            route: "stories",
            bg: "#DDF3EA",
            note: "بغل‌های واقعی مشتری‌ها"
        },
        {
            label: "نظرها",
            route: "reviews",
            bg: "#E7E0FA",
            note: "حرف‌های بغل‌گیرنده‌ها"
        },
        {
            label: "تماس با ما",
            route: "contact",
            bg: "#F2F7F9",
            note: "سؤالی داری؟"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-2.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "m-0 text-[30px] font-black leading-[1.45]",
                        children: "خوش اومدی!"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1723,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "m-0 text-[15px] font-medium leading-[1.9] text-[#1F3E4D]",
                        children: "حسابت فعاله؛ هدیه‌هات و کارت‌هات همیشه همین‌جان."
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1724,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1722,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4 rounded-[26px] border border-[#DDEEF5] bg-white p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#00ABE7] text-2xl font-black text-[#04202E]",
                        children: user.name.slice(0, 1) || "پ"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1731,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex min-w-0 flex-col gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[17px] font-extrabold",
                                children: user.name || "رفیق یک دوستی"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1735,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                dir: "ltr",
                                className: "text-[13.5px] font-semibold text-[#4A6572]",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(user.phone)
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1736,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1734,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1730,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-1 flex-col gap-0.5 rounded-[20px] border border-[#DDEEF5] bg-white px-3 py-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11.5px] font-semibold text-[#4A6572]",
                                children: "فرستادی"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1745,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[20px] font-black",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(sent.length)
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1746,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1744,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-1 flex-col gap-0.5 rounded-[20px] border border-[#CDEFFB] bg-[#E3F6FD] px-3 py-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11.5px] font-semibold text-[#4A6572]",
                                children: "گرفتی"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1749,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[20px] font-black",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(recv.length)
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1750,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1748,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-1 flex-col gap-0.5 rounded-[20px] border border-[#F7C5D3] bg-[#FFE9F0] px-3 py-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11.5px] font-semibold text-[#4A6572]",
                                children: "قلب و پنجه"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1753,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[20px] font-black",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(charms)
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1754,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1752,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1743,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-2.5",
                children: links.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navigate"])(l.route),
                        className: `flex flex-col items-start gap-1 rounded-[20px] border border-[#DDEEF5] p-3.5 text-right transition-all hover:shadow-[0_6px_18px_rgba(4,32,46,0.07)] focus-visible:ring-2 focus-visible:ring-[#00ABE7] focus-visible:outline-none`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex w-full items-center justify-between gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[14.5px] font-extrabold text-[#04202E]",
                                        children: l.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1768,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[#04202E]",
                                        style: {
                                            background: l.bg
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ForwardIcon"], {
                                            size: 14,
                                            stroke: "#04202E"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                            lineNumber: 1770,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1769,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1767,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11.5px] font-semibold leading-[1.7] text-[#4A6572]",
                                children: l.note
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1773,
                                columnNumber: 13
                            }, this)
                        ]
                    }, l.route, true, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1761,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1759,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navigate"])("my-gifts"),
                className: PRIMARY_BTN_CLS,
                children: "هدیه‌هام رو ببین"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1778,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>{
                    // server first: kill the HttpOnly cookie + DB session, then wipe the
                    // local store (orders + pending key) — order matters for safety
                    void fetch("/api/auth/logout", {
                        method: "POST"
                    }).catch(()=>{}).finally(()=>{
                        logout();
                        toast({
                            title: "از حساب خارج شدی",
                            description: "هر وقت خواستی دوباره بیا."
                        });
                    });
                },
                className: GHOST_BTN_CLS,
                children: "خروج از حساب"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1785,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
        lineNumber: 1721,
        columnNumber: 5
    }, this);
}
function MobileLogin() {
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.user);
    const flow = useOtpFlow();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen flex-col bg-[#F2FAFD] px-6 pb-7 pt-4 md:hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-label": "برگشت",
                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navigate"])("home"),
                        className: "flex h-11 w-11 items-center justify-center rounded-full border border-[#D3E8F0] bg-white text-[#04202E]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BackIcon"], {
                            size: 22
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                            lineNumber: 1820,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1814,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$logo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Logo"], {
                        size: 32
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1822,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1813,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex flex-1 flex-col ${user ? "justify-center gap-6 py-8" : ""}`,
                children: [
                    !user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-[26px]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LoginHeading, {
                                    flow: flow
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                    lineNumber: 1829,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1828,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-[26px] flex flex-col gap-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LoginFlowBlock, {
                                    flow: flow
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                    lineNumber: 1832,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1831,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true),
                    user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LoggedInBlock, {}, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1836,
                        columnNumber: 18
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1825,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
        lineNumber: 1812,
        columnNumber: 5
    }, this);
}
function DesktopLogin() {
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.user);
    const flow = useOtpFlow();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "hidden min-h-screen flex-col bg-[#F2FAFD] md:flex",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "mx-auto flex w-full max-w-[1080px] flex-1 flex-wrap items-stretch justify-center gap-8 px-6 pb-14 pt-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex min-h-[520px] min-w-0 flex-[1_1_460px] max-w-[560px] flex-col justify-between gap-6 overflow-hidden rounded-[40px] bg-[#00ABE7] p-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute -bottom-[110px] -left-[90px] h-[320px] w-[320px] rounded-full bg-[#66CDF1]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1853,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute left-14 top-[60px] h-3.5 w-3.5 rounded-full bg-white"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1854,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute right-[60px] top-[120px] h-1.5 w-4 rotate-[35deg] rounded-full bg-[#04202E]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1855,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute left-10 top-[200px] h-3.5 w-3.5 rounded-full border-2 border-[#04202E] bg-[#FFE08A]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1856,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex flex-col gap-3.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$logo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Logo"], {
                                        size: 44
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1858,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "m-0 mt-4 text-[38px] font-black leading-[1.5]",
                                        children: "یه بغل، تو یه جعبه"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1859,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "m-0 text-[16px] font-semibold leading-[2]",
                                        children: "هدیه‌هات رو از همین‌جا بفرست، پیام‌هات رو ببین و هر قلب و پنجه‌ای که جمع می‌شه رو یه جا نگه دار."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1860,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1857,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex items-end gap-3.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Plush"], {
                                        kind: "bunny",
                                        size: 200
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1865,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Plush"], {
                                        kind: "panda",
                                        size: 140
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1866,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1864,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1852,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex min-w-0 flex-[1_1_380px] max-w-[460px] flex-col gap-4 self-center rounded-[32px] border border-[#DDEEF5] bg-white p-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navigate"])("home"),
                                className: "self-start text-[14px] font-extrabold text-[#00779F] transition-colors hover:text-[#04202E]",
                                children: "برگرد به خانه"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1872,
                                columnNumber: 11
                            }, this),
                            user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LoggedInBlock, {}, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1880,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-1",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LoginHeading, {
                                            flow: flow
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                            lineNumber: 1884,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1883,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 flex flex-col gap-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LoginFlowBlock, {
                                            flow: flow
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                            lineNumber: 1887,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                        lineNumber: 1886,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1871,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1850,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DesktopFooter, {
                compact: true
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1893,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
        lineNumber: 1849,
        columnNumber: 5
    }, this);
}
/* ═══════════════ shared desktop footer (matches home.tsx footer) ═══════════════ */ function FooterLink({ label, route }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navigate"])(route),
        className: "text-right transition-colors hover:text-[#00ABE7]",
        children: label
    }, void 0, false, {
        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
        lineNumber: 1902,
        columnNumber: 5
    }, this);
}
function DesktopFooter({ compact = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: `${compact ? "mt-10" : "mt-auto pt-16"} bg-[#04202E] text-white`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto flex w-full max-w-[1200px] flex-wrap justify-between gap-9 px-6 pb-10 pt-14 box-border",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-[1_1_280px] flex-col gap-3.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$logo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Logo"], {
                                size: 44
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1917,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[15px] font-bold text-[#BFE9F8]",
                                children: "یه بغل، تو یه جعبه"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1918,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1916,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2.5 text-[15px] font-semibold",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-base font-extrabold text-[#00ABE7]",
                                children: "یک دوست"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1921,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterLink, {
                                label: "ماموریت",
                                route: "mission"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1922,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterLink, {
                                label: "درباره‌ی ما",
                                route: "about"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1923,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterLink, {
                                label: "دفتر مهربونی",
                                route: "impact"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1924,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1920,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2.5 text-[15px] font-semibold",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-base font-extrabold text-[#00ABE7]",
                                children: "کمک"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1927,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterLink, {
                                label: "تماس با ما",
                                route: "contact"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1928,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterLink, {
                                label: "ارسال و بازگشت",
                                route: "shipping"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1929,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterLink, {
                                label: "نظرها",
                                route: "reviews"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1930,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1926,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2.5 text-[15px] font-semibold",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-base font-extrabold text-[#00ABE7]",
                                children: "ما رو دنبال کن"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1933,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "یک دوست@ اینستاگرام"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1934,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "یک دوست@ تلگرام"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                                lineNumber: 1935,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                        lineNumber: 1932,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1915,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-[#0E3C52] px-6 py-[18px] text-center text-[13px] font-medium text-[#BFE9F8]",
                children: "یک دوست · همه‌ی حقوق محفوظ است"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/dashboards.tsx",
                lineNumber: 1938,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/dashboards.tsx",
        lineNumber: 1914,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_components_shop_screens_dashboards_tsx_e16ce9e5._.js.map