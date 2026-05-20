# RLS Test Cases

Goal: prove that no user can read or mutate another company's data, and that
each role can only do what it's supposed to do.

Setup: two seeded companies — `Company A` (`00000000-...-c001`) and a second
test company `Company B`. Three users in A: admin, dispatcher, driver
(linked to Marcus Hill), customer (linked to Apex Supply Co.). One
dispatcher user in B.

## Cross-tenant isolation
| Case | Actor | Action | Expected |
|------|-------|--------|----------|
| T1 | Company B dispatcher | `select * from loads` | Returns 0 rows from Company A |
| T2 | Company B dispatcher | `update loads set status='cancelled' where company_id=A` | Blocked by RLS |
| T3 | Company A driver | `select * from drivers where company_id=B` | 0 rows |
| T4 | Company A customer | `select * from shipments where company_id=B` | 0 rows |

## Role boundaries within a tenant
| Case | Actor | Action | Expected |
|------|-------|--------|----------|
| R1 | Company A driver | `select * from loads` | Only loads where `assigned_driver_id = self` |
| R2 | Company A driver | `insert into loads` | Blocked |
| R3 | Company A driver | `insert into driver_location_events` with own `driver_id` | Allowed |
| R4 | Company A driver | `insert into driver_location_events` with another driver | Blocked |
| R5 | Company A customer | `select * from shipments` | Only shipments where `customer_id = self.customer_id` |
| R6 | Company A customer | `update shipments set status='delivered'` | Blocked |
| R7 | Company A dispatcher | `insert into load_offers` | Allowed |
| R8 | Company A driver | `update load_offers set status='accepted' where driver_id=self` | Allowed |
| R9 | Company A driver | `update load_offers` for another driver | Blocked |
| R10 | Company A dispatcher | `select * from audit_logs where company_id=A` | Allowed |
| R11 | Company A driver | `select * from audit_logs` | Blocked |

## How to run
1. Authenticate as each user via Supabase JS client (publishable key + bearer token)
2. Execute each query using `supabase.from(...)` — RLS applies
3. Record actual row counts / error codes
4. File any deviation as a P0 ticket

A deviation on T1–T4 blocks the pilot launch immediately.
