const INDIAN_VEHICLE_REGEX =
  /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4}$/i;

const BH_SERIES_REGEX = /^[0-9]{2}BH[0-9]{4}[A-Z]{2}$/i;

export function normalizeRegistrationNumber(input: string): string {
  return input.trim().toUpperCase().replace(/\s+/g, "");
}

export function isValidRegistrationNumber(input: string): boolean {
  const normalized = normalizeRegistrationNumber(input);
  if (!normalized) return false;
  return INDIAN_VEHICLE_REGEX.test(normalized) || BH_SERIES_REGEX.test(normalized);
}

export function getValidationError(input: string): string | null {
  const normalized = normalizeRegistrationNumber(input);

  if (!normalized) {
    return "Please enter a vehicle registration number.";
  }

  if (normalized.length < 8 || normalized.length > 11) {
    return "Registration number must be 8–11 characters (e.g. AP39AB1234).";
  }

  if (!isValidRegistrationNumber(normalized)) {
    return "Invalid format. Use standard (AP39AB1234) or BH series (22BH1234AB).";
  }

  return null;
}
