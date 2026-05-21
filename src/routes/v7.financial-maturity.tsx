import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { V7Page } from "@/components/v7/V7Page";
import { ScoreCard, SimpleTable } from "@/components/v7/ui-bits";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { usePlatformFinancialMaturity } from "@/v7/hooks";

export const Route = createFileRoute("/v7/financial-maturity")({
  head: () => ({ meta: [{ title: "Financial Maturity · V7 · Anderoute" }] }),
  component: () => {
    const { maturity, mix } = usePlatformFinancialMaturity();
    return (
      <V7Page icon={<Wallet className="size-6 text-indigo-300" />} title="Platform Financial Maturity"
        blurb="Billing, marketplace fees, API billing, partner revshare, revenue events, invoice accuracy, manual adjustments, audit trail. Audit completeness is NOT asserted.">
        <div className="grid gap-3 md:grid-cols-3">
          <ScoreCard label="Financial maturity" value={maturity.score} tone="amber" />
          <ScoreCard label="Invoice accuracy"   value={89}             tone="emerald" />
          <ScoreCard label="Revenue quality"    value={84}             tone="sky" />
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Maturity pillars</h3>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {maturity.pillars.map(p => (
              <div key={p.pillar} className="rounded-md border border-white/5 bg-white/[0.02] p-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span>{p.pillar}</span>
                  <span className="font-semibold">{p.score}%</span>
                </div>
                <Progress value={p.score} className="mt-1.5 h-1" />
              </div>
            ))}
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Product-line revenue mix</h3>
          <div className="mt-2">
            <SimpleTable rows={mix as any} columns={[
              { key: "line", label: "Product line" },
              { key: "pct",  label: "Share %" },
            ]} />
          </div>
        </Card>
      </V7Page>
    );
  },
});
