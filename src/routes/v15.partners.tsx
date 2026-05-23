import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { ScoreCard, Section, SimpleTable, StatusPill } from "@/components/v15/ui-bits";
import * as H from "@/v15/hooks";

function Page() {
  const p = H.usePartnerEcosystemPerformance();
  return (
    <V15Page icon={<Network className="size-6 text-cyan-300" />} title="Partner Ecosystem Performance Center" blurb="Partner pipeline, joint customers, integration health, enablement, support burden, value evidence, risk, expansion.">
      <ScoreCard label="Partner ecosystem performance" value={p.score} tone="emerald" />
      <Section title="Partners">
        <SimpleTable rows={p.partners as any} columns={[
          { key: "partner", label: "Partner" }, { key: "owner", label: "Owner" }, { key: "category", label: "Cat" },
          { key: "sourced", label: "Sourced" }, { key: "influenced", label: "Influenced" },
          { key: "health", label: "Health", render: (r: any) => <StatusPill status={r.health} /> },
          { key: "campaign", label: "Campaign", render: (r: any) => <StatusPill status={r.campaign} /> },
          { key: "enablement", label: "Enable" }, { key: "support", label: "Support" },
          { key: "evidence", label: "Evidence", render: (r: any) => <StatusPill status={r.evidence} /> },
          { key: "risk", label: "Risk", render: (r: any) => <StatusPill status={r.risk} /> },
          { key: "next", label: "Next" },
        ]} />
      </Section>
    </V15Page>
  );
}

export const Route = createFileRoute("/v15/partners")({
  head: () => ({ meta: [{ title: "Partner Performance · V15" }] }),
  component: Page,
});
