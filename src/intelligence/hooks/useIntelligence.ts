/** Phase 9 — hooks over mock intelligence data. */
import {
  RISKS, RECOMMENDATIONS, HEALTH_SCORE, ETA_CONFIDENCE, CAPACITY, SHIFT_HANDOFF,
  CUSTOMER_IMPACT, PRIORITIZED_ALERTS, MAINTENANCE_RISK, AI_USAGE, AI_AUDIT,
  EXECUTIVE_SUMMARY, MODEL_RUNS,
} from "../data/mockIntelligence";

export function usePredictiveRisks()           { return { risks: RISKS }; }
export function useAIRecommendations()         { return { recommendations: RECOMMENDATIONS }; }
export function useAIApprovalQueue() {
  return { queue: RECOMMENDATIONS.filter((r) => r.approval_required !== "none" && r.status === "pending") };
}
export function useOperationsHealthScore()     { return { health: HEALTH_SCORE }; }
export function useETAConfidence()             { return { events: ETA_CONFIDENCE }; }
export function useCapacityForecast()          { return { slots: CAPACITY }; }
export function useDriverAvailabilityForecast(){ return { slots: CAPACITY.map((s) => ({ hour: s.hour, drivers: s.available_drivers })) }; }
export function useVehicleAvailabilityForecast(){ return { slots: CAPACITY.map((s) => ({ hour: s.hour, vehicles: s.available_vehicles })) }; }
export function useShiftHandoff()              { return { handoff: SHIFT_HANDOFF }; }
export function useCustomerImpact()            { return { customers: CUSTOMER_IMPACT }; }
export function usePrioritizedAlerts()         { return { alerts: PRIORITIZED_ALERTS }; }
export function useExecutiveIntelligence()     { return { summary: EXECUTIVE_SUMMARY, health: HEALTH_SCORE }; }
export function useMaintenanceRisk()           { return { vehicles: MAINTENANCE_RISK }; }
export function useAIUsage()                   { return { usage: AI_USAGE }; }
export function useAICostControls()            {
  const total = AI_USAGE.reduce((a, b) => a + b.cost_placeholder, 0);
  return { total_cost_placeholder: total, budget_placeholder: 60, usage: AI_USAGE };
}
export function useAISafetyPolicy() {
  return {
    rules: [
      "AI cannot override driver safety controls.",
      "AI cannot bypass RBAC or company boundaries.",
      "AI cannot send customer messages without dispatcher approval.",
      "AI cannot mark deliveries complete.",
      "AI cannot override CDL warnings without manager approval.",
      "AI cannot modify billing without billing admin approval.",
      "AI must label stale or estimated data.",
      "AI must show confidence and reasoning.",
      "AI actions are audited.",
    ],
  };
}
export function useAIActionAudit()             { return { events: AI_AUDIT }; }
export function usePredictiveModelRuns()       { return { runs: MODEL_RUNS }; }
