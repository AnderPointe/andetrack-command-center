# Phase 16 — Edge Function plan

On this stack server-side logic is TanStack `createServerFn`. The list below
maps each planned operation to its server-function module. Webhook intake
endpoints from external services live under `src/routes/api/public/*`.

## Navigation
- `request-navigation-route` → `src/lib/navigation.functions.ts`
- `test-navigation-provider` → `src/lib/navigation.functions.ts`
- `create-navigation-session` / `update-navigation-session` → `src/lib/navigation.functions.ts`
- `record-navigation-event` → `src/lib/navigation.functions.ts`
- `sync-route-eta` → `src/lib/navigationETA.functions.ts`
- `request-reroute` → `src/lib/navigation.functions.ts`

## Billing
- `create-checkout-session` → `src/lib/billing.functions.ts`
- `create-customer-portal-session` → `src/lib/billing.functions.ts`
- `sync-subscription-status` → `src/lib/billing.functions.ts`
- `record-billing-usage` → `src/lib/billing.functions.ts`
- `enforce-plan-limits` → `src/lib/planLimits.functions.ts`
- `handle-past-due-subscription` / `handle-cancelled-subscription` → `src/lib/billing.functions.ts`
- **Stripe webhook intake**: `src/routes/api/public/stripe-webhook.ts`
  (verifies `Stripe-Signature` with `STRIPE_WEBHOOK_SECRET` before doing any work)

## Webhooks
- `dispatch-webhook-event` → `src/lib/webhooks.functions.ts` (HMAC-sign payload, POST, retry queue)
- `retry-webhook-delivery` → `src/lib/webhooks.functions.ts`
- `test-webhook-endpoint` → `src/lib/webhooks.functions.ts`

## CoPilot
- `generate-operational-summary` → `src/lib/copilot.functions.ts`
- `generate-copilot-insights` → `src/lib/copilot.functions.ts`
- `create-copilot-action` → `src/lib/copilot.functions.ts`

## Secret boundaries
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, navigation provider private
  keys: server-only, read inside `.handler()` via `process.env.*`.
- `VITE_MAPBOX_PUBLIC_TOKEN`: publishable, safe in client bundle.
- All webhook outbound deliveries signed with per-endpoint `secret_hash`;
  inbound deliveries verified before payload parsing.
