# Phase 12 — Polish Notes

This pass tightens the MVP build plan without expanding scope or unhiding
deferred enterprise features. It is purely a quality / clarity pass on the
Phase 12 surface introduced in the previous turn.

## What changed

### Build tracker (`src/build/data/mockPhase12.ts`)
- Added `priority` (`P0` / `P1` / `P2`), `owner`, `acceptance[]`, and
  `depends[]` to `BuildItem`.
- Rewrote groups around the polish focus areas: dispatcher load workflow,
  driver accept/deny, driver status updates, GPS mock stream, dispatcher map
  state, customer portal tracking, POD placeholder, audit logging, alert
  generation, demo reset, loading/empty/error states, QA, deployment.
- Marked acceptance criteria for every P0 item so "done" is unambiguous.
- Added `PHASE12_PRIORITY_TONE` for consistent badge tone.

### Build overview route (`src/routes/build.phase12-overview.tsx`)
- Pilot-readiness meter (P0 built / P0 total).
- Status and priority filter chips (toggle to focus on what's left).
- Per-item acceptance checklist rendered inline.
- Owner + priority badges next to each item.

### Why this is a polish, not new scope
- No new routes.
- No new entities or Supabase tables.
- No new features behind any flag — only existing planned work is sharpened
  with acceptance criteria and ownership.
- Deferred items (CoPilot voice, EDI/SOC2/marketplace) remain explicitly
  `deferred` and out of MVP nav.

## Focus-area checklists

Each item below maps 1:1 to the polish request. The tracker IDs in parens
point to the canonical entry in `mockPhase12.ts`.

1. **Repository structure** (C-1 … C-5) — feature-folder migration plan,
   single types source, enterprise routes behind `VITE_ENTERPRISE_PREVIEW`,
   dead-code sweep, mock data isolation.
2. **MVP navigation** (N-1 … N-4) — exact dispatcher/driver/customer route
   lists; everything else flagged off in pilot build.
3. **Shared types** (T-1, T-2) — entity + enum source of truth aligned to
   Supabase generated types and CHECK constraints.
4. **Supabase migration quality** (S-1 … S-4) — idempotent DDL, indexes on
   `company_id` + status hot paths, `touch_updated_at` everywhere, private
   POD bucket with signed-URL access.
5. **RLS policy clarity** (R-1 … R-3) — `SECURITY DEFINER` helpers, per-role
   SELECT/INSERT/UPDATE policies, no DELETE for drivers/customers.
6. **Seed data** (Z-1, Z-2) — re-runnable demo seed covering every load
   lifecycle state + `rpc.reset_demo_company()` for demo dispatcher.
7. **Service layer consistency** (SV-1 … SV-3) — typed entities, audit on
   every mutation, common `ServiceError` shape.
8. **TanStack Query hooks** (H-1 … H-3) — `[entity, companyId, filters]`
   query keys, optimistic updates on status mutations, realtime hooks that
   coalesce + unsubscribe.
9. **Auth and role gating** (A-1 … A-4) — email+password auth, permission
   gates, role-scoped layouts, session hydrated in `beforeLoad` before
   protected serverFn calls.
10. **Dispatcher load workflow** (DW-1 … DW-5) — create → offer/assign →
    track → close, with audit rows per transition.
11. **Driver accept/deny workflow** (DA-1 … DA-3) — offer card with TTL,
    required deny reason, atomic conflict handling for races.
12. **Driver status updates** (DS-1 … DS-3) — guarded next-state buttons,
    on/off-duty toggle, issue reporting raises alerts.
13. **GPS mock stream** (G-1 … G-3) — interpolated movement, pauses
    off-duty, snap-on-arrival; mobile + mock hooks share interface.
14. **Dispatcher map state** (M-1 … M-3) — markers colored by status,
    selection synced to URL search params, stale + offline visual states.
15. **Customer portal tracking** (CP-1 … CP-4) — list + tracking + POD +
    optional signed shareable token link.
16. **POD placeholder** (PD-1 … PD-3) — recipient + notes + signature +
    photos uploaded to `{company_id}/{load_id}/…`, signed-URL reads.
17. **Audit logging** (AU-1 … AU-3) — typed `writeAudit`, 12-event coverage,
    `/audit` viewer with filters.
18. **Alert generation** (AL-1 … AL-3) — idempotent server-side rules for
    `gps_stale`, `driver_delayed`, `load_offer_denied`, `pod_missing`,
    `issue_reported`; consistent severity tone.
19. **Demo mode reset** (DM-1 … DM-3) — sticky banner, one-click reset RPC,
    scenario runner stepper.
20. **Loading / empty / error states** (ST-1 … ST-3) — shared components,
    per-screen audit checklist, Retry on ErrorState.
21. **QA documentation** (Q-1 … Q-4) — test plan, RLS cases, smoke test,
    new regression checklist (P1).
22. **Deployment documentation** (DP-1 … DP-6) — local, Supabase, env vars,
    demo mode, pilot deploy, and this polish notes file.

## What this polish explicitly does NOT do

- Does not add Phase 13 work (real mobile capture, push notifications,
  CoPilot AI, marketplace, EDI, SOC2, white-label).
- Does not unhide enterprise surfaces in MVP nav.
- Does not introduce new Supabase tables or migrations.
- Does not change the existing pilot cutline — only adds acceptance
  criteria so the cut is verifiable.
