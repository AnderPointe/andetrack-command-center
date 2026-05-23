import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V155Page } from "@/components/v155/V155Page";
import { Section, SimpleTable, StatusPill } from "@/components/v155/ui-bits";
import * as H from "@/v155/hooks";

function Page() {
  const o = H.useV155Outcomes();
  return (
    <V155Page icon={<Activity className="size-6 text-fuchsia-300" />}
      title="Recommendation Outcome Tracking"
      blurb="Predicted vs realized lift per closed recommendation. Underperformers feed back into bias / drift monitoring.">
      <Section title="Outcomes">
        <SimpleTable rows={o as any} columns={[
          { key: "rec_id", label: "Rec" },
          { key: "predicted", label: "Predicted" },
          { key: "realized", label: "Realized" },
          { key: "delta", label: "Delta" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status === "on_track" ? "healthy" : r.status === "watchlist" ? "watchlist" : "in_progress"} /> },
        ]} />
      </Section>
    </V155Page>
  );
}
export const Route = createFileRoute("/v155/outcomes")({ component: Page });
