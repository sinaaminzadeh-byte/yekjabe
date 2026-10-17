// ── sms/ippanel.ts — ippanel.com EDGE API adapter (owner round 26) ──
// Official docs: https://ippanelcom.github.io/Edge-Document/docs
//   Base URL : https://edge.ippanel.com/v1
//   Auth     : Authorization: <apikey|token> (raw value — no Bearer prefix)
// ONE unified send endpoint, «۲ روش» per the owner:
//   POST /api/send  sending_type:"pattern"    → pattern (پترن) send — fast path
//   POST /api/send  sending_type:"webservice" → plain text send
//   GET  /api/payment/credit/mine             → panel credit (admin card)
// Success envelope: { data: { message_outbox_ids: [id] }, meta: { status: true,
//   message: "انجام شد", message_code: "200-1" } } — business errors keep the
//   same envelope with meta.status=false and a PERSIAN meta.message which we
//   surface verbatim, so the admin SMS report shows the provider's own reason
//   (e.g. «اطلاعات وارد شده صحیح نمی باشد» on a bad key). Short timeouts;
//   failures throw so the outbox retry/backoff and reports stay honest.
import { env } from "../env";

const BASE = "https://edge.ippanel.com/v1";

function headers(): Record<string, string> {
  return {
    Authorization: env.IPPANEL_API_KEY ?? "",
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

export function ippanelConfigured(): boolean {
  return Boolean(env.IPPANEL_API_KEY);
}

interface EdgeEnvelope {
  data?: unknown;
  meta?: { status?: boolean; message?: string; message_code?: string } | null;
}

async function call(path: string, init: RequestInit): Promise<EdgeEnvelope> {
  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, {
      ...init,
      headers: { ...headers(), ...(init.headers ?? {}) },
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
  } catch (e) {
    // network/DNS/timeout — name it so the report is readable at a glance
    throw new Error(`ippanel_network_${e instanceof Error && e.name === "TimeoutError" ? "timeout" : "error"}`);
  }
  const body = (await res.json().catch(() => ({}))) as EdgeEnvelope;
  // 200 + meta.status=true is the ONLY success shape (docs §Responses);
  // 401/422 keep the same envelope with meta.status=false + Persian message.
  if (body.meta?.status === true) return body;
  const code = body.meta?.message_code ? `[${body.meta.message_code}] ` : "";
  const msg = body.meta?.message ? ` — ${body.meta.message}` : "";
  throw new Error(`ippanel_${res.status} ${code}${msg}`.trim().slice(0, 180));
}

/**
 * E.164 — the Edge API requires +98… format for BOTH the sender line and the
 * recipients. Internal storage uses 09xxxxxxxxx; panel lines may be configured
 * as 3000505 / +983000505 / 983000505 / ۰۹۱۲… — all normalize here.
 */
function toE164(raw: string): string {
  let s = raw.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/[^\d+]/g, "");
  if (!s) return "";
  if (s.startsWith("+")) return s;
  if (s.startsWith("00")) return `+${s.slice(2)}`;
  if (s.startsWith("98")) return `+${s}`;
  return `+98${s.startsWith("0") ? s.slice(1) : s}`;
}

export interface PatternSendResult {
  messageId: string;
  provider: "ippanel_pattern";
}

/** Pattern send — `variables` keys are the pattern's own variable names. */
export async function ippanelSendPattern(
  patternCode: string,
  sender: string,
  recipient: string,
  variables: Record<string, string>,
): Promise<PatternSendResult> {
  const body = await call("/api/send", {
    method: "POST",
    body: JSON.stringify({
      sending_type: "pattern",
      from_number: toE164(sender) || undefined,
      code: patternCode,
      recipients: [toE164(recipient)],
      params: variables,
    }),
  });
  const ids = (body.data as { message_outbox_ids?: unknown[] } | null)?.message_outbox_ids;
  return {
    messageId: String(Array.isArray(ids) && ids.length ? ids[0] : ""),
    provider: "ippanel_pattern",
  };
}

export interface PlainSendResult {
  messageId: string;
  provider: "ippanel";
}

/** Plain (non-pattern) send — used only when a template has no pattern code. */
export async function ippanelSendPlain(
  text: string,
  sender: string,
  recipient: string,
): Promise<PlainSendResult> {
  const body = await call("/api/send", {
    method: "POST",
    body: JSON.stringify({
      sending_type: "webservice",
      from_number: toE164(sender) || undefined,
      message: text,
      params: { recipients: [toE164(recipient)] },
    }),
  });
  const ids = (body.data as { message_outbox_ids?: unknown[] } | null)?.message_outbox_ids;
  return {
    messageId: String(Array.isArray(ids) && ids.length ? ids[0] : ""),
    provider: "ippanel",
  };
}

/** Panel credit — admin «اعتبار پنل» card (best-effort, never blocks sending). */
export async function ippanelCredit(): Promise<number | null> {
  const d = await ippanelCreditDiag();
  return d.ok ? (d.credit ?? null) : null;
}

/** Credit + RAW connection diagnosis — admin SMS tab shows the provider's own
 * error text (e.g. 502 outage / bad key) instead of a silent «—». */
export async function ippanelCreditDiag(): Promise<{ ok: boolean; credit?: number; error?: string }> {
  if (!ippanelConfigured()) return { ok: false, error: "IPPANEL_API_KEY تنظیم نشده" };
  try {
    const body = await call("/api/payment/credit/mine", { method: "GET" });
    const d = body.data as { credit?: number | string } | null;
    const n = Number(d?.credit);
    return Number.isFinite(n) ? { ok: true, credit: n } : { ok: false, error: "پاسخ غیرمنتظره سرویس" };
  } catch (e) {
    return { ok: false, error: String(e instanceof Error ? e.message : e).slice(0, 160) };
  }
}
