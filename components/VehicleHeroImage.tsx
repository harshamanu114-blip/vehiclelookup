"use client";

import { useState } from "react";
import Image from "next/image";
import { Car } from "lucide-react";
import { getColorHex } from "@/lib/vehicle-images";

interface VehicleHeroImageProps {
  imageUrl: string;
  manufacturer: string;
  model: string;
  color: string;
}

export function VehicleHeroImage({
  imageUrl,
  manufacturer,
  model,
  color,
}: VehicleHeroImageProps) {
  const [failed, setFailed] = useState(false);
  const accent = getColorHex(color);

  if (failed) {
    return (
      <div
        className="relative flex h-full w-full items-center justify-center overflow-hidden"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${accent}33, transparent 50%), linear-gradient(135deg, #0f172a 0%, #1e293b 100%)`,
        }}
      >
        <Car className="h-24 w-24 text-white/20 sm:h-32 sm:w-32" strokeWidth={1} />
        <div
          className="absolute bottom-6 right-6 h-16 w-16 rounded-full blur-2xl"
          style={{ backgroundColor: `${accent}55` }}
        />
      </div>
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={`${manufacturer} ${model}`}
      fill
      priority
      className="object-cover object-center"
      sizes="(max-width: 768px) 100vw, 720px"
      onError={() => setFailed(true)}
    />
  );
}
