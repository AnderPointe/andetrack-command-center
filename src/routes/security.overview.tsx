import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { SecurityNav } from "@/components/security/SecurityNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield, ShieldCheck, FileCheck2, BookOpen, FileStack, GitBranch, FlaskConical,
  Rocket, Activity, AlertTriangle, HardDriveDownload, Bug, Building2, Recycle, Database,
  ArrowRight, UserCheck,
} from "lucide-react";
import {
  useSecurityPosture, useExecutiveSummary, useSecurityFindings, useIsolationTests,
} from "@/security/hooks/useSecurityData";

export const Route = createFileRoute("/security/overview")({
  head: () => ({
    meta: [
      { title: "Security & Compliance — Anderoute" },
      { name: "description", content: "Executive security posture, SOC 2 readiness, tenant isolation, QA, deployment, observability, incidents, backup, vendors." },
    ],
  }),
  component: SecurityOverview,
});

const AREAS = [
  { to: "/security/center",   icon: ShieldCheck,        title: "Security Center",      summary: "Authentication, authorization, tenant isolation, API, data, mobile, web checklists.",  tone: "teal"   },
  { to: "/security/privacy",  icon: UserCheck,          title: "Driver Privacy",       summary: "Consent posture, default-off rules, platform-locked safeguards, driver rights.",      tone: "cyan"   },
  { to: "/compliance/soc2",   icon: FileCheck2,         title: "SOC 2 Readiness",      summary: "Trust Services Criteria mapped to controls, evidence vault, policy library.",         tone: "emerald"},
  { to: "/ops/center",        icon: GitBranch,          title: "Change Management",    summary: "Change requests, releases, QA suites, deployments, CI/CD pipeline view.",             tone: "blue"   },
  { to: "/ops/observability", icon: Activity,           title: "Observability",        summary: "Uptime, latency, error rate, realtime, GPS, providers, AI cost, mobile crashes.",     tone: "violet" },
  { to: "/ops/incidents",     icon: AlertTriangle,      title: "Incident Response",    summary: "Active incidents, runbooks, severity timeline, postmortem template.",                 tone: "amber"  },
  { to: "/ops/database",      icon: Database,           title: "Database & Hardening", summary: "RLS coverage matrix, edge function boundaries, backups, vendor risk, retention.",     tone: "slate"  },
] as const;

const TONE: Record<string, string> = {
  teal:    "border-teal-500/30 text-teal-300",
  cyan:    "border-cyan-500/30 text-cyan-300",
  emerald: "border-emerald-500/30 text-emerald-300",
  blue:    "border-blue-500/30 text-blue-300",
  violet:  "border-violet-500/30 text-violet-300",
  amber:   "border-amber-500/30 text-amber-300",
  slate:   "border-slate-500/30 text-slate-300",
};

const METRIC_TONE: Record<string, string> = {
  ok:   "text-emerald-300",
  warn: "text-amber-300",
  fail: "text-rose-300",
  info: "text-blue-300",
};

const sevTone: Record<string, string> = {
  critical: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  high:     "bg-orange-500/15 text-orange-300 border-orange-500/30",
  medium:   "bg-amber-500/15 text-amber-300 border-amber-500/30",
  low:      "bg-blue-500/15 text-blue-300 border-blue-500/30",
  info:     "bg-slate-500/15 text-slate-300 border-slate-500/30",
};

