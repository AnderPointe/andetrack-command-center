-- Add battery_level to vehicles (fuel_level already exists)
ALTER TABLE public.vehicles
  ADD COLUMN IF NOT EXISTS battery_level numeric(5,2);

-- Telemetry stream table for per-driver/per-shipment live metrics
CREATE TABLE IF NOT EXISTS public.telemetry (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  driver_id uuid NOT NULL REFERENCES public.drivers(id) ON DELETE CASCADE,
  shipment_id uuid REFERENCES public.shipments(id) ON DELETE SET NULL,
  speed_mph numeric(5,1),
  signal_percent numeric(5,2),
  route_progress_percent numeric(5,2),
  fuel_or_battery_percent numeric(5,2),
  trip_status text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS telemetry_driver_id_idx   ON public.telemetry(driver_id);
CREATE INDEX IF NOT EXISTS telemetry_shipment_id_idx ON public.telemetry(shipment_id);
CREATE INDEX IF NOT EXISTS telemetry_company_id_idx  ON public.telemetry(company_id);
CREATE INDEX IF NOT EXISTS telemetry_updated_at_idx  ON public.telemetry(updated_at DESC);

ALTER TABLE public.telemetry ENABLE ROW LEVEL SECURITY;

CREATE POLICY "company read telemetry"
  ON public.telemetry FOR SELECT
  TO authenticated
  USING (public.is_company_member(auth.uid(), company_id));

CREATE POLICY "managers write telemetry"
  ON public.telemetry FOR ALL
  TO authenticated
  USING (public.can_manage_company(auth.uid(), company_id))
  WITH CHECK (public.can_manage_company(auth.uid(), company_id));

CREATE POLICY "driver writes own telemetry"
  ON public.telemetry FOR INSERT
  TO authenticated
  WITH CHECK (public.is_driver_self(auth.uid(), driver_id));

CREATE TRIGGER trg_telemetry_touch
  BEFORE UPDATE ON public.telemetry
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

ALTER PUBLICATION supabase_realtime ADD TABLE public.telemetry;