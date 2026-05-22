-- Phase 33 — V10 RLS examples. Mock / illustrative.
-- Helpers assumed: public.current_company(), public.has_role(uid, company_id, role), public.is_platform_owner(uid).

alter table public.v10_category_leadership_scores enable row level security;
create policy v10_cat_read on public.v10_category_leadership_scores
  for select using (public.is_platform_owner(auth.uid()));

alter table public.customer_outcome_records enable row level security;
create policy v10_outcome_read on public.customer_outcome_records
  for select using (
    company_id = public.current_company()
    and (public.has_role(auth.uid(), company_id, 'admin')
      or public.has_role(auth.uid(), company_id, 'customer_success'))
  );

alter table public.board_investor_narratives enable row level security;
create policy v10_narrative_read on public.board_investor_narratives
  for select using (
    public.has_role(auth.uid(), company_id, 'executive')
    or public.has_role(auth.uid(), company_id, 'board')
  );

alter table public.competitive_category_positioning enable row level security;
create policy v10_compete_read on public.competitive_category_positioning
  for select using (
    public.has_role(auth.uid(), company_id, 'admin')
    or public.has_role(auth.uid(), company_id, 'pmm')
    or public.has_role(auth.uid(), company_id, 'sales')
  );

alter table public.procurement_security_sales_requests enable row level security;
create policy v10_proc_read on public.procurement_security_sales_requests
  for select using (
    public.has_role(auth.uid(), company_id, 'sales')
    or public.has_role(auth.uid(), company_id, 'security')
    or public.has_role(auth.uid(), company_id, 'customer_success')
  );

-- Enterprise proof points: approved-only to sales role; pmm/admin see all
alter table public.enterprise_proof_points enable row level security;
create policy v10_proof_sales_read on public.enterprise_proof_points
  for select using (
    status = 'approved'
    and public.has_role(auth.uid(), company_id, 'sales')
  );
create policy v10_proof_pmm_read on public.enterprise_proof_points
  for select using (
    public.has_role(auth.uid(), company_id, 'pmm')
    or public.has_role(auth.uid(), company_id, 'admin')
  );

-- Partner role sees approved partner-facing partner-value rows only
alter table public.partner_ecosystem_value_records enable row level security;
create policy v10_partner_read on public.partner_ecosystem_value_records
  for select using (
    public.has_role(auth.uid(), company_id, 'partner')
    and partner_facing = true
  );

alter table public.product_line_durability_monetization enable row level security;
create policy v10_product_read on public.product_line_durability_monetization
  for select using (
    public.has_role(auth.uid(), company_id, 'product')
    or public.has_role(auth.uid(), company_id, 'executive')
  );

-- Trust collateral publishing requires admin/security approval (write guard)
alter table public.trust_sales_assets enable row level security;
create policy v10_trust_asset_publish on public.trust_sales_assets
  for update using (
    public.has_role(auth.uid(), company_id, 'admin')
    or public.has_role(auth.uid(), company_id, 'security')
  );

-- Customers / carriers must NOT see internal category, investor, MP economics,
-- competitive, or proof-internal records. Achieved by omitting any policy that
-- grants them access (default-deny under RLS).
