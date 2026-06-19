# Layer 3 — Reputation & Risk Scoring

## Overview

Layer 3 combines identity and financial signals to compute an overall reputation score that represents the worker's financial trustworthiness.

## Scoring Model

```
Reputation Score = 
  (Identity Score × 0.3) + 
  (Financial Score × 0.5) + 
  (Consistency Score × 0.2)
```

### Identity Score (0-100)
- Aadhaar verified: +40
- eShram verified: +30
- Profile complete: +30

### Financial Score (0-100)
- Income stability: weighted
- Savings ratio: weighted
- Transaction regularity: weighted
- Account age: weighted

### Consistency Score (0-100)
- Data freshness
- Verification recency
- Cross-validation signals

## Risk Categories

| Score Range | Category |
|------------|----------|
| 0-30       | High Risk |
| 31-60      | Medium Risk |
| 61-100     | Low Risk |

## TODO

- [ ] Implement scoring algorithm
- [ ] Build reputation dashboard
- [ ] Add historical score tracking
- [ ] Create risk assessment reports
