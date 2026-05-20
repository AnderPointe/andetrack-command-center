-- Phase 14 — RLS examples
--
-- Tenant-owned tables are scoped by company_id using has_role() and
-- current_company() helpers already in the project. Platform-owner reads
-- bypass company scoping. Customers cannot see internal triage.

alter table public.pilot_reviews              enable row level security;
alter table public.product_feedback_items     enable row level security;
alter table public.bug_reports                enable row level security;
alter table public.support_tickets            enable row level security;
alter table public.customer_success_accounts  enable row level security;
alter table public.onboarding_tasks           enable row level security;
alter table public.pilot_conversion_reviews   enable row level security;
alter table public.data_quality_issues        enable row level security;
alter table public.training_progress          enable row level security;

-- Company admins can read their own pilot review
create policy "Admins read own pilot review"
on public.pilot_reviews for select
to authenticated
using (
  public.has_role(auth.uid(), company_id, 'admin')
  or public.has_role(auth.uid(), company_id, 'owner')
  or public.is_platform_owner(auth.uid())
);

-- Dispatchers can submit feedback for their company
create policy "Members submit feedback"
on public.product_feedback_items for insert
to authenticated
with check (
  public.is_company_member(auth.uid(), company_id)
  and user_id = auth.uid()
);

create policy "Members read own-company feedback (non-customer)"
on public.product_feedback_items for select
to authenticated
using (
  public.is_company_member(auth.uid(), company_id)
  and user_role <> 'customer'
);

-- Customer-portal users can submit and read only their own customer feedback
create policy "Customer users submit feedback"
on public.product_feedback_items for insert
to authenticated
with check (user_id = auth.uid() and user_role = 'customer');

-- Internal bug triage stays invisible to customers
create policy "Members read bugs"
on public.bug_reports for select
to authenticated
using (
  public.is_platform_owner(auth.uid())
  or (company_id is not null and public.can_manage_company(auth.uid(), company_id))
);

-- Support tickets — opener + company managers + platform owner
create policy "Read own/company tickets"
on public.support_tickets for select
to authenticated
using (
  opened_by = auth.uid()
  or public.can_manage_company(auth.uid(), company_id)
  or public.is_platform_owner(auth.uid())
);

create policy "Members open tickets"
on public.support_tickets for insert
to authenticated
with check (
  public.is_company_member(auth.uid(), company_id)
  and opened_by = auth.uid()
);

-- Customer success — admins/owners + platform owner
create policy "Account health visibility"
on public.customer_success_accounts for select
to authenticated
using (
  public.has_role(auth.uid(), company_id, 'admin')
  or public.has_role(auth.uid(), company_id, 'owner')
  or public.is_platform_owner(auth.uid())
);

-- Onboarding tasks — company members
create policy "Members manage onboarding"
on public.onboarding_tasks for all
to authenticated
using (public.is_company_member(auth.uid(), company_id))
with check (public.is_company_member(auth.uid(), company_id));

-- Training progress — the user, or their company admin
create policy "Read own training progress"
on public.training_progress for select
to authenticated
using (
  user_id = auth.uid()
  or public.can_manage_company(auth.uid(), company_id)
);

create policy "Write own training progress"
on public.training_progress for insert
to authenticated
with check (user_id = auth.uid() and public.is_company_member(auth.uid(), company_id));

-- Pilot conversion — admins/owners + platform owner
create policy "Read conversion review"
on public.pilot_conversion_reviews for select
to authenticated
using (
  public.has_role(auth.uid(), company_id, 'admin')
  or public.has_role(auth.uid(), company_id, 'owner')
  or public.is_platform_owner(auth.uid())
);

-- Data quality — managers
create policy "Read company data issues"
on public.data_quality_issues for select
to authenticated
using (
  company_id is null
  or public.can_manage_company(auth.uid(), company_id)
  or public.is_platform_owner(auth.uid())
);
