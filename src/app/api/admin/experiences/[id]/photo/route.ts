// ── GET /api/admin/experiences/{id}/photo — admin-only UGC photo (UX-09) ──
// The moderation queue shows the ACTUAL customer photo as a thumbnail +
// lightbox instead of a 📷 emoji. Experience photos are PRIVATE media
// (storage key `experiences/<uuid>.<ext>` under the data root) — the public
// /api/media route refuses that prefix on purpose, so the panel streams it
// through this admin-gated handler. ?download=1 forces an attachment.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { requireAdmin } from "@/lib/auth/session";
import { dataFile } from "@/lib/data-root";
import { getMediaBlob } from "@/lib/media-blob";

const MIME_FROM_EXT: Record<string, string> = { jpg: "image/jpeg", png: "image/png", webp: "image/webp" };

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await requireAdmin();
    const exp = await db.experience.findUnique({ where: { id }, select: { photoKey: true } });
    if (!exp || !exp.photoKey) throw new AppError(404, "not_found");

    // traversal guard — the key must be a plain experiences/<file> path
    const key = exp.photoKey;
    if (key.includes("..") || !key.startsWith("experiences/") || key.split("/").length !== 2) {
      throw new AppError(404, "not_found");
    }
    let buf: Buffer | null = null;
    try {
      const { readFile } = await import("fs/promises");
      buf = await readFile(dataFile(key));
    } catch {
      // round 42 — uploaded on a read-only serverless FS → DB blob copy
      buf = (await getMediaBlob(key))?.buf ?? null;
    }
    if (!buf) throw new AppError(404, "photo_gone");

    const filename = key.split("/").pop() ?? "photo";
    const ext = filename.split(".").pop() ?? "";
    const download = new URL(req.url).searchParams.get("download") === "1";
    return new NextResponse(new Uint8Array(buf), {
      headers: {
        "Content-Type": MIME_FROM_EXT[ext] ?? "application/octet-stream",
        "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${filename}"`,
        // admin-only private UGC — never cached by intermediaries
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (e) {
    const { body, status } = toErrorResponse(e, "/api/admin/experiences/[id]/photo");
    return NextResponse.json(body, { status });
  }
}
