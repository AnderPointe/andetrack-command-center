import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Battery,
  Bell,
  CalendarClock,
  CircleDot,
  Clock3,
  Fuel,
  Gauge,
  MapPin,
  MapPinned,
  Milestone,
  Navigation2,
  Package,
  Phone,
  RadioTower,
  Route as RouteIcon,
  Signal,
  Smartphone,
  ShieldCheck,
  Snowflake,
  Thermometer,
  TimerReset,
  Truck,
  TriangleAlert,
  Weight,
  Wifi,
  Box,
  Layers,
  Percent,
} from "lucide-react";

import {
  getDriverProfile,
  type DriverProfilePayload,
} from "@/lib/driverProfile.functions";

export const Route = createFileRoute("/drivers/$driverId")({
  component: DriverProfileViewPage,
});

const FALLBACK_PHOTO =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function DriverProfileViewPage() {
  const { driverId } = Route.useParams();
  const navigate = useNavigate();
  const fetchProfile = useServerFn(getDriverProfile);

  const isUuid = UUID_RE.test(driverId);

  const { data, isLoading, error } = useQuery({
    queryKey: ["driver-profile", driverId],
    queryFn: () => fetchProfile({ data: { driverId } }),
    enabled: isUuid,
    refetchInterval: 15_000,
  });

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
              </button>
            ))}
          </nav>
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
                Drivers &gt; Active Shipments &gt; {driverId}
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight">
                Driver Command Center
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

          {!isUuid ? (
            <StatusCard>Invalid driver ID.</StatusCard>
          ) : isLoading ? (
            <StatusCard>Loading driver profile…</StatusCard>
          ) : error ? (
            <StatusCard>
              Could not load driver profile: {(error as Error).message}
            </StatusCard>
          ) : data ? (
            <ProfileContent data={data} />
          ) : (
            <StatusCard>Driver not found.</StatusCard>
          )}
        </main>
      </div>
    </div>
  );
}

