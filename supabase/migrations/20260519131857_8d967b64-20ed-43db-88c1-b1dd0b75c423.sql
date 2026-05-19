
-- ============ ENUMS ============
do $$ begin create type public.tracking_mode as enum ('off','foreground','background','active_load','reduced_frequency','paused'); exception when duplicate_object then null; end $$;
do $$ begin create type public.app_state as enum ('foreground','background','inactive','unknown'); exception when duplicate_object then null; end $$;
do $$ begin create type public.event_source as enum ('mobile_gps','mock_stream','manual_status_update','navigation_sdk_future','dispatcher','system'); exception when duplicate_object then null; end $$;
do $$ begin create type public.location_permission_status as enum ('granted','denied','prompt','restricted','unknown'); exception when duplicate_object then null; end $$;
do $$ begin create type public.alert_status as enum ('open','acknowledged','resolved'); exception when duplicate_object then null; end $$;
do $$ begin create type public.audit_event_type as enum (
  'tracking_started','tracking_stopped','permission_granted','permission_denied',
  'load_offered','load_accepted','load_denied','status_changed',
  'load_assigned','alert_resolved','pod_submitted','login','logout'
); exception when duplicate_object then null; end $$;

-- ============ EXTEND driver_location_events ============
alter table public.driver_location_events
  add column if not exists vehicle_id uuid,
  add column if not exists active_load_id uuid,
  add column if not exists active_shipment_id uuid,
  add column if not exists altitude numeric,
  add column if not exists accuracy_meters numeric,
  add column if not exists battery_level numeric,
  add column if not exists is_charging boolean,
  add column if not exists app_state public.app_state,
  add column if not exists tracking_mode public.tracking_mode,
  add column if not exists driver_status public.driver_status,
  add column if not exists route_status text,
  add column if not exists eta_minutes integer,
  add column if not exists remaining_miles numeric,
  add column if not exists event_source public.event_source default 'mobile_gps';

create index if not exists idx_dle_driver_recorded on public.driver_location_events(driver_id, recorded_at desc);
create index if not exists idx_dle_company_recorded on public.driver_location_events(company_id, recorded_at desc);

-- ============ EXTEND driver_status_events ============
alter table public.driver_status_events
  add column if not exists vehicle_id uuid,
  add column if not exists load_id uuid,
  add column if not exists previous_status public.driver_status,
  add column if not exists reason text,
  add column if not exists lat double precision,
  add column if not exists lng double precision,
  add column if not exists created_by uuid;

create index if not exists idx_dse_driver_recorded on public.driver_status_events(driver_id, recorded_at desc);

-- ============ EXTEND alerts ============
alter table public.alerts
  add column if not exists alert_type text,
  add column if not exists status public.alert_status not null default 'open',
  add column if not exists acknowledged_at timestamptz,
  add column if not exists acknowledged_by uuid;

-- ============ driver_live_state ============
create table if not exists public.driver_live_state (
  driver_id uuid primary key,
  company_id uuid not null,
  vehicle_id uuid,
  active_load_id uuid,
  active_shipment_id uuid,
  current_latitude double precision,
  current_longitude double precision,
  heading numeric,
  speed_mph numeric,
  driver_status public.driver_status,
  route_status text,
  eta_minutes integer,
  remaining_miles numeric,
  route_progress_pct numeric,
  last_location_at timestamptz,
  last_status_at timestamptz,
  tracking_mode public.tracking_mode not null default 'off',
  location_permission_status public.location_permission_status not null default 'unknown',
  app_state public.app_state,
  battery_level numeric,
  is_charging boolean,
  is_gps_stale boolean not null default false,
  updated_at timestamptz not null default now()
);

create index if not exists idx_dls_company on public.driver_live_state(company_id);
create index if not exists idx_dls_status on public.driver_live_state(driver_status);

alter table public.driver_live_state enable row level security;

