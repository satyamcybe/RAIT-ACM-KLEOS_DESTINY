# SSI — Self-Sovereign Identity

## Overview

The SSI layer packages verified identity and financial data into W3C Verifiable Credentials that workers own and can share selectively.

## Credential Types

### Identity Credential
- Issued after Aadhaar + eShram verification
- Contains: name, masked Aadhaar, occupation, verification date

### Financial Credential
- Issued after financial analysis
- Contains: income range, risk score, account summary

### Reputation Credential
- Issued after reputation calculation
- Contains: overall score, category, signal breakdown

## Architecture

```
Worker Data → Credential Service → SSI Adapter → Verifiable Credential
                                                    ↓
                                              Credential Store (DB)
                                                    ↓
                                              Worker Wallet (UI)
```

## W3C VC Format

```json
{
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  "type": ["VerifiableCredential", "PRAMAANIdentityCredential"],
  "issuer": "did:PRAMAAN:issuer:001",
  "issuanceDate": "2024-01-01T00:00:00Z",
  "credentialSubject": {
    "id": "did:PRAMAAN:worker:xxx",
    "name": "Rajesh Kumar",
    "verificationScore": 85
  },
  "proof": { ... }
}
```

## TODO

- [ ] Implement DID generation for workers
- [ ] Implement credential issuance
- [ ] Build wallet UI for credential management
- [ ] Implement selective disclosure
- [ ] Add QR code for credential sharing
