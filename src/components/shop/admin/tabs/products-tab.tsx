"use client";

// ── «محصولات» tab (A-02 split) — inventory shelf + addon creator + gallery ──
import { useEffect, useState } from "react";
import { fa } from "@/lib/fa";
import { useToast } from "@/hooks/use-toast";
import { GallerySpinner } from "@/components/shop/admin/admin-ui";
import { adminFetch, invalidateAdminCache } from "@/components/shop/admin/admin-cache";

interface AdminProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  kind: "main_gift" | "addon";
  emoji: string;
  image: string | null;
  images: { id: string; url: string; alt: string; sortOrder: number }[];
  sizeLabel: string;
  colors: string;
  specs: string;
  isActive: boolean;
  variant: { id: string; sku: string; priceToman: number; stock: number; isActive: boolean } | null;
}

interface SpecRow {
  label: string;
  value: string;
}

// «مشخصات و ظاهر» — gallery cap is server-enforced too (products/[id]/images)
const GALLERY_MAX = 6;

// specs lives as a JSON string column — legacy/junk rows must never crash the panel
function isSpecRow(r: unknown): r is SpecRow {
  return (
    typeof r === "object" &&
    r !== null &&
    typeof (r as { label?: unknown }).label === "string" &&
    typeof (r as { value?: unknown }).value === "string"
  );
}

function parseSpecs(raw: string): SpecRow[] {
  try {
    const arr: unknown = JSON.parse(raw || "[]");
    if (!Array.isArray(arr)) return [];
    return arr
      .filter(isSpecRow)
      .slice(0, 12)
      .map((r) => ({ label: r.label, value: r.value }));
  } catch {
    return [];
  }
}

