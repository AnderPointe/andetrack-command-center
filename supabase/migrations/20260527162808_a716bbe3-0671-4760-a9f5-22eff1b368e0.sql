CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE public.theme_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  theme_key text NOT NULL UNIQUE,
  theme_name text NOT NULL,
  description text,
  industry_type text DEFAULT 'logistics',
  is_system_template boolean DEFAULT true,
  is_active boolean DEFAULT true,
  primary_color text NOT NULL,
  secondary_color text NOT NULL,
  accent_color text NOT NULL,
  success_color text DEFAULT '#22C55E',
  warning_color text DEFAULT '#F59E0B',
  danger_color text DEFAULT '#EF4444',
  info_color text DEFAULT '#3B82F6',
  light_background text DEFAULT '#F8FAFC',
  light_surface text DEFAULT 'rgba(255,255,255,0.72)',
  light_text text DEFAULT '#0F172A',
  light_muted_text text DEFAULT '#64748B',
  dark_background text DEFAULT '#080A16',
  dark_surface text DEFAULT 'rgba(15,23,42,0.72)',
  dark_text text DEFAULT '#F8FAFC',
  dark_muted_text text DEFAULT '#8B90A7',
  glass_opacity numeric DEFAULT 0.72,
  glass_blur_px integer DEFAULT 24,
  border_radius_px integer DEFAULT 28,
  shadow_strength text DEFAULT 'medium',
  font_family text DEFAULT 'Inter',
  button_style text DEFAULT 'rounded',
  map_style_key text DEFAULT 'dark-logistics',
  theme_tokens jsonb DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.theme_templates TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.theme_templates TO authenticated;
GRANT ALL ON public.theme_templates TO service_role;

ALTER TABLE public.theme_templates ENABLE ROW LEVEL SECURITY;

-- Anyone (including unauthenticated visitors) can read active templates
CREATE POLICY "Active templates are readable by everyone"
  ON public.theme_templates
  FOR SELECT
  USING (is_active = true);

-- Only platform owners can create/update/delete templates (system catalog)
CREATE POLICY "Platform owners can insert templates"
  ON public.theme_templates
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_platform_owner(auth.uid()));

CREATE POLICY "Platform owners can update templates"
  ON public.theme_templates
  FOR UPDATE
  TO authenticated
  USING (public.is_platform_owner(auth.uid()))
  WITH CHECK (public.is_platform_owner(auth.uid()));

CREATE POLICY "Platform owners can delete templates"
  ON public.theme_templates
  FOR DELETE
  TO authenticated
  USING (public.is_platform_owner(auth.uid()));

-- Auto-update updated_at
CREATE TRIGGER trg_theme_templates_updated_at
  BEFORE UPDATE ON public.theme_templates
  FOR EACH ROW
  EXECUTE FUNCTION public.touch_updated_at();

CREATE INDEX idx_theme_templates_active ON public.theme_templates(is_active);
CREATE INDEX idx_theme_templates_industry ON public.theme_templates(industry_type);