// src/integrations/digilocker/documents.ts
export async function getIssuedDocuments(accessToken: string) {
  console.log("Offline Mock Sandbox: Returning Mock Issued Documents");
  return [
    {
      name: "eShram Card",
      type: "ESHRAM",
      uri: "in.gov.eshram-123456",
      date: "2023-01-01"
    }
  ];
}

export function findEshramDocument(documents: any[]) {
  return documents.find((doc) => doc.type === "ESHRAM" || doc.name.toLowerCase().includes("eshram"));
}
