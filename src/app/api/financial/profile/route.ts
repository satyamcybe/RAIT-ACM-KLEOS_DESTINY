// ===========================================
// PRANAM - Financial Profile API Route
// GET: Get financial profile/summary
// ===========================================

import { successResponse, errorResponse, serverErrorResponse } from "@/lib/utils/response";
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

    const profile = await prisma.financialProfile.findUnique({
      where: { workerId: worker.id },
    });

    return successResponse(profile || {
      avgMonthlyIncome: null,
      avgMonthlyExpense: null,
      riskScore: null,
      reputationScore: null,
      accountCount: 0,
      lastFetchedAt: null,
      signalsJson: null,
    });
  } catch (error) {
    return serverErrorResponse(error);
  }
}
