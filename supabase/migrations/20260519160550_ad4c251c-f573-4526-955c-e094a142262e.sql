-- Monitoring & observability tables for Phase 5

create table if not exists public.app_error_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  driver_id uuid,
  user_id uuid,
  severity text not null default 'error',
  source text not null,
  message text not null,
  stack text,
  context jsonb not null default '{}'::jsonb,
  app_version text,
  platform text,
  created_at timestamptz not null default now()
);

alter table public.app_error_events enable row level security;

create policy "members insert app errors"
  on public.app_error_events for insert to authenticated
  with check (is_company_member(auth.uid(), company_id));

create policy "driver reads own app errors"
  on public.app_error_events for select to authenticated
  using (user_id = auth.uid() or driver_id in (select id from public.drivers where user_id = auth.uid()));

create policy "managers read app errors"
  on public.app_error_events for select to authenticated
  using (can_manage_company(auth.uid(), company_id));

create index if not exists app_error_events_company_created_idx
  on public.app_error_events(company_id, created_at desc);

-- ---

create table if not exists public.ai_cost_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  driver_id uuid,
  user_id uuid,
  provider text not null,
  model text not null,
  operation text not null,
  prompt_tokens integer,
  completion_tokens integer,
  total_tokens integer,
  cost_usd numeric(10,6),
  latency_ms integer,
  status text not null default 'ok',
  error text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.ai_cost_events enable row level security;

create policy "members insert ai cost"
  on public.ai_cost_events for insert to authenticated
  with check (is_company_member(auth.uid(), company_id));

create policy "managers read ai cost"
  on public.ai_cost_events for select to authenticated
  using (can_manage_company(auth.uid(), company_id));

create index if not exists ai_cost_events_company_created_idx
  on public.ai_cost_events(company_id, created_at desc);

create index if not exists ai_cost_events_provider_idx
  on public.ai_cost_events(provider, created_at desc);

-- ---

create table if not exists public.mobile_device_sessions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  driver_id uuid not null,
  user_id uuid not null,
  device_id text,
  platform text not null,
  os_version text,
  app_version text,
  device_model text,
  locale text,
  network_type text,
  battery_level numeric,
  is_charging boolean,
  started_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  ended_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.mobile_device_sessions enable row level security;

create policy "driver insert own device session"
  on public.mobile_device_sessions for insert to authenticated
  with check (user_id = auth.uid() and is_company_member(auth.uid(), company_id));

create policy "driver update own device session"
  on public.mobile_device_sessions for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "driver read own device sessions"
  on public.mobile_device_sessions for select to authenticated
  using (user_id = auth.uid());

create policy "managers read device sessions"
  on public.mobile_device_sessions for select to authenticated
  using (can_manage_company(auth.uid(), company_id));

create index if not exists mobile_device_sessions_driver_idx
  on public.mobile_device_sessions(driver_id, last_seen_at desc);

create trigger mobile_device_sessions_touch_updated_at
  before update on public.mobile_device_sessions
  for each row execute function public.touch_updated_at();
