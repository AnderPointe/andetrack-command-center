// Company theme customization system
// Stores theme in localStorage and applies CSS variables to :root

export type ThemeTokens = {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  destructive: string;
  backgroundLight: string;
  backgroundDark: string;
  cardGlass: string;
  border: string;
};

export type ThemeMeta = {
  font: "Inter" | "SF Pro Display" | "Space Grotesk" | "Sora" | "Manrope" | "JetBrains Mono";
  radius: "sharp" | "soft" | "round" | "pill";
  glass: "low" | "medium" | "high";
  shadow: "none" | "soft" | "medium" | "dramatic";
  logoLight?: string;
  logoDark?: string;
};

export type CompanyTheme = {
  id: string;
  name: string;
  useCase: string;
  tokens: ThemeTokens;
  meta: ThemeMeta;
};

const RADIUS_MAP: Record<ThemeMeta["radius"], string> = {
  sharp: "0.25rem",
  soft: "0.7rem",
  round: "1rem",
  pill: "1.5rem",
};

const SHADOW_MAP: Record<ThemeMeta["shadow"], string> = {
  none: "none",
  soft: "0 4px 14px -4px rgba(0,0,0,0.12)",
  medium: "0 12px 32px -10px rgba(0,0,0,0.25)",
  dramatic: "0 24px 60px -16px rgba(0,0,0,0.45)",
};

const GLASS_MAP: Record<ThemeMeta["glass"], string> = {
  low: "blur(8px) saturate(120%)",
  medium: "blur(16px) saturate(140%)",
  high: "blur(28px) saturate(160%)",
};

const DEFAULT_META: ThemeMeta = {
  font: "Inter",
  radius: "soft",
  glass: "medium",
  shadow: "medium",
};

export const THEME_PRESETS: CompanyTheme[] = [
  {
    id: "anderoute-default",
    name: "Anderoute Default",
    useCase: "Your default teal/orange logistics brand",
    tokens: {
      primary: "#0EA5A5",
      secondary: "#F1F5F9",
      accent: "#E0F7F6",
      success: "#22C55E",
      warning: "#F59E0B",
      destructive: "#EF4444",
      backgroundLight: "#F8FAFC",
      backgroundDark: "#080A16",
      cardGlass: "rgba(255,255,255,0.06)",
      border: "rgba(255,255,255,0.10)",
    },
    meta: DEFAULT_META,
  },
  {
    id: "midnight-purple",
    name: "Midnight Purple",
    useCase: "Messenger, dispatch, broker communication",
    tokens: {
      primary: "#6D35E8",
      secondary: "#1A1130",
      accent: "#2A1B4D",
      success: "#22C55E",
      warning: "#F59E0B",
      destructive: "#EF4444",
      backgroundLight: "#F5F3FF",
      backgroundDark: "#0B0820",
      cardGlass: "rgba(120,80,240,0.10)",
      border: "rgba(170,140,255,0.15)",
    },
    meta: { ...DEFAULT_META, glass: "high", shadow: "dramatic" },
  },
  {
    id: "freight-blue",
    name: "Freight Blue",
    useCase: "Enterprise freight customers",
    tokens: {
      primary: "#2563EB",
      secondary: "#EFF6FF",
      accent: "#DBEAFE",
      success: "#22C55E",
      warning: "#F59E0B",
      destructive: "#EF4444",
      backgroundLight: "#F8FAFC",
      backgroundDark: "#06101F",
      cardGlass: "rgba(37,99,235,0.10)",
      border: "rgba(96,165,250,0.18)",
    },
    meta: DEFAULT_META,
  },
  {
    id: "safety-orange",
    name: "Safety Orange",
    useCase: "Field operations and high-alert dispatch",
    tokens: {
      primary: "#F97316",
      secondary: "#FFF7ED",
      accent: "#FFEDD5",
      success: "#22C55E",
      warning: "#FACC15",
      destructive: "#DC2626",
      backgroundLight: "#FFFBF5",
      backgroundDark: "#150B05",
      cardGlass: "rgba(249,115,22,0.10)",
      border: "rgba(251,146,60,0.20)",
    },
    meta: { ...DEFAULT_META, radius: "round" },
  },
  {
    id: "emerald-logistics",
    name: "Emerald Logistics",
    useCase: "Food delivery, eco brands, courier service",
    tokens: {
      primary: "#10B981",
      secondary: "#ECFDF5",
      accent: "#D1FAE5",
      success: "#16A34A",
      warning: "#F59E0B",
      destructive: "#EF4444",
      backgroundLight: "#F7FDF9",
      backgroundDark: "#06140E",
      cardGlass: "rgba(16,185,129,0.10)",
      border: "rgba(52,211,153,0.20)",
    },
    meta: DEFAULT_META,
  },
  {
    id: "crimson-express",
    name: "Crimson Express",
    useCase: "Urgent freight and express delivery",
    tokens: {
      primary: "#DC2626",
      secondary: "#FEF2F2",
      accent: "#FEE2E2",
      success: "#22C55E",
      warning: "#F59E0B",
      destructive: "#B91C1C",
      backgroundLight: "#FFFAFA",
      backgroundDark: "#1A0707",
      cardGlass: "rgba(220,38,38,0.10)",
      border: "rgba(248,113,113,0.20)",
    },
    meta: { ...DEFAULT_META, shadow: "dramatic" },
  },
  {
    id: "executive-black-gold",
    name: "Executive Black & Gold",
    useCase: "Premium customers and executive portals",
    tokens: {
      primary: "#C9A84C",
      secondary: "#1A1A1A",
      accent: "#2D2418",
      success: "#22C55E",
      warning: "#F59E0B",
      destructive: "#EF4444",
      backgroundLight: "#FAF8F2",
      backgroundDark: "#0A0A0A",
      cardGlass: "rgba(201,168,76,0.08)",
      border: "rgba(201,168,76,0.20)",
    },
    meta: { ...DEFAULT_META, font: "SF Pro Display", radius: "sharp", shadow: "dramatic" },
  },
  {
    id: "clean-light",
    name: "Clean Light",
    useCase: "Customer portal and office users",
    tokens: {
      primary: "#0F172A",
      secondary: "#F1F5F9",
      accent: "#E2E8F0",
      success: "#22C55E",
      warning: "#F59E0B",
      destructive: "#EF4444",
      backgroundLight: "#FFFFFF",
      backgroundDark: "#0F172A",
      cardGlass: "rgba(0,0,0,0.04)",
      border: "rgba(15,23,42,0.10)",
    },
    meta: { ...DEFAULT_META, glass: "low", shadow: "soft" },
  },
  {
    id: "high-contrast-dispatch",
    name: "High Contrast Dispatch",
    useCase: "Control rooms and large dispatch monitors",
    tokens: {
      primary: "#FFEB3B",
      secondary: "#000000",
      accent: "#FFD600",
      success: "#00E676",
      warning: "#FFAB00",
      destructive: "#FF1744",
      backgroundLight: "#FFFFFF",
      backgroundDark: "#000000",
      cardGlass: "rgba(255,255,255,0.10)",
      border: "rgba(255,235,59,0.40)",
    },
    meta: { ...DEFAULT_META, font: "JetBrains Mono", radius: "sharp", glass: "low", shadow: "none" },
  },
  {
    id: "customer-brand-custom",
    name: "Customer Brand Custom",
    useCase: "Start blank — match your own brand",
    tokens: {
      primary: "#6366F1",
      secondary: "#EEF2FF",
      accent: "#E0E7FF",
      success: "#22C55E",
      warning: "#F59E0B",
      destructive: "#EF4444",
      backgroundLight: "#FAFAFA",
      backgroundDark: "#0F0F1A",
      cardGlass: "rgba(99,102,241,0.10)",
      border: "rgba(129,140,248,0.18)",
    },
    meta: DEFAULT_META,
  },
];

