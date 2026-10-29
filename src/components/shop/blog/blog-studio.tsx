"use client";

// ═══ BlogStudio — admin «بلاگ» tab (round 34-h) ═══
// Professional blog studio for «جعبه آبی»: post list + MDXEditor editor mode
// + featured-image pipeline + SEO panel (live counters, Google-style SERP
// preview, advisory checklist). The editor itself lives in mdx-core.tsx and is
// dynamically imported (ssr:false) so no other admin tab pays its bundle cost.
// APIs (round 34 backend):
//   GET    /api/admin/posts          full list incl. drafts + cover + SEO
//   POST   /api/admin/posts          create (metaTitle/metaDescription/coverKey)
//   PATCH  /api/admin/posts/[id]     partial update (coverKey:"" removes cover)
//   POST   /api/admin/posts/image    multipart { file, slot:"cover"|"inline" }
//   DELETE /api/admin/posts/[id]     owner-only

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { fa } from "@/lib/fa";
import { useToast } from "@/hooks/use-toast";
import { navigate } from "@/lib/hash-route";
import { SITE } from "@/lib/seo/site";
import { jalaliDateTime } from "@/components/shop/admin/admin-shared";
import { countWords, hasH2, hasInternalLink, imagesMissingAlt } from "./md-pro";

const MdxEditor = dynamic(() => import("./mdx-core"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] animate-pulse items-center justify-center rounded-[24px] border border-[#DDEEF5] bg-[#F2FAFD] text-[13px] font-bold text-[#4A6572]">
      در حال آماده‌سازی ادیتور…
    </div>
  ),
});

interface AdminPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string;
  cover: string | null;
  metaTitle: string;
  metaDescription: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

const SLUG_RE = /^[a-z0-9-]{3,60}$/;
const MAX_UPLOAD = 5 * 1024 * 1024; // UPLOAD_MAX_BYTES on the server

/* client mirror of server slugifyTitle (src/lib/media.ts) — so the URL preview
   updates live while typing the title; server regenerates when slug is empty */
const FA_TO_LATIN: Record<string, string> = {
  "آ": "a", "ا": "a", "ب": "b", "پ": "p", "ت": "t", "ث": "s", "ج": "j", "چ": "ch",
  "ح": "h", "خ": "kh", "د": "d", "ذ": "z", "ر": "r", "ز": "z", "ژ": "zh", "س": "s",
  "ش": "sh", "ص": "s", "ض": "z", "ط": "t", "ظ": "z", "ع": "a", "غ": "gh", "ف": "f",
  "ق": "gh", "ک": "k", "گ": "g", "ل": "l", "م": "m", "ن": "n", "و": "v", "ه": "h",
  "ی": "y", "ي": "y", "ك": "k", "‌": "-",
};

function slugifyClient(title: string): string {
  const mapped = title
    .toLowerCase()
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .split("")
    .map((ch) => FA_TO_LATIN[ch] ?? ch)
    .join("");
  const slug = mapped
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60)
    .replace(/-$/, "");
  return slug.length >= 3 && !slug.startsWith("-") ? slug : "";
}

/* ═══ the studio ═══ */

