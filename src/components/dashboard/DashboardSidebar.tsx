import {
  BarChart3,
  Bell,
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
  { label: "Notifications", icon: Bell },
  { label: "Settings", icon: Settings },
  { label: "Help Center", icon: HelpCircle },
];

export function DashboardSidebar({ active = "Dashboard" }: { active?: string }) {
  return (
    <aside className="hidden min-h-[860px] w-72 flex-col bg-slate-950 text-white lg:flex">
      <div className="flex items-center gap-3 px-6 py-7">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-teal-500 to-orange-500">
          <RouteIcon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-lg font-bold">AnderRoute</p>
          <p className="text-xs text-slate-400">Logistics Command</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-4">
        {NAV.map(({ label, icon: Icon }) => {
          const isActive = label === active;
          return (
            <button
              key={label}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      <div className="m-4 rounded-2xl bg-gradient-to-br from-teal-600/30 to-orange-500/30 p-4">
        <p className="text-xs text-slate-300">Dispatcher</p>
        <p className="text-sm font-semibold">Anderoute Demo</p>
      </div>
    </aside>
  );
}
