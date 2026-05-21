import { createFileRoute } from "@tanstack/react-router";
import { FileCheck2 } from "lucide-react";
import { V5Page } from "@/components/v5/V5Page";
import { ScoreCard } from "@/components/v5/ui-bits";
import { Card } from "@/components/ui/card";
import { CERT_COMPLETION } from "@/v5/data/mockPhase23";

export const Route = createFileRoute("/v5/certification")({
  head: () => ({ meta: [{ title: "Certification Completion · Anderoute V5" }] }),
  component: () => {
    const items = Object.entries(CERT_COMPLETION);
    return (
      <V5Page icon={<FileCheck2 className="size-6 text-fuchsia-300" />} title="Certification Completion Tracking"
        blurb="Evidence-tracked progress toward SOC 2 and adjacent reviews. No certification is claimed final until auditor sign-off is logged.">
        <div className="grid gap-3 md:grid-cols-4">
          {items.map(([k, v]) => (
            <ScoreCard key={k} label={k.replace(/_/g, " ")} value={v as number} tone={(v as number) >= 85 ? "emerald" : (v as number) >= 70 ? "sky" : "amber"} />
          ))}
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4 text-xs text-muted-foreground">
          Auditor feedback panel is a placeholder. Evidence package builder is in `/v5/soc2`.
        </Card>
      </V5Page>
    );
  },
});
