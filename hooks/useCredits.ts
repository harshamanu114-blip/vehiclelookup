"use client";

import { useState, useEffect, useCallback } from "react";
import type { UserCredits } from "@/types/vehicle";
import { getCredits } from "@/lib/credits";

export function useCredits() {
  const [credits, setCredits] = useState<UserCredits | null>(null);

  const refresh = useCallback(() => {
    setCredits(getCredits());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { credits, refresh };
}
