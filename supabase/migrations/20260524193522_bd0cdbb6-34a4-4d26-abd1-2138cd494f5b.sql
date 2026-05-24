create table if not exists public.logistics_map_pois (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null,
  description text,
  category text not null default 'custom',
  latitude double precision not null,
  longitude double precision not null,
  address text,
  city text,
  state text,
  zip text,
  phone text,
  website text,
  is_active boolean not null default true,
  is_public boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_logistics_map_pois_company_id on public.logistics_map_pois(company_id);
create index if not exists idx_logistics_map_pois_category on public.logistics_map_pois(category);
create index if not exists idx_logistics_map_pois_state on public.logistics_map_pois(state);
create index if not exists idx_logistics_map_pois_location on public.logistics_map_pois(latitude, longitude);

alter table public.logistics_map_pois enable row level security;

drop policy if exists "company users can view logistics map pois" on public.logistics_map_pois;
drop policy if exists "operations users can manage logistics map pois" on public.logistics_map_pois;
drop policy if exists "public can view public logistics map pois" on public.logistics_map_pois;

-- Public POIs visible to anyone authenticated
create policy "public can view public logistics map pois"
on public.logistics_map_pois
for select
to authenticated
using (is_public = true);

-- Company members can view their company's POIs
create policy "company users can view logistics map pois"
on public.logistics_map_pois
for select
to authenticated
using (public.is_company_member(auth.uid(), company_id));

-- Owners/admins/dispatchers can manage POIs (roles stored in user_roles)
create policy "operations users can manage logistics map pois"
on public.logistics_map_pois
for all
to authenticated
using (
  public.has_role(auth.uid(), company_id, 'owner'::app_role)
  or public.has_role(auth.uid(), company_id, 'admin'::app_role)
  or public.has_role(auth.uid(), company_id, 'dispatcher'::app_role)
)
with check (
  public.has_role(auth.uid(), company_id, 'owner'::app_role)
  or public.has_role(auth.uid(), company_id, 'admin'::app_role)
  or public.has_role(auth.uid(), company_id, 'dispatcher'::app_role)
);

drop trigger if exists trg_logistics_map_pois_updated_at on public.logistics_map_pois;
create trigger trg_logistics_map_pois_updated_at
before update on public.logistics_map_pois
for each row execute function public.touch_updated_at();