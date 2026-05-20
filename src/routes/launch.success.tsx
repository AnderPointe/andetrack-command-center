import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { LaunchNav } from "@/components/launch/LaunchNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SUCCESS_ACCOUNTS, HEALTH_DIMENSIONS } from "@/launch/data/mockLaunch";
import { Users } from "lucide-react";

export const Route = createFileRoute("/launch/success")({
  head: () => ({ meta: [{ title: "Customer Success — Anderoute" }] }),
  component: Success,
});

const RISK_TONE = {
  low: "border-emerald-500/30 text-emerald-300",
  moderate: "border-amber-500/30 text-amber-300",
  high: "border-rose-500/30 text-rose-300",
} as const;

function Success() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <Badge variant="outline" className="border-teal-500/40 text-teal-300">Phase 10 · Success</Badge>
          <div className="flex items-center gap-3">
            <Users className="size-6 text-teal-300" />
            <h1 className="text-2xl font-semibold">Customer Success</h1>
          </div>
          <LaunchNav />
        </header>

        <section className="grid gap-3 md:grid-cols-2">
          {SUCCESS_ACCOUNTS.map((a) => (
            <Card key={a.name} className="border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">{a.name}</h3>
                <Badge variant="outline" className={RISK_TONE[a.risk as keyof typeof RISK_TONE]}>
                  {a.risk} risk
                </Badge>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Stage: {a.stage} · {a.drivers} drivers · Expansion: {a.expansion}
              </div>
              <div className="mt-3 flex items-center gap-3">
                <Progress value={a.health} className="h-1.5" />
                <span className="text-xs">{a.health}</span>
              </div>
            </Card>
          ))}
        </section>

        <Card className="border-white/10 bg-white/[0.02] p-4 text-xs text-muted-foreground">
          Health = adoption + product usage + support load + risk flags. Final scoring weights validated during pilot.
        </Card>
      </div>
    </AppShell>
  );
}
