# Android Auto — V3 Planning (Phase 19)

This expands on `docs/android-auto-plan.md` with the Phase 19 readiness
checklist and safety review.

## Module shape (recap)
- Native Android module under the Expo config plugin
- `CarAppService` + `androidx.car.app.category.NAVIGATION`
- `NavigationTemplate` + `MapWithContentTemplate`
- Bridge to JS via the `RoutingInfoSnapshot` shape in `src/invehicle/types.ts`

## Phase 19 deliverables
- Planning dashboard at `/v3/android-auto`
- Readiness checklist + safety review surfaces
- `ANDROID_AUTO_CHECKLIST` and `ANDROID_AUTO_SAFETY` mock data

## What still requires native work
- Implement `CarAppService` + `Session`
- Wire JS bridge (`AndroidAutoAdapter` currently stubbed)
- DHU test profile + emulated cluster QA
- Google Android for Cars App Library review

## What never ships without these
- "Android Auto certified" claim
- Any production build with the Car App Library entitlement
