# Pilot Smoke Test

Run before every pilot deploy. Target time: 15 minutes.

## Pre-conditions
- Pilot Supabase environment with schema + RLS applied
- One company admin, one dispatcher, two drivers, one customer user provisioned
- Two vehicles, one customer with portal access

## Steps

1. **Auth**
   - Sign in as dispatcher → `/dashboard` loads with empty/seeded state
   - Sign in as driver in a second browser → `/driver/load-offer` loads
   - Sign in as customer in a third browser → `/portal/shipments` loads

2. **Create entities (dispatcher)**
   - Create driver, vehicle, customer
   - Verify each list refreshes with the new row

3. **Create + offer load**
   - `/loads/new` → fill required fields → save
   - Open load detail → Offer to driver A
   - Driver A sees offer → accepts
   - Confirm in dispatcher: load status → `accepted`, `dispatch_assignment` exists, shipment created

4. **Status progression (driver)**
   - Advance: en_route_pickup → arrived_pickup → loading → loaded → en_route_dropoff → arrived_dropoff
   - Confirm dispatcher map marker updates per step

5. **GPS**
   - Confirm driver marker moves on `/map` (mock or real stream)
   - Stop driver location for 60s → `gps_stale` alert appears

6. **Customer portal**
   - Customer user opens shipment → status reflects driver progress
   - Tracking page shows current ETA

7. **POD**
   - Driver hits delivered → POD screen opens
   - Submit recipient + notes → shipment marked delivered, POD record created
   - Customer portal POD page shows submitted POD

8. **Audit**
   - Dispatcher opens `/audit` → at least 8 events from this run visible

9. **Resolve alert**
   - Resolve `gps_stale` alert → status updates, dashboard count decrements

## Pass criteria
- All 9 steps complete with no console errors and no failed network requests
- Every list shows loading + filled state correctly (no blank screens)
- No PII for Company B visible at any point
