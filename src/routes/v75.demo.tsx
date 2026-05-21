import { createFileRoute, Link } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V75Page } from "@/components/v75/V75Page";
import { Card } from "@/components/ui/card";
import { KpiGrid, ExecBanner } from "@/components/v75/ui-bits";
import { useGlobalExpansionExecution, useExecutiveGlobalLaunchGovernance, useAdvancedFinancialAuditReadiness, useGlobalMarketplaceDiscipline, useV75ExecHeadline } from "@/v75/hooks";

const STEPS = [
  { who: "CEO",          to: "/v75/expansion",            title: "Open Global Expansion Execution Center", detail: "Canada Controlled Pilot · Mexico Planning · EU Research. Trend +10 pts in 6 weeks." },
  { who: "COO",          to: "/v75/country-launch",       title: "Open Country Launch Execution Dashboard", detail: "Canada readiness 78% (was 62%). Go/no-go recommends controlled pilot. 2 blockers." },
  { who: "Product",      to: "/v75/country-pilot",        title: "Open Controlled Country Pilot Workflow", detail: "French localization blocked; data residency review in progress. Conditions tracked." },
  { who: "CSM Lead",     to: "/v75/regulated-onboarding", title: "Open Regulated Customer Onboarding",     detail: "Security, retention, AI, API/EDI in flight. Owner workload visible." },
  { who: "CCO",          to: "/v75/control-pack",         title: "Open Regulated Control Pack",            detail: "9 drafted · 3 in review · 2 placeholders. CCO+CISO+CFO sign-off pending." },
  { who: "CFO",          to: "/v75/financial-audit",      title: "Open Advanced Financial Audit Readiness", detail: "Audit readiness 62% (+10). Marketplace fee exception. Recon placeholder gaps." },
  { who: "CFO",          to: "/v75/revenue-recon",        title: "Open Revenue Reconciliation Placeholder", detail: "5 unmatched events ($889.55). Oldest 14 days. Placeholder only." },
  { who: "CFO",          to: "/v75/global-revenue",       title: "Open Global Revenue Control Execution", detail: "USA 96% · Canada 71% · Mexico 18% · EU 14% billing readiness." },
  { who: "Partner Lead", to: "/v75/partner-launch",       title: "Open International Partner Launch Center", detail: "Funnel: Identified→Launch Ready. GeoTab CA ready. HERE intl in compliance." },
  { who: "Mkt Lead",     to: "/v75/marketplace-discipline", title: "Open Marketplace Discipline",          detail: "Score 81 (+8). Fee exception (1). Canada-ON activating, reefer weak." },
  { who: "Mkt Lead",     to: "/v75/regional-mkt",         title: "Open Regional Marketplace Activation",   detail: "Canada-ON 68%. Carrier supply OK. Reefer equipment weak. QC research." },
  { who: "CCO",          to: "/v75/data-residency",       title: "Open Data Residency Execution Tracker",  detail: "6 tracked · 2 exceptions · 1 high-risk. Next review Aug 15." },
  { who: "CCO",          to: "/v75/compliance",           title: "Open Global Compliance Control Execution", detail: "1 passing · 3 in progress · 2 escalated · 1 evidence missing." },
  { who: "VP Support",   to: "/v75/support",              title: "Open Global Support Readiness",          detail: "USA fully ready · Canada partial · MX/EU todo." },
  { who: "VP Intl",      to: "/v75/regional-risk",        title: "Open Regional Risk Management",          detail: "EU 3 high · Mexico 3 high · Canada 4 medium · Global mixed." },
  { who: "Exec",         to: "/v75/launch-governance",    title: "Open Executive Global Launch Governance", detail: "4 pending approvals (oldest 9d). Approve Canada pilot with conditions." },
  { who: "Exec",         to: "/v75/cadence",              title: "Open Global Operating Cadence",          detail: "Daily/weekly/monthly/quarterly cadences + exec time-load visible." },
];

export const Route = createFileRoute("/v75/demo")({
  head: () => ({ meta: [{ title: "V7.5 Demo Flow · Anderoute" }] }),
  component: () => {
    const { score, blockers, alerts } = useGlobalExpansionExecution();
    const { summary: approvalSummary } = useExecutiveGlobalLaunchGovernance();
    const { audit } = useAdvancedFinancialAuditReadiness();
    const { discipline } = useGlobalMarketplaceDiscipline();
    const headline = useV75ExecHeadline();
    return (
      <V75Page icon={<ListChecks className="size-6 text-indigo-300" />} title="V7.5 Demo Flow"
        blurb="Guided executive walkthrough of Anderoute V7.5 global expansion execution — Canada controlled pilot scenario.">
        <ExecBanner h={headline} />
        <KpiGrid cols={4} items={[
          { label: "Execution readiness", value: `${score.overall}%`, sub: "Trend +10 (6w)" },
          { label: "Open blockers", value: blockers.length, sub: `${blockers.filter(b => b.severity === "high").length} high` },
          { label: "Audit readiness", value: `${audit.score}%`, sub: "Placeholder areas: 2" },
          { label: "Pending approvals", value: approvalSummary.pending, sub: `Discipline ${discipline.score}` },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-3 text-xs text-amber-200">
          Active executive alerts: {alerts.filter(a => a.severity === "high").map(a => a.message).join(" · ")}
        </Card>
        <ol className="space-y-2">
          {STEPS.map((s, i) => (
            <li key={s.to}>
              <Link to={s.to}>
                <Card className="border-white/10 bg-white/[0.02] p-3 transition-colors hover:border-indigo-400/40">
                  <div className="flex items-start gap-3">
                    <div className="inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-indigo-400/40 bg-indigo-500/10 text-xs font-semibold text-indigo-200">{i + 1}</div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="rounded border border-white/10 px-1.5 py-0.5 text-[10px]">{s.who}</span>
                        <span className="font-medium text-foreground">{s.title}</span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{s.detail}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            </li>
          ))}
        </ol>
      </V75Page>
    );
  },
});
