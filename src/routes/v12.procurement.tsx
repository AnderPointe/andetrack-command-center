import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { V12Page } from "@/components/v12/V12Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v12/ui-bits";
import * as H from "@/v12/hooks";

function Page() {
  const p = H.useTrustProcurementManagement();
  return (
    <V12Page icon={<Lock className="size-6 text-cyan-300" />} title="Trust-Led Procurement Management Center" blurb="Procurement-stage deals, trust packet freshness, response SLA, and outstanding blockers across security, AI, and legal evidence.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="In procurement"     value={String(p.in_stage)}              tone="sky" />
        <ScoreCard label="Packets fresh"      value={String(p.trust_packets_fresh)}   tone="emerald" />
        <ScoreCard label="Response SLA"       value={`${p.response_sla_pct}%`}        tone="violet" />
        <ScoreCard label="Accel days (med)"   value={`${p.accel_days_median}d`}       tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={p.rows as any} columns={[
          { key: "deal", label: "Deal" }, { key: "doc", label: "Document" },
          { key: "status", label: "Status" }, { key: "owner", label: "Owner" }, { key: "age_days", label: "Age (d)" },
        ]} />
      </Card>
    </V12Page>
  );
}

export const Route = createFileRoute("/v12/procurement")({
  head: () => ({ meta: [{ title: "Trust-Led Procurement · V12" }] }),
  component: Page,
});
