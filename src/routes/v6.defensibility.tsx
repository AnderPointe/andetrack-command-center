import { createFileRoute } from "@tanstack/react-router";
import { Shield } from "lucide-react";
import { V6Page } from "@/components/v6/V6Page";
import { ScoreCard } from "@/components/v6/ui-bits";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProductDefensibilityMaturity } from "@/v6/hooks";

export const Route = createFileRoute("/v6/defensibility")({
  head: () => ({ meta: [{ title: "Defensibility · V6" }] }),
  component: () => {
    const { factors } = useProductDefensibilityMaturity();
    const overall = Math.round(factors.reduce((s, f) => s + f.score, 0) / factors.length);
    const ranked = [...factors].sort((a, b) => b.score - a.score);
    return (
      <V6Page icon={<Shield className="size-6 text-emerald-300" />} title="Product Defensibility Maturity"
        blurb="Workflow, data, marketplace, integration, mobile, portal, governance, compliance, API/EDI, telematics, AI ops, switching costs, brand and partner moats.">
        <div className="grid gap-3 md:grid-cols-2">
          <ScoreCard label="Overall defensibility" value={overall} tone="violet" />
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Factor matrix</h3>
            <div className="mt-2 space-y-2">
              {ranked.map(f => (
                <div key={f.factor}>
                  <div className="flex justify-between text-xs"><span className="text-muted-foreground">{f.factor}</span><span className={f.score >= 85 ? "text-emerald-300" : f.score >= 78 ? "text-sky-300" : "text-amber-300"}>{f.score}</span></div>
                  <Progress value={f.score} className="mt-1 h-1.5" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </V6Page>
    );
  },
});
