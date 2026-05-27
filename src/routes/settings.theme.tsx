import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  Download,
  Image as ImageIcon,
  Moon,
  Palette,
  RefreshCcw,
  Save,
  Sparkles,
  Sun,
  Upload,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DEFAULT_THEME,
  THEME_PRESETS,
  applyTheme,
  loadTheme,
  resetTheme,
  saveTheme,
  type CompanyTheme,
  type ThemeMeta,
  type ThemeTokens,
} from "@/lib/theme";

export const Route = createFileRoute("/settings/theme")({
  head: () => ({
    meta: [
      { title: "Theme Studio — Anderoute" },
      {
        name: "description",
        content:
          "Customize Anderoute Command for your company brand — colors, fonts, glass, logo, and themes that apply across every workspace.",
      },
    ],
  }),
  component: ThemeSettingsPage,
});

const FONTS: ThemeMeta["font"][] = [
  "Inter",
  "SF Pro Display",
  "Space Grotesk",
  "Sora",
  "Manrope",
  "JetBrains Mono",
];
const RADII: ThemeMeta["radius"][] = ["sharp", "soft", "round", "pill"];
const GLASSES: ThemeMeta["glass"][] = ["low", "medium", "high"];
const SHADOWS: ThemeMeta["shadow"][] = ["none", "soft", "medium", "dramatic"];

