# Risk Management Workflow - Modular Specification

## Overview
This specification outlines a modular architecture for implementing the SPOiRMM-based risk management workflow. It separates the **Project Planning**, **Issues List**, and **Risk Register** into standalone but interconnected modules to improve scalability, navigation, and alignment with SPOiRMM methodology.

---

## Modules

### 1. Project Planning Module
- **Purpose:** Define risk management projects, including scope, stakeholders, objectives, and working groups.
- **Key Features:**
  - Create/Edit project metadata
  - Define working groups and roles (Sponsor, Coordinator, etc.)
  - Set timelines and milestones
  - Assign action plans
- **Fields:**
  - Project Title, Description
  - Start/End Dates
  - Stakeholders
  - Approval Status
  - Objectives

### 2. Issues List Module
- **Purpose:** Serve as the intake and triage point for all potential risks or concerns.
- **Key Features:**
  - Add new issues (from users or working groups)
  - Categorize by SPOiRMM Tools and Players
  - Track status: New, Reviewed, Promoted to Risk, Closed
  - Link issues to projects and optionally escalate to Risk Register
- **Fields:**
  - Issue Title & Description
  - Linked Project
  - Source (Working Group, Coordinator, External)
  - Categorization (Tool, Stakeholder, Type)
  - Resolution Status

### 3. Risk Register Module
- **Purpose:** Manage validated risks with analysis, prioritization, accountability, and treatment.
- **Key Features:**
  - Import from Issues List or enter directly
  - Apply SPOiRMM Tool classification
  - Conduct Risk Analysis, Ranking, Evaluation
  - Assign accountability and monitor treatment
- **Fields:**
  - Risk Title & Description
  - Linked Issue (optional)
  - Linked Project
  - Stakeholders involved
  - SPOiRMM Tool classification
  - Likelihood, Consequence, Ranking
  - Accountability and Treatment Plan

---

## Integration & Linking Logic

- **Shared Project ID** across modules.
- Issues have a `Linked Project` and optional `Promoted to Risk` link.
- Risks reference both `Linked Project` and optionally the originating `Issue`.

---

## Navigation Workflow

1. **User begins in the Dashboard or Welcome Page**
2. Navigates to:
   - Start a new Project in **Project Planning**
   - Raise a concern in **Issues List**
   - Review or manage confirmed risks in **Risk Register**
3. Each module can be accessed independently, or via drill-down from Project detail views.

---

## Compliance & Security

- **Access Control:**
  - Project Planning editable by Sponsors/Coordinators
  - Issues raised by any user but triaged by Coordinators
  - Risk Register editable by Coordinators and Risk Owners
- **Compliance Standards:** ISO 31000, ISO 9001
- **Audit Trail:** Log all edits and transitions (issue to risk, plan approval, etc.)

---

## Benefits of Modular Design

- Enables **cross-project risk visibility**
- Supports **reusability** of Issues and Risks across multiple planning exercises
- Improves **UX** with dedicated views and navigation paths
- Aligns with **SPOiRMM’s iterative and layered approach**
---

## Workflow Engine Integration

### Placement
The Workflow Engine is a system-level component accessible from the **Welcome Page** and available throughout the application. It sits above the core modules (Project Planning, Issues List, Risk Register) and orchestrates their interaction.

### Responsibilities
- Guide users through the SPOiRMM-based planning process
- Trigger transitions between modules (e.g., promote issue to risk)
- Validate prerequisites for workflow steps (e.g., plan approval before evaluation)
- Display current state of each project’s workflow
- Provide visual navigation (optionally using a Star Chart view)

### Features
- **State Awareness:** Knows current progress across all linked modules
- **Action Routing:** Directs users to the correct module or step based on their task
- **Reminders & Alerts:** For overdue tasks, pending signoffs, or inactive items
- **Audit Logging:** Tracks transitions and approvals for compliance

### Navigation Access
- Integrated into the **Welcome Page** UI as a central navigation hub
- Displayed as a progress tracker or clickable flow diagram
