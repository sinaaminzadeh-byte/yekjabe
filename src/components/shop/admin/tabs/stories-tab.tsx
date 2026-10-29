"use client";

// ── «تجربه‌ها» tab (A-02 split) — customer story moderation (Phase C) ──
// UX-09 (audit wave 38): customer photos render as REAL thumbnails (grid) with
// a click-to-preview lightbox instead of a 📷 emoji. The bytes stream through
// the admin-gated /api/admin/experiences/{id}/photo route — the private
// experiences/ folder is unreachable from the public /api/media on purpose.
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { OCCASIONS } from "@/lib/pishnam-data";
import { adminFetch, invalidateAdminCache } from "@/components/shop/admin/admin-cache";

type ExpFilter = "pending" | "published" | "rejected";

interface AdminExperience {
  id: string;
  name: string;
  city: string;
  occasion: number;
  body: string;
  photoKey: string;
  status: string;
  createdAt: string;
}

const EXP_FILTERS: { key: ExpFilter; label: string }[] = [
  { key: "pending", label: "در انتظار تأیید" },
  { key: "published", label: "منتشرشده" },
  { key: "rejected", label: "ردشده" },
];

export function StoriesModTab() {
  const [filter, setFilter] = useState<ExpFilter>("pending");
  const [exps, setExps] = useState<AdminExperience[] | null>(null);
  const [error, setError] = useState(false);
  const [photoOf, setPhotoOf] = useState<string | null>(null); // UX-09 lightbox
  const { toast } = useToast();

  const load = (f: ExpFilter) => {
    adminFetch<{ experiences?: AdminExperience[] }>(`/api/admin/experiences?status=${f}`)
      .then((j) => {
        setExps(j.experiences ?? []);
        setError(false);
      })
      .catch(() => setError(true));
  };

  useEffect(() => {
    load(filter);
  }, [filter]);

  const act = async (e: AdminExperience, action: "publish" | "reject") => {
    // optimistic flip, then refetch the current filter to stay honest
    const optimistic = action === "publish" ? "published" : "rejected";
    setExps((prev) => prev?.map((x) => (x.id === e.id ? { ...x, status: optimistic } : x)) ?? prev);
    try {
      const res = await fetch(`/api/admin/experiences/${e.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (!res.ok) throw new Error();
      invalidateAdminCache();
      toast({
        title: action === "publish" ? "تجربه منتشر شد ✓" : "تجربه مخفی شد",
        description: `${e.name} — ${action === "publish" ? "الان تو «تجربه مخاطب» می‌بیننش." : "دیگه جایی نمایش داده نمی‌شه."}`,
      });
    } catch {
      toast({ title: "انجام نشد!", description: "دوباره تلاش کن." });
    }
    load(filter);
  };

  if (error) {
    return (
      <div className="rounded-[24px] border-2 border-dashed border-[#F0B7C9] bg-[#FFF7FA] px-6 py-10 text-center text-[14px] font-bold text-[#B02A52]">
        اتصال به سرور برقرار نشد.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* filter chips */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {EXP_FILTERS.map((f) => {
          const on = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(f.key)}
              className="h-10 shrink-0 rounded-full px-4 text-[13px] font-bold transition-all"
              style={{
                background: on ? "#04202E" : "#fff",
                border: `1.5px solid ${on ? "#04202E" : "#CFE6EF"}`,
                color: on ? "#fff" : "#04202E",
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {exps === null ? (
        <div className="flex flex-col gap-3">
          {[0, 1].map((i) => (
            <div key={i} className="h-[110px] animate-pulse rounded-[20px] bg-white/70" />
          ))}
        </div>
      ) : exps.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-[24px] border-2 border-dashed border-[#99D6EE] bg-white/60 px-6 py-12 text-center">
          <span className="text-[40px]">🎁</span>
          <p className="m-0 text-[14.5px] font-bold">
            {filter === "pending" ? "صف تجربه‌ها خالیه — همه بررسی شدن!" : "این فیلتر خالیه."}
          </p>
        </div>
      ) : (
        exps.map((e) => (
          <div key={e.id} className="rounded-[20px] border border-[#DDEEF5] bg-white p-4 md:p-5">
            <div className="flex gap-4">
              {/* UX-09 — real photo thumbnail (click → lightbox), not an emoji */}
              {e.photoKey && (
                <button
                  type="button"
                  onClick={() => setPhotoOf(e.id)}
                  aria-label="بزرگ‌نمایی عکس تجربه"
                  className="h-[96px] w-[96px] shrink-0 overflow-hidden rounded-[16px] bg-[#F2FAFD]"
                >
                  <img
                    src={`/api/admin/experiences/${e.id}/photo`}
                    alt={`عکس ارسالی ${e.name}`}
                    width={96}
                    height={96}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full cursor-zoom-in object-cover"
                  />
                </button>
              )}
              <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[14px] font-black">
                  {e.name}
                  {e.city ? <span className="font-semibold text-[#4A6572]"> · {e.city}</span> : null}
                </span>
                <span className="rounded-full bg-[#FFF3C9] px-2.5 py-0.5 text-[11px] font-extrabold text-[#8A6D1F]">
                  {OCCASIONS[e.occasion] ?? OCCASIONS[0]}
                </span>
                {e.photoKey && <span title="با عکس همراه بوده">📷</span>}
                <span
                  className="rounded-full px-3 py-1 text-[11px] font-extrabold"
                  style={{
                    background: e.status === "published" ? "#D7F5E4" : e.status === "pending" ? "#FFF3C9" : "#FFE9F0",
                    color: e.status === "published" ? "#2E7D53" : e.status === "pending" ? "#8A6D1F" : "#B02A52",
                  }}
                >
                  {e.status === "published" ? "منتشرشده" : e.status === "pending" ? "در انتظار" : "ردشده"}
                </span>
              </div>
              <span className="text-[11.5px] font-semibold text-[#4A6572]">
                {new Intl.DateTimeFormat("fa-IR", { dateStyle: "short" }).format(new Date(e.createdAt))}
              </span>
            </div>
            <p className="mb-0 mt-2 whitespace-pre-line text-[13px] font-medium leading-[1.95] text-[#1F3E4D]">{e.body}</p>
            <div className="mt-3 flex flex-wrap gap-2 border-t border-[#EDF6FA] pt-3">
              {(e.status === "pending" || e.status === "rejected") && (
                <button
                  type="button"
                  onClick={() => void act(e, "publish")}
                  className="h-10 rounded-full bg-[#D7F5E4] px-4 text-[12.5px] font-extrabold text-[#2E7D53] active:scale-95"
                >
                  انتشار
                </button>
              )}
              {(e.status === "pending" || e.status === "published") && (
                <button
                  type="button"
                  onClick={() => void act(e, "reject")}
                  className="h-10 rounded-full bg-[#FFE9F0] px-4 text-[12.5px] font-extrabold text-[#B02A52] active:scale-95"
                >
                  {e.status === "published" ? "لغو انتشار" : "رد"}
                </button>
              )}
            </div>
              </div>
            </div>
          </div>
        ))
      )}

      {/* UX-09 — photo lightbox (same visual language as the receipt preview) */}
      {photoOf && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#04202E]/70 p-6"
          role="dialog"
          aria-modal="true"
          aria-label="پیش‌نمایش عکس تجربه"
          onClick={() => setPhotoOf(null)}
        >
          <div className="flex max-h-full flex-col items-center gap-3" onClick={(ev) => ev.stopPropagation()}>
            <img
              src={`/api/admin/experiences/${photoOf}/photo`}
              alt="پیش‌نمایش کامل عکس تجربه"
              className="max-h-[78vh] max-w-full rounded-[16px]"
            />
            <span className="flex items-center gap-2">
              <a
                href={`/api/admin/experiences/${photoOf}/photo?download=1`}
                className="flex h-10 items-center rounded-full bg-white px-4 text-[12.5px] font-extrabold text-[#04202E]"
              >
                دانلود ⤓
              </a>
              <button type="button" onClick={() => setPhotoOf(null)} className="flex h-10 items-center rounded-full border border-white/50 px-4 text-[12.5px] font-extrabold text-white">
                بستن
              </button>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
