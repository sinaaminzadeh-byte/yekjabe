// ── GET /api/admin/orders/{id}/media — admin-only gift attachment streaming ──
// UX-01: the admin must SEE (not just count) the photos/voice/video customers
// attach to gifts. This route streams ONE stored attachment of ONE order:
//   - admin session required (requireAdmin, same as every admin route)
//   - the key must belong to THAT order's stored mediaKeys list (no fishing)
//   - inline by default (thumbnail/player/lightbox); ?download=1 forces a
//     download for the «دانلود» buttons
// The customer-facing route (/api/gifts/media) keeps its own strict key regex
// and authorization — this file does not change it.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { requireAdmin } from "@/lib/auth/session";
import { readMessageFile } from "@/lib/orders/message-media";

const MIME_BY_EXT: Record<string, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  mp4: "video/mp4",
  webm: "video/webm",
  mp3: "audio/mpeg",
  wav: "audio/wav",
  ogg: "audio/ogg",
  m4a: "audio/mp4",
};

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await requireAdmin();
    const key = new URL(req.url).searchParams.get("key") ?? "";

    const order = await db.order.findUnique({ where: { id }, select: { code: true, mediaKeys: true } });
    if (!order) throw new AppError(404, "not_found");

    // key must be listed on THIS order + traversal-safe + known extension
    let keys: string[] = [];
    try {
      const arr: unknown = JSON.parse(order.mediaKeys);
      if (Array.isArray(arr)) keys = arr.filter((k): k is string => typeof k === "string");
    } catch {
      keys = [];
    }
    const ext = key.split(".").pop() ?? "";
    if (
      !keys.includes(key) ||
      key.includes("..") ||
      !key.startsWith(`messages/${order.code}/`) ||
      !(ext in MIME_BY_EXT)
    ) {
      throw new AppError(404, "not_found");
    }
    const mime = MIME_BY_EXT[ext] ?? "application/octet-stream";

    // round 42: disk first, then the DB blob copy (uploads on read-only
    // serverless filesystems live in MediaBlob under the same key)
    const buf = await readMessageFile(key);
    if (!buf) throw new AppError(404, "not_found");

    const filename = key.split("/").pop() ?? "attachment";
    const download = new URL(req.url).searchParams.get("download") === "1";
    return new NextResponse(new Uint8Array(buf), {
      headers: {
        "Content-Type": mime,
        "Content-Length": String(buf.length),
        "Cache-Control": "private, no-store",
        "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${filename}"`,
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
