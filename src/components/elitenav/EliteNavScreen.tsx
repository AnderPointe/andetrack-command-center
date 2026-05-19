import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Navigation, MapPin, Gauge, AlertTriangle, Phone, Mic,
  Radio, ShieldCheck, Fuel, Snowflake, Truck, Check, PackageCheck,
  ArrowUpRight, ArrowUpLeft, ArrowUp, CornerDownLeft, CornerDownRight,
  ChevronUp, ChevronDown, X, Sparkles, Waves, Activity, AlertOctagon,
  CloudSun, Route as RouteIcon, Coffee, ParkingSquare, Camera,
  CheckCircle2, Crosshair, Layers, Compass, Volume2, Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ProofOfDeliveryDialog } from "./ProofOfDeliveryDialog";
import {
  eliteVehicleProfile, eliteManeuvers, initialCoPilotFeed,
  suggestedCommands, initialDispatchSync, denyReasons,
} from "@/data/mockNavigation";
import type { CoPilotMessage, DispatchSyncEvent, NavManeuver } from "@/types/copilot";

type Phase =
  | "offered" | "to_pickup" | "at_pickup" | "loading"
  | "loaded" | "to_dropoff" | "at_dropoff" | "delivered";

const phaseMeta: Record<Phase, { label: string; color: string }> = {
  offered:     { label: "Load Offered",       color: "var(--status-offered)" },
  to_pickup:   { label: "En Route Pickup",    color: "var(--status-pickup)" },
  at_pickup:   { label: "Arrived Pickup",     color: "var(--teal)" },
  loading:     { label: "Loading",            color: "var(--status-loaded)" },
  loaded:      { label: "Loaded",             color: "var(--status-loaded)" },
  to_dropoff:  { label: "En Route Drop-off",  color: "var(--status-transit)" },
  at_dropoff:  { label: "Arrived Drop-off",   color: "var(--teal)" },
  delivered:   { label: "Delivered",          color: "var(--status-delivered)" },
};

const maneuverIcon = (t: NavManeuver["type"]) => {
  switch (t) {
    case "turn-left": return CornerDownLeft;
    case "turn-right": return CornerDownRight;
    case "keep-left": return ArrowUpLeft;
    case "keep-right": return ArrowUpRight;
    case "exit": return ArrowUpRight;
    case "arrive": return MapPin;
    case "depart": return Navigation;
    default: return ArrowUp;
  }
};

const mockLoad = {
  id: "LD-1042",
  pickup: "Fort Worth, TX · Polar Fresh DC",
  dropoff: "Oklahoma City, OK · Distribution Ctr 4",
  commodity: "Frozen Goods",
  packageType: "Pallet",
  weight: 22100,
  quantity: 30,
  vehicleType: "Reefer (CDL Required)",
  cdl: true,
  hazmat: false,
  pickupWindow: "Today 09:00 – 11:00",
  deliveryWindow: "Today 16:00 – 19:00",
  estMiles: 207,
  estDuration: "3h 24m",
  dispatcherNote: "Maintain -4°F. Temp logger required. Dock 12, ask for Marcus.",
  customer: "Polar Fresh",
  rate: 1320,
};

