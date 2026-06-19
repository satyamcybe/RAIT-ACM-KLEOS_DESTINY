// ===========================================
// PRANAM - Credential Issue API Route
// POST: Issue a new verifiable credential
// ===========================================

import { NextRequest } from "next/server";
import { successResponse, errorResponse, serverErrorResponse } from "@/lib/utils/response";
import { credentialService } from "@/features/credentials/services/CredentialService";
import { getAuthUserId } from "@/lib/auth/clerk";

export async function POST(request: NextRequest) {
  try {
    const userId = await getAuthUserId();
    const body = await request.json();
    const { type, claims } = body;

    if (!type || !claims) {
      return errorResponse("type and claims are required");
    }

    // TODO: Implement credential issuance flow
    const credential = await credentialService.issueCredential(userId, type, claims);

    return successResponse(credential, "Credential issued", 201);
  } catch (error) {
    return serverErrorResponse(error);
  }
}
