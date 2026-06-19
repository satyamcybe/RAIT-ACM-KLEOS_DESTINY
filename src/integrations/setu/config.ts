// ===========================================
// PRAMAAN - Setu AA Config
// ===========================================

import { env } from "@/lib/config/env";

export interface SetuConfig {
  clientId: string;
  clientSecret: string;
  aaBaseUrl: string;
  fiuBaseUrl: string;
}

export function getSetuConfig(): SetuConfig {
  return {
    clientId: env.SETU_CLIENT_ID,
    clientSecret: env.SETU_CLIENT_SECRET,
    aaBaseUrl: env.SETU_AA_BASE_URL,
    fiuBaseUrl: env.SETU_FIU_BASE_URL,
  };
}