export function EliteNavScreen() {
  const [phase, setPhase] = useState<Phase>("offered");
  const [denyOpen, setDenyOpen] = useState(false);
  const [denyReason, setDenyReason] = useState<string>(denyReasons[0]);
  const [denyNote, setDenyNote] = useState("");
  const [coPilotOpen, setCoPilotOpen] = useState(false);
  const [turnsOpen, setTurnsOpen] = useState(false);
  const [routeIntelOpen, setRouteIntelOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [issueOpen, setIssueOpen] = useState(false);
  const [podOpen, setPodOpen] = useState(false);
  const [safetyMode, setSafetyMode] = useState(true);
  const [eta, setEta] = useState(18);
  const [remainingMi, setRemainingMi] = useState(14.2);
  const [speed, setSpeed] = useState(58);
  const [progress, setProgress] = useState(22);
  const [stepIdx, setStepIdx] = useState(1);
  const [feed, setFeed] = useState<CoPilotMessage[]>(initialCoPilotFeed);
  const [sync, setSync] = useState<DispatchSyncEvent[]>(initialDispatchSync);

  const driving = phase === "to_pickup" || phase === "to_dropoff";
  const current = eliteManeuvers[Math.min(stepIdx, eliteManeuvers.length - 1)];
  const next = eliteManeuvers[Math.min(stepIdx + 1, eliteManeuvers.length - 1)];
  const Icon = maneuverIcon(current.type);

  // Simulated live telemetry
  useEffect(() => {
    if (!driving) return;
    const t = setInterval(() => {
      setEta((e) => Math.max(1, e + (Math.random() < 0.3 ? 1 : -1)));
      setRemainingMi((m) => Math.max(0.1, +(m - 0.2 - Math.random() * 0.2).toFixed(1)));
      setSpeed((s) => Math.max(0, Math.min(72, s + Math.round((Math.random() - 0.5) * 4))));
      setProgress((p) => Math.min(100, +(p + 0.6 + Math.random() * 0.4).toFixed(1)));
      setSync((prev) => [
        { id: `gps-${Date.now()}`, type: "gps", message: `GPS ping · ${(32.7 + Math.random() * 0.05).toFixed(4)}, ${(-97.3 + Math.random() * 0.05).toFixed(4)}`, timestamp: "just now" },
        ...prev.slice(0, 6),
      ]);
    }, 2200);
    return () => clearInterval(t);
  }, [driving]);

  // Random CoPilot pings
  useEffect(() => {
    if (!driving) return;
    const t = setInterval(() => {
      const samples: CoPilotMessage[] = [
        { id: `c-${Date.now()}`, role: "copilot", tone: "info", text: `You are ${eta} minutes from ${phase === "to_pickup" ? "pickup" : "drop-off"}.`, timestamp: "now" },
        { id: `c-${Date.now()}b`, role: "copilot", tone: "warning", text: "Traffic has increased your ETA by 4 minutes.", timestamp: "now" },
        { id: `c-${Date.now()}c`, role: "copilot", tone: "success", text: "You are still inside the delivery window.", timestamp: "now" },
        { id: `c-${Date.now()}d`, role: "copilot", tone: "warning", text: "Low-clearance warning ahead: 13'9\" — truck route verified.", timestamp: "now" },
      ];
      setFeed((prev) => [samples[Math.floor(Math.random() * samples.length)], ...prev].slice(0, 12));
    }, 9000);
    return () => clearInterval(t);
  }, [driving, eta, phase]);

  function accept() {
    setPhase("to_pickup");
    setSafetyMode(true);
    pushSync("status", "Status → Load accepted, en route to pickup");
  }
  function pushSync(type: DispatchSyncEvent["type"], message: string) {
    setSync((s) => [{ id: `${type}-${Date.now()}`, type, message, timestamp: "now" }, ...s].slice(0, 8));
  }
  function advance(to: Phase, syncMsg?: string) {
    setPhase(to);
    if (syncMsg) pushSync("status", syncMsg);
    if (to === "delivered") setPodOpen(true);
  }

  // ===== OFFERED SCREEN =====
  if (phase === "offered") {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-surface-2 via-background to-surface-2 py-6 px-4">
        <PhoneFrame>
          <div className="bg-sidebar text-sidebar-foreground px-5 py-2 flex items-center justify-between text-[11px]">
            <span className="tabular-nums font-medium">9:41</span>
            <span className="font-semibold tracking-widest text-[10px]">ANDEROUTE · LOAD OFFER</span>
            <span className="inline-flex items-center gap-1"><span className="size-1.5 rounded-full bg-success animate-pulse" /> LIVE</span>
          </div>

          {/* Header */}
          <div className="px-5 pt-5 pb-3 bg-gradient-to-b from-teal/10 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Load Offer</div>
                <div className="text-xl font-semibold mt-0.5">{mockLoad.id}</div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold border border-orange/40 bg-orange/10 text-orange">
                ${mockLoad.rate.toLocaleString()} · ${(mockLoad.rate / mockLoad.estMiles).toFixed(2)}/mi
              </span>
            </div>
          </div>

          {/* Route timeline */}
          <div className="px-5 py-3 border-t border-border">
            <RouteTimeline pickup={mockLoad.pickup} pickupWindow={mockLoad.pickupWindow} dropoff={mockLoad.dropoff} dropoffWindow={mockLoad.deliveryWindow} />
          </div>

          {/* Shipment summary */}
          <div className="px-5 py-3 border-t border-border grid grid-cols-2 gap-2">
            <DetailRow icon={<Snowflake className="size-3.5 text-info" />} label="Commodity" value={mockLoad.commodity} />
            <DetailRow icon={<Truck className="size-3.5" />} label="Vehicle" value={mockLoad.vehicleType} />
            <DetailRow icon={<Gauge className="size-3.5" />} label="Weight" value={`${mockLoad.weight.toLocaleString()} lbs`} />
            <DetailRow label="Quantity" value={`${mockLoad.quantity} ${mockLoad.packageType}`} />
            <DetailRow label="Miles" value={`${mockLoad.estMiles} mi`} />
            <DetailRow label="Duration" value={mockLoad.estDuration} />
            <DetailRow label="CDL" value={mockLoad.cdl ? "Required" : "Not required"} />
            <DetailRow label="Hazmat" value={mockLoad.hazmat ? "Required" : "No"} />
          </div>

          {/* Dispatcher note */}
          <div className="mx-5 mb-3 rounded-lg border border-border bg-surface-2 p-3">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold flex items-center gap-1">
              <Radio className="size-3 text-teal" /> Dispatcher Note
            </div>
            <div className="text-sm mt-1 leading-snug">{mockLoad.dispatcherNote}</div>
          </div>

          {/* Actions */}
          <div className="p-4 grid grid-cols-2 gap-2 border-t border-border">
            <Button variant="outline" className="border-destructive/40 text-destructive hover:bg-destructive/10" onClick={() => setDenyOpen(true)}>
              <X className="size-4 mr-1" /> Deny
            </Button>
            <Button className="bg-teal text-teal-foreground hover:bg-teal/90 shadow-[var(--shadow-md)]" onClick={accept}>
              <Check className="size-4 mr-1" /> Accept Load
            </Button>
          </div>
        </PhoneFrame>

        {/* Deny modal */}
        <Dialog open={denyOpen} onOpenChange={setDenyOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2"><AlertOctagon className="size-4 text-destructive" /> Deny Load {mockLoad.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">Select a reason — dispatch will be notified immediately.</div>
              <div className="grid grid-cols-2 gap-2">
                {denyReasons.map((r) => (
                  <button key={r} onClick={() => setDenyReason(r)}
                    className={cn(
                      "text-left text-xs px-3 py-2 rounded-md border transition",
                      denyReason === r ? "border-teal bg-teal/10 text-teal" : "border-border hover:bg-muted",
                    )}>
                    {r}
                  </button>
                ))}
              </div>
              <Textarea placeholder="Additional context (optional)" value={denyNote} onChange={(e) => setDenyNote(e.target.value)} rows={3} className="resize-none" />
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setDenyOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={() => { setDenyOpen(false); pushSync("status", `Denied: ${denyReason}`); }}>
                Send Denial
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // ===== NAVIGATION / OPERATIONAL =====
  return (
    <div className="min-h-[calc(100vh-4rem)] py-6 px-4"
      style={{
        background:
          "radial-gradient(ellipse at 0% 0%, color-mix(in oklab, var(--teal) 12%, transparent), transparent 60%), radial-gradient(ellipse at 100% 100%, color-mix(in oklab, var(--orange) 10%, transparent), transparent 60%), linear-gradient(180deg, var(--surface-2), var(--background))",
      }}
    >
      <PhoneFrame>
        {/* Status bar */}
        <div className="bg-sidebar text-sidebar-foreground px-5 py-2 flex items-center justify-between text-[11px]">
          <span className="tabular-nums font-medium">9:41</span>
          <span className="font-semibold tracking-widest text-[10px]">ELITENAV · {mockLoad.id}</span>
          <span className="inline-flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-success animate-pulse" /> GPS LOCK
          </span>
        </div>

        {/* Map */}
        <div className="relative h-[340px] overflow-hidden bg-sidebar">
          <MapCanvas progress={progress} phase={phase} />

          {/* Top: phase pill + safety toggle */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <button onClick={() => setStatusOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/85 backdrop-blur border border-border text-xs font-medium shadow-[var(--shadow-sm)]">
              <span className="size-1.5 rounded-full animate-pulse" style={{ background: phaseMeta[phase].color }} />
              {phaseMeta[phase].label}
              <ChevronDown className="size-3 opacity-60" />
            </button>
            <div className="flex items-center gap-1.5">
              <MapChip onClick={() => setSafetyMode((v) => !v)} active={safetyMode}>
                {safetyMode ? <Lock className="size-3.5" /> : <ShieldCheck className="size-3.5" />}
              </MapChip>
              <MapChip><Layers className="size-3.5" /></MapChip>
              <MapChip><Compass className="size-3.5" /></MapChip>
            </div>
          </div>

          {/* Turn card */}
          {driving && (
            <motion.button
              initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              onClick={() => setTurnsOpen(true)}
              className={cn(
                "absolute left-3 right-3 rounded-2xl bg-sidebar text-sidebar-foreground border border-sidebar-border shadow-[var(--shadow-lg)] text-left",
                safetyMode ? "top-14 p-4" : "top-14 p-3",
              )}
            >
              <div className="flex items-center gap-3">
                <div className="grid place-items-center rounded-xl bg-teal text-teal-foreground"
                  style={{ width: safetyMode ? 56 : 44, height: safetyMode ? 56 : 44 }}>
                  <Icon className={safetyMode ? "size-7" : "size-5"} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={cn("font-semibold leading-tight", safetyMode ? "text-lg" : "text-sm")}>
                    {current.instruction}
                  </div>
                  <div className="text-[11px] text-sidebar-foreground/70 mt-0.5">
                    {current.street} · in {current.distance}
                  </div>
                </div>
                <ChevronUp className="size-4 opacity-60" />
              </div>
              {next && (
                <div className="mt-2 pt-2 border-t border-sidebar-border/60 text-[11px] text-sidebar-foreground/70 flex items-center justify-between">
                  <span>Then · {next.instruction}</span>
                  <span className="tabular-nums">{next.distance}</span>
                </div>
              )}
            </motion.button>
          )}

          {/* Bottom-left: speed gauge */}
          <div className="absolute bottom-3 left-3 rounded-xl bg-background/85 backdrop-blur border border-border px-3 py-2 shadow-[var(--shadow-sm)]">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Speed</div>
            <div className="flex items-baseline gap-1">
              <span className={cn("text-2xl font-bold tabular-nums", speed > 65 && "text-destructive")}>{speed}</span>
              <span className="text-[10px] text-muted-foreground">mph</span>
            </div>
            <div className="text-[9px] text-muted-foreground mt-0.5">Limit 65</div>
          </div>

          {/* Bottom-right: CoPilot button */}
          <button onClick={() => setCoPilotOpen(true)}
            className="absolute bottom-3 right-3 inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-gradient-to-br from-teal to-info text-teal-foreground shadow-[var(--shadow-lg)] border border-teal/60">
            <span className="relative inline-flex">
              <Sparkles className="size-4" />
              <span className="absolute -inset-1 rounded-full bg-teal-foreground/20 animate-ping" />
            </span>
            <span className="text-xs font-semibold tracking-wide">CoPilot</span>
          </button>

          {/* Mini-route progress */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-40">
            <div className="h-1.5 rounded-full bg-background/60 backdrop-blur border border-border overflow-hidden">
              <div className="h-full bg-gradient-to-r from-teal to-orange" style={{ width: `${progress}%` }} />
            </div>
            <div className="text-[9px] uppercase tracking-widest text-center mt-1 text-muted-foreground">{Math.round(progress)}% route complete</div>
          </div>
        </div>

        {/* ETA / Remaining strip */}
        <div className="grid grid-cols-4 divide-x divide-border border-b border-border bg-gradient-to-b from-surface-2/40 to-transparent">
          <Stat label="ETA" value={`${eta}m`} delta={driving ? "-2m" : undefined} deltaTone="success" />
          <Stat label="Remaining" value={`${remainingMi} mi`} sub={driving ? `~${Math.round(eta * 0.95)} min` : undefined} />
          <Stat label="Avg Speed" value={`${Math.max(0, Math.min(72, speed))} mph`} sub="Limit 65" />
          <Stat label="Window" value="2h 14m" tone="success" sub="On schedule" />
        </div>

        {/* Driving / Action body */}
        {driving ? (
          <div className="p-4 space-y-3">
            {/* Quick chips */}
            <div className="flex items-center gap-2 overflow-x-auto -mx-1 px-1 pb-1 scrollbar-thin">
              <Chip onClick={() => setRouteIntelOpen(true)} icon={<Activity className="size-3.5" />}>Route Intelligence</Chip>
              <Chip icon={<CloudSun className="size-3.5" />}>Weather Clear · 71°F</Chip>
              <Chip tone="warning" icon={<AlertTriangle className="size-3.5" />}>1 risk · low bridge</Chip>
              <Chip icon={<Fuel className="size-3.5" />}>312 mi range · ~$112</Chip>
              <Chip icon={<Coffee className="size-3.5" />}>Break · in 1h 42m</Chip>
            </div>

            {/* CDL safety card — promoted to premium tile */}
            <div className="relative overflow-hidden rounded-xl border border-teal/30 bg-gradient-to-br from-teal/10 via-surface-2 to-surface-2 p-3 shadow-[var(--shadow-sm)]">
              <div className="absolute -top-12 -right-12 size-32 rounded-full bg-teal/20 blur-2xl pointer-events-none" />
              <div className="relative flex items-center justify-between">
                <div className="text-[10px] uppercase tracking-widest font-semibold flex items-center gap-1.5 text-teal">
                  <ShieldCheck className="size-3.5" /> CDL Truck-Safe Routing
                </div>
                <span className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-bold bg-success/15 text-success border border-success/30">
                  Active
                </span>
              </div>
              <div className="relative grid grid-cols-2 gap-x-3 gap-y-1.5 mt-2.5 text-[11px]">
                <SafetyRow ok label={`Low bridge avoided · 13'9"`} />
                <SafetyRow ok label="Weight restrictions clear" />
                <SafetyRow ok label="Hazmat policy verified" />
                <SafetyRow label="Tight turn in 1.4 mi" tone="warning" />
              </div>
            </div>

            {/* Bottom tray actions */}
            <div className="grid grid-cols-3 gap-2">
              <TrayBtn onClick={() => setIssueOpen(true)} tone="danger" icon={<AlertTriangle className="size-4" />}>Report</TrayBtn>
              <TrayBtn icon={<Phone className="size-4" />}>Dispatch</TrayBtn>
              <TrayBtn onClick={() => setCoPilotOpen(true)} icon={<Mic className="size-4" />}>Voice</TrayBtn>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {phase === "to_pickup" ? (
                <Button className="bg-teal text-teal-foreground hover:bg-teal/90" onClick={() => advance("at_pickup", "Arrived at pickup")}>
                  <Check className="size-4 mr-1" /> Mark Arrived
                </Button>
              ) : (
                <Button className="bg-teal text-teal-foreground hover:bg-teal/90" onClick={() => advance("at_dropoff", "Arrived at drop-off")}>
                  <Check className="size-4 mr-1" /> Mark Arrived
                </Button>
              )}
              <Button variant="outline" onClick={() => setStatusOpen(true)}>
                <Activity className="size-4 mr-1" /> Change Status
              </Button>
            </div>
          </div>
        ) : (
          // Non-driving phases — show action card
          <div className="p-4 space-y-3">
            <PhaseActionCard phase={phase} onAdvance={advance} />
          </div>
        )}

        {/* Dispatch sync ticker footer */}
        <DispatchSyncTicker events={sync} />
      </PhoneFrame>

      {/* CoPilot panel */}
      <CoPilotPanel open={coPilotOpen} onClose={() => setCoPilotOpen(false)} feed={feed} eta={eta} phase={phase} />

      {/* Turn-by-turn sheet */}
      <Sheet open={turnsOpen} onOpenChange={setTurnsOpen}>
        <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto">
          <SheetHeader><SheetTitle className="flex items-center gap-2"><RouteIcon className="size-4 text-teal" /> Turn-by-Turn · {eliteManeuvers.length} steps</SheetTitle></SheetHeader>
          <div className="mt-3 space-y-2">
            {eliteManeuvers.map((m, i) => {
              const MIcon = maneuverIcon(m.type);
              const active = i === stepIdx;
              return (
                <button key={m.id} onClick={() => setStepIdx(i)}
                  className={cn(
                    "w-full text-left flex items-start gap-3 p-3 rounded-lg border transition",
                    active ? "border-teal bg-teal/10" : "border-border hover:bg-muted",
                  )}>
                  <div className={cn("grid place-items-center size-10 rounded-lg shrink-0",
                    active ? "bg-teal text-teal-foreground" : "bg-surface-2 text-foreground")}>
                    <MIcon className="size-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{m.instruction}</div>
                    <div className="text-[11px] text-muted-foreground">{m.street}</div>
                    {m.alert && (
                      <div className="mt-1 text-[11px] text-warning flex items-center gap-1">
                        <AlertTriangle className="size-3" /> {m.alert}
                      </div>
                    )}
                  </div>
                  <div className="text-right text-[11px] text-muted-foreground tabular-nums">
                    <div>{m.distance}</div>
                    <div>{m.duration}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>

      {/* Route intelligence sheet */}
      <Sheet open={routeIntelOpen} onOpenChange={setRouteIntelOpen}>
        <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto">
          <SheetHeader><SheetTitle className="flex items-center gap-2"><Activity className="size-4 text-teal" /> Route Intelligence</SheetTitle></SheetHeader>
          <RouteIntelligence />
        </SheetContent>
      </Sheet>

      {/* Status selector */}
      <Sheet open={statusOpen} onOpenChange={setStatusOpen}>
        <SheetContent side="bottom" className="max-h-[80vh]">
          <SheetHeader><SheetTitle>Driver Status</SheetTitle></SheetHeader>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {(Object.keys(phaseMeta) as Phase[]).map((p) => (
              <button key={p}
                onClick={() => { setPhase(p); setStatusOpen(false); pushSync("status", `Status → ${phaseMeta[p].label}`); }}
                className={cn(
                  "text-left px-3 py-2.5 rounded-lg border text-sm transition",
                  p === phase ? "border-teal bg-teal/10" : "border-border hover:bg-muted",
                )}>
                <span className="size-1.5 rounded-full inline-block mr-2 align-middle" style={{ background: phaseMeta[p].color }} />
                {phaseMeta[p].label}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Issue modal */}
      <Dialog open={issueOpen} onOpenChange={setIssueOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle className="flex items-center gap-2"><AlertTriangle className="size-4 text-destructive" /> Report Issue</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-2">
            {["Mechanical", "Traffic / Accident", "Weather", "Load damaged", "Receiver closed", "Safety concern"].map((r) => (
              <button key={r} className="text-left text-xs px-3 py-2 rounded-md border border-border hover:bg-muted">{r}</button>
            ))}
          </div>
          <Textarea placeholder="Describe the issue…" rows={3} />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIssueOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => { setIssueOpen(false); pushSync("delay", "Issue reported to dispatch"); }}>Send to Dispatch</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* POD capture */}
      <ProofOfDeliveryDialog
        open={podOpen}
        onOpenChange={setPodOpen}
        onSubmit={() => pushSync("pod", "POD captured · delivery complete")}
      />

    </div>
  );
}

// ===================== Sub-components =====================

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-[2.4rem] border-[10px] border-foreground/10 bg-background shadow-[var(--shadow-lg)] overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function MapCanvas({ progress, phase }: { progress: number; phase: Phase }) {
  void phase;
  // Route control points
  const pickupAt = { x: 14, y: 80 };
  const dropAt = { x: 88, y: 18 };
  const c1 = { x: 32, y: 64 };
  const c2 = { x: 64, y: 28 };
  const routeD = `M ${pickupAt.x} ${pickupAt.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${dropAt.x} ${dropAt.y}`;

  // Interpolated driver position along cubic bezier
  const t = Math.min(1, Math.max(0, progress / 100));
  const bz = (p0: number, p1: number, p2: number, p3: number, u: number) => {
    const v = 1 - u;
    return v * v * v * p0 + 3 * v * v * u * p1 + 3 * v * u * u * p2 + u * u * u * p3;
  };
  const driverX = bz(pickupAt.x, c1.x, c2.x, dropAt.x, t);
  const driverY = bz(pickupAt.y, c1.y, c2.y, dropAt.y, t);
  // Heading via derivative
  const dt = 0.01;
  const u2 = Math.min(1, t + dt);
  const hx = bz(pickupAt.x, c1.x, c2.x, dropAt.x, u2) - driverX;
  const hy = bz(pickupAt.y, c1.y, c2.y, dropAt.y, u2) - driverY;
  const heading = (Math.atan2(hy, hx) * 180) / Math.PI;

  return (
    <div className="absolute inset-0 bg-sidebar">
      {/* Base land tint */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 70%, color-mix(in oklab, var(--teal) 14%, transparent), transparent 55%), radial-gradient(ellipse at 80% 25%, color-mix(in oklab, var(--orange) 12%, transparent), transparent 55%), linear-gradient(180deg, color-mix(in oklab, var(--sidebar) 92%, white 8%), var(--sidebar))",
        }}
      />

      {/* Fine grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, white 5%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, white 5%, transparent) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Coarse grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, white 10%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, white 10%, transparent) 1px, transparent 1px)",
          backgroundSize: "112px 112px",
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="routeGrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--teal)" />
            <stop offset="65%" stopColor="var(--teal)" />
            <stop offset="100%" stopColor="var(--orange)" />
          </linearGradient>
          <radialGradient id="cometGlow" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--teal)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Water bodies */}
        <g fill="color-mix(in oklab, var(--info) 30%, var(--sidebar) 70%)" opacity="0.45">
          <path d="M -4 6 Q 22 18 18 36 Q 14 50 -4 44 Z" />
          <path d="M 70 92 Q 86 84 104 92 L 104 104 L 70 104 Z" />
        </g>
        {/* Parks */}
        <g fill="color-mix(in oklab, var(--success) 28%, var(--sidebar) 72%)" opacity="0.32">
          <path d="M 56 70 Q 68 64 74 74 Q 72 84 60 84 Q 52 80 56 70 Z" />
          <rect x="6" y="58" width="14" height="9" rx="2" />
        </g>

        {/* Highways — wide base + bright stripe */}
        <g fill="none" strokeLinecap="round">
          <path
            d="M -4 70 Q 30 64 60 60 T 104 56"
            stroke="color-mix(in oklab, white 8%, transparent)"
            strokeWidth="3.4"
          />
          <path
            d="M -4 70 Q 30 64 60 60 T 104 56"
            stroke="color-mix(in oklab, var(--orange) 60%, white 10%)"
            strokeWidth="1"
            strokeDasharray="2 2"
            opacity="0.55"
          />
          <path
            d="M 40 -4 Q 46 30 52 60 T 60 104"
            stroke="color-mix(in oklab, white 6%, transparent)"
            strokeWidth="2.4"
          />
        </g>
        {/* Streets */}
        <g
          stroke="color-mix(in oklab, white 10%, transparent)"
          strokeWidth="0.5"
          fill="none"
        >
          <path d="M 0 28 L 100 22" />
          <path d="M 0 86 L 100 78" />
          <path d="M 18 0 L 24 100" />
          <path d="M 74 0 L 80 100" />
          <path d="M 0 50 Q 50 56 100 46" />
        </g>

        {/* Route shadow / casing */}
        <path
          d={routeD}
          stroke="black"
          strokeOpacity="0.45"
          strokeWidth="4.4"
          fill="none"
          strokeLinecap="round"
        />
        {/* Traveled segment — gradient + glow */}
        <path
          d={routeD}
          stroke="url(#routeGrad)"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={`${progress} 100`}
          style={{ filter: "drop-shadow(0 0 1.5px var(--teal))" }}
        />
        {/* Traveled shimmer overlay */}
        <path
          d={routeD}
          stroke="white"
          strokeOpacity="0.35"
          strokeWidth="0.6"
          fill="none"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={`${progress} 100`}
          className="route-traveled-shimmer"
        />
        {/* Remaining — dashed flow */}
        <path
          d={routeD}
          stroke="var(--orange)"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={`0 ${progress} 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2`}
          className="route-flow"
          opacity={0.85}
        />
        {/* Comet head racing */}
        <path
          d={routeD}
          stroke="white"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
          className="route-comet"
          opacity={0.9}
        />
      </svg>

      {/* Pickup marker */}
      <Marker x={pickupAt.x} y={pickupAt.y} color="var(--teal)" label="P" />
      {/* Drop marker */}
      <Marker x={dropAt.x} y={dropAt.y} color="var(--orange)" label="D" />

      {/* Driver position */}
      <div
        className="absolute"
        style={{
          left: `${driverX}%`,
          top: `${driverY}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="relative">
          {/* Breathing rings */}
          <span className="absolute inset-0 -m-3 rounded-full bg-teal/30 ring-pulse" />
          <span className="absolute inset-0 -m-3 rounded-full bg-teal/20 ring-pulse delay-1" />
          <span className="absolute inset-0 -m-3 rounded-full bg-teal/10 ring-pulse delay-2" />
          {/* Heading cone */}
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `translate(-50%, -50%) rotate(${heading}deg)`,
            }}
          >
            <div
              className="origin-center"
              style={{
                width: 0,
                height: 0,
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderBottom: "26px solid color-mix(in oklab, var(--teal) 55%, transparent)",
                marginTop: "-30px",
                filter: "blur(2px)",
              }}
            />
          </div>
          {/* Puck */}
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="relative size-9 rounded-full bg-gradient-to-br from-teal to-info grid place-items-center text-teal-foreground border-[2.5px] border-background shadow-[var(--shadow-lg)]"
          >
            <Truck className="size-4" />
          </motion.div>
        </div>
      </div>

      {/* Traffic indicator */}
      <div className="absolute top-3 right-1/2 translate-x-1/2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/85 backdrop-blur border border-border text-[10px] font-semibold tracking-wide shadow-[var(--shadow-sm)]">
        <span className="relative flex size-1.5">
          <span className="absolute inset-0 rounded-full bg-warning animate-ping opacity-70" />
          <span className="relative rounded-full bg-warning size-1.5" />
        </span>
        Traffic · Moderate · +4 min
      </div>

      {/* Map vignette overlay */}
      <div className="absolute inset-0 map-vignette" />
    </div>
  );
}

function Marker({ x, y, color, label }: { x: number; y: number; color: string; label: string }) {
  return (
    <div className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -100%)" }}>
      <div className="size-6 rounded-full grid place-items-center text-[10px] font-bold border-2 border-background shadow-md"
        style={{ background: color, color: "white" }}>{label}</div>
      <div className="mx-auto size-1 rounded-full mt-0.5" style={{ background: color }} />
    </div>
  );
}

function MapChip({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick}
      className={cn("size-8 grid place-items-center rounded-full bg-background/85 backdrop-blur border border-border shadow-[var(--shadow-sm)]",
        active && "ring-2 ring-teal text-teal")}>
      {children}
    </button>
  );
}

function Stat({
  label,
  value,
  tone,
  sub,
  delta,
  deltaTone,
}: {
  label: string;
  value: string;
  tone?: "success" | "warning";
  sub?: string;
  delta?: string;
  deltaTone?: "success" | "warning" | "danger";
}) {
  return (
    <div className="p-3 text-center">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="flex items-baseline justify-center gap-1 mt-0.5">
        <span
          className={cn(
            "text-sm font-semibold tabular-nums",
            tone === "success" && "text-success",
            tone === "warning" && "text-warning",
          )}
        >
          {value}
        </span>
        {delta && (
          <span
            className={cn(
              "text-[9px] font-semibold tabular-nums",
              deltaTone === "success" && "text-success",
              deltaTone === "warning" && "text-warning",
              deltaTone === "danger" && "text-destructive",
            )}
          >
            {delta}
          </span>
        )}
      </div>
      {sub && <div className="text-[9px] text-muted-foreground mt-0.5">{sub}</div>}
    </div>
  );
}

function DispatchSyncTicker({ events }: { events: DispatchSyncEvent[] }) {
  const items = events.slice(0, 6);
  return (
    <div className="relative border-t border-border bg-gradient-to-b from-surface-2/70 to-surface-2/40 px-3 py-2 overflow-hidden">
      <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest">
        <div className="shrink-0 inline-flex items-center gap-1.5 text-success font-semibold">
          <span className="relative inline-flex size-2 rounded-full bg-success">
            <span className="absolute inset-0 rounded-full bg-success/60 animate-ping" />
          </span>
          Dispatch Sync
        </div>
        <div className="flex-1 min-w-0 overflow-hidden mask-fade">
          <div className="marquee-track inline-flex whitespace-nowrap gap-6 text-muted-foreground">
            {[...items, ...items].map((e, i) => (
              <span key={`${e.id}-${i}`} className="inline-flex items-center gap-1.5">
                <span
                  className="size-1 rounded-full"
                  style={{
                    background:
                      e.type === "status"
                        ? "var(--teal)"
                        : e.type === "delay"
                        ? "var(--warning)"
                        : e.type === "pod"
                        ? "var(--orange)"
                        : "var(--muted-foreground)",
                  }}
                />
                <span className="normal-case tracking-normal text-[11px]">{e.message}</span>
                <span className="opacity-60">· {e.timestamp}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Chip({ children, icon, tone, onClick }: { children: React.ReactNode; icon?: React.ReactNode; tone?: "warning"; onClick?: () => void }) {
  return (
    <button onClick={onClick}
      className={cn(
        "shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-[11px] font-medium transition",
        tone === "warning"
          ? "border-warning/40 bg-warning/10 text-warning"
          : "border-border bg-surface-2 hover:bg-muted",
      )}>
      {icon}{children}
    </button>
  );
}

function TrayBtn({ children, icon, tone, onClick }: { children: React.ReactNode; icon: React.ReactNode; tone?: "danger"; onClick?: () => void }) {
  return (
    <button onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-1 py-3 rounded-xl border bg-surface-2 hover:bg-muted transition",
        tone === "danger" && "border-destructive/40 text-destructive hover:bg-destructive/10",
      )}>
      {icon}
      <span className="text-[10px] uppercase tracking-wider font-semibold">{children}</span>
    </button>
  );
}

function SafetyRow({ label, ok, tone }: { label: string; ok?: boolean; tone?: "warning" }) {
  return (
    <div className="flex items-center gap-1.5">
      {ok ? <CheckCircle2 className="size-3.5 text-success" />
        : tone === "warning" ? <AlertTriangle className="size-3.5 text-warning" />
        : <Crosshair className="size-3.5 text-muted-foreground" />}
      <span className={cn(tone === "warning" && "text-warning")}>{label}</span>
    </div>
  );
}

function DetailRow({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-surface-2 px-2.5 py-1.5">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1">{icon}{label}</div>
      <div className="text-xs font-medium mt-0.5 truncate">{value}</div>
    </div>
  );
}

function RouteTimeline({ pickup, pickupWindow, dropoff, dropoffWindow }: { pickup: string; pickupWindow: string; dropoff: string; dropoffWindow: string }) {
  return (
    <div className="relative pl-5">
      <div className="absolute left-1.5 top-2 bottom-2 w-px bg-gradient-to-b from-teal to-orange" />
      <div className="relative">
        <div className="absolute -left-[18px] top-1 size-3 rounded-full bg-teal ring-4 ring-teal/20" />
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Pickup</div>
        <div className="text-sm font-medium leading-tight">{pickup}</div>
        <div className="text-[11px] text-muted-foreground">{pickupWindow}</div>
      </div>
      <div className="relative mt-3">
        <div className="absolute -left-[18px] top-1 size-3 rounded-full bg-orange ring-4 ring-orange/20" />
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Drop-off</div>
        <div className="text-sm font-medium leading-tight">{dropoff}</div>
        <div className="text-[11px] text-muted-foreground">{dropoffWindow}</div>
      </div>
    </div>
  );
}

function PhaseActionCard({ phase, onAdvance }: { phase: Phase; onAdvance: (p: Phase, msg?: string) => void }) {
  const map: Record<Phase, { title: string; sub: string; next: Phase; cta: string; icon: React.ReactNode }> = {
    offered:   { title: "Awaiting acceptance", sub: "Tap Accept above", next: "to_pickup", cta: "Start", icon: <Navigation className="size-4" /> },
    to_pickup: { title: "Driving", sub: "—", next: "at_pickup", cta: "Mark Arrived", icon: <Check className="size-4" /> },
    at_pickup: { title: "Arrived at pickup", sub: "Begin loading when ready", next: "loading", cta: "Begin Loading", icon: <Truck className="size-4" /> },
    loading:   { title: "Loading in progress", sub: "Confirm once loaded", next: "loaded", cta: "Mark Loaded", icon: <PackageCheck className="size-4" /> },
    loaded:    { title: "Loaded — ready to depart", sub: "Start the drop-off leg", next: "to_dropoff", cta: "Start Drop-off Route", icon: <Navigation className="size-4" /> },
    to_dropoff:{ title: "Driving", sub: "—", next: "at_dropoff", cta: "Mark Arrived", icon: <Check className="size-4" /> },
    at_dropoff:{ title: "Arrived at drop-off", sub: "Hand off and confirm delivery", next: "delivered", cta: "Mark Delivered", icon: <PackageCheck className="size-4" /> },
    delivered: { title: "Load delivered", sub: "Capture POD to complete", next: "delivered", cta: "Capture POD", icon: <Camera className="size-4" /> },
  };
  const m = map[phase];
  return (
    <div className="rounded-xl border border-border bg-gradient-to-br from-teal/10 to-transparent p-4">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Next action</div>
      <div className="text-base font-semibold mt-0.5">{m.title}</div>
      <div className="text-xs text-muted-foreground">{m.sub}</div>
      <Button className="w-full mt-3 bg-teal text-teal-foreground hover:bg-teal/90" onClick={() => onAdvance(m.next, m.title)}>
        {m.icon}<span className="ml-1.5">{m.cta}</span>
      </Button>
    </div>
  );
}

function RouteIntelligence() {
  const rows: { label: string; value: string; tone?: "success" | "warning" | "danger"; icon: React.ReactNode }[] = [
    { label: "ETA Confidence", value: "94% · High", tone: "success", icon: <Activity className="size-3.5" /> },
    { label: "Traffic", value: "Moderate · +4 min", tone: "warning", icon: <Waves className="size-3.5" /> },
    { label: "Road closures", value: "None reported", tone: "success", icon: <ShieldCheck className="size-3.5" /> },
    { label: "Route deviation", value: "On planned route", tone: "success", icon: <RouteIcon className="size-3.5" /> },
    { label: "Weather", value: "Clear · 71°F", icon: <CloudSun className="size-3.5" /> },
    { label: "Fuel estimate", value: "30.4 gal · ~$112", icon: <Fuel className="size-3.5" /> },
    { label: "Avg MPG", value: "6.8", icon: <Gauge className="size-3.5" /> },
    { label: "Break window", value: "in 1h 42m", tone: "warning", icon: <Coffee className="size-3.5" /> },
    { label: "CDL restrictions", value: "Verified · truck-safe", tone: "success", icon: <Truck className="size-3.5" /> },
    { label: "Hazmat policy", value: "Not required", icon: <ShieldCheck className="size-3.5" /> },
    { label: "Low bridge", value: "13'9\" — verified clear", tone: "warning", icon: <AlertTriangle className="size-3.5" /> },
    { label: "Weight restriction", value: "Within limits", tone: "success", icon: <ParkingSquare className="size-3.5" /> },
  ];
  return (
    <div className="mt-3 grid grid-cols-2 gap-2">
      {rows.map((r) => (
        <div key={r.label} className="rounded-lg border border-border bg-surface-2 p-2.5">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1">{r.icon}{r.label}</div>
          <div className={cn("text-xs font-medium mt-0.5",
            r.tone === "success" && "text-success", r.tone === "warning" && "text-warning", r.tone === "danger" && "text-destructive")}>
            {r.value}
          </div>
        </div>
      ))}
    </div>
  );
}

function CoPilotPanel({ open, onClose, feed, eta, phase }: { open: boolean; onClose: () => void; feed: CoPilotMessage[]; eta: number; phase: Phase }) {
  const [listening, setListening] = useState(false);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 24, stiffness: 240 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl border border-teal/30 bg-sidebar text-sidebar-foreground shadow-[var(--shadow-lg)] overflow-hidden"
          >
            {/* Header */}
            <div
              className="px-5 pt-4 pb-3 border-b border-sidebar-border copilot-aurora relative overflow-hidden"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, color-mix(in oklab, var(--teal) 28%, transparent), color-mix(in oklab, var(--info) 22%, transparent), color-mix(in oklab, var(--orange) 14%, transparent), color-mix(in oklab, var(--teal) 24%, transparent))",
              }}
            >
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative grid place-items-center size-9 rounded-full bg-gradient-to-br from-teal to-info text-teal-foreground shadow-[var(--shadow-md)]">
                    <Sparkles className="size-4" />
                    <span className="absolute inset-0 rounded-full bg-teal/40 animate-ping" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold tracking-wide">Anderoute CoPilot</div>
                    <div className="text-[10px] uppercase tracking-widest text-sidebar-foreground/70 flex items-center gap-1">
                      <span className="size-1 rounded-full bg-success animate-pulse" />
                      AI Driving Assistant · Online
                    </div>
                  </div>
                </div>
                <button onClick={onClose} className="size-8 grid place-items-center rounded-full hover:bg-sidebar-accent/60">
                  <X className="size-4" />
                </button>
              </div>
              {/* Wave */}
              <div className="relative mt-3 flex items-center justify-center gap-[3px] h-12">
                {Array.from({ length: 36 }).map((_, i) => {
                  const center = 18;
                  const dist = Math.abs(i - center);
                  const baseHeight = listening
                    ? Math.max(6, 36 - dist * 1.6 + Math.random() * 14)
                    : Math.max(4, 14 - dist * 0.5);
                  return (
                    <motion.span
                      key={i}
                      className={cn(
                        "w-[3px] rounded-full origin-center",
                        listening ? "bg-teal" : "bg-sidebar-foreground/35",
                      )}
                      style={{ height: baseHeight }}
                      animate={
                        listening
                          ? { scaleY: [0.4, 1, 0.6, 1.1, 0.5] }
                          : { scaleY: [0.4, 0.8, 0.4] }
                      }
                      transition={{
                        duration: listening ? 0.9 : 2.4,
                        repeat: Infinity,
                        delay: i * 0.03,
                        ease: "easeInOut",
                      }}
                    />
                  );
                })}
              </div>
              <div className="relative mt-1.5 text-[11px] text-sidebar-foreground/80 text-center inline-flex w-full items-center justify-center gap-1.5">
                {listening ? (
                  <>
                    <span className="size-1.5 rounded-full bg-destructive animate-pulse" />
                    Listening… say a command
                  </>
                ) : (
                  <>Tap the mic or pick a suggested command</>
                )}
              </div>
            </div>

            {/* Intelligence summary */}
            <div className="px-5 py-3 grid grid-cols-3 gap-2 border-b border-sidebar-border">
              <Mini label="ETA" value={`${eta}m`} />
              <Mini label="Status" value={phaseMeta[phase].label} />
              <Mini label="Window" value="On time" tone="success" />
            </div>

            {/* Feed */}
            <div className="px-5 py-3 max-h-56 overflow-y-auto space-y-2">
              {feed.slice(0, 6).map((m) => (
                <div key={m.id} className={cn(
                  "rounded-xl px-3 py-2 text-sm border",
                  m.role === "copilot" && "bg-teal/10 border-teal/30",
                  m.role === "dispatch" && "bg-orange/10 border-orange/30",
                  m.tone === "warning" && "border-warning/40 bg-warning/10",
                  m.tone === "success" && "border-success/40 bg-success/10",
                  m.tone === "danger" && "border-destructive/40 bg-destructive/10",
                )}>
                  <div className="text-[10px] uppercase tracking-widest opacity-60 mb-0.5">
                    {m.role === "copilot" ? "CoPilot" : m.role === "dispatch" ? "Dispatch" : "Driver"} · {m.timestamp}
                  </div>
                  {m.text}
                </div>
              ))}
            </div>

            {/* Commands */}
            <div className="px-5 py-3 border-t border-sidebar-border">
              <div className="text-[10px] uppercase tracking-widest text-sidebar-foreground/60 mb-2">Suggested commands</div>
              <div className="flex flex-wrap gap-1.5">
                {suggestedCommands.map((c) => (
                  <button key={c.id}
                    className="text-[11px] px-2.5 py-1.5 rounded-full border border-sidebar-border bg-sidebar-accent/40 hover:bg-sidebar-accent transition">
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action bar */}
            <div className="px-5 py-3 border-t border-sidebar-border flex items-center gap-2">
              <button onClick={() => setListening((v) => !v)}
                className={cn(
                  "flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full font-semibold transition",
                  listening ? "bg-destructive text-destructive-foreground" : "bg-teal text-teal-foreground hover:bg-teal/90",
                )}>
                <Mic className="size-4" />
                {listening ? "Stop" : "Hold to speak"}
              </button>
              <button className="size-12 grid place-items-center rounded-full bg-sidebar-accent hover:bg-sidebar-accent/70">
                <Volume2 className="size-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Mini({ label, value, tone }: { label: string; value: string; tone?: "success" }) {
  return (
    <div className="rounded-lg border border-sidebar-border bg-sidebar-accent/40 px-2 py-1.5 text-center">
      <div className="text-[9px] uppercase tracking-widest text-sidebar-foreground/60">{label}</div>
      <div className={cn("text-xs font-semibold mt-0.5", tone === "success" && "text-success")}>{value}</div>
    </div>
  );
}
