# Layer 1 — Identity Verification

## Overview

Layer 1 handles identity verification through two sources:

1. **DigiLocker** — Aadhaar-based KYC verification
2. **eShram** — Worker registration card verification

## Flow

```
Worker → DigiLocker OAuth → Aadhaar Data → Store in VerificationProfile
Worker → eShram UAN Input → Card Validation → Store in VerificationProfile
```

## Integration Points

### DigiLocker

- **Mock**: Returns simulated Aadhaar data (name, DOB, masked number)
- **Sandbox**: Connects to DigiLocker sandbox OAuth flow
- **Production**: Full DigiLocker integration

### eShram

- **Mock**: Returns simulated worker details (UAN, occupation, state)
- **Sandbox**: Connects to eShram API for UAN verification
- **Production**: Full eShram integration

## Data Model

```
VerificationProfile {
  digilockerData: JSON  // Aadhaar details
  eshramData: JSON      // eShram card details
  verificationScore: Int // 0-100
  status: pending | partial | verified
}
```

## TODO

- [ ] Implement DigiLocker OAuth flow
- [ ] Implement eShram API integration
- [ ] Calculate verification score based on completed verifications
- [ ] Store audit logs for each verification attempt
