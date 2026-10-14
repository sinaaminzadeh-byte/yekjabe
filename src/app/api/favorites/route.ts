// ── /api/favorites — per-account favorite plush kinds (session-scoped) ──
// Identity comes from the HttpOnly session cookie; `phone` params are ignored.
// GET → { kinds }   PUT { kinds } → replace-all (idempotent sync)
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse, AppError } from "@/lib/errors";
import { assertSameOrigin, requireSession } from "@/lib/auth/session";

const KIND_RE = /^[a-z]{2,20}$/;

export async function GET() {
  try {
    const session = await requireSession();
    const rows = await db.favorite.findMany({
      where: { userPhone: session.phone },
      orderBy: { createdAt: "asc" },
      take: 50,
    });
    return NextResponse.json({ kinds: rows.map((r) => r.kind) });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}

export async function PUT(req: Request) {
  try {
    assertSameOrigin(req);
    const session = await requireSession();
    const body = (await req.json().catch(() => ({}))) as { kinds?: unknown };
    const kinds = Array.isArray(body.kinds)
      ? [...new Set(body.kinds.filter((k): k is string => typeof k === "string" && KIND_RE.test(k)))].slice(0, 30)
      : [];
    // replace-all keeps client/server trivially consistent (small lists)
    await db.$transaction([
      db.favorite.deleteMany({ where: { userPhone: session.phone } }),
      db.favorite.createMany({ data: kinds.map((kind) => ({ userPhone: session.phone, kind })) }),
    ]);
    return NextResponse.json({ ok: true, kinds }, { status: 200 });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
