# Phase 19 — Anderoute V3

V3 moves Anderoute into a mobile-native, voice-first, and ecosystem-aware
posture. Web V1, V1.5, V2, and V2.5 surfaces remain intact.

## In scope
- Native driver app architecture expansion (React Native shell scaffolding)
- Advanced driver UX (voice-first, low distraction, next-best action)
- Android Auto planning (native module + safety review, no certification)
- CarPlay planning (entitlement request placeholder, no entitlement claim)
- Advanced CoPilot voice (push-to-talk, intent expansion, transcript audit)
- Telematics integration foundation (Samsara, Motive, Geotab, Verizon, Fleet Complete, custom)
- Carrier marketplace foundation (profiles, postings, bids, awards, compliance placeholders)
- Mobile offline hardening (queue + conflict + sync priority)
- Mobile observability (app health, permissions, version policy)
- Driver engagement (performance, announcements, feedback)
- Enterprise certification readiness (SOC 2 prep, vendor questionnaire builder)
- Enterprise admin (mobile policy, feature flag groups, integration permissions)
- V3 reports

## Deferred
- Fully autonomous dispatch (always requires human approval)
- Final Android Auto certification (requires native + Google review)
- Final CarPlay entitlement approval (requires Apple review)
- Full carrier marketplace production liquidity
- Full DOT/FMCSA compliance automation
- Telematics diagnostic ML prediction
- Insurance underwriting workflows
- SOC 2 certification (readiness only)

## Surface map
- `/v3/overview` — Release readiness
- `/v3/scope` — Scope + feature matrix
- `/v3/driver-app` — Native driver app expansion
- `/v3/driver-ux` — Advanced driver UX flows
- `/v3/android-auto` — Android Auto planning + safety
- `/v3/carplay` — CarPlay planning + entitlement status
- `/v3/voice` — Advanced CoPilot voice + transcript audit
- `/v3/voice-intents` — Supported intent registry
- `/v3/telematics` — Telematics integration foundation
- `/v3/fleet-hardware` — Hardware inventory + assignments
- `/v3/marketplace` — Carrier marketplace foundation
- `/v3/carrier-profiles` — Carrier profile manager
- `/v3/carrier-compliance` — Carrier compliance placeholders
- `/v3/offline` — Mobile offline queue + conflict resolution
- `/v3/observability` — Mobile app health
- `/v3/engagement` — Driver engagement
- `/v3/certification` — Enterprise certification readiness
- `/v3/questionnaire` — Vendor security questionnaire builder
- `/v3/admin` — Enterprise admin controls
- `/v3/reports` — V3 reports
- `/v3/demo` — V3 end-to-end demo flow
- `/v3/enterprise-onboarding` — Enterprise onboarding

## Disclaimers
- AI accuracy is not guaranteed; voice intents require driver confirmation for
  irreversible actions.
- Android Auto and CarPlay surfaces require native modules and platform
  approval; the web app cannot render those templates.
- Telematics integrations are placeholders — no provider credentials wired.
- SOC 2 is not certified — the dashboard tracks readiness only.
- Driver privacy and consent remain enforced; tenant data boundaries are
  preserved per V2.5 RLS.
