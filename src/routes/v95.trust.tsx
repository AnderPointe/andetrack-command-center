import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V95Page } from "@/components/v95/V95Page";
import { Card } from "@/components/ui/card";
import { SimpleTable, StatusPill } from "@/components/v95/ui-bits";
import * as H from "@/v95/hooks";

function Page() {
  const t = H.useEnterpriseTrust();
  return (
    <V95Page icon={<ShieldCheck className="size-6 text-cyan-300" />} title="Enterprise Trust Command Center" blurb="15 trust domains, trust risk register, remediation tracker, and customer trust packet builder.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Trust domains</h3>
        <div className="mt-2">
          <SimpleTable rows={t.domains as any} columns={[
            { key: "domain", label: "Domain" }, { key: "score", label: "Score", render: (r: any) => `${r.score}%` },
            { key: "owner", label: "Owner" }, { key: "evidence", label: "Evidence", render: (r: any) => <StatusPill status={r.evidence} /> },
          ]} />
        </div>
      </Card>
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Risk register</h3>
          <ul className="mt-2 space-y-1.5 text-sm">
            {t.risks.map((r) => (
              <li key={r.id} className="flex items-center justify-between rounded border border-white/5 bg-black/20 px-3 py-2">
                <div><div>{r.risk}</div><div className="text-xs text-muted-foreground">owner: {r.owner}</div></div>
                <StatusPill status={r.level} />
              </li>
            ))}
          </ul>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Remediation tracker</h3>
          <ul className="mt-2 space-y-1.5 text-sm">
            {t.remediation.map((r) => (
              <li key={r.id} className="flex items-center justify-between rounded border border-white/5 bg-black/20 px-3 py-2">
                <div><div>{r.item}</div><div className="text-xs text-muted-foreground">owner: {r.owner} · ETA {r.eta}</div></div>
                <StatusPill status={r.status} />
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <Card className="border-cyan-400/30 bg-cyan-500/5 p-4 text-sm">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-cyan-200">Customer trust packet builder</div>
          <div className="text-xs text-muted-foreground">8 sections · permissioned per customer</div>
        </div>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {H.useV95TrustPacketSpec().map((p) => (
            <div key={p.section} className="rounded border border-white/10 bg-black/20 px-3 py-2 text-xs">
              <div className="text-sm font-medium text-foreground">{p.section}</div>
              <div className="text-muted-foreground">source: {p.source}</div>
              <div className="text-muted-foreground">cadence: {p.cadence}</div>
            </div>
          ))}
        </div>
      </Card>
    </V95Page>
  );
}

export const Route = createFileRoute("/v95/trust")({
  head: () => ({ meta: [{ title: "Trust Command · Anderoute V9.5" }] }),
  component: Page,
});
