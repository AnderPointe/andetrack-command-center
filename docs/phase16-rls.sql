-- Phase 16 — V1.5 RLS examples (planning reference, not executed).
-- Assumes helpers: current_company(), can_manage_company(), has_role(),
-- is_platform_owner(), is_customer_user(), customer_ids_for_user().

-- Navigation sessions: dispatchers see their company, drivers see only own
alter table navigation_sessions enable row level security;
create policy "dispatchers see company nav sessions" on navigation_sessions
  for select using (company_id = current_company() and can_manage_company(auth.uid(), company_id));
create policy "drivers see own nav sessions" on navigation_sessions
  for select using (driver_id = auth.uid());

alter table navigation_events enable row level security;
create policy "company members see nav events" on navigation_events
  for select using (company_id = current_company());

alter table route_steps enable row level security;
create policy "company members see route steps" on route_steps
  for select using (company_id = current_company());

-- Billing: admin-only for management; platform owner can read all
alter table company_subscriptions enable row level security;
create policy "company admins manage subscriptions" on company_subscriptions
  for all using (
    company_id = current_company() and (
      has_role(auth.uid(), company_id, 'owner') or
      has_role(auth.uid(), company_id, 'admin') or
      is_platform_owner(auth.uid())
    )
  );

alter table billing_invoices enable row level security;
create policy "company admins view invoices" on billing_invoices
  for select using (
    company_id = current_company() and (
      has_role(auth.uid(), company_id, 'owner') or
      has_role(auth.uid(), company_id, 'admin')
    )
  );

alter table billing_events enable row level security;
create policy "platform owner reads stripe events" on billing_events
  for select using (is_platform_owner(auth.uid()));

-- Webhooks: admin-only configuration, dispatcher-visible delivery logs
alter table webhook_endpoints enable row level security;
create policy "admin manage webhooks" on webhook_endpoints
  for all using (
    company_id = current_company() and (
      has_role(auth.uid(), company_id, 'owner') or
      has_role(auth.uid(), company_id, 'admin')
    )
  );

alter table webhook_deliveries enable row level security;
create policy "dispatchers view webhook deliveries" on webhook_deliveries
  for select using (company_id = current_company() and can_manage_company(auth.uid(), company_id));

-- Integrations: admin-only
alter table company_integrations enable row level security;
create policy "admin manage integrations" on company_integrations
  for all using (
    company_id = current_company() and (
      has_role(auth.uid(), company_id, 'owner') or
      has_role(auth.uid(), company_id, 'admin')
    )
  );

-- Plan / feature events: company-scoped read
alter table plan_limit_events enable row level security;
create policy "company members read plan events" on plan_limit_events
  for select using (company_id = current_company());

alter table feature_gate_events enable row level security;
create policy "company members read feature events" on feature_gate_events
  for select using (company_id = current_company());

-- CoPilot insights: company-scoped read
alter table copilot_insights enable row level security;
create policy "company members read copilot insights" on copilot_insights
  for select using (company_id = current_company());

alter table copilot_action_queue enable row level security;
create policy "dispatcher manage copilot actions" on copilot_action_queue
  for all using (company_id = current_company() and can_manage_company(auth.uid(), company_id));

-- Provider / request logs: company-scoped
alter table route_request_logs enable row level security;
create policy "company members read route logs" on route_request_logs
  for select using (company_id = current_company());

alter table provider_error_logs enable row level security;
create policy "company members read provider errors" on provider_error_logs
  for select using (company_id = current_company());

-- ETA update events: company members + linked customer users
alter table eta_update_events enable row level security;
create policy "company members read eta updates" on eta_update_events
  for select using (company_id = current_company());
