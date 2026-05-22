import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { V95Page } from "@/components/v95/V95Page";
import { Card } from "@/components/ui/card";
import { SimpleTable, StatusPill } from "@/components/v95/ui-bits";
import * as H from "@/v95/hooks";

function Page() {
  const r = H.useStrategicRiskExecution();
  return (
    <V95Page icon={<AlertTriangle className="size-6 text-cyan-300" />} title="Long-Term Strategic Risk Execution" blurb="Financial, concentration, marketplace, certification, security, AI, partner, product, expansion, support, competitive risks with mitigation execution + board visibility.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Risk register</h3>
        <div className="mt-2">
          <SimpleTable rows={r.risks as any} columns={[
            { key: "risk", label: "Risk" }, { key: "owner", label: "Owner" },
            { key: "level", label: "Level", render: (x: any) => <StatusPill status={x.level} /> },
            { key: "residual", label: "Residual", render: (x: any) => `${x.residual}%` },
            { key: "board_visible", label: "Board", render: (x: any) => x.board_visible ? "✓" : "—" },
          ]} />
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Residual risk trend</h3>
        <div className="mt-2 space-y-1.5 text-sm">
          {r.trend.map((t) => (
            <div key={t.period} className="flex items-center justify-between rounded border border-white/5 bg-black/20 px-3 py-1.5">
              <span className="text-muted-foreground">{t.period}</span>
              <span className="font-mono text-cyan-200">{t.residual}</span>
            </div>
          ))}
        </div>
      </Card>
    </V95Page>
  );
}

export const Route = createFileRoute("/v95/risk")({
  head: () => ({ meta: [{ title: "Strategic Risk · Anderoute V9.5" }] }),
  component: Page,
});
