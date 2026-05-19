-- Phase 8 — Proposed schema additions for security, compliance, ops.
-- Status: PROPOSAL — apply via Lovable migration tool when productized.
-- All tenant-owned tables include company_id + RLS.

-- ===== Security =====
create table if not exists public.security_findings (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  severity text not null check (severity in ('critical','high','medium','low','info')),
  category text not null,
  title text not null,
  description text,
  status text not null default 'open' check (status in ('open','triaged','in_progress','resolved','accepted_risk')),
  owner_id uuid,
  due_date date,
  remediation text,
  detected_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists public.security_audit_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid,
  actor_id uuid,
  event_type text not null,
  resource text,
  details jsonb,
  ip inet,
  created_at timestamptz not null default now()
);

create table if not exists public.device_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  device_name text,
  device_type text,
  ip inet,
  user_agent text,
  last_seen_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.login_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  email text,
  success boolean not null,
  failure_reason text,
  ip inet,
  user_agent text,
  created_at timestamptz not null default now()
);

create table if not exists public.mfa_settings (
  user_id uuid primary key,
  enabled boolean not null default false,
  method text check (method in ('totp','webauthn','sms')),
  enrolled_at timestamptz,
  last_used_at timestamptz
);

create table if not exists public.support_access_events (
  id uuid primary key default gen_random_uuid(),
  support_user_id uuid not null,
  company_id uuid not null,
  reason text not null,
  granted_by uuid,
  granted_at timestamptz not null default now(),
  expires_at timestamptz not null,
  revoked_at timestamptz
);

-- ===== Compliance =====
create table if not exists public.compliance_controls (
  id uuid primary key default gen_random_uuid(),
  framework text not null default 'SOC2',
  tsc_category text not null check (tsc_category in ('security','availability','processing_integrity','confidentiality','privacy')),
  control_code text not null,
  name text not null,
  description text,
  owner text,
  status text not null default 'not_started'
    check (status in ('not_started','designed','implemented','operating','needs_remediation','ready_for_audit')),
  test_frequency text,
  last_tested_at timestamptz,
  next_test_due date,
  policy_id uuid
);

create table if not exists public.compliance_evidence (
  id uuid primary key default gen_random_uuid(),
  company_id uuid,
  control_id uuid references public.compliance_controls(id) on delete cascade,
  evidence_type text not null,
  title text not null,
  description text,
  file_url text,
  uploaded_by uuid,
  reviewed_by uuid,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create table if not exists public.policy_documents (
  id uuid primary key default gen_random_uuid(),
  company_id uuid,
  title text not null,
  category text not null,
  version text not null,
  body_md text,
  effective_date date,
  next_review_date date,
  owner text
);

create table if not exists public.policy_acknowledgments (
  id uuid primary key default gen_random_uuid(),
  policy_id uuid references public.policy_documents(id) on delete cascade,
  user_id uuid not null,
  acknowledged_at timestamptz not null default now()
);

-- ===== Ops =====
create table if not exists public.change_requests (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,
  risk text check (risk in ('low','medium','high')),
  status text not null default 'draft'
    check (status in ('draft','review','approved','scheduled','deployed','verified','rolled_back','closed')),
  requested_by uuid,
  approved_by uuid,
  scheduled_for timestamptz,
  rollback_plan text,
  created_at timestamptz not null default now()
);

create table if not exists public.release_records (
  id uuid primary key default gen_random_uuid(),
  surface text not null,
  version text not null,
  environment text not null,
  status text not null,
  deployed_by uuid,
  deployed_at timestamptz not null default now(),
  notes text
);

create table if not exists public.test_cases (
  id uuid primary key default gen_random_uuid(),
  suite text not null,
  name text not null,
  category text,
  owner text
);

create table if not exists public.test_runs (
  id uuid primary key default gen_random_uuid(),
  environment text,
  triggered_by uuid,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  status text
);

create table if not exists public.test_results (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references public.test_runs(id) on delete cascade,
  case_id uuid references public.test_cases(id) on delete cascade,
  status text not null check (status in ('passed','failed','skipped','flaky')),
  duration_ms int,
  error text
);

create table if not exists public.deployment_records (
  id uuid primary key default gen_random_uuid(),
  environment text not null,
  surface text not null,
  status text not null,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  smoke_test_passed boolean
);

create table if not exists public.incident_records (
  id uuid primary key default gen_random_uuid(),
  company_id uuid,
  severity text not null check (severity in ('sev1','sev2','sev3','sev4')),
  type text not null,
  title text not null,
  status text not null default 'detected'
    check (status in ('detected','triage','investigating','mitigating','monitoring','resolved')),
  detected_at timestamptz not null default now(),
  resolved_at timestamptz,
  owner_id uuid
);

create table if not exists public.incident_timeline_events (
  id uuid primary key default gen_random_uuid(),
  incident_id uuid references public.incident_records(id) on delete cascade,
  ts timestamptz not null default now(),
  actor_id uuid,
  note text
);

create table if not exists public.postmortems (
  id uuid primary key default gen_random_uuid(),
  incident_id uuid references public.incident_records(id) on delete cascade,
  summary text,
  impact text,
  root_cause text,
  action_items jsonb,
  published_at timestamptz
);

create table if not exists public.backup_records (
  id uuid primary key default gen_random_uuid(),
  target text not null,
  status text not null,
  size_bytes bigint,
  created_at timestamptz not null default now()
);

create table if not exists public.restore_tests (
  id uuid primary key default gen_random_uuid(),
  target text not null,
  rpo_minutes int,
  rto_minutes int,
  passed boolean,
  notes text,
  tested_at timestamptz not null default now()
);

create table if not exists public.vulnerability_findings (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  severity text not null,
  package_or_component text,
  cve text,
  status text not null default 'open',
  owner_id uuid,
  due_date date,
  remediation text,
  created_at timestamptz not null default now()
);

create table if not exists public.vendor_risk_reviews (
  id uuid primary key default gen_random_uuid(),
  vendor text not null,
  category text,
  data_shared text,
  status text not null default 'not_reviewed',
  risk_rating text check (risk_rating in ('low','medium','high','critical')),
  owner text,
  dpa_status text,
  last_reviewed_at timestamptz,
  next_review_due date
);

create table if not exists public.data_retention_rules (
  id uuid primary key default gen_random_uuid(),
  company_id uuid,
  data_type text not null,
  retention_days int not null,
  action text not null check (action in ('delete','anonymize','aggregate')),
  enabled boolean not null default true
);

create table if not exists public.cleanup_job_runs (
  id uuid primary key default gen_random_uuid(),
  rule_id uuid references public.data_retention_rules(id) on delete cascade,
  ran_at timestamptz not null default now(),
  rows_affected int,
  status text
);

create table if not exists public.system_health_events (
  id uuid primary key default gen_random_uuid(),
  surface text not null,
  metric text not null,
  value numeric,
  threshold numeric,
  status text,
  created_at timestamptz not null default now()
);

create table if not exists public.provider_health_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  status text not null,
  latency_ms int,
  error text,
  created_at timestamptz not null default now()
);

create table if not exists public.observability_metrics (
  id uuid primary key default gen_random_uuid(),
  metric text not null,
  value numeric,
  tags jsonb,
  recorded_at timestamptz not null default now()
);

create table if not exists public.security_exceptions (
  id uuid primary key default gen_random_uuid(),
  finding_id uuid references public.security_findings(id) on delete cascade,
  reason text not null,
  approved_by uuid,
  approved_at timestamptz not null default now(),
  expires_at timestamptz
);
