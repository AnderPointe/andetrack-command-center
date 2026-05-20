# Phase 12 — MVP Build Execution Plan

Phase 12 stops adding features and ships the first working pilot MVP.

## Non-goals (explicitly out)

- EDI, API Marketplace, full billing automation
- Full AI prediction, voice CoPilot
- Android Auto, CarPlay
- SOC 2 automation, white-label custom domains
- Any new enterprise feature

## Goals — the pilot workflow

A pilot company can:

1. Log in (company_admin / dispatcher / driver / customer_user)
2. Create drivers, vehicles, customers
3. Create a load, offer it to a driver
4. Driver accepts or denies; status updates flow
5. Live GPS appears on dispatcher map
6. Customer sees shipment status update
7. POD placeholder submitted; audit logs recorded end-to-end

## Tracks

| # | Track | Key artifact |
|---|-------|--------------|
| 1 | Repo cleanup | `src/features/*` folders, feature flags hide enterprise nav |
| 2 | MVP nav only | Dispatcher / Driver / Customer surfaces |
| 3 | Design system | Teal/orange/charcoal tokens + shared primitives |
| 4 | Type system | Single source of truth in `src/types` |
| 5 | Supabase migration | `docs/phase12-schema.sql` |
| 6 | RLS policies | `docs/phase12-rls.sql` |
| 7 | Seed data | `docs/phase12-seed.sql` |
| 8 | Services | `src/services/*` typed + audit-aware |
| 9 | Query hooks | Reads / mutations / realtime |
| 10 | Auth & role gate | `_authenticated` + PermissionGate |
| 11 | Dispatcher MVP | Dashboard, dispatch, loads, alerts, audit |
| 12 | Driver MVP | Offer → active → status → POD |
| 13 | Customer portal MVP | List → detail → tracking → POD |
| 14 | Load lifecycle | Draft → Available → … → Delivered → Completed |
| 15 | GPS MVP | Mock stream now; Expo Location hook stub |
| 16 | Notifications | `notification_events` + in-app + push placeholder |
| 17 | Audit logs | Coverage on every workflow transition |
| 18 | Alerts | GPS stale, delayed, denied, POD missing |
| 19 | CoPilot mock | Rules-based suggested commands only |
| 20 | Demo mode | Banner, reset, scenario runner |
| 21 | States | Loading / empty / error on every screen |
| 22 | QA | See `docs/qa/*.md` |
| 23 | Deployment | See `docs/mvp/*.md` |
| 24 | Acceptance | See `docs/phase12-acceptance.md` |

## Live tracker

The implementation status of every track is rendered at
[`/build/phase12-overview`](/build/phase12-overview) and sourced from
`src/build/data/mockPhase12.ts`. Update statuses there as work lands so the
overview always reflects reality.

## Definition of done

Phase 12 is complete when every item in `docs/phase12-acceptance.md` is checked
and the pilot smoke test in `docs/qa/pilot-smoke-test.md` passes end-to-end on
seeded data.
