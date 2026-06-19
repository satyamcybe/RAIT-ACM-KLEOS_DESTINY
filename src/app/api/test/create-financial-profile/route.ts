// GET /api/test/create-financial-profile
// End-to-end test: runs the full Layer 2 flow for the first worker in the DB

import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";
import { createConsent, pollConsentStatus } from "@/features/financial/consent.service";
import { fetchAndStoreFinancialData } from "@/features/financial/fetch.service";
import { generateFinancialProfile } from "@/features/financial/financial-profile.service";

export async function GET() {
  try {
    // 1. Find existing worker from Layer 1
    const worker = await prisma.worker.findFirst({
      where: { verificationStatus: "Verified" },
    });

    if (!worker) {
      return NextResponse.json({
        success: false,
        error: "No verified worker found. Complete Layer 1 first.",
      }, { status: 404 });
    }

    console.log("Test: Using worker", worker.id, worker.name);

    // 2. Create Consent
    const consent = await createConsent(worker.id, "9999999999");
    console.log("Test: Consent created", consent.consentHandle);

    // 3. Poll Consent (auto-approved in mock)
    const consentStatus = await pollConsentStatus(worker.id, consent.consentHandle);
    console.log("Test: Consent status", consentStatus.status);

    // 4. Fetch FI Data & Store Transactions
    const fetchResult = await fetchAndStoreFinancialData(worker.id, consentStatus.consentId!);
    console.log("Test: Stored", fetchResult.transactionsStored, "transactions");

    // 5. Generate Financial Profile
    const profileResult = await generateFinancialProfile(worker.id, fetchResult.transactions);
    console.log("Test: Financial profile generated");

    return NextResponse.json({
      success: true,
      message: "Layer 2 complete: Financial profile generated for " + worker.name,
      data: {
        worker: { id: worker.id, name: worker.name },
        consent: {
          handle: consent.consentHandle,
          status: consentStatus.status,
        },
        transactionsStored: fetchResult.transactionsStored,
        financialProfile: profileResult.profile,
        incomeAnalysis: profileResult.analysis,
      },
    });
  } catch (error: any) {
    console.error("Test Financial Profile Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
