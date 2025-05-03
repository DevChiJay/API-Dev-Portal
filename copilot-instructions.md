# API Key Management Developer Portal - Copilot Instructions

## Project Overview
This is an API key management developer portal built with Next.js 15 App Router and React 19. The portal allows developers to create projects, generate and manage API keys, view usage analytics, and access documentation.

## Technology Stack
- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Authentication**: Clerk
- **Styling**: Tailwind CSS
- **State Management**: React Context + Hooks
- **API**: REST endpoints with proper typing
- **Database**: Mongoose

## Architecture Guidelines

### Authentication Flow
- Clerk handles authentication with custom UI components
- Protected routes use middleware for auth checks
- User roles: Developer, Admin, System Admin

### Route Structure
```
/app
├── (auth)/ - Authentication related pages
│   ├── login/
│   ├── register/
│   └── forgot-password/
├── (portal)/ - Main authenticated portal
│   ├── dashboard/
│   │   └── [projectId]/
│   ├── api-keys/
│   │   └── [keyId]/
│   ├── projects/
│   │   ├── create/
│   │   └── [projectId]/
│   ├── analytics/
│   │   └── [projectId]/
│   ├── settings/
│   │   ├── profile/
│   │   ├── security/
│   │   ├── billing/
│   │   └── team/
│   └── documentation/
│       ├── getting-started/
│       ├── authentication/
│       └── api-reference/
└── admin/ - Admin only section
    ├── users/
    ├── projects/
    └── audit-logs/
```

### Component Organization
Components are organized by feature/domain rather than by type.

```
/components
├── Layout/ - Shared layout components
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── ...
├── ApiKeys/ - API key specific components
│   ├── ApiKeyCard.tsx
│   ├── CreateKeyForm.tsx
│   └── ...
├── Projects/ - Project management components
│   ├── ProjectCard.tsx
│   └── ...
├── Analytics/ - Analytics visualization components
│   ├── UsageChart.tsx
│   └── ...
└── UI/ - Reusable UI components
    ├── Button.tsx
    ├── Card.tsx
    └── ...
```

### Data Models
Key entities in the system:
- User (managed by Clerk)
- Project (belongs to a user or team)
- ApiKey (belongs to a project)
- Usage (analytics for API key usage)
- Team (group of users with access to projects)

### API Key Management Features
- Generation of API keys with customizable permissions
- Revocation of keys
- Usage limits and quotas
- Environment separation (dev, staging, production)
- IP restrictions
- Expiration dates

### Analytics Features
- Request volume over time
- Endpoint usage breakdown
- Error rates
- Response times
- Usage against quota

### Hooks & Services
Custom hooks should follow the `useX` naming convention:
- `useApiKeys` - For CRUD operations on API keys
- `useProjects` - For project management
- `useAnalytics` - For fetching and processing analytics data

Services should be in the `/services` directory:
- `apiKeyService.ts`
- `projectService.ts`
- `analyticsService.ts`

### State Management
- Use React Context for global state
- State should be organized by domain (apiKeys, projects, etc.)
- Follow action creator pattern for state modifications

### Typescript Guidelines
- All components should have proper type definitions
- Use interfaces for object shapes:
  - `IApiKey`, `IProject`, etc.
- Use type for unions/complex types:
  - `type ApiKeyPermission = 'read' | 'write' | 'admin'`

### UI/UX Expectations
- Dark mode support
- Responsive design (mobile-first)
- Accessible components (ARIA attributes, keyboard navigation)
- Loading states for async operations
- Error handling UI
- Confirmation dialogs for destructive actions

## Implementation Notes
- API keys should be securely generated and displayed only once to the user
- Analytics data should be aggregated for performance
- Admin actions should be logged for audit purposes
- Documentation should be easily updatable from markdown files
- Help tooltips should guide new users through the interface