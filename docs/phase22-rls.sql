-- Phase 22 (V4.5) — RLS examples
-- Re-uses helpers: current_company(), has_role(), is_platform_owner(), is_customer_user()

alter table public.automation_approvals enable row level security;
create policy auto_appr_read on public.automation_approvals
  for select using (company_id = public.current_company() or public.is_platform_owner(auth.uid()));
create policy auto_appr_write on public.automation_approvals
  for insert with check (company_id = public.current_company());
create policy auto_appr_decide on public.automation_approvals
  for update using (
    company_id = public.current_company()
    and (public.has_role(auth.uid(), company_id, 'admin')
         or public.has_role(auth.uid(), company_id, 'dispatcher'))
  );

alter table public.marketplace_disputes enable row level security;
create policy mp_dispute_read on public.marketplace_disputes
  for select using (
    public.is_platform_owner(auth.uid())
    or (company_id = public.current_company()
        and (public.has_role(auth.uid(), company_id, 'admin')
             or public.has_role(auth.uid(), company_id, 'dispatcher')))
  );

alter table public.carrier_quality_scores enable row level security;
create policy carrier_q_read on public.carrier_quality_scores
  for select using (
    company_id = public.current_company()
    or public.is_platform_owner(auth.uid())
  );

alter table public.soc2_controls enable row level security;
create policy soc2_read on public.soc2_controls
  for select using (
    public.is_platform_owner(auth.uid())
    or public.has_role(auth.uid(), public.current_company(), 'admin')
  );
alter table public.soc2_evidence_items enable row level security;
create policy soc2_ev_read on public.soc2_evidence_items
  for select using (
    public.is_platform_owner(auth.uid())
    or public.has_role(auth.uid(), public.current_company(), 'admin')
  );
alter table public.soc2_remediation_items enable row level security;
create policy soc2_rem_read on public.soc2_remediation_items
  for select using (
    public.is_platform_owner(auth.uid())
    or public.has_role(auth.uid(), public.current_company(), 'admin')
  );

alter table public.mobile_launch_tasks enable row level security;
create policy mobile_launch_admin on public.mobile_launch_tasks
  for all using (public.is_platform_owner(auth.uid()))
  with check (public.is_platform_owner(auth.uid()));

alter table public.acquisition_readiness_items enable row level security;
create policy acq_ready_platform on public.acquisition_readiness_items
  for select using (public.is_platform_owner(auth.uid()));

alter table public.due_diligence_packets enable row level security;
create policy dd_packets_platform on public.due_diligence_packets
  for all using (public.is_platform_owner(auth.uid()))
  with check (public.is_platform_owner(auth.uid()));

alter table public.procurement_packets enable row level security;
create policy procurement_read on public.procurement_packets
  for select using (
    company_id = public.current_company()
    or public.is_platform_owner(auth.uid())
  );

alter table public.ai_governance_maturity_metrics enable row level security;
create policy ai_gov_admin on public.ai_governance_maturity_metrics
  for select using (
    public.has_role(auth.uid(), company_id, 'admin')
    or public.is_platform_owner(auth.uid())
  );

alter table public.revenue_operations_maturity_metrics enable row level security;
create policy rev_ops_billing on public.revenue_operations_maturity_metrics
  for select using (public.is_platform_owner(auth.uid()));

alter table public.support_maturity_metrics enable row level security;
create policy support_lead_read on public.support_maturity_metrics
  for select using (
    company_id = public.current_company()
    and (public.has_role(auth.uid(), company_id, 'admin')
         or public.has_role(auth.uid(), company_id, 'support_lead'))
  );

-- Customer users blocked from internal maturity tables: simply do not grant policies for them.
-- Carrier users blocked from marketplace internals: no policy granting their role on these tables.
-- Partner-specific records: add per-partner predicates similar to procurement_packets above.
