import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Radio,
  Inbox,
  Users,
  Truck,
  Package,
  Route as RouteIcon,
  Map,
  Fuel,
  Bell,
  BarChart3,
  Settings,
  Smartphone,
  Navigation,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { group: "Operations", items: [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/dispatch", label: "Live Dispatch", icon: Radio },
    { to: "/loads", label: "Load Requests", icon: Inbox },
    { to: "/map", label: "Map View", icon: Map },
  ]},
  { group: "Fleet", items: [
    { to: "/drivers", label: "Drivers", icon: Users },
    { to: "/vehicles", label: "Vehicles", icon: Truck },
    { to: "/shipments", label: "Shipments", icon: Package },
    { to: "/routes", label: "Routes", icon: RouteIcon },
    { to: "/fuel", label: "Fuel & Mileage", icon: Fuel },
  ]},
  { group: "Insights", items: [
    { to: "/alerts", label: "Alerts", icon: Bell },
    { to: "/analytics", label: "Reports", icon: BarChart3 },
  ]},
  { group: "Driver App", items: [
    { to: "/driver", label: "Load Offer (Mobile)", icon: Smartphone },
    { to: "/driver/navigation", label: "Navigation (Mobile)", icon: Navigation },
  ]},
  { group: "System", items: [
    { to: "/settings", label: "Settings", icon: Settings },
  ]},
] as const;

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden md:flex h-screen w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="flex items-center gap-2 px-5 h-16 border-b border-sidebar-border">
        <div className="size-8 rounded-lg bg-gradient-to-br from-teal to-orange grid place-items-center font-bold text-sidebar-primary-foreground">
          A
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-semibold tracking-tight">Anderoute</span>
          <span className="text-[10px] uppercase tracking-widest text-sidebar-foreground/60">
            Fleet Command
          </span>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {nav.map((group) => (
          <div key={group.group}>
            <div className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/50">
              {group.group}
            </div>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active =
                  item.to === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.to);
                const Icon = item.icon;
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                        active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                      )}
                    >
                      <Icon className="size-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                      {active && (
                        <span className="ml-auto size-1.5 rounded-full bg-teal" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="border-t border-sidebar-border px-4 py-3 text-xs text-sidebar-foreground/60">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-success animate-pulse" />
          All systems operational
        </div>
      </div>
    </aside>
  );
}
