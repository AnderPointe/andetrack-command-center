-- Phase 26 (V6.5) RLS — illustrative examples. Helpers like has_role,
-- is_platform_owner, current_company already exist (see project DB functions).

-- Company-scoped operating health: admins of the company can read.
alter table public.v65_strategic_operating_scores enable row level security;
create policy v65_scores_company_read on public.v65_strategic_operating_scores
  for select to authenticated using (
    (scope = 'company' and company_id = public.current_company()
       and (public.has_role(auth.uid(), company_id, 'admin')
         or public.has_role(auth.uid(), company_id, 'owner')))
    or (scope = 'platform' and public.is_platform_owner(auth.uid()))
  );

-- Financial controls + revenue rec: billing/admin/executive only.
alter table public.financial_controls enable row level security;
create policy fin_controls_admin_read on public.financial_controls
  for select to authenticated using (public.is_platform_owner(auth.uid()));

alter table public.financial_control_events enable row level security;
create policy fin_events_company_admin on public.financial_control_events
  for select to authenticated using (
    company_id = public.current_company()
    and (public.has_role(auth.uid(), company_id, 'admin')
      or public.has_role(auth.uid(), company_id, 'owner'))
  );

alter table public.revenue_recognition_placeholders enable row level security;
create policy revrec_billing_only on public.revenue_recognition_placeholders
  for select to authenticated using (
    company_id = public.current_company()
    and (public.has_role(auth.uid(), company_id, 'admin')
      or public.has_role(auth.uid(), company_id, 'owner'))
  );

-- Partner revenue share: partner managers + billing/admin roles only.
alter table public.partner_revenue_share_placeholders enable row level security;
create policy partner_revshare_admin on public.partner_revenue_share_placeholders
  for select to authenticated using (
    public.is_platform_owner(auth.uid())
    or (company_id = public.current_company()
        and public.has_role(auth.uid(), company_id, 'admin'))
  );

-- Global expansion + regional compliance: platform owners / executives only.
alter table public.global_expansion_readiness_items enable row level security;
create policy global_expansion_platform on public.global_expansion_readiness_items
  for select to authenticated using (public.is_platform_owner(auth.uid()));

alter table public.regional_compliance_readiness enable row level security;
create policy regional_compliance_platform on public.regional_compliance_readiness
  for select to authenticated using (public.is_platform_owner(auth.uid()));

-- Executive decision records: executive/admin restricted.
alter table public.executive_decision_requests enable row level security;
create policy exec_decisions_platform on public.executive_decision_requests
  for select to authenticated using (public.is_platform_owner(auth.uid()));

-- Risk + control matrix and audit evidence: admin/security/compliance only.
alter table public.risk_control_matrix_items enable row level security;
create policy risk_matrix_platform on public.risk_control_matrix_items
  for select to authenticated using (public.is_platform_owner(auth.uid()));

alter table public.audit_control_evidence_items enable row level security;
create policy audit_evd_platform on public.audit_control_evidence_items
  for select to authenticated using (public.is_platform_owner(auth.uid()));

-- Product-line investment governance: product/executive restricted.
alter table public.product_line_investment_scores enable row level security;
create policy productline_platform on public.product_line_investment_scores
  for select to authenticated using (public.is_platform_owner(auth.uid()));

-- Customer + carrier roles cannot access internal controls, governance,
-- financial, or global expansion records — they have no SELECT policy on
-- these tables and RLS denies by default.

-- Partner users see only approved partner-facing records (illustrative):
-- create policy partner_products_public on public.partner_products
--   for select to authenticated using (
--     exists (select 1 from public.partner_marketplace_listings l
--             where l.id = partner_id and l.status = 'approved')
--   );
