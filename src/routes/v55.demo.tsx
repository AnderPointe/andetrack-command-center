import { createFileRoute, Link } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { Card } from "@/components/ui/card";
import { ScoreCard } from "@/components/v55/ui-bits";
import { useMarketLeadership, usePlatformDefensibility, useEcosystemMonetization, useCategoryProofHighlights } from "@/v55/hooks";

const STEPS = [
  { actor: "CEO",              action: "Open Market Leadership",          to: "/v55/leadership",      hit: "Leadership 88% · top vs bottom pillars · live alerts" },
  { actor: "CEO",              action: "Open Defensibility",              to: "/v55/defensibility",   hit: "Workflow + enterprise highest · brand lowest" },
  { actor: "COO",              action: "Open Marketplace Economics",      to: "/v55/marketplace-econ",hit: "Take 4.6% · TTA 38m · SE gap" },
  { actor: "VP Partnerships",  action: "Open National Partnerships",      to: "/v55/partnerships",    hit: "2 launch-ready, 1 blocked" },
  { actor: "CRO",              action: "Open Retention & Expansion",      to: "/v55/retention",       hit: "NRR 118% · GRR 94% · 3 expansion-ready" },
  { actor: "Security lead",    action: "Open Cert Evidence Maturity",     to: "/v55/evidence",        hit: "91% fresh · 78% export-ready" },
  { actor: "Executive",        action: "Open Board / Investor",           to: "/v55/board",           hit: "QoQ ARR/NRR/GMV trend bars" },
  { actor: "Strategy lead",    action: "Open Category Narrative",         to: "/v55/narrative",       hit: "Operations command layer POV" },
  { actor: "Strategy lead",    action: "Open Competitive Tracker",        to: "/v55/competitive",     hit: "Win rate 62% · battlecards" },
  { actor: "Executive",        action: "Open Strategic Risks",            to: "/v55/risks",           hit: "Heatmap by category · 2 high" },
  { actor: "Executive",        action: "Open Data Room",                  to: "/v55/data-room",       hit: "Readiness % · DD requests" },
];

export const Route = createFileRoute("/v55/demo")({
  head: () => ({ meta: [{ title: "V5.5 Demo Flow · Anderoute" }] }),
  component: () => {
    const { leadership } = useMarketLeadership();
    const { defensibility } = usePlatformDefensibility();
    const { score: mon } = useEcosystemMonetization();
    const { points } = useCategoryProofHighlights();
    return (
      <V55Page icon={<ListChecks className="size-6 text-amber-300" />} title="V5.5 Demo Flow"
        blurb="End-to-end walkthrough connecting every V5.5 module: executive, ops, partnerships, revenue, security and strategy.">
        <div className="grid gap-3 md:grid-cols-3">
          <ScoreCard label="Leadership" value={leadership.overall} tone="amber" />
          <ScoreCard label="Defensibility" value={defensibility.overall} tone="violet" />
          <ScoreCard label="Monetization" value={mon} tone="emerald" />
        </div>

        <Card className="border-white/10 bg-white/[0.02] p-4 text-xs">
          <h3 className="text-sm font-semibold text-amber-200">Category leadership proof points</h3>
          <ul className="mt-2 space-y-1 text-muted-foreground">
            {points.map(p => <li key={p}>· {p}</li>)}
          </ul>
        </Card>

        <ol className="space-y-2">
          {STEPS.map((s, i) => (
            <li key={i}>
              <Card className="border-white/10 bg-white/[0.02] p-3">
                <div className="flex items-center justify-between text-sm">
                  <div><span className="text-amber-300">{i + 1}. {s.actor}</span> → {s.action}</div>
                  <Link to={s.to} className="text-xs text-amber-300 hover:underline">Open →</Link>
                </div>
                <div className="text-[11px] text-muted-foreground">{s.hit}</div>
              </Card>
            </li>
          ))}
        </ol>
        <div className="grid gap-3 md:grid-cols-2">
          <Card className="border-white/10 bg-white/[0.02] p-4 text-xs">
            <h3 className="text-sm font-semibold">RLS policy stance</h3>
            <ul className="mt-2 space-y-1 text-muted-foreground">
              <li>· <strong>Platform-owner only</strong>: leadership scores, defensibility, board reports, data room — guarded by <code>is_platform_owner(auth.uid())</code>.</li>
              <li>· <strong>Company-scoped</strong>: account plans, retention, monetization metrics — <code>company_id = current_company()</code> + <code>is_company_member()</code>.</li>
              <li>· <strong>Security-lead scoped</strong>: cert evidence + exceptions — restricted via <code>has_role(auth.uid(), company_id, 'security_lead')</code>.</li>
              <li>· <strong>Internal only</strong>: competitive intelligence, strategic risks — no customer/carrier/partner visibility.</li>
              <li>· Customer/carrier/partner users never see internal leadership tables.</li>
            </ul>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4 text-xs">
            <h3 className="text-sm font-semibold">Server boundary</h3>
            <ul className="mt-2 space-y-1 text-muted-foreground">
              <li>· <strong>Internal logic</strong> → TanStack <code>createServerFn</code> with <code>requireSupabaseAuth</code> middleware (V5.5 hooks ready to wire).</li>
              <li>· <strong>External webhooks</strong> (Stripe, Samsara, App Store/Play, EDI, partner) → signature-verified server routes under <code>/api/public/*</code>.</li>
              <li>· <strong>Admin-only ops</strong> (board exports, data-room generation) → server fns gated by <code>is_platform_owner</code>.</li>
              <li>· No fully autonomous dispatch — human approval required on all AI recommendations.</li>
              <li>· No certification/Auto/CarPlay approval claims without tracked evidence.</li>
            </ul>
          </Card>
        </div>
      </V55Page>
    );
  },
});
