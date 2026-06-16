"use client";

import { Download } from "lucide-react";
import type { VehicleInfo } from "@/types/vehicle";
import { downloadCsv } from "@/lib/csv";

interface ExportButtonsProps {
  vehicles: VehicleInfo[];
}

export function ExportButtons({ vehicles }: ExportButtonsProps) {
  if (vehicles.length === 0) return null;

  return (
    <button
      onClick={() => downloadCsv(vehicles)}
      className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
    >
      <Download className="h-4 w-4" />
      Export CSV
    </button>
  );
}
