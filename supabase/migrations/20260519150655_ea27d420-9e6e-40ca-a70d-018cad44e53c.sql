
-- dispatch_voice_messages
create table public.dispatch_voice_messages (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  dispatcher_id uuid not null,
  driver_id uuid not null,
  session_id uuid,
  message text not null,
  audio_url text,
  priority text not null default 'normal' check (priority in ('low','normal','high','urgent')),
  delivered_at timestamptz,
  acknowledged_at timestamptz,
  created_at timestamptz not null default now()
);
alter table public.dispatch_voice_messages enable row level security;

create policy "driver reads own voice messages" on public.dispatch_voice_messages
  for select to authenticated using (driver_id = auth.uid());
create policy "driver acknowledges own voice messages" on public.dispatch_voice_messages
  for update to authenticated using (driver_id = auth.uid());
create policy "company members read company voice messages" on public.dispatch_voice_messages
  for select to authenticated using (public.is_company_member(auth.uid(), company_id));
create policy "dispatchers send voice messages" on public.dispatch_voice_messages
  for insert to authenticated with check (
    public.can_manage_company(auth.uid(), company_id) and dispatcher_id = auth.uid()
  );

-- voice_command_events
create table public.voice_command_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  driver_id uuid not null,
  session_id uuid,
  transcript text not null,
  intent text,
  confidence numeric,
  handled boolean not null default false,
  handler_result jsonb,
  created_at timestamptz not null default now()
);
alter table public.voice_command_events enable row level security;

create policy "driver writes own command events" on public.voice_command_events
  for insert to authenticated with check (driver_id = auth.uid());
create policy "driver reads own command events" on public.voice_command_events
  for select to authenticated using (driver_id = auth.uid());
create policy "company reads command events" on public.voice_command_events
  for select to authenticated using (public.is_company_member(auth.uid(), company_id));

-- route_intelligence_insights
create table public.route_intelligence_insights (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  session_id uuid,
  driver_id uuid not null,
  insight_type text not null check (insight_type in ('traffic_risk','eta_risk','fuel_stop','rest_stop','cdl_hazard','weather','dispatch_note')),
  severity text not null default 'info' check (severity in ('info','warning','critical')),
  title text not null,
  message text not null,
  location_lat numeric,
  location_lng numeric,
  distance_ahead_m integer,
  metadata jsonb,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);
alter table public.route_intelligence_insights enable row level security;

create policy "driver reads own insights" on public.route_intelligence_insights
  for select to authenticated using (driver_id = auth.uid());
create policy "company reads insights" on public.route_intelligence_insights
  for select to authenticated using (public.is_company_member(auth.uid(), company_id));
create policy "company writes insights" on public.route_intelligence_insights
  for insert to authenticated with check (public.is_company_member(auth.uid(), company_id));

-- Realtime
alter publication supabase_realtime add table public.dispatch_voice_messages;
alter publication supabase_realtime add table public.voice_command_events;
alter publication supabase_realtime add table public.route_intelligence_insights;
