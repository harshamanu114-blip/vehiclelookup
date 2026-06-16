import type { VehicleInfo } from "@/types/vehicle";
import type { RawVehicleRecord, VehicleProvider } from "@/types/provider";
import { VehicleProviderError } from "@/types/provider";
import { buildVehicleInfo } from "@/lib/providers/vehicle-builder";

/**
 * CarInfo API provider.
 * Configure with CARINFO_API_KEY and CARINFO_API_URL.
 */
export class CarinfoProvider implements VehicleProvider {
  readonly name = "carinfo" as const;

  async lookup(registrationNumber: string): Promise<VehicleInfo> {
    const apiKey = process.env.CARINFO_API_KEY;
    const apiUrl = process.env.CARINFO_API_URL;

    if (!apiKey || !apiUrl) {
      throw new VehicleProviderError(
        "CarInfo provider is not configured. Set CARINFO_API_KEY and CARINFO_API_URL.",
        this.name,
        "NOT_CONFIGURED"
      );
    }

    const response = await fetch(`${apiUrl}/vehicle/${registrationNumber}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "X-API-Key": apiKey,
      },
      cache: "no-store",
    });

    if (response.status === 404) {
      throw new VehicleProviderError(
        `No vehicle found for ${registrationNumber}`,
        this.name,
        "NOT_FOUND"
      );
    }

    if (!response.ok) {
      throw new VehicleProviderError(
        `CarInfo API returned ${response.status}`,
        this.name,
        "API_ERROR"
      );
    }

    const data = (await response.json()) as RawVehicleRecord;
    return buildVehicleInfo(registrationNumber, data, this.name);
  }
}
