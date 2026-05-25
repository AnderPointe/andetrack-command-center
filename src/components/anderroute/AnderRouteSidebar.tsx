import {
  BarChart3,
  HelpCircle,
  LayoutDashboard,
  MapPinned,
  Package,
  Receipt,
  Settings,
  Truck,
  Users,
  Route as RouteIcon,
} from "lucide-react";
import type { ComponentType } from "react";

type NavItem = { label: string; icon: ComponentType<{ className?: string }> };

const NAV: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Live Map", icon: MapPinned },
  { label: "Drivers", icon: Truck },
  { label: "Shipments", icon: Package },
  { label: "Customers", icon: Users },
  { label: "Analytics", icon: BarChart3 },
  { label: "Billing", icon: Receipt },
  { label: "Settings", icon: Settings },
  { label: "Help Center", icon: HelpCircle },
];

interface Props {
  active?: string;
}

export function AnderRouteSidebar({ active = "Drivers" }: Props) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-white/5 bg-slate-950/80 backdrop-blur lg:flex">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-teal-400 to-orange-500 shadow-lg shadow-teal-500/30">
          <RouteIcon className="h-5 w-5 text-slate-950" strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-base font-bold text-white">AnderRoute</p>
          <p className="text-[11px] uppercase tracking-wider text-slate-500">
            Dispatch Command
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {NAV.map(({ label, icon: Icon }) => {
          const isActive = label === active;
          return (
            <button
              key={label}
              className={`group relative flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm transition ${
                isActive
                  ? "bg-gradient-to-r from-teal-500/15 to-transparent text-white ring-1 ring-teal-400/30"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-teal-400" />
              )}
              <Icon className="h-4 w-4" />
              <span className="font-medium">{label}</span>
            </button>
          );
        })}
      </nav>

      <div className="m-4 rounded-2xl border border-white/5 bg-gradient-to-br from-teal-600/20 via-slate-900 to-orange-500/20 p-4">
        <p className="text-[11px] uppercase tracking-wider text-slate-400">
          Dispatcher
        </p>
        <p className="mt-1 text-sm font-semibold text-white">
          AnderRoute Demo
        </p>
        <p className="mt-0.5 text-xs text-slate-400">Tier 3 — Live Ops</p>
      </div>
    </aside>
  );
}
