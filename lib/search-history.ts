import type { SearchHistoryEntry } from "@/types/vehicle";

const STORAGE_KEY = "vehicle-search-history";
const MAX_ENTRIES = 20;

export function getSearchHistory(): SearchHistoryEntry[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SearchHistoryEntry[];
  } catch {
    return [];
  }
}

export function addToSearchHistory(
  entry: Omit<SearchHistoryEntry, "id" | "searchedAt">
): SearchHistoryEntry[] {
  if (typeof window === "undefined") return [];

  const newEntry: SearchHistoryEntry = {
    ...entry,
    id: crypto.randomUUID(),
    searchedAt: new Date().toISOString(),
  };

  const history = getSearchHistory().filter(
    (h) => h.registrationNumber !== entry.registrationNumber
  );

  const updated = [newEntry, ...history].slice(0, MAX_ENTRIES);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function clearSearchHistory(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
