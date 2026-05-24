import {
  LayoutDashboard,
  ClipboardList,
  Map as MapIcon,
  Package,
  Users,
  Truck,
  Building2,
  Warehouse,
  BarChart3,
  Settings,
  Route,
} from "lucide-react";

const NAV = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Route, label: "Dispatch Board", active: true },
  { icon: MapIcon, label: "Live Map" },
  { icon: Package, label: "Loads" },
  { icon: Truck, label: "Drivers" },
  { icon: ClipboardList, label: "Fleet" },
  { icon: Users, label: "Customers" },
  { icon: Warehouse, label: "Warehouses" },
  { icon: BarChart3, label: "Reports" },
];

export function DispatchSidebarNav() {
  return (
    <nav className="flex h-full flex-col items-center gap-1.5 bg-slate-900 py-3">
      <div className="mb-3 grid size-10 place-items-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 shadow-lg shadow-teal-500/30">
        <Building2 className="size-5 text-slate-900" strokeWidth={2.5} />
      </div>
      {NAV.map(({ icon: Icon, label, active }) => (
        <button
          key={label}
          title={label}
          className={`group relative grid size-11 place-items-center rounded-xl transition ${
            active
              ? "bg-teal-500/15 text-teal-300 ring-1 ring-teal-400/40"
              : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
          }`}
        >
          {active && (
            <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-r-full bg-teal-400" />
          )}
          <Icon className="size-[18px]" />
          <span className="pointer-events-none absolute left-full z-50 ml-3 whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-[11px] font-medium text-slate-100 opacity-0 shadow-lg group-hover:opacity-100">
            {label}
          </span>
        </button>
      ))}
      <button
        title="Settings"
        className="mt-auto grid size-11 place-items-center rounded-xl text-slate-400 hover:bg-slate-800 hover:text-slate-100"
      >
        <Settings className="size-[18px]" />
      </button>
    </nav>
  );
}
