// ── media-blob.ts — DB-backed fallback for the file-storage seams (round 42) ──
// Vercel lambdas have a READ-ONLY filesystem: every writeFile under .data/
// dies with EROFS there, which is exactly why the owner saw «عکس آپلود نشد»
// on the deployed site. Disk stays the fast path in the sandbox; whenever a
// disk write fails (or a reader can't find the file on its instance) the
// bytes live in the MediaBlob table under the SAME storage key as dataFile().
// All three storage seams (media.ts / payments/manual.ts / message-media.ts)
// route through these helpers so the behavior is identical everywhere.
import { db } from "@/lib/db";

/** Upserts the bytes for a storage key (same key contract as dataFile()). */
export async function putMediaBlob(key: string, buf: Buffer, mime: string): Promise<void> {
  // new Uint8Array(buf) = plain-ArrayBuffer copy — the exact type Prisma's
  // Bytes column expects on both SQLite (BLOB) and PostgreSQL (bytea).
  const payload = new Uint8Array(buf);
  await db.mediaBlob.upsert({
    where: { key },
    create: { key, mime, bytes: payload, size: buf.length },
    update: { mime, bytes: payload, size: buf.length },
  });
}

/** Reads a storage key back from the DB (null = missing). */
export async function getMediaBlob(key: string): Promise<{ buf: Buffer; mime: string } | null> {
  try {
    const row = await db.mediaBlob.findUnique({ where: { key } });
    if (!row) return null;
    return { buf: Buffer.from(row.bytes), mime: row.mime };
  } catch {
    return null;
  }
}

/** Best-effort delete (disk removers call this alongside rm()). */
export async function deleteMediaBlob(key: string): Promise<void> {
  try {
    await db.mediaBlob.deleteMany({ where: { key } });
  } catch {
    /* best effort */
  }
}
