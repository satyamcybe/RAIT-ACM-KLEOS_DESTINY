// ===========================================
// PRANAM - Identity Profile API Route
// GET: Get combined identity profile
// ===========================================

import { successResponse, serverErrorResponse } from "@/lib/utils/response";
import { identityService } from "@/features/identity/services/IdentityService";
import { getAuthUserId } from "@/lib/auth/clerk";

export async function GET() {
  try {
    const userId = await getAuthUserId();

    // TODO: Fetch combined identity verification profile
    const profile = await identityService.getVerificationStatus(userId);

    return successResponse(profile);
  } catch (error) {
    return serverErrorResponse(error);
  }
}
