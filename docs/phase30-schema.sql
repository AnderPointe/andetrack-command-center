-- Phase 30 — V8.5 global enterprise operating discipline (proposed schema)
-- Mock-only in the app; this file documents the intended shape if persisted.

create table if not exists public.v85_discipline_scores (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  domain text not null,
  score numeric not null check (score between 0 and 100),
  trend_pts numeric not null default 0,
  owner_role text not null,
  captured_at timestamptz not null default now()
);

create table if not exists public.v85_control_tests (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  control_id text not null,
  area text not null,            -- financial / compliance / ai / reliability
  status text not null,          -- pass | review | exception
  tested_by uuid references auth.users(id),
  tested_at timestamptz not null default now(),
  evidence_url text,
  next_test_due date
);

create table if not exists public.v85_country_accountability (
  id uuid primary key default gen_random_uuid(),
  country_code text not null,
  score numeric not null check (score between 0 and 100),
  exceptions_open integer not null default 0,
  owner_role text not null,
  updated_at timestamptz not null default now(),
  unique (country_code)
);

create table if not exists public.v85_board_packet_sections (
  id uuid primary key default gen_random_uuid(),
  packet_date date not null,
  section text not null,
  status text not null default 'draft', -- draft | review | locked
  owner_role text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.v85_marketplace_economics (
  id uuid primary key default gen_random_uuid(),
  lane text not null,
  liquidity_score numeric not null,
  take_rate_pct numeric,                -- nullable: not modeled yet (placeholder)
  margin_pct numeric,                   -- nullable: placeholder
  captured_at timestamptz not null default now()
);

-- Triggers for validation (NEVER use CHECK with non-immutable expressions)
create or replace function public.v85_validate_test()
returns trigger language plpgsql as $$
begin
  if new.status not in ('pass','review','exception') then
    raise exception 'invalid status %', new.status;
  end if;
  return new;
end $$;

drop trigger if exists v85_validate_test_t on public.v85_control_tests;
create trigger v85_validate_test_t
  before insert or update on public.v85_control_tests
  for each row execute function public.v85_validate_test();
