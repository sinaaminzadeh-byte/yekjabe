// ── GET /api/media/<key…> — public streaming for marketing assets (round 34) ──
// Serves ONLY the three public prefixes:
//   products/<file>  → validated against the DB (ProductImage or Product.imageKey)
//   posts/<file>     → strict filename guard (server-generated uuid names)
//   branding/<file>  → must equal the current site_logo Setting
// Private folders (messages/receipts/refunds/experiences) are unreachable here.
// Files are content-named → Cache-Control immutable; deletion invalidates via 404.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { readPublicMedia, isSafeMediaFilename } from "@/lib/media";

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
    if (!asset) return new NextResponse("not found", { status: 404 });
    return new NextResponse(new Uint8Array(asset.buf), {
      headers: {
        "Content-Type": asset.mime,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new NextResponse("not found", { status: 404 });
  }
}
