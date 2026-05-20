# Phase 15 — V1.1 expansion

Phase 15 moves Anderoute from stable V1 into V1.1 by adding the
highest-value post-pilot improvements without jumping to enterprise scope.

## What V1.1 adds

- Improved ETA engine with confidence + window status
- Navigation SDK readiness (Mapbox, Google, HERE, Trimble, Mock fallback)
- Basic billing activation (Stripe via Edge Functions)
- Driver / vehicle / customer CSV imports
- Offline + sync improvements with idempotency keys
- Notification reliability dashboard + templates
- Customer portal V1.1 (timeline, POD, filters, history)
- Dispatcher load-board filters and activity timeline
- 10 practical reports
- CoPilot V1.1 (rules-based, clearly labeled)
- Permission matrix UI
- Production onboarding workflow
- Production growth dashboard
- Support V1.1 (SLAs, known issues)
- Data quality dashboard
- V1.1 security review

## Explicit non-goals

- Full EDI production
- API marketplace
- Full predictive AI / optimization
- Android Auto / CarPlay
- White-label custom domains
- SOC 2 automation
- Live Stripe billing automation (V1.5)
- Native turn-by-turn (V1.5)

## Entry / exit criteria

Entry: V1 GA cleared in Phase 14 with ≥ 1 pilot customer signed.

Exit: All V1.1 routes deliver, schema + RLS deployed, Stripe boundary docs
shipped, V1.1 security review ≥ 90%, demo flow runs end-to-end. Phase 16
plan committed.

See also:
- `docs/phase15-schema.sql`
- `docs/phase15-rls.sql`
- `docs/phase15-edge-function-plan.md`
- `docs/phase16-plan.md`
