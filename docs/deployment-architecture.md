# Deployment Architecture — Anderoute

## Environments

| Env        | Purpose                              | Data      |
|------------|--------------------------------------|-----------|
| local      | Dev sandbox                          | Mock      |
| preview    | Per-PR ephemeral preview             | Mock/seed |
| staging    | Pre-prod parity, soak testing        | Synthetic |
| production | Customer-facing                      | Live      |

## Surfaces
- **Dispatcher web** — TanStack Start on Cloudflare Workers
- **Customer portal** — same worker bundle, gated routes
- **Driver mobile** — Expo / React Native (Phase 5 architecture)
- **Database** — Supabase (Postgres + RLS + Storage)
- **Server logic** — `createServerFn` (TanStack) — preferred
- **Edge Functions** — Supabase, webhook-only
- **Storage** — `proof-of-delivery` bucket + future `evidence` bucket

## Vendors
Mapbox / Google / HERE / Trimble · OpenAI (Lovable AI Gateway) · Twilio · SendGrid · Stripe · EDI VAN

## Release Boundaries
- **Frontend**: requires "Update" in publish dialog → propagated CDN.
- **Backend (server fns, migrations)**: deploys with the worker bundle on publish.
- **Edge Functions**: auto-deploy on push.
- **Mobile**: standalone via EAS — independent cadence.

See `release-process.md`, `rollback-process.md`, `database-migration-process.md`.
