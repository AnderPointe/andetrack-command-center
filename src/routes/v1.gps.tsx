import { createFileRoute } from "@tanstack/react-router";
import { Satellite } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { Card } from "@/components/ui/card";
import { GPS_RELIABILITY } from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/gps")({
  head: () => ({ meta: [{ title: "GPS Reliability · Anderoute" }] }),
  component: Page,
});

function Page() {
  return (
    <V1Page
      icon={<Satellite className="size-6 text-indigo-300" />}
      title="GPS & Realtime Reliability"
      blurb="Update frequency, stale rate, accuracy, realtime disconnects, and offline queue depth."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="grid gap-2 md:grid-cols-3">
          {GPS_RELIABILITY.map((m) => (
            <div key={m.id} className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="text-xs text-muted-foreground">{m.label}</div>
              <div className="mt-1 text-lg font-semibold">{m.value}</div>
            </div>
          ))}
        </div>
      </Card>
    </V1Page>
  );
}
