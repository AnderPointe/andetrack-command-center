import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { LiveMapPanel } from "@/components/map/LiveMapPanel";
import { DispatchStatusBoard } from "@/components/dispatch/DispatchStatusBoard";
import { DriverProfileDrawer } from "@/components/drivers/DriverProfileDrawer";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { RealtimeEventFeed } from "@/components/realtime/RealtimeEventFeed";
import { DriverLiveStatePanel } from "@/components/realtime/DriverLiveStatePanel";
import { useDispatchMapRealtime } from "@/hooks/useDispatchMapRealtime";
import { useCurrentCompany } from "@/hooks/useCurrentCompany";
import type { Driver } from "@/types";
import type { DriverLiveState } from "@/types/location";
import type { RealtimeEvent } from "@/types/realtime";
import { mockRealtimeFeed } from "@/data/mockRealtimeEvents";

export const Route = createFileRoute("/dispatch")({
  head: () => ({
    meta: [
      { title: "Live Dispatch — Anderoute" },
      { name: "description", content: "Real-time driver status board and live fleet map for active dispatch operations." },
    ],
  }),
  component: DispatchPage,
});

function DispatchPage() {
  const [selected, setSelected] = useState<Driver | null>(null);
  const [liveSelected, setLiveSelected] = useState<DriverLiveState | null>(null);
  const { companyId } = useCurrentCompany();
  const { recentLocation, recentStatus, alerts } = useDispatchMapRealtime(companyId);

  const feed: RealtimeEvent[] = [
    ...recentStatus.slice(0, 8).map<RealtimeEvent>((s) => ({ kind: "status", payload: s })),
    ...recentLocation.slice(0, 8).map<RealtimeEvent>((l) => ({ kind: "location", payload: l })),
    ...alerts.slice(0, 4).map<RealtimeEvent>((a) => ({ kind: "alert", payload: a })),
  ];
  const events = feed.length ? feed : mockRealtimeFeed;

  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Live Dispatch</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Live driver telemetry · realtime status & GPS · drag drivers between status columns.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <LiveMapPanel
            className="h-[380px]"
            onSelectDriver={setSelected}
            selectedId={selected?.id}
            companyId={companyId}
            onSelectLiveDriver={setLiveSelected}
          />
          <div className="space-y-3">
            {liveSelected ? (
              <DriverLiveStatePanel state={liveSelected} onClose={() => setLiveSelected(null)} />
            ) : (
              <div className="rounded-2xl border border-border bg-card p-4">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Realtime feed
                </div>
                <RealtimeEventFeed events={events} />
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Status Board</h2>
            <span className="text-xs text-muted-foreground">Scroll horizontally to view all columns</span>
          </div>
          <DispatchStatusBoard />
        </div>

        <AlertsPanel limit={4} />
      </div>
      <DriverProfileDrawer driver={selected} onClose={() => setSelected(null)} />
    </AppShell>
  );
}
