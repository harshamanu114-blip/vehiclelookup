export function VehicleCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="aspect-[16/9] bg-zinc-200 dark:bg-zinc-800" />
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <div className="h-7 w-40 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-6 w-20 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-5 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
