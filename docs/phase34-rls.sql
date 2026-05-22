-- Phase 34 — V10.5 RLS examples. Illustrative, mock-only.
-- Use existing has_role(), is_company_member(), current_company(), is_platform_owner() helpers.

-- v105_commercial_scale_scores
create policy "company members view scale scores"
  on public.v105_commercial_scale_scores for select
  using (is_company_member(auth.uid(), company_id));

-- enterprise_commercial_opportunities (sales users see assigned opps via owner_id)
create policy "sales sees assigned opportunities"
  on public.enterprise_commercial_opportunities for select
  using (owner_id = auth.uid() or has_role(auth.uid(), company_id, 'admin'));

-- enterprise_deal_desk_requests
create policy "deal desk restricted to sales + rev ops + execs"
  on public.enterprise_deal_desk_requests for select
  using (
    has_role(auth.uid(), company_id, 'admin')
    or has_role(auth.uid(), company_id, 'owner')
  );

-- procurement_acceleration_requests
create policy "security + sales see procurement"
  on public.procurement_acceleration_requests for select
  using (is_company_member(auth.uid(), company_id));

-- customer_proof_assets — only approved assets visible externally
create policy "approved customer proof readable internally"
  on public.customer_proof_assets for select
  using (status = 'approved' or has_role(auth.uid(), company_id, 'admin'));

-- marketplace_proof_assets
create policy "approved mp proof readable internally"
  on public.marketplace_proof_assets for select
  using (status = 'approved' or is_platform_owner(auth.uid()));

-- strategic_capital_readiness_items / capital_data_room_items / board_growth_governance_items
create policy "capital + board restricted to executives"
  on public.strategic_capital_readiness_items for select
  using (has_role(auth.uid(), company_id, 'owner') or is_platform_owner(auth.uid()));

create policy "data room executive only"
  on public.capital_data_room_items for select
  using (has_role(auth.uid(), company_id, 'owner') or is_platform_owner(auth.uid()));

create policy "board growth governance executive only"
  on public.board_growth_governance_items for select
  using (has_role(auth.uid(), company_id, 'owner') or is_platform_owner(auth.uid()));

-- pricing_package_governance_records — revenue-ops + execs
create policy "pricing governance restricted"
  on public.pricing_package_governance_records for select
  using (has_role(auth.uid(), company_id, 'admin'));

-- Customer / carrier / partner users do NOT get policies for these tables.
