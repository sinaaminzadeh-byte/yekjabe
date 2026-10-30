-- ── A-04 (audit wave 39): GiftOrder → Order one-time migration ──────────────
-- Runs in prebuild BEFORE `prisma db push` (which drops the legacy table).
-- Idempotent: rows are marked by idempotencyKey = 'legacy-' || legacy id;
-- the WHERE NOT EXISTS guard makes re-runs no-ops.
-- Reality check: the legacy table has 0 rows in every known environment —
-- this script exists so a production DB that DID collect legacy rows before
-- the v2 checkout never loses them when the model is dropped.
--
-- Mapping decisions (documented for reviewers):
--   code            → 'PN-LEG-' || LPAD(no,4,'0')  (unique: no was unique)
--   idempotencyKey  → 'legacy-' || id              (migration marker, unique)
--   status          → paid|packing|shipped|delivered (legacy 4-step ≅ v2 names)
--   userPhone       → userPhone + sessionPhone + senderPhone
--   "phone" (rcpt)  → recipientPhone · "to" → recipientName
--   anonymous       → senderDisplay 'anon' | 'name'
--   hearts/paws     → charmHearts/charmPaws · total → totalToman+subtotalToman
--   opened          → giftOpened
--   password        → DROPPED (legacy plaintext card codes are never copied
--                     into cardPasswordHash — scrypt hashing needs app code;
--                     count is printed by the prebuild step for follow-up)
--   kind            → best-effort OrderItem via product slug → first variant

INSERT INTO "Order" (
  id, code, idempotencyKey, requestHash, status, paymentMethod,
  senderName, senderPhone, recipientName, recipientPhone, city, address,
  message, occasion, anonymous, senderDisplay,
  charmHearts, charmPaws,
  subtotalToman, shippingToman, discountToman, totalToman,
  userPhone, sessionPhone,
  giftOpened, retentionPlan, mediaKeys, mediaCount,
  messagePurgeStatus, messagePurgeAttempts,
  "createdAt", "updatedAt"
)
SELECT
  'legacy-' || g.id,
  'PN-LEG-' || LPAD(g.no::text, 4, '0'),
  'legacy-' || g.id,
  '',
  CASE g.status
    WHEN 'packing'   THEN 'packing'
    WHEN 'shipped'   THEN 'shipped'
    WHEN 'delivered' THEN 'delivered'
    ELSE 'paid'
  END,
  'manual_transfer',
  g."senderName",
  g."userPhone",
  g."to",
  g."phone",
  g.city,
  g.address,
  g.message,
  g.occasion,
  g.anonymous,
  CASE WHEN g.anonymous THEN 'anon' ELSE 'name' END,
  g.hearts,
  g.paws,
  g.total, 0, 0, g.total,
  g."userPhone",
  g."userPhone",
  g.opened,
  '1m',
  '[]',
  0,
  'active',
  0,
  COALESCE(g."createdAt", now()),
  COALESCE(g."updatedAt", now())
FROM "GiftOrder" g
WHERE NOT EXISTS (
  SELECT 1 FROM "Order" o WHERE o."idempotencyKey" = 'legacy-' || g.id
);

-- Best-effort line items: legacy rows were single-plush gifts; if the slug
-- still matches a live product, attach its first variant at the paid total.
INSERT INTO "OrderItem" (id, "orderId", "variantId", "titleSnapshot", "unitPriceToman", qty)
SELECT
  'legacy-item-' || g.id,
  'legacy-' || g.id,
  fv.variant_id,
  fv.title,
  g.total,
  1
FROM "GiftOrder" g
JOIN LATERAL (
  SELECT v.id AS variant_id, p.title AS title
  FROM "Product" p
  JOIN "ProductVariant" v ON v."productId" = p.id
  WHERE p.slug = g.kind
  ORDER BY v."createdAt" ASC
  LIMIT 1
) fv ON true
WHERE NOT EXISTS (
  SELECT 1 FROM "OrderItem" oi WHERE oi.id = 'legacy-item-' || g.id
);
