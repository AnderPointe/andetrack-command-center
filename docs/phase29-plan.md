# Phase 29 — V8 global operating network scale

Status: shipped (mock-only UI + hooks + docs).

## What ships
- V8 scope board + feature matrix + deferred panel
- Global Operating Network Scale Dashboard (scale score, trend, network metrics, regional hotspots)
- Country Operating Command Centers (USA / Canada / Mexico / EU / UK)
- International Marketplace Expansion + Regional Marketplace Liquidity + Lane heatmap
- International Carrier Operations + country eligibility rules
- Cross-Border Operating Controls (placeholder checklist + audit shipments)
- Financial Control Maturity Center + control tests
- Revenue Reconciliation Maturity (placeholder, NOT GAAP)
- Global Billing & Usage Control Center (country billing readiness)
- Advanced Compliance Execution + Country Compliance Execution Boards
- Global Customer Success Operations
- International Support Operations
- Global Partner Operations
- Executive Strategic Governance (decision queue)
- Board-Level Global Strategy Report (12 sections)
- Global Risk & Control Command Center (14 areas)
- Global Product Adoption Dashboard
- Regional Expansion Decision Engine
- Long-Term Global Operating Model
- V8 reports dashboard (20 reports)
- 17-step V8 demo flow (Canada controlled pilot)

## Explicitly deferred
- Fully autonomous dispatch
- Final legal compliance claims
- Final financial audit / SOC 2 / ISO claims
- Final Android Auto / CarPlay claims
- Full international tax automation
- Full customs production workflows
- Insurance underwriting automation
- Autonomous vehicle workflows

## Routes (under /v8)
overview, scope, network-scale, country-command, intl-marketplace, regional-liquidity,
carrier-ops, cross-border, financial-maturity, revenue-recon, billing-controls,
compliance, country-compliance, customer-success, support-ops, partner-ops,
governance, board-report, risk-control, adoption, expansion-decision,
operating-model, reports, demo

## Code surfaces
- `src/v8/data/mockPhase29.ts` — all mock data
- `src/v8/hooks.ts` — 22 V8 hooks
- `src/components/v8/{V8Page,V8Nav,ui-bits}.tsx`
- `src/routes/v8.*.tsx`

## Acceptance
All Phase 29 acceptance items in the original brief are present in the V8 UI.
