// ── Gift-card PNG generator ──
// Draws a shareable 1080×1350 gift card for an order on a canvas and downloads it.
// Pure browser API (no React), RTL-aware via ctx.direction + Vazirmatn webfont.
import { fa } from "./fa";
import { PLUSH_MAP, OCCASIONS } from "./pishnam-data";
import type { GiftOrder } from "./pishnam-store";

const W = 1080;
const H = 1350;

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function circle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.closePath();
}

/** Word-wrap for Persian text (RTL) using measureText. */
function wrapRtl(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxW: number,
  maxLines: number,
): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (ctx.measureText(next).width <= maxW || !cur) cur = next;
    else {
      lines.push(cur);
      cur = w;
      if (lines.length === maxLines) break;
    }
  }
  if (lines.length < maxLines && cur) lines.push(cur);
  if (lines.length === maxLines) {
    const consumed = lines.join(" ").split(/\s+/).length;
    if (consumed < words.length) {
      let last = lines[maxLines - 1];
      while (ctx.measureText(`${last}…`).width > maxW && last.includes(" ")) {
        last = last.replace(/\s+\S+$/, "");
      }
      lines[maxLines - 1] = `${last}…`;
    }
  }
  return lines;
}

/** Draws a pill chip, returns its width. */
function chip(
  ctx: CanvasRenderingContext2D,
  xRight: number,
  y: number,
  text: string,
  bg: string,
  fg: string,
  font = "800 26px Vazirmatn, sans-serif",
  padX = 22,
  h = 48,
): number {
  ctx.font = font;
  const w = ctx.measureText(text).width + padX * 2;
  roundRect(ctx, xRight - w, y, w, h, h / 2);
  ctx.fillStyle = bg;
  ctx.fill();
  ctx.fillStyle = fg;
  ctx.textBaseline = "middle";
  ctx.fillText(text, xRight - padX, y + h / 2 + 1);
  ctx.textBaseline = "top";
  return w;
}

