import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { V11Page } from "@/components/v11/V11Page";
import { Card } from "@/components/ui/card";
import { PERMISSION_MATRIX } from "@/v11/data/mockPhase15";

export const Route = createFileRoute("/v11/permissions")({
  head: () => ({ meta: [{ title: "V1.1 Permissions · Anderoute" }] }),
  component: Page,
});

function cell(v: boolean) {
  return v ? <span className="text-emerald-300">✓</span> : <span className="text-muted-foreground">—</span>;
}

function Page() {
  return (
    <V11Page
      icon={<Users className="size-6 text-fuchsia-300" />}
      title="Permission Matrix V1.1"
      blurb="Clear role boundaries. Tested via the permission test tool. Drivers cannot see other drivers; customers see only their own shipments."
    >
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
    </V11Page>
  );
}
