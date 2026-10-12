// Reconstruct final pages: copy nested-bundle pages to public/pages/<slug>.html
// with a cross-page navigation shim injected, and emit a JSON registry.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';

const ROOT = '/home/z/my-project';
const OUT_DIR = `${ROOT}/public/pages`;
mkdirSync(OUT_DIR, { recursive: true });

function extractBlock(html, type) {
  const re = new RegExp(`<script type="__bundler/${type}">([\\s\\S]*?)<\\/script>`, 'i');
  const m = html.match(re);
  return m ? m[1].trim() : null;
}

// ---- Page registry (order = user journey / design-system order) ----
// source: [versionDir, fileNamePrefix], slug, dcName, title, label, w, h, cat, desc
const PAGES = [
  // ── مسیر اصلی هدیه (موبایل) ──
  { v: 'v1', f: '01-', slug: 'main',             dc: 'Main.dc.html',         title: 'خانه',                label: '۱ · خانه',              w: 390,  h: 2200, cat: 'flow',    desc: 'صفحه‌ی اصلی موبایل؛ ورود به مسیر ساخت هدیه' },
  { v: 'v1', f: '02-', slug: 'm-pick',           dc: 'M-Pick.dc.html',       title: 'انتخاب دوست پشمالو',  label: '۲ · انتخاب دوست پشمالو', w: 390,  h: 1280, cat: 'flow',    desc: 'قدم ۱ از ۴ — انتخاب عروسک (۶ حالت)' },
  { v: 'v1', f: '03-', slug: 'm-card',           dc: 'M-Card.dc.html',       title: 'کارت پستال و پیام',    label: '۳ · کارت و پیام',        w: 390,  h: 1560, cat: 'flow',    desc: 'قدم ۲ از ۴ — انتخاب طرح کارت و نوشتن پیام' },
  { v: 'v1', f: '04-', slug: 'm-extras',         dc: 'M-Extras.dc.html',     title: 'پنجه و قلب',           label: '۴ · پنجه و قلب',         w: 390,  h: 1360, cat: 'flow',    desc: 'قدم ۳ از ۴ — پنجه‌ها و قلب‌های اضافه' },
  { v: 'v1', f: '05-', slug: 'm-checkout',       dc: 'M-Checkout.dc.html',   title: 'سبد و پرداخت',         label: '۵ · سبد و پرداخت',       w: 390,  h: 1700, cat: 'flow',    desc: 'قدم ۴ از ۴ — بازبینی سفارش و پرداخت' },
  { v: 'v2', f: '01-', slug: 'm-success',        dc: 'M-Success.dc.html',    title: 'سفارش ثبت شد',         label: '۶ · سفارش ثبت شد',       w: 390,  h: 1100, cat: 'flow',    desc: 'تأیید پرداخت و کد پیگیری هدیه' },
  { v: 'v2', f: '02-', slug: 'm-my-gifts',       dc: 'M-MyGifts.dc.html',    title: 'هدیه‌هام',             label: '۷ · هدیه‌هام',           w: 390,  h: 1100, cat: 'flow',    desc: 'فهرست هدیه‌های ساخته‌شده‌ی کاربر' },
  { v: 'v1', f: '08-', slug: 'm-impact',         dc: 'M-Impact.dc.html',     title: 'دفتر مهربونی',         label: 'دفتر مهربونی',           w: 390,  h: 1300, cat: 'flow',    desc: 'آمار مهربونی‌ها و نشان‌ها' },
  { v: 'v2', f: '03-', slug: 'm-login',          dc: 'M-Login.dc.html',      title: 'ورود یا ثبت‌نام',       label: '۸ · ورود یا ثبت‌نام',     w: 390,  h: 844,  cat: 'flow',    desc: 'ورود با شماره موبایل و کد یکبارمصرف' },
  // ── تجربه‌ی گیرنده ──
  { v: 'v1', f: '06-', slug: 'm-gift-lock',      dc: 'M-Gift-Lock.dc.html',  title: 'قفل کارت پستال',       label: 'گیرنده · قفل کارت',      w: 390,  h: 844,  cat: 'receiver', desc: 'صفحه‌ی قفل هدیه؛ گیرنده باید «باز کن» را لمس کند' },
  { v: 'v1', f: '07-', slug: 'm-gift-open',      dc: 'M-Gift-Open.dc.html',  title: 'پیام تو',              label: 'گیرنده · پیام',          w: 390,  h: 1240, cat: 'receiver', desc: 'باز شدن هدیه و دیدن پیام + عروسک' },
  { v: 'v2', f: '18-', slug: 'desktop-gift-open', dc: 'Desktop-Gift-Open.dc.html', title: 'گیرنده (QR)',    label: 'وب · گیرنده (QR)',       w: 1440, h: 1400, cat: 'receiver', desc: 'نسخه‌ی وب تجربه‌ی گیرنده با کد QR' },
  // ── موبایل · صفحات اطلاعاتی ──
  { v: 'v2', f: '09-', slug: 'm-about',          dc: 'M-About.dc.html',      title: 'درباره‌ی پیشتم',       label: 'موبایل · درباره‌ی ما',    w: 390,  h: 2600, cat: 'info-m',  desc: 'قصه‌ی برند از زبان عروسک‌ها' },
  { v: 'v2', f: '10-', slug: 'm-mission',        dc: 'M-Mission.dc.html',    title: 'ماموریت پیشتم',        label: 'موبایل · ماموریت',       w: 390,  h: 2200, cat: 'info-m',  desc: 'ماموریت و ارزش‌های برند' },
  { v: 'v2', f: '11-', slug: 'm-contact',        dc: 'M-Contact.dc.html',    title: 'تماس با پیشتم',        label: 'موبایل · تماس',          w: 390,  h: 1500, cat: 'info-m',  desc: 'راه‌های ارتباطی و پرسش‌های پرتکرار' },
  { v: 'v2', f: '12-', slug: 'm-reviews',        dc: 'M-Reviews.dc.html',    title: 'نظرها',                label: 'موبایل · نظرها',         w: 390,  h: 2000, cat: 'info-m',  desc: 'نظرات واقعی گیرنده‌ها و فرستنده‌ها' },
  { v: 'v2', f: '13-', slug: 'm-shipping',       dc: 'M-Shipping.dc.html',   title: 'ارسال و بازگشت',       label: 'موبایل · ارسال',         w: 390,  h: 2100, cat: 'info-m',  desc: 'شرایط ارسال، بسته‌بندی و بازگشت' },
  // ── وب دسکتاپ ──
  { v: 'v1', f: '13-', slug: 'desktop-home',     dc: 'Desktop-Home.dc.html', title: 'وب · صفحه‌ی اصلی',     label: 'وب · صفحه‌ی اصلی',        w: 1440, h: 3800, cat: 'web',     desc: 'لندینگ دسکتاپ؛ هیرو، محصولات و مسیر ساخت' },
  { v: 'v1', f: '14-', slug: 'desktop-builder',  dc: 'Desktop-Builder.dc.html', title: 'وب · ساخت هدیه',    label: 'وب · ساخت هدیه',         w: 1440, h: 2100, cat: 'web',     desc: 'سازنده‌ی هدیه در وب؛ انتخاب عروسک و پیام' },
  { v: 'v2', f: '17-', slug: 'desktop-success',  dc: 'Desktop-Success.dc.html', title: 'وب · سفارش ثبت شد', label: 'وب · سفارش ثبت شد',      w: 1440, h: 1400, cat: 'web',     desc: 'تأیید سفارش در نسخه‌ی وب' },
  { v: 'v2', f: '16-', slug: 'desktop-my-gifts', dc: 'Desktop-MyGifts.dc.html', title: 'وب · هدیه‌هام',      label: 'وب · هدیه‌هام',          w: 1440, h: 1800, cat: 'web',     desc: 'پنل هدیه‌های کاربر در وب' },
  { v: 'v2', f: '15-', slug: 'desktop-login',    dc: 'Desktop-Login.dc.html', title: 'وب · ورود',            label: 'وب · ورود',              w: 1440, h: 1000, cat: 'web',     desc: 'ورود و ثبت‌نام در نسخه‌ی وب' },
  { v: 'v2', f: '14-', slug: 'desktop-impact',   dc: 'Desktop-Impact.dc.html', title: 'وب · دفتر مهربونی',  label: 'وب · دفتر مهربونی',      w: 1440, h: 2600, cat: 'web',     desc: 'آمار مهربونی‌ها در وب' },
  { v: 'v2', f: '04-', slug: 'desktop-about',    dc: 'Desktop-About.dc.html', title: 'وب · درباره‌ی ما',     label: 'وب · درباره‌ی ما',        w: 1440, h: 3000, cat: 'web',     desc: 'درباره‌ی پیشتم در وب' },
  { v: 'v2', f: '05-', slug: 'desktop-mission',  dc: 'Desktop-Mission.dc.html', title: 'وب · ماموریت',      label: 'وب · ماموریت',           w: 1440, h: 2400, cat: 'web',     desc: 'ماموریت برند در وب' },
  { v: 'v2', f: '06-', slug: 'desktop-contact',  dc: 'Desktop-Contact.dc.html', title: 'وب · تماس با ما',   label: 'وب · تماس با ما',        w: 1440, h: 1400, cat: 'web',     desc: 'تماس و پشتیبانی در وب' },
  { v: 'v2', f: '07-', slug: 'desktop-reviews',  dc: 'Desktop-Reviews.dc.html', title: 'وب · نظرها',        label: 'وب · نظرها',             w: 1440, h: 2200, cat: 'web',     desc: 'نظرات در نسخه‌ی وب' },
  { v: 'v2', f: '08-', slug: 'desktop-shipping', dc: 'Desktop-Shipping.dc.html', title: 'وب · ارسال و بازگشت', label: 'وب · ارسال و بازگشت', w: 1440, h: 2000, cat: 'web',     desc: 'شرایط ارسال در وب' },
  // ── جزءهای طراحی ──
  { v: 'v1', f: '09-', slug: 'comp-plush',       dc: 'Plush.dc.html',        title: 'دوست پشمالو',          label: 'جزء · دوست پشمالو',      w: 200,  h: 200,  cat: 'comp',    desc: 'کامپوننت عروسک‌ها؛ ۶ حالت SVG' },
  { v: 'v1', f: '10-', slug: 'comp-logo',        dc: 'Logo.dc.html',         title: 'لوگوی پیشتم',          label: 'جزء · لوگو',             w: 240,  h: 72,   cat: 'comp',    desc: 'کامپوننت لوگو' },
  // ── هویت چاپی ──
  { v: 'v1', f: '11-', slug: 'print-identity',   dc: 'Print-Identity.dc.html', title: 'هویت چاپی پیشتم',    label: 'هویت چاپی',              w: 1280, h: 900,  cat: 'print',   desc: 'پالت، تایپوگرافی و کارت ویزیت' },
  { v: 'v1', f: '12-', slug: 'print-card-back',  dc: 'Print-CardBack.dc.html', title: 'پشت کارت پستال',     label: 'پشت کارت پستال',         w: 960,  h: 680,  cat: 'print',   desc: 'طرح پشت کارت پستال چاپی' },
];

