"use client";

import { useState, useCallback } from "react";
import type { VehicleInfo, VehicleSearchStatus } from "@/types/vehicle";
import { getValidationError } from "@/lib/validation";
import { addToSearchHistory } from "@/lib/search-history";
import { useCredit, hasCredits } from "@/lib/credits";
import { trackSearch } from "@/lib/analytics";

interface UseVehicleSearchReturn {
  vehicle: VehicleInfo | null;
  status: VehicleSearchStatus;
  error: string | null;
  search: (registrationNumber: string) => Promise<void>;
  reset: () => void;
}

export function useVehicleSearch(): UseVehicleSearchReturn {
  const [vehicle, setVehicle] = useState<VehicleInfo | null>(null);
  const [status, setStatus] = useState<VehicleSearchStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (registrationNumber: string) => {
    const validationError = getValidationError(registrationNumber);
    if (validationError) {
      setError(validationError);
      setStatus("error");
      trackSearch(false);
      return;
    }

    if (!hasCredits()) {
      setError("No search credits remaining. Credits reset daily.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setError(null);
    setVehicle(null);

    try {
      const response = await fetch("/api/vehicle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationNumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to fetch vehicle data");
      }

      useCredit();
      setVehicle(data.data);
      setStatus("success");
      trackSearch(true, data.data.manufacturer);

      addToSearchHistory({
        registrationNumber: data.data.registrationNumber,
        manufacturer: data.data.manufacturer,
        model: data.data.model,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
      setStatus("error");
      trackSearch(false);
    }
  }, []);

  const reset = useCallback(() => {
    setVehicle(null);
    setStatus("idle");
    setError(null);
  }, []);

  return { vehicle, status, error, search, reset };
}
