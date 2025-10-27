# Step-Up Application

A modern web application for viewing Franklin Fire Department's step-up schedules and rosters. Built with React 19, TypeScript, and Vite.

## Overview

The Step-Up application enables fire department personnel to view shift rosters, track qualified personnel, and filter staff by various criteria including skills and shift assignments. It features Microsoft Entra (Azure AD) authentication for secure access.

## Features

- **Roster Viewing**: View personnel rosters across different shifts
- **Step-Up Tracking**: Track personnel availability and qualifications for step-up assignments
- **Advanced Filtering**: Filter personnel by qualifications, skills, and shift assignments
- **Search Functionality**: Quick search across personnel records
- **Secure Authentication**: Microsoft Entra ID (MSAL) integration

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Routing**: React Router 7
- **State Management**: React Query (TanStack Query)
- **Authentication**: Microsoft MSAL (Azure/Entra ID)
- **Styling**: Tailwind CSS 4 + DaisyUI
- **Forms**: React Hook Form
- **Animations**: Motion (Framer Motion)
- **Error Handling**: React Error Boundary
- **Notifications**: React Toastify
- **Testing**: Vitest + React Testing Library

## Prerequisites

- Node.js (v18 or higher recommended)
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

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5013`

## Available Scripts

- `npm run dev` - Start development server on port 5013
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests with Vitest
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to server (requires SSH access)

## Building for Production

```bash
# Type check and build
npm run build
```

The built files will be output to the `dist/` directory.

## Deployment

**Production URL**: [https://fireapps.franklintn.gov/step-up](https://fireapps.franklintn.gov/step-up)

Deploy using:
```bash
npm run deploy
```

This will build and copy the distribution files to the production server via SCP.

## API Integration

**API Endpoints**:
- Production: `https://api.franklintn-gov.com/api/v2/ffd` | [GitHub Repository](https://github.com/City-of-Franklin-IT/ffd-api-ts)<br>
- Proxy: `https://fireapps.franklintn.gov/api/v2/ffd`<br>
- Documentation: [API Docs](https://fireapps.franklintn.gov/api/v2/ffd/api-docs)

## Database

Database: `[COFDBV08].[ffd_step_up]`

## Project Structure

```
src/
├── components/        # Reusable components
│   ├── icons/        # Icon components
│   ├── layout/       # Layout components (Header, Footer, Layout)
│   ├── roster/       # Roster-related components
│   └── step-up/      # Step-up specific components
├── context/          # React context providers
│   ├── App/          # Application context
│   └── Auth/         # Authentication context (MSAL)
├── pages/            # Route pages
│   ├── Home/         # Step-up home page
│   ├── Login/        # Authentication page
│   ├── Rosters/      # Roster management page
│   └── Redirect/     # OAuth redirect handler
├── utils/            # Utility functions and helpers
├── config/           # Configuration files
└── helpers/          # Helper functions and hooks
```

## Authentication

The application uses Microsoft Authentication Library (MSAL) for authentication against Microsoft Entra ID (formerly Azure AD). Users must authenticate with their organizational credentials to access the application.
