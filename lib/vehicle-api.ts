import type { VehicleInfo } from "@/types/vehicle";
import { VehicleProviderError } from "@/types/provider";
import { normalizeRegistrationNumber } from "@/lib/validation";
import { getVehicleProvider } from "@/lib/providers";

/**
 * Server-side vehicle lookup service.
 * Delegates to the configured VehicleProvider — frontend code never changes
 * when swapping providers.
 */
export async function lookupVehicle(
  registrationNumber: string
): Promise<VehicleInfo> {
  const normalized = normalizeRegistrationNumber(registrationNumber);
  const provider = getVehicleProvider();

  try {
    return await provider.lookup(normalized);
  } catch (error) {
    if (error instanceof VehicleProviderError) {
      throw error;
    }

    throw new VehicleProviderError(
      "Unable to fetch vehicle information.",
      provider.name,
      "API_ERROR"
    );
  }
}
