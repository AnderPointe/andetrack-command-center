CREATE TABLE public.company_theme_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL UNIQUE,
  theme_template_id UUID REFERENCES public.theme_templates(id) ON DELETE SET NULL,
  theme_name TEXT NOT NULL DEFAULT 'Custom Theme',
  is_custom BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  primary_color TEXT NOT NULL,
  secondary_color TEXT NOT NULL,
  accent_color TEXT NOT NULL,
  success_color TEXT DEFAULT '#22C55E',
  warning_color TEXT DEFAULT '#F59E0B',
  danger_color TEXT DEFAULT '#EF4444',
  info_color TEXT DEFAULT '#3B82F6',
  light_background TEXT DEFAULT '#F8FAFC',
  light_surface TEXT DEFAULT 'rgba(255,255,255,0.72)',
  light_text TEXT DEFAULT '#0F172A',
  light_muted_text TEXT DEFAULT '#64748B',
  dark_background TEXT DEFAULT '#080A16',
  dark_surface TEXT DEFAULT 'rgba(15,23,42,0.72)',
  dark_text TEXT DEFAULT '#F8FAFC',
  dark_muted_text TEXT DEFAULT '#8B90A7',
  glass_opacity NUMERIC DEFAULT 0.72,
  glass_blur_px INTEGER DEFAULT 24,
  border_radius_px INTEGER DEFAULT 28,
  shadow_strength TEXT DEFAULT 'medium',
  font_family TEXT DEFAULT 'Inter',
  button_style TEXT DEFAULT 'rounded',
  map_style_key TEXT DEFAULT 'dark-logistics',
  logo_light_url TEXT,
  logo_dark_url TEXT,
  favicon_url TEXT,
  custom_css JSONB DEFAULT '{}',
  theme_tokens JSONB DEFAULT '{}',
  created_by UUID,
  updated_by UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.company_theme_settings TO authenticated;
GRANT ALL ON public.company_theme_settings TO service_role;

ALTER TABLE public.company_theme_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Company members can view their company theme settings"
ON public.company_theme_settings
FOR SELECT
TO authenticated
USING (public.is_company_member(auth.uid(), company_id));

CREATE POLICY "Company admins can manage their company theme settings"
ON public.company_theme_settings
FOR INSERT
TO authenticated
WITH CHECK (public.can_manage_company(auth.uid(), company_id));

CREATE POLICY "Company admins can update their company theme settings"
ON public.company_theme_settings
FOR UPDATE
TO authenticated
USING (public.can_manage_company(auth.uid(), company_id));

CREATE POLICY "Company admins can delete their company theme settings"
ON public.company_theme_settings
FOR DELETE
TO authenticated
USING (public.can_manage_company(auth.uid(), company_id));