drop policy if exists "company read live state" on public.driver_live_state;
create policy "company read live state" on public.driver_live_state
  for select to authenticated
  using (is_company_member(auth.uid(), company_id));

drop policy if exists "driver upsert own live state" on public.driver_live_state;
create policy "driver upsert own live state" on public.driver_live_state
  for insert to authenticated
  with check (
    driver_id in (select id from public.drivers where user_id = auth.uid())
    or can_manage_company(auth.uid(), company_id)
  );

drop policy if exists "driver update own live state" on public.driver_live_state;
create policy "driver update own live state" on public.driver_live_state
  for update to authenticated
  using (
    driver_id in (select id from public.drivers where user_id = auth.uid())
    or can_manage_company(auth.uid(), company_id)
  )
  with check (
    driver_id in (select id from public.drivers where user_id = auth.uid())
    or can_manage_company(auth.uid(), company_id)
  );

drop trigger if exists trg_dls_touch on public.driver_live_state;
create trigger trg_dls_touch before update on public.driver_live_state
  for each row execute function public.touch_updated_at();

-- ============ route_progress_events ============
create table if not exists public.route_progress_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  driver_id uuid not null,
  load_id uuid,
  route_id uuid,
  progress_pct numeric not null default 0,
  traveled_miles numeric not null default 0,
  remaining_miles numeric not null default 0,
  current_step_index integer not null default 0,
  on_route boolean not null default true,
  distance_off_route_m numeric not null default 0,
  current_lat double precision,
  current_lng double precision,
  speed_mph numeric,
  heading numeric,
  eta_minutes integer,
  source public.event_source not null default 'mobile_gps',
  recorded_at timestamptz not null default now()
);

create index if not exists idx_rpe_driver_recorded on public.route_progress_events(driver_id, recorded_at desc);
create index if not exists idx_rpe_load_recorded on public.route_progress_events(load_id, recorded_at desc);

alter table public.route_progress_events enable row level security;

drop policy if exists "company read rpe" on public.route_progress_events;
create policy "company read rpe" on public.route_progress_events
  for select to authenticated
  using (is_company_member(auth.uid(), company_id));

drop policy if exists "driver or manager insert rpe" on public.route_progress_events;
create policy "driver or manager insert rpe" on public.route_progress_events
  for insert to authenticated
  with check (
    driver_id in (select id from public.drivers where user_id = auth.uid())
    or can_manage_company(auth.uid(), company_id)
  );

-- ============ audit_logs ============
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  actor_user_id uuid,
  driver_id uuid,
  load_id uuid,
  event_type public.audit_event_type not null,
  message text,
  metadata jsonb not null default '{}'::jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists idx_audit_company_created on public.audit_logs(company_id, created_at desc);
create index if not exists idx_audit_driver_created on public.audit_logs(driver_id, created_at desc);
create index if not exists idx_audit_event_type on public.audit_logs(event_type);

alter table public.audit_logs enable row level security;

drop policy if exists "managers read audit" on public.audit_logs;
create policy "managers read audit" on public.audit_logs
  for select to authenticated
  using (can_manage_company(auth.uid(), company_id));

drop policy if exists "members insert audit" on public.audit_logs;
create policy "members insert audit" on public.audit_logs
  for insert to authenticated
  with check (is_company_member(auth.uid(), company_id));

-- ============ REALTIME PUBLICATIONS ============
do $$
declare t text;
begin
  for t in select unnest(array[
    'driver_live_state','driver_status_events','driver_location_events',
    'eta_updates','route_progress_events','alerts','load_offers','dispatch_assignments'
  ]) loop
    begin
      execute format('alter publication supabase_realtime add table public.%I', t);
    exception when duplicate_object then null;
             when others then null;
    end;
  end loop;
end $$;

-- Replica identity full so realtime emits old + new rows on update
alter table public.driver_live_state replica identity full;
alter table public.alerts replica identity full;
alter table public.load_offers replica identity full;
alter table public.dispatch_assignments replica identity full;
