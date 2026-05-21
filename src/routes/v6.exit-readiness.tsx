import { createFileRoute } from "@tanstack/react-router";
import { Trophy } from "lucide-react";
import { V6Page } from "@/components/v6/V6Page";
import { SimpleTable, StatusPill, ScoreCard } from "@/components/v6/ui-bits";
import { Card } from "@/components/ui/card";
import { useStrategicExitIPOReadiness } from "@/v6/hooks";

export const Route = createFileRoute("/v6/exit-readiness")({
  head: () => ({ meta: [{ title: "Exit / IPO Readiness · V6" }] }),
  component: () => {
    const { items } = useStrategicExitIPOReadiness();
    const overall = Math.round(items.reduce((s, i) => s + i.score, 0) / items.length);
    const dataRoom = items.find(i => i.area.startsWith("Data room"))?.score ?? 0;
    const financial = items.find(i => i.area.startsWith("Financial"))?.score ?? 0;
    return (
      <V6Page icon={<Trophy className="size-6 text-emerald-300" />} title="Strategic Exit / IPO Readiness Tracker"
        blurb="Tracks evidence and maturity only. We do NOT claim IPO or acquisition readiness as complete. Placeholders are clearly labeled.">
        <div className="grid gap-3 md:grid-cols-3">
          <ScoreCard label="Overall readiness" value={overall} tone="amber" />
          <ScoreCard label="Data room completeness" value={dataRoom} tone="sky" />
          <ScoreCard label="Financial reporting (pl)" value={financial} tone="rose" />
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={items} columns={[
            { key: "area",   label: "Area" },
            { key: "score",  label: "Score" },
            { key: "status", label: "Status", render: (r) => <StatusPill status={r.status} /> },
          ]} />
        </Card>
        <Card className="border-rose-400/30 bg-rose-500/[0.04] p-4 text-xs text-rose-100">
          We track placeholders for financial reporting, legal documents, and customer references — these require audit-grade evidence before any external claim.
        </Card>
      </V6Page>
    );
  },
});
