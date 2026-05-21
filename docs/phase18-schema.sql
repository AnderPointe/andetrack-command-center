-- Phase 18 — V2.5 enterprise schema additions
-- All tenant-owned tables include company_id (uuid) referencing public.companies(id).
-- Run via supabase--migration in production; this file is the design reference.

-- ===== EDI =====
create table if not exists public.edi_trading_partners (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  partner_name text not null,
  partner_type text not null,
  trading_partner_id text not null,
  qualifier text not null default 'ZZ',
  edi_standard text not null default 'X12-4010',
  transport_method text not null check (transport_method in ('sftp','as2','api','manual')),
  contact_name text,
  contact_email text,
  contact_phone text,
  enabled boolean not null default false,
  test_mode boolean not null default true,
  production_enabled boolean not null default false,
  status text not null default 'draft' check (status in ('draft','testing','active','suspended','error','disabled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists edi_partners_company_idx on public.edi_trading_partners (company_id);

create table if not exists public.edi_transport_settings (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.edi_trading_partners(id) on delete cascade,
  config_json jsonb not null default '{}'::jsonb,
  secret_ref text,
  created_at timestamptz not null default now()
);

create table if not exists public.edi_mapping_versions (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.edi_trading_partners(id) on delete cascade,
  doc_type text not null,
  version int not null default 1,
  active boolean not null default false,
  notes text,
  created_by uuid,
  created_at timestamptz not null default now(),
  unique (partner_id, doc_type, version)
);

create table if not exists public.edi_mapping_rules (
  id uuid primary key default gen_random_uuid(),
  mapping_version_id uuid not null references public.edi_mapping_versions(id) on delete cascade,
  edi_field text not null,
  target_path text not null,
  required boolean not null default false,
  transform text,
  default_value text
);

create table if not exists public.edi_control_numbers (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.edi_trading_partners(id) on delete cascade,
  direction text not null check (direction in ('inbound','outbound')),
  last_value bigint not null default 0,
  updated_at timestamptz not null default now(),
  unique (partner_id, direction)
);

create table if not exists public.edi_transmissions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  partner_id uuid not null references public.edi_trading_partners(id) on delete cascade,
  doc_type text not null,
  direction text not null check (direction in ('inbound','outbound')),
  status text not null check (status in ('received','parsed','accepted','rejected','sent','ack','error')),
  control_number text,
  payload_raw text,
  payload_parsed jsonb,
  error_message text,
  related_shipment_id uuid,
  at timestamptz not null default now()
);
create index if not exists edi_tx_company_at_idx on public.edi_transmissions (company_id, at desc);

create table if not exists public.edi_error_resolutions (
  id uuid primary key default gen_random_uuid(),
  transmission_id uuid not null references public.edi_transmissions(id) on delete cascade,
  resolved_by uuid,
  resolution text,
  resolved_at timestamptz
);

-- ===== API monetization =====
create table if not exists public.api_products (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  active boolean not null default true
);

create table if not exists public.api_pricing_tiers (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.api_products(id) on delete cascade,
  name text not null,
  monthly_price_cents int not null default 0,
  included_requests bigint not null default 0,
  overage_cents_per_request numeric(12,6) not null default 0,
  rate_limit_per_min int,
  burst_limit int,
  scopes text[] not null default '{}'
);

create table if not exists public.api_usage_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  api_key_id uuid,
  scope text not null,
  endpoint text not null,
  status_code int,
  units int not null default 1,
  at timestamptz not null default now()
);
create index if not exists api_usage_company_at_idx on public.api_usage_events (company_id, at desc);

create table if not exists public.api_rate_limits (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  scope text not null,
  limit_per_min int not null,
  burst_limit int not null,
  unique (company_id, scope)
);

create table if not exists public.api_overage_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  period_start date not null,
  period_end date not null,
  units bigint not null,
  amount_cents int not null,
  created_at timestamptz not null default now()
);

create table if not exists public.api_billing_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  event_type text not null,
  units bigint not null default 1,
  amount_cents int not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  at timestamptz not null default now()
);

