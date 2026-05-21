// V6.5 hooks — mock-only, ready for serverFn wiring later.
import * as M from "./data/mockPhase26";

export const useV65Scope                       = () => ({ matrix: M.V65_FEATURE_MATRIX, deferred: M.V65_DEFERRED });
export const usePlatformOperatingSystem        = () => ({ score: M.STRATEGIC_OPERATING_SCORE, actions: M.OPERATING_ACTION_PLAN });
export const useEnterpriseFinancialControls    = () => ({ controls: M.FINANCIAL_CONTROLS, queue: M.ADJUSTMENT_QUEUE, audit: M.FINANCIAL_AUDIT_TRAIL });
export const useBillingControls                = () => ({ billing: M.BILLING, failed: M.FAILED_PAYMENTS, audit: M.BILLING_AUDIT });
export const useRevenueRecognitionReadiness    = () => ({ events: M.REVENUE_EVENTS, exceptions: M.REVENUE_EXCEPTIONS });
export const useMarketplaceFinancialControls   = () => ({ summary: M.MKT_FINANCIAL, settlements: M.SETTLEMENT_QUEUE });
export const useAPIPartnerBillingControls      = () => ({ api: M.API_BILLING, events: M.API_BILLING_EVENTS });
export const useGlobalExpansionReadiness       = () => ({ countries: M.COUNTRIES });
export const useInternationalizationPlanning   = () => ({ keys: M.I18N_KEYS, locales: M.LOCALE_SETTINGS });
export const useRegionalComplianceReadiness    = () => ({ regions: M.REGIONAL_COMPLIANCE });
export const useAdvancedPartnerMarketplace     = () => ({ categories: M.PARTNER_CATEGORIES, listings: M.PARTNER_LISTINGS });
export const usePartnerProductCatalog          = () => ({ products: M.PARTNER_PRODUCTS });
export const usePartnerRevenueShare            = () => ({ rows: M.PARTNER_REV_SHARE });
export const useStrategicGovernance            = () => ({ domains: M.GOVERNANCE_DOMAINS, decisions: M.GOVERNANCE_DECISIONS });
export const useExecutiveDecisionSystem        = () => ({ requests: M.DECISION_REQUESTS });
export const useProductLineInvestmentGovernance= () => ({ lines: M.PRODUCT_LINES });
export const usePlatformEconomicsMaturity      = () => ({ economics: M.PLATFORM_ECONOMICS, margins: M.PRODUCT_LINE_MARGINS });
export const useRiskControlMatrix              = () => ({ rows: M.RISK_CONTROL_MATRIX });
export const useAuditControlEvidence           = () => ({ rows: M.AUDIT_EVIDENCE });
export const useComplianceControlOperations    = () => ({ rows: M.COMPLIANCE_CONTROLS });
export const useMarketplaceOperatingControls   = () => ({ rules: M.MARKETPLACE_CONTROLS });
export const useLongTermStrategicOperatingModel= () => ({ horizons: M.OPERATING_HORIZONS, pillars: M.OPERATING_PILLARS });
export const useReportsV65                     = () => ({ reports: M.V65_REPORTS });
