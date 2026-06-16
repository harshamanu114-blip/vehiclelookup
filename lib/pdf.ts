import { jsPDF } from "jspdf";
import type { VehicleInfo } from "@/types/vehicle";
import { SOURCE_LABELS } from "@/lib/vehicle-images";

export function downloadVehiclePdf(vehicle: VehicleInfo) {
  const doc = new jsPDF();
  const margin = 20;
  let y = margin;

  doc.setFontSize(20);
  doc.setTextColor(37, 99, 235);
  doc.text("Vehicle Lookup Report", margin, y);
  y += 12;

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated: ${new Date().toLocaleString()}`, margin, y);
  y += 15;

  doc.setDrawColor(229, 231, 235);
  doc.line(margin, y, 190, y);
  y += 12;

  const fields: [string, string][] = [
    ["Registration Number", vehicle.registrationNumber],
    ["Manufacturer", vehicle.manufacturer],
    ["Model", vehicle.model],
    ["Variant", vehicle.variant],
    ["Color", vehicle.color],
    ["Fuel Type", vehicle.fuelType],
    ["Vehicle Class", vehicle.vehicleClass],
    ["Registration Date", vehicle.registrationDate],
    ["Engine Number", vehicle.engineNumber],
    ["Chassis Number", vehicle.chassisNumber],
    ["Insurance Status", vehicle.insuranceStatus],
    ["RC Status", vehicle.rcStatus],
    ["Fitness Validity", vehicle.fitnessValidity],
    ["Vehicle Age", vehicle.vehicleAge],
    ["Data Source", SOURCE_LABELS[vehicle.source]],
  ];

  doc.setFontSize(11);
  for (const [label, value] of fields) {
    doc.setTextColor(100, 100, 100);
    doc.text(label, margin, y);
    doc.setTextColor(30, 30, 30);
    doc.text(value, margin + 60, y);
    y += 9;
  }

  y += 10;
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(
    "This report is for informational purposes only. Verify details with official sources.",
    margin,
    y,
    { maxWidth: 170 }
  );

  doc.save(`vehicle-${vehicle.registrationNumber}.pdf`);
}
