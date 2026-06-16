"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Car,
  Calendar,
  Fuel,
  Shield,
  FileCheck,
  Wrench,
  User,
  Hash,
  Copy,
  Check,
  Download,
} from "lucide-react";
import type { VehicleInfo } from "@/types/vehicle";
import { downloadVehiclePdf } from "@/lib/pdf";

interface VehicleCardProps {
  vehicle: VehicleInfo;
}

function StatusBadge({ status }: { status: string }) {
  const isActive = status.toLowerCase() === "active";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        isActive
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
          : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
      }`}
    >
      {status}
    </span>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-zinc-800">
        <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          {label}
        </p>
        <p className="mt-0.5 truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {value}
        </p>
      </div>
    </div>
  );
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const [copied, setCopied] = useState(false);

  const detailsText = [
    `Registration: ${vehicle.registrationNumber}`,
    `Manufacturer: ${vehicle.manufacturer}`,
    `Model: ${vehicle.model}`,
    `Variant: ${vehicle.variant}`,
    `Fuel Type: ${vehicle.fuelType}`,
    `Vehicle Class: ${vehicle.vehicleClass}`,
    `Registration Date: ${vehicle.registrationDate}`,
    `Engine Number: ${vehicle.engineNumber}`,
    `Chassis Number: ${vehicle.chassisNumber}`,
    vehicle.ownerName ? `Owner: ${vehicle.ownerName}` : null,
    `Insurance: ${vehicle.insuranceStatus}`,
    `RC Status: ${vehicle.rcStatus}`,
    `Fitness Validity: ${vehicle.fitnessValidity}`,
    `Vehicle Age: ${vehicle.vehicleAge}`,
  ]
    .filter(Boolean)
    .join("\n");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(detailsText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="relative aspect-[16/9] bg-gradient-to-br from-blue-600 to-indigo-700">
        {vehicle.imageUrl && (
          <Image
            src={vehicle.imageUrl}
            alt={`${vehicle.manufacturer} ${vehicle.model}`}
            fill
            className="object-cover opacity-60"
            unoptimized
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-blue-200">Registration</p>
              <h2 className="font-mono text-2xl font-bold tracking-wider text-white sm:text-3xl">
                {vehicle.registrationNumber}
              </h2>
              <p className="mt-1 text-lg text-white/90">
                {vehicle.manufacturer} {vehicle.model}{" "}
                <span className="text-white/70">{vehicle.variant}</span>
              </p>
            </div>
            <div className="hidden rounded-xl bg-white/10 p-3 backdrop-blur-sm sm:block">
              <Car className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Details
              </>
            )}
          </button>
          <button
            onClick={() => downloadVehiclePdf(vehicle)}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <DetailItem icon={Car} label="Manufacturer" value={vehicle.manufacturer} />
          <DetailItem icon={Car} label="Model" value={vehicle.model} />
          <DetailItem icon={Hash} label="Variant" value={vehicle.variant} />
          <DetailItem icon={Fuel} label="Fuel Type" value={vehicle.fuelType} />
          <DetailItem icon={FileCheck} label="Vehicle Class" value={vehicle.vehicleClass} />
          <DetailItem icon={Calendar} label="Registration Date" value={vehicle.registrationDate} />
          <DetailItem icon={Wrench} label="Engine Number" value={vehicle.engineNumber} />
          <DetailItem icon={Hash} label="Chassis Number" value={vehicle.chassisNumber} />
          {vehicle.ownerName && (
            <DetailItem icon={User} label="Owner Name" value={vehicle.ownerName} />
          )}
          <DetailItem icon={Shield} label="Insurance Status" value={vehicle.insuranceStatus} />
          <DetailItem icon={FileCheck} label="RC Status" value={vehicle.rcStatus} />
          <DetailItem icon={Calendar} label="Fitness Validity" value={vehicle.fitnessValidity} />
          <DetailItem icon={Calendar} label="Vehicle Age" value={vehicle.vehicleAge} />
        </div>

        <div className="mt-6 flex flex-wrap gap-3 border-t border-zinc-100 pt-6 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-500">Insurance:</span>
            <StatusBadge status={vehicle.insuranceStatus} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-500">RC:</span>
            <StatusBadge status={vehicle.rcStatus} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
