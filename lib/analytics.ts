import type { AnalyticsData, SearchHistoryEntry } from "@/types/vehicle";
import { getSearchHistory } from "@/lib/search-history";

const ANALYTICS_KEY = "vehicle-analytics";

interface AnalyticsStore {
  totalSearches: number;
  successfulSearches: number;
  failedSearches: number;
  manufacturerCounts: Record<string, number>;
  dailyCounts: Record<string, number>;
}

function getStore(): AnalyticsStore {
  if (typeof window === "undefined") {
    return {
      totalSearches: 0,
      successfulSearches: 0,
      failedSearches: 0,
      manufacturerCounts: {},
      dailyCounts: {},
    };
  }

  try {
    const raw = localStorage.getItem(ANALYTICS_KEY);
    if (!raw) {
      return {
        totalSearches: 0,
        successfulSearches: 0,
        failedSearches: 0,
        manufacturerCounts: {},
        dailyCounts: {},
      };
    }
    return JSON.parse(raw) as AnalyticsStore;
  } catch {
    return {
      totalSearches: 0,
      successfulSearches: 0,
      failedSearches: 0,
      manufacturerCounts: {},
      dailyCounts: {},
    };
  }
}

function saveStore(store: AnalyticsStore): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(store));
}

export function trackSearch(
  success: boolean,
  manufacturer?: string
): void {
  const store = getStore();
  const today = new Date().toISOString().split("T")[0];

  store.totalSearches += 1;
  if (success) {
    store.successfulSearches += 1;
    if (manufacturer) {
      store.manufacturerCounts[manufacturer] =
        (store.manufacturerCounts[manufacturer] ?? 0) + 1;
    }
  } else {
    store.failedSearches += 1;
  }

  store.dailyCounts[today] = (store.dailyCounts[today] ?? 0) + 1;
  saveStore(store);
}

export function getAnalyticsData(): AnalyticsData {
  const store = getStore();
  const history = getSearchHistory();

  const topManufacturers = Object.entries(store.manufacturerCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const searchesByDay = Object.entries(store.dailyCounts)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-7);

  return {
    totalSearches: store.totalSearches,
    successfulSearches: store.successfulSearches,
    failedSearches: store.failedSearches,
    topManufacturers,
    searchesByDay,
    recentActivity: history.slice(0, 5) as SearchHistoryEntry[],
  };
}
