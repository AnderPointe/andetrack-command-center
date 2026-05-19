-- Phase 3 — Navigation schema (REFERENCE; apply via migration tool).
-- Tables are additive; Phase 1 + Phase 2 tables remain untouched.

create table if not exists public.navigation_sessions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  driver_id uuid not null,
  vehicle_id uuid,
  load_id uuid,
  shipment_id uuid,
  provider text not null,
  mode text not null default 'to_pickup',
  origin_latitude double precision not null,
  origin_longitude double precision not null,
  destination_latitude double precision not null,
  destination_longitude double precision not null,
  route_polyline text,
  route_geometry_json jsonb,
  current_step_index integer not null default 0,
  current_instruction text,
  eta_minutes integer,
  remaining_miles numeric,
  route_progress_percentage numeric default 0,
  is_navigation_active boolean not null default false,
  is_off_route boolean not null default false,
  is_rerouting boolean not null default false,
  truck_route_validated boolean not null default false,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.navigation_events (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null,
  company_id uuid not null,
  driver_id uuid not null,
  load_id uuid,
  event_type text not null,
  provider text not null,
  latitude double precision,
  longitude double precision,
  heading numeric,
  speed_mph numeric,
  eta_minutes integer,
  remaining_miles numeric,
  instruction text,
  road_name text,
  event_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.truck_route_validations (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  driver_id uuid not null,
  vehicle_id uuid,
  load_id uuid,
  provider text not null,
  is_valid boolean not null,
  route_safety_score numeric,
  low_clearance_detected boolean not null default false,
  weight_restriction_detected boolean not null default false,
  hazmat_restriction_detected boolean not null default false,
  restricted_road_detected boolean not null default false,
  warnings_json jsonb not null default '[]'::jsonb,
  restrictions_json jsonb not null default '[]'::jsonb,
  validated_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists public.route_requests (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  driver_id uuid not null,
  vehicle_id uuid,
  load_id uuid,
  shipment_id uuid,
  route_profile text not null,
  origin_latitude double precision not null,
  origin_longitude double precision not null,
  destination_latitude double precision not null,
  destination_longitude double precision not null,
  vehicle_profile_json jsonb,
  requested_provider text,
  created_at timestamptz not null default now()
);

create table if not exists public.route_provider_logs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  provider text not null,
  operation text not null,
  http_status integer,
  latency_ms integer,
  cost_units numeric,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.truck_route_restrictions (
  id uuid primary key default gen_random_uuid(),
  validation_id uuid not null,
  type text not null,
  severity text not null,
  message text not null,
  road_name text,
  latitude double precision,
  longitude double precision,
  distance_from_origin_m numeric,
  recommended_action text,
  created_at timestamptz not null default now()
);

create table if not exists public.navigation_provider_settings (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null unique,
  navigation_provider text not null default 'mock',
  truck_validator text not null default 'mock',
  mock_mode boolean not null default true,
  cdl_validation_required boolean not null default true,
  enable_voice_instructions boolean not null default true,
  enable_alternatives boolean not null default true,
  enable_traffic boolean not null default true,
  enable_copilot boolean not null default true,
  enable_off_route_alerts boolean not null default true,
  enable_dispatch_monitoring boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.driver_navigation_preferences (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  driver_id uuid not null unique,
  preferred_provider text,
  voice_enabled boolean not null default true,
  avoid_tolls boolean not null default false,
  avoid_highways boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists public.voice_instruction_events (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null,
  driver_id uuid not null,
  load_id uuid,
  instruction_text text not null,
  maneuver_type text not null,
  distance_to_maneuver_m numeric,
  road_name text,
  provider text not null,
  spoken_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists public.route_recalculation_events (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null,
  company_id uuid not null,
  driver_id uuid not null,
  reason text,
  delta_eta_minutes integer,
  succeeded boolean not null default true,
  created_at timestamptz not null default now()
);

-- ============================================================
-- RLS POLICIES (apply via migration tool with `is_company_member` /
-- `can_manage_company` helpers that already exist in this project).
-- ============================================================
alter table public.navigation_sessions          enable row level security;
alter table public.navigation_events            enable row level security;
alter table public.truck_route_validations      enable row level security;
alter table public.route_requests               enable row level security;
alter table public.route_provider_logs          enable row level security;
alter table public.truck_route_restrictions     enable row level security;
alter table public.navigation_provider_settings enable row level security;
alter table public.driver_navigation_preferences enable row level security;
alter table public.voice_instruction_events     enable row level security;
alter table public.route_recalculation_events   enable row level security;

-- Read: any company member. Insert: the owning driver or a manager.
-- Update on navigation_sessions: the owning driver or a manager.
-- (See phase2 RLS for the exact policy templates — mirror those here.)