export async function downloadGiftCard(
  o: GiftOrder,
  plushSvg?: SVGSVGElement | null,
): Promise<boolean> {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return false;

  // make sure the self-hosted Vazirmatn face is ready before measuring
  try {
    await Promise.all([
      document.fonts.load("900 56px Vazirmatn"),
      document.fonts.load("800 28px Vazirmatn"),
      document.fonts.load("500 30px Vazirmatn"),
      document.fonts.ready,
    ]);
  } catch {
    /* fall back to system sans */
  }

  /* ── page background: cyan gradient + soft bubbles ── */
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "#CDEFFB");
  g.addColorStop(1, "#E9F8FE");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = "#FFFFFF";
  ctx.globalAlpha = 0.55;
  circle(ctx, 130, 190, 92);
  ctx.fill();
  circle(ctx, W - 110, 230, 58);
  ctx.fill();
  circle(ctx, 110, H - 170, 66);
  ctx.fill();
  circle(ctx, W - 140, H - 150, 104);
  ctx.fill();
  ctx.globalAlpha = 1;

  /* ── white card + dashed inner frame ── */
  roundRect(ctx, 60, 90, W - 120, H - 180, 48);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.save();
  ctx.setLineDash([12, 10]);
  ctx.strokeStyle = "#BFE4F2";
  ctx.lineWidth = 3;
  roundRect(ctx, 84, 114, W - 168, H - 228, 34);
  ctx.stroke();
  ctx.restore();

  const right = W - 132; // RTL text right edge
  ctx.direction = "rtl";
  ctx.textAlign = "right";
  ctx.textBaseline = "top";

  /* ── brand row ── */
  ctx.fillStyle = "#04202E";
  ctx.font = "900 54px Vazirmatn, sans-serif";
  ctx.fillText("پیشتم ♥", right, 176);

  // gift-number chip on the opposite corner
  chip(ctx, 132, 186, `هدیه‌ی شماره‌ی ${fa(o.no)}`, "#04202E", "#FFFFFF");

  ctx.fillStyle = "#4A6572";
  ctx.font = "500 26px Vazirmatn, sans-serif";
  ctx.fillText("یه بغل، تو یه جعبه", right, 244);

  /* ── plush medallion ── */
  const cx = W / 2;
  const cy = 470;
  ctx.fillStyle = PLUSH_MAP[o.kind].bg;
  circle(ctx, cx, cy, 158);
  ctx.fill();
  ctx.save();
  ctx.setLineDash([10, 9]);
  ctx.strokeStyle = PLUSH_MAP[o.kind].bg;
  ctx.lineWidth = 4;
  circle(ctx, cx, cy, 180);
  ctx.stroke();
  ctx.restore();
  if (plushSvg) {
    try {
      const clone = plushSvg.cloneNode(true) as SVGSVGElement;
      clone.setAttribute("width", "230");
      clone.setAttribute("height", "230");
      const str = new XMLSerializer().serializeToString(clone);
      const img = new Image();
      await new Promise<void>((res) => {
        img.onload = () => res();
        img.onerror = () => res();
        img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(str)}`;
      });
      if (img.width) ctx.drawImage(img, cx - 115, cy - 115, 230, 230);
    } catch {
      /* plush drawing is best-effort */
    }
  }

  /* ── receiver + meta ── */
  ctx.fillStyle = "#04202E";
  ctx.font = "900 50px Vazirmatn, sans-serif";
  const toTxt = o.dir === "sent" ? `برای ${o.to}` : "برای تو";
  ctx.fillText(toTxt, right, 682);

  ctx.font = "500 24px Vazirmatn, sans-serif";
  ctx.fillStyle = "#4A6572";
  const charmBits: string[] = [];
  if (o.hearts > 0) charmBits.push(`${fa(o.hearts)} قلب`);
  if (o.paws > 0) charmBits.push(`${fa(o.paws)} پنجه`);
  if (o.anonymous) charmBits.push("ناشناس");
  ctx.fillText(
    [PLUSH_MAP[o.kind].name, o.date, charmBits.join(" · ")].filter(Boolean).join(" · "),
    right,
    742,
  );

  chip(
    ctx,
    right,
    786,
    OCCASIONS[o.occasion] ?? "همین‌طوری",
    "#E3F6FD",
    "#006387",
  );

  /* ── message block ── */
  ctx.fillStyle = "#1F3E4D";
  ctx.font = "500 30px Vazirmatn, sans-serif";
  const lines = wrapRtl(ctx, o.message || "پیامی نوشته نشده بود.", W - 280, 5);
  let y = 862;
  for (const line of lines) {
    ctx.fillText(line, right, y);
    y += 54;
  }

  /* ── dashed divider ── */
  ctx.save();
  ctx.setLineDash([9, 9]);
  ctx.strokeStyle = "#D3E8F0";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(132, y + 26);
  ctx.lineTo(W - 132, y + 26);
  ctx.stroke();
  ctx.restore();

  /* ── password chip + footer ── */
  chip(ctx, right, y + 58, `رمز کارت: ${o.password || "بهار"}`, "#04202E", "#FFFFFF");
  if (o.senderName) {
    ctx.fillStyle = "#4A6572";
    ctx.font = "600 24px Vazirmatn, sans-serif";
    ctx.fillText(`فرستنده: ${o.senderName}`, 132 + 10, y + 70);
  }

  ctx.fillStyle = "#8FB3C0";
  ctx.font = "600 22px Vazirmatn, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("با ♥ ساخته شده در پیشتم · yegh.bagh", cx, H - 152);
  ctx.textAlign = "right";

  /* ── download ── */
  return await new Promise<boolean>((res) => {
    try {
      canvas.toBlob((blob) => {
        if (!blob) return res(false);
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `pishnam-gift-${o.no}.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 4000);
        res(true);
      }, "image/png");
    } catch {
      res(false);
    }
  });
}
