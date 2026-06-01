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
  MessageCircle,
  Palette,
  ShieldCheck,
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
    { to: "/dashboard/messages", label: "Messages", icon: MessageCircle },
    { to: "/alerts", label: "Exceptions", icon: Bell, badgeKey: "alerts" as const },
    { to: "/analytics", label: "Analytics", icon: BarChart3 },
  ]},
  { group: "Driver App", items: [
    { to: "/driver", label: "Load Offer", icon: Smartphone },
    { to: "/driver/navigation", label: "In-Trip Nav", icon: Navigation },
  ]},
  { group: "Executive", items: [
    { to: "/trust-os", label: "Trust OS", icon: ShieldCheck },
  ]},
  { group: "System", items: [
    { to: "/settings/theme", label: "Theme Studio", icon: Palette },
    { to: "/settings/permissions", label: "Roles & Permissions", icon: ShieldCheck },
    { to: "/settings", label: "Settings", icon: Settings },
  ]},
] as const;

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const openAlerts = alerts.filter((a) => !a.resolved).length;
  const active = drivers.filter((d) => d.status !== "offduty").length;

  return (
    <div className="hidden md:block relative h-screen w-64 shrink-0 p-3">
      {/* SVG filter for liquid glass distortion */}
      <svg className="absolute -z-10 h-0 w-0" aria-hidden="true">
        <defs>
          <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="92" result="noise" />
            <feGaussianBlur in="noise" stdDeviation="2" result="softNoise" />
            <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="40" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <aside className="glass-sidebar relative h-full w-full overflow-hidden rounded-2xl">
        <div className="glass-filter" />
        <div className="glass-overlay" />
        <div className="glass-specular" />

        <div className="glass-content flex h-full flex-col">
          <div className="flex items-center gap-2.5 px-5 h-16 border-b border-white/10">
            <div className="relative size-9 rounded-xl bg-gradient-to-br from-teal to-orange grid place-items-center font-bold text-white shadow-[0_4px_14px_-2px_color-mix(in_oklab,var(--teal)_55%,transparent)]">
              A
              <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-success ring-2 ring-[color:var(--sidebar)]" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-semibold tracking-tight text-[15px] text-sidebar-foreground">Anderoute</span>
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
                            "nav-item group relative flex items-center gap-3 pl-4 pr-2.5 py-2 rounded-lg text-[13px]",
                            isActive
                              ? "active bg-white/10 text-sidebar-foreground font-medium shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--teal)_28%,transparent)]"
                              : "text-sidebar-foreground/75 hover:bg-white/5 hover:text-sidebar-foreground",
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
                            <span className="text-[10px] font-semibold rounded-full bg-orange/25 text-orange px-1.5 py-0.5 tabular-nums">
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

          <div className="border-t border-white/10 p-3 space-y-2">
            <div className="rounded-lg bg-white/5 border border-white/10 p-3 backdrop-blur-sm">
              <div className="flex items-center justify-between text-[11px]">
                <span className="inline-flex items-center gap-1.5 text-sidebar-foreground/80">
                  <Activity className="size-3 text-teal" />
                  Fleet active
                </span>
                <span className="font-semibold tabular-nums text-sidebar-foreground">{active}/{drivers.length}</span>
              </div>
              <div className="mt-2 h-1 rounded-full bg-white/10 overflow-hidden">
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
        </div>
      </aside>
    </div>
  );
}
