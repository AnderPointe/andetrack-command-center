-- Phase 14 — Schema additions (mock / reference)
--
-- These tables back the Post-Pilot V1 surfaces. All tenant-owned tables
-- include company_id and are RLS-scoped to that company. Apply via the
-- migration tool when ready to wire real persistence.

-- Pilot reviews -----------------------------------------------------------
create table if not exists public.pilot_reviews (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  pilot_window_start date not null,
  pilot_window_end   date not null,
  success_score      int  not null check (success_score between 0 and 100),
  go_no_go           text not null check (go_no_go in ('GO','NO_GO','CONDITIONAL')),
  summary            text,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create table if not exists public.pilot_review_metrics (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null references public.pilot_reviews(id) on delete cascade,
  group_id  text not null,
  label     text not null,
  value     text not null,
  trend     text check (trend in ('up','down','flat')),
  hint      text
);

-- Feedback ----------------------------------------------------------------
create type public.feedback_status as enum
  ('new','reviewed','accepted','planned','in_progress','released','declined');

create table if not exists public.product_feedback_items (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id    uuid references auth.users(id) on delete set null,
  user_role  text not null,
  feedback_type text not null,
  category   text not null,
  title      text not null,
  description text,
  severity   text not null check (severity in ('low','medium','high')),
  frequency  text not null check (frequency in ('rare','sometimes','often')),
  business_impact text not null check (business_impact in ('low','medium','high')),
  status     public.feedback_status not null default 'new',
  linked_feature_request_id uuid,
  linked_bug_id uuid,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

-- Bugs --------------------------------------------------------------------
create type public.bug_status as enum
  ('new','confirmed','in_progress','ready_qa','fixed','released','wont_fix','duplicate');

create table if not exists public.bug_reports (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete set null,
  reported_by uuid references auth.users(id) on delete set null,
  affected_role text,
  title text not null,
  description text,
  severity text not null check (severity in ('critical','high','medium','low')),
  priority text not null check (priority in ('P0','P1','P2','P3')),
  reproduction_steps text,
  expected_result text,
  actual_result text,
  affected_screen text,
  affected_workflow text,
  browser_or_device text,
  app_version text,
  status public.bug_status not null default 'new',
  assigned_to uuid references auth.users(id) on delete set null,
  release_target text,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

-- V1 features / release ---------------------------------------------------
create table if not exists public.v1_features (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  area text not null,
  priority text not null check (priority in ('must','should','nice','post_v1','enterprise_later')),
  value_score int not null check (value_score between 1 and 5),
  effort_score int not null check (effort_score between 1 and 5),
  status text not null default 'planned'
);

create table if not exists public.release_checklists (
  id uuid primary key default gen_random_uuid(),
  version text not null,
  released_at timestamptz
);

create table if not exists public.release_checklist_items (
  id uuid primary key default gen_random_uuid(),
  checklist_id uuid not null references public.release_checklists(id) on delete cascade,
  label text not null,
  done boolean not null default false,
  note text
);

create table if not exists public.v1_regression_tests (
  id uuid primary key default gen_random_uuid(),
  workflow text not null,
  status text not null check (status in ('pass','fail','pending')),
  run_at timestamptz not null default now()
);

-- Support -----------------------------------------------------------------
create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  opened_by uuid references auth.users(id) on delete set null,
  category text not null,
  subject text not null,
  description text,
  priority text not null check (priority in ('P0','P1','P2','P3')),
  status text not null default 'open' check (status in ('open','in_progress','waiting_user','resolved')),
  sla_hours int not null default 24,
  linked_bug_id uuid references public.bug_reports(id) on delete set null,
  linked_feedback_id uuid references public.product_feedback_items(id) on delete set null,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists public.support_ticket_comments (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references public.support_tickets(id) on delete cascade,
  author_id uuid references auth.users(id) on delete set null,
  body text not null,
  created_at timestamptz not null default now()
);

-- Customer success --------------------------------------------------------
create table if not exists public.customer_success_accounts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null unique references public.companies(id) on delete cascade,
  health_score int not null default 0,
  renewal_risk text,
  expansion_note text,
  updated_at timestamptz not null default now()
);

create table if not exists public.customer_health_scores (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  recorded_at timestamptz not null default now(),
  score int not null
);

-- Onboarding / training ---------------------------------------------------
create table if not exists public.onboarding_tasks (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  label text not null,
  done boolean not null default false,
  note text
);

create table if not exists public.training_modules (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  role text not null,
  minutes int
);

create table if not exists public.training_progress (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  module_id  uuid not null references public.training_modules(id) on delete cascade,
  completed_at timestamptz,
  unique (user_id, module_id)
);

-- Conversion --------------------------------------------------------------
create table if not exists public.pilot_conversion_reviews (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  step_label text not null,
  done boolean not null default false,
  note text,
  updated_at timestamptz not null default now()
);

-- Performance / data quality ----------------------------------------------
create table if not exists public.performance_metrics (
  id uuid primary key default gen_random_uuid(),
  metric text not null,
  value numeric not null,
  recorded_at timestamptz not null default now()
);

create table if not exists public.data_quality_issues (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  issue text not null,
  count int not null default 0,
  detected_at timestamptz not null default now()
);

create table if not exists public.data_cleanup_actions (
  id uuid primary key default gen_random_uuid(),
  issue_id uuid not null references public.data_quality_issues(id) on delete cascade,
  action text not null,
  performed_by uuid references auth.users(id) on delete set null,
  performed_at timestamptz not null default now()
);

-- Security review ---------------------------------------------------------
create table if not exists public.v1_security_reviews (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  ok boolean not null default false,
  note text,
  reviewed_at timestamptz not null default now()
);

-- Roadmap -----------------------------------------------------------------
create table if not exists public.roadmap_items (
  id uuid primary key default gen_random_uuid(),
  release text not null,
  title text not null,
  status text not null default 'planned'
);

create table if not exists public.roadmap_dependencies (
  id uuid primary key default gen_random_uuid(),
  item_id uuid not null references public.roadmap_items(id) on delete cascade,
  depends_on_id uuid not null references public.roadmap_items(id) on delete cascade
);
