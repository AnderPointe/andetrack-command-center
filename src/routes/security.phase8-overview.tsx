import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { SecurityNav } from "@/components/security/SecurityNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck, FileCheck2, FlaskConical, Rocket, Activity, AlertTriangle,
  DatabaseBackup, UserCheck, BugPlay, Building2, ArrowRight, Shield,
} from "lucide-react";

export const Route = createFileRoute("/security/phase8-overview")({
  head: () => ({
    meta: [
      { title: "Phase 8 Overview — Anderoute" },
      { name: "description", content: "Production hardening, SOC 2 readiness, QA, deployment, observability, incident response, DR, privacy, vulnerabilities, and vendor risk." },
      { property: "og:title", content: "Phase 8 Overview — Anderoute" },
      { property: "og:description", content: "All ten Phase 8 enterprise hardening areas in one place." },
    ],
  }),
  component: Phase8Overview,
});

const AREAS = [
  {
    to: "/security/center",
    icon: ShieldCheck,
    title: "Security Center",
    summary: "Enterprise security posture across 11 pillars: auth, tenant isolation, API, mobile, data, audit.",
    tags: ["OWASP ASVS", "MASVS", "11 pillars"],
    tone: "teal",
  },
  {
    to: "/compliance/soc2",
    icon: FileCheck2,
    title: "SOC 2 Readiness",
    summary: "Control library mapped to AICPA Trust Services Criteria with evidence vault and policy tracking.",
    tags: ["TSC mapped", "Evidence vault", "16 policies"],
    tone: "blue",
  },
  {
    to: "/ops/center",
    icon: FlaskConical,
    title: "QA",
    summary: "Test cases, tenant isolation tests, RLS coverage matrix, and pre-deploy gates.",
    tags: ["RLS matrix", "Isolation tests", "CI gates"],
    tone: "amber",
  },
  {
    to: "/ops/center",
    icon: Rocket,
    title: "Deployment",
    summary: "Release pipeline, rollback runbooks, blue/green, and environment promotion strategy.",
    tags: ["16-step CI/CD", "Rollback", "Blue/green"],
    tone: "emerald",
  },
  {
    to: "/ops/observability",
    icon: Activity,
    title: "Observability",
    summary: "GPS, realtime, API, AI, mobile, and provider health metrics with alerting rules.",
    tags: ["API uptime", "Realtime SLOs", "Alert rules"],
    tone: "violet",
  },
  {
    to: "/ops/incidents",
    icon: AlertTriangle,
    title: "Incident Response",
    summary: "Triage workflow, runbooks, postmortem templates, MTTA/MTTR tracking.",
    tags: ["MTTA/MTTR", "Runbooks", "Postmortems"],
    tone: "orange",
  },
  {
    to: "/ops/database",
    icon: DatabaseBackup,
    title: "Backup / DR",
    summary: "RPO/RTO targets, PITR snapshots, quarterly restore drills, and DR runbooks.",
    tags: ["PITR", "Restore drills", "RPO/RTO"],
    tone: "cyan",
  },
  {
    to: "/security/privacy",
    icon: UserCheck,
    title: "Privacy",
    summary: "Driver consent, location retention, transcript policy, and platform-locked safeguards.",
    tags: ["Default-off", "Consent log", "Retention rules"],
    tone: "pink",
  },
  {
    to: "/security/center",
    icon: BugPlay,
    title: "Vulnerabilities",
    summary: "Findings, remediation tracking, exception register, and dependency scan ingest.",
    tags: ["Findings", "Remediation", "Exceptions"],
    tone: "slate",
  },
  {
    to: "/ops/database",
    icon: Building2,
    title: "Vendor Risk",
    summary: "Supabase, Stripe, maps, AI, notification providers — DPAs, SOC 2 reports, review cadence.",
    tags: ["DPA tracking", "SOC 2 reports", "Review cadence"],
    tone: "fuchsia",
  },
] as const;

const TONE: Record<string, string> = {
  teal: "border-teal-400/30 hover:border-teal-400/60 text-teal-300",
  blue: "border-blue-400/30 hover:border-blue-400/60 text-blue-300",
  amber: "border-amber-400/30 hover:border-amber-400/60 text-amber-300",
  emerald: "border-emerald-400/30 hover:border-emerald-400/60 text-emerald-300",
  violet: "border-violet-400/30 hover:border-violet-400/60 text-violet-300",
  orange: "border-orange-400/30 hover:border-orange-400/60 text-orange-300",
  cyan: "border-cyan-400/30 hover:border-cyan-400/60 text-cyan-300",
  pink: "border-pink-400/30 hover:border-pink-400/60 text-pink-300",
  slate: "border-slate-400/30 hover:border-slate-400/60 text-slate-300",
  fuchsia: "border-fuchsia-400/30 hover:border-fuchsia-400/60 text-fuchsia-300",
};

function Phase8Overview() {
  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <SecurityNav />

        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-teal-300/80">Phase 8 · Hardening</div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">Production hardening overview</h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              All ten hardening areas in one place — security posture, SOC 2, QA, deployment, observability,
              incident response, DR, privacy, vulnerabilities, and vendor risk.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Shield className="size-3.5 text-teal-300" />
            <span>10 areas · audit-ready</span>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((a, i) => {
            const Icon = a.icon;
            return (
              <Link key={`${a.to}-${i}`} to={a.to} className="group block focus:outline-none">
                <Card className={`h-full p-4 transition-colors border ${TONE[a.tone]} bg-white/[0.02]`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className={`inline-flex size-9 items-center justify-center rounded-md border ${TONE[a.tone]} bg-white/[0.03]`}>
                      <Icon className="size-4" />
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </div>
                  <div className="mt-3 font-semibold">{a.title}</div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{a.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {a.tags.map((t) => (
                      <Badge key={t} variant="outline" className="text-[10px] font-normal">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        <Card className="p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Related</h2>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3 text-sm">
            <Link to="/security/overview" className="rounded-md border border-white/5 bg-white/[0.02] p-3 hover:border-white/20">
              <div className="font-medium">Executive summary</div>
              <div className="text-xs text-muted-foreground">Readiness score & top KPIs</div>
            </Link>
            <Link to="/ops/database" className="rounded-md border border-white/5 bg-white/[0.02] p-3 hover:border-white/20">
              <div className="font-medium">RLS coverage matrix</div>
              <div className="text-xs text-muted-foreground">Per-table policy audit</div>
            </Link>
            <Link to="/ops/observability" className="rounded-md border border-white/5 bg-white/[0.02] p-3 hover:border-white/20">
              <div className="font-medium">Live observability</div>
              <div className="text-xs text-muted-foreground">SLOs & alert routing</div>
            </Link>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
