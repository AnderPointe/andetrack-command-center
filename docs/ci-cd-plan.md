# CI/CD Plan

## Pipeline
```text
install → typecheck → lint → unit → integration → build:web
       → security-scan → dep-scan → secret-scan
       → migration-dry-run → rls-tests → e2e-smoke
       → deploy:preview → (manual approval) → deploy:production
       → post-deploy smoke → release-record
```

## Gates
| Stage              | Failing stops pipeline | Owner    |
|--------------------|------------------------|----------|
| typecheck/lint     | yes                    | dev      |
| unit/integration   | yes                    | dev      |
| RLS tests          | yes                    | platform |
| dep/secret scan    | warn (non-blocking)    | sec      |
| e2e smoke          | yes                    | QA       |
| manual approval    | required for prod      | release  |
| post-deploy smoke  | triggers rollback      | on-call  |

## Tooling (planned)
- Playwright (e2e), Vitest (unit), custom RLS harness, Snyk / `npm audit`,
  Gitleaks, OpenAPI contract tests, EAS for mobile, Sentry for telemetry.
