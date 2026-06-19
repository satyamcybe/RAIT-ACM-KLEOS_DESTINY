// ===========================================
// PRANAM - Credential Service
// Manages verifiable credential lifecycle
// ===========================================

import { getMode } from "@/lib/config/env";
import { SSIMockAdapter } from "@/integrations/ssi/mock";
import type { SSIAdapter } from "@/integrations/ssi/types";
import type { CredentialDisplay } from "../types/credential";
import { prisma } from "@/lib/database/prisma";

/** Factory: get SSI adapter (mock only for now) */
function getSSIAdapter(): SSIAdapter {
  const mode = getMode();
  // SSI is mock-only for hackathon
  void mode;
  return new SSIMockAdapter();
}

export class CredentialService {
  private ssi: SSIAdapter;

  constructor() {
    this.ssi = getSSIAdapter();
  }

  /** Issue a new credential */
  async issueCredential(workerId: string) {
    const worker = await prisma.worker.findUnique({
      where: { id: workerId },
      include: { financialProfile: true },
    });

    if (!worker || !worker.financialProfile) {
      throw new Error("Worker or financial profile not found");
    }

    const year = new Date().getFullYear();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    const credId = `PRANAM-${year}-MH-${random}`;

    const signals = worker.financialProfile.signalsJson as any || {};

    const credential = {
      id: credId,
      type: "GigWorkerReputationCredential",
      issuer: "Pranam Platform",
      issuedAt: new Date().toISOString(),
      subject: {
        name: worker.name,
        uan: worker.eshramUan || "DEMO-UAN",
        platform: "Zomato Technologies Pvt Ltd",
        identityVerifiedBy: "DigiLocker (Aadhaar-seeded)",
        platformVerifiedBy: "e-Shram UAN (Ministry of Labour)"
      },
      claims: {
        tenureMonths: signals.tenureMonths,
        consistencyPct: signals.consistencyPct,
        avgMonthlyIncome: worker.financialProfile.avgMonthlyIncome,
        pramanScore: Math.round((worker.financialProfile.reputationScore || 0) * 10),
        estDeliveriesRange: signals.estDeliveriesRange,
        incomeTrend: signals.incomeTrend,
        dataSource: "SBI Bank via RBI-licensed AA (Setu Sandbox)",
        isVerifiedFact: true,
        ratingSource: "MOCK_PROVIDER",
        ratingNote: signals.ratingNote
      },
      proof: {
        type: "RSA_MOCK_SIGNED",
        created: new Date().toISOString(),
        verificationMethod: "Pranam-PublicKey-2026"
      },
      verificationUrl: `${process.env.NEXT_PUBLIC_APP_URL}/verify/${credId}`
    };

    await prisma.credential.create({
      data: {
        id: credId,
        workerId: worker.id,
        type: "reputation",
        issuer: "pranam",
        subject: credential.subject,
        claims: credential.claims,
        proof: credential.proof as any,
        status: "active",
        issuedAt: new Date(),
      },
    });

    return { credential, credentialId: credId, verificationUrl: credential.verificationUrl };
  }

  /** Verify a credential */
  async verifyCredential(credentialId: string) {
    const credential = await prisma.credential.findUnique({
      where: { id: credentialId },
    });
    return { valid: !!credential, credential };
  }

  /** Get all credentials for a worker */
  async getCredentials(workerId: string): Promise<CredentialDisplay[]> {
    const creds = await prisma.credential.findMany({
      where: { workerId },
      orderBy: { issuedAt: 'desc' },
    });
    return creds.map(c => ({
      id: c.id,
      type: c.type,
      issuer: c.issuer,
      issuedAt: c.issuedAt.toISOString(),
      expiresAt: c.expiresAt ? c.expiresAt.toISOString() : null,
      claims: (c.claims || {}) as Record<string, unknown>,
      status: c.status as any,
    }));
  }
}

export const credentialService = new CredentialService();
