
-- Platform-owner helper (safe; user_roles already exists)
create or replace function public.is_platform_owner(_user_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = 'platform_owner');
$$;

-- Tables: customers / customer_locations / customer_users FIRST
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  name text not null,
  contact_name text, email text, phone text, billing_address text,
  priority text not null default 'standard',
  status text not null default 'active',
  service_notes text,
  portal_enabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists customers_company_idx on public.customers(company_id);

create table if not exists public.customer_locations (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  company_id uuid not null,
  label text not null, address text not null,
  lat double precision, lng double precision,
  kind text not null default 'both',
  created_at timestamptz not null default now()
);
create index if not exists customer_locations_company_idx on public.customer_locations(company_id);

create table if not exists public.customer_users (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  company_id uuid not null,
  user_id uuid not null,
  role app_role not null default 'customer_user',
  invited_at timestamptz not null default now(),
  accepted_at timestamptz,
  status text not null default 'invited',
  unique(customer_id, user_id)
);
create index if not exists customer_users_user_idx on public.customer_users(user_id);

-- Helpers that depend on customer_users
create or replace function public.is_customer_user(_user_id uuid, _customer_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.customer_users where user_id = _user_id and customer_id = _customer_id and status <> 'revoked');
$$;
create or replace function public.customer_ids_for_user(_user_id uuid)
returns setof uuid language sql stable security definer set search_path = public as $$
  select customer_id from public.customer_users where user_id = _user_id and status <> 'revoked';
$$;

-- Enable RLS + policies on customers/locations/users
alter table public.customers enable row level security;
create policy "company read customers" on public.customers for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "managers write customers" on public.customers for all to authenticated using (can_manage_company(auth.uid(), company_id)) with check (can_manage_company(auth.uid(), company_id));
create trigger customers_touch before update on public.customers for each row execute function public.touch_updated_at();

alter table public.customer_locations enable row level security;
create policy "company read cust loc" on public.customer_locations for select to authenticated using (is_company_member(auth.uid(), company_id) or customer_id in (select public.customer_ids_for_user(auth.uid())));
create policy "managers write cust loc" on public.customer_locations for all to authenticated using (can_manage_company(auth.uid(), company_id)) with check (can_manage_company(auth.uid(), company_id));

alter table public.customer_users enable row level security;
create policy "company or self read cust users" on public.customer_users for select to authenticated using (is_company_member(auth.uid(), company_id) or user_id = auth.uid());
create policy "managers write cust users" on public.customer_users for all to authenticated using (can_manage_company(auth.uid(), company_id)) with check (can_manage_company(auth.uid(), company_id));

