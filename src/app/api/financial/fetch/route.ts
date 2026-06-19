// ===========================================
// PRANAM - Financial Fetch API Route
// GET: Fetch financial data after consent
// ===========================================

import { successResponse, serverErrorResponse } from "@/lib/utils/response";
import { financialService } from "@/features/financial/services/FinancialService";
import { getAuthUserId } from "@/lib/auth/clerk";

export async function GET() {
  try {
    await getAuthUserId();

    // TODO: Get active consent and fetch data
    const consentId = "mock_consent_id"; // Placeholder
    const data = await financialService.fetchFinancialData(consentId);

    return successResponse(data);
  } catch (error) {
    return serverErrorResponse(error);
  }
}
