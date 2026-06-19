// src/integrations/setu/auth.ts
// Offline Mock Sandbox: No real Setu API calls

export async function getSetuAccessToken(): Promise<string> {
  console.log("Offline Mock Sandbox: Returning mock Setu access token");
  return "mock_setu_access_token_" + Date.now();
}
