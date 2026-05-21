import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { V2Page } from "@/components/v2/V2Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ENTERPRISE_GROUPS } from "@/v2/data/mockPhase17";

export const Route = createFileRoute("/v2/enterprise")({
  head: () => ({ meta: [{ title: "Enterprise Controls · Anderoute" }] }),
  component: Page,
});

const CONTROLS = [
  { id: "perm",     label: "Advanced role permissions",       to: "/v2/permissions",  status: "ready" },
  { id: "audit",    label: "Audit log (API, billing, integrations, support access)", to: "/v2/audit", status: "ready" },
  { id: "flags",    label: "Company-level feature flags",     to: "/v2/feature-flags",status: "ready" },
  { id: "retention",label: "Data retention settings",          to: undefined,         status: "placeholder" },
  { id: "portal",   label: "Customer portal access controls",  to: "/v2/portal",      status: "ready" },
  { id: "privacy",  label: "Driver privacy controls",          to: undefined,         status: "placeholder" },
  { id: "support",  label: "Support access audit",             to: "/v2/audit",       status: "ready" },
  { id: "export",   label: "Export audit logs",                to: undefined,         status: "placeholder" },
];

const tone: Record<string, string> = {
  ready: "border-emerald-500/30 text-emerald-300",
  placeholder: "border-amber-500/30 text-amber-300",
};

function Page() {
  return (
    <V2Page
      icon={<Lock className="size-6 text-violet-300" />}
      title="Enterprise Controls V2"
      blurb="Advanced controls without taking on full SOC 2 evidence automation yet — permissions, audits, retention, feature flags, support access, and export."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Controls</h2>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {CONTROLS.map((c) => (
            <div key={c.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
              <div>
                {c.to ? (
                  <Link to={c.to} className="font-medium hover:underline">{c.label}</Link>
                ) : (
                  <div className="font-medium">{c.label}</div>
                )}
              </div>
              <Badge variant="outline" className={tone[c.status]}>{c.status}</Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4 text-sm text-muted-foreground">
        <Badge variant="outline" className="border-white/15 text-muted-foreground">Deferred</Badge>{" "}
        Full SOC 2 evidence automation, SCIM, advanced SSO, IP allowlists, and session policies are deferred to V2.5.
      </Card>
    </V2Page>
  );
}
