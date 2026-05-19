import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { SecurityNav } from "@/components/security/SecurityNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  useBackupRecovery, useVulnerabilities, useVendorRisk, useRetentionRules,
  useRlsCoverage, useIsolationTests, useEdgeFnBoundaries,
} from "@/security/hooks/useSecurityData";
import { HardDriveDownload, Bug, Building2, Recycle, Database, ShieldCheck, Network, Server } from "lucide-react";

export const Route = createFileRoute("/ops/database")({
  head: () => ({ meta: [{ title: "Database & Hardening — Anderoute" }] }),
  component: DbHardeningPage,
});

const HARDENING = [
  { label: "RLS enabled on every tenant table",       status: "pass" },
  { label: "company_id present on tenant rows",        status: "pass" },
  { label: "Indexes on hot queries reviewed",          status: "pass" },
  { label: "Slow-query log enforced (>500ms)",         status: "pass" },
  { label: "Service-role usage restricted",            status: "pass" },
  { label: "Edge Function least-privilege role",       status: "pass" },
  { label: "Storage bucket policies scoped",           status: "pass" },
  { label: "Audit triggers on writes",                 status: "pass" },
  { label: "Soft-delete strategy documented",          status: "warn" },
  { label: "Archive strategy for old GPS events",      status: "pass" },
  { label: "Materialized views for reports",           status: "warn" },
  { label: "PITR enabled (7d window)",                 status: "pass" },
] as const;

function statusBadge(s: string) {
  return (
    <Badge className={
      s === "pass" ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" :
      s === "warn" ? "bg-amber-500/15 text-amber-300 border-amber-500/30" :
      s === "ok"   ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" :
      s === "fail" ? "bg-rose-500/15 text-rose-300 border-rose-500/30" :
      "bg-slate-500/15 text-slate-300 border-slate-500/30"
    }>{s}</Badge>
  );
}

const sevTone: Record<string, string> = {
  critical: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  high:     "bg-orange-500/15 text-orange-300 border-orange-500/30",
  medium:   "bg-amber-500/15 text-amber-300 border-amber-500/30",
  low:      "bg-blue-500/15 text-blue-300 border-blue-500/30",
  info:     "bg-slate-500/15 text-slate-300 border-slate-500/30",
};
const riskTone: Record<string, string> = {
  low:      "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  medium:   "bg-amber-500/15 text-amber-300 border-amber-500/30",
  high:     "bg-orange-500/15 text-orange-300 border-orange-500/30",
  critical: "bg-rose-500/15 text-rose-300 border-rose-500/30",
};

