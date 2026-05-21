import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V25Page } from "@/components/v25/V25Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { V25_DEMO_STEPS, V25_EXECUTION_OVERLAYS } from "@/v25/data/mockPhase18";
import { OverlayStrip } from "@/components/v25/ui-bits";

export const Route = createFileRoute("/v25/demo")({
  head: () => ({ meta: [{ title: "V2.5 Demo Flow · Anderoute" }] }),
  component: () => (
    <V25Page icon={<ListChecks className="size-6 text-emerald-300" />} title="V2.5 End-to-End Demo Flow" blurb="EDI 204 → mapping → load → optimization → approval → 990 → driver acceptance → 214 → branded portal → approved customer message → API/billing → scaling/audit/reports.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <ol className="space-y-2 text-sm">
          {V25_DEMO_STEPS.map((s) => (
            <li key={s.id} className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="flex items-center gap-2"><Badge variant="outline" className="border-emerald-500/30 text-emerald-300">{s.id}</Badge><span className="font-medium">{s.actor}</span><span className="text-muted-foreground">— {s.action}</span></div>
              <div className="mt-1 pl-1 text-xs text-muted-foreground">→ {s.result}</div>
            </li>
          ))}
        </ol>
      </Card>
    </V25Page>
  ),
});
