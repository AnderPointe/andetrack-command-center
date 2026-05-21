import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatTile } from "@/components/v1/StatTile";
import { Progress } from "@/components/ui/progress";
import { PAID_CUSTOMERS, v15Stats } from "@/v15/data/mockPhase16";

export const Route = createFileRoute("/v15/paid-customers")({
  head: () => ({ meta: [{ title: "V1.5 Paid Customers · Anderoute" }] }),
  component: Page,
});

const statusTone: Record<string, string> = {
  active:    "border-emerald-500/30 text-emerald-300",
  trialing:  "border-sky-500/30 text-sky-300",
  past_due:  "border-rose-500/30 text-rose-300",
  cancelled: "border-white/15 text-muted-foreground",
};

function Page() {
  const s = v15Stats();
  return (
    <V15Page
      icon={<Users className="size-6 text-cyan-300" />}
      title="Paid Customer Operations"
      blurb="One screen for paid customer state: plan, status, usage, onboarding progress, health score, renewal, and expansion notes."
    >
      <div className="grid gap-3 md:grid-cols-3">
        <StatTile label="Active" value={s.subActive} tone="good" />
        <StatTile label="Trialing" value={s.subTrialing} tone="info" />
        <StatTile label="Past due" value={s.subPastDue} tone={s.subPastDue ? "bad" : "good"} />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {PAID_CUSTOMERS.map((p) => (
          <Card key={p.id} className="border-white/10 bg-white/[0.02] p-4 text-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{p.company}</div>
                <div className="text-xs text-muted-foreground capitalize">{p.plan} · {p.driversActive} drivers · {p.loadsMonth} loads/mo</div>
              </div>
              <Badge variant="outline" className={statusTone[p.status]}>{p.status}</Badge>
            </div>
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Health</span>
                <span className={p.health >= 80 ? "text-emerald-300" : p.health >= 60 ? "text-sky-300" : "text-amber-300"}>{p.health}</span>
              </div>
              <Progress value={p.health} className="mt-1 h-1.5" />
            </div>
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Onboarding</span>
                <span>{p.onboardingPct}%</span>
              </div>
              <Progress value={p.onboardingPct} className="mt-1 h-1.5" />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>{p.renewalIn ? `Renews in ${p.renewalIn}` : "—"}</span>
              <span className="text-emerald-300">{p.expansion ?? ""}</span>
            </div>
          </Card>
        ))}
      </div>
    </V15Page>
  );
}
