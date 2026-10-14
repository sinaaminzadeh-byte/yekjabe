// ── /api/admin/experiences — UGC moderation queue (Phase C, guide 13-f) ──
// GET ?status=pending|published|rejected (optional) — newest first, take 100.
// Rows are admin-only: PII-safe fields are decided in the PUBLIC /api/stories
// route, never here — the queue shows everything an admin needs to moderate.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse, AppError } from "@/lib/errors";
import { requireAdmin } from "@/lib/auth/session";

const STATUSES = new Set(["pending", "published", "rejected"]);

export async function GET(req: Request) {
  try {
    await requireAdmin();
    const url = new URL(req.url);
    const status = url.searchParams.get("status") ?? "";
    if (status && !STATUSES.has(status)) throw new AppError(400, "bad_status", { allowed: [...STATUSES] });

    const experiences = await db.experience.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json({ experiences });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
