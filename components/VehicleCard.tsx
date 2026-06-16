"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Car,
  Calendar,
  Fuel,
  Shield,
  FileCheck,
  Wrench,
  Hash,
  Copy,
  Check,
  Download,
  Palette,
  Gauge,
} from "lucide-react";
import type { VehicleInfo } from "@/types/vehicle";
import { downloadVehiclePdf } from "@/lib/pdf";
import { getColorHex } from "@/lib/vehicle-images";
import { SourceBadge } from "@/components/SourceBadge";
import { VehicleHeroImage } from "@/components/VehicleHeroImage";

interface VehicleCardProps {
  vehicle: VehicleInfo;
}

function StatusPill({
  label,
  status,
  variant = "status",
}: {
  label: string;
  status: string;
  variant?: "status" | "date";
}) {
  const isActive = status.toLowerCase() === "active";
  const isDate = variant === "date";

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1 rounded-xl border border-zinc-200/80 bg-white/70 px-3 py-2.5 backdrop-blur-sm dark:border-zinc-700/60 dark:bg-zinc-900/60 sm:px-4">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        {label}
      </span>
      <span
        className={`inline-flex w-fit max-w-full items-center gap-1.5 truncate text-sm font-semibold ${
          isDate
            ? "text-blue-600 dark:text-blue-400"
            : isActive
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-amber-600 dark:text-amber-400"
        }`}
      >
        {!isDate && (
          <span
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
              isActive ? "bg-emerald-500" : "bg-amber-500"
            }`}
          />
        )}
        <span className="truncate">{status}</span>
      </span>
    </div>
  );
}

function DetailCell({
  icon: Icon,
  label,
  value,
  children,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="group rounded-2xl border border-zinc-100 bg-zinc-50/80 p-4 transition-colors hover:border-zinc-200 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700 dark:hover:bg-zinc-900">
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-zinc-100 dark:bg-zinc-800 dark:ring-zinc-700">
          <Icon className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {label}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <p className="break-words text-sm font-semibold leading-snug text-zinc-900 dark:text-zinc-100">
          {value}
        </p>
        {children}
      </div>
    </div>
  );
}

function ColorSwatch({ color }: { color: string }) {
  const hex = getColorHex(color);

  return (
    <span
      className="inline-flex h-5 w-5 shrink-0 rounded-full ring-2 ring-white dark:ring-zinc-800"
      style={{ backgroundColor: hex }}
      title={color}
    />
  );
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const [copied, setCopied] = useState(false);

  const detailsText = [
    `Registration: ${vehicle.registrationNumber}`,
    `Manufacturer: ${vehicle.manufacturer}`,
    `Model: ${vehicle.model}`,
    `Variant: ${vehicle.variant}`,
    `Color: ${vehicle.color}`,
    `Fuel Type: ${vehicle.fuelType}`,
    `Vehicle Class: ${vehicle.vehicleClass}`,
    `Registration Date: ${vehicle.registrationDate}`,
    `Engine Number: ${vehicle.engineNumber}`,
    `Chassis Number: ${vehicle.chassisNumber}`,
    `Insurance: ${vehicle.insuranceStatus}`,
    `RC Status: ${vehicle.rcStatus}`,
    `Fitness Validity: ${vehicle.fitnessValidity}`,
    `Vehicle Age: ${vehicle.vehicleAge}`,
    `Source: ${vehicle.source}`,
  ].join("\n");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(detailsText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-xl shadow-zinc-200/40 ring-1 ring-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-none dark:ring-zinc-800"
    >
      {/* Hero */}
      <div className="relative aspect-[4/3] sm:aspect-[16/9]">
        <VehicleHeroImage
          imageUrl={vehicle.imageUrl}
          manufacturer={vehicle.manufacturer}
          model={vehicle.model}
          color={vehicle.color}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/30 to-transparent" />

        <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-3 sm:left-6 sm:right-6 sm:top-6">
          <SourceBadge source={vehicle.source} />
          <div className="flex items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
            <ColorSwatch color={vehicle.color} />
            <span className="max-w-[120px] truncate sm:max-w-none">{vehicle.color}</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            Registration Number
          </p>
          <h2 className="mt-1 font-mono text-2xl font-bold tracking-[0.12em] text-white sm:text-4xl">
            {vehicle.registrationNumber}
          </h2>
          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-zinc-300 sm:text-base">
            <span className="font-semibold text-white">
              {vehicle.manufacturer} {vehicle.model}
            </span>
            <span className="hidden text-zinc-500 sm:inline">·</span>
            <span className="text-zinc-400">{vehicle.variant}</span>
            <span className="hidden text-zinc-500 sm:inline">·</span>
            <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs font-medium text-zinc-200">
              {vehicle.fuelType}
            </span>
          </div>
        </div>
      </div>

      {/* Status strip */}
      <div className="grid grid-cols-3 gap-2 border-b border-zinc-100 bg-zinc-50/50 p-3 dark:border-zinc-800 dark:bg-zinc-900/30 sm:gap-3 sm:p-4">
        <StatusPill label="Insurance" status={vehicle.insuranceStatus} />
        <StatusPill label="RC Status" status={vehicle.rcStatus} />
        <StatusPill label="Fitness" status={vehicle.fitnessValidity} variant="date" />
      </div>

      {/* Details */}
      <div className="space-y-6 p-4 sm:p-6">
        <section>
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            <Car className="h-4 w-4 text-blue-600" />
            Vehicle Details
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <DetailCell icon={Car} label="Manufacturer" value={vehicle.manufacturer} />
            <DetailCell icon={Car} label="Model" value={vehicle.model} />
            <DetailCell icon={Hash} label="Variant" value={vehicle.variant} />
            <DetailCell icon={Palette} label="Color" value={vehicle.color}>
              <ColorSwatch color={vehicle.color} />
            </DetailCell>
            <DetailCell icon={Fuel} label="Fuel Type" value={vehicle.fuelType} />
            <DetailCell icon={FileCheck} label="Class" value={vehicle.vehicleClass} />
          </div>
        </section>

        <section>
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            <Calendar className="h-4 w-4 text-blue-600" />
            Registration & Compliance
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <DetailCell icon={Calendar} label="Registered" value={vehicle.registrationDate} />
            <DetailCell icon={Gauge} label="Vehicle Age" value={vehicle.vehicleAge} />
            <DetailCell icon={Shield} label="Fitness Until" value={vehicle.fitnessValidity} />
          </div>
        </section>

        <section>
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            <Wrench className="h-4 w-4 text-blue-600" />
            Identifiers
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-500 dark:bg-zinc-800">
              Masked
            </span>
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <DetailCell icon={Wrench} label="Engine Number" value={vehicle.engineNumber} />
            <DetailCell icon={Hash} label="Chassis Number" value={vehicle.chassisNumber} />
          </div>
        </section>

        {/* Actions */}
        <div className="flex flex-col gap-2 border-t border-zinc-100 pt-5 dark:border-zinc-800 sm:flex-row">
          <button
            onClick={handleCopy}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-700 transition-all hover:border-zinc-300 hover:bg-zinc-50 active:scale-[0.98] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
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
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98]"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </button>
        </div>
      </div>
    </motion.article>
  );
}
