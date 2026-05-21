-- Phase 28 — V7.5 schema additions (executive/global tables only)

create table if not exists public.v75_execution_readiness_scores (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  overall int not null,
  by_category jsonb not null default '[]',
  computed_at timestamptz not null default now()
);

create table if not exists public.global_expansion_execution_items (
  id uuid primary key default gen_random_uuid(),
  area text not null,
  status text not null,
  notes text,
  updated_at timestamptz not null default now()
);

create table if not exists public.country_launches (
  id uuid primary key default gen_random_uuid(),
  country text not null,
  phase text not null,
  sponsor text, owner text, compliance text, support text, partner text,
  marketplace text, billing text, security text,
  launch_date_placeholder text,
  readiness_score int default 0,
  risk_level text default 'medium',
  recommendation text,
  created_at timestamptz not null default now()
);

create table if not exists public.country_launch_blockers (
  id uuid primary key default gen_random_uuid(),
  country_launch_id uuid references public.country_launches(id) on delete cascade,
  blocker text not null, severity text not null, owner text,
  created_at timestamptz not null default now()
);

create table if not exists public.controlled_country_pilots (
  id uuid primary key default gen_random_uuid(),
  country_launch_id uuid references public.country_launches(id) on delete cascade,
  step text not null, status text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.regulated_customer_onboarding_projects (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  customer_id uuid,
  step text not null, status text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.regulated_customer_control_packs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  customer_id uuid,
  section text not null, status text not null, body text,
  updated_at timestamptz not null default now()
);

create table if not exists public.financial_audit_readiness_items_v75 (
  id uuid primary key default gen_random_uuid(),
  area text not null, status text not null, evidence text,
  updated_at timestamptz not null default now()
);

create table if not exists public.revenue_reconciliation_placeholders (
  id uuid primary key default gen_random_uuid(),
  event_type text, amount numeric, status text, reason text, owner text,
  created_at timestamptz not null default now()
);

create table if not exists public.revenue_reconciliation_exceptions (
  id uuid primary key default gen_random_uuid(),
  recon_id uuid references public.revenue_reconciliation_placeholders(id) on delete cascade,
  description text, owner text, status text,
  created_at timestamptz not null default now()
);

create table if not exists public.global_revenue_control_items (
  id uuid primary key default gen_random_uuid(),
  country text, currency text, tax text, processor text, invoice_l10n text,
  updated_at timestamptz not null default now()
);

create table if not exists public.country_billing_readiness (
  id uuid primary key default gen_random_uuid(),
  country text not null, billing text, readiness int default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.international_partner_launches (
  id uuid primary key default gen_random_uuid(),
  partner text not null, category text, stage text, country text,
  risk text, owner text,
  updated_at timestamptz not null default now()
);

create table if not exists public.international_partner_certifications (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid references public.international_partner_launches(id) on delete cascade,
  check_name text, status text,
  updated_at timestamptz not null default now()
);

create table if not exists public.global_marketplace_operating_controls (
  id uuid primary key default gen_random_uuid(),
  control text not null, status text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.regional_marketplace_activations (
  id uuid primary key default gen_random_uuid(),
  region text not null, readiness int default 0, status text,
  demand text, supply text, equipment text, partner text, support text, compliance text,
  updated_at timestamptz not null default now()
);

create table if not exists public.data_residency_execution_items (
  id uuid primary key default gen_random_uuid(),
  data_type text, current_region text, required_region text,
  customer_req text, country_req text, risk text,
  legal text, security text, tech text, status text,
  updated_at timestamptz not null default now()
);

create table if not exists public.cross_border_workflows_placeholder (
  id uuid primary key default gen_random_uuid(),
  origin text, destination text, checkpoint text, carrier text,
  status text, customer_message text,
  created_at timestamptz not null default now()
);

create table if not exists public.cross_border_document_placeholders (
  id uuid primary key default gen_random_uuid(),
  shipment_id uuid references public.cross_border_workflows_placeholder(id) on delete cascade,
  doc_type text, status text,
  updated_at timestamptz not null default now()
);

create table if not exists public.global_support_readiness_items (
  id uuid primary key default gen_random_uuid(),
  region text, hours text, timezone text, language text,
  escalation text, critical text, sla text, staffing text,
  updated_at timestamptz not null default now()
);

create table if not exists public.global_compliance_control_execution (
  id uuid primary key default gen_random_uuid(),
  control text, owner text, region text,
  evidence_needed text, evidence_collected text,
  status text, exception text, remediation text,
  next_review timestamptz, escalate boolean default false
);

create table if not exists public.regional_risk_items (
  id uuid primary key default gen_random_uuid(),
  region text, category text, level text, mitigation text,
  updated_at timestamptz not null default now()
);

create table if not exists public.global_launch_approval_requests (
  id uuid primary key default gen_random_uuid(),
  title text, type text, owner text, status text default 'pending',
  conditions jsonb default '[]',
  created_at timestamptz not null default now()
);

create table if not exists public.global_operating_cadence_items (
  id uuid primary key default gen_random_uuid(),
  cadence text, owner text, frequency text, duration text
);

create table if not exists public.international_customer_success_records (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  customer text, country text, health int, adoption int,
  expansion text, renewal_risk text, owner text, needs text,
  updated_at timestamptz not null default now()
);

create table if not exists public.v75_report_runs (
  id uuid primary key default gen_random_uuid(),
  report_name text, status text, generated_at timestamptz default now()
);
