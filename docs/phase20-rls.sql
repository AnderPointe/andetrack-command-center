-- Phase 20 — V3.5 RLS examples (illustrative).
-- Assumes helpers: public.current_company(), public.has_role(user, company, role),
-- public.is_platform_owner(user), public.is_customer_user(user, customer).

-- Carrier subscriptions + fees → company-scoped
alter table public.carrier_subscriptions enable row level security;
create policy carrier_subs_company_read on public.carrier_subscriptions
  for select using (company_id = public.current_company());
create policy carrier_subs_company_write on public.carrier_subscriptions
  for all using (
    company_id = public.current_company()
    and public.has_role(auth.uid(), company_id, 'company_admin')
  );

alter table public.carrier_marketplace_fees enable row level security;
create policy fees_billing_read on public.carrier_marketplace_fees
  for select using (
    company_id = public.current_company()
    and (
      public.has_role(auth.uid(), company_id, 'billing_admin')
      or public.has_role(auth.uid(), company_id, 'company_admin')
    )
  );

-- Carrier verification → company admins manage; carrier portal users see their own only
alter table public.carrier_verification_records enable row level security;
create policy carrier_verif_admin on public.carrier_verification_records
  for all using (
    company_id = public.current_company()
    and public.has_role(auth.uid(), company_id, 'company_admin')
  );

-- Settlements → no client-side updates; admin-only writes, dispatchers read
alter table public.carrier_settlements enable row level security;
create policy settlement_admin_write on public.carrier_settlements
  for all using (
    company_id = public.current_company()
    and public.has_role(auth.uid(), company_id, 'company_admin')
  );
create policy settlement_dispatcher_read on public.carrier_settlements
  for select using (
    company_id = public.current_company()
    and public.has_role(auth.uid(), company_id, 'dispatcher')
  );

-- Partner portal users see only their own partner records
alter table public.partner_profiles enable row level security;
create policy partner_portal_self on public.partner_profiles
  for select using (
    exists (
      select 1 from public.partner_portal_users ppu
      where ppu.partner_id = partner_profiles.id and ppu.user_id = auth.uid()
    )
    or company_id = public.current_company()
  );

-- Telematics → company-scoped reads; driver behavior restricted to admin
alter table public.telematics_vehicle_health_scores enable row level security;
create policy telem_vehicle_company_read on public.telematics_vehicle_health_scores
  for select using (company_id = public.current_company());

alter table public.telematics_driver_behavior_scores enable row level security;
create policy telem_driver_admin_read on public.telematics_driver_behavior_scores
  for select using (
    company_id = public.current_company()
    and (
      public.has_role(auth.uid(), company_id, 'company_admin')
      or public.has_role(auth.uid(), company_id, 'safety_manager')
    )
  );

-- Certification / questionnaire / packets → admin + security role only
alter table public.certification_projects enable row level security;
create policy cert_admin_only on public.certification_projects
  for all using (
    company_id = public.current_company()
    and (
      public.has_role(auth.uid(), company_id, 'company_admin')
      or public.has_role(auth.uid(), company_id, 'security_admin')
    )
  );

alter table public.security_questionnaire_exports enable row level security;
create policy qa_export_admin_only on public.security_questionnaire_exports
  for all using (
    company_id = public.current_company()
    and public.has_role(auth.uid(), company_id, 'company_admin')
  );

-- Procurement → admin / commercial role only
alter table public.procurement_projects enable row level security;
create policy procurement_admin on public.procurement_projects
  for all using (
    company_id = public.current_company()
    and (
      public.has_role(auth.uid(), company_id, 'company_admin')
      or public.has_role(auth.uid(), company_id, 'commercial_admin')
    )
  );

-- Customer users cannot see internal carrier marketplace data — no policy granted; default deny applies.

-- Platform revenue → platform owners only
alter table public.commercial_revenue_events enable row level security;
create policy platform_revenue_owner on public.commercial_revenue_events
  for select using (public.is_platform_owner(auth.uid()));

alter table public.platform_revenue_summaries enable row level security;
create policy platform_summary_owner on public.platform_revenue_summaries
  for select using (public.is_platform_owner(auth.uid()));

-- Regional metrics → company scope
alter table public.regional_operations_metrics enable row level security;
create policy regional_company_read on public.regional_operations_metrics
  for select using (company_id = public.current_company());
