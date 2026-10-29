// ── GET /api/media/<key…> — public streaming for marketing assets (round 34) ──
// Serves ONLY the three public prefixes:
//   products/<file>  → validated against the DB (ProductImage or Product.imageKey)
//   posts/<file>     → strict filename guard (server-generated uuid names)
//   branding/<file>  → must equal the current site_logo Setting
// Private folders (messages/receipts/refunds/experiences) are unreachable here.
// Files are content-named → Cache-Control immutable; deletion invalidates via 404.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { readPublicMedia, isSafeMediaFilename, publicMediaFallback } from "@/lib/media";

export async function GET(_req: Request, { params }: { params: Promise<{ key: string[] }> }) {
  const { key } = await params;
  const parts = key ?? [];
  if (parts.length !== 2) return new NextResponse("not found", { status: 404 });
  const [folder, file] = parts;
  if (!isSafeMediaFilename(file)) return new NextResponse("not found", { status: 404 });
  const storageKey = `${folder}/${file}`;

  try {
    if (folder === "products") {
      // DB-gated: the key must belong to a live gallery row or be the cover
      const [img, cover] = await Promise.all([
        db.productImage.findFirst({ where: { key: storageKey }, select: { id: true } }),
        db.product.findFirst({ where: { imageKey: storageKey }, select: { id: true } }),
      ]);
      if (!img && !cover) return new NextResponse("not found", { status: 404 });
    } else if (folder === "branding") {
      const setting = await db.setting.findUnique({ where: { key: "site_logo" } });
      if (!setting || setting.value !== storageKey) return new NextResponse("not found", { status: 404 });
    } else if (folder !== "posts") {
      return new NextResponse("not found", { status: 404 });
    }

    const asset = await readPublicMedia(storageKey);
    if (asset) {
      return new NextResponse(new Uint8Array(asset.buf), {
        headers: {
          "Content-Type": asset.mime,
          "Cache-Control": "public, max-age=31536000, immutable",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }
    // File missing on this instance's disk (ephemeral serverless /tmp after a
    // cold start) — fall back to the copy bundled into /public at build time.
    // Relative Location: RFC 7231 allows it and it sidesteps any internal-host
    // mismatch between the lambda's req.url and the public site URL.
    const fallback = publicMediaFallback(storageKey);
    if (fallback) return new NextResponse(null, { status: 307, headers: { Location: fallback } });
    return new NextResponse("not found", { status: 404 });
  } catch {
    return new NextResponse("not found", { status: 404 });
  }
}
