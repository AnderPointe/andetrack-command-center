import { Search, Bell } from "lucide-react";
import { AnderRouteSidebar } from "@/components/anderroute/AnderRouteSidebar";
import { DriverCard } from "@/components/anderroute/DriverCard";
import LiquidGlassCard from "@/components/anderroute/LiquidGlassCard";
import LiquidIconButton from "@/components/anderroute/LiquidIconButton";
import LiquidThemeToggle from "@/components/anderroute/LiquidThemeToggle";
import { ThemeProvider } from "@/context/ThemeContext";
import { useDriverDossiers } from "@/hooks/useAnderRouteDossiers";

export default function DispatchDashboard() {
  return (
    <ThemeProvider>
      <DispatchDashboardInner />
    </ThemeProvider>
  );
}

function DispatchDashboardInner() {
  const { dossiers, loading, usingDemo } = useDriverDossiers();

  return (
    <div className="liquid-bg flex min-h-screen">
      <AnderRouteSidebar active="Drivers" />

      <main className="flex-1 p-4 md:p-6">
        <LiquidGlassCard as="section" className="mb-5 px-5 py-4">
          <header className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-[var(--lg-teal)]">
                Dispatch
              </p>
              <h1 className="mt-0.5 text-xl font-bold text-[var(--lg-text)]">
                Active Drivers
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--lg-muted)]" />
                <input
                  placeholder="Search drivers, units, shipments…"
                  className="w-72 rounded-2xl border border-[var(--lg-border)] bg-[var(--lg-glass)] py-2 pl-9 pr-3 text-xs text-[var(--lg-text)] placeholder:text-[var(--lg-muted)] backdrop-blur-xl focus:border-[var(--lg-teal)]/40 focus:outline-none"
                />
              </div>
              <LiquidIconButton label="Notifications" size="sm">
                <Bell className="h-4 w-4" />
              </LiquidIconButton>
              <LiquidThemeToggle />
            </div>
          </header>
        </LiquidGlassCard>

        <LiquidGlassCard as="section" className="mb-5 px-5 py-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[var(--lg-text)]">
              {loading ? "Loading drivers…" : `${dossiers.length} drivers on shift`}
            </h2>
            <p className="text-xs text-[var(--lg-muted)]">
              {usingDemo
                ? "Showing demo data — sign in to see live fleet"
                : "Click any driver to open their command view"}
            </p>
          </div>
        </LiquidGlassCard>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {dossiers.map((d) => (
            <DriverCard key={d.driver.id} dossier={d} />
          ))}
        </div>
      </main>
    </div>
  );
}
