-- Phase 32 — V9.5 RLS examples. Mock / illustrative.
-- Assumes helpers from existing schema: public.current_company(), public.has_role(uid, company_id, role).

-- Tenant-scoped read: enterprise trust scores
alter table public.v95_enterprise_trust_scores enable row level security;
create policy v95_trust_read
  on public.v95_enterprise_trust_scores
  for select
  using (company_id = public.current_company());

-- Board / executive only: investor + board records
alter table public.board_investor_discipline_records enable row level security;
create policy v95_board_read
  on public.board_investor_discipline_records
  for select
  using (
    public.has_role(auth.uid(), company_id, 'board')
    or public.has_role(auth.uid(), company_id, 'executive')
  );

-- Security / compliance / admin: certification evidence
alter table public.certification_evidence_maturity_records enable row level security;
create policy v95_cert_evidence_read
  on public.certification_evidence_maturity_records
  for select
  using (
    public.has_role(auth.uid(), company_id, 'security')
    or public.has_role(auth.uid(), company_id, 'compliance')
    or public.has_role(auth.uid(), company_id, 'admin')
  );

-- Customer success / security / admin: procurement
alter table public.procurement_trust_records enable row level security;
create policy v95_procurement_read
  on public.procurement_trust_records
  for select
  using (
    public.has_role(auth.uid(), company_id, 'customer_success')
    or public.has_role(auth.uid(), company_id, 'security')
    or public.has_role(auth.uid(), company_id, 'admin')
  );

-- Admin / security: AI governance maturity
alter table public.ai_governance_maturity_records_v95 enable row level security;
create policy v95_ai_gov_read
  on public.ai_governance_maturity_records_v95
  for select
  using (
    public.has_role(auth.uid(), company_id, 'admin')
    or public.has_role(auth.uid(), company_id, 'security')
  );

-- Finance role: financial governance maturity
alter table public.financial_governance_maturity_records enable row level security;
create policy v95_fin_gov_read
  on public.financial_governance_maturity_records
  for select
  using (
    public.has_role(auth.uid(), company_id, 'billing')
    or public.has_role(auth.uid(), company_id, 'admin')
  );

-- Marketplace role: MP intelligence + quality
alter table public.marketplace_intelligence_records_v95 enable row level security;
create policy v95_mp_read
  on public.marketplace_intelligence_records_v95
  for select
  using (
    public.has_role(auth.uid(), company_id, 'marketplace')
    or public.has_role(auth.uid(), company_id, 'admin')
  );

-- Inserts/updates: writes restricted to admin role; non-admin paths go through createServerFn.
create policy v95_trust_write
  on public.v95_enterprise_trust_scores
  for insert
  with check (
    company_id = public.current_company()
    and public.has_role(auth.uid(), company_id, 'admin')
  );
