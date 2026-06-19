import { NextRequest, NextResponse } from "next/server";
import { identityService } from "@/features/identity/services/IdentityService";
import { getAuthUserId } from "@/lib/auth/clerk";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: "No OAuth code provided" }, { status: 400 });
  }

  try {
    const userId = await getAuthUserId();
    await identityService.completeDigiLocker("mock_session", {}, userId);
  } catch (error) {
    console.error("Failed to complete DigiLocker verification in callback", error);
  }
  
  return NextResponse.redirect(new URL("/identity/processing", req.url));
}
