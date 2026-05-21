import { createFileRoute } from "@tanstack/react-router";
import { Flag } from "lucide-react";
import { V75Page } from "@/components/v75/V75Page";
import { SimpleTable, StatusPill } from "@/components/v75/ui-bits";
import { Card } from "@/components/ui/card";
import { useCountryLaunchExecution } from "@/v75/hooks";

export const Route = createFileRoute("/v75/country-launch")({
  head: () => ({ meta: [{ title: "Country Launch Execution · V7.5 · Anderoute" }] }),
  component: () => {
    const { countries } = useCountryLaunchExecution();
    return (
      <V75Page icon={<Flag className="size-6 text-indigo-300" />} title="Country Launch Execution Dashboard"
        blurb="Per-country: phase, owners, readiness, blockers, risk, go/no-go recommendation.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={countries as any} columns={[
            { key: "country", label: "Country" },
            { key: "phase",   label: "Phase", render: (r: any) => <StatusPill status={r.phase} /> },
            { key: "sponsor", label: "Sponsor" },
            { key: "owner",   label: "Owner" },
            { key: "readiness", label: "Readiness", render: (r: any) => `${r.readiness}%` },
            { key: "risk",    label: "Risk", render: (r: any) => <StatusPill status={r.risk} /> },
            { key: "launch_date", label: "Target" },
            { key: "recommendation", label: "Go/No-Go" },
          ]} />
        </Card>
        <div className="grid gap-3 md:grid-cols-2">
          {countries.map(c => (
            <Card key={c.id} className="border-white/10 bg-white/[0.02] p-4 text-xs">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold">{c.country}</h4>
                <StatusPill status={c.phase} />
              </div>
              <div className="mt-2 grid grid-cols-2 gap-1 text-muted-foreground">
                <div>Compliance: <span className="text-foreground">{c.compliance}</span></div>
                <div>Support: <span className="text-foreground">{c.support}</span></div>
                <div>Partner: <span className="text-foreground">{c.partner}</span></div>
                <div>Marketplace: <span className="text-foreground">{c.marketplace}</span></div>
                <div>Billing: <span className="text-foreground">{c.billing}</span></div>
                <div>Security: <span className="text-foreground">{c.security}</span></div>
              </div>
              <p className="mt-2 text-xs">Recommendation: <span className="font-medium text-foreground">{c.recommendation}</span></p>
            </Card>
          ))}
        </div>
      </V75Page>
    );
  },
});
