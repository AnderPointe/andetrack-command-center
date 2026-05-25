import { Search, Bell } from "lucide-react";
import { AnderRouteSidebar } from "@/components/anderroute/AnderRouteSidebar";
import { DriverCard } from "@/components/anderroute/DriverCard";
import { DEMO_DRIVERS } from "@/data/anderrouteDemo";

export default function DispatchDashboard() {
  return (
    <div className="flex min-h-screen bg-[#020617] text-white">
      <AnderRouteSidebar active="Drivers" />

      <main className="flex-1">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 bg-slate-950/60 px-6 py-4 backdrop-blur">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-teal-300">
              Dispatch
            </p>
            <h1 className="mt-0.5 text-xl font-bold text-white">Active Drivers</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
              <input
                placeholder="Search drivers, units, shipments…"
                className="w-72 rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-xs text-white placeholder:text-slate-500 focus:border-teal-400/40 focus:outline-none"
              />
            </div>
            <button className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10">
              <Bell className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">
              {DEMO_DRIVERS.length} drivers on shift
            </h2>
            <p className="text-xs text-slate-400">Click any driver to open their command view</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {DEMO_DRIVERS.map((d) => (
              <DriverCard key={d.driver.id} dossier={d} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
