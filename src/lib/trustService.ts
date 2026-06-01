import { supabase } from "@/integrations/supabase/client";
import type {
  BoardTrustReport,
  CustomerTrustProfile,
  GovernanceReview,
  MarketplacePolicy,
  PartnerTrustProfile,
  RevenueTrustRecord,
  TrustAutomationRun,
  TrustScorecard,
  TrustSignal,
} from "@/types/trust";

// Trust Scorecards
export async function fetchTrustScorecards(companyId: string) {
  const { data, error } = await supabase
    .from("trust_scorecards" as never)
    .select("*")
    .eq("company_id", companyId)
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as TrustScorecard[];
}

// Trust Signals
export async function fetchTrustSignals(companyId: string, limit = 30) {
  const { data, error } = await supabase
    .from("trust_signals" as never)
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as unknown as TrustSignal[];
}

export async function createTrustSignal(input: Partial<TrustSignal> & { company_id: string; signal_source: string; signal_type: string; title: string }) {
  const { data, error } = await supabase
    .from("trust_signals" as never)
    .insert(input as never)
    .select()
    .single();
  if (error) throw error;
  return data as unknown as TrustSignal;
}

// Customer / Partner profiles
export async function fetchCustomerTrustProfiles(companyId: string) {
  const { data, error } = await supabase
    .from("customer_trust_profiles" as never)
    .select("*")
    .eq("company_id", companyId)
    .order("trust_score", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as CustomerTrustProfile[];
}

export async function fetchPartnerTrustProfiles(companyId: string) {
  const { data, error } = await supabase
    .from("partner_trust_profiles" as never)
    .select("*")
    .eq("company_id", companyId)
    .order("trust_score", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as PartnerTrustProfile[];
}

// Board reports
export async function fetchBoardTrustReports(companyId: string) {
  const { data, error } = await supabase
    .from("board_trust_reports" as never)
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as BoardTrustReport[];
}

export async function createBoardTrustReportPreview(companyId: string) {
  // Deterministic aggregation from existing rows
  const [scorecards, customers, partners, revenue] = await Promise.all([
    fetchTrustScorecards(companyId),
    fetchCustomerTrustProfiles(companyId),
    fetchPartnerTrustProfiles(companyId),
    fetchRevenueTrustIntelligence(companyId),
  ]);

  const enterprise = scorecards.find((s) => s.entity_type === "company")?.trust_score ?? avg(scorecards.map((s) => s.trust_score));
  const customerAvg = avg(customers.map((c) => c.trust_score));
  const partnerAvg = avg(partners.map((p) => p.trust_score));
  const revenueAvg = avg(revenue.map((r) => r.trust_score));

  const period = new Date().toISOString().slice(0, 7);

  const { data, error } = await supabase
    .from("board_trust_reports" as never)
    .insert({
      company_id: companyId,
      report_title: `Trust Intelligence Brief — ${period}`,
      report_period: period,
      enterprise_trust_score: enterprise,
      customer_trust_score: customerAvg,
      partner_trust_score: partnerAvg,
      revenue_trust_score: revenueAvg,
      marketplace_trust_score: avg([partnerAvg, enterprise]),
      executive_summary: `Aggregated from ${scorecards.length} scorecards, ${customers.length} customer profiles, ${partners.length} partner profiles.`,
      risk_summary: `${partners.filter((p) => p.trust_score < 70).length} partner(s) below trust threshold.`,
      revenue_summary: `Tracking ${revenue.length} revenue accounts.`,
      governance_summary: "Marketplace governance policies active.",
      recommended_board_actions: [
        { title: "Review partners below threshold", priority: "high" },
        { title: "Approve quarterly trust calibration", priority: "normal" },
      ],
      status: "preview",
    } as never)
    .select()
    .single();
  if (error) throw error;
  return data as unknown as BoardTrustReport;
}

export async function approveBoardTrustReport(reportId: string) {
  const { error } = await supabase
    .from("board_trust_reports" as never)
    .update({ status: "approved", approved_at: new Date().toISOString() } as never)
    .eq("id", reportId);
  if (error) throw error;
}

// Revenue trust
export async function fetchRevenueTrustIntelligence(companyId: string) {
  const { data, error } = await supabase
    .from("revenue_trust_intelligence" as never)
    .select("*")
    .eq("company_id", companyId)
    .order("current_revenue", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as RevenueTrustRecord[];
}

export function calculateRevenueTrustSummary(records: RevenueTrustRecord[]) {
  const totalCurrent = sum(records.map((r) => Number(r.current_revenue)));
  const totalProjected = sum(records.map((r) => Number(r.projected_revenue)));
  const totalAtRisk = sum(records.map((r) => Number(r.at_risk_revenue)));
  const totalExpansion = sum(records.map((r) => Number(r.expansion_opportunity)));
  const weightedTrust =
    totalCurrent > 0
      ? records.reduce((acc, r) => acc + Number(r.trust_score) * Number(r.current_revenue), 0) / totalCurrent
      : 0;
  return { totalCurrent, totalProjected, totalAtRisk, totalExpansion, weightedTrust };
}

// Marketplace
export async function fetchMarketplacePolicies(companyId: string) {
  const { data, error } = await supabase
    .from("marketplace_trust_policies" as never)
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as MarketplacePolicy[];
}

export async function fetchGovernanceReviews(companyId: string) {
  const { data, error } = await supabase
    .from("marketplace_governance_reviews" as never)
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as GovernanceReview[];
}

export async function createGovernanceReview(input: {
  company_id: string;
  partner_trust_profile_id?: string | null;
  trust_score_at_review: number;
  compliance_score_at_review?: number;
  safety_score_at_review?: number;
}) {
  const { data, error } = await supabase
    .from("marketplace_governance_reviews" as never)
    .insert({
      ...input,
      review_type: "scheduled",
      review_status: "open",
      decision: "pending",
    } as never)
    .select()
    .single();
  if (error) throw error;
  return data as unknown as GovernanceReview;
}

export async function completeGovernanceReview(id: string, decision: string, reason?: string) {
  const { error } = await supabase
    .from("marketplace_governance_reviews" as never)
    .update({
      review_status: "completed",
      decision,
      decision_reason: reason ?? null,
      reviewed_at: new Date().toISOString(),
    } as never)
    .eq("id", id);
  if (error) throw error;
}

// Automation
export async function fetchTrustAutomationRuns(companyId: string, limit = 20) {
  const { data, error } = await supabase
    .from("trust_automation_runs" as never)
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as unknown as TrustAutomationRun[];
}

export async function runAutomationPreview(
  companyId: string,
  name: string,
  type: string,
) {
  const startedAt = new Date().toISOString();
  const { data: created, error: insertErr } = await supabase
    .from("trust_automation_runs" as never)
    .insert({
      company_id: companyId,
      automation_name: name,
      automation_type: type,
      run_status: "running",
      started_at: startedAt,
    } as never)
    .select()
    .single();
  if (insertErr) throw insertErr;
  const row = created as unknown as TrustAutomationRun;

  // Deterministic local "preview" calculation
  let scanned = 0;
  let updated = 0;
  try {
    if (type === "trust_score_refresh") {
      const cards = await fetchTrustScorecards(companyId);
      scanned = cards.length;
    } else if (type === "marketplace_governance_scan") {
      const partners = await fetchPartnerTrustProfiles(companyId);
      scanned = partners.length;
      updated = partners.filter((p) => p.trust_score < 70).length;
    } else if (type === "revenue_trust_scan") {
      const records = await fetchRevenueTrustIntelligence(companyId);
      scanned = records.length;
      updated = records.filter((r) => r.churn_risk_score > 50).length;
    } else if (type === "board_report_preview") {
      const reports = await fetchBoardTrustReports(companyId);
      scanned = reports.length;
    }

    const { error: updErr } = await supabase
      .from("trust_automation_runs" as never)
      .update({
        run_status: "completed",
        completed_at: new Date().toISOString(),
        records_scanned: scanned,
        records_updated: updated,
        summary: `Preview complete. Scanned ${scanned}, flagged ${updated}.`,
      } as never)
      .eq("id", row.id);
    if (updErr) throw updErr;
  } catch (err) {
    await supabase
      .from("trust_automation_runs" as never)
      .update({
        run_status: "failed",
        completed_at: new Date().toISOString(),
        error_message: (err as Error).message,
      } as never)
      .eq("id", row.id);
    throw err;
  }
  return row;
}

// Helpers
function avg(arr: number[]): number {
  const nums = arr.map(Number).filter((n) => !isNaN(n));
  return nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
}
function sum(arr: number[]): number {
  return arr.map(Number).filter((n) => !isNaN(n)).reduce((a, b) => a + b, 0);
}
