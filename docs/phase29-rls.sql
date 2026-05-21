-- Phase 29 — V8 RLS examples (proposed, not applied).
-- Helpers from earlier phases: public.is_company_member, public.can_manage_company,
-- public.has_role, public.is_platform_owner.

-- Enable RLS on every V8 table.
alter table public.v8_global_scale_scores                  enable row level security;
alter table public.global_operating_network_metrics        enable row level security;
alter table public.country_operating_centers               enable row level security;
alter table public.country_operating_health_scores         enable row level security;
alter table public.international_marketplace_metrics       enable row level security;
alter table public.regional_marketplace_liquidity_metrics  enable row level security;
alter table public.international_carrier_operations        enable row level security;
alter table public.carrier_country_eligibility_rules       enable row level security;
alter table public.cross_border_operating_controls         enable row level security;
alter table public.financial_control_maturity_records      enable row level security;
alter table public.revenue_reconciliation_maturity_records enable row level security;
alter table public.global_billing_control_events           enable row level security;
alter table public.country_billing_control_records         enable row level security;
alter table public.advanced_compliance_execution_records   enable row level security;
alter table public.country_compliance_execution_records    enable row level security;
alter table public.global_customer_success_operations      enable row level security;
alter table public.international_support_operations        enable row level security;
alter table public.global_partner_operations               enable row level security;
alter table public.executive_strategic_decisions           enable row level security;
alter table public.board_global_strategy_reports           enable row level security;
alter table public.global_risk_control_records             enable row level security;
alter table public.global_product_adoption_metrics         enable row level security;
alter table public.regional_expansion_decisions            enable row level security;
alter table public.long_term_global_operating_models       enable row level security;
alter table public.v8_report_runs                          enable row level security;

-- 1. Platform-wide scale & network metrics — platform owners only.
create policy "platform owners read scale" on public.v8_global_scale_scores
  for select using (public.is_platform_owner(auth.uid()));

create policy "platform owners read network metrics" on public.global_operating_network_metrics
  for select using (public.is_platform_owner(auth.uid()));

-- 2. Country operating centers — platform/executive restricted.
create policy "platform owners manage country centers" on public.country_operating_centers
  for all using (public.is_platform_owner(auth.uid()))
  with check (public.is_platform_owner(auth.uid()));

create policy "platform owners read country health" on public.country_operating_health_scores
  for select using (public.is_platform_owner(auth.uid()));

-- 3. Carrier ops — tenant rows visible to that company's admins; platform owner global view.
create policy "company admins read carrier ops" on public.international_carrier_operations
  for select using (
    (company_id is not null and public.can_manage_company(auth.uid(), company_id))
    or public.is_platform_owner(auth.uid())
  );

create policy "company admins write carrier ops" on public.international_carrier_operations
  for all using (
    (company_id is not null and public.can_manage_company(auth.uid(), company_id))
    or public.is_platform_owner(auth.uid())
  )
  with check (
    (company_id is not null and public.can_manage_company(auth.uid(), company_id))
    or public.is_platform_owner(auth.uid())
  );

-- Eligibility rules — platform-wide read for any authenticated tenant; write platform-only.
create policy "any tenant read eligibility rules" on public.carrier_country_eligibility_rules
  for select to authenticated using (true);
create policy "platform owners write eligibility rules" on public.carrier_country_eligibility_rules
  for all using (public.is_platform_owner(auth.uid()))
  with check (public.is_platform_owner(auth.uid()));

-- 4. Cross-border controls — company-scoped.
create policy "company members read crossborder" on public.cross_border_operating_controls
  for select using (
    public.is_company_member(auth.uid(), company_id)
    or public.is_platform_owner(auth.uid())
  );

create policy "company admins write crossborder" on public.cross_border_operating_controls
  for all using (public.can_manage_company(auth.uid(), company_id))
  with check (public.can_manage_company(auth.uid(), company_id));

