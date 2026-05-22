import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V115Page } from "@/components/v115/V115Page";
import { Card } from "@/components/ui/card";
import { SimpleTable } from "@/components/v115/ui-bits";
import * as H from "@/v115/hooks";

function Page() {
  const r = H.useLongTermRevenueRoadmap();
  return (
    <V115Page icon={<Map className="size-6 text-emerald-300" />} title="Long-Term Revenue Strategy Roadmap" blurb="12-quarter optimization horizon. No autonomous discounting or deal closure.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={r.items as any} columns={[
          { key: "quarter", label: "Quarter" },
          { key: "theme",   label: "Theme" },
        ]} />
      </Card>
    </V115Page>
  );
}

export const Route = createFileRoute("/v115/roadmap")({
  head: () => ({ meta: [{ title: "Revenue Roadmap · V11.5" }] }),
  component: Page,
});
