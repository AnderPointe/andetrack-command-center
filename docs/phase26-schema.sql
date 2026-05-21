-- Phase 26 (V6.5) schema additions — illustrative.
-- Tenant-owned tables include company_id; platform-level governance tables
-- may be platform-scoped where appropriate.

create table if not exists public.v65_strategic_operating_scores (
  id uuid primary key default gen_random_uuid(),
  scope text not null default 'platform',         -- 'platform' | 'company'
  company_id uuid references public.companies(id) on delete cascade,
  area text not null,
  score int not null check (score between 0 and 100),
  status text not null,
  captured_at timestamptz not null default now()
);

create table if not exists public.platform_operating_health_metrics (
  id uuid primary key default gen_random_uuid(),
  area text not null,
  score int not null,
  signal text,
  captured_at timestamptz not null default now()
);

create table if not exists public.financial_controls (
  id uuid primary key default gen_random_uuid(),
  area text not null,
  score int not null,
  exceptions int not null default 0,
  owner text,
  updated_at timestamptz not null default now()
);

create table if not exists public.financial_control_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  event_type text not null,
  ref text,
  amount_cents bigint,
  actor text,
  created_at timestamptz not null default now()
);

create table if not exists public.billing_control_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  subscription_id text,
  event_type text not null,
  payload jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.revenue_recognition_placeholders (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  event_type text not null,
  amount_cents bigint,
  service_period_start date,
  service_period_end date,
  recognition_status text not null default 'placeholder',
  notes text
);

create table if not exists public.marketplace_financial_controls (
  id uuid primary key default gen_random_uuid(),
  scope text not null default 'platform',
  control_key text not null,
  status text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.api_partner_billing_controls (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid,
  control_key text not null,
  status text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.global_expansion_readiness_items (
  id uuid primary key default gen_random_uuid(),
  area text not null,
  score int not null,
  owner text,
  notes text,
  updated_at timestamptz not null default now()
);

create table if not exists public.country_readiness_records (
  id uuid primary key default gen_random_uuid(),
  country text not null,
  score int not null,
  status text not null,
  risk text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.internationalization_keys (
  id uuid primary key default gen_random_uuid(),
  namespace text not null,
  key text not null,
  source_text text not null,
  unique (namespace, key)
);

create table if not exists public.locale_settings (
  id uuid primary key default gen_random_uuid(),
  locale text not null unique,
  date_format text,
  currency text,
  units text,
  status text
);

create table if not exists public.regional_compliance_readiness (
  id uuid primary key default gen_random_uuid(),
  region text not null,
  country text not null,
  research_status text,
  privacy_status text,
  transport_status text,
  risk text,
  updated_at timestamptz not null default now()
);

create table if not exists public.partner_marketplace_listings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  status text not null,
  rating_pl numeric,
  certified_pl text,
  updated_at timestamptz not null default now()
);

create table if not exists public.partner_products (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid references public.partner_marketplace_listings(id) on delete cascade,
  product_name text not null,
  category text,
  description text,
  integration_type text,
  pricing_pl text,
  revshare_pl text,
  documentation_url text,
  support_contact text,
  certification_status_pl text,
  availability text
);

create table if not exists public.partner_revenue_share_placeholders (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid references public.partner_marketplace_listings(id) on delete cascade,
  product_id uuid references public.partner_products(id) on delete cascade,
  company_id uuid references public.companies(id) on delete cascade,
  amount_cents bigint,
  share_pct numeric,
  share_amount_cents bigint,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists public.strategic_governance_domains (
  id uuid primary key default gen_random_uuid(),
  domain text not null,
  score int not null,
  cadence text,
  updated_at timestamptz not null default now()
);

create table if not exists public.governance_decisions (
  id uuid primary key default gen_random_uuid(),
  domain text not null,
  decision text not null,
  outcome text not null,
  decided_at timestamptz not null default now()
);

create table if not exists public.executive_decision_requests (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  owner text,
  status text not null default 'open',
  financial_impact_pl text,
  customer_impact text,
  operational_impact text,
  created_at timestamptz not null default now()
);

create table if not exists public.executive_decision_options (
  id uuid primary key default gen_random_uuid(),
  request_id uuid references public.executive_decision_requests(id) on delete cascade,
  label text not null,
  risks text,
  recommendation boolean default false
);

create table if not exists public.product_line_investment_scores (
  id uuid primary key default gen_random_uuid(),
  line text not null,
  revenue_score int, adoption_score int, support_burden int,
  effort_score int, strategic_value int, retention_value int,
  recommendation text,
  updated_at timestamptz not null default now()
);

create table if not exists public.platform_economics_maturity_records (
  id uuid primary key default gen_random_uuid(),
  metric text not null,
  value_pl text,
  captured_at timestamptz not null default now()
);

create table if not exists public.risk_control_matrix_items (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  risk text not null,
  owner text,
  frequency text,
  last_tested timestamptz,
  result text,
  remediation text
);

create table if not exists public.control_test_results (
  id uuid primary key default gen_random_uuid(),
  control_id uuid references public.risk_control_matrix_items(id) on delete cascade,
  result text not null,
  evidence_ref text,
  tested_at timestamptz not null default now()
);

create table if not exists public.audit_control_evidence_items (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  freshness int,
  last_collected_at timestamptz,
  owner text
);

create table if not exists public.compliance_control_operations (
  id uuid primary key default gen_random_uuid(),
  area text not null,
  score int not null,
  exceptions int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.marketplace_operating_control_rules (
  id uuid primary key default gen_random_uuid(),
  rule_key text not null unique,
  enabled boolean not null default true,
  description text
);

create table if not exists public.long_term_operating_plans (
  id uuid primary key default gen_random_uuid(),
  horizon text not null,
  focus text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.strategic_operating_pillars (
  id uuid primary key default gen_random_uuid(),
  pillar text not null,
  owner text,
  score int not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.v65_report_runs (
  id uuid primary key default gen_random_uuid(),
  report_key text not null,
  generated_by uuid,
  generated_at timestamptz not null default now(),
  artifact_url text
);
