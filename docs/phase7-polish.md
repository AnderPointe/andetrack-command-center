# Phase 7 — Polish notes

Phase 7 already shipped enterprise integrations, EDI, API marketplace, webhooks,
optimization, rate engine, white-label, email templates, documents, and data
import/export. This document records the polish pass: unified UX, sharper
explanations, stronger security boundaries, cleaner schema, and clearer
Edge-Function-vs-server-function rules. Phases 1–6 are untouched.

## 1. Unified enterprise sub-navigation

All Phase 7 routes mount `src/components/enterprise/EnterpriseNav.tsx` directly
under the page header. Switching between Hub / EDI / API / Webhooks / Health /
Optimize / Rate quote / White-label / Emails / Docs / Import-Export no longer
requires going back to the Hub or Sidebar.

## 2. Cleaner Supabase schema (Phase 7 tables, polish guidance)

Already-created tables (see `docs/phase7-architecture.md`) should be kept but
audited:

| Concern | Rule |
| --- | --- |
| Tenant scoping | Every Phase 7 table has `company_id uuid not null`. Confirm with `select count(*) from information_schema.columns where ... and column_name='company_id'`. |
| Secrets | `api_keys.secret_hash text not null`. NEVER store cleartext. `webhook_endpoints.signing_secret_encrypted text` only. Cleartext is returned exactly once at create/rotate. |
| Timestamps | `created_at`, `updated_at` with `touch_updated_at` trigger. |
| Soft delete | Use `status` enums (`active`, `revoked`, `disabled`) over hard delete on `api_keys`, `webhook_endpoints`, `company_integrations`, `edi_partners`. |
| Indices | `(company_id, created_at desc)` on every event/log table (`api_request_logs`, `webhook_deliveries`, `integration_sync_logs`, `edi_transactions`). |
| Append-only | `webhook_deliveries`, `api_request_logs`, `integration_error_logs`, `optimization_runs` — no `update`/`delete` policies; only `insert` + `select`. |

## 3. Stronger RLS policy examples

Drop the broad "company_member can do everything" pattern in favor of split
read/write + sensitive-column exclusion. Apply per Phase 7 table.

```sql
-- READ: any active member of the company can read tenant rows
create policy "api_keys_read_member"
on public.api_keys for select to authenticated
using (public.is_company_member(auth.uid(), company_id));

-- WRITE: only owners/admins/dispatchers can create or rotate keys
create policy "api_keys_write_admin"
on public.api_keys for insert to authenticated
with check (public.can_manage_company(auth.uid(), company_id));

create policy "api_keys_update_admin"
on public.api_keys for update to authenticated
using (public.can_manage_company(auth.uid(), company_id))
with check (public.can_manage_company(auth.uid(), company_id));

-- NO DELETE policy — keys are revoked, not deleted (audit trail).

-- Platform-owner cross-company read (support):
create policy "api_keys_read_platform_owner"
on public.api_keys for select to authenticated
using (public.is_platform_owner(auth.uid()));

-- Customer portal users see only their own quotes
create policy "rate_quotes_read_customer"
on public.rate_quotes for select to authenticated
using (
  customer_id in (select public.customer_ids_for_user(auth.uid()))
);
```

Rules:
- Sensitive columns (`secret_hash`, `signing_secret_encrypted`,
  `oauth_refresh_token`, `service_account_json`) are excluded from the default
  `select *` by server-fn projection — clients never request them. Add a
  view (`api_keys_public`) for safe projection if components must hit the table
  directly.
- Append-only tables (`webhook_deliveries`, `api_request_logs`,
  `integration_sync_logs`) get **only** `select` + `insert` policies. No
  `update`/`delete`.
- `is_customer_user(auth.uid(), customer_id)` gates portal-side reads of
  `rate_quotes`, `document_records`, `shipments`.

## 4. Stronger API security boundaries

Public API surface (`/v1/*`) must implement, in order, inside the request
handler:

1. **Key lookup**: `select id, company_id, scopes, status, ip_allowlist
   from api_keys where prefix = $1 and secret_hash = sha256($2) and status = 'active'`.
2. **Scope check**: required scope (e.g., `loads.write`) must be a subset of
   `scopes`.
3. **IP allowlist** (optional per key): reject if `request.ip` not in CIDRs.
4. **Rate limit**: `INSERT INTO api_request_logs (...)` then aggregate
   `count(*) where api_key_id=$1 and ts > now() - interval '1 minute'`. Reject
   over plan limit with `429`.