-- ===== Optimization =====
create table if not exists public.optimization_scenarios (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null,
  description text,
  inputs jsonb not null default '{}'::jsonb,
  created_by uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.optimization_scenario_results (
  id uuid primary key default gen_random_uuid(),
  scenario_id uuid not null references public.optimization_scenarios(id) on delete cascade,
  eta_impact_min int,
  risk_delta int,
  customer_impact text,
  miles_delta int,
  workload_delta text,
  recommended boolean not null default false,
  raw jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.multi_load_assignments (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  driver_id uuid,
  load_ids uuid[] not null,
  deadhead_mi int,
  total_mi int,
  eta_confidence int,
  savings_cents int,
  explanation text,
  status text not null default 'suggested',
  created_at timestamptz not null default now()
);

-- ===== Customer communication =====
create table if not exists public.customer_messages (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  customer_id uuid not null,
  load_id uuid,
  message_type text not null,
  channel text not null check (channel in ('email','sms','portal')),
  draft_body text not null,
  final_body text,
  status text not null default 'pending_approval' check (status in ('pending_approval','approved','sent','rejected','failed')),
  drafted_by uuid,
  approved_by uuid,
  approved_at timestamptz,
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.customer_message_approvals (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references public.customer_messages(id) on delete cascade,
  approver uuid not null,
  decision text not null check (decision in ('approved','rejected','edited')),
  notes text,
  at timestamptz not null default now()
);

-- ===== White-label / domains =====
create table if not exists public.company_branding (
  company_id uuid primary key references public.companies(id) on delete cascade,
  logo_url text,
  primary_color text,
  secondary_color text,
  accent_color text,
  portal_title text,
  support_email text,
  support_phone text,
  footer_text text,
  hide_anderoute_branding boolean not null default false,
  terms_url text,
  privacy_url text,
  updated_at timestamptz not null default now()
);

create table if not exists public.custom_domains (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  domain text not null unique,
  status text not null default 'not_configured' check (status in ('not_configured','pending_dns','dns_verified','ssl_pending','active','failed')),
  dns_verified boolean not null default false,
  ssl_status text,
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.domain_verification_records (
  id uuid primary key default gen_random_uuid(),
  domain_id uuid not null references public.custom_domains(id) on delete cascade,
  record_type text not null,
  record_name text not null,
  record_value text not null,
  verified boolean not null default false,
  last_checked_at timestamptz
);

-- ===== Multi-location =====
create table if not exists public.company_locations (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null,
  location_type text not null check (location_type in ('headquarters','yard','terminal','warehouse','customer_site','service_region')),
  address text,
  latitude numeric(10,7),
  longitude numeric(10,7),
  timezone text,
  contact_name text,
  contact_phone text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.service_regions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null,
  bounds jsonb,
  created_at timestamptz not null default now()
);

-- ===== Retention / audit / scaling =====
create table if not exists public.data_retention_policies (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  data_type text not null,
  retention_days int not null,
  legal_hold boolean not null default false,
  updated_at timestamptz not null default now(),
  unique (company_id, data_type)
);

create table if not exists public.data_cleanup_jobs (
  id uuid primary key default gen_random_uuid(),
  policy_id uuid not null references public.data_retention_policies(id) on delete cascade,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  rows_deleted bigint,
  status text not null default 'queued'
);

create table if not exists public.audit_exports (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  requested_by uuid not null,
  filters jsonb not null default '{}'::jsonb,
  format text not null check (format in ('csv','json','pdf')),
  status text not null default 'queued',
  file_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.fleet_scaling_metrics (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  metric text not null,
  value numeric not null,
  observed_at timestamptz not null default now()
);

create table if not exists public.map_cluster_settings (
  company_id uuid primary key references public.companies(id) on delete cascade,
  config jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.integration_retry_jobs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  system text not null,
  target_id text not null,
  attempts int not null default 0,
  next_retry_at timestamptz,
  last_error text,
  status text not null default 'pending'
);

create table if not exists public.credential_expiration_alerts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  credential_label text not null,
  expires_at timestamptz not null,
  severity text not null default 'info',
  acknowledged boolean not null default false
);

-- ===== Onboarding / reports =====
create table if not exists public.enterprise_onboarding_projects (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  status text not null default 'in_progress',
  go_live_target date,
  created_at timestamptz not null default now()
);

create table if not exists public.enterprise_onboarding_tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.enterprise_onboarding_projects(id) on delete cascade,
  label text not null,
  owner text,
  done boolean not null default false,
  done_at timestamptz
);

create table if not exists public.enterprise_report_runs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  report_code text not null,
  params jsonb not null default '{}'::jsonb,
  status text not null default 'queued',
  file_url text,
  requested_by uuid,
  created_at timestamptz not null default now()
);

-- Enable RLS on all tenant tables (policies in phase18-rls.sql)
alter table public.edi_trading_partners        enable row level security;
alter table public.edi_transmissions           enable row level security;
alter table public.edi_mapping_versions        enable row level security;
alter table public.api_usage_events            enable row level security;
alter table public.api_billing_events          enable row level security;
alter table public.optimization_scenarios      enable row level security;
alter table public.multi_load_assignments      enable row level security;
alter table public.customer_messages           enable row level security;
alter table public.company_branding            enable row level security;
alter table public.custom_domains              enable row level security;
alter table public.company_locations           enable row level security;
alter table public.data_retention_policies     enable row level security;
alter table public.audit_exports               enable row level security;
alter table public.fleet_scaling_metrics       enable row level security;
alter table public.enterprise_onboarding_projects enable row level security;
alter table public.enterprise_report_runs      enable row level security;
