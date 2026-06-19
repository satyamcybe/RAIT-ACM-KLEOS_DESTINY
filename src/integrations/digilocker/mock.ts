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
    console.log(`[MOCK] DigiLocker: Completing verification for session ${sessionId}`);
    return {
      success: true,
      aadhaarName: "Raju Kamble",
      dateOfBirth: "1998-03-22",
      gender: "Male",
      maskedAadhaar: "XXXX-XXXX-4521",
      digilockerId: "raju-" + Date.now(),
      referenceKey: "ref_" + Math.random().toString(36).substring(7),
    };
  }

  async fetchDocument(
    userId: string,
    docType: DigiLockerDocType
  ): Promise<DigiLockerDocument> {
    console.log(`[MOCK] DigiLocker: Fetching ${docType} for user ${userId}`);
    return {
      docType,
      name: "Mock Aadhaar Card",
      data: {
        name: "Raju Kamble",
        dob: "1998-03-22",
        address: "123, Mock Street, Mumbai",
      },
      issuedAt: new Date().toISOString(),
    };
  }
}
