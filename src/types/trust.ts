export type MaturityLevel = "new" | "developing" | "trusted" | "optimized" | "strategic" | "elite" | "approved";
export type ApprovalStatus = "pending" | "approved" | "suspended" | "rejected" | "review_needed";
export type Impact = "positive" | "negative" | "neutral";
export type Severity = "low" | "normal" | "high" | "urgent";
export type RunStatus = "queued" | "running" | "completed" | "failed";

export interface TrustScorecard {
  id: string;
  company_id: string;
  entity_type: string;
  entity_id: string | null;
  entity_name: string | null;
  trust_score: number;
  maturity_level: string;
  reliability_score: number;
  compliance_score: number;
  communication_score: number;
  delivery_score: number;
  financial_score: number;
  risk_score: number;
  summary: string | null;
  recommended_action: string | null;
  metadata: Record<string, unknown>;
  updated_at: string;
}

export interface TrustSignal {
  id: string;
  company_id: string;
  signal_source: string;
  signal_type: string;
  entity_type: string | null;
  entity_name: string | null;
  impact: Impact;
  severity: Severity;
  score_delta: number;
  title: string;
  description: string | null;
  created_at: string;
}

export interface CustomerTrustProfile {
  id: string;
  company_id: string;
  customer_name: string;
  trust_score: number;
  maturity_level: string;
  sla_confidence_score: number;
  communication_confidence_score: number;
  retention_confidence_score: number;
  expansion_confidence_score: number;
  churn_risk_score: number;
  executive_summary: string | null;
  recommended_action: string | null;
  next_review_due_at: string | null;
}

export interface PartnerTrustProfile {
  id: string;
  company_id: string;
  partner_name: string;
  partner_type: string;
  trust_score: number;
  maturity_level: string;
  reliability_score: number;
  safety_score: number;
  compliance_score: number;
  communication_score: number;
  financial_score: number;
  approval_status: ApprovalStatus;
  governance_status: string;
  recommended_action: string | null;
}

export interface BoardTrustReport {
  id: string;
  company_id: string;
  report_title: string;
  report_period: string;
  enterprise_trust_score: number;
  customer_trust_score: number;
  partner_trust_score: number;
  revenue_trust_score: number;
  marketplace_trust_score: number;
  executive_summary: string | null;
  risk_summary: string | null;
  revenue_summary: string | null;
  governance_summary: string | null;
  recommended_board_actions: unknown;
  status: string;
  approved_at: string | null;
  created_at: string;
}

export interface RevenueTrustRecord {
  id: string;
  company_id: string;
  account_name: string;
  revenue_status: string;
  current_revenue: number;
  projected_revenue: number;
  at_risk_revenue: number;
  expansion_opportunity: number;
  trust_score: number;
  churn_risk_score: number;
  expansion_confidence_score: number;
  service_confidence_score: number;
  revenue_risk_reason: string | null;
  recommended_action: string | null;
}

export interface MarketplacePolicy {
  id: string;
  company_id: string;
  policy_name: string;
  policy_type: string;
  description: string | null;
  minimum_trust_score: number;
  minimum_compliance_score: number;
  minimum_safety_score: number;
  approval_required: boolean;
  auto_suspend_threshold: number;
  is_active: boolean;
}

export interface GovernanceReview {
  id: string;
  company_id: string;
  partner_trust_profile_id: string | null;
  review_type: string;
  review_status: string;
  trust_score_at_review: number;
  decision: string;
  decision_reason: string | null;
  next_review_due_at: string | null;
  created_at: string;
}

export interface TrustAutomationRun {
  id: string;
  company_id: string;
  automation_name: string;
  automation_type: string;
  run_status: RunStatus;
  started_at: string | null;
  completed_at: string | null;
  records_scanned: number;
  records_created: number;
  records_updated: number;
  summary: string | null;
  error_message: string | null;
  created_at: string;
}

export const DEMO_COMPANY_ID =
  (import.meta.env.VITE_DEMO_COMPANY_ID as string | undefined) ||
  "11111111-1111-1111-1111-111111111111";

export function maturityBand(score: number): { label: string; tone: string } {
  if (score >= 90) return { label: "Elite", tone: "text-success" };
  if (score >= 80) return { label: "Optimized", tone: "text-teal" };
  if (score >= 70) return { label: "Trusted", tone: "text-primary" };
  if (score >= 60) return { label: "Developing", tone: "text-warning" };
  return { label: "At Risk", tone: "text-destructive" };
}
