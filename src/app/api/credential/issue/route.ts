// ===========================================
// PRAMAAN - Credential Issue API Route
// POST: Issue a new verifiable credential
// ===========================================

import { NextRequest } from "next/server";
import { successResponse, errorResponse, serverErrorResponse } from "@/lib/utils/response";
import { credentialService } from "@/features/credentials/services/CredentialService";
import { getAuthUserId } from "@/lib/auth/clerk";
import { prisma } from "@/lib/database/prisma";

export async function POST() {
  try {
    const userId = await getAuthUserId();
    const worker = await prisma.worker.upsert({
      where: { clerkUserId: userId },
      update: {},
      create: { clerkUserId: userId },
    });

    const result = await credentialService.issueCredential(worker.id);
    return successResponse(result, "Credential issued", 201);
  } catch (error) {
    return serverErrorResponse(error);
  }
}
