// src/integrations/digilocker/token.ts
export async function exchangeToken(code: string, redirectUri: string) {
  console.log("Offline Mock Sandbox: Simulating Token Exchange for code:", code);
  
  return {
    access_token: "mock_offline_access_token",
    expires_in: 3600,
    digilockerid: "DL-123456",
    name: "Raju Kumar"
  };
}
