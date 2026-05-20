# Supabase Setup — Anderoute MVP

Lovable Cloud provisions Supabase automatically. This doc covers the
Phase 12 schema bring-up.

## 1 · Apply schema
Run `docs/phase12-schema.sql` as a migration. It is idempotent
(`create table if not exists`).

## 2 · Apply RLS
Run `docs/phase12-rls.sql`. Verify with the linter (no `rls_disabled`
warnings on tables under `public.`).

## 3 · Seed demo
Run `docs/phase12-seed.sql`. This inserts:
- 1 company: Anderoute Demo Logistics
- 3 drivers (Marcus Hill, Lena Brooks, Anthony Reed)
- 4 vehicles (FT-104, CV-221, BT-310, HS-118)
- 2 customers (Apex Supply Co., Gulfside Distribution)
- 5 loads / 5 shipments / 3 offers / 3 live states / 5 alerts / 10 audit logs

## 4 · Bind first user
On signup, `handle_new_user` creates a profile and
`bootstrap_demo_membership` attaches the user to Anderoute Demo Logistics as
a dispatcher. Promote to `company_admin` manually for the first admin:

```sql
insert into public.company_users (company_id, user_id, role)
values ('00000000-0000-0000-0000-00000000c001', '<auth.users.id>', 'company_admin');
```

## 5 · Storage bucket
The `proof-of-delivery` bucket already exists (private). POD images upload
under `<company_id>/<load_id>/...`.

## 6 · Realtime
Enable realtime on the high-traffic tables:
```sql
alter publication supabase_realtime add table public.driver_live_state;
alter publication supabase_realtime add table public.loads;
alter publication supabase_realtime add table public.shipments;
alter publication supabase_realtime add table public.load_offers;
alter publication supabase_realtime add table public.alerts;
```
