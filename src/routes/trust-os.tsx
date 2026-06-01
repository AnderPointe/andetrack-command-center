import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ShieldCheck,
  Activity,
  Users,
  Truck,
  Landmark,
  DollarSign,
  Gavel,
  Zap,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import {
  useBoardTrustReports,
  useCustomerTrustProfiles,
  useGovernanceReviews,
  useMarketplacePolicies,
  usePartnerTrustProfiles,
  useRevenueTrustIntelligence,
  useTrustAutomationRuns,
  useTrustScorecards,
  useTrustSignals,
} from "@/hooks/useTrust";
import {
  approveBoardTrustReport,
  calculateRevenueTrustSummary,
  createBoardTrustReportPreview,
  createTrustSignal,
  runAutomationPreview,
} from "@/lib/trustService";
import { DEMO_COMPANY_ID, maturityBand } from "@/types/trust";
import { toast } from "sonner";

export const Route = createFileRoute("/trust-os")({
  head: () => ({
    meta: [
      { title: "Trust OS — Enterprise Trust Intelligence" },
      { name: "description", content: "Enterprise Trust Intelligence Operating System for executive trust, customer/partner maturity, board reports, revenue trust, and marketplace governance." },
    ],
  }),
  component: TrustOSPage,
});

function TrustOSPage() {
  const companyId = DEMO_COMPANY_ID;
  const scorecards = useTrustScorecards(companyId);
  const signals = useTrustSignals(companyId);
  const customers = useCustomerTrustProfiles(companyId);
  const partners = usePartnerTrustProfiles(companyId);
  const reports = useBoardTrustReports(companyId);
  const revenue = useRevenueTrustIntelligence(companyId);
  const policies = useMarketplacePolicies(companyId);
  const reviews = useGovernanceReviews(companyId);
  const runs = useTrustAutomationRuns(companyId);

  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-5">
        <Header />
        <EnterpriseTrustScorePanel scorecards={scorecards.data} loading={scorecards.loading} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-5">
            <CustomerTrustMaturityPanel data={customers.data} loading={customers.loading} />
            <PartnerTrustMaturityPanel data={partners.data} loading={partners.loading} />
            <RevenueTrustIntelligencePanel data={revenue.data} loading={revenue.loading} />
            <BoardTrustAutomationPanel
              reports={reports.data}
              loading={reports.loading}
              companyId={companyId}
              onCreated={() => reports.refresh()}
            />
            <MarketplaceTrustGovernancePanel
              policies={policies.data}
              reviews={reviews.data}
              partners={partners.data}
              loading={policies.loading}
              onReviewed={() => reviews.refresh()}
              companyId={companyId}
            />
          </div>
          <div className="space-y-5">
            <TrustSignalFeed data={signals.data} loading={signals.loading} companyId={companyId} onCreated={() => signals.refresh()} />
            <TrustActionQueue
              signals={signals.data}
              reviews={reviews.data}
              revenue={revenue.data}
            />
            <TrustAutomationRunPanel
              runs={runs.data}
              loading={runs.loading}
              companyId={companyId}
              onRan={() => runs.refresh()}
            />
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Header() {
  return (
    <div className="glass-panel p-5 flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <ShieldCheck className="size-3.5 text-teal" /> V24 Enterprise Trust OS
        </div>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Trust Intelligence Command Center</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Executive trust posture across customers, partners, revenue, and marketplace governance.
        </p>
      </div>
      <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
        <span className="size-2 rounded-full bg-success animate-pulse" />
        Realtime
      </div>
    </div>
  );
}

function Card({ title, icon: Icon, action, children }: { title: string; icon: React.ElementType; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold tracking-tight flex items-center gap-2">
          <Icon className="size-4 text-teal" />
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function ScoreRing({ score }: { score: number }) {
  const band = maturityBand(score);
  return (
    <div className="flex items-center gap-3">
      <div className="relative size-16 grid place-items-center rounded-full border-4 border-border" style={{ borderColor: `color-mix(in oklab, var(--teal) ${Math.min(score, 100)}%, var(--border))` }}>
        <span className="text-lg font-semibold tabular-nums">{Math.round(score)}</span>
      </div>
      <div>
        <div className={`text-sm font-semibold ${band.tone}`}>{band.label}</div>
        <div className="text-[11px] text-muted-foreground uppercase tracking-wider">Trust Score</div>
      </div>
    </div>
  );
}

function MetricBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-[11px] text-muted-foreground mb-1">
        <span>{label}</span>
        <span className="tabular-nums">{Math.round(value)}</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div className="h-full bg-gradient-to-r from-teal to-orange" style={{ width: `${Math.min(100, value)}%` }} />
      </div>
    </div>
  );
}

function EnterpriseTrustScorePanel({ scorecards, loading }: { scorecards: ReturnType<typeof useTrustScorecards>["data"]; loading: boolean }) {
  const company = scorecards?.find((s) => s.entity_type === "company");
  return (
    <Card title="Enterprise Trust Score" icon={Landmark}>
      {loading ? (
        <Skeleton />
      ) : !company ? (
        <Empty msg="No enterprise scorecard yet." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <ScoreRing score={Number(company.trust_score)} />
            <div className="text-xs text-muted-foreground">{company.summary}</div>
            {company.recommended_action && (
              <div className="text-xs rounded-lg bg-muted px-3 py-2">
                <span className="font-semibold text-foreground">Recommended: </span>
                {company.recommended_action}
              </div>
            )}
          </div>
          <div className="md:col-span-2 grid grid-cols-2 gap-3">
            <MetricBar label="Reliability" value={Number(company.reliability_score)} />
            <MetricBar label="Compliance" value={Number(company.compliance_score)} />
            <MetricBar label="Communication" value={Number(company.communication_score)} />
            <MetricBar label="Delivery" value={Number(company.delivery_score)} />
            <MetricBar label="Financial" value={Number(company.financial_score)} />
            <MetricBar label="Risk (lower = better)" value={Number(company.risk_score)} />
          </div>
        </div>
      )}
    </Card>
  );
}

function TrustSignalFeed({ data, loading, companyId, onCreated }: { data: ReturnType<typeof useTrustSignals>["data"]; loading: boolean; companyId: string; onCreated: () => void }) {
  const [creating, setCreating] = useState(false);
  async function addQuickSignal() {
    setCreating(true);
    try {
      await createTrustSignal({
        company_id: companyId,
        signal_source: "manual",
        signal_type: "manual_observation",
        impact: "neutral",
        severity: "normal",
        score_delta: 0,
        title: "Manual trust observation",
        description: "Logged manually from the Trust OS feed.",
      });
      toast.success("Trust signal logged");
      onCreated();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setCreating(false);
    }
  }
  return (
    <Card
      title="Trust Signal Feed"
      icon={Activity}
      action={
        <button onClick={addQuickSignal} disabled={creating} className="text-xs inline-flex items-center gap-1 rounded-md bg-teal/10 text-teal px-2 py-1 hover:bg-teal/20">
          {creating ? <Loader2 className="size-3 animate-spin" /> : <Plus className="size-3" />} Signal
        </button>
      }
    >
      {loading ? (
        <Skeleton />
      ) : !data?.length ? (
        <Empty msg="No trust signals yet." />
      ) : (
        <ul className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
          {data.map((s) => (
            <li key={s.id} className="rounded-lg border border-border p-3 text-sm">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="font-medium">{s.title}</div>
                  {s.description && <div className="text-xs text-muted-foreground mt-0.5">{s.description}</div>}
                </div>
                <SeverityBadge severity={s.severity} />
              </div>
              <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
                <span>{s.signal_source}</span>
                <span>·</span>
                <span>{s.signal_type}</span>
                {s.score_delta !== 0 && (
                  <span className={Number(s.score_delta) >= 0 ? "text-success" : "text-destructive"}>
                    {Number(s.score_delta) >= 0 ? "+" : ""}
                    {s.score_delta}
                  </span>
                )}
                <span className="ml-auto">{new Date(s.created_at).toLocaleString()}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function CustomerTrustMaturityPanel({ data, loading }: { data: ReturnType<typeof useCustomerTrustProfiles>["data"]; loading: boolean }) {
  return (
    <Card title="Customer Trust Maturity" icon={Users}>
      {loading ? <Skeleton /> : !data?.length ? <Empty msg="No customer trust profiles yet." /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.map((c) => (
            <div key={c.id} className="rounded-lg border border-border p-3">
              <div className="flex items-center justify-between">
                <div className="font-medium text-sm">{c.customer_name}</div>
                <MaturityBadge level={c.maturity_level} />
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <MetricBar label="Trust" value={Number(c.trust_score)} />
                <MetricBar label="SLA" value={Number(c.sla_confidence_score)} />
                <MetricBar label="Comms" value={Number(c.communication_confidence_score)} />
                <MetricBar label="Retention" value={Number(c.retention_confidence_score)} />
                <MetricBar label="Expansion" value={Number(c.expansion_confidence_score)} />
                <MetricBar label="Churn risk" value={Number(c.churn_risk_score)} />
              </div>
              {c.recommended_action && <div className="mt-2 text-[11px] text-muted-foreground">{c.recommended_action}</div>}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

function PartnerTrustMaturityPanel({ data, loading }: { data: ReturnType<typeof usePartnerTrustProfiles>["data"]; loading: boolean }) {
  return (
    <Card title="Partner Trust Maturity" icon={Truck}>
      {loading ? <Skeleton /> : !data?.length ? <Empty msg="No partner trust profiles yet." /> : (
        <div className="space-y-2">
          {data.map((p) => (
            <div key={p.id} className="rounded-lg border border-border p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">{p.partner_name}</div>
                  <div className="text-[11px] text-muted-foreground capitalize">{p.partner_type}</div>
                </div>
                <div className="flex items-center gap-2">
                  <ApprovalBadge status={p.approval_status} />
                  <MaturityBadge level={p.maturity_level} />
                </div>
              </div>
              <div className="mt-2 grid grid-cols-3 md:grid-cols-5 gap-2">
                <MetricBar label="Trust" value={Number(p.trust_score)} />
                <MetricBar label="Reliab" value={Number(p.reliability_score)} />
                <MetricBar label="Safety" value={Number(p.safety_score)} />
                <MetricBar label="Comply" value={Number(p.compliance_score)} />
                <MetricBar label="Comms" value={Number(p.communication_score)} />
              </div>
              {p.recommended_action && <div className="mt-2 text-[11px] text-muted-foreground">{p.recommended_action}</div>}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

function BoardTrustAutomationPanel({ reports, loading, companyId, onCreated }: { reports: ReturnType<typeof useBoardTrustReports>["data"]; loading: boolean; companyId: string; onCreated: () => void }) {
  const [busy, setBusy] = useState(false);
  const latest = reports?.[0];
  async function generate() {
    setBusy(true);
    try {
      await createBoardTrustReportPreview(companyId);
      toast.success("Board report preview generated");
      onCreated();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function approve() {
    if (!latest) return;
    if (!confirm("Approve this board trust report?")) return;
    try {
      await approveBoardTrustReport(latest.id);
      toast.success("Report approved");
      onCreated();
    } catch (e) {
      toast.error((e as Error).message);
    }
  }
  return (
    <Card
      title="Board Trust Automation"
      icon={Landmark}
      action={
        <div className="flex gap-2">
          <button onClick={generate} disabled={busy} className="text-xs inline-flex items-center gap-1 rounded-md bg-teal/10 text-teal px-2 py-1 hover:bg-teal/20">
            {busy ? <Loader2 className="size-3 animate-spin" /> : <Plus className="size-3" />} Preview
          </button>
          {latest && latest.status !== "approved" && (
            <button onClick={approve} className="text-xs inline-flex items-center gap-1 rounded-md bg-orange/10 text-orange px-2 py-1 hover:bg-orange/20">
              <CheckCircle2 className="size-3" /> Approve
            </button>
          )}
        </div>
      }
    >
      {loading ? <Skeleton /> : !latest ? <Empty msg="No board reports yet. Generate a preview to start." /> : (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{latest.report_title}</div>
              <div className="text-xs text-muted-foreground">Period {latest.report_period} · {latest.status}</div>
            </div>
            <ScoreRing score={Number(latest.enterprise_trust_score)} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <MetricBar label="Customer" value={Number(latest.customer_trust_score)} />
            <MetricBar label="Partner" value={Number(latest.partner_trust_score)} />
            <MetricBar label="Revenue" value={Number(latest.revenue_trust_score)} />
            <MetricBar label="Marketplace" value={Number(latest.marketplace_trust_score)} />
          </div>
          {latest.executive_summary && <p className="text-xs text-muted-foreground">{latest.executive_summary}</p>}
          {latest.risk_summary && <p className="text-xs text-muted-foreground">⚠ {latest.risk_summary}</p>}
        </div>
      )}
    </Card>
  );
}

function RevenueTrustIntelligencePanel({ data, loading }: { data: ReturnType<typeof useRevenueTrustIntelligence>["data"]; loading: boolean }) {
  const summary = useMemo(() => (data ? calculateRevenueTrustSummary(data) : null), [data]);
  return (
    <Card title="Revenue Trust Intelligence" icon={DollarSign}>
      {loading ? <Skeleton /> : !data?.length ? <Empty msg="No revenue trust records yet." /> : (
        <div className="space-y-3">
          {summary && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <Stat label="Current" value={`$${fmtMoney(summary.totalCurrent)}`} />
              <Stat label="Projected" value={`$${fmtMoney(summary.totalProjected)}`} />
              <Stat label="At Risk" value={`$${fmtMoney(summary.totalAtRisk)}`} tone="destructive" />
              <Stat label="Expansion" value={`$${fmtMoney(summary.totalExpansion)}`} tone="success" />
              <Stat label="Trust (wtd)" value={summary.weightedTrust.toFixed(1)} />
            </div>
          )}
          <div className="space-y-2">
            {data.map((r) => (
              <div key={r.id} className="rounded-lg border border-border p-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-sm">{r.account_name}</div>
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{r.revenue_status}</span>
                </div>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px]">
                  <Stat compact label="Trust" value={Number(r.trust_score).toFixed(0)} />
                  <Stat compact label="Churn risk" value={Number(r.churn_risk_score).toFixed(0)} tone={Number(r.churn_risk_score) > 50 ? "destructive" : undefined} />
                  <Stat compact label="At risk" value={`$${fmtMoney(Number(r.at_risk_revenue))}`} />
                  <Stat compact label="Expansion" value={`$${fmtMoney(Number(r.expansion_opportunity))}`} />
                </div>
                {r.revenue_risk_reason && <div className="mt-2 text-[11px] text-muted-foreground">⚠ {r.revenue_risk_reason}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}

function MarketplaceTrustGovernancePanel({
  policies,
  reviews,
  partners,
  loading,
  companyId: _companyId,
  onReviewed: _onReviewed,
}: {
  policies: ReturnType<typeof useMarketplacePolicies>["data"];
  reviews: ReturnType<typeof useGovernanceReviews>["data"];
  partners: ReturnType<typeof usePartnerTrustProfiles>["data"];
  loading: boolean;
  companyId: string;
  onReviewed: () => void;
}) {
  const belowThreshold = useMemo(
    () => (partners ?? []).filter((p) => p.trust_score < 70),
    [partners],
  );
  return (
    <Card title="Marketplace Trust Governance" icon={Gavel}>
      {loading ? <Skeleton /> : (
        <div className="space-y-4">
          {!policies?.length ? (
            <Empty msg="No marketplace policies configured." />
          ) : (
            <div className="space-y-2">
              {policies.map((p) => (
                <div key={p.id} className="rounded-lg border border-border p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{p.policy_name}</div>
                    <span className={`text-[10px] uppercase px-1.5 py-0.5 rounded ${p.is_active ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>
                      {p.is_active ? "active" : "inactive"}
                    </span>
                  </div>
                  {p.description && <div className="text-xs text-muted-foreground mt-0.5">{p.description}</div>}
                  <div className="mt-2 grid grid-cols-4 gap-2 text-[11px]">
                    <Stat compact label="Min trust" value={String(p.minimum_trust_score)} />
                    <Stat compact label="Min comply" value={String(p.minimum_compliance_score)} />
                    <Stat compact label="Min safety" value={String(p.minimum_safety_score)} />
                    <Stat compact label="Suspend ≤" value={String(p.auto_suspend_threshold)} />
                  </div>
                </div>
              ))}
            </div>
          )}
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Partners below threshold</div>
            {belowThreshold.length === 0 ? (
              <div className="text-xs text-muted-foreground">All partners meeting trust threshold.</div>
            ) : (
              <ul className="text-sm space-y-1">
                {belowThreshold.map((p) => (
                  <li key={p.id} className="flex items-center justify-between rounded border border-border px-2 py-1">
                    <span>{p.partner_name}</span>
                    <span className="text-xs text-destructive">{Number(p.trust_score).toFixed(0)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Recent reviews</div>
            {!reviews?.length ? (
              <div className="text-xs text-muted-foreground">No governance reviews yet.</div>
            ) : (
              <ul className="text-sm space-y-1">
                {reviews.slice(0, 5).map((r) => (
                  <li key={r.id} className="flex items-center justify-between rounded border border-border px-2 py-1">
                    <span>{r.review_type} · {r.review_status}</span>
                    <span className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}

function TrustAutomationRunPanel({ runs, loading, companyId, onRan }: { runs: ReturnType<typeof useTrustAutomationRuns>["data"]; loading: boolean; companyId: string; onRan: () => void }) {
  const [busy, setBusy] = useState<string | null>(null);
  async function run(name: string, type: string) {
    setBusy(type);
    try {
      await runAutomationPreview(companyId, name, type);
      toast.success(`${name} complete`);
      onRan();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(null);
    }
  }
  const buttons = [
    { name: "Trust Score Refresh", type: "trust_score_refresh" },
    { name: "Board Report Scan", type: "board_report_preview" },
    { name: "Marketplace Governance", type: "marketplace_governance_scan" },
    { name: "Revenue Trust Scan", type: "revenue_trust_scan" },
  ];
  return (
    <Card title="Trust Automation" icon={Zap}>
      <div className="grid grid-cols-2 gap-2 mb-3">
        {buttons.map((b) => (
          <button
            key={b.type}
            onClick={() => run(b.name, b.type)}
            disabled={busy !== null}
            className="text-[11px] rounded-md border border-border px-2 py-1.5 hover:bg-accent disabled:opacity-50 inline-flex items-center justify-center gap-1"
          >
            {busy === b.type ? <Loader2 className="size-3 animate-spin" /> : <Zap className="size-3 text-teal" />}
            {b.name}
          </button>
        ))}
      </div>
      {loading ? <Skeleton /> : !runs?.length ? <Empty msg="No automation runs yet." /> : (
        <ul className="space-y-1.5 max-h-72 overflow-y-auto">
          {runs.map((r) => (
            <li key={r.id} className="text-xs rounded border border-border px-2 py-1.5">
              <div className="flex items-center justify-between">
                <span className="font-medium">{r.automation_name}</span>
                <span className={
                  r.run_status === "completed" ? "text-success"
                  : r.run_status === "failed" ? "text-destructive"
                  : "text-muted-foreground"
                }>{r.run_status}</span>
              </div>
              {r.summary && <div className="text-muted-foreground mt-0.5">{r.summary}</div>}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function TrustActionQueue({
  signals,
  reviews,
  revenue,
}: {
  signals: ReturnType<typeof useTrustSignals>["data"];
  reviews: ReturnType<typeof useGovernanceReviews>["data"];
  revenue: ReturnType<typeof useRevenueTrustIntelligence>["data"];
}) {
  const actions = useMemo(() => {
    const list: { id: string; priority: string; title: string; source: string }[] = [];
    (signals ?? []).filter((s) => s.severity === "high" || s.severity === "urgent").forEach((s) =>
      list.push({ id: s.id, priority: s.severity, title: s.title, source: "Signal" }),
    );
    (reviews ?? []).filter((r) => r.review_status === "open").forEach((r) =>
      list.push({ id: r.id, priority: "normal", title: `${r.review_type} review pending`, source: "Governance" }),
    );
    (revenue ?? []).filter((r) => r.churn_risk_score > 50).forEach((r) =>
      list.push({ id: r.id, priority: "high", title: `${r.account_name} churn risk`, source: "Revenue" }),
    );
    return list.slice(0, 12);
  }, [signals, reviews, revenue]);

  return (
    <Card title="Trust Action Queue" icon={AlertTriangle}>
      {actions.length === 0 ? (
        <Empty msg="No outstanding trust actions. ✨" />
      ) : (
        <ul className="space-y-1.5">
          {actions.map((a) => (
            <li key={`${a.source}-${a.id}`} className="text-sm rounded border border-border px-2 py-1.5">
              <div className="flex items-center justify-between">
                <span>{a.title}</span>
                <span className={`text-[10px] uppercase px-1.5 py-0.5 rounded ${a.priority === "urgent" || a.priority === "high" ? "bg-destructive/15 text-destructive" : "bg-muted text-muted-foreground"}`}>
                  {a.priority}
                </span>
              </div>
              <div className="text-[10px] text-muted-foreground">{a.source}</div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

// --- small helpers ---
function Stat({ label, value, tone, compact }: { label: string; value: string; tone?: "success" | "destructive"; compact?: boolean }) {
  const toneClass = tone === "success" ? "text-success" : tone === "destructive" ? "text-destructive" : "text-foreground";
  return (
    <div className={`rounded-md border border-border ${compact ? "px-2 py-1" : "px-3 py-2"}`}>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`font-semibold tabular-nums ${toneClass} ${compact ? "text-xs" : "text-sm"}`}>{value}</div>
    </div>
  );
}
function Skeleton() {
  return <div className="h-24 rounded-lg bg-muted animate-pulse" />;
}
function Empty({ msg }: { msg: string }) {
  return <div className="text-sm text-muted-foreground py-6 text-center">{msg}</div>;
}
function SeverityBadge({ severity }: { severity: string }) {
  const cls = severity === "urgent" || severity === "high"
    ? "bg-destructive/15 text-destructive"
    : severity === "low" ? "bg-muted text-muted-foreground"
    : "bg-teal/15 text-teal";
  return <span className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded ${cls}`}>{severity}</span>;
}
function MaturityBadge({ level }: { level: string }) {
  return <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/15 text-primary">{level}</span>;
}
function ApprovalBadge({ status }: { status: string }) {
  const cls = status === "approved" ? "bg-success/15 text-success"
    : status === "suspended" || status === "rejected" ? "bg-destructive/15 text-destructive"
    : "bg-warning/15 text-warning";
  return <span className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded ${cls}`}>{status}</span>;
}
function fmtMoney(n: number) {
  return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
}
