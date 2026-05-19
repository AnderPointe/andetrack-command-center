# Environment Strategy

## Isolation
Every env has its own Supabase project, Stripe account (test mode for non-prod),
provider keys, and storage buckets. No prod secret is ever readable from preview.

## Promotion path
local → preview → staging → production. Every promotion runs typecheck, lint,
unit, RLS tests, e2e smoke, and migration dry-run.

## Data
- **preview/staging**: synthetic seed via `scripts/seed-synthetic.ts` (planned).
- **production**: live data + PITR backups, 30-day retention.

## Secrets
- Build-time (Vite `VITE_*`) — safe in client bundle.
- Runtime (`process.env`) — server-only.
- Service-role keys: production only, secret broker.
