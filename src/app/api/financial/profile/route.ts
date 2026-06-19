// ===========================================
// PRANAM - Financial Profile API Route
// GET: Get financial profile/summary
// ===========================================

import { successResponse, serverErrorResponse } from "@/lib/utils/response";
import { getAuthUserId } from "@/lib/auth/clerk";

export async function GET() {
  try {
    await getAuthUserId();

    // TODO: Fetch financial profile from database
    return successResponse({
      avgMonthlyIncome: null,
      avgMonthlyExpense: null,
      riskScore: null,
      reputationScore: null,
      accountCount: 0,
      lastFetchedAt: null,
    });
  } catch (error) {
    return serverErrorResponse(error);
  }
}
