// ── /api/experiences — «تجربه مخاطب» public UGC submit (Phase C, guide 13-f) ──
// The ONLY public write of the stories pipeline. Everything lands as status=
// "pending"; nothing goes public before an admin publishes it (moderation gate).
// consent MUST be the literal true — UGC is opt-in, never auto-derived.
// multipart/form-data (with optional photo ≤5MB jpeg/png/webp) or JSON.
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { z } from "zod";
import { db } from "@/lib/db";
import { toErrorResponse, AppError } from "@/lib/errors";
import { clientIp, isRateLimited, rateLimit } from "@/lib/rate-limit";
import { sniffImageMime } from "@/lib/payments/manual";
import { UPLOAD_MAX_BYTES, storeMediaFile, deleteMediaFile } from "@/lib/media";

const experienceSchema = z.object({
  name: z.string().trim().min(2).max(40),
  city: z.string().trim().max(40).optional().default(""),
  occasion: z.number().int().min(0).max(10).optional().default(0),
  body: z.string().trim().min(20).max(1500),
  consent: z.literal(true),
});

export async function POST(req: Request) {
  let storedKey = "";
  try {
    // validation FIRST — garbage requests must not burn the 2/hour bucket
    const ctype = req.headers.get("content-type") ?? "";
    let raw: Record<string, unknown>;
    let photo: File | null = null;
    if (ctype.includes("multipart/form-data")) {
      const form = await req.formData();
      raw = {
        name: form.get("name"),
        city: form.get("city") ?? "",
        occasion: form.get("occasion") === null ? 0 : Number(form.get("occasion")),
        body: form.get("body"),
        consent: String(form.get("consent") ?? "") === "true",
      };
      const f = form.get("photo");
      if (f instanceof File && f.size > 0) photo = f;
    } else {
      raw = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    }
    const parsed = experienceSchema.safeParse(raw);
    if (!parsed.success) {
      throw new AppError(400, "bad_input", {
        fields: parsed.error.issues.slice(0, 6).map((i) => `${i.path.join(".")}: ${i.message}`),
      });
    }
    const input = parsed.data;

    // optional photo — magic-byte sniffed, never trusted by filename/mime
    let mime: "image/jpeg" | "image/png" | "image/webp" | null = null;
    let buf: Buffer | null = null;
    if (photo) {
      if (photo.size > UPLOAD_MAX_BYTES) throw new AppError(400, "file_too_large", { max: UPLOAD_MAX_BYTES });
      buf = Buffer.from(await photo.arrayBuffer());
      mime = sniffImageMime(buf);
      if (!mime) throw new AppError(400, "bad_file_type", { allowed: ["jpeg", "png", "webp"] });
    }

    await rateLimit("experience", clientIp(req), 2, 3600); // ۲ / ساعت per IP

    // keep the failure window tiny: store → row (rollback the file on failure)
    if (buf && mime) storedKey = await storeMediaFile("experiences", randomUUID(), buf, mime);

    try {
      await db.experience.create({
        data: {
          name: input.name,
          city: input.city,
          occasion: input.occasion,
          body: input.body,
          photoKey: storedKey,
          consent: true, // only reachable with the literal-true zod gate
          status: "pending", // moderation queue — nothing goes public unreviewed
        },
      });
    } catch (e) {
      if (storedKey) void deleteMediaFile(storedKey); // rollback the orphan file
      throw e;
    }
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    if (isRateLimited(e)) {
      return NextResponse.json(
        { error: "rate_limited", details: { retryAfter: e.retryAfter } },
        { status: 429, headers: { "retry-after": String(e.retryAfter) } },
      );
    }
    if (storedKey) void deleteMediaFile(storedKey);
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
