# Phase 8 — Production Hardening, Compliance, QA, SOC 2 Readiness

## Goal
Make Anderoute ready for enterprise pilots, security reviews, and SOC 2 Type II
readiness work. No new product surfaces beyond security/compliance/operations
modules — only hardening, evidence, and governance.

## References
- **OWASP ASVS** — web app technical controls
- **OWASP MASVS / MASTG** — mobile app testing
- **AICPA Trust Services Criteria** — Security, Availability, Processing
  Integrity, Confidentiality, Privacy

## 11 Pillars (mapped to UI cards in Security Center)

| Pillar              | Owner            | Surface                       |
|---------------------|------------------|--------------------------------|
| Authentication      | Platform admin   | `/security/center` → Auth     |
| Authorization       | Company admin    | `/security/center` → Tenant   |
| Tenant Isolation    | Platform admin   | RLS matrix, support access    |
| API Security        | Integrations     | API keys, webhooks, rate-limit |
| Mobile Security     | Mobile lead      | MASVS checklist                |
| Data Protection     | Privacy officer  | PII inventory, retention      |
| Audit Logging       | Compliance       | Audit coverage report          |
| Backup & Recovery   | SRE              | Backup runbooks, RPO/RTO       |
| Incident Response   | On-call          | Incident center, postmortems   |
| Vendor Risk         | Compliance       | Vendor matrix, DPAs            |
| Compliance Evidence | Compliance       | Evidence vault, controls       |

## Phase 8 Demo Flow
1. Platform owner opens `/security/overview` → sees readiness score.
2. Drills into `/security/center` → reviews 11 posture cards.
3. Opens `/compliance/soc2` → reviews control library by TSC category.
4. Uploads evidence (placeholder) for an access-review control.
5. Runs RLS test matrix → one tenant-isolation test fails.
6. Failure auto-creates a security finding + remediation task.
7. Developer opens `/ops/center` → files a change request.
8. Change approved → moves to staging → post-deploy smoke test passes.
9. Simulated GPS outage triggers incident → workflow opens.
10. Postmortem template created; backup restore test logged.
11. Readiness score recalculates upward.

## Out of Scope for Phase 8
- New product surfaces (driver, dispatch, customer features).
- Marketplace/integration expansion.
- AI feature work (deferred to Phase 9).
