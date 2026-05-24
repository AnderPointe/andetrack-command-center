-- Stop kind enum
do $$ begin
  create type public.load_stop_kind as enum ('pickup','dropoff');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.load_stop_status as enum ('pending','en_route','arrived','completed','skipped');
exception when duplicate_object then null; end $$;

create table if not exists public.load_stops (
  id uuid primary key default gen_random_uuid(),
  load_id uuid not null references public.loads(id) on delete cascade,
  company_id uuid not null references public.companies(id) on delete cascade,
  kind public.load_stop_kind not null,
  sequence integer not null default 0,
  customer_location_id uuid references public.customer_locations(id) on delete set null,
  name text,
  address text,
  city text,
  region text,
  postal_code text,
  country text default 'US',
  latitude numeric(9,6),
  longitude numeric(9,6),
  scheduled_arrival timestamptz,
  scheduled_departure timestamptz,
  actual_arrival timestamptz,
  actual_departure timestamptz,
  contact_name text,
  contact_phone text,
  instructions text,
  status public.load_stop_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists load_stops_load_id_idx on public.load_stops(load_id);
create index if not exists load_stops_company_id_idx on public.load_stops(company_id);
create index if not exists load_stops_kind_idx on public.load_stops(kind);
create index if not exists load_stops_status_idx on public.load_stops(status);

alter table public.load_stops enable row level security;

create policy "company read load_stops"
  on public.load_stops for select to authenticated
  using (public.is_company_member(auth.uid(), company_id));

create policy "managers write load_stops"
  on public.load_stops for all to authenticated
  using (public.can_manage_company(auth.uid(), company_id))
  with check (public.can_manage_company(auth.uid(), company_id));

create policy "driver updates own load_stops"
  on public.load_stops for update to authenticated
  using (
    exists (
      select 1 from public.loads l
      join public.drivers d on d.id = l.assigned_driver_id
      where l.id = load_stops.load_id and d.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.loads l
      join public.drivers d on d.id = l.assigned_driver_id
      where l.id = load_stops.load_id and d.user_id = auth.uid()
    )
  );

create policy "customer reads own load_stops"
  on public.load_stops for select to authenticated
  using (
    exists (
      select 1 from public.shipment_requests sr
      where sr.converted_load_id = load_stops.load_id
        and sr.customer_id in (select public.customer_ids_for_user(auth.uid()))
    )
  );

create trigger trg_load_stops_touch
  before update on public.load_stops
  for each row execute function public.touch_updated_at();

alter publication supabase_realtime add table public.load_stops;
