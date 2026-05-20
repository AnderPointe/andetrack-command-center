-- Phase 12 — RLS reference policies.
-- Apply AFTER docs/phase12-schema.sql. Helpers are SECURITY DEFINER to avoid
-- recursive policy lookups. Drivers and customers see only their own scope.

-- ===== helpers =====
create or replace function public.get_user_company_ids()
returns setof uuid
language sql stable security definer set search_path = public
as $$
  select company_id from public.company_users
  where user_id = auth.uid() and status = 'active';
$$;

create or replace function public.user_has_company_role(_company_id uuid, _roles text[])
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.company_users
    where user_id = auth.uid()
      and company_id = _company_id
      and status = 'active'
      and role = any(_roles)
  );
$$;

create or replace function public.is_driver_for_user(_driver_id uuid)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.drivers
    where id = _driver_id and user_id = auth.uid()
  );
$$;

create or replace function public.is_customer_user_for_customer(_customer_id uuid)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.customer_users
    where customer_id = _customer_id
      and user_id = auth.uid()
      and status = 'active'
  );
$$;

-- ===== enable RLS =====
alter table public.companies            enable row level security;
alter table public.profiles             enable row level security;
alter table public.company_users        enable row level security;
alter table public.drivers              enable row level security;
alter table public.vehicles             enable row level security;
alter table public.customers            enable row level security;
alter table public.customer_users       enable row level security;
alter table public.loads                enable row level security;
alter table public.shipments            enable row level security;
alter table public.load_offers          enable row level security;
alter table public.dispatch_assignments enable row level security;
alter table public.driver_live_state    enable row level security;
alter table public.driver_location_events enable row level security;
alter table public.driver_status_events enable row level security;
alter table public.alerts               enable row level security;
alter table public.notification_events  enable row level security;
alter table public.push_tokens          enable row level security;
alter table public.proof_of_delivery    enable row level security;
alter table public.audit_logs           enable row level security;

-- ===== shared policy patterns =====
-- Read for any company member; write reserved for company_admin/dispatcher.

-- DRIVERS
create policy drivers_select on public.drivers for select
  using (user_has_company_role(company_id, array['company_admin','dispatcher'])
         or is_driver_for_user(id));
create policy drivers_mutate on public.drivers for all
  using (user_has_company_role(company_id, array['company_admin','dispatcher']))
  with check (user_has_company_role(company_id, array['company_admin','dispatcher']));

-- VEHICLES / CUSTOMERS
create policy vehicles_select on public.vehicles for select
  using (user_has_company_role(company_id, array['company_admin','dispatcher','driver']));
create policy vehicles_mutate on public.vehicles for all
  using (user_has_company_role(company_id, array['company_admin','dispatcher']))
  with check (user_has_company_role(company_id, array['company_admin','dispatcher']));

create policy customers_select on public.customers for select
  using (user_has_company_role(company_id, array['company_admin','dispatcher'])
         or exists (select 1 from public.customer_users cu
                    where cu.customer_id = customers.id and cu.user_id = auth.uid()));
create policy customers_mutate on public.customers for all
  using (user_has_company_role(company_id, array['company_admin','dispatcher']))
  with check (user_has_company_role(company_id, array['company_admin','dispatcher']));

-- LOADS — dispatcher writes; drivers see assigned; customers see their own
create policy loads_select on public.loads for select
  using (
    user_has_company_role(company_id, array['company_admin','dispatcher'])
    or (assigned_driver_id is not null and is_driver_for_user(assigned_driver_id))
    or (customer_id is not null and is_customer_user_for_customer(customer_id))
  );
create policy loads_mutate on public.loads for all
  using (user_has_company_role(company_id, array['company_admin','dispatcher']))
  with check (user_has_company_role(company_id, array['company_admin','dispatcher']));

-- SHIPMENTS — same visibility model as loads
create policy shipments_select on public.shipments for select
  using (
    user_has_company_role(company_id, array['company_admin','dispatcher'])
    or exists (select 1 from public.loads l where l.id = shipments.load_id and is_driver_for_user(l.assigned_driver_id))
    or (customer_id is not null and is_customer_user_for_customer(customer_id))
  );
