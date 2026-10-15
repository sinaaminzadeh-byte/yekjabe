// ── POST /api/auth/logout — destroy the CUSTOMER session (cookie + DB row) ──
// The «خروج از حساب» button calls this BEFORE clearing the client store:
// without it the HttpOnly cookie survives logout and the next bootstrap would
// silently log the user back in (and the next checkout would re-bind their
// session phone).
import { NextResponse } from "next/server";
import { assertSameOrigin, destroySession } from "@/lib/auth/session";
import { toErrorResponse } from "@/lib/errors";

export async function POST(req: Request) {
  try {
    assertSameOrigin(req);
    await destroySession("customer");
    return NextResponse.json({ ok: true });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
