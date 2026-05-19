import { useState } from "react";
import { loads } from "@/data/mock";
import {
  MapPin, Package, Clock, Truck, ShieldCheck, ShieldAlert, AlertTriangle,
  Check, X, FileText, Weight, Hash, Navigation as NavIcon, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";

const denyReasons = [
  "Vehicle unavailable",
  "Too far",
  "Break required",
  "Equipment mismatch",
  "Driver off duty",
  "Load details issue",
  "Other",
];

export function DriverMobileLoadRequest() {
  const load = loads[0]!;
  const [state, setState] = useState<"offer" | "deny" | "accepted">("offer");
  const [reason, setReason] = useState<string | null>(null);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-surface-2 py-6 px-4">
      <div className="mx-auto max-w-md">
        {/* Phone frame */}
        <div className="rounded-[2.2rem] border-[10px] border-foreground/10 bg-background shadow-2xl overflow-hidden">
          {/* Status bar */}
          <div className="bg-sidebar text-sidebar-foreground px-5 py-2 flex items-center justify-between text-[11px]">
            <span>9:41</span>
            <span className="font-medium">Anderoute Driver</span>
            <span className="inline-flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-success" /> Online
            </span>
          </div>

          <AnimatePresence mode="wait">
            {state === "offer" && (
              <motion.div key="offer" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                {/* Header */}
                <div className="px-5 pt-5 pb-3 border-b border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                      New Load Offer
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-orange">
                      <Clock className="size-3" /> Respond in 3:42
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">{load.id}</h2>
                    <span className="text-sm text-muted-foreground">{load.customer}</span>
                  </div>
                </div>

                {/* Route */}
                <div className="px-5 py-4 space-y-3">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center pt-1">
                      <span className="size-2.5 rounded-full bg-teal ring-4 ring-teal/15" />
                      <span className="w-px flex-1 bg-border my-1" />
                      <span className="size-2.5 rounded-full bg-orange ring-4 ring-orange/15" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Pickup</div>
                        <div className="text-sm font-medium">{load.pickupLocation}</div>
                        <div className="text-[11px] text-muted-foreground">{load.pickupWindow}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Drop-off</div>
                        <div className="text-sm font-medium">{load.dropoffLocation}</div>
                        <div className="text-[11px] text-muted-foreground">{load.deliveryWindow}</div>
                      </div>
                    </div>
                  </div>

                  {/* Trip stats */}
                  <div className="grid grid-cols-3 rounded-lg border border-border bg-surface-2 divide-x divide-border">
                    <Stat label="Miles" value={`${load.estimatedMiles}`} />
                    <Stat label="Duration" value={load.estimatedDuration} />
                    <Stat label="Rate" value={`$${load.rate}`} />
                  </div>

                  {/* Cargo */}
                  <div className="rounded-lg border border-border p-3 space-y-2">
                    <Row icon={Package} label="Commodity" value={load.commodity} />
                    <Row icon={FileText} label="Package" value={load.packageType} />
                    <Row icon={Weight} label="Weight" value={`${load.weight.toLocaleString()} lb`} />
                    <Row icon={Hash} label="Quantity" value={load.quantity.toString()} />
                    <Row icon={Truck} label="Vehicle" value={load.requiredVehicleType} />
                    <Row
                      icon={load.requiresCDL ? ShieldAlert : ShieldCheck}
                      label="CDL"
                      value={load.requiresCDL ? "Required" : "Not required"}
                    />
                  </div>

                  {load.dispatcherNote && (
                    <div className="rounded-lg bg-accent/40 border border-border p-3 text-xs">
                      <div className="font-medium mb-0.5">Dispatcher note</div>
                      <p className="text-foreground/80">{load.dispatcherNote}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="sticky bottom-0 bg-background border-t border-border p-4 flex gap-2">
                  <Button variant="outline" className="flex-1 gap-2" onClick={() => setState("deny")}>
                    <X className="size-4" /> Deny
                  </Button>
                  <Button
                    className="flex-1 gap-2 bg-teal text-teal-foreground hover:bg-teal/90"
                    onClick={() => setState("accepted")}
                  >
                    <Check className="size-4" /> Accept
                  </Button>
                </div>
              </motion.div>
            )}

            {state === "deny" && (
              <motion.div key="deny" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="p-5 space-y-4">
                <h2 className="text-lg font-semibold">Reason for denial</h2>
                <p className="text-sm text-muted-foreground">
                  Help dispatch reassign quickly.
                </p>
                <ul className="space-y-2">
                  {denyReasons.map((r) => (
                    <li key={r}>
                      <button
                        onClick={() => setReason(r)}
                        className={`w-full text-left rounded-lg border p-3 text-sm transition ${
                          reason === r
                            ? "border-teal bg-teal/10"
                            : "border-border hover:bg-secondary"
                        }`}
                      >
                        {r}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1" onClick={() => setState("offer")}>Back</Button>
                  <Button className="flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90" disabled={!reason}>
                    Submit Denial
                  </Button>
                </div>
              </motion.div>
            )}

            {state === "accepted" && (
              <motion.div key="acc" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="p-6 text-center space-y-4">
                <div className="mx-auto size-16 rounded-full bg-teal/15 grid place-items-center text-teal">
                  <Check className="size-8" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Load Accepted</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {load.id} · Heading to {load.pickupLocation}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-surface-2 p-3 text-sm flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-muted-foreground"><AlertTriangle className="size-4 text-orange" /> Mandatory pre-trip</span>
                  <span className="text-teal font-medium">2 items</span>
                </div>
                <Button asChild className="w-full gap-2 bg-orange text-orange-foreground hover:bg-orange/90">
                  <Link to="/driver/navigation">
                    <NavIcon className="size-4" /> Start Navigation <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <button className="text-xs text-muted-foreground" onClick={() => setState("offer")}>
                  ← Back to offer
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-4 text-center text-[11px] text-muted-foreground">
          This screen demonstrates the driver-facing app. Drivers are only tracked while authenticated and consented.
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 text-center">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-sm font-semibold mt-0.5">{value}</div>
    </div>
  );
}

function Row({ icon: Icon, label, value }: { icon: typeof Package; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="inline-flex items-center gap-2 text-muted-foreground">
        <Icon className="size-3.5" /> {label}
      </span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}
