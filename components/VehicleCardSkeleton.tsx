export function VehicleCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="aspect-[4/3] bg-zinc-200 dark:bg-zinc-800 sm:aspect-[16/9]" />
      <div className="grid grid-cols-3 gap-2 border-b border-zinc-100 p-3 dark:border-zinc-800 sm:gap-3 sm:p-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-14 rounded-xl bg-zinc-100 dark:bg-zinc-800" />
        ))}
      </div>
      <div className="space-y-6 p-4 sm:p-6">
        <div className="h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-20 rounded-2xl bg-zinc-100 dark:bg-zinc-800" />
          ))}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="h-12 flex-1 rounded-xl bg-zinc-100 dark:bg-zinc-800" />
          <div className="h-12 flex-1 rounded-xl bg-zinc-100 dark:bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}
