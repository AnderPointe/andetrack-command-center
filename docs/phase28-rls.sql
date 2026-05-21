-- Phase 28 — V7.5 RLS examples
-- Enable RLS on all new tables and apply role-restricted policies.

alter table public.regulated_customer_onboarding_projects enable row level security;
create policy "company admins view their regulated onboarding"
  on public.regulated_customer_onboarding_projects for select
  using (
    company_id = public.current_company()
    and (public.has_role(auth.uid(), company_id, 'admin')
      or public.has_role(auth.uid(), company_id, 'owner'))
  );

alter table public.international_customer_success_records enable row level security;
create policy "company admins view their intl customer success"
  on public.international_customer_success_records for select
  using (
    company_id = public.current_company()
    and (public.has_role(auth.uid(), company_id, 'admin')
      or public.has_role(auth.uid(), company_id, 'owner')
      or public.has_role(auth.uid(), company_id, 'dispatcher'))
  );

alter table public.global_expansion_execution_items enable row level security;
create policy "platform owners view expansion execution"
  on public.global_expansion_execution_items for select
  using (public.is_platform_owner(auth.uid()));

alter table public.country_launches enable row level security;
create policy "platform owners manage country launches"
  on public.country_launches for all
  using (public.is_platform_owner(auth.uid()))
  with check (public.is_platform_owner(auth.uid()));

alter table public.financial_audit_readiness_items_v75 enable row level security;
create policy "platform owners view financial audit v75"
  on public.financial_audit_readiness_items_v75 for select
  using (public.is_platform_owner(auth.uid()));

alter table public.revenue_reconciliation_placeholders enable row level security;
create policy "platform owners view recon placeholders"
  on public.revenue_reconciliation_placeholders for select
  using (public.is_platform_owner(auth.uid()));

alter table public.data_residency_execution_items enable row level security;
create policy "platform owners view data residency"
  on public.data_residency_execution_items for select
  using (public.is_platform_owner(auth.uid()));

alter table public.regulated_customer_control_packs enable row level security;
create policy "company admins view their control packs"
  on public.regulated_customer_control_packs for select
  using (
    company_id = public.current_company()
    and (public.has_role(auth.uid(), company_id, 'admin')
      or public.has_role(auth.uid(), company_id, 'owner'))
  );

alter table public.international_partner_launches enable row level security;
create policy "platform owners manage intl partner launches"
  on public.international_partner_launches for all
  using (public.is_platform_owner(auth.uid()))
  with check (public.is_platform_owner(auth.uid()));

alter table public.global_marketplace_operating_controls enable row level security;
create policy "platform owners view marketplace controls"
  on public.global_marketplace_operating_controls for select
  using (public.is_platform_owner(auth.uid()));

alter table public.global_launch_approval_requests enable row level security;
create policy "platform owners manage launch approvals"
  on public.global_launch_approval_requests for all
  using (public.is_platform_owner(auth.uid()))
  with check (public.is_platform_owner(auth.uid()));

-- Customer users, carrier users, partner users:
-- DO NOT add policies that grant them access to expansion, country, partner
-- launch, financial recon, residency, or marketplace control records.
-- Absence of permissive policies = no access under RLS.
