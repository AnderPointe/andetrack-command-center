// V6 hooks — mock-only, ready for serverFn wiring later.
import * as M from "./data/mockPhase25";

export const useV6Scope                          = () => ({ matrix: M.V6_FEATURE_MATRIX, deferred: M.V6_DEFERRED });
export const useCategoryDefiningPlatform         = () => ({ scores: M.CATEGORY_LEADERSHIP, trend: M.CATEGORY_TREND, gaps: M.CATEGORY_GAPS });
export const useIntelligentLogisticsNetwork      = () => ({ volume: M.NETWORK_VOLUME, health: M.NETWORK_HEALTH, alerts: M.NETWORK_ALERTS });
export const useNetworkOperatingIntelligence     = () => ({ regions: M.REGIONS, recs: M.NETWORK_RECOMMENDATIONS });
export const useAdvancedAutomationGovernance     = () => ({ levels: M.AUTOMATION_LEVELS, policies: M.AUTOMATION_POLICIES });
export const useAutomationControlTower           = () => ({ tower: M.AUTOMATION_TOWER });
export const useAIGovernanceMaturityV6           = () => ({ gov: M.AI_GOV, trend: M.AI_RECS_TREND });
export const useMarketplaceLiquidityIntelligence = () => ({ liquidity: M.LIQUIDITY, lanes: M.LIQUIDITY_LANES, heatmap: M.LIQUIDITY_HEATMAP });
export const usePlatformEconomics                = () => ({ economics: M.ECONOMICS, segments: M.REVENUE_BY_SEGMENT, regions: M.REVENUE_BY_REGION });
export const useEnterpriseEcosystemScale         = () => ({ scale: M.ECOSYSTEM_SCALE });
export const useStrategicExitIPOReadiness        = () => ({ items: M.EXIT_READINESS });
export const useAdvancedInvestorDataRoom         = () => ({ sections: M.DATA_ROOM, requests: M.DD_REQUESTS });
export const useBoardGovernance                  = () => ({ meetings: M.BOARD_MEETINGS, agenda: M.BOARD_AGENDA, decisions: M.BOARD_DECISIONS, actions: M.BOARD_ACTIONS });
export const useStrategicRiskPortfolio           = () => ({ risks: M.STRATEGIC_RISKS });
export const useRoadmapInvestmentGovernance      = () => ({ horizons: M.ROADMAP_HORIZONS, items: M.ROADMAP_ITEMS, approvals: M.ROADMAP_APPROVALS });
export const usePlatformReliabilityMaturity      = () => ({ metrics: M.RELIABILITY, trend: M.RELIABILITY_TREND, postmortems: M.POSTMORTEMS });
export const useCertificationEvidenceCompletion  = () => ({ evidence: M.CERT_EVIDENCE });
export const useEnterpriseSecurityOperatingModel = () => ({ functions: M.SECURITY_FUNCTIONS });
export const useRevenueQualityMaturity           = () => ({ quality: M.REVENUE_QUALITY, mix: M.PRODUCT_MIX });
export const useCustomerPartnerEcosystemMaturity = () => ({ areas: M.CUSTOMER_PARTNER_MAT, opps: M.JOINT_OPPS });
export const useProductDefensibilityMaturity     = () => ({ factors: M.DEFENSIBILITY_FACTORS });
export const useCategoryNarrativeMarketEducation = () => ({ assets: M.NARRATIVE_ASSETS });
export const useReportsV6                        = () => ({ reports: M.V6_REPORTS });

// Phase 25 polish: enriched executive overlays
export const useCategoryAlerts                   = () => ({ alerts: M.CATEGORY_ALERTS, pillarTrend: M.CATEGORY_PILLAR_TREND });
export const useNetworkFlow                      = () => ({ flow: M.NETWORK_FLOW, subsystems: M.NETWORK_SUBSYSTEM_HEALTH });
export const useAutomationTowerTrend             = () => ({ trend: M.AUTOMATION_TOWER_TREND });
export const useAIGovAlerts                      = () => ({ alerts: M.AI_GOV_ALERTS });
export const useLiquidityTrend                   = () => ({ trend: M.LIQUIDITY_TREND });
export const useEconomicsTrend                   = () => ({ trend: M.ECONOMICS_TREND });
export const useBoardKpis                        = () => ({ kpis: M.BOARD_KPIS });
export const useReliabilitySLOs                  = () => ({ slos: M.RELIABILITY_SLOS });
export const useRiskTrend                        = () => ({ trend: M.RISK_TREND });
export const useExitPhases                       = () => ({ phases: M.EXIT_PHASES });
