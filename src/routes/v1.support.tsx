import { createFileRoute } from "@tanstack/react-router";
import { LifeBuoy } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { StatTile } from "@/components/v1/StatTile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SUPPORT_TICKETS, SUPPORT_CATEGORIES, supportStats } from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/support")({
  head: () => ({ meta: [{ title: "Support Operations · Anderoute" }] }),
  component: Page,
});

const STATUS_TONE: Record<string, string> = {
  open:           "border-rose-500/30 text-rose-300",
  in_progress:    "border-indigo-500/30 text-indigo-300",
  waiting_user:   "border-amber-500/30 text-amber-300",
  resolved:       "border-emerald-500/30 text-emerald-300",
};

function Page() {
  const s = supportStats();
  return (
    <V1Page
      icon={<LifeBuoy className="size-6 text-indigo-300" />}
      title="Support Operations"
      blurb="Ticket queue with SLA tracking, escalation, and category coverage. SLA breaches trigger immediate escalation."
    >
      <div className="grid gap-3 md:grid-cols-4">
        <StatTile label="Open tickets" value={s.open} tone={s.open ? "warn" : "good"} />
        <StatTile label="SLA breached" value={s.breached} tone={s.breached ? "bad" : "good"} hint="escalate now" />
        <StatTile label="P1 open" value={s.p1Open} tone={s.p1Open ? "warn" : "good"} />
        <StatTile label="Resolved" value={s.resolved} tone="good" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Supported categories</h2>
        <div className="mt-2 flex flex-wrap gap-1">
          {SUPPORT_CATEGORIES.map((c) => (
            <Badge key={c} variant="outline" className="border-white/15 text-muted-foreground">{c}</Badge>
          ))}
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Open queue</h2>
        <div className="mt-3 space-y-2">
          {SUPPORT_TICKETS
            .slice()
            .sort((a, b) => (a.status === "resolved" ? 1 : 0) - (b.status === "resolved" ? 1 : 0))
            .map((t) => {
              const breached = t.status !== "resolved" && t.openHours > t.slaHours;
              return (
                <div key={t.id} className={`flex flex-wrap items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm ${breached ? "border-rose-500/30 bg-rose-500/5" : "border-white/10 bg-black/20"}`}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
                    <Badge variant="outline" className="border-white/15 text-muted-foreground">{t.priority}</Badge>
                    <Badge variant="outline" className="border-white/15 text-muted-foreground">{t.category}</Badge>
                    <span>{t.subject}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs ${breached ? "text-rose-300 font-semibold" : "text-muted-foreground"}`}>
                      {t.openHours}h / {t.slaHours}h SLA{breached ? " · breached" : ""}
                    </span>
                    <Badge variant="outline" className={STATUS_TONE[t.status]}>{t.status.replace("_", " ")}</Badge>
                  </div>
                </div>
              );
            })}
        </div>
      </Card>
    </V1Page>
  );
}
