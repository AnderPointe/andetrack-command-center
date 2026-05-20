# Local Setup — Anderoute MVP

## Prerequisites
- Node 20+ or Bun 1.x
- Supabase CLI (`npm i -g supabase`)
- A Supabase project (Lovable Cloud auto-provisions one)

## Install
```bash
bun install
```

## Environment
Copy `.env` from the Lovable Cloud configuration. Required keys are listed in
`docs/mvp/environment-variables.md`. Do not commit `.env`.

## Database
1. Apply schema: paste `docs/phase12-schema.sql` as a single migration.
2. Apply RLS: paste `docs/phase12-rls.sql`.
3. Seed demo data: paste `docs/phase12-seed.sql`.

## Run dev server
```bash
bun run dev
```

App opens at the Lovable preview URL (or `http://localhost:5173` locally).

## Tour
- Dispatcher: `/dashboard`, `/dispatch`, `/loads`, `/map`
- Driver demo: `/driver/elite-nav`, `/driver/copilot-lab`
- Customer portal: `/portal`
- Phase 12 tracker: `/build/phase12-overview`
- Phase 11 plan: `/mvp/overview`
