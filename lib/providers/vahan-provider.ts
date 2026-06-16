import type { VehicleInfo } from "@/types/vehicle";
import type { RawVehicleRecord, VehicleProvider } from "@/types/provider";
import { VehicleProviderError } from "@/types/provider";
import { buildVehicleInfo } from "@/lib/providers/vehicle-builder";

/**
 * VAHAN (government RC) provider.
 * Configure with VAHAN_API_KEY and VAHAN_API_URL.
 */
export class VahanProvider implements VehicleProvider {
  readonly name = "vahan" as const;

  async lookup(registrationNumber: string): Promise<VehicleInfo> {
    const apiKey = process.env.VAHAN_API_KEY;
    const apiUrl = process.env.VAHAN_API_URL;

    if (!apiKey || !apiUrl) {
      throw new VehicleProviderError(
        "VAHAN provider is not configured. Set VAHAN_API_KEY and VAHAN_API_URL.",
        this.name,
        "NOT_CONFIGURED"
      );
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ regNo: registrationNumber }),
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
        `VAHAN API returned ${response.status}`,
        this.name,
        "API_ERROR"
      );
    }

    const data = (await response.json()) as RawVehicleRecord;
    return buildVehicleInfo(registrationNumber, data);
  }
}
