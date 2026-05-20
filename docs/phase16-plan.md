# Phase 16 — V1.5 plan

Phase 16 moves V1.1 from "prepared" to "in production" along the three
levers Phase 15 deliberately deferred: real navigation, real billing
revenue, and smarter CoPilot.

## Themes

1. **Real navigation SDK in production** — turn on Mapbox Navigation SDK
   for ≥50% of active drivers behind a per-company feature flag. Native
   turn-by-turn + reroute. Truck restriction validation deferred to V2.
2. **Billing in production** — Stripe live mode. Auto-collect monthly.
   Dunning emails. Past-due → soft suspension after grace.
3. **Basic integrations** — outbound webhooks for load lifecycle events,
   inbound REST for load creation, signed via HMAC. No marketplace yet.
4. **CoPilot intelligence** — replace rules with Lovable AI Gateway
   (`google/gemini-2.5-flash`) using operational context from V1.1.
   Keep rules engine as fallback when LLM is unavailable.
5. **Mobile polish** — battery / background tracking improvements;
   notification reliability ≥98%; offline queue UX hardened.
6. **Customer growth** — onboard customers #4-#6 on V1.5; formalize the
   onboarding template defined in Phase 15.

## Explicit non-goals (defer to V2)

- Full EDI
- API marketplace
- Full predictive AI / optimization engine
- Android Auto / CarPlay
- White-label custom domains
- SOC 2 automation

## Entry criteria from Phase 15

- V1.1 readiness ≥ 85%
- ≥ 1 paying customer live on V1.1
- Notification delivery ≥ 97%
- All V1.1 security review controls cleared
- CSV imports used by at least one production customer

## Exit criteria

- ≥ 3 paying customers live on V1.5
- Real navigation SDK active for ≥ 50% of active drivers
- Stripe live billing collects monthly with < 5% dunning rate
- Notification delivery ≥ 98%
- CoPilot LLM responses ≥ 90% rated useful by dispatchers
- Phase 17 plan defined (V2 intelligence + integrations expansion)
