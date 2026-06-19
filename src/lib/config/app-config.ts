// ===========================================
// PRANAM - App Configuration
// Feature flags and app-wide settings
// ===========================================

import { getMode, type AppMode } from "./env";

export interface AppConfig {
  mode: AppMode;
  features: {
    digilocker: boolean;
    eshram: boolean;
    setuAA: boolean;
    ssi: boolean;
  };
  ui: {
    appName: string;
    appDescription: string;
    supportEmail: string;
  };
}

/** Get app configuration based on current mode */
export function getAppConfig(): AppConfig {
  const mode = getMode();

  return {
    mode,
    features: {
      digilocker: true,
      eshram: true,
      setuAA: mode !== "mock", // AA requires sandbox/prod
      ssi: true,
    },
    ui: {
      appName: "Pranam",
      appDescription: "Financial identity platform for India's gig workers",
      supportEmail: "support@pranam.dev",
    },
  };
}
