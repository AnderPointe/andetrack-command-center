# Phase 36 — V11.5 Enterprise Revenue Optimization (polish)

Mock-only polish. No autonomous deal closure or discounting. No IPO/M&A
claims. No new Supabase Edge Functions (logic lives in TanStack
`createServerFn`; external callbacks go to `/api/public/*` with HMAC).

## What this polish adds

- Revenue Optimization Command Center with lever-level uplift tracking
- Revenue quality optimization layer tying monetization to recurring mix, margin quality, deferred revenue, and forecast confidence
- Commercial operating maturity scorecards (forecast, hygiene, win/loss,
  renewal/expansion motion, QTC, partner motion)
- Strategic customer expansion with intelligence signals, whitespace sizing,
  sponsor coverage, and sample account growth plan
- Renewal & expansion discipline funnel (GRR/NRR)
- Retention risk command center with save plays and save-coverage summary
- Partner ecosystem monetization + revenue ops (sourced/influenced/payout,
  co-sell win rate, payout accuracy, recruited partners)
- Capital-ready revenue governance (audit-grade rev rec, concentration,
  cohort retention, rev quality, deferred rev, forecast confidence)
- Pricing optimization governance (caps, floors, 30-day breaches,
  governed-deal rate, exception rate, breach recovery)
- Packaging optimization (attach %, ARR share, QoQ trend,
  premium-mix and monetization-depth steering)
- Deal desk operating discipline (SLA, compliance, stage win rates,
  median cycle, procurement escape, multithreading)
- Trust-led procurement acceleration (cycle compression metrics)
- Sales engineering scale (coverage, reuse, POC, trust deliverables,
  trust-pack hit rate)
- Customer proof revenue influence (proof → ARR attribution)
- Marketplace + API/EDI monetization optimization
- Board-level commercial performance pack with packet readiness and open
  decisions
- Long-term 12-quarter revenue strategy roadmap with now/next/later
  priorities
- Executive headline + overlays + cadence + role guidance + close-out
- Stronger RLS example library surfaced in overview/demo flows
- Clearer server-function vs public-route separation surfaced in overview/demo
  flows
- V11.5 demo flow (CRO → RevOps → CCO → CSM → Deal Desk → Pricing →
  Security → SE → Partner → MP → CFO → CEO) with signed close-out actions

## Backend boundary

| Kind         | Name                                                      | Caller            | Auth                                   |
| ------------ | --------------------------------------------------------- | ----------------- | -------------------------------------- |
| server fn    | `calculate-revenue-optimization-score`                    | app               | `requireSupabaseAuth` + admin          |
| server fn    | `generate-capital-ready-revenue-report`                   | app               | `requireSupabaseAuth` + admin          |
| server fn    | `calculate-retention-risk-scores`                         | app               | `requireSupabaseAuth`                  |
| server fn    | `calculate-partner-payouts`                               | app               | `requireSupabaseAuth` + admin          |
| server fn    | `enforce-pricing-policy`                                  | app               | `requireSupabaseAuth` + deal-desk role |
| public route | `POST /api/public/webhooks/partner-payment-confirm`       | partner billing   | HMAC                                   |
| public route | `POST /api/public/webhooks/marketplace-take-event`        | MP processor      | HMAC                                   |
| public route | `POST /api/public/cron/refresh-v115-optimization`         | scheduler         | HMAC                                   |

Interpretation:

- Use TanStack `createServerFn` for all app-internal optimization scoring,
  governed reporting, and company-scoped workflows.
- Use `/api/public/*` only for externally-called webhooks and scheduled
  refreshes with explicit HMAC verification.
- Do not route internal commercial logic through public endpoints.

## RLS sketch (V11.5)

```sql
-- revenue optimization levers — exec/admin only
create policy "rev_opt_select" on public.revenue_optimization_levers
  for select to authenticated using (
    public.is_platform_owner(auth.uid())
    or public.has_role(auth.uid(), public.current_company(), 'admin')
  );

-- capital-ready reports — platform owner only
create policy "capital_ready_select" on public.capital_ready_reports
  for select to authenticated using (public.is_platform_owner(auth.uid()));

-- retention risk — company members can read their accounts
create policy "retention_risk_select" on public.retention_risk_accounts
  for select to authenticated using (
    public.is_company_member(auth.uid(), company_id)
  );

-- partner payouts — admin or partner-owner
create policy "partner_payouts_select" on public.partner_payouts
  for select to authenticated using (
    public.has_role(auth.uid(), public.current_company(), 'admin')
    or partner_user_id = auth.uid()
  );

-- pricing policy breaches — admin write only
create policy "pricing_breach_insert" on public.pricing_policy_breaches
  for insert to authenticated with check (
    public.has_role(auth.uid(), public.current_company(), 'admin')
  );

-- board packets — platform owner or company admin only
create policy "board_packets_select" on public.board_commercial_packets
  for select to authenticated using (
    public.is_platform_owner(auth.uid())
    or public.has_role(auth.uid(), public.current_company(), 'admin')
  );

-- expansion plans — company-scoped update by admins only
create policy "expansion_plan_update" on public.expansion_account_plans
  for update to authenticated using (
    public.is_company_member(auth.uid(), company_id)
  ) with check (
    public.is_company_member(auth.uid(), company_id)
    and public.has_role(auth.uid(), public.current_company(), 'admin')
  );
```

## Deferred

- Fully autonomous deal closure
- Autonomous discounting without human approval
- IPO/M&A execution claims
- Automated partner payout without finance review
- Phase 37 scope
