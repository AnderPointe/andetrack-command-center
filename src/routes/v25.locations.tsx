import { createFileRoute } from "@tanstack/react-router";
import { MapPinned } from "lucide-react";
import { V25Page } from "@/components/v25/V25Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { COMPANY_LOCATIONS, REGION_PERFORMANCE } from "@/v25/data/mockPhase18";

export const Route = createFileRoute("/v25/locations")({
  head: () => ({ meta: [{ title: "Multi-location Operations · Anderoute" }] }),
  component: () => (
    <V25Page icon={<MapPinned className="size-6 text-emerald-300" />} title="Multi-location Operations" blurb="Headquarters, yards, terminals, warehouses, customer sites, and service regions. Scoped dispatch views per location.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Company locations</h2>
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-2">Name</th><th className="p-2">Type</th><th className="p-2">City</th><th className="p-2">Timezone</th><th className="p-2">Drivers</th><th className="p-2">Active</th></tr></thead>
          <tbody>
            {COMPANY_LOCATIONS.map((l) => (
              <tr key={l.id} className="border-t border-white/10"><td className="p-2">{l.name}</td><td className="p-2"><Badge variant="outline" className="border-sky-500/30 text-sky-300">{l.type}</Badge></td><td className="p-2 text-xs">{l.city}</td><td className="p-2 text-xs text-muted-foreground">{l.timezone}</td><td className="p-2 font-mono text-xs">{l.drivers}</td><td className="p-2">{l.active ? "✓" : "—"}</td></tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Region performance</h2>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {REGION_PERFORMANCE.map((r) => (
            <div key={r.region} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
              <div className="flex items-center justify-between"><div className="font-medium">{r.region}</div><Badge variant="outline" className="border-emerald-500/30 text-emerald-300">{r.onTime}% on-time</Badge></div>
              <div className="mt-1 text-xs text-muted-foreground">Util {r.util}% · at-risk {r.atRisk}</div>
            </div>
          ))}
        </div>
      </Card>
    </V25Page>
  ),
});
