// ===========================================
// PRAMAAN - Financial Tests
// ===========================================

// TODO: Implement financial service tests
// - Setu mock adapter returns expected data
// - FinancialService switches adapters based on MODE
// - Consent flow works correctly
// - Data fetch returns proper shape

import { SetuMockAdapter } from "@/integrations/setu/mock";

describe("Financial - Setu Mock", () => {
  const adapter = new SetuMockAdapter();

  it("should create consent", async () => {
    const result = await adapter.createConsent({
      customerVua: "test@aa",
      fiTypes: ["DEPOSIT"],
      dateRangeFrom: "2024-01-01",
      dateRangeTo: "2024-06-01",
      redirectUrl: "http://localhost:3000",
    });
    expect(result.consentHandle).toBeDefined();
    expect(result.status).toBe("PENDING");
  });

  it("should check consent status", async () => {
    const result = await adapter.checkConsentStatus("test_handle");
    expect(result.status).toBe("APPROVED");
  });

  it("should fetch financial data", async () => {
    const result = await adapter.fetchFinancialData("test_consent_id");
    expect(result.accounts.length).toBeGreaterThan(0);
    expect(result.transactions.length).toBeGreaterThan(0);
  });
});
