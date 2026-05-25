import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bell,
  Clock3,
  Fuel,
  Gauge,
  MapPinned,
  Navigation2,
  Package,
  Phone,
  RadioTower,
  Route as RouteIcon,
  ShieldCheck,
  Truck,
} from "lucide-react";

export const Route = createFileRoute("/drivers/$driverId")({
  component: DriverProfileView,
});

const driverProfile = {
  id: "AR-00346582",
  name: "John Black",
  role: "Main Driver",
  phone: "(555) 555-0132",
  photoUrl:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
  status: "En Route",
  lastSeen: "2 minutes ago",
  vehicle: {
    id: "UNIT-4512",
    make: "Hyundai",
    model: "HD320 Cargo Truck",
    type: "Box Truck",
    plate: "TX-AR4512",
  },
  shipment: {
    id: "SHIP-4512",
    cargoType: "Medical & mixed freight",
    hauling: "Priority medical supplies, boxed freight, and route-sensitive cargo",
    pickup: "12 Sunset St, Los Angeles, CA 90012",
    destination: "Williamsburg, New York, NY 11213",
    eta: "44 min",
    arrivalTime: "12:12 PM",
    routeProgress: 71,
    spaceUsed: 88,
    weight: "7,260 kg",
    loadVolume: "382.45 cu ft",
    priority: "High Priority",
  },
  telemetry: {
    speed: "45 MPH",
    fuel: "57%",
    signal: "96%",
    temperature: "Normal",
    routeStatus: "On Schedule",
  },
};