-- 5. Financial control maturity + revenue reconciliation — billing/executive only.
create policy "billing/exec read fin maturity" on public.financial_control_maturity_records
  for select using (
    public.is_platform_owner(auth.uid())
    or exists (
      select 1 from public.user_roles ur
      where ur.user_id = auth.uid() and ur.role in ('billing_admin','owner','admin')
    )
  );

create policy "billing/exec read revenue recon" on public.revenue_reconciliation_maturity_records
  for select using (
    public.is_platform_owner(auth.uid())
    or exists (
      select 1 from public.user_roles ur
      where ur.user_id = auth.uid() and ur.role in ('billing_admin','owner','admin')
    )
  );

-- 6. Global billing events — company-scoped read for billing admins; platform sees all.
create policy "billing admins read billing events" on public.global_billing_control_events
  for select using (
    public.is_platform_owner(auth.uid())
    or (
      company_id is not null
      and public.has_role(auth.uid(), company_id, 'billing_admin')
    )
  );

create policy "platform owners read country billing" on public.country_billing_control_records
  for select using (public.is_platform_owner(auth.uid()));

-- 7. Compliance execution — admin/security/compliance restricted.
create policy "admin/security read compliance exec" on public.advanced_compliance_execution_records
  for select using (
    public.is_platform_owner(auth.uid())
    or exists (
      select 1 from public.user_roles ur
      where ur.user_id = auth.uid() and ur.role in ('owner','admin')
    )
  );

create policy "admin/security read country compliance" on public.country_compliance_execution_records
  for select using (
    public.is_platform_owner(auth.uid())
    or exists (
      select 1 from public.user_roles ur
      where ur.user_id = auth.uid() and ur.role in ('owner','admin')
    )
  );

-- 8. Customer success ops — company admins + platform owners.
create policy "company admins read CS ops" on public.global_customer_success_operations
  for select using (
    public.is_platform_owner(auth.uid())
    or (company_id is not null and public.can_manage_company(auth.uid(), company_id))
  );

-- 9. Support, partner, risk, adoption, operating model — platform/executive read.
create policy "platform owners read support ops" on public.international_support_operations
  for select using (public.is_platform_owner(auth.uid()));

create policy "platform owners read partner ops" on public.global_partner_operations
  for select using (public.is_platform_owner(auth.uid()));

create policy "platform owners read risk records" on public.global_risk_control_records
  for select using (public.is_platform_owner(auth.uid()));

create policy "platform owners read adoption" on public.global_product_adoption_metrics
  for select using (public.is_platform_owner(auth.uid()));

create policy "platform owners read operating model" on public.long_term_global_operating_models
  for select using (public.is_platform_owner(auth.uid()));

-- 10. Executive decisions, board reports, expansion decisions — executive/board-restricted.
create policy "executives manage decisions" on public.executive_strategic_decisions
  for all using (
    public.is_platform_owner(auth.uid())
    or exists (
      select 1 from public.user_roles ur
      where ur.user_id = auth.uid() and ur.role in ('owner','admin')
    )
  )
  with check (
    public.is_platform_owner(auth.uid())
    or exists (
      select 1 from public.user_roles ur
      where ur.user_id = auth.uid() and ur.role in ('owner','admin')
    )
  );

create policy "executives read board reports" on public.board_global_strategy_reports
  for select using (
    public.is_platform_owner(auth.uid())
    or exists (
      select 1 from public.user_roles ur
      where ur.user_id = auth.uid() and ur.role in ('owner','admin')
    )
  );

create policy "executives manage expansion decisions" on public.regional_expansion_decisions
  for all using (
    public.is_platform_owner(auth.uid())
    or exists (
      select 1 from public.user_roles ur
      where ur.user_id = auth.uid() and ur.role in ('owner','admin')
    )
  )
  with check (
    public.is_platform_owner(auth.uid())
    or exists (
      select 1 from public.user_roles ur
      where ur.user_id = auth.uid() and ur.role in ('owner','admin')
    )
  );

-- 11. Customer / carrier / partner portal users have NO policies on V8 internal tables
--     (RLS default-deny blocks them). Surface what they need via dedicated views
--     or server functions that project safe columns.
