// default open-next.config.ts — @opennextjs/cloudflare
// The app is dynamic-heavy (SPA shell + API routes); no ISR, so the default
// (no-op) incremental cache is enough — no R2 bucket binding required.
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({});
