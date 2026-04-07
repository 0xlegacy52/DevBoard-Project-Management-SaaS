# DevBoard — Project Management SaaS

## Overview
DevBoard is a project management SaaS (like Trello/Linear) with teams, workspaces, kanban boards, role-based access, and notifications.

**Tagline:** "Ship projects, not excuses."

## Tech Stack
- **Frontend:** React 19 + Vite + TypeScript, Tailwind CSS, shadcn/ui, Radix UI, TanStack Query, wouter (routing), date-fns
- **Backend:** Node.js + Express 5 + TypeScript
- **Database:** PostgreSQL + Drizzle ORM
- **Auth:** JWT (access + refresh tokens)
- **API Contract:** OpenAPI 3.1 → Orval codegen (React Query hooks + Zod validators)

## Architecture

### Monorepo Structure (pnpm workspaces)
```
/
├── artifacts/
│   ├── devboard/          # React+Vite frontend (port 22619, served at /)
│   └── api-server/        # Express API server (port 3001, served at /api)
├── lib/
│   ├── db/                # Drizzle ORM schema + database client (@workspace/db)
│   ├── api-spec/          # OpenAPI spec + Orval codegen config (@workspace/api-spec)
│   ├── api-client-react/  # Generated React Query hooks (@workspace/api-client-react)
│   └── api-zod/           # Generated Zod validators (@workspace/api-zod)
├── package.json           # Root workspace config
├── pnpm-workspace.yaml    # Workspace packages + catalog
├── tsconfig.json          # Root solution file (libs only)
└── tsconfig.base.json     # Shared TS defaults
```

### Data Hierarchy
User → Workspace → Project → Column → Card (Task)

### Database Tables (17 total)
users, workspaces, workspace_members, projects, project_members, columns, cards, card_assignees, labels, card_labels, checklists, checklist_items, comments, attachments, notifications, activity_logs, refresh_tokens

### Key Enums
- **member_role:** OWNER, ADMIN, MEMBER, VIEWER
- **priority:** NO_PRIORITY, LOW, MEDIUM, HIGH, URGENT
- **project_visibility:** WORKSPACE, PRIVATE
- **notification_type:** CARD_ASSIGNED, MENTIONED, CARD_OVERDUE, CARD_UPDATED, COMMENT_ADDED

## Important Commands
- `pnpm --filter @workspace/api-spec run codegen` — Regenerate React Query hooks + Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push-force` — Push Drizzle schema to database
- `pnpm run typecheck` — Full typecheck across all packages

## API Contract
- OpenAPI spec at `lib/api-spec/openapi.yaml` is the single source of truth
- All endpoints under `/api/v1/` prefix
- Generated hooks in `lib/api-client-react/src/generated/`
- Generated Zod schemas in `lib/api-zod/src/generated/`

## Workflows
- **artifacts/devboard: web** — Frontend dev server (port 22619)
- **DevBoard API** — API server / Express (port 3000)

## Logging
API server uses pino for structured logging. Use `req.log` in route handlers, singleton `logger` for non-request code. Never use console.log in server code.
