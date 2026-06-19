import { DigiLockerUser, DigiLockerDocument } from "@/types/identity";

// MOCK: Delay utility to simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getAccessToken(code: string): Promise<string> {
  // MOCK: Simulate token exchange
  await delay(500);
  return "mock_token_abc123";
}

export async function getUserDetails(token: string): Promise<DigiLockerUser> {
  // MOCK: Simulate fetching user details
  await delay(1200);
  return {
    name: "Raju Kumar",
    aadhaarMasked: "XXXX-XXXX-1234",
    dob: "1992-08-15",
    gender: "M"
  };
}

export async function getDocumentList(token: string): Promise<DigiLockerDocument[]> {
  // MOCK: Simulate fetching documents
  await delay(800);
  return [
    { id: "doc_1", name: "Aadhaar Card", type: "ID", issuer: "UIDAI", issuedDate: "2018-05-10" },
    { id: "doc_2", name: "PAN Card", type: "ID", issuer: "Income Tax Dept", issuedDate: "2019-02-15" },
    { id: "doc_3", name: "Driving License", type: "ID", issuer: "MoRTH", issuedDate: "2015-11-20" },
    { id: "doc_4", name: "eShram Card", type: "CERTIFICATE", issuer: "Ministry of Labour", issuedDate: "2021-03-15" },
    { id: "doc_5", name: "Class X Marksheet", type: "EDUCATION", issuer: "CBSE", issuedDate: "2008-05-30" },
    { id: "doc_6", name: "COVID-19 Vaccination Certificate", type: "HEALTH", issuer: "MoHFW", issuedDate: "2021-09-10" },
  ];
}

export async function downloadDocument(token: string, docId: string): Promise<Blob> {
  // MOCK: Simulate downloading a document PDF
  await delay(1500);
  // Return an empty blob for UI purposes only
  return new Blob(["mock pdf content"], { type: "application/pdf" });
}
