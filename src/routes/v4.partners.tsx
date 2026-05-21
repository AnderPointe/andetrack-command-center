import { createFileRoute } from "@tanstack/react-router";
import { Handshake } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PARTNER_LAUNCHES } from "@/v4/data/mockPhase21";

const STAGES = ["Identified","Contacted","Discovery","Technical Review","Security Review","Commercial Review","Pilot","Launch Ready","Live","Expansion"];
const TONE: Record<string,string> = { Live: "border-emerald-400/40 text-emerald-300", Expansion: "border-emerald-400/40 text-emerald-300", Pilot: "border-sky-400/40 text-sky-300" };

export const Route = createFileRoute("/v4/partners")({
  head: () => ({ meta: [{ title: "Partner Launches · Anderoute" }] }),
  component: () => {
    const counts = STAGES.map(s => ({ stage: s, count: PARTNER_LAUNCHES.filter(p => p.stage === s).length }));
    return (
      <V4Page icon={<Handshake className="size-6 text-sky-300" />} title="Strategic Partner Launch Tracker"
        blurb="Pipeline view of carrier, telematics, broker, shipper, API, EDI, billing, support and hardware partners.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Stage distribution</h3>
          <div className="mt-2 grid grid-cols-5 md:grid-cols-10 gap-1 text-center text-[10px]">
            {counts.map(s => (
              <div key={s.stage} className="rounded border border-white/10 bg-black/20 p-1">
                <div className="text-muted-foreground truncate" title={s.stage}>{s.stage}</div>
                <div className="text-base font-semibold">{s.count}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">All partners</h3>
          <div className="mt-2 grid gap-1 text-sm">
            {PARTNER_LAUNCHES.map(p => (
              <div key={p.id} className="flex items-center justify-between rounded border border-white/10 bg-black/20 p-2">
                <div><div className="font-medium">{p.name}</div><div className="text-xs text-muted-foreground">{p.type} · {p.owner}</div></div>
                <Badge variant="outline" className={TONE[p.stage] ?? "border-white/15"}>{p.stage}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </V4Page>
    );
  },
});
