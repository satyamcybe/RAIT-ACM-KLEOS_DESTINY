# Pranam

> Financial identity platform for India's gig workers

Pranam helps gig and informal workers build **verifiable financial identities** by linking government IDs (Aadhaar via DigiLocker, eShram), financial data (via Account Aggregator / Setu), and packaging them as **W3C Verifiable Credentials** (SSI).

## Quick Start

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run in mock mode (default)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend + Backend | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS + ShadCN UI |
| Database | PostgreSQL + Prisma |
| Authentication | Clerk |

## Mode System

```
MODE=mock        # Default — all integrations simulated
MODE=sandbox     # Connects to sandbox APIs
MODE=production  # Live APIs
```

## Project Structure

```
src/
├── app/                    # Next.js pages & API routes
│   ├── onboarding/         # Identity verification flow
│   ├── dashboard/          # Main dashboard
│   ├── wallet/             # Credential wallet
│   ├── settings/           # User settings
│   ├── financial-verification/ # AA consent flow
│   └── api/                # Backend API routes
├── components/             # React components
│   ├── layout/             # Navbar, Sidebar, Footer
│   ├── shared/             # Loading, Error, EmptyState
│   ├── identity/           # Identity cards
│   ├── financial/          # Financial summary
│   └── wallet/             # Credential cards
├── features/               # Business logic
│   ├── identity/           # Identity verification
│   ├── financial/          # Financial data & analysis
│   ├── reputation/         # Reputation scoring
│   └── credentials/        # Verifiable credentials
├── integrations/           # External service adapters
│   ├── digilocker/         # Mock + Sandbox
│   ├── eshram/             # Mock + Sandbox
│   ├── setu/               # Mock + Sandbox
│   └── ssi/                # Mock only
├── lib/                    # Core utilities
│   ├── config/             # Env + app config
│   ├── database/           # Prisma client
│   ├── auth/               # Clerk helpers
│   └── utils/              # Logger, response, validators
├── types/                  # Shared TypeScript types
prisma/                     # Schema + seed
docs/                       # Documentation
tests/                      # Test files
```

## Layers

- **Layer 1**: Identity — DigiLocker (Aadhaar) + eShram verification
- **Layer 2**: Financial — Account Aggregator consent + data fetch + signals
- **Layer 3**: Reputation — Risk scoring + reputation calculation
- **SSI**: Verifiable Credentials — Issue, store, share, verify

## Documentation

See the `docs/` folder for detailed documentation:

- [Architecture](docs/architecture.md)
- [Layer 1 - Identity](docs/layer1.md)
- [Layer 2 - Financial](docs/layer2.md)
- [Layer 3 - Reputation](docs/layer3.md)
- [SSI](docs/ssi.md)
- [API Reference](docs/api-reference.md)
- [Database Schema](docs/database-schema.md)
- [Deployment](docs/deployment.md)

## License

Hackathon project — Pramaan 2024
