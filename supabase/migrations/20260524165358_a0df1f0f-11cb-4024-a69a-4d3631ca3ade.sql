
-- Tighten RLS on driver_locations: scope by company, restrict drivers to own row, allow driver self-upsert, and harden realtime payloads.

-- Helper: check if auth.uid() owns the driver row
CREATE OR REPLACE FUNCTION public.is_driver_self(_user_id uuid, _driver_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.drivers
    WHERE id = _driver_id AND user_id = _user_id
  );
$$;

-- Drop existing permissive policies
DROP POLICY IF EXISTS "Members view company driver locations" ON public.driver_locations;
DROP POLICY IF EXISTS "Dispatchers insert driver locations" ON public.driver_locations;
DROP POLICY IF EXISTS "Dispatchers update driver locations" ON public.driver_locations;
DROP POLICY IF EXISTS "Dispatchers delete driver locations" ON public.driver_locations;

-- SELECT: dispatchers/managers see all company rows; drivers see only their own
CREATE POLICY "Dispatchers view company driver locations"
ON public.driver_locations
FOR SELECT
TO authenticated
USING (public.can_manage_company(auth.uid(), company_id));

CREATE POLICY "Drivers view own location"
ON public.driver_locations
FOR SELECT
TO authenticated
USING (public.is_driver_self(auth.uid(), driver_id));

-- INSERT: dispatchers for their company; drivers only their own row in their own company
CREATE POLICY "Dispatchers insert driver locations"
ON public.driver_locations
FOR INSERT
TO authenticated
WITH CHECK (public.can_manage_company(auth.uid(), company_id));

CREATE POLICY "Drivers insert own location"
ON public.driver_locations
FOR INSERT
TO authenticated
WITH CHECK (
  public.is_driver_self(auth.uid(), driver_id)
  AND public.is_company_member(auth.uid(), company_id)
);

-- UPDATE
CREATE POLICY "Dispatchers update driver locations"
ON public.driver_locations
FOR UPDATE
TO authenticated
USING (public.can_manage_company(auth.uid(), company_id))
WITH CHECK (public.can_manage_company(auth.uid(), company_id));

CREATE POLICY "Drivers update own location"
ON public.driver_locations
FOR UPDATE
TO authenticated
USING (public.is_driver_self(auth.uid(), driver_id))
WITH CHECK (
  public.is_driver_self(auth.uid(), driver_id)
  AND public.is_company_member(auth.uid(), company_id)
);

-- DELETE: dispatchers only
CREATE POLICY "Dispatchers delete driver locations"
ON public.driver_locations
FOR DELETE
TO authenticated
USING (public.can_manage_company(auth.uid(), company_id));

-- Realtime: ensure publication includes the table and REPLICA IDENTITY FULL so
-- UPDATE/DELETE events carry the full old row for RLS filtering on the client.
ALTER TABLE public.driver_locations REPLICA IDENTITY FULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'driver_locations'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.driver_locations';
  END IF;
END $$;
