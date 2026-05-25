/**
 * DriverProfilePage
 *
 * Full-screen dispatcher view for a single driver. Inspired by premium
 * logistics dashboards: left rail nav, breadcrumb header, then a 12-col
 * grid of cards covering shipment, live map, vehicle telemetry, ETA,
 * driver bio, and pickup/dropoff. All data is wired through props so the
 * route file can hand in demo or live data.
 */
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  Navigation2,
  Package,
  Truck,
  Clock,
  MapPin,
  Fuel,
  Gauge,
  Thermometer,
  Wrench,
  ShieldCheck,
  Star,
  Map as MapIcon,
  LayoutGrid,
  Users,
  ClipboardList,
  Bell,
  Settings,
  ChevronRight,
} from "lucide-react";
import type { DispatchDriver } from "@/types/dispatch";
import { DRIVER_STATUS_COLOR, DRIVER_STATUS_LABEL } from "@/components/dispatch/dispatchTokens";
import type { DriverProfileDemo } from "@/data/driverProfileDemo";
import { DriverProfileMapCard } from "./DriverProfileMapCard";

interface Props {
  driver: DispatchDriver;
  profile: DriverProfileDemo;
}

export function DriverProfilePage({ driver, profile }: Props) {
  const statusColor = DRIVER_STATUS_COLOR[driver.status];
  const initials = (driver.driver_name || "Driver")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="fixed inset-0 flex overflow-hidden bg-slate-950 text-slate-100">
      {/* Left rail */}
      <SideRail />

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBreadcrumb driverName={driver.driver_name || "Driver"} unit={driver.unit_number} />

        <div className="min-h-0 flex-1 overflow-y-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
          <div className="mx-auto grid max-w-[1500px] grid-cols-12 gap-5">
            {/* Shipment / cargo — large hero */}
            <ShipmentCard driver={driver} profile={profile} statusColor={statusColor} />

            {/* Driver profile */}
            <DriverCard driver={driver} profile={profile} initials={initials} statusColor={statusColor} />

            {/* Live map */}
            <section className="col-span-12 lg:col-span-8">
              <Panel
                title="Live Route"
                icon={<MapIcon className="size-4 text-teal-300" />}
                action={<RouteProgress pct={profile.eta.progressPct} />}
              >
                <div className="h-[360px] overflow-hidden rounded-xl ring-1 ring-white/5">
                  <DriverProfileMapCard
                    driver={{
                      lat: driver.latitude,
                      lng: driver.longitude,
                      heading: driver.heading,
                      color: statusColor,
                    }}
                    pickup={{ lat: profile.pickup.lat, lng: profile.pickup.lng, label: "PICKUP" }}
                    dropoff={{ lat: profile.dropoff.lat, lng: profile.dropoff.lng, label: "DROPOFF" }}
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <StopBlock kind="pickup" stop={profile.pickup} />
                  <StopBlock kind="dropoff" stop={profile.dropoff} />
                </div>
              </Panel>
            </section>

            {/* ETA + Telemetry stack */}
            <section className="col-span-12 space-y-5 lg:col-span-4">
              <EtaCard profile={profile} />
              <TelemetryCard profile={profile} driver={driver} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                            */
/* -------------------------------------------------------------------------- */

function SideRail() {
  const items = [
    { icon: LayoutGrid, label: "Dispatch" },
    { icon: Users, label: "Drivers", active: true },
    { icon: Truck, label: "Fleet" },
    { icon: ClipboardList, label: "Loads" },
    { icon: MapIcon, label: "Map" },
    { icon: Bell, label: "Alerts" },
    { icon: Settings, label: "Settings" },
  ];
  return (
    <aside className="flex w-[76px] flex-col items-center gap-1 border-r border-white/5 bg-slate-950/80 py-5 backdrop-blur">
      <div className="mb-4 grid size-10 place-items-center rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 text-sm font-black text-slate-950 shadow-lg shadow-teal-500/30">
        AR
      </div>
      {items.map((it) => (
        <button
          key={it.label}
          title={it.label}
          className={`grid size-11 place-items-center rounded-xl transition ${
            it.active
              ? "bg-teal-400/10 text-teal-300 ring-1 ring-teal-400/30"
              : "text-slate-400 hover:bg-white/5 hover:text-white"
          }`}
        >
          <it.icon className="size-5" />
        </button>
      ))}
    </aside>
  );
}

function TopBreadcrumb({ driverName, unit }: { driverName: string; unit: string | null }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-white/5 bg-slate-950/60 px-6 backdrop-blur">
      <div className="flex items-center gap-3 text-sm">
        <Link
          to="/dispatch-board"
          className="grid size-9 place-items-center rounded-lg border border-white/10 text-slate-300 hover:border-teal-400/40 hover:text-teal-300"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <nav className="flex items-center gap-2 text-slate-400">
          <Link to="/dispatch-board" className="hover:text-teal-300">
            Dispatch
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="hover:text-teal-300">Drivers</span>
          <ChevronRight className="size-3.5" />
          <span className="font-semibold text-white">{driverName}</span>
          {unit && (
            <span className="ml-1 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-300">
              Unit {unit}
            </span>
          )}
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-teal-400/40 hover:text-teal-300">
          <MessageSquare className="size-3.5" /> Message
        </button>
        <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-400 to-emerald-500 px-3 py-1.5 text-xs font-bold text-slate-950 shadow-lg shadow-teal-500/20 hover:from-teal-300">
          <Phone className="size-3.5" /> Call driver
        </button>
      </div>
    </header>
  );
}

