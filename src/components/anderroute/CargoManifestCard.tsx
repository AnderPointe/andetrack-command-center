import { AlertTriangle, PackageCheck, ShieldCheck, Thermometer } from "lucide-react";

export default function CargoManifestCard() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-5 text-white shadow-2xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
            Cargo Details
          </p>
          <h2 className="mt-1 text-xl font-bold">Cargo Manifest</h2>
        </div>

        <div className="rounded-full bg-orange-500/15 px-3 py-1 text-sm font-semibold text-orange-300">
          High Priority
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <ManifestRow label="Cargo Type" value="Priority Medical & Mixed Freight" />
        <ManifestRow label="Item Count" value="48 pieces" />
        <ManifestRow label="Weight" value="7,260 kg" />
        <ManifestRow label="Volume" value="382.45 cu ft" />
        <ManifestRow label="Temperature" value="Controlled / Normal" />
        <ManifestRow label="Hazmat" value="No" />
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <p className="text-xs uppercase tracking-wide text-slate-500">
          Handling Notes
        </p>
        <p className="mt-2 text-sm text-slate-300">
          Priority route-sensitive cargo. Driver must confirm load securement,
          maintain delivery window, and capture proof of delivery upon arrival.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Badge icon={<PackageCheck />} label="Route Sensitive" />
        <Badge icon={<Thermometer />} label="Temp Monitored" />
        <Badge icon={<ShieldCheck />} label="Signature Required" />
        <Badge icon={<AlertTriangle />} label="Priority Handling" />
      </div>
    </section>
  );
}

function ManifestRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-xs font-semibold text-slate-300">
      <span className="text-orange-300 [&>svg]:h-3.5 [&>svg]:w-3.5">
        {icon}
      </span>
      {label}
    </span>
  );
}
