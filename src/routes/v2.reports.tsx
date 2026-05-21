import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V2Page } from "@/components/v2/V2Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { REPORTS, REPORT_FILTERS, REPORT_EXPORTS } from "@/v2/data/mockPhase17";

export const Route = createFileRoute("/v2/reports")({
  head: () => ({ meta: [{ title: "Advanced Reports · Anderoute" }] }),
  component: Page,
});

function Page() {
  const owners = Array.from(new Set(REPORTS.map((r) => r.owner)));
  return (
    <V2Page
      icon={<FileBarChart className="size-6 text-violet-300" />}
      title="Advanced Reporting V2"
      blurb="16 operational reports across ops, fleet, account management, finance, integrations, tech, and product. Filter, save, and export — scheduled delivery lands in V2.5."
    >
      {owners.map((o) => (
        <Card key={o} className="border-white/10 bg-white/[0.02] p-4">
          <h2 className="text-sm font-semibold">{o}</h2>
          <div className="mt-3 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {REPORTS.filter((r) => r.owner === o).map((r) => (
              <div key={r.key} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
                <div>
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs text-muted-foreground font-mono">{r.key}</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Button size="sm" variant="outline" className="h-7 text-xs">Run</Button>
                  <Button size="sm" variant="ghost" className="h-7 text-xs">Export</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}

      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4 text-sm">
          <h2 className="font-semibold">Filters available</h2>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {REPORT_FILTERS.map((f) => <Badge key={f} variant="outline" className="border-white/15">{f}</Badge>)}
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4 text-sm">
          <h2 className="font-semibold">Export formats</h2>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {REPORT_EXPORTS.map((f) => <Badge key={f} variant="outline" className="border-white/15">{f}</Badge>)}
          </div>
        </Card>
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4 text-sm text-muted-foreground">
        <Badge variant="outline" className="border-white/15 text-muted-foreground">V2.5</Badge>{" "}
        Scheduled report delivery and report-as-an-API are deferred to V2.5.
      </Card>
    </V2Page>
  );
}
