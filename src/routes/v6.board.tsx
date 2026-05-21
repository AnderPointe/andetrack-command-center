import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { V6Page } from "@/components/v6/V6Page";
import { SimpleTable, StatusPill } from "@/components/v6/ui-bits";
import { Card } from "@/components/ui/card";
import { useBoardGovernance, useBoardKpis } from "@/v6/hooks";

export const Route = createFileRoute("/v6/board")({
  head: () => ({ meta: [{ title: "Board OS · V6" }] }),
  component: () => {
    const { meetings, agenda, decisions, actions } = useBoardGovernance();
    const { kpis } = useBoardKpis();
    return (
      <V6Page icon={<Briefcase className="size-6 text-emerald-300" />} title="Board Governance Operating System"
        blurb="Meeting calendar, agenda + packet builder, KPI/risk review, decision and action tracking, QOR and investor update workflows.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Board KPI scorecard</h3>
          <div className="mt-2 grid gap-2 md:grid-cols-3">
            {kpis.map(k => {
              const hit = k.v >= k.target;
              return (
                <div key={k.k} className="rounded border border-white/10 bg-black/20 p-3 text-xs">
                  <div className="flex justify-between"><span className="text-muted-foreground">{k.k}</span><span className={hit ? "text-emerald-300" : "text-amber-300"}>{hit ? "on" : "below"}</span></div>
                  <div className="mt-1 flex justify-between"><span className="tabular-nums">{k.v}</span><span className="text-muted-foreground">target {k.target}</span></div>
                </div>
              );
            })}
          </div>
        </Card>
        <div className="grid gap-3 md:grid-cols-2">
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Meetings</h3>
            <div className="mt-2">
              <SimpleTable rows={meetings} columns={[
                { key: "date",   label: "Date" },
                { key: "title",  label: "Title" },
                { key: "status", label: "Status", render: (r) => <StatusPill status={r.status} /> },
              ]} />
            </div>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Next board packet — agenda</h3>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-xs text-muted-foreground">
              {agenda.map(a => <li key={a}>{a}</li>)}
            </ol>
          </Card>
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Decisions</h3>
          <div className="mt-2">
            <SimpleTable rows={decisions} columns={[
              { key: "topic",  label: "Topic" },
              { key: "owner",  label: "Owner" },
              { key: "status", label: "Status", render: (r) => <StatusPill status={r.status} /> },
            ]} />
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Action items</h3>
          <div className="mt-2">
            <SimpleTable rows={actions} columns={[
              { key: "action", label: "Action" },
              { key: "owner",  label: "Owner" },
              { key: "due",    label: "Due" },
              { key: "status", label: "Status", render: (r) => <StatusPill status={r.status} /> },
            ]} />
          </div>
        </Card>
      </V6Page>
    );
  },
});
