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
    <aside
      className={[
        "hidden w-64 shrink-0 flex-col lg:flex",
        "bg-[var(--lg-glass)] backdrop-blur-xl backdrop-saturate-150",
        "border-r border-[var(--lg-border)]",
        "shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)] dark:shadow-[0_10px_40px_-12px_rgba(0,0,0,0.55)]",
        "relative overflow-hidden",
      ].join(" ")}
    >
      {/* Top inner highlight */}
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/20"
      />
      {/* Subtle glass sheen */}
      <span
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent dark:from-white/[0.04]"
      />

      <div className="relative z-10 flex h-full flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[var(--lg-teal)] to-[var(--lg-orange)] shadow-lg shadow-[var(--lg-teal)]/30 ring-1 ring-white/20 dark:ring-white/10">
            <RouteIcon className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-base font-bold text-[var(--lg-text)]">AnderRoute</p>
            <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--lg-muted)]">
              Dispatch Command
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3">
          {NAV.map(({ label, icon: Icon }) => {
            const isActive = label === active;
            return (
              <button
                key={label}
                className={[
                  "group relative flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm transition-all duration-200",
                  isActive
                    ? [
                        "bg-gradient-to-r from-[var(--lg-teal)]/15 via-[var(--lg-teal)]/5 to-transparent",
                        "text-[var(--lg-text)]",
                        "shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
                        "ring-1 ring-[var(--lg-teal)]/25 dark:ring-[var(--lg-teal)]/30",
                      ].join(" ")
                    : "text-[var(--lg-muted)] hover:bg-white/[0.06] hover:text-[var(--lg-text)]",
                ].join(" ")}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-gradient-to-b from-[var(--lg-teal)] to-[var(--lg-orange)] shadow-[0_0_12px_rgba(20,184,166,0.5)]" />
                )}
                <Icon
                  className={[
                    "h-4 w-4 transition-colors duration-200",
                    isActive ? "text-[var(--lg-teal)]" : "",
                  ].join(" ")}
                />
                <span className="font-medium">{label}</span>
              </button>
            );
          })}
        </nav>

        {/* Dispatcher card */}
        <div className="m-4 rounded-2xl border border-[var(--lg-border)] bg-gradient-to-br from-[var(--lg-teal)]/10 via-[var(--lg-glass)] to-[var(--lg-orange)]/10 p-4 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.2)] dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] relative overflow-hidden">
          {/* Card inner highlight */}
          <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/15" />
          <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/[0.03]" />

          <div className="relative z-10">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--lg-muted)]">
              Dispatcher
            </p>
            <p className="mt-1 text-sm font-semibold text-[var(--lg-text)]">AnderRoute Demo</p>
            <p className="mt-0.5 text-xs text-[var(--lg-muted)]">Tier 3 · Live Ops</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