export function ProductsTab() {
  const [products, setProducts] = useState<AdminProduct[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState({ name: "", emoji: "🎁", price: "", stock: "20", description: "" });
  const [busy, setBusy] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null); // expanded edit card
  const [edit, setEdit] = useState({ name: "", emoji: "", description: "", price: "", stock: "" });
  const [galleryBusyId, setGalleryBusyId] = useState<string | null>(null); // any in-flight gallery op
  const [uploadProgress, setUploadProgress] = useState<{ productId: string; done: number; total: number } | null>(null);
  const [altDraft, setAltDraft] = useState(""); // alt applied to the next uploads
  const [attrs, setAttrs] = useState<{ sizeLabel: string; colors: string; rows: SpecRow[] }>({ sizeLabel: "", colors: "", rows: [] });
  const { toast } = useToast();

  const load = (fresh = false) => {
    adminFetch<{ products?: AdminProduct[] }>("/api/admin/products", { fresh })
      .then((j) => {
        setProducts(j.products ?? []);
        setError(null);
      })
      .catch(() => setError("اتصال به سرور برقرار نشد."));
  };

  useEffect(() => {
    load();
  }, []);

  const patch = async (p: AdminProduct, body: Record<string, unknown>, okMsg = "ذخیره شد ✓") => {
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/products/${p.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const b = (await res.json().catch(() => ({}))) as { error?: string };
        toast({
          title: "ذخیره نشد",
          description: b.error === "bad_input" ? "مقدار واردشده معتبر نیست." : "خطای سرور — دوباره تلاش کن.",
        });
        return false;
      }
      toast({ title: okMsg });
      invalidateAdminCache();
      load(true);
      return true;
    } catch {
      toast({ title: "ذخیره نشد — دوباره امتحان کن" });
      return false;
    } finally {
      setBusy(false);
    }
  };

  const createAddon = async () => {
    const price = Number(draft.price.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/\D/g, ""));
    if (draft.name.trim().length < 2 || !Number.isFinite(price) || price <= 0) {
      toast({ title: "اسم و قیمت معتبر لازمه" });
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: draft.name.trim(),
          kind: "addon",
          emoji: draft.emoji.trim() || "🎁",
          description: draft.description.trim(),
          priceToman: price,
          stock: Number(draft.stock.replace(/\D/g, "")) || 0,
        }),
      });
      if (!res.ok) throw new Error();
      toast({ title: "افزودنی جدید ثبت شد ✓", description: "از الان تو سبد خرید مشتری‌ها می‌افته." });
      setDraft({ name: "", emoji: "🎁", price: "", stock: "20", description: "" });
      setCreating(false);
      invalidateAdminCache();
      load(true);
    } catch {
      toast({ title: "ثبت نشد — دوباره امتحان کن" });
    } finally {
      setBusy(false);
    }
  };

  // ── گالری تصاویر (round 34): multi-upload / reorder / delete via /images API ──
  const galleryErrText = (code: string | undefined) =>
    code === "gallery_full"
      ? "سقف گالری ۶ عکسه."
      : code === "file_too_large"
        ? "حجم عکس بیشتر از ۵ مگابایته."
        : code === "bad_file_type"
          ? "فقط عکس JPG / PNG / WebP قبوله."
          : "آپلود نشد — دوباره تلاش کن.";

  const uploadImages = async (p: AdminProduct, files: File[]) => {
    if (!files.length) return;
    const room = GALLERY_MAX - p.images.length;
    if (room <= 0) {
      toast({ title: "سقف گالری ۶ عکسه", description: "برای عکس جدید، اول یکی از عکس‌ها رو حذف کن." });
      return;
    }
    const queue = files.slice(0, room);
    if (files.length > room) {
      toast({ title: `${fa(files.length - room)} عکس جا نشد`, description: `فقط جا برای ${fa(room)} عکس دیگه هست.` });
    }
    setGalleryBusyId(p.id);
    let done = 0;
    for (const file of queue) {
      setUploadProgress({ productId: p.id, done, total: queue.length });
      try {
        const fd = new FormData();
        fd.set("file", file);
        const alt = altDraft.trim().slice(0, 120);
        if (alt) fd.set("alt", alt);
        const res = await fetch(`/api/admin/products/${p.id}/images`, { method: "POST", body: fd });
        const b = (await res.json().catch(() => ({}))) as { error?: string };
        if (!res.ok) {
          toast({ title: `«${file.name}» ذخیره نشد`, description: galleryErrText(b.error) });
          if (b.error === "gallery_full") break; // server is the source of truth on the cap
        } else {
          done++;
        }
      } catch {
        toast({ title: `«${file.name}» آپلود نشد`, description: "دوباره تلاش کن." });
      }
    }
    setUploadProgress(null);
    setGalleryBusyId(null);
    if (done > 0) {
      toast({
        title: done === 1 ? "عکس ثبت شد ✓" : `${fa(done)} عکس ثبت شد ✓`,
        description: "اولین عکس، کاور محصول می‌شه و تو صفحه‌ی خرید نمایش داده می‌شه.",
      });
      setAltDraft("");
      invalidateAdminCache();
      load(true);
    }
  };

  const moveImage = async (p: AdminProduct, imageId: string, dir: -1 | 1) => {
    const ordered = [...p.images].sort((a, b) => a.sortOrder - b.sortOrder);
    const idx = ordered.findIndex((i) => i.id === imageId);
    const next = idx + dir;
    if (idx < 0 || next < 0 || next >= ordered.length) return;
    const order = [...ordered];
    const tmp = order[idx];
    order[idx] = order[next];
    order[next] = tmp;
    setGalleryBusyId(p.id);
    try {
      const res = await fetch(`/api/admin/products/${p.id}/images`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: order.map((i) => i.id) }),
      });
      if (!res.ok) throw new Error();
      invalidateAdminCache();
      load(true);
    } catch {
      toast({ title: "جابه‌جایی نشد — دوباره تلاش کن" });
    } finally {
      setGalleryBusyId(null);
    }
  };

  const deleteImage = async (p: AdminProduct, imageId: string) => {
    setGalleryBusyId(p.id);
    try {
      const res = await fetch(`/api/admin/products/${p.id}/images?imageId=${encodeURIComponent(imageId)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      toast({ title: "عکس حذف شد" });
      invalidateAdminCache();
      load(true);
    } catch {
      toast({ title: "حذف نشد — دوباره تلاش کن" });
    } finally {
      setGalleryBusyId(null);
    }
  };

  // ── مشخصات و ظاهر — separate save (price/stock keep their own flow) ──
  const saveAttrs = async (p: AdminProduct) => {
    const specs = attrs.rows
      .map((r) => ({ label: r.label.trim().slice(0, 40), value: r.value.trim().slice(0, 120) }))
      .filter((r) => r.label !== "" && r.value !== "");
    await patch(
      p,
      {
        sizeLabel: attrs.sizeLabel.trim().slice(0, 60),
        colors: attrs.colors.trim().slice(0, 200),
        specs,
      },
      "مشخصات ذخیره شد ✓",
    );
  };

  const openEdit = (p: AdminProduct) => {
    setOpenId(openId === p.id ? null : p.id);
    setEdit({
      name: p.name,
      emoji: p.emoji,
      description: p.description,
      price: String(p.variant?.priceToman ?? 0),
      stock: String(p.variant?.stock ?? 0),
    });
    setAttrs({ sizeLabel: p.sizeLabel ?? "", colors: p.colors ?? "", rows: parseSpecs(p.specs ?? "[]") });
    setAltDraft("");
  };

  const saveEdit = async (p: AdminProduct) => {
    const price = Number(edit.price.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/\D/g, ""));
    const stock = Number(edit.stock.replace(/\D/g, ""));
    const ok = await patch(
      p,
      {
        name: edit.name.trim().length >= 2 ? edit.name.trim() : p.name,
        emoji: edit.emoji.trim() || p.emoji,
        description: edit.description.trim(),
        ...(Number.isFinite(price) ? { priceToman: price } : {}),
        ...(Number.isFinite(stock) ? { stock } : {}),
      },
      "محصول به‌روز شد ✓",
    );
    if (ok) setOpenId(null);
  };

  if (error) {
    return (
      <div className="rounded-[22px] bg-[#FFE9F0] px-5 py-4 text-[13.5px] font-bold text-[#B02A52]">{error}</div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* create form */}
      <div className="rounded-[24px] border border-[#DDEEF5] bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-[16px] font-black">افزودنی جدید</span>
            <span className="text-[12.5px] font-medium text-[#4A6572]">
              محصولات مکمل (دستبند، عروسک، ساعت و…) بدون هیچ تغییر کدی وارد سبد خرید می‌شن.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setCreating((v) => !v)}
            className="h-11 rounded-full bg-[#04202E] px-5 text-[13.5px] font-extrabold text-white"
          >
            {creating ? "بستن فرم" : "+ افزودنی تازه"}
          </button>
        </div>
        {creating && (
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-6">
            <input
              value={draft.emoji}
              onChange={(e) => setDraft({ ...draft, emoji: e.target.value })}
              placeholder="📿"
              aria-label="ایموجی"
              className="h-12 rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3 text-center text-xl md:col-span-1"
            />
            <input
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              placeholder="اسم افزودنی (مثلاً دستبند مهربونی)"
              aria-label="نام محصول"
              className="h-12 rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3 text-[14px] font-bold md:col-span-2"
            />
            <input
              value={draft.price}
              onChange={(e) => setDraft({ ...draft, price: e.target.value })}
              placeholder="قیمت (تومان)"
              aria-label="قیمت به تومان"
              inputMode="numeric"
              className="h-12 rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3 text-[14px] font-bold md:col-span-1"
            />
            <input
              value={draft.stock}
              onChange={(e) => setDraft({ ...draft, stock: e.target.value })}
              placeholder="موجودی"
              aria-label="موجودی"
              inputMode="numeric"
              className="h-12 rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3 text-[14px] font-bold md:col-span-1"
            />
            <button
              type="button"
              disabled={busy}
              onClick={() => void createAddon()}
              className="h-12 rounded-full bg-[#00ABE7] text-[14px] font-extrabold text-[#04202E] disabled:opacity-60 md:col-span-1"
            >
              ثبت
            </button>
            <input
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              placeholder="توضیح کوتاه (اختیاری — تو صفحه جزئیات نمایش داده می‌شه)"
              aria-label="توضیح"
              className="h-12 rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3 text-[14px] md:col-span-6"
            />
          </div>
        )}
      </div>

      {/* list */}
      {products === null ? (
        <div className="rounded-[22px] bg-white px-5 py-6 text-center text-[13px] font-bold text-[#4A6572]">در حال بارگذاری…</div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {products.map((p) => {
            const expanded = openId === p.id;
            const orderedImages = [...(p.images ?? [])].sort((a, b) => a.sortOrder - b.sortOrder);
            return (
              <div key={p.id} className="flex flex-col rounded-[22px] border border-[#DDEEF5] bg-white px-4 py-3.5">
                <div className="flex flex-wrap items-center gap-3">
                  {/* photo / emoji */}
                  <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[16px] bg-[#F2FAFD]">
                    {p.image ? (

                      <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-2xl" aria-hidden="true">{p.emoji || "🎁"}</span>
                    )}
                    {galleryBusyId === p.id && (
                      <span className="absolute inset-0 flex items-center justify-center bg-white/70 text-[10px] font-black text-[#006387]">…</span>
                    )}
                  </span>
                  <div className="flex min-w-[160px] flex-1 flex-col gap-0.5">
                    <span className="flex items-center gap-2 text-[14.5px] font-extrabold">
                      {p.name}
                      <span
                        className="rounded-full px-2 py-0.5 text-[9.5px] font-extrabold"
                        style={{ background: p.kind === "addon" ? "#E3F6FD" : "#F2F7F9", color: p.kind === "addon" ? "#006387" : "#4A6572" }}
                      >
                        {p.kind === "addon" ? "افزودنی" : "هدیه اصلی"}
                      </span>
                    </span>
                    <span className="font-mono text-[11px] text-[#4A6572]" dir="ltr">{p.variant?.sku ?? p.slug}</span>
                  </div>
                  <label className="flex items-center gap-1.5 text-[11.5px] font-bold text-[#4A6572]">
                    قیمت
                    <input
                      defaultValue={p.variant?.priceToman ?? 0}
                      onBlur={(e) => {
                        const v = Number(e.target.value.replace(/\D/g, ""));
                        if (Number.isFinite(v) && v !== p.variant?.priceToman) void patch(p, { priceToman: v });
                      }}
                      aria-label={`قیمت ${p.name}`}
                      inputMode="numeric"
                      className="h-10 w-[110px] rounded-xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-2 text-center text-[13px] font-bold"
                    />
                  </label>
                  <label className="flex items-center gap-1.5 text-[11.5px] font-bold text-[#4A6572]">
                    موجودی
                    <input
                      defaultValue={p.variant?.stock ?? 0}
                      onBlur={(e) => {
                        const v = Number(e.target.value.replace(/\D/g, ""));
                        if (Number.isFinite(v) && v !== p.variant?.stock) void patch(p, { stock: v });
                      }}
                      aria-label={`موجودی ${p.name}`}
                      inputMode="numeric"
                      className="h-10 w-[72px] rounded-xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-2 text-center text-[13px] font-bold"
                    />
                  </label>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void patch(p, { isActive: !p.isActive })}
                    className="h-10 rounded-full px-4 text-[12px] font-extrabold disabled:opacity-60"
                    style={{ background: p.isActive ? "#DDF3EA" : "#F2F7F9", color: p.isActive ? "#0B6E4F" : "#4A6572" }}
                  >
                    {p.isActive ? "فعال" : "غیرفعال"}
                  </button>
                  <button
                    type="button"
                    onClick={() => openEdit(p)}
                    aria-expanded={expanded}
                    className="h-10 rounded-full border-[1.5px] border-[#CFE6EF] bg-white px-4 text-[12px] font-extrabold text-[#006387]"
                  >
                    {expanded ? "بستن" : "ویرایش"}
                  </button>
                </div>

                {expanded && (
                  <div className="mt-4 flex flex-col gap-4 border-t border-[#EFF6F9] pt-4">
                    {/* ── گالری تصاویر (round 34) ── */}
                    <section className="flex flex-col gap-3 rounded-[16px] border border-[#DDEEF5] bg-[#F8FDFF] p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[13.5px] font-black text-[#04202E]">گالری تصاویر</span>
                        <span className="rounded-full bg-white px-3 py-1 text-[10.5px] font-bold text-[#4A6572]">
                          {orderedImages.length} از {GALLERY_MAX} — اولین عکس، کاور محصوله
                        </span>
                      </div>
                      <div className="flex flex-wrap items-start gap-3">
                        {orderedImages.map((img, idx) => (
                          <span key={img.id} className="flex flex-col items-center gap-1.5">
                            <span className="relative block h-[104px] w-[104px] overflow-hidden rounded-[16px] border-[1.5px] border-[#DDEEF5] bg-white">
                              <img src={img.url} alt={img.alt || p.name} className="h-full w-full object-cover" />
                              {idx === 0 && (
                                <span className="absolute right-1.5 top-1.5 rounded-full bg-[#04202E]/85 px-2 py-0.5 text-[9.5px] font-black text-white">
                                  کاور
                                </span>
                              )}
                              {galleryBusyId === p.id && (
                                <span className="absolute inset-0 flex items-center justify-center bg-white/60">
                                  <GallerySpinner />
                                </span>
                              )}
                            </span>
                            <span className="flex items-center gap-1">
                              <button
                                type="button"
                                disabled={idx === 0 || galleryBusyId === p.id}
                                onClick={() => void moveImage(p, img.id, -1)}
                                aria-label={`عکس ${idx + 1} — جابه‌جایی به راست`}
                                className="flex h-6 w-6 items-center justify-center rounded-lg border-[1.5px] border-[#DDEEF5] bg-white text-[10px] text-[#006387] disabled:opacity-40"
                              >
                                ▶
                              </button>
                              <button
                                type="button"
                                disabled={idx === orderedImages.length - 1 || galleryBusyId === p.id}
                                onClick={() => void moveImage(p, img.id, 1)}
                                aria-label={`عکس ${idx + 1} — جابه‌جایی به چپ`}
                                className="flex h-6 w-6 items-center justify-center rounded-lg border-[1.5px] border-[#DDEEF5] bg-white text-[10px] text-[#006387] disabled:opacity-40"
                              >
                                ◀
                              </button>
                              <button
                                type="button"
                                disabled={galleryBusyId === p.id}
                                onClick={() => void deleteImage(p, img.id)}
                                aria-label={`حذف عکس ${idx + 1}`}
                                className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#FFE9F0] text-[12px] font-black text-[#B02A52] disabled:opacity-40"
                              >
                                ×
                              </button>
                            </span>
                          </span>
                        ))}
                        {orderedImages.length < GALLERY_MAX ? (
                          <label
                            className={`flex h-[104px] w-[104px] cursor-pointer flex-col items-center justify-center gap-1 rounded-[16px] border-[1.5px] border-dashed bg-white text-center transition-colors ${
                              galleryBusyId === p.id ? "border-[#CFE6EF] opacity-70" : "border-[#00ABE7] hover:bg-[#F2FAFD]"
                            }`}
                          >
                            {uploadProgress?.productId === p.id ? (
                              <>
                                <GallerySpinner />
                                <span className="px-1 text-[9.5px] font-bold leading-[1.5] text-[#006387]">
                                  آپلود {fa(uploadProgress.done + 1)} از {fa(uploadProgress.total)}
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="text-xl font-black leading-none text-[#00ABE7]">+</span>
                                <span className="px-1 text-[9.5px] font-bold leading-[1.5] text-[#4A6572]">افزودن عکس</span>
                              </>
                            )}
                            <input
                              type="file"
                              multiple
                              accept="image/jpeg,image/png,image/webp"
                              className="hidden"
                              disabled={galleryBusyId === p.id}
                              onChange={(e) => {
                                const files = Array.from(e.target.files ?? []);
                                e.target.value = "";
                                if (files.length) void uploadImages(p, files);
                              }}
                            />
                          </label>
                        ) : (
                          <span className="flex h-[104px] w-[104px] items-center justify-center rounded-[16px] border-[1.5px] border-dashed border-[#CFE6EF] bg-white px-2 text-center text-[9.5px] font-bold leading-[1.6] text-[#4A6572]">
                            سقف گالری ۶ عکسه
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="flex flex-col gap-1 text-[11px] font-bold text-[#4A6572]">
                          متن جایگزین عکس (اختیاری — موقع آپلود ثبت می‌شه)
                          <input
                            value={altDraft}
                            onChange={(e) => setAltDraft(e.target.value)}
                            maxLength={120}
                            placeholder="مثلاً عروسک پشمالوی قهوه‌ای با روبان کرم"
                            className="h-9 max-w-[340px] rounded-xl border-[1.5px] border-[#CFE6EF] bg-white px-3 text-[12px] font-semibold text-[#04202E]"
                          />
                        </label>
                        <span className="text-[10.5px] font-medium leading-[1.7] text-[#4A6572]">
                          JPG / PNG / WebP — حداکثر ۵ مگابایت — چند عکس رو با هم انتخاب کنی پشت‌سرهم آپلود می‌شن.
                        </span>
                      </div>
                    </section>

                    {/* fields */}
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <label className="flex flex-col gap-1 text-[11.5px] font-bold text-[#4A6572]">
                          نام محصول
                          <input
                            value={edit.name}
                            onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                            className="h-11 rounded-xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3 text-[13.5px] font-bold text-[#04202E]"
                          />
                        </label>
                        <label className="flex flex-col gap-1 text-[11.5px] font-bold text-[#4A6572]">
                          ایموجی (وقتی عکس نباشه نشون داده می‌شه)
                          <input
                            value={edit.emoji}
                            onChange={(e) => setEdit({ ...edit, emoji: e.target.value })}
                            className="h-11 rounded-xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3 text-center text-lg"
                          />
                        </label>
                        <label className="flex flex-col gap-1 text-[11.5px] font-bold text-[#4A6572] md:col-span-2">
                          توضیحات (تو دکمه «جزئیات» صفحه خرید نمایش داده می‌شه)
                          <textarea
                            value={edit.description}
                            onChange={(e) => setEdit({ ...edit, description: e.target.value })}
                            rows={3}
                            maxLength={300}
                            className="rounded-xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3 py-2 text-[13.5px] leading-[1.9] text-[#04202E]"
                          />
                        </label>
                        <label className="flex flex-col gap-1 text-[11.5px] font-bold text-[#4A6572]">
                          قیمت (تومان)
                          <input
                            value={edit.price}
                            onChange={(e) => setEdit({ ...edit, price: e.target.value })}
                            inputMode="numeric"
                            className="h-11 rounded-xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3 text-[13.5px] font-bold text-[#04202E]"
                          />
                        </label>
                        <label className="flex flex-col gap-1 text-[11.5px] font-bold text-[#4A6572]">
                          موجودی
                          <input
                            value={edit.stock}
                            onChange={(e) => setEdit({ ...edit, stock: e.target.value })}
                            inputMode="numeric"
                            className="h-11 rounded-xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3 text-[13.5px] font-bold text-[#04202E]"
                          />
                        </label>
                      </div>

                      {/* ── مشخصات و ظاهر (round 34) — هر دو نوع محصول ── */}
                    <section className="flex flex-col gap-3 rounded-[16px] border border-[#DDEEF5] bg-[#F8FDFF] p-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[13.5px] font-black text-[#04202E]">مشخصات و ظاهر</span>
                        <span className="text-[11.5px] font-medium text-[#4A6572]">
                          برای هدیه‌های اصلی و افزودنی‌ها — تو صفحه‌ی جزئیات محصول نمایش داده می‌شه.
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <label className="flex flex-col gap-1 text-[11.5px] font-bold text-[#4A6572]">
                          اندازه / ابعاد
                          <input
                            value={attrs.sizeLabel}
                            onChange={(e) => setAttrs((a) => ({ ...a, sizeLabel: e.target.value }))}
                            maxLength={60}
                            placeholder="حدود ۳۰ سانتی‌متر"
                            className="h-11 rounded-xl border-[1.5px] border-[#CFE6EF] bg-white px-3 text-[13px] font-bold text-[#04202E]"
                          />
                        </label>
                        <label className="flex flex-col gap-1 text-[11.5px] font-bold text-[#4A6572]">
                          رنگ‌ها (با ویرگول جدا کن)
                          <input
                            value={attrs.colors}
                            onChange={(e) => setAttrs((a) => ({ ...a, colors: e.target.value }))}
                            maxLength={200}
                            placeholder="قهوه‌ای، کرم"
                            className="h-11 rounded-xl border-[1.5px] border-[#CFE6EF] bg-white px-3 text-[13px] font-bold text-[#04202E]"
                          />
                        </label>
                      </div>
                      <span className="text-[11.5px] font-bold text-[#4A6572]">جدول مشخصات</span>
                      {attrs.rows.map((row, i) => (
                        <span key={i} className="flex items-center gap-2">
                          <input
                            value={row.label}
                            onChange={(e) => {
                              const v = e.target.value;
                              setAttrs((a) => ({ ...a, rows: a.rows.map((r, j) => (j === i ? { ...r, label: v } : r)) }));
                            }}
                            maxLength={40}
                            placeholder="عنوان (مثلاً جنس)"
                            className="h-10 min-w-0 flex-1 rounded-xl border-[1.5px] border-[#CFE6EF] bg-white px-3 text-[12.5px] font-bold text-[#04202E]"
                          />
                          <input
                            value={row.value}
                            onChange={(e) => {
                              const v = e.target.value;
                              setAttrs((a) => ({ ...a, rows: a.rows.map((r, j) => (j === i ? { ...r, value: v } : r)) }));
                            }}
                            maxLength={120}
                            placeholder="مقدار (مثلاً پشم و پنبه)"
                            className="h-10 min-w-0 flex-[1.6] rounded-xl border-[1.5px] border-[#CFE6EF] bg-white px-3 text-[12.5px] font-bold text-[#04202E]"
                          />
                          <button
                            type="button"
                            onClick={() => setAttrs((a) => ({ ...a, rows: a.rows.filter((_, j) => j !== i) }))}
                            aria-label={`حذف ردیف ${i + 1}`}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFE9F0] text-[14px] font-black text-[#B02A52]"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      <span className="flex flex-wrap items-center justify-between gap-2">
                        <button
                          type="button"
                          disabled={attrs.rows.length >= 12}
                          onClick={() => setAttrs((a) => ({ ...a, rows: [...a.rows, { label: "", value: "" }] }))}
                          className="h-10 rounded-full border-[1.5px] border-[#CFE6EF] bg-white px-4 text-[11.5px] font-extrabold text-[#006387] disabled:opacity-50"
                        >
                          + ردیف جدید
                        </button>
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => void saveAttrs(p)}
                          className="h-10 rounded-full bg-[#04202E] px-5 text-[11.5px] font-extrabold text-white disabled:opacity-60"
                        >
                          ذخیره مشخصات
                        </button>
                      </span>
                      <span className="text-[10.5px] font-medium leading-[1.7] text-[#4A6572]">
                        ردیف‌هایی که عنوان یا مقدارشون خالی باشه موقع ذخیره حذف می‌شن.
                      </span>
                    </section>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setOpenId(null)}
                        className="h-11 rounded-full border-[1.5px] border-[#CFE6EF] bg-white px-5 text-[12.5px] font-extrabold text-[#4A6572]"
                      >
                        انصراف
                      </button>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void saveEdit(p)}
                        className="h-11 rounded-full bg-[#00ABE7] px-6 text-[12.5px] font-extrabold text-[#04202E] disabled:opacity-60"
                      >
                        ذخیره تغییرات
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
