import { useEffect } from "react";
import {
  applyCompanyTheme,
  loadActiveTheme,
  type ThemeRow,
} from "@/lib/company-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let cancelled = false;

    const apply = (t: ThemeRow | null) => {
      if (!t || cancelled) return;
      applyCompanyTheme(t);
    };

    loadActiveTheme().then(apply).catch((e) => console.error("Theme load failed", e));

    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<ThemeRow>).detail;
      apply(detail);
    };
    window.addEventListener("ar-company-theme-change", onChange);

    // Re-apply for active mode whenever <html> .dark class toggles
    const observer = new MutationObserver(() => {
      loadActiveTheme().then(apply).catch(() => {});
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Re-apply on auth change (company may differ)
    const { data: sub } = (window as any).supabaseAuthSub ?? { data: null };
    void sub;

    return () => {
      cancelled = true;
      window.removeEventListener("ar-company-theme-change", onChange);
      observer.disconnect();
    };
  }, []);

  return <>{children}</>;
}
