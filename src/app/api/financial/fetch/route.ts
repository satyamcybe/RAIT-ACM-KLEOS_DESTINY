// ===========================================
// PRANAM - Financial Fetch API Route
// GET: Fetch financial data after consent
// ===========================================

import { successResponse, errorResponse, serverErrorResponse } from "@/lib/utils/response";
import { financialService } from "@/features/financial/services/FinancialService";
import { getAuthUserId } from "@/lib/auth/clerk";
import { prisma } from "@/lib/database/prisma";

export async function GET() {
  try {
    const userId = await getAuthUserId();
    const worker = await prisma.worker.upsert({
      where: { clerkUserId: userId },
      update: {},
      create: { clerkUserId: userId },
    });

    const consent = await prisma.consentRequest.findFirst({
      where: { workerId: worker.id, status: "approved" },
      orderBy: { createdAt: 'desc' },
    });

    const data = await financialService.fetchFinancialData(
      consent?.consentHandle || "mock",
      worker.id
    );

    return successResponse(data);
  } catch (error) {
    return serverErrorResponse(error);
  }
}
