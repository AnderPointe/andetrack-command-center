import { createFileRoute } from "@tanstack/react-router";
import { KeyRound } from "lucide-react";
import { V25Page } from "@/components/v25/V25Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { API_USAGE, API_BILLING_EVENTS } from "@/v25/data/mockPhase18";

const tone: Record<string, string> = { good: "border-emerald-500/30 text-emerald-300", warn: "border-amber-500/30 text-amber-300", bad: "border-rose-500/30 text-rose-300" };

export const Route = createFileRoute("/v25/api-monetization")({
  head: () => ({ meta: [{ title: "API Monetization · Anderoute" }] }),
  component: () => (
    <V25Page icon={<KeyRound className="size-6 text-emerald-300" />} title="API Monetization Dashboard" blurb="Tiered API plans with included requests, overage tracking, billing events, and rate-limit enforcement.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Customer usage</h2>
        <div className="mt-3 space-y-2">
          {API_USAGE.map((u) => {
            const pct = Math.min(100, Math.round((u.used / u.included) * 100));
            return (
              <div key={u.customer} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
                <div className="flex items-center justify-between">
                  <div><span className="font-medium">{u.customer}</span> <span className="text-xs text-muted-foreground">· {u.plan} · {u.rateLimit}</span></div>
                  <Badge variant="outline" className={tone[u.health]}>{pct}%</Badge>
                </div>
                <Progress value={pct} className="mt-2 h-1" />
                <div className="mt-1 text-xs text-muted-foreground">{u.used.toLocaleString()} / {u.included.toLocaleString()} requests {u.overage > 0 && <span className="text-rose-300">· overage {u.overage.toLocaleString()}</span>}</div>
              </div>
            );
          })}
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Billing events</h2>
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-2">Customer</th><th className="p-2">Type</th><th className="p-2">Units</th><th className="p-2">Amount</th><th className="p-2">At</th></tr></thead>
          <tbody>
            {API_BILLING_EVENTS.map((e) => (
              <tr key={e.id} className="border-t border-white/10">
                <td className="p-2">{e.customer}</td>
                <td className="p-2"><Badge variant="outline" className={e.type === "overage" ? "border-amber-500/30 text-amber-300" : "border-sky-500/30 text-sky-300"}>{e.type}</Badge></td>
                <td className="p-2 font-mono text-xs">{e.units.toLocaleString()}</td>
                <td className="p-2 font-mono">${e.amount.toFixed(2)}</td>
                <td className="p-2 text-xs text-muted-foreground">{e.at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </V25Page>
  ),
});
