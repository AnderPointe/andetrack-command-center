# Phase 9 — AI-Driven Operations, Predictive Risk, Autonomous Dispatch

Phase 8 delivered enterprise hardening. Phase 9 turns Anderoute's
operational data into proactive intelligence.

## Tracks

### 1. Predictive operations
- ETA confidence intervals from historical GPS + traffic.
- Late-load probability scoring (per load, per driver, per lane).
- Detention/dwell prediction at customer sites.
- Demand forecasting per lane / equipment type.

### 2. Autonomous dispatch assistance
- CoPilot proposes load → driver assignments with explainable scores
  (Phase 7 optimization engine extended with reinforcement signal).
- Auto-tender to top-ranked carrier when broker workflow enabled.
- Smart rebalance during the day as conditions change.

### 3. Predictive risk
- Driver fatigue / HOS exhaustion risk.
- Compliance drift on CDL, vehicle inspection, insurance.
- Vendor risk drift (uptime, ticket trend).
- Security anomaly scoring on `security_audit_events`.

### 4. Executive intelligence
- C-suite dashboards: revenue per mile, OTP, claims ratio, utilization.
- Anomaly briefings emailed weekly.
- Natural-language Q&A over warehouse (CoPilot Exec).

### 5. AI safety & governance
- Model registry with version pinning.
- Prompt + output logging with PII scrub.
- Eval harness for each AI surface (tone, accuracy, refusal).
- Per-company AI cost ceilings + alerts.

## Out of scope for Phase 9
- New hardware / on-vehicle compute.
- Marketplace expansion (Phase 7 cadence).
