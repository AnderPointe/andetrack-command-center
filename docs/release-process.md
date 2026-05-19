# Release Process

1. Open change request in `/ops/center` (Change Management).
2. Linked PR triggers CI (typecheck, lint, unit, integration, RLS).
3. Preview deploy auto-creates; QA runs E2E smoke.
4. Reviewer approves → merge to `main`.
5. Staging auto-deploys; on-call runs scripted soak.
6. Production deploy requires explicit manual approval.
7. Post-deploy smoke test (`run-post-deployment-smoke-test`) runs.
8. Verified deploys append a `release_records` row + audit event.
9. Communications via status page if customer-impacting.