function Panel({
  title,
  icon,
  action,
  children,
  className = "",
}: {
  title: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/5 bg-slate-900/60 p-5 shadow-xl shadow-black/20 backdrop-blur ${className}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
          {icon}
          {title}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function ShipmentCard({
  driver,
  profile,
  statusColor,
}: {
  driver: DispatchDriver;
  profile: DriverProfileDemo;
  statusColor: string;
}) {
  return (
    <section className="col-span-12 lg:col-span-8">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 shadow-2xl shadow-black/30">
        <div
          className="absolute -right-20 -top-20 size-72 rounded-full opacity-20 blur-3xl"
          style={{ background: statusColor }}
        />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-teal-300">
              <Package className="size-3.5" /> Active Shipment
            </div>
            <h2 className="mt-1 text-2xl font-bold text-white">{profile.cargo.title}</h2>
            <p className="mt-1 text-sm text-slate-400">{profile.cargo.commodity}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <Pill label="Shipment" value={profile.shipmentId} tone="teal" />
              <Pill label="Vehicle" value={profile.vehicleId} tone="orange" />
              <span
                className="rounded-md px-2 py-1 text-[11px] font-bold uppercase tracking-wider"
                style={{ background: `${statusColor}1f`, color: statusColor }}
              >
                ● {DRIVER_STATUS_LABEL[driver.status]}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Metric label="Weight" value={`${(profile.cargo.weightLbs / 1000).toFixed(1)}k`} unit="lbs" />
            <Metric label="Pallets" value={profile.cargo.pallets.toString()} unit="units" />
            <Metric label="Temp" value={`${profile.cargo.tempF ?? "—"}°`} unit="reefer" />
            <Metric label="Rate" value={`$${profile.cargo.rateUsd}`} unit="USD" />
          </div>
        </div>

        <div className="relative mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <DetailLine label="Seal Number" value={profile.cargo.sealNumber} />
          <DetailLine label="Dispatcher" value={profile.driver.dispatcher} />
        </div>
      </div>
    </section>
  );
}

function DriverCard({
  driver,
  profile,
  initials,
  statusColor,
}: {
  driver: DispatchDriver;
  profile: DriverProfileDemo;
  initials: string;
  statusColor: string;
}) {
  return (
    <section className="col-span-12 lg:col-span-4">
      <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-black/20 backdrop-blur">
        <div className="flex items-center gap-4">
          <div className="relative">
            {profile.driver.photoUrl ? (
              <img
                src={profile.driver.photoUrl}
                alt=""
                className="size-16 rounded-2xl object-cover"
                style={{ boxShadow: `0 0 0 3px ${statusColor}` }}
              />
            ) : (
              <div
                className="grid size-16 place-items-center rounded-2xl text-xl font-black text-white"
                style={{
                  background: `linear-gradient(135deg, ${statusColor}, #0f172a)`,
                  boxShadow: `0 0 0 3px ${statusColor}66`,
                }}
              >
                {initials}
              </div>
            )}
            <span
              className="absolute -bottom-1 -right-1 size-4 rounded-full ring-2 ring-slate-900"
              style={{ background: statusColor }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-lg font-bold text-white">{driver.driver_name}</div>
            <div className="text-xs text-slate-400">
              {profile.driver.licenseClass} · {profile.driver.yearsExperience} yrs · {profile.driver.homeBase}
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <StatBlock icon={<ShieldCheck className="size-3.5" />} label="Safety" value={`${profile.driver.safetyScore}`} unit="/100" />
          <StatBlock icon={<Star className="size-3.5" />} label="On-Time" value={`${profile.driver.onTimePct}%`} />
        </div>

        <div className="mt-4 space-y-2 text-xs">
          <DetailLine label="Phone" value="+1 (555) 204-7781" />
          <DetailLine label="Dispatcher" value={profile.driver.dispatcher} />
          <DetailLine label="Home base" value={profile.driver.homeBase} />
        </div>

        <div className="mt-auto pt-5">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-semibold text-slate-200 hover:border-teal-400/40 hover:text-teal-300">
            <Navigation2 className="size-3.5" /> Send route to driver
          </button>
        </div>
      </div>
    </section>
  );
}

function EtaCard({ profile }: { profile: DriverProfileDemo }) {
  const arrival = new Date(profile.eta.arrivalIso);
  const hh = arrival.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return (
    <Panel title="Estimated Arrival" icon={<Clock className="size-4 text-teal-300" />}>
      <div className="flex items-end gap-3">
        <div className="text-4xl font-black text-white">{hh}</div>
        <div className="pb-1 text-xs text-slate-400">{profile.eta.minutesRemaining} min remaining</div>
      </div>
      <div className="mt-4">
        <div className="mb-1 flex justify-between text-[10px] uppercase tracking-wider text-slate-500">
          <span>Route progress</span>
          <span>
            {(profile.eta.totalMiles - profile.eta.remainingMiles).toFixed(0)} /{" "}
            {profile.eta.totalMiles.toFixed(0)} mi
          </span>
        </div>
        <div className="relative h-2 overflow-hidden rounded-full bg-slate-800">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-teal-400 to-emerald-300 transition-all"
            style={{ width: `${profile.eta.progressPct}%` }}
          />
        </div>
        <div className="mt-1.5 text-right text-[11px] font-semibold text-teal-300">
          {profile.eta.progressPct}% complete
        </div>
      </div>
    </Panel>
  );
}

function TelemetryCard({ profile, driver }: { profile: DriverProfileDemo; driver: DispatchDriver }) {
  return (
    <Panel title="Vehicle Telemetry" icon={<Truck className="size-4 text-orange-300" />}>
      <div className="grid grid-cols-2 gap-3">
        <Telemetry icon={<Fuel className="size-4" />} label="Fuel" value={`${profile.telemetry.fuelPct}%`} tone="emerald" />
        <Telemetry icon={<Gauge className="size-4" />} label="Speed" value={`${driver.speed_mph ?? 0} mph`} tone="teal" />
        <Telemetry icon={<Thermometer className="size-4" />} label="Engine" value={`${profile.telemetry.engineTempF}°F`} tone="orange" />
        <Telemetry icon={<Thermometer className="size-4" />} label="Reefer" value={`${profile.telemetry.trailerTempF}°F`} tone="sky" />
        <Telemetry icon={<Gauge className="size-4" />} label="Tire PSI" value={`${profile.telemetry.tirePressurePsi}`} tone="slate" />
        <Telemetry icon={<Wrench className="size-4" />} label="Service" value={`${profile.telemetry.nextServiceMi} mi`} tone="amber" />
      </div>
      <div className="mt-3 text-[11px] text-slate-500">
        Odometer · {profile.telemetry.odometerMi.toLocaleString()} mi
      </div>
    </Panel>
  );
}

function StopBlock({
  kind,
  stop,
}: {
  kind: "pickup" | "dropoff";
  stop: DriverProfileDemo["pickup"];
}) {
  const tone = kind === "pickup" ? "orange" : "sky";
  const label = kind === "pickup" ? "Pickup" : "Destination";
  return (
    <div className="rounded-xl border border-white/5 bg-slate-950/60 p-3">
      <div
        className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] ${
          tone === "orange" ? "text-orange-300" : "text-sky-300"
        }`}
      >
        <MapPin className="size-3" /> {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-white">{stop.name}</div>
      <div className="mt-0.5 text-[11px] text-slate-400">{stop.address}</div>
      <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-slate-300">
        <span>
          <span className="text-slate-500">Window · </span>
          {stop.window}
        </span>
        <span className="text-slate-500">{stop.contact}</span>
      </div>
    </div>
  );
}

function Metric({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-slate-950/50 px-3 py-2">
      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</div>
      <div className="text-lg font-black text-white">
        {value} {unit && <span className="text-xs font-medium text-slate-500">{unit}</span>}
      </div>
    </div>
  );
}

function StatBlock({
  icon,
  label,
  value,
  unit,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit?: string;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-slate-950/60 p-3">
      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {icon} {label}
      </div>
      <div className="mt-1 text-xl font-black text-white">
        {value} {unit && <span className="text-xs font-medium text-slate-500">{unit}</span>}
      </div>
    </div>
  );
}

function Telemetry({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: "teal" | "orange" | "emerald" | "sky" | "amber" | "slate";
}) {
  const toneMap: Record<string, string> = {
    teal: "text-teal-300",
    orange: "text-orange-300",
    emerald: "text-emerald-300",
    sky: "text-sky-300",
    amber: "text-amber-300",
    slate: "text-slate-300",
  };
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-slate-950/50 p-2.5">
      <div className={`grid size-9 place-items-center rounded-lg bg-white/5 ${toneMap[tone]}`}>{icon}</div>
      <div className="min-w-0">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</div>
        <div className="text-sm font-bold text-white">{value}</div>
      </div>
    </div>
  );
}

function Pill({ label, value, tone }: { label: string; value: string; tone: "teal" | "orange" }) {
  const cls =
    tone === "teal"
      ? "border-teal-400/30 bg-teal-400/10 text-teal-200"
      : "border-orange-400/30 bg-orange-400/10 text-orange-200";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 ${cls}`}>
      <span className="text-[9px] font-bold uppercase tracking-wider opacity-70">{label}</span>
      <span className="font-semibold">{value}</span>
    </span>
  );
}

function DetailLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-white/5 py-1.5">
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</span>
      <span className="truncate text-xs font-semibold text-slate-200">{value}</span>
    </div>
  );
}

function RouteProgress({ pct }: { pct: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-32 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full bg-gradient-to-r from-teal-400 to-emerald-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[10px] font-bold text-teal-300">{pct}%</span>
    </div>
  );
}
