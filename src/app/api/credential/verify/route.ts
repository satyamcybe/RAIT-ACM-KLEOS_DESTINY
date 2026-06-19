// ===========================================
// PRAMAAN - Credential Verify API Route
// POST: Verify a credential
// ===========================================

import { NextRequest } from "next/server";
import { successResponse, errorResponse, serverErrorResponse } from "@/lib/utils/response";
import { credentialService } from "@/features/credentials/services/CredentialService";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const credentialId = url.searchParams.get("id");

    if (!credentialId) {
      return errorResponse("credentialId is required");
    }

    const result = await credentialService.verifyCredential(credentialId);
    return successResponse(result);
  } catch (error) {
    return serverErrorResponse(error);
  }
}
