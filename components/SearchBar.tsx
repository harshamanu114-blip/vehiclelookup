"use client";

import { useState, useEffect, FormEvent } from "react";
import { Search, X } from "lucide-react";
import { normalizeRegistrationNumber } from "@/lib/validation";
import { LoadingSpinner } from "./LoadingSpinner";

interface SearchBarProps {
  onSearch: (registrationNumber: string) => void;
  isLoading?: boolean;
  initialValue?: string;
}

export function SearchBar({
  onSearch,
  isLoading = false,
  initialValue = "",
}: SearchBarProps) {
  const [value, setValue] = useState(initialValue);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (initialValue) setValue(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const normalized = normalizeRegistrationNumber(value);
    if (normalized) onSearch(normalized);
  };

  const handleClear = () => {
    setValue("");
    setTouched(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value.toUpperCase())}
            onBlur={() => setTouched(true)}
            placeholder="AP39AB1234"
            disabled={isLoading}
            maxLength={15}
            className="w-full rounded-xl border border-zinc-200 bg-white py-4 pl-12 pr-12 text-lg font-mono tracking-wider text-zinc-900 shadow-sm transition-all placeholder:font-sans placeholder:tracking-normal placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400"
            aria-label="Vehicle registration number"
          />
          {value && !isLoading && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading || !value.trim()}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-[140px]"
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" />
              <span>Searching</span>
            </>
          ) : (
            <>
              <Search className="h-5 w-5" />
              <span>Search</span>
            </>
          )}
        </button>
      </div>
      {touched && !value.trim() && (
        <p className="mt-2 text-sm text-amber-600 dark:text-amber-400">
          Please enter a registration number.
        </p>
      )}
    </form>
  );
}
