// ── GET /api/admin/me — who is behind this admin session ──
// The panel calls this right after the gate opens to render the role chip
// (ادمین = owner / مدیر فروشگاه = operator) and to hide owner-only tabs
// (تنظیمات) client-side. Server enforcement stays the source of truth.
import { NextResponse } from "next/server";
import { toErrorResponse } from "@/lib/errors";
import { requireAdmin } from "@/lib/auth/session";

export async function GET() {
  try {
    const admin = await requireAdmin();
    return NextResponse.json({
      ok: true,
      admin: {
        phone: admin.phone,
        name: admin.name || "",
        role: admin.role, // owner | operator
        lastLoginAt: admin.lastLoginAt?.toISOString() ?? null,
      },
    });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
