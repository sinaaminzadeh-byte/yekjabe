(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/shop/screens/product.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductScreen",
    ()=>ProductScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// ── Product detail screen — #/product?slug=bear (wave-0 route-ready) ──
// In the sandbox it lives on the hash router; at the deploy wave the same
// sections become /product/[slug] server components with real metadata.
// SEO: useDocumentMeta (client title/desc) + Product/FAQ/Breadcrumb JSON-LD.
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hash-route.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$metadata$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/seo/metadata.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$product$2d$catalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/seo/product-catalog.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/seo/site.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$jsonld$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/seo/jsonld.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$jsonld$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/jsonld.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/plush.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/logo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/icons.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pishnam-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/fa.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
function ProductScreen() {
    _s();
    const { query } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHashRoute"])();
    const product = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$product$2d$catalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProductSeo"])(query.get("slug"));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$metadata$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDocumentMeta"])({
        title: product ? product.nameFa : "این دوست پشمالو پیدا نشد",
        description: product?.description
    });
    if (!product) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductNotFound, {}, void 0, false, {
        fileName: "[project]/src/components/shop/screens/product.tsx",
        lineNumber: 44,
        columnNumber: 24
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductDetail, {
        product: product
    }, void 0, false, {
        fileName: "[project]/src/components/shop/screens/product.tsx",
        lineNumber: 45,
        columnNumber: 10
    }, this);
}
_s(ProductScreen, "47aW0tcPRs4MCOd6DdkMjpkNpTI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHashRoute"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$metadata$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDocumentMeta"]
    ];
});
_c = ProductScreen;
/* ═══════════════ detail (valid slug) ═══════════════ */ function ProductDetail({ product }) {
    const productLd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$jsonld$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["productJsonLd"])(product.slug);
    const crumbs = [
        {
            name: "خانه",
            url: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE"].url
        },
        {
            name: "دوست‌های پشمالو",
            url: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE"].url}/#friends`
        },
        {
            name: product.nameFa
        }
    ];
    const others = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLUSHES"].filter((p)=>p.kind !== product.slug);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            productLd && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$jsonld$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonLd"], {
                data: productLd
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 61,
                columnNumber: 21
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$jsonld$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonLd"], {
                data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$jsonld$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["faqJsonLd"])(product.faq)
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$jsonld$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonLd"], {
                data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$jsonld$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["breadcrumbJsonLd"])(crumbs)
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileProduct, {
                product: product,
                others: others
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DesktopProduct, {
                product: product,
                others: others
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c1 = ProductDetail;
/* ═══════════════ shared pieces ═══════════════ */ function Crumbs({ name, desktop = false }) {
    const item = desktop ? "text-[13.5px] font-semibold text-[#4A6572]" : "text-[12.5px] font-semibold text-[#4A6572]";
    const current = desktop ? "text-[13.5px] font-extrabold text-[#04202E]" : "text-[12.5px] font-extrabold text-[#04202E]";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        "aria-label": "مسیر صفحه",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
            className: `m-0 flex list-none flex-wrap items-center gap-1.5 p-0 ${desktop ? "gap-2" : ""}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("home"),
                        className: `${item} transition-colors hover:text-[#006387]`,
                        children: "خانه"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/product.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    "aria-hidden": "true",
                    className: item,
                    children: "/"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/product.tsx",
                    lineNumber: 87,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("home", undefined, "friends"),
                        className: `${item} transition-colors hover:text-[#006387]`,
                        children: "دوست‌های پشمالو"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 89,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/product.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    "aria-hidden": "true",
                    className: item,
                    children: "/"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/product.tsx",
                    lineNumber: 97,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    "aria-current": "page",
                    className: current,
                    children: name
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/product.tsx",
                    lineNumber: 98,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/shop/screens/product.tsx",
            lineNumber: 81,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/shop/screens/product.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}
_c2 = Crumbs;
// Hero art: big plush on its brand color + placeholder gift-box / QR postcard art
function ProductArt({ product, plushSize }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex h-full w-full items-center justify-center overflow-hidden",
        style: {
            background: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLUSH_MAP"][product.slug].bg
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plush"], {
                kind: product.slug,
                size: plushSize,
                className: "pishnam-float"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute right-[5%] top-[7%] rotate-[-10deg]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeartSticker"], {
                    size: 38,
                    fill: "#F0426B",
                    stroke: "#04202E",
                    strokeWidth: 2.6
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/product.tsx",
                    lineNumber: 113,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute left-[7%] top-[14%] rotate-[12deg]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeartSticker"], {
                    size: 26,
                    fill: "#fff",
                    stroke: "#04202E",
                    strokeWidth: 2.6
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/product.tsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-[6%] left-[6%] rotate-[-6deg] rounded-[18px] border-[2.5px] border-[#04202E] bg-white px-3.5 pb-2 pt-3 text-center shadow-[0_10px_22px_rgba(4,32,46,0.12)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QrCode"], {
                        size: 46
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1 text-[10.5px] font-bold text-[#4A6572]",
                        children: "کارت پستال رمزدار"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-[8%] right-[7%] rotate-[7deg] rounded-[14px] border-[2.5px] border-[#04202E] bg-[#00ABE7] px-3 py-2 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[10px] font-bold text-[#04202E]",
                        children: "جعبه‌ی هدیه"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[13px] font-black leading-[1.3] text-[#04202E]",
                        children: "یه بغل، تو یه جعبه"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/product.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
_c3 = ProductArt;
function FeatureRow({ text, i }) {
    const Icon = i % 2 === 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeartIcon"] : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PawIcon"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-start gap-2.5 rounded-[18px] border border-[#DDEEF5] bg-white px-3.5 py-2.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                className: "mt-0.5 shrink-0"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[14px] font-medium leading-[1.85] text-[#1F3E4D]",
                children: text
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/product.tsx",
        lineNumber: 134,
        columnNumber: 5
    }, this);
}
_c4 = FeatureRow;
function OccasionChips({ product }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap gap-2",
        children: product.occasionTags.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "rounded-full bg-[#E3F6FD] px-3.5 py-1.5 text-[13px] font-bold text-[#006387]",
                children: t
            }, t, false, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 145,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/shop/screens/product.tsx",
        lineNumber: 143,
        columnNumber: 5
    }, this);
}
_c5 = OccasionChips;
function FaqItem({ q, a }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
        className: "group rounded-[20px] border border-[#DDEEF5] bg-white px-4 py-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                className: "flex cursor-pointer list-none items-center justify-between gap-2.5 text-[14.5px] font-extrabold [&::-webkit-details-marker]:hidden",
                children: [
                    q,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D6F1FB] transition-transform group-open:rotate-45",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlusIcon"], {
                            size: 14,
                            stroke: "#04202E"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/product.tsx",
                            lineNumber: 162,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 159,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-0 mt-2.5 text-[13.5px] font-medium leading-[2] text-[#1F3E4D]",
                children: a
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 165,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/product.tsx",
        lineNumber: 158,
        columnNumber: 5
    }, this);
}
_c6 = FaqItem;
/* ═══════════════ mobile (390 design) ═══════════════ */ function MobileProduct({ product, others }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen flex-col bg-[#F2FAFD] text-[#04202E] md:hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-4 pb-2 pt-3.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-label": "برگشت",
                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("home"),
                        className: "flex h-11 w-11 items-center justify-center rounded-full border border-[#D3E8F0] bg-white text-[#04202E]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BackIcon"], {}, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/product.tsx",
                            lineNumber: 189,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Logo"], {
                        size: 32
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 191,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 182,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-5 pt-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Crumbs, {
                    name: product.nameFa
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/product.tsx",
                    lineNumber: 195,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 194,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-5 mt-2.5 h-[300px] overflow-hidden rounded-[32px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductArt, {
                    product: product,
                    plushSize: 228
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/product.tsx",
                    lineNumber: 200,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 199,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-1.5 px-5 pt-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "m-0 text-[27px] font-black leading-[1.45]",
                        children: product.nameFa
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 205,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "m-0 text-[15px] font-bold leading-[1.8] text-[#006387]",
                        children: product.shortTagline
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 206,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "m-0 text-[14.5px] font-medium leading-[2.05] text-[#1F3E4D]",
                        children: product.description
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 204,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-5 mt-4 flex items-center justify-between gap-3 rounded-[24px] border border-[#DDEEF5] bg-white px-4 py-3.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[21px] font-black leading-[1.25]",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["faPrice"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BOX_PRICE"])
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/product.tsx",
                                lineNumber: 213,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-full bg-[#D6F1FB] px-2.5 py-0.5 text-[11px] font-extrabold text-[#006387]",
                                children: "یه قیمت برای همه"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/product.tsx",
                                lineNumber: 214,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 212,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#D6F1FB]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PawSticker"], {
                            size: 30
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/product.tsx",
                            lineNumber: 219,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 218,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 211,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "flex flex-col gap-2.5 px-5 pt-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "m-0 text-[19px] font-extrabold",
                        children: "چی تو جعبه‌ست؟"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 225,
                        columnNumber: 9
                    }, this),
                    product.features.map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FeatureRow, {
                            text: f,
                            i: i
                        }, f, false, {
                            fileName: "[project]/src/components/shop/screens/product.tsx",
                            lineNumber: 227,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 224,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "flex flex-col gap-2.5 px-5 pt-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "m-0 text-[19px] font-extrabold",
                        children: "برای چه بهانه‌ای؟"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 233,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OccasionChips, {
                        product: product
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 234,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 232,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "flex flex-col gap-2.5 px-5 pt-7",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "m-0 text-[19px] font-extrabold",
                        children: "سؤال‌های رایج"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 239,
                        columnNumber: 9
                    }, this),
                    product.faq.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FaqItem, {
                            q: f.q,
                            a: f.a
                        }, f.q, false, {
                            fileName: "[project]/src/components/shop/screens/product.tsx",
                            lineNumber: 241,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 238,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "pt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-baseline justify-between px-5 pb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "m-0 text-[19px] font-extrabold",
                                children: "بقیه‌ی دوست‌های پشمالو"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/product.tsx",
                                lineNumber: 248,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("home", undefined, "friends"),
                                className: "text-[13px] font-bold text-[#006387]",
                                children: "همه‌شون ›"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/product.tsx",
                                lineNumber: 249,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 247,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "no-scrollbar flex gap-3 overflow-x-auto px-5 pb-2 pt-1",
                        children: others.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "aria-label": `دیدن ${p.name}`,
                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("product", {
                                        slug: p.kind
                                    }),
                                className: "w-32 shrink-0 rounded-[22px] border border-[#DDEEF5] bg-white p-2 pb-3 text-right transition-transform active:scale-[0.97]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex h-[104px] items-center justify-center rounded-[16px]",
                                        style: {
                                            background: p.bg
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plush"], {
                                            kind: p.kind,
                                            size: 92
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/product.tsx",
                                            lineNumber: 270,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/product.tsx",
                                        lineNumber: 266,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pt-1.5 text-[13.5px] font-extrabold",
                                        children: p.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/product.tsx",
                                        lineNumber: 272,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[11.5px] font-bold text-[#006387]",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["faPrice"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BOX_PRICE"])
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/product.tsx",
                                        lineNumber: 273,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, p.kind, true, {
                                fileName: "[project]/src/components/shop/screens/product.tsx",
                                lineNumber: 259,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 257,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 246,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sticky bottom-[var(--pn-mnav-h)] mt-auto flex items-center justify-between gap-3.5 border-t border-[#D3E8F0] bg-white/95 px-5 pb-[max(14px,env(safe-area-inset-bottom))] pt-3.5 backdrop-blur",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex shrink-0 flex-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[17px] font-black leading-[1.3]",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["faPrice"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BOX_PRICE"])
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/product.tsx",
                                lineNumber: 282,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] font-bold text-[#4A6572]",
                                children: "یه قیمت برای همه"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/product.tsx",
                                lineNumber: 283,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 281,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("pick", {
                                kind: product.slug
                            }),
                        className: "flex h-12 flex-1 items-center justify-center rounded-full bg-[#04202E] px-6 text-[15px] font-extrabold text-white transition-transform active:scale-[0.98]",
                        children: "بساز و بفرست"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 285,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 280,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/product.tsx",
        lineNumber: 180,
        columnNumber: 5
    }, this);
}
_c7 = MobileProduct;
/* ═══════════════ desktop (1200 landing) ═══════════════ */ function DesktopProduct({ product, others }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "hidden min-h-screen flex-col bg-[#F2FAFD] text-[#04202E] md:flex",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto w-full max-w-[1200px] px-6 pt-5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Crumbs, {
                    name: product.nameFa,
                    desktop: true
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/product.tsx",
                    lineNumber: 309,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 308,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mx-auto w-full max-w-[1200px] px-6 pt-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap items-center gap-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex min-w-0 flex-[1_1_420px] justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "aspect-square w-[min(460px,100%)] overflow-hidden rounded-[40px]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductArt, {
                                    product: product,
                                    plushSize: 300
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/product.tsx",
                                    lineNumber: 317,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/product.tsx",
                                lineNumber: 316,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/product.tsx",
                            lineNumber: 315,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex min-w-0 flex-[1_1_460px] flex-col items-start gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "self-start rounded-2xl bg-[#04202E] px-4 py-2 text-[13.5px] font-bold text-white",
                                    children: "جعبه‌ی هدیه‌ی یک دوست"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/product.tsx",
                                    lineNumber: 321,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "m-0 text-[40px] font-black leading-[1.35]",
                                    children: product.nameFa
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/product.tsx",
                                    lineNumber: 324,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "m-0 text-[19px] font-bold text-[#006387]",
                                    children: product.shortTagline
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/product.tsx",
                                    lineNumber: 325,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "m-0 max-w-[560px] text-[15.5px] font-medium leading-[2.05] text-[#1F3E4D]",
                                    children: product.description
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/product.tsx",
                                    lineNumber: 326,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-1 flex flex-wrap items-center gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[30px] font-black",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["faPrice"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BOX_PRICE"])
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/product.tsx",
                                            lineNumber: 330,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "rounded-full bg-[#D6F1FB] px-4 py-1.5 text-[13px] font-extrabold text-[#006387]",
                                            children: "یه قیمت برای همه"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/product.tsx",
                                            lineNumber: 331,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/shop/screens/product.tsx",
                                    lineNumber: 329,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-1 flex flex-wrap gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("pick", {
                                                    kind: product.slug
                                                }),
                                            className: "flex h-[58px] items-center rounded-full bg-[#04202E] px-[34px] text-[17px] font-extrabold text-white transition-transform hover:scale-[1.03]",
                                            children: "بساز و بفرست"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/product.tsx",
                                            lineNumber: 336,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("home", undefined, "friends"),
                                            className: "box-border flex h-[58px] items-center rounded-full border-[2.5px] border-[#04202E] px-7 text-base font-bold text-[#04202E] transition-colors hover:bg-[#04202E] hover:text-white",
                                            children: "دوست‌های دیگه رو ببین"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/product.tsx",
                                            lineNumber: 343,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/shop/screens/product.tsx",
                                    lineNumber: 335,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-2 flex flex-wrap gap-x-[22px] gap-y-2 text-sm font-bold text-[#4A6572]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "ارسال ناشناس"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/product.tsx",
                                            lineNumber: 352,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "کارت QR رمزدار"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/product.tsx",
                                            lineNumber: 353,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "پیام صوتی ۹۰ ثانیه‌ای"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/product.tsx",
                                            lineNumber: 354,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/shop/screens/product.tsx",
                                    lineNumber: 351,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/shop/screens/product.tsx",
                            lineNumber: 320,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shop/screens/product.tsx",
                    lineNumber: 314,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 313,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mx-auto w-full max-w-[1200px] px-6 pt-14",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap gap-[18px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "box-border flex min-w-0 flex-[1_1_460px] flex-col gap-3 rounded-[32px] border border-[#DDEEF5] bg-white p-[26px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "m-0 text-[22px] font-black",
                                    children: "چی تو جعبه‌ست؟"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/product.tsx",
                                    lineNumber: 364,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 gap-2.5",
                                    children: product.features.map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FeatureRow, {
                                            text: f,
                                            i: i
                                        }, f, false, {
                                            fileName: "[project]/src/components/shop/screens/product.tsx",
                                            lineNumber: 367,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/product.tsx",
                                    lineNumber: 365,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/shop/screens/product.tsx",
                            lineNumber: 363,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "box-border flex min-w-0 flex-[1_1_300px] flex-col gap-3.5 rounded-[32px] bg-[#D6F1FB] p-[26px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "m-0 text-[22px] font-black",
                                    children: "برای چه بهانه‌ای؟"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/product.tsx",
                                    lineNumber: 372,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OccasionChips, {
                                    product: product
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/product.tsx",
                                    lineNumber: 373,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "m-0 text-[14.5px] font-medium leading-[2] text-[#1F3E4D]",
                                    children: "هر جعبه با کارت پستال QR رمزدار و پیام صوتی خودت می‌رسه؛ اگه اسمت رو ننویسی، هیچ‌کس نمی‌دونه کی فرستاده."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/product.tsx",
                                    lineNumber: 374,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/shop/screens/product.tsx",
                            lineNumber: 371,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shop/screens/product.tsx",
                    lineNumber: 362,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 361,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mx-auto w-full max-w-[1200px] px-6 pt-[72px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "m-0 mb-6 text-[34px] font-black leading-[1.4]",
                        children: "سؤال‌های رایج"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 384,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-4",
                        children: product.faq.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                                className: "group box-border flex min-w-0 flex-[1_1_460px] flex-col rounded-[26px] border border-[#DDEEF5] bg-white px-[26px] py-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                        className: "flex cursor-pointer list-none items-center justify-between gap-3 text-lg font-extrabold [&::-webkit-details-marker]:hidden",
                                        children: [
                                            f.q,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D6F1FB] transition-transform group-open:rotate-45",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlusIcon"], {
                                                    size: 15,
                                                    stroke: "#04202E"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/shop/screens/product.tsx",
                                                    lineNumber: 394,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/product.tsx",
                                                lineNumber: 393,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/product.tsx",
                                        lineNumber: 391,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-0 mt-2.5 text-[15px] font-medium leading-[2] text-[#1F3E4D]",
                                        children: f.a
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/product.tsx",
                                        lineNumber: 397,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, f.q, true, {
                                fileName: "[project]/src/components/shop/screens/product.tsx",
                                lineNumber: 387,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 385,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 383,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mx-auto w-full max-w-[1200px] px-6 pt-[72px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-7 flex flex-wrap items-end justify-between gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "m-0 text-[34px] font-black leading-[1.4]",
                                children: "بقیه‌ی دوست‌های پشمالو"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/product.tsx",
                                lineNumber: 406,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("home", undefined, "friends"),
                                className: "text-sm font-bold text-[#006387]",
                                children: "همه‌شون ›"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/product.tsx",
                                lineNumber: 407,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 405,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-4",
                        children: others.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "aria-label": `دیدن ${p.name}`,
                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("product", {
                                        slug: p.kind
                                    }),
                                className: "group box-border flex min-w-0 flex-[1_1_170px] cursor-pointer flex-col gap-1.5 rounded-[28px] border border-[#DDEEF5] bg-white p-3 pb-[18px] text-right transition-all hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(4,32,46,0.08)]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex h-[180px] items-center justify-center rounded-[20px] transition-transform group-hover:scale-[1.04]",
                                        style: {
                                            background: p.bg
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plush"], {
                                            kind: p.kind,
                                            size: 150
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/product.tsx",
                                            lineNumber: 428,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/product.tsx",
                                        lineNumber: 424,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pt-2 text-lg font-extrabold",
                                        children: p.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/product.tsx",
                                        lineNumber: 430,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[13px] font-medium text-[#4A6572]",
                                        children: p.chips.join(" · ")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/product.tsx",
                                        lineNumber: 431,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[14.5px] font-extrabold text-[#006387]",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["faPrice"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BOX_PRICE"])
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/product.tsx",
                                        lineNumber: 432,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, p.kind, true, {
                                fileName: "[project]/src/components/shop/screens/product.tsx",
                                lineNumber: 417,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 415,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 404,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-20"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 438,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/product.tsx",
        lineNumber: 307,
        columnNumber: 5
    }, this);
}
_c8 = DesktopProduct;
/* ═══════════════ not found (unknown/missing slug) ═══════════════ */ function ProductNotFound() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen flex-col bg-[#F2FAFD] text-[#04202E]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-4 pb-2 pt-3.5 md:hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-label": "برگشت",
                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("home"),
                        className: "flex h-11 w-11 items-center justify-center rounded-full border border-[#D3E8F0] bg-white text-[#04202E]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BackIcon"], {}, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/product.tsx",
                            lineNumber: 456,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 450,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Logo"], {
                        size: 32
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 458,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 449,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1 flex-col items-center justify-center gap-5 px-6 py-24 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PawSticker"], {
                        size: 56
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 461,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "m-0 text-[26px] font-black leading-[1.5] md:text-[38px]",
                        children: "این دوست پشمالو پیدا نشد"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 462,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "m-0 max-w-[460px] text-[15px] font-medium leading-[2] text-[#1F3E4D] md:text-base",
                        children: "ظاهراً این آدرس اشتباهه یا رفیقمون یه جایی قایم شده. برگرد و از بین شش تا دوست پشمالو یکی رو انتخاب کن."
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 465,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("home"),
                        className: "flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#04202E] px-7 text-[15px] font-extrabold text-white transition-transform hover:scale-[1.03]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BackIcon"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/product.tsx",
                                lineNumber: 474,
                                columnNumber: 11
                            }, this),
                            "بازگشت به خانه"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/product.tsx",
                        lineNumber: 469,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/product.tsx",
                lineNumber: 460,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/product.tsx",
        lineNumber: 447,
        columnNumber: 5
    }, this);
}
_c9 = ProductNotFound;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "ProductScreen");
__turbopack_context__.k.register(_c1, "ProductDetail");
__turbopack_context__.k.register(_c2, "Crumbs");
__turbopack_context__.k.register(_c3, "ProductArt");
__turbopack_context__.k.register(_c4, "FeatureRow");
__turbopack_context__.k.register(_c5, "OccasionChips");
__turbopack_context__.k.register(_c6, "FaqItem");
__turbopack_context__.k.register(_c7, "MobileProduct");
__turbopack_context__.k.register(_c8, "DesktopProduct");
__turbopack_context__.k.register(_c9, "ProductNotFound");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/shop/screens/friends.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FriendsDesktop",
    ()=>FriendsDesktop,
    "FriendsMobile",
    ()=>FriendsMobile,
    "FriendsScreen",
    ()=>FriendsScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// ── «دوستای پشمالو» — the product catalog screen (#/friends) ──
// Owner request: a dedicated products page (6 today, grows with the catalog —
// the list is driven by the SERVER catalog, not a hardcoded array) plus a rich
// graphical «پروسه‌ی کار ما» section: 4-step illustrated journey with a dashed
// rail, numbered nodes, QR-card visual and floating plush stickers.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/plush.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/icons.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hash-route.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pishnam-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pishnam-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/fa.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$metadata$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/seo/metadata.ts [app-client] (ecmascript)");
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
/* ── process content: «هدیه‌ات چطور ساخته و ارسال می‌شه؟» ── */ const PROCESS_STEPS = [
    {
        n: "۱",
        title: "دوست پشمالو رو انتخاب می‌کنی",
        body: "از بین دوستامون یکی رو برمی‌داری؛ همه یه قیمت دارن، پس قیمت وسط تصمیم نیست — فقط به دلت گوش بده.",
        bg: "#CDEFFB",
        accent: "#00ABE7",
        icon: "paw"
    },
    {
        n: "۲",
        title: "پیامت رو می‌نویسی",
        body: "نامه‌ت، عکس یا ویدیوت و یه رمز مخصوص خودت؛ همه‌ش می‌شه یه کارت پستال QR رمزدار که فقط خود گیرنده بازش می‌کنه.",
        bg: "#FFE0EA",
        accent: "#F0426B",
        icon: "mail"
    },
    {
        n: "۳",
        title: "ما با دست بسته‌بندیش می‌کنیم",
        body: "عروسک، قلب و پنجه‌ها و کارتت با دقت تو جعبه‌ی کادویی چیده می‌شن؛ سفارش‌ها حداکثر ۲ روز کاری بعد از پرداخت راهی می‌شن.",
        bg: "#FFF3C9",
        accent: "#D9A400",
        icon: "box"
    },
    {
        n: "۴",
        title: "جعبه دم در گیرنده‌ست",
        body: "مستقیم به آدرس دوستت ارسال می‌شه؛ اگه ناشناس بخوای هیچ اثری از اسمت نیست — فقط یه بغل که رسیده.",
        bg: "#DDF3EA",
        accent: "#00A876",
        icon: "heart"
    }
];
/** Server catalog is the source of truth; art/names come from the local defs.
 * Unknown future slugs still render (generic card) — nothing hardcodes «۶». */ function useCatalogList() {
    _s();
    const catalog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "useCatalogList.usePishnam[catalog]": (s)=>s.catalog
    }["useCatalogList.usePishnam[catalog]"]);
    const catalogLoaded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "useCatalogList.usePishnam[catalogLoaded]": (s)=>s.catalogLoaded
    }["useCatalogList.usePishnam[catalogLoaded]"]);
    const loadCatalog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "useCatalogList.usePishnam[loadCatalog]": (s)=>s.loadCatalog
    }["useCatalogList.usePishnam[loadCatalog]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCatalogList.useEffect": ()=>{
            if (!catalogLoaded) void loadCatalog();
        }
    }["useCatalogList.useEffect"], [
        catalogLoaded,
        loadCatalog
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useCatalogList.useMemo": ()=>{
            const entries = Object.values(catalog);
            const source = entries.length > 0 ? entries.map({
                "useCatalogList.useMemo": (e)=>{
                    const def = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLUSH_MAP"][e.slug];
                    return {
                        slug: e.slug,
                        name: def?.name ?? e.name,
                        chips: def?.chips ?? [
                            "پشمالو",
                            "مهربون",
                            "بغلی"
                        ],
                        blurb: def?.blurb ?? "یه دوست پشمالوی تازه که به‌زودی اینجا معرفیش می‌کنیم.",
                        bg: def?.bg ?? "#E7E0FA",
                        price: e.priceToman,
                        inStock: e.inStock,
                        kind: def ? e.slug : null
                    };
                }
            }["useCatalogList.useMemo"]) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLUSHES"].map({
                "useCatalogList.useMemo": (p)=>({
                        slug: p.kind,
                        name: p.name,
                        chips: p.chips,
                        blurb: p.blurb,
                        bg: p.bg,
                        price: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BOX_PRICE"],
                        inStock: true,
                        kind: p.kind
                    })
            }["useCatalogList.useMemo"]);
            return source;
        }
    }["useCatalogList.useMemo"], [
        catalog
    ]);
}
_s(useCatalogList, "QM69jXFhfv3G7y0OKU1+VljUMsY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"]
    ];
});
function StepArt({ icon, accent }) {
    if (icon === "paw") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PawIcon"], {
        size: 30,
        fill: accent,
        stroke: "#04202E"
    }, void 0, false, {
        fileName: "[project]/src/components/shop/screens/friends.tsx",
        lineNumber: 116,
        columnNumber: 30
    }, this);
    if (icon === "mail") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MailIcon"], {
        size: 30
    }, void 0, false, {
        fileName: "[project]/src/components/shop/screens/friends.tsx",
        lineNumber: 117,
        columnNumber: 31
    }, this);
    if (icon === "box") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GiftBoxIcon"], {
        size: 30
    }, void 0, false, {
        fileName: "[project]/src/components/shop/screens/friends.tsx",
        lineNumber: 118,
        columnNumber: 30
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeartIcon"], {
        size: 30
    }, void 0, false, {
        fileName: "[project]/src/components/shop/screens/friends.tsx",
        lineNumber: 119,
        columnNumber: 10
    }, this);
}
_c = StepArt;
/* ═══════════════ shared pieces ═══════════════ */ function PriceTag({ price }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[13px] font-black text-[#04202E] shadow-[0_2px_8px_rgba(4,32,46,0.08)]",
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(price),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[11px] font-bold text-[#4A6572]",
                children: "تومان"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/friends.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/friends.tsx",
        lineNumber: 126,
        columnNumber: 5
    }, this);
}
_c1 = PriceTag;
function StockChip({ inStock }) {
    return inStock ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "rounded-full bg-[#DDF3EA] px-2.5 py-1 text-[11px] font-extrabold text-[#00805C]",
        children: "موجوده ✓"
    }, void 0, false, {
        fileName: "[project]/src/components/shop/screens/friends.tsx",
        lineNumber: 135,
        columnNumber: 5
    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "rounded-full bg-[#FFE9F0] px-2.5 py-1 text-[11px] font-extrabold text-[#B02A52]",
        children: "فعلاً تموم شده"
    }, void 0, false, {
        fileName: "[project]/src/components/shop/screens/friends.tsx",
        lineNumber: 137,
        columnNumber: 5
    }, this);
}
_c2 = StockChip;
function TrustRow({ className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex flex-wrap justify-center gap-2.5 ${className}`,
        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HOME_TRUST"].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-flex items-center gap-2 rounded-full border border-[#D3E8F0] bg-white px-3.5 py-2 text-[12px] font-extrabold text-[#04202E]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[#00ABE7]",
                        "aria-hidden": "true",
                        children: t.icon
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                        lineNumber: 149,
                        columnNumber: 11
                    }, this),
                    t.title
                ]
            }, t.title, true, {
                fileName: "[project]/src/components/shop/screens/friends.tsx",
                lineNumber: 145,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/shop/screens/friends.tsx",
        lineNumber: 143,
        columnNumber: 5
    }, this);
}
_c3 = TrustRow;
function CtaBand() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative overflow-hidden rounded-[28px] bg-[#04202E] px-6 py-9 text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute -left-3 -top-3 rotate-12",
                "aria-hidden": "true",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeartSticker"], {
                    size: 44,
                    fill: "#F0426B"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/friends.tsx",
                    lineNumber: 160,
                    columnNumber: 78
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/friends.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute -bottom-4 -right-2 -rotate-12",
                "aria-hidden": "true",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PawSticker"], {
                    size: 46
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/friends.tsx",
                    lineNumber: 161,
                    columnNumber: 83
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/friends.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "m-0 text-[17px] font-black text-white",
                children: "آماده‌ای یه بغل تازه در راه باشه؟"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/friends.tsx",
                lineNumber: 162,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "m-0 pb-4 pt-1.5 text-[12.5px] font-medium leading-[1.9] text-[#9FC4D4]",
                children: "دوستت رو انتخاب کن، پیامت رو بنویس — بقیه‌ش با ما."
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/friends.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("pick"),
                className: "inline-flex h-[52px] items-center gap-2 rounded-full bg-[#00ABE7] px-8 text-[15.5px] font-extrabold text-[#04202E] transition-transform hover:scale-[1.03] active:scale-95",
                children: [
                    "انتخاب دوست پشمالو",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeartSticker"], {
                        size: 18,
                        fill: "#04202E",
                        stroke: "none"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                        lineNumber: 172,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/friends.tsx",
                lineNumber: 166,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/friends.tsx",
        lineNumber: 159,
        columnNumber: 5
    }, this);
}
_c4 = CtaBand;
function FriendsMobile() {
    _s1();
    const list = useCatalogList();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen flex-col bg-[#F2FAFD] pb-8 md:hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "relative overflow-hidden px-5 pb-6 pt-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute -left-5 top-2 rotate-12 opacity-90",
                        "aria-hidden": "true",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeartSticker"], {
                            size: 40
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/friends.tsx",
                            lineNumber: 186,
                            columnNumber: 90
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                        lineNumber: 186,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute left-16 top-24 -rotate-6 opacity-80",
                        "aria-hidden": "true",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PawSticker"], {
                            size: 34
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/friends.tsx",
                            lineNumber: 187,
                            columnNumber: 91
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "m-0 text-[30px] font-black leading-[1.4]",
                        children: "دوستای پشمالو"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "m-0 pt-1.5 text-[13.5px] font-medium leading-[2] text-[#4A6572]",
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(list.length || 6),
                            " تا رفیق پشمالو، هرکدوم یه جور بغل می‌کنن. همه‌شون با یه جعبه‌ی کادویی، کارت پستال QR رمزدار و پیام صوتی به دست دوستت می‌رسن."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-none flex items-end justify-center gap-1 pt-4",
                        "aria-hidden": "true",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLUSHES"].map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: i % 2 ? "translate-y-2" : "",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plush"], {
                                    kind: p.kind,
                                    size: 52
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/friends.tsx",
                                    lineNumber: 195,
                                    columnNumber: 15
                                }, this)
                            }, p.kind, false, {
                                fileName: "[project]/src/components/shop/screens/friends.tsx",
                                lineNumber: 194,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                        lineNumber: 192,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/friends.tsx",
                lineNumber: 185,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                "aria-label": "لیست دوستای پشمالو",
                className: "flex flex-col gap-4 px-5 pt-2",
                children: list.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: "relative overflow-hidden rounded-[26px] border border-[#DDEEF5] bg-white p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 rounded-[20px] p-4",
                                style: {
                                    background: p.bg
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pishnam-float shrink-0",
                                        children: p.kind ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plush"], {
                                            kind: p.kind,
                                            size: 92
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/friends.tsx",
                                            lineNumber: 214,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex h-[92px] w-[92px] items-center justify-center text-[44px]",
                                            "aria-hidden": "true",
                                            children: "🧸"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/friends.tsx",
                                            lineNumber: 216,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                                        lineNumber: 212,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex min-w-0 flex-1 flex-col gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "m-0 truncate text-[17px] font-black",
                                                        children: p.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                                                        lineNumber: 221,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "shrink-0 text-[11px] font-black text-[#5B7482]",
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(i + 1)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                                                        lineNumber: 222,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/shop/screens/friends.tsx",
                                                lineNumber: 220,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-1.5",
                                                children: p.chips.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "rounded-full bg-white/85 px-2 py-0.5 text-[10.5px] font-bold text-[#1F3E4D]",
                                                        children: c
                                                    }, c, false, {
                                                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                                                        lineNumber: 226,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/friends.tsx",
                                                lineNumber: 224,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                                        lineNumber: 219,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/friends.tsx",
                                lineNumber: 208,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "m-0 pb-3 pt-3 text-[12.5px] font-medium leading-[2] text-[#1F3E4D]",
                                children: p.blurb
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/friends.tsx",
                                lineNumber: 231,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center justify-between gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PriceTag, {
                                        price: p.price
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                                        lineNumber: 233,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StockChip, {
                                        inStock: p.inStock
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                                        lineNumber: 234,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/friends.tsx",
                                lineNumber: 232,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2 pt-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("product", {
                                                slug: p.slug
                                            }),
                                        className: "flex h-11 flex-1 items-center justify-center gap-1 rounded-full border-2 border-[#04202E] bg-white text-[13px] font-extrabold text-[#04202E] transition-transform active:scale-95",
                                        children: [
                                            "بیشتر بشناسش",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ForwardIcon"], {
                                                size: 15
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/friends.tsx",
                                                lineNumber: 243,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                                        lineNumber: 237,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        disabled: !p.inStock,
                                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("pick", {
                                                kind: p.slug
                                            }),
                                        className: "flex h-11 flex-1 items-center justify-center rounded-full bg-[#00ABE7] text-[13px] font-extrabold text-[#04202E] transition-transform active:scale-95 disabled:opacity-50",
                                        children: "ساخت هدیه"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                                        lineNumber: 245,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/friends.tsx",
                                lineNumber: 236,
                                columnNumber: 13
                            }, this)
                        ]
                    }, p.slug, true, {
                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                        lineNumber: 204,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/friends.tsx",
                lineNumber: 202,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProcessSection, {
                desktop: false,
                className: "px-5 pt-10"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/friends.tsx",
                lineNumber: 258,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TrustRow, {
                className: "px-5 pt-7"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/friends.tsx",
                lineNumber: 259,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-5 pt-7",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CtaBand, {}, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/friends.tsx",
                    lineNumber: 261,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/friends.tsx",
                lineNumber: 260,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/friends.tsx",
        lineNumber: 183,
        columnNumber: 5
    }, this);
}
_s1(FriendsMobile, "V9+7E7dKJ2xQnZHBJv5QSK7ZZpc=", false, function() {
    return [
        useCatalogList
    ];
});
_c5 = FriendsMobile;
/* ═══════════════ the process section (mobile rail / desktop zigzag) ═══════════════ */ function ProcessSection({ desktop, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-label": "پروسه‌ی کار ما",
        className: className,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: `m-0 text-center font-black text-[#04202E] ${desktop ? "text-[26px]" : "text-[21px]"}`,
                    children: "هدیه‌ات چطور ساخته و ارسال می‌شه؟"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/friends.tsx",
                    lineNumber: 273,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: `m-0 text-center font-medium leading-[2] text-[#4A6572] ${desktop ? "pb-10 pt-2" : "pb-6 pt-1.5 text-[12.5px]"}`,
                    children: "چهار قدم ساده از کلیک تا بغل"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/friends.tsx",
                    lineNumber: 276,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            "aria-hidden": "true",
                            className: desktop ? "absolute bottom-6 left-1/2 top-6 -translate-x-1/2 border-r-2 border-dashed border-[#9ECFDF]" : "absolute bottom-6 right-[27px] top-6 border-r-2 border-dashed border-[#9ECFDF]"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/friends.tsx",
                            lineNumber: 282,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex flex-col ${desktop ? "gap-12" : "gap-7"}`,
                            children: PROCESS_STEPS.map((s, i)=>{
                                const card = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `relative rounded-[24px] border border-[#DDEEF5] bg-white ${desktop ? "max-w-[470px] p-6" : "p-4"}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "absolute top-4 rounded-full px-2.5 py-1 text-[10.5px] font-black",
                                            style: {
                                                background: s.bg,
                                                color: "#04202E"
                                            },
                                            children: [
                                                "قدم ",
                                                s.n
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/shop/screens/friends.tsx",
                                            lineNumber: 296,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `flex items-start gap-3 ${desktop ? "pt-9" : "pt-8"}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: desktop ? "flex-1" : "min-w-0 flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: `m-0 font-black text-[#04202E] ${desktop ? "pb-1.5 text-[17px]" : "pb-1 text-[15px]"}`,
                                                            children: s.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/shop/screens/friends.tsx",
                                                            lineNumber: 304,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: `m-0 font-medium leading-[2] text-[#1F3E4D] ${desktop ? "text-[13.5px]" : "text-[12px]"}`,
                                                            children: s.body
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/shop/screens/friends.tsx",
                                                            lineNumber: 305,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/shop/screens/friends.tsx",
                                                    lineNumber: 303,
                                                    columnNumber: 21
                                                }, this),
                                                s.icon === "mail" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "shrink-0 rounded-xl bg-[#F8FDFF] p-1.5",
                                                    "aria-hidden": "true",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QrCode"], {
                                                        size: desktop ? 58 : 44
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                                                        lineNumber: 309,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/shop/screens/friends.tsx",
                                                    lineNumber: 308,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/shop/screens/friends.tsx",
                                            lineNumber: 302,
                                            columnNumber: 19
                                        }, this),
                                        desktop && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "pointer-events-none absolute -bottom-3 left-6 h-6 w-24 rounded-full opacity-25 blur-md",
                                            style: {
                                                background: s.accent
                                            },
                                            "aria-hidden": "true"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/friends.tsx",
                                            lineNumber: 314,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/shop/screens/friends.tsx",
                                    lineNumber: 293,
                                    columnNumber: 17
                                }, this);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `relative flex items-start gap-3.5 ${desktop ? i % 2 ? "flex-row-reverse" : "" : ""}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `relative z-10 flex shrink-0 items-center justify-center rounded-full border-4 border-white font-black text-white shadow-[0_4px_12px_rgba(4,32,46,0.18)] ${desktop ? "h-[52px] w-[52px] text-[19px]" : "h-[42px] w-[42px] text-[16px]"}`,
                                            style: {
                                                background: s.accent
                                            },
                                            "aria-hidden": "true",
                                            children: s.n
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/friends.tsx",
                                            lineNumber: 329,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: desktop ? i % 2 ? "me-auto" : "ms-auto" : "min-w-0 flex-1",
                                            children: card
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/friends.tsx",
                                            lineNumber: 336,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, s.n, true, {
                                    fileName: "[project]/src/components/shop/screens/friends.tsx",
                                    lineNumber: 324,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/friends.tsx",
                            lineNumber: 290,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shop/screens/friends.tsx",
                    lineNumber: 280,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/shop/screens/friends.tsx",
            lineNumber: 272,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/shop/screens/friends.tsx",
        lineNumber: 271,
        columnNumber: 5
    }, this);
}
_c6 = ProcessSection;
function FriendsDesktop() {
    _s2();
    const list = useCatalogList();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "hidden min-h-screen flex-col bg-[#F2FAFD] md:flex",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "relative mx-auto w-full max-w-[1200px] overflow-hidden px-6 pb-4 pt-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute left-10 top-10 rotate-12",
                        "aria-hidden": "true",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeartSticker"], {
                            size: 52
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/friends.tsx",
                            lineNumber: 355,
                            columnNumber: 80
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                        lineNumber: 355,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute right-[42%] top-6 -rotate-6",
                        "aria-hidden": "true",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PawSticker"], {
                            size: 44
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/friends.tsx",
                            lineNumber: 356,
                            columnNumber: 83
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                        lineNumber: 356,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-auto max-w-[640px] text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "m-0 text-[38px] font-black leading-[1.5] text-[#04202E]",
                                children: "دوستای پشمالو"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/friends.tsx",
                                lineNumber: 358,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "m-0 pt-3 text-[15px] font-medium leading-[2.1] text-[#4A6572]",
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(list.length || 6),
                                    " تا رفیق پشمالو که هرکدوم یه جور بغل می‌کنن. انتخاب با دلت — قیمت همه‌شون یکیه:",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        className: "text-[#04202E]",
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BOX_PRICE"]),
                                            " تومان"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                                        lineNumber: 361,
                                        columnNumber: 18
                                    }, this),
                                    " با جعبه‌ی کادویی، کارت پستال QR رمزدار و پیام صوتی."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/friends.tsx",
                                lineNumber: 359,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                        lineNumber: 357,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-none flex items-end justify-center gap-4 pt-6",
                        "aria-hidden": "true",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLUSHES"].map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: i % 2 ? "translate-y-3" : "pishnam-float",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plush"], {
                                    kind: p.kind,
                                    size: 78
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/friends.tsx",
                                    lineNumber: 367,
                                    columnNumber: 15
                                }, this)
                            }, p.kind, false, {
                                fileName: "[project]/src/components/shop/screens/friends.tsx",
                                lineNumber: 366,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                        lineNumber: 364,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/friends.tsx",
                lineNumber: 354,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                "aria-label": "لیست دوستای پشمالو",
                className: "mx-auto flex w-full max-w-[1200px] flex-wrap justify-center gap-6 px-6 pb-2 pt-8",
                children: list.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: "group flex w-[368px] flex-col overflow-hidden rounded-[28px] border border-[#DDEEF5] bg-white p-4 transition-all hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(4,32,46,0.10)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex items-center justify-center rounded-[22px] p-5",
                                style: {
                                    background: p.bg
                                },
                                children: [
                                    p.kind ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plush"], {
                                        kind: p.kind,
                                        size: 150,
                                        className: "transition-transform duration-300 group-hover:scale-105"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                                        lineNumber: 382,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex h-[150px] w-[150px] items-center justify-center text-[64px]",
                                        "aria-hidden": "true",
                                        children: "🧸"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                                        lineNumber: 384,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute start-3 top-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StockChip, {
                                            inStock: p.inStock
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/friends.tsx",
                                            lineNumber: 386,
                                            columnNumber: 56
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                                        lineNumber: 386,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/friends.tsx",
                                lineNumber: 380,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "m-0 pb-1 pt-4 text-[19px] font-black text-[#04202E]",
                                children: p.name
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/friends.tsx",
                                lineNumber: 388,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-1.5 pb-2",
                                children: p.chips.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full bg-[#F2FAFD] px-2.5 py-1 text-[11px] font-bold text-[#1F3E4D]",
                                        children: c
                                    }, c, false, {
                                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                                        lineNumber: 391,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/friends.tsx",
                                lineNumber: 389,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "m-0 min-h-[56px] text-[13px] font-medium leading-[2] text-[#1F3E4D]",
                                children: p.blurb
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/friends.tsx",
                                lineNumber: 394,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between pb-3 pt-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PriceTag, {
                                        price: p.price
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                                        lineNumber: 396,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[11.5px] font-bold text-[#4A6572]",
                                        children: "ارسال مستقیم دم در"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                                        lineNumber: 397,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/friends.tsx",
                                lineNumber: 395,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("product", {
                                                slug: p.slug
                                            }),
                                        className: "flex h-12 flex-1 items-center justify-center gap-1.5 rounded-full border-2 border-[#04202E] bg-white text-[13.5px] font-extrabold text-[#04202E] transition-colors hover:bg-[#F2FAFD]",
                                        children: [
                                            "بیشتر بشناسش",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ForwardIcon"], {
                                                size: 15
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/friends.tsx",
                                                lineNumber: 406,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                                        lineNumber: 400,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        disabled: !p.inStock,
                                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("pick", {
                                                kind: p.slug
                                            }),
                                        className: "flex h-12 flex-1 items-center justify-center rounded-full bg-[#00ABE7] text-[13.5px] font-extrabold text-[#04202E] transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50",
                                        children: "ساخت هدیه"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                                        lineNumber: 408,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/friends.tsx",
                                lineNumber: 399,
                                columnNumber: 13
                            }, this)
                        ]
                    }, p.slug, true, {
                        fileName: "[project]/src/components/shop/screens/friends.tsx",
                        lineNumber: 376,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/friends.tsx",
                lineNumber: 374,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProcessSection, {
                desktop: true,
                className: "mx-auto w-full max-w-[1100px] px-6 pb-2 pt-16"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/friends.tsx",
                lineNumber: 421,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TrustRow, {
                className: "px-6 pt-12"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/friends.tsx",
                lineNumber: 422,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto w-full max-w-[760px] px-6 pb-14 pt-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CtaBand, {}, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/friends.tsx",
                    lineNumber: 424,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/friends.tsx",
                lineNumber: 423,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/friends.tsx",
        lineNumber: 352,
        columnNumber: 5
    }, this);
}
_s2(FriendsDesktop, "V9+7E7dKJ2xQnZHBJv5QSK7ZZpc=", false, function() {
    return [
        useCatalogList
    ];
});
_c7 = FriendsDesktop;
function FriendsScreen() {
    _s3();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$metadata$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDocumentMeta"])({
        title: "دوستای پشمالو",
        description: "معرفی عروسک‌های پولیشی یک دوست: خرس، خرگوش، گربه، پاندا، گوسفند و اردک — همه با یه قیمت و جعبه‌ی هدیه‌ی آماده برای ارسال."
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FriendsMobile, {}, void 0, false, {
                fileName: "[project]/src/components/shop/screens/friends.tsx",
                lineNumber: 439,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FriendsDesktop, {}, void 0, false, {
                fileName: "[project]/src/components/shop/screens/friends.tsx",
                lineNumber: 440,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s3(FriendsScreen, "7UeBLU24djjsZXincb7R0m5255c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$metadata$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDocumentMeta"]
    ];
});
_c8 = FriendsScreen;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "StepArt");
__turbopack_context__.k.register(_c1, "PriceTag");
__turbopack_context__.k.register(_c2, "StockChip");
__turbopack_context__.k.register(_c3, "TrustRow");
__turbopack_context__.k.register(_c4, "CtaBand");
__turbopack_context__.k.register(_c5, "FriendsMobile");
__turbopack_context__.k.register(_c6, "ProcessSection");
__turbopack_context__.k.register(_c7, "FriendsDesktop");
__turbopack_context__.k.register(_c8, "FriendsScreen");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/shop/screens/success.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DesktopSuccess",
    ()=>DesktopSuccess,
    "MobileSuccess",
    ()=>MobileSuccess,
    "QrGlyph",
    ()=>QrGlyph
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// ── Success screen: mobile + desktop — ACK/poll per guide §4.7/§B4 ──
// Polls GET /api/checkout/{key}/status until the server confirms payment;
// shows honest per-state cards (paid / receipt-under-review / retry).
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/logo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/plush.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/icons.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hash-route.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pishnam-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/fa.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$track$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/screens/track.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$manual$2d$payment$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/manual-payment.tsx [app-client] (ecmascript)");
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
const STEP_BGS = [
    "#CDEFFB",
    "#FFE0EA",
    "#FFF3C9",
    "#E7E0FA"
];
function stateFromStatus(s) {
    switch(s){
        case "paid":
        case "preparing":
        case "shipped":
        case "delivered":
        case "refund_requested":
        case "refunded":
            return "paid";
        case "payment_under_review":
            return "under_review";
        case "failed":
            return "failed";
        case "cancelled":
            return "cancelled";
        case "expired":
            return "expired";
        default:
            return "awaiting";
    }
}
/** Polls the ACK endpoint every 3s (max ~90s) while the order is unpaid. */ function useOrderStatus() {
    _s();
    const pendingOrder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "useOrderStatus.usePishnam[pendingOrder]": (s)=>s.pendingOrder
    }["useOrderStatus.usePishnam[pendingOrder]"]);
    const setPendingStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "useOrderStatus.usePishnam[setPendingStatus]": (s)=>s.setPendingStatus
    }["useOrderStatus.usePishnam[setPendingStatus]"]);
    const [st, setSt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("loading");
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const polls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useOrderStatus.useEffect": ()=>{
            if (!pendingOrder?.key) {
                setSt("none");
                return;
            }
            let alive = true;
            const tick = {
                "useOrderStatus.useEffect.tick": async ()=>{
                    try {
                        const res = await fetch(`/api/checkout/${pendingOrder.key}/status`, {
                            cache: "no-store"
                        });
                        if (!res.ok) throw new Error("bad");
                        const body = await res.json();
                        if (!alive) return;
                        setData(body);
                        const next = stateFromStatus(body.status);
                        setSt(next);
                        setPendingStatus(body.status);
                        if (next === "paid" || next === "cancelled" || next === "expired") return; // terminal
                    } catch  {
                        if (alive && polls.current === 0) setSt("awaiting");
                    }
                    polls.current += 1;
                    if (alive && polls.current < 30) window.setTimeout(tick, 3000);
                }
            }["useOrderStatus.useEffect.tick"];
            void tick();
            return ({
                "useOrderStatus.useEffect": ()=>{
                    alive = false;
                }
            })["useOrderStatus.useEffect"];
        }
    }["useOrderStatus.useEffect"], [
        pendingOrder?.key,
        setPendingStatus
    ]);
    return {
        st,
        data
    };
}
_s(useOrderStatus, "VH0waKVKoC14dmzu3sIS6Pk1sYI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"]
    ];
});
/** «بررسی مجدد پرداخت» — guide §4.9.6 (timeout path + re-arm). */ function useRecheck() {
    _s1();
    const pendingOrder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "useRecheck.usePishnam[pendingOrder]": (s)=>s.pendingOrder
    }["useRecheck.usePishnam[pendingOrder]"]);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const recheck = async ()=>{
        if (!pendingOrder?.code || !pendingOrder?.key) return {
            ok: false
        };
        setBusy(true);
        try {
            const res = await fetch("/api/payment/zarinpal/recheck", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    code: pendingOrder.code,
                    key: pendingOrder.key
                })
            });
            if (!res.ok) return {
                ok: false
            };
            const body = await res.json();
            if (body.paid) return {
                ok: true,
                paid: true
            };
            if (body.payment?.redirectUrl) return {
                ok: true,
                redirectUrl: body.payment.redirectUrl
            };
            return {
                ok: true
            };
        } catch  {
            return {
                ok: false
            };
        } finally{
            setBusy(false);
        }
    };
    return {
        recheck,
        busy
    };
}
_s1(useRecheck, "WXC0uzAq0HVNdav6rZfi+R91x34=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"]
    ];
});
function useOrderData() {
    _s2();
    const pendingOrder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "useOrderData.usePishnam[pendingOrder]": (s)=>s.pendingOrder
    }["useOrderData.usePishnam[pendingOrder]"]);
    const orders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "useOrderData.usePishnam[orders]": (s)=>s.orders
    }["useOrderData.usePishnam[orders]"]);
    const server = orders.find((o)=>o.code && o.code === pendingOrder?.code);
    const fallback = orders.find((o)=>o.dir === "sent");
    return {
        pendingOrder,
        order: server ?? fallback ?? null
    };
}
_s2(useOrderData, "l/5qxheRfadN61RwCJMAzQJ+sVE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"]
    ];
});
function stepsFor(status) {
    const step = (()=>{
        if ([
            "paid",
            "preparing",
            "shipped",
            "delivered",
            "refund_requested",
            "refunded"
        ].includes(status)) {
            if ([
                "shipped",
                "delivered"
            ].includes(status)) return 3;
            if (status === "preparing") return 1;
            return 1;
        }
        return 0;
    })();
    return [
        {
            n: "۱",
            title: "پرداخت شد",
            sub: "همین حالا",
            done: step >= 1
        },
        {
            n: "۲",
            title: "بسته‌بندی",
            sub: "حدود ۲ روز کاری",
            done: step >= 2
        },
        {
            n: "۳",
            title: "تحویل پست",
            sub: "کد رهگیری رو بعداً برات می‌فرستیم",
            done: step >= 3
        },
        {
            n: "۴",
            title: "رسیدن به دوستت",
            sub: "با کارت QR و رمز کارت",
            done: step >= 4
        }
    ];
}
/* ═══════════════ status banners ═══════════════ */ function StatusBanner({ st, data, onRecheck, busy, pendingKey }) {
    const code = data?.code;
    if (st === "paid") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3 rounded-[22px] bg-[#E3F6FD] px-4 py-3.5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xl",
                    children: "✅"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 151,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-[13px] font-bold leading-[1.9] text-[#04202E]",
                    children: [
                        "پرداخت تأیید شد",
                        code ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                " — کد پیگیری: ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                    dir: "ltr",
                                    children: code
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/success.tsx",
                                    lineNumber: 153,
                                    columnNumber: 50
                                }, this)
                            ]
                        }, void 0, true) : null,
                        ". از این‌جا به بعد هر تغییری با پیامک خبرت می‌کنیم."
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 152,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/shop/screens/success.tsx",
            lineNumber: 150,
            columnNumber: 7
        }, this);
    }
    if (st === "under_review") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3 rounded-[22px] bg-[#FFF3C9] px-4 py-3.5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xl",
                    children: "🧾"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 161,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-[13px] font-bold leading-[1.9] text-[#7A5C00]",
                    children: [
                        "رسیدت ثبت شد؛ تا ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                            children: "۱۲ ساعت"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/success.tsx",
                            lineNumber: 163,
                            columnNumber: 28
                        }, this),
                        " بررسی می‌شه. نتیجه‌ش رو با پیامک خبرت می‌کنیم."
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 162,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/shop/screens/success.tsx",
            lineNumber: 160,
            columnNumber: 7
        }, this);
    }
    if (st === "failed" || st === "awaiting") {
        // کارت‌به‌کارت: پنل رزرو ۱۰ دقیقه‌ای + آپلود رسید (بعد از رفرش هم زنده می‌مونه)
        if (st === "awaiting" && data?.paymentMethod === "manual_transfer" && pendingKey && data?.code) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$manual$2d$payment$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ManualPaymentPanel"], {
                code: data.code,
                idempotencyKey: pendingKey,
                total: data.total,
                expiresAt: data.expiresAt
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/success.tsx",
                lineNumber: 172,
                columnNumber: 9
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-2.5 rounded-[22px] bg-[#FFE9F0] px-4 py-3.5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xl",
                            children: "⏳"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/success.tsx",
                            lineNumber: 183,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-[13px] font-bold leading-[1.9] text-[#B02A52]",
                            children: [
                                st === "failed" ? "پرداخت ناموفق بود یا لغو شد." : "سفارش منتظر پرداخته.",
                                " می‌تونی دوباره درگاه رو امتحان کنی."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/shop/screens/success.tsx",
                            lineNumber: 184,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 182,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            disabled: busy,
                            onClick: onRecheck,
                            className: "h-11 rounded-full bg-[#04202E] px-5 text-[13px] font-extrabold text-white disabled:opacity-60",
                            children: busy ? "در حال بررسی…" : "بررسی مجدد پرداخت"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/success.tsx",
                            lineNumber: 189,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            disabled: busy,
                            onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("checkout"),
                            className: "h-11 rounded-full border-2 border-[#B02A52] px-5 text-[13px] font-extrabold text-[#B02A52]",
                            children: "بازگشت به پرداخت"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/success.tsx",
                            lineNumber: 197,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 188,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/shop/screens/success.tsx",
            lineNumber: 181,
            columnNumber: 7
        }, this);
    }
    if (st === "cancelled" || st === "expired") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3 rounded-[22px] bg-[#FFE9F0] px-4 py-3.5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xl",
                    children: "😟"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 212,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-[13px] font-bold leading-[1.9] text-[#B02A52]",
                    children: [
                        "این سفارش ",
                        st === "cancelled" ? "لغو" : "منقضی",
                        " شده. می‌تونی یه هدیه‌ی تازه بسازی."
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 213,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/shop/screens/success.tsx",
            lineNumber: 211,
            columnNumber: 7
        }, this);
    }
    if (st === "loading") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3 rounded-[22px] bg-[#F8FDFF] px-4 py-3.5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "h-5 w-5 animate-spin rounded-full border-[3px] border-[#CFE6EF] border-t-[#00ABE7]"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 222,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-[13px] font-bold text-[#4A6572]",
                    children: "داریم وضعیت پرداخت رو چک می‌کنیم…"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 223,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/shop/screens/success.tsx",
            lineNumber: 221,
            columnNumber: 7
        }, this);
    }
    return null;
}
_c = StatusBanner;
function MobileSuccess() {
    _s3();
    const { st, data } = useOrderStatus();
    const { recheck, busy } = useRecheck();
    const { pendingOrder, order } = useOrderData();
    const selectOrder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "MobileSuccess.usePishnam[selectOrder]": (s)=>s.selectOrder
    }["MobileSuccess.usePishnam[selectOrder]"]);
    const no = order?.no ?? 101;
    const code = data?.code ?? order?.code;
    const total = data?.total ?? order?.total ?? 0;
    const charmLine = order ? `با این سفارش ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(order.hearts)} قلب و ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(order.paws)} پنجه هم برای بچه‌های بی‌سرپرست و حیوونا ثبت شد. رسیدش تو دفتر مهربونی می‌مونه.` : "اینجا بعد از اولین سفارش، گزارش قلب و پنجه‌هات رو می‌بینی.";
    const steps = stepsFor(data?.status ?? (st === "paid" ? "paid" : "awaiting_payment"));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen flex-col bg-[#F2FAFD] md:hidden",
        children: [
            st === "paid" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Confetti, {}, void 0, false, {
                fileName: "[project]/src/components/shop/screens/success.tsx",
                lineNumber: 247,
                columnNumber: 25
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative overflow-hidden rounded-b-[36px] bg-[#00ABE7] px-6 pb-[30px] pt-[22px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute -bottom-20 -left-[60px] h-[220px] w-[220px] rounded-full bg-[#66CDF1]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/success.tsx",
                        lineNumber: 249,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Logo"], {
                                size: 32
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/success.tsx",
                                lineNumber: 251,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-[14px] border-2 border-[#04202E] bg-white px-2.5 py-1 text-xs font-extrabold",
                                dir: "ltr",
                                children: code ?? `هدیه‌ی ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(no)}`
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/success.tsx",
                                lineNumber: 252,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/success.tsx",
                        lineNumber: 250,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex flex-col items-center gap-3 pb-2 pt-[22px] text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex h-[70px] w-[70px] items-center justify-center rounded-full border-[3px] border-[#04202E] bg-white",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "34",
                                    height: "34",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "#04202E",
                                    strokeWidth: "3",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    "aria-hidden": "true",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M5 12.5l4.5 4.5L19 7"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/success.tsx",
                                        lineNumber: 259,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/success.tsx",
                                    lineNumber: 258,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/success.tsx",
                                lineNumber: 257,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "m-0 text-[30px] font-black leading-[1.5]",
                                children: st === "paid" ? "سفارشت ثبت شد!" : "سفارش تو صفحه‌ست"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/success.tsx",
                                lineNumber: 262,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "m-0 text-[15px] font-semibold leading-[1.9]",
                                children: st === "paid" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        "هدیه‌ی ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(no)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/success.tsx",
                                            lineNumber: 267,
                                            columnNumber: 24
                                        }, this),
                                        " داره آماده می‌شه."
                                    ]
                                }, void 0, true) : st === "under_review" ? "رسیدت رسید؛ تا ۱۲ ساعت بررسی می‌شه." : "وقتی پرداخت تأیید بشه، مسیر هدیه‌ت این‌جا فعال می‌شه."
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/success.tsx",
                                lineNumber: 265,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/success.tsx",
                        lineNumber: 256,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/success.tsx",
                lineNumber: 248,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 mx-5 -mt-[18px] flex flex-col gap-3.5 rounded-[26px] border border-[#DDEEF5] bg-white p-[18px] shadow-[0_8px_22px_rgba(4,32,46,0.07)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[15px] font-extrabold",
                        children: "مسیر هدیه تا دست دوستت"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/success.tsx",
                        lineNumber: 278,
                        columnNumber: 9
                    }, this),
                    steps.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-[#04202E] text-[13px] font-black",
                                            style: {
                                                background: s.done ? "#00ABE7" : STEP_BGS[i]
                                            },
                                            children: s.done ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                width: "16",
                                                height: "16",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                stroke: "#04202E",
                                                strokeWidth: "3.4",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M5 12.5l4.5 4.5L19 7"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/shop/screens/success.tsx",
                                                    lineNumber: 288,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/success.tsx",
                                                lineNumber: 287,
                                                columnNumber: 19
                                            }, this) : s.n
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/success.tsx",
                                            lineNumber: 282,
                                            columnNumber: 15
                                        }, this),
                                        i < steps.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "h-[22px] w-0.5 bg-[#CFE6EF]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/success.tsx",
                                            lineNumber: 294,
                                            columnNumber: 40
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/shop/screens/success.tsx",
                                    lineNumber: 281,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-0.5 pt-[3px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[14.5px] font-extrabold",
                                            children: s.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/success.tsx",
                                            lineNumber: 297,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[12.5px] font-medium text-[#4A6572]",
                                            children: s.sub
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/success.tsx",
                                            lineNumber: 298,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/shop/screens/success.tsx",
                                    lineNumber: 296,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, s.n, true, {
                            fileName: "[project]/src/components/shop/screens/success.tsx",
                            lineNumber: 280,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusBanner, {
                        st: st,
                        data: data,
                        pendingKey: pendingOrder?.key,
                        onRecheck: ()=>void recheck().then((r)=>{
                                if (r.redirectUrl) window.location.href = r.redirectUrl;
                            }),
                        busy: busy
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/success.tsx",
                        lineNumber: 302,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/success.tsx",
                lineNumber: 277,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-5 mt-4 flex items-center gap-3 rounded-[22px] bg-[#04202E] p-[18px] text-white",
                children: [
                    order && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "data-giftcard-plush": true,
                        className: "flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-2xl bg-white",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plush"], {
                            kind: order.kind,
                            size: 52
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/success.tsx",
                            lineNumber: 311,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/success.tsx",
                        lineNumber: 307,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-[84px] w-[84px] shrink-0 items-center justify-center rounded-2xl bg-white",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QrGlyph, {}, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/success.tsx",
                            lineNumber: 315,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/success.tsx",
                        lineNumber: 314,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-base font-black",
                                children: "کارت پستالت آماده‌ست"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/success.tsx",
                                lineNumber: 318,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[12.5px] font-medium leading-[1.85] text-[#D3EEF9]",
                                children: "رمزی که نوشتی همراه کارته. فقط دوستت می‌تونه باهاش پیامت رو ببینه."
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/success.tsx",
                                lineNumber: 319,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/success.tsx",
                        lineNumber: 317,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/success.tsx",
                lineNumber: 305,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-5 mt-4 flex items-center gap-3 rounded-[22px] border-[1.5px] border-[#F7C5D3] bg-[#FFE9F0] px-4 py-3.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeartSticker"], {
                        size: 30,
                        fill: "#F0426B",
                        stroke: "#04202E",
                        strokeWidth: 2.4
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/success.tsx",
                        lineNumber: 326,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[13px] font-semibold leading-[1.9]",
                        children: charmLine
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/success.tsx",
                        lineNumber: 327,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/success.tsx",
                lineNumber: 325,
                columnNumber: 7
            }, this),
            total > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-5 mt-3 flex items-center justify-between rounded-[22px] bg-white px-4 py-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[13px] font-bold text-[#4A6572]",
                        children: "مبلغ سفارش"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/success.tsx",
                        lineNumber: 331,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[14px] font-black",
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(total),
                            " تومان"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/success.tsx",
                        lineNumber: 332,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/success.tsx",
                lineNumber: 330,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-auto flex flex-col gap-2.5 px-5 pb-[max(16px,env(safe-area-inset-bottom))] pt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>{
                            if (order) selectOrder(order.id);
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("track");
                        },
                        className: "flex h-[54px] items-center justify-center gap-2 rounded-full bg-[#00ABE7] text-base font-extrabold text-[#04202E] transition-transform active:scale-95",
                        children: [
                            "رهگیری سفارش",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ForwardIcon"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/success.tsx",
                                lineNumber: 346,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/success.tsx",
                        lineNumber: 337,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("my-gifts"),
                        className: "flex h-[54px] items-center justify-center rounded-full bg-[#04202E] text-base font-extrabold text-white transition-transform active:scale-95",
                        children: "هدیه‌هام رو ببین"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/success.tsx",
                        lineNumber: 348,
                        columnNumber: 9
                    }, this),
                    order && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$track$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DownloadGiftButton"], {
                        o: order
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/success.tsx",
                        lineNumber: 355,
                        columnNumber: 19
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("home"),
                        className: "box-border flex h-[50px] items-center justify-center rounded-full border-2 border-[#04202E] text-[15px] font-extrabold text-[#04202E] transition-transform active:scale-95",
                        children: "برگرد به خانه"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/success.tsx",
                        lineNumber: 356,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/success.tsx",
                lineNumber: 336,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/success.tsx",
        lineNumber: 246,
        columnNumber: 5
    }, this);
}
_s3(MobileSuccess, "YiVl6wkgQ4gFN+QErTeeiCkZrF8=", false, function() {
    return [
        useOrderStatus,
        useRecheck,
        useOrderData,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"]
    ];
});
_c1 = MobileSuccess;
function DesktopSuccess() {
    _s4();
    const { st, data } = useOrderStatus();
    const { recheck, busy } = useRecheck();
    const { pendingOrder, order } = useOrderData();
    const selectOrder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "DesktopSuccess.usePishnam[selectOrder]": (s)=>s.selectOrder
    }["DesktopSuccess.usePishnam[selectOrder]"]);
    const no = order?.no ?? 101;
    const code = data?.code ?? order?.code;
    const total = data?.total ?? order?.total ?? 0;
    const steps = stepsFor(data?.status ?? (st === "paid" ? "paid" : "awaiting_payment"));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "hidden min-h-screen flex-col bg-[#F2FAFD] md:flex",
        children: [
            st === "paid" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Confetti, {}, void 0, false, {
                fileName: "[project]/src/components/shop/screens/success.tsx",
                lineNumber: 381,
                columnNumber: 25
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative overflow-hidden bg-[#00ABE7]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute -bottom-24 -left-16 h-[280px] w-[280px] rounded-full bg-[#66CDF1]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/success.tsx",
                        lineNumber: 383,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative mx-auto flex w-full max-w-[1200px] flex-col items-center gap-4 px-6 pb-14 pt-10 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Logo"], {
                                size: 40
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/success.tsx",
                                lineNumber: 385,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-[14px] border-2 border-[#04202E] bg-white px-3 py-1.5 text-sm font-extrabold",
                                dir: "ltr",
                                children: code ?? `هدیه‌ی ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(no)}`
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/success.tsx",
                                lineNumber: 386,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex h-[84px] w-[84px] items-center justify-center rounded-full border-[3px] border-[#04202E] bg-white",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "40",
                                    height: "40",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "#04202E",
                                    strokeWidth: "3",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    "aria-hidden": "true",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M5 12.5l4.5 4.5L19 7"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/success.tsx",
                                        lineNumber: 391,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/success.tsx",
                                    lineNumber: 390,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/success.tsx",
                                lineNumber: 389,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "m-0 text-[42px] font-black leading-[1.4]",
                                children: st === "paid" ? "سفارشت ثبت شد!" : "سفارش تو صفحه‌ست"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/success.tsx",
                                lineNumber: 394,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "m-0 max-w-[520px] text-[17px] font-semibold leading-[1.9]",
                                children: st === "paid" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        "هدیه‌ی ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(no)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/success.tsx",
                                            lineNumber: 399,
                                            columnNumber: 24
                                        }, this),
                                        " داره آماده می‌شه؛ جعبه با استیکرهای قلب و پنجه، کارت پستال QR و یه عالمه مهربونی."
                                    ]
                                }, void 0, true) : st === "under_review" ? "رسیدت رسید و تا ۱۲ ساعت بررسی می‌شه؛ نتیجه با پیامک میاد." : "وقتی پرداخت تأیید بشه مسیر هدیه‌ت کامل می‌شه."
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/success.tsx",
                                lineNumber: 397,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/success.tsx",
                        lineNumber: 384,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/success.tsx",
                lineNumber: 382,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 mx-auto -mt-8 flex w-full max-w-[900px] flex-col gap-6 rounded-[30px] border border-[#DDEEF5] bg-white p-8 shadow-[0_10px_30px_rgba(4,32,46,0.08)] box-border",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center justify-between gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-lg font-extrabold",
                                children: "مسیر هدیه تا دست دوستت"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/success.tsx",
                                lineNumber: 411,
                                columnNumber: 11
                            }, this),
                            total > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-full bg-[#E3F6FD] px-4 py-1.5 text-sm font-bold text-[#006387]",
                                children: [
                                    "مبلغ سفارش: ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(total),
                                    " تومان"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/success.tsx",
                                lineNumber: 413,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/success.tsx",
                        lineNumber: 410,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-5 lg:grid-cols-4",
                        children: steps.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-3 rounded-[22px] p-4",
                                style: {
                                    background: s.done ? "#E3F6FD" : "#F8FDFF",
                                    border: "1px solid #DDEEF5"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#04202E] text-sm font-black",
                                        style: {
                                            background: s.done ? "#00ABE7" : STEP_BGS[i]
                                        },
                                        children: s.done ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "17",
                                            height: "17",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "#04202E",
                                            strokeWidth: "3.4",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M5 12.5l4.5 4.5L19 7"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/success.tsx",
                                                lineNumber: 427,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/success.tsx",
                                            lineNumber: 426,
                                            columnNumber: 19
                                        }, this) : s.n
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/success.tsx",
                                        lineNumber: 421,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[15.5px] font-extrabold",
                                        children: s.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/success.tsx",
                                        lineNumber: 433,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[12.5px] font-medium leading-[1.8] text-[#4A6572]",
                                        children: s.sub
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/success.tsx",
                                        lineNumber: 434,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, s.n, true, {
                                fileName: "[project]/src/components/shop/screens/success.tsx",
                                lineNumber: 420,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/success.tsx",
                        lineNumber: 418,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusBanner, {
                        st: st,
                        data: data,
                        pendingKey: pendingOrder?.key,
                        onRecheck: ()=>void recheck().then((r)=>{
                                if (r.redirectUrl) window.location.href = r.redirectUrl;
                            }),
                        busy: busy
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/success.tsx",
                        lineNumber: 438,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-5 rounded-[24px] bg-[#04202E] p-5 text-white",
                        children: [
                            order && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "data-giftcard-plush": true,
                                className: "flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-white",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plush"], {
                                    kind: order.kind,
                                    size: 80
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/success.tsx",
                                    lineNumber: 445,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/success.tsx",
                                lineNumber: 441,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-white",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QrGlyph, {}, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/success.tsx",
                                    lineNumber: 449,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/success.tsx",
                                lineNumber: 448,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-1 flex-col gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-lg font-black",
                                        children: "کارت پستالت آماده‌ست"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/success.tsx",
                                        lineNumber: 452,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[13.5px] font-medium leading-[1.9] text-[#D3EEF9]",
                                        children: "رمزی که نوشتی همراه کارته. فقط دوستت می‌تونه باهاش پیامت رو ببینه."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/success.tsx",
                                        lineNumber: 453,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/success.tsx",
                                lineNumber: 451,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("gift"),
                                className: "flex h-12 items-center rounded-full bg-[#00ABE7] px-6 text-[15px] font-extrabold text-[#04202E]",
                                children: "دیدن تجربه‌ی گیرنده"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/success.tsx",
                                lineNumber: 457,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/success.tsx",
                        lineNumber: 439,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap justify-end gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("home"),
                                className: "box-border flex h-[52px] items-center rounded-full border-2 border-[#04202E] px-6 text-[15px] font-extrabold text-[#04202E] transition-colors hover:bg-[#04202E] hover:text-white",
                                children: "برگرد به خانه"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/success.tsx",
                                lineNumber: 466,
                                columnNumber: 11
                            }, this),
                            order && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$track$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DownloadGiftButton"], {
                                o: order,
                                dark: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/success.tsx",
                                lineNumber: 473,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("my-gifts"),
                                className: "flex h-[52px] items-center rounded-full bg-[#04202E] px-7 text-base font-extrabold text-white transition-transform hover:scale-[1.03]",
                                children: "هدیه‌هام رو ببین"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/success.tsx",
                                lineNumber: 474,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>{
                                    if (order) selectOrder(order.id);
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("track");
                                },
                                className: "flex h-[52px] items-center gap-2 rounded-full bg-[#00ABE7] px-7 text-base font-extrabold text-[#04202E] transition-transform hover:scale-[1.03]",
                                children: [
                                    "رهگیری سفارش",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ForwardIcon"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/success.tsx",
                                        lineNumber: 490,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/success.tsx",
                                lineNumber: 481,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/success.tsx",
                        lineNumber: 465,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/success.tsx",
                lineNumber: 409,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pb-10"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/success.tsx",
                lineNumber: 494,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/success.tsx",
        lineNumber: 380,
        columnNumber: 5
    }, this);
}
_s4(DesktopSuccess, "YiVl6wkgQ4gFN+QErTeeiCkZrF8=", false, function() {
    return [
        useOrderStatus,
        useRecheck,
        useOrderData,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"]
    ];
});
_c2 = DesktopSuccess;
function QrGlyph({ className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 25 25",
        className: className,
        width: "66",
        height: "66",
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
            fill: "#04202E",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    fillRule: "evenodd",
                    d: "M0 0h7v7H0zM1 1v5h5V1z"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 503,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "2",
                    y: "2",
                    width: "3",
                    height: "3"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 504,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    fillRule: "evenodd",
                    transform: "translate(18 0)",
                    d: "M0 0h7v7H0zM1 1v5h5V1z"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 505,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "20",
                    y: "2",
                    width: "3",
                    height: "3"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 506,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    fillRule: "evenodd",
                    transform: "translate(0 18)",
                    d: "M0 0h7v7H0zM1 1v5h5V1z"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 507,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "2",
                    y: "20",
                    width: "3",
                    height: "3"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 508,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "9",
                    y: "0",
                    width: "2",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 509,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "12",
                    y: "2",
                    width: "2",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 510,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "9",
                    y: "5",
                    width: "3",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 511,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "14",
                    y: "6",
                    width: "2",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 512,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "0",
                    y: "9",
                    width: "2",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 513,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "4",
                    y: "10",
                    width: "3",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 514,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "9",
                    y: "9",
                    width: "2",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 515,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "13",
                    y: "10",
                    width: "3",
                    height: "3"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 516,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "18",
                    y: "9",
                    width: "2",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 517,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "22",
                    y: "11",
                    width: "3",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 518,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "2",
                    y: "13",
                    width: "2",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 519,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "7",
                    y: "14",
                    width: "2",
                    height: "3"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 520,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "11",
                    y: "14",
                    width: "2",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 521,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "16",
                    y: "15",
                    width: "3",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 522,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "21",
                    y: "15",
                    width: "2",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 523,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "9",
                    y: "18",
                    width: "3",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 524,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "14",
                    y: "19",
                    width: "2",
                    height: "3"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 525,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "18",
                    y: "20",
                    width: "2",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 526,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "22",
                    y: "21",
                    width: "3",
                    height: "2"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 527,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "10",
                    y: "22",
                    width: "2",
                    height: "3"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/success.tsx",
                    lineNumber: 528,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/shop/screens/success.tsx",
            lineNumber: 502,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/shop/screens/success.tsx",
        lineNumber: 501,
        columnNumber: 5
    }, this);
}
_c3 = QrGlyph;
function Confetti() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "aria-hidden": "true",
        className: "pointer-events-none absolute inset-0 z-20 overflow-hidden",
        children: Array.from({
            length: 26
        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "pishnam-confetti absolute block",
                style: {
                    left: `${i * 37 % 100}%`,
                    background: [
                        "#F0426B",
                        "#00ABE7",
                        "#FFF3C9",
                        "#66CDF1",
                        "#FFE0EA"
                    ][i % 5],
                    animationDelay: `${i % 10 * 0.22}s`,
                    width: i % 3 === 0 ? 10 : 7,
                    height: i % 3 === 0 ? 10 : 12,
                    borderRadius: i % 4 === 0 ? "50%" : 3
                }
            }, i, false, {
                fileName: "[project]/src/components/shop/screens/success.tsx",
                lineNumber: 538,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/shop/screens/success.tsx",
        lineNumber: 536,
        columnNumber: 5
    }, this);
}
_c4 = Confetti;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "StatusBanner");
__turbopack_context__.k.register(_c1, "MobileSuccess");
__turbopack_context__.k.register(_c2, "DesktopSuccess");
__turbopack_context__.k.register(_c3, "QrGlyph");
__turbopack_context__.k.register(_c4, "Confetti");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/shop/screens/pay-modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PayModal",
    ()=>PayModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// ── Pay modal v2 — real checkout + dual payment (guide §4.9 / §B5–B6) ──
// zarinpal → POST /api/checkout → redirect to the PSP (simulated #/pay-gateway
// in the sandbox, real StartPay at deploy). manual_transfer → instructions +
// receipt upload (≤5MB, jpeg/png/webp) → payment_under_review.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pishnam-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/fa.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hash-route.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/icons.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$manual$2d$payment$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/manual-payment.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
const ERROR_FA = {
    sold_out: "ایم عروسک همین الان تموم شد! یه دوست پشمالوی دیگه انتخاب کن.",
    rate_limited: "چند دقیقه صبر کن و دوباره امتحان کن.",
    bad_input: "اطلاعات سفارش کامل نیست؛ یه نگاه به فرم بنداز.",
    idempotency_key_reuse: "این سفارش قبلاً با اطلاعات دیگه‌ای ثبت شده؛ صفحه رو رفرش کن.",
    network: "اینترنت قطعه؛ اتصالت رو چک کن و دوباره بزن.",
    busy: "یه لحظه، داریم سفارش قبلی رو ثبت می‌کنیم…",
    file_too_large: "حجم عکس رسید بیشتر از ۵ مگابایته.",
    bad_file_type: "فقط عکس با فرمت JPG یا PNG یا WebP قبوله.",
    duplicate_receipt: "این رسید قبلاً ثبت شده! عکس جدیدی از رسید بفرست.",
    too_many_attempts: "سه بار رسید رد شده؛ این سفارش قابل پیگیری تلفنی است.",
    bad_order_status: "وضعیت سفارش اجازه‌ی آپلود رسید نمی‌ده.",
    payment_window_expired: "مهلت ۱۰ دقیقه‌ای رزرو تموم شد و موجودی آزاد شد.",
    cross_origin: "اتصال امن برقرار نشد؛ صفحه رو یه بار رفرش کن و دوباره امتحان کن.",
    bad_origin: "اتصال امن برقرار نشد؛ صفحه رو یه بار رفرش کن و دوباره امتحان کن.",
    http_403: "دسترسی داده نشد؛ صفحه رو رفرش کن و دوباره امتحان کن."
};
function PayModal() {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("form");
    const [ack, setAck] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const fileRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const quote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "PayModal.usePishnam[quote]": (s)=>s.quote
    }["PayModal.usePishnam[quote]"]);
    const quoteStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "PayModal.usePishnam[quoteStatus]": (s)=>s.quoteStatus
    }["PayModal.usePishnam[quoteStatus]"]);
    const paymentMethod = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "PayModal.usePishnam[paymentMethod]": (s)=>s.paymentMethod
    }["PayModal.usePishnam[paymentMethod]"]);
    const setPaymentMethod = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "PayModal.usePishnam[setPaymentMethod]": (s)=>s.setPaymentMethod
    }["PayModal.usePishnam[setPaymentMethod]"]);
    const fetchQuote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "PayModal.usePishnam[fetchQuote]": (s)=>s.fetchQuote
    }["PayModal.usePishnam[fetchQuote]"]);
    const submitCheckout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "PayModal.usePishnam[submitCheckout]": (s)=>s.submitCheckout
    }["PayModal.usePishnam[submitCheckout]"]);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    // رزرو ۱۰ دقیقه‌ای — فاز انقضا در زمان رندر مشتق می‌شه (نه با effect)
    const expiresAt = ack?.payment?.expiresAt;
    const { expired } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$manual$2d$payment$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCountdown"])(expiresAt);
    const showExpired = phase === "manual" && expired;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PayModal.useEffect": ()=>{
            const onPay = {
                "PayModal.useEffect.onPay": ()=>{
                    setPhase("form");
                    setError("");
                    setAck(null);
                    setOpen(true);
                    void fetchQuote();
                }
            }["PayModal.useEffect.onPay"];
            window.addEventListener("pishnam:pay", onPay);
            return ({
                "PayModal.useEffect": ()=>window.removeEventListener("pishnam:pay", onPay)
            })["PayModal.useEffect"];
        }
    }["PayModal.useEffect"], [
        fetchQuote
    ]);
    const total = quote?.total;
    const fail = (code)=>{
        setError(ERROR_FA[code] ?? "یه مشکلی پیش اومد؛ دوباره امتحان کن.");
        setPhase("error");
    };
    // ۱) ثبت سفارش (idempotent) و ادامه بر اساس روش پرداخت
    const start = async ()=>{
        setPhase("processing");
        const r = await submitCheckout();
        if (!r.ok || !r.ack) {
            fail(r.error ?? "unknown");
            return;
        }
        setAck(r.ack);
        if (r.ack.payment.method === "zarinpal") {
            if (r.ack.payment.redirectUrl) {
                // real round trip: #/pay-gateway (sandbox) or Zarinpal StartPay (deploy)
                window.location.href = r.ack.payment.redirectUrl;
                return;
            }
            fail("psp_unavailable");
            return;
        }
        setPhase("manual");
    };
    // ۲) کارت‌به‌کارت: آپلود رسید
    const uploadReceipt = async (file)=>{
        if (!ack) return;
        setPhase("uploading");
        const form = new FormData();
        form.set("file", file);
        form.set("code", ack.code);
        form.set("key", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"].getState().pendingOrder?.key ?? "");
        try {
            const res = await fetch("/api/payment/manual/receipt", {
                method: "POST",
                body: form
            });
            if (!res.ok) {
                const body = await res.json().catch(()=>({}));
                if (body.error === "payment_window_expired" || body.error === "bad_order_status") {
                    setPhase("expired");
                    return;
                }
                fail(body.error ?? `http_${res.status}`);
                return;
            }
            setOpen(false);
            resetAndGo();
            toast({
                title: "رسیدت ثبت شد ✓",
                description: "تا ۱۲ ساعت بررسی می‌شه؛ نتیجه‌ش با پیامک میاد."
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("success");
        } catch  {
            fail("network");
        }
    };
    const resetAndGo = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"].getState().resetBuilder();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: (v)=>{
            setOpen(v);
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "max-w-[420px] rounded-[28px] border-[1.5px] border-[#CFE6EF] bg-white p-6",
            dir: "rtl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            className: "flex items-center justify-between text-lg font-black text-[#04202E]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "پرداخت سفارش"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                                    lineNumber: 135,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "rounded-xl border border-[#CFE6EF] bg-[#F2FAFD] px-2 py-1 text-[11px] font-bold text-[#006387]",
                                    children: paymentMethod === "zarinpal" ? "زرین‌پال" : "کارت به کارت"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                                    lineNumber: 136,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                            lineNumber: 134,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                            className: "sr-only",
                            children: "پرداخت سفارش هدیه یک دوست"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                            lineNumber: 140,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                    lineNumber: 133,
                    columnNumber: 9
                }, this),
                phase === "form" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between rounded-2xl bg-[#E3F6FD] px-4 py-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-bold text-[#04202E]",
                                    children: "مبلغ قابل پرداخت"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                                    lineNumber: 148,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-base font-black text-[#04202E]",
                                    children: total ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(total)} تومان` : quoteStatus === "loading" ? "در حال محاسبه…" : "—"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                                    lineNumber: 149,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                            lineNumber: 147,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        setPaymentMethod("zarinpal");
                                        void fetchQuote();
                                    },
                                    className: "rounded-2xl border-2 px-3 py-2.5 text-right transition-colors",
                                    style: {
                                        borderColor: paymentMethod === "zarinpal" ? "#00ABE7" : "#DDEEF5",
                                        background: paymentMethod === "zarinpal" ? "#F2FAFD" : "white"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "block text-[13.5px] font-extrabold text-[#04202E]",
                                            children: "پرداخت آنلاین"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                                            lineNumber: 168,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "block text-[11px] font-medium text-[#4A6572]",
                                            children: "زرین‌پال، همه‌ی کارت‌ها"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                                            lineNumber: 169,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                                    lineNumber: 156,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        setPaymentMethod("manual_transfer");
                                        void fetchQuote();
                                    },
                                    className: "rounded-2xl border-2 px-3 py-2.5 text-right transition-colors",
                                    style: {
                                        borderColor: paymentMethod === "manual_transfer" ? "#00ABE7" : "#DDEEF5",
                                        background: paymentMethod === "manual_transfer" ? "#F2FAFD" : "white"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "block text-[13.5px] font-extrabold text-[#04202E]",
                                            children: "کارت به کارت"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                                            lineNumber: 183,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "block text-[11px] font-medium text-[#4A6572]",
                                            children: "با آپلود رسید"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                                            lineNumber: 184,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                                    lineNumber: 171,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                            lineNumber: 155,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            disabled: !total || quoteStatus !== "ready",
                            onClick: ()=>void start(),
                            className: "mt-1 flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#00ABE7] text-base font-extrabold text-[#04202E] transition-transform active:scale-95 disabled:opacity-60",
                            children: [
                                paymentMethod === "zarinpal" ? "رفتن به درگاه پرداخت" : "ثبت سفارش و نمایش کارت",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeartSticker"], {
                                    size: 20,
                                    fill: "#04202E",
                                    stroke: "none"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                                    lineNumber: 195,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                            lineNumber: 188,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-center text-[11.5px] leading-[1.8] text-[#4A6572]",
                            children: "پرداخت روی یه درگاه آزمایشی انجام می‌شه؛ پولی جابه‌جا نمی‌شه."
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                            lineNumber: 197,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                    lineNumber: 146,
                    columnNumber: 11
                }, this),
                phase === "processing" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center gap-4 py-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "h-12 w-12 animate-spin rounded-full border-4 border-[#CFE6EF] border-t-[#00ABE7]"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                            lineNumber: 205,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[15px] font-bold text-[#04202E]",
                            children: "داریم سفارشت رو ثبت می‌کنیم…"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                            lineNumber: 206,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs text-[#4A6572]",
                            children: "لطفاً صفحه رو نبند."
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                            lineNumber: 207,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                    lineNumber: 204,
                    columnNumber: 11
                }, this),
                phase === "manual" && ack && !showExpired && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between gap-2.5 rounded-2xl bg-[#E3F6FD] px-4 py-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex min-w-0 flex-col gap-0.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[12.5px] font-extrabold text-[#04202E]",
                                            children: "سفارشت ۱۰ دقیقه رزرو شده"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                                            lineNumber: 216,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10.5px] font-medium leading-[1.7] text-[#4A6572]",
                                            children: "موجودی تا پایان تایمر کنار شماست؛ بعدش آزاد می‌شه"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                                            lineNumber: 217,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                                    lineNumber: 215,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$manual$2d$payment$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CountdownBadge"], {
                                    expiresAt: expiresAt
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                                    lineNumber: 219,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                            lineNumber: 214,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-2xl bg-[#FFF3C9] px-4 py-3 text-[12.5px] font-bold leading-[1.9] text-[#7A5C00]",
                            children: "مبلغ رو با کارت‌به‌کارت بریز و عکس رسید رو آپلود کن. کد سفارش رو تو توضیحات انتقال بنویس."
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                            lineNumber: 221,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ManualRow, {
                            label: "شماره کارت",
                            value: ack.payment.instructions?.cardNumber ?? "",
                            copyable: true
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                            lineNumber: 224,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ManualRow, {
                            label: "شماره شبا",
                            value: ack.payment.instructions?.sheba ?? "",
                            copyable: true
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                            lineNumber: 225,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ManualRow, {
                            label: "نام صاحب کارت",
                            value: ack.payment.instructions?.cardName ?? ""
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                            lineNumber: 226,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ManualRow, {
                            label: "مبلغ (تومان)",
                            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(Number(ack.payment.instructions?.amount ?? ack.total))
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                            lineNumber: 227,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ManualRow, {
                            label: "کد سفارش",
                            value: ack.code,
                            copyable: true
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                            lineNumber: 228,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ref: fileRef,
                            type: "file",
                            accept: "image/jpeg,image/png,image/webp",
                            className: "hidden",
                            onChange: (e)=>{
                                const f = e.target.files?.[0];
                                if (f) void uploadReceipt(f);
                                e.target.value = "";
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                            lineNumber: 229,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>fileRef.current?.click(),
                            className: "flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#00ABE7] text-base font-extrabold text-[#04202E] transition-transform active:scale-95",
                            children: [
                                "آپلود عکس رسید",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeartSticker"], {
                                    size: 20,
                                    fill: "#04202E",
                                    stroke: "none"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                                    lineNumber: 246,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                            lineNumber: 240,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>{
                                setOpen(false);
                                resetAndGo();
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("success");
                            },
                            className: "text-center text-[12px] font-bold text-[#006387] underline underline-offset-4",
                            children: "رسید رو بعداً می‌فرستم — برو به صفحه‌ی سفارش"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                            lineNumber: 248,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                    lineNumber: 212,
                    columnNumber: 11
                }, this),
                phase === "uploading" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center gap-4 py-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "h-12 w-12 animate-spin rounded-full border-4 border-[#CFE6EF] border-t-[#00ABE7]"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                            lineNumber: 264,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[15px] font-bold text-[#04202E]",
                            children: "داریم رسیدت رو ثبت می‌کنیم…"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                            lineNumber: 265,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                    lineNumber: 263,
                    columnNumber: 11
                }, this),
                (phase === "expired" || showExpired) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center gap-3 py-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex h-14 w-14 items-center justify-center rounded-full bg-[#FFE9F0] text-2xl",
                            children: "⌛"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                            lineNumber: 271,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[14.5px] font-extrabold leading-[1.9] text-center text-[#B02A52]",
                            children: "مهلت ۱۰ دقیقه‌ای رزرو تموم شد؛ موجودی این سفارش آزاد شده."
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                            lineNumber: 272,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[12px] font-medium leading-[1.85] text-center text-[#4A6572]",
                            children: [
                                "اگه واریز کردی، کد سفارش ",
                                ack?.code ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                    dir: "ltr",
                                    children: ack.code
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                                    lineNumber: 276,
                                    columnNumber: 53
                                }, this) : null,
                                " رو بهمون پیام بده تا دستی بررسی کنیم."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                            lineNumber: 275,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>{
                                setOpen(false);
                                resetAndGo();
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("pick");
                            },
                            className: "mt-1 flex h-[48px] w-full items-center justify-center rounded-full bg-[#04202E] text-[15px] font-extrabold text-white",
                            children: "ساختن سفارش تازه"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                            lineNumber: 278,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>{
                                setOpen(false);
                                resetAndGo();
                            },
                            className: "text-[12px] font-bold text-[#006387] underline underline-offset-4",
                            children: "بستن"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                            lineNumber: 289,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                    lineNumber: 270,
                    columnNumber: 11
                }, this),
                phase === "error" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center gap-3 py-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex h-14 w-14 items-center justify-center rounded-full bg-[#FFE9F0] text-2xl",
                            children: "😟"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                            lineNumber: 304,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[14.5px] font-bold leading-[1.9] text-center text-[#04202E]",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                            lineNumber: 305,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setPhase("form"),
                            className: "flex h-[48px] w-full items-center justify-center rounded-full bg-[#04202E] text-[15px] font-extrabold text-white",
                            children: "دوباره امتحان کن"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                            lineNumber: 306,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                    lineNumber: 303,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
            lineNumber: 132,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
        lineNumber: 131,
        columnNumber: 5
    }, this);
}
_s(PayModal, "ru3VPXxMhLBfOtNcr5QCZfvo/i8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$manual$2d$payment$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCountdown"]
    ];
});
_c = PayModal;
function ManualRow({ label, value, copyable }) {
    _s1();
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between gap-2 rounded-xl border border-[#DDEEF5] bg-[#F8FDFF] px-3 py-2.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[11.5px] font-bold text-[#4A6572]",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                lineNumber: 324,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[13.5px] font-extrabold text-[#04202E]",
                        dir: "ltr",
                        children: value
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                        lineNumber: 326,
                        columnNumber: 9
                    }, this),
                    copyable && value && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-label": `کپی ${label}`,
                        onClick: async ()=>{
                            try {
                                await navigator.clipboard.writeText(value);
                                toast({
                                    title: "کپی شد ✓"
                                });
                            } catch  {
                                toast({
                                    title: "کپی نشد — دستی انتخاب کن"
                                });
                            }
                        },
                        className: "rounded-lg bg-[#D6F1FB] px-2 py-1 text-[10.5px] font-extrabold text-[#006387]",
                        children: "کپی"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                        lineNumber: 328,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
                lineNumber: 325,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/pay-modal.tsx",
        lineNumber: 323,
        columnNumber: 5
    }, this);
}
_s1(ManualRow, "XbQoRqPDPo6PJEzRId7w4FMisDk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c1 = ManualRow;
var _c, _c1;
__turbopack_context__.k.register(_c, "PayModal");
__turbopack_context__.k.register(_c1, "ManualRow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/shop/screens/pay-gateway.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PayGateway",
    ()=>PayGateway
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// ── pay-gateway — the SANDBOX PSP (stands in for Zarinpal StartPay) ──
// The redirect from the pay modal lands here with ?authority=SIM…; pressing
// pay/cancel navigates to the REAL /api/payment/zarinpal/callback endpoint,
// which verifies against the DB amount, transitions the order and 302s back
// to #/success. At deploy this screen is never mounted (real StartPay used).
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pishnam-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/fa.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/logo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LockIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as LockIcon>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function PayGateway({ authority }) {
    _s();
    const pendingOrder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"])({
        "PayGateway.usePishnam[pendingOrder]": (s)=>s.pendingOrder
    }["PayGateway.usePishnam[pendingOrder]"]);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PayGateway.useEffect": ()=>{
            window.scrollTo({
                top: 0
            });
        }
    }["PayGateway.useEffect"], []);
    const go = (status)=>{
        setBusy(true);
        // full page navigation → API GET → 302 → #/success?code=…
        window.location.href = `/api/payment/zarinpal/callback?Authority=${encodeURIComponent(authority)}&Status=${status}`;
    };
    const code = pendingOrder?.code ?? "";
    const total = pendingOrder?.total ?? 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen flex-col items-center bg-[#0E2A35] px-4 py-10 text-white md:justify-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-[420px] rounded-[24px] bg-white p-7 text-[#04202E] shadow-[0_18px_50px_rgba(0,0,0,0.35)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between border-b border-[#E3F0F5] pb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex h-9 w-9 items-center justify-center rounded-xl bg-[#04202E]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LockIcon$3e$__["LockIcon"], {
                                            size: 16,
                                            color: "#00ABE7"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                                            lineNumber: 37,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                                        lineNumber: 36,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[15px] font-black",
                                        children: "درگاه پرداخت اینترنتی"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                                        lineNumber: 39,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                                lineNumber: 35,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-lg bg-[#F2FAFD] px-2 py-1 text-[11px] font-extrabold text-[#006387]",
                                children: "شبیه‌ساز زرین‌پال"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                                lineNumber: 41,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-3 pt-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between rounded-2xl bg-[#E3F6FD] px-4 py-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[13px] font-bold text-[#4A6572]",
                                        children: "پذیرنده"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                                        lineNumber: 48,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[13.5px] font-extrabold",
                                        children: "یک دوست — جعبه هدیه عروسک پولیشی"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                                        lineNumber: 49,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                                lineNumber: 47,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between rounded-2xl bg-[#F8FDFF] px-4 py-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[13px] font-bold text-[#4A6572]",
                                        children: "مبلغ"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                                        lineNumber: 52,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[15px] font-black",
                                        children: total ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(total)} تومان` : "—"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                                        lineNumber: 53,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this),
                            code && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between rounded-2xl bg-[#F8FDFF] px-4 py-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[13px] font-bold text-[#4A6572]",
                                        children: "کد سفارش"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                                        lineNumber: 57,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[13.5px] font-extrabold",
                                        dir: "ltr",
                                        children: code
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                                        lineNumber: 58,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between rounded-2xl bg-[#F8FDFF] px-4 py-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[13px] font-bold text-[#4A6572]",
                                        children: "شناسه تراکنش"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                                        lineNumber: 62,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "max-w-[180px] truncate text-[12px] font-bold text-[#4A6572]",
                                        dir: "ltr",
                                        children: authority || "—"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                                        lineNumber: 63,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 grid grid-cols-2 gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11px] font-bold text-[#4A6572]",
                                                children: "شماره کارت"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                                                lineNumber: 70,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex h-11 items-center rounded-xl border border-[#DDEEF5] bg-white px-3 text-[13px] font-semibold",
                                                dir: "ltr",
                                                children: "۶۰۳۷ ▪▪▪▪ ▪▪▪▪ ۴۵۶۷"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                                                lineNumber: 71,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                                        lineNumber: 69,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11px] font-bold text-[#4A6572]",
                                                children: "رمز پویا"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                                                lineNumber: 76,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex h-11 items-center rounded-xl border border-[#DDEEF5] bg-white px-3 text-[13px] font-semibold",
                                                dir: "ltr",
                                                children: "▪▪▪▪▪▪"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                                                lineNumber: 77,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                                        lineNumber: 75,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                disabled: busy,
                                onClick: ()=>go("OK"),
                                className: "mt-3 flex h-[52px] items-center justify-center rounded-full bg-[#00ABE7] text-base font-extrabold text-[#04202E] transition-transform active:scale-95 disabled:opacity-60",
                                children: busy ? "در حال انتقال…" : "پرداخت (شبیه‌سازی موفق)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                disabled: busy,
                                onClick: ()=>go("NOK"),
                                className: "flex h-[48px] items-center justify-center rounded-full border-2 border-[#DDEEF5] text-[14px] font-extrabold text-[#4A6572] transition-colors hover:border-[#F7C5D3] disabled:opacity-60",
                                children: "انصراف از پرداخت"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "pt-1 text-center text-[11px] leading-[1.9] text-[#4A6572]",
                                children: "این صفحه فقط تو محیط آزمایشی نشون داده می‌شه؛ تو لانچ واقعی، کاربر مستقیم به درگاه زرین‌پال می‌ره و بعد از پرداخت با همین مسیر برمی‌گرده."
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pt-6 opacity-40",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Logo"], {
                    size: 26
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                    lineNumber: 107,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/pay-gateway.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_s(PayGateway, "BufXEeZ9YXg4CwSMNeD6c+Sp+MA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePishnam"]
    ];
});
_c = PayGateway;
var _c;
__turbopack_context__.k.register(_c, "PayGateway");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/shop/screens/stories.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StoriesScreen",
    ()=>StoriesScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// ── «تجربه مخاطب» — published UGC stories + submit form (Phase C, guide 13-f) ──
// Read: GET /api/stories (published only). Write: POST /api/experiences —
// JSON or multipart (+ optional photo ≤5MB jpeg/png/webp). Every submission
// lands as "pending" and only appears here after a manual admin publish.
// Photos have no public GET in the sandbox — a story with a photoKey shows a
// soft heart placeholder (the key is kept for the deploy-wave S3 swap).
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/plush.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/icons.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hash-route.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pishnam-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/fa.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$metadata$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/seo/metadata.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const MAX_BODY = 1500;
const MIN_BODY = 20;
const MAX_PHOTO = 5 * 1024 * 1024;
const OK_PHOTO_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp"
];
const CLAMP_6 = {
    display: "-webkit-box",
    WebkitLineClamp: 6,
    WebkitBoxOrient: "vertical",
    overflow: "hidden"
};
const INPUT_CLS = "w-full rounded-[18px] border-[1.5px] border-[#CFE6EF] bg-white px-4 text-[15px] font-semibold text-[#04202E] outline-none transition-shadow placeholder:font-normal placeholder:text-[#8FA8B5] focus:border-[#00ABE7] focus:shadow-[0_0_0_4px_rgba(0,171,231,0.12)]";
function occasionLabel(i) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OCCASIONS"][i] ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OCCASIONS"][0];
}
/* ── one published story card ── */ function StoryCard({ s }) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-3 rounded-[24px] border border-[#DDEEF5] bg-white p-5 transition-shadow hover:shadow-[0_8px_22px_rgba(4,32,46,0.06)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFE0EA] text-[17px]",
                        children: s.name.trim().slice(0, 1)
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/stories.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex min-w-0 flex-1 flex-col gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "truncate text-[15px] font-extrabold text-[#04202E]",
                                children: [
                                    s.name,
                                    s.city ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-[#4A6572]",
                                        children: [
                                            " · ",
                                            s.city
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/stories.tsx",
                                        lineNumber: 58,
                                        columnNumber: 23
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/stories.tsx",
                                lineNumber: 56,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "self-start rounded-full bg-[#FFF3C9] px-2.5 py-0.5 text-[11.5px] font-extrabold text-[#8A6D1F]",
                                children: occasionLabel(s.occasion)
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/stories.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/stories.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        "aria-hidden": "true",
                        className: "shrink-0 text-[18px]",
                        children: "🎁"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/stories.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/stories.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            s.photoKey ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-label": "این تجربه با عکس همراه بوده",
                className: "flex h-[92px] items-center justify-center gap-2.5 rounded-[18px] bg-[#FFE9F0]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeartSticker"], {
                        size: 30,
                        fill: "#F0426B",
                        stroke: "#04202E",
                        strokeWidth: 2.4
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/stories.tsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeartSticker"], {
                        size: 20,
                        fill: "#fff",
                        stroke: "#04202E",
                        strokeWidth: 2.4
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/stories.tsx",
                        lineNumber: 73,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/stories.tsx",
                lineNumber: 68,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "m-0 whitespace-pre-line text-[14px] font-medium leading-[2] text-[#1F3E4D]",
                style: open ? undefined : CLAMP_6,
                children: s.body
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/stories.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            s.body.length > 220 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setOpen((v)=>!v),
                className: "self-start text-[12.5px] font-extrabold text-[#00779F] underline underline-offset-4 transition-colors hover:text-[#04202E]",
                children: open ? "بستن" : "ادامه‌ی متن"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/stories.tsx",
                lineNumber: 84,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/stories.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_s(StoryCard, "xG1TONbKtDWtdOTrXaTAsNhPg/Q=");
_c = StoryCard;
/* ── submit form ── */ function StoryForm() {
    _s1();
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [city, setCity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [occasion, setOccasion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [body, setBody] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [photo, setPhoto] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [photoErr, setPhotoErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [consent, setConsent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [consentErr, setConsentErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [done, setDone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [serverErr, setServerErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const fileRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const tooShort = body.trim().length > 0 && body.trim().length < MIN_BODY;
    const pickPhoto = (f)=>{
        setPhotoErr("");
        if (!f) {
            setPhoto(null);
            return;
        }
        if (!OK_PHOTO_TYPES.includes(f.type)) {
            setPhotoErr("عکس باید JPG، PNG یا WebP باشه.");
            return;
        }
        if (f.size > MAX_PHOTO) {
            setPhotoErr("حجم عکس باید کمتر از ۵ مگابایت باشه.");
            return;
        }
        setPhoto(f);
    };
    const submit = async ()=>{
        if (busy) return;
        setServerErr("");
        if (name.trim().length < 2) {
            setServerErr("اسمت رو بنویس (حداقل ۲ حرف).");
            return;
        }
        if (body.trim().length < MIN_BODY) {
            setServerErr(`متن تجربه باید حداقل ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(MIN_BODY)} حرف باشه.`);
            return;
        }
        if (!consent) {
            setConsentErr(true);
            setServerErr("برای فرستادن، اول کادر اجازه‌ی انتشار رو تیک بزن.");
            return;
        }
        setConsentErr(false);
        setBusy(true);
        try {
            let res;
            if (photo) {
                const fd = new FormData();
                fd.append("name", name.trim());
                fd.append("city", city.trim());
                fd.append("occasion", String(occasion));
                fd.append("body", body.trim());
                fd.append("consent", "true");
                fd.append("photo", photo);
                res = await fetch("/api/experiences", {
                    method: "POST",
                    body: fd
                });
            } else {
                res = await fetch("/api/experiences", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name.trim(),
                        city: city.trim(),
                        occasion,
                        body: body.trim(),
                        consent: true
                    })
                });
            }
            if (res.status === 201) {
                setDone(true);
                return;
            }
            if (res.status === 429) {
                setServerErr("امروز قبلاً ثبت کردی، فردا دوباره 🙂");
                return;
            }
            if (res.status === 400) {
                setServerErr("چیزی از فرم درست نیست — اسم و متن تجربه رو یک بار دیگه چک کن (متن حداقل ۲۰ حرف).");
                return;
            }
            setServerErr("ارسال نشد — دوباره تلاش کن.");
        } catch  {
            setServerErr("اینترنت در دسترس نیست؛ کمی بعد دوباره امتحان کن.");
        } finally{
            setBusy(false);
        }
    };
    if (done) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center gap-4 rounded-[28px] border-2 border-dashed border-[#BFE5D3] bg-[#F2FBF6] px-6 py-12 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plush"], {
                    kind: "bunny",
                    size: 120
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/stories.tsx",
                    lineNumber: 195,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[20px] font-black text-[#04202E]",
                    children: "دریافت شد! بعد از تأیید منتشر می‌شه 💚"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/stories.tsx",
                    lineNumber: 196,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "max-w-[420px] text-[13.5px] font-medium leading-[1.95] text-[#4A6572]",
                    children: "تجربه‌ات اول دست تیم یک دوست می‌رسه؛ به محض تأیید، همین صفحه با اسم و شهری که نوشتی پُر می‌شه."
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/stories.tsx",
                    lineNumber: 197,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>{
                        setDone(false);
                        setName("");
                        setCity("");
                        setOccasion(0);
                        setBody("");
                        setPhoto(null);
                        setConsent(false);
                    },
                    className: "flex h-11 items-center rounded-full bg-[#00ABE7] px-6 text-[13.5px] font-extrabold text-[#04202E] transition-transform active:scale-95",
                    children: "یه تجربه‌ی دیگه بنویس"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/stories.tsx",
                    lineNumber: 200,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/shop/screens/stories.tsx",
            lineNumber: 194,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-4 rounded-[28px] border border-[#DDEEF5] bg-white p-5 md:p-7",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        "aria-hidden": "true",
                        className: "text-[22px]",
                        children: "✍️"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/stories.tsx",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "m-0 text-[20px] font-black text-[#04202E] md:text-[24px]",
                        children: "تجربه‌ات رو بنویس"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/stories.tsx",
                        lineNumber: 223,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/stories.tsx",
                lineNumber: 221,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "m-0 text-[13.5px] font-medium leading-[1.95] text-[#4A6572]",
                children: "اگه تا حالا برات یه جعبه‌ی یک دوست اومده، حس اون لحظه رو برامون بنویس. قشنگ‌ترین‌ها با اسم و شهرت همین‌جا منتشر می‌شن."
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/stories.tsx",
                lineNumber: 225,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex flex-col gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[13.5px] font-extrabold text-[#04202E]",
                                children: "اسم تو *"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/stories.tsx",
                                lineNumber: 232,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: name,
                                onChange: (e)=>setName(e.target.value.slice(0, 40)),
                                placeholder: "مثلاً: سارا",
                                className: `${INPUT_CLS} h-12`
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/stories.tsx",
                                lineNumber: 233,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/stories.tsx",
                        lineNumber: 231,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex flex-col gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[13.5px] font-extrabold text-[#04202E]",
                                children: "شهر (اختیاری)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/stories.tsx",
                                lineNumber: 242,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: city,
                                onChange: (e)=>setCity(e.target.value.slice(0, 40)),
                                placeholder: "مثلاً: تهران",
                                className: `${INPUT_CLS} h-12`
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/stories.tsx",
                                lineNumber: 243,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/stories.tsx",
                        lineNumber: 241,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex flex-col gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[13.5px] font-extrabold text-[#04202E]",
                                children: "بهانه‌ی هدیه"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/stories.tsx",
                                lineNumber: 252,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: occasion,
                                onChange: (e)=>setOccasion(Number(e.target.value)),
                                className: `${INPUT_CLS} h-12`,
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OCCASIONS"].map((o, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: i,
                                        children: o
                                    }, o, false, {
                                        fileName: "[project]/src/components/shop/screens/stories.tsx",
                                        lineNumber: 259,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/stories.tsx",
                                lineNumber: 253,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/stories.tsx",
                        lineNumber: 251,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex flex-col gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[13.5px] font-extrabold text-[#04202E]",
                                children: "عکس (اختیاری)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/stories.tsx",
                                lineNumber: 264,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: fileRef,
                                type: "file",
                                accept: "image/jpeg,image/png,image/webp",
                                onChange: (e)=>pickPhoto(e.target.files?.[0] ?? null),
                                className: "h-12 w-full cursor-pointer rounded-[18px] border-[1.5px] border-dashed border-[#CFE6EF] bg-[#F8FDFF] px-3.5 pt-2.5 text-[12.5px] font-semibold text-[#4A6572] file:mr-3 file:rounded-full file:border-0 file:bg-[#E3F6FD] file:px-3 file:py-1 file:text-[12px] file:font-extrabold file:text-[#006387]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/stories.tsx",
                                lineNumber: 265,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/stories.tsx",
                        lineNumber: 263,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/stories.tsx",
                lineNumber: 230,
                columnNumber: 7
            }, this),
            photoErr ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[12.5px] font-bold text-[#F0426B]",
                children: photoErr
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/stories.tsx",
                lineNumber: 275,
                columnNumber: 9
            }, this) : photo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[12.5px] font-bold text-[#2E7D53]",
                children: [
                    "عکس انتخاب شد: ",
                    photo.name
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/stories.tsx",
                lineNumber: 277,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[12px] font-medium text-[#8FA8B5]",
                children: "JPG / PNG / WebP — حداکثر ۵ مگابایت"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/stories.tsx",
                lineNumber: 279,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "flex flex-col gap-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[13.5px] font-extrabold text-[#04202E]",
                        children: "تجربه‌ات *"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/stories.tsx",
                        lineNumber: 283,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        value: body,
                        onChange: (e)=>setBody(e.target.value.slice(0, MAX_BODY)),
                        rows: 5,
                        placeholder: "مثلاً: جعبه که باز شد، اول عکس‌ها رو دید و بعد کارت رو… از اون روز، عروسک جاش تو مبل خونمه.",
                        className: `${INPUT_CLS} resize-y py-3 leading-[2]`
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/stories.tsx",
                        lineNumber: 284,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center justify-between gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-[12px] font-bold ${tooShort ? "text-[#F0426B]" : "text-[#8FA8B5]"}`,
                                children: tooShort ? `از ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(MIN_BODY)} حرف بیشتر بنویس` : `حداقل ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(MIN_BODY)} حرف`
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/stories.tsx",
                                lineNumber: 292,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-[12px] font-extrabold ${body.length >= MAX_BODY ? "text-[#F0426B]" : "text-[#4A6572]"}`,
                                dir: "ltr",
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(body.length),
                                    " / ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(MAX_BODY)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/stories.tsx",
                                lineNumber: 295,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/stories.tsx",
                        lineNumber: 291,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/stories.tsx",
                lineNumber: 282,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: `flex cursor-pointer items-start gap-3 rounded-[18px] border-[1.5px] p-3.5 transition-colors ${consentErr ? "border-[#F7C5D3] bg-[#FFF7FA]" : "border-[#CFE6EF] bg-[#F8FDFF]"}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "checkbox",
                        checked: consent,
                        onChange: (e)=>{
                            setConsent(e.target.checked);
                            if (e.target.checked) setConsentErr(false);
                        },
                        className: "mt-1 h-5 w-5 shrink-0 accent-[#00ABE7]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/stories.tsx",
                        lineNumber: 306,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[13px] font-semibold leading-[1.95] text-[#1F3E4D]",
                        children: "با تأیید این کادر قبول می‌کنم که تجربه‌ام بعد از تأیید دستی تیم یک دوست، همراه با اسم و شهری که نوشتم تو صفحه‌ی «تجربه مخاطب» منتشر بشه."
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/stories.tsx",
                        lineNumber: 315,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/stories.tsx",
                lineNumber: 301,
                columnNumber: 7
            }, this),
            serverErr && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "rounded-[14px] bg-[#FFF7FA] px-4 py-2.5 text-[13px] font-bold text-[#B02A52]",
                children: serverErr
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/stories.tsx",
                lineNumber: 322,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>void submit(),
                disabled: busy,
                className: "flex h-[54px] items-center justify-center rounded-full bg-[#00ABE7] text-[16px] font-extrabold text-[#04202E] transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-60",
                children: busy ? "در حال فرستادن…" : "فرستادن تجربه"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/stories.tsx",
                lineNumber: 327,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/stories.tsx",
        lineNumber: 220,
        columnNumber: 5
    }, this);
}
_s1(StoryForm, "QeVTH/wVcahh+jZq/MAKO/15hiE=");
_c1 = StoryForm;
function StoriesScreen() {
    _s2();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$metadata$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDocumentMeta"])({
        title: "تجربه مخاطب",
        description: "تجربه‌ی کسانی که با یک دوست برای عزیزشون یه بغل پشمالو فرستادن — و فرم نوشتن تجربه‌ی تو."
    });
    const [stories, setStories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadErr, setLoadErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const formRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StoriesScreen.useEffect": ()=>{
            fetch("/api/stories", {
                cache: "no-store"
            }).then({
                "StoriesScreen.useEffect": (r)=>{
                    if (!r.ok) throw new Error();
                    return r.json();
                }
            }["StoriesScreen.useEffect"]).then({
                "StoriesScreen.useEffect": (j)=>{
                    setStories(j.stories ?? []);
                    setLoadErr(false);
                }
            }["StoriesScreen.useEffect"]).catch({
                "StoriesScreen.useEffect": ()=>setLoadErr(true)
            }["StoriesScreen.useEffect"]);
        }
    }["StoriesScreen.useEffect"], []);
    const goForm = ()=>formRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen flex-col bg-[#F2FAFD]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-5 pb-1.5 pt-4 md:hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-label": "برگشت",
                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("home"),
                        className: "flex h-11 w-11 items-center justify-center rounded-full border border-[#D3E8F0] bg-white text-[#04202E]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BackIcon"], {
                            size: 22
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/stories.tsx",
                            lineNumber: 377,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/stories.tsx",
                        lineNumber: 371,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        "aria-hidden": "true",
                        className: "text-[22px]",
                        children: "🎁"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/stories.tsx",
                        lineNumber: 379,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/stories.tsx",
                lineNumber: 370,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "mx-auto w-full max-w-[1200px] flex-1 px-4 pb-12 pt-3 md:px-6 md:pt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "flex flex-col items-start gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-[14px] bg-[#04202E] px-3.5 py-[7px] text-[13px] font-bold text-white",
                                children: "تجربه مخاطب"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/stories.tsx",
                                lineNumber: 385,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "m-0 text-[30px] font-black leading-[1.45] text-[#04202E] md:text-[40px]",
                                children: "قصه‌ی بغل‌هایی که رسیدن"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/stories.tsx",
                                lineNumber: 388,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "m-0 max-w-[640px] text-[15px] font-medium leading-[2] text-[#1F3E4D] md:text-[16.5px]",
                                children: "این‌جا جاییه که گیرنده‌ها و فرستنده‌ها می‌گن وقتی جعبه‌ی یک دوست باز شد چه اتفاقی افتاد. اگه تو هم یه قصه داری، پایین بنویسش — بعد از تأیید منتشر می‌شه."
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/stories.tsx",
                                lineNumber: 391,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/stories.tsx",
                        lineNumber: 384,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "flex flex-col gap-4 pt-7",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "m-0 text-[20px] font-black text-[#04202E] md:text-[26px]",
                                        children: "تجربه‌های منتشرشده"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/stories.tsx",
                                        lineNumber: 400,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full bg-[#E3F6FD] px-3 py-1 text-[12px] font-extrabold text-[#006387]",
                                        children: stories ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fa"])(stories.length)} تجربه` : "…"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/stories.tsx",
                                        lineNumber: 401,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/stories.tsx",
                                lineNumber: 399,
                                columnNumber: 11
                            }, this),
                            loadErr ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-[24px] border-2 border-dashed border-[#F0B7C9] bg-[#FFF7FA] px-6 py-10 text-center text-[14px] font-bold text-[#B02A52]",
                                children: "تجربه‌ها لود نشدن — صفحه رو یک بار دیگه باز کن."
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/stories.tsx",
                                lineNumber: 407,
                                columnNumber: 13
                            }, this) : stories === null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
                                children: [
                                    0,
                                    1,
                                    2
                                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-[220px] animate-pulse rounded-[24px] bg-white/70"
                                    }, i, false, {
                                        fileName: "[project]/src/components/shop/screens/stories.tsx",
                                        lineNumber: 413,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/stories.tsx",
                                lineNumber: 411,
                                columnNumber: 13
                            }, this) : stories.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center gap-4 rounded-[28px] border-2 border-dashed border-[#99D6EE] bg-white/60 px-6 py-12 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plush"], {
                                        kind: "bunny",
                                        size: 130
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/stories.tsx",
                                        lineNumber: 418,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[17px] font-black text-[#04202E]",
                                        children: "هنوز اولین تجربه منتشر نشده"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/stories.tsx",
                                        lineNumber: 419,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "max-w-[400px] text-[13.5px] font-medium leading-[1.95] text-[#4A6572]",
                                        children: "شاید تو اولین نفر باشی! تجربه‌ات رو بنویس تا بعد از تأیید، اولین قصه‌ی این صفحه باشه."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/stories.tsx",
                                        lineNumber: 420,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: goForm,
                                        className: "flex h-12 items-center rounded-full bg-[#00ABE7] px-6 text-[14.5px] font-extrabold text-[#04202E] transition-transform hover:scale-[1.03] active:scale-95",
                                        children: "نوشتن تجربه"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/stories.tsx",
                                        lineNumber: 423,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/stories.tsx",
                                lineNumber: 417,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
                                children: stories.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StoryCard, {
                                        s: s
                                    }, s.id, false, {
                                        fileName: "[project]/src/components/shop/screens/stories.tsx",
                                        lineNumber: 434,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/stories.tsx",
                                lineNumber: 432,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/stories.tsx",
                        lineNumber: 398,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        ref: formRef,
                        className: "scroll-mt-6 pt-9",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StoryForm, {}, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/stories.tsx",
                            lineNumber: 442,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/stories.tsx",
                        lineNumber: 441,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/stories.tsx",
                lineNumber: 382,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-auto",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/stories.tsx",
                lineNumber: 447,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/stories.tsx",
        lineNumber: 368,
        columnNumber: 5
    }, this);
}
_s2(StoriesScreen, "KzGz36ayV9iCAXZHgcpmhY/JNKs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$metadata$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDocumentMeta"]
    ];
});
_c2 = StoriesScreen;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "StoryCard");
__turbopack_context__.k.register(_c1, "StoryForm");
__turbopack_context__.k.register(_c2, "StoriesScreen");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/shop/screens/blog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BlogIndex",
    ()=>BlogIndex,
    "PostScreen",
    ()=>PostScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// ── Blog: index (#/blog) + post (#/post?slug=…) — Phase C, guide 13-f ──
