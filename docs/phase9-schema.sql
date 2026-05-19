-- Phase 9 — AI Operations Intelligence schema (proposed)
-- All tables are tenant-scoped via company_id and RLS-protected.

create type public.risk_level as enum ('low','moderate','high','critical');
create type public.risk_confidence as enum ('low','medium','high');
create type public.recommendation_status as enum ('pending','approved','rejected','expired','executed');
create type public.approval_level as enum ('none','dispatcher','dispatcher_manager','company_admin','billing_admin');

-- Predicted risks
create table public.predictive_risks (
  id                    uuid primary key default gen_random_uuid(),
  company_id            uuid not null references public.companies(id) on delete cascade,
  risk_type             text not null,
  risk_level            public.risk_level not null,
  risk_score            int  not null check (risk_score between 0 and 100),
  confidence            public.risk_confidence not null,
  title                 text not null,
  summary               text not null,
  reason_codes          text[] not null default '{}',
  recommended_action    text,
  impacted_load_id      uuid,
  impacted_driver_id    uuid,
  impacted_customer_id  uuid,
  estimated_impact_min  int,
  estimated_cost_cents  int,
  time_sensitivity      text,
  requires_approval     public.approval_level not null default 'none',
  status                text not null default 'open',
  model_provider        text not null default 'rules_based',
  model_version         text,
  created_at            timestamptz not null default now(),
  resolved_at           timestamptz
);
create index on public.predictive_risks (company_id, status, risk_score desc);

-- AI recommendations linked to risks
create table public.ai_recommendations (
  id                    uuid primary key default gen_random_uuid(),
  company_id            uuid not null references public.companies(id) on delete cascade,
  linked_risk_id        uuid references public.predictive_risks(id) on delete set null,
  type                  text not null,
  title                 text not null,
  summary               text not null,
  confidence_pct        int  not null check (confidence_pct between 0 and 100),
  explanation           jsonb not null,
  data_used             text[] not null default '{}',
  approval_required     public.approval_level not null default 'dispatcher',
  status                public.recommendation_status not null default 'pending',
  estimated_time_saved_min int default 0,
  estimated_cost_impact_cents int default 0,
  risk_reduced_pct      int default 0,
  impacted_load_id      uuid,
  impacted_driver_id    uuid,
  impacted_customer_id  uuid,
  model_provider        text not null default 'rules_based',
  model_version         text,
  created_at            timestamptz not null default now(),
  decided_at            timestamptz,
  decided_by            uuid references auth.users(id),
  decision_notes        text
);
create index on public.ai_recommendations (company_id, status, created_at desc);

-- Operations health snapshots (timeseries)
create table public.ops_health_snapshots (
  id            uuid primary key default gen_random_uuid(),
  company_id    uuid not null references public.companies(id) on delete cascade,
  score         int  not null check (score between 0 and 100),
  level         text not null,
  components    jsonb not null,
  created_at    timestamptz not null default now()
);
create index on public.ops_health_snapshots (company_id, created_at desc);

-- AI action audit (immutable)
create table public.ai_action_audit (
  id                    uuid primary key default gen_random_uuid(),
  company_id            uuid not null references public.companies(id) on delete cascade,
  actor_user_id         uuid references auth.users(id),
  actor_label           text not null,
  role                  text not null,
  action                text not null,
  recommendation_id     uuid references public.ai_recommendations(id) on delete set null,
  approval_level        public.approval_level not null default 'none',
  outcome               text not null,
  notes                 text,
  payload               jsonb,
  created_at            timestamptz not null default now()
);
create index on public.ai_action_audit (company_id, created_at desc);

-- AI usage / cost tracking (per company, per feature, per day)
create table public.ai_usage_daily (
  id            uuid primary key default gen_random_uuid(),
  company_id    uuid not null references public.companies(id) on delete cascade,
  feature       text not null,
  day           date not null,
  calls         int  not null default 0,
  tokens        bigint not null default 0,
  cost_cents    int  not null default 0,
  unique (company_id, feature, day)
);
create index on public.ai_usage_daily (company_id, day desc);

-- Tenant AI budgets
create table public.ai_budgets (
  company_id        uuid primary key references public.companies(id) on delete cascade,
  monthly_cap_cents int  not null default 50000,
  soft_alert_pct    int  not null default 70,
  hard_cutoff_pct   int  not null default 100,
  updated_at        timestamptz not null default now()
);

-- Predictive model registry (versioned, immutable rows)
create table public.predictive_model_runs (
  id              uuid primary key default gen_random_uuid(),
  company_id      uuid references public.companies(id) on delete cascade,
  model_provider  text not null,
  model_version   text not null,
  ran_at          timestamptz not null default now(),
  inputs_count    int  not null,
  outputs_count   int  not null,
  duration_ms     int  not null,
  status          text not null,
  notes           text
);
create index on public.predictive_model_runs (company_id, ran_at desc);
