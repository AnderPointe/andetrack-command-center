# Phase 17 — V2 plan (preview)

V2 builds on V1.5 to deliver AI Operations Intelligence, an optimization
engine, EDI beta, API marketplace beta, advanced reporting, and enterprise
controls. Out of scope for Phase 16.

## Scope
1. **AI Operations Intelligence** — replace rules-based CoPilot with model-backed
   reasoning over operational state; structured outputs; guardrails.
2. **Optimization engine** — load-to-driver assignment, multi-stop optimization,
   slack-aware re-planning. Off-route + reroute graduates from placeholder.
3. **EDI beta** — 204, 990, 214, 210 inbound/outbound; trading partner config.
4. **API marketplace beta** — public REST + webhook subscriptions; rate limits;
   key rotation; tenant-scoped sandbox.
5. **Advanced reporting** — cohort, retention, profitability; scheduled exports.
6. **Enterprise controls** — SSO/SAML, audit log export, granular role matrix,
   per-tenant data residency hints, custom domain white-label.

## Out of scope until later
SOC 2 automation, Android Auto, CarPlay, full background native turn-by-turn.

## Architecture notes
- AI calls go through Lovable AI Gateway (`LOVABLE_API_KEY`) inside server fns.
- Optimization engine runs as background server fn jobs; expensive compute is
  queued and idempotent. No in-process globals (server is stateless).
- EDI runs as parser server fns + `api/public/*` intake routes for partner POSTs.
- Marketplace surface uses signed JWT API keys per company.
