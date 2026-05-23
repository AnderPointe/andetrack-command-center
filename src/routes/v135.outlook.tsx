import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { V135Page } from "@/components/v135/V135Page";
import { Card } from "@/components/ui/card";
import { SimpleTable } from "@/components/v135/ui-bits";
import * as H from "@/v135/hooks";

function Page() {
  const rows = H.useV135RevOutlook();
  return (
    <V135Page icon={<TrendingUp className="size-6 text-fuchsia-300" />} title="8-Quarter Revenue Outlook" blurb="Long-horizon base / upside / downside placeholders. Confidence is intentionally low — not a forecast claim.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={rows as any} columns={[
          { key: "q", label: "Q" },
          { key: "base_usd_m", label: "Base ($M)" },
          { key: "upside_usd_m", label: "Upside ($M)" },
          { key: "downside_usd_m", label: "Downside ($M)" },
          { key: "confidence", label: "Confidence" },
        ]} />
      </Card>
    </V135Page>
  );
}

export const Route = createFileRoute("/v135/outlook")({
  head: () => ({ meta: [{ title: "Revenue Outlook · V13.5" }] }),
  component: Page,
});
