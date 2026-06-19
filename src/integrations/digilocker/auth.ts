// src/integrations/digilocker/auth.ts
export function getDigilockerAuthUrl(redirectUri: string, state: string): string {
  // Offline Mock Architecture: Redirect to local simulated sandbox frontend
  const baseUrl = "/sandbox/digilocker/login";
  
  const params = new URLSearchParams({
    redirect_uri: redirectUri,
    response_type: "code",
    state: state,
  });

  return `${baseUrl}?${params.toString()}`;
}
