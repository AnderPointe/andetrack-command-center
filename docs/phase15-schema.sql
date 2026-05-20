-- Phase 15 — V1.1 schema additions.
-- All tenant-owned tables include company_id and are RLS-protected.

create table if not exists public.eta_update_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  shipment_id uuid not null,
  previous_eta_min int,
  new_eta_min int not null,
  delta_min int not null,
  reason text,
  created_at timestamptz not null default now()
);

create table if not exists public.eta_confidence_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  shipment_id uuid not null,
  confidence text not null check (confidence in ('high','medium','low','stale')),
  window_status text not null check (window_status in ('on_track','watch','at_risk','late')),
  delay_risk_pct int not null,
  created_at timestamptz not null default now()
);

create table if not exists public.navigation_provider_settings (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null unique references public.companies(id) on delete cascade,
  provider text not null check (provider in ('mapbox','google','here','trimble','mock')),
  truck_validator text,
  cost_cap_monthly_usd numeric(10,2),
  updated_at timestamptz not null default now()
);

create table if not exists public.route_provider_test_runs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  provider text not null,
  test text not null,
  passed boolean not null,
  detail jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.billing_customers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null unique references public.companies(id) on delete cascade,
  stripe_customer_id text unique,
  billing_email text,
  created_at timestamptz not null default now()
);

create table if not exists public.subscription_plans (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  monthly_usd numeric(10,2) not null,
  driver_limit int,
  load_limit_monthly int,
  copilot_included boolean not null default false,
  active boolean not null default true
);

create table if not exists public.company_subscriptions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  plan_code text not null references public.subscription_plans(code),
  status text not null check (status in ('trial','active','past_due','canceled')),
  trial_ends_at timestamptz,
  current_period_start timestamptz,
  current_period_end timestamptz,
  stripe_subscription_id text unique,
  updated_at timestamptz not null default now()
);

create table if not exists public.billing_invoices (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  stripe_invoice_id text unique,
  period text not null,
  amount_usd numeric(10,2) not null,
  status text not null,
  hosted_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.billing_usage_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  metric text not null check (metric in ('driver','vehicle','load','copilot_query')),
  amount int not null default 1,
  occurred_at timestamptz not null default now()
);

create table if not exists public.csv_import_jobs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  kind text not null check (kind in ('driver','vehicle','customer')),
  status text not null check (status in ('uploaded','validating','previewed','imported','failed')),
  total_rows int not null default 0,
  valid_rows int not null default 0,
  invalid_rows int not null default 0,
  created_by uuid not null,
  created_at timestamptz not null default now()
);

create table if not exists public.csv_import_rows (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.csv_import_jobs(id) on delete cascade,
  row_number int not null,
  payload jsonb not null,
  is_valid boolean not null,
  errors jsonb
);

create table if not exists public.offline_queue_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  driver_id uuid not null,
  kind text not null,
  idempotency_key text not null,
  payload jsonb not null,
  state text not null check (state in ('queued','syncing','synced','failed')),
  retry_count int not null default 0,
  last_error text,
  captured_at timestamptz not null,
  synced_at timestamptz,
  unique (driver_id, idempotency_key)
);

create table if not exists public.notification_delivery_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  template_code text not null,
  recipient_user_id uuid,
  channel text not null check (channel in ('push','sms','email')),
  state text not null check (state in ('created','queued','sent','opened','failed')),
  retry_count int not null default 0,
  failure_reason text,
  related_load_id uuid,
  related_shipment_id uuid,
  related_driver_id uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.notification_templates (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  trigger text not null,
  channel text not null,
  audience text not null,
  subject text,
  body text
);

create table if not exists public.customer_notification_preferences (
  id uuid primary key default gen_random_uuid(),
  customer_user_id uuid not null,
  template_code text not null,
  enabled boolean not null default true,
  unique (customer_user_id, template_code)
);

create table if not exists public.saved_load_views (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid not null,
  name text not null,
  filters jsonb not null
);

create table if not exists public.report_runs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  report_code text not null,
  params jsonb,
  ran_by uuid not null,
  ran_at timestamptz not null default now(),
  result_url text
);

create table if not exists public.copilot_rule_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid not null,
  question text not null,
  rule_id text,
  answer text,
  created_at timestamptz not null default now()
);

create table if not exists public.permission_test_runs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  role text not null,
  permission text not null,
  expected boolean not null,
  actual boolean not null,
  passed boolean not null,
  ran_at timestamptz not null default now()
);

create table if not exists public.production_onboarding_projects (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  status text not null check (status in ('in_progress','live','blocked')),
  go_live_at timestamptz
);

create table if not exists public.production_onboarding_tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.production_onboarding_projects(id) on delete cascade,
  code text not null,
  label text not null,
  done boolean not null default false,
  completed_at timestamptz
);

create table if not exists public.growth_metrics (
  id uuid primary key default gen_random_uuid(),
  captured_at timestamptz not null default now(),
  active_companies int,
  active_drivers int,
  active_dispatchers int,
  active_customer_users int,
  loads_created_30d int,
  loads_completed_30d int,
  portal_sessions_30d int,
  trials_active int,
  trials_converted int,
  support_tickets_30d int
);

create table if not exists public.known_issues (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  label text not null,
  workaround text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.data_quality_issues (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  kind text not null,
  severity text not null check (severity in ('low','medium','high')),
  count int not null default 1,
  detected_at timestamptz not null default now()
);

create table if not exists public.data_cleanup_actions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  issue_id uuid not null references public.data_quality_issues(id) on delete cascade,
  action text not null,
  ran_by uuid not null,
  ran_at timestamptz not null default now()
);

create table if not exists public.v11_security_reviews (
  id uuid primary key default gen_random_uuid(),
  reviewed_at timestamptz not null default now(),
  controls jsonb not null,
  pct_passed int not null,
  reviewer uuid
);