function DriverProfileView() {
  const { driverId } = Route.useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-200 p-4 text-slate-950">
      <div className="mx-auto flex max-w-[1500px] overflow-hidden rounded-[2rem] bg-white shadow-2xl">
        {/* Sidebar */}
        <aside className="hidden min-h-[860px] w-72 flex-col bg-slate-950 text-white lg:flex">
          <div className="flex items-center gap-3 px-6 py-7">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-teal-500 to-orange-500">
              <RouteIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-bold">AnderRoute</p>
              <p className="text-xs text-slate-400">Logistics Command</p>
            </div>
          </div>

          <nav className="flex-1 space-y-2 px-4">
            {[
              "Dashboard",
              "Live Map",
              "Drivers",
              "Shipments",
              "Customers",
              "Analytics",
              "Billing",
              "Settings",
              "Help Center",
            ].map((item) => (
              <button
                key={item}
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition ${
                  item === "Drivers"
                    ? "bg-white/10 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{item}</span>
                {item === "Shipments" && (
                  <span className="rounded-full bg-orange-500 px-2 py-0.5 text-xs text-white">
                    2
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-3">
              <img
                src={driverProfile.photoUrl}
                alt="Dispatcher profile"
                className="h-11 w-11 rounded-xl object-cover"
              />
              <div>
                <p className="font-medium">Ivan Anderson</p>
                <p className="text-xs text-slate-400">Dispatcher</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-5 md:p-8">
          <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <button
                onClick={() => navigate({ to: "/" })}
                className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dispatch
              </button>

              <p className="text-sm text-slate-500">
                Drivers &gt; Active Shipments &gt; {driverId || driverProfile.id}
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight">
                Driver Profile Command View
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button className="grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200">
                <Bell className="h-5 w-5" />
              </button>
              <button className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">
                Message Driver
              </button>
            </div>
          </header>

          <section className="grid grid-cols-1 gap-5 xl:grid-cols-12">
            <div className="rounded-[2rem] bg-gradient-to-br from-orange-400 to-orange-500 p-6 text-slate-950 shadow-sm xl:col-span-7">
              <div className="flex flex-col justify-between gap-4 md:flex-row">
                <div>
                  <div className="inline-flex rounded-full bg-white/60 px-3 py-1 text-xs font-bold uppercase tracking-wide">
                    {driverProfile.shipment.priority}
                  </div>
                  <h2 className="mt-4 text-3xl font-bold">
                    {driverProfile.vehicle.make}
                  </h2>
                  <p className="text-lg opacity-80">
                    {driverProfile.vehicle.model}
                  </p>
                  <p className="mt-2 max-w-2xl text-sm opacity-80">
                    Hauling: {driverProfile.shipment.hauling}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/70 px-4 py-3 text-sm font-semibold">
                  {driverProfile.shipment.id}
                </div>
              </div>

              <div className="mt-7 rounded-[1.5rem] border border-slate-900/10 bg-white/25 p-5">
                <div className="relative h-48 rounded-2xl border border-slate-900/20 bg-orange-300/30 p-5">
                  <div className="absolute left-6 right-6 top-1/2 h-20 -translate-y-1/2 rounded-xl border-2 border-slate-900/50">
                    <div className="grid h-full grid-cols-5 divide-x divide-slate-900/30 text-xs font-bold">
                      <div className="grid place-items-center">540 kg</div>
                      <div className="grid place-items-center">1230 kg</div>
                      <div className="grid place-items-center">2000 kg</div>
                      <div className="grid place-items-center">780 kg</div>
                      <div className="grid place-items-center">1270 kg</div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-10 h-8 w-8 rounded-full border-4 border-slate-900/50" />
                  <div className="absolute bottom-4 left-24 h-8 w-8 rounded-full border-4 border-slate-900/50" />
                  <div className="absolute bottom-4 left-38 h-8 w-8 rounded-full border-4 border-slate-900/50" />
                  <div className="absolute bottom-4 right-20 h-8 w-8 rounded-full border-4 border-slate-900/50" />
                  <div className="absolute bottom-4 right-8 h-8 w-8 rounded-full border-4 border-slate-900/50" />

                  <div className="absolute right-5 top-1/2 h-24 w-24 -translate-y-1/2 rounded-r-2xl border-2 border-l-0 border-slate-900/50" />

                  <div className="absolute left-5 top-5 flex items-center gap-2 text-sm font-semibold">
                    <Package className="h-4 w-4" />
                    Cargo Load Distribution
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                <CargoMetric
                  label="Space"
                  value={`${driverProfile.shipment.spaceUsed}% / 100%`}
                />
                <CargoMetric label="Weight" value={driverProfile.shipment.weight} />
                <CargoMetric label="Load Volume" value={driverProfile.shipment.loadVolume} />
                <CargoMetric
                  label="Route Progress"
                  value={`${driverProfile.shipment.routeProgress}%`}
                />
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-100 p-4 shadow-sm xl:col-span-5">
              <div className="mb-3 flex items-center justify-between px-2">
                <div>
                  <p className="text-sm text-slate-500">Live Location</p>
                  <h2 className="text-xl font-bold">Route Map</h2>
                </div>
                <MapPinned className="h-5 w-5 text-orange-500" />
              </div>

              <div className="relative h-[430px] overflow-hidden rounded-[1.5rem] bg-slate-300">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,.08)_1px,transparent_1px),linear-gradient(rgba(15,23,42,.08)_1px,transparent_1px)] bg-[size:32px_32px]" />

                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 500 430">
                  <path
                    d="M85 360 C120 290 140 260 190 250 C260 235 260 150 315 130 C365 112 390 95 415 55"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <circle cx="85" cy="360" r="12" fill="#14b8a6" />
                  <circle cx="415" cy="55" r="15" fill="#f97316" />
                  <circle cx="260" cy="205" r="18" fill="#0f172a" />
                </svg>

                <div className="absolute left-[48%] top-[44%] grid h-14 w-14 place-items-center rounded-full bg-slate-950 text-white shadow-2xl">
                  <Navigation2 className="h-7 w-7 text-orange-400" />
                </div>

                <div className="absolute bottom-4 left-4 rounded-2xl bg-white/90 px-4 py-3 shadow-lg backdrop-blur">
                  <p className="text-xs text-slate-500">Current ETA</p>
                  <p className="font-bold">{driverProfile.shipment.eta}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200 xl:col-span-3">
              <div className="mb-5 flex items-center gap-2">
                <Gauge className="h-5 w-5 text-teal-600" />
                <h2 className="text-lg font-bold">Vehicle Telemetry</h2>
              </div>

              <div className="space-y-3">
                <InfoRow icon={<Gauge />} label="Speed" value={driverProfile.telemetry.speed} />
                <InfoRow icon={<Fuel />} label="Fuel" value={driverProfile.telemetry.fuel} />
                <InfoRow icon={<RadioTower />} label="Signal" value={driverProfile.telemetry.signal} />
                <InfoRow icon={<ShieldCheck />} label="Temp" value={driverProfile.telemetry.temperature} />
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-100 p-5 shadow-sm xl:col-span-3">
              <div className="mb-5 flex items-center gap-2">
                <Clock3 className="h-5 w-5 text-orange-500" />
                <h2 className="text-lg font-bold">Arrival Time</h2>
              </div>

              <p className="text-sm text-slate-500">Arriving in</p>
              <p className="mt-1 text-xl font-semibold">
                {driverProfile.shipment.eta}
              </p>

              <div className="mt-10">
                <p className="text-6xl font-light tracking-tight">
                  {driverProfile.shipment.arrivalTime}
                </p>
                <p className="mt-3 rounded-2xl bg-white px-4 py-3 text-sm text-slate-500">
                  Status: {driverProfile.telemetry.routeStatus}
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-sm xl:col-span-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm tracking-wide text-slate-400">
                    {driverProfile.id}
                  </p>
                  <h2 className="mt-3 text-4xl font-semibold">
                    {driverProfile.name}
                  </h2>
                  <p className="text-slate-400">{driverProfile.role}</p>
                </div>

                <button className="rounded-full bg-white/10 px-4 py-2 text-sm text-slate-200 hover:bg-white/15">
                  View Full Profile →
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-center">
                <img
                  src={driverProfile.photoUrl}
                  alt={driverProfile.name}
                  className="h-24 w-24 rounded-3xl object-cover"
                />

                <div className="space-y-2">
                  <div className="inline-flex rounded-full bg-teal-500/15 px-3 py-1 text-sm font-semibold text-teal-300">
                    {driverProfile.status}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Phone className="h-4 w-4" />
                    {driverProfile.phone}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Truck className="h-4 w-4" />
                    {driverProfile.vehicle.id} · {driverProfile.vehicle.plate}
                  </div>
                </div>
              </div>

              <div className="mt-7 space-y-4">
                <RouteStop
                  label="Departure"
                  value={driverProfile.shipment.pickup}
                  color="bg-teal-400"
                />
                <RouteStop
                  label="Arrival"
                  value={driverProfile.shipment.destination}
                  color="bg-orange-400"
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function CargoMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/25 p-4">
      <p className="text-sm text-slate-900/70">{label}</p>
      <p className="mt-1 text-lg font-bold">{value}</p>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-3">
      <div className="flex items-center gap-2 text-slate-500">
        <span className="text-teal-600 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>
        <span className="text-sm">{label}</span>
      </div>
      <span className="text-sm font-bold text-slate-900">{value}</span>
    </div>
  );
}

function RouteStop({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`h-3 w-3 rounded-full ${color}`} />
        <div className="mt-1 h-10 w-px bg-white/20" />
      </div>
      <div>
        <p className="text-sm text-slate-400">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
