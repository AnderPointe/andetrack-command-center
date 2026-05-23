import { createFileRoute } from "@tanstack/react-router";
import { Stamp } from "lucide-react";
import { V135Page } from "@/components/v135/V135Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v135/ui-bits";
import * as H from "@/v135/hooks";

function Page() {
  const e = H.useV135ExecStewardship();
  return (
    <V135Page icon={<Stamp className="size-6 text-fuchsia-300" />} title="Executive Value Stewardship" blurb="Stewardship log entries with owner and status.">
      <ScoreCard label="Stewardship score" value={e.score} tone="amber" />
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={e.log as any} columns={[
          { key: "entry", label: "Entry" }, { key: "owner", label: "Owner" }, { key: "status", label: "Status" },
        ]} />
      </Card>
    </V135Page>
  );
}

export const Route = createFileRoute("/v135/exec-steward")({
  head: () => ({ meta: [{ title: "Exec Stewardship · V13.5" }] }),
  component: Page,
});
