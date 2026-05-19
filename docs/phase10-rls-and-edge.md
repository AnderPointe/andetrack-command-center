# Phase 10 — RLS examples

```sql
-- Onboarding: company admins read/write their project
alter table public.onboarding_projects enable row level security;
create policy "onboarding: admin read"   on public.onboarding_projects for select to authenticated
  using (public.can_manage_company(auth.uid(), company_id));
create policy "onboarding: admin write"  on public.onboarding_projects for all to authenticated
  using (public.can_manage_company(auth.uid(), company_id))
  with check (public.can_manage_company(auth.uid(), company_id));

-- Customer success: company members read their own; platform CSMs read all via separate role
alter table public.customer_success_accounts enable row level security;
create policy "success: tenant read" on public.customer_success_accounts for select to authenticated
  using (public.can_manage_company(auth.uid(), company_id));

-- Support tickets: customers see only their own; dispatchers see company tickets
alter table public.support_tickets enable row level security;
create policy "support: customer own"     on public.support_tickets for select to authenticated
  using (customer_id in (select public.customer_ids_for_user(auth.uid())));
create policy "support: dispatcher read"  on public.support_tickets for select to authenticated
  using (public.is_company_member(auth.uid(), company_id));
create policy "support: user submit"      on public.support_tickets for insert to authenticated
  with check (user_id = auth.uid());

-- Platform-managed content: public read when published
alter table public.roadmap_items enable row level security;
create policy "roadmap: public read" on public.roadmap_items for select to anon, authenticated
  using (published = true);

alter table public.release_notes enable row level security;
create policy "releases: public read" on public.release_notes for select to anon, authenticated
  using (published = true);

alter table public.pricing_plans enable row level security;
create policy "pricing: public read" on public.pricing_plans for select to anon, authenticated using (true);

-- Demo scenarios: platform-only writes; tenant read
alter table public.product_demo_scenarios enable row level security;
create policy "demo: tenant read" on public.product_demo_scenarios for select to authenticated
  using (published = true);

-- ROI runs: company-scoped
alter table public.roi_calculator_runs enable row level security;
create policy "roi: own read"  on public.roi_calculator_runs for select to authenticated
  using (user_id = auth.uid() or public.can_manage_company(auth.uid(), company_id));
create policy "roi: user insert" on public.roi_calculator_runs for insert to authenticated
  with check (user_id = auth.uid());

-- Brand settings: company admins only
alter table public.brand_settings enable row level security;
create policy "brand: admin"     on public.brand_settings for all to authenticated
  using (public.can_manage_company(auth.uid(), company_id))
  with check (public.can_manage_company(auth.uid(), company_id));
```

# Edge function / server function plan (Phase 10)

Default: `createServerFn` for in-app logic. Edge functions only for
external triggers (webhooks, cron).

Server functions (`src/launch/*.functions.ts`):
- `createDemoScenario`, `seedDemoData`, `resetDemoData`
- `createOnboardingProject`, `completeOnboardingTask`
- `calculateCustomerHealthScore`
- `submitSupportTicket`, `updateSupportTicket`
- `submitFeatureRequest`
- `generateROIEstimate` (logs to `roi_calculator_runs`)
- `generateDemoSummary`, `generateCustomerSuccessSummary`
- `publishReleaseNotes` (admin role only)
- `generateLaunchReadinessScore`
- `exportSalesCollateral`, `generateOnboardingChecklist`

Public server routes (`/api/public/*`):
- `/api/public/launch/cron/health-score` — nightly customer health roll-up
- `/api/public/launch/webhook/feedback` — third-party feedback ingestion (HMAC-verified)
