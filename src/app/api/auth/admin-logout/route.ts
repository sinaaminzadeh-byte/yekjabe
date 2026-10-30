// ── POST /api/auth/admin-logout — destroy the ADMIN panel session (round 42) ──
// The panel's «خروج از پنل» button calls this BEFORE clearing client state:
// without it the HttpOnly __Host-pn_admin cookie survives and a locked panel
// could be re-opened by anyone re-flipping the sessionStorage key. This kills
// the DB-backed session row + zeroes the cookie (UX-18: logout must also wipe
// the panel's client cache — that part happens in adminLogout() client-side).
import { NextResponse } from "next/server";
import { assertSameOrigin, destroySession } from "@/lib/auth/session";
import { toErrorResponse } from "@/lib/errors";

export async function POST(req: Request) {
  try {
    assertSameOrigin(req);
    await destroySession("admin");
    return NextResponse.json({ ok: true });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
