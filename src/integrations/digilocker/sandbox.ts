// ===========================================
// PRAMAAN - DigiLocker Sandbox Adapter
// Connects to DigiLocker sandbox API
// ===========================================

import type {
  DigiLockerAdapter,
  DigiLockerInitResponse,
  DigiLockerCallbackData,
  DigiLockerVerifyResult,
  DigiLockerDocument,
  DigiLockerDocType,
} from "./types";
import { DIGILOCKER_CONSTANTS } from "./constants";
import { env } from "@/lib/config/env";

export class DigiLockerSandboxAdapter implements DigiLockerAdapter {
  private baseUrl = DIGILOCKER_CONSTANTS.API_URLS.sandbox;
  private clientId = env.DIGILOCKER_CLIENT_ID;
  private clientSecret = env.DIGILOCKER_CLIENT_SECRET;
  private redirectUri = env.DIGILOCKER_REDIRECT_URI;

  async initiateVerification(userId: string): Promise<DigiLockerInitResponse> {
    // TODO: Implement real DigiLocker OAuth initiation
    // 1. Generate state token
    // 2. Build authorization URL
    // 3. Return redirect URL
    console.log(`[SANDBOX] DigiLocker: Initiating verification for user ${userId}`);
    console.log(`[SANDBOX] Base URL: ${this.baseUrl}`);

    throw new Error("DigiLocker sandbox not implemented yet");
  }

  async completeVerification(
    sessionId: string,
    _data: DigiLockerCallbackData
  ): Promise<DigiLockerVerifyResult> {
    // TODO: Implement DigiLocker OAuth callback handling
    // 1. Exchange code for token
    // 2. Fetch Aadhaar data
    // 3. Return verification result
    console.log(`[SANDBOX] DigiLocker: Completing verification for session ${sessionId}`);
    console.log(`[SANDBOX] Client ID: ${this.clientId ? "SET" : "NOT SET"}`);

    throw new Error("DigiLocker sandbox not implemented yet");
  }

  async fetchDocument(
    userId: string,
    docType: DigiLockerDocType
  ): Promise<DigiLockerDocument> {
    // TODO: Implement DigiLocker document fetch
    console.log(`[SANDBOX] DigiLocker: Fetching ${docType} for user ${userId}`);
    void this.clientSecret;
    void this.redirectUri;

    throw new Error("DigiLocker sandbox not implemented yet");
  }
}
