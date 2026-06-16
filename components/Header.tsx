"use client";

import Link from "next/link";
import { Car, BarChart3 } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { CreditsDisplay } from "./CreditsDisplay";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-lg dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
            <Car className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              VehicleLookup
            </span>
            <span className="hidden text-xs text-zinc-500 sm:block">
              Indian RC Information
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4">
          <CreditsDisplay />
          <Link
            href="/analytics"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Analytics</span>
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
