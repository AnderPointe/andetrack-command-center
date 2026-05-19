import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plug, Database, Zap, Webhook, Sparkles, DollarSign, Palette, Mail, FileText, Activity, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/enterprise/phase7-demo")({
  head: () => ({ meta: [{ title: "Phase 7 Enterprise Demo — Anderoute" }] }),
  component: Phase7Demo,
});

const STEPS = [
  { to: "/integrations/hub", icon: Plug, title: "Integration Hub", desc: "Browse marketplace · connect EDI/accounting/telematics/maps." },
  { to: "/integrations/edi", icon: Database, title: "EDI inbound 204 → 990", desc: "Receive load tender, parse, create shipment request, reply 990." },
  { to: "/optimization/center", icon: Sparkles, title: "Optimization engine", desc: "Best-driver scoring with deadhead, ETA, risk, fuel cost." },
  { to: "/rating/quote", icon: DollarSign, title: "Rate quote builder", desc: "Base · fuel surcharge · accessorials · driver pay · margin." },
  { to: "/integrations/webhooks", icon: Webhook, title: "Webhook dispatch", desc: "shipment.delivered → customer ops, HMAC signed, retry policy." },
  { to: "/integrations/api", icon: Zap, title: "API marketplace", desc: "Scoped API keys, rate limits, request logs, public REST endpoints." },
  { to: "/settings/white-label", icon: Palette, title: "White-label branding", desc: "Logo · colors · custom domain · driver app + portal brand names." },
  { to: "/settings/email-templates", icon: Mail, title: "Branded email templates", desc: "POD ready, invoice ready, shipment in transit — branded automatically." },
  { to: "/documents", icon: FileText, title: "Document management", desc: "POD, BOL, rate confirmations, invoices, insurance, photos." },
  { to: "/data/import-export", icon: ArrowRight, title: "Data import / export", desc: "Bulk CSV import/export with column mapping and error reports." },
  { to: "/integrations/health", icon: Activity, title: "Integration health", desc: "Real-time uptime + errors across every external connection." },
] as const;

function Phase7Demo() {
  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <Badge className="bg-orange-500/15 text-orange-300 border-orange-500/30 mb-2">Phase 7</Badge>
          <h1 className="text-2xl font-semibold tracking-tight">Enterprise Integrations Demo</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Walk through Anderoute's enterprise stack: EDI · public API · webhooks · optimization · rating · white-label · documents · integration health.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {STEPS.map((s, i) => (
            <Link key={s.to} to={s.to} className="group block">
              <Card className="p-4 h-full hover:border-teal-400/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="rounded-md size-9 bg-teal-500/10 border border-teal-400/30 flex items-center justify-center">
                    <s.icon className="size-4 text-teal-300" />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Step {i + 1}</span>
                </div>
                <div className="font-medium text-sm">{s.title}</div>
                <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
                <div className="mt-3 text-xs text-teal-300 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Open <ArrowRight className="size-3" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
