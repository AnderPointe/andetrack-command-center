-- Phase 19 — V3 schema additions (DRAFT — not executed)
-- All tenant-owned tables MUST include company_id.
-- RLS examples live in docs/phase19-rls.sql.

create table if not exists public.driver_app_sessions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  driver_id uuid not null,
  app_version text, os text, device_model text,
  started_at timestamptz not null default now(),
  ended_at timestamptz
);

create table if not exists public.driver_app_health_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  driver_id uuid not null,
  app_version text,
  health_score int,
  last_sync_age_sec int,
  offline_queue_size int,
  payload jsonb,
  created_at timestamptz default now()
);

create table if not exists public.mobile_permission_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  driver_id uuid not null,
  permission text not null,
  status text not null,
  created_at timestamptz default now()
);

create table if not exists public.offline_action_queue (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  driver_id uuid not null,
  kind text not null,
  priority text default 'normal',
  retries int default 0,
  payload jsonb,
  conflict boolean default false,
  created_at timestamptz default now(),
  processed_at timestamptz
);

create table if not exists public.offline_conflicts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  queue_id uuid references public.offline_action_queue(id),
  resolution text,
  resolved_by uuid,
  resolved_at timestamptz,
  notes text
);

create table if not exists public.voice_command_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  driver_id uuid not null,
  intent text,
  confidence numeric,
  confirmed boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.voice_transcript_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  driver_id uuid not null,
  utterance text,
  response text,
  retention_until timestamptz,
  created_at timestamptz default now()
);

-- Telematics
create table if not exists public.telematics_providers (
  id text primary key, label text, capabilities text[]
);
create table if not exists public.company_telematics_integrations (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null, provider_id text references public.telematics_providers(id),
  status text default 'placeholder', credentials_ref text, created_at timestamptz default now()
);
create table if not exists public.telematics_vehicle_mappings (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null, telematics_id text, vehicle_id uuid, driver_id uuid
);
create table if not exists public.telematics_driver_mappings (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null, telematics_driver_id text, driver_id uuid
);
create table if not exists public.telematics_location_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null, vehicle_id uuid, lat numeric, lng numeric,
  speed_kph numeric, captured_at timestamptz, created_at timestamptz default now()
);
create table if not exists public.telematics_vehicle_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null, vehicle_id uuid, event_type text, payload jsonb,
  captured_at timestamptz, created_at timestamptz default now()
);
create table if not exists public.telematics_diagnostic_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null, vehicle_id uuid, dtc text, severity text,
  payload jsonb, captured_at timestamptz, created_at timestamptz default now()
);
create table if not exists public.telematics_sync_logs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null, provider_id text, event text, result text,
  count int, created_at timestamptz default now()
);
create table if not exists public.telematics_provider_errors (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null, provider_id text, error_code text, message text,
  created_at timestamptz default now()
);

-- Fleet hardware
create table if not exists public.fleet_hardware_devices (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null, kind text, model text, serial text,
  health text default 'unknown', created_at timestamptz default now()
);
create table if not exists public.fleet_hardware_assignments (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null, device_id uuid references public.fleet_hardware_devices(id),
  assigned_to text, assigned_at timestamptz default now(), released_at timestamptz
);

-- Carrier marketplace
create table if not exists public.carrier_profiles (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null, name text, mc_number text, score int default 0,
  created_at timestamptz default now()
);
create table if not exists public.carrier_users (
  id uuid primary key default gen_random_uuid(),
  carrier_id uuid references public.carrier_profiles(id),
  user_id uuid, role text, status text default 'active'
);
create table if not exists public.carrier_equipment (
  id uuid primary key default gen_random_uuid(),
  carrier_id uuid references public.carrier_profiles(id), equipment_type text, count int default 0
);
create table if not exists public.carrier_service_regions (
  id uuid primary key default gen_random_uuid(),
  carrier_id uuid references public.carrier_profiles(id), region text
);
create table if not exists public.carrier_compliance_records (
  id uuid primary key default gen_random_uuid(),
  carrier_id uuid references public.carrier_profiles(id), item text, status text, expires_on date
);
create table if not exists public.carrier_documents (
  id uuid primary key default gen_random_uuid(),
  carrier_id uuid references public.carrier_profiles(id), name text, url text,
  uploaded_at timestamptz default now()
);
create table if not exists public.marketplace_load_posts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null, origin text, destination text, equipment text,
  posted_rate numeric, status text default 'posted', created_at timestamptz default now()
);
create table if not exists public.carrier_bids (
  id uuid primary key default gen_random_uuid(),
  load_id uuid references public.marketplace_load_posts(id),
  carrier_id uuid references public.carrier_profiles(id),
  amount numeric, eta date, status text default 'open',
  created_at timestamptz default now()
);
create table if not exists public.carrier_awards (
  id uuid primary key default gen_random_uuid(),
  load_id uuid references public.marketplace_load_posts(id),
  carrier_id uuid references public.carrier_profiles(id),
  awarded_at timestamptz default now(), awarded_by uuid
);

-- Engagement + certification + admin
create table if not exists public.driver_engagement_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null, driver_id uuid, kind text, payload jsonb, created_at timestamptz default now()
);
create table if not exists public.driver_announcements (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null, title text, body text, created_at timestamptz default now()
);
create table if not exists public.driver_feedback (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null, driver_id uuid, topic text, body text, created_at timestamptz default now()
);
create table if not exists public.certification_readiness_items (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null, area text, score int, status text, notes text
);
create table if not exists public.security_questionnaire_responses (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null, category text, question text, answer text, evidence_ref text
);
create table if not exists public.vendor_review_packets (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null, packet_name text, generated_at timestamptz default now(), url text
);
create table if not exists public.enterprise_admin_policies (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null, policy text, value text, updated_at timestamptz default now()
);
create table if not exists public.mobile_policy_settings (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null, policy text, value text
);
create table if not exists public.android_auto_readiness_items (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null, item text, status text
);
create table if not exists public.carplay_readiness_items (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null, item text, status text
);
