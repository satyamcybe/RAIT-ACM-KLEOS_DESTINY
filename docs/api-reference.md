# API Reference

## Identity

### POST /api/identity/digilocker
Initiate DigiLocker verification.

**Response:**
```json
{ "success": true, "data": { "sessionId": "...", "redirectUrl": "..." } }
```

### GET /api/identity/digilocker
Get DigiLocker verification status.

### POST /api/identity/eshram
Verify eShram card by UAN.

**Body:**
```json
{ "uan": "123456789012" }
```

### GET /api/identity/profile
Get combined identity verification profile.

---

## Financial

### POST /api/financial/consent
Create AA consent request.

**Body:**
```json
{ "fiTypes": ["DEPOSIT", "INSURANCE"] }
```

### GET /api/financial/consent
Get current consent status.

### GET /api/financial/fetch
Fetch financial data (requires active consent).

### GET /api/financial/profile
Get computed financial profile/summary.

---

## Credentials

### POST /api/credential/issue
Issue a new verifiable credential.

**Body:**
```json
{ "type": "identity", "claims": { "name": "..." } }
```

### POST /api/credential/verify
Verify a credential.

**Body:**
```json
{ "credentialId": "vc:pranam:..." }
```

---

## Response Format

All API responses follow this shape:

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message",
  "error": "Error message (when success=false)"
}
```
