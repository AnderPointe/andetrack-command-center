import { createFileRoute } from "@tanstack/react-router";
import { Globe } from "lucide-react";
import { V75Page } from "@/components/v75/V75Page";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v75/ui-bits";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useGlobalExpansionExecution } from "@/v75/hooks";

export const Route = createFileRoute("/v75/expansion")({
  head: () => ({ meta: [{ title: "Global Expansion Execution · V7.5 · Anderoute" }] }),
  component: () => {
    const { score, countries, blockers } = useGlobalExpansionExecution();
    return (
      <V75Page icon={<Globe className="size-6 text-indigo-300" />} title="Global Expansion Execution Center"
        blurb="Countries in research, planning, pilot, live. Blockers, gaps, executive approvals needed.">
        <div className="grid gap-3 md:grid-cols-4">
          <ScoreCard label="Execution readiness" value={score.overall} tone="sky" />
          <ScoreCard label="Countries" value={countries.length} tone="emerald" />
          <ScoreCard label="Open blockers" value={blockers.length} tone="rose" />
          <ScoreCard label="In pilot" value={countries.filter(c => c.phase === "Controlled Pilot").length} tone="amber" />
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Execution readiness by category</h3>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {score.byCategory.map(c => (
              <div key={c.category} className="rounded-md border border-white/5 bg-white/[0.02] p-2.5">
                <div className="flex items-center justify-between text-xs"><span>{c.category}</span><span className="font-semibold">{c.score}%</span></div>
                <Progress value={c.score} className="mt-1.5 h-1" />
              </div>
            ))}
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Country pipeline</h3>
          <div className="mt-2">
            <SimpleTable rows={countries as any} columns={[
              { key: "country", label: "Country" },
              { key: "phase",   label: "Phase" },
              { key: "readiness", label: "Readiness", render: (r: any) => `${r.readiness}%` },
              { key: "risk",    label: "Risk", render: (r: any) => <StatusPill status={r.risk} /> },
              { key: "blockers", label: "Blockers" },
            ]} />
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Global launch blockers</h3>
          <div className="mt-2">
            <SimpleTable rows={blockers as any} columns={[
              { key: "country",  label: "Country" },
              { key: "blocker",  label: "Blocker" },
              { key: "severity", label: "Severity", render: (r: any) => <StatusPill status={r.severity} /> },
              { key: "owner",    label: "Owner" },
            ]} />
          </div>
        </Card>
      </V75Page>
    );
  },
});
