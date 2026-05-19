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

  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <SecurityNav />
        <div className="flex items-center gap-2">
          <Database className="size-5 text-teal-300" />
          <h1 className="text-2xl font-semibold tracking-tight">Database & Hardening</h1>
        </div>
        <p className="text-sm text-muted-foreground -mt-3">RLS coverage, backups, vendor risk, vulnerabilities, retention.</p>

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
          <p className="mt-3 text-[11px] text-muted-foreground">Proposed schema: <span className="font-mono">docs/phase8-schema.sql</span> · RLS examples: <span className="font-mono">docs/phase8-rls-examples.sql</span></p>
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
