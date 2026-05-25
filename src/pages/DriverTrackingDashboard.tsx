import {
  Truck,
  Bell,
  MapPinned,
  Clock3,
  Gauge,
  Phone,
  Package,
  Route,
} from "lucide-react";

const driver = {
  id: "AR-00346582",
  name: "John Black",
  role: "Main Driver",
  photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
  phone: "(555) 555-0132",
  status: "en_route",
  vehicle: "Hyundai HD320",
  pickupAddress: "12 Sunset St, Los Angeles, CA 90012",
  dropoffAddress: "Williamsburg, New York, NY 11213",
  currentAssignment: "Medical freight shipment",
  etaMinutes: 44,
  lastUpdated: "2 min ago",
};

const shipment = {
  id: "SHIP-4512",
  vehicleName: "Hyundai",
  vehicleType: "Cargo Truck HD320",
  cargoType: "Medical & mixed freight",
  weightKg: 7260,
  capacityUsedPercent: 88,
  volumeUsed: "382.45 cu ft",
  spaceUsedLabel: "88% / 100%",
};

const telemetry = {
  speedMph: 45,
  fuelOrBatteryPercent: 57,
  signalPercent: 96,
  routeProgressPercent: 71,
  tripStatus: "En Route",
};

export default function DriverTrackingDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-72 min-h-screen bg-slate-950 text-white lg:flex lg:flex-col">
          <div className="px-6 py-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-500 text-white">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-semibold">AnderRoute</p>
                <p className="text-xs text-slate-400">Logistics Command</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 space-y-2 px-4">
            {[
              "Dashboard",
              "Analytics",
              "Connections",
              "Shipments",
              "Drivers",
              "Billing",
              "Settings",
              "Help Center",
            ].map((item) => (
              <button
                key={item}
                className={`w-full rounded-2xl px-4 py-3 text-left text-sm transition ${
                  item === "Shipments"
                    ? "bg-white/10 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-3">
              <img
                src={driver.photoUrl}
                alt={driver.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">Ivan Anderson</p>
                <p className="text-sm text-slate-400">Dispatcher</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Customer &gt; Orders &gt; Shipments &gt; #{shipment.id}
              </p>
              <h1 className="mt-2 text-3xl font-bold">Live Driver Tracking</h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-full bg-white p-3 shadow-sm">
                <Bell className="h-5 w-5" />
              </button>
              <button className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white">
                New Shipment
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
            {/* Shipment / cargo */}
            <section className="rounded-3xl bg-orange-500 p-6 text-slate-950 shadow-sm xl:col-span-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-2xl font-bold">{shipment.vehicleName}</p>
                  <p className="text-lg opacity-80">{shipment.vehicleType}</p>
                  <p className="mt-2 text-sm opacity-80">{shipment.cargoType}</p>
                </div>
                <div className="rounded-2xl bg-white/80 px-4 py-2 text-sm font-semibold">
                  Active Load
                </div>
              </div>
              <div className="mt-6 rounded-3xl border border-slate-900/10 bg-white/20 p-6">
                <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-slate-900/20 bg-white/20 text-center">
                  <div>
                    <Package className="mx-auto h-8 w-8" />
                    <p className="mt-3 text-sm font-medium">
                      Cargo visualization / load diagram goes here
                    </p>
                    <p className="text-xs opacity-70">
                      Show pallet placement, weight zones, and load balance
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                <MetricCard label="Space" value={shipment.spaceUsedLabel} dark />
                <MetricCard label="Weight" value={`${shipment.weightKg.toLocaleString()} kg`} dark />
                <MetricCard label="Volume" value={shipment.volumeUsed} dark />
                <MetricCard label="Capacity" value={`${shipment.capacityUsedPercent}%`} dark />
              </div>
            </section>

            {/* Map */}
            <section className="rounded-3xl bg-white p-4 shadow-sm xl:col-span-5">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Live Route Map</p>
                  <h2 className="text-xl font-semibold">Current Location</h2>
                </div>
                <MapPinned className="h-5 w-5 text-orange-500" />
              </div>
              <div className="flex h-[420px] items-center justify-center rounded-3xl bg-slate-200 text-slate-500">
                Replace this panel with your AnderRouteLiveMap / MapLibre component
              </div>
            </section>

            {/* Telemetry */}
            <section className="rounded-3xl bg-white p-5 shadow-sm xl:col-span-3">
              <div className="mb-4 flex items-center gap-2">
                <Gauge className="h-5 w-5 text-teal-600" />
                <h2 className="text-lg font-semibold">Vehicle Telemetry</h2>
              </div>
              <div className="space-y-3">
                <MetricRow label="Speed" value={`${telemetry.speedMph} MPH`} />
                <MetricRow label="Fuel / Battery" value={`${telemetry.fuelOrBatteryPercent}%`} />
                <MetricRow label="Signal" value={`${telemetry.signalPercent}%`} />
                <MetricRow label="Route Progress" value={`${telemetry.routeProgressPercent}%`} />
                <MetricRow label="Trip Status" value={telemetry.tripStatus} />
              </div>
            </section>

            {/* ETA */}
            <section className="rounded-3xl bg-white p-5 shadow-sm xl:col-span-3">
              <div className="mb-4 flex items-center gap-2">
                <Clock3 className="h-5 w-5 text-orange-500" />
                <h2 className="text-lg font-semibold">Arrival Timing</h2>
              </div>
              <p className="text-sm text-slate-500">Estimated arrival in</p>
              <p className="mt-2 text-5xl font-bold">{driver.etaMinutes} min</p>
              <p className="mt-4 rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-600">
                Live countdown and schedule tolerance can be shown here
              </p>
            </section>

            {/* Driver Profile */}
            <section className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm xl:col-span-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">{driver.id}</p>
                  <h2 className="mt-1 text-3xl font-semibold">{driver.name}</h2>
                  <p className="text-slate-400">{driver.role}</p>
                </div>
                <button className="text-sm text-slate-300 hover:text-white">
                  View Profile →
                </button>
              </div>
              <div className="mt-5 flex items-center gap-4">
                <img
                  src={driver.photoUrl}
                  alt={driver.name}
                  className="h-20 w-20 rounded-2xl object-cover"
                />
                <div className="space-y-2">
                  <div className="inline-flex rounded-full bg-teal-500/15 px-3 py-1 text-sm text-teal-300">
                    {driver.status.replace("_", " ")}
                  </div>
                  <p className="text-sm text-slate-400">{driver.vehicle}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Phone className="h-4 w-4" />
                    {driver.phone}
                  </div>
                </div>
              </div>
              <div className="mt-6 grid gap-4">
                <ProfileBlock label="Current Assignment" value={driver.currentAssignment} />
                <ProfileBlock label="Pickup" value={driver.pickupAddress} />
                <ProfileBlock label="Destination" value={driver.dropoffAddress} />
                <ProfileBlock label="Last Updated" value={driver.lastUpdated} />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  dark,
}: {
  label: string;
  value: string;
  dark?: boolean;
}) {
  return (
    <div className={`rounded-2xl p-4 ${dark ? "bg-white/20" : "bg-slate-100"}`}>
      <p className={`text-sm ${dark ? "text-slate-900/70" : "text-slate-500"}`}>{label}</p>
      <p className="mt-1 text-xl font-bold">{value}</p>
    </div>
  );
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-3">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function ProfileBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-sm text-white">{value}</p>
    </div>
  );
}
