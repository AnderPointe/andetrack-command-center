import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { LiveMapPanel } from "@/components/map/LiveMapPanel";
import { LoadBoard } from "@/components/loads/LoadBoard";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { EventFeed } from "@/components/dashboard/EventFeed";
import { DriverProfileDrawer } from "@/components/drivers/DriverProfileDrawer";
import { DriverStatusBadge } from "@/components/drivers/DriverStatusBadge";
import { drivers } from "@/data/mock";
import type { Driver } from "@/types";
import {
  Truck, Clock, Fuel, Package, AlertTriangle, CheckCircle2,
  PauseCircle, Power, Users, Timer,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dispatch Dashboard — Anderoute Fleet Command" },
      { name: "description", content: "Real-time fleet visibility, live driver tracking, load assignment and dispatch operations." },
      { property: "og:title", content: "Anderoute Fleet Command" },
      { property: "og:description", content: "Modern logistics command center for CDL and Non-CDL fleet operations." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const [selected, setSelected] = useState<Driver | null>(null);

  const count = (s: Driver["status"]) => drivers.filter((d) => d.status === s).length;

  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-teal mb-1.5">
              <span className="size-1.5 rounded-full bg-teal" /> Dispatch · Tuesday, May 19, 2026
            </div>
            <h1 className="text-[26px] font-semibold tracking-tight leading-tight">Dispatch Command Center</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Real-time visibility across {drivers.length} active units, {count("transit") + count("loaded")} loads in transit and {count("waiting")} unassigned.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 border border-success/25 text-success font-medium">
              <span className="size-1.5 rounded-full bg-success animate-pulse" /> Live telemetry
            </span>
            <span className="hidden md:inline">Auto-refresh · 5s</span>
          </div>
        </div>

        {/* KPI grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
          <StatCard label="Active Drivers" value={drivers.length - count("offduty")} delta="+2" trend="up" icon={Users} accent="teal" />
          <StatCard label="Awaiting Dispatch" value={count("waiting")} icon={Timer} accent="info" />
          <StatCard label="In Transit" value={count("loaded") + count("transit")} delta="+3" trend="up" icon={Truck} accent="orange" />
          <StatCard label="On Break" value={count("break")} icon={PauseCircle} accent="warning" />
          <StatCard label="Off Duty" value={count("offduty")} icon={Power} accent="teal" />
          <StatCard label="Delayed Loads" value={count("delayed")} delta="+1" trend="down" icon={AlertTriangle} accent="destructive" />
          <StatCard label="ETA Accuracy" value="94.3%" delta="+0.8%" trend="up" icon={Clock} accent="success" />
          <StatCard label="Avg Fleet MPG" value="8.4" delta="−0.2" trend="down" icon={Fuel} accent="orange" />
          <StatCard label="Active Shipments" value="9" icon={Package} accent="teal" />
          <StatCard label="Delivered Today" value="27" delta="+4" trend="up" icon={CheckCircle2} accent="success" />
        </div>

        {/* Map + side panel */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-4">
          <LiveMapPanel
            className="h-[460px]"
            selectedId={selected?.id}
            onSelectDriver={setSelected}
          />
          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-[var(--shadow-sm)]">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Driver Roster</h3>
                <p className="text-[11px] text-muted-foreground">Tap to open profile</p>
              </div>
              <span className="text-xs text-muted-foreground tabular-nums">{drivers.length} total</span>
            </div>
            <ul className="max-h-[404px] overflow-y-auto divide-y divide-border">
              {drivers.map((d) => (
                <li key={d.id}>
                  <button
                    onClick={() => setSelected(d)}
                    className="w-full text-left px-4 py-3 hover:bg-secondary/50 transition-colors flex items-center gap-3"
                  >
                    <div className="relative shrink-0">
                      <div className="size-9 rounded-full bg-gradient-to-br from-teal to-orange grid place-items-center text-white text-xs font-semibold">
                        {d.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full ring-2 ring-card" style={{ backgroundColor: `var(--status-${d.status})` }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium truncate">{d.name}</span>
                        <span className="text-[10px] text-muted-foreground tabular-nums">{d.lastUpdated}</span>
                      </div>
                      <div className="mt-0.5 flex items-center justify-between gap-2">
                        <DriverStatusBadge status={d.status} size="xs" />
                        <span className="text-[11px] text-muted-foreground truncate">{d.vehicleType}</span>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>


        {/* Load board + events + alerts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2">
            <LoadBoard />
          </div>
          <div className="space-y-4">
            <EventFeed />
          </div>
        </div>

        <AlertsPanel limit={5} />
      </div>

      <DriverProfileDrawer driver={selected} onClose={() => setSelected(null)} />
    </AppShell>
  );
}
