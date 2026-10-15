// ── POST /api/orders/[id]/refund — damage-only refund request (guide §4.8) ──
// Session-owned, shipped|delivered only → refund_requested via THE shared
// transitionOrder helper (actor="customer", reason in the OrderEvent note —
// reused, not reinvented). Photos ≤3 × 5MB, magic-byte sniffed → .data/refunds.
// Resolution (refunded | delivered) stays on the admin transition endpoint.
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { withWriteRetry } from "@/lib/db-write";
import { toErrorResponse, AppError } from "@/lib/errors";
import { assertSameOrigin, requireSession } from "@/lib/auth/session";
import { clientIp, isRateLimited, rateLimit } from "@/lib/rate-limit";
import { transitionOrder } from "@/lib/orders/transition";
import { sniffImageMime } from "@/lib/payments/manual";
import { UPLOAD_MAX_BYTES, storeMediaFile, deleteMediaFile } from "@/lib/media";

const reasonSchema = z.object({ reason: z.string().trim().min(10).max(500) });

const REFUNDABLE: Set<string> = new Set(["shipped", "delivered"]);

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const storedKeys: string[] = [];
  try {
    assertSameOrigin(req);
    const session = await requireSession();

    const order = await db.order.findUnique({ where: { id }, select: { id: true, status: true, sessionPhone: true, userPhone: true, senderPhone: true } });
    if (!order) throw new AppError(404, "not_found");

    // identity ALWAYS from the session cookie — never from the body
    const own = order.sessionPhone === session.phone || order.userPhone === session.phone || order.senderPhone === session.phone;
    if (!own) throw new AppError(403, "not_yours");

    // ۳ / روز per order+IP — counted before the status guard so hammering counts
    await rateLimit("refund", `${order.id}:${clientIp(req)}`, 3, 86_400);

    if (!REFUNDABLE.has(order.status)) throw new AppError(409, "not_allowed", { status: order.status });

    // input: JSON {reason} or multipart (reason + photos 1..3)
    const ctype = req.headers.get("content-type") ?? "";
    let reason = "";
    let photos: File[] = [];
    if (ctype.includes("multipart/form-data")) {
      const form = await req.formData();
      reason = String(form.get("reason") ?? "");
      for (const f of form.getAll("photos")) if (f instanceof File && f.size > 0) photos.push(f);
    } else {
      reason = String(((await req.json().catch(() => ({}))) as Record<string, unknown>).reason ?? "");
    }
    const parsed = reasonSchema.safeParse({ reason });
    if (!parsed.success) {
      throw new AppError(400, "bad_input", {
        fields: parsed.error.issues.slice(0, 4).map((i) => `${i.path.join(".")}: ${i.message}`),
      });
    }
    if (photos.length > 3) throw new AppError(400, "too_many_photos", { max: 3 });

    // photos: magic-byte sniffed, stored as .data/refunds/<orderId>-<n>.<ext>
    const keys: string[] = [];
    const stem = order.id.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 40);
    for (let i = 0; i < photos.length; i++) {
      if (photos[i].size > UPLOAD_MAX_BYTES) throw new AppError(400, "file_too_large", { max: UPLOAD_MAX_BYTES });
      const buf = Buffer.from(await photos[i].arrayBuffer());
      const mime = sniffImageMime(buf);
      if (!mime) throw new AppError(400, "bad_file_type", { allowed: ["jpeg", "png", "webp"] });
      const key = await storeMediaFile("refunds", `${stem}-${i + 1}`, buf, mime);
      storedKeys.push(key);
      keys.push(key);
    }

    try {
      // refund fields + state move in ONE tx — via the shared transitionOrder
      await withWriteRetry(() =>
        db.$transaction(async (tx) => {
          await tx.order.update({
            where: { id: order.id },
            data: {
              refundReason: parsed.data.reason,
              refundPhotos: JSON.stringify(keys),
              refundRequestedAt: new Date(),
            },
          });
          await transitionOrder(
            order.id,
            "refund_requested",
            {
              actor: "customer",
              actorId: session.phone,
              note: parsed.data.reason,
              ...(keys.length ? { meta: { photos: keys.length } } : {}),
            },
            tx,
          );
        }, { timeout: 10_000 }),
      );
    } catch (e) {
      for (const k of storedKeys) void deleteMediaFile(k); // rollback orphan files
      throw e;
    }
    return NextResponse.json({ ok: true, status: "refund_requested" }, { status: 201 });
  } catch (e) {
    if (isRateLimited(e)) {
      return NextResponse.json(
        { error: "rate_limited", details: { retryAfter: e.retryAfter } },
        { status: 429, headers: { "retry-after": String(e.retryAfter) } },
      );
    }
    for (const k of storedKeys) void deleteMediaFile(k);
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
