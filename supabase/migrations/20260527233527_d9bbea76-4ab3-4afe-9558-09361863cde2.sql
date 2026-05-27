
-- Storage bucket for company theme branding assets (logos, favicons, markers)
INSERT INTO storage.buckets (id, name, public)
VALUES ('theme-assets', 'theme-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Public read of theme assets (logos shown on login/marketing surfaces)
CREATE POLICY "Theme assets are publicly readable"
ON storage.objects FOR SELECT
USING (bucket_id = 'theme-assets');

-- Authenticated company members can upload to their own company folder (first path segment = company_id)
CREATE POLICY "Company managers can upload theme assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'theme-assets'
  AND public.can_manage_company(auth.uid(), ((storage.foldername(name))[1])::uuid)
);

CREATE POLICY "Company managers can update theme assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'theme-assets'
  AND public.can_manage_company(auth.uid(), ((storage.foldername(name))[1])::uuid)
);

CREATE POLICY "Company managers can delete theme assets"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'theme-assets'
  AND public.can_manage_company(auth.uid(), ((storage.foldername(name))[1])::uuid)
);
