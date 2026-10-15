module.exports = [
"[project]/src/lib/hash-route.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ROUTES",
    ()=>ROUTES,
    "navigate",
    ()=>navigate,
    "useHashRoute",
    ()=>useHashRoute,
    "useNav",
    ()=>useNav
]);
// ── Tiny hash router (single-route sandbox constraint: everything lives on /) ──
// Supports section anchors: `#/home@friends` scrolls to element#friends after render.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
const ROUTES = [
    "home",
    "friends",
    "product",
    "pick",
    "card",
    "extras",
    "checkout",
    "pay-gateway",
    "success",
    "my-gifts",
    "impact",
    "login",
    "gift",
    "about",
    "mission",
    "contact",
    "reviews",
    "shipping",
    "track",
    "admin",
    "stories",
    "blog",
    "post",
    "legal",
    "not-found"
];
function parseHash() {
    const h = window.location.hash.replace(/^#\/?/, "");
    const [pathAndAnchor, qs] = h.split("?");
    const [path, anchorPart] = pathAndAnchor.split("@");
    // empty hash → home; known path → its screen; anything else → Persian 404
    const route = path === "" ? "home" : ROUTES.includes(path) ? path : "not-found";
    return {
        route,
        query: new URLSearchParams(qs ?? ""),
        anchor: anchorPart && anchorPart.length > 0 ? anchorPart : null
    };
}
function navigate(route, query, anchor) {
    const qs = query ? "?" + new URLSearchParams(query).toString() : "";
    const at = anchor ? `@${anchor}` : "";
    window.location.hash = `#/${route}${qs}${at}`;
}
function useHashRoute() {
    // SSR-safe: always start at "home", sync the real hash after mount
    // (reading location.hash during first client render causes hydration mismatch)
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        route: "home",
        query: new URLSearchParams(),
        anchor: null
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const onChange = ()=>{
            const next = parseHash();
            setState(next);
            if (next.anchor) {
                // wait one paint for the screen to mount, then glide to the section
                window.setTimeout(()=>{
                    document.getElementById(next.anchor)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }, 160);
            } else {
                window.scrollTo({
                    top: 0
                });
            }
        };
        onChange();
        window.addEventListener("hashchange", onChange);
        return ()=>window.removeEventListener("hashchange", onChange);
    }, []);
    return state;
}
function useNav() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((r, q)=>navigate(r, q), []);
}
}),
"[project]/src/lib/pishnam-data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ── Pishnam shared data (ported from the design system DC scripts) ──
__turbopack_context__.s([
    "ABOUT_STATS",
    ()=>ABOUT_STATS,
    "ABOUT_TIMELINE",
    ()=>ABOUT_TIMELINE,
    "ABOUT_VALUES",
    ()=>ABOUT_VALUES,
    "BOX_PRICE",
    ()=>BOX_PRICE,
    "CHARITY_BASE",
    ()=>CHARITY_BASE,
    "CHARITY_TARGET",
    ()=>CHARITY_TARGET,
    "CHARM_PRICE",
    ()=>CHARM_PRICE,
    "DESKTOP_FAQ",
    ()=>DESKTOP_FAQ,
    "FIRST_GIFT_NO",
    ()=>FIRST_GIFT_NO,
    "GIFT_OPEN_DEFAULT_PASSWORD",
    ()=>GIFT_OPEN_DEFAULT_PASSWORD,
    "HOME_STEPS",
    ()=>HOME_STEPS,
    "HOME_TRUST",
    ()=>HOME_TRUST,
    "OCCASIONS",
    ()=>OCCASIONS,
    "OCCASION_HOLDERS",
    ()=>OCCASION_HOLDERS,
    "OCCASION_IDEAS",
    ()=>OCCASION_IDEAS,
    "PLUSHES",
    ()=>PLUSHES,
    "PLUSH_MAP",
    ()=>PLUSH_MAP,
    "REVIEWS_BARS",
    ()=>REVIEWS_BARS,
    "REVIEWS_CARDS",
    ()=>REVIEWS_CARDS,
    "SHIPPING_SECTIONS",
    ()=>SHIPPING_SECTIONS,
    "plushLabel",
    ()=>plushLabel
]);
const BOX_PRICE = 890_000;
const CHARM_PRICE = 50_000;
const FIRST_GIFT_NO = 101;
const CHARITY_BASE = 18; // charms already donated before the demo
const CHARITY_TARGET = 30;
const PLUSHES = [
    {
        kind: "bear",
        name: "کِرِمی",
        chips: [
            "بغلی",
            "آروم",
            "شیرین"
        ],
        bg: "#FFE8D1",
        blurb: "کِرِمی برای روزای دلتنگی ساخته شده؛ یه بغل گرم که هیچ‌وقت خسته نمی‌شه."
    },
    {
        kind: "bunny",
        name: "لپ‌قندی",
        chips: [
            "شیطون",
            "بازیگوش",
            "پرانرژی"
        ],
        bg: "#FFE0EA",
        blurb: "لپ‌قندی همیشه یه خبر خوب تو گوشش داره و می‌خواد با تو تقسیمش کنه."
    },
    {
        kind: "cat",
        name: "میشی",
        chips: [
            "ناز",
            "کم‌حرف",
            "لوس"
        ],
        bg: "#E7E0FA",
        blurb: "میشی با یه نگاه می‌فهمه حالت چطوره و بی‌سروصدا کنارت می‌شینه."
    },
    {
        kind: "panda",
        name: "بامبو",
        chips: [
            "خوابالو",
            "مهربون",
            "آروم"
        ],
        bg: "#DDF3EA",
        blurb: "بامبو استاد چرت‌های وسط روزه؛ برای دوستی که خسته‌ست عالیه."
    },
    {
        kind: "sheep",
        name: "ابری",
        chips: [
            "نرم",
            "خندون",
            "پفی"
        ],
        bg: "#FFF3C9",
        blurb: "ابری مثل یه تیکه ابره؛ فقط باید محکم بغلش کنی."
    },
    {
        kind: "duck",
        name: "قات‌قات",
        chips: [
            "شاد",
            "پرسروصدا",
            "سرحال"
        ],
        bg: "#D7F1FB",
        blurb: "قات‌قات حال هر جمعی رو خوب می‌کنه، حتی تو روزای بارونی."
    }
];
const PLUSH_MAP = Object.fromEntries(PLUSHES.map((p)=>[
        p.kind,
        p
    ]));
