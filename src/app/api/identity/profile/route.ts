import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { digilockerData, eshramData } = body;

    if (!digilockerData || !eshramData) {
      return NextResponse.json({ error: "Missing required identity data" }, { status: 400 });
    }

    // MOCK: Simulate profile generation response
    return NextResponse.json({
      success: true,
      workerId: "WRK_20241234",
      layer1Complete: true,
      verifiedAt: new Date().toISOString(),
      profile: {
        name: "Raju Kumar",
        sector: "Transport & Delivery",
        verifications: {
          aadhaar: true,
          eshram: true,
          uan: true,
          digilocker: true
        }
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
