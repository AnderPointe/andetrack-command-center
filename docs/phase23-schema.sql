-- Phase 23 / V5 schema additions (illustrative — NOT auto-applied).
-- All tenant-owned tables include company_id; platform-level tables omit it.

create table if not exists public.v5_maturity_scores (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  pillar text not null,            -- product, marketplace, revenue, ...
  score int not null check (score between 0 and 100),
  measured_at timestamptz not null default now()
);

create table if not exists public.marketplace_liquidity_metrics (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  window_start timestamptz not null,
  window_end timestamptz not null,
  posted int, awarded int, uncovered int,
  avg_bids numeric, time_to_first_bid_min numeric, time_to_award_min numeric,
  response_rate numeric, accept_rate numeric, fall_off_rate numeric,
  score int
);

create table if not exists public.carrier_supply_demand_metrics (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  region text not null, equipment text,
  supply int, demand int, balance int,
  measured_at timestamptz not null default now()
);

create table if not exists public.lane_coverage_metrics (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  origin text not null, dest text not null,
  volume int, coverage_pct int, avg_bids numeric, avg_cover_h numeric,
  risk text, expansion_note text
);

create table if not exists public.marketplace_trust_safety_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  carrier_id uuid,
  event_type text not null,  -- no_show, doc_expiration, complaint, suspicious_bidding
  status text not null,      -- under_review, pending, escalated, resolved
  created_at timestamptz not null default now()
);

create table if not exists public.carrier_quality_programs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  carrier_id uuid not null,
  tier text not null,        -- new, verified, preferred, elite, watchlist, suspended
  otp_pct numeric, dispute_rate numeric,
  reviewed_at timestamptz not null default now()
);

create table if not exists public.strategic_partnership_execution (
  id uuid primary key default gen_random_uuid(),
  partner_name text not null,
  category text, sponsor text,
  integration_status text, gtm_status text,
  launch_date date, revenue_opportunity text,
  blockers text,
  updated_at timestamptz not null default now()
);

create table if not exists public.certification_completion_items (
  id uuid primary key default gen_random_uuid(),
  cert_code text not null,         -- soc2, iso27001, pen_test, ...
  area text not null,
  percent_complete int check (percent_complete between 0 and 100),
  notes text,
  updated_at timestamptz not null default now()
);

create table if not exists public.soc2_completion_controls (
  id uuid primary key default gen_random_uuid(),
  control_id text not null unique,
  tsc text, owner text, description text,
  policy_status text, evidence_status text, test_status text,
  exception_status text, remediation_status text,
  pct int check (pct between 0 and 100)
);

create table if not exists public.board_reports (
  id uuid primary key default gen_random_uuid(),
  quarter text not null,
  built_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.board_report_sections (
  id uuid primary key default gen_random_uuid(),
  report_id uuid references public.board_reports(id) on delete cascade,
  section text not null,
  body jsonb not null
);

create table if not exists public.competitor_profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text, strengths text, weaknesses text,
  mobile text, ai text, marketplace text, enterprise text
);

create table if not exists public.win_loss_records (
  id uuid primary key default gen_random_uuid(),
  quarter text not null,
  won int, lost int,
  top_reason_win text, top_reason_loss text
);

create table if not exists public.mature_revenue_metrics (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  line text not null,        -- saas, marketplace, api, support, implementation, expansion
  value_bucket text,         -- $/$$/$$$/$$$$ placeholder
  trend text, note text
);

create table if not exists public.mature_customer_success_metrics (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  customer text not null,
  health int, adoption int,
  sponsor text, qbr text, renewal text
);

create table if not exists public.mature_support_metrics (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  measured_at timestamptz not null default now(),
  sla_pct numeric, ticket_volume int, first_response_min numeric,
  ttr_h numeric, critical_incidents int, escalations int, backlog int
);

create table if not exists public.governance_maturity_reviews (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  review_type text not null,
  status text not null, completion int,
  next_due date
);

create table if not exists public.strategic_growth_initiatives (
  id uuid primary key default gen_random_uuid(),
  area text not null, opportunity text,
  score int check (score between 0 and 10),
  owner text, updated_at timestamptz not null default now()
);

create table if not exists public.partner_ecosystem_execution (
  id uuid primary key default gen_random_uuid(),
  partner_name text not null,
  health int, revenue_bucket text,
  joint_customers int, risks text
);

create table if not exists public.advanced_operating_metrics (
  id uuid primary key default gen_random_uuid(),
  metric_key text not null,
  value text not null,
  measured_at timestamptz not null default now()
);

create table if not exists public.national_operations_reviews (
  id uuid primary key default gen_random_uuid(),
  region text not null,
  coverage_pct int, demand text, delays text, support text, expansion text,
  measured_at timestamptz not null default now()
);

create table if not exists public.data_room_items (
  id uuid primary key default gen_random_uuid(),
  section text not null, status text not null, owner text
);

create table if not exists public.due_diligence_requests (
  id uuid primary key default gen_random_uuid(),
  topic text not null, requestor text not null,
  status text not null, due_date date
);

create table if not exists public.investor_packets (
  id uuid primary key default gen_random_uuid(),
  built_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.v5_report_runs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  report_key text not null,
  payload jsonb,
  created_at timestamptz not null default now()
);
