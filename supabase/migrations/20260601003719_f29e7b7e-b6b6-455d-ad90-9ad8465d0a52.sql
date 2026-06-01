create extension if not exists pgcrypto;

create table if not exists public.trust_scorecards (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  entity_type text not null default 'company',
  entity_id uuid,
  entity_name text,
  trust_score numeric(5,2) not null default 0,
  maturity_level text not null default 'developing',
  reliability_score numeric(5,2) not null default 0,
  compliance_score numeric(5,2) not null default 0,
  communication_score numeric(5,2) not null default 0,
  delivery_score numeric(5,2) not null default 0,
  financial_score numeric(5,2) not null default 0,
  risk_score numeric(5,2) not null default 0,
  summary text,
  recommended_action text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(company_id, entity_type, entity_id)
);

create table if not exists public.trust_signals (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  signal_source text not null,
  signal_type text not null,
  entity_type text,
  entity_id uuid,
  entity_name text,
  impact text not null default 'neutral',
  severity text not null default 'normal',
  score_delta numeric(6,2) not null default 0,
  title text not null,
  description text,
  source_table text,
  source_record_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.customer_trust_profiles (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  customer_name text not null,
  customer_id uuid,
  account_owner_id uuid references auth.users(id) on delete set null,
  trust_score numeric(5,2) not null default 0,
  maturity_level text not null default 'new',
  sla_confidence_score numeric(5,2) not null default 0,
  communication_confidence_score numeric(5,2) not null default 0,
  retention_confidence_score numeric(5,2) not null default 0,
  expansion_confidence_score numeric(5,2) not null default 0,
  churn_risk_score numeric(5,2) not null default 0,
  last_service_review_at timestamptz,
  next_review_due_at timestamptz,
  executive_summary text,
  risk_summary text,
  growth_summary text,
  recommended_action text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(company_id, customer_name)
);

create table if not exists public.partner_trust_profiles (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  partner_name text not null,
  partner_type text not null default 'carrier',
  trust_score numeric(5,2) not null default 0,
  maturity_level text not null default 'new',
  reliability_score numeric(5,2) not null default 0,
  safety_score numeric(5,2) not null default 0,
  compliance_score numeric(5,2) not null default 0,
  communication_score numeric(5,2) not null default 0,
  financial_score numeric(5,2) not null default 0,
  approval_status text not null default 'pending',
  governance_status text not null default 'review_needed',
  last_review_at timestamptz,
  next_review_due_at timestamptz,
  executive_summary text,
  risk_summary text,
  recommended_action text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(company_id, partner_name)
);

create table if not exists public.trust_maturity_assessments (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  assessment_name text not null,
  assessment_type text not null default 'enterprise',
  entity_type text,
  entity_id uuid,
  entity_name text,
  current_level text not null default 'developing',
  target_level text not null default 'optimized',
  score numeric(5,2) not null default 0,
  strengths jsonb not null default '[]'::jsonb,
  gaps jsonb not null default '[]'::jsonb,
  required_actions jsonb not null default '[]'::jsonb,
  owner_id uuid references auth.users(id) on delete set null,
  due_at timestamptz,
  completed_at timestamptz,
  status text not null default 'open',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.board_trust_reports (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  report_title text not null,
  report_period text not null,
  enterprise_trust_score numeric(5,2) not null default 0,
  customer_trust_score numeric(5,2) not null default 0,
  partner_trust_score numeric(5,2) not null default 0,
  revenue_trust_score numeric(5,2) not null default 0,
  marketplace_trust_score numeric(5,2) not null default 0,
  executive_summary text,
  risk_summary text,
  revenue_summary text,
  governance_summary text,
  recommended_board_actions jsonb not null default '[]'::jsonb,
  status text not null default 'draft',
  created_by uuid references auth.users(id) on delete set null,
  approved_by uuid references auth.users(id) on delete set null,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.board_trust_report_items (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  report_id uuid not null references public.board_trust_reports(id) on delete cascade,
  item_type text not null,
  title text not null,
  description text,
  priority text not null default 'normal',
  owner_id uuid references auth.users(id) on delete set null,
  due_at timestamptz,
  completed_at timestamptz,
  status text not null default 'open',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.revenue_trust_intelligence (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  account_name text not null,
  customer_trust_profile_id uuid references public.customer_trust_profiles(id) on delete set null,
  revenue_status text not null default 'stable',
  current_revenue numeric(14,2) not null default 0,
  projected_revenue numeric(14,2) not null default 0,
  at_risk_revenue numeric(14,2) not null default 0,
  expansion_opportunity numeric(14,2) not null default 0,
  trust_score numeric(5,2) not null default 0,
  churn_risk_score numeric(5,2) not null default 0,
  expansion_confidence_score numeric(5,2) not null default 0,
  service_confidence_score numeric(5,2) not null default 0,
  revenue_risk_reason text,
  recommended_action text,
  next_action_due_at timestamptz,
  owner_id uuid references auth.users(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(company_id, account_name)
);

create table if not exists public.marketplace_trust_policies (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  policy_name text not null,
  policy_type text not null default 'partner_governance',
  description text,
  minimum_trust_score numeric(5,2) not null default 70,
  minimum_compliance_score numeric(5,2) not null default 70,
  minimum_safety_score numeric(5,2) not null default 70,
  approval_required boolean not null default true,
  auto_suspend_threshold numeric(5,2) not null default 40,
  is_active boolean not null default true,
  created_by uuid references auth.users(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(company_id, policy_name)
);

create table if not exists public.marketplace_governance_reviews (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  partner_trust_profile_id uuid references public.partner_trust_profiles(id) on delete cascade,
  review_type text not null default 'scheduled',
  review_status text not null default 'open',
  trust_score_at_review numeric(5,2) not null default 0,
  compliance_score_at_review numeric(5,2) not null default 0,
  safety_score_at_review numeric(5,2) not null default 0,
  decision text not null default 'pending',
  decision_reason text,
  required_actions jsonb not null default '[]'::jsonb,
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  next_review_due_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.trust_automation_runs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  automation_name text not null,
  automation_type text not null,
  run_status text not null default 'queued',
  started_at timestamptz,
  completed_at timestamptz,
  records_scanned integer not null default 0,
  records_created integer not null default 0,
  records_updated integer not null default 0,
  summary text,
  error_message text,
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists set_trust_scorecards_updated_at on public.trust_scorecards;
create trigger set_trust_scorecards_updated_at before update on public.trust_scorecards for each row execute function public.set_updated_at();
drop trigger if exists set_customer_trust_profiles_updated_at on public.customer_trust_profiles;
create trigger set_customer_trust_profiles_updated_at before update on public.customer_trust_profiles for each row execute function public.set_updated_at();
drop trigger if exists set_partner_trust_profiles_updated_at on public.partner_trust_profiles;
create trigger set_partner_trust_profiles_updated_at before update on public.partner_trust_profiles for each row execute function public.set_updated_at();
drop trigger if exists set_trust_maturity_assessments_updated_at on public.trust_maturity_assessments;
create trigger set_trust_maturity_assessments_updated_at before update on public.trust_maturity_assessments for each row execute function public.set_updated_at();
drop trigger if exists set_board_trust_reports_updated_at on public.board_trust_reports;
create trigger set_board_trust_reports_updated_at before update on public.board_trust_reports for each row execute function public.set_updated_at();
drop trigger if exists set_revenue_trust_intelligence_updated_at on public.revenue_trust_intelligence;
create trigger set_revenue_trust_intelligence_updated_at before update on public.revenue_trust_intelligence for each row execute function public.set_updated_at();
drop trigger if exists set_marketplace_trust_policies_updated_at on public.marketplace_trust_policies;
create trigger set_marketplace_trust_policies_updated_at before update on public.marketplace_trust_policies for each row execute function public.set_updated_at();

create index if not exists idx_trust_scorecards_company on public.trust_scorecards(company_id);
create index if not exists idx_trust_scorecards_entity on public.trust_scorecards(entity_type, entity_id);
create index if not exists idx_trust_signals_company on public.trust_signals(company_id);
create index if not exists idx_trust_signals_entity on public.trust_signals(entity_type, entity_id);
create index if not exists idx_customer_trust_profiles_company on public.customer_trust_profiles(company_id);
create index if not exists idx_partner_trust_profiles_company on public.partner_trust_profiles(company_id);
create index if not exists idx_board_trust_reports_company on public.board_trust_reports(company_id);
create index if not exists idx_revenue_trust_company on public.revenue_trust_intelligence(company_id);
create index if not exists idx_marketplace_policies_company on public.marketplace_trust_policies(company_id);
create index if not exists idx_governance_reviews_company on public.marketplace_governance_reviews(company_id);
create index if not exists idx_trust_automation_runs_company on public.trust_automation_runs(company_id);

grant select, insert, update, delete on public.trust_scorecards to authenticated;
grant select, insert, update, delete on public.trust_signals to authenticated;
grant select, insert, update, delete on public.customer_trust_profiles to authenticated;
grant select, insert, update, delete on public.partner_trust_profiles to authenticated;
grant select, insert, update, delete on public.trust_maturity_assessments to authenticated;
grant select, insert, update, delete on public.board_trust_reports to authenticated;
grant select, insert, update, delete on public.board_trust_report_items to authenticated;
grant select, insert, update, delete on public.revenue_trust_intelligence to authenticated;
grant select, insert, update, delete on public.marketplace_trust_policies to authenticated;
grant select, insert, update, delete on public.marketplace_governance_reviews to authenticated;
grant select, insert, update, delete on public.trust_automation_runs to authenticated;
grant all on public.trust_scorecards, public.trust_signals, public.customer_trust_profiles, public.partner_trust_profiles, public.trust_maturity_assessments, public.board_trust_reports, public.board_trust_report_items, public.revenue_trust_intelligence, public.marketplace_trust_policies, public.marketplace_governance_reviews, public.trust_automation_runs to service_role;

alter table public.trust_scorecards enable row level security;
alter table public.trust_signals enable row level security;
alter table public.customer_trust_profiles enable row level security;
alter table public.partner_trust_profiles enable row level security;
alter table public.trust_maturity_assessments enable row level security;
alter table public.board_trust_reports enable row level security;
alter table public.board_trust_report_items enable row level security;
alter table public.revenue_trust_intelligence enable row level security;
alter table public.marketplace_trust_policies enable row level security;
alter table public.marketplace_governance_reviews enable row level security;
alter table public.trust_automation_runs enable row level security;

-- View policies (any company member)
create policy "members view trust scorecards" on public.trust_scorecards for select to authenticated using (public.is_company_member(auth.uid(), company_id));
create policy "members view trust signals" on public.trust_signals for select to authenticated using (public.is_company_member(auth.uid(), company_id));
create policy "members view customer trust profiles" on public.customer_trust_profiles for select to authenticated using (public.is_company_member(auth.uid(), company_id));
create policy "members view partner trust profiles" on public.partner_trust_profiles for select to authenticated using (public.is_company_member(auth.uid(), company_id));
create policy "members view maturity assessments" on public.trust_maturity_assessments for select to authenticated using (public.is_company_member(auth.uid(), company_id));
create policy "members view board trust reports" on public.board_trust_reports for select to authenticated using (public.is_company_member(auth.uid(), company_id));
create policy "members view board report items" on public.board_trust_report_items for select to authenticated using (public.is_company_member(auth.uid(), company_id));
create policy "members view revenue trust" on public.revenue_trust_intelligence for select to authenticated using (public.is_company_member(auth.uid(), company_id));
create policy "members view marketplace policies" on public.marketplace_trust_policies for select to authenticated using (public.is_company_member(auth.uid(), company_id));
create policy "members view governance reviews" on public.marketplace_governance_reviews for select to authenticated using (public.is_company_member(auth.uid(), company_id));
create policy "members view automation runs" on public.trust_automation_runs for select to authenticated using (public.is_company_member(auth.uid(), company_id));

-- Manage policies for operations-level (owner/admin/dispatcher_manager)
create policy "ops manage trust scorecards" on public.trust_scorecards for all to authenticated
using (public.has_role(auth.uid(), company_id, 'owner'::app_role) or public.has_role(auth.uid(), company_id, 'admin'::app_role) or public.has_role(auth.uid(), company_id, 'dispatcher_manager'::app_role))
with check (public.has_role(auth.uid(), company_id, 'owner'::app_role) or public.has_role(auth.uid(), company_id, 'admin'::app_role) or public.has_role(auth.uid(), company_id, 'dispatcher_manager'::app_role));

create policy "ops manage trust signals" on public.trust_signals for all to authenticated
using (public.has_role(auth.uid(), company_id, 'owner'::app_role) or public.has_role(auth.uid(), company_id, 'admin'::app_role) or public.has_role(auth.uid(), company_id, 'dispatcher_manager'::app_role) or public.has_role(auth.uid(), company_id, 'dispatcher'::app_role))
with check (public.has_role(auth.uid(), company_id, 'owner'::app_role) or public.has_role(auth.uid(), company_id, 'admin'::app_role) or public.has_role(auth.uid(), company_id, 'dispatcher_manager'::app_role) or public.has_role(auth.uid(), company_id, 'dispatcher'::app_role));

create policy "ops manage customer trust profiles" on public.customer_trust_profiles for all to authenticated
using (public.has_role(auth.uid(), company_id, 'owner'::app_role) or public.has_role(auth.uid(), company_id, 'admin'::app_role) or public.has_role(auth.uid(), company_id, 'dispatcher_manager'::app_role))
with check (public.has_role(auth.uid(), company_id, 'owner'::app_role) or public.has_role(auth.uid(), company_id, 'admin'::app_role) or public.has_role(auth.uid(), company_id, 'dispatcher_manager'::app_role));

create policy "ops manage partner trust profiles" on public.partner_trust_profiles for all to authenticated
using (public.has_role(auth.uid(), company_id, 'owner'::app_role) or public.has_role(auth.uid(), company_id, 'admin'::app_role) or public.has_role(auth.uid(), company_id, 'dispatcher_manager'::app_role))
with check (public.has_role(auth.uid(), company_id, 'owner'::app_role) or public.has_role(auth.uid(), company_id, 'admin'::app_role) or public.has_role(auth.uid(), company_id, 'dispatcher_manager'::app_role));

create policy "ops manage maturity assessments" on public.trust_maturity_assessments for all to authenticated
using (public.has_role(auth.uid(), company_id, 'owner'::app_role) or public.has_role(auth.uid(), company_id, 'admin'::app_role) or public.has_role(auth.uid(), company_id, 'dispatcher_manager'::app_role))
with check (public.has_role(auth.uid(), company_id, 'owner'::app_role) or public.has_role(auth.uid(), company_id, 'admin'::app_role) or public.has_role(auth.uid(), company_id, 'dispatcher_manager'::app_role));

create policy "execs manage board trust reports" on public.board_trust_reports for all to authenticated
using (public.has_role(auth.uid(), company_id, 'owner'::app_role) or public.has_role(auth.uid(), company_id, 'admin'::app_role))
with check (public.has_role(auth.uid(), company_id, 'owner'::app_role) or public.has_role(auth.uid(), company_id, 'admin'::app_role));

create policy "execs manage board report items" on public.board_trust_report_items for all to authenticated
using (public.has_role(auth.uid(), company_id, 'owner'::app_role) or public.has_role(auth.uid(), company_id, 'admin'::app_role))
with check (public.has_role(auth.uid(), company_id, 'owner'::app_role) or public.has_role(auth.uid(), company_id, 'admin'::app_role));

create policy "ops manage revenue trust" on public.revenue_trust_intelligence for all to authenticated
using (public.has_role(auth.uid(), company_id, 'owner'::app_role) or public.has_role(auth.uid(), company_id, 'admin'::app_role) or public.has_role(auth.uid(), company_id, 'dispatcher_manager'::app_role) or public.has_role(auth.uid(), company_id, 'billing_admin'::app_role))
with check (public.has_role(auth.uid(), company_id, 'owner'::app_role) or public.has_role(auth.uid(), company_id, 'admin'::app_role) or public.has_role(auth.uid(), company_id, 'dispatcher_manager'::app_role) or public.has_role(auth.uid(), company_id, 'billing_admin'::app_role));

create policy "ops manage marketplace policies" on public.marketplace_trust_policies for all to authenticated
using (public.has_role(auth.uid(), company_id, 'owner'::app_role) or public.has_role(auth.uid(), company_id, 'admin'::app_role) or public.has_role(auth.uid(), company_id, 'dispatcher_manager'::app_role))
with check (public.has_role(auth.uid(), company_id, 'owner'::app_role) or public.has_role(auth.uid(), company_id, 'admin'::app_role) or public.has_role(auth.uid(), company_id, 'dispatcher_manager'::app_role));

create policy "ops manage governance reviews" on public.marketplace_governance_reviews for all to authenticated
using (public.has_role(auth.uid(), company_id, 'owner'::app_role) or public.has_role(auth.uid(), company_id, 'admin'::app_role) or public.has_role(auth.uid(), company_id, 'dispatcher_manager'::app_role))
with check (public.has_role(auth.uid(), company_id, 'owner'::app_role) or public.has_role(auth.uid(), company_id, 'admin'::app_role) or public.has_role(auth.uid(), company_id, 'dispatcher_manager'::app_role));

create policy "ops manage automation runs" on public.trust_automation_runs for all to authenticated
using (public.has_role(auth.uid(), company_id, 'owner'::app_role) or public.has_role(auth.uid(), company_id, 'admin'::app_role) or public.has_role(auth.uid(), company_id, 'dispatcher_manager'::app_role))
with check (public.has_role(auth.uid(), company_id, 'owner'::app_role) or public.has_role(auth.uid(), company_id, 'admin'::app_role) or public.has_role(auth.uid(), company_id, 'dispatcher_manager'::app_role));

do $$ begin
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='trust_scorecards') then
    alter publication supabase_realtime add table public.trust_scorecards;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='trust_signals') then
    alter publication supabase_realtime add table public.trust_signals;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='board_trust_reports') then
    alter publication supabase_realtime add table public.board_trust_reports;
  end if;
end $$;

-- Demo seed (only if company exists)
insert into public.trust_scorecards (company_id, entity_type, entity_name, trust_score, maturity_level, reliability_score, compliance_score, communication_score, delivery_score, financial_score, risk_score, summary, recommended_action, metadata)
select '11111111-1111-1111-1111-111111111111'::uuid,'company','Andetrack Enterprise Trust Profile',82.50,'optimized',86,84,79,88,81,18,'Enterprise trust posture is strong with opportunity to improve customer communication consistency and partner governance cadence.','Prioritize partner review automation and customer maturity scoring.','{"demo":true}'::jsonb
where exists (select 1 from public.companies where id='11111111-1111-1111-1111-111111111111')
on conflict (company_id, entity_type, entity_id) do nothing;

insert into public.customer_trust_profiles (company_id, customer_name, trust_score, maturity_level, sla_confidence_score, communication_confidence_score, retention_confidence_score, expansion_confidence_score, churn_risk_score, executive_summary, recommended_action, metadata)
select '11111111-1111-1111-1111-111111111111'::uuid,'DFW Airport Logistics',87,'trusted',91,82,89,76,12,'Customer relationship is stable with strong service confidence and moderate expansion opportunity.','Schedule quarterly trust review and propose expanded lane coverage.','{"demo":true}'::jsonb
where exists (select 1 from public.companies where id='11111111-1111-1111-1111-111111111111')
on conflict (company_id, customer_name) do nothing;

insert into public.partner_trust_profiles (company_id, partner_name, partner_type, trust_score, maturity_level, reliability_score, safety_score, compliance_score, communication_score, financial_score, approval_status, governance_status, executive_summary, recommended_action, metadata)
select '11111111-1111-1111-1111-111111111111'::uuid,'North Texas Carrier Partner','carrier',78,'approved',82,86,80,74,77,'approved','active_monitoring','Partner is approved and reliable, but communication response times should be improved.','Keep active while monitoring response-time signals.','{"demo":true}'::jsonb
where exists (select 1 from public.companies where id='11111111-1111-1111-1111-111111111111')
on conflict (company_id, partner_name) do nothing;

insert into public.marketplace_trust_policies (company_id, policy_name, policy_type, description, minimum_trust_score, minimum_compliance_score, minimum_safety_score, approval_required, auto_suspend_threshold, is_active, metadata)
select '11111111-1111-1111-1111-111111111111'::uuid,'Standard Carrier Marketplace Approval','partner_governance','Minimum trust, compliance, and safety rules for approving marketplace carrier partners.',70,75,80,true,45,true,'{"demo":true}'::jsonb
where exists (select 1 from public.companies where id='11111111-1111-1111-1111-111111111111')
on conflict (company_id, policy_name) do nothing;