# Phase 22 — V4.5 Operational Maturity

## Goal
Move Anderoute into V4.5 operational maturity: human-approved automation, national marketplace operations, certification execution, mobile launch execution, acquisition readiness, customer success / support maturity, AI governance maturity, revenue ops maturity, partner ecosystem, and national operating model.

## In scope
See `V45_SCOPE.included` in `src/v45/data/mockPhase22.ts`.

## Deferred
- Fully autonomous dispatch
- Final certification claims without auditor evidence
- Autonomous vehicle workflows
- Global customs workflows
- Full insurance underwriting
- Full factoring / settlement production
- International localization

## Routes
All under `/v45/*`:
overview, scope, automation, approvals, marketplace-ops, playbooks-marketplace,
carrier-quality, disputes, certification, soc2, mobile-launch, android-auto,
carplay, partnerships, acquisition, procurement, enterprise-customers,
customer-success, support, ai-governance, revenue-ops, partner-ecosystem,
playbooks, national-ops, platform-metrics, reports, demo.

## Components
`V45Page`, `V45Nav`, `ui-bits` (KpiGrid, ScoreCard, StatusPill, SimpleTable),
plus per-route compositions for ScopeBoard, FeatureMatrix, AutomationMaturityDashboard,
HumanApprovedAutomationCenter, NationalMarketplaceOperationsCenter,
MarketplacePlaybookLibrary, CarrierQualityDashboard, MarketplaceDisputeDashboard,
EnterpriseCertificationExecution, SOC2ControlMatrix, MobileLaunchExecutionCenter,
AndroidAutoExecutionMaturity, CarPlayExecutionMaturity, StrategicPartnershipReadiness,
AcquisitionReadinessDashboard, ProcurementPacketBuilder,
EnterpriseCustomerMaturityDashboard, CustomerSuccessMaturityDashboard,
SupportOperationsMaturity, AIGovernanceMaturityDashboard,
RevenueOperationsMaturityDashboard, PartnerEcosystemDashboard,
OperationalPlaybookLibrary, NationalOperatingModel, PlatformOperatingMetrics.

## Hooks
Hooks (`useV45Scope`, `useAutomationMaturity`, `useHumanApprovedAutomation`,
`useMarketplaceOperations`, `useMarketplacePlaybooks`, `useCarrierQuality`,
`useMarketplaceDisputes`, `useCertificationExecution`, `useSOC2Execution`,
`useMobileLaunchExecution`, `useAndroidAutoExecutionMaturity`,
`useCarPlayExecutionMaturity`, `useStrategicPartnershipReadiness`,
`useAcquisitionReadiness`, `useProcurementPacket`,
`useEnterpriseCustomerMaturity`, `useCustomerSuccessMaturity`,
`useSupportMaturity`, `useAIGovernanceMaturity`,
`useRevenueOperationsMaturity`, `usePartnerEcosystem`,
`useOperationalPlaybooks`, `useNationalOperatingModel`,
`usePlatformOperatingMetrics`) are exposed via `src/v45/hooks.ts` and return
the matching mock dataset from `mockPhase22.ts`. Wire them to server functions
when the Supabase schema in `docs/phase22-schema.sql` is migrated.

## Demo flow
See `/v45/demo` — scripted walkthrough across 7 actors.

## Guardrails
- No autonomous dispatch
- No SOC 2 / ISO / Android Auto / CarPlay approval claims without evidence
- Driver safety, RBAC, RLS, audit logging, and human approval workflows are non-negotiable
- AI is assistive; high-risk actions always require human approval
