import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Upload, Download, FileSpreadsheet, CheckCircle2, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/data/import-export")({
  head: () => ({ meta: [{ title: "Data Import / Export — Anderoute" }] }),
  component: DataIO,
});

const IMPORT_TYPES = ["Drivers","Vehicles","Customers","Loads","Shipments","Locations","Rate sheets","Fuel mileage","Historical deliveries"];
const EXPORT_TYPES = ["Loads","Shipments","Driver performance","Vehicle performance","Customer shipment history","Billing usage","GPS history","Audit logs","POD records","Invoices"];

const JOBS = [
  { id: "j1", type: "import", subject: "Drivers", status: "success", total: 142, ok: 140, err: 2, when: "12m ago" },
  { id: "j2", type: "import", subject: "Customers", status: "success", total: 38, ok: 38, err: 0, when: "1h ago" },
  { id: "j3", type: "export", subject: "Loads (Q1 2026)", status: "ready", total: 4210, ok: 4210, err: 0, when: "3h ago" },
  { id: "j4", type: "import", subject: "Loads (broker batch)", status: "errors", total: 200, ok: 178, err: 22, when: "yesterday" },
];

function DataIO() {
  const [tab, setTab] = useState<"import" | "export">("import");
  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Data Import / Export</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Bulk move data in and out of Anderoute via CSV.</p>
        </div>

        <div className="flex gap-1">
          {(["import","export"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`rounded-md border px-3 py-1.5 text-xs capitalize ${tab === t ? "border-teal-400/50 bg-teal-500/10 text-teal-200" : "border-white/10 bg-white/[0.02] text-muted-foreground hover:border-white/20"}`}>{t}</button>
          ))}
        </div>

        <Card className="p-5">
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">{tab === "import" ? "Import CSV" : "Export data"}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {(tab === "import" ? IMPORT_TYPES : EXPORT_TYPES).map((t) => (
              <button key={t} className="rounded-md border border-white/5 bg-white/[0.02] p-3 text-sm hover:border-teal-400/40 text-left">
                <FileSpreadsheet className="size-4 text-teal-300 mb-1.5" />
                {t}
              </button>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            {tab === "import" ? (
              <>
                <Button size="sm"><Upload className="size-3.5 mr-1.5" />Upload CSV</Button>
                <Button size="sm" variant="outline">Download template</Button>
              </>
            ) : (
              <Button size="sm"><Download className="size-3.5 mr-1.5" />Start export</Button>
            )}
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Recent jobs</h2>
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground">
              <tr className="border-b border-white/5"><th className="text-left py-2 pr-3">Job</th><th className="text-left py-2 pr-3">Type</th><th className="text-left py-2 pr-3">Status</th><th className="text-left py-2 pr-3">Records</th><th className="text-left py-2 pr-3">When</th></tr>
            </thead>
            <tbody>
              {JOBS.map((j) => (
                <tr key={j.id} className="border-b border-white/[0.04]">
                  <td className="py-2 pr-3">{j.subject}</td>
                  <td className="py-2 pr-3 text-xs text-muted-foreground capitalize">{j.type}</td>
                  <td className="py-2 pr-3">
                    {j.status === "errors" ? <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30"><AlertCircle className="size-3 mr-1" />Errors</Badge>
                      : <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30"><CheckCircle2 className="size-3 mr-1" />{j.status}</Badge>}
                  </td>
                  <td className="py-2 pr-3 text-xs tabular-nums">{j.ok}/{j.total}{j.err > 0 && <span className="text-rose-300 ml-1">({j.err} err)</span>}</td>
                  <td className="py-2 pr-3 text-xs text-muted-foreground">{j.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </AppShell>
  );
}
