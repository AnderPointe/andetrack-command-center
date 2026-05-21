# Phase 19 — Edge Function / Server Function plan

On this stack, app-internal logic ships as TanStack `createServerFn`.
Use Supabase Edge Functions ONLY for external webhooks (telematics callbacks,
carrier marketplace partner posts, certification evidence ingest from third
parties) and scheduled / cron tasks.

## TanStack server functions (preferred)

### Mobile
- `record-driver-app-health` — driver app heartbeat
- `sync-offline-action-queue` — bulk drain driver queue
- `resolve-offline-conflict` — admin / support resolution
- `enforce-mobile-version` — return enforce/upgrade verdict for current build
- `record-mobile-permission-event` — store permission grant / revoke

### Voice
- `process-voice-command` — local-parser → fallback AI
- `queue-offline-voice-command` — defer when offline
- `create-voice-transcript-event` — audit trail (consent-gated)
- `generate-driver-safe-response` — apply VOICE_SAFETY_POLICY (driving / parked)

### Telematics
- `sync-telematics-provider` — pull batch from provider
- `map-telematics-vehicle` — admin mapping
- `process-telematics-location-event`
- `process-telematics-diagnostic-event`
- `calculate-telematics-health` — rollup metrics

### Carrier marketplace
- `create-carrier-profile`
- `post-marketplace-load`
- `submit-carrier-bid`
- `award-carrier-load`
- `calculate-carrier-performance`

### Certification
- `generate-security-questionnaire` — return categorized template
- `build-vendor-review-packet` — bundle answers + evidence links
- `calculate-certification-readiness-score`

## Supabase Edge Functions (only when external)

- `telematics-webhook` — Samsara / Motive / Geotab outbound webhooks
- `marketplace-partner-post` — third-party load source ingest
- `app-store-build-webhook` — TestFlight / Play Console build events
- Cron: `daily-mobile-health-rollup`, `weekly-carrier-performance-recalc`

All external endpoints live under `src/routes/api/public/*` with HMAC
signature verification before any write.
