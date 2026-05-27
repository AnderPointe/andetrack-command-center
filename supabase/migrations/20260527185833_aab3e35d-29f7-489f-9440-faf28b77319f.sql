CREATE TABLE public.company_theme_assets (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  asset_type text not null,
  asset_name text not null,
  asset_url text not null,
  file_type text,
  file_size_bytes bigint,
  is_active boolean default true,
  uploaded_by uuid,
  created_at timestamptz default now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.company_theme_assets TO authenticated;
GRANT ALL ON public.company_theme_assets TO service_role;

ALTER TABLE public.company_theme_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Company members can view their theme assets"
ON public.company_theme_assets
FOR SELECT
TO authenticated
USING (public.is_company_member(auth.uid(), company_id));

CREATE POLICY "Company admins can create theme assets"
ON public.company_theme_assets
FOR INSERT
TO authenticated
WITH CHECK (public.can_manage_company(auth.uid(), company_id));

CREATE POLICY "Company admins can update their theme assets"
ON public.company_theme_assets
FOR UPDATE
TO authenticated
USING (public.can_manage_company(auth.uid(), company_id));

CREATE POLICY "Company admins can delete their theme assets"
ON public.company_theme_assets
FOR DELETE
TO authenticated
USING (public.can_manage_company(auth.uid(), company_id));