import type { VehicleInfo } from "@/types/vehicle";

export function vehicleToCsvRow(vehicle: VehicleInfo): string {
  const fields = [
    vehicle.registrationNumber,
    vehicle.manufacturer,
    vehicle.model,
    vehicle.variant,
    vehicle.fuelType,
    vehicle.vehicleClass,
    vehicle.registrationDate,
    vehicle.engineNumber,
    vehicle.chassisNumber,
    vehicle.ownerName ?? "N/A",
    vehicle.insuranceStatus,
    vehicle.rcStatus,
    vehicle.fitnessValidity,
    vehicle.vehicleAge,
  ];

  return fields
    .map((field) => `"${String(field).replace(/"/g, '""')}"`)
    .join(",");
}

export function generateCsv(vehicles: VehicleInfo[]): string {
  const headers = [
    "Registration Number",
    "Manufacturer",
    "Model",
    "Variant",
    "Fuel Type",
    "Vehicle Class",
    "Registration Date",
    "Engine Number",
    "Chassis Number",
    "Owner Name",
    "Insurance Status",
    "RC Status",
    "Fitness Validity",
    "Vehicle Age",
  ];

  const rows = vehicles.map(vehicleToCsvRow);
  return [headers.join(","), ...rows].join("\n");
}

export function downloadCsv(vehicles: VehicleInfo[], filename = "vehicle-data.csv") {
  const csv = generateCsv(vehicles);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
