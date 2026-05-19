# Phase 6 — Multi-Company SaaS Architecture

## Goal
Turn Anderoute into a logistics SaaS where platform owners host multiple companies; each company manages dispatchers, drivers, vehicles, customers, loads, billing, and a self-service portal.

## Tenant model
- `companies` (existing) — tenant root.
- All tenant-owned tables carry `company_id` and have RLS scoped by `is_company_member` / `can_manage_company` / `is_platform_owner`.
- `customers` belong to a company. `customer_users` link auth users to a customer record (one user may serve multiple customers).
- `user_roles` rows scope a user's role to a `company_id`; platform roles use a global row.

## Roles → permissions
See `src/rbac/permissions.ts`. Role layers:
- **Platform**: `platform_owner`, `platform_support`
- **Company**: `company_owner` / `owner`, `company_admin` / `admin`, `billing_admin`, `dispatcher_manager`, `dispatcher`, `driver`, `mechanic`, `viewer`
- **Customer-side**: `customer_admin`, `customer_user`

Use `usePermissions()` and `<PermissionGate permission="…">` in UI. Server functions must re-check with `requireSupabaseAuth` + role/permission lookup — never trust the client.

## New surfaces (Phase 6)
- `/dispatch/command-center` — KPI grid + live map + status board + alerts.
- `/portal` and `/portal/new-request` — customer-facing shipment tracking and submission.
- `/settings/billing` — plan, usage meters, comparison, Stripe portal link.
- `/admin/platform` — platform owner: companies, flags, support sessions, audit.

## Billing
Stripe Billing (placeholder integration). Tables:
- `subscription_plans` (seeded: Starter / Professional / Fleet Command / Enterprise)
- `company_subscriptions`, `billing_customers`, `billing_invoices`, `billing_events`, `billing_usage_events`

All Stripe secret usage MUST live in server functions (`createServerFn`) or `/api/public/webhooks/stripe.ts` server routes — never in the client bundle. Verify webhook signatures via `STRIPE_WEBHOOK_SECRET`.

Planned server functions:
- `create-stripe-checkout-session`
- `create-stripe-customer-portal-session`
- `stripe-webhook` (server route under `/api/public/webhooks/stripe`)
- `record-billing-usage`

## Feature flags
`feature_flags` + `company_feature_flags`. Default-enabled flags seeded. Gate UI with a `useFeatureFlag('key')` hook (to add when wiring backend).

## Customer portal data path
- Portal user signs in → `customer_users` row resolves their `customer_id`.
- RLS allows them to read:
  - their `customers` row (via company member side too)
  - `shipment_requests` where `customer_id` matches
  - `loads` where a `shipment_request.converted_load_id` matches
  - `customer_locations` for their customer
- Writes limited to creating `shipment_requests`.

## Demo flow (mock-ready)
1. Platform owner creates company.
2. Company admin adds drivers + vehicles (existing tables).
3. Customer + customer_user created → portal invite.
4. Customer submits `shipment_request`.
5. Dispatcher converts request → `loads` row (set `shipment_requests.converted_load_id`).
6. Suggested-driver panel ranks drivers (Phase 6.1).
7. Dispatcher offers load → driver accepts (existing Phase 2 flow).
8. Customer sees status in portal.
9. POD posted (existing).
10. `billing_usage_events` accumulate; invoices arrive via Stripe webhook.
11. All major actions append to `audit_log_events`.

## Security checklist
- All RLS policies use SECURITY DEFINER helpers (`is_company_member`, `can_manage_company`, `is_platform_owner`, `is_customer_user`) to avoid recursion.
- Customer portal users CANNOT see other customers' data — every relevant policy joins through `customer_ids_for_user(auth.uid())`.
- Support access is time-limited via `support_access_sessions.expires_at`; expired sessions don't grant cross-company reads.
- Stripe secrets, OpenAI keys, and any provider tokens are server-only (see `docs/security-model.md`).

## Phase 7 plan (preview)
- Marketplace integrations (DAT, Truckstop, 123Loadboard)
- EDI/API (X12 204/214/990/210)
- Route optimization (multi-stop VRP)
- White-label customer portal (per-company branding)
- Public dispatcher API + webhooks for tenant integrations
- Multi-region data residency
- Advanced AI: predictive ETA, capacity forecasting, dynamic pricing
