-- Phase 29 — V8 global operating network scale (proposed schema, not applied).
-- All tenant-owned tables MUST carry company_id + RLS.
-- Platform-level rows may be company_id NULL and gated by is_platform_owner.

create table public.v8_global_scale_scores (
  id uuid primary key default gen_random_uuid(),
  scope text not null check (scope in ('platform','region','country')),
  scope_key text,
  score int not null check (score between 0 and 100),
  level text not null,
  trend_pts int,
  components jsonb not null,
  created_at timestamptz not null default now()
);

create table public.global_operating_network_metrics (
  id uuid primary key default gen_random_uuid(),
  metric text not null,
  value numeric not null,
  unit text,
  region text,
  country text,
  captured_at timestamptz not null default now()
);

create table public.country_operating_centers (
  id uuid primary key default gen_random_uuid(),
  country text not null unique,
  phase text not null,
  owner_user_id uuid references auth.users(id),
  blockers_open int not null default 0,
  decisions_open int not null default 0,
  notes text
);

create table public.country_operating_health_scores (
  id uuid primary key default gen_random_uuid(),
  country text not null,
  marketplace int, compliance int, financial int, billing int,
  partner int, success int, residency_risk text,
  health int not null,
  created_at timestamptz not null default now()
);

create table public.international_marketplace_metrics (
  id uuid primary key default gen_random_uuid(),
  country text not null,
  carriers int, demand int, equipment_cov int,
  ttfb_min int, ttaward_min int, gaps int,
  quality int, compliance int, disputes int,
  captured_at timestamptz not null default now()
);

create table public.regional_marketplace_liquidity_metrics (
  id uuid primary key default gen_random_uuid(),
  region text not null,
  liquidity int, coverage int, uncovered int,
  avg_bids numeric, accept int, ttaward_min int, trust int,
  carrier_avail text, equip text,
  conc_carrier int, conc_customer int,
  captured_at timestamptz not null default now()
);

create table public.international_carrier_operations (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  carrier_name text not null,
  country text not null,
  status text not null,
  compliance_status text,
  equipment text,
  coverage text,
  marketplace_eligibility text,
  quality_score int,
  updated_at timestamptz not null default now()
);

create table public.carrier_country_eligibility_rules (
  id uuid primary key default gen_random_uuid(),
  country text not null,
  rule text not null,
  enforced boolean not null default false
);

create table public.cross_border_operating_controls (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  shipment_ref text not null,
  lane text,
  broker_status text,
  document_status text,
  approval_status text,
  residency_status text,
  status text not null,
  audit jsonb not null default '[]',
  created_at timestamptz not null default now()
);

create table public.financial_control_maturity_records (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  control text not null,
  owner text not null,
  status text not null,
  evidence text,
  maturity_score int,
  recorded_at timestamptz not null default now()
);

create table public.revenue_reconciliation_maturity_records (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  events int not null default 0,
  matched int not null default 0,
  unmatched int not null default 0,
  exceptions_open int not null default 0,
  owner text,
  recorded_at timestamptz not null default now()
);

create table public.global_billing_control_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  country text not null,
  event_type text not null,
  status text not null,
  payload jsonb,
  created_at timestamptz not null default now()
);

create table public.country_billing_control_records (
  id uuid primary key default gen_random_uuid(),
  country text not null,
  currency text,
  tax_status text,
  localization_status text,
  webhook_failures int default 0,
  failed_payments int default 0,
  disputes int default 0,
  adjustments int default 0,
  recorded_at timestamptz not null default now()
);

create table public.advanced_compliance_execution_records (
  id uuid primary key default gen_random_uuid(),
  region text,
  control text not null,
  owner text not null,
  status text not null,
  evidence_status text,
  exception_open boolean default false,
  next_review_at timestamptz,
  recorded_at timestamptz not null default now()
);

create table public.country_compliance_execution_records (
  id uuid primary key default gen_random_uuid(),
  country text not null,
  control text not null,
  status text not null,
  evidence_status text,
  owner text,
  recorded_at timestamptz not null default now()
);

create table public.global_customer_success_operations (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  country text,
  health int,
  regulated boolean default false,
  adoption int,
  renewal_risk text,
  expansion text,
  success_owner text,
  exec_sponsor text,
  recorded_at timestamptz not null default now()
);

create table public.international_support_operations (
  id uuid primary key default gen_random_uuid(),
  region text not null,
  timezone text,
  language_readiness text,
  sla_pct int,
  escalations int,
  critical int,
  kb_status text,
  recorded_at timestamptz not null default now()
);

create table public.global_partner_operations (
  id uuid primary key default gen_random_uuid(),
  partner_name text not null,
  country text not null,
  category text,
  launch_status text,
  security_status text,
  compliance_status text,
  integration_health int,
  support_burden text,
  joint_customers int default 0,
  risk text,
  opportunity text,
  recorded_at timestamptz not null default now()
);

create table public.executive_strategic_decisions (
  id uuid primary key default gen_random_uuid(),
  kind text not null,
  subject text not null,
  owner_role text not null,
  owner_user_id uuid references auth.users(id),
  status text not null default 'pending',
  due_at timestamptz,
  approved_by uuid references auth.users(id),
  approved_at timestamptz,
  notes text,
  created_at timestamptz not null default now()
);

create table public.board_global_strategy_reports (
  id uuid primary key default gen_random_uuid(),
  report_name text not null,
  generated_by uuid references auth.users(id),
  sections jsonb not null,
  generated_at timestamptz not null default now()
);

create table public.global_risk_control_records (
  id uuid primary key default gen_random_uuid(),
  area text not null,
  likelihood text not null,
  impact text not null,
  owner text not null,
  mitigation text,
  recorded_at timestamptz not null default now()
);

create table public.global_product_adoption_metrics (
  id uuid primary key default gen_random_uuid(),
  product text not null,
  country text not null,
  adoption int not null,
  recorded_at timestamptz not null default now()
);

create table public.regional_expansion_decisions (
  id uuid primary key default gen_random_uuid(),
  country text not null,
  inputs jsonb not null,
  recommendation text not null,
  risk_score int,
  action_plan text,
  approved_by uuid references auth.users(id),
  approved_at timestamptz,
  recorded_at timestamptz not null default now()
);

create table public.long_term_global_operating_models (
  id uuid primary key default gen_random_uuid(),
  area text not null,
  owner text not null,
  cadence text not null,
  maturity int,
  recorded_at timestamptz not null default now()
);

create table public.v8_report_runs (
  id uuid primary key default gen_random_uuid(),
  report_name text not null,
  ran_by uuid references auth.users(id),
  ran_at timestamptz not null default now(),
  status text not null,
  notes text
);
