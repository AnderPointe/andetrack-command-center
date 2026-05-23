import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V145Page } from "@/components/v145/V145Page";
import { Section, SimpleTable, ScoreCard } from "@/components/v145/ui-bits";
import * as H from "@/v145/hooks";

function Page() {
  const c = H.useMarketplaceScaleControls();
  const watch = c.filter(x => x.status === "watch").length;
  return (
    <V145Page icon={<ShieldCheck className="size-6 text-fuchsia-300" />} title="Marketplace Scale Control Framework" blurb="Control domains for coverage, quality, compliance, liquidity, fees, disputes, settlement, unit economics and concentration.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Control domains" value={c.length} tone="violet" />
        <ScoreCard label="Watch status" value={watch} tone="amber" />
        <ScoreCard label="Owners assigned" value={new Set(c.map(x => x.owner)).size} tone="emerald" />
      </div>
      <Section title="MarketplaceScaleControlMatrix">
        <SimpleTable rows={c as any} columns={[
          { key: "domain", label: "Domain" }, { key: "owner", label: "Owner" },
          { key: "last_tested", label: "Last tested" }, { key: "status", label: "Status" },
        ]} />
      </Section>
    </V145Page>
  );
}

export const Route = createFileRoute("/v145/mp-controls")({ head: () => ({ meta: [{ title: "MP Controls · V14.5" }] }), component: Page });
