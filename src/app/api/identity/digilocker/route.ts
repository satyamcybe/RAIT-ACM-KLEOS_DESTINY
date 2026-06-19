// ===========================================
// PRANAM - DigiLocker API Route
// POST: Initiate verification
// GET: Check verification status
// ===========================================

import { NextRequest } from "next/server";
import { successResponse, errorResponse, serverErrorResponse } from "@/lib/utils/response";
import { identityService } from "@/features/identity/services/IdentityService";
import { getAuthUserId } from "@/lib/auth/clerk";

export async function POST(_request: NextRequest) {
  try {
    const userId = await getAuthUserId();

    // TODO: Implement DigiLocker initiation flow
    const result = await identityService.initiateDigiLocker(userId);

    return successResponse(result, "DigiLocker verification initiated");
  } catch (error) {
    return serverErrorResponse(error);
  }
}

export async function GET() {
  try {
    const userId = await getAuthUserId();

    // TODO: Fetch DigiLocker verification status
    const status = await identityService.getVerificationStatus(userId);

    return successResponse(status);
  } catch (error) {
    return serverErrorResponse(error);
  }
}
