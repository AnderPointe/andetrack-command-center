-- Phase 27 — V7 schema additions (illustrative, not deployed)

create table if not exists public.v7_global_readiness_scores (
  id uuid primary key default gen_random_uuid(),
  company_id uuid,
  overall_score int not null,
  by_category jsonb not null,
  captured_at timestamptz not null default now()
);

create table if not exists public.global_network_metrics (
  id uuid primary key default gen_random_uuid(),
  captured_at timestamptz not null default now(),
  metrics jsonb not null
);

create table if not exists public.regional_activity_metrics (
  id uuid primary key default gen_random_uuid(),
  region text not null,
  shipments int not null default 0,
  loads int not null default 0,
  risk text,
  revenue numeric,
  captured_at timestamptz not null default now()
);

create table if not exists public.country_region_readiness (
  id uuid primary key default gen_random_uuid(),
  country text not null,
  priority text,
  demand int,
  carriers int,
  partners int,
  localization int,
  billing int,
  residency int,
  privacy int,
  compliance int,
  support int,
  legal_status text,
  risk text,
  recommendation text,
  updated_at timestamptz not null default now()
);

create table if not exists public.data_residency_plans (
  id uuid primary key default gen_random_uuid(),
  region text not null,
  data_type text not null,
  required_region text,
  current_region text,
  risk text,
  legal_status text,
  updated_at timestamptz not null default now()
);

create table if not exists public.data_residency_requirements_placeholder (
  id uuid primary key default gen_random_uuid(),
  region text not null,
  notes text,
  updated_at timestamptz not null default now()
);

create table if not exists public.cross_border_shipments_placeholder (
  id uuid primary key default gen_random_uuid(),
  company_id uuid,
  origin_country text,
  destination_country text,
  carrier text,
  checkpoint text,
  status text,
  created_at timestamptz not null default now()
);

create table if not exists public.cross_border_documents_placeholder (
  id uuid primary key default gen_random_uuid(),
  shipment_id uuid references public.cross_border_shipments_placeholder(id) on delete cascade,
  doc_type text,
  status text,
  uploaded_at timestamptz
);

create table if not exists public.regulated_control_matrix_items (
  id uuid primary key default gen_random_uuid(),
  area text not null,
  owner text,
  status text,
  evidence text,
  frequency text,
  last_tested timestamptz
);

create table if not exists public.global_compliance_controls (
  id uuid primary key default gen_random_uuid(),
  region text not null,
  area text not null,
  status text,
  updated_at timestamptz not null default now()
);

create table if not exists public.regulated_ai_governance_policies (
  id uuid primary key default gen_random_uuid(),
  policy text not null,
  scope text,
  status text,
  updated_at timestamptz not null default now()
);

create table if not exists public.marketplace_intelligence_metrics_v7 (
  id uuid primary key default gen_random_uuid(),
  region text,
  liquidity int,
  coverage_rate int,
  avg_bids numeric,
  no_show_risk numeric,
  dispute_risk numeric,
  revenue_quality int,
  captured_at timestamptz not null default now()
);

create table if not exists public.marketplace_trust_safety_maturity (
  id uuid primary key default gen_random_uuid(),
  score int,
  watchlist int,
  suspensions int,
  reinstatements int,
  fraud_flags int,
  complaints int,
  captured_at timestamptz not null default now()
);

create table if not exists public.platform_financial_maturity_metrics (
  id uuid primary key default gen_random_uuid(),
  score int,
  pillars jsonb,
  captured_at timestamptz not null default now()
);

create table if not exists public.financial_audit_readiness_items (
  id uuid primary key default gen_random_uuid(),
  item text not null,
  status text,
  updated_at timestamptz not null default now()
);

create table if not exists public.global_revenue_operations_metrics (
  id uuid primary key default gen_random_uuid(),
  region text not null,
  product_line text,
  amount numeric,
  captured_at timestamptz not null default now()
);

create table if not exists public.global_partner_ecosystem_records (
  id uuid primary key default gen_random_uuid(),
  partner text,
  category text,
  region text,
  status text,
  risk text,
  updated_at timestamptz not null default now()
);

create table if not exists public.international_partner_marketplace_listings (
  id uuid primary key default gen_random_uuid(),
  listing text,
  region text,
  availability text,
  revshare text,
  status text,
  updated_at timestamptz not null default now()
);

create table if not exists public.global_enterprise_customer_readiness (
  id uuid primary key default gen_random_uuid(),
  company_id uuid,
  account text,
  region text,
  products text,
  status text,
  updated_at timestamptz not null default now()
);

create table if not exists public.global_support_operating_model_records (
  id uuid primary key default gen_random_uuid(),
  region text,
  coverage text,
  languages text,
  tiers text,
  escalation text,
  burden int,
  updated_at timestamptz not null default now()
);

create table if not exists public.executive_global_operating_metrics (
  id uuid primary key default gen_random_uuid(),
  label text,
  value int,
  captured_at timestamptz not null default now()
);

create table if not exists public.strategic_global_risks (
  id uuid primary key default gen_random_uuid(),
  category text,
  risk text,
  severity text,
  owner text,
  mitigation text,
  updated_at timestamptz not null default now()
);

create table if not exists public.global_expansion_roadmap_items (
  id uuid primary key default gen_random_uuid(),
  horizon text,
  focus text,
  updated_at timestamptz not null default now()
);

create table if not exists public.country_launch_plans (
  id uuid primary key default gen_random_uuid(),
  country text,
  phase text,
  next_milestone text,
  owner text,
  updated_at timestamptz not null default now()
);

create table if not exists public.regional_investment_plans (
  id uuid primary key default gen_random_uuid(),
  region text,
  budget numeric,
  focus text,
  updated_at timestamptz not null default now()
);

create table if not exists public.v7_report_runs (
  id uuid primary key default gen_random_uuid(),
  report_key text,
  ran_at timestamptz not null default now(),
  ran_by uuid
);
