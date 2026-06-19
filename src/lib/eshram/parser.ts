import { DigiLockerDocument } from "@/types/identity";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function findEShramDocument(docs: DigiLockerDocument[]): DigiLockerDocument | null {
  return docs.find(doc => doc.name.toLowerCase().includes('eshram')) || null;
}

export async function parseUAN(pdfBlob: Blob): Promise<string> {
  // MOCK: Simulate OCR/Parsing of UAN from PDF
  await delay(900);
  return "10-2021-1234-5678";
}
