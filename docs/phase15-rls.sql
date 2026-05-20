-- Phase 15 — V1.1 RLS examples.
-- All policies depend on has_role() and current_company() (Phase 6+).

-- Billing: only company admins and platform owners can see / write.
alter table public.billing_customers enable row level security;
create policy "company admins view billing_customers"
  on public.billing_customers for select using (
    company_id = public.current_company()
    and (
      public.has_role(auth.uid(), company_id, 'admin')
      or public.has_role(auth.uid(), company_id, 'owner')
      or public.is_platform_owner(auth.uid())
    )
  );

alter table public.company_subscriptions enable row level security;
create policy "company admins manage subscriptions"
  on public.company_subscriptions for all using (
    company_id = public.current_company()
    and (
      public.has_role(auth.uid(), company_id, 'admin')
      or public.has_role(auth.uid(), company_id, 'owner')
    )
  );

alter table public.billing_invoices enable row level security;
create policy "company admins view invoices"
  on public.billing_invoices for select using (
    company_id = public.current_company()
    and public.has_role(auth.uid(), company_id, 'admin')
  );

alter table public.billing_usage_events enable row level security;
create policy "company admins view usage"
  on public.billing_usage_events for select using (
    company_id = public.current_company()
    and public.has_role(auth.uid(), company_id, 'admin')
  );

-- CSV imports: admins + dispatchers only.
alter table public.csv_import_jobs enable row level security;
create policy "company admins or dispatchers manage csv imports"
  on public.csv_import_jobs for all using (
    company_id = public.current_company()
    and (
      public.has_role(auth.uid(), company_id, 'admin')
      or public.has_role(auth.uid(), company_id, 'dispatcher')
    )
  );

alter table public.csv_import_rows enable row level security;
create policy "csv rows follow parent job"
  on public.csv_import_rows for select using (
    exists (
      select 1 from public.csv_import_jobs j
      where j.id = job_id and j.company_id = public.current_company()
    )
  );

-- Offline queue: drivers only see their own events.
alter table public.offline_queue_events enable row level security;
create policy "drivers manage own offline events"
  on public.offline_queue_events for all using (
    company_id = public.current_company()
    and driver_id = auth.uid()
  );

-- Notification preferences: scoped to the customer user.
alter table public.customer_notification_preferences enable row level security;
create policy "customer users manage own preferences"
  on public.customer_notification_preferences for all using (
    customer_user_id = auth.uid()
  );

-- Notification delivery events: company-scoped to admin/dispatcher.
alter table public.notification_delivery_events enable row level security;
create policy "company staff view notification delivery"
  on public.notification_delivery_events for select using (
    company_id = public.current_company()
    and (
      public.has_role(auth.uid(), company_id, 'admin')
      or public.has_role(auth.uid(), company_id, 'dispatcher')
    )
  );

-- Saved load views: per-user, per-company.
alter table public.saved_load_views enable row level security;
create policy "users manage own saved views"
  on public.saved_load_views for all using (
    company_id = public.current_company() and user_id = auth.uid()
  );

-- Reports: dispatchers + admins.
alter table public.report_runs enable row level security;
create policy "company staff run reports"
  on public.report_runs for all using (
    company_id = public.current_company()
    and (
      public.has_role(auth.uid(), company_id, 'admin')
      or public.has_role(auth.uid(), company_id, 'dispatcher')
    )
  );

-- CoPilot rule events: company-scoped read.
alter table public.copilot_rule_events enable row level security;
create policy "company staff view copilot events"
  on public.copilot_rule_events for select using (
    company_id = public.current_company()
  );

-- Navigation provider settings: admin only.
alter table public.navigation_provider_settings enable row level security;
create policy "admin manages navigation settings"
  on public.navigation_provider_settings for all using (
    company_id = public.current_company()
    and public.has_role(auth.uid(), company_id, 'admin')
  );

-- Onboarding: admin only per company.
alter table public.production_onboarding_projects enable row level security;
create policy "admin manages onboarding"
  on public.production_onboarding_projects for all using (
    company_id = public.current_company()
    and public.has_role(auth.uid(), company_id, 'admin')
  );

-- Data quality + cleanup: admin/dispatcher only.
alter table public.data_quality_issues enable row level security;
create policy "company staff view data quality"
  on public.data_quality_issues for select using (
    company_id = public.current_company()
    and (
      public.has_role(auth.uid(), company_id, 'admin')
      or public.has_role(auth.uid(), company_id, 'dispatcher')
    )
  );

alter table public.data_cleanup_actions enable row level security;
create policy "company staff write cleanup actions"
  on public.data_cleanup_actions for insert with check (
    company_id = public.current_company()
    and (
      public.has_role(auth.uid(), company_id, 'admin')
      or public.has_role(auth.uid(), company_id, 'dispatcher')
    )
  );
