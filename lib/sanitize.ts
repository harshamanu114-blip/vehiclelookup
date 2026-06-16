const DANGEROUS_CHARS = /[<>'"`;\\]/g;

export function sanitizeRegistrationNumber(input: unknown): string {
  if (typeof input !== "string") return "";

  return input
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "")
    .replace(DANGEROUS_CHARS, "")
    .slice(0, 15);
}

export function sanitizeString(input: unknown, maxLength = 200): string {
  if (typeof input !== "string") return "";

  return input
    .trim()
    .replace(DANGEROUS_CHARS, "")
    .slice(0, maxLength);
}
