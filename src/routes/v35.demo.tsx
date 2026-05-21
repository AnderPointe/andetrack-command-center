import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V35Page } from "@/components/v35/V35Page";
import { Card } from "@/components/ui/card";
import { DEMO_FLOW } from "@/v35/data/mockPhase20";

export const Route = createFileRoute("/v35/demo")({
  head: () => ({ meta: [{ title: "V3.5 Demo Flow · Anderoute" }] }),
  component: () => (
    <V35Page icon={<ListChecks className="size-6 text-amber-300" />} title="V3.5 Demo Flow"
      blurb="End-to-end commercial demo: monetization → verification → marketplace → settlement → telematics → certification → procurement → API → multi-region.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <ol className="space-y-1.5 text-sm">
          {DEMO_FLOW.map((s, i) => (
            <li key={i} className="flex gap-3 rounded-lg border border-white/10 bg-black/20 px-3 py-2">
              <span className="font-mono text-xs text-amber-300">{String(i + 1).padStart(2, "0")}</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </Card>
    </V35Page>
  ),
});
