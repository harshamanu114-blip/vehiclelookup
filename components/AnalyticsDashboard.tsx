"use client";

import {
  BarChart3,
  Search,
  CheckCircle2,
  XCircle,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { AnalyticsData } from "@/types/vehicle";
import { getAnalyticsData } from "@/lib/analytics";

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
          <p className="mt-1 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            {value}
          </p>
        </div>
        <div className={`rounded-xl p-3 ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    setData(getAnalyticsData());
  }, []);

  if (!data) return null;

  const successRate =
    data.totalSearches > 0
      ? Math.round((data.successfulSearches / data.totalSearches) * 100)
      : 0;

  const maxDayCount = Math.max(...data.searchesByDay.map((d) => d.count), 1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Searches"
          value={data.totalSearches}
          icon={Search}
          color="bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
        />
        <StatCard
          label="Successful"
          value={data.successfulSearches}
          icon={CheckCircle2}
          color="bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
        />
        <StatCard
          label="Failed"
          value={data.failedSearches}
          icon={XCircle}
          color="bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400"
        />
        <StatCard
          label="Success Rate"
          value={successRate}
          icon={TrendingUp}
          color="bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            <BarChart3 className="h-4 w-4" />
            Searches (Last 7 Days)
          </h3>
          {data.searchesByDay.length === 0 ? (
            <p className="text-sm text-zinc-500">No search data yet.</p>
          ) : (
            <div className="flex items-end gap-2" style={{ height: 120 }}>
              {data.searchesByDay.map((day) => (
                <div key={day.date} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-md bg-blue-500 transition-all dark:bg-blue-600"
                    style={{
                      height: `${(day.count / maxDayCount) * 100}%`,
                      minHeight: day.count > 0 ? 8 : 2,
                    }}
                  />
                  <span className="text-[10px] text-zinc-400">
                    {day.date.slice(5)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Top Manufacturers
          </h3>
          {data.topManufacturers.length === 0 ? (
            <p className="text-sm text-zinc-500">No data yet.</p>
          ) : (
            <ul className="space-y-3">
              {data.topManufacturers.map((m, i) => (
                <li key={m.name} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {m.name}
                  </span>
                  <span className="text-sm text-zinc-500">{m.count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
