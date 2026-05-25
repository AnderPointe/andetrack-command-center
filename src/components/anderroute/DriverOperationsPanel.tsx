import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  MessageSquare,
  Phone,
  RefreshCcw,
  Route,
} from "lucide-react";

export default function DriverOperationsPanel() {
  const actions = [
    {
      label: "Call Driver",
      description: "Start direct driver call",
      icon: Phone,
      style: "from-teal-500 to-teal-700",
    },
    {
      label: "Message Driver",
      description: "Send dispatch message",
      icon: MessageSquare,
      style: "from-slate-600 to-slate-800",
    },
    {
      label: "Reassign Load",
      description: "Move shipment to another driver",
      icon: RefreshCcw,
      style: "from-orange-500 to-orange-700",
    },
    {
      label: "Update ETA",
      description: "Adjust customer arrival window",
      icon: Clock3,
      style: "from-teal-500 to-orange-500",
    },
    {
      label: "Report Issue",
      description: "Create incident or delay note",
      icon: AlertTriangle,
      style: "from-red-500 to-red-700",
    },
    {
      label: "Mark Delivered",
      description: "Complete shipment workflow",
      icon: CheckCircle2,
      style: "from-emerald-500 to-teal-700",
    },
  ];

  return (
    <aside className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-5 text-white shadow-2xl backdrop-blur-xl">
      <div className="mb-5 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-teal-500 to-orange-500">
          <Route className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
            Dispatch Control
          </p>
          <h2 className="text-lg font-bold">Operations Panel</h2>
        </div>
      </div>

      <div className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              className="group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left transition hover:scale-[1.01] hover:border-orange-400/50 hover:bg-white/[0.07]"
            >
              <div
                className={`grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${action.style} shadow-lg`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-white">{action.label}</p>
                <p className="text-xs text-slate-400">{action.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