const LINKS = {};
for (const p of PAGES) if (p.dc) LINKS[p.dc] = p.slug;

const CATS = [
  { id: 'flow',      fa: 'مسیر ساخت هدیه',   icon: 'gift' },
  { id: 'receiver',  fa: 'تجربه‌ی گیرنده',    icon: 'unlock' },
  { id: 'info-m',    fa: 'موبایل · اطلاعات',  icon: 'smartphone' },
  { id: 'web',       fa: 'وب دسکتاپ',        icon: 'monitor' },
  { id: 'comp',      fa: 'جزءهای طراحی',     icon: 'puzzle' },
  { id: 'print',     fa: 'هویت چاپی',        icon: 'printer' },
];

const SHIM = `
<script>
(function () {
  var LINKS = ${JSON.stringify(LINKS)};
  var ORDER = ${JSON.stringify(PAGES.map(p => p.slug))};
  function handleClick(e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (!/\\.dc\\.html/i.test(href)) return;
    e.preventDefault();
    e.stopPropagation();
    var clean = href.split('#')[0].replace(/^\\.?\\//, '');
    var hash = href.split('#')[1] || '';
    var slug = LINKS[clean] || null;
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'pishnam-nav', name: clean, slug: slug, hash: hash }, '*');
      } else if (slug) {
        window.location.href = '/?page=' + slug + (hash ? '&' + hash : '');
      }
    } catch (err) {}
  }
  window.addEventListener('click', handleClick, true);
  document.addEventListener('click', handleClick, true);
  // standalone viewer chrome: tiny floating pill when NOT inside the shell
  function standalone() {
    try { return window.self === window.top; } catch (e) { return false; }
  }
  if (standalone()) {
    var pill = document.createElement('div');
    pill.setAttribute('dir', 'rtl');
    pill.style.cssText = 'position:fixed;bottom:14px;left:14px;z-index:2147483000;display:flex;gap:8px;font-family:Vazirmatn,system-ui,sans-serif;font-size:12.5px;font-weight:700;';
    function mkBtn(text, href) {
      var b = document.createElement('a');
      b.textContent = text; b.href = href;
      b.style.cssText = 'background:#04202E;color:#fff;text-decoration:none;padding:9px 14px;border-radius:999px;box-shadow:0 6px 18px rgba(4,32,46,.25);display:inline-flex;align-items:center;gap:6px;';
      return b;
    }
    var idx = ORDER.indexOf(location.pathname.split('/').pop().replace('.html', ''));
    pill.appendChild(mkBtn('فهرست صفحات', '/'));
    if (idx > 0) pill.appendChild(mkBtn('→ قبلی', '/?page=' + ORDER[idx - 1]));
    if (idx > -1 && idx < ORDER.length - 1) pill.appendChild(mkBtn('بعدی ←', '/?page=' + ORDER[idx + 1]));
    document.body.appendChild(pill);
  }
})();
</scr` + `ipt>
`;

