// ── sms/ippanel.ts — ippanel.com adapter, BOTH server generations (rounds 26/44/45) ──
// Per the owner: ippanel.com documents TWO connection addresses (domestic vs
// foreign server) — https://ippanel.com/developers/documents — and accounts on
// different servers must call their own address. Verified against official docs
// and SDKs:
//
//   ① Edge (new generation) — default
//      Base : https://edge.ippanel.com/v1
//      Auth : Authorization: <apikey>          (raw — no Bearer prefix)
//      Send : POST /api/send  {sending_type:"pattern"|"webservice", from_number,
//                              code|message, recipients:[+98…], params}
//      Credit: GET /api/payment/credit/mine → data.credit
//      Docs : https://ippanelcom.github.io/Edge-Document/docs
//
//   ② Legacy (classic REST — official PHP/Go/Python SDKs)
//      Base : https://api2.ippanel.com/api/v1  (and api.ippanel.com/api/v1)
//      Auth : apikey: <apikey>   (+ x-api-key sent too — both accepted)
//      Pattern : POST /sms/pattern/normal/send {code, sender, recipient, variable}
//      Plain   : POST /sms/send/webservice/single {sender, recipient:[…], message,
//                description:{summary, count_recipient}}
//      Credit  : GET /sms/accounting/credit/show → data.credit
//      Source  : github.com/ippanel/php-rest-sdk Client.php (ENDPOINT, sendPattern,
//                send, getCredit)
//
// Success envelope on both: { data, meta:{status:true,message,message_code} } —
// business errors keep the envelope with meta.status=false and a PERSIAN
// meta.message which we surface verbatim, so the admin SMS report shows the
// provider's own reason. Every function takes an explicit baseUrl so the panel
// can test a *candidate* address before saving it.
export const IPANEL_BASES = {
  edge: "https://edge.ippanel.com/v1",
  legacyDomestic: "https://api.ippanel.com/api/v1",
  legacyForeign: "https://api2.ippanel.com/api/v1",
} as const;

export const DEFAULT_SMS_BASE_URL = IPANEL_BASES.edge;

/** Which request shape does this base URL speak? Edge host ⇒ edge, else legacy. */
export function smsGeneration(baseUrl: string): "edge" | "legacy" {
  return /(^|\.)edge\.ippanel\.com$/i.test(safeHost(baseUrl)) ? "edge" : "legacy";
}

function safeHost(url: string): string {
  try {
    return new URL(url).host;
  } catch {
    return "";
  }
}

/** Validates a candidate base URL from the panel — https only, sane host. */
export function isValidSmsBaseUrl(u: string): boolean {
  if (!u) return true; // empty ⇒ default
  try {
    const p = new URL(u);
    return p.protocol === "https:" && p.host.includes(".") && u.length <= 200;
  } catch {
    return false;
  }
}

function headersFor(apiKey: string, generation: "edge" | "legacy"): Record<string, string> {
  if (generation === "legacy") {
    // official PHP SDK sends `apikey:` — we also send `x-api-key:` for mirrors
    return { apikey: apiKey, "x-api-key": apiKey };
  }
  return { Authorization: apiKey };
}

interface Envelope {
  data?: unknown;
  meta?: { status?: boolean; message?: string; message_code?: string } | null;
}

