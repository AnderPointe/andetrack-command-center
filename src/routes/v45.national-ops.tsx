import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { SimpleTable, StatusPill, KpiGrid } from "@/components/v45/ui-bits";
import { Card } from "@/components/ui/card";
import { NATIONAL_REGIONS, NATIONAL_ALERTS } from "@/v45/data/mockPhase22";

export const Route = createFileRoute("/v45/national-ops")({
  head: () => ({ meta: [{ title: "National Ops Model · Anderoute" }] }),
  component: () => {
    const owned = NATIONAL_REGIONS.filter(r => r.owner !== "—").length;
    const totalDrivers = NATIONAL_REGIONS.reduce((a, r) => a + r.drivers, 0);
    const totalVehicles = NATIONAL_REGIONS.reduce((a, r) => a + r.vehicles, 0);
    const totalLoads = NATIONAL_REGIONS.reduce((a, r) => a + r.load_vol, 0);
    return (
      <V45Page icon={<Map className="size-6 text-violet-300" />} title="National Operating Model"
        blurb="Regional owners, dispatch/carrier capacity, customer density, load volume, driver/vehicle coverage, support and marketplace coverage.">
        <KpiGrid cols={5} items={[
          { label: "Regions", value: NATIONAL_REGIONS.length },
          { label: "Owned regions", value: `${owned}/${NATIONAL_REGIONS.length}` },
          { label: "Drivers", value: totalDrivers.toLocaleString() },
          { label: "Vehicles", value: totalVehicles.toLocaleString() },
          { label: "Loads / wk", value: totalLoads.toLocaleString() },
        ]} />

        <Card className="border-rose-400/30 bg-rose-500/5 p-4">
          <h3 className="text-sm font-semibold text-rose-200">Regional alerts ({NATIONAL_ALERTS.length})</h3>
          <div className="mt-2">
            <SimpleTable rows={NATIONAL_ALERTS} columns={[
              { key: "region", label: "Region" },
              { key: "severity", label: "Severity", render: r => <StatusPill status={r.severity} /> },
              { key: "issue", label: "Issue" },
              { key: "action", label: "Action" },
            ]} />
          </div>
        </Card>

        <SimpleTable rows={NATIONAL_REGIONS} columns={[
          { key: "region", label: "Region" },
          { key: "owner", label: "Owner", render: r => r.owner === "—" ? <StatusPill status="needs owner" /> : r.owner },
          { key: "dispatch_cap", label: "Dispatch cap" },
          { key: "carrier_cap", label: "Carrier cap" },
          { key: "customers", label: "Customers" },
          { key: "load_vol", label: "Load vol" },
          { key: "drivers", label: "Drivers" },
          { key: "vehicles", label: "Vehicles" },
          { key: "support", label: "Support" },
          { key: "marketplace", label: "MP" },
          { key: "perf", label: "Perf" },
        ]} />
      </V45Page>
    );
  },
});
