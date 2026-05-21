import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { REPORTS_V4 } from "@/v4/data/mockPhase21";

export const Route = createFileRoute("/v4/reports")({
  head: () => ({ meta: [{ title: "V4 Reports · Anderoute" }] }),
  component: () => {
    const byCat = REPORTS_V4.reduce<Record<string, typeof REPORTS_V4>>((acc, r) => {
      (acc[r.cat] ??= [] as typeof REPORTS_V4).push(r); return acc;
    }, {});
    return (
      <V4Page icon={<FileBarChart className="size-6 text-sky-300" />} title="V4 Advanced Reports"
        blurb="Enterprise launch, integrations, marketplace, network coverage, mobile cert, support, governance, ops intelligence, and revenue reports.">
        {Object.entries(byCat).map(([cat, items]) => (
          <Card key={cat} className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">{cat}</h3>
            <div className="mt-2 grid gap-2 md:grid-cols-2 text-sm">
              {items.map(r => (
                <div key={r.name} className="flex items-center justify-between rounded border border-white/10 bg-black/20 p-2">
                  <div>
                    <div className="font-medium">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.formats.join(" · ")} · {r.schedule}</div>
                  </div>
                  <Badge variant="outline" className="border-white/15 text-[10px]">{r.schedule}</Badge>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </V4Page>
    );
  },
});
