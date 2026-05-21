import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { Card } from "@/components/ui/card";
import { PLAYBOOK_LIBRARY } from "@/v45/data/mockPhase22";

export const Route = createFileRoute("/v45/playbooks")({
  head: () => ({ meta: [{ title: "Playbook Library · Anderoute" }] }),
  component: () => (
    <V45Page icon={<BookOpen className="size-6 text-violet-300" />} title="Operational Playbook Library"
      blurb="13 categories covering dispatch, drivers, support, marketplace, carriers, integrations, billing, compliance, IR, mobile, EDI, API, and partners. Each playbook has owner, checklist, and review schedule.">
      <div className="grid gap-3 md:grid-cols-4">
        {PLAYBOOK_LIBRARY.map(p => (
          <Card key={p.category} className="border-white/10 bg-white/[0.02] p-4">
            <div className="text-sm font-semibold">{p.category}</div>
            <div className="mt-1 text-2xl font-semibold">{p.count}</div>
            <div className="text-[10px] text-muted-foreground">playbooks</div>
          </Card>
        ))}
      </div>
    </V45Page>
  ),
});
