
-- Phase 7: Enterprise integrations, EDI, API, webhooks, optimization, rating, white-label, docs

-- ============== Integration Catalog ==============
create table if not exists public.integration_connectors (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  name text not null,
  category text not null,
  description text,
  logo_url text,
  vendor text,
  status text not null default 'available',
  capabilities jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);
alter table public.integration_connectors enable row level security;
create policy "auth read connector catalog" on public.integration_connectors for select to authenticated using (true);
create policy "platform write catalog" on public.integration_connectors for all to authenticated using (is_platform_owner(auth.uid())) with check (is_platform_owner(auth.uid()));

-- ============== Company Integrations ==============
create table if not exists public.company_integrations (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  connector_id uuid references public.integration_connectors(id),
  connector_key text not null,
  display_name text not null,
  status text not null default 'disconnected',
  health text not null default 'unknown',
  config jsonb not null default '{}'::jsonb,
  last_sync_at timestamptz,
  last_error text,
  enabled boolean not null default true,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.company_integrations enable row level security;
create policy "company read integrations" on public.company_integrations for select to authenticated using (is_company_member(auth.uid(), company_id) or is_platform_owner(auth.uid()));
create policy "managers write integrations" on public.company_integrations for all to authenticated using (can_manage_company(auth.uid(), company_id)) with check (can_manage_company(auth.uid(), company_id));
create trigger ci_touch before update on public.company_integrations for each row execute function public.touch_updated_at();

create table if not exists public.integration_sync_logs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  integration_id uuid not null,
  status text not null,
  message text,
  duration_ms integer,
  records_processed integer,
  created_at timestamptz not null default now()
);
alter table public.integration_sync_logs enable row level security;
create policy "company read sync logs" on public.integration_sync_logs for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "members insert sync logs" on public.integration_sync_logs for insert to authenticated with check (is_company_member(auth.uid(), company_id));

create table if not exists public.integration_error_logs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  integration_id uuid,
  severity text not null default 'error',
  source text not null,
  message text not null,
  context jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
alter table public.integration_error_logs enable row level security;
create policy "company read int errors" on public.integration_error_logs for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "members insert int errors" on public.integration_error_logs for insert to authenticated with check (is_company_member(auth.uid(), company_id));

create table if not exists public.integration_health_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  integration_id uuid not null,
  status text not null,
  message text,
  created_at timestamptz not null default now()
);
alter table public.integration_health_events enable row level security;
create policy "company read int health" on public.integration_health_events for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "members insert int health" on public.integration_health_events for insert to authenticated with check (is_company_member(auth.uid(), company_id));

-- ============== EDI ==============
create table if not exists public.edi_partners (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  partner_name text not null,
  partner_type text not null default 'broker',
  edi_standard text not null default 'X12',
  transport_method text not null default 'AS2',
  enabled boolean not null default true,
  trading_partner_id text,
  qualifier text,
  contact_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.edi_partners enable row level security;
create policy "company read edi partners" on public.edi_partners for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "managers write edi partners" on public.edi_partners for all to authenticated using (can_manage_company(auth.uid(), company_id)) with check (can_manage_company(auth.uid(), company_id));
create trigger edip_touch before update on public.edi_partners for each row execute function public.touch_updated_at();

create table if not exists public.edi_transactions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  partner_id uuid references public.edi_partners(id) on delete set null,
  transaction_type text not null,
  direction text not null,
  status text not null default 'received',
  control_number text,
  raw_payload text,
  parsed_payload jsonb,
  related_load_id uuid,
  related_shipment_id uuid,
  related_invoice_id uuid,
  error_message text,
  received_at timestamptz,
  processed_at timestamptz,
  acknowledged_at timestamptz,
  created_at timestamptz not null default now()
);
alter table public.edi_transactions enable row level security;
create policy "company read edi tx" on public.edi_transactions for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "managers write edi tx" on public.edi_transactions for all to authenticated using (can_manage_company(auth.uid(), company_id)) with check (can_manage_company(auth.uid(), company_id));

