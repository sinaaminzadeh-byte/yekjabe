import { PrismaClient } from '@prisma/client'
import { bootstrapServerlessSqlite } from './sqlite-serverless'

// Serverless (Netlify) cold start: point DATABASE_URL at a writable copy of
// the bundled seeded db BEFORE the client is constructed. No-op elsewhere.
bootstrapServerlessSqlite()

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

/**
 * SQLite (launch) writes serialize through ONE connection — `connection_limit=1`
 * makes concurrent checkout transactions queue instead of failing with
 * SQLITE_BUSY ("Socket timeout"). This is the boring, correct setting for a
 * single-node 2c/2G VPS; at PostgreSQL day the URL switches in Coolify and
 * this override keeps working (PG ignores connection_limit=1 badly, so the
 * param is only injected for file: URLs).
 */
function sqliteUrl(): string | undefined {
  const raw = process.env.DATABASE_URL
  if (!raw || !raw.startsWith("file:")) return undefined
  if (raw.includes("connection_limit=")) return raw
  return `${raw}?connection_limit=1&pool_timeout=20`
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "production"
        ? ["error", "warn"]
        : process.env.PRISMA_QUERY_LOG === "1"
          ? ["query", "error", "warn"]
          : ["error", "warn"],
    ...(sqliteUrl() ? { datasources: { db: { url: sqliteUrl() } } } : {}),
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
