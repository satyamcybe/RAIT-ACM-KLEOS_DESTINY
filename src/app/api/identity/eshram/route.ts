// ===========================================
// PRANAM - eShram API Route
// POST: Verify eShram card
// GET: Get eShram status
// ===========================================

import { NextRequest } from "next/server";
import { successResponse, errorResponse, serverErrorResponse } from "@/lib/utils/response";
import { identityService } from "@/features/identity/services/IdentityService";
import { getAuthUserId } from "@/lib/auth/clerk";

export async function POST(request: NextRequest) {
  try {
    await getAuthUserId();
    const body = await request.json();
    const { uan } = body;

    if (!uan) {
      return errorResponse("UAN is required");
    }

    // TODO: Implement eShram verification flow
    const result = await identityService.verifyEshram(uan);

    return successResponse(result, "eShram verification complete");
  } catch (error) {
    return serverErrorResponse(error);
  }
}

export async function GET() {
  try {
    const userId = await getAuthUserId();

    // TODO: Fetch eShram verification status
    const status = await identityService.getVerificationStatus(userId);

    return successResponse({ eshramVerified: status.eshramVerified });
  } catch (error) {
    return serverErrorResponse(error);
  }
}
