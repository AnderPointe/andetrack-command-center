
create table if not exists public.logistics_map_geofences (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null,
  type text not null default 'delivery',
  status text not null default 'active',
  latitude double precision not null,
  longitude double precision not null,
  radius_m double precision not null default 500,
  notes text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists logistics_map_geofences_company_idx
  on public.logistics_map_geofences(company_id);

drop trigger if exists trg_logistics_map_geofences_touch on public.logistics_map_geofences;
create trigger trg_logistics_map_geofences_touch
  before update on public.logistics_map_geofences
  for each row execute function public.touch_updated_at();

alter table public.logistics_map_geofences enable row level security;

drop policy if exists "geofences select same company" on public.logistics_map_geofences;
create policy "geofences select same company"
  on public.logistics_map_geofences for select
  to authenticated
  using (public.is_company_member(auth.uid(), company_id));

drop policy if exists "geofences manage by staff" on public.logistics_map_geofences;
create policy "geofences manage by staff"
  on public.logistics_map_geofences for all
  to authenticated
  using (
    exists (
      select 1 from public.user_roles ur
      where ur.user_id = auth.uid()
        and ur.company_id = logistics_map_geofences.company_id
        and ur.role in ('owner','admin','dispatcher','company_owner','company_admin','dispatcher_manager')
    )
  )
  with check (
    exists (
      select 1 from public.user_roles ur
      where ur.user_id = auth.uid()
        and ur.company_id = logistics_map_geofences.company_id
        and ur.role in ('owner','admin','dispatcher','company_owner','company_admin','dispatcher_manager')
    )
  );
