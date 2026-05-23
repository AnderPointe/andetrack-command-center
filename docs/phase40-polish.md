# Phase 40 polish — V13.5 enterprise value creation maturity

Additive polish on top of the Phase 40 scaffold. Mock-only. No autonomous
dispatch. No final IPO / acquisition / audit / SOC 2 / ISO certification claims.

## New mock datasets (src/v135/data/mockPhase40Polish.ts)

- `V135_VALUE_MATURITY` — enterprise value maturity score + 10 pillars (capital
  strategy, durability, MP economics, board OS, value-driver management,
  concentration reduction, partner value, product-line, commercial diligence,
  capital evidence).
- `V135_VALUE_TRENDS` — 4-quarter maturity / capital / durability / board trend.
- `V135_CAPITAL_STRATEGY` — capital strategy execution score, 6 levers, 3
  milestones with owners + due dates.
- `V135_VALUE_DRIVERS` — 8 weighted enterprise value drivers (ARR growth, NRR,
  GM%, concentration, MP take rate, payback, magic number, Rule of 40).
- `V135_STRATEGIC_INVESTMENTS` — 5 strategic investment governance entries
  (thesis, stage, owner).
- `V135_CONCENTRATION_REDUCTION` — current / target / gap + 3 reduction plays.
- `V135_PRODUCT_LINE_VALUE` — per-line ARR / GM% / durability.
- `V135_MP_UNIT_ECONOMICS` — placeholder marketplace unit economics (lane
  revenue, variable cost, contribution, density, payback).
- `V135_BOARD_DECISIONS` — board strategic decision system entries with
  evidence pointer + status.
- `V135_EXEC_CADENCE` — executive value-creation cadence (weekly / monthly /
  quarterly rituals with output).
- `V135_VALUE_REALIZATION` — realized / in-flight / at-risk % + 5 programs.
- `V135_STRATEGIC_RISK_EXECUTION` — 6 risks with mitigation + status.
- `V135_LONG_TERM_ROADMAP` — 8 enterprise value horizons (H1–H8).
- `V135_CAPITAL_EVIDENCE` — 5 capital evidence packets with freshness (days).
- `V135_RLS_SQL_SNIPPETS_EXT` — RLS SQL for value drivers, strategic
  investments, and value realization (role-scoped + org-scoped).
- `V135_EDGE_VS_SERVERFN_EXT` — extended boundary: 3 internal ServerFns
  (`valueMaturityScorer`, `capitalStrategyReader`, `valueRealizationReader`)
  and 2 external HMAC-signed `/api/public/v135/*` digests (value-creation,
  board-strategic). Inherited Supabase Edge Functions kept only for legacy
  webhooks.

## Routes refreshed

- `/v135/overview` — value-maturity headline, 5-tier ScoreCards, KPI grid,
  2 trend bar charts (maturity, durability vs board), value drivers,
  capital strategy execution, pillar table, extended Edge / ServerFn matrix,
  Phase 41 teaser.
- `/v135/capital-watch` — capital strategy milestones, strategic investment
  governance, diligence continuity, capital evidence freshness, operating
  evidence freshness.
- `/v135/concentration` — 4 scorecards (current top-10/5/1 + target),
  rose-toned reduction trend bars, reduction plays with impact + due dates.
- `/v135/mp-optimization` — optimization signals + placeholder marketplace
  unit economics block.
- `/v135/board-os` — board cadence + executive value-creation cadence +
  board strategic decision system + legacy decisions log.
- `/v135/risk` — strategic risk execution (mitigation + status pills) +
  full register.
- `/v135/roadmap` — 8-horizon enterprise value roadmap + durability roadmap.
- `/v135/reports` — value realization scorecards + program table + report
  cadence.
- `/v135/evidence-vault` — capital evidence + durability evidence side by side.
- `/v135/diligence` — commercial diligence maturity + product-line value
  governance table.
- `/v135/demo` — exec headline includes realized/in-flight/at-risk; combined
  base + extended RLS SQL snippets; extended Edge/ServerFn matrix.

## Boundary stance (unchanged)

- ~24 internal ServerFns for value maturity scoring, capital strategy reads,
  cadence helpers, evidence readers — all `requireSupabaseAuth` + RLS.
- 2 external `/api/public/v135/*` HMAC-signed digest webhooks
  (investor/acquirer + board portal).
- Inherited Supabase Edge Functions retained only for legacy webhooks; new
  V13.5 logic lives in TanStack server functions.

## Deferred (still out of scope)

- Fully autonomous dispatch
- Final IPO / acquisition / audit / SOC 2 / ISO certification claims
- Phase 41 (V14) work
