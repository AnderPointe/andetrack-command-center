import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { SecurityNav } from "@/components/security/SecurityNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePrivacyControls } from "@/security/hooks/useSecurityData";
import { UserCheck, Lock, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/security/privacy")({
  head: () => ({
    meta: [
      { title: "Driver Privacy Center — Anderoute" },
      { name: "description", content: "Driver consent posture, privacy controls, retention summary, and platform-locked safeguards." },
    ],
  }),
  component: PrivacyCenter,
});

const STATE_TONE: Record<string, string> = {
  on:       "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  off:      "bg-slate-500/15 text-slate-300 border-slate-500/30",
  "opt-in": "bg-blue-500/15 text-blue-300 border-blue-500/30",
  locked:   "bg-violet-500/15 text-violet-300 border-violet-500/30",
};

const SCOPE_TONE: Record<string, string> = {
  driver:   "bg-teal-500/10 text-teal-300 border-teal-500/30",
  company:  "bg-amber-500/10 text-amber-300 border-amber-500/30",
  platform: "bg-violet-500/10 text-violet-300 border-violet-500/30",
};

const RIGHTS = [
  { title: "Right to access",   note: "Driver can export full location + consent history via app." },
  { title: "Right to deletion", note: "On termination, driver data anonymized within 30 days; legal-hold rows preserved." },
  { title: "Right to revoke",   note: "Background location consent revocable any time — no service penalty." },
  { title: "Right to know",     note: "Privacy notice surfaces every consent toggle and what it does." },
];

function PrivacyCenter() {
  const { controls } = usePrivacyControls();
  const locked = controls.filter((c) => c.state === "locked").length;
  const optIn  = controls.filter((c) => c.state === "opt-in").length;
  const on     = controls.filter((c) => c.state === "on").length;
  const off    = controls.filter((c) => c.state === "off").length;

  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <SecurityNav />
        <header className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <UserCheck className="size-5 text-teal-300" />
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Driver Privacy Center</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Consent posture, default-off rules, and platform-locked safeguards drivers can verify.
              </p>
            </div>
          </div>
          <div className="flex gap-2 text-[11px]">
            <Badge className={STATE_TONE.on}>{on} on</Badge>
            <Badge className={STATE_TONE["opt-in"]}>{optIn} opt-in</Badge>
            <Badge className={STATE_TONE.off}>{off} off</Badge>
            <Badge className={STATE_TONE.locked}>{locked} locked</Badge>
          </div>
        </header>

        <Card className="p-5">
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Privacy controls</h2>
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {controls.map((c) => (
              <li key={c.key} className="rounded-md border border-white/5 bg-white/[0.02] p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      {c.state === "locked" && <Lock className="size-3.5 text-violet-300 shrink-0" />}
                      <span className="text-sm font-medium">{c.label}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{c.note}</p>
                  </div>
                  <div className="flex flex-col gap-1 items-end shrink-0">
                    <Badge className={STATE_TONE[c.state]}>{c.state}</Badge>
                    <Badge className={`${SCOPE_TONE[c.scope]} text-[10px]`}>{c.scope}</Badge>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert className="size-4 text-teal-300" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Driver rights</h2>
            </div>
            <ul className="space-y-2">
              {RIGHTS.map((r) => (
                <li key={r.title} className="rounded-md border border-white/5 bg-white/[0.02] p-3">
                  <div className="text-sm font-medium">{r.title}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{r.note}</div>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-5">
            <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Retention summary (driver data)</h2>
            <ul className="space-y-1.5 text-xs">
              {[
                ["Raw GPS events",        "30 days → aggregated"],
                ["Navigation events",     "365 days → deleted"],
                ["Voice transcripts",     "90 days → deleted (opt-in only)"],
                ["Raw audio",             "Never stored (platform-locked)"],
                ["Consent history",       "7 years (immutable audit)"],
                ["Crash logs",            "60 days, PII-scrubbed"],
              ].map(([k, v]) => (
                <li key={k} className="flex items-center justify-between border-b border-white/[0.04] pb-1.5">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-medium">{v}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] text-muted-foreground">
              Full retention rules and triggers live in <span className="font-mono">/ops/database</span>.
            </p>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
