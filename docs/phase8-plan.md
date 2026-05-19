# Phase 8 plan — Production hardening, compliance, QA, SOC 2 readiness

## Goal
Turn Anderoute from feature-complete into audit-ready enterprise infrastructure.

## Tracks

### 1. Security hardening
- Penetration test scoped to public API + customer portal + EDI ingress.
- Rotate every long-lived secret quarterly; document rotation runbook.
- mTLS for high-value EDI partners.
- Enforce per-company IP allowlists for API keys with `webhooks.manage`.
- Anomaly detection on `api_request_logs` (rate spikes, geo shifts).
- Add `LOVABLE_API_KEY` and Supabase service role to a secret broker (no env-only).

### 2. Compliance & privacy
- SOC 2 Type II readiness: control matrix mapped to existing tables (`audit_log_events`, `app_error_events`, `api_request_logs`, `support_access_sessions`).
- GDPR: data export + erase-on-request server functions per `customer_users` / `drivers` / `user`.
- CCPA disclosures + Do-Not-Sell signal.
- DPA + sub-processor list published.
- Customer-managed encryption keys (BYOK) for enterprise plans — design only.
- Driver consent log already exists (Phase 5); extend with policy version IDs.

### 3. Reliability & SLOs
- Define SLOs: API 99.9%, webhook delivery 99.5% within 5 min, EDI inbound parse 99% within 60 s.
- Synthetic monitors for each public endpoint.
- Alerting on `integration_health_events` failure transitions.
- Blue/green deployment for the TanStack worker.
- Postgres point-in-time recovery + quarterly restore drills.

### 4. QA & release engineering
- Playwright suites for dispatcher, driver, customer portal flows.
- Contract tests for public API per scope.
- EDI fixture corpus (20 partner-specific 204s; expected 990/214 outputs).
- Release checklist gates: typecheck, lint, e2e, security scan, migration dry-run.

### 5. Observability
- Tracing (OpenTelemetry) wired through server fns → Supabase → external connectors.
- Unified log fields: `request_id`, `company_id`, `user_id`, `integration_id`.
- Cost dashboards on `ai_cost_events` × `subscription_plans`.

### 6. Enterprise operations
- Dedicated tenant tier (isolated DB / Postgres role).
- Multi-region read replicas for tracking data.
- Customer status page (uptime per integration).
- 24/7 on-call rotation; PagerDuty wiring.

### 7. Documentation
- API reference site (OpenAPI 3.1 generated from server route schemas).
- EDI partner onboarding kit.
- White-label deployment guide.
- Driver app store submission package (uses Phase 5 release checklist).

## Out of scope for Phase 8
- New product surfaces — Phase 8 is hardening only.
- Marketplace expansion — handled in Phase 7 cadence.
