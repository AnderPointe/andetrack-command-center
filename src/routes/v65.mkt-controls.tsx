import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { V65Page } from "@/components/v65/V65Page";
import { SimpleTable } from "@/components/v65/ui-bits";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMarketplaceOperatingControls } from "@/v65/hooks";

export const Route = createFileRoute("/v65/mkt-controls")({
  head: () => ({ meta: [{ title: "Marketplace Controls · V6.5 · Anderoute" }] }),
  component: () => {
    const { rules } = useMarketplaceOperatingControls();
    return (
      <V65Page icon={<Lock className="size-6 text-cyan-300" />} title="Marketplace Operating Controls"
        blurb="Carrier verification, compliance documents, watchlists, suspensions, award approval, settlement approval, dispute hold, trust + safety, fraud placeholder, quality review, fee audit.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={rules} columns={[
            { key: "rule",          label: "Rule" },
            { key: "enabled",       label: "Enabled",
              render: (r) => <Badge variant="outline" className={r.enabled ? "border-emerald-400/40 text-emerald-200" : "border-rose-400/40 text-rose-200"}>{r.enabled ? "on" : "off"}</Badge> },
            { key: "blocked_today", label: "Blocked today" },
          ]} />
        </Card>
      </V65Page>
    );
  },
});
