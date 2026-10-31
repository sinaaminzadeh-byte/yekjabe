import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
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

/**
 * PostgreSQL runs through the engineless driver adapter (@prisma/adapter-pg):
 * the JS query compiler replaces the Rust query-engine binary, which cannot
 * execute inside Cloudflare Workers (workerd). Identical behavior on Node
 * hosts (Vercel / Coolify). Activated purely by the DATABASE_URL protocol —
 * no extra flag. Small pool: one isolate ≈ one small app instance; Neon's
 * pooler absorbs the fan-out.
 */
function pgAdapter(): PrismaPg | undefined {
  const url = process.env.DATABASE_URL ?? ""
  if (!/^postgres(ql)?:\/\//i.test(url)) return undefined
  return new PrismaPg({ connectionString: url, max: 5 })
}

const pg = pgAdapter()

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "production"
        ? ["error", "warn"]
        : process.env.PRISMA_QUERY_LOG === "1"
          ? ["query", "error", "warn"]
          : ["error", "warn"],
    // Cast: the SQLite-generated client type has no `adapter` key while the
    // queryCompiler-generated PG client requires it — the runtime branch below
    // always matches whichever client scripts/prisma-boot.mjs generated.
    ...((pg
      ? { adapter: pg }
      : sqliteUrl()
        ? { datasources: { db: { url: sqliteUrl() } } }
        : {}) as ConstructorParameters<typeof PrismaClient>[0]),
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
