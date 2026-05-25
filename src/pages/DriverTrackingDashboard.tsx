import { DriverProfileCard } from "@/components/anderroute/DriverProfileCard";
import { EtaCard } from "@/components/anderroute/EtaCard";
import { LiveMapCard } from "@/components/anderroute/LiveMapCard";
import { ShipmentLoadCard } from "@/components/anderroute/ShipmentLoadCard";
import { Sidebar } from "@/components/anderroute/Sidebar";
import { TelemetryCard } from "@/components/anderroute/TelemetryCard";
import { TopHeader } from "@/components/anderroute/TopHeader";
import type {
  Driver,
  RouteGeo,
  Shipment,
  Telemetry,
} from "@/types/logistics";

const driver: Driver = {
  id: "DRV-00421",
  name: "Marcus Hale",
  role: "Senior Long-Haul Driver",
  photo_url:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
  phone: "+1 (512) 555-0142",
  status: "en_route",
};

const shipment: Shipment = {
  id: "SHP-9F2C18",
  cargo_type: "Refrigerated Medical Supplies",
  vehicle_type: "53' Reefer Trailer",
  weight_kg: 12450,
  capacity_percent: 78,
  volume_cuft: 2840,
  space_utilization_percent: 84,
  pickup_address: "Austin Distribution Hub, TX",
  dropoff_address: "Dallas Mercy Hospital, TX",
  eta_minutes: 96,
  scheduled_arrival_at: new Date(Date.now() + 96 * 60_000).toISOString(),
  route_progress: 62,
  trip_status: "on_time",
};

const telemetry: Telemetry = {
  speedMph: 64,
  fuelOrBatteryPercent: 71,
  signalPercent: 92,
  routeProgressPercent: 62,
  tripStatus: "on_time",
  speed_mph: 64,
  fuel_percent: 71,
  battery_percent: 88,
  signal_percent: 92,
};

const route: RouteGeo = {
  pickup: { lat: 30.2672, lng: -97.7431 },
  dropoff: { lat: 32.7767, lng: -96.797 },
  current: { lat: 31.4, lng: -97.2 },
};

export default function DriverTrackingDashboard() {
  return (
    <div className="min-h-screen bg-slate-200 p-4 text-slate-950">
      <div className="mx-auto flex max-w-[1500px] overflow-hidden rounded-[2rem] bg-white shadow-2xl">
        <Sidebar active="Dashboard" />

        <main className="flex-1 p-5 md:p-8">
          <TopHeader
            breadcrumbs={["Operations", "Active Shipments", shipment.id]}
            title="Driver Tracking Dashboard"
          />

          <section className="grid grid-cols-1 gap-5 xl:grid-cols-12">
            <div className="xl:col-span-7">
              <ShipmentLoadCard shipment={shipment} />
            </div>
            <div className="xl:col-span-5">
              <LiveMapCard
                route={route}
                speedMph={telemetry.speed_mph}
                etaMinutes={shipment.eta_minutes}
                lastPingLabel="2s ago"
              />
            </div>

            <div className="xl:col-span-4">
              <TelemetryCard telemetry={telemetry} shipment={shipment} />
            </div>
            <div className="xl:col-span-3">
              <EtaCard shipment={shipment} />
            </div>
            <div className="xl:col-span-5">
              <DriverProfileCard driver={driver} shipment={shipment} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
