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
    <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 bg-black/40 backdrop-blur-xl lg:flex">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#14b8a6] to-[#f97316] shadow-lg shadow-[#14b8a6]/40 ring-1 ring-white/10">
          <RouteIcon className="h-5 w-5 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-base font-bold text-white">AnderRoute</p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
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
              className={`group relative flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-[#14b8a6]/15 via-[#14b8a6]/5 to-transparent text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ring-1 ring-[#14b8a6]/30"
                  : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-gradient-to-b from-[#14b8a6] to-[#f97316] shadow-[0_0_12px_rgba(20,184,166,0.6)]" />
              )}
              <Icon className={`h-4 w-4 transition ${isActive ? "text-[#2dd4bf]" : ""}`} />
              <span className="font-medium">{label}</span>
            </button>
          );
        })}
      </nav>

      <div className="m-4 rounded-2xl border border-white/10 bg-gradient-to-br from-[#14b8a6]/15 via-[#0f172a] to-[#f97316]/10 p-4 shadow-xl shadow-black/40">
        <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
          Dispatcher
        </p>
        <p className="mt-1 text-sm font-semibold text-white">AnderRoute Demo</p>
        <p className="mt-0.5 text-xs text-slate-400">Tier 3 · Live Ops</p>
      </div>
    </aside>
  );
}
