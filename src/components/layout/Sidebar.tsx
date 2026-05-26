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
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { alerts, drivers } from "@/data/mock";

const nav = [
  { group: "Operations", items: [
    { to: "/", label: "Command Center", icon: LayoutDashboard },
    { to: "/dispatch", label: "Live Dispatch", icon: Radio },
    { to: "/loads", label: "Load Board", icon: Inbox },
    { to: "/map", label: "Live Map", icon: Map },
  ]},
  { group: "Fleet", items: [
    { to: "/drivers", label: "Drivers", icon: Users },
    { to: "/vehicles", label: "Vehicles", icon: Truck },
    { to: "/shipments", label: "Shipments", icon: Package },
    { to: "/routes", label: "Routes", icon: RouteIcon },
    { to: "/fuel", label: "Fuel & Mileage", icon: Fuel },
  ]},
  { group: "Insights", items: [
    { to: "/alerts", label: "Exceptions", icon: Bell, badgeKey: "alerts" as const },
    { to: "/analytics", label: "Analytics", icon: BarChart3 },
  ]},
  { group: "Driver App", items: [
    { to: "/driver", label: "Load Offer", icon: Smartphone },
    { to: "/driver/navigation", label: "In-Trip Nav", icon: Navigation },
  ]},
  { group: "System", items: [
    { to: "/settings", label: "Settings", icon: Settings },
  ]},
] as const;

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const openAlerts = alerts.filter((a) => !a.resolved).length;
  const active = drivers.filter((d) => d.status !== "offduty").length;

  return (
    <aside className="hidden md:flex h-screen w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-sidebar-border">
        <div className="relative size-9 rounded-xl bg-gradient-to-br from-teal to-orange grid place-items-center font-bold text-white shadow-[0_4px_14px_-2px_color-mix(in_oklab,var(--teal)_45%,transparent)]">
          A
          <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-success ring-2 ring-sidebar" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-semibold tracking-tight text-[15px]">Anderoute</span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-sidebar-foreground/55">
            Fleet Command
          </span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {nav.map((group) => (
          <div key={group.group}>
            <div className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-sidebar-foreground/45">
              {group.group}
            </div>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive =
                  item.to === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.to);
                const Icon = item.icon;
                const badge =
                  "badgeKey" in item && item.badgeKey === "alerts" ? openAlerts : 0;
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={cn(
                        "group relative flex items-center gap-3 pl-4 pr-2.5 py-2 rounded-lg text-[13px] transition-all",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--teal)_22%,transparent)]"
                          : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                      )}
                    >
                      <span
                        className={cn(
                          "absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full transition-all",
                          isActive ? "bg-teal opacity-100" : "opacity-0",
                        )}
                      />
                      <Icon className={cn("size-4 shrink-0 transition-colors", isActive && "text-teal")} />
                      <span className="truncate flex-1">{item.label}</span>
                      {badge > 0 && (
                        <span className="text-[10px] font-semibold rounded-full bg-orange/20 text-orange px-1.5 py-0.5 tabular-nums">
                          {badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3 space-y-2">
        <div className="rounded-lg bg-sidebar-accent/60 border border-sidebar-border/60 p-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="inline-flex items-center gap-1.5 text-sidebar-foreground/80">
              <Activity className="size-3 text-teal" />
              Fleet active
            </span>
            <span className="font-semibold tabular-nums">{active}/{drivers.length}</span>
          </div>
          <div className="mt-2 h-1 rounded-full bg-sidebar-border/60 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal to-orange"
              style={{ width: `${(active / drivers.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 px-1 text-[11px] text-sidebar-foreground/55">
          <span className="size-1.5 rounded-full bg-success animate-pulse" />
          All systems operational · v2.4
        </div>
      </div>
    </aside>
  );
}
