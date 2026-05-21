import { createFileRoute } from "@tanstack/react-router";
import { Flag } from "lucide-react";
import { V75Page } from "@/components/v75/V75Page";
import { SimpleTable, StatusPill, KpiGrid } from "@/components/v75/ui-bits";
import { Card } from "@/components/ui/card";
import { useCountryLaunchExecution } from "@/v75/hooks";

export const Route = createFileRoute("/v75/country-launch")({
  head: () => ({ meta: [{ title: "Country Launch Execution · V7.5 · Anderoute" }] }),
  component: () => {
    const { countries, blockers, trend } = useCountryLaunchExecution();
    const avg = Math.round(countries.reduce((s, c) => s + c.readiness, 0) / countries.length);
    return (
      <V75Page icon={<Flag className="size-6 text-indigo-300" />} title="Country Launch Execution Dashboard"
        blurb="Per-country: phase, owners, readiness, blockers, risk, go/no-go recommendation.">
        <KpiGrid cols={4} items={[
          { label: "Countries",       value: countries.length },
          { label: "Avg readiness",   value: `${avg}%` },
          { label: "Total blockers",  value: blockers.length, sub: `${blockers.filter(b => b.severity === "high").length} high` },
          { label: "High-risk",       value: countries.filter(c => c.risk === "high").length },
        ]} />
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
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Per-country readiness trend</h3>
          <SimpleTable rows={trend as any} columns={[
            { key: "country", label: "Country" },
            { key: "w5", label: "W-5", render: (r: any) => `${r.w5}%` },
            { key: "w4", label: "W-4", render: (r: any) => `${r.w4}%` },
            { key: "w3", label: "W-3", render: (r: any) => `${r.w3}%` },
            { key: "w2", label: "W-2", render: (r: any) => `${r.w2}%` },
            { key: "w1", label: "W-1", render: (r: any) => `${r.w1}%` },
            { key: "w0", label: "Now", render: (r: any) => `${r.w0}%` },
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
