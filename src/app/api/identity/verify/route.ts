import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { uan } = body;

    if (!uan) {
      return NextResponse.json({ error: "UAN is required" }, { status: 400 });
    }

    // MOCK: Simulate successful verification response
    return NextResponse.json({
      success: true,
      uan: uan,
      name: "Raju Kumar",
      sector: "Transport",
      registrationDate: "2021-03-15",
      status: "Active"
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
