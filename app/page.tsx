"use client";

import { useState, useCallback } from "react";
import { AlertCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { VehicleCard } from "@/components/VehicleCard";
import { VehicleCardSkeleton } from "@/components/VehicleCardSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { SuccessAnimation } from "@/components/SuccessAnimation";
import { SearchHistoryPanel } from "@/components/SearchHistoryPanel";
import { ExportButtons } from "@/components/ExportButtons";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useVehicleSearch } from "@/hooks/useVehicleSearch";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { useCredits } from "@/hooks/useCredits";

export default function HomePage() {
  const { vehicle, status, error, search } = useVehicleSearch();
  const { history, refresh, clear } = useSearchHistory();
  const { refresh: refreshCredits } = useCredits();
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = useCallback(
    async (registrationNumber: string) => {
      setSearchInput(registrationNumber);
      await search(registrationNumber);
      refresh();
      refreshCredits();
    },
    [search, refresh, refreshCredits]
  );

  const exportedVehicles = vehicle ? [vehicle] : [];

  return (
    <div className="flex min-h-full flex-col bg-zinc-50 dark:bg-zinc-950">
      <Header />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-zinc-50">
            Vehicle Registration{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Lookup
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
            Instantly retrieve vehicle details, insurance status, and RC
            information using the registration number.
          </p>
        </section>

        <section className="mx-auto mb-8 max-w-3xl">
          <SearchBar
            onSearch={handleSearch}
            isLoading={status === "loading"}
            initialValue={searchInput}
          />
        </section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {error && status === "error" && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/30">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                <div>
                  <p className="font-medium text-red-700 dark:text-red-400">
                    Search failed
                  </p>
                  <p className="mt-1 text-sm text-red-600 dark:text-red-300">
                    {error}
                  </p>
                </div>
              </div>
            )}

            {status === "loading" && <VehicleCardSkeleton />}

            {status === "success" && vehicle && (
              <ErrorBoundary>
                <SuccessAnimation />
                <VehicleCard vehicle={vehicle} />
              </ErrorBoundary>
            )}

            {status === "idle" && <EmptyState />}

            {vehicle && (
              <div className="mt-4">
                <ExportButtons vehicles={exportedVehicles} />
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <SearchHistoryPanel
              history={history}
              onSelect={handleSearch}
              onClear={clear}
            />

            <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Sample Numbers
              </h3>
              <ul className="space-y-2 text-sm">
                {["AP39AB1234", "MH12AB1234", "DL01CA1234"].map((num) => (
                  <li key={num}>
                    <button
                      onClick={() => handleSearch(num)}
                      className="font-mono text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400"
                    >
                      {num}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>

      <footer className="border-t border-zinc-200 py-6 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
        Vehicle data is for informational purposes only. Ensure compliance with
        applicable privacy laws and API provider terms.
      </footer>
    </div>
  );
}
