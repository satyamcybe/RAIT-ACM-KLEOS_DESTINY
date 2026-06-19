// ===========================================
// PRANAM - Credential Verify API Route
// POST: Verify a credential
// ===========================================

import { NextRequest } from "next/server";
import { successResponse, errorResponse, serverErrorResponse } from "@/lib/utils/response";
import { credentialService } from "@/features/credentials/services/CredentialService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { credentialId } = body;

    if (!credentialId) {
      return errorResponse("credentialId is required");
    }

    // TODO: Implement credential verification
    const result = await credentialService.verifyCredential(credentialId);

    return successResponse(result);
  } catch (error) {
    return serverErrorResponse(error);
  }
}
