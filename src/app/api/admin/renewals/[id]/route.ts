// ── PATCH /api/admin/renewals/{id} — approve/reject a retention renewal ──
// approve → applyPaidRenewal() inside a transaction: re-checks purge state,
// extends messageExpiresAt calendar-exact from the LATER of now/current expiry,
// revives the purge gate. If the content was purged meanwhile → the renewal is
// honestly cancelled (no fake recovery; refund is a manual owner action).
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { assertSameOrigin, requireAdmin } from "@/lib/auth/session";
import { applyPaidRenewal } from "@/lib/orders/retention";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    assertSameOrigin(req);
    await requireAdmin();
    const body = (await req.json().catch(() => ({}))) as { action?: string; reason?: string };
    const action = body.action === "approve" ? "approve" : body.action === "reject" ? "reject" : null;
    if (!action) throw new AppError(400, "bad_input", { fields: ["action: approve|reject"] });

    const renewal = await db.retentionRenewal.findUnique({ where: { id } });
    if (!renewal) throw new AppError(404, "not_found");
    if (!["awaiting_payment", "payment_under_review"].includes(renewal.status)) {
      throw new AppError(409, "bad_renewal_status", { status: renewal.status });
    }

    if (action === "reject") {
      const updated = await db.retentionRenewal.update({
        where: { id },
        data: { status: "cancelled", cancelReason: String(body.reason ?? "rejected_by_admin").slice(0, 200) },
      });
      await db.orderEvent
        .create({
          data: { orderId: renewal.orderId, type: "note", note: "retention_renewal_rejected", actor: "admin", meta: JSON.stringify({ renewalCode: renewal.code }) },
        })
        .catch(() => {});
      return NextResponse.json({ ok: true, status: updated.status });
    }

    // approve → move to under_review guard then apply atomically
    await db.retentionRenewal.update({ where: { id }, data: { status: "payment_under_review" } });
    const result = await applyPaidRenewal(id);
    if (!result.ok) {
      if (result.reason === "purged") {
        return NextResponse.json({ error: "purged_not_renewable", detail: "محتوا قبل از تأیید حذف شده؛ تمدید لغو شد." }, { status: 409 });
      }
      throw new AppError(409, "not_renewable");
    }
    return NextResponse.json({ ok: true, status: "paid", expiresAt: result.expiresAt.toISOString() });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
