import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { LiveMapPanel } from "@/components/map/LiveMapPanel";
import { DispatchStatusBoard } from "@/components/dispatch/DispatchStatusBoard";
import { DriverProfileDrawer } from "@/components/drivers/DriverProfileDrawer";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import type { Driver } from "@/types";

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
  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Live Dispatch</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Drag and drop drivers between status columns as conditions change.
          </p>
        </div>

        <LiveMapPanel className="h-[380px]" onSelectDriver={setSelected} selectedId={selected?.id} />

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
