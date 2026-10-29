# AGENTS.md — جعبه آبی (یک‌دوست)

قواعد کدنویسی این مخزن برای هر عامل هوش مصنوعی / توسعه‌دهنده‌ای که در آن کار می‌کند.
این فایل بر اساس الگوی استاندارد [agents.md](https://agents.md) نوشته شده و منبع حقیقتِ «چطور در این پروژه کار کنیم» است.
گزارش ممیزی زنده: `public/audit-report.html` — **هر راند باید یافته‌ها/رفع‌ها را در آن به‌روزرسانی کند.**

## ۱) دستورها (Commands)

```bash
bun run dev          # سرور توسعه روی پورت 3000 (فقط همین پورت — build ممنوع در سندباکس)
bun run lint         # eslint — هدف: صفر خطا و صفر هشدار
bun run db:push      # اعمال schema.prisma روی دیتابیس محلی (SQLite)
bun scripts/seed-commerce.ts        # محصولات/افزودنی‌ها/تنظیمات (idempotent)
node scripts/seed-round34-images.mjs # گالری‌ها + کاور بلاگ + لوگو (idempotent)
bun scripts/seed-blog.ts            # پست‌های بلاگ (idempotent)
node scripts/seed-admin-demo.mjs    # دیتای دموی داشبورد ادمین (idempotent)
# ممیزی:
npx tsc --noEmit && npx madge --circular --extensions ts,tsx src
npx eslint --config eslint.audit.mjs src   # قوانین امنیتی (هشدار جدید = بررسی اجباری)
```

## ۲) قواعد سخت (Hard Rules)

1. **بیلد ممنوع در سندباکس** — `bun run build` / `next build` اجرا نکن؛ فقط dev روی 3000.
2. **یک مسیر عمومی** — روت کاربر فقط `src/app/page.tsx` است؛ ناوبری با hash-router داخلی (`src/lib/hash-route.ts`) و بازنویسی در `src/proxy.ts`. مسیر جدید نسازی مگر در موج برنامه‌ریزی‌شده‌ی سئو.
3. **SDK هوش مصنوعی فقط بک‌اند** — `z-ai-web-dev-sdk` هرگز به کد کلاینت راه ندارد.
4. **درخواست‌های بین‌سرویسی** — فقط مسیر نسبی + `?XTransformPort=<port>`؛ هرگز آدرس absolute با پورت. WebSocket فقط socket.io به `io("/?XTransformPort=<port>")`.
5. **پول سمت سرور authoritative است** — کلاینت هرگز مبلغ قابل‌پرداخت نمی‌سازد؛ همیشه `fetchQuote`/`submitCheckout` با `Idempotency-Key`.
6. **ماتریس ادمین مقدس است** — هر هندلر در `src/app/api/admin/**` باید `requireAdmin()` صدا بزند؛ مسیرهای حساس owner-only.
7. **درخواست‌های mutator** — `assertSameOrigin(req)` اول هندلر + نرخ‌محدود برای مسیرهای عمومی حساس.
8. **آپلود فایل** — فقط از جادوی بایت‌های `payments/manual.ts` (magic-byte sniff) + سقف `UPLOAD_MAX_BYTES` + پسوند allowlist + نام فایل سمت سرور تولید شود.
9. **مدیای خصوصی هرگز عمومی نمی‌شود** — پیشوند `messages/`، `receipts/`، `refunds/` از `/api/media` unreachable است؛ فیلدهای PII گیرنده در پاسخ‌های عمومی استریپ شوند.
10. **کوئری‌های محدود** — هر `findMany` حداقل یکی از: `take` مشخص / `select` محدود / ایندکس مناسب. aggregate در SQL (`groupBy`) نه در جاوااسکریپت.
11. **seedها idempotent** — upsert-only؛ دیتای نمایشی همیشه برچسب «نمایشی» داشته باشد. ساخت عدد/آمار جعلی ممنوع.
12. **متن فارسی، لحن برند** — مخاطب «تو»، جمله کوتاه، بدون کلیشه، مطابق گاید کپی راند ۳۴؛ کپی‌رایتینگ فقط متن‌های فارسی را عوض می‌کند نه کلیدهای کد.

## ۳) قراردادهای ساختاری

- **TypeScript سخت** — صفر `any`، صفر `@ts-ignore`؛ `tsc --noEmit` باید همیشه صفر خطا بماند.
- **بدون وابستگی حلقوی** — `madge --circular` تمیز بماند.
- **کامپوننت غول‌پیکر ممنوع برای فایل‌های جدید** — سقف حدود ۶۰۰ خط/فایل؛ شکستن بر اساس فیچر (الگوی `src/components/shop/admin/*`).
- **استایل** — Tailwind 4 + کامپوننت‌های shadcn موجود در `src/components/ui`؛ بدون رنگ indigo/بنفش؛ برند آبی روشن؛ فوتر چسبان (`min-h-screen flex flex-col` + `mt-auto`).
- **RTL/فارسی** — `lang="fa" dir="rtl"`؛ اعداد فارسی در UI کاربر؛ تاریخ جلالی (`src/lib/jalali.ts`).
- **دسترس‌پذیری** — برچسب ARIA، هدف لمسی ≥44px، `<a href>` واقعی برای ناوبری قابل ایندکس.
- **ذخیره‌سازی فایل** — فقط از `dataFile()` (`src/lib/data-root.ts`)؛ کلیدها `<folder>/<stem>.<ext>`.
- **پریزم** — schema در `prisma/`؛ دیتابیس در `db/`؛ نوع primitive list در schema ممنوع؛ تغییر schema = `db:push` محلی + همگام‌سازی `schema.postgres.prisma` (اسکریپت `pg:sync`).

## ۴) تعریف «تمام‌شده»

- `bun run lint` صفر · `npx tsc --noEmit` صفر · `dev.log` بدون خطای runtime.
- تست E2E با `agent-browser` روی `/` (و اگر ادمین دست خورده: `#/admin` با رمز `.env`) شامل: رندر، تعامل اصلی، کنسول تمیز، موبایل 390px.
- اگر یافته‌ی ممیزی مرتبط رفع شده: به‌روزرسانی `public/audit-report.html` (وضعیت آیتم → `fixed` + `resolvedNote`).

## ۵) چرخه‌ی ممیزی (هر راند نگهداری)

1. سه ابزار پایه: `tsc`، `madge`، `eslint.audit.mjs` — هشدار/خطای جدید = یافته‌ی جدید.
2. یافته‌ی جدید با شناسه‌ی یکتا (A/S/UX/SEO/P + شماره) به آرایه `FINDINGS` در `public/audit-report.html` اضافه شود؛ آیتم رفع‌شده `status:"fixed"` + `resolvedNote` — هیچ آیتمی حذف نمی‌شود.
3. knip در سندباکس به OOM می‌خورد (فقط در CI اجرا شود)؛ جایگزین: جست‌وجوی دستی export بی‌مصرف.
