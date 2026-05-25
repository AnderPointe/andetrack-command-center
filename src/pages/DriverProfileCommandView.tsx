import { useState } from "react";
import { useParams, Link } from "@tanstack/react-router";
import { FileText, MessageSquare, ClipboardSignature, Receipt, ScrollText } from "lucide-react";
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
import { DEMO_DOSSIER } from "@/data/anderrouteDemo";
import { useDriverDossier } from "@/hooks/useAnderRouteDossiers";

export default function DriverProfileCommandView() {
  const { driverId } = useParams({ from: "/drivers/$driverId" });
  const { dossier } = useDriverDossier(driverId);
  const { driver, vehicle, shipment } = dossier ?? DEMO_DOSSIER;
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  return (
    <div className="flex min-h-screen bg-[#020617] text-white">
      <AnderRouteSidebar active="Drivers" />

      <main className="flex-1">
        <CommandHeader driverId={driver.id} />

        <div className="space-y-5 p-4 md:p-6">
          {/* Top: Live status strip */}
          <LiveStatusStrip />

          {/* Middle: Shipment overview + Live route map */}
          <div className="grid gap-5 xl:grid-cols-12">
            <div className="xl:col-span-7">
              <ShipmentLoadOverview shipment={shipment} vehicle={vehicle} />
            </div>
            <div className="xl:col-span-5">
              <LiveRouteMapCard driver={driver} shipment={shipment} />
            </div>
          </div>

          {/* Lower: Driver hero + telemetry + ETA + operations */}
          <DriverProfileHero driver={driver} vehicle={vehicle} />
          <div className="grid gap-5 lg:grid-cols-3">
            <VehicleTelemetryCard driver={driver} vehicle={vehicle} />
            <EtaArrivalCard shipment={shipment} />
            <DriverOperationsPanel />
          </div>

          {/* Tabs */}
          <DriverProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === "overview" && (
            <div className="grid gap-5 md:grid-cols-2">
              <VehicleTelemetryCard driver={driver} vehicle={vehicle} />
              <EtaArrivalCard shipment={shipment} />
            </div>
          )}

          {activeTab === "load" && (
            <div className="space-y-5">
              <CargoManifestCard />
              <ShipmentLoadOverview shipment={shipment} vehicle={vehicle} />
            </div>
          )}

          {activeTab === "route" && <RouteTimelineCard />}

          {activeTab === "documents" && (
            <div className="grid gap-5 md:grid-cols-3">
              <TabPanelPlaceholder
                icon={ClipboardSignature}
                title="Proof of Delivery"
                description="Signed POD will appear here once the driver completes delivery."
              />
              <TabPanelPlaceholder
                icon={ScrollText}
                title="Bill of Lading"
                description="BOL documents and shipper paperwork."
              />
              <TabPanelPlaceholder
                icon={Receipt}
                title="Rate Confirmation"
                description="Rate confirmation and broker agreements."
              />
            </div>
          )}

          {activeTab === "messages" && (
            <TabPanelPlaceholder
              icon={MessageSquare}
              title="Dispatcher ↔ Driver Messages"
              description="Two-way dispatcher chat with the driver's in-cab device."
            />
          )}

          {activeTab === "activity" && <DriverActivityLog />}

          <Link
            to="/dispatch"
            className="block rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center text-xs font-medium text-slate-400 hover:bg-white/5 hover:text-white"
          >
            ← Back to all drivers
          </Link>
        </div>
      </main>
    </div>
  );
}
