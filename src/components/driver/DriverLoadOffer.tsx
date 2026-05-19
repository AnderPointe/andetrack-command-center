import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2, XCircle, Truck, Snowflake, Package, Weight, Hash, Calendar, MapPin,
  ShieldAlert, FlaskConical, AlertTriangle, ClipboardList,
} from "lucide-react";
import type { Load } from "@/types/elitenav";
import { denyReasons } from "@/data/elitenav/mockNavigationEvents";

interface Props {
  load: Load;
  onAccept: () => void;
  onDeny: (reason: string) => void;
}

export function DriverLoadOffer({ load, onAccept, onDeny }: Props) {
  const [showDeny, setShowDeny] = useState(false);
  const [selected, setSelected] = useState<string>(denyReasons[0]);

  return (
    <div className="mx-auto max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0e171f] to-[#0a1218] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
      >
        {/* Header */}
        <div className="relative border-b border-white/5 px-6 py-5">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-teal-500/10 to-orange-500/5" />
          <div className="relative flex items-start justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-teal-300/80">New Load Offer</div>
              <div className="mt-1 text-2xl font-semibold tracking-tight text-white">{load.id}</div>
              <div className="mt-1 text-xs text-slate-400">{load.customer} · ${load.rate.toLocaleString()}</div>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              {load.requiresCDL && <Badge tone="info" icon={<ShieldAlert className="h-3 w-3" />}>CDL Required</Badge>}
              {load.requiresHazmat && <Badge tone="warn" icon={<FlaskConical className="h-3 w-3" />}>HAZMAT</Badge>}
            </div>
          </div>
        </div>

        {/* Route */}
        <div className="px-6 py-5">
          <div className="relative space-y-4">
            <RoutePoint tone="teal" label="Pickup" address={load.pickup} window={load.pickupWindow} />
            <div className="ml-[11px] h-6 w-px border-l border-dashed border-white/20" />
            <RoutePoint tone="orange" label="Drop-off" address={load.dropoff} window={load.deliveryWindow} />
          </div>

          {/* Specs grid */}
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
            <Spec icon={<Package className="h-3.5 w-3.5" />} label="Commodity" value={load.commodity} />
            <Spec icon={<Snowflake className="h-3.5 w-3.5" />} label="Package" value={load.packageType} />
            <Spec icon={<Weight className="h-3.5 w-3.5" />} label="Weight" value={`${load.weightLbs.toLocaleString()} lb`} />
            <Spec icon={<Hash className="h-3.5 w-3.5" />} label="Quantity" value={`${load.quantity} units`} />
            <Spec icon={<Truck className="h-3.5 w-3.5" />} label="Vehicle" value={load.requiredVehicle} />
            <Spec icon={<Calendar className="h-3.5 w-3.5" />} label="Distance" value={`${load.estimatedMiles} mi · ${load.estimatedDuration}`} />
          </div>

          {/* Dispatcher note */}
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <div className="mb-1 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-slate-500">
              <ClipboardList className="h-3 w-3" /> Dispatcher Note
            </div>
            <p className="text-sm leading-relaxed text-slate-200">{load.dispatcherNote}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 border-t border-white/5 bg-black/30 p-4">
          <button
            onClick={() => setShowDeny(true)}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-red-500/40 hover:text-red-300"
          >
            <XCircle className="h-4 w-4" /> Deny Load
          </button>
          <button
            onClick={onAccept}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 px-4 py-3 text-sm font-semibold text-slate-950 shadow-[0_10px_30px_-10px_rgba(45,212,191,0.7)] transition hover:from-teal-400 hover:to-teal-300"
          >
            <CheckCircle2 className="h-4 w-4" /> Accept Load
          </button>
        </div>
      </motion.div>

      {/* Driver safety strip */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-slate-400 sm:grid-cols-4">
        <SafetyChip>Driver consent active</SafetyChip>
        <SafetyChip>Location permission granted</SafetyChip>
        <SafetyChip>No hidden tracking</SafetyChip>
        <SafetyChip>Hands-free ready</SafetyChip>
      </div>

      {/* Deny modal */}
      {showDeny && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0d141a] p-5 shadow-2xl"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-300" />
              <div className="text-base font-semibold text-white">Deny load {load.id}</div>
            </div>
            <p className="mt-1 text-xs text-slate-400">Choose a reason — dispatch will be notified instantly.</p>
            <div className="mt-4 space-y-1.5">
              {denyReasons.map((r) => (
                <label
                  key={r}
                  className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition ${
                    selected === r ? "border-teal-400/40 bg-teal-500/10 text-teal-100" : "border-white/10 text-slate-200 hover:bg-white/[0.03]"
                  }`}
                >
                  <input type="radio" className="hidden" checked={selected === r} onChange={() => setSelected(r)} />
                  <span className={`h-3.5 w-3.5 rounded-full border ${selected === r ? "border-teal-300 bg-teal-300" : "border-white/30"}`} />
                  {r}
                </label>
              ))}
            </div>
            <div className="mt-5 flex gap-2">
              <button onClick={() => setShowDeny(false)} className="flex-1 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-200 hover:bg-white/5">
                Cancel
              </button>
              <button
                onClick={() => { onDeny(selected); setShowDeny(false); }}
                className="flex-1 rounded-xl bg-red-500/90 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-500"
              >
                Confirm Deny
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function Spec({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.015] p-3">
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-slate-500">{icon} {label}</div>
      <div className="mt-1 text-sm font-medium text-slate-100">{value}</div>
    </div>
  );
}

function RoutePoint({ tone, label, address, window: w }: { tone: "teal" | "orange"; label: string; address: string; window: string }) {
  const dot = tone === "teal" ? "bg-teal-400 shadow-[0_0_14px_rgba(45,212,191,0.7)]" : "bg-orange-400 shadow-[0_0_14px_rgba(251,146,60,0.7)]";
  return (
    <div className="flex items-start gap-3">
      <div className={`mt-1 h-3 w-3 shrink-0 rounded-full ${dot}`} />
      <div className="min-w-0 flex-1">
        <div className="text-[10px] uppercase tracking-widest text-slate-500">{label}</div>
        <div className="text-sm font-medium text-white">
          <MapPin className="mr-1 inline h-3 w-3 text-slate-500" />
          {address}
        </div>
        <div className="mt-0.5 text-[11px] text-slate-400">{w}</div>
      </div>
    </div>
  );
}

function Badge({ tone, icon, children }: { tone: "info" | "warn"; icon: React.ReactNode; children: React.ReactNode }) {
  const cls = tone === "info"
    ? "border-teal-400/30 bg-teal-500/10 text-teal-200"
    : "border-orange-400/30 bg-orange-500/10 text-orange-200";
  return <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider ${cls}`}>{icon}{children}</span>;
}

function SafetyChip({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-white/5 bg-white/[0.02] px-2.5 py-1 text-center">{children}</span>;
}
