# Phase 18 — Enterprise V2.5 plan

V2.5 hardens V2 into enterprise-ready logistics SaaS. Routes live under
`/v25/*`. Mock-only — production wiring goes through TanStack `createServerFn`
+ Supabase, with Edge Functions only for partner-facing webhooks and crons.

## In scope
- Production EDI foundation (204 / 990 / 214 / 210 / 997; 211 / 212 / 856 placeholders)
- EDI trading partner management (SFTP / AS2 / API bridge / manual)
- EDI mapping manager with versioned mappings + test runner
- API monetization (tiers, included requests, overage, billing events)
- API gateway readiness (key, scope, rate limit, isolation, idempotency)
- Advanced optimization engine (multi-load, deadhead, utilization, workload)
- Optimization scenario planning (what-if + approval)
- CoPilot V2.5 (enterprise summaries, EDI / API / optimization explainers)
- Customer communication automation (draft + dispatcher approval)
- White-label customer portal (branding, support, email templates)
- Custom domain readiness (DNS verification + SSL placeholder)
- Larger fleet scaling (25 → 1,000+ tiers)
- Advanced map clustering
- Multi-location operations (HQ / yards / terminals / warehouses / regions)
- Enterprise security controls V2.5 (reviews, exports, retention)
- Advanced data retention policies
- Integration reliability V2.5 (retry backlog, credential expiration, SLA)
- Advanced audit + export (filters, CSV / JSON, PDF placeholder)
- Customer portal insights V2.5
- Enterprise onboarding (13-step wizard → go-live)
- Enterprise reporting (14 reports)

## Deferred (out of V2.5)
- Android Auto, CarPlay (re-evaluate in V3)
- Fully autonomous dispatch (human approval still required)
- Full SOC 2 automation (evidence collection only)
- Carrier marketplace (V3)
- Advanced telematics ML (needs real vehicle diagnostics)
- Full global tax / billing complexity
- Custom white-label mobile app builds

## Schema additions
See `docs/phase18-schema.sql`.

## RLS examples
See `docs/phase18-rls.sql`.

## Edge function plan
See `docs/phase18-edge-function-plan.md`.

## Phase 19
See `docs/phase19-plan.md` — V3 mobile-native expansion, Android Auto / CarPlay,
advanced AI voice, telematics integration, carrier marketplace, enterprise
certification readiness.
