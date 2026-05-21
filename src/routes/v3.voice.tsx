import { createFileRoute } from "@tanstack/react-router";
import { Mic } from "lucide-react";
import { V3Page } from "@/components/v3/V3Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VOICE_PROVIDERS, VOICE_TRANSCRIPTS, VOICE_SAFETY_POLICY, VOICE_CONFIRMATION_FLOW, VOICE_ARCHITECTURE } from "@/v3/data/mockPhase19";

export const Route = createFileRoute("/v3/voice")({
  head: () => ({ meta: [{ title: "Advanced Voice · Anderoute V3" }] }),
  component: () => (
    <V3Page icon={<Mic className="size-6 text-sky-300" />} title="Advanced CoPilot Voice"
      blurb="Push-to-talk, voice command confirmation, driver-safe responses, parked-mode longer answers, offline command queue, and privacy controls. AI accuracy not guaranteed — confirmations required for irreversible actions.">
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h2 className="text-sm font-semibold">Voice providers</h2>
          <ul className="mt-2 space-y-1.5 text-sm">
            {VOICE_PROVIDERS.map((p) => (
              <li key={p.id} className="flex items-center justify-between rounded border border-white/10 bg-black/20 px-2 py-1.5">
                <span>{p.label}</span>
                <Badge variant="outline" className={p.status === "ready" ? "border-emerald-500/40 text-emerald-300" : "border-amber-500/40 text-amber-300"}>{p.status}</Badge>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h2 className="text-sm font-semibold">Voice safety policy</h2>
          <table className="mt-2 w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-1">Mode</th><th className="p-1">Max words</th><th className="p-1">Allowed</th></tr></thead>
            <tbody>{VOICE_SAFETY_POLICY.map((p) => (
              <tr key={p.mode} className="border-t border-white/10"><td className="p-1 font-medium">{p.mode}</td><td className="p-1 font-mono">{p.maxWords}</td><td className="p-1 text-muted-foreground">{p.allowed}</td></tr>
            ))}</tbody>
          </table>
        </Card>
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Voice architecture stages</h2>
        <table className="mt-2 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-1">Stage</th><th className="p-1">Owner</th><th className="p-1">Implementation</th></tr></thead>
          <tbody>{VOICE_ARCHITECTURE.map((s) => (
            <tr key={s.stage} className="border-t border-white/10"><td className="p-1 font-medium">{s.stage}</td><td className="p-1 text-xs text-muted-foreground">{s.responsibility}</td><td className="p-1 text-xs text-muted-foreground">{s.impl}</td></tr>
          ))}</tbody>
        </table>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Voice confirmation flow</h2>
        <table className="mt-2 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-1">Intent</th><th className="p-1">Irreversible</th><th className="p-1">Confirm</th><th className="p-1">Spoken prompt</th></tr></thead>
          <tbody>{VOICE_CONFIRMATION_FLOW.map((c) => (
            <tr key={c.intent} className="border-t border-white/10"><td className="p-1 font-mono text-xs">{c.intent}</td><td className="p-1">{c.irreversible ? <Badge variant="outline" className="border-rose-500/40 text-rose-300">yes</Badge> : <span className="text-xs text-muted-foreground">no</span>}</td><td className="p-1 text-xs">{c.confirm}</td><td className="p-1 text-xs text-muted-foreground">"{c.spoken}"</td></tr>
          ))}</tbody>
        </table>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Recent voice transcript audit</h2>
        <table className="mt-2 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-1">Time</th><th className="p-1">Driver</th><th className="p-1">Utterance</th><th className="p-1">CoPilot</th><th className="p-1">Confirmed</th></tr></thead>
          <tbody>{VOICE_TRANSCRIPTS.map((t, i) => (
            <tr key={i} className="border-t border-white/10"><td className="p-1 font-mono text-xs">{t.ts}</td><td className="p-1">{t.driver}</td><td className="p-1">{t.utterance}</td><td className="p-1 text-muted-foreground">{t.response}</td><td className="p-1">{t.confirmed ? <Badge variant="outline" className="border-emerald-500/40 text-emerald-300">yes</Badge> : <Badge variant="outline" className="border-amber-500/40 text-amber-300">pending</Badge>}</td></tr>
          ))}</tbody>
        </table>
      </Card>
    </V3Page>
  ),
});
