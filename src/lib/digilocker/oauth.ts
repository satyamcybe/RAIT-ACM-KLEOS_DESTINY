// MOCK: Generate OAuth URL
export function generateOAuthUrl(): string {
  // In a real app, this would use environment variables for client ID, redirect URI, etc.
  // For the mock, we just redirect to our own callback with a dummy code.
  const redirectUri = typeof window !== 'undefined' ? `${window.location.origin}/api/digilocker/callback` : '/api/digilocker/callback';
  return `${redirectUri}?code=mock_oauth_code_xyz789`;
}
