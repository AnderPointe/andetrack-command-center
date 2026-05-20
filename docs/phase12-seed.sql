-- Phase 12 — Demo seed data for "Anderoute Demo Logistics".
-- Run AFTER schema + RLS. Idempotent enough for repeated demo resets.

insert into public.companies (id, name, slug, status)
values ('00000000-0000-0000-0000-00000000c001', 'Anderoute Demo Logistics', 'anderoute-demo', 'active')
on conflict (slug) do nothing;

-- NOTE: drivers below are seeded WITHOUT auth.users to keep this file
-- self-contained. The dispatcher app references them by driver.id. When a
-- real driver app signup completes, set drivers.user_id to the matching
-- auth.users.id.

insert into public.drivers (id, company_id, full_name, driver_number, phone, license_type, cdl_status, status)
values
  ('11111111-0000-0000-0000-000000000001', '00000000-0000-0000-0000-00000000c001', 'Marcus Hill',   'D-1001', '+1-555-0101', 'cdl_a',   'active', 'available'),
  ('11111111-0000-0000-0000-000000000002', '00000000-0000-0000-0000-00000000c001', 'Lena Brooks',   'D-1002', '+1-555-0102', 'non_cdl', 'none',   'available'),
  ('11111111-0000-0000-0000-000000000003', '00000000-0000-0000-0000-00000000c001', 'Anthony Reed',  'D-1003', '+1-555-0103', 'cdl_b',   'active', 'break')
on conflict (id) do nothing;

insert into public.vehicles (id, company_id, unit_number, vehicle_type, make, model, year, status, average_mpg)
values
  ('22222222-0000-0000-0000-000000000001', '00000000-0000-0000-0000-00000000c001', 'FT-104', 'freight_truck', 'Freightliner', 'Cascadia', 2022, 'in_service', 7.1),
  ('22222222-0000-0000-0000-000000000002', '00000000-0000-0000-0000-00000000c001', 'CV-221', 'cargo_van',     'Mercedes',     'Sprinter', 2023, 'in_service', 18.4),
  ('22222222-0000-0000-0000-000000000003', '00000000-0000-0000-0000-00000000c001', 'BT-310', 'box_truck',     'Isuzu',        'NPR-HD',   2021, 'in_service', 12.8),
  ('22222222-0000-0000-0000-000000000004', '00000000-0000-0000-0000-00000000c001', 'HS-118', 'hotshot',       'Ram',          '3500',     2024, 'in_service', 11.2)
on conflict (id) do nothing;

update public.drivers set current_vehicle_id = '22222222-0000-0000-0000-000000000001' where id = '11111111-0000-0000-0000-000000000001';
update public.drivers set current_vehicle_id = '22222222-0000-0000-0000-000000000002' where id = '11111111-0000-0000-0000-000000000002';

insert into public.customers (id, company_id, name, contact_name, email, phone, billing_address, status) values
  ('33333333-0000-0000-0000-000000000001', '00000000-0000-0000-0000-00000000c001', 'Apex Supply Co.',       'Sara Apex',    'ap@apex.example',   '+1-555-0201', '101 Industrial Way, Houston, TX',   'active'),
  ('33333333-0000-0000-0000-000000000002', '00000000-0000-0000-0000-00000000c001', 'Gulfside Distribution', 'Diego Marquez','ops@gulfside.example','+1-555-0202', '4400 Port Rd, New Orleans, LA',     'active')
on conflict (id) do nothing;

