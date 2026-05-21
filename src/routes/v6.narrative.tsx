import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { V6Page } from "@/components/v6/V6Page";
import { SimpleTable, StatusPill } from "@/components/v6/ui-bits";
import { Card } from "@/components/ui/card";
import { useCategoryNarrativeMarketEducation } from "@/v6/hooks";

export const Route = createFileRoute("/v6/narrative")({
  head: () => ({ meta: [{ title: "Category Narrative · V6" }] }),
  component: () => {
    const { assets } = useCategoryNarrativeMarketEducation();
    return (
      <V6Page icon={<BookOpen className="size-6 text-emerald-300" />} title="Category Narrative and Market Education"
        blurb="Narrative, market problem, why now, executive one-pager, customer/partner/marketplace/AI ops/compliance proof libraries, competitive battlecards, demo narrative, sales enablement.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={assets} columns={[
            { key: "asset",  label: "Asset" },
            { key: "status", label: "Status", render: (r) => <StatusPill status={r.status} /> },
          ]} />
        </Card>
      </V6Page>
    );
  },
});
