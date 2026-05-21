import { createFileRoute } from "@tanstack/react-router";
import { Swords } from "lucide-react";
import { V5Page } from "@/components/v5/V5Page";
import { SimpleTable, StatusPill } from "@/components/v5/ui-bits";
import { Card } from "@/components/ui/card";
import { COMPETITORS, WIN_LOSS } from "@/v5/data/mockPhase23";

export const Route = createFileRoute("/v5/competitive")({
  head: () => ({ meta: [{ title: "Competitive Intelligence · Anderoute V5" }] }),
  component: () => (
    <V5Page icon={<Swords className="size-6 text-fuchsia-300" />} title="Competitive Intelligence"
      blurb="Battlecards and win/loss notes — internal only. Pricing remains a placeholder.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Competitor profiles</h3>
        <div className="mt-2">
          <SimpleTable rows={COMPETITORS} columns={[
            { key: "name",        label: "Competitor" },
            { key: "category",    label: "Category" },
            { key: "strengths",   label: "Strengths" },
            { key: "weaknesses",  label: "Weaknesses" },
            { key: "mobile",      label: "Mobile",     render: r => <StatusPill status={r.mobile} /> },
            { key: "ai",          label: "AI",         render: r => <StatusPill status={r.ai} /> },
            { key: "marketplace", label: "MP",         render: r => <StatusPill status={r.marketplace} /> },
            { key: "enterprise",  label: "Enterprise", render: r => <StatusPill status={r.enterprise} /> },
          ]} />
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Win / loss</h3>
        <div className="mt-2">
          <SimpleTable rows={WIN_LOSS} columns={[
            { key: "quarter",         label: "Quarter" },
            { key: "won",             label: "Won" },
            { key: "lost",            label: "Lost" },
            { key: "top_reason_win",  label: "Top win reason" },
            { key: "top_reason_loss", label: "Top loss reason" },
          ]} />
        </div>
      </Card>
    </V5Page>
  ),
});
