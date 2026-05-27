import { useEffect } from "react";

export type CompanyTheme = {
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
  glass_blur_px: number;
  border_radius_px: number;
};

export function useApplyCompanyTheme(theme: CompanyTheme, mode: "light" | "dark") {
  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty("--color-primary", theme.primary_color);
    root.style.setProperty("--color-secondary", theme.secondary_color);
    root.style.setProperty("--color-accent", theme.accent_color);

    root.style.setProperty("--color-success", theme.success_color);
    root.style.setProperty("--color-warning", theme.warning_color);
    root.style.setProperty("--color-danger", theme.danger_color);
    root.style.setProperty("--color-info", theme.info_color);

    root.style.setProperty(
      "--background",
      mode === "dark" ? theme.dark_background : theme.light_background
    );

    root.style.setProperty(
      "--surface-glass",
      mode === "dark" ? theme.dark_surface : theme.light_surface
    );

    root.style.setProperty(
      "--text-main",
      mode === "dark" ? theme.dark_text : theme.light_text
    );

    root.style.setProperty(
      "--text-muted",
      mode === "dark" ? theme.dark_muted_text : theme.light_muted_text
    );

    root.style.setProperty("--glass-blur", `${theme.glass_blur_px}px`);
    root.style.setProperty("--radius-card", `${theme.border_radius_px}px`);
  }, [theme, mode]);
}
