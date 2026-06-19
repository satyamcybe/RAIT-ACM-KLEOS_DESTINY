// ===========================================
// PRAMAAN - eShram Sandbox Adapter
// Connects to eShram sandbox API
// ===========================================

import type { EshramAdapter, EshramVerifyResult, EshramWorkerDetails } from "./types";
import { env } from "@/lib/config/env";

export class EshramSandboxAdapter implements EshramAdapter {
  private apiKey = env.ESHRAM_API_KEY;
  private apiUrl = env.ESHRAM_API_URL;

  async verifyByUAN(uan: string): Promise<EshramVerifyResult> {
    // TODO: Implement real eShram UAN verification
    console.log(`[SANDBOX] eShram: Verifying UAN ${uan}`);
    console.log(`[SANDBOX] API URL: ${this.apiUrl}`);
    void this.apiKey;

    throw new Error("eShram sandbox not implemented yet");
  }

  async fetchWorkerDetails(uan: string): Promise<EshramWorkerDetails> {
    // TODO: Implement real eShram worker details fetch
    console.log(`[SANDBOX] eShram: Fetching details for UAN ${uan}`);

    throw new Error("eShram sandbox not implemented yet");
  }
}
