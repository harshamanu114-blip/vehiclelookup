import type { VehicleProvider, VehicleProviderName } from "@/types/provider";
import { MockVehicleProvider } from "@/lib/providers/mock-vehicle-provider";
import { CarinfoProvider } from "@/lib/providers/carinfo-provider";
import { VahanProvider } from "@/lib/providers/vahan-provider";
import { CommercialApiProvider } from "@/lib/providers/commercial-api-provider";

const providers: Record<VehicleProviderName, () => VehicleProvider> = {
  mock: () => new MockVehicleProvider(),
  carinfo: () => new CarinfoProvider(),
  vahan: () => new VahanProvider(),
  commercial: () => new CommercialApiProvider(),
};

let cachedProvider: VehicleProvider | null = null;

function resolveProviderName(): VehicleProviderName {
  const configured = process.env.VEHICLE_PROVIDER?.toLowerCase();

  if (configured && configured in providers) {
    return configured as VehicleProviderName;
  }

  return "mock";
}

/** Returns the active vehicle provider based on VEHICLE_PROVIDER env var. */
export function getVehicleProvider(): VehicleProvider {
  if (!cachedProvider) {
    cachedProvider = providers[resolveProviderName()]();
  }
  return cachedProvider;
}

/** Resets the cached provider (useful in tests). */
export function resetVehicleProvider(): void {
  cachedProvider = null;
}

export { MockVehicleProvider } from "@/lib/providers/mock-vehicle-provider";
export { CarinfoProvider } from "@/lib/providers/carinfo-provider";
export { VahanProvider } from "@/lib/providers/vahan-provider";
export { CommercialApiProvider } from "@/lib/providers/commercial-api-provider";
