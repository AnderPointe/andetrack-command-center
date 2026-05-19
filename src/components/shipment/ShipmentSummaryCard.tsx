import type { Shipment } from "@/types/elitenav";
import { Package, Snowflake, Weight, Hash, MapPin, Calendar, ClipboardList, Tag } from "lucide-react";
import { STATUS_META } from "@/utils/elitenav";

export function ShipmentSummaryCard({ shipment }: { shipment: Shipment }) {
  const meta = STATUS_META[shipment.status];
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d141a]/85 p-4 backdrop-blur-xl">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-slate-500">Shipment</div>
          <div className="text-base font-semibold text-white">{shipment.id}</div>
          <div className="text-[11px] text-slate-400">Load {shipment.loadId} · {shipment.customer}</div>
        </div>
        <span className="rounded-full border border-teal-400/30 bg-teal-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-teal-200">
          {meta.label}
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-1.5 text-[11px]">
        <Row icon={<Package className="h-3 w-3" />} label="Commodity" value={shipment.commodity} />
        <Row icon={<Snowflake className="h-3 w-3" />} label="Package" value={shipment.packageType} />
        <Row icon={<Weight className="h-3 w-3" />} label="Weight" value={`${shipment.weightLbs.toLocaleString()} lb`} />
        <Row icon={<Hash className="h-3 w-3" />} label="Qty" value={`${shipment.quantity}`} />
        <Row icon={<MapPin className="h-3 w-3" />} label="Pickup" value={shipment.pickupAddress} full />
        <Row icon={<Tag className="h-3 w-3" />} label="Drop-off" value={shipment.dropoffAddress} full />
        <Row icon={<Calendar className="h-3 w-3" />} label="Window" value={shipment.deliveryWindow} full />
      </div>
      <div className="mt-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
        <div className="mb-1 flex items-center gap-1 text-[10px] uppercase tracking-widest text-slate-500">
          <ClipboardList className="h-3 w-3" /> Special handling
        </div>
        <p className="text-[12px] leading-relaxed text-slate-200">{shipment.specialHandling}</p>
      </div>
    </div>
  );
}

function Row({ icon, label, value, full }: { icon: React.ReactNode; label: string; value: string; full?: boolean }) {
  return (
    <div className={`rounded-lg border border-white/5 bg-white/[0.015] p-2 ${full ? "col-span-2" : ""}`}>
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-slate-500">{icon}{label}</div>
      <div className="mt-0.5 truncate text-[12px] text-slate-100">{value}</div>
    </div>
  );
}