export const DEFAULT_THEME = THEME_PRESETS[0];

const STORAGE_KEY = "ar-company-theme";

export function loadTheme(): CompanyTheme {
  if (typeof window === "undefined") return DEFAULT_THEME;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_THEME;
    return JSON.parse(raw) as CompanyTheme;
  } catch {
    return DEFAULT_THEME;
  }
}

export function saveTheme(theme: CompanyTheme) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
  window.dispatchEvent(new CustomEvent("ar-theme-change", { detail: theme }));
}

export function resetTheme() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  applyTheme(DEFAULT_THEME);
  window.dispatchEvent(new CustomEvent("ar-theme-change", { detail: DEFAULT_THEME }));
}

export function applyTheme(theme: CompanyTheme, target: HTMLElement | null = null) {
  if (typeof document === "undefined") return;
  const root = target ?? document.documentElement;
  const isDark = root.classList.contains("dark");
  const t = theme.tokens;

  root.style.setProperty("--primary", t.primary);
  root.style.setProperty("--ring", t.primary);
  root.style.setProperty("--teal", t.primary);
  root.style.setProperty("--secondary", t.secondary);
  root.style.setProperty("--accent", t.accent);
  root.style.setProperty("--success", t.success);
  root.style.setProperty("--warning", t.warning);
  root.style.setProperty("--destructive", t.destructive);
  root.style.setProperty("--background", isDark ? t.backgroundDark : t.backgroundLight);
  root.style.setProperty("--card-glass", t.cardGlass);
  root.style.setProperty("--border", t.border);
  root.style.setProperty("--radius", RADIUS_MAP[theme.meta.radius]);
  root.style.setProperty("--font-display", `"${theme.meta.font}", ui-sans-serif, system-ui, sans-serif`);
  root.style.setProperty("--ar-shadow", SHADOW_MAP[theme.meta.shadow]);
  root.style.setProperty("--ar-glass", GLASS_MAP[theme.meta.glass]);
}
