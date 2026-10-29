"use client";

// ── «اسلایدرها» tab (A-02 split) — home hero slide editor ──
// The home hero is server-driven: this tab edits Setting `home_slides`
// through /api/admin/slides (any admin seat). Every row: text + CTA + colors
// + plush OR custom image + enable/order. Live mini preview per row.
import { useEffect, useState } from "react";
import { Plush } from "@/components/shop/plush";
import { fa } from "@/lib/fa";
import { useToast } from "@/hooks/use-toast";
import { PLUSHES, type PlushKind } from "@/lib/pishnam-data";
import { DEFAULT_HOME_SLIDES, HERO_HASHES, HERO_ROUTES, MAX_HOME_SLIDES, type HeroSlide } from "@/lib/home-slides";
import { adminFetch, invalidateAdminCache } from "@/components/shop/admin/admin-cache";

const HERO_ROUTE_LABELS: Record<string, string> = {
  home: "خانه",
  friends: "دوستا (همه عروسک‌ها)",
  pick: "ساخت هدیه (قدم ۱)",
  extras: "افزودنی‌ها (قدم ۲)",
  checkout: "گیرنده و پرداخت (قدم ۳)",
  product: "صفحه محصول",
  stories: "قصه‌ی شما",
  impact: "دفتر مهربونی",
  mission: "مأموریت",
  about: "درباره ما",
  blog: "بلاگ",
  reviews: "نظرها",
  shipping: "ارسال",
  contact: "تماس",
  login: "ورود",
  "my-gifts": "هدیه‌های من",
  track: "پیگیری سفارش",
};

const HERO_HASH_LABELS: Record<string, string> = {
  "": "— بدون اسکرول —",
  how: "سکشن «چطوری کار می‌کنه»",
  faq: "سکشن «سؤال‌های رایج»",
};

function SlideField({
  label,
  value,
  onChange,
  maxLength,
  area = false,
  ltr = false,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  maxLength?: number;
  area?: boolean;
  ltr?: boolean;
  placeholder?: string;
}) {
  const cls =
    "w-full rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3.5 py-2.5 text-[13.5px] font-semibold text-[#04202E] outline-none focus:border-[#00ABE7]";
  return (
    <label className="flex flex-col gap-1.5 text-[11.5px] font-bold text-[#4A6572]">
      {label}
      {area ? (
        <textarea rows={3} maxLength={maxLength} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={`${cls} resize-none leading-[1.9]`} />
      ) : (
        <input dir={ltr ? "ltr" : undefined} maxLength={maxLength} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      )}
    </label>
  );
}

function SlideSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-[11.5px] font-bold text-[#4A6572]">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[46px] w-full rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3 text-[13px] font-semibold text-[#04202E] outline-none focus:border-[#00ABE7]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function SlideColor({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex flex-col gap-1.5 text-[11.5px] font-bold text-[#4A6572]">
      {label}
      <span className="flex items-center gap-2">
        <input
          type="color"
          value={/^#[0-9a-fA-F]{6}$/.test(value) ? value : "#00ABE7"}
          onChange={(e) => onChange(e.target.value)}
          aria-label={label}
          className="h-[46px] w-14 shrink-0 cursor-pointer rounded-2xl border-[1.5px] border-[#CFE6EF] bg-white p-1"
        />
        <input
          dir="ltr"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-[46px] w-full rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3 text-[13px] font-bold text-[#04202E] outline-none focus:border-[#00ABE7]"
        />
      </span>
    </label>
  );
}

function routeOptions(): { value: string; label: string }[] {
  return HERO_ROUTES.map((r) => ({ value: r, label: HERO_ROUTE_LABELS[r] ?? r }));
}

export function SlidesTab() {
  const [slides, setSlides] = useState<HeroSlide[] | null>(null);
  const [savedAt, setSavedAt] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const load = () => {
    adminFetch<{ slides?: HeroSlide[] }>("/api/admin/slides")
      .then((j) => {
        setSlides(j.slides?.length ? j.slides : DEFAULT_HOME_SLIDES.map((s) => ({ ...s })));
      })
      .catch(() => toast({ title: "بارگذاری اسلایدرها نشد" }));
  };

  useEffect(() => {
    load();

  }, []);

  const patch = (i: number, p: Partial<HeroSlide>) =>
    setSlides((prev) => (prev ? prev.map((s, j) => (j === i ? { ...s, ...p } : s)) : prev));

  const move = (i: number, dir: -1 | 1) =>
    setSlides((prev) => {
      if (!prev) return prev;
      const j = i + dir;
      if (j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  const save = async () => {
    if (!slides) return;
    if (!slides.some((s) => s.enabled)) {
      toast({ title: "حداقل یک اسلاید باید فعال باشد" });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/slides", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slides }),
      });
      const b = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        toast({
          title: "ذخیره نشد",
          description: b.error === "no_active_slide" ? "حداقل یک اسلاید فعال لازم است." : b.error === "bad_input" ? "مقادیر وارد شده معتبر نیستند." : "خطای سرور — دوباره تلاش کن.",
        });
        return;
      }
      toast({ title: "اسلایدرها ذخیره شد ✓", description: "صفحه‌ی اصلی همین حالا با محتوای جدید بالا می‌آید." });
      setSavedAt(new Date().toLocaleTimeString("fa-IR"));
      invalidateAdminCache();
      load();
    } catch {
      toast({ title: "ذخیره نشد — دوباره تلاش کن" });
    } finally {
      setSaving(false);
    }
  };

  if (!slides) {
    return <div className="rounded-[22px] bg-white px-5 py-6 text-center text-[13px] font-bold text-[#4A6572]">در حال بارگذاری…</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* header */}
      <section className="rounded-[24px] border border-[#DDEEF5] bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <h2 className="m-0 text-[16px] font-black text-[#04202E]">اسلایدرهای صفحه‌ی اصلی</h2>
            <span className="text-[12px] font-medium leading-[1.8] text-[#4A6572]">
              متن، دکمه‌ها، رنگ و عکس هر اسلاید را از همین‌جا عوض کن؛ ترتیب را با فلش‌ها بچین و اسلاید را خاموش/روشن کن.
              {savedAt ? ` آخرین ذخیره: ${savedAt}` : ""}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={slides.length >= MAX_HOME_SLIDES}
              onClick={() =>
                setSlides((prev) => {
                  if (!prev || prev.length >= MAX_HOME_SLIDES) return prev;
                  const twin = DEFAULT_HOME_SLIDES[prev.length % DEFAULT_HOME_SLIDES.length];
                  return [...prev, { ...twin, title: "اسلاید جدید", badge: "تازه", enabled: true }];
                })
              }
              className="h-11 rounded-full border-2 border-[#04202E] px-5 text-[13px] font-extrabold text-[#04202E] disabled:opacity-40"
            >
              + اسلاید جدید
            </button>
            <button
              type="button"
              onClick={() => {
                setSlides(DEFAULT_HOME_SLIDES.map((s) => ({ ...s })));
                toast({ title: "به پیش‌فرض برگشت — برای اعمال، ذخیره کن" });
              }}
              className="h-11 rounded-full border border-[#CFE6EF] px-5 text-[13px] font-bold text-[#4A6572]"
            >
              بازگردانی پیش‌فرض‌ها
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => void save()}
              className="h-11 rounded-full bg-[#04202E] px-6 text-[13.5px] font-extrabold text-white disabled:opacity-60"
            >
              {saving ? "در حال ذخیره…" : "ذخیره اسلایدرها"}
            </button>
          </div>
        </div>
      </section>

      {/* slide cards */}
      {slides.map((s, i) => (
        <section key={i} className="rounded-[24px] border p-5" style={{ borderColor: s.enabled ? "#BFE3F5" : "#E3EDF2", background: s.enabled ? "#fff" : "#FAFCFD" }}>
          {/* row header: index, enable, order, preview */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#04202E] bg-[#E3F6FD] text-[16px] font-black">{fa(i + 1)}</span>
            <span className="rounded-full bg-[#F2FAFD] px-3.5 py-2 text-[12px] font-extrabold text-[#006387]">{s.tab || "بدون برچسب"}</span>
            <button
              type="button"
              role="switch"
              aria-checked={s.enabled}
              onClick={() => patch(i, { enabled: !s.enabled })}
              className="relative h-10 w-[92px] shrink-0 rounded-full transition-colors"
              style={{ background: s.enabled ? "#0B6E4F" : "#CFE6EF" }}
            >
              <span className="absolute top-1 flex h-8 items-center rounded-full bg-white px-3 text-[11px] font-black transition-all" style={{ right: s.enabled ? "4px" : "46px", color: s.enabled ? "#0B6E4F" : "#4A6572" }}>
                {s.enabled ? "فعال" : "خاموش"}
              </span>
            </button>
            <div className="ms-auto flex items-center gap-1.5">
              <button type="button" aria-label="بردن به بالا" onClick={() => move(i, -1)} disabled={i === 0} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#CFE6EF] bg-white text-[#04202E] disabled:opacity-35">↑</button>
              <button type="button" aria-label="بردن به پایین" onClick={() => move(i, 1)} disabled={i === slides.length - 1} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#CFE6EF] bg-white text-[#04202E] disabled:opacity-35">↓</button>
              <button
                type="button"
                aria-label="حذف اسلاید"
                disabled={slides.length <= 1}
                onClick={() => setSlides((prev) => (prev && prev.length > 1 ? prev.filter((_, j) => j !== i) : prev))}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F7C5D3] bg-[#FFF8FA] text-[#B02A52] disabled:opacity-35"
              >
                ×
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* texts */}
            <div className="flex flex-col gap-3">
              <SlideField label="برچسب بالای عنوان (badge)" value={s.badge} maxLength={60} onChange={(v) => patch(i, { badge: v })} />
              <SlideField label="عنوان اصلی" value={s.title} maxLength={90} onChange={(v) => patch(i, { title: v })} />
              <SlideField label="متن توضیح" value={s.sub} maxLength={220} area onChange={(v) => patch(i, { sub: v })} />
              <SlideField label="برچسب شمارنده (بالای اسلاید)" value={s.tab} maxLength={40} onChange={(v) => patch(i, { tab: v })} />
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <SlideField label="متن دکمه‌ی اصلی" value={s.cta} maxLength={40} onChange={(v) => patch(i, { cta: v })} />
                <SlideSelect label="مقصد دکمه‌ی اصلی" value={s.ctaRoute} options={routeOptions()} onChange={(v) => patch(i, { ctaRoute: v })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <SlideField label="متن دکمه‌ی دوم" value={s.cta2} maxLength={40} onChange={(v) => patch(i, { cta2: v })} />
                <SlideSelect label="مقصد دکمه‌ی دوم" value={s.cta2Route} options={routeOptions()} onChange={(v) => patch(i, { cta2Route: v })} />
              </div>
              {s.cta2Route === "home" && (
                <SlideSelect label="اسکرول داخل خانه" value={s.cta2Hash} options={HERO_HASHES.map((h) => ({ value: h, label: HERO_HASH_LABELS[h] ?? h }))} onChange={(v) => patch(i, { cta2Hash: v })} />
              )}
              <div className="grid grid-cols-2 gap-3">
                <SlideColor label="رنگ پس‌زمینه" value={s.bg} onChange={(v) => patch(i, { bg: v })} />
                <SlideColor label="رنگ حباب پشت عکس" value={s.blob} onChange={(v) => patch(i, { blob: v })} />
              </div>
              <SlideSelect
                label="عروسک اسلاید"
                value={s.kind}
                options={PLUSHES.map((p) => ({ value: p.kind, label: p.name }))}
                onChange={(v) => patch(i, { kind: v })}
              />
            </div>
          </div>

          {/* image + preview row */}
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <SlideField
              label="عکس دلخواه (اختیاری — لینک عکس؛ اگر بدهی جای عروسک می‌نشیند)"
              value={s.image}
              ltr
              placeholder="https://…"
              onChange={(v) => patch(i, { image: v.trim() })}
            />
            <div className="flex items-end gap-2">
              {s.image ? (
                <span className="relative inline-block">

                  <img src={s.image} alt="پیش‌نمایش عکس اسلاید" className="h-20 w-20 rounded-2xl border-[1.5px] border-[#CFE6EF] object-cover" />
                  <button
                    type="button"
                    aria-label="حذف عکس"
                    onClick={() => patch(i, { image: "" })}
                    className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-[#F7C5D3] bg-white text-[12px] font-black text-[#B02A52]"
                  >
                    ×
                  </button>
                </span>
              ) : (
                <span className="rounded-2xl bg-[#F2FAFD] px-4 py-3 text-[11.5px] font-bold leading-[1.7] text-[#4A6572]">
                  بدون عکس — عروسک انتخابی بالا نمایش داده می‌شود.
                </span>
              )}
            </div>
          </div>

          {/* live mini preview */}
          <div className="mt-4 overflow-hidden rounded-[20px] border border-[#E3EDF2]">
            <div className="relative flex h-[150px] items-center gap-4 px-5" style={{ background: s.bg }}>
              <div className="absolute -bottom-10 left-6 h-[120px] w-[120px] rounded-full opacity-70" style={{ background: s.blob }} />
              <div className="relative z-10 flex max-w-[60%] flex-col items-start gap-1.5">
                <span className={`rounded-[10px] px-2.5 py-1 text-[10px] font-bold ${s.dark ? "bg-[#F0426B] text-white" : "bg-[#04202E] text-white"}`}>{s.badge}</span>
                <span className={`text-[16px] font-black leading-[1.5] ${s.dark ? "text-white" : "text-[#04202E]"}`}>{s.title}</span>
                <span className={`flex items-center rounded-full px-3.5 py-1.5 text-[11px] font-extrabold ${s.dark ? "bg-[#00ABE7] text-[#04202E]" : "bg-[#04202E] text-white"}`}>{s.cta}</span>
              </div>
              <div className="relative z-10 ms-auto">
                {s.image ? (

                  <img src={s.image} alt="" className="h-[110px] w-[110px] rounded-[18px] object-cover" />
                ) : (
                  <Plush kind={s.kind as PlushKind} size={110} />
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* bottom save */}
      <div className="flex justify-end">
        <button
          type="button"
          disabled={saving}
          onClick={() => void save()}
          className="h-12 rounded-full bg-[#04202E] px-8 text-[14px] font-extrabold text-white disabled:opacity-60"
        >
          {saving ? "در حال ذخیره…" : "ذخیره اسلایدرها"}
        </button>
      </div>
    </div>
  );
}
