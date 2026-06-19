// src/integrations/digilocker/file-download.ts
export async function downloadDocument(accessToken: string, uri: string): Promise<Buffer> {
  console.log("Offline Mock Sandbox: Returning Dummy PDF Buffer for URI:", uri);
  return Buffer.from("mock pdf content offline");
}
