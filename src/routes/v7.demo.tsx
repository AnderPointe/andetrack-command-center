import { createFileRoute, Link } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V7Page } from "@/components/v7/V7Page";
import { Card } from "@/components/ui/card";

const STEPS = [
  { who: "CEO",     to: "/v7/network",            title: "Open Global Logistics Network Dashboard",  detail: "Global readiness 67%. NA 82%, Canada 61%, Mexico 46%, EU 34%." },
  { who: "COO",     to: "/v7/country-matrix",     title: "Open Country + Region Readiness Matrix",   detail: "Canada → pilot. Mexico → research. EU → residency/privacy review." },
  { who: "CCO",     to: "/v7/compliance-matrix",  title: "Open Global Compliance Control Matrix",    detail: "Data residency incomplete. AI governance passing. Financial needs more evidence." },
  { who: "CFO",     to: "/v7/financial-maturity", title: "Open Platform Financial Maturity",         detail: "Financial maturity 74%. Billing strong. Rev rec gaps. Audit readiness placeholder 49%." },
  { who: "Mkt Lead",to: "/v7/marketplace-intel",  title: "Open Advanced Marketplace Intelligence",   detail: "Texas + Midwest liquidity strong. Southeast imbalance. 3-lane carrier concentration." },
  { who: "Partner Lead", to: "/v7/partner-ecosystem", title: "Open Global Partner Ecosystem Dashboard", detail: "2 telematics active in NA. 1 intl map provider in review. 1 EDI launch-ready." },
  { who: "Exec Team",to: "/v7/risk-register",     title: "Open Strategic Global Risk Register",      detail: "Top risks: data residency planning, regional compliance research, support coverage, marketplace liquidity in new regions." },
  { who: "Strategy",to: "/v7/roadmap",            title: "Open Long-Term Global Expansion Roadmap",  detail: "Canada pilot planned first. Mexico + EU remain research-stage." },
];

export const Route = createFileRoute("/v7/demo")({
  head: () => ({ meta: [{ title: "V7 Demo Flow · Anderoute" }] }),
  component: () => (
    <V7Page icon={<ListChecks className="size-6 text-indigo-300" />} title="V7 Demo Flow"
      blurb="Guided executive walkthrough of Anderoute V7 global logistics operating network readiness.">
      <ol className="space-y-2">
        {STEPS.map((s, i) => (
          <li key={s.to}>
            <Link to={s.to}>
              <Card className="border-white/10 bg-white/[0.02] p-3 transition-colors hover:border-indigo-400/40">
                <div className="flex items-start gap-3">
                  <div className="inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-indigo-400/40 bg-indigo-500/10 text-xs font-semibold text-indigo-200">
                    {i + 1}
                  </div>
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
    </V7Page>
  ),
});
