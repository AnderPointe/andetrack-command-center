import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V23Page } from "@/components/v23/V23Page";
import { Section, SimpleTable } from "@/components/v23/ui-bits";
import * as H from "@/v23/hooks";
function Page() {
  const s = H.useV23Scope();
  return (
    <V23Page icon={<Layers className="size-6 text-emerald-300" />} title="V23 Scope" blurb="21 trust automation centers + roadmap + reports. Autonomous high-impact actions remain deferred.">
      <Section title="In scope"><ul className="grid gap-1 text-sm md:grid-cols-2">{s.in_scope.map((x, i) => <li key={i}>• {x}</li>)}</ul></Section>
      <Section title="Deferred"><ul className="space-y-1 text-sm text-muted-foreground">{s.deferred.map((x, i) => <li key={i}>• {x}</li>)}</ul></Section>
      <Section title="Feature matrix"><SimpleTable rows={H.useV23FeatureMatrix() as any} columns={[{ key: "feature", label: "Feature" }, { key: "status", label: "Status" }, { key: "hitl", label: "HITL" }]} /></Section>
    </V23Page>
  );
}
export const Route = createFileRoute("/v23/scope")({ component: Page });
