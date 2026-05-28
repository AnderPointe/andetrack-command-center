// Company theme — backed by Supabase tables.
// Loads active company_theme_settings, applies CSS variables globally for
// both light and dark modes, and provides helpers for saving drafts,
// publishing (with a versioned snapshot), resetting to Anderoute Default,
// uploading logos, and recording asset metadata.

import { supabase } from "@/integrations/supabase/client";

export type ShadowStrength = "none" | "soft" | "medium" | "dramatic";

export type ThemeRow = {
  id?: string;
  company_id?: string;
  theme_template_id?: string | null;
  theme_name: string;
  theme_key?: string;
  is_custom?: boolean;
  is_published?: boolean;
  description?: string | null;

  primary_color: string;
  secondary_color: string;
  accent_color: string;
  success_color: string;
  warning_color: string;
  danger_color: string;
  info_color: string;

  light_background: string;
  light_surface: string;
  light_text: string;
  light_muted_text: string;
  dark_background: string;
  dark_surface: string;
  dark_text: string;
  dark_muted_text: string;

  glass_opacity: number;
  glass_blur_px: number;
  border_radius_px: number;
  shadow_strength: ShadowStrength;
  font_family: string;
  button_style: string;
  map_style_key: string;

  logo_light_url?: string | null;
  logo_dark_url?: string | null;
  favicon_url?: string | null;
};

export const ANDEROUTE_DEFAULT_KEY = "anderoute-default";

const SHADOW_MAP: Record<ShadowStrength, string> = {
  none: "none",
  soft: "0 4px 14px -4px rgba(0,0,0,0.18)",
  medium: "0 14px 40px -14px rgba(0,0,0,0.45)",
  dramatic: "0 28px 70px -20px rgba(0,0,0,0.6)",
};

/** Apply a theme row to a DOM target (defaults to <html>). Sets CSS vars
 *  for both light and dark and switches active values based on `.dark`. */
export function applyCompanyTheme(
  t: ThemeRow,
  target: HTMLElement | null = null,
  modeOverride?: "light" | "dark",
) {
  if (typeof document === "undefined") return;
  const root = target ?? document.documentElement;
  const mode =
    modeOverride ?? (root.classList.contains("dark") ? "dark" : "light");

  // Brand colors
  root.style.setProperty("--color-primary", t.primary_color);
  root.style.setProperty("--color-secondary", t.secondary_color);
  root.style.setProperty("--color-accent", t.accent_color);
  root.style.setProperty("--primary", t.primary_color);
  root.style.setProperty("--secondary", t.secondary_color);
  root.style.setProperty("--accent", t.accent_color);
  root.style.setProperty("--ring", t.primary_color);
  root.style.setProperty("--teal", t.primary_color);

  // Status colors
  root.style.setProperty("--color-success", t.success_color);
  root.style.setProperty("--color-warning", t.warning_color);
  root.style.setProperty("--color-danger", t.danger_color);
  root.style.setProperty("--color-info", t.info_color);
  root.style.setProperty("--success", t.success_color);
  root.style.setProperty("--warning", t.warning_color);
  root.style.setProperty("--destructive", t.danger_color);
  root.style.setProperty("--info", t.info_color);

  // Mode-dependent surface
  const bg = mode === "dark" ? t.dark_background : t.light_background;
  const surface = mode === "dark" ? t.dark_surface : t.light_surface;
  const text = mode === "dark" ? t.dark_text : t.light_text;
  const muted =
    mode === "dark" ? t.dark_muted_text : t.light_muted_text;

  root.style.setProperty("--background", bg);
  root.style.setProperty("--foreground", text);
  root.style.setProperty("--surface-glass", surface);
  root.style.setProperty("--card-glass", surface);
  root.style.setProperty("--card", surface);
  root.style.setProperty("--text-main", text);
  root.style.setProperty("--text-muted", muted);
  root.style.setProperty("--muted-foreground", muted);

  // Shape & glass
  root.style.setProperty("--glass-blur", `${t.glass_blur_px}px`);
  root.style.setProperty("--ar-glass", `blur(${t.glass_blur_px}px) saturate(140%)`);
  root.style.setProperty("--radius-card", `${t.border_radius_px}px`);
  root.style.setProperty("--radius", `${t.border_radius_px}px`);
  root.style.setProperty("--ar-shadow", SHADOW_MAP[t.shadow_strength] ?? SHADOW_MAP.medium);

  // Typography
  root.style.setProperty(
    "--font-display",
    `"${t.font_family}", ui-sans-serif, system-ui, sans-serif`,
  );
}

/** Get current user's company_id (via bootstrap if needed). */
export async function getCurrentCompanyId(): Promise<string | null> {
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("company_id")
    .eq("id", auth.user.id)
    .maybeSingle();
  if (profile?.company_id) return profile.company_id;

  const { data: bootstrapped } = await supabase.rpc("bootstrap_demo_membership");
  return (bootstrapped as string | null) ?? null;
}

/** Load active theme — company override (if any) or Anderoute Default. */
export async function loadActiveTheme(): Promise<ThemeRow | null> {
  const companyId = await getCurrentCompanyId();
  if (companyId) {
    const { data: company } = await supabase
      .from("company_theme_settings")
      .select("*")
      .eq("company_id", companyId)
      .maybeSingle();
    if (company) return company as ThemeRow;
  }
  const { data: tpl } = await supabase
    .from("theme_templates")
    .select("*")
    .eq("theme_key", ANDEROUTE_DEFAULT_KEY)
    .maybeSingle();
  return (tpl as ThemeRow) ?? null;
}

