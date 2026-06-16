"use client";

import { useState, useEffect, useCallback } from "react";
import type { SearchHistoryEntry } from "@/types/vehicle";
import {
  getSearchHistory,
  clearSearchHistory as clearHistory,
} from "@/lib/search-history";

export function useSearchHistory() {
  const [history, setHistory] = useState<SearchHistoryEntry[]>([]);

  useEffect(() => {
    setHistory(getSearchHistory());
  }, []);

  const refresh = useCallback(() => {
    setHistory(getSearchHistory());
  }, []);

  const clear = useCallback(() => {
    clearHistory();
    setHistory([]);
  }, []);

  return { history, refresh, clear };
}
