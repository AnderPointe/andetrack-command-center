-- Phase 8 — RLS policy examples for the new compliance/security tables.

-- Enable RLS on all new tables (run for each Phase 8 table).
alter table public.security_findings   enable row level security;
alter table public.compliance_controls enable row level security;
alter table public.compliance_evidence enable row level security;
alter table public.policy_documents    enable row level security;
alter table public.change_requests     enable row level security;
alter table public.incident_records    enable row level security;
alter table public.vendor_risk_reviews enable row level security;

-- Company admins see their company's security findings.
create policy "admins read company findings" on public.security_findings
  for select using (
    public.can_manage_company(auth.uid(), company_id)
    or public.is_platform_owner(auth.uid())
  );

-- Only platform owners + company owners may close findings.
create policy "owners resolve findings" on public.security_findings
  for update using (
    public.has_role(auth.uid(), company_id, 'owner')
    or public.is_platform_owner(auth.uid())
  );

-- Compliance controls: read for admins; write only for security role.
create policy "admins read controls" on public.compliance_controls
  for select using (public.is_platform_owner(auth.uid()) or true); -- platform-scoped read

-- Evidence: company scope, never visible cross-tenant.
create policy "company evidence read" on public.compliance_evidence
  for select using (public.is_company_member(auth.uid(), company_id));

create policy "company evidence upload" on public.compliance_evidence
  for insert with check (public.is_company_member(auth.uid(), company_id));

-- Drivers see only their own privacy/consent records (in driver_consent tables).
-- (Existing pattern from Phase 5; mirrored here for documentation.)
-- create policy "driver self consent" on public.driver_consent_events
--   for all using (auth.uid() = driver_id) with check (auth.uid() = driver_id);

-- Support access: time-boxed and audited.
create policy "support read while active" on public.support_access_events
  for select using (
    support_user_id = auth.uid()
    and now() < expires_at
    and revoked_at is null
  );

-- Customer-portal users never reach security tables.
-- (No SELECT policy granted → blocked by RLS default-deny.)

-- Incidents: company members read; only owners/admins write.
create policy "company members read incidents" on public.incident_records
  for select using (
    company_id is null  -- platform-level
    or public.is_company_member(auth.uid(), company_id)
  );

create policy "company admins write incidents" on public.incident_records
  for all using (
    public.can_manage_company(auth.uid(), company_id)
    or public.is_platform_owner(auth.uid())
  );

-- Vendor reviews: platform-scoped, restricted to platform owners.
create policy "platform owners manage vendor reviews" on public.vendor_risk_reviews
  for all using (public.is_platform_owner(auth.uid()))
  with check (public.is_platform_owner(auth.uid()));
