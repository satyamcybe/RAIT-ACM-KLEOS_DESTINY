// ===========================================
// PRAMAAN - Setu AA Sandbox Adapter
// Connects to Setu sandbox API
// ===========================================

import type {
  SetuAdapter,
  SetuConsentParams,
  SetuConsentResponse,
  SetuConsentStatusResponse,
  SetuFIDataResponse,
} from "./types";
import { getSetuConfig } from "./config";

export class SetuSandboxAdapter implements SetuAdapter {
  private config = getSetuConfig();

  async createConsent(params: SetuConsentParams): Promise<SetuConsentResponse> {
    // TODO: Implement real Setu consent creation
    // 1. Authenticate with Setu
    // 2. Create consent request
    // 3. Return consent handle & redirect URL
    console.log(`[SANDBOX] Setu: Creating consent for ${params.customerVua}`);
    console.log(`[SANDBOX] Base URL: ${this.config.aaBaseUrl}`);

    throw new Error("Setu sandbox not implemented yet");
  }

  async checkConsentStatus(consentHandle: string): Promise<SetuConsentStatusResponse> {
    // TODO: Implement real Setu consent status check
    console.log(`[SANDBOX] Setu: Checking consent status for ${consentHandle}`);

    throw new Error("Setu sandbox not implemented yet");
  }

  async fetchFinancialData(consentId: string): Promise<SetuFIDataResponse> {
    // TODO: Implement real Setu FI data fetch
    // 1. Create data session
    // 2. Fetch FI data
    // 3. Decrypt and parse response
    console.log(`[SANDBOX] Setu: Fetching FI data for consent ${consentId}`);

    throw new Error("Setu sandbox not implemented yet");
  }
}
