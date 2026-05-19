# Rollback Process

## Triggers
- Smoke test failure, error-rate spike >2× baseline, severity-1 incident.

## Steps
1. On-call declares rollback in `/ops/center` → Incidents.
2. Re-deploy previous worker bundle (publish "Restore version").
3. If migration involved: run `down` migration only if reversible; otherwise
   apply compensating migration. Never `DROP` user data.
4. Verify with smoke test; close incident or escalate.
5. Postmortem within 5 business days; attach to `postmortems` table.

## Mobile rollback
Force-update gate in `mobile_version_enforcement`. Older app builds
self-disable when minimum supported version is raised.
