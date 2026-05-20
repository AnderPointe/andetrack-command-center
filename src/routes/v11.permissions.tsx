import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { V11Page } from "@/components/v11/V11Page";
import { StatTile } from "@/components/v1/StatTile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PERMISSION_MATRIX, PERMISSION_TEST_RUNS } from "@/v11/data/mockPhase15";

export const Route = createFileRoute("/v11/permissions")({
  head: () => ({ meta: [{ title: "V1.1 Permissions · Anderoute" }] }),
  component: Page,
});

function cell(v: boolean) {
  return v ? <span className="text-emerald-300">✓</span> : <span className="text-muted-foreground">—</span>;
}

function Page() {
  const passed = PERMISSION_TEST_RUNS.filter((r) => r.expected === r.actual).length;
  const pct = Math.round((passed / PERMISSION_TEST_RUNS.length) * 100);
  return (
    <V11Page
      icon={<Users className="size-6 text-fuchsia-300" />}
      title="Permission Matrix V1.1"
      blurb="Clear role boundaries with an executable test suite. Drivers cannot see other drivers; customers see only their own shipments."
    >
      <div className="grid gap-3 md:grid-cols-3">
        <StatTile label="Permissions defined" value={PERMISSION_MATRIX.length} tone="info" />
        <StatTile label="Tests passing" value={`${passed}/${PERMISSION_TEST_RUNS.length}`} tone={pct === 100 ? "good" : "bad"} />
        <StatTile label="Coverage" value={`${pct}%`} tone={pct === 100 ? "good" : "warn"} />
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="p-2">Permission</th>
              <th className="p-2">Admin</th>
              <th className="p-2">Dispatcher</th>
              <th className="p-2">Driver</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Platform owner</th>
            </tr>
          </thead>
          <tbody>
            {PERMISSION_MATRIX.map((r) => (
              <tr key={r.perm} className="border-t border-white/10">
                <td className="p-2">{r.perm}</td>
                <td className="p-2">{cell(r.admin)}</td>
                <td className="p-2">{cell(r.dispatcher)}</td>
                <td className="p-2">{cell(r.driver)}</td>
                <td className="p-2">{cell(r.customer)}</td>
                <td className="p-2">{cell(r.owner)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Permission test runs</h2>
        <div className="mt-3 space-y-2 text-sm">
          {PERMISSION_TEST_RUNS.map((r, i) => {
            const ok = r.expected === r.actual;
            return (
              <div key={i} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                <div>
                  <span className="font-mono text-xs text-muted-foreground">{r.role}</span> · {r.permission}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">exp {String(r.expected)} · got {String(r.actual)}</span>
                  <Badge variant="outline" className={ok ? "border-emerald-500/30 text-emerald-300" : "border-rose-500/30 text-rose-300"}>
                    {ok ? "pass" : "fail"}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </V11Page>
  );
}
