# Pilot Deployment — Anderoute MVP

Operational runbook for taking the MVP from preview to a live pilot company.

## 1 · Provision
- New Supabase environment (or new schema within the same project)
- Apply `docs/phase12-schema.sql` + `docs/phase12-rls.sql`
- Do **not** apply `docs/phase12-seed.sql` to the pilot environment

## 2 · Tenant bring-up
```sql
insert into public.companies (id, name, slug) values
  (gen_random_uuid(), '<Pilot Company Name>', '<pilot-slug>');
```
Capture the new `company_id`. Use it for all subsequent inserts.

## 3 · Users
1. Pilot admin signs up at `/signup`
2. Promote them:
   ```sql
   insert into public.company_users (company_id, user_id, role)
   values ('<pilot company id>', '<admin auth.users.id>', 'company_admin');
   ```
3. Admin invites dispatchers, drivers, and customer users from `/settings`

## 4 · Fleet import
- Drivers, vehicles, customers via CSV upload (one-off script for pilot;
  in-product import lands post-pilot)
- Validate against the schema constraints before insert
- Set `current_vehicle_id` on each driver

## 5 · Configuration
- `VITE_APP_ENV=pilot`
- `VITE_DEMO_MODE` unset
- `VITE_MAP_PROVIDER=mapbox` + real `VITE_MAPBOX_PUBLIC_TOKEN`
- Driver app uses real Expo Location (mock stream disabled)

## 6 · Training (per Phase 11 plan)
- Admin training: 60 min
- Dispatcher training: 90 min, includes load creation + offer flow
- Driver training: 30 min in-vehicle walkthrough
- Customer training: 15 min portal tour

## 7 · Go-live checklist
- [ ] All acceptance items in `docs/phase12-acceptance.md` pass against pilot tenant
- [ ] Real GPS verified for at least 2 drivers during a real shift
- [ ] Backup + rollback procedure tested (`docs/rollback-process.md`)
- [ ] On-call rotation defined for first 30 days
- [ ] Daily metrics dashboard shared with pilot admin

## 8 · Incident response
- Severity, paging, and rollback per `docs/rollback-process.md` and
  `docs/release-process.md`
- Every pilot incident gets a written postmortem within 48h