export function BlogStudio({ role }: { role?: string | null }) {
  const { toast } = useToast();
  const isOwner = role === "owner";

  const [posts, setPosts] = useState<AdminPost[] | null>(null);
  const [loadErr, setLoadErr] = useState(false);

  // editor mode
  const [mode, setMode] = useState<"list" | "edit">("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [cover, setCover] = useState<string | null>(null);
  /** only sent on PATCH when the cover was removed client-side ("") */
  const [coverKeyOverride, setCoverKeyOverride] = useState<string | null>(null);
  const [publish, setPublish] = useState(false);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");

  const load = () => {
    fetch("/api/admin/posts", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((j: { posts?: AdminPost[] }) => {
        setPosts(j.posts ?? []);
        setLoadErr(false);
      })
      .catch(() => {
        setPosts([]);
        setLoadErr(true);
      });
  };

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setSlugTouched(false);
    setExcerpt("");
    setTags("");
    setContent("");
    setMetaTitle("");
    setMetaDescription("");
    setCover(null);
    setCoverKeyOverride(null);
    setPublish(false);
    setErr("");
  };

  const startNew = () => {
    resetForm();
    setMode("edit");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startEdit = (p: AdminPost) => {
    resetForm();
    setEditingId(p.id);
    setTitle(p.title);
    setSlug(p.slug);
    setSlugTouched(true);
    setExcerpt(p.excerpt);
    setTags(p.tags);
    setContent(p.content);
    setMetaTitle(p.metaTitle);
    setMetaDescription(p.metaDescription);
    setCover(p.cover);
    setPublish(p.published);
    setMode("edit");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ── SEO checklist (advisory) ── */
  const words = useMemo(() => countWords(content), [content]);
  const checklist = useMemo(
    () => [
      { ok: title.trim().length >= 20, label: "عنوان حداقل ۲۰ حرف" },
      {
        ok: metaDescription.trim().length >= 70 && metaDescription.trim().length <= 160,
        label: "متا دیسکریپشن بین ۷۰ تا ۱۶۰ حرف",
      },
      { ok: Boolean(cover), label: "تصویر شاخص گذاشته شده" },
      { ok: hasH2(content), label: "حداقل یک تیتر H2" },
      { ok: words >= 300, label: "حداقل ۳۰۰ کلمه متن" },
      { ok: imagesMissingAlt(content) === 0, label: "همه تصاویر alt دارند" },
      { ok: hasInternalLink(content), label: "حداقل یک لینک داخلی" },
    ],
    [title, metaDescription, cover, content, words],
  );
  const redCount = checklist.filter((c) => !c.ok).length;

  /* ── cover upload (needs postId → only in edit mode) ── */
  const uploadCover = async (file: File) => {
    if (!editingId) return;
    if (file.size > MAX_UPLOAD) {
      toast({ title: "فایل بزرگه!", description: "حداکثر حجم تصویر ۵ مگابایت است." });
      return;
    }
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("slot", "cover");
      form.append("postId", editingId);
      const res = await fetch("/api/admin/posts/image", { method: "POST", body: form });
      const j = (await res.json().catch(() => ({}))) as { url?: string };
      if (!res.ok || !j.url) throw new Error();
      setCover(j.url);
      setCoverKeyOverride(null);
      toast({ title: "تصویر شاخص ثبت شد ✓" });
    } catch {
      toast({ title: "آپلود نشد!", description: "دوباره تلاش کن." });
    } finally {
      setUploading(false);
    }
  };

  const removeCover = async () => {
    setCover(null);
    if (editingId) {
      try {
        const res = await fetch(`/api/admin/posts/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ coverKey: "" }),
        });
        if (!res.ok) throw new Error();
      } catch {
        toast({ title: "حذف تصویر انجام نشد!", description: "دوباره تلاش کن." });
        return;
      }
    }
    setCoverKeyOverride(null);
  };

  /* ── save (POST create / PATCH update) ── */
  const submit = async () => {
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
      const payload: Record<string, unknown> = {
        title: title.trim(),
        ...(slug ? { slug } : {}),
        excerpt: excerpt.trim(),
        content: content.trim(),
        tags: tags.trim(),
        metaTitle: metaTitle.trim(),
        metaDescription: metaDescription.trim(),
        publish,
      };
      if (editingId && coverKeyOverride !== null) payload.coverKey = coverKeyOverride;
      const res = await fetch(editingId ? `/api/admin/posts/${editingId}` : "/api/admin/posts", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const b = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        post?: { id: string; slug: string; published: boolean };
      };
      if (res.status === 409) {
        setErr("این اسلاگ قبلاً استفاده شده — یه اسلاگ دیگه بزن یا خالی بذار.");
        return;
      }
      if (!res.ok || !b.post) {
        setErr("ذخیره نشد — فیلدها رو چک کن (عنوان ≥۳، متن ≥۵۰ حرف).");
        return;
      }
      if (!editingId) {
        // first save → switch to edit mode so the cover pipeline unlocks
        setEditingId(b.post.id);
        setSlug(b.post.slug);
        setSlugTouched(true);
      }
      setPublish(b.post.published);
      load();
      toast({
        title: editingId ? "تغییرات ذخیره شد ✓" : publish ? "پست منتشر شد ✓" : "پیش‌نویس ذخیره شد ✓",
        description:
          redCount > 0
            ? `${fa(redCount)} مورد قرمز تو چک‌لیست سئو مونده.`
            : "چک‌لیست سئو کاملانه ✓",
      });
    } catch {
      setErr("خطای شبکه — دوباره تلاش کن.");
    } finally {
      setBusy(false);
    }
  };

  const togglePublish = async (p: AdminPost) => {
    try {
      const res = await fetch(`/api/admin/posts/${p.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publish: !p.published }),
      });
      const b = (await res.json().catch(() => ({}))) as { post?: { published: boolean } };
      if (!res.ok || !b.post) throw new Error();
      setPosts((prev) => (prev ?? []).map((d) => (d.id === p.id ? { ...d, published: b.post!.published } : d)));
      toast({ title: b.post.published ? "پست منتشر شد ✓" : "پست از بلاگ برداشته شد" });
    } catch {
      toast({ title: "انجام نشد!", description: "دوباره تلاش کن." });
    }
  };

  const removePost = async (p: AdminPost) => {
    if (!window.confirm(`پست «${p.title}» برای همیشه حذف بشه؟`)) return;
    try {
      const res = await fetch(`/api/admin/posts/${p.id}`, { method: "DELETE" });
      if (!res.ok) {
        toast({ title: "حذف نشد!", description: "حذف پست فقط با حساب مالک ممکنه." });
        return;
      }
      setPosts((prev) => (prev ?? []).filter((d) => d.id !== p.id));
      toast({ title: "پست حذف شد" });
    } catch {
      toast({ title: "خطای شبکه", description: "دوباره تلاش کن." });
    }
  };

  /* ── derived form values ── */
  const onTitleChange = (v: string) => {
    setTitle(v);
    if (!slugTouched && !editingId) setSlug(slugifyClient(v));
  };
  const effectiveSlug = slug || slugifyClient(title);
  const serpTitle = (metaTitle || title || "عنوان پست").slice(0, 70);
  const serpDesc = (metaDescription || excerpt || "خلاصه‌ی پست این‌جا نمایش داده می‌شه — برای گوگل و شبکه‌های اجتماعی.").slice(0, 160);
  const serpSlug = effectiveSlug || "post";

  return (
    <div className="flex flex-col gap-5">
      {/* ── header ── */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-col">
          <h3 className="m-0 text-[17px] font-black text-[#04202E]">بلاگ جعبه آبی</h3>
          <span className="text-[12px] font-semibold text-[#4A6572]">
            {mode === "edit" ? "حالت ادیتور — تغییرات رو ذخیره یادت نره" : "مدیریت پست‌ها و نوشتن با ادیتور حرفه‌ای"}
          </span>
        </div>
        {mode === "edit" ? (
          <button
            type="button"
            onClick={() => {
              if (busy) return;
              setMode("list");
              resetForm();
            }}
            className="h-10 rounded-full bg-[#E3F6FD] px-4 text-[12.5px] font-extrabold text-[#006387] active:scale-95"
          >
            ← بازگشت به لیست
          </button>
        ) : (
          <button
            type="button"
            onClick={startNew}
            className="h-10 rounded-full bg-[#04202E] px-5 text-[13px] font-extrabold text-white transition-transform active:scale-95"
          >
            ✍️ پست جدید
          </button>
        )}
      </div>

      {mode === "edit" ? (
        /* ═══════════ EDITOR MODE ═══════════ */
        <>
          {/* content card */}
          <div className="rounded-[24px] border border-[#DDEEF5] bg-white p-4 md:p-6">
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-[12.5px] font-extrabold text-[#04202E]" htmlFor="bp-title">عنوان پست</label>
                  <span className="text-[11px] font-bold text-[#4A6572]">{fa(title.length)}/۱۲۰</span>
                </div>
                <input
                  id="bp-title"
                  type="text"
                  value={title}
                  onChange={(e) => onTitleChange(e.target.value.slice(0, 120))}
                  placeholder="مثلاً: راهنمای هدیه یلدا با جعبه آبی"
                  className="h-11 w-full rounded-[14px] border-[1.5px] border-[#CFE6EF] bg-white px-3.5 text-[14px] font-semibold text-[#04202E] outline-none focus:border-[#00ABE7]"
                />
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-[12.5px] font-extrabold text-[#04202E]" htmlFor="bp-slug">اسلاگ (آدرس پست)</label>
                  <span className="text-[11px] font-semibold text-[#4A6572]">a-z 0-9 و خط تیره</span>
                </div>
                <input
                  id="bp-slug"
                  type="text"
                  dir="ltr"
                  value={slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-").slice(0, 60));
                  }}
                  placeholder="auto-from-title"
                  className="h-11 w-full rounded-[14px] border-[1.5px] border-[#CFE6EF] bg-white px-3.5 text-left font-mono text-[13px] text-[#04202E] outline-none focus:border-[#00ABE7]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[12.5px] font-extrabold text-[#04202E]" htmlFor="bp-excerpt">خلاصه (≤۳۰۰ حرف)</label>
                <input
                  id="bp-excerpt"
                  type="text"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value.slice(0, 300))}
                  placeholder="یک‌دو جمله‌ای که تو کارت بلاگ دیده می‌شه"
                  className="h-11 w-full rounded-[14px] border-[1.5px] border-[#CFE6EF] bg-white px-3.5 text-[14px] font-semibold text-[#04202E] outline-none focus:border-[#00ABE7]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[12.5px] font-extrabold text-[#04202E]" htmlFor="bp-tags">تگ‌ها (با ویرگول)</label>
                <input
                  id="bp-tags"
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value.slice(0, 120))}
                  placeholder="هدیه، یلدا، عروسک پولیشی"
                  className="h-11 w-full rounded-[14px] border-[1.5px] border-[#CFE6EF] bg-white px-3.5 text-[14px] font-semibold text-[#04202E] outline-none focus:border-[#00ABE7]"
                />
              </div>
            </div>

            <div className="mt-4">
              <span className="mb-1.5 block text-[12.5px] font-extrabold text-[#04202E]">متن پست</span>
              <div className="overflow-hidden rounded-[24px] border border-[#DDEEF5] bg-white shadow-[0_0_0_0_transparent] focus-within:border-[#00ABE7] focus-within:shadow-[0_0_0_3px_rgba(0,171,231,0.15)]">
                <MdxEditor
                  key={editingId ?? "new"}
                  markdown={content}
                  onChange={(md) => setContent(md)}
                />
              </div>
              <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11.5px] font-semibold text-[#4A6572]">
                  باکس‌های برند با دکمه 🧩 · تصویر با 🖼️ · منبع مارک‌داون با کلید «Source»
                </span>
                <span className="text-[11.5px] font-extrabold text-[#4A6572]">
                  {fa(words)} کلمه
                </span>
              </div>
            </div>
          </div>

          {/* cover card */}
          <div className="rounded-[24px] border border-[#DDEEF5] bg-white p-4 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[13.5px] font-black text-[#04202E]">تصویر شاخص</span>
              {cover ? (
                <button
                  type="button"
                  onClick={() => void removeCover()}
                  className="h-9 rounded-full bg-[#FFE9F1] px-4 text-[12px] font-extrabold text-[#B02A52] active:scale-95"
                >
                  حذف تصویر شاخص
                </button>
              ) : (
                <span className="text-[11.5px] font-semibold text-[#4A6572]">
                  {editingId ? "JPG/PNG/WebP — حداکثر ۵ مگابایت" : "برای آپلود تصویر، اول پست رو ذخیره کن 👇"}
                </span>
              )}
            </div>
            <div className="mt-3">
              {cover ? (
                <img
                  src={cover}
                  alt="پیش‌نمایش تصویر شاخص"
                  className="aspect-video w-full rounded-[20px] border border-[#DDEEF5] object-cover"
                />
              ) : (
                <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-[20px] border-2 border-dashed border-[#99D6EE] bg-[#F2FAFD] text-center">
                  <span aria-hidden="true" className="text-[34px]">🖼️</span>
                  <span className="max-w-[340px] text-[12.5px] font-medium leading-[1.9] text-[#4A6572]">
                    {editingId
                      ? "تصویر شاخص تو گوگل و شبکه‌های اجتماعی نمایش داده می‌شه."
                      : "اول «ذخیره» رو بزن تا پست ساخته شه؛ بعد دکمه‌ی آپلود فعال می‌شه."}
                  </span>
                </div>
              )}
            </div>
            <label
              className={`mt-3 inline-flex h-10 cursor-pointer items-center rounded-full px-5 text-[12.5px] font-extrabold ${
                editingId && !uploading ? "bg-[#E3F6FD] text-[#006387] active:scale-95" : "pointer-events-none bg-[#F0F3F5] text-[#8AA2AE]"
              }`}
            >
              {uploading ? "در حال آپلود…" : cover ? "تعویض تصویر" : "آپلود تصویر شاخص"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                disabled={!editingId || uploading}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  e.target.value = "";
                  if (f) void uploadCover(f);
                }}
              />
            </label>
          </div>

          {/* SEO card */}
          <div className="rounded-[24px] border border-[#DDEEF5] bg-white p-4 md:p-6">
            <span className="text-[13.5px] font-black text-[#04202E]">سئو</span>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-[12.5px] font-extrabold text-[#04202E]" htmlFor="bp-mt">عنوان سئو (متا تایتل)</label>
                  <span className={`text-[11px] font-bold ${metaTitle.length <= 70 ? "text-[#2E7D53]" : "text-[#B02A52]"}`}>
                    {fa(metaTitle.length)}/{fa(70)}
                  </span>
                </div>
                <input
                  id="bp-mt"
                  type="text"
                  value={metaTitle}
                  maxLength={70}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="خالی = خود عنوان پست"
                  className="h-11 w-full rounded-[14px] border-[1.5px] border-[#CFE6EF] bg-white px-3.5 text-[14px] font-semibold text-[#04202E] outline-none focus:border-[#00ABE7]"
                />
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-[12.5px] font-extrabold text-[#04202E]" htmlFor="bp-md">توضیحات سئو (متا دیسکریپشن)</label>
                  <span className={`text-[11px] font-bold ${metaDescription.length <= 160 ? "text-[#2E7D53]" : "text-[#B02A52]"}`}>
                    {fa(metaDescription.length)}/{fa(160)}
                  </span>
                </div>
                <input
                  id="bp-md"
                  type="text"
                  value={metaDescription}
                  maxLength={160}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="خالی = خود خلاصه‌ی پست"
                  className="h-11 w-full rounded-[14px] border-[1.5px] border-[#CFE6EF] bg-white px-3.5 text-[14px] font-semibold text-[#04202E] outline-none focus:border-[#00ABE7]"
                />
              </div>
            </div>

            {/* SERP preview — Google-style (intentionally Google's own colors) */}
            <div className="mt-4 rounded-[18px] bg-[#F8F9FA] p-4" dir="rtl">
              <span className="mb-2 block text-[11px] font-bold text-[#4A6572]">پیش‌نمایش نتیجه‌ی گوگل</span>
              <div className="rounded-[12px] bg-white p-4 shadow-sm">
                <span className="block font-mono text-[12px] leading-[1.8] text-[#4D5156]" dir="ltr">
                  {SITE.url.replace("https://", "")} › post?slug={serpSlug}
                </span>
                <span className="mt-0.5 block truncate text-[19px] font-medium leading-[1.6] text-[#1A0DAB]">
                  {serpTitle}
                </span>
                <p className="m-0 mt-1 text-[13.5px] leading-[1.9] text-[#4D5156]">
                  {serpDesc || "…"}
                </p>
              </div>
            </div>

            {/* checklist */}
            <div className="mt-4 rounded-[18px] border border-[#EDF6FA] bg-[#F8FDFF] p-4">
              <div className="flex items-center justify-between">
                <span className="text-[12.5px] font-black text-[#04202E]">چک‌لیست سئو</span>
                <span
                  className="rounded-full px-2.5 py-0.5 text-[11px] font-extrabold"
                  style={{ background: redCount === 0 ? "#D7F5E4" : "#FFF3C9", color: redCount === 0 ? "#2E7D53" : "#8A6D1F" }}
                >
                  {redCount === 0 ? "همه‌چیز سبزه ✓" : `${fa(redCount)} مورد باقی‌مونده`}
                </span>
              </div>
              <ul className="m-0 mt-2.5 flex list-none flex-col gap-1.5 p-0">
                {checklist.map((c) => (
                  <li key={c.label} className="flex items-center gap-2 text-[12.5px] font-semibold">
                    <span aria-hidden="true">{c.ok ? "✅" : "❌"}</span>
                    <span className={c.ok ? "text-[#2E7D53]" : "text-[#B02A52]"}>{c.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* actions */}
          <div className="rounded-[24px] border border-[#DDEEF5] bg-white p-4 md:p-6">
            {err && <span className="mb-2 block text-[12.5px] font-bold text-[#B02A52]">{err}</span>}
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-[13px] font-extrabold text-[#04202E]">
                <input
                  type="checkbox"
                  checked={publish}
                  onChange={(e) => setPublish(e.target.checked)}
                  className="h-5 w-5 accent-[#00ABE7]"
                />
                انتشار در بلاگ
              </label>
              <button
                type="button"
                onClick={() => void submit()}
                disabled={busy}
                className="flex h-11 items-center rounded-full bg-[#04202E] px-7 text-[13.5px] font-extrabold text-white transition-transform active:scale-95 disabled:opacity-60"
              >
                {busy ? "در حال ذخیره…" : editingId ? "ذخیره‌ی تغییرات" : "ذخیره‌ی پیش‌نویس"}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (busy) return;
                  setMode("list");
                  resetForm();
                }}
                className="h-11 rounded-full px-4 text-[13px] font-extrabold text-[#B02A52] underline underline-offset-4"
              >
                انصراف و دور ریختن تغییرات
              </button>
              {editingId && (
                <span className="text-[11.5px] font-semibold text-[#4A6572]">
                  بعد از اولین ذخیره، آپلود تصویر شاخص فعاله.
                </span>
              )}
            </div>
          </div>
        </>
      ) : (
        /* ═══════════ LIST MODE ═══════════ */
        <>
          {loadErr && (
            <div className="rounded-[20px] border-2 border-dashed border-[#F0B7C9] bg-[#FFF7FA] px-6 py-6 text-center text-[13px] font-bold text-[#B02A52]">
              لیست پست‌ها لود نشد — یک بار دیگه تلاش کن.
            </div>
          )}
          {posts === null ? (
            <div className="h-[120px] animate-pulse rounded-[20px] bg-white/70" />
          ) : posts.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-[24px] border-2 border-dashed border-[#99D6EE] bg-white/60 px-6 py-12 text-center">
              <span className="text-[40px]">✍️</span>
              <p className="m-0 text-[14.5px] font-bold">هنوز پستی نیست — با «پست جدید» اولین نوشته‌ی جعبه آبی رو شروع کن.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {posts.map((p) => (
                <div key={p.id} className="flex flex-col gap-3 rounded-[20px] border border-[#DDEEF5] bg-white p-4 md:flex-row md:items-center">
                  {/* thumb */}
                  {p.cover ? (
                    <img
                      src={p.cover}
                      alt=""
                      className="h-12 w-[64px] shrink-0 rounded-[10px] border border-[#DDEEF5] object-cover"
                    />
                  ) : (
                    <span className="flex h-12 w-[64px] shrink-0 items-center justify-center rounded-[10px] border border-dashed border-[#99D6EE] bg-[#F2FAFD] text-[18px]">
                      🖼️
                    </span>
                  )}
                  {/* title + slug + meta */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[14.5px] font-black text-[#04202E]">{p.title}</span>
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[11px] font-extrabold"
                        style={{
                          background: p.published ? "#D7F5E4" : "#FFF3C9",
                          color: p.published ? "#2E7D53" : "#8A6D1F",
                        }}
                      >
                        {p.published ? "منتشرشده" : "پیش‌نویس"}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-[11.5px] font-semibold text-[#4A6572]">
                      <span className="rounded-[8px] bg-[#F2F7F9] px-2 py-0.5 font-mono text-[10.5px]" dir="ltr">
                        {p.slug}
                      </span>
                      <span>آخرین تغییر: {jalaliDateTime(p.updatedAt)}</span>
                    </div>
                  </div>
                  {/* actions */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(p)}
                      className="h-10 rounded-full bg-[#E3F6FD] px-4 text-[12.5px] font-extrabold text-[#006387] active:scale-95"
                    >
                      ویرایش
                    </button>
                    <button
                      type="button"
                      onClick={() => void togglePublish(p)}
                      className="h-10 rounded-full bg-[#D7F5E4] px-4 text-[12.5px] font-extrabold text-[#2E7D53] active:scale-95"
                    >
                      {p.published ? "لغو انتشار" : "انتشار"}
                    </button>
                    {isOwner && (
                      <button
                        type="button"
                        onClick={() => void removePost(p)}
                        className="h-10 rounded-full bg-[#FFE9F1] px-4 text-[12.5px] font-extrabold text-[#B02A52] active:scale-95"
                      >
                        حذف
                      </button>
                    )}
                    {p.published && (
                      <button
                        type="button"
                        onClick={() => navigate("post", { slug: p.slug })}
                        className="h-10 rounded-full px-3 text-[12.5px] font-extrabold text-[#00779F] underline"
                      >
                        دیدن ↗
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
