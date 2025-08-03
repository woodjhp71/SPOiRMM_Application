# User Profile & Roles Spec

## Purpose
Define user access, role-based permissions, and visibility rules across the system based on their organizational and workflow context.

---

## User Profile Fields
- `userId`
- `name`, `email`
- `organizationId`
- `role(s)` (multi-role support)
- `activeProjects` (IDs)
- `permissions` (calculated via roles)

---

## Standard Roles
- `Admin`
- `Risk Plan Sponsor`
- `Risk Plan Coordinator`
- `Working Group Member`
- `Risk Owner`
- `Viewer / Read-Only`

---

## Role Permissions Matrix
| Role                  | Project Planning | Issues List | Risk Register | Admin/Settings |
|-----------------------|------------------|-------------|---------------|----------------|
| Admin                 | Full             | Full        | Full          | Full           |
| Sponsor               | Approve          | View        | View          | None           |
| Coordinator           | Edit             | Manage      | Manage        | None           |
| Working Group Member  | View             | Create      | View          | None           |
| Risk Owner            | View             | View        | Edit Assigned | None           |
| Viewer / Read-Only    | View             | View        | View          | None           |

---

## Integration
- Role-aware routing and Navigator access
- Permissions enforced by Workflow Engine
- Display logic in Dashboard and modules