import type { VehicleInfo } from "@/types/vehicle";
import type { RawVehicleRecord, VehicleProviderName } from "@/types/provider";
import {
  resolveVehicleColor,
  resolveVehicleImage,
} from "@/lib/vehicle-images";

export function maskIdentifier(
  value: string,
  visibleStart = 4,
  visibleEnd = 2
): string {
  if (!value || value.length <= visibleStart + visibleEnd) return "****";
  const start = value.slice(0, visibleStart);
  const end = value.slice(-visibleEnd);
  const masked = "*".repeat(
    Math.max(4, value.length - visibleStart - visibleEnd)
  );
  return `${start}${masked}${end}`;
}

export function calculateVehicleAge(registrationDate: string): string {
  const regDate = new Date(registrationDate);
  if (Number.isNaN(regDate.getTime())) return "Unknown";

  const now = new Date();
  let years = now.getFullYear() - regDate.getFullYear();
  let months = now.getMonth() - regDate.getMonth();

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years === 0) return `${months} month${months !== 1 ? "s" : ""}`;
  if (months === 0) return `${years} year${years !== 1 ? "s" : ""}`;
  return `${years} year${years !== 1 ? "s" : ""}, ${months} month${months !== 1 ? "s" : ""}`;
}

export function buildVehicleInfo(
  registrationNumber: string,
  raw: RawVehicleRecord,
  source: VehicleProviderName
): VehicleInfo {
  const manufacturer = raw.manufacturer ?? "Unknown";
  const model = raw.model ?? "Unknown";
  const color = resolveVehicleColor(registrationNumber, raw.color);

  return {
    registrationNumber,
    manufacturer,
    model,
    variant: raw.variant ?? "—",
    color,
    fuelType: raw.fuelType ?? "—",
    vehicleClass: raw.vehicleClass ?? "—",
    registrationDate: raw.registrationDate ?? "—",
    engineNumber: maskIdentifier(raw.engineNumber ?? "UNKNOWN"),
    chassisNumber: maskIdentifier(raw.chassisNumber ?? "UNKNOWN"),
    insuranceStatus: raw.insuranceStatus ?? "Unknown",
    rcStatus: raw.rcStatus ?? "Unknown",
    fitnessValidity: raw.fitnessValidity ?? "—",
    vehicleAge: calculateVehicleAge(raw.registrationDate ?? ""),
    imageUrl: resolveVehicleImage(manufacturer, model, raw.imageUrl),
    source,
  };
}
