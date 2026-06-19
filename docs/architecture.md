# PRAMAAN — Architecture Overview

## What is PRAMAAN?

PRAMAAN is a financial identity platform for India's gig and informal workers. It enables workers to build verifiable identities by linking government IDs (Aadhaar via DigiLocker, eShram cards), financial data (via Account Aggregator), and packaging them as Verifiable Credentials (SSI).

## Architecture

```
┌─────────────────────────────────────────┐
│            Next.js 15 App               │
├─────────────┬───────────────────────────┤
│   Frontend  │        Backend            │
│  (App Router│    (API Routes)           │
│   + React)  │                           │
├─────────────┴───────────────────────────┤
│           Features Layer                │
│  identity │ financial │ reputation │ cred│
├─────────────────────────────────────────┤
│        Integrations Layer               │
│  digilocker │ eshram │ setu │ ssi       │
│  (mock / sandbox / production)          │
├─────────────────────────────────────────┤
│              Lib Layer                  │
│  config │ database │ auth │ utils       │
├─────────────────────────────────────────┤
│          PostgreSQL (Prisma)            │
└─────────────────────────────────────────┘
```

## Mode System

The app supports three modes via `MODE` env var:

- **mock** (default): All integrations return simulated data. No external API calls.
- **sandbox**: Connects to sandbox/test APIs for DigiLocker, eShram, and Setu.
- **production**: Connects to live production APIs.

## Key Design Decisions

1. **Single monolith** — No microservices. One Next.js app handles everything.
2. **Dependency injection for integrations** — Services don't know which adapter (mock/sandbox) is active.
3. **Feature-based organization** — Code is organized by business domain, not technical layer.
4. **Hackathon-first** — Minimal boilerplate, maximum velocity.
