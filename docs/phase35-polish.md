# Phase 35 Polish — V11 Enterprise Revenue Maturity

Mock-only polish on the V11 suite. No autonomous dispatch, no certification/IPO claims.

## Additions
- **Revenue maturity trend** (5 quarters): engine / monetization / trust / partner scores.
- **Outcome KPIs vs target**: ARR, expansion ARR, GRR, NRR, win rate, trust packet cycle, deal desk SLA, partner-sourced %.
- **Monetization lever breakdown**: ARR share % + attach % + ΔQ across subscription, marketplace take, API metered, EDI metered, premium support, onboarding services.
- **Revenue risk heatmap**: likelihood × impact × owner × mitigation for the top 6 revenue risks.
- **Role guidance + demo close-out commitments** wired into the V11 demo flow.

## Backend boundary
- Internal scoring, plan generation, deal-desk approvals, trust packets, board pack generation → TanStack `createServerFn` with `requireSupabaseAuth` (and role checks for executive/board endpoints).
- External partner revenue + procurement status callbacks → `/api/public/webhooks/*` server routes with HMAC signature verification.

## RLS sketch (V11)
```sql
-- enterprise_opportunities: company members + assigned sales user
create policy "v11 opps company"
  on public.enterprise_opportunities for select
  using (is_company_member(auth.uid(), company_id));

-- deal_desk_requests: company members; approve restricted to revops role
create policy "v11 deal desk approve"
  on public.deal_desk_requests for update
  using (has_role(auth.uid(), company_id, 'revops'));

-- board_revenue_reports: executive/board only
create policy "v11 board revenue read"
  on public.board_revenue_reports for select
  using (has_role(auth.uid(), company_id, 'board')
      or has_role(auth.uid(), company_id, 'executive'));

-- partner_revenue_events: partner users see only approved partner-facing rows
create policy "v11 partner revenue partner-facing"
  on public.partner_revenue_events for select
  using (status = 'approved' and partner_id = current_partner());
```

Customer/carrier/partner users cannot read internal pricing, deal, risk, or board revenue records.

## Not included
- Phase 36 work (deferred).
- Fully autonomous dispatch.