5. **Tenant scoping**: all subsequent queries are scoped via `where company_id
   = $api_key.company_id`. NEVER trust a `company_id` from the request body.

Webhooks (outbound):
- Sign with `t={unix_ts},v1={hmac_sha256(secret, t + "." + body)}`.
- Recipient verifies within ±5 min tolerance.
- Retry backoff: `[0, 30, 120, 600, 3600]` seconds (see
  `webhookService.RETRY_BACKOFF_SECONDS`). After 5 failures mark
  `webhook_deliveries.status = 'failed_permanent'` and surface in delivery log.

Webhooks (inbound — partners, Stripe, EDI VAN):
- Live under `src/routes/api/public/webhooks/*` (TanStack server route).
- Verify HMAC + timestamp tolerance BEFORE parsing JSON.
- Use `supabaseAdmin` only after verification passes.

## 5. Edge Function vs. server function — clean separation

| Use TanStack `createServerFn` for | Use TanStack server route (`/api/public/*`) for | Use Supabase Edge Function for |
| --- | --- | --- |
| App-internal RPCs called from the UI: `runOptimization`, `calculateRateQuote`, `createApiKey`, `rotateApiKey`, `dispatchWebhook`, `runDataImport`, `runDataExport`, `sendBrandedEmail`, `processDocumentUpload`, `parseEdi204`, `sendEdiOutbound`, `validateCustomDomain`. | External callers we own the URL for: partner inbound EDI (`/api/public/webhooks/edi/$partner`), Stripe (`/api/public/webhooks/stripe`), public health check, third-party telematics push. | Only when work must run inside the Supabase network perimeter, triggered by a `pg_cron` schedule or DB webhook, AND has no UI caller. New work in Phase 7 does NOT meet this bar. |

Phase 7 polish: any new server logic is added as `*.functions.ts` (call site)
+ `*.server.ts` (helpers), per `tanstack-supabase-integration` rules. No new
files are added under `supabase/functions/`.

## 6. CoPilot enterprise automation prompts

`src/ai/copilotSystemPrompt.ts` mode `enterprise_dispatcher` answers:

- "Which integrations failed today?" → `select * from integration_health_events
  where company_id=$1 and severity in ('error','critical') and ts > now() - '24h'`.
- "Which webhooks failed?" → grouped by endpoint with last 3 error bodies.
- "Best driver for load X?" → delegate to
  `optimizationEngine.rankSuggestedDrivers`; return top 3 with `explanation`.
- "Draft customer update for shipment Y" → branded email template via
  `email_templates` + live `eta_updates`.
- "Quote me a Dallas → Houston dry van today" → delegates to
  `calculateRateQuote`; returns total + margin + breakdown.
- "Which loads came from EDI today?" → `edi_transactions where
  transaction_type='204' and received_at > today`.

All answers MUST filter by `auth.uid()` → `current_company()` and respect the
permission grid in `src/rbac/permissions.ts`.

## 7. UI polish summary (no functional changes to phases 1–6)

| Surface | Before | After |
| --- | --- | --- |
| All Phase 7 pages | Cross-linked only from Hub | Mount `<EnterpriseNav />` for one-click sub-nav |
| Optimization Center | Single explanation string | Per-factor breakdown bars (vehicle, CDL, deadhead, ETA, risk) |
| Webhooks | Flat delivery list | Status filter + signature/payload preview |
| White-Label | Single dark preview | Side-by-side customer-portal + email-shell preview |
| Email Templates | List only | Preview pane with sample HTML and merge tokens |
| Documents | Flat table | Type filter chips + expiring-soon group |
| Data Import/Export | Single page | Stepper wizard: choose type → upload/configure → map → validate → run |
| Integration Health | Static badges | 30-day uptime bar visualization |
| Customer Portal | Already polished in Phase 6 | Quote portal link from `/rating/quote` |

## 8. What we explicitly did NOT do (deferred to Phase 8)

- SOC 2 controls, audit log export, retention policies.
- Real OAuth 2.0 client-credentials grant for the public API.
- Real X12 translator (still mock parser in `ediService.ts`).
- AS2 transport for EDI.
- Multi-region pinning + per-region Supabase routing.
- Penetration test, threat model, vuln scanning automation.

These are tracked in `docs/phase8-plan.md`.
