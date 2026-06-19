// ===========================================
// PRAMAAN - Validators
// Input validation helpers
// ===========================================

/** Validate a phone number (Indian format) */
export function isValidPhone(phone: string): boolean {
  return /^(\+91)?[6-9]\d{9}$/.test(phone.replace(/\s/g, ""));
}

/** Validate an Aadhaar number format (12 digits) */
export function isValidAadhaar(aadhaar: string): boolean {
  return /^\d{12}$/.test(aadhaar.replace(/\s/g, ""));
}

/** Validate an eShram UAN format */
export function isValidEshramUAN(uan: string): boolean {
  // TODO: Add actual UAN format validation
  return uan.length > 0;
}

/** Validate a non-empty string */
export function isNonEmpty(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/** Validate a UUID */
export function isValidUUID(uuid: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid);
}

/** Sanitize user input */
export function sanitize(input: string): string {
  return input.trim().replace(/<[^>]*>/g, "");
}
