// ── /api/gifts/media — PRIVATE message media (mission §۱/§۴) ──
// POST: upload ≤3 files (≤10MB each) for an order, while it is still being
// prepared (awaiting_payment → preparing). Proof = code + Idempotency-Key pair
// (the same secret that created the order — works for guests AND accounts).
// GET : stream a file — ONLY to the session whose phone matches recipientPhone
//       (viewable status + not expired) or the order's own sender (preview).
//       Anonymous mode changes nothing here: files belong to the gift, not the
//       sender identity; senderName/phone never appear in any response.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { assertSameOrigin, getSession } from "@/lib/auth/session";
import { clientIp, isRateLimited, rateLimit } from "@/lib/rate-limit";
import {
  MESSAGE_MEDIA_MAX_BYTES,
  MESSAGE_MEDIA_MAX_FILES,
  isMessageMediaMime,
  mimeFromKey,
  parseMessageMediaKeys,
  readMessageFile,
  sniffMessageMediaMime,
  storeMessageFile,
  validMessageKey,
} from "@/lib/orders/message-media";
import { isMessageExpired } from "@/lib/orders/retention";
import { isViewableStatus } from "@/lib/orders/gift-view";

// admin-configurable limits (owner round 30) — Setting keys with the code
// defaults as fallback; clamped to the same bounds the admin UI enforces.
async function mediaLimits(): Promise<{ maxFiles: number; maxBytes: number }> {
  const rows = await db.setting.findMany({
    where: { key: { in: ["media_max_files", "media_max_mb"] } },
  });
  const map: Record<string, string> = {};
  for (const r of rows) map[r.key] = r.value;
  const files = Number(map.media_max_files ?? "");
  const mb = Number(map.media_max_mb ?? "");
  return {
    maxFiles: Number.isFinite(files) && files >= 1 && files <= 3 ? files : MESSAGE_MEDIA_MAX_FILES,
    maxBytes: Number.isFinite(mb) && mb >= 1 && mb <= 50 ? mb * 1024 * 1024 : MESSAGE_MEDIA_MAX_BYTES,
  };
}

export async function POST(req: Request) {
  try {
    assertSameOrigin(req);
    await rateLimit("gift_media_up", clientIp(req), 20, 600);
    const form = await req.formData();
    const code = String(form.get("code") ?? "").trim().toUpperCase();
    const key = String(form.get("key") ?? "").trim();
    if (!/^PN-\d{6}-\d{4}$/.test(code) || key.length < 8) throw new AppError(400, "bad_input");

    const order = await db.order.findUnique({ where: { code } });
    if (!order || order.idempotencyKey !== key) throw new AppError(404, "not_found");
    // media can be attached until the box leaves us — not after
    if (!["awaiting_payment", "payment_under_review", "paid", "preparing"].includes(order.status)) {
      throw new AppError(400, "bad_order_status");
    }

    const { maxFiles, maxBytes } = await mediaLimits();
    const existing = parseMessageMediaKeys(order.mediaKeys);
    if (existing.length >= maxFiles) {
      throw new AppError(400, "too_many_files", { max: maxFiles });
    }

    const file = form.get("file");
    if (!(file instanceof File)) throw new AppError(400, "bad_input");
    if (file.size > maxBytes) throw new AppError(400, "file_too_large");
    const buf = Buffer.from(await file.arrayBuffer());
    const mime = sniffMessageMediaMime(buf);
    if (!mime || !isMessageMediaMime(mime)) throw new AppError(400, "bad_file_type");

    const storageKey = await storeMessageFile(code, buf, mime);
    const keys = [...existing, storageKey];
    await db.order.update({
      where: { id: order.id },
      data: { mediaKeys: JSON.stringify(keys), mediaCount: keys.length },
    });
    await db.orderEvent
      .create({ data: { orderId: order.id, type: "note", note: "message_media_added", actor: "customer", meta: JSON.stringify({ count: keys.length }) } })
      .catch(() => {});

    return NextResponse.json({ ok: true, mediaCount: keys.length, key: storageKey });
  } catch (e) {
    if (isRateLimited(e)) {
      return NextResponse.json({ error: "rate_limited", details: { retryAfter: e.retryAfter } }, { status: 429 });
    }
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}

export async function GET(req: Request) {
  try {
    const key = new URL(req.url).searchParams.get("key") ?? "";
    if (!validMessageKey(key)) throw new AppError(404, "not_found");
    await rateLimit("gift_media_get", clientIp(req), 120, 600);

    const code = key.split("/")[1];
    const order = await db.order.findUnique({ where: { code } });
    if (!order || !parseMessageMediaKeys(order.mediaKeys).includes(key)) {
      throw new AppError(404, "not_found");
    }

    const session = await getSession("customer");
    const isSender =
      Boolean(session) &&
      Boolean(order.userPhone || order.senderPhone) &&
      (order.userPhone === session?.phone || order.senderPhone === session?.phone);
    const isRecipient =
      Boolean(session) &&
      order.recipientPhone === session?.phone &&
      isViewableStatus(order.status) &&
      !isMessageExpired(order); // expired media dies for the recipient — even before purge
    if (!isSender && !isRecipient) throw new AppError(404, "not_found");

    const buf = await readMessageFile(key);
    if (!buf) throw new AppError(404, "not_found");
    return new NextResponse(new Uint8Array(buf), {
      headers: {
        "Content-Type": mimeFromKey(key),
        "Content-Length": String(buf.length),
        "Cache-Control": "private, no-store",
        "Content-Disposition": "inline",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (e) {
    if (isRateLimited(e)) {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