function DbHardeningPage() {
  const { backups } = useBackupRecovery();
  const { vulns } = useVulnerabilities();
  const { vendors } = useVendorRisk();
  const { rules } = useRetentionRules();
  const { rows: rlsRows } = useRlsCoverage();
  const { tests: isoTests } = useIsolationTests();
  const { boundaries } = useEdgeFnBoundaries();

  const rlsFull    = rlsRows.filter((r) => r.coverage === "full").length;
  const rlsPartial = rlsRows.filter((r) => r.coverage === "partial").length;
  const rlsGap     = rlsRows.filter((r) => r.coverage === "gap").length;
  const isoFail    = isoTests.filter((t) => t.status === "fail").length;

  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <SecurityNav />
        <div className="flex items-center gap-2">
          <Database className="size-5 text-teal-300" />
          <h1 className="text-2xl font-semibold tracking-tight">Database & Hardening</h1>
        </div>
        <p className="text-sm text-muted-foreground -mt-3">RLS coverage, tenant isolation matrix, edge function boundaries, backups, vendor risk, vulnerabilities, retention.</p>

        {/* RLS coverage dashboard */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-teal-300" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">RLS coverage matrix</h2>
            </div>
            <div className="flex gap-2 text-[11px]">
              <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30">{rlsFull} full</Badge>
              <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30">{rlsPartial} partial</Badge>
              {rlsGap > 0 && <Badge className="bg-rose-500/15 text-rose-300 border-rose-500/30">{rlsGap} gap</Badge>}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                <tr className="border-b border-white/5">
                  <th className="text-left py-2 pr-3">Table</th>
                  <th className="text-left py-2 pr-3">RLS</th>
                  <th className="text-right py-2 pr-3">Policies</th>
                  <th className="text-left py-2 pr-3">Scope</th>
                  <th className="text-left py-2 pr-3">Coverage</th>
                  <th className="text-left py-2 pr-3">Note</th>
                </tr>
              </thead>
              <tbody>
                {rlsRows.map((r) => (
                  <tr key={r.table} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                    <td className="py-2 pr-3 font-mono text-xs">{r.table}</td>
                    <td className="py-2 pr-3">{statusBadge(r.enabled ? "pass" : "fail")}</td>
                    <td className="py-2 pr-3 text-xs tabular-nums text-right">{r.policies}</td>
                    <td className="py-2 pr-3 text-xs text-muted-foreground">{r.scope}</td>
                    <td className="py-2 pr-3">
                      <Badge className={
                        r.coverage === "full"    ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" :
                        r.coverage === "partial" ? "bg-amber-500/15 text-amber-300 border-amber-500/30" :
                                                   "bg-rose-500/15 text-rose-300 border-rose-500/30"
                      }>{r.coverage}</Badge>
                    </td>
                    <td className="py-2 pr-3 text-xs text-muted-foreground">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">RLS examples: <span className="font-mono">docs/phase8-rls-examples.sql</span> · Schema proposal: <span className="font-mono">docs/phase8-schema.sql</span></p>
        </Card>

        {/* Tenant isolation test matrix */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Network className="size-4 text-teal-300" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Tenant isolation tests</h2>
            </div>
            <div className="flex gap-2 text-[11px]">
              <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30">{isoTests.length - isoFail} pass</Badge>
              {isoFail > 0 && <Badge className="bg-rose-500/15 text-rose-300 border-rose-500/30">{isoFail} fail</Badge>}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                <tr className="border-b border-white/5">
                  <th className="text-left py-2 pr-3">Scenario</th>
                  <th className="text-left py-2 pr-3">Attacker</th>
                  <th className="text-left py-2 pr-3">Target</th>
                  <th className="text-left py-2 pr-3">Expected</th>
                  <th className="text-left py-2 pr-3">Actual</th>
                  <th className="text-left py-2 pr-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {isoTests.map((t) => (
                  <tr key={t.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                    <td className="py-2 pr-3 font-medium">{t.scenario}</td>
                    <td className="py-2 pr-3 text-xs font-mono text-muted-foreground">{t.attacker}</td>
                    <td className="py-2 pr-3 text-xs font-mono text-muted-foreground">{t.target}</td>
                    <td className="py-2 pr-3 text-xs">{t.expected}</td>
                    <td className="py-2 pr-3 text-xs">{t.actual}</td>
                    <td className="py-2 pr-3">{statusBadge(t.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Edge function / server boundary matrix */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Server className="size-4 text-teal-300" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Server function & Edge boundary</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                <tr className="border-b border-white/5">
                  <th className="text-left py-2 pr-3">Name</th>
                  <th className="text-left py-2 pr-3">Kind</th>
                  <th className="text-left py-2 pr-3">Trust</th>
                  <th className="text-left py-2 pr-3">Scope</th>
                  <th className="text-left py-2 pr-3">Notes</th>
                </tr>
              </thead>
              <tbody>
                {boundaries.map((b) => (
                  <tr key={b.name} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                    <td className="py-2 pr-3 font-mono text-xs">{b.name}</td>
                    <td className="py-2 pr-3">
                      <Badge className={
                        b.kind === "server-fn"    ? "bg-teal-500/15 text-teal-300 border-teal-500/30" :
                        b.kind === "server-route" ? "bg-blue-500/15 text-blue-300 border-blue-500/30" :
                                                    "bg-violet-500/15 text-violet-300 border-violet-500/30"
                      }>{b.kind}</Badge>
                    </td>
                    <td className="py-2 pr-3">
                      <Badge className={
                        b.trust === "user"     ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" :
                        b.trust === "service"  ? "bg-amber-500/15 text-amber-300 border-amber-500/30" :
                                                 "bg-rose-500/15 text-rose-300 border-rose-500/30"
                      }>{b.trust}</Badge>
                    </td>
                    <td className="py-2 pr-3 text-xs text-muted-foreground">{b.scope}</td>
                    <td className="py-2 pr-3 text-xs text-muted-foreground">{b.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">
            Rule: app-internal logic uses <span className="font-mono">createServerFn</span>. Edge Functions only when an external system MUST call a stable Supabase URL. Plan: <span className="font-mono">docs/phase8-edge-function-plan.md</span>.
          </p>
        </Card>

        {/* Hardening checklist */}
        <Card className="p-5">
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Database hardening checklist</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {HARDENING.map((h) => (
              <li key={h.label} className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.02] p-2.5">
                <span>{h.label}</span>
                {statusBadge(h.status)}
              </li>
            ))}
          </ul>
        </Card>


        {/* Backup & Recovery */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <HardDriveDownload className="size-4 text-teal-300" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Backup & Recovery</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <Card className="p-3"><div className="text-[10px] uppercase text-muted-foreground">RPO</div><div className="text-xl font-semibold">15 min</div></Card>
            <Card className="p-3"><div className="text-[10px] uppercase text-muted-foreground">RTO</div><div className="text-xl font-semibold">60 min</div></Card>
            <Card className="p-3"><div className="text-[10px] uppercase text-muted-foreground">Last restore drill</div><div className="text-xl font-semibold text-emerald-300">passed</div></Card>
          </div>
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground">
              <tr className="border-b border-white/5">
                <th className="text-left py-2 pr-3">Target</th>
                <th className="text-left py-2 pr-3">Status</th>
                <th className="text-right py-2 pr-3">Size</th>
                <th className="text-left py-2 pr-3">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {backups.map((b) => (
                <tr key={b.id} className="border-b border-white/[0.04]">
                  <td className="py-2 pr-3 font-medium">{b.target}</td>
                  <td className="py-2 pr-3">{statusBadge(b.status)}</td>
                  <td className="py-2 pr-3 text-xs tabular-nums text-right">{b.size_gb.toFixed(1)} GB</td>
                  <td className="py-2 pr-3 text-xs text-muted-foreground">{b.ts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Vulnerabilities */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Bug className="size-4 text-teal-300" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Vulnerability findings</h2>
          </div>
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground">
              <tr className="border-b border-white/5">
                <th className="text-left py-2 pr-3">Severity</th>
                <th className="text-left py-2 pr-3">Component</th>
                <th className="text-left py-2 pr-3">CVE</th>
                <th className="text-left py-2 pr-3">Status</th>
                <th className="text-left py-2 pr-3">Due</th>
              </tr>
            </thead>
            <tbody>
              {vulns.map((v) => (
                <tr key={v.id} className="border-b border-white/[0.04]">
                  <td className="py-2 pr-3"><Badge className={sevTone[v.severity]}>{v.severity}</Badge></td>
                  <td className="py-2 pr-3 font-medium">{v.component}</td>
                  <td className="py-2 pr-3 font-mono text-xs">{v.cve ?? "—"}</td>
                  <td className="py-2 pr-3 text-xs">{v.status}</td>
                  <td className="py-2 pr-3 text-xs text-muted-foreground">{v.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Vendor Risk */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="size-4 text-teal-300" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Vendor risk</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                <tr className="border-b border-white/5">
                  <th className="text-left py-2 pr-3">Vendor</th>
                  <th className="text-left py-2 pr-3">Category</th>
                  <th className="text-left py-2 pr-3">Data shared</th>
                  <th className="text-left py-2 pr-3">Risk</th>
                  <th className="text-left py-2 pr-3">DPA</th>
                  <th className="text-left py-2 pr-3">Last reviewed</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((v) => (
                  <tr key={v.id} className="border-b border-white/[0.04]">
                    <td className="py-2 pr-3 font-medium">{v.name}</td>
                    <td className="py-2 pr-3 text-xs text-muted-foreground">{v.category}</td>
                    <td className="py-2 pr-3 text-xs text-muted-foreground">{v.data}</td>
                    <td className="py-2 pr-3"><Badge className={riskTone[v.risk]}>{v.risk}</Badge></td>
                    <td className="py-2 pr-3 text-xs">{v.dpa}</td>
                    <td className="py-2 pr-3 text-xs text-muted-foreground">{v.last_reviewed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Retention */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Recycle className="size-4 text-teal-300" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Data retention rules</h2>
          </div>
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground">
              <tr className="border-b border-white/5">
                <th className="text-left py-2 pr-3">Data type</th>
                <th className="text-right py-2 pr-3">Retention</th>
                <th className="text-left py-2 pr-3">Action</th>
                <th className="text-left py-2 pr-3">Enabled</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((r) => (
                <tr key={r.id} className="border-b border-white/[0.04]">
                  <td className="py-2 pr-3 font-medium">{r.data_type}</td>
                  <td className="py-2 pr-3 text-xs tabular-nums text-right">{r.days} d</td>
                  <td className="py-2 pr-3">
                    <Badge className={
                      r.action === "delete"     ? "bg-rose-500/15 text-rose-300 border-rose-500/30" :
                      r.action === "anonymize"  ? "bg-amber-500/15 text-amber-300 border-amber-500/30" :
                      "bg-blue-500/15 text-blue-300 border-blue-500/30"
                    }>{r.action}</Badge>
                  </td>
                  <td className="py-2 pr-3 text-xs">{r.enabled ? "yes" : "no"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </AppShell>
  );
}