function SecurityOverview() {
  const { score, cards } = useSecurityPosture();
  const { metrics } = useExecutiveSummary();
  const { findings } = useSecurityFindings();
  const { tests: isoTests } = useIsolationTests();
  const passing = cards.filter((c) => c.status === "pass").length;
  const warning = cards.filter((c) => c.status === "warn").length;
  const failing = cards.filter((c) => c.status === "fail").length;
  const topFindings = findings
    .filter((f) => f.status !== "resolved")
    .sort((a, b) => {
      const order = { critical: 0, high: 1, medium: 2, low: 3, info: 4 } as const;
      return order[a.severity] - order[b.severity];
    })
    .slice(0, 4);
  const isoFail = isoTests.filter((t) => t.status === "fail").length;

  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <SecurityNav />

        {/* Executive header */}
        <header className="flex items-start justify-between gap-4 flex-wrap">
          <div className="max-w-2xl">
            <h1 className="text-2xl font-semibold tracking-tight">Security & Compliance</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Executive posture for enterprise pilots. Mapped to AICPA Trust Services Criteria,
              OWASP ASVS (web), and OWASP MASVS (mobile).
            </p>
          </div>
          <Card className="p-4 min-w-[240px]">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Compliance readiness</div>
            <div className="mt-1 flex items-end gap-2">
              <span className="text-3xl font-semibold tabular-nums text-emerald-300">{score}</span>
              <span className="text-sm text-muted-foreground mb-1">/ 100</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
              <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30">{passing} pass</Badge>
              <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30">{warning} warn</Badge>
              <Badge className="bg-rose-500/15 text-rose-300 border-rose-500/30">{failing} fail</Badge>
            </div>
          </Card>
        </header>

        {/* Executive summary metrics */}
        <section aria-label="Executive summary" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {metrics.map((m) => (
            <Card key={m.key} className="p-3">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.label}</div>
              <div className={`mt-1 text-xl font-semibold tabular-nums ${METRIC_TONE[m.tone]}`}>{m.value}</div>
              {m.sub && <div className="mt-0.5 text-[10px] text-muted-foreground">{m.sub}</div>}
            </Card>
          ))}
        </section>

        {/* Module grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {AREAS.map(({ to, icon: Icon, title, summary, tone }) => (
            <Link key={to} to={to} className="group block">
              <Card className={`p-5 h-full border ${TONE[tone]} bg-white/[0.02] hover:bg-white/[0.04] transition-colors`}>
                <div className="flex items-center justify-between mb-2">
                  <Icon className="size-5" />
                  <ArrowRight className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-base font-semibold text-foreground">{title}</div>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{summary}</p>
              </Card>
            </Link>
          ))}
        </section>

        {/* Top open findings + isolation strip */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="p-5 lg:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Top open findings</h2>
              <Link to="/security/center" className="text-[11px] text-teal-300 hover:underline">Open Security Center →</Link>
            </div>
            <ul className="space-y-2">
              {topFindings.map((f) => (
                <li key={f.id} className="flex items-start gap-3 rounded-md border border-white/5 bg-white/[0.02] p-3">
                  <Badge className={sevTone[f.severity]}>{f.severity}</Badge>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium truncate">{f.title}</div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">{f.category} · owner {f.owner} · due {f.due ?? "—"}</div>
                  </div>
                  <span className="text-[11px] text-muted-foreground shrink-0">{f.status.replace("_", " ")}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Tenant isolation</h2>
              <Link to="/ops/database" className="text-[11px] text-teal-300 hover:underline">Matrix →</Link>
            </div>
            <div className="text-3xl font-semibold tabular-nums">
              <span className={isoFail === 0 ? "text-emerald-300" : "text-amber-300"}>{isoTests.length - isoFail}</span>
              <span className="text-base text-muted-foreground"> / {isoTests.length}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {isoFail === 0
                ? "All cross-tenant scenarios denied."
                : `${isoFail} scenario(s) failing — see RLS matrix.`}
            </p>
          </Card>
        </div>

        {/* Posture cards detail */}
        <Card className="p-5">
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Posture pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {cards.map((c) => (
              <div key={c.key} className="rounded-md border border-white/5 bg-white/[0.02] p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{c.label}</span>
                  <Badge className={
                    c.status === "pass" ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" :
                    c.status === "warn" ? "bg-amber-500/15 text-amber-300 border-amber-500/30" :
                    "bg-rose-500/15 text-rose-300 border-rose-500/30"
                  }>{c.score}</Badge>
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground">{c.note}</div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground/70">{c.owner}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-sm font-semibold mb-2 uppercase tracking-wider text-muted-foreground">Quick links</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
            {[
              { to: "/compliance/soc2",  icon: BookOpen,           label: "Policy Library" },
              { to: "/compliance/soc2",  icon: FileStack,          label: "Evidence Vault" },
              { to: "/ops/center",       icon: FlaskConical,       label: "QA Test Runs" },
              { to: "/ops/center",       icon: Rocket,             label: "Deployment Dashboard" },
              { to: "/ops/database",     icon: HardDriveDownload,  label: "Backup & Restore" },
              { to: "/ops/database",     icon: Bug,                label: "Vulnerabilities" },
              { to: "/ops/database",     icon: Building2,          label: "Vendor Risk" },
              { to: "/ops/database",     icon: Recycle,            label: "Retention Rules" },
              { to: "/security/center",  icon: Shield,             label: "Mobile / Web checklists" },
            ].map((r) => (
              <li key={r.label}>
                <Link to={r.to} className="flex items-center gap-2 rounded-md border border-white/5 bg-white/[0.02] px-3 py-2 hover:bg-white/[0.04]">
                  <r.icon className="size-3.5 text-muted-foreground" />
                  <span>{r.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
