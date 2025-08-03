# SPOiRMM Workflow Architecture Specification

## Overview
This specification defines the layered workflow system for implementing and managing SPOiRMM risk management processes. The architecture is composed of three coordinated components:

- **SPOiRMM Engine** (core logic controller)
- **SPOiRMM Flow** (process definition)
- **SPOiRMM Navigator** (user interface and guidance)

---

## 1. SPOiRMM Engine

### Description
The SPOiRMM Engine is the backend logic controller responsible for managing and validating transitions between risk planning stages.

### Responsibilities
- Enforce workflow rules (e.g., “Plan must be approved before risk evaluation”)
- Manage state transitions for Projects, Issues, and Risks
- Validate data and trigger automatic escalations
- Log all user and system actions for audit
- Trigger alerts and reminders

---

## 2. SPOiRMM Flow

### Description
SPOiRMM Flow defines the logical sequence and structure of the risk planning lifecycle. It is both a process model and a metadata reference used by the Engine and Navigator.

### Stages
1. Project Initiation
2. Working Groups Setup
3. Issues Identification
4. Issue Triage
5. Risk Confirmation
6. Risk Analysis & Ranking
7. Risk Evaluation
8. Project Sign-Off

---

## 3. SPOiRMM Navigator

### Description
The SPOiRMM Navigator is the UI component responsible for guiding users through the SPOiRMM Flow and exposing interactions with each module.

### Features
- Visual workflow progress bar or Star Chart layout
- Clickable stage navigation (with access rules)
- Module summaries with statuses and alerts
- Highlight of blockers (e.g., “Risk Register blocked until plan approved”)
- Reminders for incomplete tasks or overdue steps

---

## Integration

| Component          | Connected To                  | Purpose                               |
|--------------------|-------------------------------|----------------------------------------|
| SPOiRMM Engine     | Backend APIs, DB, Auth Layer  | Enforce logic, transitions, permissions|
| SPOiRMM Flow       | Engine, Navigator             | Provide stage structure and rules      |
| SPOiRMM Navigator  | Frontend (React), User Roles  | UI for interaction and navigation      |

---

## Benefits

- Clean separation of logic (Engine), structure (Flow), and UI (Navigator)
- Enables reusable components across organization and project levels
- Ensures compliance and traceability of the entire planning process
- Enhances user experience by showing real-time progress and status
---

## Additional System Module Considerations

### 🏢 Organization Module
- Introduces `organizationId` to scope all projects and workflows
- Enables org-level dashboards and metrics based on workflow state

### 📊 Dashboard Module
- Displays live workflow summaries (e.g., Projects Awaiting Approval)
- Integrated with SPOiRMM Engine to reflect real-time status

### 📄 Reports Module
- Adds workflow-based filters and stage duration metrics
- Includes compliance reports derived from workflow logs

### ⚙️ Admin/Settings Module
- Allows configuration of workflow stages, roles, and timeouts
- Enables audit retention and escalation policies

### 🔁 Project Workflow Module
- Deprecated as a standalone component
- Functionality replaced by dynamic SPOiRMM Navigator

### 📁 Project Planning Module (v2)
- Now acts as the first stage in the SPOiRMM Flow
- Controlled by the Workflow Engine for state transitions
- Shared `projectId` links it to Issues, Risks, Assessments
- Status field updated to: Draft | In Progress | Approved | Rejected | Closed
- Includes `organizationId` for multi-org scoping
- Approval and transitions are role-locked and enforced by Engine
---

## Optional System Modules

### 🔔 Notifications & Reminders Module
- Sends alerts and reminders for upcoming tasks, transitions, and blocked stages
- Integrated with the Engine, Dashboard, and Navigator
- Supports time-based and event-driven triggers

### 📜 Audit & Logging Module
- Tracks all user actions and system transitions
- Enables compliance reporting and traceability
- Admin-accessible, exportable, and filterable

### 👤 User Profile & Roles Module
- Defines user access, roles, and permissions
- Supports multi-role users and role-aware views
- Drives visibility and access control in all modules
