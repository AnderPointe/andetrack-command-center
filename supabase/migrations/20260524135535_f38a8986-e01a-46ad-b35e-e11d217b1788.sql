-- Driver status enum (reuse if exists)
DO $$ BEGIN
  CREATE TYPE public.driver_location_status AS ENUM ('driving','idle','loading','unloading','break','offline');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.driver_locations (
  driver_id uuid PRIMARY KEY,
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  unit_number text,
  vehicle_type text,
  status public.driver_location_status NOT NULL DEFAULT 'idle',
  latitude double precision NOT NULL,
  longitude double precision NOT NULL,
  heading double precision DEFAULT 0,
  speed_mph double precision DEFAULT 0,
  eta_minutes integer DEFAULT 0,
  current_load_number text,
  last_ping_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_driver_locations_company ON public.driver_locations(company_id);
CREATE INDEX IF NOT EXISTS idx_driver_locations_last_ping ON public.driver_locations(last_ping_at DESC);

ALTER TABLE public.driver_locations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Members view company driver locations" ON public.driver_locations;
CREATE POLICY "Members view company driver locations"
ON public.driver_locations FOR SELECT
USING (public.is_company_member(auth.uid(), company_id));

DROP POLICY IF EXISTS "Dispatchers insert driver locations" ON public.driver_locations;
CREATE POLICY "Dispatchers insert driver locations"
ON public.driver_locations FOR INSERT
WITH CHECK (public.can_manage_company(auth.uid(), company_id));

DROP POLICY IF EXISTS "Dispatchers update driver locations" ON public.driver_locations;
CREATE POLICY "Dispatchers update driver locations"
ON public.driver_locations FOR UPDATE
USING (public.can_manage_company(auth.uid(), company_id))
WITH CHECK (public.can_manage_company(auth.uid(), company_id));

DROP POLICY IF EXISTS "Dispatchers delete driver locations" ON public.driver_locations;
CREATE POLICY "Dispatchers delete driver locations"
ON public.driver_locations FOR DELETE
USING (public.can_manage_company(auth.uid(), company_id));

DROP TRIGGER IF EXISTS trg_driver_locations_touch ON public.driver_locations;
CREATE TRIGGER trg_driver_locations_touch
BEFORE UPDATE ON public.driver_locations
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

ALTER TABLE public.driver_locations REPLICA IDENTITY FULL;
DO $$ BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.driver_locations;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
