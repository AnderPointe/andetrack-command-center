import { createFileRoute } from "@tanstack/react-router";
import { Award } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { SimpleTable, StatusPill } from "@/components/v45/ui-bits";
import { CARRIER_QUALITY } from "@/v45/data/mockPhase22";

export const Route = createFileRoute("/v45/carrier-quality")({
  head: () => ({ meta: [{ title: "Carrier Quality · Anderoute" }] }),
  component: () => (
    <V45Page icon={<Award className="size-6 text-violet-300" />} title="Carrier Quality Operations"
      blurb="Preferred carriers, watchlist, suspension risk and quality trends. Suspensions require human approval — never automatic.">
      <SimpleTable rows={CARRIER_QUALITY} columns={[
        { key: "name", label: "Carrier" },
        { key: "perf", label: "Perf", render: r => `${r.perf}` },
        { key: "compliance", label: "Compliance" },
        { key: "on_time", label: "On-time" },
        { key: "comm", label: "Comm" },
        { key: "pod", label: "POD" },
        { key: "issues", label: "Issues" },
        { key: "disputes", label: "Disputes" },
        { key: "status", label: "Status", render: r => <StatusPill status={r.status} /> },
      ]} />
    </V45Page>
  ),
});
