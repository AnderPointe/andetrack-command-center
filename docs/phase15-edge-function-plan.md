# Phase 15 — Edge Function plan

V1.1 server-side surfaces. On the TanStack stack these are implemented as
`createServerFn` handlers (preferred) or `src/routes/api/public/*` server
routes (webhooks only). Names below are the deployment names.

## ETA + Navigation

| Name                          | Method | Auth        | Purpose |
| ----------------------------- | ------ | ----------- | ------- |
| calculate-improved-eta        | POST   | user        | Run ETA engine for a shipment; returns ETA, confidence, window status. |
| update-shipment-eta           | POST   | user        | Persist new ETA + log eta_update_events. |
| test-navigation-provider      | POST   | admin       | Run readiness checks against a provider; logs route_provider_test_runs. |

## Billing (Stripe)

| Name                              | Method | Auth        | Purpose |
| --------------------------------- | ------ | ----------- | ------- |
| create-checkout-session           | POST   | admin       | Returns Stripe Checkout URL for plan upgrade. |
| create-customer-portal-session    | POST   | admin       | Returns Stripe billing portal URL. |
| stripe-webhook                    | POST   | signature   | Verifies signature then updates subscriptions / invoices. |
| sync-subscription-status          | POST   | service     | Reconciles Stripe state into company_subscriptions. |
| record-billing-usage              | POST   | service     | Appends to billing_usage_events. |

## Imports

| Name                  | Method | Auth        | Purpose |
| --------------------- | ------ | ----------- | ------- |
| validate-csv-import   | POST   | admin/disp  | Validates uploaded CSV; populates csv_import_rows. |
| process-csv-import    | POST   | admin/disp  | Commits validated rows into target tables with idempotency. |

## Offline / Notifications

| Name                       | Method | Auth        | Purpose |
| -------------------------- | ------ | ----------- | ------- |
| sync-offline-queue         | POST   | driver      | Applies queued events using idempotency keys. |
| retry-failed-notification  | POST   | service     | Replays failed notification_delivery_events with backoff. |

## Reports & Ops

| Name                       | Method | Auth        | Purpose |
| -------------------------- | ------ | ----------- | ------- |
| generate-v11-report        | POST   | admin/disp  | Builds CSV/JSON for a V1.1 report; writes report_runs. |
| run-data-quality-check     | POST   | admin       | Refreshes data_quality_issues. |
| calculate-growth-metrics   | POST   | service     | Nightly snapshot into growth_metrics. |
| run-v11-security-review    | POST   | platform    | Refreshes v11_security_reviews. |

## Conventions

- All handlers validate input with Zod and enforce company scoping via
  `requireSupabaseAuth` middleware before any write.
- Stripe webhook lives under `src/routes/api/public/stripe/webhook.ts` and
  uses `stripe.webhooks.constructEvent` with the signing secret before any
  database mutation.
- All Stripe calls happen server-side. The frontend never sees the secret
  key, only the publishable key used by Stripe.js for Checkout redirect.
- Edge / server fn errors return a typed `{ error, hint }` envelope so the
  client can render actionable messages without leaking provider detail.