/** Load all active templates for the gallery. */
export async function loadTemplates(): Promise<ThemeRow[]> {
  const { data, error } = await supabase
    .from("theme_templates")
    .select("*")
    .eq("is_active", true)
    .order("theme_name");
  if (error) throw error;
  return (data as ThemeRow[]) ?? [];
}

const TEMPLATE_ONLY_KEYS = new Set([
  "id",
  "theme_template_id",
  "theme_key",
  "industry_type",
  "is_system_template",
  "is_active",
  "description",
  "created_at",
  "updated_at",
]);

/** Strip template-only columns so a template row can be saved as company settings. */
export function toCompanyDraft(row: Partial<ThemeRow>): Record<string, unknown> {
  const draft: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(row)) {
    if (TEMPLATE_ONLY_KEYS.has(k)) continue;
    draft[k] = v;
  }
  return draft;
}

/** Upsert company theme settings without publishing. */
export async function saveDraft(
  companyId: string,
  draft: Partial<ThemeRow>,
  templateId: string | null,
): Promise<ThemeRow> {
  const { data: auth } = await supabase.auth.getUser();
  const payload = {
    ...toCompanyDraft(draft as ThemeRow),
    company_id: companyId,
    theme_template_id: templateId,
    is_custom: true,
    is_published: false,
    updated_by: auth.user?.id ?? null,
    created_by: auth.user?.id ?? null,
  };
  const { data, error } = await supabase
    .from("company_theme_settings")
    .upsert(payload as any, { onConflict: "company_id" })
    .select("*")
    .single();
  if (error) throw error;
  return data as ThemeRow;
}

/** Snapshot the current published theme into company_theme_versions then
 *  upsert + publish the new theme. */
export async function publishTheme(
  companyId: string,
  draft: Partial<ThemeRow>,
  templateId: string | null,
): Promise<ThemeRow> {
  const { data: auth } = await supabase.auth.getUser();

  // Snapshot the existing settings (if any)
  const { data: existing } = await supabase
    .from("company_theme_settings")
    .select("*")
    .eq("company_id", companyId)
    .maybeSingle();
  if (existing) {
    await supabase.from("company_theme_versions").insert({
      company_id: companyId,
      theme_settings_id: existing.id,
      version_name: `Snapshot ${new Date().toISOString()}`,
      theme_snapshot: existing,
      created_by: auth.user?.id ?? null,
    });
  }

  const payload = {
    ...toCompanyDraft(draft as ThemeRow),
    company_id: companyId,
    theme_template_id: templateId,
    is_custom: true,
    is_published: true,
    updated_by: auth.user?.id ?? null,
    created_by: auth.user?.id ?? null,
  };
  const { data, error } = await supabase
    .from("company_theme_settings")
    .upsert(payload as any, { onConflict: "company_id" })
    .select("*")
    .single();
  if (error) throw error;

  // Broadcast so every mounted ThemeProvider re-applies
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("ar-company-theme-change", { detail: data }));
  }
  return data as ThemeRow;
}

/** Reset company override back to Anderoute Default and remove customizations. */
export async function resetToDefault(companyId: string): Promise<ThemeRow> {
  const { data: tpl, error: tplErr } = await supabase
    .from("theme_templates")
    .select("*")
    .eq("theme_key", ANDEROUTE_DEFAULT_KEY)
    .single();
  if (tplErr) throw tplErr;
  return publishTheme(companyId, tpl as ThemeRow, (tpl as any).id);
}

/** Upload a branding asset and record metadata. */
export async function uploadThemeAsset(
  companyId: string,
  assetType: "logo_light" | "logo_dark" | "favicon" | "map_marker",
  file: File,
): Promise<{ url: string }> {
  const ext = file.name.split(".").pop() || "png";
  const path = `${companyId}/${assetType}-${Date.now()}.${ext}`;
  const { error: upErr } = await supabase.storage
    .from("theme-assets")
    .upload(path, file, { upsert: true, contentType: file.type });
  if (upErr) throw upErr;
  const { data: pub } = supabase.storage.from("theme-assets").getPublicUrl(path);
  const url = pub.publicUrl;

  const { data: auth } = await supabase.auth.getUser();
  await supabase.from("company_theme_assets").insert({
    company_id: companyId,
    asset_type: assetType,
    asset_name: file.name,
    asset_url: url,
    file_type: file.type,
    file_size_bytes: file.size,
    uploaded_by: auth.user?.id ?? null,
  });
  return { url };
}

/** Roles allowed to publish/edit themes. */
const PUBLISH_ROLES = new Set([
  "owner",
  "admin",
  "company_owner",
  "company_admin",
  "platform_owner",
]);

export type ThemePermissions = {
  canEdit: boolean;
  canPublish: boolean;
  canPreview: boolean;
  role: string | null;
};

export async function loadThemePermissions(
  companyId: string | null,
): Promise<ThemePermissions> {
  if (!companyId) {
    return { canEdit: false, canPublish: false, canPreview: true, role: null };
  }
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    return { canEdit: false, canPublish: false, canPreview: false, role: null };
  }
  const { data: roles } = await supabase
    .from("user_roles")
    .select("role_id, roles(role_key)")
    .eq("user_id", auth.user.id)
    .eq("company_id", companyId);
  const roleList = (roles ?? []).map((r) => r.role as string);
  const role = roleList[0] ?? null;
  const canPublish = roleList.some((r) => PUBLISH_ROLES.has(r));
  const canEdit = canPublish;
  const canPreview = true;
  return { canEdit, canPublish, canPreview, role };
}
