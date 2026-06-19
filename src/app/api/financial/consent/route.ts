// ===========================================
// PRAMAAN - Financial Consent API Route
// POST: Create consent request
// GET: Get consent status
// ===========================================

import { NextRequest } from "next/server";
import { successResponse, errorResponse, serverErrorResponse } from "@/lib/utils/response";
import { financialService } from "@/features/financial/services/FinancialService";
import { getAuthUserId } from "@/lib/auth/clerk";
import { prisma } from "@/lib/database/prisma";

export async function POST(request: NextRequest) {
  try {
    const userId = await getAuthUserId();
    const worker = await prisma.worker.upsert({
      where: { clerkUserId: userId },
      update: {},
      create: { clerkUserId: userId },
    });

    const body = await request.json();
    const fiTypes = body.fiTypes || ["TRANSACTIONS"];

    const result = await financialService.createConsent(
      userId + "@onemoney",
      fiTypes,
      worker.id
    );

    return successResponse(result, "Consent request created");
  } catch (error) {
    return serverErrorResponse(error);
  }
}

export async function GET() {
  try {
    const userId = await getAuthUserId();
    const worker = await prisma.worker.upsert({
      where: { clerkUserId: userId },
      update: {},
      create: { clerkUserId: userId },
    });

    const consent = await prisma.consentRequest.findFirst({
      where: { workerId: worker.id },
      orderBy: { createdAt: 'desc' },
    });

    return successResponse({
      status: consent?.status || "none",
      fiTypes: consent?.fiTypes || [],
    });
  } catch (error) {
    return serverErrorResponse(error);
  }
}
