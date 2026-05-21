import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { SimpleTable } from "@/components/v45/ui-bits";
import { NATIONAL_REGIONS } from "@/v45/data/mockPhase22";

export const Route = createFileRoute("/v45/national-ops")({
  head: () => ({ meta: [{ title: "National Ops Model · Anderoute" }] }),
  component: () => (
    <V45Page icon={<Map className="size-6 text-violet-300" />} title="National Operating Model"
      blurb="Regional owners, dispatch/carrier capacity, customer density, load volume, driver/vehicle coverage, support and marketplace coverage.">
      <SimpleTable rows={NATIONAL_REGIONS} columns={[
        { key: "region", label: "Region" },
        { key: "owner", label: "Owner" },
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
  ),
});
