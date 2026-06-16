import type { VehicleProviderName } from "@/types/provider";

const MODEL_IMAGES: Record<string, string> = {
  "hyundai-creta": "/vehicles/hyundai-creta.svg",
  "maruti-suzuki-swift": "/vehicles/maruti-swift.svg",
  "maruti-swift": "/vehicles/maruti-swift.svg",
  "tata-nexon": "/vehicles/tata-nexon.svg",
  "hyundai-i20": "/vehicles/hyundai-i20.svg",
  "honda-city": "/vehicles/honda-city.svg",
  "toyota-innova": "/vehicles/toyota-innova.svg",
  "mahindra-xuv700": "/vehicles/mahindra-xuv700.svg",
  "kia-seltos": "/vehicles/kia-seltos.svg",
};

const DEFAULT_IMAGE = "/vehicles/default.svg";

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function resolveVehicleImage(
  manufacturer: string,
  model: string,
  explicitUrl?: string
): string {
  if (explicitUrl?.startsWith("/")) return explicitUrl;

  const key = `${slugify(manufacturer)}-${slugify(model)}`;
  return MODEL_IMAGES[key] ?? DEFAULT_IMAGE;
}

export const SOURCE_LABELS: Record<VehicleProviderName, string> = {
  mock: "Demo Database",
  carinfo: "CarInfo",
  vahan: "VAHAN",
  commercial: "Commercial API",
};

export const SOURCE_COLORS: Record<
  VehicleProviderName,
  { bg: string; text: string; ring: string }
> = {
  mock: {
    bg: "bg-violet-500/15",
    text: "text-violet-700 dark:text-violet-300",
    ring: "ring-violet-500/25",
  },
  carinfo: {
    bg: "bg-sky-500/15",
    text: "text-sky-700 dark:text-sky-300",
    ring: "ring-sky-500/25",
  },
  vahan: {
    bg: "bg-emerald-500/15",
    text: "text-emerald-700 dark:text-emerald-300",
    ring: "ring-emerald-500/25",
  },
  commercial: {
    bg: "bg-amber-500/15",
    text: "text-amber-700 dark:text-amber-300",
    ring: "ring-amber-500/25",
  },
};

export const FALLBACK_COLORS = [
  "White",
  "Silver",
  "Grey",
  "Black",
  "Red",
  "Blue",
  "Brown",
  "Green",
];

export function resolveVehicleColor(
  registrationNumber: string,
  explicitColor?: string
): string {
  if (explicitColor) return explicitColor;

  const hash = registrationNumber
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return FALLBACK_COLORS[hash % FALLBACK_COLORS.length];
}

export function getColorHex(color: string): string {
  const map: Record<string, string> = {
    white: "#f4f4f5",
    silver: "#a1a1aa",
    grey: "#71717a",
    gray: "#71717a",
    black: "#27272a",
    red: "#dc2626",
    blue: "#2563eb",
    brown: "#92400e",
    green: "#16a34a",
    orange: "#ea580c",
    yellow: "#ca8a04",
    pearl: "#e4e4e7",
    "pearl white": "#f4f4f5",
    "metallic silver": "#a1a1aa",
    "phantom black": "#18181b",
    "polar white": "#fafafa",
    "star dust": "#d4d4d8",
    "flame red": "#b91c1c",
    "deep forest": "#15803d",
    "daytona grey": "#52525b",
    "titan matte grey": "#3f3f46",
    "calgary white": "#fafafa",
    "with a passion red": "#dc2626",
    "telecom blue": "#1d4ed8",
    "calgary white with a passion red": "#dc2626",
  };

  return map[color.toLowerCase()] ?? "#71717a";
}