async function call(
  apiKey: string,
  base: string,
  generation: "edge" | "legacy",
  path: string,
  init: RequestInit,
): Promise<Envelope> {
  let res: Response;
  try {
    res = await fetch(`${base.replace(/\/+$/, "")}${path}`, {
      ...init,
      headers: { ...headersFor(apiKey, generation), Accept: "application/json", "Content-Type": "application/json", ...(init.headers ?? {}) },
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
  } catch (e) {
    // network/DNS/timeout — name it so the report is readable at a glance
    throw new Error(`ippanel_network_${e instanceof Error && e.name === "TimeoutError" ? "timeout" : "error"}`);
  }
  const raw = await res.text().catch(() => "");
  let body: Envelope = {};
  try {
    body = JSON.parse(raw) as Envelope;
  } catch {
    body = {};
  }
  if (body.meta?.status === true) return body;
  if (body.meta?.status === false) {
    // provider's own business error — surface its Persian message verbatim
    const code = body.meta.message_code ? `[${body.meta.message_code}] ` : "";
    throw new Error(`${code}${body.meta.message ?? "خطای ناشناختهٔ سرویس پیامکی"}`.slice(0, 180));
  }
  // 5xx usually returns an HTML Cloudflare error page (no JSON envelope).
  // Round 45: hint about the OTHER server address — per the docs, panels on the
  // other server must use the other base URL.
  if (res.status >= 500) {
    throw new Error(
      `ippanel_http_${res.status} — پاسخ ۵۰x از آدرس سرویس (قطعی موقت یا مسدودی CDN) — در تنظیمات، آدرس سرویس دیگر را هم امتحان کن`.slice(0, 180),
    );
  }
  if (res.status === 401 || res.status === 403) {
    throw new Error(`ippanel_${res.status} — کلید API پذیرفته نشد (${res.status})`);
  }
  if (!res.ok) {
    throw new Error(`ippanel_http_${res.status} — ${body.meta?.message ?? raw.slice(0, 80)}`.slice(0, 180));
  }
  // 2xx without meta — legacy quirk tolerance: accept when data exists
  if (body.data !== undefined && body.data !== null) return body;
  throw new Error("ippanel_bad_response — پاسخ نامعتبر از سرویس پیامک");
}

/**
 * E.164 (+98…) for Edge — the Edge API wants +98 for sender and recipients.
 * Internal storage uses 09xxxxxxxxx; panel lines may be 3000505 / +983000505 /
 * 983000505 / ۰۹۱۲… — all normalize here.
 */
function toE164(raw: string): string {
  let s = raw.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/[^\d+]/g, "");
  if (!s) return "";
  if (s.startsWith("+")) return s;
  if (s.startsWith("00")) return `+${s.slice(2)}`;
  if (s.startsWith("98")) return `+${s}`;
  return `+98${s.startsWith("0") ? s.slice(1) : s}`;
}

/** Legacy format per the official SDK examples: recipient «98912…» (no plus). */
function toLegacyRecipient(raw: string): string {
  return toE164(raw).replace(/^\+/, "");
}

function pickMessageId(body: Envelope): string {
  const d = body.data as { message_outbox_ids?: unknown[]; message_id?: unknown } | null;
  if (d && typeof d.message_id !== "undefined") return String(d.message_id);
  if (d && Array.isArray(d.message_outbox_ids) && d.message_outbox_ids.length) {
    return String(d.message_outbox_ids[0]);
  }
  return "";
}

export interface PatternSendResult {
  messageId: string;
  provider: "ippanel_pattern";
}

/** Pattern send — `variables` keys are the pattern's own variable names (%code% …). */
export async function ippanelSendPattern(
  apiKey: string,
  baseUrl: string,
  patternCode: string,
  sender: string,
  recipient: string,
  variables: Record<string, string>,
): Promise<PatternSendResult> {
  const generation = smsGeneration(baseUrl);
  const body =
    generation === "edge"
      ? await call(apiKey, baseUrl, generation, "/api/send", {
          method: "POST",
          body: JSON.stringify({
            sending_type: "pattern",
            from_number: toE164(sender) || undefined,
            code: patternCode,
            recipients: [toE164(recipient)],
            params: variables,
          }),
        })
      : await call(apiKey, baseUrl, generation, "/sms/pattern/normal/send", {
          method: "POST",
          body: JSON.stringify({
            code: patternCode,
            sender: toE164(sender) || undefined,
            recipient: toLegacyRecipient(recipient),
            variable: variables,
          }),
        });
  return { messageId: pickMessageId(body), provider: "ippanel_pattern" };
}

export interface PlainSendResult {
  messageId: string;
  provider: "ippanel";
}

/** Plain (non-pattern) send — used when a template has no pattern code. */
export async function ippanelSendPlain(
  apiKey: string,
  baseUrl: string,
  text: string,
  sender: string,
  recipient: string,
): Promise<PlainSendResult> {
  const generation = smsGeneration(baseUrl);
  const body =
    generation === "edge"
      ? await call(apiKey, baseUrl, generation, "/api/send", {
          method: "POST",
          body: JSON.stringify({
            sending_type: "webservice",
            from_number: toE164(sender) || undefined,
            message: text,
            params: { recipients: [toE164(recipient)] },
          }),
        })
      : await call(apiKey, baseUrl, generation, "/sms/send/webservice/single", {
          method: "POST",
          body: JSON.stringify({
            sender: toE164(sender) || undefined,
            recipient: [toLegacyRecipient(recipient)],
            message: text,
            description: { summary: "ارسال از پنل", count_recipient: "1" },
          }),
        });
  return { messageId: pickMessageId(body), provider: "ippanel" };
}

/** Panel credit — admin «اعتبار پنل» card (best-effort, never blocks sending). */
export async function ippanelCredit(apiKey: string, baseUrl: string): Promise<number | null> {
  const d = await ippanelCreditDiag(apiKey, baseUrl);
  return d.ok ? (d.credit ?? null) : null;
}

/** Credit + RAW connection diagnosis — admin SMS tab shows the provider's own
 * error text instead of a silent «—». Accepts explicit key AND base URL so
 * «تست اتصال» can validate not-yet-saved candidates. */
export async function ippanelCreditDiag(
  apiKey: string,
  baseUrl: string,
): Promise<{ ok: boolean; credit?: number; error?: string }> {
  if (!apiKey) return { ok: false, error: "کلید API تنظیم نشده است" };
  try {
    const generation = smsGeneration(baseUrl);
    const body =
      generation === "edge"
        ? await call(apiKey, baseUrl, generation, "/api/payment/credit/mine", { method: "GET" })
        : await call(apiKey, baseUrl, generation, "/sms/accounting/credit/show", { method: "GET" });
    const d = body.data as { credit?: number | string } | null;
    const n = Number(d?.credit);
    return Number.isFinite(n) ? { ok: true, credit: n } : { ok: false, error: "پاسخ غیرمنتظره سرویس" };
  } catch (e) {
    return { ok: false, error: String(e instanceof Error ? e.message : e).slice(0, 160) };
  }
}
