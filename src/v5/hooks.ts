// Hooks for V5 (Phase 23). Mock-only; ready for serverFn wiring later.
import * as M from "./data/mockPhase23";

export const useV5Scope                       = () => ({ matrix: M.V5_FEATURE_MATRIX, deferred: M.V5_DEFERRED, maturity: M.V5_MATURITY });
export const useNationalPlatformMaturity      = () => ({ maturity: M.V5_MATURITY, trend: M.V5_MATURITY_TREND });
export const useMarketplaceLiquidity          = () => ({ liquidity: M.LIQUIDITY, trend: M.LIQUIDITY_TREND, uncovered: M.UNCOVERED_LOADS });
export const useCarrierSupplyDemand           = () => ({ regional: M.SUPPLY_DEMAND, equipment: M.EQUIPMENT_DEMAND, recs: M.CARRIER_GAP_RECS });
export const useLaneCoverage                  = () => ({ lanes: M.LANES });
export const useMarketplaceTrustSafety        = () => ({ kpis: M.TRUST_SAFETY, events: M.TRUST_EVENTS });
export const useCarrierQualityProgram         = () => ({ tiers: M.CARRIER_TIERS, preferred: M.PREFERRED_CARRIERS });
export const useStrategicPartnershipExecution = () => ({ partners: M.PARTNERS });
export const useCertificationCompletion       = () => ({ status: M.CERT_COMPLETION });
export const useSOC2Completion                = () => ({ controls: M.SOC2_CONTROLS, exceptions: M.SOC2_EXCEPTIONS });
export const useExecutiveBoardReporting       = () => ({ kpis: M.BOARD_KPIS, risks: M.BOARD_RISKS, decisions: M.BOARD_DECISIONS });
export const useCategoryLeadership            = () => ({ areas: M.POSITIONING_AREAS });
export const useCompetitiveIntelligence       = () => ({ competitors: M.COMPETITORS, winLoss: M.WIN_LOSS });
export const useMatureRevenueOperations       = () => ({ lines: M.REVENUE_LINES, renewals: M.RENEWAL_PIPELINE, expansion: M.EXPANSION_PIPELINE });
export const useMatureCustomerSuccess         = () => ({ accounts: M.CUSTOMER_HEALTH });
export const useMatureEnterpriseSupport       = () => ({ metrics: M.SUPPORT_METRICS });
export const useEnterpriseGovernanceMaturity  = () => ({ reviews: M.GOVERNANCE_REVIEWS, exceptions: M.GOVERNANCE_EXCEPTIONS });
export const useStrategicGrowthPlanning       = () => ({ initiatives: M.GROWTH_INITIATIVES });
export const usePartnerEcosystemExecution     = () => ({ partners: M.PARTNER_HEALTH });
export const useAdvancedOperatingMetrics      = () => ({ metrics: M.OPS_METRICS });
export const useNationalOperationsReview      = () => ({ regions: M.REGIONAL_REVIEW });
export const useDataRoomMaturity              = () => ({ items: M.DATA_ROOM, requests: M.DD_REQUESTS });
export const useReportsV5                     = () => ({ reports: M.V5_REPORTS });
