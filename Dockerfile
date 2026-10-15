# ─────────────────────────────────────────────────────────────────────────────
# Pishnam — multi-stage image (guide D1): standalone output, non-root, healthcheck
# Build is done OUTSIDE Iran (CI) and pushed to a reachable registry; the
# Iranian server only pulls. Customer data never touches the build machine.
# ─────────────────────────────────────────────────────────────────────────────

# ── deps: install with bun (repo ships bun.lock) ──
FROM oven/bun:1 AS deps
WORKDIR /app
COPY package.json bun.lock ./
COPY prisma ./prisma
RUN bun install --frozen-lockfile

# ── build: next build (standalone) against the PRODUCTION (postgres) schema ──
FROM oven/bun:1 AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# The canonical production schema replaces the dev (sqlite) one for the build.
RUN cp prisma/schema.postgres.prisma prisma/schema.prisma \
  && bunx prisma generate \
  && bun run build

# ── run: slim Node runtime, non-root ──
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    TZ=Asia/Tehran \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN addgroup -S pishnam && adduser -S pishnam -G pishnam
COPY --from=builder /app/public ./public
# standalone output ships its own node_modules subset + server.js
COPY --from=builder --chown=pishnam:pishnam /app/.next/standalone ./
COPY --from=builder --chown=pishnam:pishnam /app/.next/static ./.next/static
USER pishnam
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.js"]
