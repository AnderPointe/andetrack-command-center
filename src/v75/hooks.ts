// V7.5 hooks — mock-only.
import * as M from "./data/mockPhase28";

export const useV75Scope                       = () => ({ matrix: M.V75_FEATURE_MATRIX, deferred: M.V75_DEFERRED, score: M.V75_EXECUTION_READINESS });
export const useGlobalExpansionExecution       = () => ({ score: M.V75_EXECUTION_READINESS, countries: M.COUNTRY_LAUNCHES, blockers: M.COUNTRY_BLOCKERS, trend: M.V75_EXECUTION_TREND, alerts: M.V75_EXECUTION_ALERTS });
export const useCountryLaunchExecution         = () => ({ countries: M.COUNTRY_LAUNCHES, blockers: M.COUNTRY_BLOCKERS, trend: M.COUNTRY_READINESS_TREND });
export const useControlledCountryPilot         = () => ({ steps: M.COUNTRY_PILOT_STEPS, country: "Canada", conditions: M.PILOT_CONDITIONS_CANADA });
export const useRegulatedCustomerOnboarding    = () => ({ steps: M.REGULATED_ONBOARDING_STEPS, owners: M.REGULATED_ONBOARDING_OWNERS });
export const useRegulatedControlPack           = () => ({ sections: M.CONTROL_PACK_SECTIONS, summary: M.CONTROL_PACK_SUMMARY });
export const useAdvancedFinancialAuditReadiness= () => ({ audit: M.FINANCIAL_AUDIT_V75, trend: M.FINANCIAL_AUDIT_TREND });
export const useRevenueReconciliationPlaceholder = () => ({ events: M.REVENUE_RECON_EVENTS, summary: M.REVENUE_RECON_SUMMARY });
export const useGlobalRevenueControls          = () => ({ countries: M.COUNTRY_BILLING, summary: M.GLOBAL_REVENUE_SUMMARY });
export const useInternationalPartnerLaunch     = () => ({ partners: M.PARTNER_LAUNCHES, funnel: M.PARTNER_LAUNCH_FUNNEL });
export const useInternationalPartnerCertification = () => ({ checks: M.PARTNER_CERT_CHECKS, summary: M.PARTNER_CERT_SUMMARY });
export const useGlobalMarketplaceDiscipline    = () => ({ discipline: M.MARKETPLACE_DISCIPLINE, trend: M.MARKETPLACE_DISCIPLINE_TREND });
export const useRegionalMarketplaceActivation  = () => ({ regions: M.REGIONAL_ACTIVATIONS, checklist: M.REGIONAL_ACTIVATION_CHECKLIST });
export const useDataResidencyExecution         = () => ({ rows: M.DATA_RESIDENCY_EXEC, summary: M.DATA_RESIDENCY_SUMMARY });
export const useCrossBorderExecutionPlaceholder= () => ({ shipments: M.CROSS_BORDER_PLACEHOLDER, summary: M.CROSS_BORDER_SUMMARY });
export const useGlobalSupportReadiness         = () => ({ regions: M.SUPPORT_READINESS, summary: M.SUPPORT_READINESS_SUMMARY });
export const useGlobalComplianceControlExecution = () => ({ controls: M.COMPLIANCE_EXEC, summary: M.COMPLIANCE_EXEC_SUMMARY });
export const useRegionalRiskManagement         = () => ({ risks: M.REGIONAL_RISKS, summary: M.REGIONAL_RISK_SUMMARY });
export const useExecutiveGlobalLaunchGovernance= () => ({ approvals: M.LAUNCH_APPROVALS, summary: M.LAUNCH_APPROVAL_SUMMARY });
export const useGlobalOperatingCadence         = () => ({ cadences: M.OPERATING_CADENCES, load: M.CADENCE_LOAD });
export const useInternationalCustomerSuccess   = () => ({ customers: M.INTL_CUSTOMERS, summary: M.INTL_CUSTOMER_SUMMARY });
export const useReportsV75                     = () => ({ reports: M.V75_REPORTS });
export const useV75ExecHeadline                = () => M.V75_EXEC_HEADLINE;
