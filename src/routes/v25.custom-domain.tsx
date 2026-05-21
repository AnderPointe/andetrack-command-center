import { createFileRoute } from "@tanstack/react-router";
import { Globe2 } from "lucide-react";
import { V25Page } from "@/components/v25/V25Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CUSTOM_DOMAINS, DNS_RECORD_EXAMPLE, DOMAIN_SETUP_STEPS } from "@/v25/data/mockPhase18";

const tone: Record<string, string> = { Active: "border-emerald-500/30 text-emerald-300", "DNS verified": "border-sky-500/30 text-sky-300", "Pending DNS": "border-amber-500/30 text-amber-300", Failed: "border-rose-500/30 text-rose-300" };

export const Route = createFileRoute("/v25/custom-domain")({
  head: () => ({ meta: [{ title: "Custom Domain · Anderoute" }] }),
  component: () => (
    <V25Page icon={<Globe2 className="size-6 text-emerald-300" />} title="Custom Domain Readiness" blurb="Configure customer portal on a custom domain. DNS verification and SSL status surface in the dashboard.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Configured domains</h2>
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-2">Company</th><th className="p-2">Domain</th><th className="p-2">Status</th><th className="p-2">DNS</th><th className="p-2">SSL</th><th className="p-2">Verified</th></tr></thead>
          <tbody>
            {CUSTOM_DOMAINS.map((d) => (
              <tr key={d.id} className="border-t border-white/10">
                <td className="p-2">{d.company}</td><td className="p-2 font-mono text-xs">{d.domain}</td>
                <td className="p-2"><Badge variant="outline" className={tone[d.status] ?? "border-white/15 text-muted-foreground"}>{d.status}</Badge></td>
                <td className="p-2 text-xs">{d.dnsVerified ? "✓" : "—"}</td>
                <td className="p-2 text-xs">{d.ssl}</td>
                <td className="p-2 text-xs text-muted-foreground">{d.verifiedAt ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Required DNS records (sample)</h2>
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-2">Type</th><th className="p-2">Name</th><th className="p-2">Value</th><th className="p-2">TTL</th></tr></thead>
          <tbody>
            {DNS_RECORD_EXAMPLE.map((r, i) => (
              <tr key={i} className="border-t border-white/10"><td className="p-2 font-mono text-xs">{r.type}</td><td className="p-2 font-mono text-xs">{r.name}</td><td className="p-2 font-mono text-xs">{r.value}</td><td className="p-2 font-mono text-xs">{r.ttl}</td></tr>
            ))}
          </tbody>
        </table>
      </Card>
    </V25Page>
  ),
});
