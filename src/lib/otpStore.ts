// In-memory store for OTPs (Mobile Number -> { otp, expiresAt })
const globalForOtp = globalThis as unknown as {
  otpStore: Map<string, { otp: string, expiresAt: number }>;
};

export const otpStore = globalForOtp.otpStore || new Map<string, { otp: string, expiresAt: number }>();

if (process.env.NODE_ENV !== 'production') globalForOtp.otpStore = otpStore;
