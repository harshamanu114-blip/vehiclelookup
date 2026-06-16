import type { VehicleProviderName } from "@/types/provider";

export interface VehicleSearchRequest {
  registrationNumber: string;
}

export interface VehicleInfo {
  registrationNumber: string;
  manufacturer: string;
  model: string;
  variant: string;
  color: string;
  fuelType: string;
  vehicleClass: string;
  registrationDate: string;
  engineNumber: string;
  chassisNumber: string;
  insuranceStatus: string;
  rcStatus: string;
  fitnessValidity: string;
  vehicleAge: string;
  imageUrl: string;
  source: VehicleProviderName;
}

export interface VehicleSearchResponse {
  success: boolean;
  data?: VehicleInfo;
  error?: string;
}

export interface SearchHistoryEntry {
  id: string;
  registrationNumber: string;
  manufacturer: string;
  model: string;
  searchedAt: string;
}

export interface AnalyticsData {
  totalSearches: number;
  successfulSearches: number;
  failedSearches: number;
  topManufacturers: { name: string; count: number }[];
  searchesByDay: { date: string; count: number }[];
  recentActivity: SearchHistoryEntry[];
}

export interface UserCredits {
  remaining: number;
  total: number;
  lastReset: string;
}

export type VehicleSearchStatus = "idle" | "loading" | "success" | "error";
