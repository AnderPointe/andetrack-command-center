# Phase 10 — Supabase schema additions (proposed)

All tenant-owned records include `company_id` and use the
`is_company_member` / `can_manage_company` RLS helpers from Phase 6.
Platform-level rows (product_demo_scenarios, roadmap_items, release_notes,
pricing_plans) are platform-scoped and read-public when `published = true`.

```sql
-- Demo
create table public.product_demo_scenarios (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  persona_default text,
  published boolean not null default false,
  created_at timestamptz not null default now()
);
create table public.demo_steps (
  id uuid primary key default gen_random_uuid(),
  scenario_id uuid references public.product_demo_scenarios(id) on delete cascade,
  step_index int not null,
  persona text not null,
  title text not null,
  narration text not null
);
create table public.demo_personas (id text primary key, label text not null, description text);

-- Onboarding
create table public.onboarding_projects (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  stage text not null default 'sales',
  go_live_target date,
  created_at timestamptz not null default now()
);
create table public.onboarding_tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.onboarding_projects(id) on delete cascade,
  key text not null, label text not null,
  status text not null default 'todo',
  completed_at timestamptz
);

-- Customer success
create table public.customer_success_accounts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  csm_user_id uuid references auth.users(id),
  stage text not null, risk_level text not null default 'low',
  expansion_opportunity text
);
create table public.customer_health_scores (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  score int not null check (score between 0 and 100),
  components jsonb not null, created_at timestamptz not null default now()
);

-- Pilot
create table public.pilot_programs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  duration_days int not null, started_at date, ends_at date,
  conversion_status text default 'in_pilot'
);
create table public.pilot_metrics (
  id uuid primary key default gen_random_uuid(),
  pilot_id uuid references public.pilot_programs(id) on delete cascade,
  metric_key text not null, value numeric, captured_at timestamptz default now()
);

-- Support
create table public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  customer_id uuid, user_id uuid references auth.users(id),
  priority text not null, category text not null,
  subject text not null, description text,
  status text not null default 'open',
  assigned_to uuid references auth.users(id),
  created_at timestamptz default now(), resolved_at timestamptz
);
create table public.support_ticket_comments (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid references public.support_tickets(id) on delete cascade,
  author_id uuid references auth.users(id), body text not null,
  created_at timestamptz default now()
);
create table public.knowledge_base_articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null, title text not null, body text not null,
  category text, published boolean default false
);

-- Feedback / roadmap
create table public.feature_requests (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete set null,
  user_id uuid references auth.users(id),
  title text not null, body text, status text default 'submitted',
  votes int default 0, created_at timestamptz default now()
);
create table public.roadmap_items (
  id uuid primary key default gen_random_uuid(),
  area text not null, title text not null, status text not null,
  target_quarter text, published boolean default true
);
create table public.release_notes (
  id uuid primary key default gen_random_uuid(),
  version text unique not null, released_on date not null,
  highlights text[] not null default '{}',
  body jsonb not null, published boolean default true
);

-- Pricing (platform-level catalog)
create table public.pricing_plans (
  id text primary key, name text not null, audience text,
  price_range text, per_seat text, popular boolean default false,
  features text[] not null default '{}', cta text
);
create table public.pricing_features (id text primary key, label text, group_name text);
create table public.pricing_addons (id text primary key, name text, price text, note text);

-- Misc
create table public.roi_calculator_runs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete set null,
  user_id uuid references auth.users(id),
  inputs jsonb not null, outputs jsonb not null,
  created_at timestamptz default now()
);
create table public.sales_collateral_assets (
  id uuid primary key default gen_random_uuid(),
  title text not null, audience text, summary text,
  url text, published boolean default true
);
create table public.documentation_pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null, section text not null,
  title text not null, body text not null, published boolean default true
);
create table public.product_tours (id uuid primary key default gen_random_uuid(), slug text unique, title text);
create table public.tour_steps (id uuid primary key default gen_random_uuid(), tour_id uuid references public.product_tours(id) on delete cascade, step_index int, anchor text, body text);

create table public.feedback_items (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete set null,
  user_id uuid references auth.users(id),
  kind text not null, body text, created_at timestamptz default now()
);
create table public.bug_reports (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete set null,
  user_id uuid references auth.users(id),
  title text not null, steps text, severity text default 'medium',
  status text default 'open', created_at timestamptz default now()
);

create table public.launch_checklists (id uuid primary key default gen_random_uuid(), company_id uuid references public.companies(id) on delete cascade, name text not null);
create table public.launch_checklist_items (id uuid primary key default gen_random_uuid(), checklist_id uuid references public.launch_checklists(id) on delete cascade, label text not null, status text default 'todo');

create table public.brand_settings (
  company_id uuid primary key references public.companies(id) on delete cascade,
  primary_color text, accent_color text, logo_url text, theme jsonb
);
create table public.design_tokens (token text primary key, value text, note text);
```
