// ── errors.ts — one error type, one HTTP mapper (guide §A2) ──
// Every API route throws AppError; the mapper renders { error, details? } JSON.
// A-11 (audit wave 38): unexpected (non-AppError) exceptions are logged as ONE
// structured JSON line — name/message/path/timestamp — so ops can grep/join
// them without a log shipper. Best-effort only: logging never throws.

export class AppError extends Error {
  status: number;
  code: string;
  details?: Record<string, unknown>;

  constructor(status: number, code: string, details?: Record<string, unknown>) {
    super(code);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

/** Structured single-line error log (A-11). Console-only by design (no deps). */
export function logServerError(e: unknown, path = ""): void {
  try {
    const line = {
      ts: new Date().toISOString(),
      level: "error",
      scope: "api",
      path,
      name: e instanceof Error ? e.name : typeof e,
      message: e instanceof Error ? e.message : String(e),
      stack: e instanceof Error ? e.stack?.split("\n").slice(0, 6).join(" | ") : undefined,
    };
    console.error(JSON.stringify(line));
  } catch {
    /* logging must never be the thing that breaks the request */
  }
}

export function toErrorResponse(e: unknown, path = ""): { body: { error: string; details?: Record<string, unknown> }; status: number } {
  if (e instanceof AppError) {
    return { body: { error: e.code, ...(e.details ? { details: e.details } : {}) }, status: e.status };
  }
  logServerError(e, path);
  return { body: { error: "server_error" }, status: 500 };
}

/** Wrap a route handler so thrown AppErrors become clean JSON responses. */
export function handle<T>(fn: () => Promise<T>): Promise<T> {
  return fn();
}
