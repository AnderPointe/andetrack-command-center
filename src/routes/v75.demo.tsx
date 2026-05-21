import { createFileRoute, Link } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V75Page } from "@/components/v75/V75Page";
import { Card } from "@/components/ui/card";

const STEPS = [
  { who: "CEO",          to: "/v75/expansion",            title: "Open Global Expansion Execution Center", detail: "Canada Controlled Pilot · Mexico Planning · EU Research. Execution readiness 71%." },
  { who: "COO",          to: "/v75/country-launch",       title: "Open Country Launch Execution Dashboard", detail: "Canada readiness 78%. Go/no-go recommends controlled pilot. 2 blockers." },
  { who: "Product",      to: "/v75/country-pilot",        title: "Open Controlled Country Pilot Workflow", detail: "French localization blocked; data residency review in progress." },
  { who: "CSM Lead",     to: "/v75/regulated-onboarding", title: "Open Regulated Customer Onboarding",     detail: "Security questionnaire, data retention, AI usage, API/EDI in flight." },
  { who: "CCO",          to: "/v75/control-pack",         title: "Open Regulated Control Pack",            detail: "14 sections drafting; go-live approval pending." },
  { who: "CFO",          to: "/v75/financial-audit",      title: "Open Advanced Financial Audit Readiness", detail: "Audit readiness 62%. Marketplace fee exception. Recon placeholder gaps." },
  { who: "CFO",          to: "/v75/revenue-recon",        title: "Open Revenue Reconciliation Placeholder", detail: "5 unmatched usage events. 1 marketplace exception." },
  { who: "Partner Lead", to: "/v75/partner-launch",       title: "Open International Partner Launch Center", detail: "GeoTab CA launch-ready. HERE intl in compliance review." },
  { who: "Mkt Lead",     to: "/v75/regional-mkt",         title: "Open Regional Marketplace Activation",   detail: "Canada-ON 68%. Carrier supply OK. Reefer equipment weak." },
  { who: "CCO",          to: "/v75/data-residency",       title: "Open Data Residency Execution Tracker",  detail: "Driver location moderate risk. CoPilot transcripts need legal review." },
  { who: "Exec",         to: "/v75/launch-governance",    title: "Open Executive Global Launch Governance", detail: "Approve Canada controlled pilot with conditions." },
];

export const Route = createFileRoute("/v75/demo")({
  head: () => ({ meta: [{ title: "V7.5 Demo Flow · Anderoute" }] }),
  component: () => (
    <V75Page icon={<ListChecks className="size-6 text-indigo-300" />} title="V7.5 Demo Flow"
      blurb="Guided executive walkthrough of Anderoute V7.5 global expansion execution — Canada controlled pilot scenario.">
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
  ),
});
