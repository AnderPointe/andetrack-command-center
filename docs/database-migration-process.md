# Database Migration Process

## Authoring
- Use Lovable migration tool; never `ALTER DATABASE postgres`.
- Tenant-owned tables MUST include `company_id` + RLS.
- Validation: prefer triggers over `CHECK` for time-based rules.

## Review gates
- Schema review (DBA / lead).
- RLS coverage check via `useDatabaseHardening()` snapshot.
- Migration dry-run in CI against a copy-on-write branch.

## Deployment
- Migrations apply before worker bundle swap.
- Reversible migrations preferred; if irreversible, attach `RollbackPlan`.

## Post-deploy
- Index health + slow-query review in `/ops/center` → Observability.
