interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 10;

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

export function checkRateLimit(identifier: string): RateLimitResult {
  const now = Date.now();
  const entry = store.get(identifier);

  if (!entry || now > entry.resetAt) {
    const resetAt = now + WINDOW_MS;
    store.set(identifier, { count: 1, resetAt });
    return { success: true, remaining: MAX_REQUESTS - 1, resetAt };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { success: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  store.set(identifier, entry);
  return {
    success: true,
    remaining: MAX_REQUESTS - entry.count,
    resetAt: entry.resetAt,
  };
}

// Periodic cleanup to prevent memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store.entries()) {
      if (now > entry.resetAt) store.delete(key);
    }
  }, WINDOW_MS);
}