function ThemeSettingsPage() {
  const [theme, setTheme] = useState<CompanyTheme>(DEFAULT_THEME);
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTheme(loadTheme());
  }, []);

  // Live-apply theme to preview panel only (don't mutate whole app until Save)
  useEffect(() => {
    if (previewRef.current) applyTheme(theme, previewRef.current);
  }, [theme, mode]);

  function updateTokens(patch: Partial<ThemeTokens>) {
    setTheme((t) => ({ ...t, tokens: { ...t.tokens, ...patch } }));
    setDirty(true);
  }
  function updateMeta(patch: Partial<ThemeMeta>) {
    setTheme((t) => ({ ...t, meta: { ...t.meta, ...patch } }));
    setDirty(true);
  }
  function applyPreset(p: CompanyTheme) {
    setTheme({ ...p });
    setDirty(true);
  }
  function customizePreset(p: CompanyTheme) {
    setTheme({ ...p, id: "custom", name: `${p.name} (Custom)` });
    setDirty(true);
    document.getElementById("customize")?.scrollIntoView({ behavior: "smooth" });
  }

  function handleSave() {
    saveTheme(theme);
    applyTheme(theme); // apply across app
    setDirty(false);
    setSavedAt(Date.now());
  }
  function handleReset() {
    resetTheme();
    setTheme(DEFAULT_THEME);
    setDirty(false);
  }

  function uploadLogo(kind: "logoLight" | "logoDark", file?: File | null) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateMeta({ [kind]: reader.result as string });
    reader.readAsDataURL(file);
  }

  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <Sparkles className="size-3 text-primary" /> Theme Studio
            </div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">
              Company Theme & Branding
            </h1>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
              Pick a preset or design your own. Themes apply across Command Center, Live Map,
              Messenger, Dispatch, Driver Profiles, Customer Portal, the Mobile Driver App,
              Invoices, Reports and Settings.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2" onClick={handleReset}>
              <RefreshCcw className="size-4" /> Reset to default
            </Button>
            <Button size="sm" className="gap-2" onClick={handleSave} disabled={!dirty}>
              <Save className="size-4" /> Save theme
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="gap-2"
              onClick={handleSave}
              disabled={!dirty}
            >
              <Download className="size-4" /> Publish to company
            </Button>
            {savedAt && !dirty && (
              <span className="text-[11px] text-success">Saved · live across workspace</span>
            )}
          </div>
        </div>

        {/* Theme Gallery */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold tracking-tight flex items-center gap-2">
              <Palette className="size-4 text-primary" /> Theme Gallery
            </h2>
            <span className="text-[11px] text-muted-foreground">
              {THEME_PRESETS.length} templates
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {THEME_PRESETS.map((p) => {
              const active = theme.id === p.id;
              return (
                <div
                  key={p.id}
                  className={cn(
                    "group relative rounded-3xl border bg-card/60 p-4 backdrop-blur-xl transition-all",
                    "hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]",
                    active ? "border-primary/60 ring-1 ring-primary/40" : "border-border",
                  )}
                >
                  {active && (
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
                      <Check className="size-3" /> Active
                    </span>
                  )}
                  <div className="grid grid-cols-2 gap-1.5 h-24 rounded-2xl overflow-hidden border border-border">
                    {/* Light preview */}
                    <div
                      className="relative p-2"
                      style={{ background: p.tokens.backgroundLight }}
                    >
                      <div
                        className="absolute inset-2 rounded-md"
                        style={{
                          background: p.tokens.cardGlass,
                          border: `1px solid ${p.tokens.border}`,
                        }}
                      />
                      <div
                        className="relative z-10 mt-1 size-3 rounded-full"
                        style={{ background: p.tokens.primary }}
                      />
                    </div>
                    {/* Dark preview */}
                    <div
                      className="relative p-2"
                      style={{ background: p.tokens.backgroundDark }}
                    >
                      <div
                        className="absolute inset-2 rounded-md"
                        style={{
                          background: p.tokens.cardGlass,
                          border: `1px solid ${p.tokens.border}`,
                        }}
                      />
                      <div
                        className="relative z-10 mt-1 size-3 rounded-full"
                        style={{ background: p.tokens.primary }}
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <h3 className="text-sm font-semibold">{p.name}</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{p.useCase}</p>
                  </div>

                  <div className="flex items-center gap-1.5 mt-3">
                    {[
                      p.tokens.primary,
                      p.tokens.accent,
                      p.tokens.success,
                      p.tokens.warning,
                      p.tokens.destructive,
                    ].map((c, i) => (
                      <span
                        key={i}
                        className="size-4 rounded-full ring-1 ring-border"
                        style={{ background: c }}
                      />
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <Button size="sm" className="flex-1 h-8 text-xs" onClick={() => applyPreset(p)}>
                      Apply
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 h-8 text-xs"
                      onClick={() => customizePreset(p)}
                    >
                      Customize
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Customize + Preview */}
        <div id="customize" className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* Controls */}
          <div className="rounded-3xl border border-border bg-card/60 backdrop-blur-xl p-5 space-y-6">
            <div>
              <h2 className="text-sm font-semibold tracking-tight">Brand colors</h2>
              <p className="text-[11px] text-muted-foreground">Drives buttons, badges, links, charts.</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <ColorField label="Primary" value={theme.tokens.primary} onChange={(v) => updateTokens({ primary: v })} />
                <ColorField label="Secondary" value={theme.tokens.secondary} onChange={(v) => updateTokens({ secondary: v })} />
                <ColorField label="Accent" value={theme.tokens.accent} onChange={(v) => updateTokens({ accent: v })} />
                <ColorField label="Success" value={theme.tokens.success} onChange={(v) => updateTokens({ success: v })} />
                <ColorField label="Warning" value={theme.tokens.warning} onChange={(v) => updateTokens({ warning: v })} />
                <ColorField label="Danger" value={theme.tokens.destructive} onChange={(v) => updateTokens({ destructive: v })} />
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold tracking-tight">Surfaces</h2>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <ColorField label="Light background" value={theme.tokens.backgroundLight} onChange={(v) => updateTokens({ backgroundLight: v })} />
                <ColorField label="Dark background" value={theme.tokens.backgroundDark} onChange={(v) => updateTokens({ backgroundDark: v })} />
                <ColorField label="Card glass" value={theme.tokens.cardGlass} onChange={(v) => updateTokens({ cardGlass: v })} allowAlpha />
                <ColorField label="Border" value={theme.tokens.border} onChange={(v) => updateTokens({ border: v })} allowAlpha />
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold tracking-tight">Logos</h2>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <LogoField
                  label="Light mode logo"
                  src={theme.meta.logoLight}
                  bg={theme.tokens.backgroundLight}
                  onChange={(f) => uploadLogo("logoLight", f)}
                  onClear={() => updateMeta({ logoLight: undefined })}
                />
                <LogoField
                  label="Dark mode logo"
                  src={theme.meta.logoDark}
                  bg={theme.tokens.backgroundDark}
                  onChange={(f) => uploadLogo("logoDark", f)}
                  onClear={() => updateMeta({ logoDark: undefined })}
                />
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold tracking-tight">Typography & shape</h2>
              <div className="mt-3 space-y-3">
                <SegmentRow label="Font">
                  {FONTS.map((f) => (
                    <Seg key={f} active={theme.meta.font === f} onClick={() => updateMeta({ font: f })}>
                      <span style={{ fontFamily: f }}>{f}</span>
                    </Seg>
                  ))}
                </SegmentRow>
                <SegmentRow label="Radius">
                  {RADII.map((r) => (
                    <Seg key={r} active={theme.meta.radius === r} onClick={() => updateMeta({ radius: r })}>
                      {r}
                    </Seg>
                  ))}
                </SegmentRow>
                <SegmentRow label="Glass intensity">
                  {GLASSES.map((g) => (
                    <Seg key={g} active={theme.meta.glass === g} onClick={() => updateMeta({ glass: g })}>
                      {g}
                    </Seg>
                  ))}
                </SegmentRow>
                <SegmentRow label="Shadow intensity">
                  {SHADOWS.map((s) => (
                    <Seg key={s} active={theme.meta.shadow === s} onClick={() => updateMeta({ shadow: s })}>
                      {s}
                    </Seg>
                  ))}
                </SegmentRow>
              </div>
            </div>
          </div>

          {/* Live preview */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold tracking-tight">Live preview</h2>
              <div className="inline-flex rounded-full border border-border p-0.5 bg-card/60">
                <button
                  onClick={() => setMode("light")}
                  className={cn(
                    "px-3 py-1 text-[11px] rounded-full inline-flex items-center gap-1.5",
                    mode === "light" ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                  )}
                >
                  <Sun className="size-3" /> Light
                </button>
                <button
                  onClick={() => setMode("dark")}
                  className={cn(
                    "px-3 py-1 text-[11px] rounded-full inline-flex items-center gap-1.5",
                    mode === "dark" ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                  )}
                >
                  <Moon className="size-3" /> Dark
                </button>
              </div>
            </div>
            <ThemePreview ref={previewRef} theme={theme} mode={mode} />
          </div>
        </div>
      </div>
    </AppShell>
  );
}

/* ---------- Controls ---------- */

function ColorField({
  label,
  value,
  onChange,
  allowAlpha,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  allowAlpha?: boolean;
}) {
  // For native color input, strip rgba — keep raw text in input
  const hex = useMemo(() => {
    if (value.startsWith("#")) return value;
    return "#888888";
  }, [value]);
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
      <div className="mt-1 flex items-center gap-2 rounded-xl border border-border bg-background/50 p-1.5">
        <input
          type="color"
          value={hex}
          onChange={(e) => onChange(e.target.value)}
          className="h-7 w-9 cursor-pointer rounded-md border-none bg-transparent p-0"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          placeholder={allowAlpha ? "rgba(...) or #hex" : "#hex"}
          className="flex-1 bg-transparent text-xs outline-none font-mono"
        />
      </div>
    </label>
  );
}

function SegmentRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-1.5">{label}</div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}
function Seg({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-2.5 py-1 rounded-full text-[11px] border capitalize transition",
        active
          ? "border-primary/50 bg-primary/15 text-primary"
          : "border-border bg-card/40 text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function LogoField({
  label,
  src,
  bg,
  onChange,
  onClear,
}: {
  label: string;
  src?: string;
  bg: string;
  onChange: (f: File | null) => void;
  onClear: () => void;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-1.5">
        {label}
      </div>
      <label
        className="relative flex h-20 cursor-pointer items-center justify-center rounded-xl border border-dashed border-border overflow-hidden"
        style={{ background: bg }}
      >
        {src ? (
          <img src={src} alt={label} className="max-h-full max-w-full object-contain" />
        ) : (
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            <Upload className="size-4" />
            <span className="text-[10px]">PNG / SVG</span>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </label>
      {src && (
        <button onClick={onClear} className="mt-1 text-[10px] text-muted-foreground hover:text-destructive">
          Remove
        </button>
      )}
    </div>
  );
}

/* ---------- Preview ---------- */

const ThemePreview = ({
  theme,
  mode,
  ref,
}: {
  theme: CompanyTheme;
  mode: "light" | "dark";
  ref: React.RefObject<HTMLDivElement | null>;
}) => {
  const t = theme.tokens;
  const bg = mode === "dark" ? t.backgroundDark : t.backgroundLight;
  const fg = mode === "dark" ? "#F8FAFC" : "#0F172A";
  const muted = mode === "dark" ? "rgba(248,250,252,0.6)" : "rgba(15,23,42,0.6)";

  const radiusMap = { sharp: "6px", soft: "14px", round: "22px", pill: "32px" } as const;
  const shadowMap = {
    none: "none",
    soft: "0 4px 14px -4px rgba(0,0,0,0.18)",
    medium: "0 14px 40px -14px rgba(0,0,0,0.45)",
    dramatic: "0 28px 70px -20px rgba(0,0,0,0.6)",
  } as const;
  const blurMap = { low: "8px", medium: "16px", high: "26px" } as const;

  const radius = radiusMap[theme.meta.radius];
  const shadow = shadowMap[theme.meta.shadow];
  const blur = blurMap[theme.meta.glass];
  const logo = mode === "dark" ? theme.meta.logoDark : theme.meta.logoLight;

  return (
    <div
      ref={ref}
      className={cn(mode === "dark" && "dark")}
      style={{
        background: bg,
        color: fg,
        borderRadius: 24,
        border: `1px solid ${t.border}`,
        boxShadow: shadow,
        fontFamily: theme.meta.font,
        overflow: "hidden",
        minHeight: 520,
      }}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: `1px solid ${t.border}`, background: t.cardGlass, backdropFilter: `blur(${blur})` }}
      >
        <div className="flex items-center gap-2.5">
          {logo ? (
            <img src={logo} alt="logo" className="h-7 max-w-[120px] object-contain" />
          ) : (
            <>
              <div
                className="grid size-7 place-items-center font-bold text-white"
                style={{ background: t.primary, borderRadius: radius }}
              >
                A
              </div>
              <span className="font-semibold tracking-tight">Anderoute</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] px-2 py-0.5"
            style={{ background: `${t.primary}26`, color: t.primary, borderRadius: 999 }}
          >
            Live
          </span>
          <span className="text-[10px]" style={{ color: muted }}>3 active loads</span>
        </div>
      </div>

      <div className="p-5 grid gap-4">
        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Active drivers", value: "48", tone: t.primary },
            { label: "On time", value: "94%", tone: t.success },
            { label: "Delayed", value: "3", tone: t.warning },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: t.cardGlass,
                border: `1px solid ${t.border}`,
                borderRadius: radius,
                backdropFilter: `blur(${blur})`,
                padding: 14,
              }}
            >
              <div className="text-[10px] uppercase tracking-wider" style={{ color: muted }}>
                {s.label}
              </div>
              <div className="mt-1 text-2xl font-semibold" style={{ color: s.tone }}>
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Message card */}
        <div
          style={{
            background: t.cardGlass,
            border: `1px solid ${t.border}`,
            borderRadius: radius,
            backdropFilter: `blur(${blur})`,
            padding: 16,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="size-9 rounded-full grid place-items-center text-xs font-bold text-white"
              style={{ background: t.primary }}
            >
              MR
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Marcus Reed</div>
              <div className="text-[11px]" style={{ color: muted }}>
                Driver · LD-1048 · 12 min from dropoff
              </div>
            </div>
            <span
              className="text-[10px] px-2 py-0.5"
              style={{ background: `${t.success}26`, color: t.success, borderRadius: 999 }}
            >
              On time
            </span>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              style={{
                background: t.primary,
                color: "#fff",
                borderRadius: radius,
                padding: "8px 14px",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              View on map
            </button>
            <button
              style={{
                background: "transparent",
                color: fg,
                border: `1px solid ${t.border}`,
                borderRadius: radius,
                padding: "8px 14px",
                fontSize: 12,
              }}
            >
              Reassign load
            </button>
            <button
              style={{
                background: `${t.destructive}22`,
                color: t.destructive,
                borderRadius: radius,
                padding: "8px 14px",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              Create alert
            </button>
          </div>
        </div>

        {/* Swatch row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {[t.primary, t.secondary, t.accent, t.success, t.warning, t.destructive].map(
              (c, i) => (
                <span
                  key={i}
                  className="size-5 rounded-full"
                  style={{ background: c, border: `1px solid ${t.border}` }}
                />
              ),
            )}
          </div>
          <div className="text-[10px] inline-flex items-center gap-1" style={{ color: muted }}>
            <ImageIcon className="size-3" />
            Applies across Command Center, Messenger, Dispatch, Map, Driver App, Invoices, Reports.
          </div>
        </div>
      </div>
    </div>
  );
};
