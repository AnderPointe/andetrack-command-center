# Phase 7 — Enterprise Integrations, EDI, API, Optimization, White-Label

## Goal
Make Anderoute interoperable with the outside world: shippers, brokers, customers, accounting, telematics, maps, AI, document storage. Add an optimization engine, rate engine, and full white-label deployment.

## Routes added
| Route | Purpose |
| --- | --- |
| `/integrations/hub` | Marketplace browser + connected integrations |
| `/integrations/edi` | EDI 204/990/214/210/997 dashboard |
| `/integrations/api` | API key manager + public REST docs |
| `/integrations/webhooks` | Endpoints + delivery log + event catalog |
| `/integrations/health` | Real-time uptime & error events |
| `/optimization/center` | Suggested driver assignments, risk, at-risk deliveries |
| `/rating/quote` | Rate quote builder with breakdown |
| `/settings/white-label` | Branding + custom domain + SSL |
| `/settings/email-templates` | Branded transactional email templates |
| `/documents` | POD/BOL/RC/invoice/insurance management |
| `/data/import-export` | Bulk CSV import/export |
| `/enterprise/phase7-demo` | Guided demo flow stepper |

## Modules
- `src/enterprise/types.ts` — shared enterprise types (scopes, events, transactions).
- `src/enterprise/services/optimizationEngine.ts` — `scoreDriverForLoad`, `rankSuggestedDrivers`, `detectAtRiskDeliveries`, fuel/risk/on-time calculators.
- `src/enterprise/services/rateEngine.ts` — `calculateRateQuote` (base + fuel surcharge + accessorials + driver pay + margin).
- `src/enterprise/services/ediService.ts` — `parseEdi204`, `buildAck997`, `buildResponse990`, `buildStatus214`. Mock; integrate a real X12 translator later.
- `src/enterprise/services/webhookService.ts` — payload builder, mock signature, retry backoff schedule.
- `src/enterprise/hooks/useEnterpriseData.ts` — mock catalog/connected/EDI hooks.

## Database (Phase 7 migration)
Added tables (all `company_id` scoped + RLS):
`integration_connectors`, `company_integrations`, `integration_sync_logs`, `integration_error_logs`, `integration_health_events`, `edi_partners`, `edi_transactions`, `edi_mappings`, `edi_acknowledgments`, `api_keys`, `api_key_scopes`, `api_request_logs`, `webhook_endpoints`, `webhook_deliveries`, `data_import_jobs`, `data_import_rows`, `data_export_jobs`, `optimization_runs`, `optimization_recommendations`, `rate_quotes`, `rate_quote_line_items`, `customer_contract_rates`, `fuel_surcharge_rules`, `accessorial_charges`, `company_branding`, `email_templates`, `document_records`, `document_links`.

Catalog seeded with QuickBooks, Xero, NetSuite, SAP, Salesforce, HubSpot, Samsara, Motive, Geotab, WEX, Comdata, Google Drive, OneDrive, Dropbox, Twilio, SendGrid, Mapbox, Google Maps, HERE, Trimble, DAT, Truckstop.

## RLS pattern
- `is_company_member` → read tenant rows.
- `can_manage_company` → write tenant rows (integrations, keys, webhooks, EDI, branding).
- `is_platform_owner` → cross-company view for support.
- Customer portal users see only their own quotes/documents via `customer_ids_for_user(auth.uid())`.
- API key **secrets** and webhook **secrets** are stored hashed/in dedicated columns; client SELECTs intentionally omit them; only the create/rotate server function returns the cleartext once.

## Server-side plan (TanStack server functions)
Future work — implement as `createServerFn` (not Edge Functions) in `src/lib/*.functions.ts`:
- `process-edi-inbound`, `send-edi-outbound`, `generate-edi-acknowledgment`
- `api-gateway-auth`, `create-api-key`, `rotate-api-key`
- `webhook-dispatcher`, `webhook-retry-worker`
- `run-data-import`, `run-data-export`
- `run-optimization`, `calculate-rate-quote`
- `sync-integration-connector`, `validate-custom-domain`, `send-branded-email`
- `process-document-upload`, `generate-customer-update`

External webhooks (Stripe, partner inbound EDI HTTP) belong under `src/routes/api/public/webhooks/*` server routes with HMAC verification.

## API security
- Hash API keys (sha256) before storing; show secret once on create/rotate.
- Per-scope authorization checks server-side.
- Per-company rate limits (Redis or `api_request_logs` rollup).
- Signed webhooks: `t={ts},v1={hmac}` header; timestamp tolerance ±5 min.
- IP allowlist (optional per key).
- OAuth 2.0 client credentials grant — planned.

## Custom domain flow
1. Admin enters `portal.customer.com`.
2. System issues TXT verification token + CNAME target.
3. Admin adds records at their registrar.
4. System polls DNS until verified.
5. SSL cert provisions via ACME (Lovable custom-domain pipeline).
6. Portal serves under the custom domain with branded theme.

## CoPilot enterprise prompts
Extend `copilotSystemPrompt.ts` mode `enterprise_dispatcher` to answer:
- Which integrations failed today? Which webhooks failed?
- Which loads came from EDI?
- Best driver for load X? (delegates to `optimizationEngine.rankSuggestedDrivers`)
- Draft customer update / invoice note / quote explanation.
- All answers must filter by `company_id` and respect RBAC.

## Demo flow
See `/enterprise/phase7-demo` for the guided stepper.
