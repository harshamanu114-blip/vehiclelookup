import { Header } from "@/components/Header";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";

export const metadata = {
  title: "Analytics | VehicleLookup",
  description: "Search analytics and usage statistics",
};

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-full flex-col bg-zinc-50 dark:bg-zinc-950">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Analytics Dashboard
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Track your search activity and usage patterns.
          </p>
        </div>
        <AnalyticsDashboard />
      </main>
    </div>
  );
}
