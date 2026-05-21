import { createFileRoute } from "@tanstack/react-router";
import { Compass } from "lucide-react";
import { V7Page } from "@/components/v7/V7Page";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v7/ui-bits";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useGlobalOperatingReadiness } from "@/v7/hooks";

export const Route = createFileRoute("/v7/readiness")({
  head: () => ({ meta: [{ title: "Global Readiness Score · V7 · Anderoute" }] }),
  component: () => {
    const { score, gaps, actions } = useGlobalOperatingReadiness();
    return (
      <V7Page icon={<Compass className="size-6 text-indigo-300" />} title="Global Operating Readiness Score"
        blurb="13 readiness categories across product, localization, compliance, financial, support, partners, marketplace, mobile, security, data residency, billing, customer success, regional ops.">
        <div className="grid gap-3 md:grid-cols-3">
          <ScoreCard label="Overall readiness"  value={score.overall} tone="sky" />
          <ScoreCard label="Open gaps"          value={Math.round((gaps.length / score.byCategory.length) * 100)} tone="rose" />
          <ScoreCard label="In-progress actions" value={Math.round((actions.filter(a => a.status === "in_progress").length / actions.length) * 100)} tone="amber" />
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Category breakdown</h3>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {score.byCategory.map(c => (
              <div key={c.category} className="rounded-md border border-white/5 bg-white/[0.02] p-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span>{c.category}</span>
                  <span className="font-semibold">{c.score}%</span>
                </div>
                <Progress value={c.score} className="mt-1.5 h-1" />
              </div>
            ))}
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Gap register</h3>
          <div className="mt-2">
            <SimpleTable rows={gaps as any} columns={[
              { key: "category", label: "Category" },
              { key: "gap",      label: "Gap" },
              { key: "owner",    label: "Owner" },
              { key: "severity", label: "Severity", render: (r: any) => <StatusPill status={r.severity} /> },
            ]} />
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Action plan</h3>
          <div className="mt-2">
            <SimpleTable rows={actions as any} columns={[
              { key: "action", label: "Action" },
              { key: "owner",  label: "Owner" },
              { key: "eta",    label: "ETA" },
              { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
            ]} />
          </div>
        </Card>
      </V7Page>
    );
  },
});
