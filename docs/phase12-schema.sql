-- Phase 12 — MVP schema (reference DDL).
-- Apply via a single migration in Supabase. Every tenant table is keyed on
-- company_id and indexed on it. Status columns are TEXT to keep the shared
-- TypeScript enums authoritative; mirror them with CHECK constraints once
-- the enum names freeze post-pilot.

-- ===== tenant + identity =====
create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  company_id uuid references public.companies(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.company_users (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null,           -- platform_owner | company_admin | dispatcher | driver | customer_user
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, user_id, role)
);

-- ===== fleet =====
create table if not exists public.drivers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  driver_number text,
  full_name text not null,
  phone text,
  email text,
  license_type text,           -- cdl_a | cdl_b | non_cdl
  cdl_status text,             -- active | expired | none
  status text not null default 'available',
  current_vehicle_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  unit_number text not null,
  vehicle_type text not null,  -- freight_truck | cargo_van | box_truck | hotshot
  make text, model text, year int,
  plate_number text, vin text,
  status text not null default 'in_service',
  average_mpg numeric,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.drivers
  add constraint drivers_current_vehicle_fk
  foreign key (current_vehicle_id) references public.vehicles(id) on delete set null;

-- ===== customers =====
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null,
  contact_name text, email text, phone text, billing_address text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.customer_users (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  customer_id uuid not null references public.customers(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'viewer',
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (customer_id, user_id)
);

-- ===== loads & shipments =====
create table if not exists public.loads (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  load_number text not null,
  customer_id uuid references public.customers(id) on delete set null,
  pickup_address text, pickup_latitude numeric, pickup_longitude numeric,
  dropoff_address text, dropoff_latitude numeric, dropoff_longitude numeric,
  commodity text, package_type text,
  weight_lbs numeric, quantity int,
  required_vehicle_type text,
  requires_cdl boolean default false,
  requires_hazmat boolean default false,
  pickup_window_start timestamptz, pickup_window_end timestamptz,
  delivery_window_start timestamptz, delivery_window_end timestamptz,
  status text not null default 'draft',
  assigned_driver_id uuid references public.drivers(id) on delete set null,
  assigned_vehicle_id uuid references public.vehicles(id) on delete set null,
  estimated_miles numeric, estimated_duration_minutes int,
  dispatcher_note text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, load_number)
);

create table if not exists public.shipments (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  shipment_number text not null,
  load_id uuid not null references public.loads(id) on delete cascade,
  customer_id uuid references public.customers(id) on delete set null,
  status text not null default 'pending',
  eta_at timestamptz, delivered_at timestamptz,
  current_location_text text,
  proof_of_delivery_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, shipment_number)
);

create table if not exists public.load_offers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  load_id uuid not null references public.loads(id) on delete cascade,
  driver_id uuid not null references public.drivers(id) on delete cascade,
  offered_by uuid references auth.users(id) on delete set null,
  status text not null default 'pending',  -- pending | accepted | denied | expired | cancelled
  denial_reason text,
  expires_at timestamptz,
  responded_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.dispatch_assignments (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  load_id uuid not null references public.loads(id) on delete cascade,
  driver_id uuid not null references public.drivers(id) on delete cascade,
  vehicle_id uuid references public.vehicles(id) on delete set null,
  assigned_by uuid references auth.users(id) on delete set null,
  status text not null default 'active',
  assigned_at timestamptz not null default now(),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ===== gps =====
create table if not exists public.driver_live_state (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  driver_id uuid not null unique references public.drivers(id) on delete cascade,
  vehicle_id uuid references public.vehicles(id) on delete set null,
  active_load_id uuid references public.loads(id) on delete set null,
  active_shipment_id uuid references public.shipments(id) on delete set null,
  current_latitude numeric, current_longitude numeric,
  heading numeric, speed_mph numeric,
  driver_status text, load_status text,
  eta_minutes int, remaining_miles numeric,
  tracking_mode text not null default 'off',
  location_permission_status text not null default 'unknown',
  battery_level numeric,
  last_location_at timestamptz, last_status_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.driver_location_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  driver_id uuid not null references public.drivers(id) on delete cascade,
  vehicle_id uuid references public.vehicles(id) on delete set null,
  load_id uuid references public.loads(id) on delete set null,
  latitude numeric not null, longitude numeric not null,
  heading numeric, speed_mph numeric, accuracy_meters numeric,
  event_source text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.driver_status_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  driver_id uuid not null references public.drivers(id) on delete cascade,
  load_id uuid references public.loads(id) on delete set null,
  previous_status text, new_status text not null,
  reason text, note text,
  latitude numeric, longitude numeric,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

-- ===== alerts / notifications =====
create table if not exists public.alerts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  driver_id uuid references public.drivers(id) on delete set null,
  load_id uuid references public.loads(id) on delete set null,
  shipment_id uuid references public.shipments(id) on delete set null,
  severity text not null,
  alert_type text not null,
  title text,
  message text not null,
  status text not null default 'open',
  created_at timestamptz not null default now(),
  resolved_at timestamptz,
  resolved_by uuid references auth.users(id) on delete set null
);

create table if not exists public.notification_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  recipient_user_id uuid references auth.users(id) on delete cascade,
  driver_id uuid references public.drivers(id) on delete set null,
  load_id uuid references public.loads(id) on delete set null,
  notification_type text not null,
  title text not null,
  body text,
  data_json jsonb default '{}'::jsonb,
  status text not null default 'queued',
  created_at timestamptz not null default now(),
  sent_at timestamptz,
  opened_at timestamptz
);

create table if not exists public.push_tokens (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  driver_id uuid references public.drivers(id) on delete set null,
  platform text not null,    -- ios | android | web
  token text not null,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, platform, token)
);

-- ===== POD + audit =====
create table if not exists public.proof_of_delivery (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  load_id uuid not null references public.loads(id) on delete cascade,
  shipment_id uuid references public.shipments(id) on delete set null,
  driver_id uuid references public.drivers(id) on delete set null,
  status text not null default 'pending',
  recipient_name text,
  signature_url text, photo_url text,
  notes text,
  submitted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  actor_user_id uuid references auth.users(id) on delete set null,
  actor_role text,
  event_type text not null,
  entity_type text,
  entity_id uuid,
  summary text,
  metadata_json jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- ===== indexes =====
create index if not exists idx_drivers_company on public.drivers(company_id);
create index if not exists idx_vehicles_company on public.vehicles(company_id);
create index if not exists idx_customers_company on public.customers(company_id);
create index if not exists idx_loads_company_status on public.loads(company_id, status);
create index if not exists idx_shipments_company_status on public.shipments(company_id, status);
create index if not exists idx_load_offers_company_driver_status on public.load_offers(company_id, driver_id, status);
create index if not exists idx_driver_live_state_company_driver on public.driver_live_state(company_id, driver_id);
create index if not exists idx_location_events_company_driver_time on public.driver_location_events(company_id, driver_id, created_at desc);
create index if not exists idx_status_events_company_driver_time on public.driver_status_events(company_id, driver_id, created_at desc);
create index if not exists idx_alerts_company_status on public.alerts(company_id, status);
create index if not exists idx_audit_logs_company_time on public.audit_logs(company_id, created_at desc);
create index if not exists idx_notifications_recipient on public.notification_events(recipient_user_id, created_at desc);
