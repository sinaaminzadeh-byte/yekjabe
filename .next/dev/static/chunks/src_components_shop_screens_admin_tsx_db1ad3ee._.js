(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/shop/screens/admin.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdminScreen",
    ()=>AdminScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// ═══ پنل همکاران — Phase B admin console (guide §B3/§B6) ═══
// Tabs: سفارش‌ها (transitions via /api/admin/orders/{id}/transition),
// رسیدها (manual receipt queue approve/reject), نظرها (reviews moderation).
// Gated behind AdminUser OTP (pn_admin cookie, guide A7).
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hash-route.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/plush.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/icons.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pishnam-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/fa.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$nav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/nav.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2f$status$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/orders/status.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature();
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
const STATUS_LABEL = {
    awaiting_payment: {
        label: "در انتظار پرداخت",
        bg: "#F0F3F5"
    },
    payment_under_review: {
        label: "رسید در بررسی",
        bg: "#FFF3C9"
    },
    paid: {
        label: "پرداخت شد",
        bg: "#FFF3C9"
    },
    preparing: {
        label: "بسته‌بندی",
        bg: "#FFE0EA"
    },
    shipped: {
        label: "در راه",
        bg: "#CDEFFB"
    },
    delivered: {
        label: "تحویل شد",
        bg: "#D7F5E4"
    },
    failed: {
        label: "پرداخت ناموفق",
        bg: "#FFE9F0"
    },
    cancelled: {
        label: "لغو شد",
        bg: "#FFE9F0"
    },
    expired: {
        label: "منقضی شد",
        bg: "#F0F3F5"
    },
    refund_requested: {
        label: "درخواست مرجوعی",
        bg: "#E7E0FA"
    },
    refunded: {
        label: "مرجوع شد",
        bg: "#E7E0FA"
    }
};
const NEXT_ACTION = {
    paid: "شروع بسته‌بندی",
    preparing: "تحویل به پست",
    shipped: "تحویل داده شد",
    delivered: ""
};
// ── admin gate — OTP + server-side admin session (guide A7: PIN killed) ──
const UNLOCK_KEY = "pishnam-admin-ok";
function toEnDigits(s) {
    return s.replace(/[۰-۹]/g, (d)=>String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
}
function AdminOtpGate({ onOk }) {
    _s();
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("otp");
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("phone");
    const [phone, setPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [code, setCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [err, setErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errMsg, setErrMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const fail = (msg)=>{
        setErrMsg(msg ?? "");
        setErr(true);
        setTimeout(()=>setErr(false), 1200);
    };
    const sendCode = async ()=>{
        const p = toEnDigits(phone.trim());
        if (!/^09\d{9}$/.test(p)) {
            fail();
            return;
        }
        setBusy(true);
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
            if (!res.ok) throw new Error("request failed");
            setStep("code");
        } catch  {
            fail();
        }
        setBusy(false);
    };
    const submit = async ()=>{
        const p = toEnDigits(phone.trim());
        const c = toEnDigits(code.trim());
        if (!/^09\d{9}$/.test(p) || !/^\d{6}$/.test(c)) {
            fail();
            return;
        }
        setBusy(true);
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
            const json = await res.json();
            if (res.ok && json.ok && json.admin) {
                try {
                    sessionStorage.setItem(UNLOCK_KEY, "1");
                } catch  {}
                onOk();
                return;
            }
            fail();
        } catch  {
            fail();
        }
        setBusy(false);
    };
    // ورود با رمز — مسیر دوم (فوتر: «ورود مدیر»). سرور رمز را constant-time مقایسه می‌کند.
    const submitPassword = async ()=>{
        if (password.trim().length < 4) {
            fail();
            return;
        }
        setBusy(true);
        try {
            const res = await fetch("/api/auth/admin-login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    password
                })
            });
            const json = await res.json();
            if (res.ok && json.ok) {
                try {
                    sessionStorage.setItem(UNLOCK_KEY, "1");
                } catch  {}
                onOk();
                return;
            }
            fail(json.error === "rate_limited" ? "چند بار اشتباه زدی؛ ۱۵ دقیقه صبر کن." : "رمز درست نیست.");
        } catch  {
            fail();
        }
        setBusy(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen flex-col items-center justify-center bg-[#F2FAFD] px-5",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "pishnam-reveal flex w-full max-w-[380px] flex-col items-center gap-4 rounded-[28px] border border-[#DDEEF5] bg-white p-7 text-center shadow-[0_14px_34px_rgba(4,32,46,0.06)]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "flex h-[74px] w-[74px] items-center justify-center rounded-full bg-[#E3F6FD]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plush"], {
                        kind: "bear",
                        size: 52
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 143,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/admin.tsx",
                    lineNumber: 142,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-1.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "m-0 text-[22px] font-black",
                            children: "پنل همکاران"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/admin.tsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "m-0 text-[13.5px] font-medium leading-[1.9] text-[#4A6572]",
                            children: mode === "password" ? "رمز پنل رو بزن (فایل .env سرور: ADMIN_PANEL_PASSWORD)." : step === "phone" ? "با شماره‌ی موبایلِ همکاریت کد ورود بگیر." : "کد ۶ رقمی پیامک‌شده رو بزن."
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/admin.tsx",
                            lineNumber: 147,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shop/screens/admin.tsx",
                    lineNumber: 145,
                    columnNumber: 9
                }, this),
                mode === "password" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "password",
                    dir: "ltr",
                    value: password,
                    onChange: (e)=>setPassword(e.target.value),
                    onKeyDown: (e)=>e.key === "Enter" && !busy && void submitPassword(),
                    placeholder: "••••••••",
                    "aria-label": "رمز پنل مدیریت",
                    className: `h-[54px] w-full rounded-[18px] border-2 bg-white text-center text-[16px] font-black tracking-[0.2em] text-[#04202E] outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(0,171,231,0.15)] ${err ? "pishnam-shake border-[#F0426B]" : "border-[#04202E]"}`
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/admin.tsx",
                    lineNumber: 156,
                    columnNumber: 11
                }, this) : step === "phone" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "tel",
                    inputMode: "numeric",
                    dir: "ltr",
                    maxLength: 11,
                    value: phone,
                    onChange: (e)=>setPhone(e.target.value.replace(/[^\d۰-۹]/g, "").slice(0, 11)),
                    onKeyDown: (e)=>e.key === "Enter" && !busy && void sendCode(),
                    placeholder: "09xxxxxxxxx",
                    "aria-label": "شماره موبایل همکاری",
                    className: `h-[54px] w-full rounded-[18px] border-2 bg-white text-center text-[18px] font-black text-[#04202E] outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(0,171,231,0.15)] ${err ? "pishnam-shake border-[#F0426B]" : "border-[#04202E]"}`
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/admin.tsx",
                    lineNumber: 169,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "password",
                    inputMode: "numeric",
                    dir: "ltr",
                    maxLength: 6,
                    value: code,
                    onChange: (e)=>setCode(e.target.value.replace(/[^\d۰-۹]/g, "").slice(0, 6)),
                    onKeyDown: (e)=>e.key === "Enter" && !busy && void submit(),
                    placeholder: "••••••",
                    "aria-label": "کد ورود شش‌رقمی",
                    className: `h-[54px] w-full rounded-[18px] border-2 bg-white text-center text-[20px] font-black tracking-[0.4em] text-[#04202E] outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(0,171,231,0.15)] ${err ? "pishnam-shake border-[#F0426B]" : "border-[#04202E]"}`
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/admin.tsx",
                    lineNumber: 184,
                    columnNumber: 11
                }, this),
                err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[12.5px] font-bold text-[#F0426B]",
                    children: errMsg || (mode === "password" ? "رمز درست نیست." : step === "phone" ? "شماره درست نیست یا سرویس در دسترس نیست." : "کد درست نیست یا منقضی شده.")
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/admin.tsx",
                    lineNumber: 200,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    disabled: busy,
                    onClick: ()=>mode === "password" ? void submitPassword() : step === "phone" ? void sendCode() : void submit(),
                    className: "flex h-[52px] w-full items-center justify-center rounded-full bg-[#00ABE7] text-[16px] font-extrabold text-[#04202E] transition-transform active:scale-95 disabled:opacity-60",
                    children: mode === "password" ? "ورود با رمز" : step === "phone" ? "دریافت کد ورود" : "ورود به پنل"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/admin.tsx",
                    lineNumber: 209,
                    columnNumber: 9
                }, this),
                mode === "otp" && step === "code" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>{
                        setStep("phone");
                        setCode("");
                        setErr(false);
                    },
                    className: "text-[12.5px] font-bold text-[#4A6572] underline",
                    children: "تغییر شماره"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/admin.tsx",
                    lineNumber: 220,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 text-[12px] font-bold text-[#4A6572]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "h-px w-8 bg-[#CFE6EF]",
                            "aria-hidden": "true"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/admin.tsx",
                            lineNumber: 233,
                            columnNumber: 11
                        }, this),
                        "یا",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "h-px w-8 bg-[#CFE6EF]",
                            "aria-hidden": "true"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/admin.tsx",
                            lineNumber: 235,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shop/screens/admin.tsx",
                    lineNumber: 232,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>{
                        setMode(mode === "otp" ? "password" : "otp");
                        setErr(false);
                        setErrMsg("");
                    },
                    className: "text-[12.5px] font-extrabold text-[#006387] underline underline-offset-4",
                    children: mode === "otp" ? "ورود با رمز عبور" : "ورود با کد پیامکی"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/admin.tsx",
                    lineNumber: 237,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "rounded-full bg-[#FFF3C9] px-3.5 py-1.5 text-[11.5px] font-extrabold text-[#8A6D1F]",
                    children: "فقط شماره‌های ثبت‌شده‌ی همکاری وارد می‌شن"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/admin.tsx",
                    lineNumber: 248,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/shop/screens/admin.tsx",
            lineNumber: 141,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/shop/screens/admin.tsx",
        lineNumber: 140,
        columnNumber: 5
    }, this);
}
_s(AdminOtpGate, "wbzrMdsy076mEoYIWUbaJxlfq7k=");
_c = AdminOtpGate;
function plushOf(kind) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLUSH_MAP"][kind] ? kind : "bear";
}
function StatusChip({ s }) {
    const meta = STATUS_LABEL[s] ?? STATUS_LABEL.awaiting_payment;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-block shrink-0 rounded-[10px] px-2.5 py-1 text-[11.5px] font-extrabold",
        style: {
            background: meta.bg
        },
        children: meta.label
    }, void 0, false, {
        fileName: "[project]/src/components/shop/screens/admin.tsx",
        lineNumber: 263,
        columnNumber: 5
    }, this);
}
_c1 = StatusChip;
function StatCard({ n, label, bg }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-1 rounded-[20px] border border-[#DDEEF5] p-4",
        style: {
            background: bg
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[22px] font-black leading-none",
                children: n
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/admin.tsx",
                lineNumber: 275,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[12.5px] font-bold text-[#4A6572]",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/admin.tsx",
                lineNumber: 276,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/admin.tsx",
        lineNumber: 274,
        columnNumber: 5
    }, this);
}
_c2 = StatCard;
function AdminScreen() {
    _s1();
    const [unlocked, setUnlocked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "AdminScreen.useState": ()=>{
            try {
                return sessionStorage.getItem(UNLOCK_KEY) === "1";
            } catch  {
                return false;
            }
        }
    }["AdminScreen.useState"]);
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("orders");
    if (!unlocked) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex min-h-screen flex-col bg-[#F2FAFD]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$nav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MobileTopBar"], {
                    title: "پنل همکاران",
                    back: "home"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/admin.tsx",
                    lineNumber: 341,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AdminOtpGate, {
                    onOk: ()=>setUnlocked(true)
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/admin.tsx",
                    lineNumber: 342,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/shop/screens/admin.tsx",
            lineNumber: 340,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen flex-col bg-[#F2FAFD]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$nav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MobileTopBar"], {
                title: "پنل همکاران",
                back: "home"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/admin.tsx",
                lineNumber: 349,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "mx-auto w-full max-w-[1200px] flex-1 px-4 pb-24 pt-5 md:px-6 md:pt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-5 flex flex-col gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "m-0 text-[26px] font-black md:text-[34px]",
                                children: "دفتر سفارش‌ها"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 352,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "m-0 text-[13.5px] font-medium text-[#4A6572] md:text-[15px]",
                                children: "داده‌ی زنده از سرور — سفارش‌ها، رسیدهای کارت‌به‌کارت و نظرها"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 353,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 351,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "no-scrollbar mb-5 flex gap-2 overflow-x-auto",
                        children: [
                            {
                                key: "orders",
                                label: "سفارش‌ها"
                            },
                            {
                                key: "payments",
                                label: "رسیدهای کارت‌به‌کارت"
                            },
                            {
                                key: "reviews",
                                label: "نظرها"
                            },
                            {
                                key: "stories",
                                label: "تجربه‌ها"
                            },
                            {
                                key: "blog",
                                label: "بلاگ"
                            }
                        ].map((t)=>{
                            const on = tab === t.key;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "aria-pressed": on,
                                onClick: ()=>setTab(t.key),
                                className: "h-11 shrink-0 rounded-full px-5 text-[13.5px] font-extrabold transition-all",
                                style: {
                                    background: on ? "#04202E" : "#fff",
                                    border: `1.5px solid ${on ? "#04202E" : "#CFE6EF"}`,
                                    color: on ? "#fff" : "#04202E"
                                },
                                children: t.label
                            }, t.key, false, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 371,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 359,
                        columnNumber: 9
                    }, this),
                    tab === "orders" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OrdersTab, {}, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 389,
                        columnNumber: 30
                    }, this),
                    tab === "payments" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PaymentsTab, {}, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 390,
                        columnNumber: 32
                    }, this),
                    tab === "reviews" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReviewsTab, {}, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 391,
                        columnNumber: 31
                    }, this),
                    tab === "stories" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StoriesModTab, {}, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 392,
                        columnNumber: 31
                    }, this),
                    tab === "blog" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BlogTab, {}, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 393,
                        columnNumber: 28
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-7 flex justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("home"),
                            className: "flex h-12 items-center gap-2 rounded-full border-2 border-[#04202E] bg-white px-7 text-[14.5px] font-extrabold text-[#04202E] transition-transform hover:scale-[1.02]",
                            children: [
                                "برگرد به خانه",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ForwardIcon"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/admin.tsx",
                                    lineNumber: 402,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/shop/screens/admin.tsx",
                            lineNumber: 396,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 395,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/admin.tsx",
                lineNumber: 350,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/admin.tsx",
        lineNumber: 348,
        columnNumber: 5
    }, this);
}
_s1(AdminScreen, "L7wlcKYPTlJlKgWUqksWIs7O48I=");
_c3 = AdminScreen;
/* ═══════════ TAB 1 — ORDERS ═══════════ */ function OrdersTab() {
    _s2();
    const [orders, setOrders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [refreshing, setRefreshing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [q, setQ] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const load = (silent = false)=>{
        if (!silent) setRefreshing(true);
        fetch("/api/admin/orders", {
            cache: "no-store"
        }).then((r)=>{
            if (!r.ok) throw new Error();
            return r.json();
        }).then((j)=>{
            setOrders(j.orders ?? []);
            setError(null);
        }).catch(()=>setError("اتصال به سرور برقرار نشد. دوباره تلاش کن.")).finally(()=>setRefreshing(false));
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OrdersTab.useEffect": ()=>{
            // deferred one tick so the first paint isn't blocked by the spinner state
            const t = setTimeout({
                "OrdersTab.useEffect.t": ()=>load(true)
            }["OrdersTab.useEffect.t"], 0);
            return ({
                "OrdersTab.useEffect": ()=>clearTimeout(t)
            })["OrdersTab.useEffect"];
        }
    }["OrdersTab.useEffect"], []);
    const transition = async (o, to, tracking)=>{
        try {
            const res = await fetch(`/api/admin/orders/${o.id}/transition`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    to,
                    tracking
                })
            });
            if (!res.ok) {
                const b = await res.json().catch(()=>({}));
                toast({
                    title: "ثبت نشد!",
                    description: b.error === "owner_only" ? "این کار فقط با حساب مالک انجام می‌شه." : "خطای سرور — دوباره تلاش کن."
                });
                return;
            }
            setOrders((prev)=>prev?.map((x)=>x.id === o.id ? {
                        ...x,
                        status: to
                    } : x) ?? prev);
            toast({
                title: "وضعیت به‌روز شد ✓",
                description: `${o.code} → ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2f$status$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STEP_LABELS"][to]}`
            });
        } catch  {
            toast({
                title: "ثبت روی سرور نشد!",
                description: "دوباره تلاش کن."
            });
        }
    };
    const list = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "OrdersTab.useMemo[list]": ()=>{
            if (!orders) return [];
            const needle = q.trim();
            return orders.filter({
                "OrdersTab.useMemo[list]": (o)=>{
                    if (filter !== "all" && o.status !== filter) return false;
                    if (!needle) return true;
                    const hay = `${o.code} ${o.recipientName} ${o.recipientPhone} ${o.city} ${o.items.join(" ")}`;
                    return hay.includes(needle) || hay.includes(needle.replace(/[۰-۹]/g, {
                        "OrdersTab.useMemo[list]": (d)=>String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))
                    }["OrdersTab.useMemo[list]"]));
                }
            }["OrdersTab.useMemo[list]"]);
        }
    }["OrdersTab.useMemo[list]"], [
        orders,
        filter,
        q
    ]);
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "OrdersTab.useMemo[stats]": ()=>{
            const all = orders ?? [];
            const paidLike = all.filter({
                "OrdersTab.useMemo[stats].paidLike": (o)=>[
                        "paid",
                        "preparing",
                        "shipped",
                        "delivered",
                        "refund_requested",
                        "refunded"
                    ].includes(o.status)
            }["OrdersTab.useMemo[stats].paidLike"]);
            return {
                count: all.length,
                revenue: paidLike.reduce({
                    "OrdersTab.useMemo[stats]": (a, o)=>a + o.totalToman
                }["OrdersTab.useMemo[stats]"], 0),
                pendingReview: all.filter({
                    "OrdersTab.useMemo[stats]": (o)=>o.status === "payment_under_review"
                }["OrdersTab.useMemo[stats]"]).length,
                delivered: all.filter({
                    "OrdersTab.useMemo[stats]": (o)=>o.status === "delivered"
                }["OrdersTab.useMemo[stats]"]).length
            };
        }
    }["OrdersTab.useMemo[stats]"], [
        orders
    ]);
    const FILTERS = [
        {
            key: "all",
            label: "همه"
        },
        {
            key: "awaiting_payment",
            label: "در انتظار پرداخت"
        },
        {
            key: "payment_under_review",
            label: "رسید در بررسی"
        },
        {
            key: "paid",
            label: "پرداخت شد"
        },
        {
            key: "preparing",
            label: "بسته‌بندی"
        },
        {
            key: "shipped",
            label: "در راه"
        },
        {
            key: "delivered",
            label: "تحویل شد"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-5 flex flex-wrap items-end justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid flex-1 grid-cols-2 gap-3 md:grid-cols-4 md:gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                                n: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(stats.count),
                                label: "کل سفارش‌ها",
                                bg: "#E3F6FD"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 499,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                                n: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(stats.revenue),
                                label: "فروش تأییدشده (تومان)",
                                bg: "#FFF3C9"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 500,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                                n: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(stats.pendingReview),
                                label: "رسید منتظر بررسی",
                                bg: "#FFE0EA"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 501,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                                n: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(stats.delivered),
                                label: "تحویل‌شده",
                                bg: "#DDF3EA"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 502,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 498,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>load(true),
                        disabled: refreshing,
                        className: "flex h-11 items-center gap-2 rounded-full border-2 border-[#04202E] bg-white px-5 text-[13.5px] font-extrabold text-[#04202E] transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "15",
                                height: "15",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2.4",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                "aria-hidden": "true",
                                className: refreshing ? "animate-spin" : "",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M21 12a9 9 0 1 1-2.64-6.36"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                                        lineNumber: 522,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M21 3v6h-6"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                                        lineNumber: 523,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 510,
                                columnNumber: 11
                            }, this),
                            refreshing ? "…" : "تازه‌سازی"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 504,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/admin.tsx",
                lineNumber: 497,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 flex flex-col gap-3 md:flex-row md:items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "no-scrollbar flex gap-2 overflow-x-auto",
                        children: FILTERS.map((f)=>{
                            const on = filter === f.key;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "aria-pressed": on,
                                onClick: ()=>setFilter(f.key),
                                className: "h-10 shrink-0 rounded-full px-4 text-[13px] font-bold transition-all",
                                style: {
                                    background: on ? "#04202E" : "#fff",
                                    border: `1.5px solid ${on ? "#04202E" : "#CFE6EF"}`,
                                    color: on ? "#fff" : "#04202E"
                                },
                                children: f.label
                            }, f.key, false, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 534,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 530,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: q,
                        onChange: (e)=>setQ(e.target.value),
                        placeholder: "جست‌وجو: کد، اسم، موبایل…",
                        "aria-label": "جست‌وجوی سفارش",
                        className: "h-11 flex-1 rounded-[16px] border-[1.5px] border-[#CFE6EF] bg-white px-4 text-[14px] text-[#04202E] outline-none focus:border-[#00ABE7] md:min-w-[260px]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 551,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/admin.tsx",
                lineNumber: 529,
                columnNumber: 7
            }, this),
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-4 rounded-[24px] border-2 border-dashed border-[#F0B7C9] bg-[#FFF7FA] px-6 py-12 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[40px]",
                        children: "🔌"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 563,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "m-0 text-[14.5px] font-bold",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 564,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>load(),
                        className: "flex h-11 items-center rounded-full bg-[#00ABE7] px-6 text-[13.5px] font-extrabold text-[#04202E]",
                        children: "تلاش دوباره"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 565,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/admin.tsx",
                lineNumber: 562,
                columnNumber: 9
            }, this) : orders === null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3",
                children: [
                    0,
                    1,
                    2
                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-[74px] animate-pulse rounded-[20px] bg-white/70"
                    }, i, false, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 572,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/admin.tsx",
                lineNumber: 570,
                columnNumber: 9
            }, this) : list.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-3 rounded-[24px] border-2 border-dashed border-[#99D6EE] bg-white/60 px-6 py-12 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[40px]",
                        children: "🗂️"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 577,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "m-0 text-[14.5px] font-bold",
                        children: "چیزی مطابق این فیلتر پیدا نشد."
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 578,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/admin.tsx",
                lineNumber: 576,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3",
                children: list.map((o)=>{
                    const allowed = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2f$status$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRANSITIONS"][o.status] ?? [];
                    const actionables = allowed.filter((s)=>s !== "expired" && s !== "failed");
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-[20px] border border-[#DDEEF5] bg-white p-4 md:p-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center justify-between gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "rounded-[12px] bg-[#04202E] px-2.5 py-1 text-[12px] font-extrabold text-white",
                                                dir: "ltr",
                                                children: o.code
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                                lineNumber: 589,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusChip, {
                                                s: o.status
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                                lineNumber: 592,
                                                columnNumber: 21
                                            }, this),
                                            o.paymentMethod === "manual_transfer" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "rounded-full bg-[#E7E0FA] px-2 py-0.5 text-[10.5px] font-bold text-[#5B4A8A]",
                                                children: "کارت‌به‌کارت"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                                lineNumber: 594,
                                                columnNumber: 23
                                            }, this),
                                            o.giftOpened && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "rounded-full bg-[#D7F5E4] px-2 py-0.5 text-[10.5px] font-bold text-[#2E7D53]",
                                                children: "کارت باز شد 🎉"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                                lineNumber: 596,
                                                columnNumber: 38
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                                        lineNumber: 588,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[13.5px] font-black",
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(o.totalToman),
                                            " تومان"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                                        lineNumber: 598,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 587,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12.5px] font-semibold text-[#4A6572]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "گیرنده: ",
                                            o.recipientName
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                                        lineNumber: 601,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        dir: "ltr",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(o.recipientPhone)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                                        lineNumber: 602,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            o.province,
                                            "، ",
                                            o.city
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                                        lineNumber: 603,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: o.items.join(" + ")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                                        lineNumber: 604,
                                        columnNumber: 19
                                    }, this),
                                    o.payment && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "پرداخت: ",
                                            o.payment.method === "zarinpal" ? "زرین‌پال" : "دستی",
                                            " (",
                                            STATUS_LABEL[o.payment.status]?.label ?? o.payment.status,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                                        lineNumber: 605,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 600,
                                columnNumber: 17
                            }, this),
                            actionables.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 flex flex-wrap gap-2 border-t border-[#EDF6FA] pt-3",
                                children: actionables.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>void transition(o, s),
                                        className: "flex h-10 items-center gap-1.5 rounded-full bg-[#FFF3C9] px-4 text-[12.5px] font-extrabold text-[#04202E] transition-all hover:bg-[#F7E7A9] active:scale-95",
                                        children: [
                                            s === "preparing" ? "شروع بسته‌بندی" : s === "shipped" ? "تحویل به پست" : s === "delivered" ? "تحویل داده شد" : s === "paid" ? "تأیید پرداخت" : s === "cancelled" ? "لغو سفارش" : s === "awaiting_payment" ? "بازگشت به انتظار پرداخت" : s === "refunded" ? "تأیید مرجوعی" : s === "refund_requested" ? "ثبت درخواست مرجوعی" : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2f$status$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STEP_LABELS"][s],
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ForwardIcon"], {
                                                size: 14,
                                                stroke: "#04202E"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                                lineNumber: 633,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, s, true, {
                                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                                        lineNumber: 610,
                                        columnNumber: 23
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 608,
                                columnNumber: 19
                            }, this)
                        ]
                    }, o.id, true, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 586,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/admin.tsx",
                lineNumber: 581,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s2(OrdersTab, "UpNovNubAPKf32P3k3gB43q9uf8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c4 = OrdersTab;
/* ═══════════ TAB 2 — RECEIPT QUEUE ═══════════ */ function PaymentsTab() {
    _s3();
    const [payments, setPayments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [reason, setReason] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const load = ()=>{
        fetch("/api/admin/payments?status=pending_review", {
            cache: "no-store"
        }).then((r)=>{
            if (!r.ok) throw new Error();
            return r.json();
        }).then((j)=>{
            setPayments(j.payments ?? []);
            setError(null);
        }).catch(()=>setError("اتصال به سرور برقرار نشد."));
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PaymentsTab.useEffect": ()=>{
            load();
        }
    }["PaymentsTab.useEffect"], []);
    const act = async (p, action)=>{
        try {
            const res = await fetch(`/api/admin/payments/${p.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    action,
                    reason: reason[p.id] ?? ""
                })
            });
            if (!res.ok) {
                const b = await res.json().catch(()=>({}));
                toast({
                    title: "انجام نشد!",
                    description: b.error ?? "خطای سرور"
                });
                return;
            }
            toast({
                title: action === "approve" ? "رسید تأیید شد ✓" : "رسید رد شد",
                description: `${p.code} — ${action === "approve" ? "سفارش پرداخت‌شده شد." : "به مشتری پیامک می‌شه."}`
            });
            load();
        } catch  {
            toast({
                title: "خطای شبکه",
                description: "دوباره تلاش کن."
            });
        }
    };
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-[24px] border-2 border-dashed border-[#F0B7C9] bg-[#FFF7FA] px-6 py-10 text-center text-[14px] font-bold text-[#B02A52]",
            children: error
        }, void 0, false, {
            fileName: "[project]/src/components/shop/screens/admin.tsx",
            lineNumber: 695,
            columnNumber: 7
        }, this);
    }
    if (payments === null) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-3",
            children: [
                0,
                1
            ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-[110px] animate-pulse rounded-[20px] bg-white/70"
                }, i, false, {
                    fileName: "[project]/src/components/shop/screens/admin.tsx",
                    lineNumber: 704,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/src/components/shop/screens/admin.tsx",
            lineNumber: 702,
            columnNumber: 7
        }, this);
    }
    if (payments.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center gap-3 rounded-[24px] border-2 border-dashed border-[#99D6EE] bg-white/60 px-6 py-12 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[40px]",
                    children: "🧾"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/admin.tsx",
                    lineNumber: 712,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "m-0 text-[14.5px] font-bold",
                    children: "صف رسیدها خالیه — دستت درد نکنه!"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/admin.tsx",
                    lineNumber: 713,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/shop/screens/admin.tsx",
            lineNumber: 711,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-3",
        children: payments.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-[20px] border border-[#DDEEF5] bg-white p-4 md:p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center justify-between gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-[12px] bg-[#04202E] px-2.5 py-1 text-[12px] font-extrabold text-white",
                                        dir: "ltr",
                                        children: p.code
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                                        lineNumber: 724,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[13.5px] font-black",
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(p.amountToman),
                                            " تومان"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                                        lineNumber: 727,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 723,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-full px-3 py-1 text-[11.5px] font-extrabold",
                                style: {
                                    background: p.ageMinutes > 120 ? "#FFE9F0" : "#E3F6FD",
                                    color: p.ageMinutes > 120 ? "#B02A52" : "#006387"
                                },
                                children: [
                                    p.ageMinutes < 60 ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(p.ageMinutes)} دقیقه پیش` : `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(Math.floor(p.ageMinutes / 60))} ساعت پیش`,
                                    p.ageMinutes > 120 ? " — از SLA گذشته!" : ""
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 729,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 722,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12.5px] font-semibold text-[#4A6572]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "گیرنده: ",
                                    p.recipientName
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 738,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "تلاش ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(p.attemptNo),
                                    " از ۳"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 739,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "وضعیت سفارش: ",
                                    STATUS_LABEL[p.orderStatus]?.label ?? p.orderStatus
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 740,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 737,
                        columnNumber: 11
                    }, this),
                    p.hasReceipt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: `/api/admin/payments/${p.id}/receipt`,
                        target: "_blank",
                        rel: "noreferrer",
                        className: "mt-2 inline-flex h-10 items-center gap-1.5 rounded-full bg-[#E3F6FD] px-4 text-[12.5px] font-extrabold text-[#006387] hover:bg-[#D6F1FB]",
                        children: "دیدن رسید ⤢"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 743,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex flex-wrap items-center gap-2 border-t border-[#EDF6FA] pt-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>void act(p, "approve"),
                                className: "flex h-10 items-center gap-1.5 rounded-full bg-[#D7F5E4] px-4 text-[12.5px] font-extrabold text-[#2E7D53] transition-all hover:bg-[#C4EED6] active:scale-95",
                                children: "تأیید — پرداخت شد"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 753,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>void act(p, "reject"),
                                className: "flex h-10 items-center gap-1.5 rounded-full bg-[#FFE9F0] px-4 text-[12.5px] font-extrabold text-[#B02A52] transition-all hover:bg-[#FFDCE7] active:scale-95",
                                children: "رد رسید"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 760,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: reason[p.id] ?? "",
                                onChange: (e)=>setReason((prev)=>({
                                            ...prev,
                                            [p.id]: e.target.value.slice(0, 120)
                                        })),
                                placeholder: "دلیل رد (برای پیامک مشتری)…",
                                className: "h-10 min-w-[220px] flex-1 rounded-[14px] border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3.5 text-[12.5px] text-[#04202E] outline-none focus:border-[#00ABE7]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 767,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 752,
                        columnNumber: 11
                    }, this)
                ]
            }, p.id, true, {
                fileName: "[project]/src/components/shop/screens/admin.tsx",
                lineNumber: 721,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/shop/screens/admin.tsx",
        lineNumber: 719,
        columnNumber: 5
    }, this);
}
_s3(PaymentsTab, "qdNSDduJoooJAeekFZyKw8Q7fx0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c5 = PaymentsTab;
/* ═══════════ TAB 3 — REVIEWS ═══════════ */ function ReviewsTab() {
    _s4();
    const [reviews, setReviews] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const load = ()=>{
        fetch("/api/admin/reviews", {
            cache: "no-store"
        }).then((r)=>{
            if (!r.ok) throw new Error();
            return r.json();
        }).then((j)=>{
            setReviews(j.reviews ?? []);
            setError(null);
        }).catch(()=>setError("اتصال به سرور برقرار نشد."));
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReviewsTab.useEffect": ()=>{
            load();
        }
    }["ReviewsTab.useEffect"], []);
    const moderate = async (id, approved)=>{
        try {
            const res = await fetch("/api/admin/reviews", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id,
                    approved
                })
            });
            if (!res.ok) throw new Error();
            setReviews((prev)=>prev?.map((r)=>r.id === id ? {
                        ...r,
                        approved
                    } : r) ?? prev);
            toast({
                title: approved ? "نظر منتشر شد ✓" : "نظر مخفی شد"
            });
        } catch  {
            toast({
                title: "انجام نشد!",
                description: "دوباره تلاش کن."
            });
        }
    };
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-[24px] border-2 border-dashed border-[#F0B7C9] bg-[#FFF7FA] px-6 py-10 text-center text-[14px] font-bold text-[#B02A52]",
            children: error
        }, void 0, false, {
            fileName: "[project]/src/components/shop/screens/admin.tsx",
            lineNumber: 821,
            columnNumber: 7
        }, this);
    }
    if (reviews === null) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-3",
            children: [
                0,
                1
            ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-[90px] animate-pulse rounded-[20px] bg-white/70"
                }, i, false, {
                    fileName: "[project]/src/components/shop/screens/admin.tsx",
                    lineNumber: 830,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/src/components/shop/screens/admin.tsx",
            lineNumber: 828,
            columnNumber: 7
        }, this);
    }
    if (reviews.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center gap-3 rounded-[24px] border-2 border-dashed border-[#99D6EE] bg-white/60 px-6 py-12 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[40px]",
                    children: "💬"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/admin.tsx",
                    lineNumber: 838,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "m-0 text-[14.5px] font-bold",
                    children: "هنوز نظری ثبت نشده."
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/admin.tsx",
                    lineNumber: 839,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/shop/screens/admin.tsx",
            lineNumber: 837,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-3",
        children: reviews.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `rounded-[20px] border bg-white p-4 md:p-5 ${r.approved ? "border-[#CBE9D6]" : "border-[#DDEEF5]"}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center justify-between gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[14px] font-black",
                                children: [
                                    r.who,
                                    " · ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(r.stars),
                                    " ★"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 849,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-full px-3 py-1 text-[11px] font-extrabold",
                                style: {
                                    background: r.approved ? "#D7F5E4" : "#FFF3C9",
                                    color: r.approved ? "#2E7D53" : "#8A6D1F"
                                },
                                children: r.approved ? "منتشرشده" : "در انتظار تأیید"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 852,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 848,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-0 mt-2 text-[13px] font-semibold leading-[1.9] text-[#04202E]",
                        children: r.text
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 859,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex gap-2 border-t border-[#EDF6FA] pt-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>void moderate(r.id, true),
                                className: "h-10 rounded-full bg-[#D7F5E4] px-4 text-[12.5px] font-extrabold text-[#2E7D53] active:scale-95",
                                children: "انتشار"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 861,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>void moderate(r.id, false),
                                className: "h-10 rounded-full bg-[#FFE9F0] px-4 text-[12.5px] font-extrabold text-[#B02A52] active:scale-95",
                                children: "مخفی"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 868,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 860,
                        columnNumber: 11
                    }, this)
                ]
            }, r.id, true, {
                fileName: "[project]/src/components/shop/screens/admin.tsx",
                lineNumber: 847,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/shop/screens/admin.tsx",
        lineNumber: 845,
        columnNumber: 5
    }, this);
}
_s4(ReviewsTab, "IbUEgngCJTihaofnLGsE0mQfDOY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c6 = ReviewsTab;
const EXP_FILTERS = [
    {
        key: "pending",
        label: "در انتظار تأیید"
    },
    {
        key: "published",
        label: "منتشرشده"
    },
    {
        key: "rejected",
        label: "ردشده"
    }
];
function StoriesModTab() {
    _s5();
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("pending");
    const [exps, setExps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const load = (f)=>{
        fetch(`/api/admin/experiences?status=${f}`, {
            cache: "no-store"
        }).then((r)=>{
            if (!r.ok) throw new Error();
            return r.json();
        }).then((j)=>{
            setExps(j.experiences ?? []);
            setError(false);
        }).catch(()=>setError(true));
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StoriesModTab.useEffect": ()=>{
            load(filter);
        }
    }["StoriesModTab.useEffect"], [
        filter
    ]);
    const act = async (e, action)=>{
        // optimistic flip, then refetch the current filter to stay honest
        const optimistic = action === "publish" ? "published" : "rejected";
        setExps((prev)=>prev?.map((x)=>x.id === e.id ? {
                    ...x,
                    status: optimistic
                } : x) ?? prev);
        try {
            const res = await fetch(`/api/admin/experiences/${e.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    action
                })
            });
            if (!res.ok) throw new Error();
            toast({
                title: action === "publish" ? "تجربه منتشر شد ✓" : "تجربه مخفی شد",
                description: `${e.name} — ${action === "publish" ? "الان تو «تجربه مخاطب» می‌بیننش." : "دیگه جایی نمایش داده نمی‌شه."}`
            });
        } catch  {
            toast({
                title: "انجام نشد!",
                description: "دوباره تلاش کن."
            });
        }
        load(filter);
    };
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-[24px] border-2 border-dashed border-[#F0B7C9] bg-[#FFF7FA] px-6 py-10 text-center text-[14px] font-bold text-[#B02A52]",
            children: "اتصال به سرور برقرار نشد."
        }, void 0, false, {
            fileName: "[project]/src/components/shop/screens/admin.tsx",
            lineNumber: 948,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "no-scrollbar flex gap-2 overflow-x-auto",
                children: EXP_FILTERS.map((f)=>{
                    const on = filter === f.key;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-pressed": on,
                        onClick: ()=>setFilter(f.key),
                        className: "h-10 shrink-0 rounded-full px-4 text-[13px] font-bold transition-all",
                        style: {
                            background: on ? "#04202E" : "#fff",
                            border: `1.5px solid ${on ? "#04202E" : "#CFE6EF"}`,
                            color: on ? "#fff" : "#04202E"
                        },
                        children: f.label
                    }, f.key, false, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 961,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/admin.tsx",
                lineNumber: 957,
                columnNumber: 7
            }, this),
            exps === null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3",
                children: [
                    0,
                    1
                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-[110px] animate-pulse rounded-[20px] bg-white/70"
                    }, i, false, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 982,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/admin.tsx",
                lineNumber: 980,
                columnNumber: 9
            }, this) : exps.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-3 rounded-[24px] border-2 border-dashed border-[#99D6EE] bg-white/60 px-6 py-12 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[40px]",
                        children: "🎁"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 987,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "m-0 text-[14.5px] font-bold",
                        children: filter === "pending" ? "صف تجربه‌ها خالیه — همه بررسی شدن!" : "این فیلتر خالیه."
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 988,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/admin.tsx",
                lineNumber: 986,
                columnNumber: 9
            }, this) : exps.map((e)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-[20px] border border-[#DDEEF5] bg-white p-4 md:p-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center justify-between gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[14px] font-black",
                                            children: [
                                                e.name,
                                                e.city ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold text-[#4A6572]",
                                                    children: [
                                                        " · ",
                                                        e.city
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/shop/screens/admin.tsx",
                                                    lineNumber: 999,
                                                    columnNumber: 29
                                                }, this) : null
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/shop/screens/admin.tsx",
                                            lineNumber: 997,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "rounded-full bg-[#FFF3C9] px-2.5 py-0.5 text-[11px] font-extrabold text-[#8A6D1F]",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OCCASIONS"][e.occasion] ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OCCASIONS"][0]
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/admin.tsx",
                                            lineNumber: 1001,
                                            columnNumber: 17
                                        }, this),
                                        e.photoKey && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            title: "با عکس همراه بوده",
                                            children: "📷"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/admin.tsx",
                                            lineNumber: 1004,
                                            columnNumber: 32
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "rounded-full px-3 py-1 text-[11px] font-extrabold",
                                            style: {
                                                background: e.status === "published" ? "#D7F5E4" : e.status === "pending" ? "#FFF3C9" : "#FFE9F0",
                                                color: e.status === "published" ? "#2E7D53" : e.status === "pending" ? "#8A6D1F" : "#B02A52"
                                            },
                                            children: e.status === "published" ? "منتشرشده" : e.status === "pending" ? "در انتظار" : "ردشده"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/admin.tsx",
                                            lineNumber: 1005,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/shop/screens/admin.tsx",
                                    lineNumber: 996,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[11.5px] font-semibold text-[#4A6572]",
                                    children: new Intl.DateTimeFormat("fa-IR", {
                                        dateStyle: "short"
                                    }).format(new Date(e.createdAt))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/admin.tsx",
                                    lineNumber: 1015,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/shop/screens/admin.tsx",
                            lineNumber: 995,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mb-0 mt-2 whitespace-pre-line text-[13px] font-medium leading-[1.95] text-[#1F3E4D]",
                            children: e.body
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/admin.tsx",
                            lineNumber: 1019,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-3 flex flex-wrap gap-2 border-t border-[#EDF6FA] pt-3",
                            children: [
                                (e.status === "pending" || e.status === "rejected") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>void act(e, "publish"),
                                    className: "h-10 rounded-full bg-[#D7F5E4] px-4 text-[12.5px] font-extrabold text-[#2E7D53] active:scale-95",
                                    children: "انتشار"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/admin.tsx",
                                    lineNumber: 1022,
                                    columnNumber: 17
                                }, this),
                                (e.status === "pending" || e.status === "published") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>void act(e, "reject"),
                                    className: "h-10 rounded-full bg-[#FFE9F0] px-4 text-[12.5px] font-extrabold text-[#B02A52] active:scale-95",
                                    children: e.status === "published" ? "لغو انتشار" : "رد"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/admin.tsx",
                                    lineNumber: 1031,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/shop/screens/admin.tsx",
                            lineNumber: 1020,
                            columnNumber: 13
                        }, this)
                    ]
                }, e.id, true, {
                    fileName: "[project]/src/components/shop/screens/admin.tsx",
                    lineNumber: 994,
                    columnNumber: 11
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/admin.tsx",
        lineNumber: 955,
        columnNumber: 5
    }, this);
}
_s5(StoriesModTab, "VHRreMptr/SsoRYGyV4oiaVCmEg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c7 = StoriesModTab;
const SLUG_RE = /^[a-z0-9-]{3,60}$/;
function BlogTab() {
    _s6();
    const [publicPosts, setPublicPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [drafts, setDrafts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]); // posts created/edited this session (id known)
    const [editing, setEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [slug, setSlug] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [excerpt, setExcerpt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [tags, setTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [content, setContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [publish, setPublish] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [err, setErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const load = ()=>{
        fetch("/api/posts", {
            cache: "no-store"
        }).then((r)=>{
            if (!r.ok) throw new Error();
            return r.json();
        }).then((j)=>setPublicPosts(j.posts ?? [])).catch(()=>setPublicPosts([]));
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BlogTab.useEffect": ()=>{
            load();
        }
    }["BlogTab.useEffect"], []);
    const resetForm = ()=>{
        setEditing(null);
        setTitle("");
        setSlug("");
        setExcerpt("");
        setTags("");
        setContent("");
        setPublish(false);
        setErr("");
    };
    const startEdit = (p)=>{
        setEditing(p);
        setTitle(p.title);
        setSlug(p.slug);
        setExcerpt(p.excerpt);
        setTags(p.tags);
        setContent(p.content);
        setPublish(p.published);
        setErr("");
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    const submit = async ()=>{
        if (busy) return;
        setErr("");
        if (title.trim().length < 3) {
            setErr("عنوان حداقل ۳ حرف.");
            return;
        }
        if (content.trim().length < 50) {
            setErr("متن پست حداقل ۵۰ حرف.");
            return;
        }
        if (slug && !SLUG_RE.test(slug)) {
            setErr("اسلاگ فقط حروف کوچک انگلیسی، عدد و خط تیره (۳ تا ۶۰ کاراکتر).");
            return;
        }
        setBusy(true);
        try {
            const payload = {
                title: title.trim(),
                ...slug ? {
                    slug
                } : {},
                excerpt: excerpt.trim(),
                content: content.trim(),
                tags: tags.trim(),
                publish
            };
            const res = await fetch(editing ? `/api/admin/posts/${editing.id}` : "/api/admin/posts", {
                method: editing ? "PATCH" : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            const b = await res.json().catch(()=>({}));
            if (res.status === 409) {
                setErr("این اسلاگ قبلاً استفاده شده — یه اسلاگ دیگه بزن یا خالی بذار.");
                return;
            }
            if (!res.ok || !b.post) {
                setErr("ذخیره نشد — فیلدها رو چک کن (عنوان ≥۳، متن ≥۵۰ حرف).");
                return;
            }
            const saved = {
                id: b.post.id,
                slug: b.post.slug,
                title: title.trim(),
                excerpt: excerpt.trim(),
                tags: tags.trim(),
                content: content.trim(),
                published: b.post.published
            };
            setDrafts((prev)=>{
                const without = prev.filter((d)=>d.id !== saved.id);
                return [
                    saved,
                    ...without
                ];
            });
            toast({
                title: editing ? "پست به‌روز شد ✓" : publish ? "پست منتشر شد ✓" : "پیش‌نویس ذخیره شد ✓",
                description: publish ? `#/post?slug=${saved.slug}` : "وقتی منتشرش کنی تو بلاگ می‌افته."
            });
            resetForm();
            load();
        } catch  {
            setErr("خطای شبکه — دوباره تلاش کن.");
        } finally{
            setBusy(false);
        }
    };
    const togglePublish = async (p)=>{
        try {
            const res = await fetch(`/api/admin/posts/${p.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    publish: !p.published
                })
            });
            const b = await res.json().catch(()=>({}));
            if (!res.ok || !b.post) throw new Error();
            setDrafts((prev)=>prev.map((d)=>d.id === p.id ? {
                        ...d,
                        published: b.post.published
                    } : d));
            toast({
                title: b.post.published ? "پست منتشر شد ✓" : "پست از بلاگ برداشته شد"
            });
            load();
        } catch  {
            toast({
                title: "انجام نشد!",
                description: "دوباره تلاش کن."
            });
        }
    };
    const removePost = async (p)=>{
        if (!window.confirm(`پست «${p.title}» برای همیشه حذف بشه؟`)) return;
        try {
            const res = await fetch(`/api/admin/posts/${p.id}`, {
                method: "DELETE"
            });
            if (!res.ok) {
                toast({
                    title: "حذف نشد!",
                    description: "حذف پست فقط با حساب مالک ممکنه."
                });
                return;
            }
            setDrafts((prev)=>prev.filter((d)=>d.id !== p.id));
            toast({
                title: "پست حذف شد"
            });
            load();
        } catch  {
            toast({
                title: "خطای شبکه",
                description: "دوباره تلاش کن."
            });
        }
    };
    // list = this-session posts (full control) + public posts not shadowed by them
    const rows = [
        ...drafts.map((p)=>({
                kind: "session",
                p
            })),
        ...(publicPosts ?? []).filter((p)=>!drafts.some((d)=>d.slug === p.slug)).map((p)=>({
                kind: "public",
                p
            }))
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-[20px] border border-[#DDEEF5] bg-white p-4 md:p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center justify-between gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "m-0 text-[16px] font-black",
                                children: editing ? "ویرایش پست" : "پست جدید"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 1238,
                                columnNumber: 11
                            }, this),
                            editing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: resetForm,
                                className: "text-[12.5px] font-extrabold text-[#00779F] underline",
                                children: "لغو ویرایش"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 1240,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 1237,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 grid gap-3 md:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: title,
                                onChange: (e)=>setTitle(e.target.value.slice(0, 120)),
                                placeholder: "عنوان پست (حداقل ۳ حرف)",
                                "aria-label": "عنوان پست",
                                className: "h-11 rounded-[14px] border-[1.5px] border-[#CFE6EF] bg-white px-3.5 text-[14px] font-semibold text-[#04202E] outline-none focus:border-[#00ABE7]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 1246,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                dir: "ltr",
                                value: slug,
                                onChange: (e)=>setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-").slice(0, 60)),
                                placeholder: "slug — خالی بذار: از روی عنوان ساخته می‌شه",
                                "aria-label": "اسلاگ پست",
                                className: "h-11 rounded-[14px] border-[1.5px] border-[#CFE6EF] bg-white px-3.5 text-left font-mono text-[13px] text-[#04202E] outline-none focus:border-[#00ABE7]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 1254,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: excerpt,
                                onChange: (e)=>setExcerpt(e.target.value.slice(0, 300)),
                                placeholder: "خلاصه (اختیاری — تو کارت بلاگ نمایش داده می‌شه)",
                                "aria-label": "خلاصه پست",
                                className: "h-11 rounded-[14px] border-[1.5px] border-[#CFE6EF] bg-white px-3.5 text-[14px] font-semibold text-[#04202E] outline-none focus:border-[#00ABE7]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 1263,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: tags,
                                onChange: (e)=>setTags(e.target.value.slice(0, 120)),
                                placeholder: "تگ‌ها با ویرگول: هدیه، یلدا",
                                "aria-label": "تگ‌های پست",
                                className: "h-11 rounded-[14px] border-[1.5px] border-[#CFE6EF] bg-white px-3.5 text-[14px] font-semibold text-[#04202E] outline-none focus:border-[#00ABE7]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 1271,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 1245,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        value: content,
                        onChange: (e)=>setContent(e.target.value.slice(0, 20_000)),
                        rows: 10,
                        placeholder: "متن پست (حداقل ۵۰ حرف)…",
                        "aria-label": "متن پست",
                        className: "mt-3 w-full resize-y rounded-[14px] border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3.5 py-3 font-mono text-[13px] leading-[2] text-[#04202E] outline-none focus:border-[#00ABE7]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 1280,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1.5 flex flex-wrap items-center justify-between gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11.5px] font-semibold text-[#4A6572]",
                                children: "مارک‌داون ساده: # تیتر · **پررنگ** · *کج* · - لیست · [متن](https://لینک)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 1289,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11.5px] font-extrabold text-[#4A6572]",
                                dir: "ltr",
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(content.trim().length),
                                    " / ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(20_000)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 1292,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 1288,
                        columnNumber: 9
                    }, this),
                    err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mt-2 block text-[12.5px] font-bold text-[#B02A52]",
                        children: err
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 1296,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex flex-wrap items-center gap-3 border-t border-[#EDF6FA] pt-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex cursor-pointer items-center gap-2 text-[13px] font-extrabold text-[#04202E]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: publish,
                                        onChange: (e)=>setPublish(e.target.checked),
                                        className: "h-5 w-5 accent-[#00ABE7]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                                        lineNumber: 1299,
                                        columnNumber: 13
                                    }, this),
                                    "انتشار در بلاگ"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 1298,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>void submit(),
                                disabled: busy,
                                className: "flex h-11 flex-1 items-center justify-center rounded-full bg-[#04202E] px-6 text-[13.5px] font-extrabold text-white transition-transform active:scale-95 disabled:opacity-60 md:flex-none",
                                children: busy ? "در حال ذخیره…" : editing ? "ذخیره‌ی تغییرات" : "ذخیره‌ی پست"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 1307,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 1297,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/admin.tsx",
                lineNumber: 1236,
                columnNumber: 7
            }, this),
            publicPosts === null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-[120px] animate-pulse rounded-[20px] bg-white/70"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/admin.tsx",
                lineNumber: 1320,
                columnNumber: 9
            }, this) : rows.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-3 rounded-[24px] border-2 border-dashed border-[#99D6EE] bg-white/60 px-6 py-12 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[40px]",
                        children: "✍️"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 1323,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "m-0 text-[14.5px] font-bold",
                        children: "هنوز پستی نیست — اولین پست رو از فرم بالا بنویس."
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 1324,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/admin.tsx",
                lineNumber: 1322,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3",
                children: rows.map((row)=>row.kind === "session" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-[20px] border border-[#DDEEF5] bg-white p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center justify-between gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[14.5px] font-black",
                                        children: row.p.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                                        lineNumber: 1332,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "rounded-full px-3 py-1 text-[11px] font-extrabold",
                                                style: {
                                                    background: row.p.published ? "#D7F5E4" : "#FFF3C9",
                                                    color: row.p.published ? "#2E7D53" : "#8A6D1F"
                                                },
                                                children: row.p.published ? "منتشرشده" : "پیش‌نویس"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                                lineNumber: 1334,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "rounded-[10px] bg-[#F2F7F9] px-2 py-0.5 font-mono text-[10.5px] text-[#4A6572]",
                                                dir: "ltr",
                                                children: row.p.slug
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                                lineNumber: 1340,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                                        lineNumber: 1333,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 1331,
                                columnNumber: 17
                            }, this),
                            row.p.excerpt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-0 mt-1.5 text-[12.5px] font-medium leading-[1.9] text-[#4A6572]",
                                children: row.p.excerpt
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 1346,
                                columnNumber: 19
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 flex flex-wrap gap-2 border-t border-[#EDF6FA] pt-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>startEdit(row.p),
                                        className: "h-10 rounded-full bg-[#E3F6FD] px-4 text-[12.5px] font-extrabold text-[#006387] active:scale-95",
                                        children: "ویرایش"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                                        lineNumber: 1349,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>void togglePublish(row.p),
                                        className: "h-10 rounded-full bg-[#D7F5E4] px-4 text-[12.5px] font-extrabold text-[#2E7D53] active:scale-95",
                                        children: row.p.published ? "لغو انتشار" : "انتشار"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                                        lineNumber: 1356,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>void removePost(row.p),
                                        className: "h-10 rounded-full bg-[#FFE9F0] px-4 text-[12.5px] font-extrabold text-[#B02A52] active:scale-95",
                                        children: "حذف"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                                        lineNumber: 1363,
                                        columnNumber: 19
                                    }, this),
                                    row.p.published && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("post", {
                                                slug: row.p.slug
                                            }),
                                        className: "h-10 rounded-full px-3 text-[12.5px] font-extrabold text-[#00779F] underline",
                                        children: "دیدن در بلاگ ↗"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                                        lineNumber: 1371,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 1348,
                                columnNumber: 17
                            }, this)
                        ]
                    }, `s-${row.p.id}`, true, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 1330,
                        columnNumber: 15
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-[20px] border border-[#DDEEF5] bg-white p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center justify-between gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[14.5px] font-black",
                                        children: row.p.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                                        lineNumber: 1384,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "rounded-full bg-[#D7F5E4] px-3 py-1 text-[11px] font-extrabold text-[#2E7D53]",
                                                children: "منتشرشده"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                                lineNumber: 1386,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11.5px] font-semibold text-[#4A6572]",
                                                children: new Intl.DateTimeFormat("fa-IR", {
                                                    dateStyle: "medium"
                                                }).format(new Date(row.p.publishedAt))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                                lineNumber: 1387,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                                        lineNumber: 1385,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 1383,
                                columnNumber: 17
                            }, this),
                            row.p.excerpt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-0 mt-1.5 text-[12.5px] font-medium leading-[1.9] text-[#4A6572]",
                                children: row.p.excerpt
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 1393,
                                columnNumber: 19
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 border-t border-[#EDF6FA] pt-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("post", {
                                            slug: row.p.slug
                                        }),
                                    className: "h-10 rounded-full bg-[#E3F6FD] px-4 text-[12.5px] font-extrabold text-[#006387] active:scale-95",
                                    children: "دیدن در بلاگ ↗"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/admin.tsx",
                                    lineNumber: 1396,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/admin.tsx",
                                lineNumber: 1395,
                                columnNumber: 17
                            }, this)
                        ]
                    }, `p-${row.p.slug}`, true, {
                        fileName: "[project]/src/components/shop/screens/admin.tsx",
                        lineNumber: 1382,
                        columnNumber: 15
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/admin.tsx",
                lineNumber: 1327,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/admin.tsx",
        lineNumber: 1234,
        columnNumber: 5
    }, this);
}
_s6(BlogTab, "oRdjVFu0JXXMmQTnglq/VXOYWDE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c8 = BlogTab;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "AdminOtpGate");
__turbopack_context__.k.register(_c1, "StatusChip");
__turbopack_context__.k.register(_c2, "StatCard");
__turbopack_context__.k.register(_c3, "AdminScreen");
__turbopack_context__.k.register(_c4, "OrdersTab");
__turbopack_context__.k.register(_c5, "PaymentsTab");
__turbopack_context__.k.register(_c6, "ReviewsTab");
__turbopack_context__.k.register(_c7, "StoriesModTab");
__turbopack_context__.k.register(_c8, "BlogTab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_shop_screens_admin_tsx_db1ad3ee._.js.map