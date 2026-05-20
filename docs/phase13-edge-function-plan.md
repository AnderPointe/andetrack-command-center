# Phase 13 — Edge Function plan (pilot operations)

> On TanStack Start, prefer `createServerFn` over Supabase Edge Functions for
> internal logic. Use Edge Functions only for external webhooks or scheduled
> jobs that must live at a Supabase URL. The functions below are planned as
> *server functions* unless a name explicitly says "webhook".

| Name | Type | Purpose |
|---|---|---|
| `create-pilot-company` | serverFn | Provision pilot company + admin + initial users |
| `seed-pilot-data` | serverFn | Insert pilot drivers, vehicles, customers, sample loads |
| `run-pilot-smoke-test` | serverFn | Execute smoke test list, store result in `pilot_smoke_tests` |
| `run-rls-validation` | serverFn | Execute tenant + role isolation queries with the impersonated client; record pass/fail |
| `calculate-pilot-readiness-score` | serverFn | Compute composite score from `pilot_readiness_checks` |
| `create-bug-from-failed-test` | serverFn | When a `pilot_test_results` row goes `failed`, open a `pilot_bugs` row and link it |
| `submit-pilot-feedback` | serverFn | Validate + insert feedback (role-aware) |
| `summarize-pilot-feedback` | serverFn | Group recent feedback by theme using Lovable AI Gateway |
| `calculate-pilot-metrics` | serverFn | Refresh `pilot_metrics` daily |
| `generate-daily-pilot-review` | serverFn | Aggregate yesterday's loads, bugs, alerts → `pilot_daily_reviews` |
| `generate-weekly-pilot-review` | serverFn | Aggregate week's adoption, GPS, POD, NPS → `pilot_weekly_reviews` |
| `create-pilot-incident` | serverFn | Open `pilot_incidents` + start timeline |
| `approve-pilot-launch` | serverFn | Platform-owner only; flips `pilot_company_setups.status` → `passed` |
| `trigger-rollback-plan` | serverFn | Disables pilot, exports active loads, logs `pilot_rollback_actions` |
| `generate-pilot-final-report` | serverFn | End of pilot summary used to seed Phase 14 backlog |

## Scheduling

- `calculate-pilot-metrics` — daily 02:00 UTC via pg_cron → POST to
  `/api/public/cron/pilot-metrics` (server route wrapping the serverFn,
  signed with `WEBHOOK_SECRET`).
- `generate-daily-pilot-review` — daily 06:00 UTC, same pattern.
- `generate-weekly-pilot-review` — Mondays 06:30 UTC.

## Security

- All server functions use `requireSupabaseAuth` and re-check role inside
  the handler.
- `approve-pilot-launch` and `trigger-rollback-plan` additionally require
  `is_platform_owner(auth.uid())`.
- Webhooks under `/api/public/*` verify HMAC against `WEBHOOK_SECRET`.
