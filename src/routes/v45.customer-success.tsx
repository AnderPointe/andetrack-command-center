import { createFileRoute } from "@tanstack/react-router";
import { HeartPulse } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { ScoreCard } from "@/components/v45/ui-bits";
import { CS_MATURITY } from "@/v45/data/mockPhase22";

export const Route = createFileRoute("/v45/customer-success")({
  head: () => ({ meta: [{ title: "Customer Success · Anderoute" }] }),
  component: () => (
    <V45Page icon={<HeartPulse className="size-6 text-violet-300" />} title="Customer Success Maturity"
      blurb="Onboarding, training, adoption, health, QBR (placeholder), renewals, expansions, handoff, escalation, and feedback loop maturity.">
      <div className="grid gap-3 md:grid-cols-4">
        {Object.entries(CS_MATURITY).map(([k, v]) => (
          <ScoreCard key={k} label={k} value={v as number} tone={(v as number) >= 80 ? "emerald" : (v as number) >= 65 ? "sky" : "amber"} />
        ))}
      </div>
    </V45Page>
  ),
});
