# Deployment Guide

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env with your values

# 3. Generate Prisma client
npx prisma generate

# 4. Push schema to database (optional, for DB features)
npx prisma db push

# 5. Run development server
npm run dev
```

App runs at `http://localhost:3000` in mock mode by default.

## Mode Configuration

| Mode | `MODE` value | Behavior |
|------|-------------|----------|
| Mock | `mock` | All integrations simulated |
| Sandbox | `sandbox` | Uses sandbox APIs |
| Production | `production` | Live APIs |

## Database Setup (Optional for Mock Mode)

Mock mode works without a database. For full functionality:

```bash
# Start PostgreSQL (Docker)
docker run -d --name pranam-db -p 5432:5432 -e POSTGRES_PASSWORD=password -e POSTGRES_DB=pranam postgres:16

# Push schema
npx prisma db push

# Seed data
npx prisma db seed
```

## Production Deployment

TODO: Add deployment instructions for:
- Vercel
- Railway
- Docker

## Environment Variables

See `.env.example` for all required variables.