create table if not exists public.edi_mappings (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  partner_id uuid references public.edi_partners(id) on delete cascade,
  transaction_type text not null,
  source_field text not null,
  destination_field text not null,
  transform_rule text,
  required boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.edi_mappings enable row level security;
create policy "company read edi map" on public.edi_mappings for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "managers write edi map" on public.edi_mappings for all to authenticated using (can_manage_company(auth.uid(), company_id)) with check (can_manage_company(auth.uid(), company_id));

create table if not exists public.edi_acknowledgments (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  transaction_id uuid references public.edi_transactions(id) on delete cascade,
  acknowledgment_type text not null,
  status text not null,
  control_number text,
  message text,
  created_at timestamptz not null default now()
);
alter table public.edi_acknowledgments enable row level security;
create policy "company read edi ack" on public.edi_acknowledgments for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "members insert edi ack" on public.edi_acknowledgments for insert to authenticated with check (is_company_member(auth.uid(), company_id));

-- ============== API Keys ==============
create table if not exists public.api_keys (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  name text not null,
  prefix text not null,
  hashed_key text not null,
  scopes text[] not null default '{}',
  status text not null default 'active',
  last_used_at timestamptz,
  expires_at timestamptz,
  created_by uuid,
  created_at timestamptz not null default now(),
  revoked_at timestamptz
);
alter table public.api_keys enable row level security;
create policy "company read api keys meta" on public.api_keys for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "managers write api keys" on public.api_keys for all to authenticated using (can_manage_company(auth.uid(), company_id)) with check (can_manage_company(auth.uid(), company_id));

create table if not exists public.api_key_scopes (
  id uuid primary key default gen_random_uuid(),
  api_key_id uuid not null references public.api_keys(id) on delete cascade,
  scope text not null,
  created_at timestamptz not null default now()
);
alter table public.api_key_scopes enable row level security;
create policy "company read api scopes" on public.api_key_scopes for select to authenticated using (exists (select 1 from public.api_keys k where k.id = api_key_id and is_company_member(auth.uid(), k.company_id)));
create policy "managers write api scopes" on public.api_key_scopes for all to authenticated using (exists (select 1 from public.api_keys k where k.id = api_key_id and can_manage_company(auth.uid(), k.company_id))) with check (exists (select 1 from public.api_keys k where k.id = api_key_id and can_manage_company(auth.uid(), k.company_id)));

create table if not exists public.api_request_logs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  api_key_id uuid,
  method text not null,
  path text not null,
  status_code integer,
  duration_ms integer,
  ip_address text,
  user_agent text,
  request_id text,
  created_at timestamptz not null default now()
);
alter table public.api_request_logs enable row level security;
create policy "managers read api logs" on public.api_request_logs for select to authenticated using (can_manage_company(auth.uid(), company_id));
create policy "members insert api logs" on public.api_request_logs for insert to authenticated with check (is_company_member(auth.uid(), company_id));

-- ============== Webhooks ==============
create table if not exists public.webhook_endpoints (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  name text not null,
  url text not null,
  secret text not null,
  enabled boolean not null default true,
  event_types text[] not null default '{}',
  retry_policy jsonb not null default '{"max_attempts":5,"backoff":"exponential"}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.webhook_endpoints enable row level security;
create policy "company read webhook ep" on public.webhook_endpoints for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "managers write webhook ep" on public.webhook_endpoints for all to authenticated using (can_manage_company(auth.uid(), company_id)) with check (can_manage_company(auth.uid(), company_id));
create trigger we_touch before update on public.webhook_endpoints for each row execute function public.touch_updated_at();

create table if not exists public.webhook_deliveries (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  endpoint_id uuid not null references public.webhook_endpoints(id) on delete cascade,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'pending',
  response_code integer,
  response_body text,
  attempt_count integer not null default 0,
  next_retry_at timestamptz,
  delivered_at timestamptz,
  failed_at timestamptz,
  created_at timestamptz not null default now()
);
alter table public.webhook_deliveries enable row level security;
create policy "company read webhook del" on public.webhook_deliveries for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "managers write webhook del" on public.webhook_deliveries for all to authenticated using (can_manage_company(auth.uid(), company_id)) with check (can_manage_company(auth.uid(), company_id));

-- ============== Data Import/Export ==============
create table if not exists public.data_import_jobs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  import_type text not null,
  status text not null default 'pending',
  filename text,
  total_rows integer default 0,
  success_rows integer default 0,
  error_rows integer default 0,
  mapping jsonb not null default '{}'::jsonb,
  created_by uuid,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);
