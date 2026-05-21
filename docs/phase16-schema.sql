-- Phase 16 — V1.5 schema additions (planning reference, not executed).
-- All tenant-owned tables include company_id.

create table if not exists navigation_sessions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  driver_id uuid,
  vehicle_id uuid,
  load_id uuid,
  shipment_id uuid,
  provider text not null,
  status text not null,
  origin_latitude double precision,
  origin_longitude double precision,
  destination_latitude double precision,
  destination_longitude double precision,
  route_geometry_json jsonb,
  encoded_polyline text,
  distance_miles numeric,
  duration_minutes integer,
  eta_at timestamptz,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists navigation_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  navigation_session_id uuid not null references navigation_sessions(id) on delete cascade,
  driver_id uuid,
  load_id uuid,
  shipment_id uuid,
  event_type text not null,
  latitude double precision,
  longitude double precision,
  heading double precision,
  speed_mph numeric,
  eta_at timestamptz,
  remaining_miles numeric,
  current_instruction text,
  provider text,
  metadata_json jsonb,
  created_at timestamptz not null default now()
);

create table if not exists route_steps (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  navigation_session_id uuid not null references navigation_sessions(id) on delete cascade,
  step_index integer not null,
  instruction text,
  road_name text,
  distance_miles numeric,
  duration_minutes integer,
  maneuver_type text,
  latitude double precision,
  longitude double precision,
  created_at timestamptz not null default now()
);

create table if not exists route_provider_test_runs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  provider text not null,
  ok boolean not null,
  response_ms integer,
  error_message text,
  created_at timestamptz not null default now()
);

create table if not exists route_request_logs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  provider text not null,
  load_id uuid,
  status text not null,
  response_ms integer,
  error_message text,
  created_at timestamptz not null default now()
);

create table if not exists provider_error_logs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  provider text not null,
  error_code text,
  error_message text,
  created_at timestamptz not null default now()
);

create table if not exists eta_update_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  shipment_id uuid,
  load_id uuid,
  previous_eta timestamptz,
  new_eta timestamptz,
  drift_minutes integer,
  threshold_minutes integer,
  reason text,
  created_at timestamptz not null default now()
);

create table if not exists subscription_plans (
  id text primary key,
  name text not null,
  price_monthly numeric not null,
  drivers_limit integer,
  vehicles_limit integer,
  loads_per_month integer,
  copilot_usage integer,
  nav_sessions integer,
  portal_users integer,
  features jsonb,
  created_at timestamptz not null default now()
);

create table if not exists company_subscriptions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null unique,
  plan_id text not null references subscription_plans(id),
  status text not null,
  stripe_customer_id text,
  stripe_subscription_id text,
  trial_ends_at timestamptz,
  current_period_end timestamptz,
  cancelled_at timestamptz,
  past_due_since timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists billing_customers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null unique,
  stripe_customer_id text unique,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists billing_invoices (
  id text primary key,
  company_id uuid not null,
  amount numeric not null,
  status text not null,
  hosted_invoice_url text,
  issued_at timestamptz,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists billing_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  stripe_event_id text unique,
  event_type text not null,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists billing_usage_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  meter text not null,
  quantity integer not null default 1,
  occurred_at timestamptz not null default now()
);

create table if not exists billing_portal_sessions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  stripe_session_id text,
  url text,
  created_at timestamptz not null default now()
);

create table if not exists checkout_sessions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  plan_id text not null,
  stripe_session_id text,
  status text not null,
  created_at timestamptz not null default now()
);

create table if not exists company_integrations (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  integration_type text not null,
  provider text not null,
  status text not null,
  config_json jsonb,
  last_sync_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists webhook_endpoints (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  name text not null,
  url text not null,
  secret_hash text not null,
  event_types text[] not null,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists webhook_deliveries (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  endpoint_id uuid not null references webhook_endpoints(id) on delete cascade,
  event_type text not null,
  payload_json jsonb not null,
  status text not null,
  response_code integer,
  attempt_count integer not null default 0,
  created_at timestamptz not null default now(),
  delivered_at timestamptz,
  failed_at timestamptz
);

create table if not exists copilot_insights (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  category text not null,
  question text not null,
  answer text not null,
  tone text not null,
  created_at timestamptz not null default now()
);

create table if not exists copilot_action_queue (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  label text not null,
  why text,
  severity text not null,
  done boolean not null default false,
  created_at timestamptz not null default now(),
  done_at timestamptz
);

create table if not exists paid_customer_accounts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null unique,
  plan_id text not null,
  status text not null,
  drivers_active integer,
  loads_month integer,
  health integer,
  onboarding_pct integer,
  renewal_at timestamptz,
  expansion_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists trial_conversion_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  from_plan text,
  to_plan text,
  converted_at timestamptz not null default now()
);

create table if not exists plan_limit_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  meter text not null,
  used integer not null,
  limit_value integer not null,
  created_at timestamptz not null default now()
);

create table if not exists feature_gate_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  feature text not null,
  granted boolean not null,
  reason text,
  created_at timestamptz not null default now()
);

create table if not exists v15_reports (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  report_type text not null,
  generated_at timestamptz not null default now(),
  payload jsonb
);

create table if not exists v15_security_reviews (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  area text not null,
  label text not null,
  ok boolean not null,
  note text,
  reviewed_at timestamptz not null default now()
);
