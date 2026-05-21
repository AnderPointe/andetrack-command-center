import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V5Page } from "@/components/v5/V5Page";
import { SimpleTable, StatusPill } from "@/components/v5/ui-bits";
import { Card } from "@/components/ui/card";
import { LANES } from "@/v5/data/mockPhase23";

export const Route = createFileRoute("/v5/lane-coverage")({
  head: () => ({ meta: [{ title: "Lane Coverage · Anderoute V5" }] }),
  component: () => (
    <V5Page icon={<Map className="size-6 text-fuchsia-300" />} title="National Lane Coverage Intelligence"
      blurb="Per-lane coverage, average bid count, time to cover, and risk + expansion recommendations.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Lanes</h3>
        <div className="mt-2">
          <SimpleTable rows={LANES} columns={[
            { key: "origin",      label: "Origin" },
            { key: "dest",        label: "Dest" },
            { key: "volume",      label: "Vol" },
            { key: "coverage",    label: "Cov %", render: r => `${r.coverage}%` },
            { key: "avg_bids",    label: "Avg bids" },
            { key: "avg_cover_h", label: "Avg cov (h)" },
            { key: "risk",        label: "Risk", render: r => <StatusPill status={r.risk} /> },
            { key: "expansion",   label: "Expansion" },
          ]} />
        </div>
      </Card>
    </V5Page>
  ),
});
