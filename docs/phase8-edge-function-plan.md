# Phase 8 — Server functions & Edge Functions plan

> Default rule: app-internal logic → `createServerFn`. Use Supabase Edge
> Functions only when an external system MUST call a stable Supabase URL
> (verified webhook) or when work has to run inside the Supabase network
> perimeter.

## Server functions (`createServerFn`)
- `record-security-event`        — append to `security_audit_events`
- `create-compliance-evidence`   — uploader, with virus-scan placeholder
- `run-rls-test`                 — executes an RLS test matrix row
- `generate-audit-export`        — streams audit CSV (signed URL)
- `rotate-api-key`               — hash-at-rest rotation + grace window
- `cleanup-expired-gps-events`   — scheduled retention job
- `aggregate-location-history`   — daily roll-up
- `send-incident-alert`          — PagerDuty / email fanout
- `create-incident` / `close-incident`
- `run-backup-check`             — verifies last PITR snapshot
- `record-restore-test`
- `process-vulnerability-scan`   — ingests dep-scan output
- `create-vendor-review`
- `enforce-retention-policy`     — wraps cleanup jobs
- `generate-compliance-report`   — SOC 2 evidence pack
- `run-post-deployment-smoke-test`

## Edge Functions (only when justified)
- `webhook-stripe`     — Stripe billing events
- `webhook-edi-inbound` — EDI partner-initiated 204/214 push
- `cron-retention`     — pg_cron triggered cleanup if DB-adjacency needed

## Security boundary
- Every public route (`/api/public/*`) verifies HMAC + Zod schema before
  any DB write.
- Internal server fns require `requireSupabaseAuth`.
- Admin operations (rotate keys, force retention) check
  `is_platform_owner(auth.uid())`.
