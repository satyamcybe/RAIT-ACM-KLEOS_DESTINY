// ===========================================
// PRANAM - DigiLocker Mock Adapter
// Returns simulated data for development
// ===========================================

import type {
  DigiLockerAdapter,
  DigiLockerInitResponse,
  DigiLockerCallbackData,
  DigiLockerVerifyResult,
  DigiLockerDocument,
  DigiLockerDocType,
} from "./types";

export class DigiLockerMockAdapter implements DigiLockerAdapter {
  async initiateVerification(userId: string): Promise<DigiLockerInitResponse> {
    // TODO: Implement mock DigiLocker initiation
    console.log(`[MOCK] DigiLocker: Initiating verification for user ${userId}`);
    return {
      sessionId: `mock_session_${Date.now()}`,
      redirectUrl: "/onboarding/digilocker?mock=true",
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    };
  }

  async completeVerification(
    sessionId: string,
    _data: DigiLockerCallbackData
  ): Promise<DigiLockerVerifyResult> {
    // TODO: Implement mock verification completion
    console.log(`[MOCK] DigiLocker: Completing verification for session ${sessionId}`);
    return {
      success: true,
      aadhaarName: "Rajesh Kumar",
      dateOfBirth: "1990-05-15",
      gender: "Male",
      maskedAadhaar: "XXXX-XXXX-5678",
    };
  }

  async fetchDocument(
    userId: string,
    docType: DigiLockerDocType
  ): Promise<DigiLockerDocument> {
    // TODO: Implement mock document fetch
    console.log(`[MOCK] DigiLocker: Fetching ${docType} for user ${userId}`);
    return {
      docType,
      name: "Mock Aadhaar Card",
      data: {
        name: "Rajesh Kumar",
        dob: "1990-05-15",
        address: "123, Mock Street, New Delhi",
      },
      issuedAt: new Date().toISOString(),
    };
  }
}
