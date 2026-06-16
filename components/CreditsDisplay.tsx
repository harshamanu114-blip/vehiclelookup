"use client";

import { Zap } from "lucide-react";
import { useCredits } from "@/hooks/useCredits";

export function CreditsDisplay() {
  const { credits } = useCredits();

  if (!credits) return null;

  const percentage = (credits.remaining / credits.total) * 100;
  const isLow = credits.remaining <= 2;

  return (
    <div
      className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm ${
        isLow
          ? "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-400"
          : "border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
      }`}
      title="Search credits reset daily"
    >
      <Zap className="h-3.5 w-3.5" />
      <span className="font-medium">{credits.remaining}</span>
      <span className="hidden text-xs opacity-70 sm:inline">credits</span>
      <div className="hidden h-1.5 w-12 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700 sm:block">
        <div
          className={`h-full rounded-full transition-all ${
            isLow ? "bg-amber-500" : "bg-blue-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
