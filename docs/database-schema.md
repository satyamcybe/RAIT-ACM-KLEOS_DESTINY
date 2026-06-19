# Database Schema

## Models

### Worker
Core user model linked to Clerk auth.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| clerkUserId | String | Unique, from Clerk |
| name | String? | |
| phone | String? | |
| email | String? | |
| aadhaarVerified | Boolean | Default: false |
| eshramId | String? | |
| eshramVerified | Boolean | Default: false |
| profileComplete | Boolean | Default: false |

### VerificationProfile
Aggregated verification data per worker.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| workerId | UUID | FK → Worker (unique) |
| digilockerData | JSON? | Raw DigiLocker response |
| eshramData | JSON? | Raw eShram response |
| verificationScore | Int | 0-100 |
| status | String | pending/partial/verified |

### ConsentRequest
AA consent tracking.

### Transaction
Individual financial transactions from AA data.

### FinancialProfile
Computed financial summary per worker.

### Credential
Issued verifiable credentials.

### AuditLog
Action tracking for compliance.

## Relationships

```
Worker 1:1 VerificationProfile
Worker 1:1 FinancialProfile
Worker 1:N ConsentRequest
Worker 1:N Transaction
Worker 1:N Credential
Worker 1:N AuditLog
```

## Running Migrations

```bash
npx prisma generate
npx prisma db push    # For hackathon (quick)
npx prisma migrate dev # For proper migrations
```
