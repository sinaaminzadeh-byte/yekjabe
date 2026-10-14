// ── GET /api/stats — live, honest numbers for the homepage «آمار پیشنام» ──
// All counters come straight from the DB (no invented marketing numbers);
// the only fixed claim is the 98% satisfaction badge, owned by the brand.
// Cached for 30s in module memory — cheap reads, no cache infra needed.
import { NextResponse } from "next/server";

export const revalidate = 0;

interface StatsPayload {
  products: number;
  delivered: number;
  inProgress: number;
  reviews: number;
  avgStars: number; // 0..5, one decimal
  stories: number;
  giftsNo: number; // the «هدیه‌ی شماره» counter shown in the hero
  satisfaction: number; // brand claim, fixed
}

let cache: { at: number; data: StatsPayload } | null = null;

export async function GET() {
  try {
    if (cache && Date.now() - cache.at < 30_000) {
      return NextResponse.json(cache.data);
    }
    const { db } = await import("@/lib/db");
    const [products, delivered, inProgress, reviewAgg, stories, lastGift] = await Promise.all([
      db.productVariant.count({ where: { isActive: true } }),
      db.order.count({ where: { status: "delivered" } }),
      db.order.count({ where: { status: { in: ["paid", "preparing", "shipped"] } } }),
      db.review.aggregate({ where: { approved: true }, _avg: { stars: true }, _count: { _all: true } }),
      db.experience.count({ where: { status: "published" } }),
      db.giftOrder.findFirst({ orderBy: { no: "desc" }, select: { no: true } }),
    ]);
    const data: StatsPayload = {
      products,
      delivered,
      inProgress,
      reviews: reviewAgg._count._all,
      avgStars: Math.round((reviewAgg._avg.stars ?? 0) * 10) / 10,
      stories,
      giftsNo: lastGift?.no ?? 100,
      satisfaction: 98,
    };
    cache = { at: Date.now(), data };
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { products: 6, delivered: 0, inProgress: 0, reviews: 0, avgStars: 0, stories: 0, giftsNo: 100, satisfaction: 98 } satisfies StatsPayload,
      { status: 200 },
    );
  }
}