// Index reads GET /api/posts (published only). PostScreen reads
// GET /api/posts/[slug] and renders the content through the safe <Markdown>
// renderer — no raw HTML ever reaches the DOM.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/plush.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/icons.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hash-route.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$md$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/md.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$metadata$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/seo/metadata.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const faDate = (iso)=>new Intl.DateTimeFormat("fa-IR", {
        dateStyle: "long"
    }).format(new Date(iso));
const tagList = (tags)=>tags.split(/[،,]/).map((t)=>t.trim()).filter(Boolean);
function TagChips({ tags }) {
    const list = tagList(tags);
    if (list.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap gap-1.5",
        children: list.slice(0, 4).map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "rounded-full bg-[#E7E0FA] px-2.5 py-1 text-[11.5px] font-extrabold text-[#5B4A8A]",
                children: t
            }, t, false, {
                fileName: "[project]/src/components/shop/screens/blog.tsx",
                lineNumber: 34,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/shop/screens/blog.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_c = TagChips;
function MobileBar({ back, label }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between px-5 pb-1.5 pt-4 md:hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-label": "برگشت",
                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])(back),
                className: "flex h-11 w-11 items-center justify-center rounded-full border border-[#D3E8F0] bg-white text-[#04202E]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BackIcon"], {
                    size: 22
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/blog.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/blog.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm font-bold text-[#4A6572]",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/blog.tsx",
                lineNumber: 53,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": "true",
                className: "text-[22px]",
                children: "✉️"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/blog.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/blog.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_c1 = MobileBar;
function BlogIndex() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$metadata$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDocumentMeta"])({
        title: "بلاگ یک دوست",
        description: "راهنمای هدیه دادن، ایده‌های عروسک پولیشی و قصه‌های پشمالوی یک دوست — متن‌های کوتاه برای بهانه‌های قشنگ."
    });
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadErr, setLoadErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BlogIndex.useEffect": ()=>{
            fetch("/api/posts", {
                cache: "no-store"
            }).then({
                "BlogIndex.useEffect": (r)=>{
                    if (!r.ok) throw new Error();
                    return r.json();
                }
            }["BlogIndex.useEffect"]).then({
                "BlogIndex.useEffect": (j)=>{
                    setPosts(j.posts ?? []);
                    setLoadErr(false);
                }
            }["BlogIndex.useEffect"]).catch({
                "BlogIndex.useEffect": ()=>setLoadErr(true)
            }["BlogIndex.useEffect"]);
        }
    }["BlogIndex.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen flex-col bg-[#F2FAFD]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileBar, {
                back: "home",
                label: "بلاگ"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/blog.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "mx-auto w-full max-w-[1200px] flex-1 px-4 pb-12 pt-3 md:px-6 md:pt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "flex flex-col items-start gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-[14px] bg-[#04202E] px-3.5 py-[7px] text-[13px] font-bold text-white",
                                children: "بلاگ یک دوست"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/blog.tsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "m-0 text-[30px] font-black leading-[1.45] text-[#04202E] md:text-[40px]",
                                children: "از هدیه دادن، با حروف"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/blog.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "m-0 max-w-[640px] text-[15px] font-medium leading-[2] text-[#1F3E4D] md:text-[16.5px]",
                                children: "ایده‌های هدیه، راهنمای بهانه‌گیری و چیزهایی که درباره‌ی عروسک‌های پولیشی دوست داریم باهات در میون بذاریم."
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/blog.tsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/blog.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "flex flex-col gap-4 pt-7",
                        children: loadErr ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-[24px] border-2 border-dashed border-[#F0B7C9] bg-[#FFF7FA] px-6 py-10 text-center text-[14px] font-bold text-[#B02A52]",
                            children: "پست‌ها لود نشدن — صفحه رو یک بار دیگه باز کن."
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/blog.tsx",
                            lineNumber: 105,
                            columnNumber: 13
                        }, this) : posts === null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
                            children: [
                                0,
                                1,
                                2
                            ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-[200px] animate-pulse rounded-[24px] bg-white/70"
                                }, i, false, {
                                    fileName: "[project]/src/components/shop/screens/blog.tsx",
                                    lineNumber: 111,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/blog.tsx",
                            lineNumber: 109,
                            columnNumber: 13
                        }, this) : posts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center gap-4 rounded-[28px] border-2 border-dashed border-[#99D6EE] bg-white/60 px-6 py-12 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plush"], {
                                    kind: "sheep",
                                    size: 130
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/blog.tsx",
                                    lineNumber: 116,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[17px] font-black text-[#04202E]",
                                    children: "هنوز پستی منتشر نشده"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/blog.tsx",
                                    lineNumber: 117,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "max-w-[400px] text-[13.5px] font-medium leading-[1.95] text-[#4A6572]",
                                    children: "داریم می‌نویسیم! تا اون موقع یه سر به تجربه‌های مخاطب‌ها بزن."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/blog.tsx",
                                    lineNumber: 118,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/shop/screens/blog.tsx",
                            lineNumber: 115,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
                            children: posts.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("post", {
                                            slug: p.slug
                                        }),
                                    className: "flex flex-col items-start gap-3 rounded-[24px] border border-[#DDEEF5] bg-white p-5 text-right transition-all hover:-translate-y-0.5 hover:border-[#00ABE7] hover:shadow-[0_10px_24px_rgba(4,32,46,0.07)]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[12.5px] font-bold text-[#4A6572]",
                                            children: p.publishedAt ? faDate(p.publishedAt) : ""
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/blog.tsx",
                                            lineNumber: 131,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[17px] font-black leading-[1.7] text-[#04202E]",
                                            children: p.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/blog.tsx",
                                            lineNumber: 134,
                                            columnNumber: 19
                                        }, this),
                                        p.excerpt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[13.5px] font-medium leading-[2] text-[#4A6572]",
                                            children: p.excerpt
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/blog.tsx",
                                            lineNumber: 136,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TagChips, {
                                            tags: p.tags
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/blog.tsx",
                                            lineNumber: 138,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mt-auto flex items-center gap-1.5 pt-1 text-[13px] font-extrabold text-[#00779F]",
                                            children: [
                                                "خواندن پست",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ForwardIcon"], {
                                                    size: 15,
                                                    stroke: "#00779F"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/shop/screens/blog.tsx",
                                                    lineNumber: 141,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/shop/screens/blog.tsx",
                                            lineNumber: 139,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, p.slug, true, {
                                    fileName: "[project]/src/components/shop/screens/blog.tsx",
                                    lineNumber: 125,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/blog.tsx",
                            lineNumber: 123,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/blog.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "pt-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("stories"),
                            className: "flex w-full items-center gap-4 rounded-[24px] border-2 border-dashed border-[#F7C5D3] bg-[#FFF7FA] p-5 text-right transition-transform hover:scale-[1.01]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "aria-hidden": "true",
                                    className: "text-[26px]",
                                    children: "🎁"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/blog.tsx",
                                    lineNumber: 156,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex min-w-0 flex-1 flex-col gap-0.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[15px] font-black text-[#04202E]",
                                            children: "داستان مخاطب‌ها"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/blog.tsx",
                                            lineNumber: 158,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[13px] font-medium leading-[1.9] text-[#4A6572]",
                                            children: "تجربه‌ی کسانی که جعبه‌شون رسیده — و جای تجربه‌ی تو هم خالیه."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shop/screens/blog.tsx",
                                            lineNumber: 159,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/shop/screens/blog.tsx",
                                    lineNumber: 157,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ForwardIcon"], {
                                    size: 20,
                                    stroke: "#B02A52"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/blog.tsx",
                                    lineNumber: 163,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/shop/screens/blog.tsx",
                            lineNumber: 151,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/blog.tsx",
                        lineNumber: 150,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/blog.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-auto",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/blog.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/blog.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
_s(BlogIndex, "Dy/cnc3Xd4lt2zxQix7Z7vS8zgU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$metadata$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDocumentMeta"]
    ];
});
_c2 = BlogIndex;
function PostScreen({ slug }) {
    _s1();
    // fetch result is slug-tagged: a mismatch means a new slug is in flight → loading
    const [res, setRes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const show = res && res.slug === slug ? res : null;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PostScreen.useEffect": ()=>{
            if (!slug) return;
            let alive = true;
            fetch(`/api/posts/${encodeURIComponent(slug)}`, {
                cache: "no-store"
            }).then({
                "PostScreen.useEffect": async (r)=>{
                    if (!alive) return;
                    if (r.status === 404) {
                        setRes({
                            slug,
                            kind: "notfound"
                        });
                        return;
                    }
                    if (!r.ok) throw new Error();
                    const j = await r.json();
                    if (!alive) return;
                    if (j.post) setRes({
                        slug,
                        kind: "ok",
                        post: j.post
                    });
                    else setRes({
                        slug,
                        kind: "notfound"
                    });
                }
            }["PostScreen.useEffect"]).catch({
                "PostScreen.useEffect": ()=>{
                    if (alive) setRes({
                        slug,
                        kind: "err"
                    });
                }
            }["PostScreen.useEffect"]);
            return ({
                "PostScreen.useEffect": ()=>{
                    alive = false;
                }
            })["PostScreen.useEffect"];
        }
    }["PostScreen.useEffect"], [
        slug
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$metadata$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDocumentMeta"])({
        title: show?.post?.title ?? "بلاگ یک دوست",
        description: show?.post?.excerpt || undefined
    });
    if (!slug || show?.kind === "notfound") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex min-h-screen flex-col bg-[#F2FAFD]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileBar, {
                    back: "blog"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/blog.tsx",
                    lineNumber: 216,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: "mx-auto flex w-full max-w-[1200px] flex-1 items-center justify-center px-4 pb-12",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center gap-4 rounded-[28px] border-2 border-dashed border-[#99D6EE] bg-white/60 px-6 py-12 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plush"], {
                                kind: "panda",
                                size: 130
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/blog.tsx",
                                lineNumber: 219,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[18px] font-black text-[#04202E]",
                                children: "پست پیدا نشد"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/blog.tsx",
                                lineNumber: 220,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "max-w-[380px] text-[13.5px] font-medium leading-[1.95] text-[#4A6572]",
                                children: "شاید این پست جابه‌جا شده یا منتشر نشده. بقیه‌ی پست‌ها منتظرتن!"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/blog.tsx",
                                lineNumber: 221,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("blog"),
                                className: "flex h-12 items-center rounded-full bg-[#00ABE7] px-6 text-[14.5px] font-extrabold text-[#04202E] transition-transform active:scale-95",
                                children: "بازگشت به بلاگ"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/blog.tsx",
                                lineNumber: 224,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/blog.tsx",
                        lineNumber: 218,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/blog.tsx",
                    lineNumber: 217,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-auto",
                    "aria-hidden": "true"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/blog.tsx",
                    lineNumber: 233,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/shop/screens/blog.tsx",
            lineNumber: 215,
            columnNumber: 7
        }, this);
    }
    if (!show || show.kind === "err") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex min-h-screen flex-col bg-[#F2FAFD]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileBar, {
                    back: "blog"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/blog.tsx",
                    lineNumber: 241,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: "mx-auto w-full max-w-[760px] flex-1 px-4 pb-12 pt-6",
                    children: show?.kind === "err" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center gap-4 rounded-[28px] border-2 border-dashed border-[#F0B7C9] bg-[#FFF7FA] px-6 py-12 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$plush$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Plush"], {
                                kind: "duck",
                                size: 110
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/blog.tsx",
                                lineNumber: 245,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[16px] font-black text-[#04202E]",
                                children: "پست لود نشد"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/blog.tsx",
                                lineNumber: 246,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[13.5px] font-medium text-[#4A6572]",
                                children: "اینترنت رو چک کن و صفحه رو دوباره باز کن."
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/blog.tsx",
                                lineNumber: 247,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("blog"),
                                className: "flex h-12 items-center rounded-full bg-[#00ABE7] px-6 text-[14.5px] font-extrabold text-[#04202E] transition-transform active:scale-95",
                                children: "بازگشت به بلاگ"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/blog.tsx",
                                lineNumber: 248,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/blog.tsx",
                        lineNumber: 244,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-[300px] animate-pulse rounded-[28px] bg-white/70"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/blog.tsx",
                        lineNumber: 257,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/blog.tsx",
                    lineNumber: 242,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-auto",
                    "aria-hidden": "true"
                }, void 0, false, {
                    fileName: "[project]/src/components/shop/screens/blog.tsx",
                    lineNumber: 260,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/shop/screens/blog.tsx",
            lineNumber: 240,
            columnNumber: 7
        }, this);
    }
    const post = show.post;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen flex-col bg-[#F2FAFD]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileBar, {
                back: "blog",
                label: "بلاگ"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/blog.tsx",
                lineNumber: 269,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "mx-auto w-full max-w-[760px] flex-1 px-4 pb-12 pt-3 md:px-6 md:pt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: "flex flex-col gap-4 rounded-[28px] border border-[#DDEEF5] bg-white p-5 md:p-9",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "m-0 text-[26px] font-black leading-[1.6] text-[#04202E] md:text-[34px]",
                                children: post.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/blog.tsx",
                                lineNumber: 273,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-2.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full bg-[#E3F6FD] px-3 py-1 text-[12px] font-extrabold text-[#006387]",
                                        children: post.publishedAt ? faDate(post.publishedAt) : "در انتظار انتشار"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/blog.tsx",
                                        lineNumber: 275,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TagChips, {
                                        tags: post.tags
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/blog.tsx",
                                        lineNumber: 278,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/blog.tsx",
                                lineNumber: 274,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-t border-[#EDF6FA] pt-5",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$md$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Markdown"], {
                                    text: post.content
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shop/screens/blog.tsx",
                                    lineNumber: 281,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/blog.tsx",
                                lineNumber: 280,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/blog.tsx",
                        lineNumber: 272,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-4 pt-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("blog"),
                                className: "self-start text-[13.5px] font-extrabold text-[#00779F] underline underline-offset-4 transition-colors hover:text-[#04202E]",
                                children: "بازگشت به بلاگ"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/blog.tsx",
                                lineNumber: 287,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("pick"),
                                className: "flex w-full items-center gap-4 rounded-[24px] bg-[#00ABE7] p-5 text-right transition-transform hover:scale-[1.01]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        "aria-hidden": "true",
                                        className: "text-[26px]",
                                        children: "🧸"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/blog.tsx",
                                        lineNumber: 300,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex min-w-0 flex-1 flex-col gap-0.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[15.5px] font-black text-[#04202E]",
                                                children: "یه هدیه پشمالو بفرست"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/blog.tsx",
                                                lineNumber: 302,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[13px] font-semibold leading-[1.9] text-[#04202E]/80",
                                                children: "دوستت منتظره؟ یه دوست پشمالو انتخاب کن و بغلش رو بفرست."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/blog.tsx",
                                                lineNumber: 303,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/blog.tsx",
                                        lineNumber: 301,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ForwardIcon"], {
                                        size: 20,
                                        stroke: "#04202E"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/blog.tsx",
                                        lineNumber: 307,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/blog.tsx",
                                lineNumber: 295,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("stories"),
                                className: "flex w-full items-center gap-4 rounded-[24px] border-2 border-dashed border-[#F7C5D3] bg-[#FFF7FA] p-5 text-right transition-transform hover:scale-[1.01]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        "aria-hidden": "true",
                                        className: "text-[26px]",
                                        children: "🎁"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/blog.tsx",
                                        lineNumber: 315,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex min-w-0 flex-1 flex-col gap-0.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[15px] font-black text-[#04202E]",
                                                children: "داستان مخاطب‌ها"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/blog.tsx",
                                                lineNumber: 317,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[13px] font-medium leading-[1.9] text-[#4A6572]",
                                                children: "تجربه‌ی کسانی که جعبه‌شون رسیده — و جای تجربه‌ی تو هم خالیه."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/blog.tsx",
                                                lineNumber: 318,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/blog.tsx",
                                        lineNumber: 316,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ForwardIcon"], {
                                        size: 20,
                                        stroke: "#B02A52"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/blog.tsx",
                                        lineNumber: 322,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/blog.tsx",
                                lineNumber: 310,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/blog.tsx",
                        lineNumber: 286,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/blog.tsx",
                lineNumber: 271,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-auto",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/blog.tsx",
                lineNumber: 327,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/blog.tsx",
        lineNumber: 268,
        columnNumber: 5
    }, this);
}
_s1(PostScreen, "MmIAJQrF6qHW0pHJRALpAL9BylI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$metadata$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDocumentMeta"]
    ];
});
_c3 = PostScreen;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "TagChips");
__turbopack_context__.k.register(_c1, "MobileBar");
__turbopack_context__.k.register(_c2, "BlogIndex");
__turbopack_context__.k.register(_c3, "PostScreen");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/shop/screens/legal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LegalPage",
    ()=>LegalPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// ── Legal pages: حریم خصوصی / قوانین / مرجوعی (#/legal?doc=…) — Phase C ──
// Draft Persian copy for owner review (پیش‌نویس badge). Invalid doc falls back
// to privacy. Tab switcher on top + links to the other two docs at the bottom.
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/icons.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hash-route.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$metadata$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/seo/metadata.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const DOCS = {
    privacy: {
        key: "privacy",
        label: "حریم خصوصی",
        title: "حریم خصوصی",
        metaTitle: "حریم خصوصی",
        description: "یک دوست با چه داده‌ای کار می‌کنه، چی رو جایی نمی‌بره و چطور می‌تونی حذفش کنی.",
        intro: "ما تو یک دوست فقط اون‌قدر داده نگه می‌داریم که هدیه‌ات برسه و حسابت درست کار کنه. این برگه صادقانه می‌گه چی ذخیره می‌شه و چی هرگز جایی نمی‌ره.",
        sections: [
            {
                h: "چه داده‌ای جمع می‌کنیم؟",
                list: [
                    "شماره موبایل و اسمت — برای ورود و حساب «هدیه‌هام».",
                    "اسم، شماره و آدرس گیرنده — فقط برای اینکه جعبه با پست برسه.",
                    "پیام هدیه (متن کارت) — برای چاپ روی کارت پستال و نمایش با رمز QR.",
                    "رسید پرداخت — اگه کارت‌به‌کارت پرداخت کردی، عکس رسیدت برای بررسی حساب نگه داشته می‌شه."
                ]
            },
            {
                h: "چی رو جایی نمی‌بریم",
                ps: [
                    "هیچ‌کدوم از داده‌هات رو نمی‌فروشیم، اجاره نمی‌دیم و برای تبلیغات به کسی نمی‌دیم.",
                    "آدرس گیرنده فقط برای ارسال همین سفارش استفاده می‌شه؛ بعدش فقط تو همون سفارش می‌مونه."
                ]
            },
            {
                h: "کوکی و نشست ورود",
                ps: [
                    "برای اینکه لازم نباشه هر بار کد بدی، یه کوکی نشست (pn_session) روی مرورگرت ذخیره می‌شه. این کوکی فقط برای شناختن حسابت است؛ بدون ورود، هیچ داده‌ی شخصی‌ای با صفحه‌های عمومی رد و بدل نمی‌شه."
                ]
            },
            {
                h: "حق حذف داده‌هات",
                ps: [
                    "هر وقت بخوای می‌تونی از طریق پشتیبانی (همین صفحه، بخش تماس) بخوای حسابت و داده‌هات حذف بشه. سفارش‌های تحویل‌شده فقط تا حدی که قانون حسابداری اجازه می‌ده نگه داشته می‌شن و بقیه‌ش پاک می‌شه."
                ]
            }
        ]
    },
    terms: {
        key: "terms",
        label: "قوانین خرید",
        title: "قوانین خرید",
        metaTitle: "قوانین خرید",
        description: "قیمت‌ها، روش پرداخت، زمان ارسال و قواعد خرید از یک دوست.",
        intro: "این برگه قواعد خرید از یک دوست است؛ کوتاه و بدون حروف ریز. با ثبت سفارش، یعنی این‌ها رو قبول گرفتی.",
        sections: [
            {
                h: "قوانین خرید",
                ps: [
                    "هر جعبه یک دوست پشمالو است با یه قیمت مشخص. موجودی انبار واقعیه؛ اگه سفارش‌ت ثبت نشه، پولی ازت برداشته نمی‌شه.",
                    "قبل از ارسال می‌تونی آدرس یا پیام کارت رو اصلاح کنی؛ بعد از تحویل به پست، تغییر ممکن نیست."
                ]
            },
            {
                h: "قیمت‌ها",
                ps: [
                    "همه‌ی قیمت‌ها به تومان و شامل مالیات است. هزینه‌ی ارسال جدا محاسبه و قبل از پرداخت نشون داده می‌شه (تهران و شهرستان متفاوته)."
                ]
            },
            {
                h: "روش پرداخت",
                list: [
                    "زرین‌پال — درگاه آنلاین کارت‌های عضو شتاب.",
                    "کارت‌به‌کارت — عکس رسید رو آپلود می‌کنی؛ بعد از تأیید دستی ما، سفارش وارد صف بسته‌بندی می‌شه."
                ]
            },
            {
                h: "زمان ارسال",
                ps: [
                    "بعد از تأیید پرداخت، حدود ۲ روز کاری بسته‌بندی می‌کنیم و تحویل پست می‌دیم. رسیدن بسته بستگی به شهر گیرنده داره؛ معمولاً ۲ تا ۵ روز کاری."
                ]
            },
            {
                h: "نیروی قهری",
                ps: [
                    "اگه اتفاقی خارج از اراده‌ی ما (قطعی کامل پست، بلایای طبیعی، اختلال گسترده‌ی اینترنت) ارسال رو متوقف کنه، سفارش‌ت معطل می‌مونه ولی بی‌جواب نمی‌مونه: خبرت می‌کنیم و تا رفع مشکل، حق لغو و بازگشت کامل وجه رو داری."
                ]
            }
        ]
    },
    refund: {
        key: "refund",
        label: "مرجوعی",
        title: "مرجوعی و آسیب حمل‌ونقل",
        metaTitle: "مرجوعی",
        description: "شرایط مرجوعی یک دوست: فقط آسیب فیزیکی، تا ۷ روز با عکس؛ مسیر درخواست از «هدیه‌هام».",
        intro: "هیچ‌کس دوست نداره هدیه‌ش آسیب‌دار برسه. این برگه دقیق می‌گه کی می‌شه مرجوع کرد و مسیرش چطوره.",
        sections: [
            {
                h: "چه زمانی مرجوع می‌شه؟",
                ps: [
                    "فقط آسیب فیزیکی: اگه جعبه یا عروسک موقع حمل‌ونقل آسیب دیده باشه، تا ۷ روز پس از تحویل می‌تونی درخواست بدی. حتماً چند تا عکس واضح از آسیب ضمیمه کن — بدون عکس نمی‌تونیم پیگیری کنیم."
                ]
            },
            {
                h: "هزینه‌ها با کیه؟",
                ps: [
                    "هزینه‌ی ارسالِ مرجوعیِ ناشی از آسیب حمل‌ونقل با ما است — چیزی به گردنت نیست. وجه به کارت مبدأ برمی‌گرده."
                ]
            },
            {
                h: "مسیر درخواست",
                list: [
                    "تو صفحه‌ی «هدیه‌هام»، روی کارت همون سفارش دکمه‌ی «درخواست مرجوعی» رو بزن و دلیل رو بنویس.",
                    "تیم ما تا ۴۸ ساعت بررسی می‌کنه و اگه تأیید بشه، وجه به کارت مبدأ برمی‌گرده.",
                    "نتیجه‌ی بررسی همون‌جا روی وضعیت سفارش می‌افته."
                ]
            },
            {
                h: "هدیه‌های شخصی‌سازی‌شده",
                ps: [
                    "هدیه‌هایی که سالم رسیده‌ن ولی شخصی‌سازی شده‌ن (پیام کارت، قلب و پنجه، ناشناس بودن) مرجوع نیستند؛ چون این هدیه دقیقاً برای یک نفر ساخته شده و قابل فروش دوباره نیست. برای همین قبل از ثبت، پیام و گزینه‌ها رو با دقت نهایی کن."
                ]
            }
        ]
    }
};
const ORDER = [
    "privacy",
    "terms",
    "refund"
];
function LegalPage({ doc }) {
    _s();
    const key = ORDER.includes(doc) ? doc : "privacy";
    const d = DOCS[key];
    const others = ORDER.filter((k)=>k !== key);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$metadata$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDocumentMeta"])({
        title: d.metaTitle,
        description: d.description
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen flex-col bg-[#F2FAFD]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-5 pb-1.5 pt-4 md:hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-label": "برگشت",
                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("home"),
                        className: "flex h-11 w-11 items-center justify-center rounded-full border border-[#D3E8F0] bg-white text-[#04202E]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BackIcon"], {
                            size: 22
                        }, void 0, false, {
                            fileName: "[project]/src/components/shop/screens/legal.tsx",
                            lineNumber: 169,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/legal.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        "aria-hidden": "true",
                        className: "text-[22px]",
                        children: "📜"
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/legal.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/legal.tsx",
                lineNumber: 162,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "mx-auto w-full max-w-[860px] flex-1 px-4 pb-12 pt-3 md:px-6 md:pt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "flex flex-col items-start gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-[14px] bg-[#04202E] px-3.5 py-[7px] text-[13px] font-bold text-white",
                                        children: "یک دوست"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/legal.tsx",
                                        lineNumber: 178,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full bg-[#FFF3C9] px-3 py-1.5 text-[11.5px] font-extrabold text-[#8A6D1F]",
                                        children: "پیش‌نویس — در انتظار تأیید مالک"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/legal.tsx",
                                        lineNumber: 181,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shop/screens/legal.tsx",
                                lineNumber: 177,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "m-0 text-[28px] font-black leading-[1.5] text-[#04202E] md:text-[38px]",
                                children: d.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/legal.tsx",
                                lineNumber: 185,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "m-0 max-w-[680px] text-[15px] font-medium leading-[2] text-[#1F3E4D]",
                                children: d.intro
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/legal.tsx",
                                lineNumber: 186,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/legal.tsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        "aria-label": "برگه‌های قانونی",
                        className: "flex gap-2 overflow-x-auto pt-6",
                        children: ORDER.map((k)=>{
                            const on = k === key;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "aria-pressed": on,
                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("legal", {
                                        doc: k
                                    }),
                                className: "h-11 shrink-0 rounded-full px-5 text-[13.5px] font-extrabold transition-all",
                                style: {
                                    background: on ? "#04202E" : "#fff",
                                    border: `1.5px solid ${on ? "#04202E" : "#CFE6EF"}`,
                                    color: on ? "#fff" : "#04202E"
                                },
                                children: DOCS[k].label
                            }, k, false, {
                                fileName: "[project]/src/components/shop/screens/legal.tsx",
                                lineNumber: 194,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/legal.tsx",
                        lineNumber: 190,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: "mt-5 flex flex-col gap-7 rounded-[28px] border border-[#DDEEF5] bg-white p-5 md:p-9",
                        children: d.sections.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "flex flex-col gap-2.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "m-0 flex items-center gap-2 text-[17px] font-black text-[#04202E] md:text-[20px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "h-[18px] w-[5px] shrink-0 rounded-full bg-[#00ABE7]",
                                                "aria-hidden": "true"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shop/screens/legal.tsx",
                                                lineNumber: 217,
                                                columnNumber: 17
                                            }, this),
                                            s.h
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shop/screens/legal.tsx",
                                        lineNumber: 216,
                                        columnNumber: 15
                                    }, this),
                                    s.ps?.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "m-0 text-[14.5px] font-medium leading-[2.05] text-[#1F3E4D]",
                                            children: p
                                        }, i, false, {
                                            fileName: "[project]/src/components/shop/screens/legal.tsx",
                                            lineNumber: 221,
                                            columnNumber: 17
                                        }, this)),
                                    s.list && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "m-0 flex list-disc flex-col gap-1.5 ps-6",
                                        children: s.list.map((li, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "text-[14.5px] font-medium leading-[2.05] text-[#1F3E4D]",
                                                children: li
                                            }, i, false, {
                                                fileName: "[project]/src/components/shop/screens/legal.tsx",
                                                lineNumber: 228,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shop/screens/legal.tsx",
                                        lineNumber: 226,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, s.h, true, {
                                fileName: "[project]/src/components/shop/screens/legal.tsx",
                                lineNumber: 215,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/shop/screens/legal.tsx",
                        lineNumber: 213,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "flex flex-col gap-2.5 pt-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[13.5px] font-extrabold text-[#04202E]",
                                children: "بقیه‌ی برگه‌ها:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/legal.tsx",
                                lineNumber: 240,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: others.map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigate"])("legal", {
                                                doc: k
                                            }),
                                        className: "flex h-11 items-center rounded-full border-[1.5px] border-[#CFE6EF] bg-white px-5 text-[13.5px] font-extrabold text-[#04202E] transition-colors hover:border-[#00ABE7]",
                                        children: DOCS[k].label
                                    }, k, false, {
                                        fileName: "[project]/src/components/shop/screens/legal.tsx",
                                        lineNumber: 243,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/shop/screens/legal.tsx",
                                lineNumber: 241,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/shop/screens/legal.tsx",
                        lineNumber: 239,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shop/screens/legal.tsx",
                lineNumber: 174,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-auto",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/components/shop/screens/legal.tsx",
                lineNumber: 256,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shop/screens/legal.tsx",
        lineNumber: 160,
        columnNumber: 5
    }, this);
}
_s(LegalPage, "7UeBLU24djjsZXincb7R0m5255c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$metadata$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDocumentMeta"]
    ];
});
_c = LegalPage;
var _c;
__turbopack_context__.k.register(_c, "LegalPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_shop_screens_22e4db49._.js.map