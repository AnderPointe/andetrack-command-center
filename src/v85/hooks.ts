// V8.5 hooks — Phase 30 mock-only.
import * as M from "./data/mockPhase30";

export const useV85Scope                          = () => ({ matrix: M.V85_FEATURE_MATRIX, deferred: M.V85_DEFERRED, discipline: M.V85_OPERATING_DISCIPLINE });
export const useGlobalOperatingDiscipline         = () => ({ score: M.V85_OPERATING_DISCIPLINE, domains: M.V85_DISCIPLINE_DOMAINS, trend: M.V85_DISCIPLINE_TREND, gaps: M.V85_DISCIPLINE_GAPS, actions: M.V85_DISCIPLINE_ACTION_PLAN });
export const useInternationalControlMaturity      = () => ({ summary: M.V85_CONTROL_MATURITY, domains: M.V85_CONTROL_DOMAINS, exceptions: M.V85_CONTROL_EXCEPTIONS });
export const useCountryAccountability             = () => ({ countries: M.V85_COUNTRY_ACCOUNTABILITY });
export const useGlobalControlOwnership            = () => ({ controls: M.V85_CONTROL_OWNERSHIP });
export const useMarketplaceFinancialOptimization  = () => ({ economics: M.V85_MARKETPLACE_ECONOMICS, fees: M.V85_MARKETPLACE_FEE_PANEL, risks: M.V85_MARKETPLACE_FIN_RISK });
export const useMarketplaceEconomicsOptimization  = () => ({ goals: M.V85_ECON_GOALS, liquidity: M.V85_ECON_LIQUIDITY_PANELS, bids: M.V85_ECON_BID_DENSITY });
export const useFinancialControlTesting           = () => ({ tests: M.V85_FIN_TESTS, summary: M.V85_FIN_TEST_SUMMARY, evidence: M.V85_FIN_EVIDENCE_REQUESTS });
export const useRevenueControlMaturity            = () => ({ score: M.V85_REVENUE_CONTROL, completeness: M.V85_REVENUE_EVENT_COMPLETENESS, trend: M.V85_REVENUE_RECON_TREND });
export const useAdvancedBoardGovernance           = () => ({ calendar: M.V85_BOARD_CALENDAR, packet: M.V85_BOARD_PACKET_SECTIONS, decisions: M.V85_BOARD_DECISIONS, actions: M.V85_BOARD_ACTIONS, kpi: M.V85_BOARD_KPI_APPENDIX });
export const useExecutiveStewardship              = () => ({ priorities: M.V85_EXEC_PRIORITIES, blockers: M.V85_EXEC_CROSS_BLOCKERS, initiatives: M.V85_STRATEGIC_INITIATIVES });
export const usePlatformStewardship               = () => ({ domains: M.V85_STEWARDSHIP_DOMAINS, summary: M.V85_STEWARDSHIP_SCORE });
export const useGlobalOperatingCadence            = () => ({ items: M.V85_CADENCE, health: M.V85_CADENCE_HEALTH });
export const useCountryPerformanceReview          = () => ({ rows: M.V85_COUNTRY_REVIEWS, notes: M.V85_COUNTRY_REVIEW_NOTES });
export const useComplianceExecutionMaturity       = () => ({ summary: M.V85_COMPLIANCE_MATURITY, trend: M.V85_COMPLIANCE_EXECUTION_TREND, remediation: M.V85_COMPLIANCE_REMEDIATION });
export const useInternationalSupportDiscipline    = () => ({ regions: M.V85_SUPPORT_DISCIPLINE, summary: M.V85_SUPPORT_DISCIPLINE_SCORE });
export const useGlobalCustomerSuccessDiscipline   = () => ({ summary: M.V85_CS_DISCIPLINE, accounts: M.V85_CS_HEALTH_MATRIX });
export const usePartnerOperatingDiscipline        = () => ({ partners: M.V85_PARTNER_DISCIPLINE, summary: M.V85_PARTNER_DISCIPLINE_SCORE });
export const useStrategicRiskOwnership            = () => ({ risks: M.V85_STRATEGIC_RISKS, residual: M.V85_RESIDUAL_RISK_TREND });
export const useProductLineStewardship            = () => ({ lines: M.V85_PRODUCT_LINES, summary: M.V85_PRODUCT_LINE_SCORE });
export const useAIGovernanceStewardship           = () => ({ summary: M.V85_AI_GOVERNANCE, policies: M.V85_AI_POLICY_AREAS });
export const usePlatformReliabilityStewardship    = () => ({ summary: M.V85_RELIABILITY, incidents: M.V85_RELIABILITY_INCIDENTS, actions: M.V85_RELIABILITY_ACTIONS });
export const useReportsV85                        = () => ({ reports: M.V85_REPORTS });
export const useV85ExecHeadline                   = () => M.V85_EXEC_HEADLINE;
export const useV85ExecutionOverlays              = () => M.V85_EXECUTION_OVERLAYS;
