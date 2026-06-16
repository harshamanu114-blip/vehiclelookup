"use client";

import type { VehicleProviderName } from "@/types/provider";
import { SOURCE_COLORS, SOURCE_LABELS } from "@/lib/vehicle-images";
import { Database } from "lucide-react";

interface SourceBadgeProps {
  source: VehicleProviderName;
  className?: string;
}

export function SourceBadge({ source, className = "" }: SourceBadgeProps) {
  const colors = SOURCE_COLORS[source];
  const label = SOURCE_LABELS[source];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset backdrop-blur-md ${colors.bg} ${colors.text} ${colors.ring} ${className}`}
    >
      <Database className="h-3 w-3 shrink-0 opacity-80" />
      {label}
    </span>
  );
}
