(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/shop/screens/track.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DesktopTrack",
    ()=>DesktopTrack,
    "DownloadGiftButton",
    ()=>DownloadGiftButton,
    "MobileTrack",
    ()=>MobileTrack
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// ═══ رهگیری هدیه — order journey timeline (mobile + desktop) ═══
// Entry: click any order card in «هدیه‌هام» → selectOrder(id) → navigate("track")
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hash-route.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$nav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/nav.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/plush.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/icons.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pishnam-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pishnam-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/fa.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$gift$2d$card$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/gift-card.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2f$order$2d$view$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/orders/order-view.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$manual$2d$payment$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/manual-payment.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$dashboards$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/screens/dashboards.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
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
/* ── local helpers ── */ const NEXT_LABEL = {
    paid: "بسته‌بندی",
    packing: "تحویل به پست",
    shipped: "تحویل به دوستت",
    delivered: ""
};
/** Honest one-liner for v2 orders outside the classic 4-step journey. */ function bannerNote(status2) {
    switch(status2){
        case "awaiting_payment":
            return "هدیه‌ت ساخته شده و ۱۰ دقیقه برات رزرو شده؛ پرداخت که تموم شد، جعبه‌چینی شروع می‌شه.";
        case "payment_under_review":
            return "رسیدت رسید و تو نوبت بررسیه؛ تا ۱۲ ساعت نتیجه رو پیامک می‌کنیم.";
        case "failed":
            return "پرداخت این سفارش ناتموم موند. اگه مبلغ کم شده با پشتیبانی در تماس باش.";
        case "cancelled":
            return "این سفارش لغو شده؛ اگه فکر می‌کنی اشتباهه با ما در تماس باش.";
        case "expired":
            return "مهلت ۱۰ دقیقه‌ای رزرو تموم شد و موجودی آزاد شد؛ می‌تونی یه هدیه‌ی تازه بسازی.";
        default:
            return "وضعیت سفارش به‌روزه.";
    }
}
function who(o) {
    return o.dir === "sent" ? `برای ${o.to}` : `از ${o.senderName || "یه دوست ناشناس"}`;
}
function extras(o) {
    const parts = [];
    if (o.anonymous) parts.push("ناشناس");
    if (o.hearts > 0) parts.push(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(o.hearts)} قلب`);
    if (o.paws > 0) parts.push(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(o.paws)} پنجه`);
    return parts.length ? parts.join(" · ") : "بدون آپشن";
}
function stepNote(i, current, o) {
    if (i < current) return `${o.date} · انجام شد ✓`;
    if (i === current) return o.dir === "recv" ? "الان همین‌جا" : "الان اینجاییم";
    return "هنوز نه";
}
async function copyText(text) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        }
    } catch  {
    /* fall through to legacy path */ }
    try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.top = "0";
        ta.style.left = "0";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        const sel = document.getSelection();
        const saved = sel && sel.rangeCount > 0 ? sel.getRangeAt(0) : null;
        ta.select();
        ta.setSelectionRange(0, text.length);
        const ok = document.execCommand("copy");
        if (saved && sel) {
            sel.removeAllRanges();
            sel.addRange(saved);
        }
        document.body.removeChild(ta);
        return ok;
    } catch  {
        return false;
    }
}
function PlushTile({ o, size, box }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-giftcard-plush": true,
        className: "flex shrink-0 items-center justify-center rounded-[22px]",
        style: {
            width: box,
            height: box,
            background: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLUSH_MAP"][o.kind].bg
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plush"], {
            kind: o.kind,
            size: size
        }, void 0, false, {
            fileName: "[project]/src/components/shop/screens/track.tsx",
            lineNumber: 111,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/shop/screens/track.tsx",
        lineNumber: 106,
        columnNumber: 5
    }, this);
}
_c = PlushTile;
/* ── timeline row (shared visual language, mobile & desktop use it) ── */ function TimelineRow({ i, current, o, big = false }) {
    const done = i < current;
    const isNow = i === current;
    const dot = big ? 46 : 40;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        className: "relative flex gap-4 pb-6 last:pb-0",
        children: [
            i < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRACK_STEPS"].length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": true,
                className: "absolute w-[2px] rounded",
                style: {
                    insetInlineStart: dot / 2 - 1,
                    top: dot,
                    bottom: -2,
                    background: done ? "#00ABE7" : "repeating-linear-gradient(to bottom, #BFE4F2 0 5px, transparent 5px 10px)"
                }
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/track.tsx",
                lineNumber: 135,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `relative z-10 flex shrink-0 items-center justify-center rounded-full border-2 ${done ? "border-[#00ABE7] bg-[#00ABE7] text-white" : isNow ? "border-[#00ABE7] bg-white text-[#00ABE7] pishnam-pulse-ring" : "border-dashed border-[#9CC9DA] bg-white text-[#4A6572]"}`,
                style: {
                    width: dot,
                    height: dot
                },
                children: done ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CheckIcon"], {
                    size: 18,
                    stroke: "#fff"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/track.tsx",
                    lineNumber: 160,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `font-black ${big ? "text-[17px]" : "text-[15px]"}`,
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(i + 1)
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/track.tsx",
                    lineNumber: 162,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/track.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex min-w-0 flex-1 flex-col gap-1 pt-0.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center justify-between gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `font-extrabold ${big ? "text-[17px]" : "text-[15.5px]"} ${isNow ? "text-[#00779F]" : ""}`,
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRACK_STEPS"][i].label
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/track.tsx",
                                lineNumber: 168,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `rounded-[10px] px-2 py-[3px] text-[11px] font-bold ${done ? "bg-[#D7F5E4] text-[#04202E]" : isNow ? "bg-[#E3F6FD] text-[#006387]" : "bg-[#F2F7F9] text-[#4A6572]"}`,
                                children: stepNote(i, current, o)
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/track.tsx",
                                lineNumber: 171,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/track.tsx",
                        lineNumber: 167,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "m-0 text-[13px] font-medium leading-[1.85] text-[#4A6572]",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRACK_STEPS"][i].body
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/track.tsx",
                        lineNumber: 179,
                        columnNumber: 9
                    }, this),
                    isNow && o.status === "shipped" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mt-1 w-fit rounded-[10px] bg-[#CDEFFB] px-2.5 py-1 text-[11.5px] font-bold text-[#04202E]",
                        children: [
                            "پست: کد رهگیری ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(912),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(34),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(56),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(78),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(90)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/track.tsx",
                        lineNumber: 181,
                        columnNumber: 11
                    }, this),
                    isNow && o.status === "delivered" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mt-1 w-fit rounded-[10px] bg-[#D7F5E4] px-2.5 py-1 text-[11.5px] font-bold text-[#04202E]",
                        children: o.dir === "recv" ? "رمز کارت رو بزن و پیامت رو ببین!" : o.password ? `رمز کارت: ${o.password}` : ""
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/track.tsx",
                        lineNumber: 186,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/track.tsx",
                lineNumber: 166,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/track.tsx",
        lineNumber: 132,
        columnNumber: 5
    }, this);
}
_c1 = TimelineRow;
/* ── order info card (shared) ── */ function InfoRow({ k, v, dir = "rtl" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-start justify-between gap-3 border-b border-[#EDF6FA] py-2.5 last:border-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "shrink-0 text-[12.5px] font-semibold text-[#4A6572]",
                children: k
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/track.tsx",
                lineNumber: 199,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-left text-[13px] font-bold",
                dir: dir,
                children: v
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/track.tsx",
                lineNumber: 200,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/track.tsx",
        lineNumber: 198,
        columnNumber: 5
    }, this);
}
_c2 = InfoRow;
function PostcardCard({ o, compact = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-[24px] border border-[#DDEEF5] bg-white p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[15px] font-extrabold",
                        children: "کارت پستالت"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/track.tsx",
                        lineNumber: 211,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QrCode"], {
                        size: 34
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/track.tsx",
                        lineNumber: 212,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/track.tsx",
                lineNumber: 210,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: `m-0 rounded-[16px] bg-[#F2FAFD] p-3.5 text-[13.5px] font-medium leading-[2] text-[#1F3E4D] ${compact ? "line-clamp-3" : ""}`,
                children: o.message || "پیامی نوشته نشده بود."
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/track.tsx",
                lineNumber: 214,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex flex-wrap gap-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full bg-[#E3F6FD] px-3 py-1 text-[12px] font-bold text-[#006387]",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OCCASIONS"][o.occasion] ?? "همین‌طوری"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/track.tsx",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full bg-[#04202E] px-3 py-1 text-[12px] font-extrabold text-white",
                        children: [
                            "رمز: ",
                            o.password || "—"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/track.tsx",
                        lineNumber: 225,
                        columnNumber: 9
                    }, this),
                    o.anonymous && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full bg-[#FFE0EA] px-3 py-1 text-[12px] font-bold text-[#B02A52]",
                        children: "ناشناس"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/track.tsx",
                        lineNumber: 229,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/track.tsx",
                lineNumber: 221,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/track.tsx",
        lineNumber: 209,
        columnNumber: 5
    }, this);
}
_c3 = PostcardCard;
function EmptyTrack() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-5 rounded-[28px] border-2 border-dashed border-[#99D6EE] bg-white/60 px-6 py-14 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[44px]",
                        children: "📦"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/track.tsx",
                        lineNumber: 240,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "m-0 text-[15.5px] font-bold leading-[2]",
                        children: [
                            "هنوز هدیه‌ای برای رهگیری انتخاب نشده.",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/track.tsx",
                                lineNumber: 243,
                                columnNumber: 11
                            }, this),
                            "از «هدیه‌هام» یه سفارش رو انتخاب کن."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/track.tsx",
                        lineNumber: 241,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("my-gifts"),
                        className: "flex h-12 items-center gap-2 rounded-full bg-[#00ABE7] px-6 text-[14.5px] font-extrabold text-[#04202E] transition-transform active:scale-95",
                        children: [
                            "رفتن به هدیه‌هام",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ForwardIcon"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/track.tsx",
                                lineNumber: 252,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/track.tsx",
                        lineNumber: 246,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/track.tsx",
                lineNumber: 239,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TrackByCode, {}, void 0, false, {
                fileName: "[project]/src/components/shop/screens/track.tsx",
                lineNumber: 255,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/track.tsx",
        lineNumber: 238,
        columnNumber: 5
    }, this);
}
_c4 = EmptyTrack;
function TrackByCode() {
    _s();
    const [code, setCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [phone, setPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hit, setHit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [err, setErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const faDigits = (s)=>s.replace(/\d/g, (d)=>"۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
    const lookup = async ()=>{
        setBusy(true);
        setErr("");
        setHit(null);
        try {
            const res = await fetch("/api/track", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    code: code.trim(),
                    phone
                })
            });
            if (!res.ok) {
                setErr(res.status === 404 ? "با این کد و شماره، سفارشی پیدا نشد." : "یه مشکلی پیش اومد؛ دوباره امتحان کن.");
                return;
            }
            const body = await res.json();
            const stepBody = STEP_FA_SUB[body.status] ?? "وضعیت سفارش به‌روزه.";
            setHit({
                code: body.code,
                status: body.status,
                stepLabel: body.stepLabel,
                stepBody
            });
            toast({
                title: "سفارش پیدا شد ✓"
            });
        } catch  {
            setErr("اینترنت قطعه؛ اتصالت رو چک کن.");
        } finally{
            setBusy(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-[28px] border border-[#DDEEF5] bg-white px-6 py-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[16px] font-extrabold",
                children: "رهگیری با کد سفارش"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/track.tsx",
                lineNumber: 305,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-4 mt-1.5 text-[12.5px] font-medium leading-[1.9] text-[#4A6572]",
                children: "کد PN از صفحه‌ی موفقیت یا پیامکت رو با شماره‌ی موبایلت وارد کن."
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/track.tsx",
                lineNumber: 306,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-end gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex min-w-[200px] flex-1 flex-col gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[12px] font-bold text-[#4A6572]",
                                children: "کد سفارش"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/track.tsx",
                                lineNumber: 311,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: code,
                                onChange: (e)=>setCode(e.target.value),
                                placeholder: "PN-251213-0007",
                                dir: "ltr",
                                className: "h-12 rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-4 text-[15px] font-bold text-[#04202E] outline-none focus:border-[#00ABE7]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/track.tsx",
                                lineNumber: 312,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/track.tsx",
                        lineNumber: 310,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex min-w-[200px] flex-1 flex-col gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[12px] font-bold text-[#4A6572]",
                                children: "شماره‌ی موبایل"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/track.tsx",
                                lineNumber: 321,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: phone,
                                onChange: (e)=>setPhone(e.target.value),
                                placeholder: "۰۹۱۲ ۱۲۳ ۴۵۶۷",
                                inputMode: "tel",
                                className: "h-12 rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-4 text-[15px] font-bold text-[#04202E] outline-none focus:border-[#00ABE7]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/track.tsx",
                                lineNumber: 322,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/track.tsx",
                        lineNumber: 320,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        disabled: busy || code.trim().length < 8 || phone.trim().length < 8,
                        onClick: ()=>void lookup(),
                        className: "h-12 rounded-full bg-[#04202E] px-7 text-[14.5px] font-extrabold text-white transition-transform active:scale-95 disabled:opacity-50",
                        children: busy ? "در حال جست‌وجو…" : "جست‌وجو"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/track.tsx",
                        lineNumber: 330,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/track.tsx",
                lineNumber: 309,
                columnNumber: 7
            }, this),
            err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 rounded-2xl bg-[#FFE9F0] px-4 py-3 text-[13px] font-bold text-[#B02A52]",
                children: err
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/track.tsx",
                lineNumber: 340,
                columnNumber: 9
            }, this),
            hit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#E3F6FD] px-4 py-3.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[13px] font-black",
                                dir: "ltr",
                                children: faDigits(hit.code)
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/track.tsx",
                                lineNumber: 345,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[12.5px] font-medium leading-[1.8] text-[#4A6572]",
                                children: hit.stepBody
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/track.tsx",
                                lineNumber: 346,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/track.tsx",
                        lineNumber: 344,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full bg-[#04202E] px-4 py-1.5 text-[12.5px] font-extrabold text-white",
                        children: hit.stepLabel
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/track.tsx",
                        lineNumber: 348,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/track.tsx",
                lineNumber: 343,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/track.tsx",
        lineNumber: 304,
        columnNumber: 5
    }, this);
}
_s(TrackByCode, "O+WwOsV/EVXztWGrqis6LKg2nXo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c5 = TrackByCode;
const STEP_FA_SUB = {
    awaiting_payment: "سفارش منتظر پرداخته.",
    payment_under_review: "رسید ثبت شده و در حال بررسیه.",
    paid: "پرداخت تأیید شد؛ به‌زودی بسته‌بندی می‌شه.",
    preparing: "جعبه داره با دلسوزی بسته‌بندی می‌شه.",
    shipped: "جعبه تحویل پست شده و در راهه.",
    delivered: "جعبه تحویل داده شد؛ نوبت رمز کارته!",
    failed: "پرداخت ناموفق بوده؛ می‌تونی دوباره امتحان کنی.",
    cancelled: "این سفارش لغو شده.",
    expired: "این سفارش منقضی شده.",
    refund_requested: "درخواست مرجوعیت در جریانه.",
    refunded: "مرجوعیت انجام شد."
};
/* ── share/copy gift info button (shared logic, two looks) + success micro-burst ── */ const BURST_COLORS = [
    "#F0426B",
    "#00ABE7",
    "#FFF3C9",
    "#66CDF1",
    "#FFE0EA"
];
function CopyGiftButton({ o, dark = false }) {
    _s1();
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [burst, setBurst] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: async ()=>{
            const link = `${window.location.origin}/#/gift`;
            const text = `یه بغل از یک دوست ♥\nهدیه‌ی شماره‌ی ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(o.no)} برای ${o.to}${o.password ? `\nرمز کارت: ${o.password}` : ""}\n${link}`;
            const ok = await copyText(text);
            if (ok) setBurst((n)=>n + 1);
            toast(ok ? {
                title: "کپی شد ✓",
                description: "اطلاعات هدیه تو حافظه‌ست؛ براش بفرستش."
            } : {
                title: "کپی نشد؛ دستی بردار:",
                description: `هدیه‌ی ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(o.no)} برای ${o.to} · رمز: ${o.password || "بهار"}`
            });
        },
        className: `relative flex h-[52px] w-full items-center justify-center gap-2 overflow-visible rounded-full text-[14.5px] font-extrabold transition-transform active:scale-95 md:h-[54px] md:text-[15px] md:active:scale-100 md:hover:scale-[1.02] ${dark ? "border-2 border-[#04202E] text-[#04202E]" : "border-2 border-dashed border-[#9CC9DA] bg-white text-[#006387]"}`,
        children: [
            burst > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": "true",
                className: "pointer-events-none absolute inset-0",
                children: Array.from({
                    length: 12
                }).map((_, i)=>{
                    const ang = i / 12 * Math.PI * 2 + Math.random() * 0.4;
                    const dist = 34 + Math.random() * 30;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "pishnam-burst-piece block",
                        style: {
                            "--bx": `${Math.cos(ang) * dist}px`,
                            "--by": `${Math.sin(ang) * dist - 12}px`,
                            "--br": `${(Math.random() * 2 - 1) * 220}deg`,
                            width: i % 3 === 0 ? 9 : 6,
                            height: i % 3 === 0 ? 9 : 11,
                            borderRadius: i % 4 === 0 ? "50%" : 2.5,
                            background: BURST_COLORS[i % BURST_COLORS.length],
                            animationDelay: `${i % 4 * 0.04}s`
                        }
                    }, i, false, {
                        fileName: "[project]/src/components/shop/screens/track.tsx",
                        lineNumber: 403,
                        columnNumber: 15
                    }, this);
                })
            }, burst, false, {
                fileName: "[project]/src/components/shop/screens/track.tsx",
                lineNumber: 398,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: "17",
                height: "17",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2.2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "9",
                        y: "9",
                        width: "12",
                        height: "12",
                        rx: "2.5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/track.tsx",
                        lineNumber: 424,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/track.tsx",
                        lineNumber: 425,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/track.tsx",
                lineNumber: 423,
                columnNumber: 7
            }, this),
            "کپی اطلاعات هدیه"
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/track.tsx",
        lineNumber: 377,
        columnNumber: 5
    }, this);
}
_s1(CopyGiftButton, "blSn5M4nqBK7ex/nfJfyIoY3T3g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c6 = CopyGiftButton;
function DownloadGiftButton({ o, dark = false }) {
    _s2();
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        disabled: busy,
        onClick: async ()=>{
            if (busy) return;
            setBusy(true);
            const svg = document.querySelector("[data-giftcard-plush] svg");
            const ok = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$gift$2d$card$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["downloadGiftCard"])(o, svg);
            setBusy(false);
            toast(ok ? {
                title: "کارت هدیه ساخته شد 🖼",
                description: "عکس کارت دانلود شد؛ می‌تونی براش بفرستیش."
            } : {
                title: "ساختن کارت ممکن نشد",
                description: "مرورگرت اجازه‌ی دانلود نداد؛ دوباره امتحان کن."
            });
        },
        className: `relative flex h-[52px] w-full items-center justify-center gap-2 rounded-full text-[14.5px] font-extrabold transition-transform active:scale-95 disabled:opacity-60 md:h-[54px] md:text-[15px] md:active:scale-100 md:hover:scale-[1.02] ${dark ? "border-2 border-[#04202E] text-[#04202E]" : "border-2 border-dashed border-[#F0B7C9] bg-white text-[#B02A52]"}`,
        children: [
            busy ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": true,
                className: "h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/track.tsx",
                lineNumber: 458,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: "17",
                height: "17",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2.2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/track.tsx",
                        lineNumber: 464,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M7 10l5 5 5-5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/track.tsx",
                        lineNumber: 465,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M12 15V3"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/track.tsx",
                        lineNumber: 466,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/track.tsx",
                lineNumber: 463,
                columnNumber: 9
            }, this),
            busy ? "در حال ساختن کارت…" : "دانلود کارت هدیه (PNG)"
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/track.tsx",
        lineNumber: 438,
        columnNumber: 5
    }, this);
}
_s2(DownloadGiftButton, "bzDxL70b80WnAbOeQnBX69QQYZ8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c7 = DownloadGiftButton;
function MobileTrack() {
    _s3();
    const o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelectedOrder"])();
    const advanceStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileTrack.usePishnam[advanceStatus]": (s)=>s.advanceStatus
    }["MobileTrack.usePishnam[advanceStatus]"]);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const hold = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$dashboards$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHold"])(o);
    const chip = o ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2f$order$2d$view$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderChip"])(o) : null;
    const onJourney = o ? !o.v2 || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2f$order$2d$view$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isOnJourney"])(o) : true;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen flex-col bg-[#F2FAFD] md:hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$nav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MobileTopBar"], {
                title: "رهگیری هدیه",
                back: "my-gifts"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/track.tsx",
                lineNumber: 485,
                columnNumber: 7
            }, this),
            !o ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-5 py-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyTrack, {}, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/track.tsx",
                    lineNumber: 488,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/track.tsx",
                lineNumber: 487,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-5 pb-1 pt-[18px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlushTile, {
                                        o: o,
                                        size: 64,
                                        box: 76
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/track.tsx",
                                        lineNumber: 495,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex min-w-0 flex-1 flex-col gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                        className: "m-0 truncate text-[24px] font-black leading-[1.4]",
                                                        children: who(o)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/shop/screens/track.tsx",
                                                        lineNumber: 498,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "shrink-0 rounded-[12px] bg-[#04202E] px-2.5 py-[3px] text-[12px] font-extrabold text-white",
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(o.no)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/shop/screens/track.tsx",
                                                        lineNumber: 499,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/shop/screens/track.tsx",
                                                lineNumber: 497,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "rounded-[10px] px-2.5 py-1 text-[12px] font-bold",
                                                        style: {
                                                            background: chip?.bg,
                                                            color: chip?.fg ?? undefined
                                                        },
                                                        children: chip?.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/shop/screens/track.tsx",
                                                        lineNumber: 504,
                                                        columnNumber: 19
                                                    }, this),
                                                    o.v2 && o.status2 === "awaiting_payment" && hold.expiresAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$manual$2d$payment$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CountdownBadge"], {
                                                        expiresAt: hold.expiresAt
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/shop/screens/track.tsx",
                                                        lineNumber: 511,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[12.5px] font-medium text-[#4A6572]",
                                                        children: o.date
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/shop/screens/track.tsx",
                                                        lineNumber: 513,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/shop/screens/track.tsx",
                                                lineNumber: 503,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/track.tsx",
                                        lineNumber: 496,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/track.tsx",
                                lineNumber: 494,
                                columnNumber: 13
                            }, this),
                            onJourney && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-[10px] flex-1 overflow-hidden rounded-full bg-[#E1EFF5]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-full rounded-full bg-[#00ABE7] transition-[width] duration-700 ease-out",
                                            style: {
                                                width: `${((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["statusToStep"])(o.status) + 1) / 4 * 100}%`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/track.tsx",
                                            lineNumber: 521,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/track.tsx",
                                        lineNumber: 520,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "shrink-0 text-[12px] font-extrabold text-[#006387]",
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["statusToStep"])(o.status) + 1),
                                            " از ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(4),
                                            " قدم"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/track.tsx",
                                        lineNumber: 526,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/track.tsx",
                                lineNumber: 519,
                                columnNumber: 13
                            }, this),
                            !onJourney && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 flex flex-col gap-2 rounded-[20px] border border-[#F2E3A0] bg-[#FFFBEC] px-4 py-3.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[13.5px] font-extrabold text-[#04202E]",
                                        children: bannerNote(o.status2)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/track.tsx",
                                        lineNumber: 534,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$dashboards$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PaymentBlock"], {
                                        o: o
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/track.tsx",
                                        lineNumber: 535,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/track.tsx",
                                lineNumber: 533,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/track.tsx",
                        lineNumber: 493,
                        columnNumber: 11
                    }, this),
                    onJourney && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 px-5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-[24px] border border-[#DDEEF5] bg-white p-5",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                                className: "m-0 list-none p-0",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRACK_STEPS"].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TimelineRow, {
                                        i: i,
                                        current: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["statusToStep"])(o.status),
                                        o: o
                                    }, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRACK_STEPS"][i].key, false, {
                                        fileName: "[project]/src/components/shop/screens/track.tsx",
                                        lineNumber: 546,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/track.tsx",
                                lineNumber: 544,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/track.tsx",
                            lineNumber: 543,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/track.tsx",
                        lineNumber: 542,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 px-5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-[24px] border border-[#DDEEF5] bg-white px-5 py-2.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                    k: "گیرنده",
                                    v: o.dir === "sent" ? o.to : "تو"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/track.tsx",
                                    lineNumber: 556,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                    k: "شهر",
                                    v: o.city
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/track.tsx",
                                    lineNumber: 557,
                                    columnNumber: 15
                                }, this),
                                o.address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                    k: "آدرس",
                                    v: o.address
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/track.tsx",
                                    lineNumber: 558,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                    k: "قلب و پنجه",
                                    v: extras(o)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/track.tsx",
                                    lineNumber: 559,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                    k: "مبلغ پرداختی",
                                    v: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["faPrice"])(o.total)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/track.tsx",
                                    lineNumber: 560,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/shop/screens/track.tsx",
                            lineNumber: 555,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/track.tsx",
                        lineNumber: 554,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 px-5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PostcardCard, {
                            o: o,
                            compact: true
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/track.tsx",
                            lineNumber: 566,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/track.tsx",
                        lineNumber: 565,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sticky bottom-[var(--pn-mnav-h)] mt-auto flex flex-col gap-2.5 border-t border-[#D3E8F0] bg-white/95 px-5 pb-[max(14px,env(safe-area-inset-bottom))] pt-3.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    o.dir === "recv" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("gift"),
                                        className: "flex h-[52px] flex-1 items-center justify-center gap-1.5 rounded-full bg-[#E3F6FD] text-[14.5px] font-extrabold text-[#006387] transition-transform active:scale-95",
                                        children: [
                                            "مشاهده‌ی پیام",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ForwardIcon"], {
                                                size: 16,
                                                stroke: "#006387"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/track.tsx",
                                                lineNumber: 579,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/track.tsx",
                                        lineNumber: 573,
                                        columnNumber: 17
                                    }, this),
                                    o.dir === "sent" && !o.v2 && o.status !== "delivered" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>{
                                            advanceStatus(o.id);
                                            toast({
                                                title: "یه قدم جلوتر رفت! 🚚",
                                                description: "مسیر هدیه به‌روز شد."
                                            });
                                        },
                                        className: "flex h-[52px] flex-1 items-center justify-center gap-1.5 rounded-full bg-[#00ABE7] text-[14.5px] font-extrabold text-[#04202E] transition-transform active:scale-95",
                                        children: [
                                            "قدم بعدی: ",
                                            NEXT_LABEL[o.status],
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ForwardIcon"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/track.tsx",
                                                lineNumber: 592,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/track.tsx",
                                        lineNumber: 583,
                                        columnNumber: 17
                                    }, this),
                                    o.dir === "sent" && o.status === "delivered" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("pick"),
                                        className: "flex h-[52px] flex-1 items-center justify-center gap-1.5 rounded-full bg-[#00ABE7] text-[14.5px] font-extrabold text-[#04202E] transition-transform active:scale-95",
                                        children: [
                                            "یه بغل دیگه بفرست",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ForwardIcon"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/track.tsx",
                                                lineNumber: 602,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/track.tsx",
                                        lineNumber: 596,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/track.tsx",
                                lineNumber: 571,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CopyGiftButton, {
                                        o: o
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/track.tsx",
                                        lineNumber: 607,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DownloadGiftButton, {
                                        o: o
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/track.tsx",
                                        lineNumber: 608,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/track.tsx",
                                lineNumber: 606,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/track.tsx",
                        lineNumber: 570,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/track.tsx",
        lineNumber: 484,
        columnNumber: 5
    }, this);
}
_s3(MobileTrack, "iMz66A5M7MyVR76dKkf+X+KfHzg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelectedOrder"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$dashboards$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHold"]
    ];
});
_c8 = MobileTrack;
function DesktopTrack() {
    _s4();
    const o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelectedOrder"])();
    const advanceStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "DesktopTrack.usePishnam[advanceStatus]": (s)=>s.advanceStatus
    }["DesktopTrack.usePishnam[advanceStatus]"]);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const hold = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$dashboards$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHold"])(o);
    if (!o) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "hidden min-h-screen flex-col bg-[#F2FAFD] md:flex",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "mx-auto flex w-full max-w-[900px] flex-col gap-5 px-6 pb-14 pt-12",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyTrack, {}, void 0, false, {
                fileName: "[project]/src/components/shop/screens/track.tsx",
                lineNumber: 628,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/shop/screens/track.tsx",
            lineNumber: 627,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/shop/screens/track.tsx",
        lineNumber: 626,
        columnNumber: 7
    }, this);
    const cur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["statusToStep"])(o.status);
    const chip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2f$order$2d$view$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderChip"])(o);
    const onJourney = !o.v2 || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2f$order$2d$view$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isOnJourney"])(o);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "hidden min-h-screen flex-col bg-[#F2FAFD] md:flex",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "mx-auto flex w-full max-w-[1200px] flex-col gap-7 px-6 pb-14 pt-10",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "flex flex-col gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 text-[13.5px] font-bold text-[#4A6572]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("my-gifts"),
                                    className: "text-[#00779F] hover:underline",
                                    children: "هدیه‌هام"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/track.tsx",
                                    lineNumber: 643,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "/"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/track.tsx",
                                    lineNumber: 646,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "رهگیری هدیه‌ی ",
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(o.no)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/shop/screens/track.tsx",
                                    lineNumber: 647,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/shop/screens/track.tsx",
                            lineNumber: 642,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-end justify-between gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "m-0 text-[44px] font-black leading-[1.35]",
                                            children: [
                                                "سفر جعبه‌ی ",
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(o.no)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/shop/screens/track.tsx",
                                            lineNumber: 651,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "m-0 text-[15px] font-medium text-[#4A6572]",
                                            children: [
                                                who(o),
                                                " · ",
                                                o.date,
                                                " · ",
                                                extras(o)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/shop/screens/track.tsx",
                                            lineNumber: 652,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/shop/screens/track.tsx",
                                    lineNumber: 650,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "rounded-[14px] px-4 py-2 text-[14px] font-extrabold",
                                    style: {
                                        background: chip.bg,
                                        color: chip.fg ?? undefined
                                    },
                                    children: chip.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/track.tsx",
                                    lineNumber: 656,
                                    columnNumber: 13
                                }, this),
                                o.v2 && o.status2 === "awaiting_payment" && hold.expiresAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$manual$2d$payment$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CountdownBadge"], {
                                    expiresAt: hold.expiresAt
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/track.tsx",
                                    lineNumber: 663,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/shop/screens/track.tsx",
                            lineNumber: 649,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shop/screens/track.tsx",
                    lineNumber: 641,
                    columnNumber: 9
                }, this),
                !onJourney && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "flex flex-col gap-3 rounded-[28px] border border-[#F2E3A0] bg-[#FFFBEC] p-7",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[15px] font-extrabold text-[#04202E]",
                            children: bannerNote(o.status2)
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/track.tsx",
                            lineNumber: 671,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-[560px]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$dashboards$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PaymentBlock"], {
                                o: o,
                                desktop: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/track.tsx",
                                lineNumber: 673,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/track.tsx",
                            lineNumber: 672,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shop/screens/track.tsx",
                    lineNumber: 670,
                    columnNumber: 11
                }, this),
                onJourney && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "rounded-[28px] border border-[#DDEEF5] bg-white p-7",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex items-start justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-x-[46px] top-[23px] h-[3px] rounded bg-[#E1EFF5]",
                                "aria-hidden": true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full rounded bg-[#00ABE7] transition-[width] duration-700 ease-out",
                                    style: {
                                        width: `${cur / 3 * 100}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/track.tsx",
                                    lineNumber: 683,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/track.tsx",
                                lineNumber: 682,
                                columnNumber: 13
                            }, this),
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRACK_STEPS"].map((s, i)=>{
                                const done = i < cur;
                                const isNow = i === cur;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative z-10 flex w-[130px] flex-col items-center gap-2 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `flex h-[46px] w-[46px] items-center justify-center rounded-full border-2 ${done ? "border-[#00ABE7] bg-[#00ABE7] text-white" : isNow ? "border-[#00ABE7] bg-white text-[#00ABE7] pishnam-pulse-ring" : "border-dashed border-[#9CC9DA] bg-white text-[#4A6572]"}`,
                                            children: done ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CheckIcon"], {
                                                size: 18,
                                                stroke: "#fff"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/track.tsx",
                                                lineNumber: 702,
                                                columnNumber: 29
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-black",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(i + 1)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/track.tsx",
                                                lineNumber: 702,
                                                columnNumber: 69
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/track.tsx",
                                            lineNumber: 693,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-[14.5px] font-extrabold ${isNow ? "text-[#00779F]" : ""}`,
                                            children: s.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/track.tsx",
                                            lineNumber: 704,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[11.5px] font-semibold text-[#4A6572]",
                                            children: stepNote(i, cur, o)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/track.tsx",
                                            lineNumber: 705,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, s.key, true, {
                                    fileName: "[project]/src/components/shop/screens/track.tsx",
                                    lineNumber: 692,
                                    columnNumber: 17
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/track.tsx",
                        lineNumber: 681,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/track.tsx",
                    lineNumber: 680,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "grid grid-cols-[1fr_400px] gap-7",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-7",
                            children: [
                                onJourney && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-[28px] border border-[#DDEEF5] bg-white p-7",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "mb-5 mt-0 text-[19px] font-extrabold",
                                            children: "قدم‌به‌قدم"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/track.tsx",
                                            lineNumber: 719,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                                            className: "m-0 list-none p-0",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRACK_STEPS"].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TimelineRow, {
                                                    i: i,
                                                    current: cur,
                                                    o: o,
                                                    big: true
                                                }, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRACK_STEPS"][i].key, false, {
                                                    fileName: "[project]/src/components/shop/screens/track.tsx",
                                                    lineNumber: 722,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/track.tsx",
                                            lineNumber: 720,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/shop/screens/track.tsx",
                                    lineNumber: 718,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-[28px] border border-[#DDEEF5] bg-white px-6 py-2.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "mb-1 mt-4 text-[19px] font-extrabold",
                                            children: "جزئیات سفارش"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/track.tsx",
                                            lineNumber: 728,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                            k: "گیرنده",
                                            v: o.dir === "sent" ? o.to : "تو"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/track.tsx",
                                            lineNumber: 729,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                            k: "شهر",
                                            v: o.city
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/track.tsx",
                                            lineNumber: 730,
                                            columnNumber: 15
                                        }, this),
                                        o.address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                            k: "آدرس",
                                            v: o.address
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/track.tsx",
                                            lineNumber: 731,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                            k: "تاریخ",
                                            v: o.date
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/track.tsx",
                                            lineNumber: 732,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                            k: "قلب و پنجه",
                                            v: extras(o)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/track.tsx",
                                            lineNumber: 733,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                            k: "مبلغ پرداختی",
                                            v: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["faPrice"])(o.total)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/track.tsx",
                                            lineNumber: 734,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/track.tsx",
                                            lineNumber: 735,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/shop/screens/track.tsx",
                                    lineNumber: 727,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/shop/screens/track.tsx",
                            lineNumber: 716,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-7",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-[28px] border border-[#DDEEF5] bg-white p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlushTile, {
                                            o: o,
                                            size: 170,
                                            box: 190
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/track.tsx",
                                            lineNumber: 742,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-4 text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-[18px] font-black",
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLUSH_MAP"][o.kind].name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/shop/screens/track.tsx",
                                                    lineNumber: 744,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-1 text-[13px] font-medium text-[#4A6572]",
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLUSH_MAP"][o.kind].chips.join(" · ")
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/shop/screens/track.tsx",
                                                    lineNumber: 745,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/shop/screens/track.tsx",
                                            lineNumber: 743,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/shop/screens/track.tsx",
                                    lineNumber: 741,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PostcardCard, {
                                    o: o
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/track.tsx",
                                    lineNumber: 749,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-3",
                                    children: [
                                        o.dir === "recv" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("gift"),
                                            className: "flex h-[54px] items-center justify-center gap-2 rounded-full bg-[#E3F6FD] text-[15px] font-extrabold text-[#006387] transition-transform hover:scale-[1.02]",
                                            children: [
                                                "مشاهده‌ی پیام",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ForwardIcon"], {
                                                    size: 16,
                                                    stroke: "#006387"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/shop/screens/track.tsx",
                                                    lineNumber: 759,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/shop/screens/track.tsx",
                                            lineNumber: 753,
                                            columnNumber: 17
                                        }, this),
                                        o.dir === "sent" && !o.v2 && o.status !== "delivered" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>{
                                                advanceStatus(o.id);
                                                toast({
                                                    title: "یه قدم جلوتر رفت! 🚚",
                                                    description: "مسیر هدیه به‌روز شد."
                                                });
                                            },
                                            className: "flex h-[54px] items-center justify-center gap-2 rounded-full bg-[#00ABE7] text-[15px] font-extrabold text-[#04202E] transition-transform hover:scale-[1.02]",
                                            children: [
                                                "قدم بعدی: ",
                                                NEXT_LABEL[o.status],
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ForwardIcon"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/shop/screens/track.tsx",
                                                    lineNumber: 772,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/shop/screens/track.tsx",
                                            lineNumber: 763,
                                            columnNumber: 17
                                        }, this),
                                        o.dir === "sent" && o.status === "delivered" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("pick"),
                                            className: "flex h-[54px] items-center justify-center gap-2 rounded-full bg-[#00ABE7] text-[15px] font-extrabold text-[#04202E] transition-transform hover:scale-[1.02]",
                                            children: [
                                                "یه بغل دیگه بفرست",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ForwardIcon"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/shop/screens/track.tsx",
                                                    lineNumber: 782,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/shop/screens/track.tsx",
                                            lineNumber: 776,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("my-gifts"),
                                            className: "flex h-[54px] items-center justify-center gap-2 rounded-full border-2 border-[#04202E] text-[15px] font-extrabold text-[#04202E] transition-transform hover:scale-[1.02]",
                                            children: "برگرد به هدیه‌هام"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/track.tsx",
                                            lineNumber: 785,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CopyGiftButton, {
                                            o: o,
                                            dark: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/track.tsx",
                                            lineNumber: 792,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DownloadGiftButton, {
                                            o: o,
                                            dark: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/track.tsx",
                                            lineNumber: 793,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/shop/screens/track.tsx",
                                    lineNumber: 751,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/shop/screens/track.tsx",
                            lineNumber: 740,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shop/screens/track.tsx",
                    lineNumber: 714,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/shop/screens/track.tsx",
            lineNumber: 639,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/shop/screens/track.tsx",
        lineNumber: 638,
        columnNumber: 5
    }, this);
}
_s4(DesktopTrack, "iMz66A5M7MyVR76dKkf+X+KfHzg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelectedOrder"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$dashboards$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHold"]
    ];
});
_c9 = DesktopTrack;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "PlushTile");
__turbopack_context__.k.register(_c1, "TimelineRow");
__turbopack_context__.k.register(_c2, "InfoRow");
__turbopack_context__.k.register(_c3, "PostcardCard");
__turbopack_context__.k.register(_c4, "EmptyTrack");
__turbopack_context__.k.register(_c5, "TrackByCode");
__turbopack_context__.k.register(_c6, "CopyGiftButton");
__turbopack_context__.k.register(_c7, "DownloadGiftButton");
__turbopack_context__.k.register(_c8, "MobileTrack");
__turbopack_context__.k.register(_c9, "DesktopTrack");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_shop_screens_track_tsx_5b7d6662._.js.map