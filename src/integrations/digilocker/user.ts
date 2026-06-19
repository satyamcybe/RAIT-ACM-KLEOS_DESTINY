// src/integrations/digilocker/user.ts
export async function getUserDetails(accessToken: string) {
  console.log("Offline Mock Sandbox: Returning Mock User Details");
  return {
    digilockerid: "DL-123456",
    name: "Raju Kumar",
    dob: "24-08-2006",
    gender: "M"
  };
}
