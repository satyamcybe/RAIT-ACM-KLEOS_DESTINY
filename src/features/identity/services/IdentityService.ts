// ===========================================
// PRANAM - Identity Service
// Orchestrates identity verification
// ===========================================

import { getMode } from "@/lib/config/env";
import { DigiLockerMockAdapter } from "@/integrations/digilocker/mock";
import { DigiLockerSandboxAdapter } from "@/integrations/digilocker/sandbox";
import { EshramMockAdapter } from "@/integrations/eshram/mock";
import { EshramSandboxAdapter } from "@/integrations/eshram/sandbox";
import type { DigiLockerAdapter } from "@/integrations/digilocker/types";
import type { EshramAdapter } from "@/integrations/eshram/types";
import type { IdentityVerification } from "../types/identity";

/** Factory: get the right adapter based on MODE */
function getDigiLockerAdapter(): DigiLockerAdapter {
  const mode = getMode();
  switch (mode) {
    case "sandbox":
    case "production":
      return new DigiLockerSandboxAdapter();
    default:
      return new DigiLockerMockAdapter();
  }
}

function getEshramAdapter(): EshramAdapter {
  const mode = getMode();
  switch (mode) {
    case "sandbox":
    case "production":
      return new EshramSandboxAdapter();
    default:
      return new EshramMockAdapter();
  }
}

export class IdentityService {
  private digilocker: DigiLockerAdapter;
  private eshram: EshramAdapter;

  constructor() {
    this.digilocker = getDigiLockerAdapter();
    this.eshram = getEshramAdapter();
  }

  /** Initiate DigiLocker verification */
  async initiateDigiLocker(userId: string) {
    // TODO: Implement full DigiLocker verification flow
    return this.digilocker.initiateVerification(userId);
  }

  /** Complete DigiLocker verification */
  async completeDigiLocker(sessionId: string, callbackData: Record<string, string>) {
    // TODO: Implement callback handling & profile update
    return this.digilocker.completeVerification(sessionId, callbackData);
  }

  /** Verify eShram card */
  async verifyEshram(uan: string) {
    // TODO: Implement eShram verification & profile update
    return this.eshram.verifyByUAN(uan);
  }

  /** Get identity verification status */
  async getVerificationStatus(_workerId: string): Promise<IdentityVerification> {
    // TODO: Fetch from database
    return {
      workerId: _workerId,
      aadhaarVerified: false,
      eshramVerified: false,
      verificationScore: 0,
      status: "pending",
      digilockerData: null,
      eshramData: null,
    };
  }
}

/** Singleton instance */
export const identityService = new IdentityService();
