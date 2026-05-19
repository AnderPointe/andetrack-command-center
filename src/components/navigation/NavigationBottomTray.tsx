import { Mic, Phone, AlertTriangle, ListOrdered, ClipboardCheck, Lock } from "lucide-react";

interface Props {
  onCoPilot: () => void;
  onDispatch: () => void;
  onIssue: () => void;
  onSteps: () => void;
  onStatus: () => void;
  reducedActions?: boolean;
}

export function NavigationBottomTray({ onCoPilot, onDispatch, onIssue, onSteps, onStatus, reducedActions }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#0e1820]/90 to-[#0a1218]/95 p-2 backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]">
      <div className="grid grid-cols-5 gap-1.5">
        <TrayButton onClick={onCoPilot} icon={<Mic className="h-4 w-4" />} label="CoPilot" accent />
        <TrayButton onClick={onDispatch} icon={<Phone className="h-4 w-4" />} label="Dispatch" />
        <TrayButton onClick={onIssue} icon={<AlertTriangle className="h-4 w-4" />} label="Report" tone="warn" />
        {!reducedActions && <TrayButton onClick={onSteps} icon={<ListOrdered className="h-4 w-4" />} label="Steps" />}
        {!reducedActions && <TrayButton onClick={onStatus} icon={<ClipboardCheck className="h-4 w-4" />} label="Status" />}
        {reducedActions && (
          <>
            <LockedTile />
            <LockedTile />
          </>
        )}
      </div>
    </div>
  );
}

function LockedTile() {
  return (
    <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-white/10 bg-white/[0.015] p-2 text-[10px] uppercase tracking-wider text-slate-500">
      <Lock className="h-3 w-3" />
      Parked only
    </div>
  );
}

function TrayButton({
  onClick,
  icon,
  label,
  accent,
  tone,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  accent?: boolean;
  tone?: "warn";
}) {
  const base =
    "flex flex-col items-center gap-1 rounded-xl border px-2 py-2.5 text-[10px] font-medium uppercase tracking-wider transition active:scale-95";
  const cls = accent
    ? "border-teal-400/40 bg-gradient-to-b from-teal-500/15 to-teal-500/[0.06] text-teal-100 hover:from-teal-500/20 shadow-[inset_0_1px_0_rgba(94,234,212,0.2)]"
    : tone === "warn"
    ? "border-orange-500/30 bg-orange-500/[0.06] text-orange-200 hover:bg-orange-500/10"
    : "border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.06]";
  return (
    <button onClick={onClick} className={`${base} ${cls}`}>
      {icon}
      {label}
    </button>
  );
}
