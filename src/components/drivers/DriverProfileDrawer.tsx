import type { Driver } from "@/types";
import { DriverStatusBadge } from "@/components/drivers/DriverStatusBadge";
import { VehicleTypeBadge } from "@/components/fleet/VehicleTypeBadge";
import {
  X,
  Phone,
  MessageSquare,
  MapPin,
  Gauge,
  Fuel,
  Clock,
  ShieldCheck,
  Package,
  TrendingUp,
  Navigation as NavIcon,
  User,
  Mail,
  Truck,
} from "lucide-react";
import { loads, shipments } from "@/data/mock";
import { LiquidIconButton } from "@/components/ui/liquid-icon-button";
import { motion, AnimatePresence } from "framer-motion";

export function DriverProfileDrawer({
  driver,
  onClose,
}: {
  driver: Driver | null;
  onClose: () => void;
}) {
  const load = loads.find((l) => l.id === driver?.currentLoadId);
  const shipment = shipments.find((s) => s.id === driver?.activeShipmentId);

  return (
    <AnimatePresence>
      {driver && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/40 backdrop-blur-[2px] z-40"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
            className="fixed top-0 right-0 h-screen w-full sm:w-[500px] z-50 bg-card border-l border-border overflow-y-auto shadow-[var(--shadow-lg)]"
          >
            {/* Gradient header */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal/15 via-card to-orange/10" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-border" />
              <div className="relative p-5">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="size-14 rounded-full bg-gradient-to-br from-teal to-orange grid place-items-center text-white font-semibold shadow-[var(--shadow-md)]">
                      {driver.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full bg-success ring-2 ring-card" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-semibold text-base truncate">{driver.name}</h2>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-teal/15 text-teal border border-teal/25">
                        {driver.licenseType}
                      </span>
                    </div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground tabular-nums">
                      {driver.id} · Updated {driver.lastUpdated}
                    </div>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <DriverStatusBadge status={driver.status} size="xs" />
                      <VehicleTypeBadge type={driver.vehicleType} />
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="size-9 rounded-md grid place-items-center hover:bg-secondary"
                    aria-label="Close"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                {/* Quick contact row */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button variant="outline" className="gap-2 h-9"><Phone className="size-4" /> Call driver</Button>
                  <Button variant="outline" className="gap-2 h-9"><MessageSquare className="size-4" /> Message</Button>
                </div>
              </div>
            </div>

            {/* Live telemetry */}
            <section className="px-5 pt-5">
              <SectionTitle>Live Telemetry</SectionTitle>
              <div className="grid grid-cols-3 gap-2">
                <Metric icon={Gauge} label="Speed" value={`${driver.currentSpeed}`} unit="mph" />
                <Metric icon={Clock} label="ETA" value={driver.eta ?? "—"} />
                <Metric icon={MapPin} label="Today" value={`${driver.milesToday}`} unit="mi" />
              </div>
              <div className="mt-2 rounded-lg border border-border bg-surface-2 p-3 flex items-center gap-3">
                <NavIcon className="size-4 text-teal shrink-0" />
                <div className="text-xs flex-1 min-w-0 truncate">{driver.currentLocation.label}</div>
                <span className="text-[10px] text-muted-foreground tabular-nums">
                  {driver.currentLocation.lat.toFixed(2)}, {driver.currentLocation.lng.toFixed(2)}
                </span>
              </div>
            </section>

            {/* Performance */}
            <section className="px-5 pt-5">
              <SectionTitle>Performance</SectionTitle>
              <div className="grid grid-cols-3 gap-2">
                <Metric icon={TrendingUp} label="On-time" value={`${driver.onTimePercentage}`} unit="%" accent="success" />
                <Metric icon={ShieldCheck} label="Safety" value={driver.safetyScore.toString()} accent="info" />
                <Metric icon={Fuel} label="Avg MPG" value={driver.averageMpg.toString()} accent="orange" />
              </div>
            </section>

            {/* Assignment */}
            <section className="px-5 pt-5">
              <SectionTitle>Current Assignment</SectionTitle>
              {load ? (
                <div className="rounded-xl border border-border bg-surface-2 overflow-hidden">
                  <div className="px-3 py-2.5 border-b border-border flex items-center justify-between">
                    <span className="font-semibold text-sm tabular-nums">{load.id}</span>
                    <span className="text-xs text-muted-foreground">{load.customer}</span>
                  </div>
                  <div className="p-3">
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center pt-0.5">
                        <span className="size-2 rounded-full bg-teal" />
                        <span className="w-px flex-1 bg-border my-0.5" />
                        <span className="size-2 rounded-full bg-orange" />
                      </div>
                      <div className="flex-1 space-y-2 text-sm">
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Pickup</div>
                          <div>{load.pickupLocation}</div>
                          <div className="text-[11px] text-muted-foreground">{load.pickupWindow}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Drop-off</div>
                          <div>{load.dropoffLocation}</div>
                          <div className="text-[11px] text-muted-foreground">{load.deliveryWindow}</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
                      <KV label="Distance" value={`${load.estimatedMiles} mi`} />
                      <KV label="Duration" value={load.estimatedDuration} />
                      <KV label="Rate" value={`$${load.rate.toLocaleString()}`} />
                    </div>
                  </div>
                </div>
              ) : (
                <EmptyMini icon={Truck} text="No active load assigned" />
              )}
            </section>

            {shipment && (
              <section className="px-5 pt-5">
                <SectionTitle icon={Package}>Shipment Manifest</SectionTitle>
                <div className="rounded-xl border border-border bg-surface-2 p-3 grid grid-cols-2 gap-y-1.5 text-xs">
                  <KV inline label="Shipment ID" value={shipment.id} />
                  <KV inline label="Commodity" value={shipment.commodity} />
                  <KV inline label="Package" value={shipment.packageType} />
                  <KV inline label="Weight" value={`${shipment.weight.toLocaleString()} lb`} />
                  <KV inline label="Quantity" value={shipment.quantity.toString()} />
                  <KV inline label="ETA" value={shipment.eta} />
                </div>
                {shipment.specialInstructions && (
                  <div className="mt-2 text-xs rounded-lg bg-accent/40 border border-border p-2.5">
                    <span className="font-semibold">Special instructions: </span>
                    <span className="text-foreground/85">{shipment.specialInstructions}</span>
                  </div>
                )}
              </section>
            )}

            {/* Contact */}
            <section className="px-5 pt-5">
              <SectionTitle icon={User}>Driver Contact</SectionTitle>
              <div className="rounded-xl border border-border bg-surface-2 p-3 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-muted-foreground"><Phone className="size-3.5" /> Phone</span>
                  <span className="tabular-nums">{driver.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-muted-foreground"><Mail className="size-3.5" /> Email</span>
                  <span className="truncate ml-2">{driver.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-muted-foreground"><User className="size-3.5" /> Dispatcher</span>
                  <span>{driver.dispatcher}</span>
                </div>
              </div>
            </section>

            {/* Activity */}
            <section className="px-5 py-5">
              <SectionTitle>Activity Timeline</SectionTitle>
              <ol className="space-y-3 text-sm">
                {[
                  { time: driver.lastUpdated, label: `Status update · ${driver.status}`, accent: true },
                  { time: "12m ago", label: "GPS ping received" },
                  { time: "34m ago", label: `Speed adjusted to ${driver.currentSpeed} mph` },
                  { time: "1h ago", label: "Departed pickup facility" },
                  { time: "2h ago", label: "Load accepted" },
                ].map((e, i, arr) => (
                  <li key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span className={`size-2 rounded-full ${e.accent ? "bg-teal ring-4 ring-teal/15" : "bg-border"}`} />
                      {i < arr.length - 1 && <span className="w-px flex-1 bg-border mt-1" />}
                    </div>
                    <div className="pb-2 flex-1">
                      <div className="text-foreground/90 text-[13px]">{e.label}</div>
                      <div className="text-[11px] text-muted-foreground tabular-nums">{e.time}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function SectionTitle({ children, icon: Icon }: { children: React.ReactNode; icon?: typeof MapPin }) {
  return (
    <h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground mb-2 flex items-center gap-1.5">
      {Icon && <Icon className="size-3" />}
      {children}
    </h3>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  unit,
  accent = "teal",
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
  unit?: string;
  accent?: "teal" | "orange" | "info" | "success";
}) {
  const color = `var(--${accent})`;
  return (
    <div className="rounded-xl border border-border bg-surface-2 p-3">
      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase tracking-wider">
        <Icon className="size-3" style={{ color }} />
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold tabular-nums leading-none">
        {value}
        {unit && <span className="text-[10px] text-muted-foreground ml-1 font-medium">{unit}</span>}
      </div>
    </div>
  );
}

function KV({ label, value, inline = false }: { label: string; value: string; inline?: boolean }) {
  if (inline) {
    return (
      <>
        <span className="text-muted-foreground">{label}</span>
        <span className="text-right truncate">{value}</span>
      </>
    );
  }
  return (
    <div className="rounded-md bg-card border border-border p-2">
      <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-xs font-semibold tabular-nums mt-0.5">{value}</div>
    </div>
  );
}

function EmptyMini({ icon: Icon, text }: { icon: typeof MapPin; text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border p-5 text-center">
      <Icon className="size-5 text-muted-foreground mx-auto" />
      <div className="text-xs text-muted-foreground mt-1.5">{text}</div>
    </div>
  );
}
