import { createFileRoute } from "@tanstack/react-router";
import { ListTodo } from "lucide-react";
import { V35Page } from "@/components/v35/V35Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { COMPLIANCE_TASKS, COMPLIANCE_CATEGORIES } from "@/v35/data/mockPhase20";

export const Route = createFileRoute("/v35/compliance")({
  head: () => ({ meta: [{ title: "Compliance Automation · Anderoute V3.5" }] }),
  component: () => (
    <V35Page icon={<ListTodo className="size-6 text-amber-300" />} title="Compliance Automation (placeholder)"
      blurb="Task queue across driver, vehicle, carrier, insurance, retention, audit, and API access. Legal compliance automation is not complete.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Categories</h3>
        <div className="mt-2 flex flex-wrap gap-1.5">{COMPLIANCE_CATEGORIES.map((c) => (
          <Badge key={c} variant="outline" className="border-white/15 text-xs text-muted-foreground">{c}</Badge>
        ))}</div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Task queue</h3>
        <table className="mt-2 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-1">Category</th><th className="p-1">Task</th><th className="p-1">Due</th><th className="p-1">Status</th></tr></thead>
          <tbody>{COMPLIANCE_TASKS.map((t) => (
            <tr key={t.id} className="border-t border-white/10"><td className="p-1 text-xs text-muted-foreground">{t.category}</td><td className="p-1">{t.title}</td><td className="p-1 font-mono">{t.due}</td><td className="p-1"><Badge variant="outline" className={t.status === "open" ? "border-amber-500/40 text-amber-300" : "border-sky-500/40 text-sky-300"}>{t.status}</Badge></td></tr>
          ))}</tbody>
        </table>
      </Card>
    </V35Page>
  ),
});
