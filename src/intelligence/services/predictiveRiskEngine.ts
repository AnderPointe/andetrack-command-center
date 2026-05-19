/** Phase 9 — Predictive risk engine (rules-based placeholder). */
import type {
  PredictiveRisk, RiskLevel, RiskType, RiskReasonCode, ApprovalLevel, Confidence,
} from "../types";

export function levelFromScore(score: number): RiskLevel {
  if (score >= 76) return "critical";
  if (score >= 51) return "high";
  if (score >= 21) return "moderate";
  return "low";
}

export function approvalForRisk(level: RiskLevel, type: RiskType): ApprovalLevel {
  if (type === "billing_dispute") return "billing_admin";
  if (level === "critical") return "dispatcher_manager";
  if (level === "high") return "dispatcher";
  return "none";
}

export function confidenceFromSignals(signals: number): Confidence {
  if (signals >= 4) return "high";
  if (signals >= 2) return "medium";
  return "low";
}

interface RiskInput {
  load_id: string;
  driver_name: string;
  customer_name: string;
  customer_priority: "standard" | "high" | "vip";
  remaining_miles: number;
  remaining_minutes: number;
  delivery_window_minutes: number;
  gps_age_seconds: number;
  off_route_meters: number;
  cdl_required: boolean;
  driver_has_cdl: boolean;
  vehicle_match: boolean;
  fuel_efficiency_pct_vs_baseline: number; // negative = worse
  driver_hours_left: number;
}

export function scoreDeliveryDelayRisk(i: RiskInput): PredictiveRisk {
  const reasons: RiskReasonCode[] = [];
  let score = 0;
  if (i.gps_age_seconds > 60) { score += 18; reasons.push("stale_gps"); }
  if (i.off_route_meters > 250) { score += 22; reasons.push("route_deviation"); }
  if (i.remaining_minutes > i.delivery_window_minutes - 10) { score += 30; reasons.push("delivery_window_tight"); }
  if (i.customer_priority !== "standard") { score += 12; reasons.push("customer_priority_high"); }
  if (i.driver_hours_left < 2) { score += 18; reasons.push("dispatch_attention_needed"); }
  score = Math.min(100, score);
  const level = levelFromScore(score);
  return {
    id: `risk-${i.load_id}-delay`,
    company_id: "demo",
    risk_type: "delivery_delay",
    risk_level: level,
    risk_score: score,
    confidence: confidenceFromSignals(reasons.length),
    title: `Delivery delay risk on ${i.load_id}`,
    summary: `${i.driver_name} → ${i.customer_name} is trending ${level}. ${reasons.length} signals contributing.`,
    reason_codes: reasons,
    recommended_action:
      level === "critical"
        ? "Contact driver, notify customer, evaluate reroute."
        : level === "high"
        ? "Send proactive ETA update and confirm driver progress."
        : "Monitor; no action required yet.",
    impacted_driver_name: i.driver_name,
    impacted_load_id: i.load_id,
    impacted_customer_name: i.customer_name,
    estimated_impact_minutes: Math.max(0, i.remaining_minutes - i.delivery_window_minutes),
    estimated_cost_impact: level === "critical" ? 480 : level === "high" ? 180 : 0,
    time_sensitivity: level === "critical" ? "now" : level === "high" ? "within_30m" : "today",
    requires_approval: approvalForRisk(level, "delivery_delay"),
    status: "open",
    created_at: new Date().toISOString(),
  };
}

export function scoreComplianceRisks(i: RiskInput): PredictiveRisk[] {
  const out: PredictiveRisk[] = [];
  if (i.cdl_required && !i.driver_has_cdl) {
    out.push({
      id: `risk-${i.load_id}-cdl`, company_id: "demo",
      risk_type: "cdl_compliance", risk_level: "critical", risk_score: 92, confidence: "high",
      title: `CDL validation missing on ${i.load_id}`,
      summary: `${i.driver_name} is not CDL-credentialed for a CDL-required load.`,
      reason_codes: ["cdl_validation_missing", "route_safety_warning"],
      recommended_action: "Review CDL validation and reassign if needed.",
      impacted_driver_name: i.driver_name, impacted_load_id: i.load_id,
      impacted_customer_name: i.customer_name,
      time_sensitivity: "now",
      requires_approval: "dispatcher_manager",
      status: "open", created_at: new Date().toISOString(),
    });
  }
  if (!i.vehicle_match) {
    out.push({
      id: `risk-${i.load_id}-vehicle`, company_id: "demo",
      risk_type: "vehicle_mismatch", risk_level: "high", risk_score: 64, confidence: "medium",
      title: `Vehicle mismatch on ${i.load_id}`,
      summary: `Assigned vehicle does not match commodity requirements.`,
      reason_codes: ["vehicle_mismatch"],
      recommended_action: "Verify vehicle profile or reassign load.",
      impacted_driver_name: i.driver_name, impacted_load_id: i.load_id,
      impacted_customer_name: i.customer_name,
      time_sensitivity: "within_30m",
      requires_approval: "dispatcher",
      status: "open", created_at: new Date().toISOString(),
    });
  }
  return out;
}

export function predictRisksForBatch(inputs: RiskInput[]): PredictiveRisk[] {
  const all: PredictiveRisk[] = [];
  for (const i of inputs) {
    all.push(scoreDeliveryDelayRisk(i));
    all.push(...scoreComplianceRisks(i));
  }
  return all.sort((a, b) => b.risk_score - a.risk_score);
}
