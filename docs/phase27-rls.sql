-- Phase 27 RLS examples (illustrative)

-- Company-scoped global readiness
alter table public.v7_global_readiness_scores enable row level security;
create policy "company_admins_view_company_readiness"
  on public.v7_global_readiness_scores for select
  using (
    company_id is not null
    and (public.has_role(auth.uid(), company_id, 'admin')
      or public.has_role(auth.uid(), company_id, 'owner'))
  );
create policy "platform_owners_view_all_readiness"
  on public.v7_global_readiness_scores for select
  using (public.is_platform_owner(auth.uid()));

-- Country / region readiness (platform-owner / executive only)
alter table public.country_region_readiness enable row level security;
create policy "platform_owners_view_country_readiness"
  on public.country_region_readiness for select
  using (public.is_platform_owner(auth.uid()));

-- Data residency (admin/security/legal)
alter table public.data_residency_plans enable row level security;
create policy "admin_view_residency"
  on public.data_residency_plans for select
  using (public.is_platform_owner(auth.uid()));

-- Regulated controls (admin/security/compliance)
alter table public.regulated_control_matrix_items enable row level security;
create policy "admin_view_regulated_controls"
  on public.regulated_control_matrix_items for select
  using (public.is_platform_owner(auth.uid()));

-- Financial maturity / audit readiness (billing/executive)
alter table public.platform_financial_maturity_metrics enable row level security;
create policy "exec_view_financial_maturity"
  on public.platform_financial_maturity_metrics for select
  using (public.is_platform_owner(auth.uid()));

alter table public.financial_audit_readiness_items enable row level security;
create policy "exec_view_audit_readiness"
  on public.financial_audit_readiness_items for select
  using (public.is_platform_owner(auth.uid()));

-- Marketplace intelligence (internal only — customer/carrier users blocked)
alter table public.marketplace_intelligence_metrics_v7 enable row level security;
create policy "internal_view_marketplace_intel"
  on public.marketplace_intelligence_metrics_v7 for select
  using (public.is_platform_owner(auth.uid()));

-- Partner marketplace listings (partner-facing approved rows only)
alter table public.international_partner_marketplace_listings enable row level security;
create policy "partners_view_approved_listings"
  on public.international_partner_marketplace_listings for select
  using (status = 'approved');
create policy "admins_view_all_listings"
  on public.international_partner_marketplace_listings for select
  using (public.is_platform_owner(auth.uid()));

-- Strategic global risks (exec/admin)
alter table public.strategic_global_risks enable row level security;
create policy "exec_view_global_risks"
  on public.strategic_global_risks for select
  using (public.is_platform_owner(auth.uid()));

-- AI governance (admin/security)
alter table public.regulated_ai_governance_policies enable row level security;
create policy "admin_view_ai_gov"
  on public.regulated_ai_governance_policies for select
  using (public.is_platform_owner(auth.uid()));
