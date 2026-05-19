
-- Phase 3 navigation schema
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

create table if not exists public.truck_route_restrictions (
  id uuid primary key default gen_random_uuid(),
  validation_id uuid not null,
  company_id uuid not null,
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
  created_at timestamptz not null default now(),
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
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.voice_instruction_events (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null,
  company_id uuid not null,
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

-- Indexes
create index if not exists idx_nav_sessions_company on public.navigation_sessions(company_id, updated_at desc);
create index if not exists idx_nav_sessions_driver on public.navigation_sessions(driver_id, is_navigation_active);
create index if not exists idx_nav_events_session on public.navigation_events(session_id, created_at desc);
create index if not exists idx_nav_events_company on public.navigation_events(company_id, created_at desc);
create index if not exists idx_trv_company on public.truck_route_validations(company_id, validated_at desc);
create index if not exists idx_trr_validation on public.truck_route_restrictions(validation_id);
create index if not exists idx_voice_session on public.voice_instruction_events(session_id, spoken_at desc);
create index if not exists idx_recalc_session on public.route_recalculation_events(session_id, created_at desc);

-- Updated_at triggers
create trigger trg_nav_sessions_updated before update on public.navigation_sessions
  for each row execute function public.touch_updated_at();
create trigger trg_nav_provider_settings_updated before update on public.navigation_provider_settings
  for each row execute function public.touch_updated_at();
create trigger trg_driver_nav_prefs_updated before update on public.driver_navigation_preferences
  for each row execute function public.touch_updated_at();

-- Enable RLS
alter table public.navigation_sessions           enable row level security;
alter table public.navigation_events             enable row level security;
alter table public.truck_route_validations       enable row level security;
alter table public.truck_route_restrictions      enable row level security;
alter table public.route_requests                enable row level security;
alter table public.route_provider_logs           enable row level security;
alter table public.navigation_provider_settings  enable row level security;
alter table public.driver_navigation_preferences enable row level security;
alter table public.voice_instruction_events      enable row level security;
alter table public.route_recalculation_events    enable row level security;

-- Helper: driver_id belongs to current auth user
-- (uses existing drivers table; mirrors Phase 2 pattern)

-- navigation_sessions
create policy "company read nav sessions" on public.navigation_sessions
  for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "driver or manager insert nav sessions" on public.navigation_sessions
  for insert to authenticated
  with check ((driver_id in (select id from public.drivers where user_id = auth.uid())) or can_manage_company(auth.uid(), company_id));
create policy "driver or manager update nav sessions" on public.navigation_sessions
  for update to authenticated
  using ((driver_id in (select id from public.drivers where user_id = auth.uid())) or can_manage_company(auth.uid(), company_id))
  with check ((driver_id in (select id from public.drivers where user_id = auth.uid())) or can_manage_company(auth.uid(), company_id));

-- navigation_events
create policy "company read nav events" on public.navigation_events
  for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "driver or manager insert nav events" on public.navigation_events
  for insert to authenticated
  with check ((driver_id in (select id from public.drivers where user_id = auth.uid())) or can_manage_company(auth.uid(), company_id));

-- truck_route_validations
create policy "company read truck validations" on public.truck_route_validations
  for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "driver or manager insert truck validations" on public.truck_route_validations
  for insert to authenticated
  with check ((driver_id in (select id from public.drivers where user_id = auth.uid())) or can_manage_company(auth.uid(), company_id));

-- truck_route_restrictions
create policy "company read truck restrictions" on public.truck_route_restrictions
  for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "managers write truck restrictions" on public.truck_route_restrictions
  for all to authenticated
  using (can_manage_company(auth.uid(), company_id))
  with check (can_manage_company(auth.uid(), company_id));

-- route_requests
create policy "company read route requests" on public.route_requests
  for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "driver or manager insert route requests" on public.route_requests
  for insert to authenticated
  with check ((driver_id in (select id from public.drivers where user_id = auth.uid())) or can_manage_company(auth.uid(), company_id));

-- route_provider_logs
create policy "company read provider logs" on public.route_provider_logs
  for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "managers write provider logs" on public.route_provider_logs
  for all to authenticated
  using (can_manage_company(auth.uid(), company_id))
  with check (can_manage_company(auth.uid(), company_id));

-- navigation_provider_settings
create policy "company read nav settings" on public.navigation_provider_settings
  for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "managers write nav settings" on public.navigation_provider_settings
  for all to authenticated
  using (can_manage_company(auth.uid(), company_id))
  with check (can_manage_company(auth.uid(), company_id));

-- driver_navigation_preferences
create policy "company read driver nav prefs" on public.driver_navigation_preferences
  for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "driver or manager write driver nav prefs" on public.driver_navigation_preferences
  for all to authenticated
  using ((driver_id in (select id from public.drivers where user_id = auth.uid())) or can_manage_company(auth.uid(), company_id))
  with check ((driver_id in (select id from public.drivers where user_id = auth.uid())) or can_manage_company(auth.uid(), company_id));

-- voice_instruction_events
create policy "company read voice events" on public.voice_instruction_events
  for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "driver or manager insert voice events" on public.voice_instruction_events
  for insert to authenticated
  with check ((driver_id in (select id from public.drivers where user_id = auth.uid())) or can_manage_company(auth.uid(), company_id));

-- route_recalculation_events
create policy "company read recalc events" on public.route_recalculation_events
  for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "driver or manager insert recalc events" on public.route_recalculation_events
  for insert to authenticated
  with check ((driver_id in (select id from public.drivers where user_id = auth.uid())) or can_manage_company(auth.uid(), company_id));

-- Realtime
alter publication supabase_realtime add table public.navigation_sessions;
alter publication supabase_realtime add table public.navigation_events;
alter publication supabase_realtime add table public.truck_route_validations;
alter publication supabase_realtime add table public.voice_instruction_events;
alter publication supabase_realtime add table public.route_recalculation_events;
