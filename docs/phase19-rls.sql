-- Phase 19 — V3 RLS examples (illustrative, not executed)
alter table public.driver_app_health_events enable row level security;
create policy "driver_app_health_self" on public.driver_app_health_events
  for select to authenticated
  using (driver_id = auth.uid() or public.can_manage_company(auth.uid(), company_id));

alter table public.offline_action_queue enable row level security;
create policy "offline_queue_self" on public.offline_action_queue
  for all to authenticated
  using (driver_id = auth.uid())
  with check (driver_id = auth.uid() and company_id = public.current_company());

alter table public.voice_transcript_events enable row level security;
create policy "voice_transcript_self" on public.voice_transcript_events
  for select to authenticated
  using (driver_id = auth.uid() or public.has_role(auth.uid(), company_id, 'admin'));

alter table public.telematics_location_events enable row level security;
create policy "telematics_company_scoped" on public.telematics_location_events
  for select to authenticated
  using (company_id = public.current_company());

alter table public.marketplace_load_posts enable row level security;
create policy "marketplace_posts_company" on public.marketplace_load_posts
  for select to authenticated
  using (company_id = public.current_company());

alter table public.carrier_bids enable row level security;
create policy "carrier_bids_carrier_or_poster" on public.carrier_bids
  for select to authenticated
  using (
    carrier_id in (select carrier_id from public.carrier_users where user_id = auth.uid())
    or exists (select 1 from public.marketplace_load_posts p where p.id = load_id and p.company_id = public.current_company())
  );

alter table public.certification_readiness_items enable row level security;
create policy "cert_readiness_admin_only" on public.certification_readiness_items
  for select to authenticated
  using (public.has_role(auth.uid(), company_id, 'admin'));

alter table public.mobile_policy_settings enable row level security;
create policy "mobile_policy_admin_only" on public.mobile_policy_settings
  for all to authenticated
  using (public.has_role(auth.uid(), company_id, 'admin'))
  with check (public.has_role(auth.uid(), company_id, 'admin'));

alter table public.android_auto_readiness_items enable row level security;
create policy "aa_admin_only" on public.android_auto_readiness_items
  for select to authenticated
  using (public.has_role(auth.uid(), company_id, 'admin'));

alter table public.carplay_readiness_items enable row level security;
create policy "cp_admin_only" on public.carplay_readiness_items
  for select to authenticated
  using (public.has_role(auth.uid(), company_id, 'admin'));
