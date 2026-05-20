import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { MvpNav } from "@/components/mvp/MvpNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/mvp/security")({
  head: () => ({ meta: [{ title: "Security Cutline — Anderoute" }] }),
  component: SecurityPage,
});

const MUST = [
  "Supabase Auth (email/password + reset)",
  "RLS on all tenant tables",
  "Company ID scoping everywhere",
  "Role-based permission gates",
  "No service role key in frontend",
  "Secure storage for mobile session",
  "Driver consent before GPS collection",
  "Audit logs for key events",
  "Storage bucket policies (POD)",
  "Basic rate limiting plan",
  "Input validation (Zod)",
  "Error handling + logging",
  "Environment separation (dev / staging / pilot prod)",
];

const DEFER = [
  "SSO / SAML",
  "SCIM provisioning",
  "Advanced SOC 2 automation",
  "Advanced vulnerability management dashboard",
  "API marketplace",
  "Customer-managed encryption keys",
  "Advanced device posture checks",
];

function SecurityPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <Badge variant="outline" className="border-cyan-500/40 text-cyan-300">Phase 11 · Security</Badge>
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-6 text-cyan-300" />
            <h1 className="text-2xl font-semibold">MVP Security Cutline</h1>
          </div>
          <MvpNav />
        </header>

        <div className="grid gap-3 md:grid-cols-2">
          <Card className="border-emerald-500/20 bg-emerald-500/[0.03] p-4">
            <h3 className="text-sm font-medium text-emerald-200">Must have in MVP</h3>
            <ul className="mt-2 space-y-1 text-sm">{MUST.map((m) => <li key={m}>· {m}</li>)}</ul>
          </Card>
          <Card className="border-rose-500/20 bg-rose-500/[0.03] p-4">
            <h3 className="text-sm font-medium text-rose-200">Defer (post-pilot / enterprise)</h3>
            <ul className="mt-2 space-y-1 text-sm">{DEFER.map((d) => <li key={d}>· {d}</li>)}</ul>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
