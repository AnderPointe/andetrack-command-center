-- Phase 20 — V3.5 commercial ecosystem schema (illustrative).
-- All tenant-owned tables include company_id. Platform-scoped tables
-- (commercial_revenue_events, platform_revenue_summaries) use platform_id.
-- Run via the migration tool when wiring real persistence.

create table if not exists public.carrier_subscription_plans (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  name text not null,
  monthly_price_cents int not null default 0,
  per_load_fee_bps int not null default 0,
  premium_visibility boolean not null default false,
  api_access boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.carrier_subscriptions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  carrier_id uuid not null,
  plan_id uuid not null references public.carrier_subscription_plans(id),
  status text not null default 'active',
  started_at timestamptz not null default now(),
  renewed_at timestamptz,
  cancelled_at timestamptz
);

create table if not exists public.carrier_marketplace_fees (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  load_id uuid,
  carrier_id uuid,
  fee_type text not null,
  amount_cents int not null,
  created_at timestamptz not null default now()
);

create table if not exists public.carrier_revenue_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  carrier_id uuid,
  event_type text not null,
  amount_cents int not null default 0,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.marketplace_transactions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  load_id uuid not null,
  carrier_id uuid not null,
  awarded_at timestamptz,
  fee_cents int not null default 0,
  status text not null default 'pending'
);

create table if not exists public.carrier_payouts_placeholder (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  carrier_id uuid not null,
  amount_cents int not null,
  status text not null default 'placeholder',
  created_at timestamptz not null default now()
);

create table if not exists public.carrier_verification_records (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  carrier_id uuid not null,
  status text not null default 'draft',
  submitted_at timestamptz,
  reviewed_at timestamptz,
  reviewer_id uuid
);

create table if not exists public.carrier_verification_steps (
  id uuid primary key default gen_random_uuid(),
  record_id uuid not null references public.carrier_verification_records(id) on delete cascade,
  step_key text not null,
  status text not null default 'pending',
  evidence_url text,
  notes text
);

create table if not exists public.carrier_compliance_scores (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  carrier_id uuid not null,
  score numeric(5,2) not null default 0,
  expiring_documents int not null default 0,
  missing_documents int not null default 0,
  calculated_at timestamptz not null default now()
);

create table if not exists public.carrier_performance_scores (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  carrier_id uuid not null,
  on_time_pickup numeric(5,2),
  on_time_delivery numeric(5,2),
  acceptance_rate numeric(5,2),
  cancellation_rate numeric(5,2),
  pod_completion numeric(5,2),
  composite_score numeric(5,2),
  calculated_at timestamptz not null default now()
);

create table if not exists public.carrier_settlements (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  carrier_id uuid not null,
  load_id uuid not null,
  rate_cents int not null,
  accessorial_cents int not null default 0,
  deduction_cents int not null default 0,
  status text not null default 'pending_pod',
  approved_by uuid,
  approved_at timestamptz
);

create table if not exists public.carrier_settlement_items (
  id uuid primary key default gen_random_uuid(),
  settlement_id uuid not null references public.carrier_settlements(id) on delete cascade,
  label text not null,
  amount_cents int not null
);

create table if not exists public.partner_profiles (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  partner_type text not null,
  name text not null,
  contact_email text,
  status text not null default 'prospect'
);

create table if not exists public.partner_portal_users (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.partner_profiles(id) on delete cascade,
  user_id uuid not null,
  role text not null default 'viewer'
);

create table if not exists public.strategic_partnerships (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  partner_id uuid not null references public.partner_profiles(id),
  integration_status text not null default 'discovery',
  commercial_status text not null default 'evaluating',
  revenue_opportunity_cents int not null default 0,
  launch_status text not null default 'planning'
);

create table if not exists public.partner_readiness_scores (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.partner_profiles(id) on delete cascade,
  technical_score numeric(5,2),
  commercial_score numeric(5,2),
  security_score numeric(5,2),
  composite numeric(5,2),
  calculated_at timestamptz not null default now()
);

create table if not exists public.telematics_vehicle_health_scores (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  vehicle_id uuid not null,
  health_score numeric(5,2),
  maintenance_risk text,
  diagnostic_count int not null default 0,
  calculated_at timestamptz not null default now()
);

