import { createFileRoute } from "@tanstack/react-router";
import { GitBranch } from "lucide-react";
import { V25Page } from "@/components/v25/V25Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EDI_MAPPINGS, EDI_MAPPING_FIELDS } from "@/v25/data/mockPhase18";

export const Route = createFileRoute("/v25/edi-mappings")({
  head: () => ({ meta: [{ title: "EDI Mappings · Anderoute" }] }),
  component: () => (
    <V25Page icon={<GitBranch className="size-6 text-emerald-300" />} title="EDI Mapping Manager" blurb="Versioned partner-specific mappings with required-field validation, transform rules, default values, and test runner.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Mappings</h2>
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-2">Partner</th><th className="p-2">Doc</th><th className="p-2">Version</th><th className="p-2">Fields</th><th className="p-2">Tests</th><th className="p-2">Edited</th></tr></thead>
          <tbody>
            {EDI_MAPPINGS.map((m) => (
              <tr key={m.id} className="border-t border-white/10">
                <td className="p-2">{m.partner}</td><td className="p-2 font-mono text-xs">{m.doc}</td>
                <td className="p-2"><Badge variant="outline" className="border-sky-500/30 text-sky-300">{m.version}</Badge></td>
                <td className="p-2 font-mono text-xs">{m.fields}</td>
                <td className="p-2 text-xs"><span className="text-emerald-300">{m.testsPass}✓</span> {m.testsFail > 0 && <span className="text-rose-300 ml-1">{m.testsFail}✗</span>}</td>
                <td className="p-2 text-xs text-muted-foreground">{m.lastEdited}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Sample 204 mapping (Acme v3)</h2>
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-2">EDI field</th><th className="p-2">Target</th><th className="p-2">Required</th><th className="p-2">Transform</th><th className="p-2">Default</th></tr></thead>
          <tbody>
            {EDI_MAPPING_FIELDS.map((f) => (
              <tr key={f.ediField} className="border-t border-white/10">
                <td className="p-2 font-mono text-xs">{f.ediField}</td>
                <td className="p-2 font-mono text-xs text-violet-300">{f.target}</td>
                <td className="p-2">{f.required ? <Badge variant="outline" className="border-amber-500/30 text-amber-300">required</Badge> : <span className="text-xs text-muted-foreground">optional</span>}</td>
                <td className="p-2 text-xs">{f.transform}</td>
                <td className="p-2 text-xs text-muted-foreground">{f.defaultValue ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </V25Page>
  ),
});
