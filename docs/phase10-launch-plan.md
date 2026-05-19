# Phase 10 — Go-To-Market Launch Plan

## Launch phases
| Phase | Goal | Required features | Success criteria | Risks | Exit |
|---|---|---|---|---|---|
| Internal alpha | Validate flows | Phases 1–9 stable | All P0 fixed | Bugs slip | P0 burn-down complete |
| Closed pilot | 2–3 friendly customers | Onboarding wizards | Weekly NPS ≥ 4 | Onboarding drag | 30-day stable usage |
| Design partner | 5–10 partners shape roadmap | Integrations, security | 3 case studies | Roadmap pull | 3 published case studies |
| Paid pilot | Convert to paid | Billing live | ≥ 60% conversion | Pricing pushback | Paid contracts signed |
| Public beta | Self-serve | Marketing site, docs, support | Stable 30 days | Support overload | SLA met |
| GA | Full launch | Pricing locked, SLA, support | GA SLA met | — | — |

## Launch checklist
- [ ] Product readiness (P0/P1 closed, error tracking)
- [ ] Security readiness (RLS coverage, audit, SOC 2 evidence)
- [ ] Demo readiness (guided demo, personas, reset)
- [ ] Documentation readiness (docs hub, in-app help)
- [ ] Pricing readiness (tiers, contracts, MSA, DPA)
- [ ] Billing readiness (Stripe, invoicing, usage meters)
- [ ] Support readiness (ticketing, KB, on-call rotation)
- [ ] Legal/privacy (ToS, privacy policy, DPA, driver consent)
- [ ] Customer onboarding (wizards, imports, training)
- [ ] Marketing site (pages, copy, SEO, analytics)
- [ ] Analytics (event taxonomy, dashboards)

## Phase 11 plan — Real Implementation Sprint
1. Cut MVP: which Phase 1–10 surfaces ship to first paying customer.
2. Backlog creation from mock → real (Supabase schema, server fns, RLS).
3. Technical debt cleanup: dedupe, type tightening, error boundaries.
4. Wire onboarding wizards to real imports.
5. Wire billing (Stripe) + usage meters end-to-end.
6. First pilot launch: 1 design partner, hands-on success.
7. Define event taxonomy and ship product analytics.
8. Lock SLA + support rotation.
9. Run launch readiness review.
10. GA gate.
