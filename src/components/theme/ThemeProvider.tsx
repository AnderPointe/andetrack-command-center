import { useEffect } from "react";
import { applyTheme, loadTheme, type CompanyTheme } from "@/lib/theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    applyTheme(loadTheme());
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<CompanyTheme>).detail;
      if (detail) applyTheme(detail);
    };
    const onMode = () => applyTheme(loadTheme());
    window.addEventListener("ar-theme-change", onChange);
    // Reapply when dark mode toggles (TopBar toggles .dark class)
    const observer = new MutationObserver(onMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => {
      window.removeEventListener("ar-theme-change", onChange);
      observer.disconnect();
    };
  }, []);
  return <>{children}</>;
}
