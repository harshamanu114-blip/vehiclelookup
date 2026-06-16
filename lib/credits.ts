import type { UserCredits } from "@/types/vehicle";

const STORAGE_KEY = "vehicle-search-credits";
const DEFAULT_CREDITS = 10;
const RESET_INTERVAL_MS = 24 * 60 * 60 * 1000;

function getDefaultCredits(): UserCredits {
  return {
    remaining: DEFAULT_CREDITS,
    total: DEFAULT_CREDITS,
    lastReset: new Date().toISOString(),
  };
}

export function getCredits(): UserCredits {
  if (typeof window === "undefined") return getDefaultCredits();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const defaults = getDefaultCredits();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
      return defaults;
    }

    const credits = JSON.parse(raw) as UserCredits;
    const lastReset = new Date(credits.lastReset).getTime();
    const now = Date.now();

    if (now - lastReset >= RESET_INTERVAL_MS) {
      const refreshed = getDefaultCredits();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(refreshed));
      return refreshed;
    }

    return credits;
  } catch {
    return getDefaultCredits();
  }
}

export function useCredit(): UserCredits | null {
  const credits = getCredits();
  if (credits.remaining <= 0) return null;

  const updated: UserCredits = {
    ...credits,
    remaining: credits.remaining - 1,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function hasCredits(): boolean {
  return getCredits().remaining > 0;
}
