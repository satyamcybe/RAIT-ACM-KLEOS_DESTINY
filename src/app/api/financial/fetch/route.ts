// API Route: POST /api/financial/fetch - Fetch FI data after consent approval

import { NextRequest, NextResponse } from "next/server";
import { fetchAndStoreFinancialData } from "@/features/financial/fetch.service";
import { generateFinancialProfile } from "@/features/financial/financial-profile.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { workerId, consentId } = body;

    if (!workerId || !consentId) {
      return NextResponse.json(
        { success: false, error: "workerId and consentId are required" },
        { status: 400 }
      );
    }

    // 1. Fetch and store transactions
    const fetchResult = await fetchAndStoreFinancialData(workerId, consentId);

    // 2. Analyze and generate financial profile
    const profileResult = await generateFinancialProfile(workerId, fetchResult.transactions);

    return NextResponse.json({
      success: true,
      message: "Financial data fetched and profile generated",
      data: {
        transactionsStored: fetchResult.transactionsStored,
        accounts: fetchResult.accounts,
        profile: profileResult.profile,
        analysis: profileResult.analysis,
      },
    });
  } catch (error: any) {
    console.error("FI Fetch API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
