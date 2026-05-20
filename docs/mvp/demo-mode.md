# Demo Mode — Anderoute MVP

Demo mode is the safe, seeded sandbox for sales, investor walkthroughs, and
pilot evaluation.

## Activation
Set `VITE_DEMO_MODE=1` and reload. The app shows a `DemoModeBanner` at the
top of every screen and exposes `ResetDemoButton` in `/settings`.

## What demo mode does
- Loads the Anderoute Demo Logistics company (see `docs/phase12-seed.sql`)
- Starts the **mock GPS stream** that moves Marcus Hill along his route
- Enables `DemoScenarioRunner` with three canned scenarios:
  1. Offer L-2002 → Lena accepts → status advance → POD
  2. Offer L-2005 → Anthony denies → alert fires
  3. Marcus Hill GPS goes stale → `gps_stale` alert → dispatcher resolves
- Replaces every `notification_events` push with an in-app toast

## What demo mode does NOT do
- No real auth (uses the bootstrapped dispatcher seed)
- No real GPS / maps / push / AI calls
- No outbound emails or webhooks

## Reset
`ResetDemoButton` calls a service-role server function that:
1. Deletes all rows for `company_id = 00000000-0000-0000-0000-00000000c001`
2. Re-runs `docs/phase12-seed.sql`
3. Restarts the mock GPS stream

Resetting takes ~2 seconds and is safe to run mid-demo.

## Recording a demo
Use the script in `docs/phase10-demo-scripts.md` for the talk track. Keep
the live timer under 6 minutes — the seeded data is sized for that length.
