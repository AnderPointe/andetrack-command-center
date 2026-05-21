import { createFileRoute } from "@tanstack/react-router";
import { Globe } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CUSTOMER_SHIPMENTS } from "@/v15/data/mockPhase16";

export const Route = createFileRoute("/v15/portal")({
  head: () => ({ meta: [{ title: "V1.5 Customer Portal · Anderoute" }] }),
  component: Page,
});

const winTone: Record<string, string> = {
  on_track: "border-emerald-500/30 text-emerald-300",
  watch:    "border-sky-500/30 text-sky-300",
  at_risk:  "border-amber-500/30 text-amber-300",
  late:     "border-rose-500/30 text-rose-300",
};

const statusTone: Record<string, string> = {
  scheduled:  "border-white/15 text-muted-foreground",
  in_transit: "border-sky-500/30 text-sky-300",
  delayed:    "border-amber-500/30 text-amber-300",
  delivered:  "border-emerald-500/30 text-emerald-300",
};

function Page() {
  return (
    <V15Page
      icon={<Globe className="size-6 text-cyan-300" />}
      title="Customer Tracking V1.5"
      blurb="Better tracking map, ETA change notice, delivery window status, shipment timeline, POD viewer, and a contact-dispatch button when the delivery slips."
    >
      <div className="grid gap-3 md:grid-cols-2">
        {CUSTOMER_SHIPMENTS.map((s) => (
          <Card key={s.id} className="border-white/10 bg-white/[0.02] p-4 text-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-mono text-xs text-muted-foreground">{s.id}</div>
                <div className="font-medium">{s.customer}</div>
              </div>
              <Badge variant="outline" className={statusTone[s.status]}>{s.status.replace("_", " ")}</Badge>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">ETA {s.etaAt}</span>
              <Badge variant="outline" className={winTone[s.windowStatus]}>{s.windowStatus.replace("_", " ")}</Badge>
            </div>
            {s.driftMin > 0 && (
              <div className="mt-1 text-xs text-amber-200/90">+{s.driftMin}m later than committed window</div>
            )}
            {s.podReady && (
              <div className="mt-1 text-xs text-emerald-300">POD ready to view</div>
            )}
          </Card>
        ))}
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4 text-sm text-muted-foreground">
        <h2 className="font-semibold text-foreground">Components</h2>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["CustomerTrackingV15", "CustomerETAUpdateNotice", "DeliveryWindowStatusCard", "CustomerShipmentTimelineV15", "CustomerPODViewerV15"].map((c) => (
            <Badge key={c} variant="outline" className="border-white/15 text-xs">{c}</Badge>
          ))}
        </div>
      </Card>
    </V15Page>
  );
}
