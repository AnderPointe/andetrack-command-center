import { createFileRoute } from "@tanstack/react-router";
import { Globe } from "lucide-react";
import { V11Page } from "@/components/v11/V11Page";
import { StatTile } from "@/components/v1/StatTile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PORTAL_FEATURES } from "@/v11/data/mockPhase15";

export const Route = createFileRoute("/v11/portal")({
  head: () => ({ meta: [{ title: "V1.1 Customer Portal · Anderoute" }] }),
  component: Page,
});

function Page() {
  const done = PORTAL_FEATURES.filter((p) => p.done).length;
  const pct = Math.round((done / PORTAL_FEATURES.length) * 100);
  return (
    <V11Page
      icon={<Globe className="size-6 text-fuchsia-300" />}
      title="Customer Portal V1.1"
      blurb="Shipment timeline, live ETA, breadcrumb map, POD viewer, filters, history. Each item is a self-serve win for customers."
    >
      <div className="grid gap-3 md:grid-cols-3">
        <StatTile label="Portal features" value={`${done}/${PORTAL_FEATURES.length}`} tone={pct >= 80 ? "good" : "warn"} />
        <StatTile label="Completion" value={`${pct}%`} tone={pct >= 80 ? "good" : "warn"} />
        <StatTile label="Open items" value={PORTAL_FEATURES.length - done} tone={done < PORTAL_FEATURES.length ? "warn" : "good"} />
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Feature checklist</h2>
        <div className="mt-3 space-y-2 text-sm">
          {PORTAL_FEATURES.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2">
              <span>{p.label}</span>
              <Badge variant="outline" className={p.done ? "border-emerald-500/30 text-emerald-300" : "border-amber-500/30 text-amber-300"}>
                {p.done ? "Done" : "Open"}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </V11Page>
  );
}
