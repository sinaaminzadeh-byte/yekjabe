"use client";

// ── استودیو هدیه — ضبط واقعی ویس/ویدیو/عکس + آپلود (owner round 29) ──
// Ported from design-checkout style 3 onto the REAL order flow:
//  • MediaRecorder/getUserMedia capture (voice, video, photo-frame) — no
//    simulated placeholders in production: if permission is denied the row
//    shows an error and the owner can still UPLOAD a file.
//  • Every capture/upload lands in the pishnam store via addMediaFile(), so
//    recordings ride the existing private upload pipeline (POST /api/gifts/media
//    at checkout, recipient-verified viewing, retention purge). Max 3 files /
//    10MB — one slot per kind; replacing a kind removes the previous file.
//  • Used by BOTH the mobile wizard (flow.tsx) and the desktop builder
//    (builder.tsx) — pass variant="desktop" for the bigger paddings.
import { useEffect, useRef, useState } from "react";
import { usePishnam, getMediaFile, type MediaFileMeta } from "@/lib/pishnam-store";
import { fa } from "@/lib/fa";
import { useToast } from "@/hooks/use-toast";

type MediaKind = "voice" | "video" | "photo";

const KIND_META: Record<MediaKind, { title: string; sub: string; emoji: string; accentBg: string }> = {
  voice: { title: "ویس صوتی", sub: "یه چند ثانیه حرف از ته دلت — ضبط کن یا از گالری بذار", emoji: "🎙️", accentBg: "#FFE9F0" },
  video: { title: "ویدیوی کوتاه", sub: "با چهره‌ی خودت تبریک بگو", emoji: "🎥", accentBg: "#E3F6FD" },
  photo: { title: "عکس", sub: "یه عکس از همین لحظه، یا از گالری", emoji: "📷", accentBg: "#E5F8EC" },
};

const KIND_ACCEPT: Record<MediaKind, string> = {
  voice: "audio/mpeg,audio/mp4,audio/wav,audio/ogg,audio/webm,audio/x-m4a",
  video: "video/mp4,video/webm",
  photo: "image/jpeg,image/png,image/webp",
};

function fmtSecs(total: number): string {
  const m = Math.floor(total / 60);
  const r = total % 60;
  return `${fa(m)}:${fa(String(r).padStart(2, "0"))}`;
}

/** One slot = kind → store meta id (File lives in the store's memory map). */
interface Slot {
  metaId: string;
  name: string;
  url: string; // object URL for the preview player
  seconds: number;
}