function plushLabel(kind) {
    const species = {
        bear: "خرس",
        bunny: "خرگوش",
        cat: "گربه",
        panda: "پاندا",
        sheep: "گوسفند",
        duck: "اردک"
    };
    return `${PLUSH_MAP[kind].name}، ${species[kind]}`;
}
const OCCASIONS = [
    "همین‌طوری",
    "دلم تنگ شده",
    "زودتر خوب شی",
    "تولدت مبارک"
];
const OCCASION_HOLDERS = [
    "مثلاً: همین‌طوری گفتم یه بغل برات بفرستم، چون دوستت دارم…",
    "مثلاً: دلم برات خیلی تنگ شده، زود بیا ببینمت…",
    "مثلاً: زودتر خوب شو، بدون تو هیچ‌چی مزه نداره…",
    "مثلاً: تولدت مبارک عزیزم، امسال بهترین سالِ زندگیته…"
];
const OCCASION_IDEAS = [
    // همین‌طوری
    [
        "هیچ موقعیت خاصی نبود؛ فقط یادت افتادی و خواستم بدونم که برام خیلی مهمی.",
        "امروز هوا آروم بود و حالمو تو ذهنم گذاشتم کنارِ تو. این بغل رو بر همین اساس بفرستادم.",
        "یه بغل بدون بهانه، از طرف کسی که همیشه آرزوش اینه تو خوشحال باشی."
    ],
    // دلم تنگ شده
    [
        "دلم برات خیلی تنگ شده. چقدر خوب می‌شد الان بغلت می‌کردم و هیچ‌کدوم‌مون حرف نمی‌زد.",
        "این روزا جاهای خالی‌ت بیشتر حس می‌شن. زود بیا ببینمت، بغل این عروسک تا اون موقع جای من.",
        "شنیدم این روزا حال‌وهوات خوب نیست. من همین‌ورم، هر وقت خواستی بغل کنی یه نفر هم دعات می‌کنه."
    ],
    // زودتر خوب شی
    [
        "زودتر خوب شو. چای‌ت رو داغ بخور، پتو رو بکش رو خودت و این بغل رو محکم بغل کن.",
        "بدون تو هیچ‌چی مزه نداره؛ حتی خنده‌ها. پس زود خوب شو که قراره کلی کار خوب با هم بکنیم.",
        "هر شب قبل خواب یه دعا برای تو دارم. این جعبه هم قسمتی از همون دعاست."
    ],
    // تولدت مبارک
    [
        "تولدت مبارک! امسال بهترین سالِ زندگیته؛ من قولش رو بهت می‌دم.",
        "یه سال دیگه از بودنت باهات، و من هنوز شانسم رو برای دوستیت بلدم. تولدت مبارک عزیز.",
        "آرزوت رو ببند، شمع رو فوت کن و این بغل رو قبول کن؛ سالی پر از اتفاق خوب برات می‌خوام."
    ]
];
const HOME_STEPS = [
    {
        n: "۱",
        title: "دوستت رو انتخاب کن",
        body: "از بین شش تا دوست پشمالو یکی رو بردار. همه‌شون یه قیمت دارن، پس فقط به دلت گوش بده.",
        bg: "#CDEFFB"
    },
    {
        n: "۲",
        title: "کارت پستالت رو بنویس",
        body: "پیامت رو بنویس، عکس یا ویدیو بذار و یه رمز انتخاب کن. دوستت با اسکن QR کارت، همه‌ش رو می‌بینه.",
        bg: "#FFE0EA"
    },
    {
        n: "۳",
        title: "ما می‌فرستیم، تو لذتشو ببر",
        body: "جعبه‌ی کادویی با شماره‌ی هدیه می‌رسه دستش. اگه بخوای، بدون اسم تو می‌رسه.",
        bg: "#FFF3C9"
    }
];
const HOME_TRUST = [
    {
        icon: "♥",
        title: "یه قیمت برای همه",
        body: "مهربونی وزن نداره"
    },
    {
        icon: "✓",
        title: "ناشناس هم می‌شه",
        body: "اسمت رو ننویسی، نمی‌دونه کی بوده"
    },
    {
        icon: "★",
        title: "کارتِ رمزدار",
        body: "فقط خودش پیامت رو می‌بینه"
    }
];
const DESKTOP_FAQ = [
    {
        q: "دوستم می‌فهمه کی فرستاده؟",
        a: "فقط اگه اسمت رو بنویسی. اگه ناشناس بفرستی، تو جعبه و کارت هیچ اسمی نیست."
    },
    {
        q: "چقدر طول می‌کشه برسه؟",
        a: "سفارش‌ها آماده و تحویل پست می‌شن. زمان دقیق رو موقع ثبت آدرس گیرنده می‌بینی."
    },
    {
        q: "چرا همه‌ی جعبه‌ها یه قیمتن؟",
        a: "چون نمی‌خوایم هدیه‌ی گرون‌تر یعنی دوستیِ بیشتر. اینجا مهربونی وزن نداره."
    },
    {
        q: "پول قلب و پنجه‌ها کجا می‌ره؟",
        a: "کامل برای هدیه به بچه‌های بی‌سرپرست و پناهگاه حیوونا. رسید و عکس تحویل رو تو دفتر مهربونی می‌ذاریم."
    }
];
const ABOUT_TIMELINE = [
    {
        year: "۱۴۰۱",
        bg: "#CDEFFB",
        title: "ایده شکل گرفت",
        body: "یه شب بارونی، یه دوست دلگیر و یه عروسک پشمالو؛ فکر کردیم چرا هیچ‌وقت راه ساده‌تری برای فرستادن بغل نداریم."
    },
    {
        year: "۱۴۰۲",
        bg: "#FFE0EA",
        title: "اولین جعبه‌ها",
        body: "اولین بسته تو اتاق خودمون بسته‌بندی شد و با دست نوشته‌ای کوچیک، راهش افتاد سمت گیرنده."
    },
    {
        year: "۱۴۰۳",
        bg: "#FFF3C9",
        title: "اولین بسته‌ی خیریه",
        body: "با پول قلب‌ها و پنجه‌ها اولین بسته‌ی هدیه رفت برای بچه‌های خیریه؛ رسیدش هنوز تو دفتر مهربونی‌ست."
    },
    {
        year: "امروز",
        bg: "#E7E0FA",
        title: "هنوز داریم یاد می‌گیریم",
        body: "هر هدیه‌ای که می‌فرستیم، یه قدم جلوتر از قبله."
    }
];
const ABOUT_STATS = [
    {
        num: "۱٬۲۴۰",
        label: "هدیه‌ی فرستاده‌شده"
    },
    {
        num: "۳٬۵۸۰",
        label: "قلب و پنجه برای خیریه‌ها"
    },
    {
        num: "۷",
        label: "نفر در تیم"
    },
    {
        num: "۹۶۰",
        label: "کارت پستال با پیام"
    }
];
const ABOUT_VALUES = [
    {
        n: "۱",
        bg: "#CDEFFB",
        title: "یه قیمت برای همه",
        body: "همه‌ی جعبه‌ها یه قیمتن. ما نمی‌خوایم هدیه‌ی گران‌تر یعنی دوستی بیشتر."
    },
    {
        n: "۲",
        bg: "#FFE0EA",
        title: "شفافیت کامل",
        body: "هر قلب و پنجه‌ای که فروخته می‌شه، رسیدش رو تو دفتر مهربونی می‌ذاریم."
    },
    {
        n: "۳",
        bg: "#FFF3C9",
        title: "مهربونی اول",
        body: "هر تصمیمی رو با این سؤال می‌گیریم: این کار یکی رو لبخندی‌تر می‌کنه؟"
    }
];
const SHIPPING_SECTIONS = [
    {
        n: "۱",
        bg: "#CDEFFB",
        title: "زمان ارسال",
        body: "سفارش‌ها بعد از پرداخت حدود ۲ روز کاری بسته‌بندی می‌شن. بعدش برای دوستت پست می‌شه و زمان رسیدن بستگی به شهرش داره؛ معمولاً بین ۲ تا ۵ روز کاری."
    },
    {
        n: "۲",
        bg: "#FFE0EA",
        title: "هزینه‌ی ارسال",
        body: "هزینه‌ی ارسال موقع ثبت سفارش و بعد از نوشتن آدرس دوستت حساب و نشون داده می‌شه؛ برای تهران ۴۹ هزار تومان و برای شهرستان‌ها ۶۹ هزار تومان."
    },
    {
        n: "۳",
        bg: "#FFF3C9",
        title: "کجا می‌فرستیم؟",
        body: "فعلاً به همه‌ی شهرهای ایران می‌فرستیم. اگه آدرس دوستت جای دیگه‌ست، از ما بپرس."
    },
    {
        n: "۴",
        bg: "#E7E0FA",
        title: "اگه جعبه نرسید یا آسیب دید",
        body: "اگه جعبه آسیب دیده یا عروسک اشتباهی رسید، فقط کافیه ظرف ۷ روز از تاریخ تحویل با ما تماس بگیری و عکس بفرستی. ما جایگزین می‌فرستیم یا پولت رو برمی‌گردونیم."
    },
    {
        n: "۵",
        bg: "#DDF3EA",
        title: "تغییر آدرس یا لغو سفارش",
        body: "تا قبل از بسته‌بندی، می‌تونی آدرس یا متن کارت رو عوض کنی یا سفارش رو لغو کنی. بعد از اون دیگه امکانش نیست، پس زودتر بهمون خبر بده."
    }
];
const REVIEWS_BARS = [
    {
        stars: "۵",
        pct: 86
    },
    {
        stars: "۴",
        pct: 10
    },
    {
        stars: "۳",
        pct: 3
    },
    {
        stars: "۲",
        pct: 1
    },
    {
        stars: "۱",
        pct: 0
    }
];
const REVIEWS_CARDS = [
    {
        kind: "bear",
        stars: 5,
        who: "نگار، فرستنده",
        text: "دوستتم که کارت رو باز کرد زد زیر گریه؛ بهترین حس دنیاست. جعبه هم خیلی تمیز و قشنگ بسته‌بندی شده بود."
    },
    {
        kind: "bunny",
        stars: 5,
        who: "آرش، گیرنده",
        text: "رمز کارت رو زدم و پیام که اومد، الان دو ساله تو گوشیم مونده. عروسک هم از عکس‌ها نرم‌تره!"
    },
    {
        kind: "cat",
        stars: 5,
        who: "سارا، فرستنده",
        text: "ناشناس فرستادم و کلی ذوق کرد که حدس بزنه کیه 😄 دفتر مهربونی‌شون هم واقعاً رسید داره."
    },
    {
        kind: "panda",
        stars: 5,
        who: "محمد، گیرنده",
        text: "بامبو الان رفیق تختمه. حس خوبی می‌ده که بدونم یه نفر این‌قدر بهم فکر کرده."
    },
    {
        kind: "sheep",
        stars: 5,
        who: "الهام، فرستنده",
        text: "برای مامانم فرستادم که دور از ماست؛ گفت خونه‌شون یه نفر بیشتر شده. ممنون از یک دوست."
    },
    {
        kind: "duck",
        stars: 5,
        who: "کیانا، گیرنده",
        text: "قات‌قات با یه جعبه‌ی آبی رسید و کل خونه خندید. کارت QR هم فوق‌العاده‌ست، حتماً امتحانش کنید."
    }
];
const GIFT_OPEN_DEFAULT_PASSWORD = "بهار";
}),
"[project]/src/lib/pishnam-store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TRACK_STEPS",
    ()=>TRACK_STEPS,
    "statusToStep",
    ()=>statusToStep,
    "useBuilderTotal",
    ()=>useBuilderTotal,
    "useCharityDone",
    ()=>useCharityDone,
    "useCharmsTotal",
    ()=>useCharmsTotal,
    "useIsFavorite",
    ()=>useIsFavorite,
    "usePishnam",
    ()=>usePishnam,
    "useSelectedOrder",
    ()=>useSelectedOrder
]);
// ── Pishnam global store: builder state, orders, auth, charity ──
// Phase B: server-authoritative money. The client NEVER computes a payable
// total — `fetchQuote()` renders the server quote and `submitCheckout()` posts
// with an Idempotency-Key. (guide §4.5–4.7 / §B4)
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pishnam-data.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const TRACK_STEPS = [
    {
        key: "paid",
        label: "پرداخت شد",
        body: "هدیه‌ت ثبت شد و جعبه‌ش رو گرفتیم."
    },
    {
        key: "packing",
        label: "بسته‌بندی",
        body: "کارت پستال، قلب و پنجه‌ها رو جعبه می‌چسبونیم."
    },
    {
        key: "shipped",
        label: "در راه",
        body: "جعبه تحویل پست شد؛ به‌زودی می‌رسه."
    },
    {
        key: "delivered",
        label: "تحویل شد",
        body: "جعبه رسید! حالا نوبت رمز کارته."
    }
];
function statusToStep(s) {
    return s === "paid" ? 0 : s === "packing" ? 1 : s === "shipped" ? 2 : 3;
}
const DEFAULT_RECEIVER = {
    name: "",
    province: "تهران",
    city: "",
    address: "",
    phone: ""
};
function todayFa() {
    try {
        return new Intl.DateTimeFormat("fa-IR", {
            day: "numeric",
            month: "long"
        }).format(new Date());
    } catch  {
        return "امروز";
    }
}
/** Server sync for LEGACY demo rows only — v2 orders live on the server. */ function syncOrderPatch(get, id, body) {
    const o = get().orders.find((x)=>x.id === id);
    if (!o || o.v2) return; // v2 orders are moved by the admin console, not the client
    void fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }).catch(()=>{});
}
const usePishnam = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        kind: "bear",
        occasion: 0,
        message: "",
        cardPassword: "",
        anonymous: false,
        senderName: "",
        hearts: 5,
        paws: 3,
        receiver: DEFAULT_RECEIVER,
        photoAdded: false,
        videoAdded: false,
        user: null,
        selectedId: null,
        favorites: [
            "panda"
        ],
        orders: [],
        nextNo: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FIRST_GIFT_NO"],
        catalog: {},
        catalogLoaded: false,
        quote: null,
        quoteStatus: "idle",
        paymentMethod: "zarinpal",
        setPaymentMethod: (m)=>set({
                paymentMethod: m
            }),
        pendingOrder: null,
        checkoutBusy: false,
        setKind: (k)=>set({
                kind: k
            }),
        setOccasion: (i)=>set({
                occasion: i
            }),
        setMessage: (m)=>set({
                message: m
            }),
        setCardPassword: (p)=>set({
                cardPassword: p
            }),
        setAnonymous: (a)=>set({
                anonymous: a
            }),
        setSenderName: (n)=>set({
                senderName: n
            }),
        setHearts: (n)=>set({
                hearts: Math.max(0, Math.min(99, n))
            }),
        setPaws: (n)=>set({
                paws: Math.max(0, Math.min(99, n))
            }),
        setReceiver: (r)=>set({
                receiver: {
                    ...get().receiver,
                    ...r
                }
            }),
        addPhoto: ()=>set({
                photoAdded: true
            }),
        addVideo: ()=>set({
                videoAdded: true
            }),
        login: (phone, name)=>set({
                user: {
                    phone,
                    name: name || "دوست مهربون"
                }
            }),
        // logout also drops every local order row AND the pending checkout key:
        // gift data belongs to the logged-in account — nothing may stay visible
        // on a shared device once the session is gone (server rows re-arrive on
        // the next bootstrap). A stale key would 422 the next fresh checkout.
        logout: ()=>set({
                user: null,
                orders: [],
                pendingOrder: null
            }),
        // ── catalog (variantIds come from the server; never hardcode) ──
        loadCatalog: async ()=>{
            if (get().catalogLoaded) return;
            try {
                const res = await fetch("/api/catalog", {
                    cache: "no-store"
                });
                if (!res.ok) return;
                const data = await res.json();
                const map = {};
                for (const p of data.products)map[p.slug] = p;
                set({
                    catalog: map,
                    catalogLoaded: true
                });
            } catch  {
            /* offline → retry on next call */ }
        },
        // ── server quote — THE only money source (guide §4.5) ──
        fetchQuote: async ()=>{
            const s = get();
            if (s.quoteStatus === "loading") return;
            set({
                quoteStatus: "loading"
            });
            try {
                const entry = s.catalog[s.kind];
                if (!entry) {
                    await get().loadCatalog();
                    if (!get().catalog[s.kind]) {
                        set({
                            quoteStatus: "error"
                        });
                        return;
                    }
                }
                const e = get().catalog[s.kind];
                const payload = {
                    items: [
                        {
                            variantId: e.variantId,
                            qty: 1
                        }
                    ],
                    addons: {
                        charmHearts: s.hearts,
                        charmPaws: s.paws
                    },
                    sender: {
                        name: s.senderName || s.user?.name || "مهمان",
                        phone: s.user?.phone ?? ""
                    },
                    recipient: {
                        name: s.receiver.name || "دوست گلم",
                        phone: s.receiver.phone || "09120000000",
                        province: s.receiver.province || "تهران",
                        city: s.receiver.city || "تهران",
                        address: s.receiver.address || "تهران، خیابان نمونه",
                        postalCode: ""
                    },
                    gift: {
                        message: s.message || " ",
                        password: s.cardPassword.length >= 4 ? s.cardPassword : "0000",
                        occasion: s.occasion,
                        anonymous: s.anonymous
                    },
                    paymentMethod: s.paymentMethod
                };
                const res = await fetch("/api/checkout/quote", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });
                if (!res.ok) {
                    set({
                        quoteStatus: "error"
                    });
                    return;
                }
                const q = await res.json();
                set({
                    quote: q,
                    quoteStatus: "ready"
                });
            } catch  {
                set({
                    quoteStatus: "error"
                });
            }
        },
        // ── the real checkout (idempotent; guide §4.7) ──
        submitCheckout: async ()=>{
            const s = get();
            if (s.checkoutBusy) return {
                ok: false,
                error: "busy"
            };
            set({
                checkoutBusy: true
            });
            try {
                await get().loadCatalog();
                const e = get().catalog[s.kind];
                if (!e) return {
                    ok: false,
                    error: "catalog_unavailable"
                };
                if (!e.inStock) return {
                    ok: false,
                    error: "sold_out"
                };
                // one idempotency key per checkout attempt (kept for ACK polling).
                // A stale key from an EARLIER order (logout/restore/shared device)
                // would 422 on submit — we self-heal below by rotating exactly once.
                let pending = get().pendingOrder;
                if (!pending?.key || pending.status === "paid") {
                    const key = crypto.randomUUID();
                    pending = {
                        key
                    };
                    set({
                        pendingOrder: pending
                    });
                }
                const payload = {
                    items: [
                        {
                            variantId: e.variantId,
                            qty: 1
                        }
                    ],
                    addons: {
                        charmHearts: s.hearts,
                        charmPaws: s.paws
                    },
                    sender: {
                        name: s.senderName || s.user?.name || "مهمان",
                        phone: s.user?.phone ?? ""
                    },
                    recipient: {
                        name: s.receiver.name,
                        phone: s.receiver.phone,
                        province: s.receiver.province || "تهران",
                        city: s.receiver.city,
                        address: s.receiver.address,
                        postalCode: ""
                    },
                    gift: {
                        message: s.message,
                        password: s.cardPassword,
                        occasion: s.occasion,
                        anonymous: s.anonymous
                    },
                    paymentMethod: s.paymentMethod
                };
                const post = (key)=>fetch("/api/checkout", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Idempotency-Key": key
                        },
                        body: JSON.stringify(payload)
                    });
                let res = await post(pending.key);
                if (res.status === 422) {
                    // server says THIS key already created a different order → the local
                    // key is stale (survived a logout / restore). Rotate once and retry:
                    // a true replay of the same payload would have returned the prior
                    // order instead of this error, so a fresh order is the right move.
                    pending = {
                        key: crypto.randomUUID()
                    };
                    set({
                        pendingOrder: pending
                    });
                    res = await post(pending.key);
                }
                if (!res.ok) {
                    const body = await res.json().catch(()=>({}));
                    return {
                        ok: false,
                        error: body.error ?? `http_${res.status}`,
                        details: body.details
                    };
                }
                const ack = await res.json();
                set({
                    pendingOrder: {
                        key: pending.key,
                        code: ack.code,
                        status: ack.status,
                        total: ack.total,
                        expiresAt: ack.payment?.expiresAt,
                        method: ack.payment?.method
                    }
                });
                // local mirror so «هدیه‌هام»/موفقیت work even before the next bootstrap
                const mirrored = {
                    id: `o-local-${ack.code}`,
                    no: Number(ack.code.slice(-4)) || get().nextNo,
                    kind: s.kind,
                    to: s.receiver.name || "دوست گلم",
                    city: s.receiver.city,
                    address: s.receiver.address,
                    phone: s.receiver.phone,
                    message: s.message,
                    occasion: s.occasion,
                    password: s.cardPassword,
                    anonymous: s.anonymous,
                    senderName: s.anonymous ? "" : s.senderName || (s.user?.name ?? ""),
                    hearts: s.hearts,
                    paws: s.paws,
                    total: ack.total,
                    date: todayFa(),
                    status: "paid",
                    opened: false,
                    dir: "sent",
                    userPhone: s.user?.phone ?? "",
                    code: ack.code,
                    status2: ack.status,
                    v2: true
                };
                const rest = get().orders.filter((o)=>o.id !== mirrored.id);
                set({
                    orders: [
                        mirrored,
                        ...rest
                    ],
                    nextNo: Math.max(get().nextNo, mirrored.no + 1)
                });
                return {
                    ok: true,
                    ack
                };
            } catch  {
                return {
                    ok: false,
                    error: "network"
                };
            } finally{
                set({
                    checkoutBusy: false
                });
            }
        },
        clearPendingOrder: ()=>set({
                pendingOrder: null
            }),
        setPendingStatus: (status)=>{
            const p = get().pendingOrder;
            if (!p) return;
            set({
                pendingOrder: {
                    ...p,
                    status
                },
                orders: get().orders.map((o)=>o.code === p.code ? {
                        ...o,
                        status2: status
                    } : o)
            });
        },
        setOrderStatusByCode: (code, status)=>{
            const p = get().pendingOrder;
            set({
                orders: get().orders.map((o)=>o.code === code ? {
                        ...o,
                        status2: status
                    } : o),
                // keep the pending ack consistent ONLY when it points at this order
                pendingOrder: p?.code === code ? {
                    ...p,
                    status
                } : p
            });
        },
        advanceStatus: (id)=>{
            const cur = get().orders.find((o)=>o.id === id);
            const next = !cur ? null : cur.status === "paid" ? "packing" : cur.status === "packing" ? "shipped" : "delivered";
            set({
                orders: get().orders.map((o)=>o.id === id && next ? {
                        ...o,
                        status: next
                    } : o)
            });
            if (next) syncOrderPatch(get, id, {
                status: next
            });
        },
        markOpened: (id)=>{
            set({
                orders: get().orders.map((o)=>o.id === id ? {
                        ...o,
                        opened: true
                    } : o)
            });
            syncOrderPatch(get, id, {
                opened: true
            });
        },
        resetBuilder: ()=>set({
                kind: "bear",
                occasion: 0,
                message: "",
                cardPassword: "",
                anonymous: false,
                senderName: "",
                hearts: 5,
                paws: 3,
                receiver: DEFAULT_RECEIVER,
                photoAdded: false,
                videoAdded: false,
                quote: null,
                quoteStatus: "idle"
            }),
        selectOrder: (id)=>set({
                selectedId: id
            }),
        toggleFavorite: (k)=>{
            const favorites = get().favorites.includes(k) ? get().favorites.filter((f)=>f !== k) : [
                ...get().favorites,
                k
            ];
            set({
                favorites
            });
            // account-bound favorites follow the user across devices (offline-safe:
            // the local toggle always lands first, the PUT is fire-and-forget).
            // Identity = HttpOnly session cookie; no phone in the body (Phase A).
            if (get().user?.phone) {
                void fetch("/api/favorites", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        kinds: favorites
                    })
                }).catch(()=>{});
            }
        }
    }), {
    name: "pishnam-app",
    storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createJSONStorage"])(()=>localStorage),
    version: 2,
    // v1→v2: receiver gained `province`; transient commerce fields stay out of storage
    migrate: (state)=>{
        const s = state;
        return {
            ...s,
            receiver: {
                ...DEFAULT_RECEIVER,
                ...s.receiver ?? {}
            },
            catalog: s.catalog ?? {},
            catalogLoaded: false,
            quote: null,
            quoteStatus: "idle",
            paymentMethod: s.paymentMethod ?? "zarinpal",
            pendingOrder: null,
            checkoutBusy: false
        };
    },
    partialize: (state)=>{
        // pendingOrder IS persisted (guide §4.7: the key lives in localStorage so
        // the success page can ACK-poll after the PSP redirect reload).
        const { quote: _q, quoteStatus: _qs, checkoutBusy: _b, catalog: _c, catalogLoaded: _cl, ...rest } = state;
        return rest;
    }
}));
function useCharityDone() {
    return usePishnam((s)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CHARITY_BASE"] + s.orders.reduce((acc, o)=>acc + o.hearts + o.paws, 0));
}
function useCharmsTotal() {
    return usePishnam((s)=>s.hearts + s.paws);
}
function useSelectedOrder() {
    return usePishnam((s)=>s.orders.find((o)=>o.id === s.selectedId) ?? s.orders.find((o)=>o.dir === "sent") ?? null);
}
function useIsFavorite(kind) {
    return usePishnam((s)=>s.favorites.includes(kind));
}
function useBuilderTotal() {
    const quote = usePishnam((s)=>s.quote);
    const hearts = usePishnam((s)=>s.hearts);
    const paws = usePishnam((s)=>s.paws);
    return quote ? quote.total : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BOX_PRICE"] + (hearts + paws) * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CHARM_PRICE"];
}
}),
"[project]/src/lib/pishnam-sync.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bootSync",
    ()=>bootSync,
    "pullFavorites",
    ()=>pullFavorites,
    "pullOrders",
    ()=>pullOrders,
    "pullOrdersForPhone",
    ()=>pullOrdersForPhone,
    "syncStatus",
    ()=>syncStatus
]);
// ── Server sync — session-scoped bootstrap (Phase A of the launch guide) ──
// The old global pull (GET /api/orders without a session) is gone. Everything
// now flows through ONE endpoint: GET /api/me/bootstrap → { user, admin,
// orders(≤50), favorites }. Guests get empty payloads; the UI keeps working
// local-first either way.
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pishnam-store.ts [app-ssr] (ecmascript)");
;
const STATUS_RANK = {
    paid: 0,
    packing: 1,
    shipped: 2,
    delivered: 3
};
/**
 * Merges remote orders into the persisted store. Returns how many local
 * rows were added/updated (0 = nothing new).
 * Merge policy (last-writer-wins by progress):
 *  - ids only on server → added
 *  - ids on both → take the more-advanced status, opened = local || server
 *  - local-only ids stay untouched (offline-made orders keep theirs until pushed)
 * Also keeps nextNo ahead of the highest seen gift number.
 */ function mergeRemote(remote, adoptPhone) {
    const st = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"].getState();
    const byId = new Map(st.orders.map((o)=>[
            o.id,
            o
        ]));
    let changed = 0;
    let maxNo = st.nextNo - 1;
    for (const r of remote){
        if (!r || typeof r.id !== "string" || typeof r.no !== "number") continue;
        maxNo = Math.max(maxNo, r.no);
        // the optimistic local mirror (o-local-<code>) is superseded by its server
        // row — otherwise the board shows the same gift twice forever
        const mirrorId = r.code ? `o-local-${r.code}` : "";
        if (mirrorId && mirrorId !== r.id) byId.delete(mirrorId);
        const local = byId.get(r.id);
        if (!local) {
            byId.set(r.id, {
                ...r,
                userPhone: r.userPhone ?? adoptPhone ?? "",
                dir: r.dir === "recv" ? "recv" : "sent",
                status: STATUS_RANK[r.status] !== undefined ? r.status : "paid"
            });
            changed++;
        } else {
            const lr = STATUS_RANK[local.status] ?? 0;
            const rr = STATUS_RANK[r.status] ?? 0;
            const status = rr > lr ? r.status : local.status;
            const opened = local.opened || r.opened;
            const adopted = r.userPhone || (adoptPhone ?? "");
            const userPhone = !local.userPhone && adopted ? adopted : local.userPhone;
            // raw 11-state: the server always wins (refund states have no legacy rank)
            const status2 = r.status2 ?? local.status2;
            // payment reservation fields follow the server (admin can reopen a window)
            const paymentHoldUntil = r.paymentHoldUntil ?? local.paymentHoldUntil ?? null;
            const paymentKey = r.paymentKey || local.paymentKey;
            const paymentMethod = r.paymentMethod || local.paymentMethod;
            if (status !== local.status || opened !== local.opened || userPhone !== local.userPhone || status2 !== local.status2 || paymentHoldUntil !== local.paymentHoldUntil || paymentKey !== local.paymentKey || paymentMethod !== local.paymentMethod) {
                byId.set(r.id, {
                    ...local,
                    status,
                    opened,
                    userPhone,
                    status2,
                    paymentHoldUntil,
                    paymentKey,
                    paymentMethod
                });
                changed++;
            }
        }
    }
    if (changed > 0) {
        const orders = [
            ...byId.values()
        ].sort((a, b)=>b.no - a.no);
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"].setState({
            orders,
            nextNo: Math.max(st.nextNo, maxNo + 1)
        });
    }
    return changed;
}
/** One session-scoped fetch: user + orders + favorites (cookie carries identity). */ async function fetchBootstrap() {
    try {
        const res = await fetch("/api/me/bootstrap", {
            cache: "no-store"
        });
        if (!res.ok) return null; // 401 / offline → local-only mode, UI keeps working
        return await res.json();
    } catch  {
        return null;
    }
}
/**
 * Applies one bootstrap payload to the local board:
 *  1. account-switch hygiene — server-made (v2) rows that belong to ANOTHER
 *     phone and are NOT part of this session's payload are dropped, so logging
 *     into a different account never shows the previous account's orders;
 *  2. mirror dedupe + merge (server rows supersede the optimistic o-local-*).
 * Local-only legacy demo orders and guest-made v2 rows (userPhone="") stay.
 */ function applyBootstrap(data) {
    const sessionPhone = data.user?.phone ?? null;
    const incoming = Array.isArray(data.orders) ? data.orders : [];
    // server says GUEST: a stale localStorage user (dead cookie, shared device)
    // must not keep the account UI alive — clear it and drop account-bound rows.
    // Guest mirror rows (userPhone="") stay — the checkout flow still needs them.
    if (!sessionPhone) {
        const st = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"].getState();
        const accountRows = st.orders.filter((o)=>o.v2 && o.userPhone);
        if (st.user || accountRows.length > 0) {
            const dropIds = new Set(accountRows.map((o)=>o.id));
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"].setState({
                user: null,
                orders: st.orders.filter((o)=>!dropIds.has(o.id))
            });
        }
    }
    // hydrate the account from the session — a live cookie must mean a live
    // «حساب من» (favorites sync + LoggedInBlock) even after a cold reload
    if (data.user) {
        const cur = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"].getState().user;
        if (!cur || cur.phone !== data.user.phone) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"].setState({
                user: {
                    phone: data.user.phone,
                    name: data.user.name || cur?.name || ""
                }
            });
        }
    }
    if (sessionPhone && incoming.length >= 0) {
        const ids = new Set(incoming.map((o)=>o.id));
        const st = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"].getState();
        const stale = st.orders.filter((o)=>o.v2 && o.userPhone && o.userPhone !== sessionPhone && !ids.has(o.id));
        if (stale.length > 0) {
            const staleIds = new Set(stale.map((o)=>o.id));
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"].setState({
                orders: st.orders.filter((o)=>!staleIds.has(o.id))
            });
        }
    }
    return mergeRemote(incoming, sessionPhone ?? undefined);
}
async function pullOrders(_phone) {
    const data = await fetchBootstrap();
    if (!data || !Array.isArray(data.orders)) return 0;
    return applyBootstrap(data);
}
async function pullOrdersForPhone(_phone) {
    return pullOrders();
}
/**
 * Pulls the account's server-side favorites and merges them (union) into the
 * local list. Returns how many NEW kinds landed (0 = nothing new / offline).
 */ const KNOWN_KINDS = new Set([
    "bear",
    "bunny",
    "cat",
    "duck",
    "panda",
    "sheep"
]);
async function pullFavorites(_phone) {
    const data = await fetchBootstrap();
    if (!data || !Array.isArray(data.favorites)) return 0;
    const remote = data.favorites.filter((k)=>typeof k === "string" && KNOWN_KINDS.has(k));
    const st = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"].getState();
    const fresh = remote.filter((k)=>!st.favorites.includes(k));
    if (fresh.length > 0) {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePishnam"].setState({
            favorites: [
                ...st.favorites,
                ...fresh
            ]
        });
    }
    return fresh.length;
}
async function bootSync() {
    await pullOrders();
}
async function syncStatus(userPhone) {
    const data = await fetchBootstrap();
    if (!data) return {
        ok: false,
        changed: 0
    };
    const changed = Array.isArray(data.orders) ? applyBootstrap(data) : 0;
    return {
        ok: true,
        changed
    };
}
}),
"[project]/src/lib/fa.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fa",
    ()=>fa,
    "faPrice",
    ()=>faPrice,
    "giftNo",
    ()=>giftNo,
    "money",
    ()=>money,
    "orderNo",
    ()=>orderNo
]);
// Persian helpers — digits & money (matches the design system)
const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
function fa(n) {
    return String(n).replace(/\d/g, (d)=>FA_DIGITS[Number(d)]);
}
function money(n) {
    return fa(n.toLocaleString("en-US")).replace(/,/g, "٬");
}
function faPrice(n) {
    return `${money(n)} تومان`;
}
function giftNo(no) {
    return fa(no);
}
function orderNo(no) {
    return fa(1000 + no);
}
}),
"[project]/src/lib/seo/site.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ── Pishnam SEO site constants — single source for metadata, OG and JSON-LD ──
// Wave-0 (route-ready modules): consumed by layout metadata, useDocumentMeta
// and the JSON-LD builders. At deploy the url constant flips to the real domain.
__turbopack_context__.s([
    "SITE",
    ()=>SITE
]);
const SITE = {
    /** Consumer brand — «یک دوست» everywhere (brand sweep completed ۲۲ مهر ۱۴۰۵). */ nameFa: "یک دوست",
    tagline: "یه بغل، تو یه جعبه",
    /** Placeholder constant until the domain is registered — never hardcode it elsewhere. */ url: "https://yekdoost.ir",
    locale: "fa_IR",
    titleTemplate: "%s | یک دوست — جعبه هدیه عروسک پولیشی",
    description: "خرید عروسک پولیشی با پیام صوتی و کارت پستال QR رمزدار؛ جعبه هدیه عروسک پولیشی یک دوست مستقیم به در خانه‌ی دوستت ارسال می‌شه. یه بغل، تو یه جعبه!"
};
}),
"[project]/src/lib/seo/metadata.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildTitle",
    ()=>buildTitle,
    "useDocumentMeta",
    ()=>useDocumentMeta
]);
// ── Wave-0 client-side document metadata for the hash-router SPA ──
// The sandbox renders everything under "/", so per-screen titles/descriptions
// are set on document directly. This hook is DELETED at the deploy wave when
// real App Router routes + generateMetadata take over (see docs/13-f).
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/seo/site.ts [app-ssr] (ecmascript)");
"use client";
;
;
function buildTitle(title) {
    if (!title) return `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SITE"].nameFa} — ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SITE"].tagline}`;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SITE"].titleTemplate.replace("%s", title);
}
function useDocumentMeta({ title, description }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        document.title = buildTitle(title);
        let meta = document.head.querySelector('meta[name="description"]');
        if (!meta) {
            meta = document.createElement("meta");
            meta.setAttribute("name", "description");
            document.head.appendChild(meta);
        }
        if (description) meta.setAttribute("content", description);
    }, [
        title,
        description
    ]);
}
}),
"[project]/src/lib/seo/product-catalog.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ── Pishnam product SEO catalog — one entry per plush friend (wave-0) ──
// All copy is original Persian in the warm یک دوست tone (see DESKTOP_FAQ in
// pishnam-data.ts). Slugs are the PlushKind keys; names match the seeded catalog.
// Price/availability are NOT duplicated here — productJsonLd() derives them.
__turbopack_context__.s([
    "PRODUCT_SEO",
    ()=>PRODUCT_SEO,
    "PRODUCT_SEO_MAP",
    ()=>PRODUCT_SEO_MAP,
    "getProductSeo",
    ()=>getProductSeo,
    "isPlushKind",
    ()=>isPlushKind
]);
/** Feature bullets shared by every جعبه‌ی هدیه‌ی یک دوست (core promise). */ const CORE_FEATURES = [
    "جعبه‌ی کادویی آماده با تگ شماره‌ی هدیه",
    "کارت پستال چاپی با QR رمزدار و پیام خودت",
    "پیام صوتی تا ۹۰ ثانیه که موقع باز کردن جعبه می‌شنوه",
    "ارسال مستقیم به در خانه‌ی گیرنده، حتی بدون اسم تو",
    "بسته‌بندی ضدضربه و مقاوم در مسیر پست"
];
const PRODUCT_SEO = [
    {
        slug: "bear",
        nameFa: "کِرِمی، خرس پشمالو",
        shortTagline: "یه بغل گرم که هیچ‌وقت خسته نمی‌شه",
        description: "کِرِمی خرس پولیشی قهوه‌ای یک دوست است؛ همون دوست پشمالوی نرمی که برای روزای دلتنگی ساخته شده. با این جعبه هدیه عروسک خرس با پیام صوتی و کارت پستال QR رمزدار، بغلت رو با صدای خودت می‌فرستی تا وقتی جعبه رو باز می‌کنه، حس کنه همین‌جایی.",
        features: [
            ...CORE_FEATURES,
            "پشم پولیشی قهوه‌ای نرم و ضدحساسیت؛ درست به نرمی یه بغل واقعی"
        ],
        faq: [
            {
                q: "کِرِمی رو می‌شه شست؟",
                a: "بله؛ با دست و آب سرد بشور یا داخل کیسه‌ی جوراب‌شویی تو ماشین بذار. فقط از اتو و خشک‌کن داغ دور نگهش دار تا پشمش همیشه پف‌کنه بمونه."
            },
            {
                q: "سایز کِرِمی چقدره؟",
                a: "همه‌ی دوست‌های پشمالوی یک دوست یه سایز دارن؛ همون یه سایزی که برای بغل کردن و پرت کردن رو تخت دقیقاً کافیه. مهربونی که وزن و سایز نداره!"
            },
            {
                q: "چقدر طول می‌کشه به دست دوستم برسه؟",
                a: "بعد از پرداخت حدود ۲ روز کاری با دست بسته‌بندی می‌شه و بعدش بسته به شهرش، معمولاً ۲ تا ۵ روز کاری دیگه دم در خونه‌ست."
            },
            {
                q: "کِرِمی برای چه بهانه‌ای مناسبه؟",
                a: "برای روزای دلتنگی، بهبودی، تولد یا همون «هیچ بهانه‌ای جز دوست داشتن». هر جا یه بغل لازم باشه، کِرِمی جای تو اون‌جاست."
            }
        ],
        keywords: [
            "خرید عروسک خرس با پیام صوتی",
            "جعبه هدیه عروسک خرس پولیشی",
            "عروسک خرس هدیه تولد با کارت پستال",
            "ارسال عروسک خرس به در خانه"
        ],
        occasionTags: [
            "دلم تنگ شده",
            "تولدت مبارک",
            "زودتر خوب شی",
            "همین‌طوری"
        ]
    },
    {
        slug: "bunny",
        nameFa: "لپ‌قندی، خرگوش پشمالو",
        shortTagline: "همیشه یه خبر خوب تو گوشش داره",
        description: "لپ‌قندی خرگوش پولیشی صورتی یک دوست است؛ شیطون، بازیگوش و پر از انرژی. این جعبه هدیه عروسک خرگوش با پیام صوتی و کارت پستال QR رمزدار می‌رسه دم در خونه‌ش تا هر وقت لپ‌قندی رو بغل کرد، صدای تو رو هم تو گوشش بشنوه.",
        features: [
            ...CORE_FEATURES,
            "گوش‌های بلند و نرم صورتی؛ محبوب‌ترین رفیق اتاق بچه‌ها"
        ],
        faq: [
            {
                q: "لپ‌قندی رو می‌شه شست؟",
                a: "بله؛ با دست و آب سرد یا داخل کیسه‌ی جوراب‌شویی بشورش. رنگ صورتی‌ش ثابته و با شستشوی ملایم آب نمی‌ره."
            },
            {
                q: "سایز لپ‌قندی چقدره؟",
                a: "مثل بقیه‌ی دوست‌های یک دوست یه سایز داره؛ اندازه‌ای که توی بغل جا بشه و روی تخت هم یه رفیق واقعی باشه."
            },
            {
                q: "چقدر طول می‌کشه به دستش برسه؟",
                a: "حدود ۲ روز کاری بسته‌بندی می‌شه و بعدش معمولاً ۲ تا ۵ روز کاری در مسیر پسته؛ زمان دقیق موقع ثبت آدرس گیرنده نشون داده می‌شه."
            },
            {
                q: "لپ‌قندی برای چه بهانه‌ای مناسبه؟",
                a: "برای تولد، خبرهای خوب، تشویق بعد یه روز سخت یا هر وقت که می‌خوای بگی «بهت افتخار می‌کنم»."
            }
        ],
        keywords: [
            "خرید عروسک خرگوش با پیام صوتی",
            "جعبه هدیه عروسک خرگوش پولیشی",
            "عروسک خرگوش صورتی هدیه دخترانه",
            "هدیه تولد عروسک با پیام صوتی"
        ],
        occasionTags: [
            "تولدت مبارک",
            "همین‌طوری",
            "دلم تنگ شده",
            "زودتر خوب شی"
        ]
    },
    {
        slug: "cat",
        nameFa: "میشی، گربه پشمالو",
        shortTagline: "با یه نگاه حالت رو می‌فهمه",
        description: "میشی گربه پولیشی بنفش یک دوست است؛ ناز، کم‌حرف و استاد آرام کردن آدم بی‌سروصدا. این جعبه هدیه عروسک گربه با پیام صوتی و کارت پستال QR رمزدار، حرف‌هایی رو که تو دلت داری بی‌صدا و قشنگ می‌رسونه.",
        features: [
            ...CORE_FEATURES,
            "پشم بنفش لطیف با سبیل‌های بامزه؛ هیچ‌کس نمی‌تونه عکس‌اش رو بدون خنده نگاه کنه"
        ],
        faq: [
            {
                q: "میشی رو می‌شه شست؟",
                a: "بله؛ شستشوی دستی با آب سرد و شوینده‌ی ملایم بهترین رسمه. داخل کیسه‌ی جوراب‌شویی هم می‌تونی بهش اعتماد کنی."
            },
            {
                q: "سایز میشی چقدره؟",
                a: "یه سایز برای همه؛ همون اندازه‌ای که بشه وسط بغل گذاشتش و کنار بالش هم جا بشه."
            },
            {
                q: "چقدر طول می‌کشه به دست دوستم برسه؟",
                a: "بعد از پرداخت حدود ۲ روز کاری بسته‌بندی می‌شه؛ تحویل معمولاً ۲ تا ۵ روز کاری دیگه انجام می‌شه."
            },
            {
                q: "میشی برای چه بهانه‌ای مناسبه؟",
                a: "برای اون دوست آرومی که حرف نمی‌زنه ولی همه‌چیز رو می‌فهمه؛ برای دلداری، همدردی یا یه «فکرت هستم» بی‌حرف."
            }
        ],
        keywords: [
            "خرید عروسک گربه با پیام صوتی",
            "جعبه هدیه عروسک گربه پولیشی",
            "عروسک پولیشی گربه هدیه با کارت پستال",
            "ارسال عروسک گربه برای دوست"
        ],
        occasionTags: [
            "دلم تنگ شده",
            "زودتر خوب شی",
            "همین‌طوری",
            "تولدت مبارک"
        ]
    },
    {
        slug: "panda",
        nameFa: "بامبو، پاندا پشمالو",
        shortTagline: "استاد چرت‌های وسط روز",
        description: "بامبو پاندا پشمالوی یک دوست است؛ خواب‌آلو، مهربون و همیشه آماده‌ی یه چرت دوستانه. این جعبه هدیه عروسک پاندا با پیام صوتی و کارت پستال QR رمزدار برای کسیه که این روزا خسته‌ست و باید بدونه یه نفر به فکرشه.",
        features: [
            ...CORE_FEATURES,
            "سفید و مشکی نرم مثل بالش؛ بهترین هم‌چرتی برای شب‌های سخت"
        ],
        faq: [
            {
                q: "بامبو رو می‌شه شست؟",
                a: "بله؛ با دست و آب سرد بشور یا داخل کیسه‌ی جوراب‌شویی بذارش. بعدش تو سایه پهنش کن تا سفیدیش سفید بمونه."
            },
            {
                q: "سایز بامبو چقدره؟",
                a: "همون یه سایز یک دوست؛ بزرگ که روی تخت رفیق بشه، کوچیک که همیشه بغلش کنی."
            },
            {
                q: "چقدر طول می‌کشه به دستش برسه؟",
                a: "حدود ۲ روز کاری بسته‌بندی و بعد ۲ تا ۵ روز کاری مسیر پست؛ کل مسیر رو با شماره‌ی سفارش می‌تونی دنبال کنی."
            },
            {
                q: "بامبو برای چه بهانه‌ای مناسبه؟",
                a: "برای کسی که خیلی کار می‌کنه، امتحان داره یا تازه یه روز سخت رو رد کرده. یه جور «برو خواب، من هستم»."
            }
        ],
        keywords: [
            "خرید عروسک پاندا با پیام صوتی",
            "جعبه هدیه عروسک پاندا پولیشی",
            "عروسک پاندا هدیه برای دوست",
            "ارسال عروسک پاندا به در خانه"
        ],
        occasionTags: [
            "زودتر خوب شی",
            "همین‌طوری",
            "دلم تنگ شده",
            "تولدت مبارک"
        ]
    },
    {
        slug: "sheep",
        nameFa: "ابری، گوسفند پشمالو",
        shortTagline: "مثل یه تیکه ابر؛ فقط محکم بغلش کن",
        description: "ابری گوسفند پشمالوی یک دوست است؛ نرم، پفی و خندون، انگار یه تیکه ابر رسیدن دستت. این جعبه هدیه عروسک گوسفند با پیام صوتی و کارت پستال QR رمزدار، نرمی و مهربونی رو با هم به در خانه‌ی دوستت می‌رسونه.",
        features: [
            ...CORE_FEATURES,
            "پفی‌ترین عضو گروه؛ برای بغل‌های طولانی و آروم ساخته شده"
        ],
        faq: [
            {
                q: "ابری رو می‌شه شست؟",
                a: "بله؛ شستشوی دستی با آب سرد پفی‌ش رو حفظ می‌کنه. اگه تو ماشین شستی، بعدش با دست کمی پشمش رو پف بده."
            },
            {
                q: "سایز ابری چقدره؟",
                a: "یه سایز برای همه‌ی بغل‌ها؛ همون اندازه‌ای که بشه بغلش کرد، رو کاناپه گذاشتش یا کنار لپت خوابوندش."
            },
            {
                q: "چقدر طول می‌کشه به دستش برسه؟",
                a: "حدود ۲ روز کاری بسته‌بندی می‌شه و معمولاً ۲ تا ۵ روز کاری بعدش به دست گیرنده می‌رسه."
            },
            {
                q: "ابری برای چه بهانه‌ای مناسبه؟",
                a: "برای بچه‌ها، برای مادربزرگ‌ها و برای هر کسی که یه هدیه‌ی نرم و بی‌آزار می‌ارزه؛ از تبریک تا دلداری."
            }
        ],
        keywords: [
            "خرید عروسک گوسفند با پیام صوتی",
            "جعبه هدیه عروسک گوسفند پولیشی",
            "عروسک پولیشی نرم هدیه تولد",
            "ارسال عروسک گوسفند پشمالو"
        ],
        occasionTags: [
            "همین‌طوری",
            "تولدت مبارک",
            "دلم تنگ شده",
            "زودتر خوب شی"
        ]
    },
    {
        slug: "duck",
        nameFa: "قات‌قات، اردک پشمالو",
        shortTagline: "حال هر جمعی رو خوب می‌کنه",
        description: "قات‌قات اردک زرد پشمالوی یک دوست است؛ شاد، پرسر و صدا و همیشه سرحال. این جعبه هدیه عروسک اردک با پیام صوتی و کارت پستال QR رمزدار، حتی تو روزای بارونی هم خنده رو به خونه‌ی دوستت میاره.",
        features: [
            ...CORE_FEATURES,
            "زرد و پفی با نوک نارنجی بامزه؛ شادی‌بخش رسمی گروه ما"
        ],
        faq: [
            {
                q: "قات‌قات رو می‌شه شست؟",
                a: "بله؛ با دست و آب سرد بشورش. رنگ زردش ثابته و بعد از خشک شدن کامل، دوباره پف می‌کنه."
            },
            {
                q: "سایز قات‌قات چقدره؟",
                a: "مثل بقیه‌ی دوست‌ها یه سایز داره؛ همون یه سایزی که برای بغل کردن و گذاشتن رو میز کار هم عالیه."
            },
            {
                q: "چقدر طول می‌کشه به دستش برسه؟",
                a: "بعد از پرداخت حدود ۲ روز کاری بسته‌بندی می‌شه؛ تحویل معمولاً ۲ تا ۵ روز کاری دیگه انجام می‌شه."
            },
            {
                q: "قات‌قات برای چه بهانه‌ای مناسبه؟",
                a: "برای تبریک، خبرهای خوب، مهمونی‌ها یا هر وقت که می‌خوای یه نفر رو بخندونی. قات‌قات واسه خندوندن به دنیا اومده."
            }
        ],
        keywords: [
            "خرید عروسک اردک با پیام صوتی",
            "جعبه هدیه عروسک اردک زرد",
            "عروسک اردک پولیشی هدیه شاد",
            "ارسال عروسک اردک به در خانه"
        ],
        occasionTags: [
            "تولدت مبارک",
            "همین‌طوری",
            "زودتر خوب شی",
            "دلم تنگ شده"
        ]
    }
];
const PRODUCT_SEO_MAP = Object.fromEntries(PRODUCT_SEO.map((p)=>[
        p.slug,
        p
    ]));
