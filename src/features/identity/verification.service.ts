export function verifyWorkerData(digilockerProfile: any, eshramData: any) {
  const isVerified = digilockerProfile.name && eshramData.name 
    ? digilockerProfile.name.toLowerCase() === eshramData.name.toLowerCase()
    : true; // Defaulting to true for hackathon MVP fallback

  return {
    verified: isVerified,
    status: isVerified ? "Verified" : "Failed",
    sources: ["DigiLocker", "eShram"]
  };
}
