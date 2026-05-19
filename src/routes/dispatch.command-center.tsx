import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { LiveMapPanel } from "@/components/map/LiveMapPanel";
import { DispatchStatusBoard } from "@/components/dispatch/DispatchStatusBoard";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { useCurrentCompany } from "@/hooks/useCurrentCompany";
import { useDispatchMapRealtime } from "@/hooks/useDispatchMapRealtime";
import { Activity, Truck, Package, AlertTriangle, Clock, Users, TrendingUp, Zap } from "lucide-react";

export const Route = createFileRoute("/dispatch/command-center")({
  head: () => ({ meta: [
    { title: "Command Center — Anderoute" },
    { name: "description", content: "Enterprise dispatcher command center: live operations, drivers, loads, alerts, ETA risk, CoPilot." },
  ]}),
  component: CommandCenter,
});

const KPIS = [
  { label: "Active drivers", value: "18", icon: Truck, tone: "text-teal-300" },
  { label: "Available", value: "6", icon: Users, tone: "text-emerald-300" },
  { label: "Unassigned loads", value: "4", icon: Package, tone: "text-amber-300" },
  { label: "At-risk deliveries", value: "2", icon: AlertTriangle, tone: "text-orange-300" },
  { label: "Completed today", value: "31", icon: Activity, tone: "text-slate-200" },
  { label: "ETA accuracy", value: "94%", icon: Clock, tone: "text-teal-300" },
  { label: "Fleet utilization", value: "78%", icon: TrendingUp, tone: "text-emerald-300" },
  { label: "Revenue today", value: "$18.4k", icon: Zap, tone: "text-orange-300" },
];

function CommandCenter() {
  const { companyId } = useCurrentCompany();
  useDispatchMapRealtime(companyId);
  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Command Center</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Live multi-company dispatch operations.</p>
          </div>
          <div className="flex gap-2 text-xs">
            <Link to="/loads" className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 hover:border-teal-400/40">Load board</Link>
            <Link to="/settings/billing" className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 hover:border-teal-400/40">Billing</Link>
            <Link to="/admin/platform" className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 hover:border-teal-400/40">Platform</Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {KPIS.map((k) => (
            <Card key={k.label} className="p-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{k.label}</span>
                <k.icon className={`size-3.5 ${k.tone}`} />
              </div>
              <div className={`mt-1 text-xl font-semibold tabular-nums ${k.tone}`}>{k.value}</div>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
          <LiveMapPanel className="h-[420px]" companyId={companyId} />
          <AlertsPanel limit={6} />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Driver Status Board</h2>
          <DispatchStatusBoard />
        </div>
      </div>
    </AppShell>
  );
}
