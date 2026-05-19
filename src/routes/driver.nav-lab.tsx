import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { EliteNavPhase3Panel } from "@/navigation/components/EliteNavPhase3Panel";
import { NavigationSettingsPanel } from "@/navigation/components/NavigationSettingsPanel";
import { DEFAULT_NAV_SETTINGS, type NavigationProviderSettings } from "@/navigation";

export const Route = createFileRoute("/driver/nav-lab")({
  head: () => ({
    meta: [
      { title: "EliteNav Lab — Anderoute" },
      { name: "description", content: "Phase 3 navigation lab: provider-agnostic adapter, CDL truck route validation, CoPilot events, and SDK-ready architecture." },
    ],
  }),
  component: NavLabRoute,
});

function NavLabRoute() {
  const [settings, setSettings] = useState<NavigationProviderSettings>(DEFAULT_NAV_SETTINGS);
  return (
    <AppShell>
      <div className="mx-auto grid max-w-5xl gap-4 py-4 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h1 className="mb-3 text-lg font-semibold text-zinc-100">EliteNav Phase 3 Lab</h1>
          <EliteNavPhase3Panel
            companyId="demo-company"
            driverId="demo-driver"
            providerId={settings.navigation_provider}
            validatorId={settings.truck_validator}
          />
        </div>
        <div>
          <h2 className="mb-3 text-lg font-semibold text-zinc-100">Settings</h2>
          <NavigationSettingsPanel initial={settings} onChange={setSettings} />
        </div>
      </div>
    </AppShell>
  );
}