create table if not exists public.telematics_driver_behavior_scores (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  driver_id uuid not null,
  speeding_events int not null default 0,
  harsh_brake_events int not null default 0,
  harsh_accel_events int not null default 0,
  idle_minutes int not null default 0,
  composite numeric(5,2),
  calculated_at timestamptz not null default now()
);

create table if not exists public.vehicle_health_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  vehicle_id uuid not null,
  event_type text not null,
  severity text not null default 'info',
  payload jsonb not null default '{}',
  occurred_at timestamptz not null default now()
);

create table if not exists public.driver_behavior_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  driver_id uuid not null,
  event_type text not null,
  payload jsonb not null default '{}',
  occurred_at timestamptz not null default now()
);

create table if not exists public.compliance_tasks (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  category text not null,
  title text not null,
  due_at timestamptz,
  status text not null default 'open',
  evidence_url text,
  assignee_id uuid
);

create table if not exists public.compliance_exceptions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  task_id uuid references public.compliance_tasks(id),
  reason text not null,
  approved_by uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.certification_projects (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  framework text not null,
  status text not null default 'preparing',
  target_date date
);

create table if not exists public.certification_tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.certification_projects(id) on delete cascade,
  control_id text not null,
  title text not null,
  status text not null default 'todo',
  owner_id uuid,
  evidence_url text
);

create table if not exists public.certification_gaps (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.certification_projects(id) on delete cascade,
  gap text not null,
  severity text not null default 'medium',
  remediation text
);

create table if not exists public.security_questionnaire_answers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  question_key text not null,
  answer text not null,
  evidence_url text,
  control_id text,
  updated_at timestamptz not null default now()
);

create table if not exists public.security_questionnaire_exports (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  customer_name text not null,
  exported_by uuid,
  export_format text not null default 'pdf_placeholder',
  created_at timestamptz not null default now()
);

create table if not exists public.vendor_review_packets (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  customer_name text not null,
  sections jsonb not null default '{}',
  status text not null default 'draft'
);

create table if not exists public.procurement_projects (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  customer_name text not null,
  owner_id uuid,
  status text not null default 'in_progress',
  readiness_score numeric(5,2) not null default 0
);

create table if not exists public.procurement_documents (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.procurement_projects(id) on delete cascade,
  doc_type text not null,
  status text not null default 'pending',
  storage_url text
);

create table if not exists public.partner_api_plans (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  name text not null,
  monthly_quota int not null default 0,
  overage_per_1k_cents int not null default 0,
  sla_tier text not null default 'standard'
);

create table if not exists public.partner_api_usage_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  partner_id uuid not null,
  endpoint text not null,
  status_code int not null,
  occurred_at timestamptz not null default now()
);

create table if not exists public.enterprise_customer_success_records (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  customer_id uuid not null,
  executive_sponsor text,
  admin_sponsor text,
  go_live_status text not null default 'planning',
  renewal_date date,
  risk_level text not null default 'low'
);

create table if not exists public.enterprise_account_health_scores (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  customer_id uuid not null,
  health_score numeric(5,2),
  adoption_score numeric(5,2),
  calculated_at timestamptz not null default now()
);

create table if not exists public.commercial_revenue_events (
  id uuid primary key default gen_random_uuid(),
  platform_id uuid,
  company_id uuid,
  product_line text not null,
  event_type text not null,
  amount_cents int not null,
  occurred_at timestamptz not null default now()
);

create table if not exists public.platform_revenue_summaries (
  id uuid primary key default gen_random_uuid(),
  platform_id uuid,
  period date not null,
  saas_cents int not null default 0,
  carrier_marketplace_cents int not null default 0,
  api_cents int not null default 0,
  implementation_cents int not null default 0,
  total_cents int not null default 0
);

create table if not exists public.regional_operations_metrics (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  region text not null,
  drivers int not null default 0,
  loads int not null default 0,
  carriers int not null default 0,
  on_time_pct numeric(5,2),
  coverage_gap boolean not null default false,
  calculated_at timestamptz not null default now()
);

create table if not exists public.v35_report_runs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  report_key text not null,
  status text not null default 'queued',
  storage_url text,
  generated_at timestamptz,
  created_at timestamptz not null default now()
);
