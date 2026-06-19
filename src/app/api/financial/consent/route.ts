// API Route: POST /api/financial/consent - Create consent
// API Route: GET /api/financial/consent?handle=xxx - Check consent status

import { NextRequest, NextResponse } from "next/server";
import { createConsent, pollConsentStatus } from "@/features/financial/consent.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { workerId, mobileNumber } = body;

    if (!workerId) {
      return NextResponse.json({ success: false, error: "workerId is required" }, { status: 400 });
    }

    const result = await createConsent(workerId, mobileNumber || "9999999999");

    return NextResponse.json({
      success: true,
      message: "Consent request created",
      data: result,
    });
  } catch (error: any) {
    console.error("Consent API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const handle = searchParams.get("handle");
    const workerId = searchParams.get("workerId");

    if (!handle || !workerId) {
      return NextResponse.json({ success: false, error: "handle and workerId are required" }, { status: 400 });
    }

    const result = await pollConsentStatus(workerId, handle);

    return NextResponse.json({
      success: true,
      message: "Consent status retrieved",
      data: result,
    });
  } catch (error: any) {
    console.error("Consent Status API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
