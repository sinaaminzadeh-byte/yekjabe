module.exports = [
"[project]/src/components/shop/screens/builder.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DesktopBuilder",
    ()=>DesktopBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// ── Desktop builder: all 4 steps on one page (step highlights by route) ──
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/plush.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/icons.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hash-route.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pishnam-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/fa.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$fav$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/fav.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$ideas$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/ideas.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pishnam-data.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2f$provinces$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/orders/provinces.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
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
function DesktopBuilder({ step }) {
    const kind = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.kind);
    const setKind = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.setKind);
    const favorites = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.favorites);
    const [favOnly, setFavOnly] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const list = favOnly ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLUSHES"].filter((p)=>favorites.includes(p.kind)) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLUSHES"];
    // deep-link preselect: #/pick?kind=bear (product/friends pages CTA)
    const { query } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useHashRoute"])();
    const qKind = query.get("kind");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (qKind && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLUSHES"].some((p)=>p.kind === qKind) && kind !== qKind) {
            setKind(qKind);
        }
    }, [
        qKind,
        kind,
        setKind
    ]);
    const occ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.occasion);
    const setOcc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.setOccasion);
    const message = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.message);
    const setMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.setMessage);
    const anonymous = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.anonymous);
    const setAnonymous = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.setAnonymous);
    const senderName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.senderName);
    const setSenderName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.setSenderName);
    const cardPassword = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.cardPassword);
    const setCardPassword = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.setCardPassword);
    const hearts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.hearts);
    const setHearts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.setHearts);
    const paws = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.paws);
    const setPaws = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.setPaws);
    const receiver = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.receiver);
    const setReceiver = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.setReceiver);
    const nextNo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.nextNo);
    const done = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCharityDone"])();
    // server quote — the only payable number (guide §4.5)
    const quote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.quote);
    const fetchQuote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"])((s)=>s.fetchQuote);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        void fetchQuote();
    }, [
        fetchQuote,
        kind,
        hearts,
        paws,
        receiver.province
    ]);
    const total = quote?.total ?? 0;
    const sel = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLUSHES"].find((p)=>p.kind === kind) ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLUSHES"][0];
    const valid = receiver.name.trim() !== "" && receiver.phone.trim().length >= 8 && receiver.address.trim() !== "";
    // scroll the active section into view when the step route changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const el = document.getElementById(`dstep-${step}`);
        el?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, [
        step
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "hidden min-h-screen bg-[#F2FAFD] md:block",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto w-full max-w-[1200px] px-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navigate"])("home"),
                        className: "flex items-center gap-2 pt-5 text-[15px] font-bold text-[#04202E] hover:text-[#006387]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BackIcon"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this),
                            "برگشت به صفحه‌ی اصلی"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pt-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "m-0 text-[clamp(32px,4vw,48px)] font-black leading-[1.4]",
                                children: "هدیه‌ت رو بساز"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                lineNumber: 92,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-0 mt-2 text-[17px] font-medium leading-[1.9] text-[#1F3E4D]",
                                children: "چهار تا قدم، همه تو یه صفحه. هر جا خواستی برگرد و عوضش کن."
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/builder.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto flex w-full max-w-[1200px] flex-wrap items-start gap-6 px-6 pb-20 pt-6 box-border",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex min-w-0 flex-1 flex-col gap-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                id: "dstep-1",
                                className: "flex flex-col gap-[18px] rounded-[32px] border bg-white p-7 transition-shadow",
                                style: {
                                    borderColor: step === 1 ? "#00ABE7" : "#DDEEF5",
                                    boxShadow: step === 1 ? "0 0 0 3px rgba(0,171,231,0.18)" : undefined
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StepNum, {
                                                n: "۱",
                                                on: step === 1
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 109,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "m-0 text-2xl font-black",
                                                children: "دوستت رو انتخاب کن"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 110,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ms-auto text-sm font-bold text-[#006387]",
                                                children: [
                                                    "همه ",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["money"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BOX_PRICE"]),
                                                    " تومان"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 111,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                        lineNumber: 108,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center justify-between gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$fav$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FavFilterChips"], {
                                                favOnly: favOnly,
                                                onToggle: setFavOnly,
                                                desktop: true
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 114,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$fav$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SurpriseButton"], {
                                                desktop: true
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 115,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                        lineNumber: 113,
                                        columnNumber: 13
                                    }, this),
                                    favOnly && list.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-center gap-3 rounded-3xl border-[1.5px] border-dashed border-[#F7C5D3] bg-[#FFF7FA] px-6 py-10 text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeartSticker"], {
                                                size: 40,
                                                fill: "#FFFFFF",
                                                stroke: "#F0426B",
                                                strokeWidth: 2.2
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 119,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "m-0 text-[15px] font-bold text-[#B02A52]",
                                                children: "هنوز کسی رو به قلبت اضافه نکردی!"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 120,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setFavOnly(false),
                                                className: "h-11 rounded-full bg-[#F0426B] px-6 text-[14px] font-extrabold text-white transition-transform hover:scale-[1.03] active:scale-95",
                                                children: "نشون بده همه رو"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 121,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                        lineNumber: 118,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-3",
                                        children: list.map((p)=>{
                                            const isOn = p.kind === kind;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                role: "button",
                                                tabIndex: 0,
                                                "aria-pressed": isOn,
                                                onClick: ()=>setKind(p.kind),
                                                onKeyDown: (e)=>{
                                                    if (e.key === "Enter" || e.key === " ") {
                                                        e.preventDefault();
                                                        setKind(p.kind);
                                                    }
                                                },
                                                className: "relative box-border flex min-w-0 cursor-pointer flex-[1_1_150px] flex-col gap-0.5 rounded-3xl bg-white p-2 pb-3 text-right outline-none transition-all focus-visible:ring-2 focus-visible:ring-[#00ABE7]",
                                                style: {
                                                    border: `3px solid ${isOn ? "#00ABE7" : "#E1EFF5"}`
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$fav$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FavHeart"], {
                                                        kind: p.kind,
                                                        name: p.name,
                                                        size: 20,
                                                        box: 30,
                                                        className: "absolute start-2.5 top-2.5 z-10"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                        lineNumber: 149,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex h-32 items-center justify-center rounded-2xl",
                                                        style: {
                                                            background: p.bg
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Plush"], {
                                                            kind: p.kind,
                                                            size: 112
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                            lineNumber: 154,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                        lineNumber: 150,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "pt-1.5 text-base font-extrabold",
                                                        children: p.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                        lineNumber: 156,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs font-medium text-[#4A6572]",
                                                        children: p.chips.join(" · ")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                        lineNumber: 157,
                                                        columnNumber: 21
                                                    }, this),
                                                    isOn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "absolute left-3.5 top-3.5 flex h-7 w-7 items-center justify-center rounded-full border-[2.5px] border-[#04202E] bg-[#00ABE7] box-border",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CheckIcon"], {
                                                            size: 15,
                                                            stroke: "#04202E"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                            lineNumber: 160,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                        lineNumber: 159,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, p.kind, true, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 134,
                                                columnNumber: 19
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                        lineNumber: 130,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-3xl bg-[#F8FDFF] px-5 py-4 text-[14px] font-medium leading-[1.9] text-[#1F3E4D]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                className: "text-[#04202E]",
                                                children: [
                                                    sel.name,
                                                    ":"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 169,
                                                columnNumber: 15
                                            }, this),
                                            " ",
                                            sel.blurb
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                        lineNumber: 168,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                id: "dstep-2",
                                className: "flex flex-col gap-[18px] rounded-[32px] border bg-white p-7",
                                style: {
                                    borderColor: step === 2 ? "#00ABE7" : "#DDEEF5",
                                    boxShadow: step === 2 ? "0 0 0 3px rgba(0,171,231,0.18)" : undefined
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StepNum, {
                                                n: "۲",
                                                on: step === 2
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 180,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "m-0 text-2xl font-black",
                                                children: "کارت پستالت رو بنویس"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 181,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                        lineNumber: 179,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2",
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OCCASIONS"].map((label, i)=>{
                                            const isOn = i === occ;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                "aria-pressed": isOn,
                                                onClick: ()=>setOcc(i),
                                                className: "h-11 rounded-full px-5 text-[14.5px] font-bold",
                                                style: {
                                                    background: isOn ? "#00ABE7" : "#fff",
                                                    border: `1.5px solid ${isOn ? "#04202E" : "#CFE6EF"}`,
                                                    color: "#04202E"
                                                },
                                                children: label
                                            }, label, false, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 187,
                                                columnNumber: 19
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                        lineNumber: 183,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-2 rounded-3xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-[18px] pb-3 pt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "dmsg",
                                                className: "text-sm font-extrabold",
                                                children: "پیامت"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 205,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                id: "dmsg",
                                                rows: 5,
                                                maxLength: 400,
                                                value: message,
                                                onChange: (e)=>setMessage(e.target.value),
                                                placeholder: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OCCASION_HOLDERS"][occ],
                                                className: "min-h-[120px] resize-none border-none bg-transparent text-base leading-[1.95] text-[#04202E] outline-none"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 208,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-[12.5px] font-semibold text-[#4A6572]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "متن، عکس یا ویدیو؛ هر چی دلت خواست"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                        lineNumber: 218,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(message.length),
                                                            " / ۴۰۰"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                        lineNumber: 219,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 217,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                        lineNumber: 204,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$ideas$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MessageIdeas"], {
                                        occ: occ,
                                        onPick: setMessage,
                                        desktop: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                        lineNumber: 222,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "box-border flex h-[84px] flex-[1_1_200px] items-center justify-center gap-2.5 rounded-[22px] border-2 border-dashed border-[#00ABE7] bg-[#E3F6FD] text-[15px] font-bold text-[#04202E]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PhotoIcon"], {
                                                        size: 26
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                        lineNumber: 228,
                                                        columnNumber: 17
                                                    }, this),
                                                    "افزودن عکس"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 224,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "box-border flex h-[84px] flex-[1_1_200px] items-center justify-center gap-2.5 rounded-[22px] border-2 border-dashed border-[#F0426B] bg-[#FFE9F0] text-[15px] font-bold text-[#04202E]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VideoIcon"], {
                                                        size: 26
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                        lineNumber: 235,
                                                        columnNumber: 17
                                                    }, this),
                                                    "افزودن ویدیو"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 231,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                        lineNumber: 223,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex min-w-0 flex-[1_1_260px] flex-col gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        htmlFor: "dpw",
                                                        className: "text-sm font-extrabold",
                                                        children: "رمز کارت"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                        lineNumber: 241,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        id: "dpw",
                                                        type: "text",
                                                        value: cardPassword,
                                                        onChange: (e)=>setCardPassword(e.target.value),
                                                        placeholder: "مثلاً اسم اولین جایی که با هم رفتید",
                                                        className: "box-border h-[54px] rounded-[18px] border-[1.5px] border-[#CFE6EF] bg-white px-4 text-base text-[#04202E] outline-none focus:border-[#00ABE7]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                        lineNumber: 244,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[12.5px] font-medium leading-[1.8] text-[#4A6572]",
                                                        children: "فقط کسی که رمز رو بدونه، پیامت رو می‌بینه."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                        lineNumber: 252,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 240,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex min-w-0 flex-[1_1_260px] flex-col gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm font-extrabold",
                                                                children: "ناشناس بفرست"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                                lineNumber: 258,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                role: "switch",
                                                                "aria-checked": anonymous,
                                                                "aria-label": "ارسال ناشناس",
                                                                onClick: ()=>setAnonymous(!anonymous),
                                                                className: "relative h-8 w-[54px] shrink-0 rounded-full border-none p-0",
                                                                style: {
                                                                    background: anonymous ? "#00ABE7" : "#C7DCE5"
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "absolute top-[3px] h-[26px] w-[26px] rounded-full bg-white shadow-[0_2px_5px_rgba(4,32,46,0.28)] transition-all",
                                                                    style: anonymous ? {
                                                                        left: 3
                                                                    } : {
                                                                        right: 3
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                                    lineNumber: 268,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                                lineNumber: 259,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                        lineNumber: 257,
                                                        columnNumber: 17
                                                    }, this),
                                                    anonymous ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[12.5px] font-medium leading-[1.8] text-[#4A6572]",
                                                        children: "توی جعبه هیچ اسمی نمی‌ذاریم."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                        lineNumber: 275,
                                                        columnNumber: 19
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        "aria-label": "اسم تو",
                                                        type: "text",
                                                        value: senderName,
                                                        onChange: (e)=>setSenderName(e.target.value),
                                                        placeholder: "اسم تو",
                                                        className: "box-border h-[54px] rounded-[18px] border-[1.5px] border-[#CFE6EF] bg-white px-4 text-base text-[#04202E] outline-none focus:border-[#00ABE7]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                        lineNumber: 279,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 256,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                        lineNumber: 239,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                lineNumber: 174,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                id: "dstep-3",
                                className: "flex flex-col gap-[18px] rounded-[32px] border bg-white p-7",
                                style: {
                                    borderColor: step === 3 ? "#00ABE7" : "#DDEEF5",
                                    boxShadow: step === 3 ? "0 0 0 3px rgba(0,171,231,0.18)" : undefined
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StepNum, {
                                                n: "۳",
                                                on: step === 3
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 299,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "m-0 text-2xl font-black",
                                                children: "یه ذره مهربونی اضافه کن"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 300,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                        lineNumber: 298,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "m-0 text-[15px] font-medium leading-[1.95] text-[#1F3E4D]",
                                        children: "قلب قرمز و پنجه، استیکرای کوچیکی‌ان که روی جعبه می‌چسبن. پولشون می‌ره برای هدیه به بچه‌های بی‌سرپرست و پناهگاه حیوونا."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                        lineNumber: 302,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-3.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "box-border flex min-w-0 flex-[1_1_280px] flex-col gap-3.5 rounded-[26px] border-[1.5px] border-[#F7C5D3] bg-[#FFE9F0] p-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "flex h-14 w-14 items-center justify-center rounded-full bg-white",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeartSticker"], {
                                                                    size: 32,
                                                                    fill: "#F0426B",
                                                                    stroke: "#04202E",
                                                                    strokeWidth: 2.4
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                                    lineNumber: 310,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                                lineNumber: 309,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[17px] font-black",
                                                                        children: "قلب قرمز"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                                        lineNumber: 313,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[12.5px] font-medium text-[#1F3E4D]",
                                                                        children: "برای بچه‌های بی‌سرپرست"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                                        lineNumber: 314,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                                lineNumber: 312,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                        lineNumber: 308,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[13.5px] font-bold",
                                                                children: [
                                                                    "هر کدوم ",
                                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["money"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CHARM_PRICE"]),
                                                                    " تومان"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                                lineNumber: 318,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DC, {
                                                                value: hearts,
                                                                onMinus: ()=>setHearts(hearts - 1),
                                                                onPlus: ()=>setHearts(hearts + 1),
                                                                plusBg: "#F0426B"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                                lineNumber: 319,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                        lineNumber: 317,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 307,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "box-border flex min-w-0 flex-[1_1_280px] flex-col gap-3.5 rounded-[26px] border-[1.5px] border-[#B5E3F5] bg-[#E3F6FD] p-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "flex h-14 w-14 items-center justify-center rounded-full bg-white",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PawIcon"], {
                                                                    size: 30
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                                    lineNumber: 330,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                                lineNumber: 329,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[17px] font-black",
                                                                        children: "پنجه"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                                        lineNumber: 333,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[12.5px] font-medium text-[#1F3E4D]",
                                                                        children: "برای پناهگاه حیوونا"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                                        lineNumber: 334,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                                lineNumber: 332,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                        lineNumber: 328,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[13.5px] font-bold",
                                                                children: [
                                                                    "هر کدوم ",
                                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["money"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CHARM_PRICE"]),
                                                                    " تومان"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                                lineNumber: 338,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DC, {
                                                                value: paws,
                                                                onMinus: ()=>setPaws(paws - 1),
                                                                onPlus: ()=>setPaws(paws + 1),
                                                                plusBg: "#00ABE7"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                                lineNumber: 339,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                        lineNumber: 337,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 327,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                        lineNumber: 306,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-2.5 rounded-3xl border border-[#DDEEF5] bg-[#F8FDFF] px-5 py-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[15px] font-extrabold",
                                                        children: "اولین بسته‌ی خیریه"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                        lineNumber: 350,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[13px] font-bold text-[#006387]",
                                                        children: [
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(done),
                                                            " از ",
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CHARITY_TARGET"])
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                        lineNumber: 351,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 349,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-3 overflow-hidden rounded-full bg-[#E3F0F5]",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-3 rounded-full bg-[#00ABE7] transition-all",
                                                    style: {
                                                        width: `${Math.min(100, Math.round(done / __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CHARITY_TARGET"] * 100))}%`
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                    lineNumber: 356,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 355,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                        lineNumber: 348,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                lineNumber: 293,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                id: "dstep-4",
                                className: "flex flex-col gap-[18px] rounded-[32px] border bg-white p-7",
                                style: {
                                    borderColor: step === 4 ? "#00ABE7" : "#DDEEF5",
                                    boxShadow: step === 4 ? "0 0 0 3px rgba(0,171,231,0.18)" : undefined
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StepNum, {
                                                n: "۴",
                                                on: step === 4
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 371,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "m-0 text-2xl font-black",
                                                children: "گیرنده‌ی هدیه"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 372,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                        lineNumber: 370,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-3.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DField, {
                                                label: "اسم گیرنده",
                                                value: receiver.name,
                                                onChange: (v)=>setReceiver({
                                                        name: v
                                                    }),
                                                placeholder: "اسم دوستت"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 375,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DField, {
                                                label: "شماره‌ی موبایل گیرنده",
                                                value: receiver.phone,
                                                onChange: (v)=>setReceiver({
                                                        phone: v
                                                    }),
                                                placeholder: "۰۹۱۲ ۱۲۳ ۴۵۶۷",
                                                tel: true
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 376,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex min-w-0 flex-[1_1_240px] flex-col gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[13px] font-bold text-[#4A6572]",
                                                        children: "استان"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                        lineNumber: 378,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: receiver.province,
                                                        onChange: (e)=>setReceiver({
                                                                province: e.target.value
                                                            }),
                                                        className: "box-border h-[52px] rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-4 text-base font-semibold text-[#04202E] outline-none focus:border-[#00ABE7]",
                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2f$provinces$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PROVINCES"].map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: p,
                                                                children: p
                                                            }, p, false, {
                                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                                lineNumber: 385,
                                                                columnNumber: 21
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                        lineNumber: 379,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 377,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DField, {
                                                label: "شهر",
                                                value: receiver.city,
                                                onChange: (v)=>setReceiver({
                                                        city: v
                                                    }),
                                                placeholder: "مثلاً تهران"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 391,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex min-w-0 flex-[1_1_240px] flex-col gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[13px] font-bold text-[#4A6572]",
                                                        children: "آدرس کامل"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                        lineNumber: 393,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                        rows: 2,
                                                        value: receiver.address,
                                                        onChange: (e)=>setReceiver({
                                                                address: e.target.value
                                                            }),
                                                        placeholder: "خیابان، کوچه، پلاک، واحد",
                                                        className: "box-border resize-none rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-4 py-2.5 text-base leading-[1.8] text-[#04202E] outline-none focus:border-[#00ABE7]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                        lineNumber: 394,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 392,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                        lineNumber: 374,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                lineNumber: 365,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "sticky top-24 flex w-[360px] shrink-0 flex-col gap-4 self-start rounded-[32px] border border-[#DDEEF5] bg-white p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex items-stretch overflow-hidden rounded-[24px] bg-[#00ABE7]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex w-[104px] shrink-0 flex-col items-center justify-center py-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11px] font-bold",
                                                children: "هدیه‌ی شماره"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 410,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-4xl font-black leading-[1.15]",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(nextNo)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 411,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                        lineNumber: 409,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "my-3 w-0 border-r-2 border-dashed border-[#04202E]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                        lineNumber: 413,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-1 flex-col justify-center gap-0.5 px-3.5 py-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[14px] font-black",
                                                children: "این شماره مال هدیه‌ی توئه"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 415,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11.5px] font-medium leading-[1.7]",
                                                children: "روی جعبه و کارت پستال می‌شینه."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                                lineNumber: 416,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                        lineNumber: 414,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute -top-2.5 right-[92px] h-5 w-5 rounded-full bg-white"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                        lineNumber: 420,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute -bottom-2.5 right-[92px] h-5 w-5 rounded-full bg-white"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                        lineNumber: 421,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                lineNumber: 408,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                        label: `${sel.name}، دوست پشمالو`,
                                        sub: "جعبه‌ی کادویی + کارت پستال QR",
                                        amount: quote ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["money"])(quote.total - quote.shipping - quote.charms) : "…"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                        lineNumber: 425,
                                        columnNumber: 13
                                    }, this),
                                    hearts + paws > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                        label: `قلب و پنجه × ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(hearts + paws)}`,
                                        sub: "برای بچه‌های بی‌سرپرست و حیوونا",
                                        amount: quote ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["money"])(quote.charms) : "…"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                        lineNumber: 426,
                                        columnNumber: 35
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                        label: "هزینه‌ی ارسال",
                                        sub: receiver.province === "تهران" ? "تهران" : "شهرستان",
                                        amount: quote ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["money"])(quote.shipping) : "…",
                                        muted: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                        lineNumber: 427,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                lineNumber: 424,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between border-t border-[#E3F0F5] pt-3.5 text-lg font-black",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "جمع کل"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                        lineNumber: 431,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: quote ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["money"])(total)} تومان` : "در حال محاسبه…"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                        lineNumber: 432,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                lineNumber: 430,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center gap-2 rounded-3xl p-4 text-center text-[13px] font-semibold leading-[1.9]",
                                style: {
                                    background: valid ? "#E3F6FD" : "#FFF3C9",
                                    color: valid ? "#006387" : "#7A5C00"
                                },
                                children: valid ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "همه‌چیز آماده‌ست! «پرداخت» رو بزن تا هدیه راه بیفته."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/builder.tsx",
                                    lineNumber: 440,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "برای پرداخت، اسم، موبایل و آدرس گیرنده (قدم ۴) رو کامل کن."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/builder.tsx",
                                    lineNumber: 442,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                lineNumber: 435,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                disabled: !valid || !quote,
                                onClick: ()=>window.dispatchEvent(new CustomEvent("pishnam:pay")),
                                className: "flex h-[56px] items-center justify-center gap-2 rounded-full text-base font-extrabold transition-all active:scale-95",
                                style: {
                                    background: valid && quote ? "#00ABE7" : "#CFE6EF",
                                    color: "#04202E",
                                    opacity: valid && quote ? 1 : 0.75,
                                    cursor: valid && quote ? "pointer" : "not-allowed"
                                },
                                children: [
                                    "پرداخت و فرستادن",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeartSticker"], {
                                        size: 20,
                                        fill: "#04202E",
                                        stroke: "none"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                                        lineNumber: 454,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                lineNumber: 446,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navigate"])("impact"),
                                className: "text-center text-[13px] font-bold text-[#006387] hover:underline",
                                children: "گزارش مهربونی‌ها ›"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/builder.tsx",
                                lineNumber: 456,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                        lineNumber: 407,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/builder.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/builder.tsx",
        lineNumber: 81,
        columnNumber: 5
    }, this);
}
function StepNum({ n, on }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "box-border flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[17px] font-black",
        style: {
            background: on ? "#00ABE7" : "#CFE6EF",
            border: "2.5px solid #04202E"
        },
        children: n
    }, void 0, false, {
        fileName: "[project]/src/components/shop/screens/builder.tsx",
        lineNumber: 471,
        columnNumber: 5
    }, this);
}
function DC({ value, onMinus, onPlus, plusBg }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-1 rounded-full bg-white p-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-label": "یکی کم کن",
                onClick: onMinus,
                className: "flex h-11 w-11 items-center justify-center rounded-full border-none bg-[#F2FAFD]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MinusIcon"], {}, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/builder.tsx",
                    lineNumber: 487,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/builder.tsx",
                lineNumber: 486,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "min-w-[38px] text-center text-xl font-black",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(value)
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/builder.tsx",
                lineNumber: 489,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-label": "یکی زیاد کن",
                onClick: onPlus,
                className: "flex h-11 w-11 items-center justify-center rounded-full border-none",
                style: {
                    background: plusBg
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlusSmall"], {
                    stroke: plusBg === "#F0426B" ? "#fff" : "#04202E"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/builder.tsx",
                    lineNumber: 491,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/builder.tsx",
                lineNumber: 490,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/builder.tsx",
        lineNumber: 485,
        columnNumber: 5
    }, this);
}
function DField({ label, value, onChange, placeholder, tel }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-w-0 flex-[1_1_240px] flex-col gap-1.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "text-[13px] font-bold text-[#4A6572]",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/builder.tsx",
                lineNumber: 500,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: tel ? "tel" : "text",
                inputMode: tel ? "numeric" : undefined,
                value: value,
                onChange: (e)=>onChange(e.target.value),
                placeholder: placeholder,
                className: "box-border h-[52px] rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-4 text-base text-[#04202E] outline-none focus:border-[#00ABE7]"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/builder.tsx",
                lineNumber: 501,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/builder.tsx",
        lineNumber: 499,
        columnNumber: 5
    }, this);
}
function Row({ label, sub, amount, muted }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[14px] font-extrabold",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                        lineNumber: 517,
                        columnNumber: 9
                    }, this),
                    sub && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[11.5px] font-medium text-[#4A6572]",
                        children: sub
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/builder.tsx",
                        lineNumber: 518,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/builder.tsx",
                lineNumber: 516,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `text-[13.5px] font-extrabold ${muted ? "text-[#4A6572]" : ""}`,
                children: amount
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/builder.tsx",
                lineNumber: 520,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/builder.tsx",
        lineNumber: 515,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_components_shop_screens_builder_tsx_637cda83._.js.map