// ===========================================
// PRANAM - DigiLocker Types
// ===========================================

/** DigiLocker adapter interface - implemented by mock & sandbox */
export interface DigiLockerAdapter {
  /** Initiate Aadhaar verification flow */
  initiateVerification(userId: string): Promise<DigiLockerInitResponse>;
  /** Complete verification with OTP/callback data */
  completeVerification(sessionId: string, data: DigiLockerCallbackData): Promise<DigiLockerVerifyResult>;
  /** Fetch document from DigiLocker */
  fetchDocument(userId: string, docType: DigiLockerDocType): Promise<DigiLockerDocument>;
}

export interface DigiLockerInitResponse {
  sessionId: string;
  redirectUrl: string;
  expiresAt: string;
}

export interface DigiLockerCallbackData {
  code?: string;
  state?: string;
  error?: string;
}

export interface DigiLockerVerifyResult {
  success: boolean;
  aadhaarName: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  maskedAadhaar: string | null;
  digilockerId?: string | null;
  referenceKey?: string | null;
  error?: string;
}

export interface DigiLockerDocument {
  docType: DigiLockerDocType;
  name: string;
  data: Record<string, unknown>;
  issuedAt: string;
}

export type DigiLockerDocType = "AADHAAR" | "PAN" | "DRIVING_LICENSE";
