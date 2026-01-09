# FFD Step-Up Application

A modern web application for viewing Franklin Fire Department's step-up schedules and rosters.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css&logoColor=white)

## Overview

The Step-Up Application enables fire department personnel to view shift rosters, track qualified personnel, and filter staff by various criteria including skills and shift assignments. It features Microsoft Entra (Azure AD) authentication for secure access and provides real-time visibility into step-up assignments and personnel availability.

## Features

- View personnel rosters across different shifts (A, B, C)
- Track personnel availability and qualifications for step-up assignments
- Advanced filtering by rank, qualifications, skills, and shift assignments
- Search functionality across personnel records
- View detailed schedules with hours tracking
- Microsoft Entra ID (MSAL) authentication integration
- Responsive design for desktop and mobile devices
- Real-time token refresh and session management

## Prerequisites

- Node.js v18 or higher
- npm or yarn
- Access to Franklin TN Microsoft Entra tenant

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd step-up-vite-ts

# Install dependencies
npm install
```

## Configuration

Configure the following values in `src/config/index.ts`:

| Variable | Description | Example |
|----------|-------------|---------|
| `APP_TITLE` | Application title | `"FFD Step Up Pay & Rosters"` |
| `APP_BASE` | Base path for routing | `"/step-up"` |
| `API_URL` | Backend API endpoint | `"https://fireapps.franklintn.gov/api/v2/ffd/step-up"` |
| `NODE_ENV` | Environment mode | `"production"` or `"development"` |
| `CLIENT_ID` | Microsoft Entra application ID | `"beec6da4-ba46-45c7-9630-ddb7df68b3da"` |

Microsoft Entra configuration is managed in `src/context/Auth/config.ts`:

```typescript
{
  authority: 'https://login.microsoftonline.com/<tenant-id>/',
  redirectUri: 'https://fireapps.franklintn.gov/step-up',
  postLogoutRedirectUri: 'https://fireapps.franklintn.gov/'
}
```

## Usage

### Development Mode

Start the development server on port 6000:

```bash
npm run dev
```

The application will be available at `http://localhost:6000`. Development mode bypasses authentication by returning a mock token.

### Production Build

Build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── icons/       # Icon components
│   ├── layout/      # Layout components (Header, Footer)
│   ├── roster/      # Roster-related components and context
│   └── step-up/     # Step-up specific components and context
├── context/         # React context providers
│   ├── App/         # Application-level types and actions
│   └── Auth/        # Authentication context (MSAL)
├── pages/           # Route pages
│   ├── Home/        # Step-up schedules page
│   ├── Login/       # Authentication page
│   ├── Rosters/     # Roster management page
│   └── Redirect/    # OAuth redirect handler
├── utils/           # Utility components (ErrorBoundary, Loading, Toast)
├── helpers/         # Custom hooks and utility functions
├── config/          # Configuration files
└── test/            # Test setup and configuration
```

## Components

### Context Providers

- **AuthProvider**: MSAL authentication wrapper with automatic token refresh
- **StepUpProvider**: Manages step-up page filters (rank, shift, skills) and search state
- **RosterProvider**: Manages roster date selection state

### Key Components

- **Home**: Step-up schedules with filtering and search capabilities
- **Rosters**: Daily shift roster views with station assignments
- **TableContainer**: Data tables with filtering and sorting
- **RosterTable**: Personnel roster display with paramedic indicators
- **SchedulesTable**: Detailed schedule view with hours tracking

### Custom Hooks

- `useGetToken()`: Handles MSAL token acquisition and refresh (Edge browser compatible)
- `useEnableQuery()`: Controls React Query enablement based on auth state
- `useActiveAccount()`: Checks authentication status
- `useRedirectAfterLogin()`: Manages post-login navigation

## Development

### Run Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm test -- --watch
```

### Linting

```bash
npm run lint
```

### Type Checking

TypeScript compilation is included in the build command:

```bash
npm run build
```

## Deployment

### Production Deployment

**Production URL**: https://fireapps.franklintn.gov/step-up

Deploy to production server (requires SSH access):

```bash
npm run deploy
```

This command builds the application and copies the `dist/` directory to the production server via SCP.

### API Integration

- **Production API**: `https://fireapps.franklintn.gov/api/v2/ffd/step-up`
- **API Proxy**: `https://fireapps.franklintn.gov/api/v2/ffd`
- **API Documentation**: https://fireapps.franklintn.gov/api/v2/ffd/api-docs
- **GitHub Repository**: https://github.com/City-of-Franklin-IT/ffd-api-ts

### Database

Database: `[COFDBV08].[ffd_step_up]`

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Routing**: React Router 7
- **State Management**: React Query (TanStack Query) + React Context
- **Authentication**: Microsoft MSAL (@azure/msal-browser, @azure/msal-react)
- **Styling**: Tailwind CSS 4 + DaisyUI
- **Forms**: React Hook Form
- **Animations**: Motion (Framer Motion)
- **Error Handling**: React Error Boundary
- **Notifications**: React Toastify
- **Testing**: Vitest + React Testing Library