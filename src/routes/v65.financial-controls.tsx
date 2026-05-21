import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { V65Page } from "@/components/v65/V65Page";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v65/ui-bits";
import { Card } from "@/components/ui/card";
import { useEnterpriseFinancialControls } from "@/v65/hooks";

export const Route = createFileRoute("/v65/financial-controls")({
  head: () => ({ meta: [{ title: "Financial Controls · V6.5 · Anderoute" }] }),
  component: () => {
    const { controls, queue, audit } = useEnterpriseFinancialControls();
    return (
      <V65Page icon={<Wallet className="size-6 text-cyan-300" />} title="Enterprise Financial Controls"
        blurb="Billing, subscriptions, usage, marketplace fees, API overages, carrier settlement, revenue recognition, refunds, manual adjustments, audit trail. All financial figures are placeholders.">
        <div className="grid gap-3 md:grid-cols-3">
          <ScoreCard label="Financial controls" value={controls.score} tone="amber" />
          <ScoreCard label="Areas passing"
            value={Math.round(controls.areas.filter(a => a.exceptions === 0).length / controls.areas.length * 100)} tone="emerald" />
          <ScoreCard label="Exceptions outstanding"
            value={Math.min(100, controls.areas.reduce((s, a) => s + a.exceptions, 0) * 6)} tone="rose" />
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Control areas</h3>
          <div className="mt-2">
            <SimpleTable rows={controls.areas} columns={[
              { key: "area",       label: "Area" },
              { key: "score",      label: "Score" },
              { key: "exceptions", label: "Exceptions" },
            ]} />
          </div>
        </Card>
        <div className="grid gap-3 md:grid-cols-2">
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Manual adjustment approval queue</h3>
            <div className="mt-2">
              <SimpleTable rows={queue} columns={[
                { key: "id",     label: "ID" },
                { key: "type",   label: "Type" },
                { key: "amount", label: "Amount (pl)" },
                { key: "status", label: "Status", render: (r) => <StatusPill status={r.status} /> },
              ]} />
            </div>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Financial audit trail</h3>
            <ul className="mt-2 space-y-1 text-xs">
              {audit.map((e, i) => (
                <li key={i} className="flex gap-2 text-muted-foreground">
                  <span className="font-mono text-cyan-300/80">{e.ts}</span>
                  <span>{e.actor}</span>
                  <span>·</span>
                  <span>{e.event}</span>
                  <span className="ml-auto">{e.ref}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </V65Page>
    );
  },
});
