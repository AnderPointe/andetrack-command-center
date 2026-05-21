import { createFileRoute } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import { V25Page } from "@/components/v25/V25Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ONBOARDING_STEPS } from "@/v25/data/mockPhase18";

export const Route = createFileRoute("/v25/onboarding")({
  head: () => ({ meta: [{ title: "Enterprise Onboarding · Anderoute" }] }),
  component: () => {
    const done = ONBOARDING_STEPS.filter((s) => s.done).length;
    const pct = Math.round((done / ONBOARDING_STEPS.length) * 100);
    return (
      <V25Page icon={<Building2 className="size-6 text-emerald-300" />} title="Enterprise Onboarding" blurb="13-step setup from company creation through go-live: locations, users, drivers, customers, EDI, API, webhooks, billing, branding, custom domain, training, readiness review.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between"><h2 className="text-sm font-semibold">Go-live progress</h2><Badge variant="outline" className="border-emerald-500/30 text-emerald-300">{done} / {ONBOARDING_STEPS.length}</Badge></div>
          <Progress value={pct} className="mt-3 h-1.5" />
          <ul className="mt-4 space-y-1.5 text-sm">
            {ONBOARDING_STEPS.map((s) => (
              <li key={s.id} className="flex items-center gap-2"><span className={s.done ? "text-emerald-400" : "text-muted-foreground"}>{s.done ? "✓" : "○"}</span><span className={s.done ? "" : "text-muted-foreground"}>{s.label}</span><Badge variant="outline" className="ml-auto border-white/15 text-muted-foreground text-[10px]">{s.owner}</Badge></li>
            ))}
          </ul>
        </Card>
      </V25Page>
    );
  },
});