function isPlushKind(slug) {
    return slug in PRODUCT_SEO_MAP;
}
function getProductSeo(slug) {
    if (!slug) return null;
    return isPlushKind(slug) ? PRODUCT_SEO_MAP[slug] : null;
}
}),
"[project]/src/lib/seo/jsonld.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "breadcrumbJsonLd",
    ()=>breadcrumbJsonLd,
    "faqJsonLd",
    ()=>faqJsonLd,
    "orgJsonLd",
    ()=>orgJsonLd,
    "productJsonLd",
    ()=>productJsonLd,
    "toJsonLdScript",
    ()=>toJsonLdScript,
    "webSiteJsonLd",
    ()=>webSiteJsonLd
]);
// ── Pishnam JSON-LD builders — PURE functions, no DOM access ──
// Route-ready (wave-0): today they feed <JsonLd/> inside the hash-router SPA;
// at deploy the exact same builders are injected by server components.
// NOTE the IRR ×10 trap: schema.org Offer.price must be in Rial while the
// whole UI talks Toman — the ×10 conversion lives HERE, inside the builder,
// so it can never be hand-faked or forgotten per page.
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/seo/site.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$product$2d$catalog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/seo/product-catalog.ts [app-ssr] (ecmascript)");
;
;
/** Toman → Rial (Iranian Rial = 10 Toman). Single source of the conversion. */ const TOMAN_TO_IRR = 10;
/** All boxes share one price (see BOX_PRICE in pishnam-data.ts) — 890,000 Toman. */ const BOX_PRICE_TOMAN = 890_000;
function orgJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SITE"].nameFa,
        url: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SITE"].url,
        logo: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SITE"].url}/logo.svg`,
        slogan: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SITE"].tagline,
        description: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SITE"].description
    };
}
function webSiteJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SITE"].nameFa,
        url: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SITE"].url,
        inLanguage: "fa-IR",
        description: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SITE"].description
    };
}
function productJsonLd(slug) {
    const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$product$2d$catalog$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProductSeo"])(slug);
    if (!p) return null;
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        name: p.nameFa,
        description: p.description,
        brand: {
            "@type": "Brand",
            name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SITE"].nameFa
        },
        category: "عروسک پولیشی",
        offers: {
            "@type": "Offer",
            // 890,000 Toman → "8900000" IRR (×10 happens here, on purpose).
            priceCurrency: "IRR",
            price: String(BOX_PRICE_TOMAN * TOMAN_TO_IRR),
            availability: "https://schema.org/InStock",
            url: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seo$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SITE"].url}/product/${p.slug}`
        }
    };
}
function faqJsonLd(faq) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((f)=>({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: f.a
                }
            }))
    };
}
function breadcrumbJsonLd(items) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i)=>({
                "@type": "ListItem",
                position: i + 1,
                name: it.name,
                ...it.url ? {
                    item: it.url
                } : {}
            }))
    };
}
function toJsonLdScript(obj) {
    return JSON.stringify(obj).replace(/</g, "\\u003c");
}
}),
"[project]/src/lib/orders/provinces.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ── orders/provinces.ts — the 31 provinces (client-safe, no server imports) ──
__turbopack_context__.s([
    "PROVINCES",
    ()=>PROVINCES
]);
const PROVINCES = [
    "آذربایجان شرقی",
    "آذربایجان غربی",
    "اردبیل",
    "اصفهان",
    "البرز",
    "ایلام",
    "بوشهر",
    "تهران",
    "چهارمحال و بختیاری",
    "خراسان جنوبی",
    "خراسان رضوی",
    "خراسان شمالی",
    "خوزستان",
    "زنجان",
    "سمنان",
    "سیستان و بلوچستان",
    "فارس",
    "قزوین",
    "قم",
    "کردستان",
    "کرمان",
    "کرمانشاه",
    "کهگیلویه و بویراحمد",
    "گلستان",
    "گیلان",
    "لرستان",
    "مازندران",
    "مرکزی",
    "هرمزگان",
    "همدان",
    "یزد"
];
}),
"[project]/src/lib/gift-card.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "downloadGiftCard",
    ()=>downloadGiftCard
]);
// ── Gift-card PNG generator ──
// Draws a shareable 1080×1350 gift card for an order on a canvas and downloads it.
// Pure browser API (no React), RTL-aware via ctx.direction + Vazirmatn webfont.
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/fa.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pishnam-data.ts [app-ssr] (ecmascript)");
;
;
const W = 1080;
const H = 1350;
function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}
function circle(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.closePath();
}
/** Word-wrap for Persian text (RTL) using measureText. */ function wrapRtl(ctx, text, maxW, maxLines) {
    const words = text.split(/\s+/).filter(Boolean);
    const lines = [];
    let cur = "";
    for (const w of words){
        const next = cur ? `${cur} ${w}` : w;
        if (ctx.measureText(next).width <= maxW || !cur) cur = next;
        else {
            lines.push(cur);
            cur = w;
            if (lines.length === maxLines) break;
        }
    }
    if (lines.length < maxLines && cur) lines.push(cur);
    if (lines.length === maxLines) {
        const consumed = lines.join(" ").split(/\s+/).length;
        if (consumed < words.length) {
            let last = lines[maxLines - 1];
            while(ctx.measureText(`${last}…`).width > maxW && last.includes(" ")){
                last = last.replace(/\s+\S+$/, "");
            }
            lines[maxLines - 1] = `${last}…`;
        }
    }
    return lines;
}
/** Draws a pill chip, returns its width. */ function chip(ctx, xRight, y, text, bg, fg, font = "800 26px Vazirmatn, sans-serif", padX = 22, h = 48) {
    ctx.font = font;
    const w = ctx.measureText(text).width + padX * 2;
    roundRect(ctx, xRight - w, y, w, h, h / 2);
    ctx.fillStyle = bg;
    ctx.fill();
    ctx.fillStyle = fg;
    ctx.textBaseline = "middle";
    ctx.fillText(text, xRight - padX, y + h / 2 + 1);
    ctx.textBaseline = "top";
    return w;
}
async function downloadGiftCard(o, plushSvg) {
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return false;
    // make sure the self-hosted Vazirmatn face is ready before measuring
    try {
        await Promise.all([
            document.fonts.load("900 56px Vazirmatn"),
            document.fonts.load("800 28px Vazirmatn"),
            document.fonts.load("500 30px Vazirmatn"),
            document.fonts.ready
        ]);
    } catch  {
    /* fall back to system sans */ }
    /* ── page background: cyan gradient + soft bubbles ── */ const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#CDEFFB");
    g.addColorStop(1, "#E9F8FE");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#FFFFFF";
    ctx.globalAlpha = 0.55;
    circle(ctx, 130, 190, 92);
    ctx.fill();
    circle(ctx, W - 110, 230, 58);
    ctx.fill();
    circle(ctx, 110, H - 170, 66);
    ctx.fill();
    circle(ctx, W - 140, H - 150, 104);
    ctx.fill();
    ctx.globalAlpha = 1;
    /* ── white card + dashed inner frame ── */ roundRect(ctx, 60, 90, W - 120, H - 180, 48);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.save();
    ctx.setLineDash([
        12,
        10
    ]);
    ctx.strokeStyle = "#BFE4F2";
    ctx.lineWidth = 3;
    roundRect(ctx, 84, 114, W - 168, H - 228, 34);
    ctx.stroke();
    ctx.restore();
    const right = W - 132; // RTL text right edge
    ctx.direction = "rtl";
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    /* ── brand row ── */ ctx.fillStyle = "#04202E";
    ctx.font = "900 54px Vazirmatn, sans-serif";
    ctx.fillText("یک دوست ♥", right, 176);
    // gift-number chip on the opposite corner
    chip(ctx, 132, 186, `هدیه‌ی شماره‌ی ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(o.no)}`, "#04202E", "#FFFFFF");
    ctx.fillStyle = "#4A6572";
    ctx.font = "500 26px Vazirmatn, sans-serif";
    ctx.fillText("یه بغل، تو یه جعبه", right, 244);
    /* ── plush medallion ── */ const cx = W / 2;
    const cy = 470;
    ctx.fillStyle = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLUSH_MAP"][o.kind].bg;
    circle(ctx, cx, cy, 158);
    ctx.fill();
    ctx.save();
    ctx.setLineDash([
        10,
        9
    ]);
    ctx.strokeStyle = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLUSH_MAP"][o.kind].bg;
    ctx.lineWidth = 4;
    circle(ctx, cx, cy, 180);
    ctx.stroke();
    ctx.restore();
    if (plushSvg) {
        try {
            const clone = plushSvg.cloneNode(true);
            clone.setAttribute("width", "230");
            clone.setAttribute("height", "230");
            const str = new XMLSerializer().serializeToString(clone);
            const img = new Image();
            await new Promise((res)=>{
                img.onload = ()=>res();
                img.onerror = ()=>res();
                img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(str)}`;
            });
            if (img.width) ctx.drawImage(img, cx - 115, cy - 115, 230, 230);
        } catch  {
        /* plush drawing is best-effort */ }
    }
    /* ── receiver + meta ── */ ctx.fillStyle = "#04202E";
    ctx.font = "900 50px Vazirmatn, sans-serif";
    const toTxt = o.dir === "sent" ? `برای ${o.to}` : "برای تو";
    ctx.fillText(toTxt, right, 682);
    ctx.font = "500 24px Vazirmatn, sans-serif";
    ctx.fillStyle = "#4A6572";
    const charmBits = [];
    if (o.hearts > 0) charmBits.push(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(o.hearts)} قلب`);
    if (o.paws > 0) charmBits.push(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fa"])(o.paws)} پنجه`);
    if (o.anonymous) charmBits.push("ناشناس");
    ctx.fillText([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLUSH_MAP"][o.kind].name,
        o.date,
        charmBits.join(" · ")
    ].filter(Boolean).join(" · "), right, 742);
    chip(ctx, right, 786, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OCCASIONS"][o.occasion] ?? "همین‌طوری", "#E3F6FD", "#006387");
    /* ── message block ── */ ctx.fillStyle = "#1F3E4D";
    ctx.font = "500 30px Vazirmatn, sans-serif";
    const lines = wrapRtl(ctx, o.message || "پیامی نوشته نشده بود.", W - 280, 5);
    let y = 862;
    for (const line of lines){
        ctx.fillText(line, right, y);
        y += 54;
    }
    /* ── dashed divider ── */ ctx.save();
    ctx.setLineDash([
        9,
        9
    ]);
    ctx.strokeStyle = "#D3E8F0";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(132, y + 26);
    ctx.lineTo(W - 132, y + 26);
    ctx.stroke();
    ctx.restore();
    /* ── password chip + footer ── */ chip(ctx, right, y + 58, `رمز کارت: ${o.password || "بهار"}`, "#04202E", "#FFFFFF");
    if (o.senderName) {
        ctx.fillStyle = "#4A6572";
        ctx.font = "600 24px Vazirmatn, sans-serif";
        ctx.fillText(`فرستنده: ${o.senderName}`, 132 + 10, y + 70);
    }
    ctx.fillStyle = "#8FB3C0";
    ctx.font = "600 22px Vazirmatn, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("با ♥ ساخته شده در یک دوست · yekdoost.ir", cx, H - 152);
    ctx.textAlign = "right";
    /* ── download ── */ return await new Promise((res)=>{
        try {
            canvas.toBlob((blob)=>{
                if (!blob) return res(false);
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `yekdoost-gift-${o.no}.png`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.setTimeout(()=>URL.revokeObjectURL(url), 4000);
                res(true);
            }, "image/png");
        } catch  {
            res(false);
        }
    });
}
}),
"[project]/src/lib/orders/order-view.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ── orders/order-view.ts — customer-facing view of an order (client-safe) ──
// One honest mapping from the 11-state machine to Persian chips + intent
// helpers, shared by the dashboard (هدیه‌هام) and the track screen.
// Legacy demo orders (no status2) fall back to the classic 4-step chip.
__turbopack_context__.s([
    "V2_CHIP",
    ()=>V2_CHIP,
    "isAwaitingPayment",
    ()=>isAwaitingPayment,
    "isDeadOrder",
    ()=>isDeadOrder,
    "isOnJourney",
    ()=>isOnJourney,
    "isUnderReview",
    ()=>isUnderReview,
    "orderChip",
    ()=>orderChip
]);
/** The classic 4-step legacy chip (demo orders + fallback). */ const LEGACY_CHIP = {
    paid: {
        label: "بسته‌بندی",
        bg: "#FFF3C9"
    },
    packing: {
        label: "بسته‌بندی",
        bg: "#FFF3C9"
    },
    shipped: {
        label: "در راه",
        bg: "#CDEFFB"
    },
    delivered: {
        label: "تحویل شد",
        bg: "#D7F5E4"
    }
};
const V2_CHIP = {
    awaiting_payment: {
        label: "در انتظار پرداخت",
        bg: "#FFF3C9",
        fg: "#7A5C00"
    },
    payment_under_review: {
        label: "در انتظار تأیید پرداخت",
        bg: "#FFF3C9",
        fg: "#7A5C00"
    },
    paid: {
        label: "پرداخت شد",
        bg: "#FFF3C9"
    },
    preparing: {
        label: "در حال آماده‌سازی",
        bg: "#FFF3C9"
    },
    shipped: {
        label: "در راهه",
        bg: "#CDEFFB"
    },
    delivered: {
        label: "تحویل شد",
        bg: "#D7F5E4"
    },
    failed: {
        label: "پرداخت ناموفق",
        bg: "#FFE9F0",
        fg: "#B02A52"
    },
    cancelled: {
        label: "لغو شد",
        bg: "#F2F7F9",
        fg: "#4A6572"
    },
    expired: {
        label: "منقضی شد",
        bg: "#F2F7F9",
        fg: "#4A6572"
    },
    refund_requested: {
        label: "در جریان مرجوعی",
        bg: "#E7E0FA"
    },
    refunded: {
        label: "مرجوع شد",
        bg: "#E7E0FA"
    }
};
const REFUND_STATES = [
    "refund_requested",
    "refunded"
];
function orderChip(o) {
    if (o.v2 && o.dir === "recv") {
        return o.opened ? {
            label: "پیام رو دیدی",
            bg: "#D7F5E4"
        } : {
            label: "پیام منتظرته",
            bg: "#CDEFFB"
        };
    }
    if (o.v2 && o.status2) {
        const s = o.status2;
        if (V2_CHIP[s]) return V2_CHIP[s];
    }
    if (o.dir === "recv") {
        return o.opened ? {
            label: "پیام رو دیدی",
            bg: "#D7F5E4"
        } : {
            label: "پیام منتظرته",
            bg: "#CDEFFB"
        };
    }
    return LEGACY_CHIP[o.status] ?? {
        label: o.status,
        bg: "#F2F7F9"
    };
}
function isAwaitingPayment(o) {
    return Boolean(o.v2) && o.dir === "sent" && o.status2 === "awaiting_payment";
}
function isUnderReview(o) {
    return Boolean(o.v2) && o.dir === "sent" && o.status2 === "payment_under_review";
}
function isDeadOrder(o) {
    return Boolean(o.v2) && o.dir === "sent" && (o.status2 === "expired" || o.status2 === "cancelled" || o.status2 === "failed");
}
function isOnJourney(o) {
    return Boolean(o.v2) && o.dir === "sent" && (o.status2 === "paid" || o.status2 === "preparing" || o.status2 === "shipped" || o.status2 === "delivered" || REFUND_STATES.includes(o.status2));
}
}),
"[project]/src/lib/orders/status.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/src/hooks/use-has-mounted.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useHasMounted",
    ()=>useHasMounted
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
const emptySubscribe = ()=>()=>{};
function useHasMounted() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(emptySubscribe, ()=>true, ()=>false);
}
}),
"[project]/src/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PishnamApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// ── Pishnam — the real gift web-app (UI rebuilt in React from the design system) ──
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hash-route.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$has$2d$mounted$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-has-mounted.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$sync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pishnam-sync.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$nav$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/nav.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$logo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/logo.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$home$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/screens/home.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$product$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/screens/product.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$friends$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/screens/friends.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$flow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/screens/flow.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$success$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/screens/success.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$pay$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/screens/pay-modal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$builder$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/screens/builder.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$dashboards$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/screens/dashboards.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$gift$2d$experience$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/screens/gift-experience.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$track$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/screens/track.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$admin$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/screens/admin.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$pay$2d$gateway$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/screens/pay-gateway.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$stories$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/screens/stories.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$blog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/screens/blog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$legal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/screens/legal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$info$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shop/screens/info.tsx [app-ssr] (ecmascript)");
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
;
;
;
;
;
;
;
;
;
function PishnamApp() {
    // The app is state-driven (persisted store + hash route): render a branded
    // splash until mounted so server HTML always matches the first client render.
    const mounted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$has$2d$mounted$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useHasMounted"])();
    if (!mounted) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Splash, {}, void 0, false, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 45,
        columnNumber: 24
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PishnamScreens, {}, void 0, false, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 46,
        columnNumber: 10
    }, this);
}
function Splash() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen flex-col items-center justify-center gap-6 bg-[#F2FAFD]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pishnam-glow rounded-[22px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$logo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Logo"], {
                    size: 72
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm font-bold text-[#4A6572]",
                children: "یه بغل، تو یه جعبه…"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
// ── Persian 404 — unknown hash routes land here (parseHash fallback) ──
function NotFoundScreen() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-[70vh] flex-col items-center justify-center gap-5 px-6 py-16 text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-6xl",
                "aria-hidden": "true",
                children: "🧸"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-black text-[#04202E]",
                children: "این صفحه پیدا نشد!"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "max-w-sm text-sm leading-7 text-[#4A6572]",
                children: "انگار یه دوست پشمالو گم شده… آدرسی که اومدی اینجا وجود نداره یا جابه‌جا شده."
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>{
                    window.location.hash = "#/home";
                },
                className: "rounded-full bg-[#04202E] px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.03] active:scale-95",
                children: "برگرد به خانه"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
function PishnamScreens() {
    const { route, query } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hash$2d$route$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useHashRoute"])();
    const standalone = route === "gift" || route === "pay-gateway";
    // the 4-step wizard has its own back button, step bar and sticky CTA —
    // the global bottom nav would sit on top of the CTA (both stick to bottom)
    const wizard = route === "pick" || route === "card" || route === "extras" || route === "checkout";
    // boot-time server sync: merge orders persisted in SQLite into the local
    // store (global board first, then the logged-in account's bound orders)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pishnam$2d$sync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["bootSync"])();
    }, []);
    const screen = (()=>{
        switch(route){
            case "home":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$home$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MobileHome"], {}, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 102,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$home$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DesktopHome"], {}, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 103,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true);
            case "friends":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$friends$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FriendsScreen"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 107,
                    columnNumber: 16
                }, this);
            case "product":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$product$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ProductScreen"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 109,
                    columnNumber: 16
                }, this);
            case "pick":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$flow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MobilePick"], {}, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 113,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$builder$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DesktopBuilder"], {
                            step: 1
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 114,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true);
            case "card":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$flow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MobileCard"], {}, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 120,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$builder$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DesktopBuilder"], {
                            step: 2
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 121,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true);
            case "extras":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$flow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MobileExtras"], {}, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 127,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$builder$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DesktopBuilder"], {
                            step: 3
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 128,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true);
            case "checkout":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$flow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MobileCheckout"], {}, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 134,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$builder$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DesktopBuilder"], {
                            step: 4
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 135,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true);
            case "success":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$success$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MobileSuccess"], {}, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 141,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$success$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DesktopSuccess"], {}, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 142,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true);
            case "my-gifts":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$dashboards$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MobileMyGifts"], {}, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 148,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$dashboards$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DesktopMyGifts"], {}, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 149,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true);
            case "impact":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$dashboards$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MobileImpact"], {}, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 155,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$dashboards$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DesktopImpact"], {}, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 156,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true);
            case "login":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$dashboards$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MobileLogin"], {}, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 162,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$dashboards$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DesktopLogin"], {}, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 163,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true);
            case "gift":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$gift$2d$experience$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GiftExperience"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 167,
                    columnNumber: 16
                }, this);
            case "pay-gateway":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$pay$2d$gateway$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PayGateway"], {
                    authority: query.get("authority") ?? ""
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 169,
                    columnNumber: 16
                }, this);
            case "track":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$track$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MobileTrack"], {}, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 173,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$track$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DesktopTrack"], {}, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 174,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true);
            case "admin":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$admin$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminScreen"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 178,
                    columnNumber: 16
                }, this);
            case "stories":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$stories$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StoriesScreen"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 180,
                    columnNumber: 16
                }, this);
            case "blog":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$blog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BlogIndex"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 182,
                    columnNumber: 16
                }, this);
            case "post":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$blog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PostScreen"], {
                    slug: query.get("slug") ?? ""
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 184,
                    columnNumber: 16
                }, this);
            case "legal":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$legal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LegalPage"], {
                    doc: query.get("doc") ?? "privacy"
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 186,
                    columnNumber: 16
                }, this);
            case "about":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$info$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AboutPage"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 188,
                    columnNumber: 16
                }, this);
            case "mission":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$info$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MissionPage"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 190,
                    columnNumber: 16
                }, this);
            case "contact":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$info$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContactPage"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 192,
                    columnNumber: 16
                }, this);
            case "reviews":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$info$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReviewsPage"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 194,
                    columnNumber: 16
                }, this);
            case "shipping":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$info$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShippingPage"], {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 196,
                    columnNumber: 16
                }, this);
            case "not-found":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NotFoundScreen, {}, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 198,
                    columnNumber: 16
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$home$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MobileHome"], {}, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 202,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$home$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DesktopHome"], {}, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 203,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true);
        }
    })();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#F2FAFD] text-[#04202E]",
        children: [
            !standalone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hidden md:block",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$nav$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DesktopHeader"], {}, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 214,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 213,
                    columnNumber: 11
                }, this)
            }, void 0, false),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "contents",
                children: screen
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 218,
                columnNumber: 7
            }, this),
            !standalone && !wizard && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$nav$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MobileNav"], {
                active: route
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 219,
                columnNumber: 34
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shop$2f$screens$2f$pay$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PayModal"], {}, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 220,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 210,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_9354d5e2._.js.map