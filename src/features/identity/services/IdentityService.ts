// ===========================================
// PRAMAAN - Identity Service
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
import { prisma } from "@/lib/database/prisma";

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
    const res = await this.digilocker.initiateVerification(userId);
    
    // Find or create worker
    await prisma.worker.upsert({
      where: { clerkUserId: userId },
      update: {},
      create: { clerkUserId: userId },
    });

    return res;
  }

  /** Complete DigiLocker verification */
  async completeDigiLocker(sessionId: string, callbackData: Record<string, string>, clerkUserId: string) {
    const result = await this.digilocker.completeVerification(sessionId, callbackData);
    
    if (result.success) {
      const worker = await prisma.worker.upsert({
        where: { clerkUserId },
        update: {},
        create: { clerkUserId },
      });
      if (worker) {
        await prisma.worker.update({
          where: { id: worker.id },
          data: {
            name: result.aadhaarName,
            dob: result.dateOfBirth,
            gender: result.gender,
            aadhaarVerified: true,
            eshramVerified: true,
            eshramUan: "10-1234-5678-9012",
            occupation: "Delivery Partner",
            digilockerId: result.digilockerId,
            referenceKey: result.referenceKey,
          },
        });

        await prisma.verificationProfile.upsert({
          where: { workerId: worker.id },
          update: {
            digilockerData: result as any,
            status: "partial",
          },
          create: {
            workerId: worker.id,
            digilockerData: result as any,
            status: "partial",
          },
        });

        await prisma.auditLog.create({
          data: {
            workerId: worker.id,
            action: "digilocker_complete",
            details: { sessionId, success: true },
          },
        });
      }
    }
    
    return result;
  }

  /** Verify eShram card */
  async verifyEshram(uan: string, clerkUserId: string) {
    const result = await this.eshram.verifyByUAN(uan);
    const details = await this.eshram.fetchWorkerDetails(uan);
    
    if (result.success && result.verified) {
      const worker = await prisma.worker.findUnique({ where: { clerkUserId } });
      if (worker) {
        await prisma.worker.update({
          where: { id: worker.id },
          data: {
            eshramUan: uan,
            eshramVerified: true,
            occupation: details.occupation,
          },
        });

        await prisma.verificationProfile.upsert({
          where: { workerId: worker.id },
          update: {
            eshramData: details as any,
            status: "verified",
            verificationScore: 80,
          },
          create: {
            workerId: worker.id,
            eshramData: details as any,
            status: "verified",
            verificationScore: 80,
          },
        });

        await prisma.auditLog.create({
          data: {
            workerId: worker.id,
            action: "eshram_verified",
            details: { uan, success: true },
          },
        });
      }
    }

    return { ...result, details };
  }

  /** Get identity verification status */
  async getVerificationStatus(clerkUserId: string): Promise<IdentityVerification> {
    const worker = await prisma.worker.findUnique({
      where: { clerkUserId },
      include: { verificationProfile: true },
    });

    if (!worker) {
      return {
        workerId: "unknown",
        aadhaarVerified: false,
        eshramVerified: false,
        verificationScore: 0,
        status: "pending",
        digilockerData: null,
        eshramData: null,
      };
    }

    return {
      workerId: worker.id,
      aadhaarVerified: worker.aadhaarVerified,
      eshramVerified: worker.eshramVerified,
      verificationScore: worker.verificationProfile?.verificationScore || 0,
      status: (worker.verificationProfile?.status as any) || "pending",
      digilockerData: worker.verificationProfile?.digilockerData as any,
      eshramData: worker.verificationProfile?.eshramData as any,
    };
  }
}

/** Singleton instance */
export const identityService = new IdentityService();
