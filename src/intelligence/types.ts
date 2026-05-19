/** Phase 9 — AI Operations Intelligence types. Mock/demo. */

export type RiskLevel = "low" | "moderate" | "high" | "critical";
export type HealthLevel = "excellent" | "stable" | "watch" | "at_risk" | "critical";
export type Confidence = "low" | "medium" | "high";

export type RiskReasonCode =
  | "traffic_delay"
  | "route_deviation"
  | "stale_gps"
  | "driver_unavailable"
  | "vehicle_mismatch"
  | "cdl_validation_missing"
  | "hazmat_warning"
  | "delivery_window_tight"
  | "customer_priority_high"
  | "excessive_stop_duration"
  | "route_safety_warning"
  | "weather_placeholder"
  | "maintenance_placeholder"
  | "fuel_efficiency_low"
  | "offline_queue_pending"
  | "dispatch_attention_needed";

export type RiskType =
  | "delivery_delay"
  | "pickup_delay"
  | "driver_availability"
  | "vehicle_mismatch"
  | "gps_stale"
  | "route_deviation"
  | "weather"
  | "traffic"
  | "customer_priority"
  | "cdl_compliance"
  | "hazmat_compliance"
  | "driver_fatigue"
  | "vehicle_maintenance"
  | "fuel_efficiency"
  | "delivery_window"
  | "billing_dispute"
  | "customer_satisfaction";

export type ApprovalLevel =
  | "none"
  | "dispatcher"
  | "dispatcher_manager"
  | "company_admin"
  | "billing_admin"
  | "platform_admin";

export type RecommendationType =
  | "assign_driver"
  | "reassign_driver"
  | "offer_load"
  | "reroute_driver"
  | "contact_driver"
  | "contact_customer"
  | "send_eta_update"
  | "escalate_alert"
  | "open_incident"
  | "create_dispatch_note"
  | "adjust_pickup_window"
  | "adjust_delivery_window"
  | "request_customer_approval"
  | "trigger_pod_followup"
  | "review_cdl_validation"
  | "request_vehicle_check"
  | "schedule_maintenance"
  | "review_billing_risk";

export type RecommendationStatus = "pending" | "approved" | "rejected" | "executed" | "expired";
export type TimeSensitivity = "now" | "within_30m" | "within_2h" | "today" | "this_week";

export interface PredictiveRisk {
  id: string;
  company_id: string;
  risk_type: RiskType;
  risk_level: RiskLevel;
  risk_score: number;        // 0-100
  confidence: Confidence;
  title: string;
  summary: string;
  reason_codes: RiskReasonCode[];
  recommended_action: string;
  impacted_driver_id?: string;
  impacted_driver_name?: string;
  impacted_vehicle_id?: string;
  impacted_load_id?: string;
  impacted_shipment_id?: string;
  impacted_customer_id?: string;
  impacted_customer_name?: string;
  estimated_impact_minutes?: number;
  estimated_cost_impact?: number;
  time_sensitivity: TimeSensitivity;
  requires_approval: ApprovalLevel;
  status: "open" | "acknowledged" | "resolved";
  created_at: string;
  resolved_at?: string;
}

export interface AIRecommendation {
  id: string;
  company_id: string;
  type: RecommendationType;
  title: string;
  summary: string;
  confidence: Confidence;
  confidence_pct: number;        // 0-100
  expected_outcome: string;
  risk_reduced_pct: number;      // 0-100
  estimated_time_saved_min?: number;
  estimated_cost_impact?: number;
  required_permissions: string[];
  approval_required: ApprovalLevel;
  one_click_action_label?: string;
  explanation: AIExplanation;
  data_used: string[];
  status: RecommendationStatus;
  linked_risk_id?: string;
  impacted_load_id?: string;
  impacted_driver_name?: string;
  impacted_customer_name?: string;
  created_at: string;
  decided_at?: string;
  decided_by?: string;
}

export interface AIExplanation {
  what_i_noticed: string;
  why_it_matters: string;
  data_used: string[];
  confidence_label: string;
  recommended_action: string;
  risk_if_ignored: string;
  human_approval_needed: ApprovalLevel;
}

export interface OperationsHealthScore {
  score: number;                 // 0-100
  level: HealthLevel;
  trend: "up" | "down" | "flat";
  delta_24h: number;
  main_causes: string[];
  recommended_actions: string[];
  impact_if_ignored: string;
  components: { label: string; value: number; weight: number; status: HealthLevel }[];
}

export interface ETAConfidenceEvent {
  id: string;
  load_id: string;
  driver_name: string;
  confidence_pct: number;
  confidence: Confidence;
  reasons: string[];
  recommended_action: string;
  dispatch_note_suggestion: string;
  customer_update_suggestion: string;
  computed_at: string;
}

export interface CapacityForecastSlot {
  hour: string;                  // e.g. "14:00"
  available_drivers: number;
  available_vehicles: number;
  expected_deliveries: number;
  expected_delays: number;
  demand_placeholder: number;
  dispatcher_workload: number;
  coverage_gap: boolean;
}

export interface ShiftHandoffSummary {
  id: string;
  generated_at: string;
  generated_by: string;
  shift_label: string;
  active_loads: number;
  at_risk_loads: number;
  delayed_drivers: number;
  drivers_on_break: number;
  drivers_off_duty: number;
  loads_awaiting_assignment: number;
  customer_issues: string[];
  open_alerts: number;
  edi_api_issues: string[];
  weather_traffic_notes: string[];
  priority_actions: string[];
  recommended_next_steps: string[];
}

export interface CustomerImpactRecord {
  customer_id: string;
  customer_name: string;
  priority: "standard" | "high" | "vip";
  delayed_shipments: number;
  at_risk_deliveries: number;
  needs_proactive_update: boolean;
  recent_messages: number;
  satisfaction_placeholder: number; // 0-100
  revenue_impact_placeholder: number;
  recommended_message: string;
}

export interface PrioritizedAlert {
  id: string;
  alert_type: string;
  severity: "info" | "warning" | "critical";
  title: string;
  impact_score: number; // 0-100
  reasons: string[];
  suggested_resolutions: string[];
  created_at: string;
}

export interface MaintenanceRiskScore {
  vehicle_id: string;
  unit: string;
  risk_score: number;
  level: RiskLevel;
  mileage: number;
  fuel_efficiency_trend: "up" | "down" | "flat";
  driver_reports: number;
  next_inspection_at: string;
  recommended_action: string;
}

export interface AIUsageRecord {
  feature: string;
  role: string;
  company_id: string;
  calls_24h: number;
  tokens_placeholder: number;
  cost_placeholder: number;
  budget_pct: number;
}

export interface AIAuditEvent {
  id: string;
  at: string;
  actor: string;
  role: string;
  action: string;
  recommendation_id?: string;
  approval_level: ApprovalLevel;
  outcome: "approved" | "rejected" | "executed" | "viewed";
  notes?: string;
}

export interface ExecutiveSummary {
  id: string;
  generated_at: string;
  headline: string;
  bullets: string[];
  health_score: number;
  on_time_forecast_pct: number;
  at_risk_loads: number;
  revenue_at_risk_placeholder: number;
  top_actions: string[];
}

export interface PredictiveModelRun {
  id: string;
  model_provider: "rules_based" | "mock_ml" | "future_hosted" | "future_warehouse";
  ran_at: string;
  inputs_count: number;
  outputs_count: number;
  duration_ms: number;
  status: "ok" | "warning" | "error";
  notes?: string;
}
