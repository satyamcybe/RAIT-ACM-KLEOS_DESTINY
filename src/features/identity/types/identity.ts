// ===========================================
// PRAMAAN - Identity Types
// ===========================================

export interface IdentityVerification {
  workerId: string;
  aadhaarVerified: boolean;
  eshramVerified: boolean;
  verificationScore: number;
  status: IdentityStatus;
  digilockerData: DigiLockerData | null;
  eshramData: EshramData | null;
}

export type IdentityStatus = "pending" | "partial" | "verified";

export interface DigiLockerData {
  aadhaarName: string;
  dob: string;
  gender?: string;
  maskedAadhaar?: string;
}

export interface EshramData {
  uan: string;
  occupation: string;
  state?: string;
  district?: string;
  registrationDate?: string;
}

export interface IdentityVerifyRequest {
  type: "digilocker" | "eshram";
  data: Record<string, string>;
}

export interface IdentityVerifyResponse {
  success: boolean;
  verification: IdentityVerification | null;
  message: string;
}
