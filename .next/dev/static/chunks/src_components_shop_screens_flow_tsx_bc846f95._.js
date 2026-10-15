(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/shop/screens/flow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MobileCard",
    ()=>MobileCard,
    "MobileCheckout",
    ()=>MobileCheckout,
    "MobileExtras",
    ()=>MobileExtras,
    "MobilePick",
    ()=>MobilePick
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// ── Mobile gift-builder flow: pick → card → extras → checkout ──
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/plush.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$nav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/nav.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/icons.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hash-route.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pishnam-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/fa.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pishnam-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2f$provinces$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/orders/provinces.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$fav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/fav.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$ideas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/ideas.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
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
function MobilePick() {
    _s();
    const picked = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobilePick.usePishnam[picked]": (s)=>s.kind
    }["MobilePick.usePishnam[picked]"]);
    const setKind = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobilePick.usePishnam[setKind]": (s)=>s.setKind
    }["MobilePick.usePishnam[setKind]"]);
    const favorites = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobilePick.usePishnam[favorites]": (s)=>s.favorites
    }["MobilePick.usePishnam[favorites]"]);
    const [favOnly, setFavOnly] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [stageKey, setStageKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // deep-link preselect: #/pick?kind=bear (product/friends pages CTA)
    const { query } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHashRoute"])();
    const qKind = query.get("kind");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MobilePick.useEffect": ()=>{
            if (qKind && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLUSHES"].some({
                "MobilePick.useEffect": (p)=>p.kind === qKind
            }["MobilePick.useEffect"]) && picked !== qKind) {
                setKind(qKind);
            }
        }
    }["MobilePick.useEffect"], [
        qKind,
        picked,
        setKind
    ]);
    const sel = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLUSHES"].find((p)=>p.kind === picked) ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLUSHES"][0];
    const list = favOnly ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLUSHES"].filter((p)=>favorites.includes(p.kind)) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLUSHES"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen flex-col bg-[#F2FAFD] md:hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$nav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MobileTopBar"], {
                title: "قدم ۱ از ۴",
                back: "home"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$nav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StepBar"], {
                step: 1
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-5 pb-1 pt-[22px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "m-0 text-[30px] font-black leading-[1.4]",
                        children: "دوست پشمالوت رو انتخاب کن"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-0 mt-2 text-[15px] font-medium leading-[1.9] text-[#1F3E4D]",
                        children: "شش تا رفیق پشمالو منتظرن؛ همه با یه قیمت، تفاوت فقط تو قلبشونه."
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex justify-center px-5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex w-full flex-col items-center gap-2 rounded-[30px] border-[1.5px] border-[#00ABE7] bg-white p-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative flex h-[240px] w-full items-center justify-center rounded-3xl",
                            style: {
                                background: sel.bg
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: stageKey > 0 ? "pishnam-pop-in flex" : "flex",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plush"], {
                                        kind: sel.kind,
                                        size: 210,
                                        className: "pishnam-float"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                                        lineNumber: 75,
                                        columnNumber: 15
                                    }, this)
                                }, stageKey, false, {
                                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$fav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FavHeart"], {
                                    kind: sel.kind,
                                    name: sel.name,
                                    className: "absolute end-3 top-3"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                                    lineNumber: 77,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/shop/screens/flow.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-[20px] font-black",
                            children: sel.name
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/flow.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap justify-center gap-1.5",
                            children: sel.chips.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "rounded-full bg-[#E3F6FD] px-3 py-1 text-xs font-bold text-[#006387]",
                                    children: c
                                }, c, false, {
                                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                                    lineNumber: 82,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/flow.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "m-0 text-center text-[13.5px] font-medium leading-[1.9] text-[#1F3E4D]",
                            children: sel.blurb
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/flow.tsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex items-center justify-between gap-2 px-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$fav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FavFilterChips"], {
                        favOnly: favOnly,
                        onToggle: setFavOnly
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$fav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SurpriseButton"], {
                        onPick: ()=>setStageKey((k)=>k + 1)
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            favOnly && list.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-5 mt-3 flex flex-col items-center gap-3 rounded-[22px] border-[1.5px] border-dashed border-[#F7C5D3] bg-[#FFF7FA] px-4 py-7 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeartSticker"], {
                        size: 34,
                        fill: "#FFFFFF",
                        stroke: "#F0426B",
                        strokeWidth: 2.2
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "m-0 text-[14px] font-bold leading-[1.9] text-[#B02A52]",
                        children: "هنوز کسی رو به قلبت اضافه نکردی!"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 99,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setFavOnly(false),
                        className: "h-10 rounded-full bg-[#F0426B] px-5 text-[13px] font-extrabold text-white transition-transform active:scale-95",
                        children: "نشون بده همه رو"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 102,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 97,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 grid grid-cols-3 gap-2.5 px-5",
                children: list.map((p)=>{
                    const isOn = p.kind === picked;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        className: "relative flex cursor-pointer flex-col items-center gap-1 rounded-[22px] bg-white p-2 pb-3 transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#00ABE7]",
                        style: {
                            border: `1.5px solid ${isOn ? "#00ABE7" : "#E1EFF5"}`
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$fav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FavHeart"], {
                                kind: p.kind,
                                name: p.name,
                                size: 20,
                                box: 30,
                                className: "absolute end-1.5 top-1.5 z-10"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 130,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-[92px] w-full items-center justify-center rounded-[16px]",
                                style: {
                                    background: p.bg
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plush"], {
                                    kind: p.kind,
                                    size: 82
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                                    lineNumber: 135,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 131,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[13px] font-extrabold",
                                children: p.name
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 137,
                                columnNumber: 15
                            }, this)
                        ]
                    }, p.kind, true, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 115,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 111,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sticky bottom-0 mt-auto flex items-center justify-between gap-3.5 border-t border-[#D3E8F0] bg-white/95 px-5 pb-[max(14px,env(safe-area-inset-bottom))] pt-3.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[13px] font-semibold text-[#4A6572]",
                                children: "جعبه + کارت پستال"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-lg font-black",
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BOX_PRICE"]),
                                    " تومان"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 147,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("card"),
                        className: "flex h-[54px] items-center gap-2 rounded-full bg-[#00ABE7] px-[26px] text-base font-extrabold text-[#04202E] transition-transform active:scale-95",
                        children: [
                            "ادامه، کارت پستال",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ForwardIcon"], {}, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 155,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/flow.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_s(MobilePick, "SXCPMnMphq7j6OnOBUtEFa1h/RY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHashRoute"]
    ];
});
_c = MobilePick;
function MobileCard() {
    _s1();
    const occ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileCard.usePishnam[occ]": (s)=>s.occasion
    }["MobileCard.usePishnam[occ]"]);
    const setOcc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileCard.usePishnam[setOcc]": (s)=>s.setOccasion
    }["MobileCard.usePishnam[setOcc]"]);
    const message = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileCard.usePishnam[message]": (s)=>s.message
    }["MobileCard.usePishnam[message]"]);
    const setMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileCard.usePishnam[setMessage]": (s)=>s.setMessage
    }["MobileCard.usePishnam[setMessage]"]);
    const anonymous = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileCard.usePishnam[anonymous]": (s)=>s.anonymous
    }["MobileCard.usePishnam[anonymous]"]);
    const setAnonymous = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileCard.usePishnam[setAnonymous]": (s)=>s.setAnonymous
    }["MobileCard.usePishnam[setAnonymous]"]);
    const senderName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileCard.usePishnam[senderName]": (s)=>s.senderName
    }["MobileCard.usePishnam[senderName]"]);
    const setSenderName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileCard.usePishnam[setSenderName]": (s)=>s.setSenderName
    }["MobileCard.usePishnam[setSenderName]"]);
    const cardPassword = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileCard.usePishnam[cardPassword]": (s)=>s.cardPassword
    }["MobileCard.usePishnam[cardPassword]"]);
    const setCardPassword = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileCard.usePishnam[setCardPassword]": (s)=>s.setCardPassword
    }["MobileCard.usePishnam[setCardPassword]"]);
    const photoAdded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileCard.usePishnam[photoAdded]": (s)=>s.photoAdded
    }["MobileCard.usePishnam[photoAdded]"]);
    const addPhoto = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileCard.usePishnam[addPhoto]": (s)=>s.addPhoto
    }["MobileCard.usePishnam[addPhoto]"]);
    const videoAdded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileCard.usePishnam[videoAdded]": (s)=>s.videoAdded
    }["MobileCard.usePishnam[videoAdded]"]);
    const addVideo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileCard.usePishnam[addVideo]": (s)=>s.addVideo
    }["MobileCard.usePishnam[addVideo]"]);
    const nextNo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileCard.usePishnam[nextNo]": (s)=>s.nextNo
    }["MobileCard.usePishnam[nextNo]"]);
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileCard.usePishnam[user]": (s)=>s.user
    }["MobileCard.usePishnam[user]"]);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen flex-col bg-[#F2FAFD] md:hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$nav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MobileTopBar"], {
                title: "قدم ۲ از ۴",
                back: "pick"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 184,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$nav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StepBar"], {
                step: 2
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 185,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-5 pb-1 pt-[22px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "m-0 text-[30px] font-black leading-[1.4]",
                        children: "کارت پستالت رو بنویس"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-0 mt-2 text-[15px] font-medium leading-[1.9] text-[#1F3E4D]",
                        children: "یه کارت پستال فقط با یه QR همراه جعبه می‌رسه. دوستت اسکنش می‌کنه، رمز رو می‌زنه و پیامت رو می‌بینه."
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "no-scrollbar flex gap-2 overflow-x-auto px-5 pb-1 pt-3.5",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OCCASIONS"].map((label, i)=>{
                    const isOn = i === occ;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-pressed": isOn,
                        onClick: ()=>setOcc(i),
                        className: "h-11 shrink-0 rounded-full px-[18px] text-[14.5px] font-bold",
                        style: {
                            background: isOn ? "#00ABE7" : "#fff",
                            border: `1.5px solid ${isOn ? "#04202E" : "#CFE6EF"}`,
                            color: "#04202E"
                        },
                        children: label
                    }, label, false, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 199,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 195,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-5 mt-3 flex flex-col gap-2 rounded-3xl border-[1.5px] border-[#CFE6EF] bg-white px-4 pb-3 pt-3.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "msg",
                        className: "text-sm font-extrabold",
                        children: "پیامت"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 218,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        id: "msg",
                        rows: 5,
                        maxLength: 400,
                        value: message,
                        onChange: (e)=>setMessage(e.target.value),
                        placeholder: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OCCASION_HOLDERS"][occ],
                        className: "min-h-[130px] resize-none border-none bg-transparent text-base leading-[1.9] text-[#04202E] outline-none"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 221,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-[12.5px] font-semibold text-[#4A6572]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "متن، عکس یا ویدیو؛ هر چی دلت خواست"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 231,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(message.length),
                                    " / ۴۰۰"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 232,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 230,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 217,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-5 mt-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$ideas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MessageIdeas"], {
                    occ: occ,
                    onPick: setMessage
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 239,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 238,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-3 px-5 pt-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>{
                            addPhoto();
                            toast({
                                title: "عکس اضافه شد",
                                description: "عکس تو پیامت، روی کارت QR چاپ می‌شه."
                            });
                        },
                        className: "flex h-28 flex-1 flex-col items-center justify-center gap-1.5 rounded-[22px] border-2 border-dashed bg-[#E3F6FD] text-sm font-bold text-[#04202E]",
                        style: {
                            borderColor: photoAdded ? "#04202E" : "#00ABE7",
                            borderStyle: photoAdded ? "solid" : "dashed"
                        },
                        children: [
                            photoAdded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CheckIcon"], {
                                size: 28,
                                stroke: "#04202E"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 252,
                                columnNumber: 25
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PhotoIcon"], {}, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 252,
                                columnNumber: 68
                            }, this),
                            photoAdded ? "عکس اضافه شد ✓" : "افزودن عکس"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 243,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>{
                            addVideo();
                            toast({
                                title: "ویدیو اضافه شد",
                                description: "ویدیو کنار پیامت روی کارت قرار می‌گیره."
                            });
                        },
                        className: "flex h-28 flex-1 flex-col items-center justify-center gap-1.5 rounded-[22px] border-2 border-dashed bg-[#FFE9F0] text-sm font-bold text-[#04202E]",
                        style: {
                            borderColor: videoAdded ? "#04202E" : "#F0426B",
                            borderStyle: videoAdded ? "solid" : "dashed"
                        },
                        children: [
                            videoAdded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CheckIcon"], {
                                size: 28,
                                stroke: "#04202E"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 264,
                                columnNumber: 25
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VideoIcon"], {}, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 264,
                                columnNumber: 68
                            }, this),
                            videoAdded ? "ویدیو اضافه شد ✓" : "افزودن ویدیو"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 255,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 242,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-5 mt-[18px] flex flex-col gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "pw",
                        className: "text-sm font-extrabold",
                        children: "رمز کارت"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 270,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "pw",
                        type: "text",
                        value: cardPassword,
                        onChange: (e)=>setCardPassword(e.target.value),
                        placeholder: "مثلاً اسم اولین جایی که با هم رفتید",
                        className: "box-border h-[54px] rounded-[18px] border-[1.5px] border-[#CFE6EF] bg-white px-4 text-base text-[#04202E] outline-none focus:border-[#00ABE7]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 273,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[12.5px] font-medium leading-[1.8] text-[#4A6572]",
                        children: "فقط کسی که این رمز رو بدونه می‌تونه پیامت رو ببینه. رمز رو بهش بگو یا یه سرنخ بهش بده."
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 281,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 269,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-5 mt-[18px] rounded-3xl border border-[#DDEEF5] bg-white px-4 py-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3 py-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[15px] font-extrabold",
                                        children: "ناشناس بفرست"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                                        lineNumber: 290,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[12.5px] font-medium text-[#4A6572]",
                                        children: "توی جعبه هیچ اسمی نمی‌ذاریم"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                                        lineNumber: 291,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 289,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                role: "switch",
                                "aria-checked": anonymous,
                                "aria-label": "ارسال ناشناس",
                                onClick: ()=>setAnonymous(!anonymous),
                                className: "relative h-8 w-[54px] shrink-0 rounded-full border-none p-0",
                                style: {
                                    background: anonymous ? "#00ABE7" : "#C7DCE5"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "absolute top-[3px] h-[26px] w-[26px] rounded-full bg-white shadow-[0_2px_5px_rgba(4,32,46,0.28)] transition-all",
                                    style: anonymous ? {
                                        left: 3
                                    } : {
                                        right: 3
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                                    lineNumber: 302,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 293,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 288,
                        columnNumber: 9
                    }, this),
                    !anonymous && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2 border-t border-[#E3F0F5] py-3 pb-3.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "nm",
                                className: "text-sm font-extrabold",
                                children: "اسم تو"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 310,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "nm",
                                type: "text",
                                value: senderName,
                                onChange: (e)=>setSenderName(e.target.value),
                                placeholder: user ? user.name : "اسمت چیه؟",
                                className: "box-border h-[50px] rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-4 text-base text-[#04202E] outline-none focus:border-[#00ABE7]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 313,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 309,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 287,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-5 mt-[18px] flex items-center gap-4 rounded-[26px] bg-[#D6F1FB] p-[18px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-[98px] w-32 shrink-0 rotate-[-3deg] items-center justify-center rounded-xl border-[2.5px] border-[#04202E] bg-white",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PostcardQr, {}, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/flow.tsx",
                            lineNumber: 327,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 326,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-base font-extrabold",
                                children: "کارت پستالِ تو"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 330,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[13px] font-medium leading-[1.85] text-[#1F3E4D]",
                                children: [
                                    "روی کارت فقط همین QR هست. شماره‌ی هدیه‌ی تو، ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(nextNo)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                                        lineNumber: 332,
                                        columnNumber: 58
                                    }, this),
                                    "، روی خود جعبه می‌شینه."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 331,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 329,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 325,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sticky bottom-0 mt-auto border-t border-[#D3E8F0] bg-white/95 px-5 pb-[max(14px,env(safe-area-inset-bottom))] pt-3.5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("extras"),
                    className: "flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-[#00ABE7] text-base font-extrabold text-[#04202E] transition-transform active:scale-95",
                    children: [
                        "ادامه، پنجه و قلب",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ForwardIcon"], {}, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/flow.tsx",
                            lineNumber: 345,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 339,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 338,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/flow.tsx",
        lineNumber: 183,
        columnNumber: 5
    }, this);
}
_s1(MobileCard, "/qHNR9Z9WBY7LnygpHj2LzY+htU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c1 = MobileCard;
function MobileExtras() {
    _s2();
    const hearts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileExtras.usePishnam[hearts]": (s)=>s.hearts
    }["MobileExtras.usePishnam[hearts]"]);
    const paws = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileExtras.usePishnam[paws]": (s)=>s.paws
    }["MobileExtras.usePishnam[paws]"]);
    const setHearts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileExtras.usePishnam[setHearts]": (s)=>s.setHearts
    }["MobileExtras.usePishnam[setHearts]"]);
    const setPaws = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileExtras.usePishnam[setPaws]": (s)=>s.setPaws
    }["MobileExtras.usePishnam[setPaws]"]);
    const nextNo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileExtras.usePishnam[nextNo]": (s)=>s.nextNo
    }["MobileExtras.usePishnam[nextNo]"]);
    const done = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCharityDone"])();
    const doneNow = done;
    const barPct = Math.min(100, Math.round(doneNow / __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHARITY_TARGET"] * 100));
    const all = [];
    let hi = 0;
    let pi = 0;
    while(hi < hearts || pi < paws){
        if (hi < hearts) {
            all.push("h");
            hi++;
        }
        if (pi < paws) {
            all.push("p");
            pi++;
        }
    }
    const cap = 26;
    const shown = all.slice(0, cap);
    const hasMore = all.length > cap;
    const more = all.length - cap;
    const total = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BOX_PRICE"] + (hearts + paws) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHARM_PRICE"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen flex-col bg-[#F2FAFD] md:hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$nav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MobileTopBar"], {
                title: "قدم ۳ از ۴",
                back: "card"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 384,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$nav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StepBar"], {
                step: 3
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 385,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-5 pb-1 pt-[22px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "m-0 text-[30px] font-black leading-[1.4]",
                        children: "یه ذره مهربونی اضافه کن"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 388,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-0 mt-2 text-[15px] font-medium leading-[1.9] text-[#1F3E4D]",
                        children: "قلب قرمز و پنجه، استیکرای کوچیکی‌ان که روی جعبه می‌چسبن. پولشون می‌ره برای هدیه به بچه‌های بی‌سرپرست و پناهگاه حیوونا. هر چندتا که دلت خواست."
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 389,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 387,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3 px-5 pt-3.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-3.5 rounded-[28px] border-[1.5px] border-[#F7C5D3] bg-[#FFE9F0] p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full bg-white",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeartSticker"], {
                                            size: 40,
                                            fill: "#F0426B",
                                            stroke: "#04202E",
                                            strokeWidth: 2.4
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/flow.tsx",
                                            lineNumber: 400,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                                        lineNumber: 399,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-[3px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg font-black",
                                                children: "قلب قرمز"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                                lineNumber: 403,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[13px] font-medium text-[#1F3E4D]",
                                                children: "برای هدیه به بچه‌های بی‌سرپرست"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                                lineNumber: 404,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                                        lineNumber: 402,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 398,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-bold",
                                        children: [
                                            "هر کدوم ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHARM_PRICE"]),
                                            " تومان"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                                        lineNumber: 408,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Counter, {
                                        value: hearts,
                                        onMinus: ()=>setHearts(hearts - 1),
                                        onPlus: ()=>setHearts(hearts + 1),
                                        minusLabel: "یکی کم کن",
                                        plusLabel: "یکی زیاد کن",
                                        plusBg: "#F0426B",
                                        plusStroke: "#fff"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                                        lineNumber: 409,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 407,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 397,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-3.5 rounded-[28px] border-[1.5px] border-[#B5E3F5] bg-[#E3F6FD] p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full bg-white",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PawIcon"], {
                                            size: 38
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/flow.tsx",
                                            lineNumber: 425,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                                        lineNumber: 424,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-[3px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg font-black",
                                                children: "پنجه"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                                lineNumber: 428,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[13px] font-medium text-[#1F3E4D]",
                                                children: "برای هدیه به پناهگاه حیوونا"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                                lineNumber: 429,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                                        lineNumber: 427,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 423,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-bold",
                                        children: [
                                            "هر کدوم ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHARM_PRICE"]),
                                            " تومان"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                                        lineNumber: 433,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Counter, {
                                        value: paws,
                                        onMinus: ()=>setPaws(paws - 1),
                                        onPlus: ()=>setPaws(paws + 1),
                                        minusLabel: "یکی کم کن",
                                        plusLabel: "یکی زیاد کن",
                                        plusBg: "#00ABE7",
                                        plusStroke: "#04202E"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                                        lineNumber: 434,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 432,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 422,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 395,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-5 mt-[18px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pb-2.5 text-[15px] font-extrabold",
                        children: "روی جعبه‌ت این‌جوری می‌شینه"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 449,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative box-border min-h-[150px] rounded-[26px] border-[2.5px] border-[#04202E] bg-[#00ABE7] px-4 pb-4 pt-[18px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute -top-0.5 left-[22px] h-11 w-[18px] rounded-b-md bg-[#04202E]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 451,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "inline-flex rotate-[-3deg] flex-col items-center rounded-[14px] border-[2.5px] border-[#04202E] bg-white px-3.5 pb-1 pt-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10.5px] font-bold text-[#4A6572]",
                                        children: "هدیه‌ی شماره"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                                        lineNumber: 453,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[26px] font-black leading-[1.1]",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(nextNo)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                                        lineNumber: 454,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 452,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-1 pt-3",
                                children: [
                                    shown.map((k, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex",
                                            style: {
                                                transform: `rotate(${i * 37 % 28 - 14}deg)`
                                            },
                                            children: k === "h" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeartSticker"], {
                                                size: 34,
                                                fill: "#F0426B",
                                                stroke: "#fff",
                                                strokeWidth: 3.6
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                                lineNumber: 460,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PawSticker"], {
                                                size: 34
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                                lineNumber: 462,
                                                columnNumber: 19
                                            }, this)
                                        }, i, false, {
                                            fileName: "[project]/src/components/shop/screens/flow.tsx",
                                            lineNumber: 458,
                                            columnNumber: 15
                                        }, this)),
                                    hasMore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-[14px] bg-[#04202E] px-2.5 py-1.5 text-[13px] font-extrabold text-white",
                                        children: [
                                            "+",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(more)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                                        lineNumber: 467,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 456,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 450,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 448,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-5 mt-4 flex flex-col gap-2.5 rounded-3xl border border-[#DDEEF5] bg-white px-[18px] py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[15px] font-extrabold",
                                children: "اولین بسته‌ی خیریه"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 478,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[13px] font-bold text-[#006387]",
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(doneNow),
                                    " از ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHARITY_TARGET"])
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 479,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 477,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-3 overflow-hidden rounded-full bg-[#E3F0F5]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-3 rounded-full bg-[#00ABE7] transition-all",
                            style: {
                                width: `${barPct}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/flow.tsx",
                            lineNumber: 484,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 483,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[12.5px] font-medium leading-[1.85] text-[#4A6572]",
                        children: "وقتی تعداد قلب و پنجه‌ها به هدفمون برسه، هدیه‌ها رو می‌خریم، می‌فرستیم و مدرکش رو تو «دفتر مهربونی» می‌ذاریم."
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 486,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 476,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sticky bottom-0 mt-auto flex items-center gap-3.5 border-t border-[#D3E8F0] bg-white/95 px-5 pb-[max(14px,env(safe-area-inset-bottom))] pt-3.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-1 flex-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[13px] font-semibold text-[#4A6572]",
                                children: "جمع (جعبه + قلب و پنجه)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 494,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-lg font-black",
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(total),
                                    " تومان"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 495,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 493,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("checkout"),
                        className: "flex h-[54px] items-center gap-2 rounded-full bg-[#00ABE7] px-[26px] text-base font-extrabold text-[#04202E] transition-transform active:scale-95",
                        children: [
                            "برو به سبد",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ForwardIcon"], {}, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 503,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 497,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 492,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/flow.tsx",
        lineNumber: 383,
        columnNumber: 5
    }, this);
}
_s2(MobileExtras, "llXAIflmSb3pank7+MNFp2AtHts=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCharityDone"]
    ];
});
_c2 = MobileExtras;
function Counter({ value, onMinus, onPlus, minusLabel, plusLabel, plusBg, plusStroke }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-1 rounded-full bg-white p-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-label": minusLabel,
                onClick: onMinus,
                className: "flex h-11 w-11 items-center justify-center rounded-full border-none bg-[#F2FAFD]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MinusIcon"], {}, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 535,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 529,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "min-w-[38px] text-center text-xl font-black",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(value)
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 537,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-label": plusLabel,
                onClick: onPlus,
                className: "flex h-11 w-11 items-center justify-center rounded-full border-none",
                style: {
                    background: plusBg
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlusSmall"], {
                    stroke: plusStroke
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 545,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 538,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/flow.tsx",
        lineNumber: 528,
        columnNumber: 5
    }, this);
}
_c3 = Counter;
function MobileCheckout() {
    _s3();
    const nextNo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileCheckout.usePishnam[nextNo]": (s)=>s.nextNo
    }["MobileCheckout.usePishnam[nextNo]"]);
    const kind = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileCheckout.usePishnam[kind]": (s)=>s.kind
    }["MobileCheckout.usePishnam[kind]"]);
    const hearts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileCheckout.usePishnam[hearts]": (s)=>s.hearts
    }["MobileCheckout.usePishnam[hearts]"]);
    const paws = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileCheckout.usePishnam[paws]": (s)=>s.paws
    }["MobileCheckout.usePishnam[paws]"]);
    const receiver = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileCheckout.usePishnam[receiver]": (s)=>s.receiver
    }["MobileCheckout.usePishnam[receiver]"]);
    const setReceiver = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileCheckout.usePishnam[setReceiver]": (s)=>s.setReceiver
    }["MobileCheckout.usePishnam[setReceiver]"]);
    const quote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileCheckout.usePishnam[quote]": (s)=>s.quote
    }["MobileCheckout.usePishnam[quote]"]);
    const quoteStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileCheckout.usePishnam[quoteStatus]": (s)=>s.quoteStatus
    }["MobileCheckout.usePishnam[quoteStatus]"]);
    const fetchQuote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileCheckout.usePishnam[fetchQuote]": (s)=>s.fetchQuote
    }["MobileCheckout.usePishnam[fetchQuote]"]);
    const paymentMethod = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileCheckout.usePishnam[paymentMethod]": (s)=>s.paymentMethod
    }["MobileCheckout.usePishnam[paymentMethod]"]);
    const setPaymentMethod = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileCheckout.usePishnam[setPaymentMethod]": (s)=>s.setPaymentMethod
    }["MobileCheckout.usePishnam[setPaymentMethod]"]);
    // server quote — the only payable number (guide §4.5)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MobileCheckout.useEffect": ()=>{
            void fetchQuote();
        }
    }["MobileCheckout.useEffect"], [
        fetchQuote,
        kind,
        hearts,
        paws,
        receiver.province
    ]);
    const sel = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLUSHES"].find((p)=>p.kind === kind) ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLUSHES"][0];
    const total = quote?.total ?? 0;
    const cartRows = quote ? [
        {
            isHeart: false,
            bg: sel.bg,
            title: `${sel.name}، دوست پشمالو`,
            sub: "جعبه‌ی کادویی + کارت پستال QR",
            amount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(quote.total - quote.shipping - quote.charms)
        },
        ...quote.charms > 0 ? [
            {
                isHeart: true,
                bg: "#FFE9F0",
                title: `قلب و پنجه × ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(hearts + paws)}`,
                sub: "برای بچه‌های بی‌سرپرست و حیوونا",
                amount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(quote.charms)
            }
        ] : []
    ] : [];
    const valid = receiver.name.trim() !== "" && receiver.phone.trim().length >= 8 && receiver.address.trim() !== "";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen flex-col bg-[#F2FAFD] md:hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$nav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MobileTopBar"], {
                title: "قدم ۴ از ۴",
                back: "extras"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 587,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$nav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StepBar"], {
                step: 4
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 588,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-5 pb-1 pt-[22px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "m-0 text-[30px] font-black leading-[1.4]",
                    children: "سبد و پرداخت"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 591,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 590,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative mx-5 mt-3 flex items-stretch overflow-hidden rounded-[26px] bg-[#00ABE7]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex w-[118px] shrink-0 flex-col items-center justify-center py-[18px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-bold",
                                children: "هدیه‌ی شماره"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 597,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[44px] font-black leading-[1.15]",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(nextNo)
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 598,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 596,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "my-3.5 w-0 border-r-[2.5px] border-dashed border-[#04202E]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 600,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-1 flex-col justify-center gap-1 px-4 py-[18px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-base font-black",
                                children: "این شماره مال هدیه‌ی توئه"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 602,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[12.5px] font-medium leading-[1.8]",
                                children: "روی جعبه و کارت پستال می‌شینه و اسمش تو دفتر ما ثبت می‌شه."
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 603,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 601,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute -top-3 right-[106px] h-6 w-6 rounded-full bg-[#F2FAFD]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 607,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute -bottom-3 right-[106px] h-6 w-6 rounded-full bg-[#F2FAFD]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 608,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 595,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-5 mt-4 rounded-[26px] border border-[#DDEEF5] bg-white px-4 py-2",
                children: [
                    cartRows.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 border-b border-[#E3F0F5] py-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex h-16 w-16 shrink-0 items-center justify-center rounded-[18px]",
                                    style: {
                                        background: r.isHeart ? "#FFE9F0" : sel.bg
                                    },
                                    children: r.isHeart ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeartSticker"], {
                                        size: 26,
                                        fill: "#F0426B",
                                        stroke: "#04202E",
                                        strokeWidth: 2.6
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                                        lineNumber: 620,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plush"], {
                                        kind: sel.kind,
                                        size: 54
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                                        lineNumber: 622,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                                    lineNumber: 615,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-1 flex-col gap-0.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[15px] font-extrabold",
                                            children: r.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/flow.tsx",
                                            lineNumber: 626,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[12.5px] font-medium text-[#4A6572]",
                                            children: r.sub
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/flow.tsx",
                                            lineNumber: 627,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                                    lineNumber: 625,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-extrabold",
                                    children: r.amount
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                                    lineNumber: 629,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, r.title, true, {
                            fileName: "[project]/src/components/shop/screens/flow.tsx",
                            lineNumber: 614,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between py-3 pb-1.5 text-sm font-semibold text-[#4A6572]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "هزینه‌ی ارسال"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 633,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: quote ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(quote.shipping) : quoteStatus === "loading" ? "در حال محاسبه…" : "—"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 634,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 632,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between py-2 pb-3 text-[17px] font-black",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "جمع کل"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 637,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: quote ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(total)} تومان` : "در حال محاسبه…"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 638,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 636,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 612,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-5 pb-2 pt-[22px] text-lg font-extrabold",
                children: "گیرنده‌ی هدیه"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 643,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-5 rounded-[26px] border border-[#DDEEF5] bg-white px-4 py-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                        label: "اسم گیرنده",
                        value: receiver.name,
                        onChange: (v)=>setReceiver({
                                name: v
                            }),
                        placeholder: "اسم دوستت"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 645,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                        label: "شماره‌ی موبایل گیرنده",
                        value: receiver.phone,
                        onChange: (v)=>setReceiver({
                                phone: v
                            }),
                        placeholder: "۰۹۱۲ ۱۲۳ ۴۵۶۷",
                        tel: true
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 651,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-1 border-b border-[#E3F0F5] py-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "province",
                                className: "text-[12.5px] font-bold text-[#4A6572]",
                                children: "استان"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 659,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                id: "province",
                                value: receiver.province,
                                onChange: (e)=>setReceiver({
                                        province: e.target.value
                                    }),
                                className: "h-9 w-full appearance-none border-none bg-transparent text-base font-semibold text-[#04202E] outline-none",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2f$provinces$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PROVINCES"].map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: p,
                                        children: p
                                    }, p, false, {
                                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                                        lineNumber: 669,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 662,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 658,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                        label: "شهر",
                        value: receiver.city,
                        onChange: (v)=>setReceiver({
                                city: v
                            }),
                        placeholder: "مثلاً تهران"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 675,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-1 border-b border-[#E3F0F5] py-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "ra",
                                className: "text-[12.5px] font-bold text-[#4A6572]",
                                children: "آدرس کامل"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 682,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                id: "ra",
                                rows: 2,
                                value: receiver.address,
                                onChange: (e)=>setReceiver({
                                        address: e.target.value
                                    }),
                                placeholder: "خیابان، کوچه، پلاک، واحد",
                                className: "resize-none border-none bg-transparent text-base leading-[1.8] text-[#04202E] outline-none"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 685,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 681,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 644,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-5 mt-3.5 flex items-center gap-2.5 rounded-[22px] border border-dashed border-[#BFDDE8] bg-[#F8FDFF] py-3 pl-4 pr-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-lg",
                        children: "🎁"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 698,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[12.5px] font-semibold leading-[1.8] text-[#4A6572]",
                        children: "کد تخفیف نداری؟ به‌زودی اولین کد مهربونی اینجا فعال می‌شه — بیهوده منتظر تخفیف‌های تقلبی نمی‌مونی."
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 699,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 697,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-5 pb-2 pt-[22px] text-lg font-extrabold",
                children: "روش پرداخت"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 705,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-5 flex flex-col gap-2.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setPaymentMethod("zarinpal"),
                        className: "flex items-center gap-3 rounded-[22px] border-2 bg-white px-4 py-3.5 text-right transition-colors",
                        style: {
                            borderColor: paymentMethod === "zarinpal" ? "#00ABE7" : "#DDEEF5"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border-2 border-[#04202E]",
                                style: {
                                    background: paymentMethod === "zarinpal" ? "#00ABE7" : "white"
                                },
                                children: paymentMethod === "zarinpal" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CheckIcon"], {
                                    size: 14,
                                    stroke: "#04202E"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                                    lineNumber: 717,
                                    columnNumber: 46
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 713,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-1 flex-col gap-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[15px] font-extrabold",
                                        children: "پرداخت آنلاین"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                                        lineNumber: 720,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[12.5px] font-medium text-[#4A6572]",
                                        children: "با همه‌ی کارت‌های عضو شتاب، از درگاه امن بانکی"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                                        lineNumber: 721,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 719,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "26",
                                height: "26",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "#04202E",
                                strokeWidth: "2",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                "aria-hidden": "true",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                        x: "3",
                                        y: "6",
                                        width: "18",
                                        height: "13",
                                        rx: "3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                                        lineNumber: 726,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M3 10.5h18M7 15h4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                                        lineNumber: 727,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 725,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 707,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setPaymentMethod("manual_transfer"),
                        className: "flex items-center gap-3 rounded-[22px] border-2 bg-white px-4 py-3.5 text-right transition-colors",
                        style: {
                            borderColor: paymentMethod === "manual_transfer" ? "#00ABE7" : "#DDEEF5"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border-2 border-[#04202E]",
                                style: {
                                    background: paymentMethod === "manual_transfer" ? "#00ABE7" : "white"
                                },
                                children: paymentMethod === "manual_transfer" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CheckIcon"], {
                                    size: 14,
                                    stroke: "#04202E"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                                    lineNumber: 740,
                                    columnNumber: 53
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 736,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-1 flex-col gap-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[15px] font-extrabold",
                                        children: "کارت به کارت / بله‌پی"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                                        lineNumber: 743,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[12.5px] font-medium text-[#4A6572]",
                                        children: "مبلغ رو می‌ریزی، عکس رسید رو آپلود می‌کنی؛ تا ۱۲ ساعت بررسی می‌شه"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                                        lineNumber: 744,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 742,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "26",
                                height: "26",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "#04202E",
                                strokeWidth: "2",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                "aria-hidden": "true",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                        x: "2",
                                        y: "5",
                                        width: "20",
                                        height: "14",
                                        rx: "2"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                                        lineNumber: 749,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M2 10h20M6 15h5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                                        lineNumber: 750,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 748,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 730,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 706,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 pt-3.5 text-center text-[12.5px] font-medium leading-[1.9] text-[#4A6572]",
                children: "با پرداخت، قوانین و شرایط یک دوست رو قبول می‌کنی. رسید قلب‌ها و پنجه‌ها بعد از ارسال هدیه‌ها تو دفتر مهربونی ثبت می‌شه."
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 755,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sticky bottom-0 mt-auto flex items-center gap-3.5 border-t border-[#D3E8F0] bg-white/95 px-5 pb-[max(14px,env(safe-area-inset-bottom))] pt-3.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[13px] font-semibold text-[#4A6572]",
                                children: "جمع کل"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 762,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-lg font-black",
                                children: quote ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(total)} تومان` : "…"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 763,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 761,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        disabled: !valid || !quote,
                        onClick: ()=>{
                            const evt = new CustomEvent("pishnam:pay");
                            window.dispatchEvent(evt);
                        },
                        className: "flex h-[54px] flex-1 items-center justify-center gap-2 rounded-full text-base font-extrabold transition-all active:scale-95",
                        style: {
                            background: valid && quote ? "#00ABE7" : "#CFE6EF",
                            color: "#04202E",
                            opacity: valid && quote ? 1 : 0.7
                        },
                        children: [
                            "پرداخت و فرستادن",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeartSticker"], {
                                size: 20,
                                fill: "#04202E",
                                stroke: "none"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/flow.tsx",
                                lineNumber: 776,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/flow.tsx",
                        lineNumber: 765,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 760,
                columnNumber: 7
            }, this),
            !valid && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-[#FFF3C9] px-5 pb-3 pt-2 text-center text-xs font-bold text-[#7A5C00]",
                children: "برای پرداخت، اسم، موبایل و آدرس گیرنده رو کامل کن"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 780,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-[86px]",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 785,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/flow.tsx",
        lineNumber: 586,
        columnNumber: 5
    }, this);
}
_s3(MobileCheckout, "FAWVjjuMWwxbqppOm8rz7lvgDaQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"]
    ];
});
_c4 = MobileCheckout;
function Field({ label, value, onChange, placeholder, tel }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-1 border-b border-[#E3F0F5] py-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "text-[12.5px] font-bold text-[#4A6572]",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 805,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: tel ? "tel" : "text",
                inputMode: tel ? "numeric" : undefined,
                value: value,
                onChange: (e)=>onChange(e.target.value),
                placeholder: placeholder,
                className: "h-[30px] border-none bg-transparent text-base text-[#04202E] outline-none"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/flow.tsx",
                lineNumber: 806,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/flow.tsx",
        lineNumber: 804,
        columnNumber: 5
    }, this);
}
_c5 = Field;
function PostcardQr() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "72",
        height: "72",
        viewBox: "0 0 25 25",
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
            fill: "#04202E",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    fillRule: "evenodd",
                    d: "M0 0h7v7H0zM1 1v5h5V1z"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 822,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "2",
                    y: "2",
                    width: "3",
                    height: "3"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 823,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    fillRule: "evenodd",
                    transform: "translate(18 0)",
                    d: "M0 0h7v7H0zM1 1v5h5V1z"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 824,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "20",
                    y: "2",
                    width: "3",
                    height: "3"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 825,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    fillRule: "evenodd",
                    transform: "translate(0 18)",
                    d: "M0 0h7v7H0zM1 1v5h5V1z"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 826,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "2",
                    y: "20",
                    width: "3",
                    height: "3"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 827,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "9",
                    y: "0",
                    width: "2",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 828,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "12",
                    y: "2",
                    width: "2",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 829,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "9",
                    y: "5",
                    width: "3",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 830,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "14",
                    y: "6",
                    width: "2",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 831,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "0",
                    y: "9",
                    width: "2",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 832,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "4",
                    y: "10",
                    width: "3",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 833,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "9",
                    y: "9",
                    width: "2",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 834,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "13",
                    y: "10",
                    width: "3",
                    height: "3"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 835,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "18",
                    y: "9",
                    width: "2",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 836,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "22",
                    y: "11",
                    width: "3",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 837,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "2",
                    y: "13",
                    width: "2",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 838,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "7",
                    y: "14",
                    width: "2",
                    height: "3"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 839,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "11",
                    y: "14",
                    width: "2",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 840,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "16",
                    y: "15",
                    width: "3",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 841,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "21",
                    y: "15",
                    width: "2",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 842,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "9",
                    y: "18",
                    width: "3",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 843,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "14",
                    y: "19",
                    width: "2",
                    height: "3"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 844,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "18",
                    y: "20",
                    width: "2",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 845,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "22",
                    y: "21",
                    width: "3",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 846,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "10",
                    y: "22",
                    width: "2",
                    height: "3"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/flow.tsx",
                    lineNumber: 847,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/shop/screens/flow.tsx",
            lineNumber: 821,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/shop/screens/flow.tsx",
        lineNumber: 820,
        columnNumber: 5
    }, this);
}
_c6 = PostcardQr;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "MobilePick");
__turbopack_context__.k.register(_c1, "MobileCard");
__turbopack_context__.k.register(_c2, "MobileExtras");
__turbopack_context__.k.register(_c3, "Counter");
__turbopack_context__.k.register(_c4, "MobileCheckout");
__turbopack_context__.k.register(_c5, "Field");
__turbopack_context__.k.register(_c6, "PostcardQr");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_shop_screens_flow_tsx_bc846f95._.js.map