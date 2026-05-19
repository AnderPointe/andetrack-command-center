import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { LaunchNav } from "@/components/launch/LaunchNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SUPPORT_TICKETS } from "@/launch/data/mockLaunch";
import { LifeBuoy } from "lucide-react";

export const Route = createFileRoute("/launch/support")({
  head: () => ({ meta: [{ title: "Support Center — Anderoute" }] }),
  component: Support,
});

const PRIORITY_TONE = {
  high: "border-rose-500/30 text-rose-300",
  medium: "border-amber-500/30 text-amber-300",
  low: "border-white/15 text-muted-foreground",
} as const;

const STATUS_TONE = {
  open: "border-rose-500/30 text-rose-300",
  in_progress: "border-amber-500/30 text-amber-300",
  resolved: "border-emerald-500/30 text-emerald-300",
} as const;

function Support() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <Badge variant="outline" className="border-teal-500/40 text-teal-300">Phase 10 · Support</Badge>
          <div className="flex items-center gap-3">
            <LifeBuoy className="size-6 text-teal-300" />
            <h1 className="text-2xl font-semibold">Support Center</h1>
          </div>
          <LaunchNav />
        </header>

        <div className="flex flex-wrap gap-2">
          <Button size="sm">New ticket</Button>
          <Button size="sm" variant="outline">Knowledge base</Button>
          <Button size="sm" variant="outline">Bug report</Button>
          <Button size="sm" variant="outline">Feature request</Button>
        </div>

        <Card className="border-white/10 bg-white/[0.02] p-5">
          <h2 className="text-sm font-medium">Recent tickets</h2>
          <div className="mt-3 divide-y divide-white/5 text-sm">
            {SUPPORT_TICKETS.map((t) => (
              <div key={t.id} className="grid grid-cols-12 items-center gap-2 py-2.5">
                <code className="col-span-2 text-xs text-muted-foreground">{t.id}</code>
                <div className="col-span-5">{t.subject}</div>
                <div className="col-span-2"><Badge variant="outline" className="border-white/15">{t.category}</Badge></div>
                <div className="col-span-1"><Badge variant="outline" className={PRIORITY_TONE[t.priority as keyof typeof PRIORITY_TONE]}>{t.priority}</Badge></div>
                <div className="col-span-2 text-right"><Badge variant="outline" className={STATUS_TONE[t.status as keyof typeof STATUS_TONE]}>{t.status.replace("_", " ")}</Badge></div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-white/10 bg-white/[0.02] p-4 text-xs text-muted-foreground">
          Categories: Login · Driver app · Dispatch dashboard · GPS tracking · Load management · Customer portal · Billing · Integration · CoPilot AI · Security · Other
        </Card>
      </div>
    </AppShell>
  );
}