-- Shipment requests
create table if not exists public.shipment_requests (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  customer_id uuid not null references public.customers(id) on delete cascade,
  requested_by uuid,
  pickup_location text not null, dropoff_location text not null,
  commodity text, package_type text,
  weight numeric, quantity integer,
  required_vehicle_type text,
  requires_cdl boolean not null default false,
  requires_hazmat boolean not null default false,
  pickup_at timestamptz, delivery_window text,
  special_instructions text, contact text,
  status text not null default 'submitted',
  converted_load_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists shipment_requests_company_idx on public.shipment_requests(company_id, status);
create index if not exists shipment_requests_customer_idx on public.shipment_requests(customer_id);
alter table public.shipment_requests enable row level security;
create policy "company or customer read requests" on public.shipment_requests for select to authenticated using (is_company_member(auth.uid(), company_id) or customer_id in (select public.customer_ids_for_user(auth.uid())));
create policy "customer or manager insert request" on public.shipment_requests for insert to authenticated with check (can_manage_company(auth.uid(), company_id) or is_customer_user(auth.uid(), customer_id));
create policy "managers update request" on public.shipment_requests for update to authenticated using (can_manage_company(auth.uid(), company_id)) with check (can_manage_company(auth.uid(), company_id));
create trigger shipment_requests_touch before update on public.shipment_requests for each row execute function public.touch_updated_at();

-- Customer portal users can read loads converted from their requests
create policy "customer reads own loads" on public.loads for select to authenticated using (
  exists (select 1 from public.shipment_requests sr where sr.converted_load_id = loads.id and sr.customer_id in (select public.customer_ids_for_user(auth.uid())))
);

-- Subscriptions / Billing
create table if not exists public.subscription_plans (
  id uuid primary key default gen_random_uuid(),
  code text not null unique, name text not null, tier text not null,
  driver_limit integer, vehicle_limit integer, price_monthly_usd numeric,
  features jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.subscription_plans enable row level security;
create policy "auth read plans" on public.subscription_plans for select to authenticated using (true);
create policy "platform owners write plans" on public.subscription_plans for all to authenticated using (is_platform_owner(auth.uid())) with check (is_platform_owner(auth.uid()));

create table if not exists public.company_subscriptions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null unique,
  plan_id uuid references public.subscription_plans(id),
  status text not null default 'trialing',
  trial_ends_at timestamptz,
  current_period_start timestamptz, current_period_end timestamptz,
  stripe_customer_id text, stripe_subscription_id text,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.company_subscriptions enable row level security;
create policy "company or platform read subscription" on public.company_subscriptions for select to authenticated using (is_company_member(auth.uid(), company_id) or is_platform_owner(auth.uid()));
create policy "owners write subscription" on public.company_subscriptions for all to authenticated using (has_role(auth.uid(), company_id, 'owner') or is_platform_owner(auth.uid())) with check (has_role(auth.uid(), company_id, 'owner') or is_platform_owner(auth.uid()));
create trigger company_subscriptions_touch before update on public.company_subscriptions for each row execute function public.touch_updated_at();

create table if not exists public.billing_customers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null unique,
  stripe_customer_id text, email text, name text,
  created_at timestamptz not null default now()
);
alter table public.billing_customers enable row level security;
create policy "company or platform read billing customer" on public.billing_customers for select to authenticated using (is_company_member(auth.uid(), company_id) or is_platform_owner(auth.uid()));

create table if not exists public.billing_invoices (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  stripe_invoice_id text, number text,
  status text not null default 'draft',
  amount_due_usd numeric, amount_paid_usd numeric,
  period_start timestamptz, period_end timestamptz,
  invoice_pdf_url text,
  created_at timestamptz not null default now()
);
create index if not exists billing_invoices_company_idx on public.billing_invoices(company_id, created_at desc);
alter table public.billing_invoices enable row level security;
create policy "billing admins read invoices" on public.billing_invoices for select to authenticated using (
  is_platform_owner(auth.uid()) or (is_company_member(auth.uid(), company_id) and (can_manage_company(auth.uid(), company_id) or has_role(auth.uid(), company_id, 'billing_admin')))
);

create table if not exists public.billing_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists billing_events_company_idx on public.billing_events(company_id, created_at desc);
alter table public.billing_events enable row level security;
create policy "managers or platform read billing events" on public.billing_events for select to authenticated using (can_manage_company(auth.uid(), company_id) or is_platform_owner(auth.uid()));

create table if not exists public.billing_usage_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  metric text not null,
  quantity numeric not null default 1,
  occurred_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb
);
create index if not exists billing_usage_company_metric_idx on public.billing_usage_events(company_id, metric, occurred_at desc);
alter table public.billing_usage_events enable row level security;
create policy "company read usage" on public.billing_usage_events for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "members insert usage" on public.billing_usage_events for insert to authenticated with check (is_company_member(auth.uid(), company_id));

