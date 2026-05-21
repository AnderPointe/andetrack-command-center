import { createFileRoute } from "@tanstack/react-router";
import { KeyRound } from "lucide-react";
import { V2Page } from "@/components/v2/V2Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { API_KEYS, API_LOGS, API_KEY_LIFECYCLE } from "@/v2/data/mockPhase17";

export const Route = createFileRoute("/v2/api-keys")({
  head: () => ({ meta: [{ title: "API Keys · Anderoute" }] }),
  component: Page,
});

const statusTone = (code: number) =>
  code >= 500 ? "border-rose-500/30 text-rose-300"
  : code >= 400 ? "border-amber-500/30 text-amber-300"
  : "border-emerald-500/30 text-emerald-300";

function Page() {
  return (
    <V2Page
      icon={<KeyRound className="size-6 text-violet-300" />}
      title="API Key Manager"
      blurb="Per-company keys with scope assignment, rotation, and revocation. Plaintext shown once on creation. All actions are audited."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Active keys</h2>
          <Button size="sm" className="h-8 bg-violet-600 text-xs hover:bg-violet-500">+ Create key</Button>
        </div>
        <div className="mt-3 space-y-2 text-sm">
          {API_KEYS.map((k) => (
            <div key={k.id} className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="font-medium">{k.name}</div>
                  <div className="text-xs text-muted-foreground font-mono">{k.prefix}… · created by {k.createdBy}</div>
                </div>
                <Badge variant="outline" className={k.revoked ? "border-white/15 text-muted-foreground" : "border-emerald-500/30 text-emerald-300"}>
                  {k.revoked ? "revoked" : "active"}
                </Badge>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {k.scopes.map((s) => (
                  <Badge key={s} variant="outline" className="border-white/15 text-xs font-mono">{s}</Badge>
                ))}
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>Last used {k.lastUsedAt}</span>
                {!k.revoked && (
                  <div className="flex gap-1.5">
                    <Button size="sm" variant="outline" className="h-7 text-xs">Rotate</Button>
                    <Button size="sm" variant="ghost" className="h-7 text-xs text-rose-300 hover:text-rose-200">Revoke</Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Request log</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr><th className="p-2">Key</th><th className="p-2">Method</th><th className="p-2">Path</th><th className="p-2">Status</th><th className="p-2">Latency</th><th className="p-2">At</th></tr>
            </thead>
            <tbody>
              {API_LOGS.map((l) => (
                <tr key={l.id} className="border-t border-white/10">
                  <td className="p-2 font-mono text-xs">{l.key}</td>
                  <td className="p-2">{l.method}</td>
                  <td className="p-2 font-mono text-xs">{l.path}</td>
                  <td className="p-2"><Badge variant="outline" className={statusTone(l.status)}>{l.status}</Badge></td>
                  <td className="p-2">{l.latencyMs}ms</td>
                  <td className="p-2 text-xs text-muted-foreground">{l.at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </V2Page>
  );
}
