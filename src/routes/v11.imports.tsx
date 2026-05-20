import { createFileRoute } from "@tanstack/react-router";
import { Upload } from "lucide-react";
import { V11Page } from "@/components/v11/V11Page";
import { StatTile } from "@/components/v1/StatTile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IMPORT_FIELDS, IMPORT_PREVIEWS, type ImportKind } from "@/v11/data/mockPhase15";

export const Route = createFileRoute("/v11/imports")({
  head: () => ({ meta: [{ title: "V1.1 CSV Imports · Anderoute" }] }),
  component: Page,
});

const KINDS: { id: ImportKind; label: string }[] = [
  { id: "driver",   label: "Drivers"   },
  { id: "vehicle",  label: "Vehicles"  },
  { id: "customer", label: "Customers" },
];

function Page() {
  return (
    <V11Page
      icon={<Upload className="size-6 text-fuchsia-300" />}
      title="CSV Import Tools"
      blurb="Upload → map columns → validate → preview → confirm. Audit logs, error reports, and idempotency on retry. Drivers, vehicles, and customers in V1.1."
    >
      <div className="grid gap-3 md:grid-cols-3">
        {IMPORT_PREVIEWS.map((p) => (
          <StatTile
            key={p.kind}
            label={`${p.kind} preview`}
            value={`${p.valid}/${p.total}`}
            hint={`${p.invalid} invalid · ${p.warnings} warnings`}
            tone={p.invalid === 0 ? "good" : "warn"}
          />
        ))}
      </div>

      {KINDS.map((k) => {
        const fields = IMPORT_FIELDS.filter((f) => f.kind === k.id);
        const preview = IMPORT_PREVIEWS.find((p) => p.kind === k.id)!;
        return (
          <Card key={k.id} className="border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">{k.label} import</h2>
              <Badge variant="outline" className="border-white/15 text-muted-foreground">
                {fields.length} fields
              </Badge>
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Fields</div>
                <ul className="mt-1 grid gap-1 text-sm md:grid-cols-2">
                  {fields.map((f) => (
                    <li key={f.field} className="font-mono text-xs">
                      {f.field} {f.required && <span className="text-rose-300">*</span>}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Validation result</div>
                <div className="mt-1 rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
                  <div>{preview.valid} valid · {preview.invalid} invalid · {preview.warnings} warnings</div>
                  {preview.errors.length > 0 && (
                    <ul className="mt-2 space-y-0.5 text-xs text-rose-200/90">
                      {preview.errors.map((e, i) => (
                        <li key={i}>Row {e.row} · <span className="font-mono">{e.field}</span> — {e.message}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </Card>
        );
      })}

      <Card className="border-white/10 bg-white/[0.02] p-4 text-sm text-muted-foreground">
        <p>Wizard steps: <span className="text-foreground">Upload → Map columns → Validate → Preview → Confirm → Audit</span>. Errors downloadable as CSV; re-uploads use idempotency keys to prevent duplicates.</p>
      </Card>
    </V11Page>
  );
}
