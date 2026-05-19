/** Phase 9 — mock data feeding the AI Operations Intelligence UI. */
import type {
  CapacityForecastSlot, CustomerImpactRecord, ETAConfidenceEvent, ExecutiveSummary,
  MaintenanceRiskScore, OperationsHealthScore, PrioritizedAlert, ShiftHandoffSummary,
  AIUsageRecord, AIAuditEvent, PredictiveModelRun,
} from "../types";
import { predictRisksForBatch } from "../services/predictiveRiskEngine";
import { recommendForBatch } from "../services/aiRecommendationEngine";

const NOW = new Date().toISOString();

export const RISK_INPUTS = [
  { load_id: "AR-2048", driver_name: "Marcus Chen", customer_name: "Apex Supply",
    customer_priority: "vip" as const, remaining_miles: 84, remaining_minutes: 95,
    delivery_window_minutes: 80, gps_age_seconds: 142, off_route_meters: 90,
    cdl_required: true, driver_has_cdl: true, vehicle_match: true,
    fuel_efficiency_pct_vs_baseline: -8, driver_hours_left: 3.5 },
  { load_id: "AR-2051", driver_name: "Sara Williams", customer_name: "Cold Chain Foods",
    customer_priority: "high" as const, remaining_miles: 215, remaining_minutes: 240,
    delivery_window_minutes: 280, gps_age_seconds: 22, off_route_meters: 310,
    cdl_required: true, driver_has_cdl: true, vehicle_match: false,
    fuel_efficiency_pct_vs_baseline: -3, driver_hours_left: 5 },
  { load_id: "AR-2054", driver_name: "Priya Patel", customer_name: "Plano Courier",
    customer_priority: "standard" as const, remaining_miles: 18, remaining_minutes: 32,
    delivery_window_minutes: 60, gps_age_seconds: 8, off_route_meters: 30,
    cdl_required: true, driver_has_cdl: false, vehicle_match: true,
    fuel_efficiency_pct_vs_baseline: 1, driver_hours_left: 9 },
];

export const RISKS = predictRisksForBatch(RISK_INPUTS);
export const RECOMMENDATIONS = recommendForBatch(RISKS);

export const HEALTH_SCORE: OperationsHealthScore = {
  score: 78, level: "stable", trend: "up", delta_24h: 3,
  main_causes: ["1 critical risk on AR-2048", "GPS stale on Marcus Chen", "1 CDL warning on AR-2054"],
  recommended_actions: ["Resolve top 3 recommendations", "Contact Marcus Chen", "Reassign AR-2054 to a CDL driver"],
  impact_if_ignored: "On-time forecast may drop ~6 points by end of shift.",
  components: [
    { label: "On-time delivery %", value: 92, weight: 0.25, status: "stable" },
    { label: "At-risk loads", value: 70, weight: 0.15, status: "watch" },
    { label: "GPS freshness", value: 84, weight: 0.10, status: "stable" },
    { label: "Driver availability", value: 88, weight: 0.10, status: "excellent" },
    { label: "Vehicle availability", value: 76, weight: 0.10, status: "stable" },
    { label: "Open critical alerts", value: 65, weight: 0.10, status: "watch" },
    { label: "Route validation pass rate", value: 81, weight: 0.10, status: "stable" },
    { label: "Integration uptime", value: 95, weight: 0.10, status: "excellent" },
  ],
};

export const ETA_CONFIDENCE: ETAConfidenceEvent[] = [
  { id: "eta-1", load_id: "AR-2048", driver_name: "Marcus Chen",
    confidence_pct: 58, confidence: "medium",
    reasons: ["GPS 2m+ stale", "Tight delivery window", "VIP customer"],
    recommended_action: "Contact driver and confirm progress.",
    dispatch_note_suggestion: "Driver GPS stale; verbal confirmation requested.",
    customer_update_suggestion: "Your shipment is being verified; updated ETA in 10 minutes.",
    computed_at: NOW },
  { id: "eta-2", load_id: "AR-2051", driver_name: "Sara Williams",
    confidence_pct: 81, confidence: "high",
    reasons: ["Steady speed", "On corridor", "Window slack 40m"],
    recommended_action: "No action.",
    dispatch_note_suggestion: "On track.",
    customer_update_suggestion: "On schedule for delivery window.",
    computed_at: NOW },
];

