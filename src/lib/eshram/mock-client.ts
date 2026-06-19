import { EShramVerification, DigiLockerUser } from "@/types/identity";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function verifyEShram(uan: string): Promise<EShramVerification> {
  // MOCK: Simulate eShram API verification
  await delay(1300);
  return {
    uan: uan,
    name: "Raju Kumar",
    sector: "Transport",
    registrationDate: "2021-03-15",
    status: "Active"
  };
}

export async function crossValidate(digilocker: DigiLockerUser, eshram: EShramVerification): Promise<boolean> {
  // MOCK: Simulate cross-validation of data points
  await delay(1100);
  return true; // Assume details match for the mock
}
