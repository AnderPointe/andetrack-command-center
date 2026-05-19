ALTER TABLE public.proof_of_delivery
  ADD COLUMN IF NOT EXISTS dispatch_confirmed boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS dispatch_confirmed_at timestamptz,
  ADD COLUMN IF NOT EXISTS dispatch_confirmed_by uuid;

-- Allow company managers to update PODs (e.g., to confirm receipt)
DROP POLICY IF EXISTS "managers update pod" ON public.proof_of_delivery;
CREATE POLICY "managers update pod"
  ON public.proof_of_delivery
  FOR UPDATE
  TO authenticated
  USING (public.can_manage_company(auth.uid(), company_id))
  WITH CHECK (public.can_manage_company(auth.uid(), company_id));

ALTER PUBLICATION supabase_realtime ADD TABLE public.proof_of_delivery;