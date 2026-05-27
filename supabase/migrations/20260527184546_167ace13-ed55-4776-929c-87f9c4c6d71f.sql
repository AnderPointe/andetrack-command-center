CREATE TABLE public.company_theme_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL,
  theme_settings_id UUID REFERENCES public.company_theme_settings(id) ON DELETE CASCADE,
  version_name TEXT,
  theme_snapshot JSONB NOT NULL,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.company_theme_versions TO authenticated;
GRANT ALL ON public.company_theme_versions TO service_role;

ALTER TABLE public.company_theme_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Company members can view their company theme versions"
ON public.company_theme_versions
FOR SELECT
TO authenticated
USING (public.is_company_member(auth.uid(), company_id));

CREATE POLICY "Company admins can create theme versions"
ON public.company_theme_versions
FOR INSERT
TO authenticated
WITH CHECK (public.can_manage_company(auth.uid(), company_id));

CREATE POLICY "Company admins can update their company theme versions"
ON public.company_theme_versions
FOR UPDATE
TO authenticated
USING (public.can_manage_company(auth.uid(), company_id));

CREATE POLICY "Company admins can delete their company theme versions"
ON public.company_theme_versions
FOR DELETE
TO authenticated
USING (public.can_manage_company(auth.uid(), company_id));