import { createFileRoute } from "@tanstack/react-router";
import { Lightbulb } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { Section, SimpleTable, StatusPill } from "@/components/v15/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v15/hooks";

function Page() {
  const recs = H.useOperatingIntelligenceRecommendations();
  return (
    <V15Page icon={<Lightbulb className="size-6 text-cyan-300" />} title="Operating Intelligence Recommendation Engine" blurb="Each recommendation includes source signals, confidence, impact placeholder, risk, approver, approval status, audit ID, next action. Human approval is required.">
      <div className="grid gap-3 md:grid-cols-2">
        {recs.map((r) => (
          <Card key={r.id} className="border-white/10 bg-white/[0.02] p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">{r.id} · {r.type}</div>
              <StatusPill status={r.approval} />
            </div>
            <div className="text-sm font-medium">{r.rec}</div>
            <div className="text-[11px] text-muted-foreground">Source signals: {r.source_signals.join(" · ")}</div>
            <div className="grid grid-cols-3 gap-2 text-[11px]">
              <div>Confidence: <StatusPill status={r.confidence} /></div>
              <div>Risk: <StatusPill status={r.risk} /></div>
              <div>Approver: {r.approver}</div>
            </div>
            <div className="text-[11px] text-muted-foreground">Impact: {r.impact_placeholder} · Audit: {r.audit}</div>
            <div className="text-[11px]">Next: {r.next}</div>
          </Card>
        ))}
      </div>
      <Section title="Audit trail (sketch)">
        <SimpleTable rows={recs.map(r => ({ id: r.id, audit: r.audit, approver: r.approver, status: r.approval })) as any}
          columns={[
            { key: "id", label: "Rec" }, { key: "audit", label: "Audit ID" }, { key: "approver", label: "Approver" },
            { key: "status", label: "Status", render: (x: any) => <StatusPill status={x.status} /> },
          ]} />
      </Section>
    </V15Page>
  );
}

export const Route = createFileRoute("/v15/recommendations")({
  head: () => ({ meta: [{ title: "Recommendations · V15" }] }),
  component: Page,
});
