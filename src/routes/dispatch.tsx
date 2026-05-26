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
      <div className="p-4 md:p-6">
        <div className="dispatch-canvas space-y-5">
          <div className="glass-panel p-5">
            <h1 className="text-2xl font-semibold tracking-tight">Live Dispatch</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Drag and drop drivers between status columns as conditions change.
            </p>
          </div>

          <div className="glass-panel p-2">
            <LiveMapPanel className="h-[380px] !border-0 !shadow-none !bg-transparent" onSelectDriver={setSelected} selectedId={selected?.id} />
          </div>

          <div className="glass-panel p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Status Board</h2>
              <span className="text-xs text-muted-foreground">Scroll horizontally to view all columns</span>
            </div>
            <DispatchStatusBoard />
          </div>

          <div className="glass-panel">
            <AlertsPanel limit={4} />
          </div>
        </div>
      </div>
      <DriverProfileDrawer driver={selected} onClose={() => setSelected(null)} />
    </AppShell>
  );
}
