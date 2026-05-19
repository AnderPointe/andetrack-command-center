import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { EnterpriseNav } from "@/components/enterprise/EnterpriseNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plug, FileSpreadsheet, KeyRound, Webhook, Sparkles, Calculator, Quote,
  Palette, FileText, Bot, ArrowRight, Activity,
} from "lucide-react";

export const Route = createFileRoute("/enterprise/overview")({
  head: () => ({
    meta: [
      { title: "Enterprise Overview — Anderoute" },
      { name: "description", content: "Phase 7 enterprise platform: integrations, EDI, API marketplace, webhooks, optimization, rating, white-label, documents, and CoPilot automation." },
      { property: "og:title", content: "Enterprise Overview — Anderoute" },
      { property: "og:description", content: "All Phase 7 enterprise modules in one place." },
    ],
  }),
  component: EnterpriseOverview,
});

const AREAS = [
  {
    to: "/integrations/hub",
    icon: Plug,
    title: "Integration Hub",
    summary: "Manage EDI, API, webhooks, accounting, telematics, maps, brokers, and customer systems.",
    tags: ["22 connectors", "Health monitoring", "One-click enable"],
    tone: "teal",
  },
  {
    to: "/integrations/edi",
    icon: FileSpreadsheet,
    title: "EDI",
    summary: "204, 990, 214, 210, 997 transactions with full audit trail and trading partner status.",
    tags: ["X12 placeholders", "Audit trail", "Retry w/ backoff"],
    tone: "blue",
  },
  {
    to: "/integrations/api",
    icon: KeyRound,
    title: "API Marketplace",
    summary: "Scoped API keys, OpenAPI docs, request logs, and security boundaries.",
    tags: ["17 scopes", "SHA-256 at rest", "Request logs"],
    tone: "amber",
  },
  {
    to: "/integrations/webhooks",
    icon: Webhook,
    title: "Webhooks",
    summary: "Event subscriptions, HMAC-SHA256 signed delivery, retry log, and replay.",
    tags: ["19 events", "Signed payloads", "Delivery log"],
    tone: "emerald",
  },
  {
    to: "/optimization/center",
    icon: Sparkles,
    title: "Optimization",
    summary: "Suggested driver/load assignments with per-factor scoring and explanations.",
    tags: ["Score breakdown", "Deadhead-aware", "Risk-weighted"],
    tone: "violet",
  },
  {
    to: "/rating/quote",
    icon: Calculator,
    title: "Rate Engine",
    summary: "Quote builder with base rate, fuel surcharge, accessorials, and margin estimate.",
    tags: ["Fuel surcharge", "Accessorials", "Margin %"],
    tone: "orange",
  },
  {
    to: "/portal/new-request",
    icon: Quote,
    title: "Customer Quoting",
    summary: "Customer-facing shipment quote and request workflow via the branded portal.",
    tags: ["Self-serve", "Tracked", "Branded"],
    tone: "cyan",
  },
  {
    to: "/settings/white-label",
    icon: Palette,
    title: "White-Labeling",
    summary: "Custom logos, color tokens, email templates, and custom-domain SSL placeholders.",
    tags: ["Branding", "Custom domain", "Email templates"],
    tone: "pink",
  },
  {
    to: "/documents",
    icon: FileText,
    title: "Documents",
    summary: "POD, BOL, invoices, contracts, and shipment attachments in one library.",
    tags: ["POD/BOL", "Invoices", "Contracts"],
    tone: "slate",
  },
  {
    to: "/driver/copilot-lab",
    icon: Bot,
    title: "CoPilot Enterprise",
    summary: "Integration, optimization, and customer-update automation powered by Anderoute CoPilot.",
    tags: ["Auto-assign", "Status updates", "NL queries"],
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

function EnterpriseOverview() {
  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <EnterpriseNav />

        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-teal-300/80">Phase 7 · Enterprise</div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">Enterprise platform overview</h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              All ten enterprise modules in one place — integrations, EDI, public APIs, webhooks, optimization,
              rating, customer quoting, white-label, documents, and CoPilot automation.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Activity className="size-3.5 text-emerald-300" />
            <span>10 modules · all online</span>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((a) => {
            const Icon = a.icon;
            return (
              <Link
                key={a.to}
                to={a.to}
                className="group block focus:outline-none"
              >
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
            <Link to="/integrations/health" className="rounded-md border border-white/5 bg-white/[0.02] p-3 hover:border-white/20">
              <div className="font-medium">Integration health</div>
              <div className="text-xs text-muted-foreground">Uptime & error rates per connector</div>
            </Link>
            <Link to="/data/import-export" className="rounded-md border border-white/5 bg-white/[0.02] p-3 hover:border-white/20">
              <div className="font-medium">Data import / export</div>
              <div className="text-xs text-muted-foreground">CSV, JSON, mapping wizards</div>
            </Link>
            <Link to="/enterprise/phase7-demo" className="rounded-md border border-white/5 bg-white/[0.02] p-3 hover:border-white/20">
              <div className="font-medium">Phase 7 demo flow</div>
              <div className="text-xs text-muted-foreground">Guided walkthrough</div>
            </Link>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
