# Phase 7 — Marketplace, EDI, Optimization, Enterprise White-Label (Plan)

Phase 7 builds on Phase 6's multi-company SaaS foundation.

## 1. Load marketplace integrations
- DAT, Truckstop, 123Loadboard adapters under `src/marketplace/providers/*`.
- Pull external loads → dedupe → surface in `Available` column with provenance badge.
- Server functions: `marketplace-search`, `marketplace-bid`, `marketplace-import-load`.
- Per-company credentials in Supabase Vault; never in browser.

## 2. EDI / API integrations
- X12 transactions: 204 (tender), 214 (status), 210 (invoice), 990 (response).
- Inbound endpoints under `/api/public/edi/*` with HMAC signing + AS2 plan.
- Outbound queue: `edi_outbound_events` table → background worker (Cloudflare Queues or Supabase cron).
- Map internal load/status to partner code sets per trading partner.

## 3. Route optimization
- Multi-stop VRP using OR-Tools (server-only) or external optimizer.
- Inputs: driver HOS, vehicle capacity, customer windows, CDL constraints.
- New tables: `optimization_runs`, `optimization_proposals`.
- UI: "Optimize day" button in Command Center → diff view → one-click apply.

## 4. White-label customer portal
- Per-company theme: logo, palette tokens, custom domain.
- `company_branding` table; resolved at edge via host header.
- Storage bucket per company for brand assets.

## 5. Public dispatcher API + webhooks
- REST + GraphQL surface at `/api/v1/*`.
- API keys table with per-key scopes; rate limits in KV.
- Outbound webhooks: load.created, load.assigned, load.delivered, pod.captured.
- HMAC signing, replay protection, retry with backoff.

## 6. Multi-region data residency
- Per-company region pinning (US / EU / APAC).
- Routing layer to per-region Supabase project.
- Audit + compliance reports per region.

## 7. Advanced AI
- Predictive ETA model fed from `navigation_events` + `eta_updates`.
- Capacity / lane demand forecasting.
- Dynamic pricing suggestions in Load Board.
- All inference behind `src/ai/providers/*` abstraction (Phase 5).

## 8. Enterprise admin
- SSO (SAML / OIDC) per company.
- SCIM provisioning.
- Audit log export to customer SIEM.
- Custom retention per data class.

## Sequencing
1. Marketplace adapters (quick win, revenue lift).
2. EDI 204/214 (largest enterprise gate).
3. Route optimization beta.
4. White-label + custom domains.
5. Public API + webhooks.
6. SSO/SCIM/SIEM.
7. Multi-region.
8. Predictive AI.
