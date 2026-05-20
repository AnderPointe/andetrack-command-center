-- Phase 11 — Platform-level planning tables (mock / scaffold).
-- These are program-management artifacts, NOT customer operational data.
-- Apply via migration tool when ready. RLS examples in phase11-rls-examples.sql.

-- =============== MVP planning =================
create table if not exists public.mvp_features (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  feature text not null,
  status text not null check (status in ('build','mock','defer')),
  priority text not null check (priority in ('P0','P1','P2','P3')),
  owner text,
  complexity text check (complexity in ('S','M','L','XL')),
  pilot_required boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.mvp_feature_dependencies (
  id uuid primary key default gen_random_uuid(),
  feature_id uuid references public.mvp_features(id) on delete cascade,
  depends_on uuid references public.mvp_features(id) on delete cascade
);

-- =============== Sprints / backlog ============
create table if not exists public.sprints (
  id uuid primary key default gen_random_uuid(),
  number int not null,
  name text not null,
  goal text,
  starts_on date,
  ends_on date,
  status text not null default 'planned'
);

create table if not exists public.sprint_tasks (
  id uuid primary key default gen_random_uuid(),
  sprint_id uuid references public.sprints(id) on delete cascade,
  title text not null,
  assignee text,
  status text not null default 'todo',
  priority text check (priority in ('P0','P1','P2','P3'))
);

create table if not exists public.user_stories (
  id uuid primary key default gen_random_uuid(),
  external_id text unique,
  role text not null,
  story text not null,
  acceptance jsonb,
  priority text check (priority in ('P0','P1','P2','P3')),
  sprint_number int
);

create table if not exists public.engineering_backlog_items (
  id uuid primary key default gen_random_uuid(),
  external_id text unique,
  area text not null,
  title text not null,
  description text,
  priority text check (priority in ('P0','P1','P2','P3')),
  estimate text,
  dependencies text[],
  acceptance jsonb
);

create table if not exists public.technical_debt_items (
  id uuid primary key default gen_random_uuid(),
  area text not null,
  item text not null,
  priority text check (priority in ('P0','P1','P2','P3')),
  effort text,
  status text default 'open'
);

create table if not exists public.architecture_decision_records (
  id uuid primary key default gen_random_uuid(),
  external_id text unique,
  title text not null,
  decision text not null,
  context text,
  options jsonb,
  consequences text,
  status text default 'proposed'
);

-- =============== QA / release ================
create table if not exists public.qa_test_cases (
  id uuid primary key default gen_random_uuid(),
  external_id text unique,
  scenario text not null,
  priority text check (priority in ('P0','P1','P2','P3')),
  type text check (type in ('manual','automated'))
);
create table if not exists public.qa_test_runs (
  id uuid primary key default gen_random_uuid(),
  started_at timestamptz default now(),
  release text
);
create table if not exists public.qa_test_results (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references public.qa_test_runs(id) on delete cascade,
  case_id uuid references public.qa_test_cases(id) on delete cascade,
  status text check (status in ('pass','fail','skipped')),
  notes text
);

create table if not exists public.release_gates (
  id uuid primary key default gen_random_uuid(),
  gate text not null,
  owner text,
  status text default 'pending'
);
create table if not exists public.release_checklists (
  id uuid primary key default gen_random_uuid(),
  release text not null,
  item text not null,
  done boolean default false
);

-- =============== Pilot launches ===============
create table if not exists public.pilot_launches (
  id uuid primary key default gen_random_uuid(),
  company_id uuid,
  name text not null,
  starts_on date,
  duration_days int default 30,
  status text default 'planned'
);
create table if not exists public.pilot_success_metrics (
  id uuid primary key default gen_random_uuid(),
  pilot_id uuid references public.pilot_launches(id) on delete cascade,
  metric text not null,
  target text,
  actual text
);
create table if not exists public.pilot_risks (
  id uuid primary key default gen_random_uuid(),
  pilot_id uuid references public.pilot_launches(id) on delete cascade,
  risk text not null,
  likelihood text check (likelihood in ('L','M','H')),
  impact text check (impact in ('L','M','H')),
  mitigation text
);
create table if not exists public.pilot_feedback_items (
  id uuid primary key default gen_random_uuid(),
  pilot_id uuid references public.pilot_launches(id) on delete cascade,
  submitted_by uuid,
  body text not null,
  created_at timestamptz default now()
);
create table if not exists public.pilot_training_sessions (
  id uuid primary key default gen_random_uuid(),
  pilot_id uuid references public.pilot_launches(id) on delete cascade,
  audience text not null,
  scheduled_at timestamptz,
  status text default 'planned'
);

-- =============== Strategy / roadmap ============
create table if not exists public.product_risks (
  id uuid primary key default gen_random_uuid(),
  risk text not null,
  likelihood text check (likelihood in ('L','M','H')),
  impact text check (impact in ('L','M','H')),
  mitigation text,
  owner text,
  status text default 'open'
);
create table if not exists public.implementation_roadmap_items (
  id uuid primary key default gen_random_uuid(),
  phase text not null,
  title text not null,
  notes text
);
create table if not exists public.build_vs_buy_decisions (
  id uuid primary key default gen_random_uuid(),
  capability text not null,
  recommendation text check (recommendation in ('Build','Buy','Defer')),
  provider text,
  reason text
);
create table if not exists public.cost_model_items (
  id uuid primary key default gen_random_uuid(),
  item text not null,
  monthly_estimate text,
  notes text
);
create table if not exists public.provider_cost_estimates (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  capability text not null,
  estimate text
);
