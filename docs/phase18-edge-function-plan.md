# Phase 18 — V2.5 Edge Function plan

In TanStack Start, app-internal logic belongs in `createServerFn`. Edge
Functions are reserved for two categories:

1. **External callers** — webhooks and HTTP endpoints that external systems
   (EDI partners, payment providers, customer apps) call directly.
2. **Scheduled jobs** — pg_cron-triggered work that must run inside the
   database / partner network perimeter.

Everything else (mappings, optimization, communication drafts, audit reads,
report generation triggered by app users) should be `createServerFn`.

## EDI
| Function | Trigger | Notes |
| --- | --- | --- |
| `receive-edi-transaction` | Partner SFTP/AS2 webhook | Verify partner; persist raw payload; enqueue `process-edi-204`. |
| `process-edi-204` | Internal queue | Parse + map → shipment request; emit `send-edi-997`. |
| `send-edi-990` | Dispatcher action (via server fn → enqueue) | Build + transmit accept/reject. |
| `send-edi-214` | Shipment status change trigger | Emit per status update. |
| `send-edi-210` | Invoice generation trigger | Outbound freight invoice. |
| `send-edi-997` | Internal | Functional ack for inbound documents. |
| `retry-edi-transmission` | pg_cron (every minute) | Drain `integration_retry_jobs` for EDI. |
| `resolve-edi-error` | Dispatcher action | Mark resolved; reprocess if requested. |

## API monetization / gateway
| Function | Trigger | Notes |
| --- | --- | --- |
| `api-gateway-handler` | External API caller | Orchestrates key + scope + rate-limit + logging + usage. |
| `validate-api-key` | Gateway internal | Hash compare + scope load. |
| `enforce-api-rate-limit` | Gateway internal | Redis / pg-based limiter. |
| `record-api-usage-event` | Gateway async | Persist `api_usage_events`. |
| `calculate-api-overage` | pg_cron (daily) | Aggregate usage vs plan; create `api_overage_events`. |
| `bill-api-usage` | pg_cron (monthly) | Emit `api_billing_events` per tenant. |

## Optimization
Prefer `createServerFn` for these unless they exceed Worker time budget.
| Function | Trigger | Notes |
| --- | --- | --- |
| `run-advanced-optimization` | Dispatcher action or pg_cron | Heavy compute candidate. |
| `compare-optimization-scenarios` | Dispatcher action | Returns scenario deltas. |
| `create-multi-load-assignment` | Dispatcher action | Persists suggested combos. |

## White-label / domains
| Function | Trigger | Notes |
| --- | --- | --- |
| `validate-custom-domain` | Admin action | DNS / SSL preflight. |
| `verify-dns-record` | pg_cron (5 min) | Re-check pending domains. |
| `update-branding-settings` | Admin action | Server-fn preferred. |

## Customer communication
| Function | Trigger | Notes |
| --- | --- | --- |
| `draft-customer-message` | CoPilot trigger | LLM via Lovable AI gateway. |
| `approve-customer-message` | Dispatcher action | Server fn preferred. |
| `send-customer-message` | Approval handler | Hand off to email / SMS provider. |

## Scaling / retention / audit
| Function | Trigger | Notes |
| --- | --- | --- |
| `calculate-fleet-scaling-score` | pg_cron (daily) | Persist `fleet_scaling_metrics`. |
| `aggregate-gps-events` | pg_cron (hourly) | Roll into materialized summary. |
| `cleanup-retained-data` | pg_cron (daily, per data type) | Honor `data_retention_policies` + legal holds. |
| `export-audit-logs` | Admin action | Stream to signed URL. |

## Security expectations
- All public endpoints under `/api/public/*` verify partner signatures or HMACs before processing.
- Never return PII from public endpoints without explicit auth.
- All write paths log to `audit_log_events`.
- Edge Functions read secrets at handler scope only (never module scope).
