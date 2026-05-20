-- Phase 13 — RLS examples for pilot operation tables.
-- Apply AFTER docs/phase13-schema.sql. Reuses helpers from phase12-rls.sql:
--   user_has_company_role(_company_id, _roles[])
--   is_platform_owner(_user_id)

-- Enable RLS on all pilot_* tables (idempotent pattern)
do $$
declare t text;
begin
  for t in
    select unnest(array[
      'pilot_test_cases','pilot_test_runs','pilot_test_results',
      'pilot_bugs','pilot_bug_comments','pilot_readiness_checks','pilot_blockers',
      'pilot_company_setups','pilot_training_modules','pilot_training_progress',
      'pilot_support_tickets','pilot_go_live_phases','pilot_smoke_tests',
      'pilot_metrics','pilot_feedback','pilot_surveys','pilot_survey_responses',
      'pilot_escalations','pilot_incidents','pilot_rollback_actions',
      'pilot_release_candidates','pilot_environment_checks',
      'pilot_data_protection_reviews','pilot_acceptance_checks',
      'pilot_daily_reviews','pilot_weekly_reviews'
    ])
  loop
    execute format('alter table public.%I enable row level security;', t);
  end loop;
end$$;

-- Platform owner full access on all pilot tables
do $$
declare t text;
begin
  for t in
    select unnest(array[
      'pilot_test_cases','pilot_test_runs','pilot_test_results',
      'pilot_bugs','pilot_bug_comments','pilot_readiness_checks','pilot_blockers',
      'pilot_company_setups','pilot_training_modules','pilot_training_progress',
      'pilot_support_tickets','pilot_go_live_phases','pilot_smoke_tests',
      'pilot_metrics','pilot_feedback','pilot_surveys','pilot_survey_responses',
      'pilot_escalations','pilot_incidents','pilot_rollback_actions',
      'pilot_release_candidates','pilot_environment_checks',
      'pilot_data_protection_reviews','pilot_acceptance_checks',
      'pilot_daily_reviews','pilot_weekly_reviews'
    ])
  loop
    execute format($p$
      create policy %I on public.%I for all
      using (public.is_platform_owner(auth.uid()))
      with check (public.is_platform_owner(auth.uid()));
    $p$, 'platform_owner_all_' || t, t);
  end loop;
end$$;

-- Readiness: company_admin can view their company's readiness checks
create policy readiness_admin_select on public.pilot_readiness_checks for select
  using (user_has_company_role(company_id, array['company_admin']));

-- Bugs: internal product/admin only
create policy bugs_select_internal on public.pilot_bugs for select
  using (public.is_platform_owner(auth.uid()));

-- Support tickets
create policy support_select_self on public.pilot_support_tickets for select
  using (user_id = auth.uid()
         or user_has_company_role(company_id, array['company_admin','dispatcher']));
create policy support_insert_self on public.pilot_support_tickets for insert
  with check (user_id = auth.uid());

-- Feedback: any company member can insert their own; admins read company-scoped
create policy feedback_insert_self on public.pilot_feedback for insert
  with check (user_id = auth.uid());
create policy feedback_select_admin on public.pilot_feedback for select
  using (user_has_company_role(company_id, array['company_admin'])
         or user_id = auth.uid());

-- Survey responses
create policy survey_insert_self on public.pilot_survey_responses for insert
  with check (user_id = auth.uid());
create policy survey_select_admin on public.pilot_survey_responses for select
  using (user_has_company_role(company_id, array['company_admin'])
         or user_id = auth.uid());

-- Training progress: a user sees own; company admin sees company-wide
create policy training_select on public.pilot_training_progress for select
  using (user_id = auth.uid()
         or user_has_company_role(company_id, array['company_admin']));
create policy training_upsert_self on public.pilot_training_progress for insert
  with check (user_id = auth.uid());
create policy training_update_self on public.pilot_training_progress for update
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Go-live + acceptance: company admin read, platform owner write
create policy golive_select_admin on public.pilot_go_live_phases for select
  using (user_has_company_role(company_id, array['company_admin','dispatcher']));
create policy acceptance_select_admin on public.pilot_acceptance_checks for select
  using (user_has_company_role(company_id, array['company_admin']));

-- Data protection reviews: admin/security only
create policy dpr_select_admin on public.pilot_data_protection_reviews for select
  using (user_has_company_role(company_id, array['company_admin'])
         or public.is_platform_owner(auth.uid()));

-- Customers cannot see internal pilot bugs (covered: no customer policy added).
-- Drivers cannot see dispatcher-only feedback (covered: feedback_select_admin
-- restricts to admins or self).
