"use client";

// ── «نظرها» tab (A-02 split) — review moderation ──
import { useEffect, useState } from "react";
import { fa } from "@/lib/fa";
import { useToast } from "@/hooks/use-toast";
import { adminFetch, invalidateAdminCache } from "@/components/shop/admin/admin-cache";

interface AdminReview {
  id: string;
  who: string;
  role: string;
  stars: number;
  kind: string;
  title: string;
  text: string;
  approved: boolean;
  createdAt: string;
}

export function ReviewsTab() {
  const [reviews, setReviews] = useState<AdminReview[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const load = (fresh = false) => {
    adminFetch<{ reviews?: AdminReview[] }>("/api/admin/reviews", { fresh })
      .then((j) => {
        setReviews(j.reviews ?? []);
        setError(null);
      })
      .catch(() => setError("اتصال به سرور برقرار نشد."));
  };

  useEffect(() => {
    load();
  }, []);

  const moderate = async (id: string, approved: boolean) => {
    try {
      const res = await fetch("/api/admin/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, approved }),
      });
      if (!res.ok) throw new Error();
      setReviews((prev) => prev?.map((r) => (r.id === id ? { ...r, approved } : r)) ?? prev);
      invalidateAdminCache();
      toast({ title: approved ? "نظر منتشر شد ✓" : "نظر مخفی شد" });
    } catch {
      toast({ title: "انجام نشد!", description: "دوباره تلاش کن." });
    }
  };

  if (error) {
    return (
      <div className="rounded-[24px] border-2 border-dashed border-[#F0B7C9] bg-[#FFF7FA] px-6 py-10 text-center text-[14px] font-bold text-[#B02A52]">
        {error}
      </div>
    );
  }
  if (reviews === null) {
    return (
      <div className="flex flex-col gap-3">
        {[0, 1].map((i) => (
          <div key={i} className="h-[90px] animate-pulse rounded-[20px] bg-white/70" />
        ))}
      </div>
    );
  }
  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-[24px] border-2 border-dashed border-[#99D6EE] bg-white/60 px-6 py-12 text-center">
        <span className="text-[40px]">💬</span>
        <p className="m-0 text-[14.5px] font-bold">هنوز نظری ثبت نشده.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {reviews.map((r) => (
        <div key={r.id} className={`rounded-[20px] border bg-white p-4 md:p-5 ${r.approved ? "border-[#CBE9D6]" : "border-[#DDEEF5]"}`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[14px] font-black">
              {r.who} · {fa(r.stars)} ★
            </span>
            <span
              className="rounded-full px-3 py-1 text-[11px] font-extrabold"
              style={{ background: r.approved ? "#D7F5E4" : "#FFF3C9", color: r.approved ? "#2E7D53" : "#8A6D1F" }}
            >
              {r.approved ? "منتشرشده" : "در انتظار تأیید"}
            </span>
          </div>
          <p className="mb-0 mt-2 text-[13px] font-semibold leading-[1.9] text-[#04202E]">{r.text}</p>
          <div className="mt-3 flex gap-2 border-t border-[#EDF6FA] pt-3">
            <button
              type="button"
              onClick={() => void moderate(r.id, true)}
              className="h-10 rounded-full bg-[#D7F5E4] px-4 text-[12.5px] font-extrabold text-[#2E7D53] active:scale-95"
            >
              انتشار
            </button>
            <button
              type="button"
              onClick={() => void moderate(r.id, false)}
              className="h-10 rounded-full bg-[#FFE9F0] px-4 text-[12.5px] font-extrabold text-[#B02A52] active:scale-95"
            >
              مخفی
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