-- Feature flags
create table if not exists public.feature_flags (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  description text,
  default_enabled boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.feature_flags enable row level security;
create policy "auth read flags" on public.feature_flags for select to authenticated using (true);
create policy "platform owners write flags" on public.feature_flags for all to authenticated using (is_platform_owner(auth.uid())) with check (is_platform_owner(auth.uid()));

create table if not exists public.company_feature_flags (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  flag_key text not null,
  enabled boolean not null default false,
  updated_at timestamptz not null default now(),
  unique(company_id, flag_key)
);
alter table public.company_feature_flags enable row level security;
create policy "company read own flags" on public.company_feature_flags for select to authenticated using (is_company_member(auth.uid(), company_id) or is_platform_owner(auth.uid()));
create policy "admins write own flags" on public.company_feature_flags for all to authenticated using (can_manage_company(auth.uid(), company_id) or is_platform_owner(auth.uid())) with check (can_manage_company(auth.uid(), company_id) or is_platform_owner(auth.uid()));

-- Platform settings + support sessions
create table if not exists public.platform_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.platform_settings enable row level security;
create policy "platform read settings" on public.platform_settings for select to authenticated using (is_platform_owner(auth.uid()));
create policy "platform write settings" on public.platform_settings for all to authenticated using (is_platform_owner(auth.uid())) with check (is_platform_owner(auth.uid()));

create table if not exists public.support_access_sessions (
  id uuid primary key default gen_random_uuid(),
  support_user_id uuid not null,
  company_id uuid not null,
  reason text not null,
  granted_by uuid,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists support_sessions_company_idx on public.support_access_sessions(company_id);
alter table public.support_access_sessions enable row level security;
create policy "platform or self read support sessions" on public.support_access_sessions for select to authenticated using (is_platform_owner(auth.uid()) or support_user_id = auth.uid());
create policy "platform write support sessions" on public.support_access_sessions for all to authenticated using (is_platform_owner(auth.uid())) with check (is_platform_owner(auth.uid()));

-- Audit log events
create table if not exists public.audit_log_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid,
  actor_user_id uuid,
  action text not null,
  resource_type text,
  resource_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  ip_address text, user_agent text,
  created_at timestamptz not null default now()
);
create index if not exists audit_log_events_company_idx on public.audit_log_events(company_id, created_at desc);
alter table public.audit_log_events enable row level security;
create policy "managers or platform read audit events" on public.audit_log_events for select to authenticated using ((company_id is not null and can_manage_company(auth.uid(), company_id)) or is_platform_owner(auth.uid()));
create policy "members insert audit events" on public.audit_log_events for insert to authenticated with check (company_id is null or is_company_member(auth.uid(), company_id) or is_platform_owner(auth.uid()));

-- Saved views
create table if not exists public.saved_views (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  user_id uuid not null,
  surface text not null, name text not null,
  config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists saved_views_user_idx on public.saved_views(user_id, surface);
alter table public.saved_views enable row level security;
create policy "user manages own saved views" on public.saved_views for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid() and is_company_member(auth.uid(), company_id));

-- Seeds
insert into public.subscription_plans (code, name, tier, driver_limit, vehicle_limit, price_monthly_usd, features) values
  ('starter','Starter','starter',5,5,49,'{"copilot":false,"customer_portal":true,"cdl_validation":false,"reports":"basic"}'::jsonb),
  ('professional','Professional','professional',25,25,199,'{"copilot":true,"customer_portal":true,"cdl_validation":true,"reports":"standard","push":true}'::jsonb),
  ('fleet','Fleet Command','fleet',100,100,599,'{"copilot":true,"customer_portal":true,"cdl_validation":true,"reports":"advanced","multi_dispatch":true,"push":true}'::jsonb),
  ('enterprise','Enterprise','enterprise',null,null,null,'{"copilot":true,"customer_portal":true,"cdl_validation":true,"reports":"advanced","white_label":true,"api_access":true,"dedicated_support":true}'::jsonb)
on conflict (code) do nothing;

insert into public.feature_flags (key, description, default_enabled) values
  ('copilot','Enable Anderoute CoPilot AI assistant',true),
  ('customer_portal','Enable customer portal',true),
  ('billing','Enable billing UI',true),
  ('advanced_reports','Enable advanced reports',false),
  ('cdl_validation','Enable CDL/truck route validation',true),
  ('push_notifications','Enable push notifications',true),
  ('android_auto','Android Auto (future)',false),
  ('carplay','CarPlay (future)',false),
  ('usage_billing','Enable usage-based billing meters',false),
  ('white_label_portal','White-label customer portal',false)
on conflict (key) do nothing;