insert into public.loads (id, company_id, load_number, customer_id, pickup_address, dropoff_address, commodity, package_type, weight_lbs, quantity, required_vehicle_type, status) values
  ('44444444-0000-0000-0000-000000000001', '00000000-0000-0000-0000-00000000c001', 'L-2001', '33333333-0000-0000-0000-000000000001', '101 Industrial Way, Houston, TX', '900 Market St, Dallas, TX',     'Pallet goods',    'pallet', 12400, 12, 'freight_truck', 'available'),
  ('44444444-0000-0000-0000-000000000002', '00000000-0000-0000-0000-00000000c001', 'L-2002', '33333333-0000-0000-0000-000000000002', '4400 Port Rd, New Orleans, LA',   '88 Beachwood Blvd, Mobile, AL','Refrig parcels',  'box',     820,  6, 'cargo_van',     'offered'),
  ('44444444-0000-0000-0000-000000000003', '00000000-0000-0000-0000-00000000c001', 'L-2003', '33333333-0000-0000-0000-000000000001', '500 Bayou Dr, Houston, TX',       '120 Oak St, Austin, TX',       'Auto parts',      'crate',  4200,  4, 'box_truck',     'en_route_dropoff'),
  ('44444444-0000-0000-0000-000000000004', '00000000-0000-0000-0000-00000000c001', 'L-2004', '33333333-0000-0000-0000-000000000002', '700 Levee Rd, Baton Rouge, LA',  '12 Pine Ln, Lafayette, LA',     'Construction mat','pallet', 6800,  8, 'hotshot',       'delivered'),
  ('44444444-0000-0000-0000-000000000005', '00000000-0000-0000-0000-00000000c001', 'L-2005', '33333333-0000-0000-0000-000000000001', '12 Loop Pkwy, Houston, TX',       '99 Riverside, San Antonio, TX', 'General freight', 'pallet', 9100, 10, 'freight_truck', 'draft')
on conflict (id) do nothing;

insert into public.shipments (id, company_id, shipment_number, load_id, customer_id, status, eta_at) values
  ('55555555-0000-0000-0000-000000000001', '00000000-0000-0000-0000-00000000c001', 'S-3001', '44444444-0000-0000-0000-000000000001', '33333333-0000-0000-0000-000000000001', 'pending',         null),
  ('55555555-0000-0000-0000-000000000002', '00000000-0000-0000-0000-00000000c001', 'S-3002', '44444444-0000-0000-0000-000000000002', '33333333-0000-0000-0000-000000000002', 'pending',         now() + interval '4 hours'),
  ('55555555-0000-0000-0000-000000000003', '00000000-0000-0000-0000-00000000c001', 'S-3003', '44444444-0000-0000-0000-000000000003', '33333333-0000-0000-0000-000000000001', 'in_transit',      now() + interval '2 hours'),
  ('55555555-0000-0000-0000-000000000004', '00000000-0000-0000-0000-00000000c001', 'S-3004', '44444444-0000-0000-0000-000000000004', '33333333-0000-0000-0000-000000000002', 'delivered',       now() - interval '1 hour'),
  ('55555555-0000-0000-0000-000000000005', '00000000-0000-0000-0000-00000000c001', 'S-3005', '44444444-0000-0000-0000-000000000005', '33333333-0000-0000-0000-000000000001', 'pending',         null)
on conflict (id) do nothing;

insert into public.load_offers (company_id, load_id, driver_id, status, expires_at) values
  ('00000000-0000-0000-0000-00000000c001', '44444444-0000-0000-0000-000000000002', '11111111-0000-0000-0000-000000000002', 'pending',  now() + interval '30 minutes'),
  ('00000000-0000-0000-0000-00000000c001', '44444444-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000001', 'accepted', now() + interval '1 hour'),
  ('00000000-0000-0000-0000-00000000c001', '44444444-0000-0000-0000-000000000005', '11111111-0000-0000-0000-000000000003', 'denied',   now() - interval '10 minutes');

