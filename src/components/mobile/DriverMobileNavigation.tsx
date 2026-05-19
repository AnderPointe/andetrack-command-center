import { useState } from "react";
import { routes, loads, drivers } from "@/data/mock";
import {
  ArrowUpRight, MapPin, Clock, Gauge, Phone, AlertTriangle,
  Check, PackageCheck, Truck, Navigation as NavIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const flow = [
  "Accepted", "En route pickup", "Arrived at pickup", "Loaded",
  "En route drop-off", "Arrived drop-off", "Delivered", "Completed",
] as const;

export function DriverMobileNavigation() {
  const route = routes[0]!;
  const load = loads.find((l) => l.id === route.loadId)!;
  const driver = drivers.find((d) => d.id === route.driverId)!;
  const [stepIdx, setStepIdx] = useState(1);
  const currentTurn = route.turnByTurnSteps[route.currentStep];
  const nextTurn = route.turnByTurnSteps[route.currentStep + 1];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-surface-2 py-6 px-4">
      <div className="mx-auto max-w-md">
        <div className="rounded-[2.2rem] border-[10px] border-foreground/10 bg-background shadow-2xl overflow-hidden">
          {/* Status bar */}
          <div className="bg-sidebar text-sidebar-foreground px-5 py-2 flex items-center justify-between text-[11px]">
            <span>9:41</span>
            <span className="font-medium">Navigating · {load.id}</span>
            <span className="inline-flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-success animate-pulse" /> GPS
            </span>
          </div>

          {/* Map */}
          <div className="relative h-72 map-grid map-radial bg-surface-2 overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 10 85 Q 30 60 50 55 T 90 15"
                stroke="var(--orange)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
              <path d="M 10 85 Q 30 60 50 55"
                stroke="var(--teal)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            </svg>
            {/* Current location dot */}
            <motion.div
              className="absolute size-4 rounded-full bg-teal ring-4 ring-teal/30"
              style={{ left: "50%", top: "55%", transform: "translate(-50%, -50%)" }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            <div className="absolute size-3 rounded-full bg-orange" style={{ left: "90%", top: "15%" }} />
            <div className="absolute bottom-3 left-3 right-3 rounded-lg bg-background/85 backdrop-blur border border-border p-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-md bg-teal text-teal-foreground grid place-items-center">
                  <ArrowUpRight className="size-5 rotate-45" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold leading-tight">
                    {currentTurn?.instruction ?? "Continue on route"}
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {currentTurn?.street} · in {currentTurn?.distance}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Next</div>
                  <div className="text-[11px]">{nextTurn?.distance ?? "—"}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Trip dashboard */}
          <div className="grid grid-cols-4 divide-x divide-border border-b border-border">
            <Stat label="ETA" value={route.eta} />
            <Stat label="Remaining" value={`${route.remainingMiles} mi`} />
            <Stat label="Speed" value={`${driver.currentSpeed}`} suffix="mph" />
            <Stat label="Step" value={`${route.currentStep + 1}/${route.turnByTurnSteps.length}`} />
          </div>

          {/* Status flow */}
          <div className="p-4">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">
              Load Status
            </div>
            <div className="flex items-center gap-1 overflow-x-auto pb-1">
              {flow.map((s, i) => (
                <button
                  key={s}
                  onClick={() => setStepIdx(i)}
                  className={`shrink-0 text-[11px] px-2 py-1 rounded-full border transition ${
                    i === stepIdx
                      ? "bg-teal text-teal-foreground border-teal"
                      : i < stepIdx
                      ? "bg-teal/15 border-teal/30 text-teal"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Pickup/Dropoff tabs */}
          <div className="px-4 pb-4 space-y-2">
            <div className="rounded-lg border border-border p-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-muted-foreground text-xs">
                  <MapPin className="size-3.5 text-teal" /> Pickup
                </span>
                <span className="text-[11px] text-muted-foreground">{load.pickupWindow}</span>
              </div>
              <div className="mt-0.5">{load.pickupLocation}</div>
            </div>
            <div className="rounded-lg border border-border p-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-muted-foreground text-xs">
                  <MapPin className="size-3.5 text-orange" /> Drop-off
                </span>
                <span className="text-[11px] text-muted-foreground">{load.deliveryWindow}</span>
              </div>
              <div className="mt-0.5">{load.dropoffLocation}</div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-4 grid grid-cols-2 gap-2 border-t border-border">
            <Button className="gap-2 bg-teal text-teal-foreground hover:bg-teal/90">
              <NavIcon className="size-4" /> Start Route
            </Button>
            <Button variant="outline" className="gap-2"><Check className="size-4" /> Mark Arrived</Button>
            <Button variant="outline" className="gap-2"><Truck className="size-4" /> Mark Loaded</Button>
            <Button variant="outline" className="gap-2"><PackageCheck className="size-4" /> Mark Delivered</Button>
            <Button variant="outline" className="gap-2 text-destructive border-destructive/30"><AlertTriangle className="size-4" /> Report Delay</Button>
            <Button variant="outline" className="gap-2"><Phone className="size-4" /> Dispatch</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, suffix }: { label: string; value: string; suffix?: string }) {
  return (
    <div className="p-3 text-center">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-sm font-semibold mt-0.5 tabular-nums">
        {value}{suffix && <span className="text-[10px] text-muted-foreground ml-0.5">{suffix}</span>}
      </div>
    </div>
  );
}
