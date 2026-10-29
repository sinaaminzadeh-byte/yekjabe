// ── GET /api/admin/payments/{id}/receipt — admin-only attachment ──
// UX-04: shows INLINE in the browser now (the panel renders it in its own
// lightbox) — ?download=1 forces a download for the «دانلود» button.
// The sandbox stand-in for the 15-minute presigned S3 GET at deploy.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { requireAdmin } from "@/lib/auth/session";
import { readReceiptFile } from "@/lib/payments/manual";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await requireAdmin();
    const payment = await db.payment.findUnique({ where: { id }, select: { receiptKey: true, receiptMime: true } });
    if (!payment || !payment.receiptKey) throw new AppError(404, "not_found");
    const buf = await readReceiptFile(payment.receiptKey);
    if (!buf) throw new AppError(404, "receipt_gone");
    const filename = payment.receiptKey.split("/").pop() ?? "receipt";
    const download = new URL(req.url).searchParams.get("download") === "1";
    return new NextResponse(new Uint8Array(buf), {
      headers: {
        "Content-Type": payment.receiptMime || "application/octet-stream",
        "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
