// ── /api/admin/reviews — moderation queue (guide A9) ──
// GET   → all reviews newest-first (admin session required)
// PATCH { id, approved } → publish / hide a review
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse, AppError } from "@/lib/errors";
import { assertSameOrigin, requireAdmin } from "@/lib/auth/session";

export async function GET() {
  try {
    await requireAdmin();
    const reviews = await db.review.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json({ reviews });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}

export async function PATCH(req: Request) {
  try {
    assertSameOrigin(req);
    const admin = await requireAdmin();
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const id = typeof body.id === "string" ? body.id : "";
    if (!id || typeof body.approved !== "boolean") throw new AppError(400, "invalid_input");
    const review = await db.review.update({
      where: { id },
      data: { approved: body.approved },
    });
    return NextResponse.json({ ok: true, review, by: admin.phone });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
