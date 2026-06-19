// ===========================================
// PRANAM - Environment Configuration
// Centralized env access with type safety
// ===========================================

/** Application mode - controls which adapters are used */
export type AppMode = "mock" | "sandbox" | "production";

/** Get the current application mode */
export function getMode(): AppMode {
  const mode = process.env.MODE || "mock";
  if (mode !== "mock" && mode !== "sandbox" && mode !== "production") {
    console.warn(`Invalid MODE "${mode}", falling back to "mock"`);
    return "mock";
  }
  return mode;
}

/** Whether we're running in mock mode */
export function isMockMode(): boolean {
  return getMode() === "mock";
}

/** Environment variables with defaults */
export const env = {
  // Mode
  MODE: getMode(),

  // Database
  DATABASE_URL: process.env.DATABASE_URL || "",

  // Clerk
  CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "",
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY || "",

  // DigiLocker
  DIGILOCKER_CLIENT_ID: process.env.DIGILOCKER_CLIENT_ID || "",
  DIGILOCKER_CLIENT_SECRET: process.env.DIGILOCKER_CLIENT_SECRET || "",
  DIGILOCKER_REDIRECT_URI: process.env.DIGILOCKER_REDIRECT_URI || "",

  // eShram
  ESHRAM_API_KEY: process.env.ESHRAM_API_KEY || "",
  ESHRAM_API_URL: process.env.ESHRAM_API_URL || "",

  // Setu AA
  SETU_CLIENT_ID: process.env.SETU_CLIENT_ID || "",
  SETU_CLIENT_SECRET: process.env.SETU_CLIENT_SECRET || "",
  SETU_AA_BASE_URL: process.env.SETU_AA_BASE_URL || "",
  SETU_FIU_BASE_URL: process.env.SETU_FIU_BASE_URL || "",

  // App
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "Pranam",
} as const;
