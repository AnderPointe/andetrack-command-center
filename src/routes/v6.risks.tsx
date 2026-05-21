import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { V6Page } from "@/components/v6/V6Page";
import { SimpleTable, StatusPill, KpiGrid } from "@/components/v6/ui-bits";
import { Card } from "@/components/ui/card";
import { useStrategicRiskPortfolio } from "@/v6/hooks";

export const Route = createFileRoute("/v6/risks")({
  head: () => ({ meta: [{ title: "Strategic Risks · V6" }] }),
  component: () => {
    const { risks } = useStrategicRiskPortfolio();
    const high = risks.filter(r => r.sev === "high").length;
    const med  = risks.filter(r => r.sev === "medium").length;
    const low  = risks.filter(r => r.sev === "low").length;
    const byCat: Record<string, typeof risks> = {};
    for (const r of risks) (byCat[r.cat] ||= []).push(r);
    return (
      <V6Page icon={<AlertTriangle className="size-6 text-emerald-300" />} title="Strategic Risk Portfolio"
        blurb="Product, security, compliance, marketplace, revenue, concentration, partner, competitive, technical-debt, mobile-approval, certification, data, AI, ops-scaling and legal (pl) risks.">
        <KpiGrid cols={4} items={[
          { label: "Total", value: risks.length },
          { label: "High",  value: high },
          { label: "Medium", value: med },
          { label: "Low", value: low },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Heatmap by category</h3>
          <div className="mt-3 grid gap-2 md:grid-cols-3">
            {Object.entries(byCat).map(([cat, list]) => (
              <div key={cat} className="rounded border border-white/10 bg-black/20 p-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">{cat}</span>
                  <span className="text-muted-foreground">{list.length}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {list.map(r => <StatusPill key={r.id} status={r.sev} />)}
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={risks} columns={[
            { key: "id",    label: "ID" },
            { key: "cat",   label: "Category" },
            { key: "desc",  label: "Risk" },
            { key: "sev",   label: "Severity", render: (r) => <StatusPill status={r.sev} /> },
            { key: "owner", label: "Owner" },
            { key: "mitig", label: "Mitigation" },
          ]} />
        </Card>
      </V6Page>
    );
  },
});
