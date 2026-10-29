"use client";

// ── Persian error boundary — dev.hash-route 500 equivalent (Phase C §4) ──
// A-11 (audit wave 38): render-time crashes are logged as a structured JSON
// line to the console (name/message/digest/timestamp) — best-effort, no deps,
// no network calls (the page must stay renderable even when logging fails).
import { useEffect } from "react";

export default function PishnamError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    try {
      console.error(
        JSON.stringify({
          ts: new Date().toISOString(),
          level: "error",
          scope: "client-boundary",
          path: typeof window !== "undefined" ? window.location.hash || "/" : "",
          name: error.name,
          message: error.message,
          digest: error.digest,
          stack: error.stack?.split("\n").slice(0, 6).join(" | "),
        }),
      );
    } catch {
      /* best-effort */
    }
  }, [error]);

  return (
    <div
      dir="rtl"
      className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[#F2FAFD] px-6 py-16 text-center"
    >
      <span className="text-6xl" aria-hidden="true">
        💔
      </span>
      <h1 className="text-2xl font-black text-[#04202E]">ای وای، یه اتفاق غیرمنتظره افتاد!</h1>
      <p className="max-w-sm text-sm leading-7 text-[#4A6572]">
        مشکل سمت ما بود، نه شماش. لطفاً دوباره امتحان کن — اگه تکرار شد، بعداً سر بزن؛ درستش می‌کنیم.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-[#04202E] px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.03] active:scale-95"
        >
          تلاش دوباره
        </button>
        <button
          type="button"
          onClick={() => {
            window.location.assign("/");
            window.location.reload();
          }}
          className="rounded-full border-2 border-[#04202E]/15 px-6 py-3 text-sm font-bold text-[#04202E] transition-colors hover:bg-white"
        >
          رفتن به خانه
        </button>
      </div>
      {error.digest ? (
        <span className="text-[11px] text-[#4A6572]/60">کد پیگیری خطا: {error.digest}</span>
      ) : null}
    </div>
  );
}
