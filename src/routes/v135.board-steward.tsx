import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V135Page } from "@/components/v135/V135Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v135/ui-bits";
import * as H from "@/v135/hooks";

function Page() {
  const b = H.useV135BoardStewardship();
  return (
    <V135Page icon={<FileBarChart className="size-6 text-fuchsia-300" />} title="Board Capital Stewardship" blurb="Board minutes, capital reviews, and decision audit log.">
      <ScoreCard label="Board stewardship score" value={b.score} tone="violet" />
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={b.log as any} columns={[
          { key: "entry", label: "Entry" }, { key: "owner", label: "Owner" }, { key: "status", label: "Status" },
        ]} />
      </Card>
    </V135Page>
  );
}

export const Route = createFileRoute("/v135/board-steward")({
  head: () => ({ meta: [{ title: "Board Stewardship · V13.5" }] }),
  component: Page,
});
