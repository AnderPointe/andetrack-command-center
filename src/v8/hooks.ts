// V8 hooks — Phase 29 mock-only.
import * as M from "./data/mockPhase29";

export const useV8Scope                         = () => ({ matrix: M.V8_FEATURE_MATRIX, deferred: M.V8_DEFERRED, scale: M.V8_GLOBAL_SCALE });
export const useGlobalOperatingNetworkScale     = () => ({ scale: M.V8_GLOBAL_SCALE, trend: M.V8_SCALE_TREND, metrics: M.GLOBAL_NETWORK_METRICS, hotspots: M.REGIONAL_HOTSPOTS });
export const useCountryOperatingCommand         = () => ({ countries: M.COUNTRY_CENTERS });
export const useInternationalMarketplaceExpansion = () => ({ countries: M.INTL_MARKETPLACE, recs: M.MARKETPLACE_REC });
export const useRegionalMarketplaceLiquidity    = () => ({ regions: M.REGIONAL_LIQUIDITY, lanes: M.LANE_HEATMAP });
export const useInternationalCarrierOperations  = () => ({ carriers: M.INTL_CARRIER_OPS, rules: M.CARRIER_ELIGIBILITY_RULES });
export const useCrossBorderOperatingControls    = () => ({ checklist: M.CROSS_BORDER_CHECKLIST, shipments: M.CROSS_BORDER_SHIPMENTS });
export const useFinancialControlMaturity        = () => ({ maturity: M.FINANCIAL_CONTROL_MATURITY, tests: M.FINANCIAL_CONTROL_TESTS });
export const useRevenueReconciliationMaturity   = () => ({ events: M.REVENUE_RECON_EVENTS_V8, summary: M.REVENUE_RECON_SUMMARY_V8 });
export const useGlobalBillingUsageControls      = () => ({ countries: M.GLOBAL_BILLING_COUNTRIES });
export const useAdvancedComplianceExecution     = () => ({ summary: M.COMPLIANCE_EXEC_V8, regional: M.COMPLIANCE_REGIONAL });
export const useCountryComplianceExecution      = () => ({ canada: M.COUNTRY_COMPLIANCE_CANADA, regional: M.COMPLIANCE_REGIONAL });
export const useGlobalCustomerSuccessOperations = () => ({ summary: M.GLOBAL_CUSTOMER_SUCCESS, accounts: M.GLOBAL_ACCOUNTS });
export const useInternationalSupportOperations  = () => ({ regions: M.INTL_SUPPORT_OPS, volume: M.SUPPORT_VOLUME });
export const useGlobalPartnerOperations         = () => ({ partners: M.GLOBAL_PARTNER_OPS, roadmap: M.PARTNER_ROADMAP });
export const useExecutiveStrategicGovernance    = () => ({ decisions: M.STRATEGIC_DECISIONS, summary: M.STRATEGIC_DECISIONS_SUMMARY });
export const useBoardGlobalStrategyReporting    = () => ({ sections: M.BOARD_REPORT_SECTIONS });
export const useGlobalRiskControlCommand        = () => ({ matrix: M.GLOBAL_RISK_MATRIX });
export const useGlobalProductAdoption           = () => ({ products: M.PRODUCT_ADOPTION, gaps: M.ADOPTION_GAPS });
export const useRegionalExpansionDecision       = () => ({ rows: M.EXPANSION_DECISION });
export const useLongTermGlobalOperatingModel    = () => ({ model: M.OPERATING_MODEL, summary: M.OPERATING_MODEL_SUMMARY });
export const useReportsV8                       = () => ({ reports: M.V8_REPORTS });
export const useV8ExecHeadline                  = () => M.V8_EXEC_HEADLINE;
export const useV8ExecutionOverlays              = () => M.V8_EXECUTION_OVERLAYS;
export const useV8ExecutionOverlay               = (area: string) =>
  M.V8_EXECUTION_OVERLAYS.find((o) => o.area.toLowerCase() === area.toLowerCase()) ?? null;
