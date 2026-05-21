import { createFileRoute } from "@tanstack/react-router";
import { Plug } from "lucide-react";
import { V7Page } from "@/components/v7/V7Page";
import { SimpleTable, StatusPill, ScoreCard } from "@/components/v7/ui-bits";
import { Card } from "@/components/ui/card";
import { useGlobalPartnerEcosystem } from "@/v7/hooks";

export const Route = createFileRoute("/v7/partner-ecosystem")({
  head: () => ({ meta: [{ title: "Partner Ecosystem · V7 · Anderoute" }] }),
  component: () => {
    const { partners } = useGlobalPartnerEcosystem();
    const active = partners.filter(p => p.status === "active").length;
    return (
      <V7Page icon={<Plug className="size-6 text-indigo-300" />} title="Global Partner Ecosystem"
        blurb="Telematics, carrier networks, accounting, EDI, fuel, insurance, hardware, mobile ecosystem, AI providers, map/routing. Tracks region, status, risk.">
        <div className="grid gap-3 md:grid-cols-3">
          <ScoreCard label="Active partners"     value={Math.round((active / partners.length) * 100)} tone="emerald" />
          <ScoreCard label="Coverage breadth"    value={88}                                            tone="sky" />
          <ScoreCard label="Risk concentration"  value={Math.round((partners.filter(p => p.risk === "medium" || p.risk === "high").length / partners.length) * 100)} tone="amber" />
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={partners as any} columns={[
            { key: "partner",  label: "Partner" },
            { key: "category", label: "Category" },
            { key: "region",   label: "Region" },
            { key: "status",   label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
            { key: "risk",     label: "Risk",   render: (r: any) => <StatusPill status={r.risk} /> },
          ]} />
        </Card>
      </V7Page>
    );
  },
});
