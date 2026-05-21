-- Phase 22 (V4.5) — schema additions (mock-grade, illustrative)
-- All tenant-owned tables include company_id; platform-level tables are platform-scoped.

create table if not exists public.automation_workflows (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  category text not null,
  level text not null check (level in ('manual','assisted','approved','automated')),
  risk text not null check (risk in ('low','medium','high')),
  approvals_required boolean not null default true,
  audit_mode text not null default 'full',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.automation_approvals (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  workflow_id uuid references public.automation_workflows(id) on delete cascade,
  action_type text not null,
  payload jsonb not null,
  confidence numeric,
  requested_by text,
  explanation text,
  status text not null default 'pending', -- pending|approved|rejected|escalated
  decided_by uuid,
  decided_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists public.automation_outcomes (
  id uuid primary key default gen_random_uuid(),
  approval_id uuid references public.automation_approvals(id) on delete cascade,
  success boolean,
  notes text,
  recorded_at timestamptz default now()
);

create table if not exists public.marketplace_operations_metrics (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  captured_at date not null default current_date,
  total_loads int, posted int, awarded int, open_bids int,
  accept_rate numeric, reject_rate numeric, avg_time_to_award_min int,
  marketplace_revenue numeric, disputes_open int, compliance_issues int
);

create table if not exists public.marketplace_playbooks (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  title text not null, owner text, steps jsonb not null default '[]'::jsonb,
  created_at timestamptz default now()
);

create table if not exists public.carrier_quality_scores (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  carrier_id uuid not null,
  perf int, compliance int, on_time int, comm int, pod int,
  issues int default 0, disputes int default 0,
  status text default 'active', -- active|preferred|watchlist|suspended
  captured_at timestamptz default now()
);

create table if not exists public.carrier_watchlist_items (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  carrier_id uuid not null,
  reason text, opened_by uuid, opened_at timestamptz default now(),
  resolved_at timestamptz
);

create table if not exists public.marketplace_disputes (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  carrier_id uuid, load_id uuid,
  type text not null, amount numeric default 0,
  status text not null default 'Open',
  opened_at timestamptz default now(), resolved_at timestamptz
);

create table if not exists public.marketplace_dispute_events (
  id uuid primary key default gen_random_uuid(),
  dispute_id uuid references public.marketplace_disputes(id) on delete cascade,
  actor uuid, kind text, payload jsonb, created_at timestamptz default now()
);

create table if not exists public.certification_execution_projects (
  id uuid primary key default gen_random_uuid(),
  name text not null, owner text, progress int default 0,
  status text default 'planned', due text
);

create table if not exists public.soc2_controls (
  id text primary key, area text, title text, owner text,
  status text default 'Not Started'
);

create table if not exists public.soc2_evidence_items (
  id uuid primary key default gen_random_uuid(),
  control_id text references public.soc2_controls(id) on delete cascade,
  url text, note text, collected_at timestamptz default now()
);

create table if not exists public.soc2_remediation_items (
  id uuid primary key default gen_random_uuid(),
  control_id text references public.soc2_controls(id) on delete cascade,
  description text, owner text, due_date date, status text default 'open'
);

create table if not exists public.mobile_launch_tasks (
  id uuid primary key default gen_random_uuid(),
  platform text check (platform in ('ios','android')),
  item text not null, done boolean default false, due_date date
);

create table if not exists public.android_auto_execution_tasks (
  id uuid primary key default gen_random_uuid(),
  item text not null, status text default 'pending'
);

create table if not exists public.carplay_execution_tasks (
  id uuid primary key default gen_random_uuid(),
  item text not null, status text default 'pending'
);

create table if not exists public.strategic_partnership_readiness (
  id uuid primary key default gen_random_uuid(),
  name text, category text, fit int,
  security_status text, legal_status text, stage text,
  updated_at timestamptz default now()
);

create table if not exists public.acquisition_readiness_items (
  id uuid primary key default gen_random_uuid(),
  area text, score int, notes text, updated_at timestamptz default now()
);

create table if not exists public.due_diligence_packets (
  id uuid primary key default gen_random_uuid(),
  name text, sections jsonb, generated_at timestamptz default now()
);

create table if not exists public.procurement_packets (
  id uuid primary key default gen_random_uuid(),
  company_id uuid, section text, status text default 'pending'
);

create table if not exists public.enterprise_customer_maturity_scores (
  id uuid primary key default gen_random_uuid(),
  company_id uuid, customer_id uuid,
  onboarding int, adoption int, support int, integration int, reporting int,
  sponsor text, risk text, renewal text, expansion text,
  captured_at timestamptz default now()
);

create table if not exists public.customer_success_maturity_scores (
  id uuid primary key default gen_random_uuid(),
  company_id uuid, area text, score int, captured_at timestamptz default now()
);

create table if not exists public.support_maturity_metrics (
  id uuid primary key default gen_random_uuid(),
  company_id uuid, captured_at date default current_date,
  tickets_week int, sla_compliance numeric, escalation_rate numeric,
  critical_incidents int, ttfr_min int, ttr_hrs numeric,
  backlog int, kb_coverage numeric
);

create table if not exists public.ai_governance_maturity_metrics (
  id uuid primary key default gen_random_uuid(),
  company_id uuid, captured_at date default current_date,
  approval_rate numeric, acceptance numeric, rejected numeric,
  threshold_violations int, customer_drafts int, dispatch_recs int,
  audit_coverage numeric, data_source_transparency numeric,
  monthly_cost_usd numeric, safety_incidents int default 0
);

create table if not exists public.revenue_operations_maturity_metrics (
  id uuid primary key default gen_random_uuid(),
  captured_at date default current_date,
  saas_mrr numeric, marketplace_mrr numeric, api_mrr numeric,
  enterprise_support_mrr numeric, implementation_fees numeric,
  expansion_pipeline numeric, renewal_pipeline numeric,
  churn_risk_accounts int, trial_conversion numeric,
  carrier_monetization numeric, partner_monetization numeric,
  concentration_top3_pct numeric
);

create table if not exists public.partner_ecosystem_metrics (
  id uuid primary key default gen_random_uuid(),
  captured_at date default current_date,
  total_partners int, active int, integration int, revenue int, strategic int,
  open_issues int
);

create table if not exists public.operational_playbooks (
  id uuid primary key default gen_random_uuid(),
  company_id uuid, category text, title text, owner text,
  steps jsonb default '[]'::jsonb, review_cadence text
);

create table if not exists public.operational_playbook_runs (
  id uuid primary key default gen_random_uuid(),
  playbook_id uuid references public.operational_playbooks(id) on delete cascade,
  assignee uuid, status text default 'open',
  started_at timestamptz default now(), completed_at timestamptz
);

create table if not exists public.national_operating_regions (
  id uuid primary key default gen_random_uuid(),
  region text, owner text
);

create table if not exists public.national_operating_metrics (
  id uuid primary key default gen_random_uuid(),
  region_id uuid references public.national_operating_regions(id) on delete cascade,
  captured_at date default current_date,
  dispatch_cap int, carrier_cap int, customers int, load_vol int,
  drivers int, vehicles int, support int, marketplace int, perf int
);

create table if not exists public.platform_operating_metrics (
  id uuid primary key default gen_random_uuid(),
  captured_at date default current_date,
  active_companies int, active_dispatchers int, active_drivers int,
  active_carriers int, customer_users int, daily_loads int, monthly_loads int,
  marketplace_awards int, api_calls bigint, edi_transactions int,
  gps_events bigint, webhook_deliveries bigint, support_tickets int,
  mobile_sessions int, copilot_actions int
);

create table if not exists public.v45_report_runs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid, name text, generated_at timestamptz default now(),
  payload jsonb
);