export const CAPACITY: CapacityForecastSlot[] = Array.from({ length: 8 }).map((_, i) => {
  const hour = `${(8 + i).toString().padStart(2, "0")}:00`;
  const peak = i >= 5 && i <= 7;
  return {
    hour,
    available_drivers: 14 - (peak ? 4 : 1),
    available_vehicles: 11 - (peak ? 3 : 0),
    expected_deliveries: 6 + (peak ? 4 : i),
    expected_delays: peak ? 2 : 0,
    demand_placeholder: 8 + (peak ? 5 : 1),
    dispatcher_workload: 30 + (peak ? 35 : i * 4),
    coverage_gap: peak && i === 6,
  };
});

export const SHIFT_HANDOFF: ShiftHandoffSummary = {
  id: "shift-1", generated_at: NOW, generated_by: "Anderoute CoPilot",
  shift_label: "Day → Evening · Dallas hub",
  active_loads: 22, at_risk_loads: 3, delayed_drivers: 2,
  drivers_on_break: 4, drivers_off_duty: 3, loads_awaiting_assignment: 5,
  customer_issues: ["Apex Supply VIP delivery tightening", "Plano Courier CDL flag"],
  open_alerts: 6, edi_api_issues: ["EDI 214 retries on partner ACME"],
  weather_traffic_notes: ["I-35E congestion 16:00–18:00 (placeholder)"],
  priority_actions: ["Confirm Marcus Chen GPS", "Reassign AR-2054", "Send Apex update"],
  recommended_next_steps: ["Run 17:00 capacity forecast", "Hold dispatch standup at 16:45"],
};

export const CUSTOMER_IMPACT: CustomerImpactRecord[] = [
  { customer_id: "c-apex", customer_name: "Apex Supply", priority: "vip",
    delayed_shipments: 0, at_risk_deliveries: 1, needs_proactive_update: true,
    recent_messages: 2, satisfaction_placeholder: 78, revenue_impact_placeholder: 6400,
    recommended_message: "Hi Apex — your delivery is being actively monitored. Updated ETA shortly." },
  { customer_id: "c-cold", customer_name: "Cold Chain Foods", priority: "high",
    delayed_shipments: 1, at_risk_deliveries: 1, needs_proactive_update: true,
    recent_messages: 0, satisfaction_placeholder: 82, revenue_impact_placeholder: 3100,
    recommended_message: "We're tracking a slight deviation on your reefer load and will confirm an updated ETA." },
  { customer_id: "c-plano", customer_name: "Plano Courier", priority: "standard",
    delayed_shipments: 0, at_risk_deliveries: 0, needs_proactive_update: false,
    recent_messages: 0, satisfaction_placeholder: 91, revenue_impact_placeholder: 0,
    recommended_message: "No action required." },
];

export const PRIORITIZED_ALERTS: PrioritizedAlert[] = [
  { id: "a-1", alert_type: "stale_gps", severity: "warning",
    title: "GPS stale on Marcus Chen (AR-2048)", impact_score: 88,
    reasons: ["VIP customer", "Tight delivery window", "Stale > 2m"],
    suggested_resolutions: ["Contact driver", "Send heartbeat ping", "Verify mobile permissions"],
    created_at: NOW },
  { id: "a-2", alert_type: "cdl_validation_missing", severity: "critical",
    title: "CDL required but driver missing CDL (AR-2054)", impact_score: 94,
    reasons: ["Compliance risk", "Pickup imminent"],
    suggested_resolutions: ["Reassign to CDL driver", "Escalate to manager"],
    created_at: NOW },
  { id: "a-3", alert_type: "route_deviation", severity: "warning",
    title: "Sara Williams off-route 310m (AR-2051)", impact_score: 62,
    reasons: ["Possible reroute around closure", "Window slack remaining"],
    suggested_resolutions: ["Confirm reroute reason", "Suggest corridor return"],
    created_at: NOW },
];

