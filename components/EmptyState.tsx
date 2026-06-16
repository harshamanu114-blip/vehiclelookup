import { Search } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/50 px-8 py-16 text-center dark:border-zinc-700 dark:bg-zinc-900/30">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-950">
        <Search className="h-8 w-8 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        Search for a vehicle
      </h3>
      <p className="max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
        Enter an Indian vehicle registration number to view manufacturer, model,
        insurance status, and more.
      </p>
      <p className="mt-4 text-xs text-zinc-400">
        Try: <span className="font-mono font-medium text-blue-600">AP39AB1234</span>
      </p>
    </div>
  );
}
