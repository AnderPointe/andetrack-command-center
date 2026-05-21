import { createFileRoute, Link } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V2Page } from "@/components/v2/V2Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DEMO_TRACKS } from "@/v2/data/mockPhase17";

export const Route = createFileRoute("/v2/demo")({
  head: () => ({ meta: [{ title: "V2 Demo · Anderoute" }] }),
  component: Page,
});

const STEPS: { n: number; title: string; detail: string; to: string }[] = [
  { n: 1,  title: "Dispatcher opens AI Operations",              detail: "Sees 3 loads at risk, 2 drivers with stale GPS, 1 customer needing update, 1 failed webhook, 1 EDI error.", to: "/v2/ai-ops" },
  { n: 2,  title: "Opens predictive risk for LD-4821",           detail: "Score 88 critical · explanation: traffic on I-880 + priority A customer.", to: "/v2/risk" },
  { n: 3,  title: "Runs optimization engine",                    detail: "Best match: DRV-114 (reefer 100, 12m ETA, on-time 92%).", to: "/v2/optimization" },
  { n: 4,  title: "Reviews suggested driver",                    detail: "High confidence; one click to request assignment.", to: "/v2/suggested-drivers" },
  { n: 5,  title: "Approval queue",                              detail: "Admin approves reassignment LD-4821 → DRV-114.", to: "/v2/approvals" },
  { n: 6,  title: "CoPilot drafts customer update",              detail: "Draft sent to approval; approved; delay explanation published.", to: "/v2/copilot" },
  { n: 7,  title: "Customer portal V2",                          detail: "Acme sees the approved delay explanation in their portal.", to: "/v2/portal" },
  { n: 8,  title: "EDI beta",                                    detail: "Globex 204 parse error visible; 997 reject sent; Acme 204 → 990 accepted flows clean.", to: "/v2/edi-transactions" },
  { n: 9,  title: "API marketplace",                             detail: "Create tracking.read key for Acme tracking widget; key shown once.", to: "/v2/api-keys" },
  { n: 10, title: "Webhook delivery",                            detail: "shipment.delivered fires successfully to Acme webhook (99.4% success).", to: "/v2/webhooks" },
  { n: 11, title: "Executive opens dashboard",                   detail: "Ops health, on-time trend, utilization, integration health, AI rec impact.", to: "/v2/executive" },
  { n: 12, title: "Integration health",                          detail: "Mapbox degraded surfaced; webhook + EDI watch items called out.", to: "/v2/integration-health" },
];

function Page() {
  return (
    <V2Page
      icon={<ListChecks className="size-6 text-violet-300" />}
      title="V2 End-to-End Demo Flow"
      blurb="Run the full V2 story: AI detects, optimizer recommends, human approves, CoPilot drafts, customer is notified, integrations report health, and the executive view summarizes the day."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="space-y-2">
          {STEPS.map((s) => (
            <Link
              key={s.n}
              to={s.to}
              className="flex items-start gap-3 rounded-lg border border-white/10 bg-black/20 p-3 transition-colors hover:border-violet-500/40"
            >
              <Badge variant="outline" className="border-violet-500/40 text-violet-300">{s.n}</Badge>
              <div>
                <div className="text-sm font-medium">{s.title}</div>
                <div className="text-xs text-muted-foreground">{s.detail}</div>
              </div>
            </Link>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Persona tracks</h2>
        <p className="mt-1 text-xs text-muted-foreground">Run the demo for the audience in the room — each track touches only the steps that matter to them.</p>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {DEMO_TRACKS.map((t) => (
            <div key={t.persona} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
              <div className="flex items-center justify-between">
                <div className="font-medium">{t.persona}</div>
                <Badge variant="outline" className="border-violet-500/40 text-violet-300">steps {t.steps.join(", ")}</Badge>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{t.focus}</div>
            </div>
          ))}
        </div>
      </Card>
    </V2Page>
  );
}
