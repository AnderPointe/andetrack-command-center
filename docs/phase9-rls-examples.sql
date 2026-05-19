-- Phase 9 — RLS examples for AI Operations Intelligence tables.
-- Assumes Phase 6 helpers: public.is_company_member, public.can_manage_company,
-- public.has_role, public.current_company.

-- All tables: enable RLS
alter table public.predictive_risks      enable row level security;
alter table public.ai_recommendations    enable row level security;
alter table public.ops_health_snapshots  enable row level security;
alter table public.ai_action_audit       enable row level security;
alter table public.ai_usage_daily        enable row level security;
alter table public.ai_budgets            enable row level security;
alter table public.predictive_model_runs enable row level security;

-- predictive_risks: tenant read; only server (service role) writes.
create policy "risks: tenant read"
on public.predictive_risks for select to authenticated
using (public.is_company_member(auth.uid(), company_id));

-- ai_recommendations: tenant read; tenant write ONLY to decision columns,
-- and only when the user has the required approval level.
create policy "recs: tenant read"
on public.ai_recommendations for select to authenticated
using (public.is_company_member(auth.uid(), company_id));

create policy "recs: dispatcher can decide dispatcher-level"
on public.ai_recommendations for update to authenticated
using (
  public.is_company_member(auth.uid(), company_id)
  and approval_required = 'dispatcher'
  and public.has_role(auth.uid(), company_id, 'dispatcher')
)
with check (status in ('approved','rejected'));

create policy "recs: manager can decide manager-level"
on public.ai_recommendations for update to authenticated
using (
  public.is_company_member(auth.uid(), company_id)
  and approval_required = 'dispatcher_manager'
  and public.has_role(auth.uid(), company_id, 'dispatcher_manager')
)
with check (status in ('approved','rejected'));

-- ops_health_snapshots: tenant read only.
create policy "health: tenant read"
on public.ops_health_snapshots for select to authenticated
using (public.is_company_member(auth.uid(), company_id));

-- ai_action_audit: tenant read; only server inserts (no client write policy).
create policy "audit: tenant read"
on public.ai_action_audit for select to authenticated
using (public.is_company_member(auth.uid(), company_id));

-- ai_usage_daily: tenant read; admin role only for visibility into cost.
create policy "usage: admin read"
on public.ai_usage_daily for select to authenticated
using (
  public.is_company_member(auth.uid(), company_id)
  and (
    public.has_role(auth.uid(), company_id, 'owner')
    or public.has_role(auth.uid(), company_id, 'admin')
    or public.has_role(auth.uid(), company_id, 'billing_admin')
  )
);

-- ai_budgets: only company admins can read or update.
create policy "budgets: admin read"
on public.ai_budgets for select to authenticated
using (public.can_manage_company(auth.uid(), company_id));

create policy "budgets: admin update"
on public.ai_budgets for update to authenticated
using (public.can_manage_company(auth.uid(), company_id))
with check (public.can_manage_company(auth.uid(), company_id));

-- predictive_model_runs: tenant read; service role writes.
create policy "model_runs: tenant read"
on public.predictive_model_runs for select to authenticated
using (company_id is null or public.is_company_member(auth.uid(), company_id));

-- DENY-by-default reminder:
--   No INSERT/DELETE policies are granted to `authenticated`. Server functions
--   running with the service role perform all writes for risks, recommendation
--   generation, audit inserts, and usage accounting. This keeps the AI engine
--   the single writer and prevents tenant-side data poisoning.
