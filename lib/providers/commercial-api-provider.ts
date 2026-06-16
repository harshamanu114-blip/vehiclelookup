import type { VehicleInfo } from "@/types/vehicle";
import type { RawVehicleRecord, VehicleProvider } from "@/types/provider";
import { VehicleProviderError } from "@/types/provider";
import { buildVehicleInfo } from "@/lib/providers/vehicle-builder";

export class CommercialApiProvider implements VehicleProvider {
  readonly name = "commercial" as const;

  async lookup(registrationNumber: string): Promise<VehicleInfo> {
    const apiKey = process.env.VEHICLE_API_KEY;
    const apiUrl = process.env.VEHICLE_API_URL;

    if (!apiKey || !apiUrl) {
      throw new VehicleProviderError(
        "Commercial API provider is not configured. Set VEHICLE_API_KEY and VEHICLE_API_URL.",
        this.name,
        "NOT_CONFIGURED"
      );
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "X-API-Key": apiKey,
      },
      body: JSON.stringify({ registrationNumber }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new VehicleProviderError(
        `Commercial API returned ${response.status}`,
        this.name,
        "API_ERROR"
      );
    }

    const data = (await response.json()) as RawVehicleRecord;
    return buildVehicleInfo(registrationNumber, data);
  }
}
