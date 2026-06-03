# Let's Cook 2.0 — Claude Code Guidelines

## Stack
- **Framework**: React 19 + TypeScript + Vite
- **Routing**: React Router v7
- **Data fetching**: TanStack Query v5 (React Query)
- **Backend**: Supabase (auth + database)
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **Forms**: React Hook Form + Zod v4
- **Package manager**: pnpm

## Project Structure
```
src/
  features/      # Feature modules: auth, recipes, collections, favorites, pantry, home
  shared/        # Shared components, hooks, lib utilities
  layouts/       # Route layout wrappers
  services/      # External service clients (supabase.ts)
  router/        # Route definitions
```

Each feature follows this structure:
```
features/<name>/
  components/        # UI components
  hooks/             # TanStack Query hooks (use*.ts)
  fetcher.ts         # Raw Supabase calls
  queryKeys.ts       # Query key factories
  validation/        # Zod schemas
  types/             # TypeScript types
```

## Code Rules (enforced by ESLint — do not disable or bypass)

### 1. No Comments
Write zero comments. If you feel the urge to explain something, rename it instead.

### 2. Max 2 Function Parameters
Functions take at most 2 parameters. For more, use a single options object:
```ts
function createRecipe({ name, steps, ingredients, userId }: CreateRecipeOptions) {}
```

### 3. Max 50 Lines Per Function
Functions and React components must be ≤50 lines. Extract JSX into sub-components and logic into custom hooks.

### 4. Max 250 Lines Per File
Files must be ≤250 lines. Split into focused modules. One responsibility per file.

### 5. No Magic Numbers
Named constants for all numbers. Only `-1`, `0`, `1` are allowed inline.
```ts
const DEBOUNCE_MS = 300
const MAX_INGREDIENTS = 20
```

## Patterns

### Data Fetching
- Raw Supabase calls live only in `fetcher.ts`
- TanStack Query hooks wrap fetchers in `hooks/use*.ts`
- Query keys are defined in `queryKeys.ts` as factory functions
- After mutations, invalidate with `queryClient.invalidateQueries({ queryKey: queryKeys.all })`

### Auth
- Use `useAuth()` from `features/auth/hooks/useAuth.ts`
- Protected routes use `<ProtectedRoute>` wrapper

### UI Components
- Use shadcn/ui primitives from `shared/components/ui/`
- shadcn/ui files in `src/shared/components/ui/` are excluded from lint rules — do not manually edit them

### Forms
- React Hook Form with Zod resolver
- Zod schemas in `features/*/validation/schema.ts`

### Naming
- Hooks: `use<Feature><Action>` (e.g., `useRecipes`, `usePantry`)
- Query keys: factory objects in `queryKeys.ts`
- Fetchers: plain async functions, no side effects

## ESLint Config is Protected
Do not modify `eslint.config.js`. The rules are intentional guardrails.
