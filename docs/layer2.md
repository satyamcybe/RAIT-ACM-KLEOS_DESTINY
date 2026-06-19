# Layer 2 — Financial Verification

## Overview

Layer 2 handles financial data retrieval and analysis through the Account Aggregator (AA) framework, using Setu as the FIU (Financial Information User).

## Flow

```
Worker → Consent Request → Setu AA → Bank Consent → Data Fetch → Transaction Analysis → Financial Profile
```

## Sub-features

### Consent Management
- Create consent requests with specific FI types
- Track consent status (pending → approved/rejected)
- Handle consent expiry

### FI Data Fetch
- Fetch financial data after consent approval
- Parse and normalize transaction data
- Store in Transaction model

### Transaction Analysis
- Categorize transactions (salary, UPI, ATM, etc.)
- Compute monthly income/expense breakdowns
- Identify salary regularity patterns

### Signal Extraction
- Income stability score
- Savings ratio
- Transaction frequency
- Salary regularity

## TODO

- [ ] Implement Setu AA consent flow
- [ ] Implement FI data fetch and decryption
- [ ] Build transaction categorizer
- [ ] Implement signal extraction pipeline
- [ ] Compute and store FinancialProfile
