ALTER TABLE public.shipments
ADD COLUMN IF NOT EXISTS is_hazardous boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS is_temperature_controlled boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS quantity_unit text DEFAULT 'pieces';