export const MAINTENANCE_RISK: MaintenanceRiskScore[] = [
  { vehicle_id: "v-101", unit: "T-101", risk_score: 72, level: "high",
    mileage: 184_220, fuel_efficiency_trend: "down", driver_reports: 2,
    next_inspection_at: "2026-06-10", recommended_action: "Schedule diagnostic (placeholder)." },
  { vehicle_id: "v-118", unit: "T-118", risk_score: 38, level: "moderate",
    mileage: 92_000, fuel_efficiency_trend: "flat", driver_reports: 0,
    next_inspection_at: "2026-07-04", recommended_action: "Monitor; routine service in 30d." },
];

export const AI_USAGE: AIUsageRecord[] = [
  { feature: "Recommendations", role: "dispatcher", company_id: "demo", calls_24h: 412, tokens_placeholder: 184_000, cost_placeholder: 6.4, budget_pct: 22 },
  { feature: "Executive summaries", role: "executive", company_id: "demo", calls_24h: 14, tokens_placeholder: 38_000, cost_placeholder: 1.8, budget_pct: 9 },
  { feature: "Driver CoPilot", role: "driver", company_id: "demo", calls_24h: 1_240, tokens_placeholder: 410_000, cost_placeholder: 12.1, budget_pct: 41 },
  { feature: "Shift handoff", role: "dispatcher_manager", company_id: "demo", calls_24h: 3, tokens_placeholder: 9_400, cost_placeholder: 0.4, budget_pct: 2 },
];

export const AI_AUDIT: AIAuditEvent[] = [
  { id: "au-1", at: NOW, actor: "dispatcher@anderoute.com", role: "dispatcher",
    action: "approved customer update draft", recommendation_id: RECOMMENDATIONS[0]?.id,
    approval_level: "dispatcher", outcome: "approved" },
  { id: "au-2", at: NOW, actor: "manager@anderoute.com", role: "dispatcher_manager",
    action: "rejected reassignment recommendation", recommendation_id: RECOMMENDATIONS[1]?.id,
    approval_level: "dispatcher_manager", outcome: "rejected", notes: "Driver confirmed back on route." },
  { id: "au-3", at: NOW, actor: "copilot.system", role: "system",
    action: "generated executive summary", approval_level: "none", outcome: "executed" },
];

export const EXECUTIVE_SUMMARY: ExecutiveSummary = {
  id: "exec-1", generated_at: NOW,
  headline: "Operations are stable with 1 critical exposure on a VIP shipment.",
  bullets: [
    "Health score 78 (▲3). On-time forecast 91%.",
    "3 active risks; 1 critical (CDL validation on AR-2054).",
    "Revenue at risk (placeholder): $18.4k across 2 customers.",
    "CoPilot drafted 4 actions; 1 awaiting manager approval.",
  ],
  health_score: 78, on_time_forecast_pct: 91, at_risk_loads: 3,
  revenue_at_risk_placeholder: 18_400,
  top_actions: ["Approve AR-2054 reassignment", "Send Apex Supply proactive update", "Confirm Marcus Chen GPS"],
};

export const MODEL_RUNS: PredictiveModelRun[] = [
  { id: "m-1", model_provider: "rules_based", ran_at: NOW, inputs_count: 22, outputs_count: 9, duration_ms: 38, status: "ok" },
  { id: "m-2", model_provider: "mock_ml", ran_at: NOW, inputs_count: 22, outputs_count: 12, duration_ms: 84, status: "ok", notes: "Demo; not trained on real data." },
];
