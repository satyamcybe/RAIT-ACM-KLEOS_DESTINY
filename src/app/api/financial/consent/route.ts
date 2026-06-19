// ===========================================
// PRANAM - Financial Consent API Route
// POST: Create consent request
// GET: Get consent status
// ===========================================

import { NextRequest } from "next/server";
import { successResponse, errorResponse, serverErrorResponse } from "@/lib/utils/response";
import { financialService } from "@/features/financial/services/FinancialService";
import { getAuthUserId } from "@/lib/auth/clerk";

export async function POST(request: NextRequest) {
  try {
    const userId = await getAuthUserId();
    const body = await request.json();
    const { fiTypes } = body;

    if (!fiTypes || !Array.isArray(fiTypes)) {
      return errorResponse("fiTypes array is required");
    }

    // TODO: Implement consent creation flow
    const vua = `${userId}@pranam-aa-mock`;
    const result = await financialService.createConsent(vua, fiTypes);

    return successResponse(result, "Consent request created");
  } catch (error) {
    return serverErrorResponse(error);
  }
}

export async function GET() {
  try {
    await getAuthUserId();

    // TODO: Fetch current consent status
    return successResponse({
      status: "none",
      fiTypes: [],
    });
  } catch (error) {
    return serverErrorResponse(error);
  }
}
