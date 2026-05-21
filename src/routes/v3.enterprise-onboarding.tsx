import { createFileRoute } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import { V3Page } from "@/components/v3/V3Page";
import { Card } from "@/components/ui/card";

const STEPS = [
  { id: "e1", phase: "Discovery",   item: "Security questionnaire returned" },
  { id: "e2", phase: "Discovery",   item: "Pilot drivers identified" },
  { id: "e3", phase: "Provisioning",item: "Company + admin user created" },
  { id: "e4", phase: "Provisioning",item: "SSO + roles configured" },
  { id: "e5", phase: "Integration", item: "EDI partners connected" },
  { id: "e6", phase: "Integration", item: "Telematics provider mapped" },
  { id: "e7", phase: "Mobile",      item: "Mobile policy + feature flags set" },
  { id: "e8", phase: "Launch",      item: "Pilot loads dispatched" },
  { id: "e9", phase: "Launch",      item: "Executive readiness review" },
];

export const Route = createFileRoute("/v3/enterprise-onboarding")({
  head: () => ({ meta: [{ title: "Enterprise Onboarding · Anderoute V3" }] }),
  component: () => (
    <V3Page icon={<Building2 className="size-6 text-sky-300" />} title="Enterprise Onboarding (V3)"
      blurb="Onboarding workflow built around the V3 surface: security → provisioning → integration → mobile → launch.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <ol className="space-y-1.5 text-sm">
          {STEPS.map((s, i) => (
            <li key={s.id} className="flex items-center gap-3 rounded border border-white/10 bg-black/20 p-2">
              <span className="font-mono text-xs text-sky-300">{i + 1}.</span>
              <span className="w-28 text-xs uppercase tracking-wide text-muted-foreground">{s.phase}</span>
              <span>{s.item}</span>
            </li>
          ))}
        </ol>
      </Card>
    </V3Page>
  ),
});
