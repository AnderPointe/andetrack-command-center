-- Phase 18 — V2.5 RLS policy examples
-- Mirrors the policies enumerated in src/v25/data/mockPhase18.ts V25_RLS_EXAMPLES.

-- EDI trading partners — company admins manage their own
create policy "edi_partners_admin" on public.edi_trading_partners
  for all to authenticated
  using (company_id = current_company() and has_role(auth.uid(), company_id, 'admin'));

-- EDI transmissions — dispatchers can read
create policy "edi_tx_read" on public.edi_transmissions
  for select to authenticated
  using (company_id = current_company() and has_role(auth.uid(), company_id, 'dispatcher'));

-- API products — platform-managed catalog, readable by all
create policy "api_products_read" on public.api_products
  for select to authenticated using (true);

-- API usage events — company-scoped reads
create policy "api_usage_company" on public.api_usage_events
  for select to authenticated
  using (company_id = current_company());

-- API billing events — admin only
create policy "api_billing_admin" on public.api_billing_events
  for select to authenticated
  using (company_id = current_company() and has_role(auth.uid(), company_id, 'admin'));

-- Customer messages — customer users see only their own customer's messages
create policy "cust_msgs_portal" on public.customer_messages
  for select to authenticated
  using (customer_id in (select customer_ids_for_user(auth.uid())));

-- Customer messages — dispatchers manage drafts/approvals
create policy "cust_msgs_dispatch" on public.customer_messages
  for all to authenticated
  using (company_id = current_company() and has_role(auth.uid(), company_id, 'dispatcher'));

-- Company branding — admin only
create policy "branding_admin" on public.company_branding
  for all to authenticated
  using (company_id = current_company() and has_role(auth.uid(), company_id, 'admin'));

-- Custom domains — admin only
create policy "domains_admin" on public.custom_domains
  for all to authenticated
  using (company_id = current_company() and has_role(auth.uid(), company_id, 'admin'));

-- Audit exports — admin only
create policy "audit_export_admin" on public.audit_exports
  for all to authenticated
  using (company_id = current_company() and has_role(auth.uid(), company_id, 'admin'));

-- Data retention policies — admin only
create policy "retention_admin" on public.data_retention_policies
  for all to authenticated
  using (company_id = current_company() and has_role(auth.uid(), company_id, 'admin'));

-- Company locations — company members can read
create policy "locations_member" on public.company_locations
  for select to authenticated
  using (company_id = current_company());

-- Company locations — admin / dispatcher can write
create policy "locations_admin_write" on public.company_locations
  for all to authenticated
  using (company_id = current_company() and (
    has_role(auth.uid(), company_id, 'admin') or
    has_role(auth.uid(), company_id, 'dispatcher')
  ));

-- Fleet scaling metrics — platform owners only (cross-tenant insights)
create policy "scaling_platform" on public.fleet_scaling_metrics
  for select to authenticated
  using (is_platform_owner(auth.uid()));

-- Enterprise onboarding — company-scoped
create policy "onboarding_company" on public.enterprise_onboarding_projects
  for all to authenticated
  using (company_id = current_company() and has_role(auth.uid(), company_id, 'admin'));

-- Enterprise reports — company-scoped admin / dispatcher
create policy "reports_company" on public.enterprise_report_runs
  for all to authenticated
  using (company_id = current_company() and (
    has_role(auth.uid(), company_id, 'admin') or
    has_role(auth.uid(), company_id, 'dispatcher')
  ));
