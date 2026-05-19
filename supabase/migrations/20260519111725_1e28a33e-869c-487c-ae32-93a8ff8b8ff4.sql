
-- route_progress
create table public.route_progress (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  route_id uuid not null,
  driver_id uuid not null,
  load_id uuid,
  current_step_index integer not null default 0,
  traveled_miles numeric not null default 0,
  remaining_miles numeric not null default 0,
  current_lat double precision,
  current_lng double precision,
  heading numeric,
  speed numeric,
  on_route boolean not null default true,
  distance_off_route_m numeric not null default 0,
  recorded_at timestamptz not null default now()
);
create index idx_route_progress_driver_time on public.route_progress (driver_id, recorded_at desc);
create index idx_route_progress_route on public.route_progress (route_id, recorded_at desc);
alter table public.route_progress enable row level security;
create policy "company read route_progress" on public.route_progress for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "driver or manager insert route_progress" on public.route_progress for insert to authenticated
with check ((driver_id in (select id from public.drivers where user_id = auth.uid())) or can_manage_company(auth.uid(), company_id));

-- eta_updates
create table public.eta_updates (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  route_id uuid not null,
  driver_id uuid,
  load_id uuid,
  eta_at timestamptz,
  eta_seconds_remaining integer,
  confidence numeric,
  source text not null check (source in ('mapbox','google','trimble','here','manual')),
  reason text not null check (reason in ('tick','traffic','reroute','stop','manual')),
  recorded_at timestamptz not null default now()
);
create index idx_eta_updates_route_time on public.eta_updates (route_id, recorded_at desc);
alter table public.eta_updates enable row level security;
create policy "company read eta_updates" on public.eta_updates for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "managers write eta_updates" on public.eta_updates for insert to authenticated with check (can_manage_company(auth.uid(), company_id));

-- dispatch_status_sync
create table public.dispatch_status_sync (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  driver_id uuid,
  load_id uuid,
  channel text not null check (channel in ('driver_app','dispatch_web','backend','provider')),
  last_seen_at timestamptz not null default now(),
  last_event_id uuid,
  connection_state text not null check (connection_state in ('online','degraded','offline')),
  updated_at timestamptz not null default now()
);
create index idx_dss_company_updated on public.dispatch_status_sync (company_id, updated_at desc);
alter table public.dispatch_status_sync enable row level security;
create policy "company read dss" on public.dispatch_status_sync for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "managers write dss" on public.dispatch_status_sync for all to authenticated using (can_manage_company(auth.uid(), company_id)) with check (can_manage_company(auth.uid(), company_id));

-- load_status_updates
create table public.load_status_updates (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  load_id uuid not null,
  driver_id uuid,
  from_status load_status,
  to_status load_status not null,
  source text not null default 'driver_app',
  lat double precision,
  lng double precision,
  note text,
  changed_at timestamptz not null default now()
);
create index idx_lsu_load_time on public.load_status_updates (load_id, changed_at desc);
alter table public.load_status_updates enable row level security;
create policy "company read lsu" on public.load_status_updates for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "driver or manager insert lsu" on public.load_status_updates for insert to authenticated
with check ((driver_id in (select id from public.drivers where user_id = auth.uid())) or can_manage_company(auth.uid(), company_id));

-- voice_assistant_events
create table public.voice_assistant_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  driver_id uuid,
  load_id uuid,
  kind text not null check (kind in ('wake','utterance','intent','tts','error','cancel')),
  intent text,
  transcript text,
  response text,
  latency_ms integer,
  safety_mode boolean not null default false,
  occurred_at timestamptz not null default now()
);
create index idx_vae_driver_time on public.voice_assistant_events (driver_id, occurred_at desc);
alter table public.voice_assistant_events enable row level security;
create policy "company read vae" on public.voice_assistant_events for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "driver or manager insert vae" on public.voice_assistant_events for insert to authenticated
with check ((driver_id in (select id from public.drivers where user_id = auth.uid())) or can_manage_company(auth.uid(), company_id));

-- push_devices
create table public.push_devices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  driver_id uuid,
  company_id uuid not null,
  platform text not null check (platform in ('ios','android','web')),
  token text not null unique,
  app_version text,
  last_active_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
create index idx_push_devices_user on public.push_devices (user_id);
alter table public.push_devices enable row level security;
create policy "user read own devices" on public.push_devices for select to authenticated using (user_id = auth.uid() or can_manage_company(auth.uid(), company_id));
create policy "user manage own devices" on public.push_devices for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- push_notifications
create table public.push_notifications (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  user_id uuid,
  driver_id uuid,
  topic text not null,
  title text not null,
  body text,
  data jsonb not null default '{}'::jsonb,
  status text not null default 'queued' check (status in ('queued','sent','delivered','failed')),
  provider text check (provider in ('fcm','apns','expo','web-push')),
  created_at timestamptz not null default now(),
  sent_at timestamptz,
  delivered_at timestamptz
);
create index idx_push_notif_company_time on public.push_notifications (company_id, created_at desc);
alter table public.push_notifications enable row level security;
create policy "company read push" on public.push_notifications for select to authenticated using (is_company_member(auth.uid(), company_id) and (user_id is null or user_id = auth.uid() or can_manage_company(auth.uid(), company_id)));
create policy "managers write push" on public.push_notifications for all to authenticated using (can_manage_company(auth.uid(), company_id)) with check (can_manage_company(auth.uid(), company_id));

-- realtime publication
alter publication supabase_realtime add table public.route_progress;
alter publication supabase_realtime add table public.eta_updates;
alter publication supabase_realtime add table public.dispatch_status_sync;
alter publication supabase_realtime add table public.load_status_updates;
alter publication supabase_realtime add table public.voice_assistant_events;
alter publication supabase_realtime add table public.push_notifications;

-- replica identity full so realtime payloads include old row
alter table public.route_progress replica identity full;
alter table public.eta_updates replica identity full;
alter table public.dispatch_status_sync replica identity full;
alter table public.load_status_updates replica identity full;
alter table public.voice_assistant_events replica identity full;
alter table public.push_notifications replica identity full;
