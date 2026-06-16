import type { VehicleInfo } from "@/types/vehicle";

export type VehicleProviderName = "mock" | "carinfo" | "vahan" | "commercial";

/** Raw vehicle record before normalization (e.g. from JSON or external API). */
export interface RawVehicleRecord {
  manufacturer: string;
  model: string;
  variant?: string;
  color?: string;
  fuelType?: string;
  vehicleClass?: string;
  registrationDate?: string;
  engineNumber?: string;
  chassisNumber?: string;
  insuranceStatus?: string;
  rcStatus?: string;
  fitnessValidity?: string;
  imageUrl?: string;
}

export interface VehicleProvider {
  readonly name: VehicleProviderName;
  lookup(registrationNumber: string): Promise<VehicleInfo>;
}

export class VehicleProviderError extends Error {
  constructor(
    message: string,
    public readonly provider: VehicleProviderName,
    public readonly code: "NOT_CONFIGURED" | "NOT_FOUND" | "API_ERROR" = "API_ERROR"
  ) {
    super(message);
    this.name = "VehicleProviderError";
  }
}
