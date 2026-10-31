// ── cloudflare-worker.ts — OpenNext entry + Cron Triggers ──
// wrangler.jsonc points `main` HERE instead of the generated
// .open-next/worker.js so the same Worker also owns scheduled(): Cloudflare's
// Cron Triggers fire it every 5 minutes (and daily at 04:00 Asia/Tehran) and
// it calls the app's own idempotent job endpoints (src/app/api/jobs/[name])
// through the OpenNext WORKER_SELF_REFERENCE service binding — no second
// worker, no public cron URL, secret stays inside the Worker env.
// NOTE: excluded from tsconfig — imports the untyped build artifact.
import handler from "./.open-next/worker.js";

interface Env {
  WORKER_SELF_REFERENCE: {
    fetch: (input: string, init?: Record<string, unknown>) => Promise<Response>;
  };
  CRON_SECRET: string;
  [key: string]: unknown;
}

const CRON_EVERY_5_MIN = "*/5 * * * *";
const CRON_DAILY_PURGE = "30 0 * * *"; // 04:00 Asia/Tehran (UTC+3:30)

type NextHandler = {
  fetch: (request: Request, env: Env, ctx: unknown) => Promise<Response>;
};

export default {
  fetch: (request: Request, env: Env, ctx: unknown): Promise<Response> =>
    (handler as unknown as NextHandler).fetch(request, env, ctx),

  async scheduled(event: { cron: string }, env: Env): Promise<void> {
    const jobs =
      event.cron === CRON_DAILY_PURGE
        ? ["purge"]
        : ["expire-unpaid", "sms-flush", "purge-messages"];
    for (const name of jobs) {
      try {
        const res = await env.WORKER_SELF_REFERENCE.fetch(
          `https://worker-self-reference/api/jobs/${name}`,
          { method: "POST", headers: { "x-cron-secret": env.CRON_SECRET } },
        );
        const body = await res.text();
        console.log(`[cron] ${name} → ${res.status} ${body.slice(0, 140)}`);
      } catch (err) {
        console.error(`[cron] ${name} failed:`, err);
      }
    }
  },
};
