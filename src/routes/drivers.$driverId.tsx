import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { drivers, loads, shipments, alerts } from "@/data/mock";
import { DriverStatusBadge } from "@/components/drivers/DriverStatusBadge";
import { VehicleTypeBadge } from "@/components/fleet/VehicleTypeBadge";
import {
  ChevronLeft, Phone, MessageSquare, Mail, MapPin, Navigation,
  Gauge, Clock, Fuel, ShieldCheck, TrendingUp, Package, Truck,
  User, Calendar, FileDown, BellRing,
} from "lucide-react";

export const Route = createFileRoute("/drivers/$driverId")({
  head: ({ params }) => ({
    meta: [
      { title: `Driver ${params.driverId} — Anderoute` },
      { name: "description", content: "Driver profile, telemetry, current assignment and performance metrics." },
    ],
  }),
  component: DriverProfilePage,
});

function DriverProfilePage() {
  const { driverId } = useParams({ from: "/drivers/$driverId" });
  const driver = drivers.find((d) => d.id === driverId);

  if (!driver) {
    return (
      <AppShell>
        <div className="p-8">
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <h1 className="text-lg font-semibold">Driver not found</h1>
            <p className="text-sm text-muted-foreground mt-1">No driver matches ID {driverId}.</p>
            <Link to="/drivers" className="inline-block mt-4 text-sm text-teal font-medium">← Back to Drivers</Link>
          </div>
        </div>
      </AppShell>
    );
  }

  const load = loads.find((l) => l.id === driver.currentLoadId);
  const shipment = shipments.find((s) => s.id === driver.activeShipmentId);
  const driverAlerts = alerts.filter((a) => a.driverId === driver.id);
  const initials = driver.name.split(" ").map((n) => n[0]).join("");

  return (
    <AppShell>
      <div className="command-canvas">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <Link to="/drivers" className="inline-flex items-center gap-1 hover:text-teal">
            <ChevronLeft className="size-3.5" /> Drivers
          </Link>
          <span>/</span>
          <span className="text-foreground">{driver.name}</span>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-5">
          {/* MAIN */}
          <div className="space-y-5">
            {/* Identity card */}
            <div className="cc-tile !cursor-default p-6">
              <div className="flex items-start gap-5">
                <div className="relative shrink-0">
                  <div className="size-20 rounded-2xl bg-gradient-to-br from-teal to-orange grid place-items-center text-white font-semibold text-2xl shadow-[var(--shadow-md)]">
                    {initials}
                  </div>
                  <span className="absolute -bottom-1 -right-1 size-4 rounded-full bg-success ring-2 ring-card" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-semibold tracking-tight">{driver.name}</h1>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal/15 text-teal border border-teal/25">
                      {driver.licenseType}
                    </span>
                    <DriverStatusBadge status={driver.status} size="xs" />
                    <VehicleTypeBadge type={driver.vehicleType} />
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground tabular-nums">
                    {driver.id} · Updated {driver.lastUpdated} · Dispatcher {driver.dispatcher}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <ActionBtn icon={Phone} label="Call" tone="teal" />
                    <ActionBtn icon={MessageSquare} label="Message" tone="teal" />
                    <ActionBtn icon={Navigation} label="Track on Map" tone="info" />
                    <ActionBtn icon={FileDown} label="Export Report" />
                  </div>
                </div>
              </div>
            </div>

            {/* Telemetry */}
            <Section title="Live Telemetry">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Metric icon={Gauge} label="Speed" value={`${driver.currentSpeed}`} unit="mph" tone="teal" />
                <Metric icon={Clock} label="ETA" value={driver.eta ?? "—"} tone="info" />
                <Metric icon={MapPin} label="Miles today" value={`${driver.milesToday}`} unit="mi" tone="orange" />
                <Metric icon={Package} label="Loads today" value={`${driver.loadsToday}`} tone="success" />
              </div>
              <div className="mt-3 rounded-xl border border-border bg-surface-2/70 p-3 flex items-center gap-3">
                <Navigation className="size-4 text-teal" />
                <div className="flex-1 text-sm truncate">{driver.currentLocation.label}</div>
                <span className="text-[11px] text-muted-foreground tabular-nums">
                  {driver.currentLocation.lat.toFixed(3)}, {driver.currentLocation.lng.toFixed(3)}
                </span>
              </div>
            </Section>

            {/* Performance */}
            <Section title="Performance">
              <div className="grid grid-cols-3 gap-3">
                <Metric icon={TrendingUp} label="On-time" value={`${driver.onTimePercentage}`} unit="%" tone="success" big />
                <Metric icon={ShieldCheck} label="Safety score" value={driver.safetyScore.toString()} tone="info" big />
                <Metric icon={Fuel} label="Avg MPG" value={driver.averageMpg.toString()} tone="orange" big />
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1.5">
                  <span>On-time delivery rate</span>
                  <span className="tabular-nums text-foreground font-semibold">{driver.onTimePercentage}%</span>
                </div>
                <div className="h-2 rounded-full bg-border overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-teal to-orange" style={{ width: `${driver.onTimePercentage}%` }} />
                </div>
              </div>
            </Section>

            {/* Assignment */}
            <Section title="Current Assignment">
              {load ? (
                <div className="rounded-xl border border-border bg-surface-2/70 overflow-hidden">
                  <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                    <span className="font-semibold tabular-nums">{load.id}</span>
                    <span className="text-xs text-muted-foreground">{load.customer}</span>
                  </div>
                  <div className="p-4">
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center pt-1">
                        <span className="size-2.5 rounded-full bg-teal" />
                        <span className="w-px flex-1 bg-border my-1" />
                        <span className="size-2.5 rounded-full bg-orange" />
                      </div>
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Pickup</div>
                          <div className="font-medium">{load.pickupLocation}</div>
                          <div className="text-[11px] text-muted-foreground">{load.pickupWindow}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Drop-off</div>
                          <div className="font-medium">{load.dropoffLocation}</div>
                          <div className="text-[11px] text-muted-foreground">{load.deliveryWindow}</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-4 gap-2 text-[11px]">
                      <Mini label="Distance" v={`${load.estimatedMiles} mi`} />
                      <Mini label="Duration" v={load.estimatedDuration} />
                      <Mini label="Rate" v={`$${load.rate.toLocaleString()}`} />
                      <Mini label="Weight" v={`${load.weight.toLocaleString()} lb`} />
                    </div>
                    {shipment?.specialInstructions && (
                      <div className="mt-3 text-xs rounded-lg bg-accent/40 border border-border p-2.5">
                        <span className="font-semibold">Special: </span>
                        <span className="text-foreground/85">{shipment.specialInstructions}</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                  <Truck className="size-6 mx-auto mb-2" /> No active load assigned
                </div>
              )}
            </Section>

            {/* Activity */}
            <Section title="Activity Timeline">
              <ol className="space-y-3 text-sm">
                {[
                  { time: driver.lastUpdated, label: `Status update · ${driver.status}`, accent: true },
                  { time: "12m ago", label: "GPS ping received" },
                  { time: "34m ago", label: `Speed adjusted to ${driver.currentSpeed} mph` },
                  { time: "1h ago", label: "Departed pickup facility" },
                  { time: "2h ago", label: "Load accepted" },
                  { time: "4h ago", label: "Shift started" },
                ].map((e, i, arr) => (
                  <li key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span className={`size-2.5 rounded-full ${e.accent ? "bg-teal ring-4 ring-teal/20" : "bg-border"}`} />
                      {i < arr.length - 1 && <span className="w-px flex-1 bg-border mt-1" />}
                    </div>
                    <div className="pb-2 flex-1">
                      <div className="text-foreground/90 text-[13px]">{e.label}</div>
                      <div className="text-[11px] text-muted-foreground tabular-nums">{e.time}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </Section>
          </div>

          {/* SIDE */}
          <aside className="space-y-5 xl:sticky xl:top-4 self-start">
            <Section title="Contact">
              <div className="space-y-2 text-sm">
                <ContactRow icon={Phone} label="Phone" value={driver.phone} />
                <ContactRow icon={Mail} label="Email" value={driver.email} />
                <ContactRow icon={User} label="Dispatcher" value={driver.dispatcher} />
                <ContactRow icon={Truck} label="Vehicle" value={driver.vehicleId} />
                <ContactRow icon={Calendar} label="License" value={driver.licenseType} />
              </div>
            </Section>

            <Section title="Map Preview">
              <div className="relative h-[180px] rounded-xl overflow-hidden border border-border bg-gradient-to-br from-teal/20 via-card to-orange/15">
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: "radial-gradient(circle at 30% 40%, var(--teal) 0, transparent 35%), radial-gradient(circle at 70% 60%, var(--orange) 0, transparent 35%)"
                }} />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <MapPin className="size-7 text-teal mx-auto" />
                    <div className="mt-1 text-xs font-medium">{driver.currentLocation.label}</div>
                    <div className="text-[10px] text-muted-foreground tabular-nums">
                      {driver.currentLocation.lat.toFixed(2)}, {driver.currentLocation.lng.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            <Section title="Operational Notes">
              <div className="space-y-2 text-[12px]">
                <Note tone="teal">Prefers eastbound routes when available.</Note>
                <Note tone="orange">Reefer-certified · cleared for cold-chain.</Note>
                <Note>HOS remaining: 6h 14m before mandatory break.</Note>
              </div>
            </Section>

            <Section title="Recent Alerts">
              {driverAlerts.length ? (
                <div className="space-y-2">
                  {driverAlerts.slice(0, 3).map((a) => (
                    <div key={a.id} className="rounded-lg border border-border bg-surface-2/60 p-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-destructive">{a.severity}</span>
                        <span className="text-[10px] text-muted-foreground">{a.createdAt}</span>
                      </div>
                      <div className="text-[12px] mt-1">{a.message}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-[12px] text-muted-foreground inline-flex items-center gap-2">
                  <BellRing className="size-3.5" /> No active alerts
                </div>
              )}
            </Section>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="cc-tile !cursor-default p-5">
      <h2 className="text-sm font-semibold tracking-tight mb-3">{title}</h2>
      {children}
    </section>
  );
}

function Metric({
  icon: Icon, label, value, unit, tone = "teal", big = false,
}: {
  icon: typeof Gauge; label: string; value: string; unit?: string;
  tone?: "teal" | "orange" | "info" | "success"; big?: boolean;
}) {
  const color = `var(--${tone})`;
  return (
    <div className="rounded-xl border border-border bg-surface-2/70 p-3">
      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase tracking-wider">
        <Icon className="size-3" style={{ color }} />
        {label}
      </div>
      <div className={`mt-1 font-semibold tabular-nums leading-none ${big ? "text-2xl" : "text-lg"}`}>
        {value}
        {unit && <span className="text-[10px] text-muted-foreground ml-1 font-medium">{unit}</span>}
      </div>
    </div>
  );
}

function Mini({ label, v }: { label: string; v: string }) {
  return (
    <div className="rounded-md bg-card border border-border p-2">
      <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-xs font-semibold tabular-nums mt-0.5">{v}</div>
    </div>
  );
}

function ContactRow({ icon: Icon, label, value }: { icon: typeof Phone; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="inline-flex items-center gap-2 text-muted-foreground text-xs">
        <Icon className="size-3.5" /> {label}
      </span>
      <span className="text-xs tabular-nums truncate max-w-[60%] text-right">{value}</span>
    </div>
  );
}

function Note({ children, tone }: { children: React.ReactNode; tone?: "teal" | "orange" }) {
  const color = tone ? `var(--${tone})` : "var(--border)";
  return (
    <div
      className="rounded-lg border border-border bg-surface-2/60 p-2.5"
      style={tone ? { boxShadow: `inset 3px 0 0 0 ${color}` } : undefined}
    >
      {children}
    </div>
  );
}

function ActionBtn({
  icon: Icon, label, tone,
}: {
  icon: typeof Phone; label: string; tone?: "teal" | "info";
}) {
  const isPrimary = tone === "teal";
  return (
    <button
      className={`inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-[12px] font-medium border transition ${
        isPrimary
          ? "bg-teal text-white border-teal hover:opacity-90"
          : "bg-card border-border hover:border-teal/50 hover:text-teal"
      }`}
    >
      <Icon className="size-3.5" /> {label}
    </button>
  );
}
