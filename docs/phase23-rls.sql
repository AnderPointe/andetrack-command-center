-- Phase 23 RLS policy EXAMPLES (illustrative — review before applying).
-- Uses existing helpers: has_role, is_company_member, is_platform_owner, current_company.

-- Enable RLS on every Phase 23 table.
alter table public.v5_maturity_scores               enable row level security;
alter table public.marketplace_liquidity_metrics    enable row level security;
alter table public.carrier_supply_demand_metrics    enable row level security;
alter table public.lane_coverage_metrics            enable row level security;
alter table public.marketplace_trust_safety_events  enable row level security;
alter table public.carrier_quality_programs         enable row level security;
alter table public.strategic_partnership_execution  enable row level security;
alter table public.certification_completion_items   enable row level security;
alter table public.soc2_completion_controls         enable row level security;
alter table public.board_reports                    enable row level security;
alter table public.board_report_sections            enable row level security;
alter table public.competitor_profiles              enable row level security;
alter table public.win_loss_records                 enable row level security;
alter table public.mature_revenue_metrics           enable row level security;
alter table public.mature_customer_success_metrics  enable row level security;
alter table public.mature_support_metrics           enable row level security;
alter table public.governance_maturity_reviews      enable row level security;
alter table public.strategic_growth_initiatives     enable row level security;
alter table public.partner_ecosystem_execution      enable row level security;
alter table public.advanced_operating_metrics       enable row level security;
alter table public.national_operations_reviews      enable row level security;
alter table public.data_room_items                  enable row level security;
alter table public.due_diligence_requests           enable row level security;
alter table public.investor_packets                 enable row level security;
alter table public.v5_report_runs                   enable row level security;

-- Company admins see their company V5 maturity records.
create policy "v5 maturity: company admins read"
on public.v5_maturity_scores for select to authenticated
using (
  company_id = public.current_company()
  and (public.has_role(auth.uid(), company_id, 'admin')
       or public.has_role(auth.uid(), company_id, 'owner'))
);

-- Platform owners see all maturity + board records.
create policy "v5 maturity: platform owners read all"
on public.v5_maturity_scores for select to authenticated
using (public.is_platform_owner(auth.uid()));

-- Revenue ops restricted to billing / admin.
create policy "revenue: billing/admin read"
on public.mature_revenue_metrics for select to authenticated
using (
  company_id = public.current_company()
  and (public.has_role(auth.uid(), company_id, 'admin')
       or public.has_role(auth.uid(), company_id, 'billing'))
);

-- Board reports restricted to executive/admin.
create policy "board: exec/admin read"
on public.board_reports for select to authenticated
using (
  public.is_platform_owner(auth.uid())
  or exists (
    select 1 from public.user_roles
    where user_id = auth.uid() and role in ('admin','executive')
  )
);

-- Competitive intel internal only — platform owners.
create policy "competitive: platform read"
on public.competitor_profiles for select to authenticated
using (public.is_platform_owner(auth.uid()));

-- Marketplace liquidity / supply-demand / trust-safety: ops + admin internal only.
create policy "marketplace_ops: internal read"
on public.marketplace_trust_safety_events for select to authenticated
using (
  company_id = public.current_company()
  and (public.has_role(auth.uid(), company_id, 'admin')
       or public.has_role(auth.uid(), company_id, 'dispatcher'))
);

-- Customers users cannot read internal marketplace or revenue tables.
-- (No policy granted to 'customer_user' role.)

-- Carrier user sees their own quality row only (if carrier portal is exposed).
create policy "carrier quality: carrier self read"
on public.carrier_quality_programs for select to authenticated
using (carrier_id = auth.uid());

-- Certification + SOC 2 controls restricted to security/admin.
create policy "soc2: security read"
on public.soc2_completion_controls for select to authenticated
using (
  public.is_platform_owner(auth.uid())
  or exists (
    select 1 from public.user_roles
    where user_id = auth.uid() and role in ('admin','security')
  )
);

-- Data room restricted to platform owners + executives.
create policy "data room: exec read"
on public.data_room_items for select to authenticated
using (
  public.is_platform_owner(auth.uid())
  or exists (
    select 1 from public.user_roles
    where user_id = auth.uid() and role in ('admin','executive')
  )
);

-- Partner ecosystem: partner manager / admin only.
create policy "partner ecosystem: pm/admin read"
on public.partner_ecosystem_execution for select to authenticated
using (
  public.is_platform_owner(auth.uid())
  or exists (
    select 1 from public.user_roles
    where user_id = auth.uid() and role in ('admin','partner_manager')
  )
);
