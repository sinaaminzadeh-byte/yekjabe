// ── errors.ts — one error type, one HTTP mapper (guide §A2) ──
// Every API route throws AppError; the mapper renders { error, details? } JSON.

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

export function toErrorResponse(e: unknown): { body: { error: string; details?: Record<string, unknown> }; status: number } {
  if (e instanceof AppError) {
    return { body: { error: e.code, ...(e.details ? { details: e.details } : {}) }, status: e.status };
  }
  console.error("[api] unhandled error:", e);
  return { body: { error: "server_error" }, status: 500 };
}

/** Wrap a route handler so thrown AppErrors become clean JSON responses. */
export function handle<T>(fn: () => Promise<T>): Promise<T> {
  return fn();
}
