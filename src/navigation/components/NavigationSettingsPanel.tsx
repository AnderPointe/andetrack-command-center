/**
 * Phase 3 — Navigation Settings (company + driver level).
 *
 * State is local for now; wire `navigation_provider_settings` /
 * `driver_navigation_preferences` tables in Phase 4 if dispatch needs to
 * push these from the dispatcher dashboard.
 */
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DEFAULT_NAV_SETTINGS, type NavigationProviderSettings } from "@/navigation";

interface Props {
  initial?: NavigationProviderSettings;
  onChange?: (s: NavigationProviderSettings) => void;
}

export function NavigationSettingsPanel({ initial, onChange }: Props) {
  const [s, setS] = useState<NavigationProviderSettings>(initial ?? DEFAULT_NAV_SETTINGS);
  const update = <K extends keyof NavigationProviderSettings>(k: K, v: NavigationProviderSettings[K]) => {
    const next = { ...s, [k]: v };
    setS(next);
    onChange?.(next);
  };
  return (
    <Card className="border-white/10 bg-zinc-950/80 p-4 text-zinc-100 space-y-5">
      <div>
        <div className="text-sm font-semibold">Anderoute EliteNav — Navigation Settings</div>
        <div className="text-[11px] text-zinc-400">
          Company-level defaults. Drivers may override per-trip where permitted.
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SettingSelect
          label="Navigation provider"
          value={s.navigation_provider}
          onChange={(v) => update("navigation_provider", v as NavigationProviderSettings["navigation_provider"])}
          options={[
            { value: "mock", label: "Mock (development)" },
            { value: "mapbox", label: "Mapbox Navigation SDK" },
            { value: "google", label: "Google Navigation SDK" },
          ]}
        />
        <SettingSelect
          label="Truck route validator"
          value={s.truck_validator}
          onChange={(v) => update("truck_validator", v as NavigationProviderSettings["truck_validator"])}
          options={[
            { value: "mock", label: "Mock validator" },
            { value: "here", label: "HERE Routing v8 (truck)" },
            { value: "trimble", label: "Trimble Maps / PC*Miler" },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Toggle label="Mock mode" desc="Use simulated GPS + route for QA." checked={s.mock_mode}
          onCheckedChange={(v) => update("mock_mode", v)} />
        <Toggle label="Require CDL validation before start" desc="Block start for CDL freight until validated."
          checked={s.cdl_validation_required} onCheckedChange={(v) => update("cdl_validation_required", v)} />
        <Toggle label="Voice instructions" checked={s.enable_voice_instructions}
          onCheckedChange={(v) => update("enable_voice_instructions", v)} />
        <Toggle label="Route alternatives" checked={s.enable_alternatives}
          onCheckedChange={(v) => update("enable_alternatives", v)} />
        <Toggle label="Traffic-aware routing" checked={s.enable_traffic}
          onCheckedChange={(v) => update("enable_traffic", v)} />
        <Toggle label="CoPilot guidance" checked={s.enable_copilot}
          onCheckedChange={(v) => update("enable_copilot", v)} />
        <Toggle label="Off-route alerts" checked={s.enable_off_route_alerts}
          onCheckedChange={(v) => update("enable_off_route_alerts", v)} />
        <Toggle label="Dispatch route monitoring" checked={s.enable_dispatch_monitoring}
          onCheckedChange={(v) => update("enable_dispatch_monitoring", v)} />
      </div>
    </Card>
  );
}

function Toggle({
  label, desc, checked, onCheckedChange,
}: { label: string; desc?: string; checked: boolean; onCheckedChange: (v: boolean) => void }) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
      <div className="min-w-0">
        <Label className="text-xs font-medium">{label}</Label>
        {desc && <div className="text-[10px] text-zinc-400 leading-tight">{desc}</div>}
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

function SettingSelect({
  label, value, onChange, options,
}: { label: string; value: string; onChange: (v: string) => void; options: Array<{ value: string; label: string }> }) {
  return (
    <div className="space-y-1">
      <Label className="text-[11px] uppercase tracking-wider text-zinc-400">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-white/[0.03] border-white/10 text-zinc-100">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
