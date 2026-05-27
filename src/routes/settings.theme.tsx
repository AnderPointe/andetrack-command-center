import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  MapPin,
  MessageSquare,
  Moon,
  Palette,
  RefreshCcw,
  Save,
  Send,
  Sparkles,
  Sun,
  Truck,
  Upload,
  Wand2,
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
const GLASSES: ThemeMeta["glass"][] = ["low", "medium", "high"];

function ThemeSettingsPage() {
  const [theme, setTheme] = useState<CompanyTheme>(DEFAULT_THEME);
  const [draft, setDraft] = useState<CompanyTheme | null>(null);
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [draftAt, setDraftAt] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTheme(loadTheme());
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("ar-theme-draft") : null;
      if (raw) setDraft(JSON.parse(raw));
    } catch {}
  }, []);

  // Live-apply theme to preview panel only (don't mutate whole app until Publish)
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

  function handleSaveDraft() {
    if (typeof window === "undefined") return;
    localStorage.setItem("ar-theme-draft", JSON.stringify(theme));
    setDraft(theme);
    setDraftAt(Date.now());
  }
  function handlePublish() {
    saveTheme(theme);
    applyTheme(theme);
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
      <div className="p-4 md:p-6 space-y-5 max-w-[1600px]">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <Sparkles className="size-3 text-primary" /> Theme Studio
            </div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">Theme Settings</h1>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
              Pick a template, preview it live across Command Center, Messenger, Driver, and Map, then publish to your whole company.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-2" onClick={handleReset}>
              <RefreshCcw className="size-4" /> Reset
            </Button>
            {draft && (
              <span className="text-[11px] text-muted-foreground">
                Draft saved · {draft.name}
              </span>
            )}
            {savedAt && !dirty && (
              <span className="text-[11px] text-success">Published · live across workspace</span>
            )}
          </div>
        </div>

        {/* 3-column layout */}
        <div className="grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)_320px]">
          {/* LEFT: Theme Gallery */}
          <aside className="rounded-3xl border border-border bg-card/60 backdrop-blur-xl p-3 lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
            <div className="flex items-center justify-between px-2 pt-1 pb-2">
              <h2 className="text-xs font-semibold tracking-tight inline-flex items-center gap-2">
                <Palette className="size-3.5 text-primary" /> Theme Gallery
              </h2>
              <span className="text-[10px] text-muted-foreground">{THEME_PRESETS.length}</span>
            </div>
            <ul className="space-y-1.5">
              {THEME_PRESETS.map((p) => {
                const active = theme.id === p.id;
                return (
                  <li key={p.id}>
                    <button
                      onClick={() => applyPreset(p)}
                      className={cn(
                        "w-full flex items-center gap-3 rounded-2xl border p-2 text-left transition",
                        active
                          ? "border-primary/60 bg-primary/5 ring-1 ring-primary/30"
                          : "border-border bg-background/40 hover:border-border hover:bg-card/80",
                      )}
                    >
                      <div
                        className="size-10 rounded-xl shrink-0 overflow-hidden grid grid-cols-2"
                        style={{ border: `1px solid ${p.tokens.border}` }}
                      >
                        <span style={{ background: p.tokens.backgroundLight }} />
                        <span style={{ background: p.tokens.backgroundDark }} />
                        <span style={{ background: p.tokens.primary }} />
                        <span style={{ background: p.tokens.accent }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-medium truncate">{p.name}</div>
                        <div className="text-[10px] text-muted-foreground truncate">{p.useCase}</div>
                      </div>
                      {active && <Check className="size-3.5 text-primary shrink-0" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* CENTER: Live Preview */}
          <section className="space-y-3">
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

            <PreviewStage ref={previewRef} theme={theme} mode={mode} />
          </section>

          {/* RIGHT: Customizer */}
          <aside className="rounded-3xl border border-border bg-card/60 backdrop-blur-xl p-4 space-y-5 lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
            <div>
              <h2 className="text-xs font-semibold tracking-tight inline-flex items-center gap-2">
                <Wand2 className="size-3.5 text-primary" /> Customizer
              </h2>
              <p className="text-[10px] text-muted-foreground mt-0.5">{theme.name}</p>
            </div>

            <div className="space-y-3">
              <ColorField label="Primary color" value={theme.tokens.primary} onChange={(v) => updateTokens({ primary: v })} />
              <ColorField label="Secondary color" value={theme.tokens.secondary} onChange={(v) => updateTokens({ secondary: v })} allowAlpha />
              <ColorField label="Accent color" value={theme.tokens.accent} onChange={(v) => updateTokens({ accent: v })} allowAlpha />
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-1.5">Backgrounds</div>
              <div className="grid grid-cols-2 gap-2">
                <ColorField label="Light" value={theme.tokens.backgroundLight} onChange={(v) => updateTokens({ backgroundLight: v })} compact />
                <ColorField label="Dark" value={theme.tokens.backgroundDark} onChange={(v) => updateTokens({ backgroundDark: v })} compact />
              </div>
            </div>

            <SegmentRow label="Glass intensity">
              {GLASSES.map((g) => (
                <Seg key={g} active={theme.meta.glass === g} onClick={() => updateMeta({ glass: g })}>
                  {g}
                </Seg>
              ))}
            </SegmentRow>

            <div>
              <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-1.5">Font</div>
              <select
                value={theme.meta.font}
                onChange={(e) => updateMeta({ font: e.target.value as ThemeMeta["font"] })}
                className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-xs outline-none focus:border-primary"
                style={{ fontFamily: theme.meta.font }}
              >
                {FONTS.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-1.5">Logo upload</div>
              <div className="grid grid-cols-2 gap-2">
                <LogoField
                  label="Light"
                  src={theme.meta.logoLight}
                  bg={theme.tokens.backgroundLight}
                  onChange={(f) => uploadLogo("logoLight", f)}
                  onClear={() => updateMeta({ logoLight: undefined })}
                />
                <LogoField
                  label="Dark"
                  src={theme.meta.logoDark}
                  bg={theme.tokens.backgroundDark}
                  onChange={(f) => uploadLogo("logoDark", f)}
                  onClear={() => updateMeta({ logoDark: undefined })}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-border space-y-2">
              <Button variant="outline" size="sm" className="w-full gap-2" onClick={handleSaveDraft}>
                <Save className="size-4" /> Save Draft
              </Button>
              <Button size="sm" className="w-full gap-2" onClick={handlePublish}>
                <Send className="size-4" /> Publish Theme
              </Button>
              {draftAt && (
                <p className="text-[10px] text-center text-muted-foreground">Draft autosaved locally</p>
              )}
            </div>
          </aside>
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
  compact,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  allowAlpha?: boolean;
  compact?: boolean;
}) {
  const hex = useMemo(() => (value.startsWith("#") ? value : "#888888"), [value]);
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
        {!compact && (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            spellCheck={false}
            placeholder={allowAlpha ? "rgba/#hex" : "#hex"}
            className="flex-1 bg-transparent text-xs outline-none font-mono min-w-0"
          />
        )}
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
      <div className="text-[10px] text-muted-foreground mb-1">{label}</div>
      <label
        className="relative flex h-16 cursor-pointer items-center justify-center rounded-xl border border-dashed border-border overflow-hidden"
        style={{ background: bg }}
      >
        {src ? (
          <img src={src} alt={label} className="max-h-full max-w-full object-contain" />
        ) : (
          <div className="flex flex-col items-center gap-0.5 text-muted-foreground">
            <Upload className="size-3.5" />
            <span className="text-[9px]">PNG / SVG</span>
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

/* ---------- Preview Stage with 4 sub-previews ---------- */

const radiusMap = { sharp: "6px", soft: "14px", round: "22px", pill: "32px" } as const;
const blurMap = { low: "8px", medium: "16px", high: "26px" } as const;
const shadowMap = {
  none: "none",
  soft: "0 4px 14px -4px rgba(0,0,0,0.18)",
  medium: "0 14px 40px -14px rgba(0,0,0,0.45)",
  dramatic: "0 28px 70px -20px rgba(0,0,0,0.6)",
} as const;

const PreviewStage = ({
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
  const radius = radiusMap[theme.meta.radius];
  const shadow = shadowMap[theme.meta.shadow];
  const blur = blurMap[theme.meta.glass];

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
        padding: 16,
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <CommandCenterPreview theme={theme} fg={fg} muted={muted} radius={radius} blur={blur} />
        <MessengerPreview theme={theme} mode={mode} fg={fg} muted={muted} radius={radius} blur={blur} />
        <DriverTilePreview theme={theme} fg={fg} muted={muted} radius={radius} blur={blur} />
        <MapMarkerPreview theme={theme} mode={mode} fg={fg} muted={muted} radius={radius} blur={blur} />
      </div>
    </div>
  );
};

function PreviewCard({
  title,
  icon,
  children,
  t,
  radius,
  blur,
  muted,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  t: ThemeTokens;
  radius: string;
  blur: string;
  muted: string;
}) {
  return (
    <div
      style={{
        background: t.cardGlass,
        border: `1px solid ${t.border}`,
        borderRadius: radius,
        backdropFilter: `blur(${blur})`,
        padding: 14,
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span style={{ color: t.primary }}>{icon}</span>
        <span className="text-[10px] uppercase tracking-[0.14em]" style={{ color: muted }}>
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

function CommandCenterPreview({ theme, fg, muted, radius, blur }: any) {
  const t: ThemeTokens = theme.tokens;
  return (
    <PreviewCard title="Command Center" icon={<Sparkles className="size-3.5" />} t={t} radius={radius} blur={blur} muted={muted}>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Drivers", value: "48", tone: t.primary },
          { label: "On time", value: "94%", tone: t.success },
          { label: "Delayed", value: "3", tone: t.warning },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: t.cardGlass,
              border: `1px solid ${t.border}`,
              borderRadius: radius,
              padding: 10,
            }}
          >
            <div className="text-[9px] uppercase tracking-wider" style={{ color: muted }}>
              {s.label}
            </div>
            <div className="mt-0.5 text-lg font-semibold" style={{ color: s.tone }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>
      <button
        className="mt-3 w-full text-xs font-semibold"
        style={{
          background: t.primary,
          color: "#fff",
          borderRadius: radius,
          padding: "8px 12px",
        }}
      >
        Dispatch all
      </button>
    </PreviewCard>
  );
}

function MessengerPreview({ theme, fg, muted, radius, blur }: any) {
  const t: ThemeTokens = theme.tokens;
  return (
    <PreviewCard title="Messenger" icon={<MessageSquare className="size-3.5" />} t={t} radius={radius} blur={blur} muted={muted}>
      <div className="space-y-2">
        <div className="flex gap-2 items-end">
          <div className="size-6 rounded-full grid place-items-center text-[9px] font-bold text-white" style={{ background: t.primary }}>MR</div>
          <div
            className="text-xs px-3 py-2 max-w-[75%]"
            style={{
              background: t.cardGlass,
              border: `1px solid ${t.border}`,
              borderRadius: radius,
              color: fg,
            }}
          >
            ETA 12 min to dropoff.
          </div>
        </div>
        <div className="flex gap-2 items-end justify-end">
          <div
            className="text-xs px-3 py-2 max-w-[75%] text-white font-medium"
            style={{ background: t.primary, borderRadius: radius }}
          >
            Copy that. Customer notified.
          </div>
        </div>
      </div>
      <div
        className="mt-3 flex items-center gap-2 px-3 py-1.5 text-[11px]"
        style={{ background: t.cardGlass, border: `1px solid ${t.border}`, borderRadius: radius, color: muted }}
      >
        <span className="flex-1">Type a message…</span>
        <Send className="size-3.5" style={{ color: t.primary }} />
      </div>
    </PreviewCard>
  );
}

function DriverTilePreview({ theme, fg, muted, radius, blur }: any) {
  const t: ThemeTokens = theme.tokens;
  return (
    <PreviewCard title="Driver tile" icon={<Truck className="size-3.5" />} t={t} radius={radius} blur={blur} muted={muted}>
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-full grid place-items-center text-xs font-bold text-white" style={{ background: t.primary }}>MR</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">Marcus Reed</div>
          <div className="text-[10px]" style={{ color: muted }}>CDL · LD-1048</div>
        </div>
        <span
          className="text-[9px] px-2 py-0.5 font-semibold"
          style={{ background: `${t.success}26`, color: t.success, borderRadius: 999 }}
        >
          On time
        </span>
      </div>
      <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: `${t.primary}22` }}>
        <div className="h-full" style={{ background: t.primary, width: "68%", borderRadius: 999 }} />
      </div>
      <div className="mt-1 flex justify-between text-[10px]" style={{ color: muted }}>
        <span>Pickup</span><span>68%</span><span>Dropoff</span>
      </div>
    </PreviewCard>
  );
}

function MapMarkerPreview({ theme, mode, fg, muted, radius, blur }: any) {
  const t: ThemeTokens = theme.tokens;
  const mapBg = mode === "dark"
    ? "linear-gradient(135deg, #0b1220 0%, #131c2e 100%)"
    : "linear-gradient(135deg, #e6edf5 0%, #d4dfee 100%)";
  return (
    <PreviewCard title="Map marker" icon={<MapPin className="size-3.5" />} t={t} radius={radius} blur={blur} muted={muted}>
      <div
        className="relative h-32 overflow-hidden"
        style={{ background: mapBg, borderRadius: radius, border: `1px solid ${t.border}` }}
      >
        {/* fake roads */}
        <svg className="absolute inset-0 size-full" viewBox="0 0 200 130" preserveAspectRatio="none">
          <path d="M0 90 Q60 70 100 80 T200 60" stroke={t.border} strokeWidth="6" fill="none" />
          <path d="M20 0 L40 130" stroke={t.border} strokeWidth="3" fill="none" />
          <path d="M140 0 L160 130" stroke={t.border} strokeWidth="3" fill="none" />
        </svg>
        {/* primary marker */}
        <Marker x="35%" y="55%" color={t.primary} label="MR" pulse />
        <Marker x="68%" y="38%" color={t.success} label="DR" />
        <Marker x="20%" y="78%" color={t.warning} label="LD" />
      </div>
      <div className="mt-2 flex items-center gap-3 text-[10px]" style={{ color: muted }}>
        <Legend dot={t.primary} label="Driver" />
        <Legend dot={t.success} label="On time" />
        <Legend dot={t.warning} label="Delayed" />
      </div>
    </PreviewCard>
  );
}

function Marker({ x, y, color, label, pulse }: { x: string; y: string; color: string; label: string; pulse?: boolean }) {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: x, top: y }}>
      {pulse && (
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{ background: color, opacity: 0.4 }}
        />
      )}
      <div
        className="relative size-7 rounded-full grid place-items-center text-[9px] font-bold text-white ring-2 ring-white/30"
        style={{ background: color, boxShadow: `0 4px 12px ${color}66` }}
      >
        {label}
      </div>
    </div>
  );
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="size-2 rounded-full" style={{ background: dot }} />
      {label}
    </span>
  );
}
