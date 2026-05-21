import { createFileRoute } from "@tanstack/react-router";
import { Handshake } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { SimpleTable, StatusPill, KpiGrid } from "@/components/v45/ui-bits";
import { Card } from "@/components/ui/card";
import { PARTNERSHIPS, PARTNERSHIP_PIPELINE } from "@/v45/data/mockPhase22";

export const Route = createFileRoute("/v45/partnerships")({
  head: () => ({ meta: [{ title: "Partnerships · Anderoute" }] }),
  component: () => {
    const ready = PARTNERSHIPS.filter(p => p.stage === "launch_ready").length;
    const integrating = PARTNERSHIPS.filter(p => p.stage === "integrating").length;
    const diligence = PARTNERSHIPS.filter(p => p.stage === "diligence").length;
    const totalPipeline = PARTNERSHIP_PIPELINE.reduce((a, s) => a + s.value, 0);
    return (
      <V45Page icon={<Handshake className="size-6 text-violet-300" />} title="Strategic Partnership Readiness"
        blurb="Pipeline across telematics, carrier networks, brokers, shippers, fuel, EDI, ERP, insurance placeholder, hardware and mobile ecosystem partners.">
        <KpiGrid cols={4} items={[
          { label: "Launch ready", value: ready },
          { label: "Integrating", value: integrating },
          { label: "Diligence", value: diligence },
          { label: "Pipeline value", value: `$${totalPipeline.toLocaleString()}` },
        ]} />

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Pipeline funnel</h3>
          <div className="mt-3 space-y-1.5">
            {PARTNERSHIP_PIPELINE.map(s => {
              const maxCount = Math.max(...PARTNERSHIP_PIPELINE.map(p => p.count));
              return (
                <div key={s.stage} className="flex items-center gap-3">
                  <div className="w-32 text-xs">{s.stage}</div>
                  <div className="flex-1 h-5 rounded bg-white/5 overflow-hidden">
                    <div className="h-full bg-violet-400/60" style={{ width: `${(s.count / maxCount) * 100}%` }} />
                  </div>
                  <div className="w-12 text-right text-xs text-muted-foreground">{s.count}</div>
                  <div className="w-24 text-right text-xs">${s.value.toLocaleString()}</div>
                </div>
              );
            })}
          </div>
        </Card>

        <SimpleTable rows={PARTNERSHIPS} columns={[
          { key: "name", label: "Partner" },
          { key: "category", label: "Category" },
          { key: "fit", label: "Fit", render: r => `${r.fit}` },
          { key: "security", label: "Security", render: r => <StatusPill status={r.security} /> },
          { key: "legal", label: "Legal", render: r => <StatusPill status={r.legal} /> },
          { key: "stage", label: "Stage", render: r => <StatusPill status={r.stage} /> },
        ]} />
      </V45Page>
    );
  },
});
