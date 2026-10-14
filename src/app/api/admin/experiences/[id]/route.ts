// ── PATCH /api/admin/experiences/[id] — publish / reject a story (Phase C) ──
// publish → status=published + publishedAt=now (enters /api/stories)
// reject  → status=rejected (hidden forever from public reads)
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { toErrorResponse, AppError } from "@/lib/errors";
import { assertSameOrigin, requireAdmin } from "@/lib/auth/session";

const actionSchema = z.object({ action: z.enum(["publish", "reject"]) });

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    assertSameOrigin(req);
    const admin = await requireAdmin();
    const parsed = actionSchema.safeParse(await req.json().catch(() => ({})));
    if (!parsed.success) throw new AppError(400, "invalid_action", { allowed: ["publish", "reject"] });

    const current = await db.experience.findUnique({ where: { id }, select: { id: true } });
    if (!current) throw new AppError(404, "not_found");

    const experience = await db.experience.update({
      where: { id },
      data:
        parsed.data.action === "publish"
          ? { status: "published", publishedAt: new Date() }
          : { status: "rejected", publishedAt: null },
    });
    return NextResponse.json({ ok: true, experience, by: admin.phone });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
