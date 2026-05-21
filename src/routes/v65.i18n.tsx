import { createFileRoute } from "@tanstack/react-router";
import { Languages } from "lucide-react";
import { V65Page } from "@/components/v65/V65Page";
import { KpiGrid, SimpleTable, StatusPill } from "@/components/v65/ui-bits";
import { Card } from "@/components/ui/card";
import { useInternationalizationPlanning } from "@/v65/hooks";

export const Route = createFileRoute("/v65/i18n")({
  head: () => ({ meta: [{ title: "i18n Planning · V6.5 · Anderoute" }] }),
  component: () => {
    const { keys, locales } = useInternationalizationPlanning();
    return (
      <V65Page icon={<Languages className="size-6 text-cyan-300" />} title="Internationalization Planning"
        blurb="Translation key inventory, locale settings, date/currency/units formatting, time zone planning, customer portal + driver app localization preview.">
        <KpiGrid cols={5} items={[
          { label: "Total keys",  value: keys.total.toLocaleString() },
          { label: "es coverage", value: `${Math.round(keys.translated_es / keys.total * 100)}%` },
          { label: "fr coverage", value: `${Math.round(keys.translated_fr / keys.total * 100)}%` },
          { label: "de coverage", value: `${Math.round(keys.translated_de / keys.total * 100)}%` },
          { label: "pt coverage", value: `${Math.round(keys.translated_pt / keys.total * 100)}%` },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Locale settings</h3>
          <div className="mt-2">
            <SimpleTable rows={locales} columns={[
              { key: "locale",   label: "Locale" },
              { key: "date",     label: "Date" },
              { key: "currency", label: "Currency" },
              { key: "units",    label: "Units" },
              { key: "status",   label: "Status", render: (r) => <StatusPill status={r.status} /> },
            ]} />
          </div>
        </Card>
      </V65Page>
    );
  },
});
