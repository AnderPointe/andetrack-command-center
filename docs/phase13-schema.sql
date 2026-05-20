-- Phase 13 — Pilot operations schema additions.
-- All tenant-owned tables include company_id for RLS scoping.
-- Apply AFTER docs/phase12-schema.sql.

create table if not exists public.pilot_test_cases (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  title text not null,
  category text not null,
  priority text not null check (priority in ('P0','P1','P2','P3')),
  steps jsonb not null default '[]',
  expected_result text,
  created_at timestamptz not null default now()
);

create table if not exists public.pilot_test_runs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  initiated_by uuid references auth.users(id),
  notes text
);

create table if not exists public.pilot_test_results (
  id uuid primary key default gen_random_uuid(),
  test_run_id uuid not null references public.pilot_test_runs(id) on delete cascade,
  test_case_id uuid not null references public.pilot_test_cases(id) on delete cascade,
  status text not null check (status in ('not_run','passed','failed','blocked','needs_retest','deferred')),
  actual_result text,
  evidence_url text,
  related_bug_id uuid,
  tested_by uuid references auth.users(id),
  ran_at timestamptz not null default now()
);

create table if not exists public.pilot_bugs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete set null,
  code text unique not null,
  title text not null,
  description text,
  severity text not null check (severity in ('critical','high','medium','low')),
  priority text not null check (priority in ('P0','P1','P2','P3')),
  status text not null default 'new' check (status in ('new','confirmed','in_progress','ready_retest','fixed','verified','released','wont_fix','duplicate')),
  workflow text,
  role text,
  screen text,
  steps_to_reproduce text,
  expected_result text,
  actual_result text,
  environment text,
  app_version text,
  evidence_url text,
  assignee uuid references auth.users(id),
  fix_target_date date,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists public.pilot_bug_comments (
  id uuid primary key default gen_random_uuid(),
  bug_id uuid not null references public.pilot_bugs(id) on delete cascade,
  author uuid references auth.users(id),
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.pilot_readiness_checks (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  section text not null,
  status text not null check (status in ('not_started','in_progress','blocked','needs_review','ready','passed')),
  score int not null default 0 check (score between 0 and 100),
  blockers jsonb not null default '[]',
  updated_at timestamptz not null default now()
);

create table if not exists public.pilot_blockers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  rule text not null,
  severity text not null check (severity in ('stop','warn')),
  active boolean not null default true,
  noted_at timestamptz not null default now()
);

create table if not exists public.pilot_company_setups (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade unique,
  step text not null,
  status text not null check (status in ('not_started','in_progress','blocked','needs_review','ready','passed')),
  go_live_date date,
  updated_at timestamptz not null default now()
);

create table if not exists public.pilot_training_modules (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  slug text not null,
  title text not null,
  body_url text,
  unique (role, slug)
);

create table if not exists public.pilot_training_progress (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id uuid not null references public.pilot_training_modules(id) on delete cascade,
  status text not null check (status in ('not_started','in_progress','passed')),
  completed_at timestamptz,
  unique (user_id, module_id)
);

create table if not exists public.pilot_support_tickets (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid references auth.users(id),
  role text,
  category text,
  priority text check (priority in ('P0','P1','P2','P3')),
  subject text not null,
  description text,
  workflow text,
  status text not null default 'new' check (status in ('new','triaged','in_progress','waiting','resolved','closed')),
  assignee uuid references auth.users(id),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists public.pilot_go_live_phases (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  phase text not null,
  owner text,
  status text not null check (status in ('not_started','in_progress','blocked','needs_review','ready','passed')),
  success_criteria text,
  notes text,
  updated_at timestamptz not null default now()
);

create table if not exists public.pilot_smoke_tests (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  ran_at timestamptz not null default now(),
  results jsonb not null default '{}',
  passed boolean not null
);

create table if not exists public.pilot_metrics (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  metric text not null,
  value numeric,
  unit text,
  measured_at timestamptz not null default now()
);

create table if not exists public.pilot_feedback (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid references auth.users(id),
  role text not null,
  workflow text,
  rating int check (rating between 1 and 5),
  what_worked text,
  what_was_confusing text,
  what_slowed text,
  missing_feature text,
  bug_encountered text,
  urgency text check (urgency in ('low','medium','high','critical')),
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.pilot_surveys (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  title text not null,
  questions jsonb not null default '[]',
  active boolean not null default true
);

create table if not exists public.pilot_survey_responses (
  id uuid primary key default gen_random_uuid(),
  survey_id uuid not null references public.pilot_surveys(id) on delete cascade,
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid references auth.users(id),
  answers jsonb not null default '{}',
  submitted_at timestamptz not null default now()
);

create table if not exists public.pilot_escalations (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  level int not null check (level between 1 and 5),
  subject text not null,
  description text,
  status text not null default 'open' check (status in ('open','acknowledged','resolved','closed')),
  raised_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists public.pilot_incidents (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete set null,
  title text not null,
  severity text not null check (severity in ('sev1','sev2','sev3','sev4')),
  summary text,
  timeline jsonb not null default '[]',
  resolved_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.pilot_rollback_actions (
  id uuid primary key default gen_random_uuid(),
  incident_id uuid references public.pilot_incidents(id) on delete set null,
  company_id uuid not null references public.companies(id) on delete cascade,
  action text not null,
  performed_by uuid references auth.users(id),
  performed_at timestamptz not null default now()
);

create table if not exists public.pilot_release_candidates (
  id uuid primary key default gen_random_uuid(),
  version text not null unique,
  status text not null check (status in ('draft','testing','approved','rejected','released')),
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.pilot_environment_checks (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete set null,
  check_name text not null,
  status text not null check (status in ('pending','passed','failed')),
  details text,
  checked_at timestamptz not null default now()
);

create table if not exists public.pilot_data_protection_reviews (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  reviewer uuid references auth.users(id),
  findings jsonb not null default '[]',
  approved boolean,
  reviewed_at timestamptz not null default now()
);

create table if not exists public.pilot_acceptance_checks (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  criterion text not null,
  met boolean not null default false,
  checked_by uuid references auth.users(id),
  checked_at timestamptz not null default now()
);

create table if not exists public.pilot_daily_reviews (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  review_date date not null,
  summary jsonb not null default '{}',
  next_actions text,
  created_at timestamptz not null default now(),
  unique (company_id, review_date)
);

create table if not exists public.pilot_weekly_reviews (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  week_start date not null,
  summary jsonb not null default '{}',
  exec_notes text,
  created_at timestamptz not null default now(),
  unique (company_id, week_start)
);
