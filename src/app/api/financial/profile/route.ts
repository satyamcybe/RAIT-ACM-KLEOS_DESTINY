// API Route: GET /api/financial/profile?workerId=xxx - Get financial profile

import { NextRequest, NextResponse } from "next/server";
import { getFinancialProfile } from "@/features/financial/financial-profile.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workerId = searchParams.get("workerId");

    if (!workerId) {
      return NextResponse.json({ success: false, error: "workerId is required" }, { status: 400 });
    }

    const profile = await getFinancialProfile(workerId);

    if (!profile) {
      return NextResponse.json(
        { success: false, error: "Financial profile not found. Complete Layer 2 first." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Financial profile retrieved",
      data: profile,
    });
  } catch (error: any) {
    console.error("Financial Profile API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