insert into public.driver_live_state (company_id, driver_id, vehicle_id, active_load_id, current_latitude, current_longitude, heading, speed_mph, driver_status, eta_minutes, remaining_miles, tracking_mode, location_permission_status, battery_level, last_location_at)
values
  ('00000000-0000-0000-0000-00000000c001', '11111111-0000-0000-0000-000000000001', '22222222-0000-0000-0000-000000000001', '44444444-0000-0000-0000-000000000001', 29.7604, -95.3698,  45, 58, 'en_route_pickup',   72, 48.2, 'active_load',    'granted', 0.78, now()),
  ('00000000-0000-0000-0000-00000000c001', '11111111-0000-0000-0000-000000000002', '22222222-0000-0000-0000-000000000002', null,                                   29.9511, -90.0715, 270, 0,  'available',         null, null, 'foreground',     'granted', 0.62, now()),
  ('00000000-0000-0000-0000-00000000c001', '11111111-0000-0000-0000-000000000003', null,                                   '44444444-0000-0000-0000-000000000003', 30.2672, -97.7431, 180, 62, 'en_route_dropoff', 35, 22.4, 'active_load',    'granted', 0.41, now() - interval '90 seconds')
on conflict (driver_id) do nothing;

insert into public.alerts (company_id, driver_id, load_id, severity, alert_type, title, message, status) values
  ('00000000-0000-0000-0000-00000000c001', '11111111-0000-0000-0000-000000000003', '44444444-0000-0000-0000-000000000003', 'warning',  'gps_stale',            'GPS last seen 90s ago', 'Driver GPS hasn''t reported in 90 seconds.', 'open'),
  ('00000000-0000-0000-0000-00000000c001', null,                                   '44444444-0000-0000-0000-000000000005', 'info',     'load_offer_denied',    'Offer denied',          'Anthony Reed denied L-2005 (vehicle mismatch).', 'open'),
  ('00000000-0000-0000-0000-00000000c001', '11111111-0000-0000-0000-000000000001', '44444444-0000-0000-0000-000000000001', 'info',     'driver_delayed',       'Possible delay',        'Marcus Hill is 12 min behind schedule.', 'open'),
  ('00000000-0000-0000-0000-00000000c001', null,                                   '44444444-0000-0000-0000-000000000004', 'warning',  'pod_missing',          'POD missing',           'Load delivered but POD not yet submitted.', 'open'),
  ('00000000-0000-0000-0000-00000000c001', '11111111-0000-0000-0000-000000000002', null,                                   'info',     'load_offered',         'New offer',             'Lena Brooks offered L-2002.', 'open');

insert into public.audit_logs (company_id, event_type, entity_type, entity_id, summary, metadata_json) values
  ('00000000-0000-0000-0000-00000000c001', 'load_created',          'load',     '44444444-0000-0000-0000-000000000001', 'Dispatcher created L-2001', '{}'),
  ('00000000-0000-0000-0000-00000000c001', 'load_offered',          'load',     '44444444-0000-0000-0000-000000000002', 'Offered L-2002 to D-1002',  '{}'),
  ('00000000-0000-0000-0000-00000000c001', 'load_accepted',         'load',     '44444444-0000-0000-0000-000000000001', 'D-1001 accepted L-2001',    '{}'),
  ('00000000-0000-0000-0000-00000000c001', 'driver_assigned',       'load',     '44444444-0000-0000-0000-000000000001', 'D-1001 assigned + FT-104',  '{}'),
  ('00000000-0000-0000-0000-00000000c001', 'driver_status_changed', 'driver',   '11111111-0000-0000-0000-000000000001', 'available → en_route_pickup','{}'),
  ('00000000-0000-0000-0000-00000000c001', 'driver_location_updated','driver',  '11111111-0000-0000-0000-000000000001', 'GPS ping (mock)',            '{}'),
  ('00000000-0000-0000-0000-00000000c001', 'shipment_status_changed','shipment','55555555-0000-0000-0000-000000000003', 'pending → in_transit',       '{}'),
  ('00000000-0000-0000-0000-00000000c001', 'pod_submitted',         'shipment', '55555555-0000-0000-0000-000000000004', 'POD submitted by driver',    '{}'),
  ('00000000-0000-0000-0000-00000000c001', 'alert_created',         'alert',    null,                                   'gps_stale on D-1003',        '{}'),
  ('00000000-0000-0000-0000-00000000c001', 'load_denied',           'load',     '44444444-0000-0000-0000-000000000005', 'D-1003 denied L-2005',       '{}');