export function MediaStudio({ variant = "mobile" }: { variant?: "mobile" | "desktop" }) {
  const mediaFiles = usePishnam((s) => s.mediaFiles);
  const addMediaFile = usePishnam((s) => s.addMediaFile);
  const removeMediaFile = usePishnam((s) => s.removeMediaFile);
  const { toast } = useToast();

  const [slots, setSlots] = useState<Record<MediaKind, Slot | null>>({ voice: null, video: null, photo: null });
  const [recKind, setRecKind] = useState<MediaKind | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [err, setErr] = useState<Partial<Record<MediaKind, string>>>({});
  const secondsRef = useRef(0);
  const recRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // keep an object-URL per store meta so previews survive re-renders
  const urlMap = useRef(new Map<string, string>());
  const urlFor = (m: MediaFileMeta): string => {
    let u = urlMap.current.get(m.id);
    if (!u) {
      const f = getMediaFile(m.id);
      if (f) {
        u = URL.createObjectURL(f);
        urlMap.current.set(m.id, u);
      }
    }
    return u ?? "";
  };

  // hydrate slots from the store on mount (File objects live only in memory —
  // a meta that survived a page reload without its File is DEAD: drop it from
  // the store so previews never render an empty src and checkout never counts it)
  useEffect(() => {
    const metas = usePishnam.getState().mediaFiles;
    for (const m of metas) {
      if (!getMediaFile(m.id)) {
        usePishnam.getState().removeMediaFile(m.id);
      }
    }
    setSlots((prev) => {
      const next = { ...prev };
      for (const m of usePishnam.getState().mediaFiles) {
        const kind = m.kind === "audio" ? "voice" : m.kind === "video" ? "video" : "photo";
        if (!next[kind]) {
          next[kind] = { metaId: m.id, name: m.name, url: urlFor(m), seconds: 0 };
        }
      }
      return next;
    });
  }, []);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  const stopTracks = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  };

  /** kind → store mediaKind */
  const storeKind = (k: MediaKind) => (k === "voice" ? "audio" : k);

  /** Persists a captured/uploaded blob into the store (replacing the slot). */
  const persist = (kind: MediaKind, blob: Blob, name: string, seconds: number) => {
    const ext = blob.type.includes("mp4") ? "mp4" : blob.type.includes("mpeg") ? "mp3" : blob.type.includes("wav") ? "wav" : blob.type.includes("png") ? "png" : blob.type.includes("webp") ? "webp" : "webm";
    const file = new File([blob], `${kind}-${Date.now()}.${ext}`, { type: blob.type });
    // one slot per kind — drop the previous file of THIS kind first
    const old = slots[kind];
    if (old) removeMediaFile(old.metaId);
    const r = addMediaFile(file);
    if (!r.ok) {
      const msg = r.error === "file_too_large" ? "حجمش بیشتر از ۱۰ مگابایته" : r.error === "too_many_files" ? "بیشتر از ۳ فایل نمی‌شه" : "این فرمت قبول نیست";
      setErr((e) => ({ ...e, [kind]: msg }));
      toast({ title: "ذخیره نشد", description: msg });
      return;
    }
    // addMediaFile generated a meta — find it (latest of this kind)
    const meta = usePishnam.getState().mediaFiles[usePishnam.getState().mediaFiles.length - 1];
    const url = URL.createObjectURL(file);
    urlMap.current.set(meta.id, url);
    setSlots((s) => ({ ...s, [kind]: { metaId: meta.id, name, url, seconds } }));
    setErr((e) => ({ ...e, [kind]: undefined }));
  };

  const start = async (kind: MediaKind) => {
    if (recKind) return;
    setErr((e) => ({ ...e, [kind]: undefined }));
    secondsRef.current = 0;
    setSeconds(0);
    clearTimer();
    timerRef.current = setInterval(() => {
      secondsRef.current += 1;
      setSeconds(secondsRef.current);
    }, 1000);
    try {
      const md = navigator.mediaDevices;
      if (!md?.getUserMedia || typeof MediaRecorder === "undefined") throw new Error("unsupported");
      const stream =
        kind === "voice"
          ? await md.getUserMedia({ audio: true })
          : await md.getUserMedia({ video: { facingMode: "user" }, audio: kind === "video" });
      if (kind === "photo") {
        // grab a single frame, then release the camera immediately
        const v = document.createElement("video");
        v.srcObject = stream;
        v.muted = true;
        v.playsInline = true;
        try {
          await v.play();
        } catch {
          /* autoplay policy — frame may still be available */
        }
        await new Promise((r) => setTimeout(r, 400));
        const canvas = document.createElement("canvas");
        canvas.width = v.videoWidth || 640;
        canvas.height = v.videoHeight || 480;
        canvas.getContext("2d")?.drawImage(v, 0, 0, canvas.width, canvas.height);
        stream.getTracks().forEach((t) => t.stop());
        clearTimer();
        canvas.toBlob((b) => {
          if (b) persist("photo", b, "عکس ضبط‌شده", 0);
        }, "image/jpeg", 0.9);
        return;
      }
      streamRef.current = stream;
      const rec = new MediaRecorder(stream);
      chunksRef.current = [];
      rec.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      rec.onstop = () => {
        const type = rec.mimeType || (kind === "voice" ? "audio/webm" : "video/webm");
        const blob = new Blob(chunksRef.current, { type });
        persist(kind, blob, kind === "voice" ? "ویس ضبط‌شده" : "ویدیوی ضبط‌شده", secondsRef.current);
        stopTracks();
      };
      recRef.current = rec;
      rec.start();
      setRecKind(kind);
    } catch {
      clearTimer();
      setErr((e) => ({
        ...e,
        [kind]:
          kind === "photo"
            ? "دسترسی به دوربین داده نشد — می‌تونی عکس رو از گالری آپلود کنی"
            : "دسترسی به میکروفون/دوربین داده نشد — می‌تونی فایل آماده رو آپلود کنی",
      }));
    }
  };

  // wire the live camera preview when the <video> mounts (ref callback —
  // keeps refs out of render logic so the lint rules stay happy)
  const attachVideo = (el: HTMLVideoElement | null) => {
    videoRef.current = el;
    if (el && streamRef.current) {
      el.srcObject = streamRef.current;
      void el.play().catch(() => {});
    }
  };

  const stop = () => {
    clearTimer();
    if (!recKind) return;
    setRecKind(null);
    try {
      recRef.current?.stop();
    } catch {
      /* already stopped */
    }
    recRef.current = null;
  };

  const remove = (kind: MediaKind) => {
    const s = slots[kind];
    if (s) {
      removeMediaFile(s.metaId);
      const u = urlMap.current.get(s.metaId);
      if (u) {
        URL.revokeObjectURL(u);
        urlMap.current.delete(s.metaId);
      }
    }
    setSlots((prev) => ({ ...prev, [kind]: null }));
  };

  // unmount: release camera/mic and timers
  useEffect(
    () => () => {
      clearTimer();
      try {
        if (recRef.current?.state === "recording") recRef.current.stop();
      } catch {
        /* ignore */
      }
      stopTracks();
    },
    [],
  );

  const big = variant === "desktop";

  return (
    <div className={big ? "flex flex-col gap-2.5" : "flex flex-col gap-2"}>
      {(["voice", "video", "photo"] as MediaKind[]).map((kind) => (
        <MediaRow
          key={kind}
          kind={kind}
          big={big}
          slot={slots[kind]}
          recording={recKind === kind}
          recKind={recKind}
          seconds={seconds}
          error={err[kind]}
          onStart={() => void start(kind)}
          onStop={stop}
          onRemove={() => remove(kind)}
          onUpload={(file) => persist(kind, file, file.name, 0)}
          attachVideo={attachVideo}
        />
      ))}
      <span className="text-[11.5px] font-medium leading-[1.8] text-[#4A6572]">
        ویس، عکس و ویدیو خصوصی ذخیره می‌شن و فقط گیرنده‌ی تأییدشده می‌بینه؛ بعد از پایان مهلت
        نگهداری کامل حذف می‌شن. (حداکثر ۳ فایل، هرکدوم تا ۱۰ مگ)
      </span>
    </div>
  );
}

