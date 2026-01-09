# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The Step-Up Application is a React-based web app for viewing Franklin Fire Department's step-up schedules and rosters. It tracks personnel availability, qualifications, and shift assignments with Microsoft Entra (Azure AD) authentication.

## Development Commands

```bash
# Start dev server on port 6000
npm run dev

# Run tests (Vitest)
npm test

# Type check and build
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview

# Deploy to production server (requires SSH access)
npm run deploy
```

## Testing

- Test framework: Vitest with React Testing Library
- Test setup: `src/test/setup.ts`
- To run tests: `npm test`
- To run tests in watch mode: `npm test -- --watch`

## Path Aliases

The project uses TypeScript path aliases configured in `tsconfig.app.json` and `vite.config.ts`:

```typescript
@/* → src/*
@/components/* → src/components/*
@/config/* → src/config/*
@/context/* → src/context/*
@/helpers/* → src/helpers/*
@/pages/* → src/pages/*
@/utils/* → src/utils/*
@/assets/* → src/assets/*
```

## Architecture

### Application Structure

- **Entry Point**: `src/main.tsx` wraps the app with `AuthProvider` (MSAL)
- **Router**: `src/App.tsx` defines routes with React Router 7, wrapping protected routes with context providers
- **State Management**: React Query for server state, React Context + Reducers for UI state

### Context Providers

The app uses a layered context architecture:

1. **AuthProvider** (top level): MSAL authentication wrapper
2. **QueryClientProvider**: React Query for data fetching
3. **Route-specific providers**:
   - **StepUpProvider**: Manages step-up page filters and search state (`src/components/step-up/context.tsx`)
   - **RosterProvider**: Manages roster date state (`src/components/roster/context.tsx`)

### Authentication Flow

- Uses `@azure/msal-browser` and `@azure/msal-react` for Microsoft Entra authentication
- Configuration: `src/context/Auth/config.ts`
- Custom hooks in `src/helpers/hooks.ts`:
  - `useGetToken()`: Handles token acquisition, expiration checking, and Edge browser compatibility
  - `useEnableQuery()`: Controls when React Query requests are enabled based on auth state
  - `useActiveAccount()`: Checks if user is authenticated
  - `useRedirectAfterLogin()`: Handles post-login redirects
- **Edge Browser Handling**: Uses popup-based token acquisition for Edge browsers (instead of silent refresh) due to iframe restrictions. Detects popup blockers and notifies users.
- Token refresh runs every 4 minutes automatically

### Component Organization

Components follow a consistent structure:
- `index.tsx`: Main component export
- `components.tsx`: Child/sub-components
- `hooks.ts`: Component-specific hooks
- `types.ts`: Type definitions
- `utils.ts`: Utility functions
- `context.tsx`: Context providers (when applicable)

### Data Types

Core data types are defined in `src/context/App/types.ts`:
- `StaffInterface`: Personnel records with skills, schedules, and step-up data
- `RosterEntryInterface`: Shift roster entries with station/apparatus assignments
- `ScheduleInterface`: Individual schedule entries
- Type unions for: `RankType`, `ShiftType`, `StationType`, `ApparatusType`, `DetailCodeType`

### API Integration

- Production API: `https://fireapps.franklintn.gov/api/v2/ffd/step-up`
- API URL configured in `src/config/index.ts`
- Data fetching uses React Query hooks
- Authentication token passed via `Authorization` header

### Pages

1. **Login** (`/`): MSAL login page
2. **Home** (`/home`): Step-up schedules with filtering by rank, shift, skills, and search
3. **Rosters** (`/rosters`): Daily roster views by shift
4. **Redirect** (`/*`): OAuth redirect handler

## Styling

- **Framework**: Tailwind CSS 4 with DaisyUI components
- **Animations**: Motion (Framer Motion) for transitions
- **Icons**: Custom icon components in `src/components/icons/`
- **Notifications**: React Toastify for user feedback

## Deployment

- Production URL: https://fireapps.franklintn.gov/step-up
- Build output directory: `dist/`
- Base path: `/step-up` (configured in `vite.config.ts`)
- Deploy command uses SCP to copy build artifacts to production server

## Development Notes

- React 19 with TypeScript strict mode enabled
- Development mode bypasses authentication (returns `'dev-token'`)
- Environment mode set via `NODE_ENV` in `src/config/index.ts`
- Dev server runs on port 6000 and allows specific hosts for cross-domain development
- Props should be written inline rather than each on a new line (per user preference)

## README.md Generation

When creating README files use the template at /opt/claude-standards/README_TEMPLATE.md as a guide