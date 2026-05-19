/** Phase 9 — Predictive model abstraction. Mock providers only. */
import type { Confidence } from "../types";

export type ModelProviderId = "rules_based" | "mock_ml" | "future_hosted" | "future_warehouse";

export interface PredictiveModelProvider {
  id: ModelProviderId;
  label: string;
  predictDelayRisk(ctx: { load_id: string }): { score: number; confidence: Confidence; mock: true };
  predictEtaConfidence(ctx: { load_id: string }): { pct: number; confidence: Confidence; mock: true };
  predictDriverAvailability(): { available_now: number; available_in_2h: number; mock: true };
  predictVehicleAvailability(): { dry_van: number; reefer: number; flatbed: number; mock: true };
  predictCustomerImpact(): { at_risk_customers: number; vip_at_risk: number; mock: true };
  predictMaintenanceRisk(): { vehicles_flagged: number; mock: true };
  predictDispatchWorkload(): { peak_hour: string; load_count: number; mock: true };
  predictRevenueRisk(): { revenue_at_risk_placeholder: number; mock: true };
}

export const RulesBasedPredictiveModel: PredictiveModelProvider = {
  id: "rules_based", label: "Rules-based (mock)",
  predictDelayRisk: () => ({ score: 64, confidence: "medium", mock: true }),
  predictEtaConfidence: () => ({ pct: 72, confidence: "medium", mock: true }),
  predictDriverAvailability: () => ({ available_now: 12, available_in_2h: 18, mock: true }),
  predictVehicleAvailability: () => ({ dry_van: 8, reefer: 3, flatbed: 2, mock: true }),
  predictCustomerImpact: () => ({ at_risk_customers: 4, vip_at_risk: 1, mock: true }),
  predictMaintenanceRisk: () => ({ vehicles_flagged: 2, mock: true }),
  predictDispatchWorkload: () => ({ peak_hour: "15:00", load_count: 22, mock: true }),
  predictRevenueRisk: () => ({ revenue_at_risk_placeholder: 18400, mock: true }),
};

export const MockMLModel: PredictiveModelProvider = {
  ...RulesBasedPredictiveModel,
  id: "mock_ml", label: "Mock ML (demo)",
  predictDelayRisk: () => ({ score: 71, confidence: "high", mock: true }),
  predictEtaConfidence: () => ({ pct: 81, confidence: "high", mock: true }),
};

let current: PredictiveModelProvider = RulesBasedPredictiveModel;
export function getPredictiveModel(): PredictiveModelProvider { return current; }
export function setPredictiveModel(p: PredictiveModelProvider) { current = p; }
