"use client";

import { Clock, Trash2 } from "lucide-react";
import type { SearchHistoryEntry } from "@/types/vehicle";

interface SearchHistoryProps {
  history: SearchHistoryEntry[];
  onSelect: (registrationNumber: string) => void;
  onClear: () => void;
}

export function SearchHistoryPanel({
  history,
  onSelect,
  onClear,
}: SearchHistoryProps) {
  if (history.length === 0) return null;

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <Clock className="h-4 w-4 text-zinc-400" />
          Recent Lookups
        </h3>
        <button
          onClick={onClear}
          className="flex items-center gap-1 text-xs text-zinc-500 transition-colors hover:text-red-500"
        >
          <Trash2 className="h-3 w-3" />
          Clear
        </button>
      </div>
      <ul className="space-y-2">
        {history.map((entry) => (
          <li key={entry.id}>
            <button
              onClick={() => onSelect(entry.registrationNumber)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800"
            >
              <div>
                <p className="font-mono text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {entry.registrationNumber}
                </p>
                <p className="text-xs text-zinc-500">
                  {entry.manufacturer} {entry.model}
                </p>
              </div>
              <time className="text-xs text-zinc-400">
                {new Date(entry.searchedAt).toLocaleDateString()}
              </time>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
