"use client";

// ── global-error.tsx — last-resort boundary for LAYOUT-level crashes (A-11) ──
// error.tsx only catches page-content crashes; a crash inside the root layout
// falls through to here. Same Persian visual language, and the crash is logged
// as a structured JSON line (best-effort, no deps, no network).
// NOTE: global-error MUST render its own <html>/<body> (Next.js contract).
import { useEffect } from "react";

export default function GlobalError({
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
          scope: "global-boundary",
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
    <html lang="fa" dir="rtl">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          background: "#F2FAFD",
          fontFamily: "Vazirmatn, Tahoma, sans-serif",
          color: "#04202E",
          textAlign: "center",
          padding: 24,
        }}
      >
        <h1 style={{ fontSize: 22, margin: 0 }}>خطای غیرمنتظره در برنامه</h1>
        <p style={{ maxWidth: 380, fontSize: 14, lineHeight: 2, color: "#4A6572", margin: 0 }}>
          مشکل سمت ما بود. یک‌بار تلاش کن؛ اگه تکرار شد بعداً سر بزن.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            background: "#04202E",
            color: "#fff",
            border: "none",
            borderRadius: 999,
            padding: "10px 24px",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          تلاش دوباره
        </button>
        {error.digest ? <span style={{ fontSize: 11, color: "#7C99A6" }}>کد پیگیری خطا: {error.digest}</span> : null}
      </body>
    </html>
  );
}