/* one media row: record + upload actions, live recording state, saved preview */
function MediaRow({
  kind,
  big,
  slot,
  recording,
  recKind,
  seconds,
  error,
  onStart,
  onStop,
  onRemove,
  onUpload,
  attachVideo,
}: {
  kind: MediaKind;
  big: boolean;
  slot: Slot | null;
  recording: boolean;
  recKind: MediaKind | null;
  seconds: number;
  error?: string;
  onStart: () => void;
  onStop: () => void;
  onRemove: () => void;
  onUpload: (file: File) => void;
  attachVideo: (el: HTMLVideoElement | null) => void;
}) {
  const meta = KIND_META[kind];
  const fileRef = useRef<HTMLInputElement | null>(null);
  const busyElsewhere = recKind !== null && !recording;
  const { title, sub, emoji, accentBg } = meta;

  return (
    <div
      className={`rounded-[18px] border bg-white ${big ? "p-4" : "p-3"}`}
      style={{ borderColor: recording ? "#F7C5D3" : slot ? "#BFE9CB" : "#EAF4F8" }}
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] text-[17px]" style={{ background: accentBg }} aria-hidden="true">
          {emoji}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[13.5px] font-black text-[#04202E]">{title}</span>
          <span className="block text-[10.5px] font-medium leading-[1.7] text-[#4A6572]">{sub}</span>
        </span>
        {!slot && !recording && (
          <span className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              disabled={busyElsewhere}
              onClick={onStart}
              className="flex h-9 items-center gap-1 rounded-full px-3.5 text-[12px] font-extrabold text-[#04202E] transition-transform active:scale-95 disabled:opacity-40"
              style={{ background: accentBg }}
            >
              {kind === "photo" ? "عکس بگیر" : "ضبط کن"}
            </button>
            <button
              type="button"
              disabled={busyElsewhere}
              onClick={() => fileRef.current?.click()}
              className="flex h-9 items-center rounded-full border border-[#D3E8F0] px-3 text-[11px] font-extrabold text-[#006387] disabled:opacity-40"
            >
              آپلود
            </button>
          </span>
        )}
      </div>

      {recording && (
        <div className="mt-2.5 flex flex-col gap-2.5 rounded-[14px] bg-[#FFF5F7] p-3">
          {kind === "video" && <CamPreview attach={attachVideo} />}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="relative flex h-4 w-4 shrink-0 items-center justify-center" aria-hidden="true">
              <span className="absolute h-4 w-4 animate-ping rounded-full bg-[#F0426B]/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#F0426B]" />
            </span>
            <span className="text-[12.5px] font-black text-[#C42B55]">
              {kind === "voice" ? "دارم ضبط می‌کنم…" : kind === "video" ? "ویدیو در حال ضبط…" : "دوربین آماده‌ست…"}
            </span>
            <span className="text-[13px] font-black text-[#04202E]" dir="ltr">
              {fmtSecs(seconds)}
            </span>
            <button
              type="button"
              onClick={onStop}
              className="ms-auto flex h-10 items-center gap-1.5 rounded-full bg-[#04202E] px-4 text-[12.5px] font-extrabold text-white transition-transform active:scale-95"
            >
              <span className="h-2.5 w-2.5 rounded-[3px] bg-white" aria-hidden="true" />
              توقف و ذخیره
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-2 rounded-[12px] bg-[#FFF3C9] px-3 py-2 text-[11px] font-bold leading-[1.8] text-[#7A5C00]">{error}</div>
      )}

      {slot && !recording && (
        <div className="mt-2.5 flex flex-col gap-2 rounded-[14px] bg-[#F6FBFD] p-2.5">
          {kind === "voice" && <audio controls src={slot.url} className="h-10 w-full" />}
          {kind === "video" && <video controls src={slot.url} className="max-h-[220px] w-full rounded-[12px] bg-black object-contain" />}
          {kind === "photo" && slot.url && <img src={slot.url} alt={slot.name || "عکس ضبط‌شده"} className="max-h-[220px] w-full rounded-[12px] object-cover" />}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="flex items-center gap-1 rounded-full bg-[#E5F8EC] px-2 py-1 text-[10px] font-extrabold text-[#177A3D]">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              ذخیره شد
            </span>
            {slot.seconds > 0 && (
              <span className="text-[10px] font-bold text-[#7FA9BC]" dir="ltr">
                {fmtSecs(slot.seconds)}
              </span>
            )}
            {slot.name && (
              <span className="min-w-0 flex-1 truncate text-left text-[10px] font-medium text-[#7FA9BC]" dir="ltr">
                {slot.name}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <button type="button" onClick={onStart} className="rounded-full border border-[#D3E8F0] px-2.5 py-1 text-[10.5px] font-extrabold text-[#006387]">
                از نو
              </button>
              <button type="button" onClick={onRemove} className="rounded-full border border-[#F3C6D3] px-2.5 py-1 text-[10.5px] font-extrabold text-[#C42B55]">
                حذف
              </button>
            </span>
          </div>
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        hidden
        accept={KIND_ACCEPT[kind]}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onUpload(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}

/* live camera preview isolated in its own component so the ref callback never
 * mixes with the studio state reads in MediaRow's render */
function CamPreview({ attach }: { attach: (el: HTMLVideoElement | null) => void }) {
  return <video ref={attach} muted playsInline autoPlay className="max-h-[200px] w-full rounded-[12px] bg-black object-contain" />;
}
