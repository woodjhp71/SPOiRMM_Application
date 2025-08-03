# Organization Module Spec (Updated)

## Purpose
Manage and organize projects and users by organization, providing scoped views and summary metrics.

## Updates
- Introduced `organizationId` as a top-level reference across all projects and modules.
- Enabled project aggregation and navigation by organization.
- Displays organization-level workflow metrics:
  - Active Projects
  - Blocked Stages
  - Workflow Health

## Features
- Create/Edit organization
- View all associated projects
- Access SPOiRMM Navigator scoped to organization
- Display cross-project workflow dashboard

## Integration
- Project Planning, Issues, Risk Register, Engine and Navigator scoped by `organizationId`