// ---- Build ----
const registry = [];
for (const p of PAGES) {
  const dir = `${ROOT}/extracted/${p.v}`;
  const file = readdirSync(dir).find(f => f.startsWith(p.f) && f.endsWith('.html'));
  if (!file) { console.error('MISSING source for', p.slug); continue; }
  let html = readFileSync(`${dir}/${file}`, 'utf8');
  // sanity: strip any previous shim
  html = html.replace(/<!--pishnam-shim-->[\s\S]*?<!--\/pishnam-shim-->/g, '');
  const shim = `<!--pishnam-shim-->${SHIM}<!--/pishnam-shim-->`;
  if (/<\/body>/i.test(html)) html = html.replace(/<\/body>/i, shim + '</body>');
  else html += shim;
  writeFileSync(`${OUT_DIR}/${p.slug}.html`, html);
  registry.push({ slug: p.slug, dc: p.dc, title: p.title, label: p.label, w: p.w, h: p.h, cat: p.cat, desc: p.desc, src: `/pages/${p.slug}.html` });
  console.log(`✓ ${p.slug}.html  (${p.label} · ${p.w}×${p.h})`);
}

writeFileSync(`${ROOT}/src/data/pages.ts`, `// AUTO-GENERATED by scripts/reconstruct.mjs — do not edit by hand
export interface PageDef {
  slug: string; dc: string; title: string; label: string;
  w: number; h: number; cat: string; desc: string; src: string;
}
export interface CatDef { id: string; fa: string; icon: string }

export const CATEGORIES: CatDef[] = ${JSON.stringify(CATS, null, 2)};

export const PAGES: PageDef[] = ${JSON.stringify(registry, null, 2)};

export const LINK_NAME_TO_SLUG: Record<string, string> = ${JSON.stringify(LINKS, null, 2)};

export function pageBySlug(slug: string): PageDef | undefined {
  return PAGES.find((p) => p.slug === slug);
}

export function neighbors(slug: string): { prev?: PageDef; next?: PageDef } {
  const i = PAGES.findIndex((p) => p.slug === slug);
  if (i < 0) return {};
  return { prev: PAGES[i - 1], next: PAGES[i + 1] };
}
`);
console.log(`\nRegistry written: ${registry.length} pages → src/data/pages.ts`);