alter table public.data_import_jobs enable row level security;
create policy "company read import jobs" on public.data_import_jobs for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "managers write import jobs" on public.data_import_jobs for all to authenticated using (can_manage_company(auth.uid(), company_id)) with check (can_manage_company(auth.uid(), company_id));

create table if not exists public.data_import_rows (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.data_import_jobs(id) on delete cascade,
  company_id uuid not null,
  row_number integer not null,
  status text not null,
  payload jsonb not null,
  error text,
  created_at timestamptz not null default now()
);
alter table public.data_import_rows enable row level security;
create policy "company read import rows" on public.data_import_rows for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "members insert import rows" on public.data_import_rows for insert to authenticated with check (is_company_member(auth.uid(), company_id));

create table if not exists public.data_export_jobs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  export_type text not null,
  status text not null default 'pending',
  filters jsonb not null default '{}'::jsonb,
  file_url text,
  row_count integer,
  created_by uuid,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);
alter table public.data_export_jobs enable row level security;
create policy "company read export jobs" on public.data_export_jobs for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "managers write export jobs" on public.data_export_jobs for all to authenticated using (can_manage_company(auth.uid(), company_id)) with check (can_manage_company(auth.uid(), company_id));

-- ============== Optimization ==============
create table if not exists public.optimization_runs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  goal text not null default 'best_assignment',
  scope jsonb not null default '{}'::jsonb,
  status text not null default 'completed',
  summary jsonb not null default '{}'::jsonb,
  triggered_by uuid,
  created_at timestamptz not null default now()
);
alter table public.optimization_runs enable row level security;
create policy "company read opt runs" on public.optimization_runs for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "managers write opt runs" on public.optimization_runs for all to authenticated using (can_manage_company(auth.uid(), company_id)) with check (can_manage_company(auth.uid(), company_id));

create table if not exists public.optimization_recommendations (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  run_id uuid references public.optimization_runs(id) on delete cascade,
  load_id uuid,
  driver_id uuid,
  vehicle_id uuid,
  match_score numeric,
  deadhead_miles numeric,
  eta_to_pickup_min integer,
  on_time_probability numeric,
  estimated_fuel_cost numeric,
  risk_score numeric,
  explanation text,
  status text not null default 'suggested',
  created_at timestamptz not null default now()
);
alter table public.optimization_recommendations enable row level security;
create policy "company read opt recs" on public.optimization_recommendations for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "managers write opt recs" on public.optimization_recommendations for all to authenticated using (can_manage_company(auth.uid(), company_id)) with check (can_manage_company(auth.uid(), company_id));