function ProfileContent({ data }: { data: DriverProfilePayload }) {
  const { driver, shipment, vehicle } = data;

  const eta =
    shipment?.eta_minutes != null ? `${shipment.eta_minutes} min` : "—";
  const speed =
    driver.speed_mph != null ? `${Math.round(driver.speed_mph)} MPH` : "—";
  const fuel = vehicle?.fuel_level != null ? `${vehicle.fuel_level}%` : "—";
  const routeProgress = shipment?.route_progress ?? 0;
  const capacity =
    shipment?.capacity_percent != null ? `${shipment.capacity_percent}%` : "—";
  const weight = shipment?.weight != null ? `${shipment.weight} kg` : "—";
  const volume =
    shipment?.volume != null ? `${shipment.volume} cu ft` : "—";
  const quantity =
    shipment?.quantity != null && shipment?.quantity_unit
      ? `${shipment.quantity} ${shipment.quantity_unit}`
      : "—";

  return (
    <section className="grid grid-cols-1 gap-5 xl:grid-cols-12">
      {/* Shipment Load Overview */}
      <div className="rounded-[2rem] bg-gradient-to-br from-orange-400 to-orange-500 p-6 text-slate-950 shadow-sm xl:col-span-7">
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <div>
            <p className="text-sm font-semibold text-slate-900/60 uppercase tracking-wide">
              Shipment Load Overview
            </p>
            <div className="mt-2 inline-flex rounded-full bg-white/60 px-3 py-1 text-xs font-bold uppercase tracking-wide">
              {driver.status}
            </div>
            <h2 className="mt-4 text-3xl font-bold">
              {shipment?.cargo_type ?? "No Active Load"}
            </h2>
            <p className="text-lg opacity-80">
              {shipment?.package_type ?? vehicle?.make ?? ""}
              {vehicle?.model ? ` · ${vehicle.model}` : ""}
            </p>
            <p className="mt-2 max-w-2xl text-sm opacity-80">
              {shipment?.hauling_description ?? "No active shipment assigned"}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            {shipment && (
              <div className="rounded-2xl bg-white/70 px-4 py-3 text-sm font-semibold">
                {shipment.id.slice(0, 8).toUpperCase()}
              </div>
            )}
            <div className="flex gap-2">
              {shipment?.is_hazardous && (
                <div className="inline-flex items-center gap-1 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
                  <TriangleAlert className="h-3 w-3" />
                  Hazmat
                </div>
              )}
              {shipment?.is_temperature_controlled && (
                <div className="inline-flex items-center gap-1 rounded-full bg-cyan-600 px-3 py-1 text-xs font-bold text-white">
                  <Snowflake className="h-3 w-3" />
                  Reefer
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm font-semibold text-slate-900/60 uppercase tracking-wide">
          Cargo Manifest
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
          <CargoMetric
            icon={<Weight className="h-4 w-4" />}
            label="Weight"
            value={weight}
          />
          <CargoMetric
            icon={<Box className="h-4 w-4" />}
            label="Volume"
            value={volume}
          />
          <CargoMetric
            icon={<Percent className="h-4 w-4" />}
            label="Capacity Used"
            value={capacity}
          />
          <CargoMetric
            icon={<Layers className="h-4 w-4" />}
            label="Quantity"
            value={quantity}
          />
          <CargoMetric
            icon={<Package className="h-4 w-4" />}
            label="Load Type"
            value={shipment?.package_type ?? "—"}
          />
          <CargoMetric
            icon={<Navigation2 className="h-4 w-4" />}
            label="Route Progress"
            value={`${Math.round(routeProgress)}%`}
          />
        </div>
      </div>

      {/* Live Route Map */}
      <div className="rounded-[2rem] bg-slate-100 p-4 shadow-sm xl:col-span-5">
        <div className="mb-3 flex items-center justify-between px-2">
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Live Route Map</p>
            <h2 className="text-xl font-bold">Route Map</h2>
          </div>
          <MapPinned className="h-5 w-5 text-orange-500" />
        </div>

        <div className="relative h-[430px] overflow-hidden rounded-[1.5rem] bg-slate-300">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,.08)_1px,transparent_1px),linear-gradient(rgba(15,23,42,.08)_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-slate-950 text-white shadow-2xl">
            <Navigation2 className="h-7 w-7 text-orange-400" />
          </div>
          <div className="absolute bottom-4 left-4 rounded-2xl bg-white/90 px-4 py-3 shadow-lg backdrop-blur">
            <p className="text-xs text-slate-500">Current ETA</p>
            <p className="font-bold">{eta}</p>
          </div>
          <div className="absolute right-4 top-4 rounded-2xl bg-white/90 px-3 py-2 text-xs text-slate-700 shadow">
            {driver.current_lat?.toFixed(4) ?? "—"},{" "}
            {driver.current_lng?.toFixed(4) ?? "—"}
          </div>
        </div>
      </div>

      {/* Telemetry */}
      <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200 xl:col-span-3">
        <div className="mb-5 flex items-center gap-2">
          <Gauge className="h-5 w-5 text-teal-600" />
          <h2 className="text-lg font-bold">Vehicle Telemetry</h2>
        </div>

        <div className="space-y-3">
          <InfoRow icon={<Gauge />} label="Speed" value={speed} />
          <InfoRow icon={<Fuel />} label="Fuel" value={fuel} />
          <InfoRow
            icon={<RadioTower />}
            label="Status"
            value={vehicle?.telemetry_status ?? "—"}
          />
          <InfoRow
            icon={<ShieldCheck />}
            label="Last Seen"
            value={formatRelative(driver.last_seen_at)}
          />
        </div>
      </div>

      {/* ETA card */}
      <div className="rounded-[2rem] bg-slate-100 p-5 shadow-sm xl:col-span-3">
        <div className="mb-5 flex items-center gap-2">
          <Clock3 className="h-5 w-5 text-orange-500" />
          <h2 className="text-lg font-bold">ETA / Delivery Countdown</h2>
        </div>

        <p className="text-sm text-slate-500">Arriving in</p>
        <p className="mt-1 text-xl font-semibold">{eta}</p>

        <div className="mt-10">
          <p className="text-6xl font-light tracking-tight">
            {shipment?.eta_minutes != null
              ? new Date(Date.now() + shipment.eta_minutes * 60_000).toLocaleTimeString(
                  [],
                  { hour: "numeric", minute: "2-digit" },
                )
              : "—"}
          </p>
          <p className="mt-3 rounded-2xl bg-white px-4 py-3 text-sm text-slate-500">
            Status: {driver.status}
          </p>
        </div>
      </div>

      {/* Driver card */}
      <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-sm xl:col-span-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wide">
              Driver Profile
            </p>
            <p className="mt-2 text-sm tracking-wide text-slate-400">
              {driver.id.slice(0, 8).toUpperCase()}
            </p>
            <h2 className="mt-3 text-4xl font-semibold">{driver.name}</h2>
            <p className="text-slate-400">Driver</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-center">
          <img
            src={driver.photo_url ?? FALLBACK_PHOTO}
            alt={driver.name}
            className="h-24 w-24 rounded-3xl object-cover"
          />

          <div className="space-y-2">
            <StatusPill status={driver.status} />

            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Phone className="h-4 w-4" />
              {driver.phone ?? "—"}
            </div>

            {vehicle && (
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Truck className="h-4 w-4" />
                {vehicle.unit_number}
                {vehicle.make ? ` · ${vehicle.make}` : ""}
                {vehicle.model ? ` ${vehicle.model}` : ""}
                {vehicle.plate ? ` · ${vehicle.plate}` : ""}
              </div>
            )}
          </div>
        </div>

        <p className="mt-7 text-sm font-semibold text-slate-400 uppercase tracking-wide">
          Route Details
        </p>
        <div className="mt-3 space-y-4">
          <RouteStop
            label="Pickup"
            value={shipment?.pickup_address ?? "—"}
            color="bg-teal-400"
          />
          <RouteStop
            label="Dropoff"
            value={shipment?.dropoff_address ?? "—"}
            color="bg-orange-400"
          />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/5 px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">ETA</p>
            <p className="mt-1 text-lg font-semibold">{eta}</p>
          </div>
          <div className="rounded-2xl bg-white/5 px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">Last updated</p>
            <p className="mt-1 text-lg font-semibold">{formatRelative(driver.last_seen_at)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
const STATUS_STYLES: Record<string, string> = {
  available: "bg-emerald-500/15 text-emerald-300",
  en_route: "bg-sky-500/15 text-sky-300",
  delivering: "bg-orange-500/15 text-orange-300",
  delayed: "bg-amber-500/15 text-amber-300",
  offline: "bg-slate-500/20 text-slate-300",
};

function StatusPill({ status }: { status: string | null | undefined }) {
  const key = (status ?? "offline").toLowerCase().replace(/\s+/g, "_");
  const cls = STATUS_STYLES[key] ?? "bg-teal-500/15 text-teal-300";
  const label = (status ?? "Offline").replace(/_/g, " ");
  return (
    <div className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold capitalize ${cls}`}>
      {label}
    </div>
  );
}


function StatusCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[2rem] bg-white p-10 text-center text-slate-500 shadow-sm ring-1 ring-slate-200">
      {children}
    </div>
  );
}

function formatRelative(iso: string | null): string {
  if (!iso) return "—";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} h ago`;
  return new Date(iso).toLocaleDateString();
}

function CargoMetric({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/25 px-4 py-3">
      {icon && (
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/50 text-slate-800">
          {icon}
        </div>
      )}
      <div>
        <p className="text-xs text-slate-900/70">{label}</p>
        <p className="mt-0.5 text-base font-bold">{value}</p>
      </div>
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
