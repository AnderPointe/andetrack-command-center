import { useParams, Link } from "@tanstack/react-router";
import { AnderRouteSidebar } from "@/components/anderroute/AnderRouteSidebar";
import { CommandHeader } from "@/components/anderroute/CommandHeader";
import { DriverProfileHero } from "@/components/anderroute/DriverProfileHero";
import { ShipmentLoadOverview } from "@/components/anderroute/ShipmentLoadOverview";
import { LiveRouteMapCard } from "@/components/anderroute/LiveRouteMapCard";
import { VehicleTelemetryCard } from "@/components/anderroute/VehicleTelemetryCard";
import { EtaArrivalCard } from "@/components/anderroute/EtaArrivalCard";
import { RouteTimelineCard } from "@/components/anderroute/RouteTimelineCard";
import { CargoManifestCard } from "@/components/anderroute/CargoManifestCard";
import { getDossierById, DEMO_DOSSIER } from "@/data/anderrouteDemo";

export default function DriverProfileCommandView() {
  const { driverId } = useParams({ from: "/drivers/$driverId" });
  const dossier = getDossierById(driverId) ?? DEMO_DOSSIER;
  const { driver, vehicle, shipment, manifest } = dossier;

  return (
    <div className="flex min-h-screen bg-[#020617] text-white">
      <AnderRouteSidebar active="Drivers" />

      <main className="flex-1">
        <CommandHeader driverId={driver.id} />

        <div className="grid gap-5 p-4 md:p-6 xl:grid-cols-[1fr_360px]">
          {/* Main column */}
          <div className="space-y-5">
            <ShipmentLoadOverview shipment={shipment} vehicle={vehicle} />
            <LiveRouteMapCard driver={driver} shipment={shipment} />

            <div className="grid gap-5 md:grid-cols-2">
              <VehicleTelemetryCard driver={driver} vehicle={vehicle} />
              <EtaArrivalCard shipment={shipment} />
            </div>
          </div>

          {/* Right column */}
          <aside className="space-y-5">
            <DriverProfileHero driver={driver} vehicle={vehicle} />
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
      </main>
    </div>
  );
}
