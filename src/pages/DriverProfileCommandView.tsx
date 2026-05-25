import { useState } from "react";
import { useParams, Link } from "@tanstack/react-router";
import { MessageSquare, ClipboardSignature, Receipt, ScrollText } from "lucide-react";
import { AnderRouteSidebar } from "@/components/anderroute/AnderRouteSidebar";
import { CommandHeader } from "@/components/anderroute/CommandHeader";
import { DriverProfileHero } from "@/components/anderroute/DriverProfileHero";
import { ShipmentLoadOverview } from "@/components/anderroute/ShipmentLoadOverview";
import { LiveRouteMapCard } from "@/components/anderroute/LiveRouteMapCard";
import { VehicleTelemetryCard } from "@/components/anderroute/VehicleTelemetryCard";
import { EtaArrivalCard } from "@/components/anderroute/EtaArrivalCard";
import RouteTimelineCard from "@/components/anderroute/RouteTimelineCard";
import CargoManifestCard from "@/components/anderroute/CargoManifestCard";
import LiveStatusStrip from "@/components/anderroute/LiveStatusStrip";
import DriverOperationsPanel from "@/components/anderroute/DriverOperationsPanel";
import { DriverActivityLog } from "@/components/anderroute/DriverActivityLog";
import DriverProfileTabs, {
  TabPanelPlaceholder,
  type TabKey,
} from "@/components/anderroute/DriverProfileTabs";
import LiquidGlassCard from "@/components/anderroute/LiquidGlassCard";
import LiquidThemeToggle from "@/components/anderroute/LiquidThemeToggle";
import { ThemeProvider } from "@/context/ThemeContext";
import { DEMO_DOSSIER } from "@/data/anderrouteDemo";
import { useDriverDossier } from "@/hooks/useAnderRouteDossiers";

export default function DriverProfileCommandView() {
  return (
    <ThemeProvider>
      <DriverProfileCommandViewInner />
    </ThemeProvider>
  );
}

function DriverProfileCommandViewInner() {
  const { driverId } = useParams({ from: "/drivers/$driverId" });
  const { dossier } = useDriverDossier(driverId);
  const { driver, vehicle, shipment } = dossier ?? DEMO_DOSSIER;
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  return (
    <div className="liquid-bg flex min-h-screen">
      <AnderRouteSidebar active="Drivers" />

      <main className="flex-1">
        <div className="flex items-start justify-between gap-4 px-4 pt-4 md:px-6">
          <div className="flex-1">
            <CommandHeader driverId={driver.id} />
          </div>
          <div className="pt-2">
            <LiquidThemeToggle />
          </div>
        </div>

        <div className="space-y-5 p-4 md:p-6">
          {/* Top: Live status strip */}
          <LiquidGlassCard className="p-4">
            <LiveStatusStrip />
          </LiquidGlassCard>

          {/* Middle: Shipment overview + Live route map */}
          <div className="grid gap-5 xl:grid-cols-12">
            <LiquidGlassCard glow className="xl:col-span-7">
              <ShipmentLoadOverview shipment={shipment} vehicle={vehicle} />
            </LiquidGlassCard>
            <LiquidGlassCard glow className="xl:col-span-5">
              <LiveRouteMapCard driver={driver} shipment={shipment} />
              {/* Liquid glass map overlay */}
              <div className="pointer-events-none absolute left-4 right-4 top-4 flex items-center justify-between">
                <span className="rounded-full border border-white/40 bg-white/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-teal-700 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60 dark:text-teal-300">
                  Live GPS
                </span>
                <span className="rounded-full border border-white/40 bg-white/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-orange-600 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60 dark:text-orange-300">
                  ETA 24m
                </span>
              </div>
            </LiquidGlassCard>
          </div>

          {/* Lower: Driver hero + telemetry + ETA + operations */}
          <LiquidGlassCard>
            <DriverProfileHero driver={driver} vehicle={vehicle} />
          </LiquidGlassCard>
          <div className="grid gap-5 lg:grid-cols-3">
            <LiquidGlassCard glow>
              <VehicleTelemetryCard driver={driver} vehicle={vehicle} />
            </LiquidGlassCard>
            <LiquidGlassCard glow>
              <EtaArrivalCard shipment={shipment} />
            </LiquidGlassCard>
            <LiquidGlassCard glow>
              <DriverOperationsPanel />
            </LiquidGlassCard>
          </div>

          {/* Tabs */}
          <LiquidGlassCard className="p-2">
            <DriverProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </LiquidGlassCard>

          {activeTab === "overview" && (
            <div className="grid gap-5 md:grid-cols-2">
              <LiquidGlassCard>
                <VehicleTelemetryCard driver={driver} vehicle={vehicle} />
              </LiquidGlassCard>
              <LiquidGlassCard>
                <EtaArrivalCard shipment={shipment} />
              </LiquidGlassCard>
            </div>
          )}

          {activeTab === "load" && (
            <div className="space-y-5">
              <LiquidGlassCard>
                <CargoManifestCard />
              </LiquidGlassCard>
              <LiquidGlassCard>
                <ShipmentLoadOverview shipment={shipment} vehicle={vehicle} />
              </LiquidGlassCard>
            </div>
          )}

          {activeTab === "route" && (
            <LiquidGlassCard>
              <RouteTimelineCard />
            </LiquidGlassCard>
          )}

          {activeTab === "documents" && (
            <div className="grid gap-5 md:grid-cols-3">
              <LiquidGlassCard className="p-6">
                <TabPanelPlaceholder
                  icon={ClipboardSignature}
                  title="Proof of Delivery"
                  description="Signed POD will appear here once the driver completes delivery."
                />
              </LiquidGlassCard>
              <LiquidGlassCard className="p-6">
                <TabPanelPlaceholder
                  icon={ScrollText}
                  title="Bill of Lading"
                  description="BOL documents and shipper paperwork."
                />
              </LiquidGlassCard>
              <LiquidGlassCard className="p-6">
                <TabPanelPlaceholder
                  icon={Receipt}
                  title="Rate Confirmation"
                  description="Rate confirmation and broker agreements."
                />
              </LiquidGlassCard>
            </div>
          )}

          {activeTab === "messages" && (
            <LiquidGlassCard className="p-6">
              <TabPanelPlaceholder
                icon={MessageSquare}
                title="Dispatcher ↔ Driver Messages"
                description="Two-way dispatcher chat with the driver's in-cab device."
              />
            </LiquidGlassCard>
          )}

          {activeTab === "activity" && (
            <LiquidGlassCard>
              <DriverActivityLog />
            </LiquidGlassCard>
          )}

          <Link
            to="/dispatch"
            className="block rounded-2xl border border-white/40 bg-white/60 px-4 py-3 text-center text-xs font-medium text-slate-600 backdrop-blur-xl transition hover:bg-white/80 hover:text-teal-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400 dark:hover:bg-white/[0.08] dark:hover:text-teal-300"
          >
            ← Back to all drivers
          </Link>
        </div>
      </main>
    </div>
  );
}
