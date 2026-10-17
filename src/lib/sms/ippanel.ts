// ── sms/ippanel.ts — ippanel.com adapter (owner round: بخش پیامک) ──
// docs: https://docs.ippanel.com — REST v1 at https://api.ippanel.com/api/v1.
// Auth = the API key itself in the Authorization header (no Bearer prefix).
// Sending is PATTERN-first (owner: «ارسال ها بر اساس پترن هست تا سریعتر ارسال
// بشه»): POST /sms/pattern/send with { code, sender, recipient, variable }.
// The docs site hosts the same contract at /sms/pattern/send/send on some
// versions — we probe both, then remember the one that worked.
// Every call is short-timeout; failures throw so the outbox retry/backoff and
// the admin report stay honest (no silent fake sends).
import { env } from "../env";

const BASE = "https://api.ippanel.com/api/v1";
let patternPath: "/sms/pattern/send/send" | "/sms/pattern/send" | null = null;

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

interface IppanelEnvelope {
  status?: string; // "OK" | "ERROR"
  code?: number; // 200 on success
  data?: unknown;
  meta?: { message?: string; status?: number } | null;
  errorMessage?: string;
}

async function call(path: string, init: RequestInit): Promise<IppanelEnvelope> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { ...headers(), ...(init.headers ?? {}) },
    signal: AbortSignal.timeout(10_000),
    cache: "no-store",
  });
  const body = (await res.json().catch(() => ({}))) as IppanelEnvelope;
  // ippanel answers non-2xx for quota/auth errors with an envelope inside
  if (!res.ok && !body.status && !body.code) {
    throw new Error(`ippanel_http_${res.status}`);
  }
  return body;
}

function assertOk(b: IppanelEnvelope): void {
  if (b.status && b.status.toUpperCase() !== "OK") {
    throw new Error(`ippanel_${b.status}${b.errorMessage ? `_${b.errorMessage}` : ""}`);
  }
  if (b.code && b.code !== 200) throw new Error(`ippanel_code_${b.code}`);
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
  const payload = JSON.stringify({
    code: patternCode,
    sender: sender || undefined,
    recipient,
    variable: variables,
  });
  // probe both documented path variants once, then stick with the winner
  const candidates: ("/sms/pattern/send/send" | "/sms/pattern/send")[] = patternPath
    ? [patternPath]
    : ["/sms/pattern/send/send", "/sms/pattern/send"];
  let lastErr: unknown = new Error("ippanel_no_path");
  for (const path of candidates) {
    try {
      const body = await call(path, { method: "POST", body: payload });
      assertOk(body);
      patternPath = path;
      const d = body.data as { message_id?: number | string; id?: number | string } | null;
      return { messageId: String(d?.message_id ?? d?.id ?? ""), provider: "ippanel_pattern" };
    } catch (e) {
      lastErr = e;
      const msg = String(e);
      if (!msg.includes("404")) throw e; // real error (auth/quota/network) — surface it
    }
  }
  throw lastErr;
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
  const body = await call("/sms/send/send", {
    method: "POST",
    body: JSON.stringify({ recipient: [recipient], sender: sender || undefined, message: text }),
  });
  assertOk(body);
  const d = body.data as { message_id?: number | string; id?: number | string } | null;
  return { messageId: String(d?.message_id ?? d?.id ?? ""), provider: "ippanel" };
}

/** Panel credit (تومان-ish unit per ippanel) — admin «اعتبار پنل» card. */
export async function ippanelCredit(): Promise<number | null> {
  if (!ippanelConfigured()) return null;
  try {
    const body = await call("/sms/account/credit", { method: "GET" });
    assertOk(body);
    const d = body.data as { credit?: number | string } | Record<string, unknown> | null;
    const raw = typeof d === "object" && d !== null ? (d as { credit?: number | string }).credit : undefined;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null; // credit display is best-effort, never blocks sending
  }
}
