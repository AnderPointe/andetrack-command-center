# Phase 14 — Server function plan

> On this stack server-side logic lives in TanStack `createServerFn`, not in
> Supabase Edge Functions. These are the V1 server functions we expect to
> wire when Phase 14 graduates from mocks to real data.

## Naming convention

`src/lib/<area>.functions.ts` — one file per surface, each exporting one
or more `createServerFn` handlers. Auth-protected ones use
`requireSupabaseAuth`; cross-company analytics use `supabaseAdmin` only
after verifying the caller is a platform owner.

## Planned functions

| Function | Purpose | Auth |
| --- | --- | --- |
| `calculatePilotSuccessScore` | Aggregates metrics + bugs + feedback into a 0–100 score per company. | requireSupabaseAuth |
| `summarizePilotFeedback` | Groups feedback by category + severity; calls Lovable AI for a short executive summary. | requireSupabaseAuth |
| `createBugFromFeedback` | Promotes a feedback item to `bug_reports` and links both rows. | requireSupabaseAuth |
| `calculateCustomerHealthScore` | Recomputes account health from adoption + tickets + training. Writes to `customer_health_scores`. | requireSupabaseAuth |
| `generateV1ReadinessScore` | Mirrors `v1ReadinessScore()` from the mock data over real tables. | requireSupabaseAuth |
| `generateReleaseNotes` | Builds a markdown release note from fixed bugs + shipped features. | requireSupabaseAuth |
| `runV1RegressionCheck` | Inserts a regression run, records pass/fail per workflow. | requireSupabaseAuth |
| `calculateGpsReliabilityScore` | Daily rollup from `driver_locations` + `driver_live_state`. | requireSupabaseAuth |
| `calculateNotificationReliabilityScore` | Rollup from notification events; tracks delivery + response latency. | requireSupabaseAuth |
| `generatePilotToPaidSummary` | Combines pilot review + commercial checklist + conversion steps. | requireSupabaseAuth |
| `createRoadmapItemsFromFeedback` | Promotes accepted feedback into `roadmap_items` with release tag. | requireSupabaseAuth |
| `detectDataQualityIssues` | Runs the data-quality probes and upserts `data_quality_issues`. | requireSupabaseAuth (admin) |
| `generateSupportSummary` | SLA + queue depth + categories rollup. | requireSupabaseAuth |
| `calculateScalingReadinessScore` | Pulls perf metrics, scores against budgets. | requireSupabaseAuth |

## Notes

- All write functions emit an `audit_log` event (reuses existing audit table).
- Long-running analytics (e.g. `detectDataQualityIssues`) should be triggered
  on demand from the V1 dashboards rather than on every page load.
- AI-assisted handlers (`summarizePilotFeedback`, `generateReleaseNotes`)
  use Lovable AI Gateway (`google/gemini-2.5-flash`) — no API key needed.