create policy shipments_mutate on public.shipments for all
  using (user_has_company_role(company_id, array['company_admin','dispatcher']))
  with check (user_has_company_role(company_id, array['company_admin','dispatcher']));

-- LOAD OFFERS — driver sees own; dispatcher writes
create policy load_offers_select on public.load_offers for select
  using (user_has_company_role(company_id, array['company_admin','dispatcher'])
         or is_driver_for_user(driver_id));
create policy load_offers_insert on public.load_offers for insert
  with check (user_has_company_role(company_id, array['company_admin','dispatcher']));
create policy load_offers_update on public.load_offers for update
  using (user_has_company_role(company_id, array['company_admin','dispatcher'])
         or is_driver_for_user(driver_id))
  with check (user_has_company_role(company_id, array['company_admin','dispatcher'])
              or is_driver_for_user(driver_id));

-- DRIVER LIVE STATE — driver writes own; dispatcher reads all
create policy live_state_select on public.driver_live_state for select
  using (user_has_company_role(company_id, array['company_admin','dispatcher'])
         or is_driver_for_user(driver_id));
create policy live_state_upsert on public.driver_live_state for insert
  with check (is_driver_for_user(driver_id));
create policy live_state_update on public.driver_live_state for update
  using (is_driver_for_user(driver_id)) with check (is_driver_for_user(driver_id));

-- LOCATION + STATUS EVENTS — driver inserts own
create policy location_events_select on public.driver_location_events for select
  using (user_has_company_role(company_id, array['company_admin','dispatcher'])
         or is_driver_for_user(driver_id));
create policy location_events_insert on public.driver_location_events for insert
  with check (is_driver_for_user(driver_id));

create policy status_events_select on public.driver_status_events for select
  using (user_has_company_role(company_id, array['company_admin','dispatcher'])
         or is_driver_for_user(driver_id));
create policy status_events_insert on public.driver_status_events for insert
  with check (is_driver_for_user(driver_id)
              or user_has_company_role(company_id, array['company_admin','dispatcher']));

-- ALERTS
create policy alerts_select on public.alerts for select
  using (user_has_company_role(company_id, array['company_admin','dispatcher']));
create policy alerts_mutate on public.alerts for all
  using (user_has_company_role(company_id, array['company_admin','dispatcher']))
  with check (user_has_company_role(company_id, array['company_admin','dispatcher']));

-- NOTIFICATIONS — recipient sees own; dispatchers see company
create policy notifications_select on public.notification_events for select
  using (recipient_user_id = auth.uid()
         or user_has_company_role(company_id, array['company_admin','dispatcher']));

-- PUSH TOKENS — user manages own
create policy push_tokens_select on public.push_tokens for select using (user_id = auth.uid());
create policy push_tokens_mutate on public.push_tokens for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- POD — driver writes for own assigned loads
create policy pod_select on public.proof_of_delivery for select
  using (user_has_company_role(company_id, array['company_admin','dispatcher'])
         or is_driver_for_user(driver_id)
         or exists (select 1 from public.shipments s where s.id = proof_of_delivery.shipment_id
                    and s.customer_id is not null and is_customer_user_for_customer(s.customer_id)));
create policy pod_insert on public.proof_of_delivery for insert
  with check (is_driver_for_user(driver_id)
              or user_has_company_role(company_id, array['company_admin','dispatcher']));
create policy pod_update on public.proof_of_delivery for update
  using (is_driver_for_user(driver_id)
         or user_has_company_role(company_id, array['company_admin','dispatcher']))
  with check (is_driver_for_user(driver_id)
              or user_has_company_role(company_id, array['company_admin','dispatcher']));

-- AUDIT LOGS — read for admin/dispatcher; insert via service role only
create policy audit_select on public.audit_logs for select
  using (user_has_company_role(company_id, array['company_admin','dispatcher']));
