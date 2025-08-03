
# SPOiRMM Risk Management Application: Landing Page Specification

## Component: Risk Planning Workspace Dashboard

### Overview
This landing page is the first screen a user sees after logging in. It provides an overview of active risk planning activity, working groups, task assignments, and contextual access to SPOiRMM tools. The layout and content are personalized based on the user's role.

---

## Functional Goals
- Display user's current risk planning projects
- Provide quick access to tasks and group responsibilities
- Show visual entry points into SPOiRMM Tools
- Offer real-time visibility of plan status and critical risks
- Support role-based visibility and access

---

## Layout Structure

### 1. Header
- **App logo**
- **Welcome message** (e.g., "Welcome back, Jane Doe")
- **Role tag** (e.g., Risk Plan Coordinator)
- **Notifications icon** (optional)
- **Logout / Profile access**

---

### 2. Main Grid Components

#### 📁 Active Projects Overview
- **Fields**:
  - Project Title
  - Status (New | In Progress | Approved | Closed)
  - Risk Plan Sponsor / Coordinator
  - Progress % (based on completed modules)
- **Actions**:
  - Click → go to full Project Planning screen

#### 👥 My Working Groups
- **Fields**:
  - Group Name
  - Members (initials or avatars)
  - Next Meeting Date
  - Open Issues/Tasks count
- **Actions**:
  - Click → open Working Group view

#### ✅ My Action Items
- **Fields**:
  - Task Description
  - Due Date
  - Project Reference
  - Status (New, In Progress, Overdue)
- **Actions**:
  - Click → jump to Action Plan form with task preloaded

#### 🧭 Tool Activity Navigator
- **Cards/Buttons for each Tool**:
  - Jurisdiction Tool
  - Market Tool
  - Enterprise Tool
  - Organisation Tool
  - Agreements Tool
  - Resources Tool
- **Actions**:
  - Click → opens that tool's context view

#### 🚨 Key Risk Signals (Optional)
- **Fields**:
  - Top 5 Risks by Rank
  - Status: Accountable / Unassigned / Overdue Review
  - Linked Project
- **Actions**:
  - Click → View in Risk Register

#### 🌐 Star Chart Snapshot
- **Embedded readonly Star Chart component**
- **Player/Tool focus filter**
- **Zoom/Pan disabled**

---

## Role-Based Display Logic

| Role | Component Emphasis |
|------|---------------------|
| Risk Plan Sponsor | Project Overview, Risk Register |
| Coordinator | All components |
| Working Group Member | Action Items, Working Groups |
| Viewer | Star Chart Snapshot, Project Status only |

---

## Application Color Scheme

| Role / Function                  | Color      | Usage Context                                |
|----------------------------------|------------|----------------------------------------------|
| Recipient of Benefit             | Blue       | Text, background, icons                      |
| Provider of Benefit              | Red        | Text, borders, active UI elements            |
| Benefit Enablers (Staff)         | Green      | Icons, labels, highlights                    |
| Regulators & Representatives     | Yellow     | Informational banners, tooltips             |
| Community (background)           | Grey       | Background outlines                          |
| Jurisdiction Tool                | Purple     | Section indicators or tab headers           |
| Market Tool                      | Orange     | Section indicators or tab headers           |
| Enterprise Tool                  | Teal       | UI containers for external roles            |
| Organisation Tool                | Light Blue | Internal structure containers                |
| Agreements Tool                  | Dark Blue  | Matrix headers, agreement status             |
| Resources Tool                   | Brown      | Timeline and process indicators              |

- Use complementary and accessible shades
- Maintain color consistency across dashboard modules
- All colors must meet WCAG 2.1 AA accessibility standards

---

## Technical Stack

### Frontend
- **Framework**: React
- **Styling**: TailwindCSS
- **State Management**: Zustand or Redux
- **Charting**: Embedded Star Chart via D3.js (readonly mode)

### Data Endpoints (suggested)
- `/api/projects/active`
- `/api/groups/user`
- `/api/tasks/user`
- `/api/risks/top`
- `/api/tools/activity`
- `/api/star-chart/snapshot`

---

## Accessibility
- All cards keyboard navigable
- WCAG 2.1 AA color contrast compliance
- Tooltips and alt text for icons

---

## Export/Integration
- Dashboard state to be shareable via snapshot link (future)
- Embed hooks for task completion, group updates, and risk escalations

---

## Future Enhancements
- Real-time updates via WebSocket or polling
- AI-generated risk insights based on user history
- Multi-project dashboard toggle


---

## Navigation: Landing Page → Project Planning Page

### Trigger
- Click on a project card within the **Active Projects Overview** section

### Interactive Elements
- Project Title
- “View Plan” button
- Project Status tag (clickable)

### Route Behavior
- Navigates to: `/projects/:projectId/planning`
- Loads full planning context for selected project

### Frontend Implementation Example (React + React Router)
```tsx
<Link to={`/projects/${project.id}/planning`}>
  <div className="card hover:shadow-lg transition-all">
    <h2>{project.title}</h2>
    <p>Status: {project.status}</p>
    <button className="btn-primary">View Plan</button>
  </div>
</Link>
```

### Backend Requirements
- Project cards must include `project.id` from `/api/projects/active`
- Full project context should be retrieved from `/api/projects/:projectId`

---

## Optional Enhancements
- Add "Continue where I left off" to auto-redirect users to last accessed project
- Enable sidebar preview of project summary before routing
- Role-based shortcut: If user is assigned to only one project, redirect immediately after login
