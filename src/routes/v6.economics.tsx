import { createFileRoute } from "@tanstack/react-router";
import { DollarSign } from "lucide-react";
import { V6Page } from "@/components/v6/V6Page";
import { ScoreCard, KpiGrid, SimpleTable } from "@/components/v6/ui-bits";
import { Card } from "@/components/ui/card";
import { usePlatformEconomics } from "@/v6/hooks";

export const Route = createFileRoute("/v6/economics")({
  head: () => ({ meta: [{ title: "Platform Economics · V6" }] }),
  component: () => {
    const { economics: e, segments, regions } = usePlatformEconomics();
    const lines = [
      { line: "SaaS",                arr: e.saas },
      { line: "Marketplace",         arr: e.marketplace },
      { line: "API",                 arr: e.api },
      { line: "EDI (pl)",            arr: e.edi_pl },
      { line: "Telematics (pl)",     arr: e.telematics_pl },
      { line: "Enterprise support",  arr: e.enterprise_support },
      { line: "Services",            arr: e.services },
      { line: "Carrier subs",        arr: e.carrier_subs },
      { line: "Partner share (pl)",  arr: e.partner_share_pl },
    ];
    return (
      <V6Page icon={<DollarSign className="size-6 text-emerald-300" />} title="Platform Economics Command Center"
        blurb="Revenue by product line, segment and region with retention, expansion, CAC/LTV, gross margin and quality score. All financial figures are placeholders for category narrative only.">
        <div className="grid gap-3 md:grid-cols-4">
          <ScoreCard label="Quality score" value={e.quality_score} tone="emerald" />
          <ScoreCard label="NRR (pl)" value={e.nrr_pl} tone="sky" />
          <ScoreCard label="GRR (pl)" value={e.grr_pl} tone="violet" />
          <ScoreCard label="Gross margin (pl)" value={e.gross_margin_pl} tone="amber" />
        </div>
        <KpiGrid cols={4} items={[
          { label: "Total ARR (pl)", value: `$${e.total_arr_pl}M` },
          { label: "CAC (pl)", value: `$${e.cac_pl.toLocaleString()}` },
          { label: "LTV (pl)", value: `$${(e.ltv_pl/1000).toFixed(0)}k` },
          { label: "Expansion pipeline (pl)", value: `$${e.expansion_pipeline_pl}M` },
        ]} />
        <div className="grid gap-3 md:grid-cols-2">
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">By product line</h3>
            <div className="mt-2"><SimpleTable rows={lines} columns={[{ key: "line", label: "Line" }, { key: "arr", label: "ARR (pl)" }]} /></div>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">By segment</h3>
            <div className="mt-2"><SimpleTable rows={segments} columns={[{ key: "seg", label: "Segment" }, { key: "arr", label: "ARR (pl)" }, { key: "share", label: "Share %" }]} /></div>
          </Card>
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Revenue index by region (placeholder)</h3>
          <div className="mt-2 grid grid-cols-3 gap-2 text-xs md:grid-cols-5">
            {regions.map(r => (
              <div key={r.region} className="rounded border border-white/10 bg-black/20 p-2">
                <div className="text-muted-foreground">{r.region}</div>
                <div className={r.idx >= 1.05 ? "text-emerald-300" : r.idx >= 0.95 ? "text-sky-300" : "text-amber-300"}>{r.idx.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </Card>
      </V6Page>
    );
  },
});
