import { createFileRoute } from "@tanstack/react-router";
import { LifeBuoy } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SUPPORT_TICKETS, SUPPORT_CATEGORIES } from "@/v1/data/mockPhase14";

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
  return (
    <V1Page
      icon={<LifeBuoy className="size-6 text-indigo-300" />}
      title="Support Operations"
      blurb="Ticket queue with SLA tracking, escalation, and category coverage for V1."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Categories</h2>
        <div className="mt-2 flex flex-wrap gap-1">
          {SUPPORT_CATEGORIES.map((c) => (
            <Badge key={c} variant="outline" className="border-white/15 text-muted-foreground">{c}</Badge>
          ))}
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Open queue</h2>
        <div className="mt-3 space-y-2">
          {SUPPORT_TICKETS.map((t) => {
            const breached = t.openHours > t.slaHours;
            return (
              <div key={t.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
                  <Badge variant="outline" className="border-white/15 text-muted-foreground">{t.priority}</Badge>
                  <Badge variant="outline" className="border-white/15 text-muted-foreground">{t.category}</Badge>
                  <span>{t.subject}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${breached ? "text-rose-300" : "text-muted-foreground"}`}>
                    {t.openHours}h / {t.slaHours}h SLA
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
