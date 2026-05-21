# Phase 30 — Edge function / server function separation for V8.5

V8.5 keeps the V8 boundary: **TanStack `createServerFn` is the default**;
Supabase Edge Functions are reserved for inbound webhooks that external
parties call directly. No autonomous dispatch anywhere in V8.5.

## TanStack `createServerFn` — internal logic

Use for everything called from the V8.5 UI:

| Server function                          | Purpose                                                          | Auth                          |
|------------------------------------------|------------------------------------------------------------------|-------------------------------|
| `getOperatingDiscipline`                 | Read discipline scores + domains + gaps                          | `requireSupabaseAuth`         |
| `recordControlTest`                      | Append financial / compliance / AI / reliability control result  | `requireSupabaseAuth` + admin |
| `getCountryAccountability`               | Cross-country accountability matrix                              | platform-owner only           |
| `getBoardPacket`                         | Drafts / locked sections for upcoming board review               | platform-owner only           |
| `lockBoardPacket`                        | Transition section status draft → review → locked                | platform-owner only           |
| `getMarketplaceEconomics`                | Lane liquidity + take-rate placeholder                           | `requireSupabaseAuth`         |
| `getExecutiveStewardshipDashboard`       | Aggregates priorities, blockers, top risks                       | `requireSupabaseAuth` + admin |
| `getAIGovernanceStewardship`             | Approval rules + explainability metrics                          | `requireSupabaseAuth` + admin |
| `getPlatformReliabilityStewardship`      | Incidents / PMs / RPO / RTO                                      | `requireSupabaseAuth` + admin |

All of these read inputs via `.inputValidator(z.object({...}).parse)` and
return plain DTOs (no SDK clients, no streams).

## Server routes — external HTTP only

Place under `src/routes/api/public/*`. Always verify signatures before
processing. Never return PII.

| Route                                            | Purpose                                                  |
|--------------------------------------------------|----------------------------------------------------------|
| `/api/public/webhooks/stripe-billing-incident`   | Stripe → record marketplace billing exception            |
| `/api/public/webhooks/security-evidence-vendor`  | Compliance evidence vendor → append control test record  |
| `/api/public/hooks/board-packet-reminder`        | pg_cron → trigger packet draft reminder                  |

## Supabase Edge Functions — ONLY if required by perimeter

Reserved for trigger-style work that must run inside Supabase's network
(e.g., `auth.users` insert hook). V8.5 introduces **none**; reuse the
inherited webhook-signature edge functions from earlier phases as-is.

## Explicit non-goals (V8.5)

- No autonomous dispatch.
- No final SOC 2 / ISO / GAAP claims — control testing is evidence
  collection only.
- No customs / underwriting / autonomous-vehicle workflows.
