-- ─────────────────────────────────────────────────────────────────────────────
-- Pishnam — PostgreSQL CHECK constraints (launch guide §3)
-- Run ONCE after the initial `prisma migrate deploy`:
--   psql "$DATABASE_URL" -f prisma/checks-pg.sql
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE "ProductVariant" DROP CONSTRAINT IF EXISTS stock_nonneg;
ALTER TABLE "ProductVariant" ADD CONSTRAINT stock_nonneg CHECK (stock >= 0);

ALTER TABLE "OrderItem" DROP CONSTRAINT IF EXISTS qty_positive;
ALTER TABLE "OrderItem" ADD CONSTRAINT qty_positive CHECK (qty > 0);

ALTER TABLE "Order" DROP CONSTRAINT IF EXISTS totals_nonneg;
ALTER TABLE "Order" ADD CONSTRAINT totals_nonneg
  CHECK (subtotalToman >= 0 AND shippingToman >= 0 AND discountToman >= 0 AND totalToman >= 0);
