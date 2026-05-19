/** Phase 9 — AI recommendation engine (rules-based placeholder). */
import type { AIRecommendation, PredictiveRisk, ApprovalLevel, RecommendationType } from "../types";

const APPROVAL_BY_ACTION: Partial<Record<RecommendationType, ApprovalLevel>> = {
  reassign_driver: "dispatcher_manager",
  adjust_delivery_window: "company_admin",
  review_billing_risk: "billing_admin",
  open_incident: "dispatcher_manager",
  contact_customer: "dispatcher",
  send_eta_update: "dispatcher",
  contact_driver: "none",
  create_dispatch_note: "none",
  reroute_driver: "dispatcher",
  review_cdl_validation: "dispatcher_manager",
  request_vehicle_check: "dispatcher",
  schedule_maintenance: "company_admin",
};

export function recommendForRisk(risk: PredictiveRisk): AIRecommendation[] {
  const recs: AIRecommendation[] = [];
  const base = (type: RecommendationType, title: string, expected: string, riskReduced: number): AIRecommendation => ({
    id: `${risk.id}-rec-${type}`,
    company_id: risk.company_id,
    type,
    title,
    summary: `${title}. Linked to ${risk.risk_type.replace(/_/g, " ")} on ${risk.impacted_load_id ?? "load"}.`,
    confidence: risk.confidence,
    confidence_pct: risk.confidence === "high" ? 86 : risk.confidence === "medium" ? 68 : 48,
    expected_outcome: expected,
    risk_reduced_pct: riskReduced,
    estimated_time_saved_min: type === "send_eta_update" ? 0 : 12,
    estimated_cost_impact: -(risk.estimated_cost_impact ?? 0) * (riskReduced / 100),
    required_permissions: ["operations.read", "operations.update"],
    approval_required: APPROVAL_BY_ACTION[type] ?? "dispatcher",
    one_click_action_label:
      type === "send_eta_update" ? "Send ETA update" :
      type === "contact_driver" ? "Open driver chat" :
      type === "review_cdl_validation" ? "Open CDL review" :
      type === "reassign_driver" ? "Open reassignment" :
      "Apply",
    explanation: {
      what_i_noticed: risk.summary,
      why_it_matters: risk.recommended_action,
      data_used: risk.reason_codes.map((r) => r.replace(/_/g, " ")),
      confidence_label: `${risk.confidence} confidence`,
      recommended_action: title,
      risk_if_ignored: risk.risk_level === "critical"
        ? "Delivery likely to miss window; customer escalation probable."
        : "Risk score will trend upward without intervention.",
      human_approval_needed: APPROVAL_BY_ACTION[type] ?? "dispatcher",
    },
    data_used: risk.reason_codes,
    status: "pending",
    linked_risk_id: risk.id,
    impacted_load_id: risk.impacted_load_id,
    impacted_driver_name: risk.impacted_driver_name,
    impacted_customer_name: risk.impacted_customer_name,
    created_at: new Date().toISOString(),
  });

  if (risk.risk_type === "cdl_compliance") {
    recs.push(base("review_cdl_validation", "Review CDL validation", "CDL warning resolved or load reassigned.", 80));
    recs.push(base("reassign_driver", "Reassign load to CDL driver", "Compliance restored before pickup.", 90));
  } else if (risk.risk_type === "vehicle_mismatch") {
    recs.push(base("request_vehicle_check", "Request vehicle check", "Confirm equipment matches commodity.", 60));
  } else if (risk.risk_type === "gps_stale" || risk.reason_codes.includes("stale_gps")) {
    recs.push(base("contact_driver", "Contact driver", "Restore GPS visibility; confirm progress.", 55));
  } else if (risk.risk_level === "critical" || risk.risk_level === "high") {
    recs.push(base("send_eta_update", "Send proactive customer update", "Customer informed before window slip.", 45));
    if (risk.risk_level === "critical")
      recs.push(base("reassign_driver", "Evaluate reassignment", "Recover delivery window if feasible.", 70));
  }
  if (risk.reason_codes.includes("route_deviation"))
    recs.push(base("reroute_driver", "Suggest reroute", "Return driver to optimal corridor.", 35));
  return recs;
}

export function recommendForBatch(risks: PredictiveRisk[]): AIRecommendation[] {
  return risks.flatMap(recommendForRisk);
}
