// ── /api/auth/profile — set/update the display name of the SESSION user ──
// Identity comes from the HttpOnly cookie; body.phone is ignored (guide #3).
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse, AppError } from "@/lib/errors";
import { assertSameOrigin, requireSession } from "@/lib/auth/session";

export async function POST(req: Request) {
  try {
    assertSameOrigin(req);
    const session = await requireSession();
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 60) : "";
    if (!name) throw new AppError(400, "invalid_input");

    const user = await db.appUser.upsert({
      where: { phone: session.phone },
      create: { phone: session.phone, name },
      update: { name },
    });
    return NextResponse.json({
      ok: true,
      user: { phone: user.phone, name: user.name ?? "" },
    });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
