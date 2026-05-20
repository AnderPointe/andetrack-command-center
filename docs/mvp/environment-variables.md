# Environment Variables — Anderoute MVP

## Web app (Vite)
| Name | Required | Purpose |
|------|----------|---------|
| `VITE_SUPABASE_URL` | yes | Supabase project URL (auto from Lovable Cloud) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | yes | Browser publishable key |
| `VITE_SUPABASE_PROJECT_ID` | yes | Project ref |
| `VITE_APP_ENV` | yes | `dev` / `pilot` / `prod` |
| `VITE_DEMO_MODE` | optional | `1` to show DemoModeBanner + ResetDemoButton |
| `VITE_MAP_PROVIDER` | optional | `mock` (default) / `mapbox` |
| `VITE_MAPBOX_PUBLIC_TOKEN` | optional | Required only when provider is `mapbox` |

## Server (server functions / routes)
| Name | Required | Purpose |
|------|----------|---------|
| `SUPABASE_URL` | yes | Server-side Supabase URL |
| `SUPABASE_PUBLISHABLE_KEY` | yes | Used by `requireSupabaseAuth` |
| `SUPABASE_SERVICE_ROLE_KEY` | yes | Admin operations (audit writers, webhooks) |

## Driver mobile (Expo, planned)
| Name | Required | Purpose |
|------|----------|---------|
| `EXPO_PUBLIC_SUPABASE_URL` | yes | Mobile Supabase URL |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | yes | Mobile publishable key |

## Rules
- `VITE_*` / `EXPO_PUBLIC_*` are bundled into the client. Never put secrets there.
- `SUPABASE_SERVICE_ROLE_KEY` is server-only. Never imported from a component or shared module.
- All map / push / AI tokens for MVP are **placeholders**. Wire real providers in Phase 13+.