-- ============== Rating ==============
create table if not exists public.rate_quotes (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  customer_id uuid,
  shipment_request_id uuid,
  load_id uuid,
  status text not null default 'draft',
  origin text,
  destination text,
  miles numeric,
  vehicle_type text,
  commodity text,
  weight numeric,
  urgency text,
  base_rate numeric default 0,
  fuel_surcharge numeric default 0,
  accessorials_total numeric default 0,
  total numeric default 0,
  margin_pct numeric,
  driver_pay_estimate numeric,
  expires_at timestamptz,
  notes text,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.rate_quotes enable row level security;
create policy "company read quotes" on public.rate_quotes for select to authenticated using (is_company_member(auth.uid(), company_id) or (customer_id in (select customer_ids_for_user(auth.uid()))));
create policy "managers write quotes" on public.rate_quotes for all to authenticated using (can_manage_company(auth.uid(), company_id)) with check (can_manage_company(auth.uid(), company_id));
create trigger rq_touch before update on public.rate_quotes for each row execute function public.touch_updated_at();

create table if not exists public.rate_quote_line_items (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references public.rate_quotes(id) on delete cascade,
  company_id uuid not null,
  label text not null,
  category text not null,
  amount numeric not null default 0,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
alter table public.rate_quote_line_items enable row level security;
create policy "company read quote items" on public.rate_quote_line_items for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "managers write quote items" on public.rate_quote_line_items for all to authenticated using (can_manage_company(auth.uid(), company_id)) with check (can_manage_company(auth.uid(), company_id));

create table if not exists public.customer_contract_rates (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  customer_id uuid not null,
  lane_origin text,
  lane_destination text,
  vehicle_type text,
  rate_per_mile numeric,
  flat_rate numeric,
  fuel_surcharge_pct numeric,
  effective_from date,
  effective_to date,
  notes text,
  created_at timestamptz not null default now()
);
alter table public.customer_contract_rates enable row level security;
create policy "company read contract rates" on public.customer_contract_rates for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "managers write contract rates" on public.customer_contract_rates for all to authenticated using (can_manage_company(auth.uid(), company_id)) with check (can_manage_company(auth.uid(), company_id));

create table if not exists public.fuel_surcharge_rules (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  name text not null,
  base_fuel_price numeric not null,
  miles_per_gallon numeric not null default 6.5,
  surcharge_per_mile numeric,
  index_source text,
  effective_from date,
  effective_to date,
  created_at timestamptz not null default now()
);
alter table public.fuel_surcharge_rules enable row level security;
create policy "company read fuel rules" on public.fuel_surcharge_rules for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "managers write fuel rules" on public.fuel_surcharge_rules for all to authenticated using (can_manage_company(auth.uid(), company_id)) with check (can_manage_company(auth.uid(), company_id));

create table if not exists public.accessorial_charges (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  code text not null,
  label text not null,
  default_amount numeric not null default 0,
  unit text,
  taxable boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.accessorial_charges enable row level security;
create policy "company read accessorials" on public.accessorial_charges for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "managers write accessorials" on public.accessorial_charges for all to authenticated using (can_manage_company(auth.uid(), company_id)) with check (can_manage_company(auth.uid(), company_id));

-- ============== White-label & Branding ==============
create table if not exists public.company_branding (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null unique,
  company_logo_url text,
  portal_logo_url text,
  primary_color text,
  secondary_color text,
  accent_color text,
  dark_mode_enabled boolean not null default true,
  custom_domain text,
  domain_verified boolean not null default false,
  ssl_status text default 'pending',
  support_email text,
  support_phone text,
  portal_title text,
  driver_app_brand_name text,
  customer_portal_brand_name text,
  hide_anderoute_branding boolean not null default false,
  custom_terms_url text,
  custom_privacy_url text,
  updated_at timestamptz not null default now()
);
alter table public.company_branding enable row level security;
create policy "company read branding" on public.company_branding for select to authenticated using (is_company_member(auth.uid(), company_id) or is_platform_owner(auth.uid()));
create policy "managers write branding" on public.company_branding for all to authenticated using (can_manage_company(auth.uid(), company_id)) with check (can_manage_company(auth.uid(), company_id));
create trigger cb_touch before update on public.company_branding for each row execute function public.touch_updated_at();

create table if not exists public.email_templates (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  template_type text not null,
  subject text not null,
  body_html text,
  body_text text,
  enabled boolean not null default true,
  branding_enabled boolean not null default true,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
alter table public.email_templates enable row level security;
create policy "company read email tmpl" on public.email_templates for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "managers write email tmpl" on public.email_templates for all to authenticated using (can_manage_company(auth.uid(), company_id)) with check (can_manage_company(auth.uid(), company_id));
create trigger et_touch before update on public.email_templates for each row execute function public.touch_updated_at();

-- ============== Documents ==============
create table if not exists public.document_records (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  document_type text not null,
  title text not null,
  storage_path text,
  mime_type text,
  size_bytes bigint,
  status text not null default 'active',
  tags text[] not null default '{}',
  expires_at date,
  uploaded_by uuid,
  created_at timestamptz not null default now()
);
alter table public.document_records enable row level security;
create policy "company read documents" on public.document_records for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "managers write documents" on public.document_records for all to authenticated using (can_manage_company(auth.uid(), company_id)) with check (can_manage_company(auth.uid(), company_id));

create table if not exists public.document_links (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.document_records(id) on delete cascade,
  company_id uuid not null,
  entity_type text not null,
  entity_id uuid not null,
  created_at timestamptz not null default now()
);
alter table public.document_links enable row level security;
create policy "company read doc links" on public.document_links for select to authenticated using (is_company_member(auth.uid(), company_id));
create policy "managers write doc links" on public.document_links for all to authenticated using (can_manage_company(auth.uid(), company_id)) with check (can_manage_company(auth.uid(), company_id));

-- ============== Indexes ==============
create index if not exists idx_ci_company on public.company_integrations(company_id);
create index if not exists idx_isl_company on public.integration_sync_logs(company_id, created_at desc);
create index if not exists idx_iel_company on public.integration_error_logs(company_id, created_at desc);
create index if not exists idx_ihe_company on public.integration_health_events(company_id, created_at desc);
create index if not exists idx_edip_company on public.edi_partners(company_id);
create index if not exists idx_edit_company on public.edi_transactions(company_id, created_at desc);
create index if not exists idx_apik_company on public.api_keys(company_id);
create index if not exists idx_apir_company on public.api_request_logs(company_id, created_at desc);
create index if not exists idx_we_company on public.webhook_endpoints(company_id);
create index if not exists idx_wd_company on public.webhook_deliveries(company_id, created_at desc);
create index if not exists idx_dij_company on public.data_import_jobs(company_id, created_at desc);
create index if not exists idx_dej_company on public.data_export_jobs(company_id, created_at desc);
create index if not exists idx_or_company on public.optimization_runs(company_id, created_at desc);
create index if not exists idx_orec_company on public.optimization_recommendations(company_id, created_at desc);
create index if not exists idx_rq_company on public.rate_quotes(company_id, created_at desc);
create index if not exists idx_dr_company on public.document_records(company_id, created_at desc);
create index if not exists idx_dl_entity on public.document_links(entity_type, entity_id);

-- ============== Seed connector catalog ==============
insert into public.integration_connectors (key, name, category, vendor, description, capabilities) values
  ('quickbooks','QuickBooks','accounting','Intuit','Sync invoices and customers','["invoices.export","customers.sync"]'::jsonb),
  ('xero','Xero','accounting','Xero','Cloud accounting sync','["invoices.export"]'::jsonb),
  ('netsuite','NetSuite','erp','Oracle','Enterprise ERP','["invoices.export","customers.sync"]'::jsonb),
  ('sap','SAP','erp','SAP','Enterprise ERP','["edi","invoices.export"]'::jsonb),
  ('salesforce','Salesforce','crm','Salesforce','CRM sync','["customers.sync"]'::jsonb),
  ('hubspot','HubSpot','crm','HubSpot','CRM sync','["customers.sync"]'::jsonb),
  ('samsara','Samsara','telematics','Samsara','Vehicle telematics','["gps.read","vehicles.sync"]'::jsonb),
  ('motive','Motive','telematics','Motive','ELD/telematics','["gps.read","hos.read"]'::jsonb),
  ('geotab','Geotab','telematics','Geotab','Fleet telematics','["gps.read"]'::jsonb),
  ('wex','WEX Fuel Card','fuel','WEX','Fuel transactions','["fuel.read"]'::jsonb),
  ('comdata','Comdata','fuel','Comdata','Fuel & payments','["fuel.read"]'::jsonb),
  ('google_drive','Google Drive','document_storage','Google','Document storage','["docs.upload"]'::jsonb),
  ('onedrive','OneDrive','document_storage','Microsoft','Document storage','["docs.upload"]'::jsonb),
  ('dropbox','Dropbox','document_storage','Dropbox','Document storage','["docs.upload"]'::jsonb),
  ('twilio','Twilio','notifications','Twilio','SMS/voice','["sms.send"]'::jsonb),
  ('sendgrid','SendGrid','notifications','Twilio','Email','["email.send"]'::jsonb),
  ('mapbox','Mapbox','maps','Mapbox','Maps & routing','["maps","routing"]'::jsonb),
  ('google_maps','Google Maps','maps','Google','Maps & routing','["maps","routing"]'::jsonb),
  ('here','HERE','maps','HERE','Truck routing','["maps","truck_routing"]'::jsonb),
  ('trimble','Trimble Maps','maps','Trimble','Truck routing','["truck_routing"]'::jsonb),
  ('dat','DAT Load Board','broker','DAT','Load board','["loads.read"]'::jsonb),
  ('truckstop','Truckstop','broker','Truckstop','Load board','["loads.read"]'::jsonb)
on conflict (key) do nothing;
