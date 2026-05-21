import { createFileRoute } from "@tanstack/react-router";
import { Users2 } from "lucide-react";
import { V3Page } from "@/components/v3/V3Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CARRIER_PROFILES } from "@/v3/data/mockPhase19";

export const Route = createFileRoute("/v3/carrier-profiles")({
  head: () => ({ meta: [{ title: "Carrier Profiles · Anderoute V3" }] }),
  component: () => (
    <V3Page icon={<Users2 className="size-6 text-sky-300" />} title="Carrier Profiles"
      blurb="Carrier identity, equipment, service regions, and performance score. Onboarding wizard is scaffold-only.">
      <div className="grid gap-3 md:grid-cols-3">
        {CARRIER_PROFILES.map((c) => (
          <Card key={c.id} className="border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center justify-between"><h3 className="text-sm font-semibold">{c.name}</h3><Badge variant="outline" className="border-sky-500/40 text-sky-300">{c.score}</Badge></div>
            <p className="mt-1 text-xs text-muted-foreground">Equipment: {c.equipment.join(", ")}</p>
            <p className="text-xs text-muted-foreground">Regions: {c.regions.join(", ")}</p>
            <Badge variant="outline" className={c.compliance === "ok" ? "mt-2 border-emerald-500/40 text-emerald-300" : "mt-2 border-amber-500/40 text-amber-300"}>compliance: {c.compliance}</Badge>
          </Card>
        ))}
      </div>
    </V3Page>
  ),
});
