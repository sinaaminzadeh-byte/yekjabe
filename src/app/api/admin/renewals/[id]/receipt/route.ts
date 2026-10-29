// ── GET /api/admin/renewals/{id}/receipt — admin-only attachment ──
// Streams the renewal's stored receipt (same store as order payments).
// UX-04: inline by default so the panel can preview it; ?download=1 downloads.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { requireAdmin } from "@/lib/auth/session";
import { readReceiptFile } from "@/lib/payments/manual";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await requireAdmin();
    const renewal = await db.retentionRenewal.findUnique({ where: { id }, select: { receiptKey: true, receiptMime: true } });
    if (!renewal || !renewal.receiptKey) throw new AppError(404, "not_found");
    const buf = await readReceiptFile(renewal.receiptKey);
    if (!buf) throw new AppError(404, "receipt_gone");
    const filename = renewal.receiptKey.split("/").pop() ?? "receipt";
    const download = new URL(req.url).searchParams.get("download") === "1";
    return new NextResponse(new Uint8Array(buf), {
      headers: {
        "Content-Type": renewal.receiptMime || "application/octet-stream",
        "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
