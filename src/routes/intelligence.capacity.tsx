import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { IntelligenceNav } from "@/components/intelligence/IntelligenceNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gauge, AlertCircle } from "lucide-react";
import { useCapacityForecast } from "@/intelligence/hooks/useIntelligence";

export const Route = createFileRoute("/intelligence/capacity")({
  head: () => ({ meta: [{ title: "Capacity Forecast — Anderoute Intelligence" }] }),
  component: CapacityPage,
});

function CapacityPage() {
  const { slots } = useCapacityForecast();
  const gaps = slots.filter((s) => s.coverage_gap);
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <div className="flex items-center gap-3">
            <Gauge className="size-5 text-teal-300" />
            <h1 className="text-xl font-semibold">Capacity Forecast</h1>
            <Badge variant="outline" className="border-teal-500/40 text-teal-200">Next 8 hours</Badge>
          </div>
          <IntelligenceNav />
        </header>

        {gaps.length > 0 && (
          <Card className="border-amber-500/30 bg-amber-500/5 p-3 text-sm flex items-center gap-2">
            <AlertCircle className="size-4 text-amber-300" />
            <span>Coverage gap predicted at <strong>{gaps.map((g) => g.hour).join(", ")}</strong>. Consider adding drivers or shifting capacity.</span>
          </Card>
        )}

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-medium">Hourly capacity (mock forecast)</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-muted-foreground">
                <tr>
                  <th className="py-2 pr-3">Hour</th>
                  <th className="py-2 pr-3">Drivers</th>
                  <th className="py-2 pr-3">Vehicles</th>
                  <th className="py-2 pr-3">Expected deliveries</th>
                  <th className="py-2 pr-3">Expected delays</th>
                  <th className="py-2 pr-3">Demand (placeholder)</th>
                  <th className="py-2 pr-3">Dispatcher load</th>
                  <th className="py-2 pr-3">Coverage</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {slots.map((s) => (
                  <tr key={s.hour} className={`border-t border-white/5 ${s.coverage_gap ? "bg-amber-500/5" : ""}`}>
                    <td className="py-2 pr-3 font-medium">{s.hour}</td>
                    <td className="py-2 pr-3">{s.available_drivers}</td>
                    <td className="py-2 pr-3">{s.available_vehicles}</td>
                    <td className="py-2 pr-3">{s.expected_deliveries}</td>
                    <td className="py-2 pr-3 text-amber-300">{s.expected_delays}</td>
                    <td className="py-2 pr-3 text-muted-foreground">{s.demand_placeholder}</td>
                    <td className="py-2 pr-3">{s.dispatcher_workload}%</td>
                    <td className="py-2 pr-3">{s.coverage_gap ? <span className="text-amber-300">gap</span> : <span className="text-emerald-300">ok</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
