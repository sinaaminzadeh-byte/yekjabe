// ── GET /api/products/[slug]/image — public catalog photo ──
// Product/addon photos are PUBLIC marketing assets (unlike private gift
// media). Served from the data root (.data/products/… at deploy: object
// storage behind the same seam). Cache-busted by ?v=<updatedAt> when the
// admin swaps a photo.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { readProductImage, publicMediaFallback } from "@/lib/media";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const product = await db.product.findUnique({ where: { slug }, select: { imageKey: true } });
    if (!product?.imageKey) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }
    const img = await readProductImage(product.imageKey);
    if (img) {
      return new NextResponse(new Uint8Array(img.buf), {
        headers: {
          "Content-Type": img.mime,
          "Content-Length": String(img.buf.length),
          // catalog imagery is safely cacheable at the edge; the URL carries a
          // ?v= bust param after every re-upload
          "Cache-Control": "public, max-age=300, stale-while-revalidate=86400",
          "Content-Disposition": "inline",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }
    // Ephemeral serverless disk — redirect to the build-bundled default copy
    // (relative Location per RFC 7231; no dependency on the lambda's req.url host).
    const fallback = publicMediaFallback(product.imageKey);
    if (fallback) return new NextResponse(null, { status: 307, headers: { Location: fallback } });
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  } catch {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
}
