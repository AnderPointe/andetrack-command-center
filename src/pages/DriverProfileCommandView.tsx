import { useState } from "react";
import { useParams, Link } from "@tanstack/react-router";
import { FileText, MessageSquare } from "lucide-react";
import { AnderRouteSidebar } from "@/components/anderroute/AnderRouteSidebar";
import { CommandHeader } from "@/components/anderroute/CommandHeader";
import { DriverProfileHero } from "@/components/anderroute/DriverProfileHero";
import { ShipmentLoadOverview } from "@/components/anderroute/ShipmentLoadOverview";
import { LiveRouteMapCard } from "@/components/anderroute/LiveRouteMapCard";
import { VehicleTelemetryCard } from "@/components/anderroute/VehicleTelemetryCard";
import { EtaArrivalCard } from "@/components/anderroute/EtaArrivalCard";
import { RouteTimelineCard } from "@/components/anderroute/RouteTimelineCard";
import { CargoManifestCard } from "@/components/anderroute/CargoManifestCard";
import LiveStatusStrip from "@/components/anderroute/LiveStatusStrip";
import { OperationsPanel } from "@/components/anderroute/OperationsPanel";
import { DriverActivityLog } from "@/components/anderroute/DriverActivityLog";
import DriverProfileTabs, {
  TabPanelPlaceholder,
  type TabKey,
} from "@/components/anderroute/DriverProfileTabs";
import { DEMO_DOSSIER } from "@/data/anderrouteDemo";
import { useDriverDossier } from "@/hooks/useAnderRouteDossiers";

export default function DriverProfileCommandView() {
  const { driverId } = useParams({ from: "/drivers/$driverId" });
  const { dossier } = useDriverDossier(driverId);
  const { driver, vehicle, shipment, manifest } = dossier ?? DEMO_DOSSIER;
  const [tab, setTab] = useState<TabKey>("overview");

  return (
    <div className="flex min-h-screen bg-[#020617] text-white">
      <AnderRouteSidebar active="Drivers" />

      <main className="flex-1">
        <CommandHeader driverId={driver.id} />

        <div className="space-y-5 p-4 md:p-6">
          {/* Live status strip across the top */}
          <LiveStatusStrip />

          <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
            {/* Main column */}
            <div className="space-y-5">
              <DriverProfileHero driver={driver} vehicle={vehicle} />

              <DriverProfileTabs active={tab} onChange={setTab} />

              {tab === "overview" && (
                <div className="space-y-5">
                  <ShipmentLoadOverview shipment={shipment} vehicle={vehicle} />
                  <LiveRouteMapCard driver={driver} shipment={shipment} />
                  <div className="grid gap-5 md:grid-cols-2">
                    <VehicleTelemetryCard driver={driver} vehicle={vehicle} />
                    <EtaArrivalCard shipment={shipment} />
                  </div>
                </div>
              )}

              {tab === "load" && (
                <div className="space-y-5">
                  <ShipmentLoadOverview shipment={shipment} vehicle={vehicle} />
                  <CargoManifestCard manifest={manifest} />
                </div>
              )}

              {tab === "route" && (
                <div className="space-y-5">
                  <LiveRouteMapCard driver={driver} shipment={shipment} />
                  <RouteTimelineCard shipment={shipment} />
                </div>
              )}

              {tab === "documents" && (
                <TabPanelPlaceholder
                  icon={FileText}
                  title="Documents"
                  description="Bills of lading, proof of delivery, and signed paperwork will appear here."
                />
              )}

              {tab === "messages" && (
                <TabPanelPlaceholder
                  icon={MessageSquare}
                  title="Driver Messages"
                  description="Two-way dispatcher chat with the driver's in-cab device."
                />
              )}

              {tab === "activity" && <DriverActivityLog />}
            </div>

            {/* Right column — Operations command */}
            <aside className="space-y-5">
              <OperationsPanel />
              <RouteTimelineCard shipment={shipment} />
              <CargoManifestCard manifest={manifest} />

              <Link
                to="/dispatch"
                className="block rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center text-xs font-medium text-slate-400 hover:bg-white/5 hover:text-white"
              >
                ← Back to all drivers
              </Link>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
