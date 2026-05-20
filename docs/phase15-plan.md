# Phase 15 — V1.1 Expansion & Production Growth

Phase 15 builds on a successfully launched V1 to grow the product
commercially and harden the navigation + billing stack.

## Themes

1. **Real navigation SDK integration** — replace the mock provider with a
   production turn-by-turn provider (Mapbox or HERE, with truck-routing
   constraints) behind the existing `NavigationProvider` interface.
2. **Improved ETA** — incorporate live traffic, dwell history, and load
   profile; expose confidence intervals.
3. **Billing activation** — turn on subscription billing for converted
   pilots; meter on active drivers and active loads.
4. **Driver / vehicle / customer imports** — CSV importers with validation
   and dry-run preview.
5. **Better offline mode** — persistent queue, retry policy, and clear
   user feedback when GPS / POD is queued.
6. **Better notifications** — per-role preferences, quiet hours,
   templated copy, and delivery analytics.
7. **More reports** — exception report, on-time performance, customer
   visibility, dispatcher productivity.
8. **Customer growth** — onboard customers #2 and #3 with the V1.1 build;
   formalize CS playbook from Phase 14.

## Explicit non-goals (defer to V2)

- Full optimization engine
- Full predictive AI
- EDI production
- Android Auto / CarPlay
- White-label custom domains
- SOC 2 automation

## Entry criteria from Phase 14

- V1 readiness ≥ 90%; all P0/P1 bugs released
- ≥ 1 paying customer signed
- Regression suite green
- Customer health ≥ 75 on the pilot account
- Support SLA breach rate < 10%

## Exit criteria

- 3+ paying customers live on V1.1
- Real navigation SDK live for ≥ 50% of active drivers
- Billing collects monthly without manual intervention
- Notification delivery ≥ 97%
- GPS update success ≥ 95%
- Phase 16 plan defined (V2 intelligence + integrations)
