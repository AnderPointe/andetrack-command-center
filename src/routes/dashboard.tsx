import { createFileRoute } from "@tanstack/react-router";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DriverProfileCard } from "@/components/dashboard/DriverProfileCard";
import { EtaCard } from "@/components/dashboard/EtaCard";
import { LiveMapCard } from "@/components/dashboard/LiveMapCard";
import { ShipmentLoadCard } from "@/components/dashboard/ShipmentLoadCard";
import { VehicleTelemetryCard } from "@/components/dashboard/VehicleTelemetryCard";
import {
  dummyDriver,
  dummyRoute,
  dummyShipment,
  dummyTelemetry,
} from "@/data/dashboardDummy";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dispatch Dashboard — AnderRoute" },
      {
        name: "description",
        content:
          "Real-time driver tracking, shipment load, telemetry and ETA dashboard for AnderRoute dispatch operations.",
      },
      { property: "og:title", content: "Dispatch Dashboard — AnderRoute" },
      {
        property: "og:description",
        content:
          "Real-time driver tracking, shipment load, telemetry and ETA dashboard for AnderRoute dispatch operations.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-200 p-4 text-slate-950">
      <div className="mx-auto flex max-w-[1500px] overflow-hidden rounded-[2rem] bg-white shadow-2xl">
        <DashboardSidebar active="Dashboard" />

        <main className="flex-1 p-5 md:p-8">
          <DashboardHeader
            breadcrumbs={["Operations", "Active Shipments", dummyShipment.id]}
            title="Dispatch Command Center"
          />

          <section className="grid grid-cols-1 gap-5 xl:grid-cols-12">
            <div className="xl:col-span-7">
              <ShipmentLoadCard shipment={dummyShipment} />
            </div>
            <div className="xl:col-span-5">
              <LiveMapCard
                route={dummyRoute}
                speedMph={dummyTelemetry.speed_mph}
                etaMinutes={dummyShipment.eta_minutes}
                lastPingLabel="2s ago"
              />
            </div>

            <div className="xl:col-span-4">
              <VehicleTelemetryCard
                telemetry={dummyTelemetry}
                shipment={dummyShipment}
              />
            </div>
            <div className="xl:col-span-3">
              <EtaCard shipment={dummyShipment} />
            </div>
            <div className="xl:col-span-5">
              <DriverProfileCard driver={dummyDriver} shipment={dummyShipment} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
