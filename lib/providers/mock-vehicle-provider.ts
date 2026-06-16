import type { VehicleInfo } from "@/types/vehicle";
import type { RawVehicleRecord, VehicleProvider } from "@/types/provider";
import { buildVehicleInfo } from "@/lib/providers/vehicle-builder";
import mockData from "@/data/mock-vehicles.json";

interface MockVehicleDatabase {
  vehicles: Record<string, RawVehicleRecord>;
  fallbackManufacturers: RawVehicleRecord[];
}

const database = mockData as MockVehicleDatabase;

export class MockVehicleProvider implements VehicleProvider {
  readonly name = "mock" as const;

  async lookup(registrationNumber: string): Promise<VehicleInfo> {
    const known = database.vehicles[registrationNumber];
    if (known) {
      return buildVehicleInfo(registrationNumber, known, this.name);
    }

    return buildVehicleInfo(
      registrationNumber,
      this.generateFallback(registrationNumber),
      this.name
    );
  }

  private generateFallback(registrationNumber: string): RawVehicleRecord {
    const manufacturers = database.fallbackManufacturers;
    const hash = registrationNumber
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const pick = manufacturers[hash % manufacturers.length];
    const year = 2015 + (hash % 9);
    const month = String((hash % 12) + 1).padStart(2, "0");
    const day = String((hash % 28) + 1).padStart(2, "0");

    return {
      ...pick,
      fuelType: hash % 3 === 0 ? "Diesel" : "Petrol",
      vehicleClass: "LMV",
      registrationDate: `${year}-${month}-${day}`,
      engineNumber: `ENG${hash}${registrationNumber.slice(-4)}`,
      chassisNumber: `CHS${hash}${registrationNumber}`,
      insuranceStatus: hash % 5 === 0 ? "Expired" : "Active",
      rcStatus: "Active",
      fitnessValidity: `${year + 5}-${month}-${day}`,
    };
  }
}
